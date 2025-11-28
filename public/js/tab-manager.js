// ==========================================
// Tab Manager - Handle Tab Switching
// ==========================================

function setTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.tab-pane');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.style.display = 'none';
  });

  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
    selectedTab.style.display = 'block';
  }

  // Update bottom bar
  const buttons = document.querySelectorAll('.bar-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = document.querySelector(`[onclick="setTab('${tabName}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  console.log(`📑 Switched to tab: ${tabName}`);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  setTab('features');
  console.log('✅ Tab manager initialized');
});
