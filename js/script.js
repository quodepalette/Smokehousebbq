(() => {
  'use strict';

  /*  Header Scroll  */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    document
      .getElementById('backToTop')
      .classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /*  Mobile Nav  */
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav.querySelectorAll('a');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open')
      ? 'hidden'
      : '';
  });
  mobileLinks.forEach((a) =>
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }),
  );

  /*  Hero Slideshow  */
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  let current = 0;
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goSlide(i));
    dotsWrap.appendChild(d);
  });
  const dots = dotsWrap.querySelectorAll('.hero-dot');
  function goSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  setInterval(() => goSlide((current + 1) % slides.length), 5000);

  /*  Scroll Reveal  */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  reveals.forEach((el) => revealObs.observe(el));

  /*  Counter Animation  */
  const counters = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        let start = 0;
        const dur = 1800;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / dur, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObs.observe(c));

  /*  Menu Filter  */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      menuItems.forEach((item, i) => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            item.style.opacity = '';
            item.style.transform = '';
          }, i * 60);
        }
      });
    });
  });

  /*  Carousel  */
  const track = document.getElementById('cTrack');
  const cSlides = track.querySelectorAll('.carousel-slide');
  const cDotsWrap = document.getElementById('cDots');
  document.getElementById('cSlideTotal').textContent = cSlides.length;
  let cIdx = 0;
  cSlides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'c-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goC(i));
    cDotsWrap.appendChild(d);
  });
  const cDotEls = cDotsWrap.querySelectorAll('.c-dot');
  function goC(n) {
    cIdx = (n + cSlides.length) % cSlides.length;
    track.style.transform = `translateX(-${cIdx * 100}%)`;
    cDotEls.forEach((d, i) => d.classList.toggle('active', i === cIdx));
    document.getElementById('cSlideNum').textContent = cIdx + 1;
  }
  document
    .getElementById('cPrev')
    .addEventListener('click', () => goC(cIdx - 1));
  document
    .getElementById('cNext')
    .addEventListener('click', () => goC(cIdx + 1));
  // Touch Swipe
  let touchStartX = 0;
  track.addEventListener(
    'touchstart',
    (e) => (touchStartX = e.touches[0].clientX),
    { passive: true },
  );
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goC(diff > 0 ? cIdx + 1 : cIdx - 1);
  });
  setInterval(() => goC(cIdx + 1), 6000);

  /*  Contact Form  */
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, 1200);
  });

  /*  Newsletter  */
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'var(--ember-dk)';
    e.target.querySelector('input').disabled = true;
    btn.disabled = true;
  });

  /*  Live Chat  */
  const chatBtn = document.getElementById('liveChatBtn');
  const chatModal = document.getElementById('chatModal');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');
  const chatTyping = document.getElementById('chatTyping');

  const botReplies = [
    'Great question! Our pitmasters start smoking at 4am every day to have everything ready for opening. 🔥',
    'Our brisket is our most popular item — 16 hours of love in every slice!',
    'We do offer catering for events of all sizes. Give us a call at (555) 123-CATER for details.',
    'Our free drinks include lemonade, sweet tea, and assorted sodas — all on us!',
    'Reservations can be made by phone or through our contact form above.',
    'Thanks for reaching out! A team member will follow up within 24 hours. 😊',
  ];
  let botIdx = 0;

  chatBtn.addEventListener('click', () => chatModal.classList.toggle('open'));
  chatClose.addEventListener('click', () => chatModal.classList.remove('open'));

  function addMsg(text, type) {
    const d = document.createElement('div');
    d.className = `msg ${type}`;
    d.textContent = text;
    chatMessages.appendChild(d);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMsg() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    chatInput.value = '';
    chatTyping.classList.add('show');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(
      () => {
        chatTyping.classList.remove('show');
        addMsg(botReplies[botIdx % botReplies.length], 'bot');
        botIdx++;
      },
      1200 + Math.random() * 600,
    );
  }

  chatSend.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMsg();
  });

  /*  Order Buttons  */
  document.querySelectorAll('.order-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'var(--ember)';
      btn.style.color = 'white';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  /*  Theme Toggle  */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');

  // Detect Preferred Theme: Localstorage → System Preference → Dark Default
  const savedTheme = localStorage.getItem('bbq-theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme, false);

  function applyTheme(theme, animate) {
    if (animate === false) {
      html.style.setProperty('--transition-override', 'none');
    }
    html.setAttribute('data-theme', theme);
    localStorage.setItem('bbq-theme', theme);
    updateLabel(theme);
    if (animate === false) {
      requestAnimationFrame(() =>
        html.style.removeProperty('--transition-override'),
      );
    }
  }

  function updateLabel(theme) {
    if (mobileThemeLabel) {
      mobileThemeLabel.textContent =
        theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile)
    themeToggleMobile.addEventListener('click', toggleTheme);

  // Sync When System Preference Changes And No Manual Override Exists
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('bbq-theme')) {
        applyTheme(e.matches ? 'dark' : 'light', true);
      }
    });
})();
