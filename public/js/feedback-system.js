// ==========================================
// 💬 FEEDBACK SYSTEM
// User feedback & bug reports
// ==========================================

class FeedbackSystem {
  constructor() {
    this.feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    console.log('✅ Feedback System initialized');
  }

  // Submit feedback
  submit(message, type = 'feedback', screenshots = null) {
    const feedback = {
      id: 'fb_' + Date.now(),
      message: message,
      type: type, // feedback, bug, feature, other
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      screenshots: screenshots,
      rating: null
    };

    this.feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
    
    window.showNotification(`✅ شكراً على تقييمك!`);
    return feedback.id;
  }

  // Rate feature
  rateFeature(feature, rating, comment = '') {
    const rating_entry = {
      id: 'rating_' + Date.now(),
      feature: feature,
      rating: rating, // 1-5
      comment: comment,
      timestamp: new Date().toISOString()
    };

    this.feedbacks.push(rating_entry);
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
    
    return rating_entry.id;
  }

  // Report bug
  reportBug(title, description, severity = 'medium') {
    return this.submit({
      title: title,
      description: description,
      severity: severity
    }, 'bug');
  }

  // Request feature
  requestFeature(title, description) {
    return this.submit({
      title: title,
      description: description
    }, 'feature');
  }

  // Get all feedback
  getAll() {
    return this.feedbacks;
  }

  // Export feedback
  exportFeedback() {
    const data = JSON.stringify(this.feedbacks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'feedback.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  // Get statistics
  getStats() {
    return {
      total: this.feedbacks.length,
      bugs: this.feedbacks.filter(f => f.type === 'bug').length,
      features: this.feedbacks.filter(f => f.type === 'feature').length,
      feedback: this.feedbacks.filter(f => f.type === 'feedback').length
    };
  }
}

window.feedbackSystem = new FeedbackSystem();
