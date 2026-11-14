import type { CaseStudyVisual } from '@/data/caseStudies'

const labels: Record<CaseStudyVisual, string> = {
    c4: 'C4 container map',
    flow: 'User flow',
    dashboard: 'Product surface',
    'state-machine': 'State machine',
}

/**
 * Neutral diagram placeholder for case-study visuals. Replace with a sanitized
 * screenshot or diagram when the real asset is ready; the layout slot should
 * not change.
 */
export default function WireframePlaceholder({
    variant,
    className = '',
}: {
    variant: CaseStudyVisual
    className?: string
}) {
    return (
        <figure className={`flex flex-col ${className}`}>
            <div className="w-full border border-foreground/20 bg-foreground/[0.03] px-4 py-3">
                <svg
                    viewBox="0 0 400 200"
                    className="w-full h-auto text-foreground/60"
                    role="img"
                    aria-label={`Wireframe placeholder: ${labels[variant]}`}
                >
                    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        {variant === 'c4' && <C4 />}
                        {variant === 'flow' && <Flow />}
                        {variant === 'dashboard' && <Dashboard />}
                        {variant === 'state-machine' && <StateMachine />}
                    </g>
                </svg>
            </div>
            <figcaption className="mono-label text-foreground/60 mt-3">
                {labels[variant]} · placeholder
            </figcaption>
        </figure>
    )
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
    return (
        <text
            x={x}
            y={y}
            fill="currentColor"
            stroke="none"
            fontSize="8"
            fontFamily="inherit"
            textAnchor="middle"
        >
            {children}
        </text>
    )
}

function C4() {
    return (
        <>
            <rect x="8" y="18" width="384" height="164" rx="2" />
            <rect x="46" y="62" width="86" height="52" rx="2" />
            <rect x="157" y="62" width="86" height="52" rx="2" />
            <rect x="268" y="62" width="86" height="52" rx="2" />
            <Label x={89} y={92}>Web app</Label>
            <Label x={200} y={92}>API</Label>
            <Label x={311} y={92}>Database</Label>
            <path d="M132 88h25" />
            <path d="M150 84l7 4-7 4" />
            <path d="M243 88h25" />
            <path d="M261 84l7 4-7 4" />
            <Label x={200} y={34}>System boundary</Label>
        </>
    )
}

function Flow() {
    return (
        <>
            <rect x="20" y="76" width="76" height="44" rx="2" />
            <rect x="120" y="76" width="76" height="44" rx="2" />
            <rect x="220" y="76" width="76" height="44" rx="2" />
            <rect x="320" y="76" width="60" height="44" rx="2" />
            <Label x={58} y={102}>Entry</Label>
            <Label x={158} y={102}>Verify</Label>
            <Label x={258} y={102}>Review</Label>
            <Label x={350} y={102}>Done</Label>
            <path d="M96 98h24" />
            <path d="M113 94l7 4-7 4" />
            <path d="M196 98h24" />
            <path d="M213 94l7 4-7 4" />
            <path d="M296 98h24" />
            <path d="M313 94l7 4-7 4" />
            <path d="M158 120v34h60" strokeDasharray="3 4" />
            <Label x={158} y={172}>Fallback path</Label>
        </>
    )
}

function Dashboard() {
    return (
        <>
            <rect x="8" y="18" width="56" height="164" rx="2" />
            <rect x="72" y="18" width="320" height="26" rx="2" />
            <rect x="72" y="56" width="96" height="40" rx="2" />
            <rect x="180" y="56" width="96" height="40" rx="2" />
            <rect x="288" y="56" width="104" height="40" rx="2" />
            <rect x="72" y="108" width="200" height="74" rx="2" />
            <rect x="284" y="108" width="108" height="74" rx="2" />
            <path d="M84 168v-28M104 168v-16M124 168v-36M144 168v-22M164 168v-30" />
            <path d="M296 126h84M296 142h84M296 158h60" />
            <Label x={120} y={80}>KPI</Label>
            <Label x={228} y={80}>KPI</Label>
            <Label x={340} y={80}>KPI</Label>
            <Label x={172} y={126}>Chart</Label>
            <Label x={338} y={126}>Table</Label>
        </>
    )
}

function StateMachine() {
    return (
        <>
            <rect x="46" y="34" width="112" height="40" rx="2" />
            <rect x="242" y="34" width="112" height="40" rx="2" />
            <rect x="242" y="126" width="112" height="40" rx="2" />
            <rect x="46" y="126" width="112" height="40" rx="2" />
            <Label x={102} y={58}>Created</Label>
            <Label x={298} y={58}>Verified</Label>
            <Label x={298} y={150}>Authorized</Label>
            <Label x={102} y={150}>Settled</Label>
            <path d="M158 54h70" />
            <path d="M221 50l7 4-7 4" />
            <path d="M298 74v38" />
            <path d="M294 105l4 7 4-7" />
            <path d="M242 146h-70" />
            <path d="M179 142l-7 4 7 4" />
            <path d="M102 126v-38" />
            <path d="M98 95l4-7 4 7" />
            <circle cx="28" cy="54" r="4" />
            <path d="M32 54h10" />
        </>
    )
}
