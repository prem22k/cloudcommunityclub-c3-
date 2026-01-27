export interface Project {
    description: string
    status: string
    tech_stack: string[]
    difficulty: string
    thumbnail?: string
}

export interface ProjectCategory {
    [key: string]: Project
}

export interface Projects {
    [category: string]: ProjectCategory
}

export const projects: Projects = {
    "Cloud Infrastructure": {
        "AWS Cloud Lab": {
            description: "Hands-on AWS infrastructure deployment and management",
            status: "Coming Soon",
            tech_stack: ["AWS", "Terraform", "Docker"],
            difficulty: "Intermediate",
            thumbnail: "/assets/projects/aws-lab.webp"
        },
        "Multi-Cloud Monitoring": {
            description: "Building a monitoring solution across multiple cloud providers",
            status: "Coming Soon",
            tech_stack: ["AWS", "Azure", "GCP", "Grafana", "Prometheus"],
            difficulty: "Advanced",
            thumbnail: "/assets/projects/monitoring.webp"
        }
    },
    "DevOps & Automation": {
        "CI/CD Pipeline Workshop": {
            description: "Building modern CI/CD pipelines with GitHub Actions",
            status: "Coming Soon",
            tech_stack: ["GitHub Actions", "Docker", "Node.js"],
            difficulty: "Beginner",
            thumbnail: "/assets/projects/cicd.webp"
        },
        "Infrastructure as Code": {
            description: "Automating cloud infrastructure with Terraform",
            status: "Coming Soon",
            tech_stack: ["Terraform", "AWS", "Python"],
            difficulty: "Intermediate",
            thumbnail: "/assets/projects/iac.webp"
        }
    },
    "Cloud Native Apps": {
        "Microservices Demo": {
            description: "Building and deploying microservices on Kubernetes",
            status: "Coming Soon",
            tech_stack: ["Kubernetes", "Docker", "Go"],
            difficulty: "Advanced",
            thumbnail: "/assets/projects/microservices.webp"
        },
        "Serverless API": {
            description: "Creating serverless APIs with AWS Lambda",
            status: "Coming Soon",
            tech_stack: ["AWS Lambda", "API Gateway", "DynamoDB"],
            difficulty: "Intermediate",
            thumbnail: "/assets/projects/serverless.webp"
        }
    },
    "Cloud Security": {
        "Security Best Practices": {
            description: "Implementing cloud security best practices and compliance",
            status: "Coming Soon",
            tech_stack: ["AWS IAM", "Azure AD", "Security Groups"],
            difficulty: "Intermediate",
            thumbnail: "/assets/projects/security.webp"
        },
        "Zero Trust Architecture": {
            description: "Building a zero trust architecture in the cloud",
            status: "Coming Soon",
            tech_stack: ["AWS", "Azure", "Identity Management"],
            difficulty: "Advanced",
            thumbnail: "/assets/projects/zero-trust.webp"
        }
    }
}

// Helper functions
export const getAllProjects = (): [string, Project][] => {
    const allProjects: [string, Project][] = []
    Object.entries(projects).forEach(([category, categoryProjects]) => {
        Object.entries(categoryProjects).forEach(([name, project]) => {
            allProjects.push([name, project])
        })
    })
    return allProjects
}

export const getProjectByName = (name: string): Project | undefined => {
    const allProjects = getAllProjects()
    const project = allProjects.find(([projectName]) => projectName === name)
    return project ? project[1] : undefined
}

export const PROJECT_CATEGORIES = Object.keys(projects)

export default projects