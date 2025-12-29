import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { blogPost } from './src/sanity/schemas/post'

export default defineConfig({
    name: 'default',
    title: 'DAF Portfolio',

    projectId: 'js6xvhgj',
    dataset: 'production',

    basePath: '/studio',

    plugins: [
        deskTool({
            name: 'desk',
        }),
    ],

    schema: {
        types: [blogPost],
    },
})
