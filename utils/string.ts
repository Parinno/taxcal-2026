export const ellipsisString = (str: string, len: number, tail = '...'): string => {
	if (str.length <= len) return str
	return `${str.substring(0, len)} ${tail}`
}

export const lowerString = (str = ''): string => {
	return str.toLowerCase()
}
