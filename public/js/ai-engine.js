function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  
  const tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add('active');
    event.target.classList.add('active');
  }
}

function selectTool(element) {
  document.querySelectorAll('.tool-card').forEach(t => t.style.opacity = '0.7');
  element.style.opacity = '1';
  element.style.borderColor = '#00d4ff';
}
