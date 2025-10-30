import type { NuxtError } from 'nuxt/app'

export {}
declare global {
	interface AppError extends NuxtError {
		response: any
	}
}
