// Modern Unit Converter JavaScript

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-button');
const closeSidebarButton = document.querySelector('.close-sidebar');

// Sidebar functionality
function showSidebar() {
  sidebar.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideSidebar() {
  sidebar.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('active') && 
      !sidebar.contains(e.target) && 
      !menuButton.contains(e.target)) {
    hideSidebar();
  }
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('active')) {
    hideSidebar();
  }
});

// Add active state to current page in navigation
function setActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a, .sidebar a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation to converter cards
function animateCards() {
  const cards = document.querySelectorAll('.converter-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });
}

// Add hover effects to converter cards
function addCardHoverEffects() {
  const cards = document.querySelectorAll('.converter-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Add keyboard navigation support
function addKeyboardNavigation() {
  const cards = document.querySelectorAll('.converter-card');
  
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('h3').textContent);
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// Add copy to clipboard functionality for results (if on converter pages)
function addCopyToClipboard() {
  const resultInputs = document.querySelectorAll('input[readonly]');
  
  resultInputs.forEach(input => {
    input.addEventListener('click', () => {
      input.select();
      document.execCommand('copy');
      
      // Show feedback
      const originalValue = input.value;
      input.value = 'Copied!';
      input.style.color = '#10b981';
      
      setTimeout(() => {
        input.value = originalValue;
        input.style.color = '';
      }, 1000);
    });
  });
}

// Add form validation and real-time conversion
function addFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[type="number"]');
    const selects = form.querySelectorAll('select');
    
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value) && e.target.value !== '') {
          e.target.style.borderColor = '#ef4444';
        } else {
          e.target.style.borderColor = '';
        }
      });
    });
    
    selects.forEach(select => {
      select.addEventListener('change', () => {
        select.style.borderColor = '';
      });
    });
  });
}

// Add responsive image loading
function addResponsiveImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
  });
}

// Initialize all functionality
function init() {
  setActiveNavItem();
  animateCards();
  addCardHoverEffects();
  addKeyboardNavigation();
  addCopyToClipboard();
  addFormValidation();
  addResponsiveImages();
  
  // Add smooth scrolling to the page
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Add service worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(registrationError => {
        console.log('Service Worker registration failed:', registrationError);
      });
  });
}

// Add performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
  }
});

// Export functions for use in other scripts
window.UnitConverter = {
  showSidebar,
  hideSidebar,
  setActiveNavItem
};
