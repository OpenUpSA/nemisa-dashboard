import crossfilter from 'crossfilter2';
import {
    skillsExternalTraining,
    mostUsedSkill,
    skillsLearning,
    currentTech,
    futureTech,
    perceivedRisk,
    attitudes,
} from '../strings';

function usesSkill(key) {
    const values = {
        "Half the time": 1,
        "Often": 1,
        "Always": 1
    }

    const val = values[key];

    if (val == undefined)
        return 0;
    return val;
}

function yesNo(key) {
    const values = {
        "Yes": 1
    }

    const val = values[key];

    if (val == undefined)
        return 0
    return val
}

function agreeDisagree(key) {
    const values = {
        "Agree": 1,
        "Strongly Agree": 1
    }

    const val = values[key];

    if (val == undefined)
        return 0
    return val
}

export class Filter {
    constructor(data) {
        this.crossfilter = crossfilter(data);
        debugger

        const dim = foo => {
            return this.crossfilter.dimension(el => foo(el))
        }

        this.dimensions = {
            gender: {label: "Gender", dimension: this.crossfilter.dimension(el => el["gender"])},
            age: {label: "Age", dimension: this.crossfilter.dimension(el => {
                const yob = parseInt(el["year_of_birth"])
                if (yob)
                    return 2020 - yob
                return 0;
            })},
            industry: {label: "Industry", dimension: this.crossfilter.dimension(el => el['industry'])},
            province: {
              label: 'Province',
              dimension: this.crossfilter.dimension(el => {
                let province = el['province'] || 'N/A'
                return province
              })
            },
            areaType: {
              label: 'Area Type',
              dimension: this.crossfilter.dimension(el => {
                let areaType = el['area_type'] || 'N/A'
                return areaType
              })
            },
            educationLevel: {
              label: 'Education Level',
              dimension: this.crossfilter.dimension(el => {
                let education = el['education_level'] || 'N/A'
                return education
              })
            },
            employmentStatus: {
              label: 'Employment Status',
              dimension: this.crossfilter.dimension(el => {
                let employment = el['employment_status'] || 'N/A'
                return employment
              })
            },
            mostUsedSkill: mostUsedSkill.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => usesSkill(el[skill.key]))

                })
            }),
            learntSkills: skillsLearning.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => yesNo(el[skill.key]))
                })
            }),
            currentTech: currentTech.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => yesNo(el[skill.key]))
                })
            }),
            futureTech: futureTech.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => yesNo(el[skill.key]))
                })
            }),
            perceivedRisk: perceivedRisk.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => agreeDisagree(el[skill.key]))
                })
            }),
            attitudes: attitudes.map(skill => {
                return ({
                    "label": skill.label,
                    "dimension": dim(el => agreeDisagree(el[skill.key]))
                })
            }),
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
