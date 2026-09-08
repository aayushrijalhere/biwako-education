import { useState, useEffect } from "react";

// ========== DATA ==========
const services = [
  {
    icon: "🗣️",
    title: "Japanese Language Courses",
    description:
      "Structured JLPT-focused classes from beginner to advanced, taught by experienced instructors with cultural immersion.",
  },
  {
    icon: "🏫",
    title: "School & University Placement",
    description:
      "Personalised matching with top language schools and universities across Japan based on your goals and budget.",
  },
  {
    icon: "📄",
    title: "Student Visa Support",
    description:
      "End-to-end documentation, COE guidance, and application assistance with a proven high success rate.",
  },
  {
    icon: "✈️",
    title: "Pre-Departure & Arrival",
    description:
      "Orientation, accommodation help, airport pickup coordination, and settling-in support once you reach Japan.",
  },
  {
    icon: "🎯",
    title: "Career & Pathway Planning",
    description:
      "Guidance on post-language school options — higher education, skilled worker visa, and long-term career paths.",
  },
  {
    icon: "🤝",
    title: "Ongoing Mentorship",
    description:
      "Continuous support even after you arrive — academic advice, cultural guidance, and emergency assistance.",
  },
];

const steps = [
  {
    num: 1,
    title: "Free Consultation",
    description:
      "We understand your academic background, goals, budget, and timeline in a no-pressure session.",
  },
  {
    num: 2,
    title: "Personalised Roadmap",
    description:
      "Receive a custom plan covering language preparation, school options, costs, and visa timeline.",
  },
  {
    num: 3,
    title: "Application & Visa",
    description:
      "We prepare and submit all documents, follow up with schools, and guide you through the COE & visa process.",
  },
  {
    num: 4,
    title: "Departure & Beyond",
    description:
      "Final orientation, travel support, and continued mentoring after you land in Japan.",
  },
];

const results = [
  {
    name: "Anisha R.",
    path: "Language School → Tokyo",
    before: "Confused about process & costs",
    after: "Enrolled + Visa approved in 4 months",
    quote:
      "“I had no idea where to start. Biwako gave me a clear timeline and handled everything professionally.”",
  },
  {
    name: "Suman K.",
    path: "University Pathway",
    before: "Low Japanese level + unclear goals",
    after: "JLPT N3 + University acceptance",
    quote:
      "“They didn’t just process papers — they helped me build a real long-term plan in Japan.”",
  },
  {
    name: "Priya M.",
    path: "Complete Package",
    before: "Worried about rejection & costs",
    after: "Smooth visa + settled in Osaka",
    quote:
      "“Transparent fees and constant updates. I felt supported every single step.”",
  },
];

const testimonials = [
  {
    name: "Rajan Thapa",
    location: "Now in Fukuoka",
    initial: "R",
    text: "“Best decision I made. From documentation to pre-departure briefing, everything was handled with care. Highly recommend Biwako.”",
  },
  {
    name: "Sita Gurung",
    location: "Language School, Tokyo",
    initial: "S",
    text: "“They explained every cost clearly and never pressured me. My visa came through smoothly. Very professional team.”",
  },
  {
    name: "Bikash Adhikari",
    location: "Osaka University Pathway",
    initial: "B",
    text: "“Even after I arrived in Japan, they checked on me. That level of support is rare. Grateful for Biwako Education.”",
  },
];

const faqs = [
  {
    question: "How long does the entire process take?",
    answer:
      "Typically 4–8 months from first consultation to departure, depending on intake season (April or October) and document readiness. We create a personalised timeline in your first meeting.",
  },
  {
    question: "What are the total costs involved?",
    answer:
      "Costs vary by school and city. We provide a transparent breakdown covering tuition, living expenses, visa fees, and our service fee during the free consultation — no hidden charges.",
  },
  {
    question: "Do I need Japanese language skills before applying?",
    answer:
      "Not necessarily. Many language schools accept beginners. We assess your current level and recommend the right starting point, including preparatory classes if needed.",
  },
  {
    question: "What is your visa success rate?",
    answer:
      "We maintain a very high success rate by carefully screening applications and preparing thorough documentation. We only proceed with cases we believe have strong potential.",
  },
  {
    question: "Can I work part-time while studying in Japan?",
    answer:
      "Yes. Student visa holders can work up to 28 hours per week during term and full-time during official holidays, subject to permission. We guide you on the process.",
  },
];

