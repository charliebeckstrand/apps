type ClassCondition = string | [boolean, string]

/**
 * Flattens nested arrays of class conditions into a single level array.
 * @param conditions Array of class conditions.
 * @returns Flattened array of class conditions.
 */
const flattenConditions = (conditions: ClassCondition[]): (string | [boolean, string])[] => {
	return conditions.flatMap((condition) => {
		if (Array.isArray(condition) && condition.some(Array.isArray)) {
			return flattenConditions(condition as ClassCondition[])
		}
		return [condition] as (string | [boolean, string])[]
	})
}

/**
 * Creates a string of class names based on provided conditions and classes.
 * @param classConditions Array of strings and/or condition-class pairs.
 * @returns The concatenated class names based on conditions.
 */
export const useTailwindClasses = (classConditions: ClassCondition[]): string => {
	const flattenedConditions = flattenConditions(classConditions)

	return flattenedConditions
		.map((condition) => {
			if (typeof condition === 'string') {
				return condition
			}
			if (Array.isArray(condition)) {
				if (condition.length === 2 && typeof condition[0] === 'boolean') {
					const [cond, className] = condition
					return cond ? className : ''
				}
			}
			return ''
		})
		.filter(Boolean) // Remove any falsey values (empty strings)
		.join(' ') // Join the remaining class names with spaces
}
