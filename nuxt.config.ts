// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon", "@nuxt/image"],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
      appwriteDatabaseId: process.env.APPWRITE_DATABASE_ID,
      appwriteCollectionId: process.env.APPWRITE_COLLECTION_ID,
      appwriteBucketId: process.env.APPWRITE_BUCKET_ID,
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
