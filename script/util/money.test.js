import { fixedAmount } from './money.js';

// Simple test framework
function assertEquals(actual, expected, testName) {
  if (actual === expected) {
    console.log(`PASS: ${testName}`);
  } else {
    console.log(`FAIL: ${testName}`);
    console.log(`Expected: ${expected}, but got: ${actual}`);
  }
}

function runTests() {
  console.log('Running tests for money.js...\n');

  // Test case 1: Basic functionality with 2 decimal places
  const result1 = fixedAmount(1500, 2);
  assertEquals(result1, '15.00', 'fixedAmount(1500, 2) should return "15.00"');

  // Test case 2: With 1 decimal place
  const result2 = fixedAmount(1234, 1);
  assertEquals(result2, '12.3', 'fixedAmount(1234, 1) should return "12.3"');

  // Test case 3: With 0 decimal places
  const result3 = fixedAmount(5000, 0);
  assertEquals(result3, '50', 'fixedAmount(5000, 0) should return "50"');

  // Test case 4: Amount less than a dollar
  const result4 = fixedAmount(50, 2);
  assertEquals(result4, '0.50', 'fixedAmount(50, 2) should return "0.50"');

  // Test case 5: Amount with rounding
  const result5 = fixedAmount(999, 2);
  assertEquals(result5, '10.00', 'fixedAmount(999, 2) should return "10.00"');

  console.log('\nTests completed.');
}

// Run the tests
runTests();