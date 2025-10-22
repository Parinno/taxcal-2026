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
			}
		}
	},
	plugins: []
}
