import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './post'
import { caseStudy } from './caseStudy'
import { experience } from './experience'
import { certification } from './certification'
import { skillGroup } from './skillGroup'
import { impactMetric } from './impactMetric'
import { operatingStance } from './operatingStance'
import { principle } from './principle'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        blogPost,
        caseStudy,
        experience,
        certification,
        skillGroup,
        impactMetric,
        operatingStance,
        principle,
    ],
}
