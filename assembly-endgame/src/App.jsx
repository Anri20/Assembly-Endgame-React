import { useState } from "react"
import { languages } from "./languages"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react")
    const [guessLetter, setGuessLetter] = useState([])

    const languageElement = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className="chip"
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElement = currentWord.split("").map((letter, index) => {
        return (
            <span
                className="letter"
                key={index}
            >
                {guessLetter.includes(letter) ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyboardElement = alphabet.split("").map(char => {
        return (
            <button
                key={char}
                onClick={() => guess(char)}
            >
                {char.toUpperCase()}
            </button>
        )
    })

    function guess(char) {
        setGuessLetter(prev => (!prev.includes(char) ? [...prev, char] : prev))
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="language-chips">
                {languageElement}
            </section>
            <section className="word">
                {letterElement}
            </section>
            <section className="keyboard">
                {keyboardElement}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}