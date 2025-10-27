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
			}
		}
	},
	plugins: []
}
