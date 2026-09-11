import Rows from "../Rows/rows.jsx";

function Grid({ currentGuess, guesses, turn, length }) {
  return (
    <div className="grid grid-cols-1 grid-rows-6 w-screen h-4/5 justify-center items-center gap-0.5 mb-4 mt-5">
      {guesses.map((guess, i) => {
        if (turn === i) {
          return (
            <Rows
              key={i}
              guess={guess}
              currentGuess={currentGuess}
              length={length}
            />
          );
        }
        return <Rows key={i} guess={guess} currentGuess="" length={length} />;
      })}
    </div>
  );
}

export default Grid;
