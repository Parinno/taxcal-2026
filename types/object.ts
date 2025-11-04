export {}
declare global {
	type ObjectString = { [key: string]: string }
	type ObjectNumber = { [key: string]: number }
	type ObjectAny = { [key: string]: any }

	interface Window {
		dataLayer: any
	}
}
