export const deepMerge = <T>(
	target: Record<string, unknown>,
	source: Record<string, unknown>
): T => {
	const output = { ...target };
	for (const key in source) {
		if (source[key] instanceof Object && !(source[key] instanceof Array)) {
			if (!output[key]) {
				output[key] = {};
			}
			deepMerge(
				output[key] as Record<string, unknown>,
				source[key] as Record<string, unknown>
			);
		} else {
			output[key] = source[key];
		}
	}

	return output as T;
};
