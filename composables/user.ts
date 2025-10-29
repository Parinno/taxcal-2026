import { defineStore } from 'pinia'
import type { HttpResponse } from '@/server/types/http'
import { apiPrefixPath } from '@/utils/url'

const apiPrefix = apiPrefixPath()

export const useUser = defineStore('user', () => {
	const user = reactive<UserState>({
		isLoggedIn: false,
		refresh: false,
		userID: null,
		displayName: '',
		imageURL: ''
	})

	const isLoggedIn = computed((): boolean => {
		return user.isLoggedIn
	})

	async function getProfile() {
		const config = useRuntimeConfig()
		const accessToken = useCookie((config.public as any).auth.cookie.accessToken)
		if (!accessToken.value) {
			user.isLoggedIn = false
			return
		}
		try {
			const { data } = (await $fetch(
				`${apiPrefix}/auth/user/mini-profile?access_token=${accessToken.value}`
			)) as HttpResponse
			user.userID = data?.user_id
			user.displayName = data?.display_name
			user.imageURL = data?.profile_url
		} catch (err: unknown) {
			user.isLoggedIn = false
		}
	}
	function setLoginStatus(isLogin: boolean) {
		user.isLoggedIn = isLogin
	}

	return {
		user,
		isLoggedIn,
		getProfile,
		setLoginStatus
	}
})
