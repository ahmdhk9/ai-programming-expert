function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

function selectStage(el) {
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function selectTool(el) {
  document.querySelectorAll('.tool').forEach(t => {
    t.style.borderColor = 'var(--border)';
    t.style.backgroundColor = 'var(--surface-light)';
  });
  el.style.borderColor = 'var(--primary)';
  el.style.backgroundColor = 'var(--primary)';
}

// Initialize stages when page loads
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stage').forEach(stage => {
    stage.addEventListener('click', function() {
      selectStage(this);
    });
  });
  console.log('Stages initialized');
});
