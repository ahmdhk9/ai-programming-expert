// نظام الزحف الآمن والبحث الذكي
const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');

class WebCrawlerSecurity {
  async crawlAndAnalyze(url) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const security = this.analyzeSecurityHeaders(response.headers);
      const content = this.extractContent(response.data);
      const vulnerabilities = this.detectVulnerabilities(response.headers, response.data);

      return {
        url,
        status: response.status,
        timestamp: new Date(),
        security,
        content,
        vulnerabilities,
        safe: vulnerabilities.length === 0,
        trustScore: this.calculateTrustScore(security, vulnerabilities)
      };
    } catch (error) {
      return {
        url,
        error: error.message,
        safe: false,
        trustScore: 0
      };
    }
  }

  // تحليل رؤوس الأمان
  analyzeSecurityHeaders(headers) {
    return {
      ssl: headers['strict-transport-security'] ? '✅ SSL/TLS' : '❌ غير آمن',
      xssProtection: headers['x-xss-protection'] ? '✅' : '⚠️',
      contentType: headers['x-content-type-options'] ? '✅' : '⚠️',
      frameOptions: headers['x-frame-options'] ? '✅' : '⚠️',
      csp: headers['content-security-policy'] ? '✅' : '⚠️',
      cors: headers['access-control-allow-origin'] ? '✅' : 'محمي'
    };
  }

  // استخراج المحتوى
  extractContent(html) {
    try {
      const $ = cheerio.load(html);
      return {
        title: $('title').text() || 'بدون عنوان',
        description: $('meta[name="description"]').attr('content') || '',
        headings: $('h1, h2, h3').map((i, el) => $(el).text()).get().slice(0, 5),
        links: $('a').map((i, el) => $(el).attr('href')).get().slice(0, 10),
        images: $('img').length
      };
    } catch (e) {
      return null;
    }
  }

  // كشف الثغرات
  detectVulnerabilities(headers, body) {
    const vulnerabilities = [];
    
    if (!headers['strict-transport-security']) vulnerabilities.push("HSTS غير مفعل");
    if (body.includes('eval(') || body.includes('innerHTML')) vulnerabilities.push("كود خطر");
    if (body.includes('mysql_') || body.includes('mysql ')) vulnerabilities.push("استخدام مكتبات قديمة");
    if (!headers['x-frame-options']) vulnerabilities.push("عرضة للـ Clickjacking");
    if (!headers['content-security-policy']) vulnerabilities.push("CSP غير مفعل");

    return vulnerabilities;
  }

  // حساب درجة الثقة
  calculateTrustScore(security, vulnerabilities) {
    let score = 100;
    score -= vulnerabilities.length * 15;
    score -= Object.values(security).filter(v => !v.includes('✅')).length * 10;
    return Math.max(0, score);
  }

  // البحث الذكي
  async search(query) {
    return {
      query,
      results: [
        { title: "النتيجة 1", url: "https://example.com/1", snippet: "..." },
        { title: "النتيجة 2", url: "https://example.com/2", snippet: "..." }
      ],
      timestamp: new Date()
    };
  }

  // حماية من DDoS
  detectDDoS(requests) {
    const threshold = 100;
    const timeWindow = 60000;
    const now = Date.now();
    const recent = requests.filter(r => now - r.timestamp < timeWindow);
    
    return {
      requestCount: recent.length,
      isDDoS: recent.length > threshold,
      severity: recent.length > threshold * 2 ? 'عالي' : recent.length > threshold ? 'متوسط' : 'منخفض',
      action: recent.length > threshold ? 'حجب الطلبات' : 'متابعة'
    };
  }

  // تحليل الروابط
  analyzeLink(link) {
    return {
      url: link,
      protocol: new URL(link).protocol,
      domain: new URL(link).hostname,
      safe: !link.includes('javascript:'),
      isSuspicious: link.includes('bit.ly') || link.includes('tinyurl')
    };
  }
}

module.exports = new WebCrawlerSecurity();
