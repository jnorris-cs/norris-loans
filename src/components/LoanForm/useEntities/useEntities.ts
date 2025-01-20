import { useMemo } from 'react';
import type {
	EntityType,
	FieldMetadata,
	LoanEntityMetadata,
} from '../../../types';

export const useEntities = (fields: FieldMetadata[]) => {
	return useMemo<LoanEntityMetadata[]>(() => {
		const map = fields.reduce<Record<string, FieldMetadata[]>>(
			(entities, field) => {
				if (!entities[field.entity]) {
					entities[field.entity] = [];
				}

				entities[field.entity]?.push(field);
				return entities;
			},
			{}
		);

		return Object.keys(map).map((entity) => {
			return {
				name: entity as EntityType,
				fields: map[entity] ?? [],
			};
		});
	}, [fields]);
};
