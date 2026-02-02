function print(val) {
    console.log(val);
}


const items = (2095 + 799 + 1899) / 100;

print(items);

const total = ((2095 + 799 + 1899) + 499) / 100;

print(total);

const tax = Math.round((((2095 + 799 + 1899) + 499)) * 0.1) / 100;

print(tax);

console.log("Total amount: ");

print(total + tax);