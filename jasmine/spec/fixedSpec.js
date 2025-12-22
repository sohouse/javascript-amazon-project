import {fixedAmount} from '../../script/util/money.js';

describe('fixed number test:', () => {
   it('normal test', () => {
       expect(fixedAmount(2000, 2)).toEqual('20.00');
   })
});