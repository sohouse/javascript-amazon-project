
export function fixedAmount(amount, fixedNum) {
    return (Math.round(amount) / 100).toFixed(fixedNum);
}

let arr = [1,2,3];
arr.shift()
console.log(arr)