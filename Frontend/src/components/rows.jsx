import React from "react";

export default function Rows({ guess, currentGuess, length }) {
  if (guess) {
    return (
      <div className="row flex justify-center items-center mt-1 text-2xl font-bold uppercase">
        {guess.map((letter, index) => (
          <div
            key={index}
            style={{ backgroundColor: letter.color }}
            className={
              " w-20 h-20 shrink-0 border border-gray-300 flex justify-center items-center mt-1 text-2xl font-bold uppercase"
            }
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current flex justify-center items-center mt-1 text-2xl font-bold uppercase">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="filled w-20 h-20 shrink-0 border border-gray-300 flex justify-center items-center mt-1 text-2xl font-bold uppercase"
          >
            {letter}
          </div>
        ))}
        {[...Array(length - letters.length)].map((_, index) => (
          <div
            key={index}
            className="w-20 h-20 border border-gray-300 flex justify-center items-center mt-1 text-2xl font-bold uppercase"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row flex justify-center items-center">
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className="w-20 h-20 shrink-0 border border-gray-300 flex justify-center items-center mt-1 text-2xl font-bold uppercase"
        ></div>
      ))}
    </div>
  );
}
