// script.js - Mahira MUN with Starfield Background
let countdownInterval
const munDate = new Date("2026-01-24T09:00:00").getTime()

// Committee Data
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
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    icon: "fa-balance-scale",
    agenda: "Protecting human rights in conflict zones with special focus on humanitarian corridors.",
    eb: [
      { position: "Chairperson", name: "Sarah Williams", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Michael Brown", icon: "fa-user" },
      { position: "Rapporteur", name: "Emily Davis", icon: "fa-user-edit" },
    ],
    note: "Welcome to UNHRC! This committee will explore critical human rights issues affecting millions worldwide. We encourage you to approach debates with empathy, rigorous research, and a commitment to upholding human dignity.",
    bgGuide: "guides/unhrc-background-guide.pdf",
  },
  unsc: {
    name: "UNSC",
    fullName: "United Nations Security Council",
    icon: "fa-globe",
    agenda: "Maintaining international peace and security in the Indo-Pacific region.",
    eb: [
      { position: "Chairperson", name: "David Chen", icon: "fa-user-tie" },
      { position: "Vice Chairperson", name: "Maria Garcia", icon: "fa-user" },
    ],
    note: "The Security Council is where global peace is negotiated. Expect fast-paced debates, strategic alliances, and high-stakes diplomacy. Your preparation and diplomatic skills will be tested to the fullest.",
    bgGuide: "guides/unsc-background-guide.pdf",
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
}

// Import Three.js library
const THREE = window.THREE || require("three")

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
  initStarfield()
  initSplashScreen()
  initNavbar()
  initCountdown()
  initScrollAnimations()
  initCommitteePage()
  initSmoothScroll()
  initItineraryNavigation()
  init3DGlobe()
  initParchmentModal() // Initialize parchment modal interactions
  switchItineraryDay(1) // Initialize first tab as active on page load
})

// ===============================================
// STARFIELD BACKGROUND
// ===============================================

function initStarfield() {
  const starfield = document.getElementById("starfield")
  if (!starfield) return

  const starCount = 400

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.className = "star"

    // Random position
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight
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

  // Regenerate stars on window resize
  window.addEventListener("resize", () => {
    setTimeout(() => {
      starfield.innerHTML = ""
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div")
        star.className = "star"

        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
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
    }, 100)
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

  const splashShown = sessionStorage.getItem("splashShown")

  if (splash && mainContent && curtain && splashLogo) {
    if (!splashShown) {
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
      splash.style.display = "none"
      mainContent.classList.add("visible")
    }
  } else {
    if (mainContent) mainContent.classList.add("visible")
    if (splash) splash.style.display = "none"
  }

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
// SCROLL ANIMATIONS
// ===============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const committeeCards = document.querySelectorAll(".committee-card")
  committeeCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 300ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
    observer.observe(card)
  })

  const contactCards = document.querySelectorAll(".contact-card")
  contactCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 300ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
    observer.observe(card)
  })
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
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// ===============================================
// COMMITTEE NAVIGATION
// ===============================================

function goToCommittee(committeeId) {
  const committeePages = {
    disec: "disec.html",
    unhrc: "unhrc.html",
    unsc: "unsc.html",
    unodc: "unodc.html",
    aippm: "aippm.html",
    ip: "ip.html",
  }

  if (committeePages[committeeId]) {
    window.location.href = committeePages[committeeId]
  }
}

// ===============================================
// COMMITTEE PAGE
// ===============================================

function initCommitteePage() {
  const urlParams = new URLSearchParams(window.location.search)
  const committeeId = urlParams.get("id")

  if (!committeeId || !committeeData[committeeId]) return

  const committee = committeeData[committeeId]

  const titleElement = document.getElementById("committee-title")
  if (titleElement) titleElement.textContent = `${committee.name} - Mahira MUN`

  const iconElement = document.getElementById("committee-icon-large")
  if (iconElement) iconElement.innerHTML = `<i class="fas ${committee.icon}"></i>`

  const titleElementHero = document.getElementById("committee-hero-title")
  if (titleElementHero) titleElementHero.textContent = committee.name

  const subtitleElement = document.getElementById("committee-hero-subtitle")
  if (subtitleElement) subtitleElement.textContent = committee.fullName

  const agendaElement = document.getElementById("committee-agenda")
  if (agendaElement) agendaElement.textContent = committee.agenda

  const ebGrid = document.getElementById("eb-grid")
  if (ebGrid) {
    ebGrid.innerHTML = ""
    committee.eb.forEach((member) => {
      const ebMember = document.createElement("div")
      ebMember.className = "eb-member"
      ebMember.innerHTML = `
                <div class="eb-avatar">
                    <i class="fas ${member.icon}"></i>
                </div>
                <div class="eb-position">${member.position}</div>
                <div class="eb-name">${member.name}</div>
            `
      ebGrid.appendChild(ebMember)
    })
  }

  const ebNoteElement = document.getElementById("eb-note")
  if (ebNoteElement) ebNoteElement.textContent = committee.note

  const downloadBgElement = document.getElementById("download-bg")
  if (downloadBgElement) downloadBgElement.setAttribute("href", committee.bgGuide)
}

