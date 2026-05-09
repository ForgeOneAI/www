const canvas = document.querySelector(".flow-canvas");
const ctx = canvas?.getContext("2d");
const pointer = { x: 0.72, y: 0.34 };
let width = 0;
let height = 0;
let particles = [];

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function setMenuIcon(button, icon, label) {
  button.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i><span class="sr-only">${label}</span>`;
  renderIcons();
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(110, Math.max(54, Math.floor(width / 15)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0.18 + Math.random() * 0.48,
    vy: -0.12 + Math.random() * 0.24,
    r: 0.8 + Math.random() * 1.8,
    phase: index * 0.17,
  }));
}

function drawFlow(time) {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, width, height);
  const pageScroll = document.body.classList.contains("landing-page")
    ? document.querySelector("main").scrollTop
    : window.scrollY;
  const scroll = pageScroll * 0.0015;
  const px = pointer.x * width;
  const py = pointer.y * height;

  particles.forEach((particle, index) => {
    const pullX = (px - particle.x) * 0.0007;
    const pullY = (py - particle.y) * 0.00035;
    particle.x += particle.vx + pullX + Math.sin(time * 0.001 + particle.phase) * 0.22;
    particle.y += particle.vy + pullY + Math.cos(time * 0.0012 + particle.phase) * 0.18 + scroll;

    if (particle.x > width + 40) particle.x = -40;
    if (particle.y < -40) particle.y = height + 40;
    if (particle.y > height + 40) particle.y = -40;

    ctx.beginPath();
    ctx.fillStyle = index % 5 === 0 ? "rgba(245, 158, 11, 0.42)" : "rgba(20, 87, 255, 0.42)";
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 9) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 145) {
        ctx.strokeStyle = `rgba(19, 184, 166, ${0.12 * (1 - distance / 145)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawFlow);
}

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.22 },
);

document.querySelectorAll("section").forEach((section) => observer.observe(section));

document.querySelectorAll(".menu-toggle").forEach((button) => {
  const header = button.closest(".site-header");
  const nav = header?.querySelector("nav");
  button.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    button.setAttribute("aria-expanded", String(isOpen));
    setMenuIcon(button, isOpen ? "x" : "menu", isOpen ? "关闭菜单" : "打开菜单");
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
      setMenuIcon(button, "menu", "打开菜单");
    });
  });
});

const landingScroller = document.body.classList.contains("landing-page") ? document.querySelector("main") : null;
const landingPanels = landingScroller ? Array.from(document.querySelectorAll("main > section, footer")) : [];
const desktopPagingQuery = window.matchMedia("(min-width: 901px)");
let isPaging = false;
let pagingTimer;

function nearestPanelIndex() {
  if (!landingScroller || !landingPanels.length) return 0;
  const scrollTop = landingScroller.scrollTop;
  return landingPanels.reduce((nearest, panel, index) => {
    const currentDistance = Math.abs(panel.offsetTop - scrollTop);
    const nearestDistance = Math.abs(landingPanels[nearest].offsetTop - scrollTop);
    return currentDistance < nearestDistance ? index : nearest;
  }, 0);
}

function scrollToPanel(index) {
  if (!landingScroller || !landingPanels.length) return;
  const nextIndex = Math.max(0, Math.min(index, landingPanels.length - 1));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  isPaging = true;
  landingScroller.scrollTo({
    top: landingPanels[nextIndex].offsetTop,
    behavior: reduceMotion ? "auto" : "smooth",
  });
  clearTimeout(pagingTimer);
  pagingTimer = setTimeout(() => {
    isPaging = false;
  }, reduceMotion ? 120 : 780);
}

function jumpToPanel(index) {
  if (!landingScroller || !landingPanels.length) return;
  const nextIndex = Math.max(0, Math.min(index, landingPanels.length - 1));
  landingScroller.scrollTo({ top: landingPanels[nextIndex].offsetTop, behavior: "auto" });
}

function panelIndexFromHash(hash) {
  if (hash === "#top") return 0;
  const target = hash ? document.querySelector(hash) : null;
  return landingPanels.indexOf(target);
}

if (landingScroller && landingPanels.length) {
  const initialIndex = panelIndexFromHash(window.location.hash);
  if (initialIndex >= 0 && desktopPagingQuery.matches) {
    requestAnimationFrame(() => jumpToPanel(initialIndex));
    window.addEventListener("load", () => jumpToPanel(initialIndex));
    setTimeout(() => jumpToPanel(initialIndex), 160);
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (!desktopPagingQuery.matches) return;
      if (event.ctrlKey || Math.abs(event.deltaY) < 18 || isPaging) return;
      event.preventDefault();
      scrollToPanel(nearestPanelIndex() + (event.deltaY > 0 ? 1 : -1));
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (!desktopPagingQuery.matches) return;
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

    const forwardKeys = ["ArrowDown", "PageDown", " "];
    const backKeys = ["ArrowUp", "PageUp"];
    if (![...forwardKeys, ...backKeys].includes(event.key) || isPaging) return;
    event.preventDefault();
    scrollToPanel(nearestPanelIndex() + (forwardKeys.includes(event.key) ? 1 : -1));
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!desktopPagingQuery.matches) return;
      const href = link.getAttribute("href");
      const targetIndex = panelIndexFromHash(href);
      if (targetIndex === -1) return;
      event.preventDefault();
      history.pushState(null, "", href);
      scrollToPanel(targetIndex);
    });
  });
}

renderIcons();

if (canvas && ctx) {
  resizeCanvas();
  requestAnimationFrame(drawFlow);
  window.addEventListener("resize", resizeCanvas);
}
