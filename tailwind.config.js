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
    	extend: {},
    },
	plugins: []
}
