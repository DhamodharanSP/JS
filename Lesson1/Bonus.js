// Math.round(value)

console.log("Math.round(4.2) -> "+Math.round(4.2));
console.log("Math.round(4.9) -> "+Math.round(4.9)+"\n");


// Math.floor(value) -> It rounds to the nearest integer towards negative infinity
console.log("Math.floor(value)")

console.log("Math.floor(4.2) -> "+Math.floor(4.2));
console.log("Math.floor(4.9) -> "+Math.floor(4.9));

// for Negative values...
console.log("Math.floor(-4.3) -> " + Math.floor(-4.3));
console.log("Math.floor(-4.8) -> " + Math.floor(-4.8)+"\n");

//Math.trunc(value) -> It truncates any fractional digits, effectively rounding towards zero
console.log("Math.trunc(value)")
console.log("Math.trunc(4.9) -> "+Math.trunc(4.9));
console.log("Math.trunc(4.1) -> "+Math.trunc(4.1));
console.log("Math.trunc(-4.1) -> "+Math.trunc(-4.1));
console.log("Math.trunc(-4.9) -> "+Math.trunc(-4.9));

//Custom function to round off to specific decimal places

console.log("\nCustom Function:")
function roundDown(number, decimals) {
  decimals = decimals || 0;
  // Calculate the adjustment factor (e.g., 10 for 1 decimal, 100 for 2)
  var adjust = Math.pow(10, decimals); 
  // Multiply, floor, and then divide back to get the rounded number
  return Math.floor(number * adjust) / adjust; 
}

// Examples:
console.log("roundDown(999.999999) -> "+roundDown(999.999999));    // Output: 999
console.log("roundDown(999.999999, 3) -> "+roundDown(999.999999, 3));  // Output: 999.999
console.log("roundDown(1.12346, 4) -> "+roundDown(1.12346, 4));     // Output: 1.1234
console.log("roundDown(-5.555, 2) -> "+roundDown(-5.555, 2));      // Output: -5.56 (rounds towards negative infinity)

