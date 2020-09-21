import requests
import json

headers = {"content-type": "application/json;charset=utf-8"}
for js in json.load(open("data.json")):
    data = {"data": js}
    r = requests.post("http://localhost:8000/api/responses/", headers=headers, data=json.dumps(data))
    print(r.status_code)
