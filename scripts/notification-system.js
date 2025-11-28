#!/usr/bin/env node

/**
 * 🔔 UNIFIED NOTIFICATION SYSTEM
 * نظام إشعارات موحد لكل الوكلاء والمنصات
 */

class NotificationCenter {
  constructor() {
    this.notifications = [];
    this.channels = {
      console: true,
      github: process.env.GITHUB_TOKEN ? true : false,
      slack: process.env.SLACK_WEBHOOK ? true : false,
      email: process.env.EMAIL_SERVICE ? true : false
    };
  }

  async notify(level, title, message, context = {}) {
    const notification = {
      timestamp: new Date().toISOString(),
      level, // ERROR, WARN, INFO, SUCCESS
      title,
      message,
      context,
      id: Math.random().toString(36).substr(2, 9)
    };

    this.notifications.push(notification);
    await this.send(notification);
  }

  async send(notification) {
    const emoji = {
      ERROR: '❌',
      WARN: '⚠️',
      INFO: 'ℹ️',
      SUCCESS: '✅'
    }[notification.level] || '📢';

    // Console output
    if (this.channels.console) {
      console.log(`${emoji} [${notification.level}] ${notification.title}`);
      if (notification.message) console.log(`   ${notification.message}`);
    }

    // GitHub issues (for critical errors)
    if (this.channels.github && (notification.level === 'ERROR' || notification.level === 'WARN')) {
      await this.createGitHubIssue(notification);
    }
  }

  async createGitHubIssue(notification) {
    const https = require('https');
    const TOKEN = process.env.GITHUB_TOKEN;
    const REPO = process.env.GITHUB_REPOSITORY || 'ahmdhk9/ai-programming-expert';

    return new Promise((resolve) => {
      const body = `## ${notification.title}\n\n${notification.message}\n\n**Context:** ${JSON.stringify(notification.context, null, 2)}`;
      
      const options = {
        hostname: 'api.github.com',
        path: `/repos/${REPO}/issues`,
        method: 'POST',
        headers: {
          'Authorization': `token ${TOKEN}`,
          'User-Agent': 'Notification-Center',
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        resolve();
      });

      req.on('error', () => resolve());
      req.write(JSON.stringify({
        title: notification.title,
        body: body,
        labels: [notification.level.toLowerCase(), 'auto-generated']
      }));
      req.end();
    });
  }

  async summary() {
    const stats = {
      total: this.notifications.length,
      errors: this.notifications.filter(n => n.level === 'ERROR').length,
      warnings: this.notifications.filter(n => n.level === 'WARN').length,
      successes: this.notifications.filter(n => n.level === 'SUCCESS').length
    };

    console.log('\n📊 Notification Summary:');
    console.log(`  Total: ${stats.total}`);
    console.log(`  Errors: ${stats.errors}`);
    console.log(`  Warnings: ${stats.warnings}`);
    console.log(`  Success: ${stats.successes}`);

    return stats;
  }
}

module.exports = NotificationCenter;
