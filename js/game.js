import formatData from "./helper.js";

const level =localStorage.getItem("level") || "medium";

const CORRECT_BONUS = 10;
const url = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");
const twoButtons = document.querySelector(".two-buttons");

const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
};

const start = () => {
    showQuestion();
    loader.style.display = 'none';
    container.style.display = 'block'
    twoButtons.style.display = 'block'
};

const showQuestion = () => {
    questionNumber.innerText = questionIndex + 1;
    const { question, answers, correctAnswerIndex } = formattedData[questionIndex];
    correctAnswer = correctAnswerIndex;
    questionText.innerText = question;
    answerList.forEach((button, index) => {
        button.innerText = answers[index];
    });
};

const checkAnswer = (event, index) => {
    if (!isAccepted) {
        return
    }
    isAccepted = false;
    const isCorrect = index === correctAnswer ? true : false;
    if (isCorrect) {
        event.target.classList.add('correct');
        score += CORRECT_BONUS;
        scoreText.innerText = score;
    } else {
        event.target.classList.add('incorrect');
        answerList[correctAnswer].classList.add('correct');
    }
};

const nextHandler = () => {
    if (questionIndex < formattedData.length - 1) {
        isAccepted = true;
        questionIndex++;
        removeClasses();
        showQuestion();
    } else {
        finishHandler();
    }
    if(questionIndex === formattedData.length -1){
        nextButton.style.display = "none";
    }

};

const removeClasses = () => {
    answerList.forEach(button => {
        button.className = "answer-text btn btn-outline-secondary my-2"
    });
};

const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);

nextButton.addEventListener("click", nextHandler);

finishButton.addEventListener("click", finishHandler);

answerList.forEach((button, index) => {
    button.addEventListener("click", (event) => checkAnswer(event, index));
});

