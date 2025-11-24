/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDPSvZxdTbYUwjDbF2mfmEfjCDLTGgDviY",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "developer-expert-86887.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "developer-expert-86887",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "developer-expert-86887.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "725923856882",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:725923856882:web:02fcbe9e1146fff0956b6b",
  },
};

module.exports = nextConfig;
