import { ComponentType } from 'react'

export interface Activity {
    title: string
    description: string
    icon: ComponentType
    side?: 'left' | 'right'
}

export interface Project {
    title: string
    description: string
    imageUrl: string
    githubUrl?: string
    technologies: string[]
    status: 'completed' | 'ongoing' | 'planned'
}

export interface ResearchArea {
    icon: JSX.Element
    title: string
    description: string
}