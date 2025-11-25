# AI Programming Expert

## Overview
This is an AI programming agent project (in Arabic: "وكيل برمجي ذكي") designed for automatic code generation, deployment, monitoring, and development. The project was imported from GitHub and configured to run in the Replit environment.

**Current State:** Fully functional Next.js frontend running in development mode.

## Recent Changes (November 25, 2025)
- Imported project from GitHub and configured for Replit environment
- Set up Next.js frontend to run on port 5000 with 0.0.0.0 host binding
- Created TypeScript configuration for Next.js
- Configured deployment settings for autoscale deployment
- Updated .gitignore with comprehensive Node.js and Next.js patterns
- Moved Firebase credentials to environment variables for security

## Project Architecture

### Frontend (Next.js)
- **Location:** `web/` directory
- **Framework:** Next.js 14.2.3 with React 18.2.0
- **Port:** 5000 (configured for Replit webview)
- **Host:** 0.0.0.0 (allows Replit proxy access)
- **Pages:**
  - `/` - Home page with navigation
  - `/about` - About the agent project
  - `/dashboard` - Dashboard for monitoring (planned features)
  - `/api/agent` - API route for Firebase integration (requires configuration)

### Backend (Express) - NOT CURRENTLY ACTIVE
- **Location:** `backend/` directory
- **Framework:** Express.js
- **Port:** 3001
- **Host:** 0.0.0.0 (ready for Replit access if started)
- **Status:** Code exists but is not integrated into the current workflow
- **Note:** The backend is available for future use but is not currently started or deployed. If needed, you can manually start it with `cd backend && npm start`. The backend will be accessible on port 3001.

### External Services
- **Firebase:** Configured for data storage (Firestore)
  - Credentials stored in Replit environment variables (shared environment)
  - Project ID: developer-expert-86887
  - **Note:** Firebase integration is set up but requires valid credentials to function

## Development Workflow

### Running Locally
The frontend dev server is configured to run automatically via the "Frontend Dev Server" workflow. It starts automatically when you open the Repl and runs on port 5000.

To manually restart the frontend:
```bash
cd web
npm run dev
```

### Installing Dependencies
Frontend dependencies are already installed. To reinstall or update:
```bash
cd web && npm install
```

Backend dependencies (if needed):
```bash
cd backend && npm install
```

### Starting the Backend (Optional)
The backend is not currently active. If you need to start it for testing or development:
```bash
cd backend
npm start
```
The backend will be available on port 3001.

### Building for Production
```bash
cd web
npm run build
npm start
```

## Environment Variables
Firebase credentials are stored as environment variables in the shared environment:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

These can be viewed or modified in the Replit Secrets panel or via environment variable tools.

## Deployment
The project is configured for Replit autoscale deployment:
- **Build command:** Installs dependencies and builds Next.js app
- **Run command:** Starts Next.js production server on port 5000
- **Type:** Autoscale (suitable for stateless web applications)
- **What gets deployed:** Frontend Next.js application only (backend is not included)

## Technology Stack
- **Frontend:** Next.js, React, TypeScript, Firebase
- **Backend:** Node.js, Express, Helmet (security), Morgan (logging)
- **Database:** Firebase Firestore
- **Deployment:** Replit Deployments (autoscale)

## User Preferences
No specific user preferences recorded yet.
