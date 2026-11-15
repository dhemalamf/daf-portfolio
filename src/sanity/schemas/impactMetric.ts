import { defineType, defineField } from 'sanity'

export const impactMetric = defineType({
    name: 'impactMetric',
    title: 'Impact metric',
    type: 'document',
    fields: [
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'Display string, e.g. "Rp 2T+". Rendered in monospace.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'href',
            title: 'Link',
            type: 'url',
            description:
                'Optional. Set when the label should link somewhere, e.g. an independent project.',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
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
        select: { title: 'value', subtitle: 'label' },
    },
})
