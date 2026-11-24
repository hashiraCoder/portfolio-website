import { FaLinkedin, FaGithub,FaEnvelope } from 'react-icons/fa';
import { SiCodechef, SiTryhackme } from 'react-icons/si';

export const aboutText = "Computer Science and Engineering student at IIIT Bhagalpur and Software Engineering Intern at Enyugma, focused on full-stack systems, application security, and reliable developer tooling.";

export const socialLinks = [
  { name: 'LinkedIn', icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/shivam-kumar-986459343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},
  { name: 'GitHub', icon: <FaGithub />, href: 'https://github.com/hashiraCoder' },
  { name: 'CodeChef', icon: <SiCodechef />, href: 'https://www.codechef.com/users/hover_silk_44' },
  { name: 'TryHackMe', icon: <SiTryhackme />, href: 'https://tryhackme.com/p/kshivam' },
  { name: 'Email', icon: <FaEnvelope />, href: 'mailto:shivamkumar.code@gmail.com' },
];

export const projectData = [
  {
    title: "Oculus - DevSecOps Code Security Scanning Platform",
    desc: "Automated GitHub security scanning with webhook-based discovery and a BullMQ/Redis worker pipeline. Supports 150+ concurrent scans with 0% task failure; advisory caching reduced benchmark scan latency from 1.90s to 65ms.",
    stack: ["TypeScript", "Node.js", "Express", "React", "PostgreSQL", "Redis", "BullMQ", "GitHub REST/Webhook API"],
    live: "https://oculus-psi.vercel.app/",
    github: "https://github.com/hashiraCoder/Oculus"
  },
  {
    title: "Network Breach Pathfinder",
    desc: "Interactive 20x50 grid visualizer for network packet traversal, obstacles, Dijkstra's algorithm, and A* search. A custom binary min-heap and optimized rendering support smooth 60 FPS animations.",
    stack: ["React 18", "Vite", "JavaScript", "Tailwind CSS", "CSS Grid"],
    live: "https://pathfinder-2-d-grid.vercel.app/",
    github: "https://github.com/hashiraCoder/Pathfinder-2D-grid"
  }
];
