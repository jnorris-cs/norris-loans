import { render } from '@testing-library/react';
import LoanFieldInput from './LoanFieldInput';
import fields from '../../_fixtures/fields';
import type { FieldMetadata } from 'types';

const dateField = fields.find((f) => f.type === 'date') as FieldMetadata;
const moneyField = fields.find((f) => f.type === 'string') as FieldMetadata;
const stringField = fields.find((f) => f.type === 'money') as FieldMetadata;

const generatePropsFromField = (field: FieldMetadata) => {
	return {
		field: field,
		id: 'test',
		name: 'test',
		value: 'value',
		onChange: () => {},
		onBlur: () => {},
		onFocus: () => {},
	};
};

describe('LoanFieldInput', () => {
	it('renders date field correct', () => {
		const result = render(
			<LoanFieldInput {...generatePropsFromField(dateField)} />
		);
		expect(result.baseElement.firstChild).toMatchSnapshot();
	});

	it('renders money field correct', () => {
		const result = render(
			<LoanFieldInput {...generatePropsFromField(moneyField)} />
		);
		expect(result.baseElement.firstChild).toMatchSnapshot();
	});

	it('renders string field correct', () => {
		const result = render(
			<LoanFieldInput {...generatePropsFromField(stringField)} />
		);
		expect(result.baseElement.firstChild).toMatchSnapshot();
	});
});
