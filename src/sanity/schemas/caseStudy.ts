import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
    name: 'caseStudy',
    title: 'Case study',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().max(90),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'industry',
            title: 'Industry',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'period',
            title: 'Period',
            type: 'string',
            description: 'Display string, e.g. "2025".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'challenge',
            title: 'The challenge',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'process',
            title: 'The process',
            description: 'Ordered steps. The order is meaningful.',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'solution',
            title: 'The solution',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tradeOffs',
            title: 'The trade-offs',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'technicalHurdles',
            title: 'Technical complexity',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'retrospective',
            title: 'Retrospective',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'visual',
            title: 'Diagram type',
            description: 'Which wireframe placeholder or asset shape to show.',
            type: 'string',
            options: {
                list: [
                    { title: 'C4 container map', value: 'c4' },
                    { title: 'User flow', value: 'flow' },
                    { title: 'Product surface', value: 'dashboard' },
                    { title: 'State machine', value: 'state-machine' },
                ],
                layout: 'radio',
            },
            initialValue: 'flow',
        }),
        defineField({
            name: 'outcomes',
            title: 'Outcomes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'outcome',
                    fields: [
                        { name: 'metric', title: 'Metric', type: 'string', validation: (Rule) => Rule.required() },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                    preview: { select: { title: 'metric', subtitle: 'description' } },
                },
            ],
            validation: (Rule) => Rule.required().max(3),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'featured',
            title: 'Featured on the home page',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Order',
            description: 'Lower renders first on the site. Draft order here drives /work, home and related studies.',
            type: 'number',
            validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
            name: 'publishDate',
            title: 'Publish date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'articleUrl',
            title: 'External article URL',
            type: 'url',
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
        select: { title: 'title', subtitle: 'company' },
    },
})
