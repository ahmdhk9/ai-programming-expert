// ==========================================
// 📊 Quality Scoring System
// Evaluate AI Response Quality
// ==========================================

class QualityScorer {
  constructor() {
    this.weights = {
    length: 0.1,      // Response length (not too short, not too long)
    relevance: 0.4,   // How relevant to the question
    coherence: 0.25,  // How coherent and well-structured
    language: 0.15,   // Grammar and language quality
    timeliness: 0.1   // How fast it was generated
    };
  }

  score(message, response, generationTime) {
    const scores = {
    length: this.scoreLength(response),
    relevance: this.scoreRelevance(message, response),
    coherence: this.scoreCoherence(response),
    language: this.scoreLanguage(response),
    timeliness: this.scoreTimeliness(generationTime)
    };

    // Calculate weighted score
    let totalScore = 0
    for (const [key, weight] of Object.entries(this.weights)) {
    totalScore += scores[key] * weight
    }

    return {
    overall: Math.round(totalScore * 100) / 100,
    breakdown: scores
    };
  }

  scoreLength(response) {
    const length = response.length
    
    // Optimal: 100-500 characters
    if (length >= 100 && length <= 500) return 1.0
    if (length < 50) return 0.3
    if (length > 1000) return 0.7
    
    // Linear interpolation for in-between
    if (length < 100) return 0.3 + (length / 100) * 0.7
    return 1.0 - ((length - 500) / 500) * 0.3
  }

  scoreRelevance(message, response) {
    // Extract keywords from message
    const keywords = this.extractKeywords(message)
    const responseWords = new Set(response.toLowerCase().split(' '))

    if (keywords.length === 0) return 0.5

    const matchCount = keywords.filter(k => responseWords.has(k)).length
    return Math.min(1.0, matchCount / keywords.length)
  }

  scoreCoherence(response) {
    // Check for sentences, punctuation, structure
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const avgLength = response.split(' ').length / Math.max(sentences.length, 1)

    let score = 0
    if (sentences.length >= 2) score += 0.3
    if (response.includes(',')) score += 0.2
    if (response.includes(':')) score += 0.2
    if (avgLength >= 8 && avgLength <= 20) score += 0.3

    return Math.min(1.0, score)
  }

  scoreLanguage(response) {
    let score = 0.5; // Base score

    // Check for common language issues
    const doubleSpace = /  +/g.test(response)
    const camelCase = /[a-z][A-Z]/.test(response)
    const numbers = /\d/.test(response)

    if (!doubleSpace) score += 0.2
    if (camelCase) score += 0.15
    if (numbers) score += 0.15

    return Math.min(1.0, score)
  }

  scoreTimeliness(generationTime) {
    // Faster is better, but instant responses are suspicious
    if (generationTime < 100) return 0.7; // Too fast (cached)
    if (generationTime < 1000) return 0.95; // Excellent
    if (generationTime < 3000) return 0.8
    if (generationTime < 5000) return 0.6
    return 0.3; // Too slow
  }

  extractKeywords(text) {
    // Simple keyword extraction
    const words = text.toLowerCase().split(/\W+/)
    const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'is', 'are', 'was', 'were', 'be', 'been', 'do', 'does', 'did',
    'ما', 'في', 'على', 'من', 'إلى', 'هو', 'هي', 'هم', 'هن'
    ])

    return words.filter(w => w.length > 3 && !stopwords.has(w))
  }
}

module.exports = QualityScorer