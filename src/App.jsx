import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./index.css";

/* =========================
   TYPING CHALLENGE
========================= */

const TARGET =
  "I opened this typing test with confidence and now I am aggressively fighting for my life against a paragraph and my own keyboard.";

function TinyFlappy() {
  const [birdY, setBirdY] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [blockX, setBlockX] = useState(500);

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
    const handleJump = (e) => {
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

        if (gameOver) {
          resetGame();
          return;
        }

        setVelocity(jump);
      }
    };

    window.addEventListener("keydown", handleJump);

    return () =>
      window.removeEventListener(
        "keydown",
        handleJump
      );
  }, [gameOver]);

  return (
    <div
  className="card"
  style={{
    height: "330px",
    overflow: "hidden",
    position: "relative",
  }}
>

      <div className="flappy-header">

        <div>
          <div className="card-title">
            flappy burnout
          </div>

          <div className="small-text">
            press SPACE to jump
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
            press SPACE to restart
          </div>

        </div>
      )}

    </div>
  );
}

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
  {
    company: "Prodigy Infotech",
    role: "Android Developer Intern • Chennai, India",
    date: "01/04/2025 – 30/04/2025",
    points: [
      "Created projects for the Android operating system.",
      "Established clear system performance standards.",
      "Developed strategies to maximize performance and lifespan of application systems.",
      "Tested code and identified bugs during development cycles."
    ]
  },
  {
    company: "Retech Solutions",
    role: "Machine Learning Intern • Chennai, India",
    date: "17/02/2025 – 18/03/2025",
    points: [
      "Improved scalability of deep learning models and built analysis tools.",
      "Created graphs and charts for data insights.",
      "Performed feature engineering to improve model performance.",
      "Cleaned and processed raw data and evaluated models using accuracy, precision, and recall."
    ]
  }
];

export function Experience() {
  return (
    <section className="experience-section">
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

export default function App() {

  const [input, setInput] = useState("");

  const [startTime, setStartTime] =
    useState(null);

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

  const [currentProject, setCurrentProject] = useState(0);
  const projects = [

  {
    title: "Aircraft Detection",

    tech: "Python • OpenCV • YOLO",

    year: "2025",

    description:
      "Built a real-time aircraft detection system using computer vision and object detection models focused on realtime inference, tracking accuracy, and visual processing pipelines.",

    vibe:
      "Teaching machines how to observe the sky in realtime.",
  },

  {
    title: "Sentiment Analysis",

    tech: "Python • NLP • Machine Learning",

    year: "2024",

    description:
      "Developed NLP models capable of identifying emotional tone and sentiment from textual data using preprocessing, tokenization, and classification workflows.",

    vibe:
      "Proof that humans hide emotions inside text messages.",
  },

  {
    title: "Fabric Detection",

    tech: "TensorFlow • CNN • ResNet50",

    year: "2025",

    description:
      "Built a deep learning image classification system for identifying fabric categories using transfer learning and convolutional neural network architectures.",

    vibe:
      "Turns out neural networks can develop fashion opinions too.",
  },

];

  return (

    <main>

      {/* HERO */}

      <section className="section">

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
              storytelling, and software.

            </p>

            <div className="button-row">

              <button className="primary-button">
                Explore Build Lab
              </button>

              <a href="/Resume.pdf" download className="secondary-button">
                Get Resume
              </a>

            </div>

          </motion.div>

        </div>

      </section>

      {/* DASHBOARD */}

      <section className="section">

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
              current status
            </div>

            <div className="card-text">

              <p>building ML systems</p>
              <br />

              <p>writing a novel</p>
              <br />

              <p>practicing violin</p>
              <br />

              <p>surviving engineering</p>

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="card"
          >

            <div className="card-title">
              achievements
            </div>

            <div className="card-text">

              <p>Karate Blackbelt</p>
              <br />

              <p>Certified Violinist</p>
              <br />

              <p>Published Co-author</p>
              <br />

              <p>ML Intern</p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* GAMES */}

      <section className="section">

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

      {/* PROJECT MODULE */}

<section className="section">

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

      <button className="project-button">

        Open Project →

      </button>

    </motion.div>

  </div>

</section>

<Experience />

      {/* SIDE QUESTS */}

      <section className="section">

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

        {/* CONTACT */}

<section className="section">

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

</section>

    </main>
  );
}