const userName = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mosRecentScore");
const finalScore = document.getElementById("finalScore");
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highScores);
finalScore.innerText = mostRecentScore;
userName.addEventListener("keyup", () => {
  console.log(userName.value);
});

function saveHeighScore(event) {
  event.preventDefault();
  console.log("fire");
  const score = {
    score: mostRecentScore,
    name: userName.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(5);
  console.log(highScores);
  localStorage.setItem("highscores", JSON.stringify(highScores));
  window.location.assign("/");
}
