// Serves the CDN's webfonts and their CSS from our own domain. The CDN only lets a few origins load
// fonts (CORS), so on any other domain, like a Vercel preview, DB Heavent and FontAwesome render blank.
export default defineEventHandler((event) => {
	const config = useRuntimeConfig()
	const path = getRouterParam(event, 'path')
	// identity: ask the CDN for uncompressed files, or the browser fails to decode the proxied response
	return proxyRequest(event, `${config.public.url.scontent}/${path}`, {
		headers: { 'accept-encoding': 'identity' }
	})
})
