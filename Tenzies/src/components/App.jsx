import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import {nanoid} from 'nanoid'
import Die from './Die'

export default function App() {

    const [dice, setDice] = useState(() => generateAllnewDice()) // faz com que a função não seja chamada a cada renderização, perfomance.
    const [rollCount, setRollCount] = useState(0)
    const gameWon = (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))
    const newGameBtn = useRef(null)

    useEffect(() => {
    if (gameWon) {
        newGameBtn.current?.focus();
    }
}, [gameWon]);

    function hold (id) {
        setDice(prev => prev.map(item =>{
            return item.id === id ? {...item, isHeld: !item.isHeld} : item
        }))
    }

    function generateAllnewDice() {
    const newDiceArr = []
    for(let i = 0; i < 10; i++){
     newDiceArr.push(
        {value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false,
        id:nanoid()})   
    }
    return newDiceArr
}

function rollDice () {
    if (!gameWon) {
    setDice(prev => prev.map(die => die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1}))
    setRollCount(prev => prev + 1)
    } else {
        setDice(generateAllnewDice())
        setRollCount(0)
    }
}
    return (
    <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className='sr-only'> {/** acessibilidade para leitores de tela */}
            {gameWon && <p>Congratulations! You won! Press "New Game" to start again. </p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <p className="roll-counter">🎲 Rolls: {rollCount}</p>
        <div className="dice-container">
        {dice.map(element => <Die key={element.id} value={element.value} isHeld={element.isHeld} holdDice={() => hold(element.id)}/>)}
        </div>
        <button className="roll-dice" ref={newGameBtn}onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>

    </main>
 )
}