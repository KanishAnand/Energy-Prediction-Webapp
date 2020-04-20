import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json
import requests

URL = "http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial"


def getEnergy(dayTime, Temp, min=60):
    key, temp = dayTime.strftime('%Y-%m-%d %H'), 0
    if key in Temp:
        temp = Temp[key]
    else:
        temp = Temp[key.split(' ')[1]]
    param = pd.DataFrame([dayTime], columns=['ds'])
    param['temp'] = temp
    val = model.predict(param).to_dict()
    yhat = np.exp(float(val['yhat'][0]))
    yhat = round(yhat * min / 60, 2)
    data = {"dateTime": dayTime, "yhat": yhat}
    return data


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


def getTemp():
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
    return Temp


def getData(From, To):
    Temp = getTemp()
    data = []
    dayTime = From
    while True:
        if dayTime.replace(minute=0) == To.replace(minute=0):
            if (To - dayTime).seconds // 60 != 0:
                data.append(getEnergy(dayTime, Temp,
                                      (To - dayTime).seconds // 60))
            break
        elif dayTime != dayTime.replace(minute=0):
            newDate = dayTime.replace(minute=0) + timedelta(hours=1)
            data.append(getEnergy(dayTime, Temp,
                                  (newDate - dayTime).seconds // 60))
            dayTime = newDate
        else:
            data.append(getEnergy(dayTime, Temp))
            dayTime += timedelta(hours=1)
    return data


def predict():
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    data = getData(From, To)
    data = formatData(From, data)
    with open("./outputs/data.json", "w") as f:
        json.dump(data, f)
    print("Energy Prediction Completed Successfully!")
    return


def graph():
    import matplotlib.pyplot as plt
    # from matplotlib.dates import DateFormatter
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    data = getData(From, To)
    x, y = [], []
    x_ticks = []
    for i in data:
        x.append(i['dateTime'])
        x_ticks.append(i['dateTime'].strftime('%y-%m-%d %H:%M'))
        y.append(i['yhat'])
    # plt.figure(figsize=(11, 5))
    plt.xticks(x, x_ticks)
    fig, ax = plt.subplots(figsize=(11, 5))
    ax.plot(x, y)
    # plt.plot(x, y)
    plt.xlabel('DateTime')
    plt.ylabel('Predicted Value (kWh)')
    plt.title('Graphical Analysis')
    ax.xaxis_date()
    fig.autofmt_xdate()
    plt.savefig('./outputs/graph.png')
    plt.close()
    print("Graph plotted and saved!")
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
