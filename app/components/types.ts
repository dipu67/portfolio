import {
  Globe,
  Server,
  Database,
  Code,
  Calendar,
  CheckCircle,
  Users,
  Award,
} from 'lucide-react'

// Icon mapping for dynamic icons
export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Server,
  Database,
  Code,
  Calendar,
  CheckCircle,
  Users,
  Award,
}

export interface PortfolioData {
  personal: any
  about: any
  stats: any[]
  skills: any[]
  projects: any[]
  testimonials: any[]
}
