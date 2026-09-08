import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}
    >
      <div className="container nav-container">
        <a href="#home" className="nav-logo" onClick={closeMobileMenu}>
          Biwako <span>International</span>
        </a>

        <ul className={`nav-links ${isMobileOpen ? "nav-active" : ""}`}>
          <li>
            <a href="#services" onClick={closeMobileMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#process" onClick={closeMobileMenu}>
              Process
            </a>
          </li>
          <li>
            <a href="#results" onClick={closeMobileMenu}>
              Results
            </a>
          </li>
          <li>
            <a href="#faq" onClick={closeMobileMenu}>
              FAQ
            </a>
          </li>
          <li className="mobile-only-btn">
            <a
              href="#booking"
              className="btn btn-primary"
              onClick={closeMobileMenu}
            >
              Book Consultation
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href="https://wa.me/1234567890"
            className="btn-whatsapp-sm"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href="#booking" className="btn-book-sm">
            Book Now
          </a>

          <button
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
