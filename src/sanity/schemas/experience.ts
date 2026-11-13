import { defineType, defineField } from 'sanity'

export const experience = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Square PNG or SVG. Rendered at 36px on a white tile.',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'period',
            title: 'Period',
            type: 'string',
            description: 'Display string, e.g. "Jan 2026 – present".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            description: 'e.g. "Fintech Startup | Hybrid".',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'industries',
            title: 'Industries',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'order',
            title: 'Order',
            description: 'Lower renders first. Most recent role is usually 0.',
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
        select: { title: 'company', subtitle: 'role', media: 'logo' },
    },
})
