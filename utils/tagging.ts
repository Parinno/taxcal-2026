export const sendFnParams = (data: ObjectAny) => {
	return JSON.stringify(data)
}

export const createFnParams = (keys: string, valueKeys: string, data: any): ObjectAny => {
	const params: ObjectAny = {}
	if (keys === '' || valueKeys === '') return params
	const keySplit = keys.split('|')
	const valueKeySplit = valueKeys.split('|')
	keySplit.forEach((item, index) => {
		let keyName = item
		let taggingValue: any = ''
		const keyFilter = item.split(':')
		if (keyFilter.length > 1) {
			keyName = keyFilter[0] as string
			keyFilter.splice(0, 1)
		}
		if (valueKeySplit.length > index) {
			if (isSpecificParam(valueKeySplit[index] as string)) {
				taggingValue = extractSpecificParam(valueKeySplit[index] as string)
			} else if (valueKeySplit[index] === '*') {
				taggingValue = data
			} else if (typeof data === 'object' && valueKeySplit[index] && valueKeySplit[index] in data) {
				taggingValue = data[valueKeySplit[index] as string]
			}
		}
		params[keyName] = valueOptions(keyFilter, taggingValue)
	})
	return params
}

export const isSpecificParam = (str: string): boolean => {
	return /(\[[a-zA-Z0-9\-\\.\\_]+\])/g.test(str)
}

export const extractSpecificParam = (str: string): string => {
	return str.substring(1, str.length - 1)
}

export const valueOptions = (opts: string[], value: any): any => {
	let newValue = value
	opts.forEach((item) => {
		switch (item) {
			case 'lower':
				newValue = lowerString(value)
				break
			default:
				break
		}
	})
	return newValue
}

export const GTMCustomEvent = (action: string, location: string, params: ObjectAny) => {
	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({
		event: 'custom_event',
		name: action,
		location,
		params
	})
}
