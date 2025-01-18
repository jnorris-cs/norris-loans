

export const get = <T>(key: string, defaultValue?: T): T | undefined => {
  const value = localStorage[key] 

  if (value) {
    try {
      // we want to try and parse any JSON other it's likely a primitive.
      return JSON.parse(value);
    } catch {
      return value as T
    }
  }
  
  return defaultValue;
}

export const set = (key: string, value: unknown): void => {

  if (!value && localStorage[key]) {
    localStorage.removeItem(key);
    return
  }

  localStorage[key] = value; 
}