// ===============================================
// MODAL FUNCTIONS
// ===============================================

function openModal(type) {
  const modal = document.getElementById("resourceModal")
  const modalBody = document.getElementById("modalBody")

  let content = ""

  if (type === "portfolio") {
    content = `
            <h2>Portfolio Matrix</h2>
            <p>The Portfolio Matrix contains country-specific information and portfolio allocations for all committees.</p>
            <div class="mt-lg">
                <a href="https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEETS_ID/edit" target="_blank" class="download-btn">
                    <i class="fas fa-external-link-alt"></i> Open Portfolio Matrix
                </a>
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: rgba(245, 245, 245, 0.45);">
                Note: Replace YOUR_GOOGLE_SHEETS_ID with your actual Google Sheets sharing link in script.js
            </p>
        `
  } else if (type === "background") {
    content = `
            <h2>Background Guides</h2>
            <p>Select a committee to download its background guide:</p>
            <div class="mt-lg" style="display: flex; flex-direction: column; gap: 15px;">
                ${Object.keys(committeeData)
                  .filter((key) => key !== "ip")
                  .map(
                    (key) => `
                    <a href="${committeeData[key].bgGuide}" class="download-btn" style="text-decoration: none;">
                        <i class="fas fa-file-pdf"></i> ${committeeData[key].name} Background Guide
                    </a>
                `,
                  )
                  .join("")}
            </div>
        `
  }

  if (modalBody) modalBody.innerHTML = content
  if (modal) modal.classList.add("active")
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
// SWITCH COMMITTEE FUNCTION
// ===============================================

function switchCommittee(committeeId) {
  if (!committeeId || !committeeData[committeeId]) return

  const committee = committeeData[committeeId]

  const titleElement = document.getElementById("committee-title")
  if (titleElement) titleElement.textContent = `${committee.name} - Mahira MUN`

  const iconElement = document.getElementById("committee-icon-large")
  if (iconElement) iconElement.innerHTML = `<i class="fas ${committee.icon}"></i>`

  const titleElementHero = document.getElementById("committee-hero-title")
  if (titleElementHero) titleElementHero.textContent = committee.name

  const subtitleElement = document.getElementById("committee-hero-subtitle")
  if (subtitleElement) subtitleElement.textContent = committee.fullName

  const agendaElement = document.getElementById("committee-agenda")
  if (agendaElement) agendaElement.textContent = committee.agenda

  const ebGrid = document.getElementById("eb-grid")
  if (ebGrid) {
    ebGrid.innerHTML = ""
    committee.eb.forEach((member) => {
      const ebMember = document.createElement("div")
      ebMember.className = "eb-member"
      ebMember.innerHTML = `
                <div class="eb-avatar">
                    <i class="fas ${member.icon}"></i>
                </div>
                <div class="eb-position">${member.position}</div>
                <div class="eb-name">${member.name}</div>
            `
      ebGrid.appendChild(ebMember)
    })
  }

  const ebNoteElement = document.getElementById("eb-note")
  if (ebNoteElement) ebNoteElement.textContent = committee.note

  const downloadBgElement = document.getElementById("download-bg")
  if (downloadBgElement) downloadBgElement.setAttribute("href", committee.bgGuide)
}

// ===============================================
// FORM HANDLING
// ===============================================

const liabilityForm = document.getElementById("liabilityForm")
if (liabilityForm) {
  liabilityForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for submitting the liability form! We will review it shortly.")
  })
}

// ===============================================
// ITINERARY NAVIGATION
// ===============================================

function initItineraryNavigation() {
  const dayCards = document.querySelectorAll(".day-card")
  const prevBtn = document.getElementById("prev-day")
  const nextBtn = document.getElementById("next-day")
  let currentDay = 0

  window.nextDay = () => {
    if (currentDay < dayCards.length - 1) {
      currentDay++
      scrollToDay()
      updateArrowVisibility()
    }
  }

  window.previousDay = () => {
    if (currentDay > 0) {
      currentDay--
      scrollToDay()
      updateArrowVisibility()
    }
  }

  function scrollToDay() {
    const dayCard = dayCards[currentDay]
    dayCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }

  function updateArrowVisibility() {
    if (currentDay === 0) {
      // Day 1: show only right arrow
      prevBtn.classList.add("hidden")
      nextBtn.classList.remove("hidden")
    } else if (currentDay === dayCards.length - 1) {
      // Day 3: show only left arrow
      prevBtn.classList.remove("hidden")
      nextBtn.classList.add("hidden")
    } else {
      // Day 2: show both arrows
      prevBtn.classList.remove("hidden")
      nextBtn.classList.remove("hidden")
    }
  }

  // Initialize
  updateArrowVisibility()
}

