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
        this.data = data;
        this.crossfilter = crossfilter(data);

        const dim = foo => {
            return this.crossfilter.dimension(el => foo(el))
        }

        this.dimensions = {
            gender: {label: "Gender", dimension: this.crossfilter.dimension(el => el["Gender"])},
            age: {label: "Age", dimension: this.crossfilter.dimension(el => {
                const yob = parseInt(el["Year of Birth"])
                if (yob)
                    return 2020 - yob
                return 0;
            })},
            industry: {label: "Industry", dimension: this.crossfilter.dimension(el => {
                let industry = el["Industry"]
                let trimmedIndustry = industry.substr(0, 40)
                if (trimmedIndustry < industry)
                    return trimmedIndustry + '...'
                return trimmedIndustry; 
            })},
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