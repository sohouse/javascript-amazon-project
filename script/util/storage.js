export function save(key, value) {
    initCarts();
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    initCarts();
    return JSON.parse(localStorage.getItem(key));
}

function initCarts() {
    let carts = localStorage.getItem('carts');
    if (carts === null) {
        save('carts', null);
    }
}