import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json
import os.path

URL = "http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial"


def saveData(d, ld, Temp, data):
    if 'avg' not in ld:
        ld['avg'] = {}
    if d[1] not in ld['avg']:
        ld['avg'][d[1]] = {d[0]: {d[2]: {d[3]: data['yhat']}}}
    elif d[0] not in ld['avg'][d[1]]:
        ld['avg'][d[1]][d[0]] = {d[2]: {d[3]: data['yhat']}}
    elif d[2] not in ld['avg'][d[1]][d[0]]:
        ld['avg'][d[1]][d[0]][d[2]] = {d[3]: data['yhat']}
    else:
        ld['avg'][d[1]][d[0]][d[2]][d[3]] = data['yhat']
    if data['dateTime'].strftime('%Y-%m-%d %H') in Temp:
        if 'act' not in ld:
            ld['act'] = {}
        if d[1] not in ld['act']:
            ld['act'][d[1]] = {d[0]: {d[2]: {d[3]: data['yhat']}}}
        elif d[0] not in ld['act'][d[1]]:
            ld['act'][d[1]][d[0]] = {d[2]: {d[3]: data['yhat']}}
        elif d[2] not in ld['act'][d[1]][d[0]]:
            ld['act'][d[1]][d[0]][d[2]] = {d[3]: data['yhat']}
        else:
            ld['act'][d[1]][d[0]][d[2]][d[3]] = data['yhat']


def loadData():
    if os.path.exists('./models/ldata.json'):
        with open("./models/ldata.json", "r") as f:
            return json.load(f)
    return {}


def loadTemp():
    if os.path.exists('./models/temp.json'):
        with open("./models/temp.json", "r") as f:
            return json.load(f)
    return {}


def getTemp():
    Temp = loadTemp()
    try:
        if datetime.today().strftime('%Y-%m-%d %H') in Temp:
            return Temp
        import requests
        r = requests.get(url=URL)
        data = r.json()
        Temp = {}
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
        with open("./models/temp.json", "w") as f:
            json.dump(Temp, f)
        return Temp
    except:
        return Temp


def formatData(From, data):
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
    if Temp == {}:
        temp = 90
    elif key in Temp:
        temp = Temp[key]
    else:
        temp = Temp[key.split(' ')[1]]
    param = pd.DataFrame([dayTime], columns=['ds'])
    param['temp'] = temp
    val = model.predict(param).to_dict()
    yhat = round(np.exp(float(val['yhat'][0])), 2)
    data = {"dateTime": dayTime, "yhat": yhat}
    return data


def getHourData(date, ld, Temp):
    d = str(date.strftime('%Y-%m-%d-%H'))
    d = d.split("-")
    if date.strftime('%Y-%m-%d %H') in Temp and 'act' in ld:
        if d[1] in ld['act'] and d[0] in ld['act'][d[1]] and d[2] in ld['act'][d[1]][d[0]] and d[3] in ld['act'][d[1]][d[0]][d[2]]:
            return {'dateTime': date, 'yhat': ld['act'][d[1]][d[0]][d[2]][d[3]]}
    elif date.strftime('%Y-%m-%d %H') not in Temp and 'avg' in ld:
        if d[1] in ld['avg'] and d[0] in ld['avg'][d[1]] and d[2] in ld['avg'][d[1]][d[0]] and d[3] in ld['avg'][d[1]][d[0]][d[2]]:
            return {'dateTime': date, 'yhat': ld['avg'][d[1]][d[0]][d[2]][d[3]]}
    data = getEnergy(date, Temp)
    saveData(d, ld, Temp, data)
    return data


def getData(From, To):
    Temp = getTemp()
    ldata = loadData()
    data = []
    dayTime = From
    while True:
        if dayTime.replace(minute=0) == To.replace(minute=0):
            if (To - dayTime).seconds // 60 != 0:
                erg = getHourData(dayTime, ldata, Temp)
                erg['yhat'] = round(
                    erg['yhat'] * ((To - dayTime).seconds // 60) / 60, 2)
                data.append(erg)
            break
        elif dayTime != dayTime.replace(minute=0):
            newDate = dayTime.replace(minute=0)
            erg = getHourData(newDate, ldata, Temp)
            newDate += timedelta(hours=1)
            erg['yhat'] = round(erg['yhat'] *
                                ((newDate - dayTime).seconds // 60) / 60, 2)
            data.append(erg)
            dayTime = newDate
        else:
            data.append(getHourData(dayTime, ldata, Temp))
            dayTime += timedelta(hours=1)
    with open("./models/ldata.json", "w") as f:
        json.dump(ldata, f)
    return data


def predict():
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    if From > To:
        From, To = To, From
    data = formatData(From, getData(From, To))
    with open("./models/data.json", "w") as f:
        json.dump(data, f)
    print("Energy Prediction Completed Successfully!")
    return


def plotGraph(x, y):
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(11, 5))
    ax.plot(x, y)
    plt.xlabel('DateTime')
    plt.ylabel('Predicted Value (kWh)')
    plt.title('Graphical Analysis')
    ax.xaxis_date()
    fig.autofmt_xdate()
    fileName = 'graph' + datetime.today().strftime('%S.%f')[:-3] + '.png'
    plt.savefig("./images/" + fileName)
    plt.close()
    return fileName


def getGraph():
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    if From > To:
        From, To = To, From
    data = getData(From, To)
    x, y = [], []
    for i in data:
        x.append(i['dateTime'])
        y.append(i['yhat'])
    print(plotGraph(x, y))
    return


if __name__ == "__main__":
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
        if sys.argv[1] == "predict":
            predict()
        elif sys.argv[1] == "graph":
            getGraph()
        else:
            print("Error: " + sys.argv[1] + " method not allowed!")
        sys.stdout.flush()
