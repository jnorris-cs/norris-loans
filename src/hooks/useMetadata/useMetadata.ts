import type { FieldMetadata } from 'types';

import useApi from 'hooks/useApi/useApi';

interface UseMetdataReturn {
	fieldsMetadata: FieldMetadata[];
	isLoadingMetadata: boolean;
}

export default (): UseMetdataReturn => {
	const { data, isLoading } = useApi<FieldMetadata[]>(
		'/json/fieldsMetaData.json'
	);

	return {
		fieldsMetadata: data ?? [],
		isLoadingMetadata: isLoading,
	};
};
