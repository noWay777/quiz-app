const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreEle = document.querySelector("p");
const saveButton = document.querySelector("button");
const input = document.querySelector("input");

scoreEle.innerText = score;

const saveHandler = () => {
    if (!input.value || !score) {
        alert("Invalid username or score!")
    } else {
        const finalScroe = { name: input.value, score: score };
        highScores.push(finalScroe);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(10);

        localStorage.setItem("highScores", JSON.stringify(highScores));
        localStorage.removeItem("scores");
        window.location.assign("/");
    }
};

saveButton.addEventListener("click", saveHandler)
