export function deepMerge<T extends Record<string, unknown>>(
  target: Record<string, unknown>,
  ...sources: Array<Partial<T>>
): T {
  if (!sources.length) return target as T;
  const source = sources.shift();
  target = { ...target };

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        if (isObject(sourceValue) && isObject(target[key])) {
          target[key] = deepMerge(
            target[key] as Record<string, unknown>,
            sourceValue as Record<string, unknown>
          );
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }
  return deepMerge(target, ...sources);
}

function isObject(item: unknown): boolean {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
