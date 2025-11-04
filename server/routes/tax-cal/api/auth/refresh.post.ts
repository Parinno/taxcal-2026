import { H3Event } from 'h3'
import { clearSession } from './logout.get'
import { errorResponse } from '@/server/utils/http'
import { AUTH_CLIENT_ID } from '@/server/config/auth'

export const setIssueAt = (event: H3Event) => {
	const config = useRuntimeConfig()
	const now = new Date()
	setCookie(event, config.public.auth.cookie.issuedAt, now.toISOString(), { path: '/' })
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const refreshToken = getCookie(event, config.public.auth.cookie.refreshToken)
	if (!refreshToken) {
		return await sendError(event, errorResponse(500, 'refresh token not found'))
	}

	const data = []
	data.push('refresh_token=' + refreshToken)
	data.push('client_id=' + AUTH_CLIENT_ID)
	data.push('grant_type=refresh_token')

	try {
		const result = await $fetch<Tokens>(config.public.auth.token, {
			method: 'POST',
			body: data.join('&'),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		})

		setCookie(event, config.public.auth.cookie.refreshToken, result.refresh_token, {
			httpOnly: true,
			path: '/',
			maxAge: config.public.auth.ttl.refreshToken
		})

		setCookie(event, config.public.auth.cookie.accessToken, result.access_token, {
			httpOnly: true,
			path: '/',
			maxAge: result.expires_in
		})

		setIssueAt(event)
		await send(event)
	} catch (err: any) {
		if (err.data) {
			console.error(err.data)
		}

		await clearSession(event)
		await sendError(event, errorResponse(500, err))
	}
})
