import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./index.css";



//NAVBAR

const navItems = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "SKILLS", id: "skills" },
  { label: "PROJECTS", id: "projects" },
  { label: "GAMES", id: "games" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "SIDE QUESTS", id: "sidequests" },
  {label: "EDUCATION", id: "education" },
  { label: "CONTACT", id: "contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");

  // smooth scroll on click
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // scroll spy
useEffect(() => {
  const sections = navItems
    .map((item) => document.getElementById(item.id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      let bestMatch = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            !bestMatch ||
            entry.intersectionRatio > bestMatch.intersectionRatio
          ) {
            bestMatch = entry;
          }
        }
      });

      if (bestMatch) {
        setActive(bestMatch.target.id);
      }
    },
    {
      root: null,
      threshold: [0.4, 0.6, 0.8], // multi-level stability
      rootMargin: "-80px 0px -40% 0px", 
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  return () => observer.disconnect();
}, []);

  return (
    <nav className="retro-navbar">
      <div className="navbar-shell">

        <div className="navbar-title">
          {"Portfolio >>>"}
        </div>

        <div className="navbar-items">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>

      </div>
    </nav>
  );
};

//EDUCATION MODULE
const educationData = [
  {
    institute: "Misrimal Navajee Munoth Jain Engineering College",
    degree: "B.Tech in Computer Science and Business Systems",
    grade: "CGPA: 9.0",
    location: "Chennai, Tamil Nadu, India",
    duration: "06/2023 - 06/2027",
    tag: "MAIN QUEST",
    highlight: true,
  },
  {
    institute: "Indira Gandhi National Open University",
    degree: "B.A. English Literature (Honours)",
    grade: "",
    location: "Chennai, Tamil Nadu, India",
    duration: "06/2023 - 06/2027",
    tag: "SIDE QUEST",
    highlight: false,
  },
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="container">

        <h2 className="education-title">EDUCATION</h2>

        <div className="education-timeline">

          {educationData.map((item, index) => (
            <div
              className={`education-item ${
                item.highlight ? "main" : "side"
              }`}
              key={index}
            >

              <div className="education-node"></div>

              <div className="education-card">

                <div className="education-tag">
                  {item.tag}
                </div>

                <h3 className="education-institute">
                  {item.institute}
                </h3>

                <div className="education-degree">
                  {item.degree}
                </div>

                {item.grade && (
                  <div className="education-grade">
                    {item.grade}
                  </div>
                )}

                <div className="education-meta">
                  {item.location}
                </div>

                <div className="education-duration">
                  {item.duration}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};


// FLAPPY BIRD GAME

function TinyFlappy() {
  const [birdY, setBirdY] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [blockX, setBlockX] = useState(500);

  const handleJump = () => {
  if (gameOver) {
    resetGame();
    return;
  }

  setVelocity(jump);
};

  const [blockY, setBlockY] = useState(
    Math.floor(Math.random() * 120) + 40
  );

  const gravity = 0.5;
  const jump = -8;

  const resetGame = () => {
    setBirdY(100);
    setVelocity(0);
    setGameOver(false);
    setScore(0);
    setBlockX(500);

    setBlockY(
      Math.floor(Math.random() * 120) + 40
    );
  };

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setVelocity((v) => v + gravity);

      setBirdY((y) => {
        const next = y + velocity;

        if (next > 250 || next < 0) {
          setGameOver(true);
        }

        return next;
      });

      setBlockX((x) => {
        const nextX = x - 6;

        if (
          nextX < 90 &&
          nextX > 20 &&
          birdY > blockY &&
          birdY < blockY + 40
        ) {
          setGameOver(true);
        }

        if (nextX < -40) {
          setBlockY(
            Math.floor(Math.random() * 120) + 40
          );

          return 500;
        }

        return nextX;
      });

      setScore((s) => s + 1);
    }, 30);

    return () => clearInterval(gameLoop);
  }, [velocity, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;

      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();

        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [gameOver]);

  return (
    <div
      className="card"
      onClick={handleJump}
      style={{
        height: "330px",
        overflow: "hidden",
        position: "relative",
        touchAction: "manipulation",
        cursor: "pointer",
      }}
    >
      <div className="flappy-header">
        <div>
          <div className="card-title">
            flappy burnout
          </div>
          <div className="small-text">
            press SPACE or TAP to jump
          </div>
        </div>
        <div className="score">
          {score}
        </div>
      </div>
      <div
        className="bird"
        style={{
          top: birdY,
        }}
      >
        🐤
      </div>

      <div
        className="block"
        style={{
          left: blockX,
          top: blockY,
        }}
      />

      {gameOver && (
        <div className="game-over">

          <div className="game-over-title">
            burnout detected
          </div>

          <div className="small-text">
            score: {score}
          </div>

          <div className="restart-text">
            press SPACE or TAP to restart
          </div>

        </div>
      )}

    </div>
  );
}

