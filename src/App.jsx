import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Email,
  Phone,
  GitHub,
  LinkedIn,
  Person,
  Work,
  Code,
  School,
  ContactMail,
  Visibility,
  EmojiEvents,
  Star,
  Menu,
  Close,
} from "@mui/icons-material";

// --- Mock Data ---
const PERSONAL_INFO = {
  name: "Sanyam Jain",
  title: "AI-Native Engineering Student",
  tagline:
    "Experienced in building AI-powered systems that merge innovation with measurable impact—from energy-tech infrastructure to carbon finance platforms.",
  email: "sanyamjain4002@gmail.com",
  phone: "+91 6232651488",
  photo: "/images/san-port.jpg",
  socials: {
    github: "https://github.com/ModiSanyamJain",
    linkedin: "https://www.linkedin.com/in/sanyam-jain-71111a17b/",
  },
};

const ABOUT_DATA = {
  vision:
    "I’m passionate about leveraging Large Language Models (LLMs), market research, and automation to create scalable, sustainable solutions that bridge technology, sustainability, and economic growth. Guided by my core strengths — Analytical Thinking, a Founder’s Mindset, Strategic Research, AI Integration, Rapid Learning, and Startup Agility — I’m driven to turn bold ideas into impactful realities.",
  bio: "AI-native engineering student with a founder’s mindset and strategic research focus. Experienced in building AI-powered systems that merge innovation with measurable impact—from energy-tech infrastructure to carbon finance platforms. Skilled at leveraging LLMs, market research, and automation to create scalable solutions that align technology with sustainability and economic growth.",
};

const SKILLS_DATA = [
  { name: "Python", category: "Languages" },
  { name: "OpenAI API", category: "Languages" },
  { name: "ChatGPT", category: "AI Tools" },
  { name: "Claude", category: "AI Tools" },
  { name: "Perplexity", category: "AI Tools" },
  { name: "Cursor", category: "AI Tools" },
  { name: "Blackbox", category: "AI Tools" },
  { name: "Gemini", category: "AI Tools" },
  { name: "Notion AI", category: "AI Tools" },
  { name: "Napkin AI", category: "AI Tools" },
  { name: "TensorFlow", category: "Frameworks" },
  { name: "LangChain", category: "Frameworks" },
  { name: "Prompt Engineering (Expert)", category: "Expertise" },
  { name: "LLM Understanding (Advanced)", category: "Expertise" },
  { name: "Market Research (Advanced)", category: "Expertise" },
  { name: "Python/API Integration (Proficient)", category: "Expertise" },
  { name: "Analytical Thinking", category: "Core Strengths" },
  { name: "Founder Mindset", category: "Core Strengths" },
  { name: "Strategic Research", category: "Core Strengths" },
  { name: "AI Integration", category: "Core Strengths" },
  { name: "Rapid Learning", category: "Core Strengths" },
  { name: "Startup Agility", category: "Core Strengths" },
];

// Empty as per plan
const EXPERIENCE_DATA = [];

const FEATURED_PROJECTS = [
  {
    name: "GaiaOS – The Energy Internet",
    description:
      "Designed India’s first concept of an “Energy Internet”, enabling SMEs and households to cut energy costs by 10–20% through dynamic pricing and AI-driven IoT control. Mentored by the IIFM Data Science Team, this project is advancing toward pilot deployment in the President of India’s Village Redevelopment Program.",
    tags: ["AI", "Energy-Tech", "IoT", "Hackathon"],
    link: "https://gaia-os-frontend.vercel.app/",
    ppt: "/files/Srijan_Krishna.pdf",
    image: "/images/gaiaos.png",
    featured: true,
  },
  {
    name: "Carbon Wallet System",
    description:
      "Created a dual-ledger “UPI for Carbon” prototype aligning with India’s 2070 Net Zero mission. Quantifies carbon output per transaction for industries and consumers; planned for phased national rollout.",
    tags: ["Fintech", "Carbon Finance", "Sustainability"],
    link: "https://green-purchase-hub.vercel.app/",
    ppt: "/files/TRBSMasterplanfinal.pdf",
    image: "/images/cit-car.png",
    featured: true,
  },
];

