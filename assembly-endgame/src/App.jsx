import { useState } from "react"
import { languages } from "./languages"
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./utils"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetter, setGuessedLetter] = useState([])

    const wrongGuessCount = guessedLetter
        .filter(letter => !currentWord.split("").includes(letter)).length

    const isGameWon = currentWord
        .split("").every(letter => guessedLetter.includes(letter))
    const isGameLost = wrongGuessCount >= (languages.length - 1)
    const isGameOver = isGameWon || isGameLost

    const lastGuess = guessedLetter[guessedLetter.length - 1]
    const isLastGuessIncorrect = lastGuess && !currentWord.includes(lastGuess)

    const languageElement = languages.map((lang, index) => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }

        const className = clsx("chip", index < wrongGuessCount ? "lost" : "")

        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElement = currentWord.split("").map((letter, index) => {
        const className = clsx("letter", {
            missedLetter: !guessedLetter.includes(letter),
        })
        
        return (
            <span
                className={className}
                key={index}
            >
                {guessedLetter.includes(letter) ? letter.toUpperCase() : isGameOver && letter.toUpperCase()}
            </span>
        )
    })

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyboardElement = alphabet.split("").map(char => {
        const isRight = guessedLetter.includes(char) && currentWord.split("").includes(char)
        const isWrong = guessedLetter.includes(char) && !currentWord.split("").includes(char)

        const className = clsx({
            isRight: isRight,
            isWrong: isWrong,
        })

        return (
            <button
                key={char}
                onClick={() => guess(char)}
                className={className}
                disabled={isGameOver}
            >
                {char.toUpperCase()}
            </button>
        )
    })

    function guess(char) {
        setGuessedLetter(prev => (!prev.includes(char) ? [...prev, char] : prev))
    }

    function gameStatus() {
        if (!isGameOver) {
            if (isLastGuessIncorrect) {
                const farewellText = getFarewellText(languages[wrongGuessCount - 1].name)

                return (
                    <h2>
                        {farewellText}
                    </h2>
                )
            }

            return null
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
    }

    function newGame() {
        setCurrentWord(() => getRandomWord())
        setGuessedLetter([])
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section
                className={clsx("game-status", {
                    isWon: isGameWon,
                    isLost: isGameLost,
                    farewell: !isGameOver && isLastGuessIncorrect
                })}
            >
                {gameStatus()}
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
            {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}
        </main>
    )
}