import { render } from '@testing-library/react';

import fields from '../../__fixtures__/fields';
import LoanForm from './LoanForm';

describe('LoanForm', () => {
	it('renders the component correctly', () => {
		const result = render(<LoanForm fields={fields} />);
		expect(result.baseElement.firstChild).toMatchSnapshot();
	});
});
