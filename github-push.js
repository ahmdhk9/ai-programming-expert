#!/usr/bin/env node

/**
 * GitHub Auto Push Script
 * رفع الملفات على GitHub API بدون git CLI
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = 'ahmdhk9';
const REPO_NAME = 'ai-programming-expert';
const BRANCH = 'main';

if (!GITHUB_TOKEN) {
  console.error('❌ خطأ: لم يتم العثور على GITHUB_TOKEN');
  process.exit(1);
}

const log = (msg, type = 'info') => {
  const icon = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${icon} ${msg}`);
};

async function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'AI-Expert-CI-CD',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getLatestCommit() {
  log('🔍 جلب آخر commit...');
  
  const res = await makeRequest('GET', `/repos/${GITHUB_USER}/${REPO_NAME}/commits/${BRANCH}`);
  
  if (res.status !== 200) {
    throw new Error(`فشل جلب الـ commit: ${res.status}`);
  }

  return res.data.sha;
}

async function getFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return Buffer.from(content).toString('base64');
  } catch (error) {
    return null;
  }
}

async function uploadFile(filePath, fileContent) {
  const gitPath = path.relative('/home/runner/workspace', filePath).replace(/\\/g, '/');
  
  log(`📤 رفع: ${gitPath}`);

  const message = `🚀 Add Smart CI/CD Pipeline - ${gitPath}`;
  
  const res = await makeRequest('PUT', `/repos/${GITHUB_USER}/${REPO_NAME}/contents/${gitPath}`, {
    message: message,
    content: fileContent,
    branch: BRANCH
  });

  return res.status === 201 || res.status === 200;
}

async function push() {
  try {
    log('🚀 بدء رفع الملفات على GitHub...\n');

    const filesToUpload = [
      '.github/workflows/deploy.yml',
      'scripts/deploy-vercel.js',
      'scripts/deploy-firebase.js',
      'scripts/deploy-flyio.js',
      'scripts/monitor.js',
      'scripts/auto-recovery.js',
      'scripts/update-status.js',
      'deploy.config.json',
      'public/js/config-engine.js',
      'public/js/app.js',
      'replit.md',
    ];

    let uploaded = 0;
    let failed = 0;

    for (const file of filesToUpload) {
      const fullPath = path.join('/home/runner/workspace', file);
      
      if (!fs.existsSync(fullPath)) {
        log(`⏭️  تخطي: ${file} (لم يتم العثور عليه)`, 'warning');
        continue;
      }

      try {
        const content = await getFileContent(fullPath);
        if (!content) {
          log(`❌ فشل قراءة: ${file}`, 'error');
          failed++;
          continue;
        }

        const success = await uploadFile(fullPath, content);
        
        if (success) {
          log(`✅ تم رفع: ${file}`, 'success');
          uploaded++;
        } else {
          log(`❌ فشل رفع: ${file}`, 'error');
          failed++;
        }

        // تأخير بسيط لتجنب rate limiting
        await new Promise(r => setTimeout(r, 500));

      } catch (error) {
        log(`❌ خطأ في ${file}: ${error.message}`, 'error');
        failed++;
      }
    }

    console.log('\n' + '='.repeat(50));
    log(`✅ تم الرفع: ${uploaded}/${filesToUpload.length}`, 'success');
    
    if (failed > 0) {
      log(`⚠️ فشل: ${failed}`, 'warning');
    }

    console.log('='.repeat(50) + '\n');
    log('🎉 انتظر GitHub Actions لتبدأ العمل!', 'success');
    log('🔗 https://github.com/ahmdhk9/ai-programming-expert/actions', 'info');

    process.exit(0);

  } catch (error) {
    log(`❌ خطأ: ${error.message}`, 'error');
    process.exit(1);
  }
}

push();
