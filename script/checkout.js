import {deleteCartItem, getAllCarts, getCartCount, updateCartItem} from './cart.js';
import {getAllProductsMap} from '../data/products.js';
import {fixedAmount} from './util/money.js';
import {paymentInfo} from './payment.js';

document.addEventListener('DOMContentLoaded', () => {
    pageInit();
    addDeleteListener();
    addUpdateListener();
    updateCartQuantity();
});

function pageInit() {
    let continer = document.querySelector('.order-summary');
    let continerInnerText = '';
    let carts = getAllCarts();
    if (carts === null) return;
    let products = getAllProductsMap();

    Object.keys(carts).forEach(productId => {
        let currentProduct = products.get(productId);
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
                        Quantity: <input class="quantity-label js-quantity-label-${productId} cart-quantity-label-style" value="${carts[productId]}" readonly />
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${productId}">
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
            paymentInfo();
            removeCartItemElement(productId);
            updateCartQuantity();
        })
    });
}

function updateCartQuantity() {
    document.querySelector('.js-cart-item-quantity-link').innerText = (() => {
        return getCartCount() + ' items';
    })();
}

function removeCartItemElement(productId) {
    let orderSummary = document.querySelector('.js-cart-item-continer-' + productId);
    orderSummary.remove();
}

function addUpdateListener() {
    document.querySelectorAll('.js-update-quantity').forEach(update => {
        update.addEventListener('click', () => {
            let productId = update.dataset.productId;
            let quantityLabel = document.querySelector('.js-quantity-label-' + productId);
            /*
            switch edit status when the input element contains 'cart-quantity-label-style' class
            otherwise turn to display status
            change readOnly attribute when switch input and span status
            */
            if (quantityLabel.classList.contains('cart-quantity-label-style')) {
                quantityLabel.classList.replace('cart-quantity-label-style', 'cart-quantity-input-style');
                quantityLabel.readOnly = false;
                update.innerText = 'Save';
            } else {
                let newQuantity = Number(quantityLabel.value);
                if (newQuantity !== NaN && newQuantity > 0) {
                    quantityLabel.classList.replace('cart-quantity-input-style', 'cart-quantity-label-style');
                    quantityLabel.readOnly = true;
                    update.innerText = 'Update';
                    updateCartItem(productId, newQuantity);
                    paymentInfo();
                } else {
                    window.alert('WRONG NUMBER!');
                }
            }
        });
    });
}