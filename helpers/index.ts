import { validatePhoneNumberLength } from 'libphonenumber-js'

export const sleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function isEmail(mail: string) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(mail)) {
		return true
	}
	return false
}

export function isValidZipcode(value: string) {
	if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
		return true
	}
	return false
}

export function isCypress() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	if (typeof window?.Cypress === 'object') {
		return true
	}
	return false
}

export const isCheckLengthNumber = (str: string) => {
	if (validatePhoneNumberLength(str) !== undefined) {
		return false
	}
	return true
}
