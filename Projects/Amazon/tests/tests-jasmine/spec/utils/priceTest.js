import { formatCurrency } from "../../../../scripts/utils/price.js";

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

    // 16a.
    it('Exercise: 2000.4', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    // 16b.
    it('Negative test: -1800.6', () => {
        expect(formatCurrency(-1800.6)).toEqual('-18.01');
    });
});