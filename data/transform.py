import json
import csv

NO_YES = {
    '': '_null',
    '0': 'no',
    '1': 'yes'
}

GENDER = {
    '1': 'male',
    '2': 'female',
    '3': 'trans',
    '4': 'other'
}

ACCESS_LOCATION = {
    '1': 'school',
    '2': 'work',
    '3': 'community',
    '4': 'library',
    '5': 'public',
    '6': 'other',
    '7': 'na'
}

PROVINCE = {
    '1': 'ec',
    '2': 'fs',
    '3': 'gauteng',
    '4': 'kzn',
    '5': 'limpop',
    '6': 'mpumalanga',
    '7': 'nw',
    '8': 'nc',
    '9': 'wc'
}

AREA_TYPE = {
    '1': 'urban',
    '2': 'peri_urban',
    '3': 'rural'
}

EDUCATION = {
    '1': 'pre_matric',
    '2': 'matric',
    '3': 'certificate',
    '4': 'diploma',
    '5': 'degree',
    '6': 'postgrad',
    '7': 'other'
}

EMPLOYMENT_STATUS = {
    '1': 'unable',
    '2': 'unemployed',
    '3': 'fulltime',
    '4': 'parttime',
    '5': 'self',
    '6': 'student',
    '7': 'retired',
    '8': 'other'
}

FREQUENCY = {
    '1': 'always',
    '2': 'often',
    '3': 'half',
    '4': 'rarely',
    '5': 'never'
}

MOBILE_DATA_SPEND = {
    '0': '_null',
    '1': '0',
    '2': '1-50',
    '3': '51-100',
    '4': '101-150',
    '5': '151-200',
    '6': '>200'
}

def survey2(in_path, out_path):
    reader = csv.DictReader(open(in_path))
    out = []
    for row in reader:

        access_location = []
        if row['Q5. If you said \"yes\" above then  indicate where you obtain free access? :  School/Campus'] == '1':
            access_location.append('school')
        if row['Work'] == '1':
            access_location.append('work')
        if row['Community Centre'] == '1':
            access_location.append('community_centre')
        if row['Library'] == '1':
            access_location.append('library')
        if row['Public Spaces'] == '1':
            access_location.append('public_spaces')
        if row['Other'] == '1':
            access_location.append('other')

        internet_usage = []
        if row['Q1. What do you use the internet for? Entertainment'] == '1':
            internet_usage.append('entertainment')
        if row['Search for Jobs'] == '1':
            internet_usage.append('search_jobs')
        if row['Search for information'] == '1':
            internet_usage.append('search_information')
        if row['To search for busiiness opportunities'] == '1':
            internet_usage.append('search_business_op')
        if row['To complete online training courses'] == '1':
            internet_usage.append('training')
        if row['To keep in touch with others'] == '1':
            internet_usage.append('keep_in_touch')
        if row['Online banking'] == '1':
            internet_usage.append('banking')
        if row['Online Shopping'] == '1':
            internet_usage.append('shopping')
        if row['Paying bills'] == '1':
            internet_usage.append('paying_bills')

        benefits = []
        if row['Q1. What do you use the internet for?Improve /increase your income'] == '1':
            benefits.append('increase_income')
        if row['feel more included in the society'] == '1':
            benefits.append('feel_included_society')
        if row['feel more included in the economy'] == '1':
            benefits.append('feel_included_economy')
        if row['Find employment'] == '1':
            benefits.append('find_employment')
        if row['Prepare for employment'] == '1':
            benefits.append('prepare_for_employment')
        if row['Increase confidence'] == '1':
            benefits.append('increase_confidence')
        if row['Access to information'] == '1':
            benefits.append('access_information')
        if row['I save money'] == '1':
            benefits.append('save_money')
        if row['Other specify'] == '1':
            benefits.append('other')

        services_completed = []
        if row[' Q3.Which of the following services have you completed online?Applied for a government service'] == '1':
            services_completed.append('applied_for_service')
        if row['Log a query regarding government service'] == '1':
            services_completed.append('log_query')
        if row['Pay for a service e.g.Municipal bills'] == '1':
            services_completed.append('pay_bill')
        if row['Other - Specify'] == '1':
            services_completed.append('other')

        out.append({
            'gender': GENDER[row['Q1. What is your Gender']],
            'year_of_birth': row['Q2. In what year were you born?'],
            'province': PROVINCE[row['Q5. Province of Residence  in South Africa (choose only one)']],
            'area_type': AREA_TYPE[row['Q7. Which of the following would you consider to be applicable to the area where you live. Choose one option:']],
            'education_level': EDUCATION[row['Q8. Highest Education Mark only one oval.']],
            'employment_status': EMPLOYMENT_STATUS[row['Q10. What is your current employment status?Mark only one oval.']],
            'mobile_data_monthly_spend': MOBILE_DATA_SPEND[row['Q19. Estimate how much do you spend on mobile  data per month']],
            'participate_future_consent': NO_YES[row['Q23. May we contact you again in future e.g to participate in other research studies?']],
            'access_home': NO_YES[row['Q3.Do you have access to the internet at home']],
            'access_free': NO_YES[row['Q4. Do you have access to free internet ']],
            'access_location': access_location,
            'internet_usage': internet_usage,
            'benefits': benefits,
            'visited_gov_website': NO_YES[row['Q1. Have you visited any government website before?']],
            'services_completed': services_completed,
            'completion_success': FREQUENCY[row['Q8. How often do you successfully complete what you have tried to do on a government website (e.g. resolve a query, apply for services) ?']],
            'how_often_officials_respond': FREQUENCY[row['Q9. How often do government officials/departments that you interact with on social networking sites respond to your communication?']],
            'how_often_satisfied_with_response': FREQUENCY[row['Q10. How often have you been satisfied with the responses you received from government officials/departments']],
            'trust_gov_website_or_apps': NO_YES[row['Q11. Do you trust government websites or apps? ']],
            'home_lang': NO_YES[row['Q12. Do you believe government websites and apps should be available in your home language?']]
        })
    with open(out_path, 'w') as file:
        json.dump(out, file, indent=2)

survey2('Consolidated Data - Citizen Level (Dashboard) - CLUSTER 1, 2 and 3 .csv', 'data-2.json')
