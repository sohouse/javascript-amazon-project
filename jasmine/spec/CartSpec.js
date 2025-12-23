
import {addToCart, getCartCount} from '../../script/cart.js';

describe('购物车测试', () => {
   it('添加一个新的商品', () => {
       spyOn(localStorage, 'getItem').and.callFake(() => {
           return JSON.stringify(Object.create(null));
       });

       addToCart('a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a', 1);
       expect(getCartCount()).toEqual(1);
   });
});