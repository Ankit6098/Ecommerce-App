import { useState, useEffect } from 'react';

const NumberCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(() => {
      // Increment the counter
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000); // Interval in milliseconds (1 second in this case)

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1>Number Counter: {counter}</h1>
    </div>
  );
};

export default NumberCounter;