// ========== COMPONENTS ==========

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container nav">
        <a href="#" className="logo">
          Biwako <span>International</span> <span>Group</span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#process">How It Works</a>
          </li>
          <li>
            <a href="#results">Success Stories</a>
          </li>
          <li>
            <a href="#testimonials">Reviews</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>

        <div className="nav-cta">
          <a
            href="https://wa.me/+8108030705916"
            className="btn btn-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href="#booking" className="btn btn-primary">
            Book Free Call
          </a>
        </div>

        <button className="mobile-toggle" aria-label="Menu">
          ☰
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          interest: formData.interest,
          source: "hero-form",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", interest: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-badge">
            🇯🇵 Premium Study-in-Japan Consultancy
          </div>
          <h1>
            Your Trusted Path to <span>Studying in Japan</span>
          </h1>
          <p className="hero-sub">
            Expert counselling, Japanese language preparation, university &
            language school admissions, and complete student visa support — all
            under one roof.
          </p>

          <div className="hero-ctas">
            <a href="#booking" className="btn btn-gold">
              Book Free Consultation
            </a>
            <a
              href="https://wa.me/+8108030705916"
              className="btn btn-outline"
              style={{ borderColor: "white", color: "white" }}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Students Guided</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Visa Success Rate</p>
            </div>
            <div className="stat-item">
              <h3>7+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <h3>Start Your Japan Journey</h3>
          <p>
            Fill this form and our counsellor will contact you within 24 hours.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                id="hero-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Interested In</label>

              <select
                required
                value={formData.interest}
                onChange={(e) =>
                  setFormData({ ...formData, interest: e.target.value })
                }
              >
                <option value="">Select option</option>
                <option>Japanese Language School</option>
                <option>University / College Admission</option>
                <option>Student Visa Guidance</option>
                <option>Complete Package</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 8 }}
            >
              Get Free Consultation →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">What We Offer</div>
          <h2>Complete Support for Your Japan Dream</h2>
          <p>
            From the first counselling session to settling in Japan — we handle
            every step with care and expertise.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Our Approach</div>
          <h2>How We Guide You to Japan</h2>
          <p>
            A clear, transparent process designed to remove stress and maximise
            your chances of success.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-steps">
            {steps.map((step) => (
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="counselor-card">
            <div className="counselor-avatar">B</div>
            <h3>Biwako Expert Team</h3>
            <div className="title">Senior Education Counsellors</div>
            <p style={{ opacity: 0.9, marginBottom: 20, fontSize: "0.95rem" }}>
              Our counsellors specialise exclusively in Japan pathways. They
              combine deep knowledge of Japanese education systems with genuine
              care for every student’s future.
            </p>
            <div className="trust-badges">
              <span className="badge">Japan Specialists</span>
              <span className="badge">Visa Experts</span>
              <span className="badge">Student-First Approach</span>
            </div>
            <a
              href="#booking"
              className="btn btn-gold"
              style={{ marginTop: 28, width: "100%" }}
            >
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Real Outcomes</div>
          <h2>Before → After with Biwako</h2>
          <p>
            See how students transformed their future with structured guidance.
          </p>
        </div>

        <div className="results-grid">
          {results.map((r, i) => (
            <div className="result-card" key={i}>
              <div className="result-header">
                <strong>{r.name}</strong>
                <span>{r.path}</span>
              </div>
              <div className="result-body">
                <div className="before-after">
                  <div className="ba-box before">
                    <span>BEFORE</span>
                    <strong>{r.before}</strong>
                  </div>
                  <div className="ba-box after">
                    <span>AFTER</span>
                    <strong>{r.after}</strong>
                  </div>
                </div>
                <p style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>
                  {r.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Student Voices</div>
          <h2>Trusted by Hundreds of Students</h2>
          <p>
            Real feedback from students who are now living and studying in
            Japan.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">★★★★★</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initial}</div>
                <div className="author-info">
                  <h5>{t.name}</h5>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="google-badge">
          <span style={{ fontSize: "1.8rem" }}>⭐</span>
          <div>
            <strong>4.9 / 5</strong> from 45+ Google Reviews
          </div>
          <a
            href="#"
            style={{
              color: "var(--accent)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            See all reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Common Questions</div>
          <h2>Answers to Your Concerns</h2>
          <p>
            We know the process can feel overwhelming. Here are clear answers.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              className={`faq-item ${activeIndex === i ? "active" : ""}`}
              key={i}
            >
              <button className="faq-question" onClick={() => toggle(i)}>
                {faq.question}
                <span style={{ fontSize: "1.4rem", transition: "0.2s" }}>
                  +
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    goal: "Japanese Language School",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          interest: formData.interest,
          source: "hero-form",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", interest: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <section id="booking" className="booking-section">
      <div className="container">
        <div className="booking-grid">
          <div className="booking-info">
            <h2>Ready to Take the First Step?</h2>
            <p>
              Book a free, no-obligation consultation. We’ll discuss your goals
              and map the best path to Japan for you.
            </p>

            <div className="contact-methods">
              <div className="contact-item">
                <span style={{ fontSize: "1.5rem" }}>📞</span>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    Call us
                  </div>
                  <a href="tel:+81 0770-37-1754">+81 0770-37-1754</a>
                </div>
              </div>
              <div className="contact-item">
                <span style={{ fontSize: "1.5rem" }}>💬</span>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    WhatsApp
                  </div>
                  <a
                    href="https://wa.me/+8108030705916"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat instantly
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <span style={{ fontSize: "1.5rem" }}>✉️</span>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Email</div>
                  <a href="mailto:biwakogroup@gmail.com">
                    biwakogroup@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="map-placeholder">
              <div style={{ fontSize: "2.5rem" }}>📍</div>
              <strong>Visit Our Office</strong>
              <p style={{ textAlign: "center", maxWidth: 260 }}>
                Bagbazar, Kathmandu & Itahari, Nepal
                <br />
                (Serving students across Nepal for Japan pathways)
              </p>
            </div>
          </div>

          <div className="booking-form-card">
            <h3>Book Your Free Appointment</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="booking-name">Full Name *</label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  required
                  placeholder="As per passport"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Your Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({ ...formData, goal: e.target.value })
                  }
                >
                  <option>Japanese Language School</option>
                  <option>University Admission</option>
                  <option>Visa Guidance Only</option>
                  <option>Not sure yet – need advice</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message (optional)</label>
                <textarea
                  rows="3"
                  placeholder="Tell us briefly about your situation..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Confirm Free Consultation
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--text-light)",
                  marginTop: 12,
                }}
              >
                We reply within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              Biwako <span style={{ color: "var(--accent)" }}>Education</span>
            </a>
            <p>
              Guiding students toward academic success in Japan with expert
              counselling, transparent processes, and genuine care.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#process">How It Works</a>
              </li>
              <li>
                <a href="#results">Success Stories</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services">Language Courses</a>
              </li>
              <li>
                <a href="#services">School Placement</a>
              </li>
              <li>
                <a href="#services">Visa Support</a>
              </li>
              <li>
                <a href="#services">Pre-Departure</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+8108030705916">+8108030705916</a>
              </li>
              <li>
                <a href="mailto:biwakogroup@gmail.com">biwakogroup@gmail.com</a>
              </li>
              <li>Bagbazar, Kathmandu</li>
              <li>Biratnagar, Nepal</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Biwako Group International. All rights reserved. | Study in
          Japan Specialists
        </div>
      </div>
    </footer>
  );
}

function FloatingCTA() {
  return (
    <div className="floating-cta">
      <a
        href="https://wa.me/+8108030705916"
        className="floating-btn float-whatsapp"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
      >
        💬
      </a>
      <a
        href="tel:+81 0770-37-1754"
        className="floating-btn float-call"
        title="Call"
      >
        📞
      </a>
    </div>
  );
}

// ========== MAIN APP ==========
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Process />
      <Results />
      <Testimonials />
      <FAQ />
      <Booking />
      <Footer />
      <FloatingCTA />
    </>
  );
}
