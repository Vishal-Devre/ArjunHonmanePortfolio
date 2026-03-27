import { useState, useEffect, useRef, type FormEvent } from "react";
import "./App.css";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const revealRefs = useRef<HTMLElement[]>([]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    {
      icon: "🧠",
      title: "AI & Machine Learning",
      tags: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "OpenCV",
        "NLP",
      ],
    },
    {
      icon: "📊",
      title: "Data Science",
      tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL", "Power BI"],
    },
    {
      icon: "💻",
      title: "Web Development",
      tags: ["React", "TypeScript", "Node.js", "HTML/CSS", "REST APIs", "Git"],
    },
    {
      icon: "⚙️",
      title: "Tools & Platforms",
      tags: ["VS Code", "Jupyter", "Google Colab", "Docker", "Linux", "GitHub"],
    },
  ];

  const projects = [
    {
      icon: "🤖",
      type: "Machine Learning",
      title: "AI Chatbot Assistant",
      desc: "An intelligent conversational AI chatbot built using NLP techniques and transformer models for context-aware responses.",
      tech: ["Python", "NLP", "Transformers", "Flask"],
    },
    {
      icon: "📈",
      type: "Data Analysis",
      title: "Stock Price Predictor",
      desc: "A deep learning model that predicts stock market trends using LSTM networks and historical financial data.",
      tech: ["Python", "LSTM", "Pandas", "Matplotlib"],
    },
    {
      icon: "🖼️",
      type: "Computer Vision",
      title: "Image Classification System",
      desc: "A CNN-based image classification system trained on custom datasets with high accuracy for real-world object recognition.",
      tech: ["TensorFlow", "CNN", "OpenCV", "NumPy"],
    },
  ];

  return (
    <div className="app">
      {/* Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Navigation */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollTo("home")}>
            AH.
          </button>

          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle-mobile"
              style={{ display: "none" }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button
              className={`nav-hamburger ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              id="hamburger-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${activeSection === link.id ? "active" : ""}`}
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* ========== HERO ========== */}
      <section className="section hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to Opportunities
            </div>

            <h1 className="hero-name">
              Hi, I'm <br />
              <span className="hero-name-gradient">Arjun Honmane</span>
            </h1>

            <p className="hero-title">BTech AI & Data Science Student</p>

            <p className="hero-description">
              Passionate about building intelligent systems and leveraging data
              to solve real-world problems. Exploring the intersections of
              artificial intelligence, machine learning, and software
              engineering.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => scrollTo("projects")}
              >
                <span>🚀</span> View Projects
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollTo("contact")}
              >
                <span>💬</span> Get in Touch
              </button>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/Vishal-Devre/ArjunHonmanePortfolio.git"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Repo"
              >
                ⌨️
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="mailto:arjun@example.com"
                className="social-link"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-avatar-wrapper">
              <div className="hero-avatar-ring" />
              <div className="hero-avatar">
                <img src="/avatar.png" alt="Arjun Honmane" />
              </div>

              <div className="hero-float-card card-1">
                <span className="icon">🎓</span>
                <div>
                  <strong>AI & DS</strong>
                  <br />
                  <small style={{ color: "var(--text-tertiary)" }}>
                    BTech Student
                  </small>
                </div>
              </div>

              <div className="hero-float-card card-2">
                <span className="icon">💡</span>
                <div>
                  <strong>Problem Solver</strong>
                  <br />
                  <small style={{ color: "var(--text-tertiary)" }}>
                    Creative Thinker
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="section" id="about" ref={addRevealRef}>
        <div className="reveal" ref={addRevealRef}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Passionate About AI & Innovation</h2>
          <p className="section-subtitle">
            A dedicated BTech student specializing in Artificial Intelligence &
            Data Science, driven by curiosity and a love for technology.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text reveal" ref={addRevealRef}>
            <p>
              I'm Arjun Honmane, currently pursuing my BTech in Artificial
              Intelligence & Data Science. My journey in tech started with a
              fascination for how machines can learn and make decisions, and it
              has evolved into a deep passion for building intelligent
              solutions.
            </p>
            <p>
              I enjoy working on machine learning models, data analysis
              pipelines, and web applications. When I'm not coding, you'll find
              me exploring new research papers, contributing to open-source
              projects, or participating in hackathons.
            </p>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Hackathons</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2+</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
          </div>

          <div className="about-info-grid reveal" ref={addRevealRef}>
            <div className="about-info-item">
              <div className="about-info-icon">🎓</div>
              <div className="about-info-content">
                <h4>Education</h4>
                <p>BTech in AI & Data Science</p>
              </div>
            </div>
            <div className="about-info-item">
              <div className="about-info-icon">📍</div>
              <div className="about-info-content">
                <h4>Location</h4>
                <p>India</p>
              </div>
            </div>
            <div className="about-info-item">
              <div className="about-info-icon">🎯</div>
              <div className="about-info-content">
                <h4>Focus Areas</h4>
                <p>Machine Learning, Deep Learning, Data Analytics</p>
              </div>
            </div>
            <div className="about-info-item">
              <div className="about-info-icon">🌐</div>
              <div className="about-info-content">
                <h4>Languages</h4>
                <p>English, Hindi, Marathi</p>
              </div>
            </div>
            <div className="about-info-item">
              <div className="about-info-icon">🏆</div>
              <div className="about-info-content">
                <h4>Interests</h4>
                <p>Open Source, Hackathons, Research Papers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section className="section" id="skills">
        <div className="reveal" ref={addRevealRef}>
          <p className="section-label">My Skills</p>
          <h2 className="section-title">Technologies & Tools</h2>
          <p className="section-subtitle">
            A comprehensive toolkit spanning AI/ML, data science, and web
            development.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div key={i} className="skill-category reveal" ref={addRevealRef}>
              <div className="skill-category-icon">{cat.icon}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section className="section" id="projects">
        <div className="reveal" ref={addRevealRef}>
          <p className="section-label">My Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects showcasing my skills in AI, data science,
            and development.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card reveal" ref={addRevealRef}>
              <div className="project-image">{project.icon}</div>
              <div className="project-body">
                <span className="project-type">{project.type}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href="#"
                    className="project-link-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    🔗 Live Demo
                  </a>
                  <a
                    href="#"
                    className="project-link-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    📂 Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section className="section" id="contact">
        <div className="reveal" ref={addRevealRef}>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info reveal" ref={addRevealRef}>
            <p>
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              I'll do my best to get back to you!
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon">✉️</div>
                <div className="contact-method-text">
                  <h4>Email</h4>
                  <p>arjun.honmane@example.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon">📍</div>
                <div className="contact-method-text">
                  <h4>Location</h4>
                  <p>India</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon">💼</div>
                <div className="contact-method-text">
                  <h4>LinkedIn</h4>
                  <p>linkedin.com/in/arjun-honmane</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="contact-form reveal"
            ref={addRevealRef}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              <span>🚀</span> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">
            © 2026 <span>Arjun Honmane</span>. Built with ❤️ and React.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
