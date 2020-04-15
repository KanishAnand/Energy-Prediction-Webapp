import sys
import pickle
import pandas as pd


def predict(model):
    data = [[sys.argv[1] + " " + sys.argv[2]]]
    test = pd.DataFrame(data, columns=['ds'])
    val = model.predict(test).to_dict()
    print(str(round(val['yhat'][0], 2)))
    sys.stdout.flush()


if __name__ == "__main__":
    with open('./models/model.pkl', 'rb') as f:
        model = pickle.load(f)
        predict(model)
