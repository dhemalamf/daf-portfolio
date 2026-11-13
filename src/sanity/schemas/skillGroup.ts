import { defineType, defineField } from 'sanity'

export const skillGroup = defineType({
    name: 'skillGroup',
    title: 'Skill group',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().min(1),
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
