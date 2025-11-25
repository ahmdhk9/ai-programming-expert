# AI Programming Expert

## Overview
This is an AI programming agent project (in Arabic: "وكيل برمجي ذكي") designed for automatic code generation, deployment, monitoring, and development. The project was imported from GitHub and configured to run in the Replit environment.

**Current State:** Fully functional development environment with Next.js frontend and Express backend.

## Recent Changes (November 25, 2025)
- Imported project from GitHub and configured for Replit environment
- Set up Next.js frontend to run on port 5000 with 0.0.0.0 host binding
- Configured Express backend to run on port 3001 with localhost binding
- Created TypeScript configuration for Next.js
- Configured deployment settings for autoscale deployment
- Updated .gitignore with comprehensive Node.js and Next.js patterns

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
  - `/api/agent` - API route for Firebase integration

### Backend (Express)
- **Location:** `backend/` directory
- **Framework:** Express.js
- **Port:** 3001
- **Host:** localhost (internal only)
- **Endpoints:**
  - `GET /` - Health check
  - `GET /health` - Detailed health status

### External Services
- **Firebase:** Used for data storage (Firestore)
  - Configuration stored in `web/next.config.js`
  - Project ID: developer-expert-86887

## Development Workflow

### Running Locally
The frontend dev server is configured to run automatically via the "Frontend Dev Server" workflow.

To manually start:
```bash
cd web
npm run dev
```

To run the backend (if needed):
```bash
cd backend
npm start
```

### Installing Dependencies
```bash
cd web && npm install
cd backend && npm install
```

### Building for Production
```bash
cd web
npm run build
npm start
```

## Deployment
The project is configured for Replit autoscale deployment:
- **Build command:** Installs dependencies and builds Next.js app
- **Run command:** Starts Next.js production server on port 5000
- **Type:** Autoscale (suitable for stateless web applications)

## Technology Stack
- **Frontend:** Next.js, React, TypeScript, Firebase
- **Backend:** Node.js, Express, Helmet (security), Morgan (logging)
- **Database:** Firebase Firestore
- **Deployment:** Replit Deployments (autoscale)

## User Preferences
No specific user preferences recorded yet.
