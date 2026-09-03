export function scoreGuess(guess, solution) {
  const solutionLetters = [...solution.toUpperCase()];
  const result = [...guess.toUpperCase()].map((letter) => ({
    letter,
    state: "absent",
  }));
  result.forEach((r, i) => {
    if (solutionLetters[i] === r.letter) {
      r.state = "correct";
      solutionLetters[i] = null;
    }
  });

  result.forEach((r, i) => {
    if (r.state !== "correct" && solutionLetters.includes(r.letter)) {
      r.state = "present";
      solutionLetters[solutionLetters.indexOf(r.letter)] = null;
    }
  });
  return result;
}
