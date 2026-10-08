// Agentation is a React feedback toolbar. It runs in its own React root,
// apart from the Vue app, and only in dev so it never ships.
export default defineNuxtPlugin(async (): Promise<void> => {
	if (!import.meta.dev) return

	const [{ createElement }, { createRoot }, { Agentation }] = await Promise.all([
		import('react'),
		import('react-dom/client'),
		import('agentation')
	])

	const container = document.createElement('div')
	container.id = 'agentation-root'
	document.body.appendChild(container)
	createRoot(container).render(createElement(Agentation))
})
