import {deleteCartItem, getCartCount} from './cart.js';
import {products} from '../data/products.js';
import {fixedAmount} from './util/money.js';
import {load} from './util/storage.js';

let productMap = new Map();

document.addEventListener('DOMContentLoaded', () => {
    transformProducts();
    pageInit();
    addDeleteListener();
    updateCartQuantity();
});

function transformProducts() {
    products.forEach(product => {
        productMap.set(product.id, product);
    });
}

function pageInit() {
    let continer = document.querySelector('.order-summary');
    let continerInnerText = '';
    let carts = load('carts');
    if (carts === null) return;

    Object.keys(carts).forEach(productId => {
        let currentProduct = productMap.get(productId);
        continerInnerText += `
            <div class="cart-item-container js-cart-item-continer-${productId}">
                <div class="delivery-date">
                  Delivery date: Wednesday, June 15
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${currentProduct.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${currentProduct.name}
                    </div>
                    <div class="product-price">
                      $${fixedAmount(currentProduct.priceCents, 2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${carts[productId]}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id="${productId}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
    
                    <div class="delivery-option">
                      <input type="radio" class="delivery-option-input"
                        name="delivery-option-${productId}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked class="delivery-option-input"
                        name="delivery-option-${productId}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" class="delivery-option-input"
                        name="delivery-option-${productId}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        `;
    });
    continer.innerHTML = continerInnerText;
    addDeleteListener();
}

function addDeleteListener() {
    document.querySelectorAll('.js-delete-cart-item').forEach(del => {
        del.addEventListener('click', () => {
            let productId = del.dataset.productId;
            deleteCartItem(productId);
            removeCartItem(productId);
            updateCartQuantity();
        })
    });
}

function updateCartQuantity() {
    document.querySelector('.js-cart-item-quantity-link').innerText = (() => {
        return getCartCount() + ' items';
    })();
}

function removeCartItem(productId) {
    let orderSummary = document.querySelector('.js-cart-item-continer-' + productId);
    orderSummary.remove();
}