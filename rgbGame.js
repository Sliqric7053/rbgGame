var numSqrs = 6;
var colors = [];
var pickedColor;
var sqrs = document.getElementsByClassName("square");
var rgbDisplay = document.getElementById("rgbDisplay");
var winDisplay = document.getElementById("winDisplay");
var h1Color = document.getElementById("h1Color");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSqrs();	
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// if (numSqrs === "Easy") {
			// 	numSqrs = 3;
			// } else {
			// 	numSqrs = 6;
			// }
			//Good design pattern - commented code can be replaced with the below:
			this.textContent === "Easy" ? numSqrs = 3 : numSqrs = 6; //called the tenary operator
			reset();
		});	
	}
}

function setupSqrs() {
	for (var i = 0; i < sqrs.length; i++) {
		//clcik event for each color block
		sqrs[i].addEventListener("click", function() {
			//grab color of clicked square
			var clickedColor = this.style.background;
				//compare clicked color to pickedColor
			if (clickedColor === pickedColor) {
					//if clickedColor is same as pickedColor --> player wins +
					winDisplay.textContent = "You win!";
					matchColors(clickedColor);
					h1Color.style.background = pickedColor;
					resetButton.textContent = "Play Again"
			} else {
					//else player lose --> change clickedColor = bodyColor
					this.style.background = "#232323";
					//when player wins game --> "You win" + btn NEW COLORS changes text to PLAY AGAIN?
					winDisplay.textContent = "Try again!";
			}
		});
	}
}

function matchColors(color) {
	for (var i = 0; i < sqrs.length; i++) {
		sqrs[i].style.background = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
//make an array
	var arr = [];
//repeat num times
	for (var i = 0; i < num; i++) {
//get random color and push into array
		arr.push(buildRandomColor());
	}
//return that array
	return arr;
}

function buildRandomColor() {
	var getRandomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + 
						(Math.floor(Math.random() * 256)) + ', ' + 
						(Math.floor(Math.random() * 256)) + ')';
	return getRandomColor;
}

resetButton.addEventListener("click", function() {
	reset();
});

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSqrs);
	//pick new random number from array
	pickedColor = pickColor();
	//change rgbDisplay to match picked color
	rgbDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	winDisplay.textContent = "";
	//change colors of sqrs
	for (var i = 0; i < sqrs.length; i++) {
		if (colors[i]) {
			sqrs[i].style.display = "block"; //this ensures that all sqrs are visible before deciding which to show/not show
			sqrs[i].style.background = colors[i];
		} else {
			sqrs[i].style.display = "none";
		}
	}
	h1Color.style.background = "steelblue";
}




