//SKILLS MODULE

const skillsData = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "C", "C++"],
    color: "yellow",
  },
  {
    category: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Figma"],
    color: "blue",
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    color: "green",
  },
  {
    category: "Databases",
    items: ["MongoDB", "SQL", "Firebase"],
    color: "purple",
  },
  {
    category: "Core CS",
    items: ["DSA", "OOPs", "OS", "DBMS"],
    color: "pink",
  },
  {
    category: "Tools",
    items: ["Python Selenium Library","Git", "GitHub", "Postman", "Power BI"],
    color: "orange",
  },
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const active = skillsData[activeIndex];

  return (
    <section id="skills" className="section skills-console">
      <div className="container">

        <h2 className="card-title">SKILLS</h2>

        <div className="skills-console-layout">

          {/* LEFT MENU */}
          <div className="skills-menu">
            {skillsData.map((item, idx) => (
              <div
                key={idx}
                className={`menu-item ${activeIndex === idx ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                {item.category}
              </div>
            ))}
          </div>

          {/* MAIN DISPLAY */}
          <div className="skills-display">

            <div className={`display-header ${active.color}`}>
              {active.category}
            </div>

            <div className="display-grid">
              {active.items.map((skill, idx) => (
                <div key={idx} className="display-skill">
                  <span className="dot">▹</span>
                  {skill}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


// EXPERIENCE MODULE
const experiences = [
  {
    company: "DonutTech Private Limited",
    role: "Software Developer Intern • Chennai, India",
    date: "20/08/2025 – 20/10/2025",
    points: [
      "Contributed to the development of the Income Tax Return (ITR) Support Service Agent, focusing on optimizing the client-side experience within the Chromium environment.",
      "Implemented and refined browser-level functionalities that integrated seamlessly with the company’s AI-driven support platform.",
      "Gained hands-on experience in browser architecture, performance optimization, and client-AI interaction pipelines.",
      "Collaborated with cross-functional teams to debug, test, and enhance user-facing modules, demonstrating strong problem-solving and teamwork skills."
    ]
  },
  {
    company: "Sortyx Ventures Private Limited",
    role: "Internet of Things Intern • Chennai, India",
    date: "21/07/2025 – 20/08/2025",
    points: [
      "Created dashboards and helped develop the e-commerce website YuvaIOT, improving frontend skills.",
      "Redesigned company logo and product catalogue, contributing to UI/UX design.",
      "Scraped large volumes of data from TTN and pushed them into the database, building dashboards.",
      "Worked on real-time hybrid projects and helped automate smart bin systems.",
      "Connected products to classifiers, strengthening backend integration skills."
    ]
  },
];


export function Experience() {
  return (
    <section id="experience" className="experience-section">
      {/* ADDED CONTAINER HERE TO FIX THE WIDTH */}
      <div className="experience-container">
        
        <h2 className="card-title">Experience</h2>

        <div className="experience-list">
          {experiences.map((exp, i) => (
            <div className="experience-card" key={i}>
              
              <div className="experience-header">
                <div className="experience-company">
                  {exp.company}
                </div>
                <div className="experience-date">
                  {exp.date}
                </div>
              </div>

              <div className="experience-role">
                {exp.role}
              </div>

              <ul className="experience-list-items">
                {exp.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
// TRAINEE EXPERIENCES
const traineeExperiences = [
  {
    company: "Prodigy Infotech",
    companyUrl: "https://drive.google.com/file/d/1hIHBRdzLi4uVdHfyC28fZbeWnLr9BxNs/view?usp=sharing",
    role: "Android Developer Intern",
    certUrl: "https://drive.google.com/file/d/1hI8Fb99XGZgbzZJ5blURV3DvNxFND7hm/view?usp=sharing",
    location: "Chennai, India",
    duration: "01/04/2025 – 30/04/2025",
  },
  {
    company: "Retech Solutions",
    companyUrl: "https://retechsolutions.in/",
    role: "Machine Learning Intern",
    certUrl: "https://drive.google.com/file/d/15XmPD3St2_Da6VvF8LGGH5hRr3qR1F1F/view?usp=sharing",
    location: "Chennai, India",
    duration: "17/02/2025 – 18/03/2025",
  },
];

export default function App() {

  const [input, setInput] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    {
      command: "help",
      output: `
      Available commands:
      help
      whoami
      skills
      projects
      internships
      resume
      contact
      clear
      `,
        },
      ]);

    const terminalCommands = {
    help: `
    Available commands:
    help
    whoami
    skills
    projects
    internships
    certifications
    resume
    contact
    clear
    `,

      whoami: `
    Computer Science student focused on AI,
    Machine Learning, and Full-Stack Development.
    `,

      skills: `
    - Python
    - React
    - FastAPI
    - OpenCV
    - MongoDB
    - Machine Learning
    - Computer Vision
    `,

      projects: `
    - Quill (My Personal AI Agent)
    - LogisticAI
    - Zozu Photobooth
    - Aircraft Tracking System
    - Fabric Classifier
    - Emotion Analyzer
    `,

      internships: `
    - Software Developer Intern at DonutTech
    - Web Developer Intern at Sortyx Ventures
    - Machine Learning Intern at Retech Solutions
    - Android Developer Intern at Prodigy Infotech
    - UI/UX Designer Intern at TechVedhu
    `,

      certifications: `
    - Silver Elite — Python for Data Science from NPTEL, IIT Madras
    - Linux Programming from Anna University, Guindy
    - Recent Developments in AI (Bootcamp) from Smarted
    - Python Programming from Infosys Springboard
    - Advanced Diplomat — Music & Violin from BSS University
    - Violin Grade V from Annamalai University
    `,

      contact: `
    - Email: divyasreem1601@gmail.com

    - GitHub: github.com/divya-160106
    `,
    };

    const handleTerminalCommand = (e) => {
    e.preventDefault();

    const cmd = terminalInput.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    if (cmd === "resume") {
      window.open("/Divyasree-Manikandan.pdf", "_blank");

      setTerminalHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: "Opening resume...",
        },
      ]);

      setTerminalInput("");
      return;
    }

    setTerminalHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output:
          terminalCommands[cmd] ||
          "Command not found. Type 'help'.",
      },
    ]);

    setTerminalInput("");
  };

  // TYPING CHALLENGE

  const TARGET = "I opened this typing test with confidence and now I am aggressively fighting for my life against a paragraph and my own keyboard.";
  const [startTime, setStartTime] =useState(null);
  const [lpm, setLpm] = useState(0);


useEffect(() => {
  if (input.length === 1 && startTime === null) {
    setStartTime(Date.now());
    return;
  }

  if (input.length > 1 && startTime) {
    const minutes = Math.max((Date.now() - startTime) / 60000, 0.01);
    const letters = input.length;

    setLpm(Math.round(letters / minutes));
  }
}, [input, startTime]);

  const roast =
    lpm < 50
      ? "typing like the keyboard owes you money."
      : lpm < 100
      ? "respectable but emotionally unstable."
      : lpm < 290
      ? "your keyboard is fearing for its life."
      : "calm down hacker protagonist.";

//SIDE QUESTS
  const quests = [
    {
      title: "Published Co-Author",

      desc:
        "• Co-authored and published in an anthology.\n\n" +
        "• Developed strong storytelling and creative writing skills through collaborative literary work.\n\n" +
        "• Explored narrative structure, editing workflows, and expressive writing techniques.",
    },

    {
      title: "Karate Blackbelt",

      desc:
        "• Earned a blackbelt through years of disciplined training and competitive practice.\n\n" +
        "• Built resilience, consistency, focus, and mental discipline.\n\n" +
        "• Strengthened leadership and self-confidence through structured progression.",
    },

    {
      title: "Certified Violinist",

      desc:
        "• Trained in classical violin with practical and theoretical music education.\n\n" +
        "• Performed and practiced across multiple levels of certification.\n\n" +
        "• Developed patience, precision, creativity, and stage confidence.",
    },

    {
      title: "Football Experience",

      desc:
        "• Participated in competitive football and team-based tournaments.\n\n" +
        "• Learned collaboration, adaptability, and strategic teamwork.\n\n" +
        "• Improved communication and decision-making under pressure.",
    },

    {
      title: "Classical Dance",

      desc:
        "• Performed classical dance while balancing academics and technical projects.\n\n" +
        "• Strengthened discipline, presentation skills, and artistic expression.\n\n" +
        "• Gained experience in stage performance and choreography.",
    },

    {
      title: "Creative Writing",

      desc:
        "• Writes fiction and reflective pieces exploring creativity and storytelling.\n\n" +
        "• Interested in character development, emotional narratives, and literary structure.\n\n" +
        "• Maintains writing as a long-term creative pursuit alongside engineering.",
    },
  ];

  //PROJECTS
  const [currentProject, setCurrentProject] = useState(0);
  const projects = [

   {
    title: "Quill - My AI Agent",
    tech: "React • LangChain • RAG • ChromaDB • Vite",
    year: "2026",
    description:
      "Built a retrieval-augmented generation (RAG) AI chatbot that answers questions about my projects, skills, and background by embedding portfolio content into ChromaDB and querying it through a LangChain pipeline. Includes a React-based chat interface for natural conversation and modular retrieval architecture for future data sources.",
    vibe: "Your intelligent portfolio companion that actually understands you.",
    link: "https://quill-aiagent.vercel.app",
    glink: "https://github.com/divya-160106/Quill"
  },

  {
    title: "Zozu Photobooth",
    tech: "React+Vite • Flask • Cloudinary • React Webcam • QR Code Generation",
    year: "2026",
    description:"Developed a full-stack photobooth application featuring webcam capture, themed filters, polaroid-style photo generation, cloud uploads, and QR-based photo sharing directly from the browser.",
    vibe:"Bringing the photobooth experience to the web.",
    link: "https://zozu-photobooth.vercel.app",
    glink:"https://github.com/divya-160106/Photobooth",
  },

  
  {
    title: "Logistic AI",
    tech: "React • FastAPI • MongoDB • WebSockets • Leaflet.js • Reinforcement Learning",
    year: "2026",
    description:"Built an enterprise-style logistics optimization platform featuring AI-powered route planning, interactive mapping, real-time updates, environmental constraints, and reinforcement learning–based decision making for dispatch operations.",
    vibe:"Teaching routes to think before they drive.",
    link: "https://logistic-ai-swart.vercel.app",
    glink: "https://github.com/divya-160106/Logistic-AI",
  },

  {
  title: "Aircraft Tracking System",
  tech: "Python • OpenCV • NumPy • SciPy • Computer Vision • Motion Analysis",
  year: "2025",
  description:
    "Developed a real-time aircraft tracking system that detects airborne objects from video streams, estimates velocity, calculates spatial positioning, and predicts future flight trajectories using computer vision and motion analysis techniques.",
  vibe:
    "Teaching machines to anticipate where the sky moves next.",
  link: "https://github.com/divya-160106/Aircraft-detection",
},
{
  title: "Fabric Type Classifier",
  tech: "Python • TensorFlow • Keras • ResNet50 • OpenCV • Transfer Learning • Image Augmentation",
  year: "2025",
  description:
    "Built a deep learning pipeline to classify fabric types — Cotton, Wool, Rayon, and Silk — from images using a fine-tuned ResNet50 model with progressive layer unfreezing, custom augmentation, and confidence-based bar chart outputs.",
  vibe:
    "Making neural networks feel the difference between silk and cotton.",
  link: "https://github.com/divya-160106/Fabric-detection",
},
{
  title: "Multimodal Emotion Analyzer",
  tech: "Python • OpenCV • FER • NLTK • VADER • Pandas • Matplotlib • NLP • Computer Vision",
  year: "2025",
  description:
    "Designed a multimodal emotion detection system that analyzes facial expressions from images and sentiment from text, combining both signals to identify dominant emotional states and deliver personalized wellness responses.",
  vibe:
    "Because how you look and what you say both tell a story.",
  link: "https://github.com/divya-160106/Sentimment-Analysis",
},

];

  return (

    <main>
      <Navbar />

      {/* HERO */}

      <section id= "home" className="section">

        <div className="container">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <h1 className="hero-title">

              Divyasree

              <span className="hero-accent">
                Manikandan
              </span>

            </h1>

            <div className="hero-subtitle">

              <TypeAnimation
                sequence={[
                  "Software Developer",
                  2000,
                  "Web Developer",
                  2000,
                  "ML & Automation Engineer",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              />

            </div>

            <p className="hero-description">

              Engineering student.
              Literature student.
              AI builder.
              Violinist.
              Writer.

              Exploring the intersection of
              machine learning, creativity,
              storytelling, and software engineering.

            </p>

            <div className="button-row">

              <button
                className="primary-button"
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Experience
              </button>

              <a href="/Divyasree-Manikandan.pdf" download className="secondary-button">
                Get Resume
              </a>

            </div>

          </motion.div>

        </div>

      </section>

      {/* DASHBOARD */}

      <section id="about" className="section">

        <div className="container grid-3">

          <motion.div
            whileHover={{ y: -6 }}
            className="card music-card"
          >

            <div className="card-title">
              currently playing
            </div>

            <iframe
              src="https://open.spotify.com/embed/playlist/2Af5sDLOZiTyhtux9BjEgx"
              width="100%"
              height="352"
              style={{
                borderRadius: "16px",
              }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="card"
          >

            <div className="card-title">
              <a
              href="#projects"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
                zozu
              </a>
               - take a photo
            </div>

            <iframe
            src="https://zozu-photobooth.vercel.app"
            width="100%"
            height="352"
            style={{ borderRadius: "16px" }}
            frameBorder="0"
            allow="camera; microphone; autoplay; clipboard-write; fullscreen"
            loading="lazy"
          />

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="card"
          >
            <div className="card-title">
              terminal.exe
            </div>

            <div className="terminal-window">

              {terminalHistory.map((entry, i) => (
                <div key={i}>

                  <div className="terminal-line">
                    divya@os:~$ {entry.command}
                  </div>

                  <pre className="terminal-output">
                    {entry.output}
                  </pre>

                </div>
              ))}

              <form className="terminal-form" onSubmit={handleTerminalCommand}>

                <span className="terminal-prompt">
                  divya@os:~$
                </span>

                <input
                  value={terminalInput}
                  onChange={(e) =>
                    setTerminalInput(e.target.value)
                  }
                  className="terminal-input"
                  autoComplete="off"
                  spellCheck={false}
                />

              </form>

            </div>
          </motion.div>

        </div>

      </section>

      <Skills />


      {/* PROJECT MODULE */}

<section id="projects" className="section">

  <div className="container">

    <div className="project-header">

      <h2 className="card-title">
        Build Lab
      </h2>

      <div className="project-controls">

        <button
          onClick={() =>
            setCurrentProject(
              (prev) =>
                (prev - 1 + projects.length) %
                projects.length
            )
          }
          className="project-arrow"
        >
          ←
        </button>

        <button
          onClick={() =>
            setCurrentProject(
              (prev) =>
                (prev + 1) % projects.length
            )
          }
          className="project-arrow"
        >
          →
        </button>

      </div>

    </div>

    <motion.div
      key={currentProject}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="project-card"
    >

      <div className="project-top">

        <div>

          <div className="project-tech">

            {projects[currentProject].tech}

          </div>

          <h3 className="project-title">

            {projects[currentProject].title}

          </h3>

          <div className="project-year">

            {projects[currentProject].year}

          </div>

        </div>

      </div>

      <p className="project-description">

        {projects[currentProject].description}

      </p>

      <div className="project-vibe">

        “{projects[currentProject].vibe}”

      </div>
    <div className="project-buttons">

      <button
        className="project-button"
        onClick={() =>
          window.open(projects[currentProject].link, "_blank")
        }
      >
        Open Project →
      </button>

      {projects[currentProject].glink && (
        <button
          className="project-button"
          onClick={() =>
            window.open(projects[currentProject].glink, "_blank")
          }
        >
          Open GitHub →
        </button>
      )}

    </div>

    </motion.div>

  </div>

</section>

{/* GAMES */}

      <section id="games" className="section">

        <div className="container grid-2">

          <TinyFlappy />

          <motion.div
            whileHover={{ y: -6 }}
            className="card"
          >

            <div className="card-title">
              typing challenge
            </div>

            <div className="small-text">
              race against your own overthinking.
            </div>

            <div className="code-box">
              {TARGET}
            </div>

            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="type the paragraph here..."
              className="typing-input"
            />

            <div className="small-text">
              LPM: {lpm || 0}
            </div>

            <div className="small-text">
              {roast}
            </div>

          </motion.div>

        </div>

      </section>

    <Experience />

    {/* TRAINEE EXPERIENCES */}
    <section className="experience-section">
    <div className="experience-container">

      <h2 className="card-title">
        Traineeships
      </h2>

      <div className="experience-list">

        {traineeExperiences.map((exp, index) => (
          <div
            key={index}
            className="experience-card"
          >

            <div className="experience-role">
              {exp.role}
            </div>

            <h3 className="experience-company">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {exp.company}
              </a>
            </h3>

            <div className="experience-date">
              {exp.duration}
            </div>

            <div className="small-text">
              📍 {exp.location}
            </div>

            <br />

            <a
              href={exp.certUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="project-button">
                View Certificate →
              </button>
            </a>

          </div>
        ))}

      </div>

    </div>
  </section>

      {/* SIDE QUESTS */}

      <section id="sidequests" className="section">

        <div className="container">

          <h2 className="card-title">
            Side Quests
          </h2>

          <div className="sidequest-grid">

            {quests.map((quest, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                }}
                className="sidequest-card"
              >

                <div className="sidequest-title">
                  {quest.title}
                </div>

                <div className="sidequest-description">
                  {quest.desc}
                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

<Education />

        {/* CONTACT */}

<section id="contact" className="section">

  <div className="contact-card">

    <h2 className="card-title">
      Transmission Hub
    </h2>

    <p className="contact-text">

      Available for internships,
      collaborative projects,
      creative problem solving,
      and meaningful ideas at the
      intersection of technology and 
      design.

    </p>

    <div className="contact-links">

      <a
        href="mailto:divyasreem1601@gmail.com"
        className="contact-button"
      >
        Email
      </a>

      <a
        href="https://github.com/divya-160106"
        className="contact-button"
      >
        GitHub
      </a>

      <a
        href="https://www.linkedin.com/in/divyasree-manikandan-362950297/"
        className="contact-button"
      >
        LinkedIn
      </a>

      <a
        href="https://medium.com/@divya_1601"
        className="contact-button"
      >
        Blog
      </a>

      <a
        href="https://leetcode.com/u/divya_160106/"
        className="contact-button"
      >
        Leetcode
      </a>

    </div>

  </div>

  <div className="contact-footer">
    © 2026 Divyasree Manikandan. All rights reserved.
  </div>


</section>
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
>
    {/* FLOATING CHATBOT */}
    <button
      onClick={() => setChatOpen((prev) => !prev)}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: "#111",
        color: "white",
        fontSize: "22px",
        zIndex: 9999,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      <img
        src="/Quill.png"
        alt="chat"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          display: "block",
        }}
      />
    </button>

    {chatOpen && (
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "360px",
          height: "520px",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          zIndex: 9999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <iframe
          src="https://quill-aiagent.vercel.app/"
          title="chatbot"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    )}
    </motion.div>
  </main>
    
  );
}
