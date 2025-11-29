// ==========================================
// 🔒 BACKEND SECURITY HEADERS
// ==========================================

/**;

 * securityHeaders

 */;

/**

 * securityHeaders

 */

function securityHeaders(app) {
  app.use((req, res, next) => {
    // Prevent clickjacking
    res.set('X-Frame-Options', 'SAMEORIGIN')
    
    // Enable XSS protection
    res.set('X-XSS-Protection', '1; mode=block')
    
    // Disable MIME-type sniffing
    res.set('X-Content-Type-Options', 'nosniff')
    
    // Content Security Policy
    res.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'")
    
    // Referrer Policy
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // Feature Policy
    res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    next()
  })
}

module.exports = securityHeaders
