// Public runtime configuration. These values are not secrets: they ship in the
// client bundle. Env vars let forks point the site at their own project; the
// defaults keep local development working without a .env file.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhema.me'

export const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-CN20Z12C8C'
