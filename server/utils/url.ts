function escapeStringRegExp(str: string): string {
	return str.replace(/[|\\{}()[\]^$+\-*?.]/g, '\\$&')
}

const urlWhiteList = () => {
	const config = useRuntimeConfig()
	return [escapeStringRegExp(new URL(config.public.url.base).hostname), '\\w.finnomena.com']
}

const re = new RegExp(`${urlWhiteList().join('|')}$`)

export const getWhiteListUrl = (urlStr: string): string => {
	const config = useRuntimeConfig()
	try {
		const url = new URL(decodeURIComponent(urlStr)) // throw an error when URL is invalid
		if (!url.protocol.startsWith('http')) {
			throw new Error('invalid redirect url, it should starts with http')
		}
		if (!re.test(url.hostname)) {
			throw new Error('invalid redirect url, ' + url.hostname + " doesn't match against whitelist")
		}
		return url.href
	} catch (err) {
		return config.public.url.base
	}
}

export const isEncodeURI = (str: string): boolean => {
	return /\\%/i.test(str)
}
