const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	let authorization = event.node.req.headers.authorization
	if (!authorization) {
		authorization = 'Bearer ' + getCookie(event, config.public.auth.cookie.accessToken)
	}

	await sendProxy(event, config.public.auth.userinfo, {
		headers: {
			Authorization: authorization
		}
	})
})
