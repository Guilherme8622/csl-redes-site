document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       HERO NETWORK CANVAS
    =============================== */
  
    const heroImage = document.querySelector(".hero-new-image");
  
    if (heroImage) {
      const canvas = document.createElement("canvas");
      canvas.className = "hero-network-canvas";
  
      heroImage.style.position = "relative";
      heroImage.appendChild(canvas);
  
      const ctx = canvas.getContext("2d");
      let particles = [];
  
      function resize() {
        canvas.width = heroImage.offsetWidth;
        canvas.height = heroImage.offsetHeight;
      }
  
      window.addEventListener("resize", resize);
      resize();
  
      const PARTICLE_COUNT = 40;
  
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5
        });
      }
  
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
  
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
          ctx.fill();
        });
  
        requestAnimationFrame(draw);
      }
  
      draw();
    }
  
    /* ===============================
       FADE-IN COM INTERSECTION
       (FORÇADO PARA HERO)
    =============================== */
  
    const elements = document.querySelectorAll(".fade-in");
  
    // garante estado inicial antes de observar
    elements.forEach(el => el.classList.remove("active"));
  
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add("active");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  
    elements.forEach(el => observer.observe(el));
  });