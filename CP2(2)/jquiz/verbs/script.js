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
    question: 'What is "to return" in Japanese?',
    answers: [
      { text: '	きます', correct: false },
      { text: '	かえります', correct: true },
      { text: '	かえりません', correct: false },
      { text: '	かえりました', correct: false }
    ]
  },
  {
    question: 'What is "うたいます" in English?',
    answers: [
      { text: '	To sing', correct: true },
      { text: '	To dance', correct: false },
      { text: '	To read', correct: false },
      { text: '	To study', correct: false }
    ]
  },
  {
 
    question: 'WWhat is the word "verb" in Japanese?' ,
    answers: [
      { text: '	きいろ', correct: false },
      { text: '	どうし', correct: true },
      { text: '	かぞく', correct: false },
      { text: '	かもく', correct: false }
    ]
  },
  {
    question: ' What is おいかわさんはバレーボールをする in English?',
    answers: [
      { text: '	Kuroko plays basketball.', correct: false},
      { text: '	Maki plays tennis.', correct: false },
      { text: '	Oharano plays rugby.', correct: false },
      { text: '	Oikawa plays volleyball.', correct: true }
    ]
  },

  {
    question: 'What is "よみます" in English?',
    answers: [
      { text: '	To play', correct: false },
      { text: '	To see', correct: false },
      { text: '	To write', correct: false },
      { text: '	To read', correct: true }
    ]
  }
]