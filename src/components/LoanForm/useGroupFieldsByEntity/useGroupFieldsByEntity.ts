import type { EntityType, FieldMetadata, LoanEntityMetadata } from 'types';

import { useMemo } from 'react';

export const useGroupFieldsByEntity = (fields: FieldMetadata[]) => {
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
        fields: map[entity] ?? [],
        name: entity as EntityType,
      };
    });
  }, [fields]);
};
