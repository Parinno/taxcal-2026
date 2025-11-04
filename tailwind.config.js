/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
	darkMode: ['class'],
	content: [
		'./app.vue',
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['aktiv-grotesk-thai', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				'color-primary': '#01172B',
				'color-primaryGray': '#01172BDE',
				'color-secondary': '#01172BA6',
				'color-placeholder': '#01172B99',
				'color-information': '#01172B73',
				'button-primary': '#01172B',
				'button-primary-hover': '#011425',
				'button-primary-active': '#011120',
				'button-brand': '#F2F93C',
				'button-brand-hover': '#DFE537',
				'button-brand-active': '#DFE537',
				'button-secondary': 'rgba(1, 23, 43, 0.03)',
				'button-secondary-hover': 'rgba(1, 23, 43, 0.10)',
				'button-secondary-active': 'rgba(1, 23, 43, 0.25)',
				'text-on-color': '#FFFFFF',
				'text-primary': 'rgba(1, 23, 43, 0.87)',
				'text-secondary': 'rgba(1, 23, 43, 0.60)'
			}
		}
	},
	plugins: []
}
