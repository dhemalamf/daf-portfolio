// Google Analytics event helpers. They no-op when gtag is unavailable (blocked
// scripts, SSR, or no measurement ID configured).

type EventParams = Record<string, string | number | boolean | undefined>

export const trackEvent = (eventName: string, eventParams?: EventParams) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams)
    }
}

export const trackButtonClick = (buttonName: string) => {
    trackEvent('button_click', { button_name: buttonName })
}

export const trackPageView = (url: string) => {
    trackEvent('page_view', { page_path: url })
}

export const trackCaseStudyView = (caseStudyTitle: string) => {
    trackEvent('case_study_view', { case_study: caseStudyTitle })
}

export const trackContactSubmit = (method: string) => {
    trackEvent('contact_submit', { method })
}

export const trackExternalLink = (url: string, linkName: string) => {
    trackEvent('external_link_click', { url, link_name: linkName })
}
