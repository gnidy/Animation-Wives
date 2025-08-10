class CosmicHorizon {
  constructor() {
    // DOM Elements
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.sky = document.querySelector('.sky');
    this.starsContainer = document.querySelector('.stars');
    this.cloudsContainer = document.querySelector('.clouds');
    this.celestialBody = document.querySelector('.celestial-body');
    this.celestialGlow = document.querySelector('.celestial-glow');
    this.ocean = document.querySelector('.ocean');
    this.boat = document.querySelector('.boat');
    this.waves = document.querySelectorAll('.wave');
    
    // State
    this.isNight = false;
    this.animationFrameId = null;
    this.lastTimestamp = 0;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Set up event listeners
    this.themeToggle.addEventListener('change', () => this.toggleTheme());
    
    // Generate stars and clouds
    this.generateStars(200);
    this.generateClouds(8);
    this.positionCraters();
    
    // Load saved theme preference
    this.loadThemePreference();
    
    // Start animation loop
    this.animate();
  }
  
  isMorning() {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 12; // Morning is between 5 AM and 11:59 AM
  }

  toggleTheme() {
    this.isNight = !this.isNight;
    this.html.classList.toggle('theme-night', this.isNight);
    this.animateCelestialTransition();
    
    // Update favicon based on theme
    const favicon = document.querySelector('link[rel="icon"]');
    if (this.isNight) {
      favicon.href = 'https://img.icons8.com/ios-filled/96/ffffff/moon-symbol.png';
    } else {
      favicon.href = 'https://img.icons8.com/ios-filled/96/ff9900/sun--v1.png';
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('themePreference', this.isNight ? 'night' : 'day');
    
    // Toggle stars visibility - CSS will handle the transition
    if (this.isNight && !this.isMorning()) {
      this.starsContainer.style.opacity = '1';
    } else {
      // Add a small delay before hiding stars for a smoother transition
      setTimeout(() => {
        if (!this.isNight || this.isMorning()) {
          this.starsContainer.style.opacity = '0';
        }
      }, 100);
    }
  }
  
  loadThemePreference() {
    const savedTheme = localStorage.getItem('themePreference');
    const favicon = document.querySelector('link[rel="icon"]');
    
    if (savedTheme === 'night' && !this.isNight) {
      this.themeToggle.checked = true;
      this.toggleTheme();
      favicon.href = 'https://img.icons8.com/ios-filled/96/ffffff/moon-symbol.png';
    } else if (savedTheme === 'day' && this.isNight) {
      this.themeToggle.checked = false;
      this.toggleTheme();
      favicon.href = 'https://img.icons8.com/ios-filled/96/ff9900/sun--v1.png';
    } else if (savedTheme === 'night') {
      // If theme is already set to night on page load
      favicon.href = 'https://img.icons8.com/ios-filled/96/ffffff/moon-symbol.png';
    }
  }
  
  animateCelestialTransition() {
    // This will be handled by CSS transitions
    // We just need to trigger the class changes
    const duration = this.isNight ? '1.5s' : '1s';
    this.celestialBody.style.transition = `all ${duration} var(--easing)`;
  }
  
  generateStars(count) {
    if (!this.starsContainer) return;
    
    this.starsContainer.innerHTML = ''; // Clear existing stars
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size and opacity
      const size = 1 + Math.random() * 2;
      const opacity = 0.5 + Math.random() * 0.5;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 3;
      
      // Apply styles
      star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${this.isNight ? opacity : 0};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      
      this.starsContainer.appendChild(star);
    }
  }
  
  generateClouds(count) {
    if (!this.cloudsContainer) return;
    
    this.cloudsContainer.innerHTML = ''; // Clear existing clouds
    
    for (let i = 0; i < count; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      
      // Random position and size
      const left = Math.random() * 100;
      const top = 10 + Math.random() * 40; // Keep in upper part of sky
      const width = 80 + Math.random() * 120;
      const height = 20 + Math.random() * 40;
      const opacity = 0.6 + Math.random() * 0.4;
      
      // Random animation
      const duration = 30 + Math.random() * 60; // 30-90 seconds
      const delay = -1 * Math.random() * 60; // Start at random position
      
      // Apply styles
      cloud.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${width}px;
        height: ${height}px;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      
      this.cloudsContainer.appendChild(cloud);
    }
  }
  
  positionCraters() {
    const craters = document.querySelectorAll('.crater');
    if (!craters.length) return;
    
    // Position each crater randomly on the celestial body
    craters.forEach((crater, index) => {
      // Random position within the celestial body
      const angle = (index / craters.length) * Math.PI * 2;
      const distance = 20 + Math.random() * 30; // Distance from center
      
      // Random size
      const size = 5 + Math.random() * 15;
      
      // Position
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      // Apply styles
      crater.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        transform: translate(-50%, -50%);
      `;
    });
  }
  
  updateWaveAnimation(timestamp) {
    // Subtle wave animation
    const time = timestamp * 0.001; // Convert to seconds
    
    this.waves.forEach((wave, index) => {
      // Each wave moves at a slightly different speed
      const speed = 0.2 + (index * 0.05);
      const offset = Math.sin(time * speed) * 10;
      wave.style.transform = `translateX(${offset}px)`;
    });
  }
  
  updateBoatAnimation(timestamp) {
    if (!this.boat) return;
    
    // Gentle bobbing motion
    const time = timestamp * 0.001; // Convert to seconds
    const bobAmount = Math.sin(time) * 5; // 5px up and down
    const rotation = Math.sin(time * 0.5) * 2; // 2 degrees rotation
    
    this.boat.style.transform = `translateX(-50%) translateY(${bobAmount}px) rotate(${rotation}deg)`;
  }
  
  animate(timestamp) {
    // Calculate delta time for smooth animations
    const deltaTime = timestamp - (this.lastTimestamp || timestamp);
    this.lastTimestamp = timestamp;
    
    // Update animations
    this.updateWaveAnimation(timestamp);
    this.updateBoatAnimation(timestamp);
    
    // Continue the animation loop
    this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
  }
  
  // Clean up method to stop animations if needed
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Initialize the scene when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const cosmicHorizon = new CosmicHorizon();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    cosmicHorizon.positionCraters();
  });
});
