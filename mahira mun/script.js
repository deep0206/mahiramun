// script.js - Mahira MUN with Starfield Background
let countdownInterval
const munDate = new Date("2026-01-23T09:00:00").getTime() // Updated to Jan 23

// Committee Data (Used for Resources Modal)
const committeeData = {
  disec: {
    name: "DISEC",
    fullName: "Disarmament and International Security Committee",
    icon: "fa-shield-alt",
    agenda: "Addressing the proliferation of autonomous weapons systems and their impact on international security.",
    eb: [
      { position: "Chairperson", name: "John Doe", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Jane Smith", icon: "fa-user" },
      { position: "Rapporteur", name: "Alex Johnson", icon: "fa-user-edit" },
    ],
    note: "Dear Delegates, we look forward to welcoming you to DISEC at Mahira MUN. This committee will challenge you to think critically about global security issues and develop innovative solutions to pressing international concerns. Prepare well and engage actively!",
    bgGuide: "guides/disec-background-guide.pdf",
  },
  unhrc: {
    name: "UNHCR", // Name corrected from UNHRC based on HTML
    fullName: "United Nations High Commissioner for Refugees", // Full name corrected
    icon: "fa-balance-scale",
    agenda: "Protecting human rights in conflict zones with special focus on humanitarian corridors.",
    eb: [
      { position: "Chairperson", name: "Sarah Williams", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Michael Brown", icon: "fa-user" },
      { position: "Rapporteur", name: "Emily Davis", icon: "fa-user-edit" },
    ],
    note: "Welcome to UNHCR! This committee will explore critical human rights issues affecting millions worldwide. We encourage you to approach debates with empathy, rigorous research, and a commitment to upholding human dignity.",
    bgGuide: "guides/unhrc-background-guide.pdf",
  },
  unodc: {
    name: "UNODC",
    fullName: "United Nations Office on Drugs and Crime",
    icon: "fa-gavel",
    agenda: "Combating transnational organized crime and drug trafficking in developing nations.",
    eb: [
      { position: "Chairperson", name: "Robert Taylor", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Lisa Anderson", icon: "fa-user" },
      { position: "Rapporteur", name: "James Wilson", icon: "fa-user-edit" },
    ],
    note: "UNODC addresses some of the most challenging issues facing our world today. We look forward to constructive debates and innovative solutions to combat organized crime and promote justice.",
    bgGuide: "guides/unodc-background-guide.pdf",
  },
  aippm: {
    name: "AIPPM",
    fullName: "All India Political Parties Meet",
    icon: "fa-landmark",
    agenda: "Deliberating on electoral reforms and strengthening democratic institutions in India.",
    eb: [
      { position: "Chairperson", name: "Priya Sharma", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Rahul Verma", icon: "fa-user" },
    ],
    note: "AIPPM offers a unique opportunity to engage with Indian domestic policy. Bring your political acumen and collaborative spirit to this dynamic committee focused on strengthening our democracy.",
    bgGuide: "guides/aippm-background-guide.pdf",
  },
  ip: {
    name: "International Press",
    fullName: "International Press Corps",
    icon: "fa-users",
    agenda: "Covering all committee proceedings and producing quality journalistic content.",
    eb: [
      { position: "Chief Editor", name: "Amanda Lee", icon: "fa-user-tie" },
      { position: "Deputy Editor", name: "Chris Martin", icon: "fa-user" },
    ],
    note: "The International Press plays a crucial role in MUN by documenting debates, conducting interviews, and keeping delegates informed. Sharpen your journalistic skills and prepare for an exciting conference!",
    bgGuide: "guides/ip-background-guide.pdf",
  },
  ifi: { // Added IFI based on HTML
    name: "Indian Film Industry",
    fullName: "Indian Film Industry",
    icon: "fa-film",
    agenda: "Celebrating Indian Cinema and Culture.",
    eb: [
      { position: "Chairperson", name: "TBA", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "TBA", icon: "fa-user" },
    ],
    note: "Welcome to the Indian Film Industry committee! Prepare to delve into the cultural and economic landscape of one of the world's most vibrant cinema hubs.",
    bgGuide: "guides/ifi-background-guide.pdf",
  },
}


// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
  initStarfield()
  initSplashScreen()
  initNavbar()
  initCountdown()
  initSmoothScroll()
  switchItineraryDay(1) // Initialize first tab as active on page load
})

// ===============================================
// STARFIELD BACKGROUND
// ===============================================

function initStarfield() {
  const starfield = document.getElementById("starfield")
  if (!starfield) return

  const starCount = 400

  function createStars() {
    starfield.innerHTML = "" // Clear existing stars
    const width = window.innerWidth
    const height = window.innerHeight
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 2.5 + 1
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 3

      star.style.left = x + "px"
      star.style.top = y + "px"
      star.style.width = size + "px"
      star.style.height = size + "px"
      star.style.animationDuration = duration + "s"
      star.style.animationDelay = delay + "s"
      star.style.opacity = (Math.random() * 0.5 + 0.6).toString()
      star.style.backgroundColor = "#ffffff"

      starfield.appendChild(star)
    }
  }

  createStars() // Initial creation

  // Regenerate stars on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStars, 100); // Debounce resize event
  })
}

