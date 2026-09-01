import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle.jsx";
import Grid from "./grid.jsx";
import Keyboard from "./keyboard.jsx";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    console.log("key press detected");
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        length={solution.length}
      />
      <Keyboard usedKeys={usedKeys} />
    </div>
  );
}
