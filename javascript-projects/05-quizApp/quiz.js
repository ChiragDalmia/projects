const questions = [
    // list of 4 simple Funny multiple choice questions with answers and correct answer marked with true
    {
      question: "What is the capital of India?",
      answers: [
        { text: "Mumbai", correct: false },
        { text: "Delhi", correct: true },
        { text: "Chennai", correct: false },
        { text: "Kolkata", correct: false },
      ],
    },
    {
      question: "What is the capital of Australia?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Melbourne", correct: false },
        { text: "Canberra", correct: true },
        { text: "Perth", correct: false },
      ],
    },
    {
      question: "What is the capital of Canada?",
      answers: [
        { text: "Toronto", correct: false },
        { text: "Ottawa", correct: true },
        { text: "Vancouver", correct: false },
        { text: "Montreal", correct: false },
      ],
    },
    {
      question: "What is the capital of USA?",
      answers: [
        { text: "New York", correct: false },
        { text: "Washington DC", correct: true },
        { text: "Los Angeles", correct: false },
        { text: "Chicago", correct: false },
      ],
    },
    
]

// Path: 05-quiz-app/quiz.js

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  // Styling the score display
  questionElement.innerHTML = `<span class='score-display'>Your score: ${score}/${questions.length}</span>`;
  

  // Custom message based on score
  const feedback = document.createElement('p');
  feedback.innerHTML = score > questions.length / 2 ? 'Great Job!' : 'Keep Trying!';
  feedback.style.fontSize = '18px';
  questionElement.appendChild(feedback);

  // Style the restart button
  if (score > questions.length / 2) {
  nextButton.innerHTML = "Restart";
  } else {
    nextButton.innerHTML = "Try Again";
  }
  nextButton.classList.add('restart-btn');

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();