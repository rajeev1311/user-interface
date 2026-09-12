/**
 * USER AUTHENTICATION & DASHBOARD - JAVASCRIPT LOGIC
 * Repository: user-auth11092026
 * Pure Vanilla JavaScript (No external libraries)
 */

(function () {
  "use strict";

  // System Credentials (Frontend Demo)
  const VALID_USER = "admin";
  const VALID_PASS = "Abc@2026";

  // Detect current page
  const isLoginPage = !!document.getElementById("loginForm");
  const isDashboardPage = !!document.getElementById("dashboardContent");

  /* ==========================================================================
     1. Authentication & Route Guard Logic
     ========================================================================== */

  // Check login state immediately
  function checkSessionAuth() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (isDashboardPage && !isLoggedIn) {
      // Unauthenticated user trying to access protected dashboard
      window.location.replace("index.html");
      return;
    }

    if (isLoginPage && isLoggedIn) {
      // Authenticated user opening login page -> redirect to dashboard
      window.location.replace("dashboard.html");
      return;
    }
  }

  // Execute session check immediately
  checkSessionAuth();

  /* ==========================================================================
     2. Login Page Logic (index.html)
     ========================================================================== */
  if (isLoginPage) {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const loginBtn = document.getElementById("loginBtn");
    const authAlert = document.getElementById("authAlert");
    const authAlertText = document.getElementById("authAlertText");

    // Display Alert Banner
    function showAlert(message, type = "error") {
      authAlert.className = `auth-alert show auth-alert-${type}`;
      authAlertText.textContent = message;

      // Re-trigger shake animation
      authAlert.style.animation = "none";
      authAlert.offsetHeight; /* Trigger reflow */
      authAlert.style.animation = null;
    }

    // Hide Alert Banner
    function hideAlert() {
      authAlert.className = "auth-alert";
      authAlertText.textContent = "";
    }

    // Toggle Password Visibility
    if (togglePasswordBtn && passwordInput) {
      togglePasswordBtn.addEventListener("click", function () {
        const isPassword = passwordInput.getAttribute("type") === "password";
        const newType = isPassword ? "text" : "password";
        passwordInput.setAttribute("type", newType);

        // Update SVG icon representation
        const eyeIcon = togglePasswordBtn.querySelector(".icon-eye");
        const eyeOffIcon = togglePasswordBtn.querySelector(".icon-eye-off");

        if (eyeIcon && eyeOffIcon) {
          eyeIcon.style.display = isPassword ? "none" : "block";
          eyeOffIcon.style.display = isPassword ? "block" : "none";
        }

        togglePasswordBtn.setAttribute(
          "aria-label",
          isPassword ? "Hide password" : "Show password"
        );
      });
    }

    // Handle Login Form Submission
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert();

      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // Validate non-empty credentials
      if (!username && !password) {
        showAlert("Please enter your username and password.");
        usernameInput.focus();
        return;
      }

      if (!username) {
        showAlert("Please enter your username.");
        usernameInput.focus();
        return;
      }

      if (!password) {
        showAlert("Please enter your password.");
        passwordInput.focus();
        return;
      }

      // Check credentials
      if (username === VALID_USER && password === VALID_PASS) {
        // Successful login
        loginBtn.classList.add("loading");
        loginBtn.disabled = true;
        showAlert("Authentication successful! Opening dashboard...", "success");

        // Save session state
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("authUsername", username);

        // Transition to Dashboard
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 750);
      } else {
        // Failed login
        showAlert("Invalid username or password.");
        passwordInput.value = "";
        passwordInput.focus();
      }
    });

    // Clear alert when user starts typing
    [usernameInput, passwordInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", function () {
          if (authAlert.classList.contains("auth-alert-error")) {
            hideAlert();
          }
        });
      }
    });
  }

  /* ==========================================================================
     3. Dashboard Page Logic (dashboard.html)
     ========================================================================== */
  if (isDashboardPage) {
    // A. Header Background Blur on Scroll
    const dashboardHeader = document.querySelector(".dashboard-header");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        dashboardHeader?.classList.add("scrolled");
      } else {
        dashboardHeader?.classList.remove("scrolled");
      }
    });

    // B. Logout Action
    const logoutBtns = document.querySelectorAll(".btn-logout");
    logoutBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("authUsername");
        window.location.href = "index.html";
      });
    });

    // C. Navigation Links & Active State Management
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    const sections = document.querySelectorAll("section[id]");

    function setActiveNav(targetId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${targetId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    // Smooth Scroll on Nav Click
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")?.replace("#", "");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({
            behavior: "smooth",
          });

          setActiveNav(targetId);

          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });

    // ScrollSpy using IntersectionObserver
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            setActiveNav(id);
          }
        });
      }, observerOptions);

      sections.forEach((section) => sectionObserver.observe(section));
    }

    // D. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNavDrawer = document.getElementById("mobileNavDrawer");

    function openMobileMenu() {
      hamburgerBtn?.classList.add("active");
      mobileNavDrawer?.classList.add("open");
      hamburgerBtn?.setAttribute("aria-expanded", "true");
    }

    function closeMobileMenu() {
      hamburgerBtn?.classList.remove("active");
      mobileNavDrawer?.classList.remove("open");
      hamburgerBtn?.setAttribute("aria-expanded", "false");
    }

    if (hamburgerBtn && mobileNavDrawer) {
      hamburgerBtn.addEventListener("click", function () {
        const isOpen = mobileNavDrawer.classList.contains("open");
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      // Close when pressing Escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobileNavDrawer.classList.contains("open")) {
          closeMobileMenu();
        }
      });

      // Close when resizing viewport above mobile width
      window.addEventListener("resize", function () {
        if (window.innerWidth > 768 && mobileNavDrawer.classList.contains("open")) {
          closeMobileMenu();
        }
      });
    }

    // E. Contact Form Validation & Feedback
    const contactForm = document.getElementById("contactForm");
    const contactFeedback = document.getElementById("contactFeedback");
    const contactFeedbackText = document.getElementById("contactFeedbackText");

    if (contactForm && contactFeedback) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameField = document.getElementById("contactName");
        const emailField = document.getElementById("contactEmail");
        const messageField = document.getElementById("contactMessage");
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = nameField?.value.trim() || "";
        const email = emailField?.value.trim() || "";
        const message = messageField?.value.trim() || "";

        // Reset feedback state
        contactFeedback.className = "contact-feedback";

        // Validate Name
        if (name.length < 2) {
          showContactFeedback("Please enter your full name.", "error");
          nameField?.focus();
          return;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showContactFeedback("Please enter a valid email address.", "error");
          emailField?.focus();
          return;
        }

        // Validate Message
        if (message.length < 10) {
          showContactFeedback("Please write a message of at least 10 characters.", "error");
          messageField?.focus();
          return;
        }

        // Simulate interactive submission
        if (submitBtn) {
          submitBtn.classList.add("loading");
          submitBtn.disabled = true;
        }

        setTimeout(function () {
          if (submitBtn) {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;
          }

          showContactFeedback(
            "Thank you! Your message has been received. Our team will get back to you shortly.",
            "success"
          );
          contactForm.reset();
        }, 600);
      });

      function showContactFeedback(msg, type = "success") {
        contactFeedback.className = `contact-feedback show contact-feedback-${type}`;
        if (contactFeedbackText) {
          contactFeedbackText.textContent = msg;
        }
      }
    }
  }
})();
