import { useEffect, useState } from 'react';

export default <T>(
	url: string
): { data: null | T; hasError: boolean; isLoading: boolean } => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [data, setData] = useState<null | T>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();
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
		data,
		hasError,
		isLoading,
	};
};
