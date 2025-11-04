export default defineNuxtPlugin(async (): Promise<void> => {
	const { validate } = useAuth()
	const { user, getProfile } = useUser()
	await validate()
	if (user.isLoggedIn) {
		await getProfile()
	}
})
