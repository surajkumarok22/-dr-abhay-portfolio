// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileClose.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  if (isNaN(target)) return;

  // Determine number of decimal places in the target value
  const targetString = el.dataset.target.toString();
  const decimalIndex = targetString.indexOf('.');
  const decimals = decimalIndex === -1 ? 0 : targetString.length - decimalIndex - 1;

  // Extract any suffix (like '+' or '%'), ensuring we ignore digits, commas, dots, and spaces
  const suffix = el.textContent.replace(/[0-9,.\s]/g, '');

  let current = 0;
  const duration = 2000; // 2 seconds animation
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el);
      counterObserver.unobserve(el); // Stop observing once animated
    }
  });
}, { threshold: 0.1 });

// Observe each counter element individually
document.querySelectorAll('.counter').forEach(el => {
  counterObserver.observe(el);
});

// ===== APPOINTMENT FORM =====
const form = document.getElementById('appointment-form');
const successMsg = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('patient-name').value.trim();
  const phone = document.getElementById('patient-phone').value.trim();
  const type = document.getElementById('appointment-type').value;

  if (!name || !phone || !type) {
    alert('Please fill in all required fields (Name, Phone, and Consultation Type).');
    return;
  }

  const submitBtn = document.getElementById('form-submit-btn');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.style.display = 'none';
    successMsg.style.display = 'block';
  }, 1500);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ===== SET MIN DATE FOR APPOINTMENT =====
const dateInput = document.getElementById('preferred-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ===== DARK/LIGHT THEME TOGGLE =====
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

// Initialize theme from localStorage or system preferences
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    if (themeToggleIcon) {
      themeToggleIcon.classList.remove('fa-moon');
      themeToggleIcon.classList.add('fa-sun');
    }
  } else {
    document.documentElement.classList.remove('dark-mode');
    if (themeToggleIcon) {
      themeToggleIcon.classList.remove('fa-sun');
      themeToggleIcon.classList.add('fa-moon');
    }
  }
}

// Initial state application
applyTheme(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDarkNow = !document.documentElement.classList.contains('dark-mode');
    applyTheme(isDarkNow);
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
  });
}
