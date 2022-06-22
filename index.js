const words = [
  'altas',
  'bajas',
  'balas',
  'cajas',
  'cansa',
  'beber',
  'cabra',
  'cobra',
  'cocos',
  'apodo',
  'coche',
  'capas',
  'dagas',
  'dulce',
  'creas',
  'dices',
  'cubos',
  'cubre',
  'edita',
  'clava',
  'cerdo',
  'corta',
  'cubre',
  'ciega',
  'dedos',
  'cosas',
  'dotes',
  'gorra',
  'grito',
  'india'
]

window.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box')
  const newGame = document.querySelector('button')
  const boxesArray = []
  const auxArray = []
  let actualLetter = 0
  let actualWord = 0
  const MIN = 0
  const MAX = 4
  const letters = new RegExp('[a-z]')
  let correctWord = words[Math.floor(Math.random() * (words.length - 1) + 0)]
  const correctLettersArray = correctWord.split('')

  boxes.forEach((box, index) => {
    auxArray.push(box)

    if ((index + 1) % 5 === 0) {
      boxesArray.push([...auxArray])
      auxArray.length = 0
    }
  })

  const handleNewGame = () => {
    window.location.reload()
  }

  const handleKeydown = (event) => {
    const pressedLetter = event.key.toLowerCase()

    if (pressedLetter === 'backspace' && actualLetter > MIN) {
      actualLetter--
      boxesArray[actualWord][actualLetter].innerText = ''
      boxesArray[actualWord][actualLetter].classList.remove('pop')
      return
    }

    if (pressedLetter === 'enter') {
      if (actualLetter - 1 === MAX) {
        let tryWord = ''
        boxesArray[actualWord].forEach((box) => {
          tryWord += box.innerText
        })

        if (tryWord === correctWord) {
          boxesArray[actualWord].forEach((box, index) => {
            box.classList.add('correct')

            if (index === 4) {
              alert('GANASTE')
            }
          })
        } else {
          boxesArray[actualWord].forEach((box, index) => {
            box.classList.add('bounce')
            if (correctWord.includes(box.innerText)) {
              if (correctLettersArray[index] === box.innerText) {
                box.classList.add('correct')
              } else {
                box.classList.add('present')
              }
            } else {
              box.classList.add('absent')
            }
          })

          if (actualWord === 5) {
            alert(`PERDISTE! la palabra era: ${correctWord.toUpperCase()}`)
          } else {
            actualWord++
            actualLetter = 0
          }
        }
      }
      return
    }

    if (
      pressedLetter.length === 1 &&
      pressedLetter.match(letters) &&
      actualLetter <= MAX
    ) {
      boxesArray[actualWord][actualLetter].classList.add('pop')
      boxesArray[actualWord][actualLetter].innerText = pressedLetter
      actualLetter++
    }
  }

  window.addEventListener('keydown', handleKeydown)
  newGame.addEventListener('click', handleNewGame)
})