const PROJECTS_DATA = [
  {
    name: "AI Automated Trading Platform",
    description:
      "Uses TensorFlow + Zerodha API for intraday trades via visual-pattern recognition.",
    tags: ["AI", "TensorFlow", "Fintech", "Trading"],
    link: "#",
  },
  {
    name: "AI Real-Estate Hot-Zone Detector",
    description:
      "Analyzes political-linked land purchases, drone imagery, and geo-signals to identify emerging high-alpha zones.",
    tags: ["AI", "Data Analysis", "Real-Estate"],
    link: "#",
  },
  {
    name: "Research Paper – “Maximizing Agricultural Income via AI in India”",
    description:
      "Under Review. Proposed AI + IoT + Blockchain model integrating land-record tokenization, crop analytics, and ML forecasting to build a “Bloomberg Terminal for Agriculture.”",
    tags: ["AI", "Research", "Agri-Tech", "Blockchain"],
    link: "#",
  },
];

const ACHIEVEMENTS = [
  {
    title: "1st Place – IIT Kanpur Case Competition",
    description:
      "Developed India’s first digital-firewall model to counter misinformation.",
    image: "/images/iitk.jpg",
    date: "2025",
    place: "IIT Kanpur",
  },
  {
    title: "2nd Place – IIM Bodh Gaya Challenge",
    description: "Built a $10 M sustainable portfolio delivering 24% CAGR.",
    image: "/images/iimbg.jpg",
    date: "2025",
    place: "IIM Bodh Gaya",
  },
  {
    title: "2nd Place – IIFM Srijan Hackathon",
    description:
      "Awarded for the GaiaOS Energy Internet System concept and proof-of-concept.",
    image: "/images/win-srijan.jpg",
    date: "2025",
    place: "IIFM Bhopal",
  },
  {
    title: "Finalist – IIM Ahmedabad & IIFM",
    description:
      "Finalist for AI-driven business and re-branding cases (Marketing Maverick).",
    image: "/images/iima.jpg",
    date: "2025",
    place: "IIM Ahmedabad & IIFM",
  },
];

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Computer Science (Data Science)",
    institution: "Acropolis Institute of Technology & Research, Indore",
    period: "2024 - 2028",
    description:
      "Relevant Coursework: Data Analysis, Machine Learning, Business Intelligence, Economics of Innovation.",
  },
];

// --- Helper Hooks ---
const useSearchFilter = (items, searchTerm) => {
  return useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) return items;
    const lowerCaseSearch = searchTerm.toLowerCase();

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerCaseSearch);
        }
        if (Array.isArray(value)) {
          return value.some((tag) =>
            String(tag).toLowerCase().includes(lowerCaseSearch)
          );
        }
        if (typeof value === "object" && value !== null) {
          // check nested fields (e.g., tags inside objects)
          return Object.values(value).some((v) =>
            String(v).toLowerCase().includes(lowerCaseSearch)
          );
        }
        return false;
      });
    });
  }, [items, searchTerm]);
};

// --- Components ---
const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-20 scroll-mt-24">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-linear-to-br from-cyan-500 to-teal-500 p-3 rounded-xl">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Hero = () => (
  <header className="mb-20 relative">
    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-teal-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"></div>

    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-teal-500 rounded-full blur-2xl opacity-50"></div>
        <img
          src={PERSONAL_INFO.photo}
          alt={PERSONAL_INFO.name}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-cyan-500/30 shadow-2xl"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-linear-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-2">
          {PERSONAL_INFO.title}
        </p>
        <p className="text-lg text-gray-400 mb-6">{PERSONAL_INFO.tagline}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-cyan-500"
          >
            <Email className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-300">{PERSONAL_INFO.email}</span>
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-teal-500"
          >
            <Phone className="w-5 h-5 text-teal-400" />
            <span className="text-gray-300">{PERSONAL_INFO.phone}</span>
          </a>
        </div>

        <div className="flex justify-center md:justify-start gap-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-cyan-500 hover:scale-110"
          >
            <GitHub className="w-6 h-6 text-gray-300" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-blue-500 hover:scale-110"
          >
            <LinkedIn className="w-6 h-6 text-gray-300" />
          </a>
        </div>
      </div>
    </div>
  </header>
);

