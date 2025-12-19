import {addToCart, getCartCount} from './cart.js';
import {getAllProductsMap} from '../data/products.js';
import {fixedAmount} from './util/money.js';

let productsGrid = document.querySelector('.products-grid');
let productContent = '';

document.addEventListener('DOMContentLoaded', () => {
    pageInit();
    addClickListener();
    document.querySelector('.cart-quantity').innerText = (() => {
        return getCartCount();
    })();
});

function pageInit() {
    getAllProductsMap().forEach(product => {
        productContent += `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
    
              <div class="product-price">
                $${fixedAmount(product.priceCents, 2)}
              </div>
    
              <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
        `;
    });

    productsGrid.innerHTML = productContent;
}

function addClickListener() {
    document.querySelectorAll('.add-to-cart-button').forEach(btn => {
        btn.addEventListener('click', () => {
            let productId = btn.dataset.productId;
            let selectedQuantity = Number(document.querySelector('.js-quantity-selector-' + productId).value);
            let addedCart = document.querySelector('.js-added-to-cart-' + productId);
            addCartProcessor(productId, selectedQuantity, addedCart);
        });
    });
}

function addCartProcessor(productId, quantity, tipElement) {
    // 添加购物车
    addToCart(productId, quantity);
    // 显示添加成功提示
    showAddedTip(tipElement);
    // 刷新购物车总数量
    document.querySelector('.cart-quantity').innerText = (() => {
        return getCartCount();
    })();
}

function showAddedTip(element) {
    element.style.opacity = 1;
    setTimeout(() => {
        element.style.transition = 'opacity 0.2s';
        element.style.opacity = 0;
    }, 1000)
}

// // 创建无原型的纯净对象（无 __proto__/toString 等内置属性）
// const testMap = Object.create(null);
//
// // 设置键值对
// testMap['a'] = 'aaa'; // 等价于 Map.set('a', 'aaa')
// testMap['b'] = 'bbb';

// 获取值
// console.log(testMap['a']); // "aaa" （等价于 Map.get('a')）
//
// // 检查键是否存在
// console.log('a' in testMap); // true （等价于 Map.has('a')）
//
// // 删除键
// delete testMap['a']; // 等价于 Map.delete('a')
//
// // 清空（需手动实现）
// Object.keys(testMap).forEach(key => delete testMap[key]);
//
// // 获取大小
// console.log(Object.keys(testMap).length); // 1 （等价于 Map.size）