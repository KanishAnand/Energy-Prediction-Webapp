import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json
import requests
import os.path

tempURL = "http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial"

saveTime = 10

def loadPredictData():
	try:
		ldata = requests.post(url = "http://localhost:4000/model/load/predict-data", json = {}).json()
		return ldata
	except:
		return {}

def savePredictData(ldata):
	try:
		requests.post(url = "http://localhost:4000/model/add/predict-data", json = ldata)
		return
	except:
		return

def saveUserData(data, format):
	try:
		ret = requests.post(url = "http://localhost:4000/model/add/" + format +"-data", json = {'username': sys.argv[6], 'data': data, 'token': sys.argv[7]}).json()
		if "message" in ret and ret.message == "STOP":
			return False
		return True
	except:
		return True

def loadTemp():
	try:
		temp = requests.post(url = "http://localhost:4000/model/load/temp", json = {}).json()
		return temp
	except:
		return {}

def saveTemp(temp):
	try:
		requests.post(url = "http://localhost:4000/model/add/temp", json = temp)
		return
	except:
		return

def getTemp():
	Temp = loadTemp()
	try:
		if datetime.today().strftime('%Y-%m-%d %H') in Temp:
			return Temp
		r = requests.get(url = tempURL)
		data = r.json()
		for ind in range(len(data['list'])):
			dayTime = datetime.strptime(
				data['list'][ind]['dt_txt'], '%Y-%m-%d %H:%M:%S')
			Temp[(dayTime + timedelta(hours=-1)).strftime('%Y-%m-%d %H')
				 ] = data['list'][ind]['main']['temp']
			Temp[dayTime.strftime('%Y-%m-%d %H')
				 ] = data['list'][ind]['main']['temp']
			Temp[(dayTime + timedelta(hours=1)).strftime('%Y-%m-%d %H')
				 ] = float(data['list'][ind]['main']['temp'])
		avg = {}
		for i in Temp:
			key = i.split(' ')[1]
			if key in avg:
				avg[key] = (avg[key][0] + Temp[i], avg[key][1] + 1)
			else:
				avg[key] = (Temp[i], 1)
		for i in avg:
			Temp[i] = round(avg[i][0] / avg[i][1], 2)
		saveTemp(Temp)
		return Temp
	except:
		return Temp


def hourToDayData(From, data):
	output = []
	date = From
	value = 0.0
	for d in data:
		if date.strftime('%Y-%m-%d') == d['dateTime'].strftime('%Y-%m-%d'):
			value += float(d['yhat'])
		else:
			output.append({"date": date.strftime('%Y-%m-%d'),
						   "yhat": round(value, 2)})
			date += timedelta(days=1)
			value = float(d['yhat'])
	output.append({"date": date.strftime('%Y-%m-%d'),
				   "yhat": round(value, 2)})
	return output


def getEnergy(dayTime, Temp):
	key, temp = dayTime.strftime('%Y-%m-%d %H'), 0
	if key in Temp:
		temp = Temp[key]
	elif key.split(' ')[1] in Temp:
		temp = Temp[key.split(' ')[1]]
	else:
		temp = 90
	param = pd.DataFrame([dayTime], columns=['ds'])
	param['temp'] = temp
	val = model.predict(param).to_dict()
	yhat = round(np.exp(float(val['yhat'][0])), 2)
	data = {"dateTime": dayTime, "yhat": yhat}
	return data


def getHourData(dayTime, ldata, Temp):
	date = str(dayTime.strftime('%Y-%m-%d %H'))
	if date in Temp and 'act' in ldata and date in ldata['act']:
		return {'dateTime': dayTime, 'yhat': ldata['act'][date]}
	elif date not in Temp and 'avg' in ldata and date in ldata['avg']:
		return {'dateTime': dayTime, 'yhat': ldata['avg'][date]}
	data = getEnergy(dayTime, Temp)
	if 'avg' not in ldata:
		ldata['avg'] = {}
	ldata['avg'][date] = data['yhat']
	if date in Temp:
		if 'act' not in ldata:
			ldata['act'] = {}
		ldata['act'][date] = data['yhat']
	return data


def getData(From, To, format = "hour"):
	Temp = getTemp()
	ldata = loadPredictData()
	data = []
	status = True
	start_time = datetime.now()
	if From.replace(minute=0) == To.replace(minute=0):
		if (To - From).seconds // 60 != 0:
			erg = getHourData(From, ldata, Temp)
			erg['yhat'] = round(
				erg['yhat'] * ((To - From).seconds // 60) / 60, 2)
			data.append(erg)
	else:
		dayTime = From
		newDate = dayTime.replace(minute=0)
		erg = getHourData(newDate, ldata, Temp)
		newDate += timedelta(hours=1)
		erg['yhat'] = round(erg['yhat'] *
							((newDate - dayTime).seconds // 60) / 60, 2)
		data.append(erg)
		dayTime = newDate
		newDate = To.replace(minute=0)
		while dayTime < newDate:
			data.append(getHourData(dayTime, ldata, Temp))
			dayTime += timedelta(hours=1)
			time_delta = datetime.now() - start_time
			if time_delta.total_seconds() >= saveTime:
				if format == "day":
					status = saveUserData(hourToDayData(From, data), format)
				else:
					status = saveUserData(data, format)
				if status == False:
					return status
				start_time = datetime.now()
		if (To - dayTime).seconds // 60 != 0:
			erg = getHourData(dayTime, ldata, Temp)
			erg['yhat'] = round(
				erg['yhat'] * ((To - dayTime).seconds // 60) / 60, 2)
			data.append(erg)
	if format == "day":
		data = hourToDayData(From, data)
	status = saveUserData(data, format)
	savePredictData(ldata)
	return status


def predict():
	From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
	To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
	if From > To:
		From, To = To, From
	status = getData(From, To, "day")
	if status:
		print("Energy prediction completed!!")
	else:
		print("Energy prediction not completed!!")
	return


def graph():
	From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
	To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
	if From > To:
		From, To = To, From
	status = getData(From, To, "hour")
	if status:
		print("Energy prediction completed!!")
	else:
		print("Energy prediction not completed!!")
	return


if __name__ == "__main__":
	with open('./models/model.pkl', 'rb') as f:
		model = pickle.load(f)
		if sys.argv[1] == "predict":
			predict()
		elif sys.argv[1] == "graph":
			graph()
		else:
			print("Error: " + sys.argv[1] + " method not allowed!")
		sys.stdout.flush()