const About = () => (
  <Section id="about" title="About" icon={Person}>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Visibility className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-gray-200">My Vision</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{ABOUT_DATA.vision}</p>
      </div>

      <div className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-teal-500/50 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Person className="w-6 h-6 text-teal-400" />
          <h3 className="text-xl font-semibold text-gray-200">
            Professional Summary
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{ABOUT_DATA.bio}</p>
      </div>
    </div>
  </Section>
);

const Skills = ({ searchTerm }) => {
  const filteredSkills = useSearchFilter(SKILLS_DATA, searchTerm);

  const skillsByCategory = useMemo(() => {
    return filteredSkills.reduce((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }, [filteredSkills]);

  // Sort categories to put "Core Strengths" last
  const sortedCategories = Object.keys(skillsByCategory).sort((a, b) => {
    if (a === "Core Strengths") return 1;
    if (b === "Core Strengths") return -1;
    return a.localeCompare(b);
  });

  return (
    <Section id="skills" title="Skills" icon={Code}>
      {Object.keys(skillsByCategory).length > 0 ? (
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory[category].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-4 py-2 bg-linear-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-lg text-gray-200 font-medium hover:from-cyan-500/30 hover:to-teal-500/30 transition-all hover:scale-105"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No skills match your search.</p>
      )}
    </Section>
  );
};

// const Experience = ({ searchTerm }) => {
//   const filteredExperience = useSearchFilter(EXPERIENCE_DATA, searchTerm);

//   return (
//     <Section id="experience" title="Experience" icon={Work}>
//       {filteredExperience.length > 0 ? (
//         <div className="space-y-6">
//           {filteredExperience.map((job, index) => (
//             <div
//               key={index}
//               className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
//             >
//               <h3 className="text-2xl font-bold text-gray-200 mb-1">
//                 {job.role}
//               </h3>
//               <p className="text-xl font-semibold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
//                 {job.company}
//               </p>
//               <p className="text-sm text-gray-400 mb-4">{job.period}</p>
//               <p className="text-gray-300 mb-4 leading-relaxed">
//                 {job.description}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {(job.tags || []).map((tag) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-gray-300"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">
//           {searchTerm
//             ? "No experience matches your search."
//             : "No professional experience listed."}
//         </p>
//       )}
//     </Section>
//   );
// };

const FeaturedProjects = () => (
  <Section id="featured-projects" title="Featured Projects" icon={Star}>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      {FEATURED_PROJECTS.map((project, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-cyan-500/50 transition-all"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-linear-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gray-700/50 hover:bg-cyan-500/30 border border-white hover:border-cyan-500 px-3 py-2 rounded-lg font-medium text-xs text-gray-300 hover:text-white transition-all backdrop-blur-sm"
              >
                Live Demo
              </a>
              <a
                href={project.ppt}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gray-700/50 hover:bg-blue-500/30 border border-white hover:border-blue-500 px-3 py-2 rounded-lg font-medium text-xs text-gray-300 hover:text-white transition-all backdrop-blur-sm"
              >
                View Idea
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Projects = ({ searchTerm }) => {
  const filteredProjects = useSearchFilter(PROJECTS_DATA, searchTerm);

  return (
    <Section id="projects" title="Other Projects" icon={Code}>
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-teal-500/50 transition-all hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold text-gray-200 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No projects match your search.</p>
      )}
    </Section>
  );
};

const Achievements = () => (
  <Section id="achievements" title="Achievements" icon={EmojiEvents}>
    <div className="grid md:grid-cols-2 gap-6">
      {ACHIEVEMENTS.map((achievement, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-yellow-500/50 transition-all hover:scale-[1.02]"
        >
          {achievement.image ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-linear-to-br from-cyan-500/20 to-teal-500/20">
              <EmojiEvents className="w-12 h-12 text-yellow-400" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <EmojiEvents className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-gray-200">
                {achievement.title}
              </h3>
            </div>
            <p className="text-gray-400 mb-2 leading-relaxed">
              {achievement.description}
            </p>
            <p className="text-sm text-gray-500">{achievement.place}</p>
            <p className="text-sm text-gray-500">{achievement.date}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Education = ({ searchTerm }) => {
  const filteredEducation = useSearchFilter(EDUCATION_DATA, searchTerm);

  return (
    <Section id="education" title="Education" icon={School}>
      {filteredEducation.length > 0 ? (
        <div className="space-y-6">
          {filteredEducation.map((edu, index) => (
            <div
              key={index}
              className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-1">
                {edu.degree}
              </h3>
              <p className="text-xl font-semibold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {edu.institution}
              </p>
              <p className="text-sm text-gray-400 mb-3">{edu.period}</p>
              <p className="text-gray-300 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          No education history matches your search.
        </p>
      )}
    </Section>
  );
};

const Contact = () => (
  <Section id="contact" title="Get In Touch" icon={ContactMail}>
    <div className="p-8 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your vision. Feel free to reach out via
        email or connect with me on social media.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="flex-1 text-center bg-linear-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 px-6 py-4 rounded-xl font-semibold text-lg text-white transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
        >
          <Email className="w-6 h-6 inline-block mr-2" />
          Email Me
        </a>
        <a
          href={PERSONAL_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-4 rounded-xl font-semibold text-lg text-white transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
        >
          <LinkedIn className="w-6 h-6 inline-block mr-2" />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="text-center py-12 border-t border-gray-800">
    <p className="text-gray-400">
      &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
      reserved.
    </p>
    <p className="text-gray-500 text-sm mt-2">
      Built with React, Tailwind CSS & Material UI
    </p>
  </footer>
);

// --- Navigation ---
const SECTIONS = [
  { id: "about", title: "About", icon: Person },
  { id: "skills", title: "Skills", icon: Code },
  { id: "experience", title: "Experience", icon: Work },
  { id: "featured-projects", title: "Featured", icon: Star },
  { id: "achievements", title: "Achievements", icon: EmojiEvents },
  { id: "education", title: "Education", icon: School },
  { id: "contact", title: "Contact", icon: ContactMail },
];

const SearchInput = ({ searchTerm, onSearchChange }) => (
  <div className="relative">
    <input
      type="search"
      placeholder="Search portfolio..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
    />
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
  </div>
);

const TableOfContents = ({ activeSection, searchTerm, onSearchChange }) => (
  <nav className="w-full space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Search
      </h3>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Navigation
      </h3>
      <ul className="space-y-2">
        {SECTIONS.map((section) => {
          const IconComponent = section.icon;
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-linear-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
);

const MobileMenu = ({
  isOpen,
  onClose,
  activeSection,
  searchTerm,
  onSearchChange,
}) => (
  <div
    className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    ></div>
    <div
      className={`absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
      >
        <Close className="w-6 h-6" />
      </button>
      <div className="mt-12">
        <TableOfContents
          activeSection={activeSection}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  </div>
);

const MobileHeader = ({ onMenuOpen }) => (
  <header className="sticky top-0 z-40 p-4 bg-gray-900/80 backdrop-blur-md shadow-lg lg:hidden border-b border-gray-800">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
        {PERSONAL_INFO.name}
      </h2>
      <button
        onClick={onMenuOpen}
        className="p-2 text-gray-400 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </header>
);

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Scroll-spy effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        sectionRefs.current[section.id] = el;
        observer.observe(el);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scrolling
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          setMobileMenuOpen(false);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleClick)
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Mobile Header */}
      <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto no-scrollbar container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 py-12 lg:py-20">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <TableOfContents
                activeSection={activeSection}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Hero />
            <About />
            <Skills searchTerm={searchTerm} />
            {/* <Experience searchTerm={searchTerm} /> */}
            <FeaturedProjects />
            <Achievements />
            <Projects searchTerm={searchTerm} />
            <Education searchTerm={searchTerm} />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
