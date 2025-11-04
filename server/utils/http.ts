import type { HttpResponse } from '@/server/types/http'

export const successResponse = (data: any): HttpResponse => {
	return {
		status: true,
		statusCode: 200,
		data
	}
}

export const errorResponse = (code: number, err: any): Error => {
	return createError({
		statusCode: code,
		message: err
	})
}
