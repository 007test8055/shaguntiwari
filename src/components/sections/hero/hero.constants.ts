import { Mail } from "lucide-react";
import { Linkedin, Medium } from "./hero.icons";
import { siteConfig } from "../../../content";

export const STATS = [
  { value: "10+", label: "Products Shipped" },
  { value: "1M+", label: "Users Impacted" },
  { value: "3yrs+", label: "Experience" },
  { value: "₹10Cr+", label: "Revenue Generated" },
] as const;

export const MARQUEE_SKILLS = [
  "Product Strategy", "Roadmaps", "User Research", "Growth",
  "Agile/Scrum", "Data-Driven", "Cross-Functional Leadership",
  "B2B SaaS", "Go-To-Market", "OKRs", "Stakeholder Management",
  "AI/ML Products", "Zero-to-One", "Platform Strategy",
] as const;

export const SOCIALS = [
  { Icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { Icon: Medium,   href: siteConfig.socials.medium,   label: "Medium"   },
  { Icon: Mail,     href: `mailto:${siteConfig.socials.email}`, label: "Email" },
] as const;
