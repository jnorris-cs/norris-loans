import useApi from "../useApi/useApi";
import type { FieldMetadata } from "../../types";

interface UseMetdataReturn {
	isLoadingMetadata: boolean;
	fieldsMetadata: FieldMetadata[];
}

export default (): UseMetdataReturn => {
	const { isLoading, data } = useApi<FieldMetadata[]>(
		"./src/assets/json/fieldsMetaData.json",
	);

	return {
		isLoadingMetadata: isLoading,
		fieldsMetadata: data ?? [],
	};
};
