import {getAllCarts} from './cart.js';
import {getAllProductsMap} from '../data/products.js';
import {fixedAmount} from './util/money.js';

const paymentObj = {
    'productSize': 0,
    'productAmount' : 0,
    'shippingAmount' : 499,
    'noTaxAmount' : 0,
    'taxRate' : 0.1,
    'taxFee' : 0,
    'orderAmount' : 0
};

document.addEventListener('DOMContentLoaded', () => {
    paymentInfo();
});

export function paymentInfo() {
    calcPaymentAmount();
    updatePaymentInfo();
}

function calcPaymentAmount() {
    let carts = getAllCarts();
    let products = getAllProductsMap();
    let productAmount = 0;

    Object.keys(carts).forEach(productId => {
        let productQuantity = carts[productId];
        let product = products.get(productId);
        productAmount += (product.priceCents * productQuantity);
    });
    paymentObj.productAmount = productAmount;
    paymentObj.noTaxAmount = paymentObj.productAmount + paymentObj.shippingAmount;
    paymentObj.taxFee = paymentObj.noTaxAmount * paymentObj.taxRate;
    paymentObj.orderAmount = paymentObj.noTaxAmount + paymentObj.taxFee;
    paymentObj.productSize = Object.keys(carts).length;
}

function updatePaymentInfo() {
    document.querySelector('.js-product-quantity').innerText = paymentObj.productSize;
    document.querySelector('.js-product-amount').innerText = fixedAmount(paymentObj.productAmount, 2);
    document.querySelector('.js-shipping-amount').innerText = fixedAmount(paymentObj.shippingAmount, 2);
    document.querySelector('.js-before-tax-amount').innerText = fixedAmount(paymentObj.noTaxAmount, 2);
    document.querySelector('.js-tax-rate').innerText = paymentObj.taxRate * 100;
    document.querySelector('.js-tax-amount').innerText = fixedAmount(paymentObj.taxFee, 2);
    document.querySelector('.js-order-amount').innerText = fixedAmount(paymentObj.orderAmount, 2);
    document.querySelector('.js-product-amount').innerText = fixedAmount(paymentObj.productAmount, 2);

}