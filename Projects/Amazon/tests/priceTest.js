import formatCurrency from '../scripts/utils/price.js';

console.log('Test suite: formatCurrency()');

const testCases = [
    {
        type: 'Normal test case',
        input: 2049,
        output: '20.49'
    },
    {
        type: 'Edge case: 0',
        input: 0,
        output: '0.00'
    },
    {
        type: 'Edge case: Decimal Cents',
        input: 2000.5,
        output: '20.01'
    }
];

testCases.forEach((testcase) => {
    const {type, input, output} = testcase;
    let res;
    if(formatCurrency(input) === output)
        res = 'testcase passed';
    else res = 'testcase failded';
    console.log(`${type}\n${res}`);
});

