// ==========================================
// 🎯 UI Handlers - Chat, Projects, Profile
// ==========================================

// ============ CHAT HANDLERS ============
function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (input && input.value.trim()) {
    askAI(input.value);
  }
}

function handleChatKeypress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendChatMessage();
  }
}

function startAIVoiceListening() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.start();
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript) {
        document.getElementById('chat-input').value = transcript;
        sendChatMessage();
      }
    };
    recognition.onerror = () => showNotification('❌ خطأ في التعرف على الصوت', 'error');
  } else {
    showNotification('⚠️ المتصفح لا يدعم التعرف على الصوت', 'warning');
  }
}

function toggleAIVoiceResponse() {
  showNotification('🔊 الرد الصوتي قيد التطوير', 'info');
}

// ============ PROJECT HANDLERS ============
let projects = JSON.parse(localStorage.getItem('projects') || '[]');
let selectedProjectId = null;

function showAddProjectModal() {
  const name = prompt('اسم المشروع:');
  if (name) {
    const project = {
      id: Date.now(),
      name: name,
      status: 'active',
      tech: prompt('التكنولوجيا المستخدمة:') || 'JavaScript',
      lines: 0,
      version: 'v1.0'
    };
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    showNotification('✅ تم إضافة المشروع', 'success');
    loadProjects();
  }
}

function showProjectDetails(index) {
  if (projects[index]) {
    selectedProjectId = projects[index].id;
    const project = projects[index];
    document.getElementById('project-title').textContent = project.name;
    document.getElementById('project-details').innerHTML = `
      <div class="detail-item">
        <strong>التكنولوجيا:</strong> ${project.tech}
      </div>
      <div class="detail-item">
        <strong>الحالة:</strong> ${project.status}
      </div>
      <div class="detail-item">
        <strong>الإصدار:</strong> ${project.version}
      </div>
      <div class="detail-item">
        <strong>السطور:</strong> ${project.lines}
      </div>
    `;
    document.getElementById('project-details-modal').style.display = 'flex';
  }
}

function closeProjectModal() {
  document.getElementById('project-details-modal').style.display = 'none';
  selectedProjectId = null;
}

function editProject() {
  const project = projects.find(p => p.id === selectedProjectId);
  if (project) {
    const name = prompt('اسم المشروع:', project.name);
    if (name) {
      project.name = name;
      localStorage.setItem('projects', JSON.stringify(projects));
      closeProjectModal();
      loadProjects();
      showNotification('✅ تم تحديث المشروع', 'success');
    }
  }
}

function deleteProject() {
  if (confirm('هل تريد حذف هذا المشروع؟')) {
    projects = projects.filter(p => p.id !== selectedProjectId);
    localStorage.setItem('projects', JSON.stringify(projects));
    closeProjectModal();
    loadProjects();
    showNotification('✅ تم حذف المشروع', 'success');
  }
}

function loadProjects() {
  const list = document.getElementById('projects-list');
  if (!list) return;
  
  if (projects.length === 0) {
    list.innerHTML = '<div class="empty-state">لا توجد مشاريع. انقر على الزر + لإضافة مشروع جديد</div>';
    return;
  }
  
  list.innerHTML = projects.map((p, i) => `
    <div class="project-item" onclick="showProjectDetails(${i})">
      <div class="project-header">
        <h3>📦 ${p.name}</h3>
        <span class="status-badge ${p.status}">${p.status === 'active' ? 'نشط' : 'قادم'}</span>
      </div>
      <div class="project-info">
        <div>${p.tech}</div>
        <div class="project-stats">📊 ${p.lines} سطر • ⭐ ${p.version}</div>
      </div>
    </div>
  `).join('');
}

// ============ PROFILE HANDLERS ============
function toggleEditProfile() {
  const view = document.getElementById('profile-view');
  const edit = document.getElementById('profile-edit');
  if (view && edit) {
    view.style.display = view.style.display === 'none' ? 'block' : 'none';
    edit.style.display = edit.style.display === 'none' ? 'block' : 'none';
  }
}

function saveProfile() {
  const developer = document.getElementById('edit-developer').value || 'احمد البصراوي';
  const specialty = document.getElementById('edit-specialty').value || 'هندسة البرمجيات';
  
  localStorage.setItem('developer', developer);
  localStorage.setItem('specialty', specialty);
  
  document.getElementById('profile-developer').textContent = developer;
  document.getElementById('profile-specialty').textContent = specialty;
  
  toggleEditProfile();
  showNotification('✅ تم حفظ الملف الشخصي', 'success');
}

function loadProfile() {
  const developer = localStorage.getItem('developer') || 'احمد العويني التميمي البصراوي';
  const specialty = localStorage.getItem('specialty') || 'هندسة البرمجيات والذكاء الاصطناعي';
  
  document.getElementById('profile-developer').textContent = developer;
  document.getElementById('profile-specialty').textContent = specialty;
  document.getElementById('edit-developer').value = developer;
  document.getElementById('edit-specialty').value = specialty;
}

// ============ INIT ============
window.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadProfile();
});
