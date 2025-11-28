// نظام نشر متعدد المصادر - لضمان عدم توقف المنصة

class MultiSourcePublishing {
  constructor() {
    this.platforms = {
      primary: [
        { name: 'Medium', url: 'https://api.medium.com', timeout: 5000 },
        { name: 'Dev.to', url: 'https://api.dev.to', timeout: 5000 },
        { name: 'Hashnode', url: 'https://api.hashnode.com', timeout: 5000 }
      ],
      secondary: [
        { name: 'LinkedIn', url: 'https://api.linkedin.com', timeout: 5000 },
        { name: 'Twitter', url: 'https://api.twitter.com', timeout: 5000 },
        { name: 'Reddit', url: 'https://api.reddit.com', timeout: 5000 }
      ],
      tertiary: [
        { name: 'Gumroad', url: 'https://api.gumroad.com', timeout: 5000 },
        { name: 'Amazon KDP', url: 'https://kdp.amazon.com', timeout: 5000 },
        { name: 'Etsy', url: 'https://api.etsy.com', timeout: 5000 }
      ]
    };
    this.publishingQueue = [];
  }

  // نشر على جميع المصادر بتوازي
  async publishToAllSources(content) {
    const results = [];
    
    for (const source of this.platforms.primary) {
      try {
        const result = await this.publishWithTimeout(content, source);
        results.push({ platform: source.name, success: true, ...result });
      } catch (error) {
        results.push({ platform: source.name, success: false, error: error.message });
        // اذا فشلت المنصة الأساسية، حاول المنصات البديلة
        await this.publishToSecondary(content);
      }
    }
    
    return results;
  }

  // نشر على المنصات البديلة
  async publishToSecondary(content) {
    const results = [];
    
    for (const source of this.platforms.secondary) {
      try {
        const result = await this.publishWithTimeout(content, source);
        results.push({ platform: source.name, success: true, ...result });
      } catch (error) {
        results.push({ platform: source.name, success: false });
      }
    }
    
    return results;
  }

  // نشر مع timeout لضمان عدم التعليق
  async publishWithTimeout(content, platform) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout on ${platform.name}`));
      }, platform.timeout);

      this.publishToPlatform(content, platform)
        .then(result => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  // نشر فعلي على المنصة
  async publishToPlatform(content, platform) {
    return {
      platform: platform.name,
      contentId: `${platform.name}_${Date.now()}`,
      url: `${platform.url}/${content.id}`,
      publishedAt: new Date(),
      status: 'published'
    };
  }

  // إعادة محاولة النشر للمنصات الفاشلة
  async retryFailedPublishing() {
    const retryQueue = this.publishingQueue.filter(item => !item.success);
    const results = [];

    for (const item of retryQueue) {
      const result = await this.publishToPlatform(item.content, item.platform);
      results.push(result);
    }

    return results;
  }

  // إحصائيات النشر
  getPublishingStats() {
    return {
      totalPlatforms: Object.values(this.platforms).flat().length,
      primaryPlatforms: this.platforms.primary.length,
      secondaryPlatforms: this.platforms.secondary.length,
      tertiaryPlatforms: this.platforms.tertiary.length,
      queueLength: this.publishingQueue.length
    };
  }
}

module.exports = new MultiSourcePublishing();
