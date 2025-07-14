// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  plugins: ["~/plugins/firebase.client.ts"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon", "@nuxt/image", "@nuxtjs/i18n"],

  i18n: {
    vueI18n: "./i18n.config.ts", // or .js

    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "kz", name: "Kazakh", file: "kz.json" },
      { code: "ru", name: "Russian", file: "ru.json" },
    ],
    defaultLocale: "en",
    lazy: false, // loads only the needed language
    langDir: "locales/",
    strategy: "no_prefix", // or 'prefix_except_default'
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
      appwriteDatabaseId: process.env.APPWRITE_DATABASE_ID,
      appwriteCollectionId: process.env.APPWRITE_COLLECTION_ID,
      appwriteMessagesCollectionId: process.env.APPWRITE_MESSAGES_COLLECTION_ID,
      appwriteBucketId: process.env.APPWRITE_BUCKET_ID,
      appwriteRecoveryUrlPage: process.env.APPWRITE_RECOVERY_URL_PAGE,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebasePublicKeyPair: process.env.FIREBASE_PUBLIC_KEY_PAIR,
      firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY_PAIR,
    },
  },

  ssr: true,
  nitro: {
    preset: "netlify",
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/images/favicon.png" }],
    },
  },
});
