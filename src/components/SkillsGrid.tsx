import { skills } from '@/data/profile'

export default function SkillsGrid() {
    const skillCategories = [
        { title: 'Product Management', items: skills.productManagement, icon: '🎯' },
        { title: 'Technical Skills', items: skills.technical, icon: '⚙️' },
        { title: 'Domain Expertise', items: skills.domains, icon: '🌐' },
        { title: 'Tools & Platforms', items: skills.tools, icon: '🛠️' },
    ]

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
                <div key={index} className="glass-card p-6 md:p-8 hover-lift">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-lg font-bold">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIndex) => (
                            <span
                                key={skillIndex}
                                className="px-3 py-1.5 bg-muted/50 text-muted-foreground text-sm rounded-lg hover:bg-accent/20 hover:text-accent transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
