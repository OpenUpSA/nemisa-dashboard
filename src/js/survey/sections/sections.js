import {Section} from './base';
import {SectionGeneral} from './general';
import {SectionDigitalDeployment} from './deployment';
import {SectionTechnologyUsed} from './technology_used';
import {SectionFutureTechnologies} from './future_technologies';
import {SectionSkillsSupply} from './skills_supply';
import {SectionSkillsSupport} from './skills_support';
import {SectionPerceivedRisk} from './risks';
import {SectionAttitudes} from './attitudes';


export const sections = {
    base: Section,
    general: SectionGeneral,
    digital_deployment: SectionDigitalDeployment,
    technology_used: SectionTechnologyUsed,
    future_technologies: SectionFutureTechnologies,
    skills_supply: SectionSkillsSupply,
    skills_support: SectionSkillsSupport,
    perceived_risk: SectionPerceivedRisk,
    attitudes: SectionAttitudes,
}