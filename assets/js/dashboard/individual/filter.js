import crossfilter from 'crossfilter2';

export class Filter {
  constructor(data) {
    this.crossfilter = crossfilter(data);

    const dim = (foo) => {
      return this.crossfilter.dimension((el) => foo(el))
    };

    const multidim = (foo) => {
      return this.crossfilter.dimension((el) => foo(el), true)
    };

    this.dimensions = {
      gender: {
        label: 'Gender',
        dimension: dim((el) => el.gender)
      },
      age: {
        label: 'Age',
        dimension: dim((el) => {
          const yob = parseInt(el.year_of_birth, 10);
          if (yob) return 2020 - yob;
          return 0;
        })
      },
      province: {
        label: 'Province',
        dimension: dim((el) => el.province)
      },
      areaType: {
        label: 'Area Type',
        dimension: dim((el) => el.area_type)
      },
      educationLevel: {
        label: 'Education Level',
        dimension: dim((el) => el.education_level)
      },
      employmentStatus: {
        label: 'Employment Status',
        dimension: dim((el) => el.employment_status)
      },
      mobileDataMonthlySpend: {
        label: 'Mobile Data Monthly Spend',
        dimension: dim((el) => el.mobile_data_monthly_spend)
      },
      participateFutureConsent: {
        label: 'Consent To Participate Again',
        dimension: dim((el) => el.participate_future_consent)
      },
      accessHome: {
        label: 'Home Internet Access',
        dimension: dim((el) => el.access_home)
      },
      accessFree: {
        label: 'Free Internet Access',
        dimension: dim((el) => el.access_free)
      },
      accessLocation: {
        label: 'Internet Access Location',
        dimension: multidim((el) => el.access_location)
      },
      internetUsage: {
        label: 'Internet Usage',
        dimension: multidim((el) => el.internet_usage)
      },
      benefits: {
        label: 'ICT/Internet Benefits',
        dimension: multidim((el) => el.benefits)
      },
      visitedGovWebsite: {
        label: 'Visited Government Website',
        dimension: dim((el) => el.visited_gov_website)
      },
      servicesCompleted: {
        label: 'Government Web Services Completed',
        dimension: multidim((el) => el.services_completed)
      },
      completionSuccess: {
        label: 'Services Successfully Completed',
        dimension: dim((el) => el.completion_success)
      },
      howOftenOfficialsRespond: {
        label: 'How Often Officials Respond',
        dimension: dim((el) => el.how_often_officials_respond)
      },
      howOftenSatisfiedWithResponse: {
        label: 'How Often Satisfied With Response',
        dimension: dim((el) => el.how_often_satisfied_with_response)
      },
      trustGovWebApp: {
        label: 'Trust Government Website',
        dimension: dim((el) => el.trust_gov_website_or_apps)
      },
      homeLang: {
        label: 'Government Website Should Be Available in Home Language',
        dimension: dim((el) => el.home_lang)
      },
    };
  }

  groupAll() {
    return this.crossfilter.groupAll();
  }

  total() {
    return this.crossfilter.all().length;
  }

  count() {
    return this.crossfilter.allFiltered().length;
  }
}
