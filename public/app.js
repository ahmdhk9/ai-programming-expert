// تحديث الرابط النشط في الـ Sidebar
function setActiveLink() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });
}

// تطبيق الرابط النشط عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  setActiveLink();
  
  // إضافة تأثيرات على الـ Cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('click', function() {
      const link = this.querySelector('a');
      if (link) {
        window.location.href = link.getAttribute('href');
      }
    });
  });
  
  // تحديث الـ Header عند الدخول للصفحة
  const header = document.querySelector('.header');
  if (header) {
    header.style.animation = 'slideUp 0.6s ease';
  }
});

// دالة للانتقال بين الصفحات بسلاسة
function navigateTo(page) {
  window.location.href = page;
}

// إضافة تأثير الموشع على الأزرار
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
  });
});
