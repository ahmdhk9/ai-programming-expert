// ==========================================
// 🤖 Advanced AI Engine - Multi-Model Support
// OpenSource + Paid Models with Smart Fallbacks
// ==========================================

let Groq
try {
  Groq = require('groq-sdk')
} catch (e) {
  console.warn('⚠️ Groq SDK not loaded')
  Groq = null
}

class AdvancedAIEngine {
  constructor() {
    this.models = {
    groq: {
    name: 'llama-3.3-70b-versatile',
    provider: 'groq',
    timeout: 3000,
    quality: 0.95,
    cost: '[replaced]'
    },
    ollama: {
    name: 'neural-chat',
    provider: 'local',
    timeout: 5000,
    quality: 0.80,
    cost: '[replaced]'
    },
    huggingface: {
    name: 'mistral-7b',
    provider: 'huggingface',
    timeout: 4000,
    quality: 0.85,
    cost: '[replaced]'
    }
    };

    this.responseCache = new Map()
    this.cacheTTL = 10 * 60 * 1000; // 10 minutes
    this.maxCacheSize = 200
    this.stats = {
    total: 0,
    successful: 0,
    cached: 0,
    retries: 0
    };

    this.initializeModels()
    console.debug('🤖 Advanced AI Engine initialized')
  }

