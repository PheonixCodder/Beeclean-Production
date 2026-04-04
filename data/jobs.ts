export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobs = [
  {
    id: 1,
    title: "Senior Mobile Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$180k - $220k",
    description: "We're looking for a Senior Mobile Engineer to lead the development of our iOS app. You'll work closely with design and product teams to create exceptional user experiences.",
    responsibilities: [
      "Lead mobile development initiatives and architectural decisions",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Mentor junior developers and conduct code reviews",
      "Optimize app performance and ensure scalability",
      "Write clean, maintainable, and testable code",
    ],
    requirements: [
      "5+ years of iOS development experience",
      "Strong knowledge of Swift, SwiftUI, and UIKit",
      "Experience with performance profiling and optimization",
      "Familiarity with RESTful APIs and GraphQL",
      "Excellent problem-solving and communication skills",
    ],
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    description: "Join our design team to shape the future of BeeClean. You'll be responsible for creating intuitive and beautiful interfaces that millions of users interact with daily.",
    responsibilities: [
      "Design end-to-end user experiences for mobile and web platforms",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Develop and maintain design systems",
      "Collaborate closely with engineers to ensure pixel-perfect implementation",
    ],
    requirements: [
      "3+ years of product design experience",
      "Strong portfolio showcasing mobile and web design work",
      "Proficiency in Figma and design tools",
      "Experience with design systems and prototyping",
      "User-centered design mindset",
    ],
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    salary: "$160k - $200k",
    description: "Build the backbone of BeeClean's services. You'll work on scalable backend systems that power our mobile app and serve millions of users.",
    responsibilities: [
      "Design and implement scalable backend services and APIs",
      "Work with cloud infrastructure (AWS/GCP)",
      "Optimize database performance and queries",
      "Implement security best practices",
      "Monitor and improve system reliability",
    ],
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js, Python, or Go",
      "Experience with SQL and NoSQL databases",
      "Familiarity with containerization (Docker, Kubernetes)",
      "Understanding of distributed systems",
    ],
  },
  {
    id: 4,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    description: "Lead our marketing initiatives and help tell the BeeClean story. You'll develop strategies to reach new audiences and grow our user base.",
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage social media presence and content strategy",
      "Analyze marketing metrics and optimize campaigns",
      "Collaborate with cross-functional teams",
      "Budget management and ROI analysis",
    ],
    requirements: [
      "3+ years of marketing experience",
      "Proven track record of growth marketing",
      "Experience with analytics tools (Google Analytics, Mixpanel)",
      "Strong copywriting and communication skills",
      "Data-driven decision making",
    ],
  },
  {
    id: 5,
    title: "iOS Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $180k",
    description: "Build and maintain our award-winning iOS app. You'll work on new features, performance improvements, and ensure the best user experience.",
    responsibilities: [
      "Develop new features and maintain existing codebase",
      "Work with Swift, SwiftUI, and Objective-C",
      "Ensure app quality through testing and code reviews",
      "Participate in agile development processes",
      "Troubleshoot and fix bugs efficiently",
    ],
    requirements: [
      "3+ years of iOS development",
      "Proficiency in Swift and SwiftUI",
      "Experience with Core Data, Combine, and networking",
      "Knowledge of App Store guidelines and processes",
      "Strong attention to detail",
    ],
  },
  {
    id: 6,
    title: "Customer Success Lead",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    description: "Be the voice of BeeClean. You'll help our users get the most out of our app and ensure they have an exceptional experience.",
    responsibilities: [
      "Lead customer success team and operations",
      "Develop customer support processes and documentation",
      "Analyze user feedback and suggest product improvements",
      "Handle escalated customer issues",
      "Train and mentor customer success specialists",
    ],
    requirements: [
      "3+ years of customer success experience",
      "Strong leadership and communication skills",
      "Experience with CRM and support tools",
      "Problem-solving mindset",
      "Empathy and patience",
    ],
  },
];
