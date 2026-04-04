import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "technology" },
      update: {},
      create: {
        name: "Technology",
        slug: "technology",
        description: "Technology related articles",
      },
    }),
    prisma.category.upsert({
      where: { slug: "tutorials" },
      update: {},
      create: {
        name: "Tutorials",
        slug: "tutorials",
        description: "Step-by-step tutorials",
      },
    }),
    prisma.category.upsert({
      where: { slug: "product-updates" },
      update: {},
      create: {
        name: "Product Updates",
        slug: "product-updates",
        description: "Latest product news and updates",
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create sample author (User)
  const author = await prisma.user.upsert({
    where: { email: "admin@beeclean.app" },
    update: {},
    create: {
      id: "user-0",
      name: "BeeClean Team",
      email: "admin@beeclean.app",
      emailVerified: true,
      image: "https://beeclean.app/logo.png",
      position: "Product Team",
      bio: "The BeeClean team is dedicated to creating the best phone cleanup and storage optimization tools for iOS users.",
    },
  });

  console.log(`✅ Created author: ${author.name}`);

  // Create sample blogs
  const sampleBlogs = [
    {
      title: "Introducing BeeClean 2.0: A New Era of Phone Cleanup",
      content: `
        <p>We're excited to announce the release of BeeClean 2.0, packed with powerful new features designed to make phone cleanup smarter and more efficient than ever before.</p>

        <h2>What's New</h2>
        <p>This major update brings a completely redesigned user interface, improved duplicate detection algorithms, and new AI-powered cleanup suggestions.</p>

        <ul>
          <li><strong>Smart Duplicate Detection:</strong> Our new algorithm can identify duplicate photos even when they've been slightly edited or compressed.</li>
          <li><strong>AI Cleanup Assistant:</strong> Get personalized recommendations on what to clean based on your usage patterns.</li>
          <li><strong>One-Tap Cleanup:</strong> With a single tap, BeeClean can now safely remove unnecessary files and reclaim gigabytes of storage.</li>
          <li><strong>Secure Vault:</strong> Keep your sensitive files secure with our enhanced private vault feature.</li>
        </ul>

        <h2>Performance Improvements</h2>
        <p>We've also focused on making BeeClean faster and more efficient. The app now uses up to 50% less memory during scanning operations and completes scans up to 3x faster on older devices.</p>

        <h2>Try It Today</h2>
        <p>BeeClean 2.0 is now available on the App Store. Update your app today and experience the new BeeClean!</p>
      `,
      excerpt: "BeeClean 2.0 is here! Discover powerful new features including smart duplicate detection, AI cleanup assistant, and one-tap cleanup.",
      slug: "introducing-beeclean-2-0",
      status: "published",
      featured: true,
      readTime: "5 min",
      thumbnail: "https://beeclean.app/images/beeclean-2-0-hero.jpg",
      tags: ["product-updates", "technology"],
    },
    {
      title: "How to Find and Remove Duplicate Photos on Your iPhone",
      content: `
        <p>Duplicate photos are one of the biggest culprits when it comes to wasted storage space on your iPhone. Over time, similar photos, screenshots, and saved images from social media can quickly eat up your storage.</p>

        <h2>Why Duplicates Accumulate</h2>
        <p>Understanding how duplicates end up on your phone is the first step to preventing them:</p>
        <ul>
          <li><strong>Multiple downloads:</strong> Saving the same image from different apps</li>
          <li><strong>Screenshots:</strong> Capturing similar screenshots of the same content</li>
          <li><strong>Social media:</strong> Instagram, WhatsApp, and other apps often save multiple copies</li>
          <li><strong>Backups:</strong> Restoring from backups can create duplicates</li>
        </ul>

        <h2>Manual Cleanup Methods</h2>
        <p>You can manually find duplicates using the Photos app's search feature, but this is time-consuming and you might miss similar (not identical) photos.</p>

        <h2>Automated Solution with BeeClean</h2>
        <p>BeeClean uses advanced algorithms to detect both exact duplicates and similar photos:</p>

        <ol>
          <li><strong>Visual similarity detection:</strong> Identifies photos that look alike even if file sizes differ</li>
          <li><strong>Smart grouping:</strong> Organizes duplicates into groups for easy review</li>
          <li><strong>Safe deletion:</strong> Keep the best quality version and remove others with one tap</li>
        </ol>

        <h2>Best Practices</h2>
        <p>To keep your photo library clean:</p>
        <ul>
          <li>Run a duplicate scan monthly using BeeClean</li>
          <li>Review detected duplicates before deleting</li>
          <li>Enable automatic cleanup reminders in BeeClean settings</li>
        </ul>

        <p>Download BeeClean today and reclaim your storage space!</p>
      `,
      excerpt: "Learn how to efficiently find and remove duplicate photos from your iPhone, both manually and using smart tools like BeeClean.",
      slug: "how-to-find-remove-duplicate-photos-iphone",
      status: "published",
      featured: false,
      readTime: "8 min",
      thumbnail: "https://beeclean.app/images/duplicate-photos-guide.jpg",
      tags: ["tutorials", "technology"],
    },
    {
      title: "Understanding iOS Storage Management: A Complete Guide",
      content: `
        <p>iOS storage management can be confusing. Have you ever wondered why your iPhone says you have 64GB of storage but only 40GB is available? Let's demystify how iOS handles storage.</p>

        <h2>The Storage Equation</h2>
        <p>Your total storage is divided into:</p>
        <ul>
          <li><strong>User storage:</strong> Space available for your apps, photos, and files</li>
          <li><strong>System overhead:</strong> iOS operating system and system files</li>
          <li><strong>Cache and temp files:</strong> Temporary data apps create for better performance</li>
        </ul>

        <h2>Where Space Gets Wasted</h2>
        <p>Common storage culprits include:</p>
        <ol>
          <li><strong>App cache:</strong> Many apps store cached data that can grow indefinitely</li>
          <li><strong>Message attachments:</strong> Videos and photos in Messages</li>
          <li><strong>Offline content:</strong> Downloaded videos, music, and podcasts</li>
          <li><strong>Duplicate files:</strong> Multiple copies of the same photo or document</li>
        </ol>

        <h2>Monitor Your Storage</h2>
        <p>Check your iPhone storage in Settings > General > iPhone Storage. This shows which apps use the most space and offers cleanup suggestions.</p>

        <h2>Smart Cleanup Strategy</h2>
        <p>For comprehensive cleanup:</p>
        <ul>
          <li>Review large attachments in Messages monthly</li>
          <li>Clear browser caches regularly</li>
          <li>Offload unused apps (iOS feature)</li>
          <li>Use BeeClean for automated duplicate detection and file analysis</li>
        </ul>

        <p>Take control of your storage with these strategies and BeeClean's smart cleanup features.</p>
      `,
      excerpt: "A comprehensive guide to understanding iOS storage management and learning how to reclaim wasted space on your iPhone.",
      slug: "understanding-ios-storage-management",
      status: "draft",
      featured: false,
      readTime: "6 min",
      thumbnail: null,
      tags: ["tutorials", "technology"],
    },
  ];

  for (const blogData of sampleBlogs) {
    const { tags, ...blogInfo } = blogData;

    // Use upsert to avoid duplicate key errors on re-seed
    const blog = await prisma.blog.upsert({
      where: { slug: blogData.slug },
      update: {
        ...blogInfo,
        authorId: author.id,
        publishedAt: blogInfo.status === "published" ? new Date() : null,
      },
      create: {
        ...blogInfo,
        authorId: author.id,
        publishedAt: blogInfo.status === "published" ? new Date() : null,
      },
    });

    // Delete existing category associations to avoid duplicates
    await prisma.blogCategory.deleteMany({
      where: { blogId: blog.id },
    });

    // Create category associations
    for (const tagName of tags) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
      const category = await prisma.category.upsert({
        where: { slug: tagSlug },
        update: {},
        create: {
          name: tagName,
          slug: tagSlug,
        },
      });

      await prisma.blogCategory.create({
        data: {
          blogId: blog.id,
          categoryId: category.id,
        },
      });
    }

    console.log(`✅ Upserted blog: ${blog.title}`);
  }

  console.log("✅ Database seeded successfully!");

  // Create sample jobs
  const sampleJobs = [
    {
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

  // Clear existing jobs to avoid duplicates on re-seed
  await prisma.job.deleteMany({});

  for (const jobData of sampleJobs) {
    await prisma.job.create({
      data: {
        ...jobData,
        status: "published",
        responsibilities: jobData.responsibilities,
        requirements: jobData.requirements,
      },
    });
    console.log(`✅ Created job: ${jobData.title}`);
  }

  console.log("✅ All jobs seeded successfully!");

  // Create sample applications for demo
  const sampleApplications = [
    {
      jobTitle: "Senior Mobile Engineer",
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/alexjohnson",
      message: "I have 6 years of iOS development experience and have led multiple successful app launches. I'm excited about the opportunity to contribute to BeeClean's mission.",
      resume: { name: "Alex_Johnson_Resume.pdf", type: "application/pdf", size: 245760 },
      status: "pending",
    },
    {
      jobTitle: "Product Designer",
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      phone: "+1 (555) 987-6543",
      linkedin: "linkedin.com/in/sarahwilliams",
      message: "As a passionate designer with a focus on mobile experiences, I believe I could bring unique insights to your design team. My portfolio showcases work similar to BeeClean's aesthetic.",
      resume: { name: "Sarah_Williams_Resume.pdf", type: "application/pdf", size: 312455 },
      status: "reviewed",
    },
    {
      jobTitle: "Backend Engineer",
      name: "Michael Chen",
      email: "mchen@email.com",
      phone: "+1 (555) 456-7890",
      linkedin: null,
      message: "I've been working with Node.js and PostgreSQL for 5 years and have extensive experience scaling backend systems. I'd love to help build BeeClean's infrastructure.",
      resume: { name: "Michael_Chen_Resume.pdf", type: "application/pdf", size: 278912 },
      status: "accepted",
    },
    {
      jobTitle: "Marketing Manager",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 234-5678",
      linkedin: "linkedin.com/in/emilydavis",
      message: "With a proven track record in growth marketing for mobile apps, I'm confident I can help BeeClean reach millions of new users. Let's connect!",
      resume: { name: "Emily_Davis_Resume.pdf", type: "application/pdf", size: 298123 },
      status: "pending",
    },
    {
      jobTitle: "iOS Developer",
      name: "James Wilson",
      email: "jwilson@email.com",
      linkedin: "linkedin.com/in/jameswilson",
      message: "I've followed BeeClean for a while and am impressed by the product. I have 4 years of SwiftUI experience and would be thrilled to join the team.",
      resume: { name: "James_Wilson_Resume.pdf", type: "application/pdf", size: 265432 },
      status: "rejected",
    },
    {
      jobTitle: "Customer Success Lead",
      name: "Olivia Martinez",
      email: "olivia.m@email.com",
      phone: "+1 (555) 876-5432",
      linkedin: "linkedin.com/in/oliviamartinez",
      message: "Building and leading customer success teams is my passion. I have experience creating processes that improve user satisfaction while scaling operations.",
      resume: { name: "Olivia_Martinez_Resume.pdf", type: "application/pdf", size: 287654 },
      status: "pending",
    },
    {
      jobTitle: "Senior Mobile Engineer",
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      linkedin: null,
      message: null,
      resume: { name: "David_Kim_Resume.pdf", type: "application/pdf", size: 254321 },
      status: "pending",
    },
  ];

  // Get all published jobs to link applications
  const publishedJobs = await prisma.job.findMany({
    where: { status: "published" },
    select: { id: true, title: true },
  });

  for (const appData of sampleApplications) {
    // Find matching job or pick first available
    let jobId = publishedJobs[0]?.id || "";
    const matchingJob = publishedJobs.find((j) => j.title === appData.jobTitle);
    if (matchingJob) {
      jobId = matchingJob.id;
    }

    await prisma.application.create({
      data: {
        jobId,
        jobTitle: appData.jobTitle,
        name: appData.name,
        email: appData.email,
        phone: appData.phone,
        linkedin: appData.linkedin,
        message: appData.message,
        resume: appData.resume,
        status: appData.status,
      },
    });
    console.log(`✅ Created application: ${appData.name} for ${appData.jobTitle}`);
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
