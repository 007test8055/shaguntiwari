import { Project, Experience, HeroContent, SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  name: "Shagun Tiwari",
  role: "Product Manager",
  bio: "Product Manager shaping user-centered decisions into shipped outcomes with clarity and impact.",
  url: "https://shaguntiwari.vercel.app/",
  socials: {
    linkedin: "https://www.linkedin.com/in/shagun06",
    email: "shaguntiwari0611@gmail.com",
    resume: "/resume.pdf",
    medium: "https://medium.com/@shaguntiwari0611",
  },
};

export const heroContent: HeroContent = {
  headline: "Building products with clarity, empathy, and measurable impact.",
  subheadline: "Product Manager with experience across user research, strategy, and cross-functional execution.",
  cta: {
    primary: "View Work",
    secondary: "Get in touch",
  },
};

export const projects: Project[] = [
  {
    id: "cloudhire",
    title: "Platform Growth Strategy",
    role: "Product Manager • CloudHire",
    description: "Driving product strategy and talent-matching initiatives to scale remote hiring.",
    tags: ["Product Strategy", "Growth", "Execution"],
    content: {
      context: "CloudHire is a platform designed to seamlessly connect global talent with high-growth companies.",
      problem: "The talent-matching algorithm lacked deep contextual awareness, reducing conversion and increasing time-to-hire.",
      solution: "Led a cross-functional initiative to redefine the matching criteria, heavily relying on user research and analytics to refine candidate discovery.",
      outcome: "Optimized candidate conversion rates, significantly reduced time-to-hire, and established a scalable product roadmap for future matching iterations.",
    },
    themeColor: "#6f42d4",
    link: "https://medium.com/@shaguntiwari0611/how-slack-can-make-save-for-later-a-go-to-productivity-tool-0f303d7ea98b",
  },
  {
    id: "dice",
    title: "Marketplace Expansion",
    role: "Product Manager • Dice",
    description: "Orchestrated marketplace optimizations and new feature rollouts.",
    tags: ["Marketplace", "User Research", "GTM"],
    content: {
      context: "Dice required aggressive feature delivery to compete in a saturated and highly dynamic market.",
      problem: "User workflows were fragmented, leading to drop-offs during core interaction loops.",
      solution: "Conducted deep qualitative research to map friction points, then collaborated with engineering and design to streamline the critical path.",
      outcome: "Delivered a cohesive user experience that minimized drop-offs and increased engagement metrics across target cohorts.",
    },
    themeColor: "#00c9e8",
    link: "https://medium.com/@shaguntiwari0611/flightpath-growth-how-data-unlocked-gofirsts-next-chapter-3de1007aa72f",
  },
  {
    id: "enkash",
    title: "B2B Payment Workflows",
    role: "Product Manager • EnKash",
    description: "Streamlined financial operations and B2B payment platform usability.",
    tags: ["B2B SaaS", "Fintech", "UX Optimization"],
    content: {
      context: "EnKash provided complex B2B payment solutions that needed to be simplified for mid-market clients.",
      problem: "The onboarding and transactional workflows were overwhelming for non-technical finance teams.",
      solution: "Rearchitected the primary dashboard and payment initiation flows, focusing on clarity, error-prevention, and rapid task completion.",
      outcome: "Increased platform adoption, decreased support tickets related to payment failures, and drove higher transaction volumes.",
    },
    themeColor: "#f43f5e",
    link: "https://medium.com/@shaguntiwari0611/recharge-smarter-how-smart-filters-can-transform-phonepes-mobile-recharge-experience-8eeb7ee85640",
  },
];

export const experience: Experience[] = [
  {
    id: "cloudhire",
    company: "CloudHire",
    role: "Product Manager",
    period: "Present",
    description: [
      "Leading cross-functional teams to iterate on talent-matching algorithms.",
      "Defining and executing the product roadmap based on quantitative growth metrics and qualitative user feedback.",
      "Collaborating closely with engineering and GTM teams to align product launches with business objectives."
    ],
    skills: ["Product Strategy", "Roadmapping", "Growth", "Cross-functional Leadership"],
  },
  {
    id: "dice",
    company: "Dice",
    role: "Product Manager",
    period: "Past",
    description: [
      "Owned the end-to-end delivery of key marketplace features, moving from ambiguity to structured agile execution.",
      "Synthesized user research into actionable product requirements and prioritized the backlog for maximum impact.",
      "Managed stakeholder expectations and communicated strategic product decisions across the organization."
    ],
    skills: ["Marketplace Dynamics", "Agile Execution", "User Research", "Stakeholder Management"],
  },
  {
    id: "enkash",
    company: "EnKash",
    role: "Product Manager",
    period: "Past",
    description: [
      "Drove the simplification of B2B payment workflows for mid-market and enterprise clients.",
      "Partnered with design to elevate the user experience of complex financial dashboards.",
      "Analyzed transaction data to identify friction points and deployed iterative solutions to increase adoption."
    ],
    skills: ["B2B FinTech", "UX Simplification", "Data Analytics", "Product Delivery"],
  },
  {
    id: "krishiyog",
    company: "Krishiyog",
    role: "Product Team",
    period: "Past",
    description: [
      "Contributed to the development of early-stage platform features.",
      "Assisted in user interviews and operational process mapping to bridge the gap between technology and agricultural operations."
    ],
    skills: ["User Interviews", "Process Mapping", "Early-stage Product"],
  },
  {
    id: "nobroker",
    company: "NoBroker",
    role: "Product Team",
    period: "Past",
    description: [
      "Supported operational and product teams in maintaining platform quality and improving the real estate listing experience."
    ],
    skills: ["Operations", "Quality Assurance", "Real Estate Tech"],
  }
];
