export {}
declare global {
	interface UserState {
		isLoggedIn: boolean
		refresh: boolean
		userID?: number | null
		displayName?: string
		imageURL?: string
	}
}
