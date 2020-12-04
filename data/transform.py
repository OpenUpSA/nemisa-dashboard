import json
import csv

NO_YES = {
    '': '_null',
    '0': 'No',
    '1': 'Yes'
}

GENDER = {
    '1': 'Male',
    '2': 'Female',
    '3': 'Transgender',
    '4': 'Other'
}

ACCESS_LOCATION = {
    '1': 'School/Campus',
    '2': 'Work',
    '3': 'Community Centre',
    '4': 'Library',
    '5': 'Public spaces e.g. restaurant',
    '6': 'Other',
    '7': 'Not Applicable'
}

PROVINCE = {
    '1': 'Eastern Cape',
    '2': 'Free State',
    '3': 'Gauteng',
    '4': 'KZN',
    '5': 'Limpopo',
    '6': 'mpumalanga',
    '7': 'North West',
    '8': 'Northern Cape',
    '9': 'Western Cape'
}

AREA_TYPE = {
    '1': 'Urban Area',
    '2': 'Peri-Urban Area',
    '3': 'Rural Area'
}

EDUCATION = {
    '1': 'Pre-Matric / Pre-Grade 12 / Pre-Standard 10',
    '2': 'Matric / Grade 12 / Standard 10',
    '3': 'Certificate',
    '4': 'Diploma',
    '5': 'Undergraduate / Bachelors / BTech Degree',
    '6': 'Post Graduate Qualification',
    '7': 'Other'
}

EMPLOYMENT_STATUS = {
    '1': 'Unable to work',
    '2': 'Unemployed',
    '3': 'Employed Full Time - Permmanent/Contract/Temp',
    '4': 'Employed Part Time - Permmanent/Contract/Temp',
    '5': 'Self-employed / Business owner',
    '6': 'Student/Scholar',
    '7': 'Retired/Pensioner',
    '8': 'Other'
}

FREQUENCY = {
    '1': 'Always',
    '2': 'Often',
    '3': 'Half the time',
    '4': 'Rarely',
    '5': 'Never'
}

MOBILE_DATA_SPEND = {
    '0': 'R0',
    '1': 'R0',
    '2': 'R1-R50',
    '3': 'R51-R100',
    '4': 'R101-R150',
    '5': 'R151-R200',
    '6': '>R200'
}

def survey2(in_path, out_path):
    reader = csv.DictReader(open(in_path))
    out = []
    for row in reader:

        access_location = []
        if row['Q5. If you said \"yes\" above then  indicate where you obtain free access? :  School/Campus'] == '1':
            access_location.append('School/Campus')
        if row['Work'] == '1':
            access_location.append('Work')
        if row['Community Centre'] == '1':
            access_location.append('Community Centre')
        if row['Library'] == '1':
            access_location.append('Library')
        if row['Public Spaces'] == '1':
            access_location.append('Public spaces e.g. restaurant')
        if row['Other'] == '1':
            access_location.append('Other')

        internet_usage = []
        if row['Q1. What do you use the internet for? Entertainment'] == '1':
            internet_usage.append('Entertainment')
        if row['Search for Jobs'] == '1':
            internet_usage.append('Search for jobs')
        if row['Search for information'] == '1':
            internet_usage.append('Search for information')
        if row['To search for busiiness opportunities'] == '1':
            internet_usage.append('Search for business opportunities')
        if row['To complete online training courses'] == '1':
            internet_usage.append('Complete online training/courses')
        if row['To keep in touch with others'] == '1':
            internet_usage.append('Keep in touch with others')
        if row['Online banking'] == '1':
            internet_usage.append('Online banking')
        if row['Online Shopping'] == '1':
            internet_usage.append('Online shopping')
        if row['Paying bills'] == '1':
            internet_usage.append('Paying bills')

        benefits = []
        if row['Q1. What do you use the internet for?Improve /increase your income'] == '1':
            benefits.append('Improve/increase your income')
        if row['feel more included in the society'] == '1':
            benefits.append('Feel more included in the society')
        if row['feel more included in the economy'] == '1':
            benefits.append('Feel more included in the economy')
        if row['Find employment'] == '1':
            benefits.append('Find employment')
        if row['Prepare for employment'] == '1':
            benefits.append('Prepare for employment')
        if row['Increase confidence'] == '1':
            benefits.append('Increased confidence')
        if row['Access to information'] == '1':
            benefits.append('Access to information')
        if row['I save money'] == '1':
            benefits.append('I save money e.g. transportation costs')
        if row['Other specify'] == '1':
            benefits.append('Other')

        services_completed = []
        if row[' Q3.Which of the following services have you completed online?Applied for a government service'] == '1':
            services_completed.append('Applied for a government service')
        if row['Log a query regarding government service'] == '1':
            services_completed.append('Log a query regarding government service')
        if row['Pay for a service e.g.Municipal bills'] == '1':
            services_completed.append('Pay for a service e.g. Municipal Bill')
        if row['Other - Specify'] == '1':
            services_completed.append('Other')

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
