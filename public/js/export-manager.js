// ==========================================
// 💾 EXPORT MANAGER
// Export data to various formats
// ==========================================

class ExportManager {
  constructor() {
    console.log('✅ Export Manager initialized');
  }

  exportJSON() {
    const data = {
      messages: JSON.parse(localStorage.getItem('chatMessages') || '[]'),
      projects: JSON.parse(localStorage.getItem('projects') || '[]'),
      interactions: JSON.parse(localStorage.getItem('interactions') || '[]'),
      profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.download(blob, 'ai-expert-data.json');
    window.showNotification('✅ تم تصدير البيانات بصيغة JSON');
  }

  exportCSV() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    let csv = 'التاريخ,السؤال,الإجابة,الفئة\n';
    
    messages.forEach(msg => {
      csv += `"${msg.timestamp}","${msg.question}","${msg.answer}","${msg.category}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.download(blob, 'ai-expert-messages.csv');
    window.showNotification('✅ تم تصدير الرسائل بصيغة CSV');
  }

  exportMarkdown() {
    const interactions = JSON.parse(localStorage.getItem('interactions') || '[]');
    let md = '# AI Programming Expert - Data Export\n\n';
    md += `تاريخ التصدير: ${new Date().toLocaleString('ar-SA')}\n\n`;

    interactions.forEach((int, i) => {
      md += `## السؤال ${i + 1}\n`;
      md += `- **الفئة**: ${int.category}\n`;
      md += `- **السؤال**: ${int.question}\n`;
      md += `- **الوقت**: ${int.time}ms\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    this.download(blob, 'ai-expert-data.md');
    window.showNotification('✅ تم تصدير البيانات بصيغة Markdown');
  }

  download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}

window.exportManager = new ExportManager();
