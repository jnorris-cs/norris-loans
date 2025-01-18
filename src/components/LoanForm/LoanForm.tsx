import { useMemo } from "react";
import type {
	EntityType,
	FieldMetadata,
	LoanEntityMetadata,
} from "../../types";

const useEntities = (fields: FieldMetadata[]) => {
	return useMemo<LoanEntityMetadata[]>(() => {
		const map = fields.reduce<Record<string, FieldMetadata[]>>(
			(entities, field) => {
				if (!entities[field.entity]) {
					entities[field.entity] = [];
				}

				entities[field.entity]?.push(field);
				return entities;
			},
			{},
		);

		return Object.keys(map).map((entity) => {
			return {
				name: entity as EntityType,
				fields: map[entity] ?? [],
			};
		});
	}, [fields]);
};

interface LoanFormProps {
	fields: FieldMetadata[];
}

const LoanForm = ({ fields }: LoanFormProps) => {
	// convert fields into entity objects
	const entities = useEntities(fields);

	return <div className="content pt3">{entities.length}</div>;
};

export default LoanForm;