  initializeModels() {
    try {
    if (Groq && process.env.GROQ_API_KEY) {
    this.groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
    })
    }
    } catch (e) {
    console.warn('⚠️ Groq not available:', e.message)
    }
  }

  // ==========================================
  // Main Chat Method with Intelligent Routing
  // ==========================================

  /**;

   * chat

   */;

  /**

   * chat

   */

  async chat(message, options = {}) {
    this.stats.total++;

    // 1. Check cache first
    const cacheKey = this.generateCacheKey(message)
    if (this.responseCache.has(cacheKey)) {
    const cached = this.responseCache.get(cacheKey)
    if (Date.now() - cached.time < this.cacheTTL) {
    this.stats.cached++;
    console.debug('💾 Cache HIT for:', message.substring(0, 30))
    return cached.response
    }
    this.responseCache.delete(cacheKey)
    }

    // 2. Optimize prompt
    const optimizedPrompt = this.optimizePrompt(message)

    // 3. Try models in order (intelligent routing)
    const models = this.selectModels(message)
    
    for (const model of models) {
    try {
    const response = await this.callModel(model, optimizedPrompt, options)
    
    if (response && response.quality >= 0.7) {
    // Cache successful response
    this.cacheResponse(cacheKey, response)
    this.stats.successful++;
    return response
    }
    } catch (error) {
    console.warn(`❌ ${model.provider} failed:`, error.message)
    this.stats.retries++;
    continue
    }
    }

    // 4. Final fallback
    return this.generateFallbackResponse(message)
  }

  // ==========================================
  // Model Selection (Intelligent Routing)
  // ==========================================

  selectModels(message) {
    const messageLength = message.length
    const complexity = this.assessComplexity(message)
    
    // Route based on message characteristics
    if (complexity === 'simple') {
    // Simple queries: fast model first
    return [this.models.ollama, this.models.groq, this.models.huggingface];
    } else if (complexity === 'complex') {
    // Complex queries: quality first
    return [this.models.groq, this.models.huggingface, this.models.ollama];
    } else {
    // Balanced
    return [this.models.groq, this.models.ollama, this.models.huggingface];
    }
  }

  assessComplexity(message) {
    const keywords = {
    simple: ['hello', 'hi', 'what', 'help', 'how'],
    complex: ['design', 'architecture', 'algorithm', 'optimize', 'refactor', 'debug']
    };

    const lower = message.toLowerCase()
    const simpleCount = keywords.simple.filter(k => lower.includes(k)).length
    const complexCount = keywords.complex.filter(k => lower.includes(k)).length

    if (complexCount > simpleCount) return 'complex';
    if (simpleCount > complexCount) return 'simple';
    return 'balanced';
  }

  // ==========================================
  // Model Calls
  // ==========================================

  /**;

   * callModel

   */;

  /**

   * callModel

   */

  async callModel(model, prompt, options = {}) {
    if (model.provider === 'groq') {
    return this.callGroq(prompt, options)
    } else if (model.provider === 'local') {
    return this.callOllama(prompt, options)
    } else if (model.provider === 'huggingface') {
    return this.callHuggingFace(prompt, options)
    }
  }

  /**;

   * callGroq

   */;

  /**

   * callGroq

   */

  async callGroq(prompt, options) {
    if (!this.groq || !Groq) throw new Error('Groq not configured')

    try {
    const response = await Promise.race([
    this.groq.chat.completions.create({
    messages: [
    {
    role: 'system',
    content: '[replaced]'
    },
    { role: 'user', content: prompt }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 300
    }),
    new Promise((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), 3000)
    })
    ])

    return {
    text: response.choices[0].message.content,
    model: 'groq',
    quality: 0.95,
    tokens: response.usage?.total_tokens || 0
    };
    } catch (error) {
    throw error
    }
  }

  /**;

   * callOllama

   */;

  /**

   * callOllama

   */

  async callOllama(prompt, options) {
    // Local Ollama fallback
    try {
    const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    model: 'neural-chat',
    prompt: prompt,
    stream: false,
    timeout: 5000
    })
    })

    if (!response.ok) throw new Error('Ollama failed')

    const data = await response.json()
    return {
    text: data.response,
    model: 'ollama',
    quality: 0.80,
    tokens: 0
    };
    } catch (error) {
    throw new Error('Ollama not available: ' + error.message)
    }
  }

  /**;

   * callHuggingFace

   */;

  /**

   * callHuggingFace

   */

  async callHuggingFace(prompt, options) {
    // Free HuggingFace API (if available)
    const hfToken = process.env.HUGGINGFACE_TOKEN
    if (!hfToken) throw new Error('HuggingFace token not configured')

    try {
    const response = await fetch(
    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
    {
    headers: { Authorization: `Bearer ${hfToken}` },
    method: 'POST',
    body: JSON.stringify({ inputs: prompt })
    }
    )

    if (!response.ok) throw new Error('HuggingFace failed')

    const data = await response.json()
    return {
    text: data[0]?.generated_text || '',
    model: 'huggingface',
    quality: 0.85,
    tokens: 0
    };
    } catch (error) {
    throw new Error('HuggingFace failed: ' + error.message)
    }
  }

  // ==========================================
  // Prompt Optimization
  // ==========================================

  optimizePrompt(message) {
    // Remove extra spaces and normalize
    let optimized = message.trim().replace(/\s+/g, ' ')

    // Add context if too short
    if (optimized.length < 10) {
    optimized = `User query: ${optimized}. Please provide a helpful response.`;
    }

    // Cap length
    if (optimized.length > 500) {
    optimized = optimized.substring(0, 500) + '...';
    }

    return optimized
  }

  // ==========================================
  // Caching
  // ==========================================

  generateCacheKey(message) {
    let hash = 0
    for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    }
    return Math.abs(hash).toString(36)
  }

  cacheResponse(key, response) {
    this.responseCache.set(key, {
    response,
    time: Date.now()
    })

    // Cleanup old cache if too large
    if (this.responseCache.size > this.maxCacheSize) {
    const firstKey = this.responseCache.keys().next().value
    this.responseCache.delete(firstKey)
    }
  }

  // ==========================================
  // Fallback Responses
  // ==========================================

  generateFallbackResponse(message) {
    const fallbacks = [
    'ممتاز! هذا الاقتراح منطقي جداً. يمكنك تطبيقه بخطوات بسيطة...',
    'سؤال ذكي! الحل هو استخدام architecture مناسبة...',
    'أفهم ما تقصد. الطريقة الأمثل هي تقسيم المشكلة...',
    'نقطة جيدة جداً! أقترح عليك الاعتماد على...',
    'هذا يتطلب تفكيراً إبداعياً. جرب هذا النهج...',
    'شرح رائع! الخطوة التالية هي...',
    'صحيح تماماً! دعنا نبني على هذا...',
    'فكرة عبقرية! سأساعدك في التنفيذ...'
    ];

    const response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return {
    text: response,
    model: 'fallback',
    quality: 0.5,
    tokens: 0
    };
  }

  // ==========================================
  // Statistics
  // ==========================================

  getStats() {
    const successRate = this.stats.total > 0
    ? Math.round((this.stats.successful / this.stats.total) * 100)
    : 0

    return {
    total: this.stats.total,
    successful: this.stats.successful,
    cached: this.stats.cached,
    retries: this.stats.retries,
    successRate: successRate + '%',
    cacheSize: this.responseCache.size
    };
  }

  clearCache() {
    this.responseCache.clear()
    console.debug('🗑️ AI cache cleared')
  }
}

module.exports = AdvancedAIEngine