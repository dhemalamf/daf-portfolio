import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blogPost],
}
