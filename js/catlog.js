/* js/catalog.js */
(function() {
  'use strict';

  // Helper to format strings
  function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Enhanced catalog rendering with loading animation
  window.renderCatalog = function() {
    const container = document.getElementById('catalogGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (!container) return;
    
    // Check if data is available
    if (!window.TRAVEL_DATA || window.TRAVEL_DATA.length === 0) {
      container.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: var(--spacing-xl);"><h3>Loading destinations...</h3><p>Please wait while we load the data</p></div>';
      return;
    }
    
    // Show loading
    if (loadingSpinner) loadingSpinner.classList.add('active');
    container.style.opacity = '0.5';
    
    // Simulate loading delay for better UX
    setTimeout(function() {
      const q = (document.getElementById('catalogSearch')?.value || '').trim().toLowerCase();
      const type = document.getElementById('filterType')?.value || 'all';
      const maxPriceInput = document.getElementById('filterMaxPrice')?.value;
      const maxPrice = maxPriceInput && maxPriceInput !== '' ? Number(maxPriceInput) : Infinity;
      const minRating = Number(document.getElementById('filterMinRating')?.value) || 0;
      const sortBy = document.getElementById('sortBy')?.value || 'popular';

      let results = (window.TRAVEL_DATA || []).filter(function(p) {
        if (type !== 'all' && p.type !== type) return false;
        if (maxPrice !== Infinity && p.price > maxPrice) return false;
        if (p.rating < minRating) return false;
        if (q) {
          return p.name.toLowerCase().includes(q) || 
                 p.description.toLowerCase().includes(q) || 
                 p.type.toLowerCase().includes(q);
        }
        return true;
      });

      // Sort results
      if (sortBy === 'price-asc') {
        results.sort(function(a, b) { return a.price - b.price; });
      } else if (sortBy === 'price-desc') {
        results.sort(function(a, b) { return b.price - a.price; });
      } else if (sortBy === 'alpha') {
        results.sort(function(a, b) { return a.name.localeCompare(b.name); });
      } else if (sortBy === 'rating') {
        results.sort(function(a, b) { return b.rating - a.rating; });
      } else {
        results.sort(function(a, b) { return b.popularity - a.popularity; });
      }

      // Update count info
      const countInfo = document.getElementById('catalogInfo');
      if (countInfo) {
        countInfo.textContent = `Showing ${results.length} package(s)`;
      }

      container.innerHTML = results.length ? results.map(function(p, index) {
        return `
        <article class="tour-card fade-in" style="animation-delay: ${index * 0.05}s;">
          <img src="${p.hero}" alt="${p.name}" class="tour-media" loading="lazy">
          <div class="tour-body">
            <h3 class="tour-title">${p.name}</h3>
            <div class="tour-meta">
              <span><i class="fas fa-calendar"></i> ${p.duration} days</span>
              <span><i class="fas fa-tag"></i> ${capitalize(p.type)}</span>
            </div>
            <div class="tour-rating">
              ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}
              <span style="color: var(--muted); margin-left: var(--spacing-xs);">${p.rating}</span>
            </div>
            <div class="tour-price">$${p.price}</div>
            <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: var(--spacing-md); flex: 1;">
              ${p.description}
            </p>
            <div class="tour-actions">
              <button class="btn" onclick="openQuickView(${p.id})" style="flex: 1;">
                <i class="fas fa-eye"></i> Quick View
              </button>
              <button class="btn btn-secondary" onclick="openDetailsModal(${p.id})" style="flex: 1; text-align: center;">
                <i class="fas fa-info-circle"></i> Details
              </button>
            </div>
          </div>
        </article>
      `;
      }).join('') : '<div class="card" style="grid-column: 1/-1; text-align: center; padding: var(--spacing-xl);"><h3>No packages match your criteria</h3><p>Try adjusting your filters</p></div>';

      // Hide loading
      if (loadingSpinner) loadingSpinner.classList.remove('active');
      container.style.opacity = '1';
      
      // Re-attach observer for fade-in animations
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
             observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      container.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
      });

    }, 300);
  };
  
  // Quick view modal functions
  window.openQuickView = function(id) {
    const p = (window.TRAVEL_DATA || []).find(function(x) { return x.id === id; });
    if (!p) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
      <img src="${p.hero}" alt="${p.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: var(--spacing-md);">
      <h2 style="margin-bottom: var(--spacing-md);">${p.name}</h2>
      <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md); flex-wrap: wrap;">
        <span><i class="fas fa-calendar"></i> ${p.duration} days</span>
        <span><i class="fas fa-tag"></i> ${capitalize(p.type)}</span>
        <span><i class="fas fa-star"></i> ${p.rating} Rating</span>
      </div>
      <p style="margin-bottom: var(--spacing-lg); line-height: 1.8;">${p.description}</p>
      <div style="display: flex; gap: var(--spacing-md);">
        <div style="flex: 1;">
          <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">$${p.price}</div>
          <div style="color: var(--muted); font-size: 0.9rem;">per person</div>
        </div>
        <button class="btn btn-large" onclick="openDetailsModal(${p.id})" style="flex: 1;">
          <i class="fas fa-calendar-check"></i> Book Now
        </button>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  window.closeQuickView = function() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // Reset filters
  window.resetFilters = function() {
    const search = document.getElementById('catalogSearch');
    if(search) search.value = '';
    
    const type = document.getElementById('filterType');
    if(type) type.value = 'all';
    
    const price = document.getElementById('filterMaxPrice');
    if(price) price.value = '';
    
    const rating = document.getElementById('filterMinRating');
    if(rating) rating.value = '0';
    
    const sort = document.getElementById('sortBy');
    if(sort) sort.value = 'popular';
    
    window.renderCatalog();
  };
  
  // Initialize on load
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be loaded
    const checkData = setInterval(function() {
      if (window.TRAVEL_DATA && window.TRAVEL_DATA.length > 0) {
        clearInterval(checkData);
        
        // Handle URL parameters
        const params = new URLSearchParams(location.search);
        if (params.get('query')) {
          const el = document.getElementById('catalogSearch');
          if(el) el.value = params.get('query');
        }
        
        window.renderCatalog();
      }
    }, 100);
    
    // Timeout backup
    setTimeout(function() {
      clearInterval(checkData);
      const container = document.getElementById('catalogGrid');
      if (container && (!window.TRAVEL_DATA || window.TRAVEL_DATA.length === 0)) {
        container.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: var(--spacing-xl);"><h3>Error loading destinations</h3><p>Please refresh the page</p></div>';
      }
    }, 5000);
  });

})();
