import { defineType, defineField } from 'sanity'

export const certification = defineType({
    name: 'certification',
    title: 'Certification',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'issuer',
            title: 'Issuer',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'issuedDate',
            title: 'Issued',
            type: 'string',
            description: 'Display string, e.g. "Dec 2022".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'credentialUrl',
            title: 'Credential URL',
            type: 'url',
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
        select: { title: 'name', subtitle: 'issuer' },
    },
})
