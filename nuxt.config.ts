// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
	css: ['@/assets/css/tailwind.css'],
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
				}
			]
		},
		baseURL: '/tax/'
	},
	alias: {
		'@': '~'
	}
})
