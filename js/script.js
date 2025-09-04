// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Hero slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === slideIndex) {
      slide.classList.add('active');
    }
  });

  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 3000);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active'); // animate hamburger → X
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active'); // reset hamburger
  });
});

// Menu category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    // Update active button
    categoryBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter menu items
    menuItems.forEach((item) => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  observer.observe(el);
});

// Newsletter form submission
document
  .querySelector('.newsletter-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      this.querySelector('.newsletter-input').value = '';
    }
  });

// Order button functionality
document.querySelectorAll('.order-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const itemName = this.closest('.menu-item').querySelector('h4').textContent;
    alert(
      `${itemName} added to your order! Call (555) 123-4567 to complete your order.`
    );
  });
});

// Back to Top & Live Chat Button Functionality
const backToTopButton = document.getElementById('backToTop');
const liveChatButton = document.getElementById('liveChatButton');

// Show/hide back to top button & chat button based on scroll position
function toggleButtons() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
    liveChatButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
    liveChatButton.classList.remove('visible');
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Event listeners for scroll & back to top
window.addEventListener('scroll', toggleButtons);
backToTopButton.addEventListener('click', scrollToTop);

// Live Chat Functionality
const chatModal = document.getElementById('chatModal');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

let chatOpen = false;

// Toggle chat modal
function toggleChat() {
  chatOpen = !chatOpen;
  if (chatOpen) {
    chatModal.classList.add('active');
    chatInput.focus();
  } else {
    chatModal.classList.remove('active');
  }
}

// Close chat
function closeChat() {
  chatOpen = false;
  chatModal.classList.remove('active');
}

