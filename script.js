const canvas = document.querySelector(".flow-canvas");
const ctx = canvas?.getContext("2d");
const pointer = { x: 0.72, y: 0.34 };
let width = 0;
let height = 0;
let particles = [];

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
  const scroll = window.scrollY * 0.0015;
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
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
});

if (canvas && ctx) {
  resizeCanvas();
  requestAnimationFrame(drawFlow);
  window.addEventListener("resize", resizeCanvas);
}
