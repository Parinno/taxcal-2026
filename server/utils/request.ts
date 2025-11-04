import { H3Event } from 'h3'

export const createRequestHeaders = (event: H3Event): ObjectAny => {
	const config = useRuntimeConfig()
	const header = <ObjectAny>{}
	let authorization = event.node.req.headers.authorization
	if (!authorization) {
		authorization = getCookie(event, config.public.auth.cookie.accessToken)
	}
	// for development mode
	// set user id
	// header['Finno-User-ID'] = 'XXX'
	if (authorization) {
		header.Authorization = 'Bearer ' + authorization
	}
	return header
}
