class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split(''),
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })

        return puzzle
    }
    makeGuess(guess) {
        if (this.remainingGuesses === 0)
        {
            return
        }

        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBad = !this.word.includes(guess)

        if (isUnique) {
            this.guessedLetters.push(guess)
        }
        if (isUnique && isBad) {
            this.remainingGuesses--
        }

        this.calcStatus()
    }
    calcStatus() {
        const completed = !this.getPuzzle().includes('*')
        if (completed && this.remainingGuesses > 0) {
            this.status = 'finished'
        } else if (this.remainingGuesses === 0){
            this.status = 'failed'
        }
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was ${this.word.join('')}`
        } else {
            return 'Great job! You guessed the word.'
        }
    }
}
