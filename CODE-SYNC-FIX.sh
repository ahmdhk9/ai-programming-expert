#!/bin/bash
echo "🔧 FIXING BACKEND URL ISSUES ON PRODUCTION"

# Fix 1: auto-fix.js lines 115
sed -i "s|window.configEngine.setBackendUrl('http://localhost:8000');|window.configEngine.detectBackendUrl();|g" public/js/auto-fix.js

# Fix 2: auto-fix.js line 173
sed -i "s|window.BACKEND_URL = 'http://localhost:8000';|window.BACKEND_URL = window.BACKEND_URL || 'https://agent-backend-ahmd1.fly.dev';|g" public/js/auto-fix.js

# Fix 3: error-detector.js lines 176-177
sed -i "s|window.configEngine.backendUrls = \[|window.configEngine.backendUrls = isProduction ? ['https://agent-backend-ahmd1.fly.dev'] : [|g" public/js/error-detector.js
sed -i "s|'http://localhost:8000',|// Use production backend|g" public/js/error-detector.js

# Fix 4: error-logger-light.js lines 217-218
sed -i "s|let backendUrl = isLocalhost ? 'http://localhost:8000' : \`http://\${window.location.hostname}:8000\`;|let backendUrl = window.BACKEND_URL || 'https://agent-backend-ahmd1.fly.dev';|g" public/js/error-logger-light.js

# Fix 5: unified-monitor.js line 81 - reorder endpoints
sed -i "s|'http://localhost:8000',|'https://agent-backend-ahmd1.fly.dev', // Production first|g" public/js/unified-monitor.js

# Fix 6: auto-repair-system.js line 527
sed -i "s|'http://localhost:8000',|'https://agent-backend-ahmd1.fly.dev',|g" public/js/auto-repair-system.js

echo "✅ All fixes applied!"
