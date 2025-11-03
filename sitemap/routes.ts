export async function getSitemapRoutes() {
	// Define routes with their aliases
	// Each route can have multiple paths (main route + aliases)
	const routes = [
		{
			paths: [
				'/calculator',
				'/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5' // Thai alias from calculator.vue
			]
		}
	]

	// Flatten routes array to include all paths
	const allRoutes = routes.flatMap((route) => route.paths)

	return allRoutes.map((route) => ({
		url: route,
		lastmod: new Date().toISOString()
	}))
}


