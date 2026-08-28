import { useState } from "react";

const useWordle =  (solution) => {
    const normalizeSolution = solution.toUpperCase();
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});


    const formatGuess = () => {
        let solutionArray = [...normalizeSolution];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: "grey" };
        })

        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = "green";
                solutionArray[i] = null;
            }
        })

        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== "green") {
                formattedGuess[i].color = "yellow";
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });
        return formattedGuess
        
    }


    const addNewGuess = (formattedGuess) => {
        if (currentGuess === normalizeSolution) {
            setIsCorrect(true);
        }
        
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })

        setHistory((prevHistory) =>  {
            return [...prevHistory, currentGuess];
        })

        setTurn((prevTurn) => prevTurn + 1);
        
        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys };
            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key];
                if (l.color === "green") {
                    newKeys[l.key] = "green";
                    return;
                }
                if (l.color === "yellow" && currentColor !== "green") {
                    newKeys[l.key] = "yellow";
                    return;
                }
                if (l.color === "grey" && !currentColor) {
                    newKeys[l.key] = "grey";
                    return;
                }
            });
            return newKeys;
        });

        setCurrentGuess("");
    }


    const handleKeyup = ({ key }) =>  {
        console.log(key);
        if ( key === "Enter") {
            if (turn > 5) {
                console.log("You used all your guesses!");
                return;
            }
            
            if (history.includes(currentGuess)) {
                console.log("You already tried that word!");
                return;
            }

            if (currentGuess.length !== 5) {
                console.log("Word must be 5 letters!");
                return;
            }

            const formatted = formatGuess();
            console.log(formatted);
            addNewGuess(formatted);
        }

        if (key === "Backspace") {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (/^[a-zA-Z]$/.test(key)) {
            const letter = key.toUpperCase();
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + letter;
                });
            }
        }

    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
}

export default useWordle;