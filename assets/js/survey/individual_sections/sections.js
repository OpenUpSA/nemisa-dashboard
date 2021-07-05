import { Section } from './base';
import { SectionDemographics } from './demographics';
import { SectionAccess } from './access';
import { SectionAwareness } from './awareness';
import { SectionBenefits } from './benefits';
import { SectionG2c } from './g2c';

export const sections = {
  base: Section,
  demographics: SectionDemographics,
  access: SectionAccess,
  awareness: SectionAwareness,
  benefits: SectionBenefits,
  g2c: SectionG2c,
};
