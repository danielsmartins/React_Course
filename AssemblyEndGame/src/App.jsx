import { useState } from "react"
import clsx from "clsx"
import { languages } from "./data/languages"
import { getFarewellText, getRandomWord } from './utils.js'
import Confetti from 'react-confetti'
import { useEffect } from "react" 

export default function App() {

  //state
  const [currentWord, setCurrentWord] = useState(() => getRandomWord()) //lazy initialization to avoid running getRandomWord on every render
  const [guessedLetters, setGuessedLetters] = useState([])
  
  //derived
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= (languages.length - 1) 
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
   const numGuessesLeft = languages.length - 1

useEffect(() => {
  function handleKeyDown(event) {
    const key = event.key.toLowerCase()

    if (key === "enter" && isGameOver) {
    startNewGame()
    return
}
    if (isGameOver) return 

    if (/^[a-z]$/.test(key)) {
      addGuessedLetter(key)
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown) 
  }
}, [guessedLetters, isGameOver])

  //static
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prev => prev.includes(letter) ? prev : [...prev, letter])
  }
  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus(){
    if (!isGameOver && isLastGuessIncorrect) {
      return <p className="farewell-message">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
    }
     if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }


  return (
   <main>
    {isGameWon && <Confetti 
    recycle={false}
    numberOfPieces={1000}
    />}

    <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
    </header>

    <section aria-live="polite" role="status" className={gameStatusClass}>
      {renderGameStatus()}
    </section>

    <section className="language-chips">
      {languages.map((lang, index) => {
        const isLost = index < wrongGuessCount
        
        return (
        <span key={lang.name} className={clsx("chip", { lost: isLost })} style={{backgroundColor: lang.backgroundColor, color: lang.color}}>{lang.name}
      </span> )})}

    </section>

    <section className="word">
      
      {currentWord.split("").map((char, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(char)
       const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(char) && "missed-letter"
        )
        return (
        <span className={letterClassName} key={index}>{shouldRevealLetter ? char.toUpperCase() : ""}</span>)})}
    </section>

          {/**Screen readers only */}
     <section
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter =>
                    guessedLetters.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}</p>

            </section>

    <section className="keyboard">
      {alphabet.split("").map(char => {
        const isGuessed = guessedLetters.includes(char)
        const isCorrect = isGuessed && currentWord.includes(char)
        const isWrong = isGuessed && !currentWord.includes(char)
        const className = clsx({
          correct: isCorrect,
          wrong: isWrong
        })

        return (
        <button 
        className={className}
        key={char}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(char)}
        aria-label={`Letter ${char}`} 
        onClick={() => addGuessedLetter(char)}>{char.toUpperCase()}</button>
      )}
      )
      }
    
    </section>

      {isGameOver && <button
            onClick={startNewGame}
           className="new-game">New Game
           </button>}

   </main>
  )
}