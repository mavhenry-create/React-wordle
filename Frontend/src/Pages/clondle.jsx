import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle.jsx";
import Grid from "../components/GameBoard/Grid/grid.jsx";
import Keyboard from "../components/GameBoard/KeyBoard/keyboard.jsx";
import GameModal from "../components/modal/Game/gamemodal.jsx";
import Card from "../components/modal/Error/card.jsx";

export default function Wordle() {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    wordLength,
    error,
  } = useWordle();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-11/12 mx-auto">
      {error && <Card message={error} />}
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        length={wordLength}
      />
      {showModal && <GameModal isCorrect={isCorrect} turn={turn} />}
      <Keyboard usedKeys={usedKeys} />
    </div>
  );
}
