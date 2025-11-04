const contentURL = process.env.CONTENT_URL
const headerVersion = process.env.HEADER_VERSION
const authURL = process.env.AUTH_URL
import sitemap  from './sitemap'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/sitemap'],
	css: ['@/assets/css/tailwind.css'],
	vue: {
		compilerOptions: {
			isCustomElement: (tag) =>
				['header-finnomena-new-header', 'header-finnomena-new-footer'].includes(tag)
		}
	},
	app: {
		head: {
			htmlAttrs: {
				lang: 'th'
			},
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
				{
					src: 'https://apis.google.com/js/api.js'
				}
			]
		},
		baseURL: '/tax/'
	},
	alias: {
		'@': '~'
	},
	runtimeConfig: {
		public: {
			url: {
				googleApiKey: process.env.GOOGLE_API_KEY,
				googleClientId: process.env.GOOGLE_CLIENT_ID,
				googleSheetsId: process.env.GOOGLE_SHEETS_ID,
				googleSheetsRange: process.env.GOOGLE_SHEETS_RANGE,
				finnomenaApiUrl: process.env.FINNOMENA_API_URL || 'https://api-int.finnomena.com',
				finnomenaWebsiteUrl: process.env.FINNOMENA_WEBSITE_URL || 'https://www.finnomena.com',
				scontent: contentURL || 'https://scontent.finnomena.com',
				base: process.env.BASE_URL || 'https://www.finnomena.com',
			},
			auth: {
				token: `${authURL}/oauth2/token`,
				userinfo: `${authURL}/userinfo`,
				logout: `${authURL}/logout`,
				login: `${authURL}/oauth2/auth`,
				// callback: `${process.env.BASE_URL}/tax-cal/api/auth/callback`,
				callback: `${process.env.BASE_URL}/tax-cal/auth/callback`,
				ttl: {
					refreshToken: 2592000,
					accessToken: 3600
				},
				cookie: {
					accessToken: 'access_token',
					refreshToken: 'refresh_token',
					challenge: 'auth.challenge',
					issuedAt: 'auth.issued_at',
					domain: process.env.AUTH_COOKIE_DOMAIN ?? '',
					secure: process.env.AUTH_COOKIE_SECURE ?? 'false'
				},
				challengeMethod: 'S256'
			}
		}
	},
	sitemap: {
		path: '/tax/sitemap.xml',
		exclude: ['/tax/example-input'],
		urls: async () => {
			return await sitemap()
		}
	}
})
