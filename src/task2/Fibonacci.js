import React, { useState } from "react";

function Fs() {
  const [userInput, setUserInput] = useState(0);

  const inputHandler = (e) => {
    setUserInput(e.target.value);
    // console.log(e.target.value, "value");
  };

  const getFibonacci = () => {
    let n1 = 0,
      n2 = 1,
      nextTerm;

    console.log("Fibonacci Series:");
    console.log(n1); // print 0
    console.log(n2); // print 1

    nextTerm = n1 + n2;

    while (nextTerm <= userInput) {
      // print the next term
      console.log(nextTerm);

      n1 = n2;
      n2 = nextTerm;
      nextTerm = n1 + n2;
    }
  };

  // Fibonacci Series will bw printed in browser console

  return (
    <div>
      <h2>Fibonacci Series upto the given number</h2>
      <input type="number" onChange={inputHandler}></input>
      <button type="button" className="btn btn-primary" onClick={getFibonacci}>
        Get Fibonacci
      </button>
    </div>
  );
}

export default Fs;
