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
    question: 'What is dad called in Japanese ?',
    answers: [
      { text: '	キューバ', correct: false },
      { text: '	お父さん', correct: true },
      { text: '	死んだ', correct: false },
      { text: '	悪い', correct: false }
    ]
  },
  {
    question: 'What is dead in Japanese ?',
    answers: [
      { text: '	死んだ', correct: true },
      { text: '	悪い ', correct: false },
      { text: '	お父さん', correct: false },
      { text: '	ほら穴', correct: false }
    ]
  },
  {
 
    question: 'What is age in Japanese ' ,
    answers: [
      { text: '	食べ物を与える', correct: false },
      { text: '	年齢', correct: true },
      { text: '	色あせる', correct: false },
      { text: '	計器', correct: false }
    ]
  },
  {
    question: 'What is 4.	Bag in Japanese ?',
    answers: [
      { text: '	食べ物を与える', correct: false},
      { text: '	願う', correct: false },
      { text: '	計器', correct: false },
      { text: '	袋', correct: true }
    ]
  },

  {
    question: 'Whatis face in Japanese ?',
    answers: [
      { text: '	年齢', correct: false },
      { text: '	願う', correct: false },
      { text: '	計器', correct: false },
      { text: '	顔', correct: true }
    ]
  }
]