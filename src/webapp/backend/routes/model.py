import sys
import pickle
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
import json


def predict(model):
    From = datetime.strptime(sys.argv[2] + " " + sys.argv[3], '%Y-%m-%d %H:%M')
    To = datetime.strptime(sys.argv[4] + " " + sys.argv[5], '%Y-%m-%d %H:%M')
    plist = []
    dayTime = From
    data = pd.DataFrame([dayTime], columns=['ds'])
    val = model.predict(data).to_dict()
    plist.append(
        {"date": str(dayTime.strftime('%Y-%m-%d')), "time": str(dayTime.strftime('%H:%M:%S')), "yhat": round(np.exp(val['yhat'][0]), 2)})
    dayTime = dayTime.replace(minute=0) + timedelta(hours=1)
    while dayTime <= To:
        data = pd.DataFrame([dayTime], columns=['ds'])
        val = model.predict(data).to_dict()
        plist.append(
            {"date": str(dayTime.strftime('%Y-%m-%d')), "time": str(dayTime.strftime('%H:%M:%S')), "yhat": round(np.exp(val['yhat'][0]), 2)})
        dayTime += timedelta(hours=1)
    if To != From and To.minute != 0:
        dayTime = To
        data = pd.DataFrame([dayTime], columns=['ds'])
        val = model.predict(data).to_dict()
        plist.append(
            {"date": str(dayTime.strftime('%Y-%m-%d')), "time": str(dayTime.strftime('%H:%M:%S')), "yhat": round(np.exp(val['yhat'][0]), 2)})
    with open("./models/plist.json", "w") as f:
        json.dump(plist, f)
    print("Energy Prediction Completed Successfully!")
    sys.stdout.flush()
    return


if __name__ == "__main__":
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
        if sys.argv[1] == "predict":
            predict(model)
