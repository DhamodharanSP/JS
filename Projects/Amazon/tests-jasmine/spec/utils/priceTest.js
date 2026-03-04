import { formatCurrency } from "../../../scripts/utils/price.js";

describe('Test suite: formatCurrency()', () => {
    it('Normal test case', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Edge case: 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Edge case: Decimal Cents', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});