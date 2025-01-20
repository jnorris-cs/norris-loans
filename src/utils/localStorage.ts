export const getFromStorage = <T>(
	key: string,
	defaultValue?: T
): T | undefined => {
	const value = localStorage[key];

	if (value) {
		try {
			// we want to try and parse any JSON other it's likely a primitive.
			return JSON.parse(value);
		} catch {
			return value as T;
		}
	}

	return defaultValue;
};

export const setInStorage = (key: string, value: unknown): void => {
	if (!value && localStorage[key]) {
		localStorage.removeItem(key);
		return;
	}

	if (value && typeof value === 'object') {
		value = JSON.stringify(value);
	}

	localStorage[key] = value;
};
