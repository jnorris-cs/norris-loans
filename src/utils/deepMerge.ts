export function deepMerge<T extends Record<string, unknown>>(
	target: T,
	...sources: Array<Partial<T>>
): T {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				const sourceValue = source[key];
				if (isObject(sourceValue) && isObject(target[key])) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					target[key] = deepMerge(target[key] as any, sourceValue as any);
				} else {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(target as any)[key] = sourceValue;
				}
			}
		}
	}
	return deepMerge(target, ...sources);
}

function isObject(item: unknown): boolean {
	return item !== null && typeof item === 'object' && !Array.isArray(item);
}
