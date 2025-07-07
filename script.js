// --- Particles Background ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COLOR = '#ffb347';
const PARTICLE_COUNT = 70;
const PARTICLE_SIZE = 2.5;
const SPEED = 0.7;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomVel() {
  return (Math.random() - 0.5) * SPEED * 2;
}
function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: randomVel(),
      vy: randomVel(),
      r: PARTICLE_SIZE + Math.random() * 1.5
    });
  }
}
createParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = PARTICLE_COLOR + '33';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  // Draw particles
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = PARTICLE_COLOR;
    ctx.shadowColor = PARTICLE_COLOR;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Move
    p.x += p.vx;
    p.y += p.vy;
    // Bounce
    if (p.x < p.r || p.x > canvas.width - p.r) p.vx *= -1;
    if (p.y < p.r || p.y > canvas.height - p.r) p.vy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize', createParticles);

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  observer.observe(section);
});

// Timeline animation for education section
const timelineItems = document.querySelectorAll('#education .timeline-item');
const timelineObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});

// Skills progress bar animation
const skillBubbles = document.querySelectorAll('.skill-bubble');
const skillsSection = document.getElementById('skills');
const bubblesObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBubbles.forEach((bubble, i) => {
        setTimeout(() => {
          bubble.classList.add('visible');
        }, i * 120); // staggered animation
      });
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) {
  bubblesObserver.observe(skillsSection);
}

// Tab scroll logic
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('header').style.visibility = 'visible';

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Typing effect for About section
window.addEventListener('DOMContentLoaded', () => {
  const typingText = "Hi, I'm Atharva Shankar Jedhe.";
  const typingElem = document.getElementById('about-typing');
  const aboutFade = document.querySelector('.about-fade');
  const aboutUnderline = document.querySelector('.about-underline');
  let idx = 0;
  function typeChar() {
    if (typingElem && idx <= typingText.length) {
      typingElem.textContent = typingText.slice(0, idx);
      idx++;
      if (idx <= typingText.length) {
        setTimeout(typeChar, 60);
      } else {
        if (aboutUnderline) {
          setTimeout(() => {
            aboutUnderline.classList.add('active');
            // Trigger the intro text animation after underline animation completes
            if (aboutFade) {
              setTimeout(() => {
                aboutFade.classList.add('visible');
                aboutFade.style.display = 'inline-block';
              }, 700); // match underline transition duration
            }
          }, 200);
        } else if (aboutFade) {
          setTimeout(() => {
            aboutFade.classList.add('visible');
            aboutFade.style.display = 'inline-block';
          }, 900);
        }
      }
    }
  }
  if (typingElem) typeChar();
}); 