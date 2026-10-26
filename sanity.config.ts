import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { blogPost } from './src/sanity/schemas/post'
import { projectId, dataset } from './src/sanity/client'

export default defineConfig({
    name: 'default',
    title: `DAF Portfolio${dataset !== 'production' ? ` (${dataset})` : ''}`,

    projectId,
    dataset,

    basePath: '/studio',

    plugins: [
        structureTool(),
    ],

    schema: {
        types: [blogPost],
    },
})
