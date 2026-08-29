/* ====================================================
   Macway Biotech — Single-Page JS
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const desktopNav = document.querySelector('.desktop-nav');
  
  if (navToggle && desktopNav) {
    navToggle.addEventListener('click', () => {
      // Very basic mobile menu toggle (can be enhanced with CSS classes later)
      if (desktopNav.style.display === 'flex') {
        desktopNav.style.display = 'none';
      } else {
        desktopNav.style.display = 'flex';
        desktopNav.style.flexDirection = 'column';
        desktopNav.style.position = 'absolute';
        desktopNav.style.top = '72px';
        desktopNav.style.left = '0';
        desktopNav.style.right = '0';
        desktopNav.style.background = '#ffffff';
        desktopNav.style.padding = '24px';
        desktopNav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          desktopNav.style.display = 'none';
        }
      });
    });
  }

  /* ── Smooth Scrolling for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for the fixed header
        const headerOffset = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── Hero Slider (Fade Transition) ── */
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  
  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000);
  }

  /* ── Scroll Animations (Fade Up) ── */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: Stop observing once animated in
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

});
