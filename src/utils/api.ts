const FALLBACK_ERROR_MESSAGE = 'Save Failed';

export const extractErrorMessage = (error: unknown): string => {
  if (!error) {
    return FALLBACK_ERROR_MESSAGE;
  }

  if (
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return FALLBACK_ERROR_MESSAGE;
};
