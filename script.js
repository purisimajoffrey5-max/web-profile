// Mouse trail effect
function initCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let points = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  document.addEventListener('mousemove', (e) => {
    points.push({
      x: e.clientX,
      y: e.clientY,
      age: 0
    });
  });
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.age++;
      if (point.age > 30) {
        points.splice(i, 1);
        continue;
      }
      
      const opacity = 1 - point.age / 30;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 255, 218, ${opacity})`;
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Loading screen
function handleLoading() {
  const loader = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize effects
  initCanvas();
  handleLoading();
  const typedEl = document.getElementById("typed");
  const phrases = [
    "Freelance Projects",
    "Web Applications",
    "Open Source",
    "Digital Solutions"
  ];
  let i = 0, j = 0, fwd = true;

  function typeEffect() {
    const word = phrases[i];
    if (fwd) {
      j++;
      if (j === word.length) { fwd = false; setTimeout(typeEffect, 800); return; }
    } else {
      j--;
      if (j === 0) { fwd = true; i = (i + 1) % phrases.length; }
    }
    typedEl.textContent = word.slice(0, j);
    setTimeout(typeEffect, fwd ? 60 : 40);
  }
  typeEffect();

  // reveal
  const revealEls = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
  }, { threshold: 0.1 });
  revealEls.forEach(r => obs.observe(r));

  // nav active
  const links = document.querySelectorAll(".nav-link");
  const secs = document.querySelectorAll("section[id]");
  const navObs = new IntersectionObserver(ents => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { threshold: 0.4 });
  secs.forEach(s => navObs.observe(s));

  // smooth scroll
  links.forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id.startsWith("#")) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  }));

  // fetch data.json
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("skill-list");
      data.skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });
      const grid = document.getElementById("projects-grid");
      data.projects.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <div class="project-image">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </div>
          <div class="project-content">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <ul class="project-tech-list">
              ${p.tech.map(t => `<li>${t}</li>`).join("")}
            </ul>
            <div class="project-links">
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                <i class="fab fa-github"></i>
              </a>
              ${p.url ? `
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              ` : ""}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    });

  // contact form (demo)
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! (demo)");
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Scroll Progress
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
  });

  // Smooth section transitions
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
