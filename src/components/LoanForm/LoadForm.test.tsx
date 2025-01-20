import { render } from '@testing-library/react';
import LoanForm from './LoanForm';
import fields from '../../_fixtures/fields';

describe('LoanForm', () => {
	it('renders the component correctly', () => {
		const result = render(<LoanForm fields={fields} />);
		expect(result.baseElement.firstChild).toMatchSnapshot();
	});
});
