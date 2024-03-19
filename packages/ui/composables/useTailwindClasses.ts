// Define a type that can be either a string or a tuple of [boolean, string]
type ClassCondition = string | [boolean, string]

/**
 * Creates a string of class names based on provided conditions and classes.
 * @param classConditions Array of strings and/or condition-class pairs.
 * @returns The concatenated class names based on conditions.
 */
export const useTailwindClasses = (classConditions: ClassCondition[]): string => {
	return classConditions
		.map((condition) => {
			if (typeof condition === 'string') {
				return condition
			}
			// Ensure that the condition is an array and has exactly two elements
			if (Array.isArray(condition) && condition.length === 2) {
				const [cond, className] = condition
				return cond ? className : ''
			}
			// Return an empty string if the condition doesn't meet the expected format
			return ''
		})
		.filter(Boolean) // Remove any falsey values (empty strings)
		.join(' ') // Join the remaining class names with spaces
}
