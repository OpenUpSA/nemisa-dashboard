import requests
import json
import csv

hostname = "http://localhost:8000/api/responses/"
# hostname = "https://k4i.openup.org.za"

reader = csv.DictReader(open("Employees - cleaned.csv"))
employees_data = [row for row in csv.DictReader(open("Employees - cleaned.csv"))]
employees_js = [js for js in json.load(open("data.json"))]
industries = {row["Sector"]: row for row in csv.DictReader(open("Industry codes.csv"))}

assert len(employees_js) == len(employees_data)

headers = {"content-type": "application/json;charset=utf-8"}
for (raw_data, js) in zip(employees_data, employees_js):
    industry_code = raw_data["Industry code"]
    industry = industries[industry_code]["Description"]
    js["data"]["Industry"] = industry
    #data = {"data": js}
    data = js
    r = requests.post(hostname, headers=headers, data=json.dumps(data))
    print(r.status_code)
