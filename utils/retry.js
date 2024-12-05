// retry.js
const retry = async (fn, retries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === retries) {
          throw err;
        }
        console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };
  



// Simulate a function that occasionally fails
const testFunction = async () => {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error('Random failure');
  }
  return 'Success!';
};

// Test the retry logic with the testFunction
const runTest = async () => {
  try {
    const result = await retry(testFunction, 5, 2000); // 5 retries, 2-second delay
    console.log('Final Result:', result);
  } catch (err) {
    console.error('All retries failed:', err.message);
  }
};

// runTest();



  module.exports = retry;
  