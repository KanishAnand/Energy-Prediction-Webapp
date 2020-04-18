import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json


def getEnergy(dayTime, min=60):
    param = pd.DataFrame([dayTime], columns=['ds'])
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


def getData(From, To):
    data = []
    dayTime = From
    while True:
        if dayTime.replace(minute=0) == To.replace(minute=0):
            if (To - dayTime).seconds // 60 != 0:
                data.append(getEnergy(dayTime, (To - dayTime).seconds // 60))
            break
        elif dayTime != dayTime.replace(minute=0):
            newDate = dayTime.replace(minute=0) + timedelta(hours=1)
            data.append(getEnergy(dayTime, (newDate - dayTime).seconds // 60))
            dayTime = newDate
        else:
            data.append(getEnergy(dayTime))
            dayTime += timedelta(hours=1)
    return data


def predict(model):
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    data = getData(From, To)
    data = formatData(From, data)
    with open("./outputs/data.json", "w") as f:
        json.dump(data, f)
    print("Energy Prediction Completed Successfully!")
    return


def graph(model):
    import matplotlib.pyplot as plt
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    data = getData(From, To)
    x, y = [], []
    x_ticks = []
    for i in data:
        x.append(i['dateTime'])
        x_ticks.append(i['dateTime'].strftime('%y-%m-%d %H:%M'))
        y.append(i['yhat'])
    plt.figure(figsize=(12, 5))
    plt.xticks(x, x_ticks)
    plt.plot(x, y)
    plt.xlabel('DateTime')
    plt.ylabel('Predicted Value')
    plt.title('Graphical Analysis')
    plt.savefig('./outputs/graph.png')
    plt.close()
    print("Graph plotted and saved!")
    return


if __name__ == "__main__":
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
        if sys.argv[1] == "predict":
            predict(model)
        elif sys.argv[1] == "graph":
            graph(model)
        else:
            print("Error: " + sys.argv[1] + " method not allowed!")
        sys.stdout.flush()
