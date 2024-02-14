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
    question: 'yo tomo',
    answers: [
      { text: 'I talk', correct: false },
      { text: 'You drink', correct: false },
      { text: 'I drink', correct: true },
      { text: 'You talk', correct: false }
    ]
  },
  {
    question: 'nosotros tomamos ?',
    answers: [
      { text: 'We drink', correct: true },
      { text: 'You drink ', correct: false },
      { text: 'I walk', correct: false },
      { text: 'We dance', correct: false }
    ]
  },
  {
 
    question: 'usted cree ' ,
    answers: [
      { text: 'I believe', correct: false },
      { text: 'You believe', correct: true },
      { text: 'I drink', correct: false },
      { text: 'We drink', correct: false }
    ]
  },
  {
    question: 'usted vive',
    answers: [
      { text: 'we live', correct: false},
      { text: 'we sing', correct: false },
      { text: 'i live', correct: false },
      { text: 'you live', correct: true}
    ]
  },

  {
    question: 'comer',
    answers: [
      { text: 'to drink', correct: false },
      { text: 'to play', correct: false },
      { text: 'to think', correct: false },
      { text: 'to eat', correct: true }
    ]
  }
]