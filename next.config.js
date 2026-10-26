const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'

// Deliberately allows inline scripts/styles because Next's bootstrap and the
// Sanity Studio both rely on them. The policy still pins network origins.
const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://*.sanity.io`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
    "font-src 'self' data:",
    "connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
    "worker-src 'self' blob:",
    "frame-src 'self' https://*.sanity.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
]
if (!isDev) contentSecurityPolicy.push('upgrade-insecure-requests')

const securityHeaders = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy.join('; ') },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ...(isDev
        ? []
        : [
              {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
              },
          ]),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // Linting runs as its own CI step (npm run lint) with the ESLint CLI.
    eslint: { ignoreDuringBuilds: true },
    outputFileTracingRoot: path.join(__dirname),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }]
    },
}

module.exports = nextConfig
