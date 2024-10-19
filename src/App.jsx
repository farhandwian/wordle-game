import React, { useState, useEffect } from "react";
import "./App.css";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const TARGET_WORD = "REACT"; // You can change this to any target word

const App = () => {
  // const [guesses, setGuesses] = useState([""]);
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuessesIndex, setCurrentGuessesIndex] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (gameOver || isWin) {
        return;
      }

      const currentGuess = guesses[currentGuessesIndex];

      if (e.key === "Enter" && currentGuess.length === WORD_LENGTH) {
        if (currentGuess === TARGET_WORD) {
          setCurrentGuessesIndex((prev) => prev + 1);
          setIsWin(true);
          setGameOver(true);
          return;
        }
        // Tambahkan logika untuk mengakhiri game jika sudah mencapai max attempts
        if (currentGuessesIndex + 1 >= MAX_ATTEMPTS) {
          setGameOver(true);
          setCurrentGuessesIndex((prev) => prev + 1);
          return;
        }

        // setGuesses((prev) => [...prev, ""]); ini klo si usesatenya bentukannya kaya gini const [guesses, setGuesses] = useState([""]);
        // karena butuh ditambah baris baru dulu. klo misalnya useState nya bentukannya kaya gini const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
        // ga perlu ditambahin lagi ini setGuesses((prev) => [...prev, ""]);

        setCurrentGuessesIndex((prev) => prev + 1);
      } else if (e.key === "Backspace" && currentGuess.length >= 0) {
        setGuesses((prev) => {
          const updatedGuesses = [...prev];
          updatedGuesses[currentGuessesIndex] = currentGuess.slice(0, -1);
          return updatedGuesses;
        });
      } else if (
        e.key.match(/^[a-zA-Z]$/) &&
        currentGuess.length < WORD_LENGTH
      ) {
        setGuesses((prev) => {
          const updatedGuesses = [...prev];
          updatedGuesses[currentGuessesIndex] =
            currentGuess + e.key.toUpperCase();
          return updatedGuesses;
        });
      }
    };

    window.addEventListener("keydown", handleClick);
    return () => window.removeEventListener("keydown", handleClick);
  }, [guesses, currentGuessesIndex, gameOver, isWin]);

  const getColor = (isSubmitted, char, idx) => {
    if (isSubmitted) {
      if (char === TARGET_WORD[idx]) {
        return "bg-green-300";
      }

      if (TARGET_WORD.includes(char)) {
        return "bg-yellow-300";
      }

      return "bg-gray-400";
    }
  };

  const board = () => {
    return Array.from({ length: MAX_ATTEMPTS }).map((_, guessesIndex) => {
      return (
        <div key={guessesIndex} className="flex">
          {Array.from({ length: WORD_LENGTH }).map((_, guessIndex) => {
            const guess = guesses[guessesIndex] || "";
            const isSubmitted = guessesIndex < currentGuessesIndex;

            const letter = guess[guessIndex];

            return (
              <div
                key={guessIndex}
                className={`h-10 w-10 border border-gray-700  ${getColor(
                  isSubmitted,
                  letter,
                  guessIndex
                )}`}
              >
                {letter || ""}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      {board()}
      {gameOver &&
        (isWin ? (
          <div className="">selamat anda menang</div>
        ) : (
          <div>Anda kalah, kata tujuan adalah {TARGET_WORD}</div>
        ))}
    </>
  );
};

export default App;
