'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    return (
        <div className="pt-16" style={{ height: 'calc(100vh - 4rem)' }}>
            <NextStudio config={config} />
        </div>
    )
}
