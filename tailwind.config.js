/** @type {import('tailwindcss').Config} */
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
				sans: ['DBHeaventRez', 'sans-serif'],
				aktiv: ['aktiv-grotesk-thai', 'sans-serif']
			}
		}
	},
	plugins: []
}
