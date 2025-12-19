
export function fixedAmount(amount, fixedNum) {
    return (Math.round(amount) / 100).toFixed(fixedNum);
}