// Public Sanity identifiers. Project IDs and dataset names are not secrets:
// they ship in the client bundle. The defaults keep local development working
// without a .env file; set the env vars to point the site at another project.

export const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'js6xvhgj'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const apiVersion = '2024-01-01'
