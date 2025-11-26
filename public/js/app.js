function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

function selectTool(el) {
  document.querySelectorAll('.tool').forEach(t => {
    t.style.borderColor = 'var(--border)';
    t.style.backgroundColor = 'var(--surface-light)';
  });
  el.style.borderColor = 'var(--primary)';
  el.style.backgroundColor = 'var(--primary)';
}
