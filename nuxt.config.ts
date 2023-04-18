// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/tailwindcss"
    ],
    app: {
        baseURL: './',
    },
    typescript: {
        typeCheck: 'build',
    },

})
