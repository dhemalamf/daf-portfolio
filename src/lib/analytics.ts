// Google Analytics event tracking utilities

export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams)
    }
}

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
    trackEvent('button_click', {
        button_name: buttonName,
    })
}

// Track page views
export const trackPageView = (url: string) => {
    trackEvent('page_view', {
        page_path: url,
    })
}

// Track case study views
export const trackCaseStudyView = (caseStudyTitle: string) => {
    trackEvent('case_study_view', {
        case_study: caseStudyTitle,
    })
}

// Track contact form submissions
export const trackContactSubmit = (method: string) => {
    trackEvent('contact_submit', {
        method: method, // e.g., 'email', 'linkedin', 'whatsapp'
    })
}

// Track external link clicks
export const trackExternalLink = (url: string, linkName: string) => {
    trackEvent('external_link_click', {
        url: url,
        link_name: linkName,
    })
}
