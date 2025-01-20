import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fields from '../../__fixtures__/fields';
import LoanField from './LoanField';

const stringField =
	fields.find((field) => field.type === 'string') ?? fields[0];
describe('LoanField', () => {
	it('shows gray error message while typing', async () => {
		render(<LoanField field={stringField} />);
		const input = screen.getByRole('textbox');

		await waitFor(async () => await userEvent.click(input));
		await waitFor(async () => await userEvent.keyboard('test 1'));

		expect(
			input.parentElement?.classList.contains('loan-field__invalid')
		).toEqual(false);
		expect(screen.getByText('Can only use alphabetical characters')).toBeDefined();
	});

	it('shows red error message after blur', async () => {
		render(<LoanField field={stringField} />);
		const input = screen.getByRole('textbox');

		await waitFor(async () => await userEvent.click(input));
		await waitFor(async () => await userEvent.keyboard('test 1'));
		await waitFor(async () => await userEvent.tab());

		expect(
			input.parentElement?.classList.contains('loan-field__invalid')
		).toEqual(true);
		expect(
			screen.getByText('Can only use alphabetical characters', {
				selector: 'svg title',
			})
		).toBeDefined();
		expect(
			screen.getByText('Can only use alphabetical characters', {
				selector: '.loan-field-error-message',
			})
		).toBeDefined();
	});

	it('shows saving icon when saving', async () => {
		render(<LoanField field={stringField} />);
		const input = screen.getByRole('textbox');

		await waitFor(async () => await userEvent.click(input));
		await waitFor(async () => await userEvent.keyboard('test'));
		await waitFor(async () => await userEvent.tab());

		expect(
			screen.getByText('Saving...', { selector: 'svg title' })
		).toBeDefined();
	});
});