// Add message to chat
function addMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user' : 'bot');
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate bot responses
function simulateBotResponse(userMessage) {
  const responses = [
    'Thanks for your message! Our team will get back to you shortly.',
    "Thanks for your message! Our team will get back to you shortly. Side note: We're open Monday-Sunday, 11 AM - 10 PM",
    'Thanks for your message! Our team will get back to you shortly. Side note: For reservations, please call us at (000) 123-4040.',
    'Thanks for your message! Our team will get back to you shortly. Side note: Our BBQ is slow-cooked for 12+ hours for the perfect flavor!',
    'Thanks for your message! Our team will get back to you shortly. Side note: We offer both dine-in and takeout options.',
    'Thanks for your message! Our team will get back to you shortly. Side note: Check out our catering menu for your next event!',
  ];

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  setTimeout(() => {
    addMessage(randomResponse, false);
  }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

// Handle chat input
function handleChatInput(e) {
  if (e.key === 'Enter' && e.target.value.trim()) {
    const message = e.target.value.trim();
    addMessage(message, true);
    simulateBotResponse(message);
    e.target.value = '';
  }
}

// Event listeners for live chat
liveChatButton.addEventListener('click', toggleChat);
chatClose.addEventListener('click', closeChat);
chatInput.addEventListener('keypress', handleChatInput);

// Close chat when clicking outside
document.addEventListener('click', function (e) {
  if (
    chatOpen &&
    !chatModal.contains(e.target) &&
    !liveChatButton.contains(e.target)
  ) {
    closeChat();
  }
});

// Prevent chat modal from closing when clicking inside
chatModal.addEventListener('click', function (e) {
  e.stopPropagation();
});

// Hero fire canvas
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fire-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class FireAnimation {
    constructor() {
      this.particles = [];
      this.paletteBase = [
        { r: 245, g: 167, b: 66 }, // Gold
        { r: 232, g: 90, b: 25 }, // Orange
        { r: 255, g: 62, b: 0 }, // Bright red-orange
        { r: 191, g: 34, b: 34 }, // Deep red
      ];
      this.palette = [...this.paletteBase];
      this.time = 0;
      this.lastUpdateTime = 0;
      this.createParticles();
      this.animate();
    }

    createParticles() {
      const particleCount = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(this.newParticle());
      }
    }

    newParticle(
      x = Math.random() * canvas.width,
      y = canvas.height + Math.random() * 100
    ) {
      return {
        x,
        y,
        size: 5 + Math.random() * 25,
        opacity: 0.1 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -1.5 - Math.random() * 3,
        colorIndex: Math.floor(Math.random() * this.palette.length),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        sway: 0.3 + Math.random() * 0.5,
        swaySpeed: 0.005 + Math.random() * 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        lifespan: 100 + Math.random() * 200,
      };
    }

    animate(currentTime = 0) {
      this.lastUpdateTime = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.time += 0.01;
      this.updatePalette();
      this.updateParticles();
      if (this.particles.length < 100) this.createParticles();
      requestAnimationFrame(this.animate.bind(this));
    }

    updatePalette() {
      this.palette = this.paletteBase.map((c, i) => {
        const t = this.time + i * 0.5;
        const v = 20;
        return {
          r: Math.min(255, Math.max(0, c.r + Math.sin(t) * v)),
          g: Math.min(255, Math.max(0, c.g + Math.sin(t + 1) * v)),
          b: Math.min(255, Math.max(0, c.b + Math.sin(t + 2) * v)),
        };
      });
    }

    updateParticles() {
      this.particles.forEach((p, i) => {
        p.x +=
          p.speedX + Math.sin(this.time * p.swaySpeed + p.swayOffset) * p.sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.lifespan -= 1;
        const lifeFactor = p.lifespan / 300;
        const size = p.size * lifeFactor;
        const opacity = p.opacity * lifeFactor;
        if (p.lifespan > 0 && p.y > -100) {
          this.drawBrushstroke(
            p.x,
            p.y,
            size,
            p.rotation,
            this.palette[p.colorIndex],
            opacity
          );
        } else {
          this.particles[i] = this.newParticle();
        }
      });
    }

    drawBrushstroke(x, y, size, rotation, color, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const gradient = ctx.createLinearGradient(0, -size, 0, size);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      gradient.addColorStop(
        0.5,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
      );
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-size / 4, -size);
      ctx.quadraticCurveTo(size / 2, 0, -size / 3, size);
      ctx.quadraticCurveTo(size / 2, 0, size / 3, -size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  const fireAnimation = new FireAnimation();

  // Burst effect on Explore Menu click
  const exploreButton = document.getElementById('exploreButton');
  exploreButton.addEventListener('click', () => {
    for (let i = 0; i < 50; i++) {
      const rect = exploreButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 50;
      fireAnimation.particles.push(
        fireAnimation.newParticle(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance
        )
      );
    }
  });
});

// Gallery Carousel
class ModernCarousel {
  constructor() {
    this.track = document.getElementById('carousel-track');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.indicatorsContainer = document.getElementById('indicators');
    this.currentSlideSpan = document.getElementById('current-slide');
    this.totalSlidesSpan = document.getElementById('total-slides');

    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    this.createIndicators();
    this.updateCounter();
    this.updateIndicators();
    this.attachEventListeners();
    this.startAutoPlay();
  }

  createIndicators() {
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('indicator');
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  attachEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    // Mouse drag support
    let isDragging = false;
    let mouseStartX = 0;

    this.track.addEventListener('mousedown', (e) => {
      isDragging = true;
      mouseStartX = e.clientX;
      this.track.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = 'grab';
      this.handleSwipe(mouseStartX, e.clientX);
    });

    // Pause autoplay on hover
    this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.track.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  goToSlide(slideIndex) {
    if (this.isTransitioning || slideIndex === this.currentSlide) return;

    this.isTransitioning = true;
    this.currentSlide = slideIndex;

    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;

    this.updateIndicators();
    this.updateCounter();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  updateCounter() {
    this.currentSlideSpan.textContent = this.currentSlide + 1;
    this.totalSlidesSpan.textContent = this.totalSlides;
  }

  startAutoPlay() {
    this.pauseAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new ModernCarousel();
});
