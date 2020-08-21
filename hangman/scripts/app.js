const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let word1

/* puzzleEl.textContent = word1.puzzle
guessesEl.textContent = word1.statusMessage */

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    word1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = word1.statusMessage
    
    word = word1.getPuzzle().split('')
    word.forEach((character) => {
        charEl = document.createElement('span')
        charEl.textContent = character
        puzzleEl.appendChild(charEl)
    });
    
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    word1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

/* getPuzzle('2').then((puzzle) => {
    console.log(puzzle)
}).catch((err) => {
    console.log(`Error: ${err}`)
}) */

/* getCurrentCountry().then((country) => {
    console.log(country.name)
}).catch((error) => {
    console.log(error)
}) */