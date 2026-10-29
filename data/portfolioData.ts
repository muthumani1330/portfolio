export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  shortDescription?: string;
  detailedDescription?: string;
  sectionLabel?: string;
  sectionHeading?: string;
  features?: string[];
  metrics: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  hasLiveDemo?: boolean;
  isInternalSystem?: boolean;
  internalUrl?: string;
  organization?: string;
  screenshot?: string;
  slideScreenshot?: string;
  architectureDetails?: {
    overview: string;
    keyFeatures: string[];
    techStack: { category: string; items: string[] }[];
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  institution?: string;
  period: string;
  description: string;
  bullets?: string[];
}

export interface AchievementItem {
  title: string;
  category: string;
  year: string;
  badge: string;
  description?: string;
}

export interface EducationInfo {
  label?: string;
  heading?: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Muthumani P",
    badge: "WEB DEVELOPER • AI & DATA SCIENCE",
    headline: "Building Web Applications That Solve Real Problems.",
    title: "Building Web Applications That Solve Real Problems.",
    tagline: "Building Web Applications That Solve Real Problems.",
    description:
      "I develop practical, database-driven web applications with a focus on clean interfaces, reliable functionality, and efficient data management. With hands-on experience building an academic management system and supporting IT infrastructure, I enjoy turning real-world requirements into useful software solutions.",
    location: "Ramanathapuram, Tamil Nadu, India",
    email: "muthumani200426@gmail.com",
    phone: "+91 9342983525",
    whatsapp: "https://wa.me/919342983525",
    github: "https://github.com/muthumani1330",
    linkedin: "https://www.linkedin.com/in/muthu-mani-aa6089386/",
    resumeUrl: "/Muthumani_P_Resume.pdf",
    titles: [
      "Web Developer",
      "Full-Stack Developer",
      "AI & Data Science Graduate"
    ],
    socials: {
      github: "https://github.com/muthumani1330",
      linkedin: "https://www.linkedin.com/in/muthu-mani-aa6089386/",
      email: "muthumani200426@gmail.com",
      phone: "+91 9342983525",
      whatsapp: "https://wa.me/919342983525",
      twitter: "https://www.linkedin.com/in/muthu-mani-aa6089386/",
    },
    bio: [
      "I develop practical, database-driven web applications with a focus on clean interfaces, reliable functionality, and efficient data management.",
      "With hands-on experience building an academic management system and supporting IT infrastructure, I enjoy turning real-world requirements into useful software solutions."
    ],
    stats: [
      { label: "Degree", value: "B.Tech" },
      { label: "Graduation", value: "2026" },
      { label: "Major", value: "AI & DS" },
      { label: "Flagship", value: "ATTS" }
    ],
  },

  about: {
    label: "ABOUT ME",
    heading: "A Developer Focused on Practical Solutions.",
    subtitle: "A Developer Focused on Practical Solutions.",
    bio: [
      "I'm a B.Tech student in Artificial Intelligence & Data Science at Mohamed Sathak Engineering College, with hands-on experience in web development and technical support.",
      "I developed an Academic Target Tracking System to help manage faculty targets, student records, and departmental information through a centralized platform. My experience also includes web development training at Ether Infotech and IT infrastructure support at the Incubation and Innovation Foundation at my college.",
      "I enjoy building useful applications, improving user experiences, working with databases, and solving technical problems through structured thinking."
    ],
    highlights: [
      {
        title: "Academic Background",
        desc: "B.Tech in Artificial Intelligence & Data Science at Mohamed Sathak Engineering College (2022–2026).",
        icon: "GraduationCap"
      },
      {
        title: "Full-Stack Development",
        desc: "Hands-on experience developing modular web applications with PHP, HTML, CSS, JavaScript, and relational SQL.",
        icon: "Code2"
      },
      {
        title: "Systems & Infrastructure",
        desc: "Technical troubleshooting, local network support, and computing facility maintenance at MSEC-IIF.",
        icon: "Server"
      },
      {
        title: "Hackathon Competitor",
        desc: "Intra Hackathon Winner (2025) and Smart India Hackathon participant.",
        icon: "Trophy"
      }
    ]
  },

  skillsMatrix: [
    {
      title: "FRONTEND DEVELOPMENT",
      skills: ["HTML", "CSS", "JavaScript ES6", "Responsive Layouts", "Forms and Dashboards"]
    },
    {
      title: "BACKEND DEVELOPMENT",
      skills: ["PHP", "Authentication", "Role-Based Access Control", "CRUD Operations"]
    },
    {
      title: "DATABASE MANAGEMENT",
      skills: ["SQL", "MySQL", "Relational Data Modeling", "Queries and Joins"]
    },
    {
      title: "DEVELOPMENT TOOLS",
      skills: ["GitHub", "XAMPP", "Antigravity IDE"]
    }
  ] as SkillCategory[],

  featuredProject: {
    id: "academic-target-tracking-system",
    sectionLabel: "FEATURED PROJECT",
    sectionHeading: "Projects Built to Solve Real Problems.",
    title: "Academic Target Tracking System (ATTS)",
    tagline: "Centralized Academic Management Platform",
    category: "Full-Stack Web Application",
    year: "2025",
    shortDescription: "A centralized academic management platform designed to organize faculty targets, student records, and departmental information in one system.",
    description:
      "A centralized academic management platform designed to organize faculty targets, student records, and departmental information in one system.",
    detailedDescription:
      "Developed a full-stack web application for college academic management using PHP, HTML, CSS, JavaScript, and SQL. Implemented role-based access for administrators, faculty, and students, along with interactive dashboards, dynamic forms, data filtering, and report generation.",
    features: [
      "Role-Based Access Control",
      "Academic Target Management",
      "Student and Department Data Management",
      "Interactive Dashboards and Dynamic Forms",
      "Data Filtering and Calculations",
      "PDF, Excel, and Word Report Export",
      "Automatic Presentation Mode"
    ],
    metrics: [
      "Role-Based Access (Admin, Faculty, Student)",
      "Calculation-Driven Dashboards",
      "Multi-Format Export (PDF, Excel, Word)"
    ],
    tags: ["PHP", "HTML", "CSS", "JavaScript", "SQL", "MySQL"],
    githubUrl: "https://github.com/muthumani1330",
    hasLiveDemo: false,
    isInternalSystem: true,
    internalUrl: "https://atts.msec.internal/dashboard",
    organization: "Mohamed Sathak Engineering College",
    screenshot: "/projects/atts-iqac-portal.png",
    slideScreenshot: "/projects/atts-slide.png",
    architectureDetails: {
      overview: "The Academic Target Tracking System (ATTS) centralizes institutional academic target compliance and departmental reporting. Built with a modular PHP architecture on top of a normalized MySQL relational schema.",
      keyFeatures: [
        "Role-Based Access Control for administrators, faculty, and student roles.",
        "Interactive dashboards and dynamic subject rows comparing allocated targets with actual outcomes.",
        "Automatic presentation mode designed for faculty department review meetings.",
        "Multi-format reporting engine generating PDF summaries, Excel spreadsheets, and Word documents.",
        "Normalized SQL database schema preventing redundant data entry across academic semesters."
      ],
      techStack: [
        { category: "Frontend Interface", items: ["HTML5", "CSS3", "JavaScript ES6", "Responsive Dashboard Views", "Automatic Slide Engine"] },
        { category: "Backend Architecture", items: ["PHP", "Session Authentication", "Role-Based Access Control (RBAC)", "CRUD Controllers"] },
        { category: "Database & Tooling", items: ["SQL", "MySQL", "Relational Schema", "XAMPP", "GitHub", "Antigravity IDE"] }
      ]
    }
  } as Project,

  experience: [
    {
      role: "Web Development Intern",
      organization: "Ether Infotech",
      period: "July 19 – August 18, 2025",
      description:
        "Completed a web development internship involving assigned development tasks and practical training. Strengthened my ability to learn new concepts, communicate with mentors and team members, and approach tasks with professionalism.",
      bullets: [
        "Completed assigned web development tasks using frontend and backend technologies.",
        "Participated in practical training sessions and strengthened engineering problem-solving skills.",
        "Maintained professional communication, punctuality, and task documentation with mentors."
      ]
    },
    {
      role: "Systems Associate",
      organization: "Incubation and Innovation Foundation (MSEC-IIF)",
      institution: "Mohamed Sathak Engineering College, Ramanathapuram, Tamil Nadu",
      period: "Institutional Appointment",
      description:
        "Supported IT infrastructure and internal foundation systems by troubleshooting hardware, software, and network issues. Assisted faculty and startup teams with user access configuration, technical support, and system security procedures.",
      bullets: [
        "Supported IT infrastructure and internal foundation systems by troubleshooting hardware, software, and network issues.",
        "Assisted faculty and startup teams with user access configuration and technical support.",
        "Maintained system security procedures, regular workstation upkeep, and computing network uptime."
      ]
    }
  ] as ExperienceItem[],

  education: {
    label: "EDUCATION",
    heading: "My Academic Foundation.",
    institution: "Mohamed Sathak Engineering College",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    period: "2022–2026",
    location: "Tamil Nadu, India",
    details: [
      "Rigorous technical curriculum in Artificial Intelligence, Data Structures, and Database Management Systems.",
      "Hands-on laboratory coursework covering Full-Stack Web Technologies, SQL, and Relational Modeling.",
      "Active participant in collegiate hackathons, technical symposiums, and institutional IT initiatives."
    ]
  } as EducationInfo,

  achievements: [
    {
      title: "Winner — Intra Hackathon 2025",
      category: "Mohamed Sathak Engineering College",
      year: "2025",
      badge: "Winner",
      description: "Secured first place for rapid prototyping and implementation of practical software solutions."
    },
    {
      title: "Runner-Up — CM Trophy 2026",
      category: "Table Tennis, Ramanathapuram District",
      year: "2026",
      badge: "Runner-Up",
      description: "Represented the institution and secured runner-up standing in district-level competitive table tennis."
    },
    {
      title: "Participant — Smart India Hackathon",
      category: "Internal Hackathon round",
      year: "2024–2025",
      badge: "Participant",
      description: "Participated in the institutional hackathon selection round addressing national problem statements."
    },
    {
      title: "3rd Place — District-Level Tamil Poetry Competition",
      category: "Tamil Nadu, 2024",
      year: "2024",
      badge: "3rd Place",
      description: "Recognized at the district level for Tamil literary expression on youth development themes."
    }
  ] as AchievementItem[],

  contact: {
    label: "CONTACT",
    heading: "Let's Build Something Meaningful.",
    supportingText:
      "I'm interested in opportunities where I can apply my development skills, learn from experienced teams, and contribute to practical software projects. Feel free to reach out.",
    email: "muthumani200426@gmail.com",
    phone: "+91 9342983525",
    whatsapp: "https://wa.me/919342983525",
    linkedin: "https://www.linkedin.com/in/muthu-mani-aa6089386/",
    github: "https://github.com/muthumani1330",
    location: "Ramanathapuram, Tamil Nadu, India",
  },

  skills: [
    { name: "Frontend Development", level: 90, category: "frontend" },
    { name: "Backend Development", level: 85, category: "backend" },
    { name: "Database Management", level: 88, category: "database" },
    { name: "Development Tools", level: 92, category: "tools" }
  ],

  showcaseProjects: [
    {
      id: "academic-target-tracking-system",
      title: "Academic Target Tracking System (ATTS)",
      tagline: "Centralized Academic Management Platform",
      category: "Full-Stack Web Application",
      year: "2025",
      organization: "Mohamed Sathak Engineering College",
      isInternalSystem: true,
      internalUrl: "https://atts.msec.internal/dashboard",
      shortDescription:
        "A centralized academic management platform designed to organize faculty targets, student records, and departmental information in one system.",
      description:
        "A centralized academic management platform designed to organize faculty targets, student records, and departmental information in one system.",
      detailedDescription:
        "Developed a full-stack web application for college academic management using PHP, HTML, CSS, JavaScript, and SQL. Implemented role-based access for administrators, faculty, and students, along with interactive dashboards, dynamic forms, data filtering, and report generation.",
      features: [
        "Role-Based Access Control (Admin, Faculty, Student)",
        "Academic Target Allocation and Real-Time Tracking",
        "Student and Department Data Management",
        "Interactive Dashboards and Dynamic Calculation Forms",
        "Data Filtering, Statistical Aggregations, and Subject Summaries",
        "Multi-Format Export Engine (PDF, Excel, Word Reports)",
        "Automated Full-Screen Slide Presentation Mode for Review Meetings"
      ],
      metrics: [
        "3 Role Boundaries (Admin, Faculty, Student)",
        "Dynamic Calculation Engine",
        "Multi-Format Export (PDF, Excel, Word)"
      ],
      tags: ["PHP", "MySQL", "JavaScript ES6", "HTML5", "CSS3", "RBAC", "Reporting"],
      githubUrl: "https://github.com/muthumani1330",
      hasLiveDemo: false,
      screenshot: "/projects/atts-iqac-portal.png",
      slideScreenshot: "/projects/atts-slide.png",
      architectureDetails: {
        overview:
          "The Academic Target Tracking System (ATTS) centralizes institutional academic target compliance and departmental reporting. Built with a modular PHP architecture on top of a normalized MySQL relational schema.",
        keyFeatures: [
          "Role-Based Access Control for administrators, faculty, and student roles.",
          "Interactive dashboards and dynamic subject rows comparing allocated targets with actual outcomes.",
          "Automatic presentation mode designed for faculty department review meetings.",
          "Multi-format reporting engine generating PDF summaries, Excel spreadsheets, and Word documents.",
          "Normalized SQL database schema preventing redundant data entry across academic semesters."
        ],
        techStack: [
          {
            category: "Frontend Interface",
            items: ["HTML5", "CSS3", "JavaScript ES6", "Responsive Dashboard Views", "Slide Presentation Engine"]
          },
          {
            category: "Backend Architecture",
            items: ["PHP", "Session Authentication", "Role-Based Access Control (RBAC)", "CRUD Controllers"]
          },
          {
            category: "Database & Tooling",
            items: ["SQL", "MySQL", "Relational Schema", "XAMPP", "GitHub", "Antigravity IDE"]
          }
        ]
      }
    },
    {
      id: "ai-academic-analyzer",
      title: "AI Student Academic Performance Analyzer",
      tagline: "Predictive Analytics & Student Milestone Forecasting",
      category: "AI & Data Science System",
      year: "2025",
      organization: "Intra Hackathon Winner 2025 • AI & DS Dept",
      isInternalSystem: false,
      shortDescription:
        "A machine learning and data analytics application evaluating student performance trends, historical semester marks, and academic milestone outcomes.",
      description:
        "A machine learning and data analytics application evaluating student performance trends, historical semester marks, and academic milestone outcomes.",
      detailedDescription:
        "Designed and engineered an academic data intelligence dashboard that aggregates historical exam metrics, identifies academic risk factors, and provides actionable insights for educators using predictive modeling and statistical clustering.",
      features: [
        "Statistical Student Performance Aggregation",
        "Early Academic Risk Identification using Classification Models",
        "Interactive Mark Visualizations and Distribution Plots",
        "Departmental Cohort Comparison & Trend Tracking",
        "Data Export for Academic Mentorship Interventions"
      ],
      metrics: [
        "Intra Hackathon Winner (2025)",
        "Predictive Risk Modeling",
        "Interactive Analytics Dashboard"
      ],
      tags: ["Python", "Pandas", "Scikit-Learn", "Data Analytics", "SQL", "Streamlit"],
      githubUrl: "https://github.com/muthumani1330",
      hasLiveDemo: false,
      screenshot: "/projects/atts-preview.png",
      architectureDetails: {
        overview:
          "An applied data science application leveraging predictive modeling to benchmark student performance trajectory against historical semester cohorts.",
        keyFeatures: [
          "Feature engineering across semester exam marks, attendance records, and internal assessment grades.",
          "Supervised classification models predicting graduation risk indicators and honors achievement.",
          "Interactive visualization dashboards displaying cohort distribution curves and department percentiles.",
          "Modular data ingestion pipelines connecting normalized student databases to analytics scripts."
        ],
        techStack: [
          {
            category: "Data Science & ML",
            items: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Predictive Modeling"]
          },
          {
            category: "Analytics & UI",
            items: ["Streamlit", "Matplotlib", "Seaborn", "Data Visualization"]
          },
          {
            category: "Database & Storage",
            items: ["SQL", "MySQL", "CSV/Parquet", "Relational Queries"]
          }
        ]
      }
    },
    {
      id: "msec-iif-infrastructure",
      title: "MSEC-IIF Systems & IT Asset Management Portal",
      tagline: "Institutional IT Infrastructure & Computing Registry",
      category: "Enterprise IT Systems",
      year: "2024–2025",
      organization: "Incubation and Innovation Foundation (MSEC-IIF)",
      isInternalSystem: true,
      internalUrl: "https://iif.msec.internal/systems",
      shortDescription:
        "An internal IT service portal and workstation registry designed to monitor hardware assets, user access permissions, and computing network uptime.",
      description:
        "An internal IT service portal and workstation registry designed to monitor hardware assets, user access permissions, and computing network uptime.",
      detailedDescription:
        "Architected during tenure as Systems Associate at MSEC-IIF to streamline computing lab maintenance, network diagnostics, user authentication logs, and hardware lifecycle tracking across incubator offices and innovation laboratories.",
      features: [
        "Workstation & Computing Asset Lifecycle Registry",
        "Internal Technical Service Ticket Logging & Resolution",
        "Network Access Verification and Credential Security",
        "Automated Downtime and Preventive Maintenance Scheduling",
        "Centralized Inventory Auditing and Activity Reports"
      ],
      metrics: [
        "Computing Infrastructure Support",
        "Hardware & Network Maintenance",
        "User Access Security Logs"
      ],
      tags: ["PHP", "MySQL", "Network Support", "IT Infrastructure", "System Security"],
      githubUrl: "https://github.com/muthumani1330",
      hasLiveDemo: false,
      screenshot: "/projects/atts-slide.png",
      architectureDetails: {
        overview:
          "A specialized internal IT management system engineered to support workstation uptime, lab networking, and user authentication across college incubation facilities.",
        keyFeatures: [
          "Centralized hardware registry tracking system specifications, IP allocations, and maintenance history.",
          "Ticketing workflow with severity classification for rapid network and software troubleshooting.",
          "User authorization controls restricting administrative configurations to verified IT personnel.",
          "Preventive maintenance audit trails ensuring high computing uptime for student startups."
        ],
        techStack: [
          {
            category: "Portal Architecture",
            items: ["PHP", "Session Management", "HTML5", "CSS3", "JavaScript"]
          },
          {
            category: "Database & Security",
            items: ["MySQL", "Relational Asset Schema", "Access Auditing", "Password Hashing"]
          },
          {
            category: "Systems & Network",
            items: ["Local Network Diagnostics", "Workstation Upkeep", "Hardware Auditing"]
          }
        ]
      }
    }
  ] as Project[],

  ledgerProjects: [] as Project[],

  githubMetrics: {
    totalContributions: "120+",
    currentStreak: "12 days",
    longestStreak: "24 days",
    completionRate: "98%"
  }
};
