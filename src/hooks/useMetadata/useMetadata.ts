import type { FieldMetadata } from 'types';

import useApi from 'hooks/useApi/useApi';

interface UseMetadataReturn {
  fieldsMetadata: FieldMetadata[];
  isLoadingMetadata: boolean;
}

export default (): UseMetadataReturn => {
  const { data, isLoading } = useApi<FieldMetadata[]>(
    '/json/fieldsMetaData.json'
  );

  return {
    fieldsMetadata: data ?? [],
    isLoadingMetadata: isLoading,
  };
};
