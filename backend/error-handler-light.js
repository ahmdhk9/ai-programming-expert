// ==========================================
// 📝 Lightweight Error Handler for Free Tier
// محسّن للـ Replit المجاني
// ==========================================

class LightBackendErrorHandler {
  constructor(app, githubToken) {
    this.app = app;
    this.githubToken = githubToken;
    this.errors = [];
    this.maxErrors = 100; // قليل جداً
    this.repo = 'ahmdhk9/ai-programming-expert';
    this.reportedIssues = new Set(); // تجاهل التكرار
    this.setupRoutes();
    console.log('📝 Light Error Handler initialized');
  }

  setupRoutes() {
    // استقبال دفعة من الأخطاء
    this.app.post('/api/errors/batch', (req, res) => {
      try {
        const { errors = [] } = req.body;
        
        errors.forEach(error => {
          if (this.errors.length < this.maxErrors) {
            this.errors.unshift({
              ...error,
              receivedAt: Date.now()
            });
          }
        });

        // إرسال الأخطاء الحرجة فقط
        const critical = errors.filter(e => e.s === 'critical');
        if (critical.length > 0 && this.githubToken) {
          critical.forEach(e => this.reportToGitHub(e));
        }

        res.json({ success: true, count: errors.length });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });

    // الخطأ الواحد
    this.app.post('/api/errors', (req, res) => {
      const { errors: batched } = req.body;
      if (batched && Array.isArray(batched)) {
        this.app._router.stack.find(r => r.route?.path === '/api/errors/batch')?.route?.stack[0]?.handle(req, res);
      } else {
        // خطأ واحد
        const error = req.body;
        if (this.errors.length < this.maxErrors) {
          this.errors.unshift(error);
        }
        res.json({ success: true });
      }
    });

    // إحصائيات مختصرة
    this.app.get('/api/errors/stats', (req, res) => {
      res.json({
        total: this.errors.length,
        critical: this.errors.filter(e => e.s === 'critical').length,
        reported: this.reportedIssues.size
      });
    });

    // قائمة الأخطاء
    this.app.get('/api/errors', (req, res) => {
      const limit = Math.min(parseInt(req.query.limit) || 50, 50);
      res.json(this.errors.slice(0, limit));
    });

    // حذف
    this.app.delete('/api/errors', (req, res) => {
      this.errors = [];
      res.json({ success: true });
    });
  }

  async reportToGitHub(error) {
    if (!this.githubToken) return;

    const id = error.id || error.m;
    if (this.reportedIssues.has(id)) return; // تم الإرسال مسبقاً

    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.repo}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: `🚨 ${error.m?.substring(0, 50)}`,
            body: `Type: ${error.type}\nMessage: ${error.m}\nCount: ${error.c}`,
            labels: ['error', 'auto-reported']
          })
        }
      );

      if (response.ok) {
        this.reportedIssues.add(id);
      }
    } catch (e) {
      console.error('❌ GitHub error:', e.message);
    }
  }
}

module.exports = LightBackendErrorHandler;
