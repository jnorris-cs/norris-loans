export const extractErrorMessage = (error: unknown): string => {
	return typeof error === "object" &&
		error &&
		"message" in error &&
		typeof error.message === "string"
		? error.message
		: typeof error === "string" && error
			? error
			: "Save Failed";
};
