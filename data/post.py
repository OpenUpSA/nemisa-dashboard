import requests
import json

hostname = "http://localhost:8000/api/responses/"
hostname = "https://k4i.openup.org.za"

headers = {"content-type": "application/json;charset=utf-8"}
for js in json.load(open("data.json")):
    #data = {"data": js}
    data = js
    r = requests.post(hostname, headers=headers, data=json.dumps(data))
    print(r.status_code)
