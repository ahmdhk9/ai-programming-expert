// ==========================================
// Script Load Order Manager
// Ensures all scripts are loaded in correct order
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Make socket globally accessible
  window.socket = socket || null;
  window.currentUser = currentUser || null;
  window.userColor = userColor || null;
  
  console.log('✅ Load order initialized');
});
