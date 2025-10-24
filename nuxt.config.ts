const contentURL = process.env.CONTENT_URL
const headerVersion = process.env.HEADER_VERSION


export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
	css: ['@/assets/css/tailwind.css'],
	app: {
		head: {
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
				}
			],
			link: [
				{ rel: 'preconnect', href: contentURL },
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: `${contentURL}/favicon/favicon.ico`
				},
				{
					rel: 'preload',
					href: `${contentURL}/fonts/DBHeaventRez.css`,
					as: 'style'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fonts/DBHeaventRez-Regular.woff`,
					as: 'font',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fonts/DBHeaventRez-Bold.woff`,
					as: 'font',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/all.min.css`,
					as: 'style'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fontawesome-pro-6.4.2/webfonts/fa-regular-400.woff2`,
					as: 'font',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fontawesome-pro-6.4.2/webfonts/fa-solid-900.woff2`,
					as: 'font',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					href: `${contentURL}/fontawesome-pro-6.4.2/webfonts/fa-regular-400.woff2`,
					as: 'font'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/all.min.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/v5-font-face.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/sharp-regular.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/sharp-light.min.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fontawesome-pro-6.4.2/css/sharp-solid.min.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `${contentURL}/fonts/DBHeaventRez.css`,
					type: 'text/css'
				},
				{
					rel: 'stylesheet',
					href: `https://use.typekit.net/gru3eoh.css`,
					type: 'text/css'
				}
			],
			script: [
				{
					src: `${contentURL}/web-component/${headerVersion}/header-finnomena.min.js`
				},
			]
		},
		baseURL: '/tax/'
	},
	alias: {
		'@': '~'
	}
})
