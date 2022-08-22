/** @type {import('next').NextConfig} */

// pass the modules you would like to see transpiled
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "rb.gy"],
    // loader: "akamai",
    // path: "",
  },
  env: {
    NEXT_APP_FIREBASE_API_KEY: process.env.apiKey,
    NEXT_APP_FIREBASE_AUTH_DOMAIN: process.env.authDomain,
    NEXT_APP_FIREBASE_PROJECT_ID: process.env.projectId,
    NEXT_APP_FIREBASE_STORAGE_BUCKET: process.env.storageBucket,
    NEXT_APP_FIREBASE_MESSAGING_SENDER_ID: process.env.messagingSenderId,
    NEXT_APP_FIREBASE_APP_ID: process.env.appId,
  },
});
