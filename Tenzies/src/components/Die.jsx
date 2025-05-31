export default function Die(props) {
    return (
    <button style={{backgroundColor: props.isHeld ? "#59E391" : "white" }} 
    onClick={props.holdDice} 
    aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`} 
    aria-pressed={props.isHeld}>
        {props.value}</button>
    )
}