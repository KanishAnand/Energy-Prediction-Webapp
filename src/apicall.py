import requests

URL = "http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial"

r = requests.get(url=URL)

data = r.json()

for ind in range(len(data['list'])):
    print(data['list'][ind]['dt_txt'])
    print(data['list'][ind]['main']['temp'])
    print('\n')
