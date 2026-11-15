import { defineType, defineField } from 'sanity'

export const operatingStance = defineType({
    name: 'operatingStance',
    title: 'Operating stance',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
            name: 'stance',
            title: 'Stance',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'examples',
            title: 'Concrete proofs',
            description:
                'Two checkable examples, each tied to a named piece of work. No invented numbers.',
            type: 'array',
            of: [{ type: 'text', rows: 3 }],
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
