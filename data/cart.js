export let carts = Object.create(null);

export function addToCart(productId, quantity) {
    carts[productId] = productId in carts ? carts[productId] + quantity : quantity;
}

export function showAddedTip(element) {
    element.style.opacity = 1;
    setTimeout(() => {
        element.style.transition = 'opacity 0.2s';
        element.style.opacity = 0;
    }, 1000)
}

export function updateCartCount() {
    document.querySelector('.cart-quantity').innerText = (() => {
        return Object.keys(carts).length;
    })();
}