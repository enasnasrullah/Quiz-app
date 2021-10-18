const question = document.getElementById("question");
const choices = [...document.getElementsByClassName("choice-text")];
const questionCountertext = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
console.log(choices);
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch(
  "https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestions) => {
      const formatedQuestion = {
        question: loadedQuestions.question,
      };
      const answerChoices = [...loadedQuestions.incorrect_answers];
      formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formatedQuestion.answer - 1,
        0,
        loadedQuestions.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formatedQuestion["choice" + (index + 1)] = choice;
      });
      return formatedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });
const correct_bounes = 10;
const max_questions = 30;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    localStorage.setItem("mosRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCountertext.innerText = questionCounter + "/" + max_questions;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.map((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    // console.log(number);
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

choices.map((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswers = selectedChoice.dataset["number"];
    let classToApplay = "incorrect";
    if (selectedAnswers == currentQuestion.answer) {
      classToApplay = "correct";
    }
    if (classToApplay == "correct") {
      incremenrScore(correct_bounes);
    }
    console.log(classToApplay);
    selectedChoice.parentElement.classList.add(classToApplay);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApplay);
      getNewQuestion();
    }, 1000);
  });
});
function incremenrScore(num) {
  score += num;
  scoreText.innerText = score;
}
