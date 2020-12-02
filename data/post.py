import requests
import json
import csv

url = 'http://localhost:8000/api/responses/'
# hostname = 'https://k4i.openup.org.za'
headers = {'content-type': 'application/json;charset=utf-8'}

def __post(survey, data):
    body = {
        'survey': survey,
        'data': data
    }
    r = requests.post(url, headers=headers, data=json.dumps(body))
    print(r.status_code)

def survey1():
    reader = csv.DictReader(open('Employees - cleaned.csv'))
    employees_data = [row for row in csv.DictReader(open('Employees - cleaned.csv'))]
    employees_js = [js for js in json.load(open('data.json'))]
    industries = {row['Sector']: row for row in csv.DictReader(open('Industry codes.csv'))}

    assert len(employees_js) == len(employees_data)

    for (raw_data, js) in zip(employees_data, employees_js):
        industry_code = raw_data['Industry code']
        industry = industries[industry_code]['Description']
        js['data']['Industry'] = industry
        __post(1, js['data'])

def survey2():
    with open('data-2.json') as file:
        records = json.load(file)
    for record in records:
        __post(2, record)

survey1()
survey2()
