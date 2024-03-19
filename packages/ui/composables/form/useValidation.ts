const validationMap: Record<string, string> = {
	invalid: 'invalid',
	valid: 'valid'
}

export const useValidation = (validation: string) => validationMap[validation]
