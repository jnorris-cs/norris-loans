import useApi from "../useApi/useApi";
import type { FieldMetadata } from "../../types";

interface UseMetdataReturn {
	isLoadingMetadata: boolean;
	fieldsMetadata: FieldMetadata[];
}

export default (): UseMetdataReturn => {
	const { isLoading, data } = useApi<FieldMetadata[]>(
		"/json/fieldsMetaData.json",
	);

	console.log(data);

	return {
		isLoadingMetadata: isLoading,
		fieldsMetadata: data ?? [],
	};
};
