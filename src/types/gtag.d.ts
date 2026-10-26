export {}

declare global {
    interface Window {
        /** Google Analytics gtag.js queue function, present after the script loads. */
        gtag?: (command: string, ...args: unknown[]) => void
        dataLayer?: unknown[]
    }
}
