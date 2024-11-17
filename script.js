const startGameBotao = document.querySelector("#startGame")
const itensGame = document.querySelectorAll(".start-quiz")
const container = document.querySelector(".container")
const questionsContainer = document.querySelector(".questions-container")
const answersContainer = document.querySelector(".answers-container")
const question = document.querySelector(".question")
const nextQuestion = document.querySelector(".next-question")
const divNextQuestion = document.querySelector(".controls-container")


startGameBotao.addEventListener("click", startGame)
nextQuestion.addEventListener("click", displayNextQuestion)

let currentQuestionIndex =0
let totalCorrect = 0

function startGame(){
    startGameBotao.classList.add("hide")
    itensGame.forEach(item => {
        item.classList.add("hide");
    });    
    questionsContainer.classList.remove("hide")
    container.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion(){
   resetState()


   if (currentQuestionIndex >= questions.length) {
    finishGame();
    return;
  }
    question.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer =>{
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct){
            newAnswer.dataset.correct = answer.correct
        }
        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState(){
  while(answersContainer.firstChild){
    answersContainer.removeChild(answersContainer.firstChild)
}
nextQuestion.classList.add("hide")
}


function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct === "true") {
      answerClicked.innerHTML += ' <span>&#9989;</span>' 
      totalCorrect++
  } else {
      answerClicked.innerHTML += ' <span>&#10060;</span>'
  }

  document.querySelectorAll(".answer").forEach(button => {
      if (button.dataset.correct === "true") {
          button.innerHTML += ' <span>&#9989;</span>'
      } else {
          button.innerHTML += ' <span>&#10060;</span>'
      }
      button.disabled = true
  });
  currentQuestionIndex++
  divNextQuestion.classList.remove("hide")
  nextQuestion.classList.remove("hide")
 
}


function finishGame(){
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect*100/totalQuestions)

  let message = ""

  if (performance >= 90) {
    message = "Excelente :)";
  } else if (performance >= 70) {
    message = "Muito bom :)";
  } else if (performance >= 50) {
    message = "Pode melhorar";
  } else {
    message = "Necessário estudar mais!";
  }
  

  questionsContainer.innerHTML = 
  `
  <p class:"final-message"> 
  Você acertou ${totalCorrect} de ${totalQuestions} questões!
  <span> Resultado: ${message} </span>
  </p>
  <button onclick = "window.location.reload()" >Refazer teste</button>
  `
}





const questions = [
    {
      question: "Dentro de qual elemento HTML colocamos o JavaScript?",
      answers: [
        { text: "<javascript>", correct: false },
        { text: "<js>", correct: false },
        { text: "<script>", correct: true },
        { text: "<scripting>", correct: false }
      ]
    },
    {
      question: "Onde é o lugar correto para inserir JavaScript?",
      answers: [
        { text: "Tanto no <head> quanto no <body> está correto", correct: true },
        { text: "No <body>", correct: false },
        { text: "No <head>", correct: false },
        { text: "Em outro lugar", correct: false }
      ]
    },
    {
      question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
      answers: [
        { text: '<script src="xxx.js">', correct: true },
        { text: '<script href="xxx.js">', correct: false },
        { text: '<script name="xxx.js">', correct: false },
        { text: "Nenhuma das alternativas", correct: false }
      ]
    },
    {
      question: 'O arquivo JavaScript externo deve conter a tag <script>',
      answers: [
        { text: "Verdadeiro", correct: false },
        { text: "Falso", correct: true }
      ]
    },
    {
      question: 'Como escrever "Hello World" numa caixa de alerta?',
      answers: [
        { text: 'msg("Hello World");', correct: false },
        { text: 'alert("Hello World");', correct: true },
        { text: 'msgBox("Hello World");', correct: false },
        { text: 'alertBox("Hello World");', correct: false }
      ]
    },
    {
      question: 'Como podemos criar uma função no JavaScript?',
      answers: [
        { text: 'function:myFunction()', correct: false },
        { text: 'function myFunction()', correct: true },
        { text: 'function = myFunction()', correct: false },
        { text: 'Nenhum desses códigos criaria uma função', correct: false }
      ]
    },
    {
      question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
      answers: [
        { text: 'call minhaFuncao()', correct: false },
        { text: 'call function minhaFuncao()', correct: false },
        { text: 'Nenhum desses códigos chamaria essa função', correct: false },
        { text: 'minhaFuncao()', correct: true },
      ]
    },
  ]