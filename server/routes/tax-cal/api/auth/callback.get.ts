import { setIssueAt } from './refresh.post'
import { errorResponse } from '@/server/utils/http'
import { AUTH_CLIENT_ID, ACCESS_CODE } from '@/server/config/auth'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const query = getQuery(event)
	if (query.code && typeof query.code === 'string') {
		const challenge = getCookie(event, config.public.auth.cookie.challenge)

		const data = []
		data.push('code=' + query.code)
		data.push('client_id=' + AUTH_CLIENT_ID)
		data.push('code_verifier=' + challenge)
		data.push('redirect_uri=' + config.public.auth.callback)
		data.push('grant_type=' + 'authorization_code')

		try {
			const result = await $fetch<Tokens>(config.public.auth.token, {
				method: 'POST',
				body: data.join('&'),
				headers: {
					Authorization: `Basic ${ACCESS_CODE}`,
					'Cache-Control': 'no-cache',
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				}
			})

			const cookieOption = {
				path: '/',
				httpOnly: true,
				secure: config.public.auth.cookie.secure === 'true'
			}

			setCookie(event, config.public.auth.cookie.refreshToken, result.refresh_token, {
				...cookieOption,
				maxAge: config.public.auth.ttl.refreshToken
			})

			setCookie(event, config.public.auth.cookie.accessToken, result.access_token, {
				...cookieOption,
				maxAge: result.expires_in
			})

			setIssueAt(event)

			let redirectURL = '/'
			const authRedirect = getCookie(event, 'auth_redirect')
			if (authRedirect) redirectURL = decodeURIComponent(authRedirect)
			await sendRedirect(event, redirectURL)
		} catch (err: unknown) {
			await sendError(event, errorResponse(500, err))
		}
	} else {
		await sendError(event, errorResponse(500, 'undifned query'))
	}
})
