const highScoresList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highScores);
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class='list-group-item '> ${score.name}:  ${score.score}</li>`;
  })
  .join("");
