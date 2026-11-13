import { defineType, defineField } from 'sanity'

export const principle = defineType({
    name: 'principle',
    title: 'Principle',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            validation: (Rule) => Rule.required().integer().min(0),
        }),
    ],
    orderings: [
        {
            title: 'Display order',
            name: 'displayOrder',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: { title: 'title' },
    },
})
