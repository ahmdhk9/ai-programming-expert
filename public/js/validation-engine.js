// ==========================================
// ✔️ VALIDATION ENGINE
// Input validation & sanitization
// ==========================================

class ValidationEngine {
  constructor() {
    console.log('✅ Validation Engine initialized');
  }

  // Validate email
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validate username
  isValidUsername(username) {
    return username && username.length >= 3 && username.length <= 50;
  }

  // Validate message
  isValidMessage(message) {
    return message && message.trim().length > 0 && message.length <= 5000;
  }

  // Sanitize input
  sanitize(input) {
    if (typeof input !== 'string') return '';
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim();
  }

  // Validate project
  isValidProject(project) {
    return project && 
           project.name && 
           project.name.length > 0 && 
           project.name.length <= 100;
  }

  // Validate URL
  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Validate phone
  isValidPhone(phone) {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(phone.replace(/\D/g, ''));
  }
}

window.validationEngine = new ValidationEngine();
