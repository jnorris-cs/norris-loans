import { useEffect, useState } from "react";

export default <T>(
	url: string,
): { data: T | null; isLoading: boolean; hasError: boolean } => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();
				console.log(json);
				setData(json);
			} catch (error) {
				console.error(error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return {
		isLoading,
		data,
		hasError,
	};
};
