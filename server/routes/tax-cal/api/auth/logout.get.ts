import type { H3Event } from 'h3'

export const clearSession = (event: H3Event) => {
    const config = useRuntimeConfig()
	const cookieOption = {
		path: '/',
		httpOnly: true,
		secure: config.public.auth.cookie.secure === 'true',
	}

	deleteCookie(event, config.public.auth.cookie.challenge, cookieOption)
	deleteCookie(event, config.public.auth.cookie.accessToken, cookieOption)
	deleteCookie(event, config.public.auth.cookie.refreshToken, cookieOption)
}

export default defineEventHandler(async (event) => {
	clearSession(event)
	const config = useRuntimeConfig()
	await sendRedirect(event, config.public.auth.logout)
})
