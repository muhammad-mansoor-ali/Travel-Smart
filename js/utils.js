/* Modern Travel Smart JavaScript Utilities */

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', function() {
  nav?.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', nav?.classList.contains('active'));
});

// Close mobile menu on link click
document.querySelectorAll('.nav a').forEach(function(link) {
  link.addEventListener('click', function() {
    nav?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form validation with animations
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  
  inputs.forEach(function(input) {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
      input.addEventListener('input', function() {
        this.classList.remove('error');
      }, { once: true });
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Show success message with animation
function showSuccessMessage(element, message) {
  element.textContent = message;
  element.classList.add('success');
  element.style.opacity = '0';
  element.style.transform = 'translateY(-10px)';
  
  setTimeout(function() {
    element.style.transition = 'all 0.3s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 10);
  
  setTimeout(function() {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    setTimeout(function() {
      element.textContent = '';
      element.classList.remove('success');
    }, 300);
  }, 3000);
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on backdrop click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(function(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(function(header) {
  header.addEventListener('click', function() {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(function(acc) {
      acc.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Image lazy loading
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(function(img) {
    imageObserver.observe(img);
  });
}

// Testimonial carousel
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(function(slide, i) {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-rotate every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Show first slide
  showSlide(0);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialCarousel();
  initParallax();
  initStatsCounter();
});

// Stats Counter Animation
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(function(counter) {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.innerText.replace(/[0-9.]/g, ''); // Keep suffix like 'K+'
          animateValue(counter, 0, target, 2000, suffix);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = function(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Ease out quart
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    const current = progress === 1 ? end : Math.floor(start + (end - start) * easeProgress);
    
    // Format number if it's large (optional, but good for thousands)
    // For this specific case, keeping it simple as per original design intention
    obj.innerHTML = current + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Parallax effect
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(function(element) {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const args = arguments;
    const later = function() {
      clearTimeout(timeout);
      func.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

// Export functions for use in other scripts
window.TravelUtils = {
  validateForm,
  showSuccessMessage,
  openModal,
  closeModal,
  debounce,
  throttle,
  openDetailsModal,
  openBlogModal
};

// Open Blog Modal
function openBlogModal(id) {
  const post = (window.BLOG_POSTS || {})[id];
  if (!post) return;

  const modal = document.getElementById('detailsModal') || createDetailsModal();
  const content = document.getElementById('detailsModalContent');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-content-wrapper" style="background: white;">
        <div style="height: 300px; overflow: hidden; position: relative;">
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <button class="modal-close" onclick="closeDetailsModal()" style="background: white; color: var(--dark); top: 1rem; right: 1rem; position: absolute; width: 32px; height: 32px; border-radius: 50%; border: none; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">×</button>
        </div>
        
        <div style="padding: var(--spacing-xl);">
            <div style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: var(--spacing-sm);">${post.date} • ${post.category}</div>
            <h2 style="margin-bottom: var(--spacing-lg); font-size: 2rem; color: var(--dark);">${post.title}</h2>
            
            <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text-color);">
                ${post.content}
            </div>
            
            <div style="margin-top: var(--spacing-xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--border); text-align: center;">
                <p style="margin-bottom: var(--spacing-md); font-weight: 600;">Share this article</p>
                <div class="social-icons" style="justify-content: center;">
                    <a href="#" style="color: #3b5998;"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" style="color: #1da1f2;"><i class="fab fa-twitter"></i></a>
                    <a href="#" style="color: #0077b5;"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Open Details Modal
function openDetailsModal(id) {
  const p = (window.TRAVEL_DATA || []).find(function(x) { return x.id === id; });
  if (!p) return;

  const modal = document.getElementById('detailsModal') || createDetailsModal();
  const content = document.getElementById('detailsModalContent');
  if (!content) return;

  const itinerary = (window.ITINERARIES || {})[id] || [
    { day: 'Day 1', title: 'Arrival', content: 'Arrive at destination and check into accommodation.' },
    { day: 'Day 2', title: 'Exploration', content: 'Guided tour of main attractions and local experiences.' },
    { day: 'Day 3', title: 'Activities', content: 'Enjoy planned activities and free time for personal exploration.' }
  ];

  content.innerHTML = `
    <div class="modal-header" style="position: relative;">
        <img src="${p.hero}" alt="${p.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius) var(--radius) 0 0;">
        <button class="modal-close" onclick="closeDetailsModal()" style="background: white; color: var(--dark); top: 1rem; right: 1rem;">×</button>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: var(--spacing-md); background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white;">
            <h2 style="color: white; margin: 0;">${p.name}</h2>
            <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.9rem;">
                <span><i class="fas fa-clock"></i> ${p.duration} Days</span>
                <span><i class="fas fa-tag"></i> ${p.type}</span>
            </div>
        </div>
    </div>
    <div style="padding: var(--spacing-lg);">
        <p style="font-size: 1.1rem; line-height: 1.6; color: var(--muted); margin-bottom: var(--spacing-lg);">${p.description}</p>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-lg);">
            <div>
                <h3 style="margin-bottom: var(--spacing-md);">Itinerary</h3>
                <div class="itinerary-list">
                    ${itinerary.map(function(item) {
                      return `
                        <div class="accordion-item">
                            <div class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
                                <span>${item.day}: ${item.title}</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="accordion-content">
                                <p>${item.content}</p>
                            </div>
                        </div>
                    `;
                    }).join('')}
                </div>
            </div>
            
            <div style="background: var(--bg); padding: var(--spacing-md); border-radius: var(--radius); height: fit-content;">
                <div style="text-align: center; margin-bottom: var(--spacing-md);">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">$${p.price}</div>
                    <div style="font-size: 0.9rem; color: var(--muted);">per person</div>
                </div>
                <button class="btn btn-large" style="width: 100%;" onclick="alert('Booking feature coming soon for ${p.name}!')">
                    Book Now
                </button>
            </div>
        </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailsModal() {
  const modal = document.getElementById('detailsModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function createDetailsModal() {
  const modal = document.createElement('div');
  modal.id = 'detailsModal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 900px; padding: 0; overflow-y: auto; max-height: 90vh;" id="detailsModalContent"></div>
  `;
  document.body.appendChild(modal);
  
  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeDetailsModal();
  });
  
  return modal;
}

// Explicitly expose to window to ensure access from HTML onclick attributes
window.openBlogModal = openBlogModal;
window.openDetailsModal = openDetailsModal;
window.closeDetailsModal = closeDetailsModal;
