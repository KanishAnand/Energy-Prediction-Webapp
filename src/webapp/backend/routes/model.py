import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json


def getEnergy(dayTime):
    param = pd.DataFrame([dayTime], columns=['ds'])
    val = model.predict(param).to_dict()
    data = {"dateTime": dayTime, "yhat": round(np.exp(val['yhat'][0]), 2)}
    return data


def formatData(From, To, data):
    output = []
    date = From
    value = 0
    for d in data:
        if date.strftime('%Y-%m-%d') == d['dateTime'].strftime('%Y-%m-%d'):
            value += int(d['yhat'])
        else:
            output.append({"date": date.strftime('%Y-%m-%d'),
                           "yhat": value})
            date += timedelta(days=1)
            value = int(d['yhat'])
    output.append({"date": date.strftime('%Y-%m-%d'),
                   "yhat": value})
    return output


def predict(model):
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    data = []
    dayTime = From
    data.append(getEnergy(dayTime))
    dayTime = dayTime.replace(minute=0) + timedelta(hours=1)
    while dayTime <= To:
        data.append(getEnergy(dayTime))
        dayTime += timedelta(hours=1)
    if To != From and To.minute != 0:
        dayTime = To
        data.append(getEnergy(dayTime))
    print(data)
    data = formatData(From, To, data)
    with open("./models/data.json", "w") as f:
        json.dump(data, f)
    print("Energy Prediction Completed Successfully!")
    sys.stdout.flush()
    return


if __name__ == "__main__":
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
        if sys.argv[1] == "predict":
            predict(model)