function switchItineraryDay(dayNumber) {
  // Hide all schedules
  const allSchedules = document.querySelectorAll(".day-schedule")
  allSchedules.forEach((schedule) => {
    schedule.classList.remove("active")
  })

  // Hide all tabs
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

// ===============================================
// 3D GLOBE ANIMATION - ENHANCED
// ===============================================

function init3DGlobe() {
  const container = document.getElementById("globeContainer")
  if (!container) return

  const canvas = document.createElement("canvas")
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.display = "block"
  container.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const width = (canvas.width = window.innerWidth)
  const height = (canvas.height = window.innerHeight)

  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.25

  // Particle globe data
  const particleCount = 150
  const particles = []

  class Particle {
    constructor() {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      this.x = Math.sin(phi) * Math.cos(theta)
      this.y = Math.sin(phi) * Math.sin(theta)
      this.z = Math.cos(phi)
      this.vx = (Math.random() - 0.5) * 0.01
      this.vy = (Math.random() - 0.5) * 0.01
      this.vz = (Math.random() - 0.5) * 0.01
      this.size = Math.random() * 1.5 + 1
      this.opacity = Math.random() * 0.5 + 0.5
      this.pulse = Math.random() * Math.PI * 2
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.z += this.vz

      const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
      if (length > 0) {
        this.x /= length
        this.y /= length
        this.z /= length
      }

      this.pulse += 0.02
    }

    draw(rotX, rotY) {
      let x = this.x
      const y = this.y * Math.cos(rotX) - this.z * Math.sin(rotX)
      let z = this.y * Math.sin(rotX) + this.z * Math.cos(rotX)

      const xTemp = x * Math.cos(rotY) + z * Math.sin(rotY)
      z = -x * Math.sin(rotY) + z * Math.cos(rotY)
      x = xTemp

      // Only draw if facing camera
      if (z > 0) {
        const screenX = centerX + x * radius
        const screenY = centerY + y * radius
        const scale = (z + 1) / 2
        const pulseFactor = 0.5 + Math.sin(this.pulse) * 0.5

        ctx.fillStyle = `rgba(0, 217, 102, ${this.opacity * scale * pulseFactor})`
        ctx.beginPath()
        ctx.arc(screenX, screenY, this.size * scale, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  let rotX = 0.5
  let rotY = 0.5
  let targetRotX = 0.5
  let targetRotY = 0.5

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / width) * 2 - 1
    const y = (e.clientY / height) * 2 - 1
    targetRotX = y * 0.5
    targetRotY = x * 0.5
  })

  document.addEventListener("mouseleave", () => {
    targetRotX = 0.5
    targetRotY = 0.5
  })

  function drawConnections(rotX, rotY) {
    ctx.strokeStyle = "rgba(0, 217, 102, 0.15)"
    ctx.lineWidth = 1

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i]
        const p2 = particles[j]

        let x1 = p1.x,
          y1 = p1.y,
          z1 = p1.z
        let x2 = p2.x,
          y2 = p2.y,
          z2 = p2.z

        y1 = p1.y * Math.cos(rotX) - p1.z * Math.sin(rotX)
        z1 = p1.y * Math.sin(rotX) + p1.z * Math.cos(rotX)
        let xTemp = x1 * Math.cos(rotY) + z1 * Math.sin(rotY)
        z1 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY)
        x1 = xTemp

        y2 = p2.y * Math.cos(rotX) - p2.z * Math.sin(rotX)
        z2 = p2.y * Math.sin(rotX) + p2.z * Math.cos(rotX)
        xTemp = x2 * Math.cos(rotY) + z2 * Math.sin(rotY)
        z2 = -x2 * Math.sin(rotY) + z2 * Math.cos(rotY)
        x2 = xTemp

        if (z1 > 0 && z2 > 0) {
          const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))
          if (dist < 0.4) {
            const screenX1 = centerX + x1 * radius
            const screenY1 = centerY + y1 * radius
            const screenX2 = centerX + x2 * radius
            const screenY2 = centerY + y2 * radius

            const alpha = 1 - dist / 0.4
            ctx.strokeStyle = `rgba(0, 217, 102, ${alpha * 0.15})`
            ctx.beginPath()
            ctx.moveTo(screenX1, screenY1)
            ctx.lineTo(screenX2, screenY2)
            ctx.stroke()
          }
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
    ctx.fillRect(0, 0, width, height)

    rotX += (targetRotX - rotX) * 0.05
    rotY += (targetRotY - rotY) * 0.05

    rotX += 0.0005
    rotY += 0.001

    drawConnections(rotX, rotY)

    particles.forEach((p) => {
      p.update()
      p.draw(rotX, rotY)
    })

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// ===============================================
// PARCHMENT MODAL
// ===============================================

function initParchmentModal() {
  const parchmentCard = document.querySelector(".parchment-card")
  const parchmentModal = document.getElementById("parchmentModal")
  const closeParchmentBtn = document.getElementById("closeParchmentBtn")

  if (parchmentCard && parchmentModal) {
    parchmentCard.addEventListener("click", (e) => {
      e.preventDefault()
      parchmentModal.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeParchmentBtn && parchmentModal) {
    // Close modal only when close button is clicked
    closeParchmentBtn.addEventListener("click", () => {
      parchmentModal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  // Modal stays open when clicking outside - no auto-close on background click
  if (parchmentModal) {
    parchmentModal.addEventListener("click", (e) => {
      if (e.target !== parchmentModal) return
    })
  }
}
