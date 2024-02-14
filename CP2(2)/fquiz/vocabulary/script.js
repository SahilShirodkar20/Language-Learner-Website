const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [

  {
    question: 'What is hair called in French?',
    answers: [
      { text: 'I.	Le coude', correct: false },
      { text: 'II.	Le dos', correct: false },
      { text: 'Les cheveux', correct: true },
      { text: 'Le bec', correct: false }
    ]
  },
  {
    question: 'What is book in French ?',
    answers: [
      { text: 'Le livre', correct: true },
      { text: 'Le front ', correct: false },
      { text: 'Le dos', correct: false },
      { text: 'Le pied', correct: false }
    ]
  },
  {
 
    question: 'What is house in French ' ,
    answers: [
      { text: 'La main', correct: false },
      { text: 'La maison', correct: true },
      { text: 'La joue', correct: false },
      { text: 'La hanche', correct: false }
    ]
  },
  {
    question: 'What is pencil in French ?',
    answers: [
      { text: 'Le crayon', correct: true},
      { text: 'La croix', correct: false },
      { text: 'Le cou', correct: false },
      { text: 'Le cheval', correct: false }
    ]
  },

  {
    question: 'Whatis toy in French ?',
    answers: [
      { text: 'Le joujou', correct: true },
      { text: 'La jupe', correct: false },
      { text: 'Le nez', correct: false },
      { text: 'Le pain', correct: false }
    ]
  }
]