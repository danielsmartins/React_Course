import trollFace from '../images/troll-face.png';

export default function App() {
    return (
      <header className="header">
        <img 
                src={trollFace} 
            />
            <h1>Meme Generator</h1>
        </header>
    );
}