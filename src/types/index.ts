export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  impact?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  content: {
    context: string;
    problem: string;
    solution: string;
    outcome: string;
  };
  image?: string;
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  logo?: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface SiteConfig {
  name: string;
  role: string;
  bio: string;
  socials: {
    linkedin: string;
    email: string;
    resume?: string;
  };
}
