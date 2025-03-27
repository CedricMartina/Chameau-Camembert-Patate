// Variables globales
const choices = document.querySelectorAll(".choice");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerDisplay = document.getElementById("winner");
const userScoreDisplay = document.getElementById("user-score");
const computerScoreDisplay = document.getElementById("computer-score");
const finalResult = document.querySelector(".final-result");
const finalWinnerDisplay = document.getElementById("final-winner");
const restartButton = document.getElementById("restart-game");

// Ajout d'un overlay pour le pop-up
const overlay = document.createElement("div");
overlay.classList.add("popup-overlay");
document.body.appendChild(overlay);

let userScore = 0;
let computerScore = 0;
let gameOver = false;

// Fonction pour attacher les événements aux boutons
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (gameOver) return;

    const userChoice = choice.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    // Mise à jour des affichages
    userChoiceDisplay.textContent = `Votre choix : ${userChoice}`;
    computerChoiceDisplay.textContent = `Choix de Mosta AI : ${computerChoice}`;
    winnerDisplay.textContent = `Résultat : ${winner}`;

    // Mise à jour des scores
    updateScores(winner);
    checkFinalWinner();
  });
});

// Fonction pour obtenir un choix aléatoire pour Mosta AI
function getComputerChoice() {
  const options = ["chameau", "camembert", "patate"];
  return options[Math.floor(Math.random() * options.length)];
}

// Fonction pour déterminer le gagnant
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "Égalité !";
  }
  if (
    (userChoice === "chameau" && computerChoice === "patate") ||
    (userChoice === "camembert" && computerChoice === "chameau") ||
    (userChoice === "patate" && computerChoice === "camembert")
  ) {
    return "Vous avez gagné ! 🎉";
  }
  return "Mosta AI a gagné ! 😢";
}

// Fonction pour mettre à jour les scores
function updateScores(winner) {
  if (winner.includes("Vous")) {
    userScore++;
    userScoreDisplay.textContent = userScore;
  } else if (winner.includes("Mosta AI")) {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
  }
}

// Fonction pour vérifier le gagnant final
function checkFinalWinner() {
  if (userScore === 5 || computerScore === 5) {
    gameOver = true;

    // Afficher le pop-up et l'overlay
    finalResult.style.display = "block";
    overlay.style.display = "block";

    if (userScore === 5) {
      finalResult.classList.add("winner");
      finalResult.classList.remove("loser");
      finalWinnerDisplay.innerHTML = `
        <h2>🎉 Félicitations ! 🎉</h2>
        <p>Vous êtes le grand gagnant !</p>
        <p>Rejouez pour tenter de battre Mosta AI à nouveau.</p>`;
    } else {
      finalResult.classList.add("loser");
      finalResult.classList.remove("winner");
      finalWinnerDisplay.innerHTML = `
        <h2>😢 Dommage ! 😢</h2>
        <p>Mosta AI a remporté la partie.</p>
        <p>Rejouez pour tenter votre chance !</p>`;
    }
  }
}

// Fonction pour redémarrer le jeu
restartButton.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  gameOver = false;
  userScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;

  // Cacher le pop-up et l'overlay
  finalResult.style.display = "none";
  overlay.style.display = "none";
  finalResult.classList.remove("winner", "loser");
  winnerDisplay.textContent = "";
  userChoiceDisplay.textContent = "Votre choix : ";
  computerChoiceDisplay.textContent = "Choix de Mosta AI : ";
});