import { Metadata } from 'next'
import { profile } from '@/data/profile'
import { trackButtonClick } from '@/lib/analytics'

export const metadata: Metadata = {
    title: "Contact | Dhema'alam Fajrianto",
    description: 'Get in touch with Dhema for product management opportunities and collaboration.',
}

export default function ContactPage() {
    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="section-container">
                {/* Header - Centered */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
                        Contact
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Whether you have an exciting product role, a collaboration idea, or just want to chat about product management — I&apos;d love to hear from you.
                    </p>
                </div>

                {/* Contact Cards - Bento Layout */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-5xl mx-auto mb-12">
                    {/* Email - Top Left (spans 3 cols on desktop) */}
                    <a
                        href={`mailto:${profile.email}`}
                        className="group p-6 bg-muted/50 border border-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center md:col-span-3"
                    >
                        <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                            <svg className="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-400 transition-colors">Email</h3>
                        <p className="text-muted-foreground text-sm">{profile.email}</p>
                    </a>

                    {/* WhatsApp - Top Right (spans 3 cols on desktop, full width on mobile) */}
                    <a
                        href={profile.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-muted/50 border border-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center col-span-2 md:col-span-3"
                    >
                        <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                            <svg className="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-400 transition-colors">WhatsApp</h3>
                        <p className="text-muted-foreground text-sm">Send a message</p>
                    </a>

                    {/* LinkedIn - Bottom Left (spans 2 cols on desktop) */}
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-muted/50 border border-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center md:col-span-2"
                    >
                        <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                            <svg className="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-400 transition-colors">LinkedIn</h3>
                        <p className="text-muted-foreground text-sm">Connect with me</p>
                    </a>

                    {/* GitHub - Bottom Center (spans 2 cols on desktop) */}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-muted/50 border border-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center md:col-span-2"
                    >
                        <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                            <svg className="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-400 transition-colors">GitHub</h3>
                        <p className="text-muted-foreground text-sm">View my code</p>
                    </a>

                    {/* Twitter - Bottom Right (spans 2 cols on desktop) */}
                    <a
                        href={profile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-muted/50 border border-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center col-span-2 md:col-span-2"
                    >
                        <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                            <svg className="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-400 transition-colors">Twitter</h3>
                        <p className="text-muted-foreground text-sm">Follow me</p>
                    </a>
                </div>

                {/* Resume Button */}
                <div className="text-center mb-12">
                    <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackButtonClick('contact_view_resume')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View My Resume
                    </a>
                </div>

                {/* Availability Note - Centered */}
                <div className="max-w-md mx-auto p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-semibold">Open to collaboration</span>
                    </div>
                    <p className="text-muted-foreground">
                        Currently exploring new product management roles and consulting opportunities.
                    </p>
                </div>
            </div>
        </div>
    )
}

