import * as storage from './util/storage.js';

export function addToCart(productId, quantity) {
    let carts = storage.load('carts');
    carts[productId] = productId in carts ? carts[productId] + quantity : quantity;
    storage.save('carts', carts);
}

export function showAddedTip(element) {
    element.style.opacity = 1;
    setTimeout(() => {
        element.style.transition = 'opacity 0.2s';
        element.style.opacity = 0;
    }, 1000)
}

export function getCartCount() {
    return Object.keys(storage.load('carts')).length;
}

export function deleteCartItem(productId) {
    let storageCarts = storage.load('carts');
    delete storageCarts[productId];
    storage.save('carts', storageCarts);
}