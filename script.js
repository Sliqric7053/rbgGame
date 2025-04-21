// JavaScript for the RGB game

let targetColor;
let score = 0;

function startGame() {
  targetColor = generateRandomHexColor();
  displayColor(targetColor);
  setupColorOptions();
  updateScore(0); // Initial score
}

function generateRandomHexColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function displayColor(hexColor) {
  const colorDisplay = document.getElementById("color-display");
  colorDisplay.style.backgroundColor = hexColor;
}

function setupColorOptions() {
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = ""; // Clear previous options

  const correctColor = targetColor;
  const options = [correctColor];

  while (options.length < 3) {
    const randomColor = generateRandomHexColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  shuffleArray(options);

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.style.backgroundColor = option;
    button.addEventListener("click", () => handleGuess(option));
    optionsContainer.appendChild(button);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function handleGuess(selectedColor) {
  if (selectedColor === targetColor) {
    updateScore(score + 1);
    alert("Correct!");
  } else {
    updateScore(0); // Reset score on incorrect guess
    alert(`Incorrect! The color was ${targetColor}`);
  }
  startGame(); // Start a new round
}

function updateScore(newScore) {
  score = newScore;
  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.textContent = `Score: ${score}`;
}

// Initial setup (call startGame when the page loads)
window.onload = startGame;
