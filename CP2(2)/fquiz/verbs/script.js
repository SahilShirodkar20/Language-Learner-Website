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
    question: 'Je ____ la leçon:',
    answers: [
      { text: 'fini', correct: false },
      { text: 'finis', correct: true },
      { text: 'finissent', correct: false },
      { text: 'finit', correct: false }
    ]
  },
  {
    question: 'Manuel ____ un livre ?',
    answers: [
      { text: 'choisis', correct: false },
      { text: 'choisit ', correct: true },
      { text: 'choisissons', correct: false },
      { text: 'choisissent', correct: false }
    ]
  },
  {
 
    question: 'Les fruits ____ ' ,
    answers: [
      { text: 'grossis', correct: false },
      { text: 'grossit', correct: false },
      { text: 'grossissons', correct: false },
      { text: 'grossissent', correct: true }
    ]
  },
  {
    question: 'Vous ____ la poeme ?',
    answers: [
      { text: 'lisez', correct: true},
      { text: 'lisons', correct: false },
      { text: 'lit', correct: false },
      { text: 'lis', correct: false }
    ]
  },

  {
    question: 'Ils ____le bus ?',
    answers: [
      { text: 'prends', correct: false },
      { text: 'prenons', correct: false },
      { text: 'prend', correct: false },
      { text: 'prennent', correct: true }
    ]
  }
]