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
    question: 'Which one of these is “the word woman?',
    answers: [
      { text: 'el', correct: false },
      { text: 'la', correct: false },
      { text: 'yo', correct: false },
      { text: 'mujer', correct: true }
    ]
  },
  {
    question: 'What is La niña in english?',
    answers: [
      { text: 'Car', correct: false },
      { text: 'Boy ', correct: false },
      { text: 'Woman', correct: false },
      { text: 'Girl', correct: true }
    ]
  },
  {
 
    question: 'What is Lo siento in english ' ,
    answers: [
      { text: 'hello', correct: true },
      { text: 'goodbye', correct: false },
      { text: 'sorry', correct: false },
      { text: 'goodevening', correct: false }
    ]
  },
  {
    question: 'How would you say hello in Spanish ?',
    answers: [
      { text: 'Halo', correct: false},
      { text: 'Hemlo', correct: false },
      { text: 'Hollo', correct: false },
      { text: 'Hola', correct: true }
    ]
  },

  {
    question: 'What does Una niña stand for ?',
    answers: [
      { text: 'a girl', correct: true },
      { text: 'a boy', correct: false },
      { text: 'a toy', correct: false },
      { text: 'the girl', correct: false }
    ]
  }
]