// ===============================================
// SPLASH SCREEN
// ===============================================

function initSplashScreen() {
  const splash = document.getElementById("splash-screen")
  const curtain = document.getElementById("curtain")
  const splashLogo = document.getElementById("splash-logo")
  const mainContent = document.getElementById("main-content")

  if (!splash || !mainContent || !curtain || !splashLogo) {
      if (mainContent) mainContent.classList.add("visible")
      if (splash) splash.style.display = "none"
      return;
  }

  const splashShown = sessionStorage.getItem("splashShown")

  if (!splashShown) {
    // Animation sequence
    setTimeout(() => {
      splashLogo.classList.add("revealed")
    }, 200)

    setTimeout(() => {
      curtain.classList.add("reveal")
    }, 500)

    setTimeout(() => {
      curtain.classList.add("fade-away")
    }, 2500)

    setTimeout(() => {
      splash.classList.add("fade-out")
      setTimeout(() => {
        mainContent.classList.add("visible")
        splash.style.display = "none"
      }, 400)
    }, 3000)

    sessionStorage.setItem("splashShown", "true")
  } else {
    // No splash screen
    splash.style.display = "none"
    mainContent.classList.add("visible")
  }

  // Fallback in case animations fail
  setTimeout(() => {
    if (!mainContent.classList.contains("visible")) {
      mainContent.classList.add("visible")
      splash.style.display = "none"
    }
  }, 5000)
}

// ===============================================
// NAVIGATION BAR
// ===============================================

function initNavbar() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }
}

// ===============================================
// COUNTDOWN TIMER
// ===============================================

function initCountdown() {
  const daysElement = document.getElementById("days")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")

  if (!daysElement) return

  countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = munDate - now

    if (distance < 0) {
      clearInterval(countdownInterval)
      if (daysElement) daysElement.textContent = "00"
      if (hoursElement) hoursElement.textContent = "00"
      if (minutesElement) minutesElement.textContent = "00"
      if (secondsElement) secondsElement.textContent = "00"
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (daysElement) daysElement.textContent = String(days).padStart(2, "0")
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, "0")
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, "0")
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, "0")
  }, 1000)
}

// ===============================================
// SMOOTH SCROLL
// ===============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const offsetTop = target.offsetTop - 80 // Navbar offset
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// ===============================================
// MODAL FUNCTIONS (FOR RESOURCES)
// ===============================================

function openModal(type) {
  const modal = document.getElementById("resourceModal")
  const modalBody = document.getElementById("modalBody")
  if (!modal || !modalBody) return;

  let content = ""

  if (type === "portfolio") {
    content = `
            <h2>Portfolio Matrix</h2>
            <p>The Portfolio Matrix contains country-specific information and portfolio allocations for all committees.</p>
            <div class="mt-lg" style="text-align: center; margin-top: 24px;">
                <a href="https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEETS_ID/edit" target="_blank" class="download-btn" style="display: inline-block; padding: 12px 24px; text-decoration: none;">
                    <i class="fas fa-external-link-alt"></i> Open Portfolio Matrix
                </a>
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: rgba(245, 245, 245, 0.45); text-align: center;">
                Note: Replace YOUR_GOOGLE_SHEETS_ID with your actual Google Sheets sharing link.
            </p>
        `
  } else if (type === "background") {
    content = `
            <h2>Background Guides</h2>
            <p>Select a committee to download its background guide:</p>
            <div class="mt-lg" style="display: flex; flex-direction: column; gap: 15px; margin-top: 24px;">
                ${Object.keys(committeeData)
                  .map(
                    (key) => `
                        <a href="${committeeData[key].bgGuide}" class="download-btn" style="text-decoration: none; display: block; padding: 12px 24px; text-align: center;">
                            <i class="fas fa-file-pdf"></i> ${committeeData[key].name} Background Guide
                        </a>
                      `
                  )
                  .join("")}
            </div>
        `
  }

  modalBody.innerHTML = content
  modal.classList.add("active")
}

function closeModal() {
  const modal = document.getElementById("resourceModal")
  if (modal) modal.classList.remove("active")
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("resourceModal")
  if (e.target === modal) {
    closeModal()
  }
})

// ===============================================
// ITINERARY TAB SWITCHING
// ===============================================

function switchItineraryDay(dayNumber) {
  // Hide all schedules
  const allSchedules = document.querySelectorAll(".day-schedule")
  allSchedules.forEach((schedule) => {
    schedule.classList.remove("active")
  })

  // Deactivate all tabs
  const allTabs = document.querySelectorAll(".itinerary-tab-btn")
  allTabs.forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected schedule
  const selectedSchedule = document.getElementById(`schedule-${dayNumber}`)
  if (selectedSchedule) {
    selectedSchedule.classList.add("active")
  }

  // Mark selected tab as active
  const buttons = document.querySelectorAll(".itinerary-tab-btn")
  if (buttons[dayNumber - 1]) {
    buttons[dayNumber - 1].classList.add("active")
  }
}
