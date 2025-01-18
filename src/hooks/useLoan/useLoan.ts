import {useReducer} from 'react';
import type {Loan, FieldMetadata, InputValue } from '../../types'

interface State {
   loan: Loan 
};

type LoanAction =
  | { type: "init", value: {
    fields: FieldMetadata  }  }
  | { type: "update"; value: {
    value: InputValue,
    entity: string,
    field: string
  } 
}

const initialState: State = { loan: {} as Loan };

export function stateReducer(state: State, action: LoanAction): State {
  switch (action.type) {
    // case "init":
    //   return {

    //   };
    // case "setCount":
    //   return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}