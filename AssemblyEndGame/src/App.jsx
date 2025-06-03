import { useState } from "react"
import clsx from "clsx"
import { languages } from "./data/languages"

export default function App() {
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prev => prev.includes(letter) ? prev : [...prev, letter])
  }
  
  return (
   <main>

    <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
    </header>

    <section className="game-status">
    <h2>You win!</h2>
    <p>Well done! 🎉</p>
    </section>

    <section className="language-chips">
      {languages.map((lang, index) => {
        const isLost = index < wrongGuessCount
        return (
        <span key={lang.name} className={clsx("chip", { lost: isLost })} style={{backgroundColor: lang.backgroundColor, color: lang.color}}>{lang.name}
      </span> )})}

    </section>
    <section className="word">
      {currentWord.split("").map((char, index) => <span key={index}>{guessedLetters.includes(char) ? char.toUpperCase() : ""}</span>)}
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
        onClick={() => addGuessedLetter(char)}>{char.toUpperCase()}</button>
      )}
      )
      }
    
    </section>

      <button
           className="new-game">New Game
           </button>

   </main>
  )
}