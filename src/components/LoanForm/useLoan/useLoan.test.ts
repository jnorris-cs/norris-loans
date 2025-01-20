import { act, renderHook } from '@testing-library/react';

import fields from '../../../__fixtures__/fields';
import { useLoan } from './useLoan';

const fields1 = fields[0];
const fields2 = fields[1];

jest.useFakeTimers();

describe('useLoan', () => {
	it('should handle multiple update calls at the same time', () => {
		const { result } = renderHook(() => useLoan(fields));

		const { getFieldValue, updateLoan } = result.current;

		act(() => {
			updateLoan({ [fields1.entity]: { [fields1.field]: 'test 1' } });
			updateLoan({ [fields2.entity]: { [fields2.field]: 'test 2' } });

			jest.runAllTimers();
		});

		expect(getFieldValue(fields1)).toBe('test 1');
		expect(getFieldValue(fields2)).toBe('test 2');
	});
});
