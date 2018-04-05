'use strict';

// Tic Tac Toe Module
(function ticTacToe() {

	// Element selectors
	const start = document.getElementById('start');
	const buttons = document.querySelectorAll('.button');
	const board = document.getElementById('board');
	const player1 = document.getElementById('player1');
	const player2 = document.getElementById('player2');
	const boxes = document.querySelector('.boxes');
	const finish = document.getElementById('finish');
	const message = document.querySelector('.message');
	const name = document.getElementById('name');
	const nameLabel = name.previousElementSibling;
	const showName = document.querySelector('.showName');
	const congrats = document.querySelector('.congratulations');

	// Turn off board and finish screens
	board.style.display = 'none';
	finish.style.display = 'none';
	let player = 1; // Player 1 starts game with "O"
	let boxList = []; // Array for box objects
	let playerName = "";

	// Set name field validation
	name.focus();
	name.required = true;
	name.pattern = "[A-Za-z ]+";

	// Give each box element a unique integer id
	for(let index = 0; index < boxes.children.length; index++) {
		boxes.children[index].id = index;
	}

	// Constructor for each box
	function Box(index) {
		this.index = index;
		this.mark = "";
	}

	// Board setting for player one's turn
	function setupPlayerOne() {
		player1.className = 'players active';
		player2.className = 'players';
		player = 1;
	}
	
	// Board setting for player two's turn
	function setupPlayerTwo() {
		player1.className = 'players';
		player2.className = 'players active';
		player = 2;
		computerMove();
	}
	
	// Reset everything to start the game
	function startGame() {
		// Show the game board with player 1 selected
		start.style.display = 'none';
		board.style.display = 'block';
		finish.style.display = 'none';
		setupPlayerOne();

		// Clear all element classes from previous game
		for(let index = 0; index < boxes.children.length; index++) {
			boxes.children[index].className = 'box';
		}
		
		// Reset all boxes as unmarked
		boxList = [new Box(1), new Box(2), new Box(3),
				   new Box(4), new Box(5), new Box(6),
				   new Box(7), new Box(8), new Box(9)];
		
		// Get and show name of player
		playerName = name.value;
		showName.textContent = playerName;
	}

	// Logic to determine how the computer will take it's turn
	function computerMove() {
		// Hierarchy order of center, edges and then the rest
		if(boxList[4].mark === "") {
			boxes.children[4].click();
		} else if(boxList[0].mark === "") {
			boxes.children[0].click();
		} else if(boxList[2].mark === "") {
			boxes.children[2].click();
		} else if(boxList[6].mark === "") {
			boxes.children[6].click();
		} else if(boxList[8].mark === "") {
			boxes.children[8].click();
		} else if(boxList[3].mark === "") {
			boxes.children[3].click();
		} else if(boxList[7].mark === "") {
			boxes.children[7].click();
		} else if(boxList[5].mark === "") {
			boxes.children[5].click();
		} else if(boxList[1].mark === "") {
			boxes.children[1].click();
		}
	}
	
	// The game is over if there are three boxes in a row or all squares are full
	function gameIsOver() {
		let gameWon = 0;
		let squaresCompleted = 1;
		
		// If any box is not marked, then the squares are not completed
		for(let index = 0; index < boxList.length; index++) {
			if(boxList[index].mark === "") {
				squaresCompleted = 0;
			}
		}

		// Test all 8 possible combinations if the game has been won
		if((boxList[0].mark === boxList[1].mark && boxList[1].mark === boxList[2].mark && boxList[0].mark !== '') ||
		  (boxList[3].mark === boxList[4].mark && boxList[4].mark === boxList[5].mark && boxList[3].mark !== '') ||
		  (boxList[6].mark === boxList[7].mark && boxList[7].mark === boxList[8].mark && boxList[6].mark !== '') ||
		  (boxList[0].mark === boxList[3].mark && boxList[3].mark === boxList[6].mark && boxList[0].mark !== '') ||
		  (boxList[1].mark === boxList[4].mark && boxList[4].mark === boxList[7].mark && boxList[1].mark !== '') ||
		  (boxList[2].mark === boxList[5].mark && boxList[5].mark === boxList[8].mark && boxList[2].mark !== '') ||
		  (boxList[0].mark === boxList[4].mark && boxList[4].mark === boxList[8].mark && boxList[0].mark !== '') ||
		  (boxList[2].mark === boxList[4].mark && boxList[4].mark === boxList[6].mark && boxList[2].mark !== '')) {
			gameWon = 1;
		}
		
		// If squares are completed and no one has won, then the game is a tie
		if(squaresCompleted && !gameWon) {
			player = 0;
		}
		
		// Return true if the game has been won or all the squares are full
		return gameWon || squaresCompleted;
	}
	
	// Show final game results
	function showResults() {
		board.style.display = 'none';
		finish.style.display = 'block';
		if (player === 0) {
			finish.className = 'screen screen-win screen-win-tie';
			message.textContent = "It's a Tie!";
			congrats.textContent = "Try again";
		} else if (player === 1) {
			finish.className = 'screen screen-win screen-win-one';
			message.textContent = "Winner";
			congrats.textContent = playerName + " wins";
		} else if (player === 2) {
			finish.className = 'screen screen-win screen-win-two';
			message.textContent = "Winner";
			congrats.textContent = "Computer wins";
		}
	}
	
	// Buttons to start the game
	buttons[0].addEventListener('click', (event) => {
		// Check if valid name was entered
		if(!name.validity.valid) {
			event.preventDefault();
			nameLabel.style.color = "#C21E1E"
		} else {
			startGame();
		}
	});
	buttons[1].addEventListener('click', startGame);
	
	// Show X or O when hovering over an empty box
	boxes.addEventListener('mouseover', (event) => {
		// Only change if box is unmarked
		if(boxList[event.target.id].mark === "") {
			// Show which player can check the box
			if (player === 1) {
				event.target.style.backgroundImage = 'url(img/o.svg)';
			} else if (player === 2) {
				event.target.style.backgroundImage = 'url(img/x.svg)';
			}
		}
	});


	// Remove X or O when leaving an empty box
	boxes.addEventListener('mouseout', (event) => {
		event.target.style.backgroundImage = "";
	});

	// Mark an empty box with an X or O when clicking on it
	boxes.addEventListener('click', (event) => {
		// Only allow adding a mark if the box is unmarked
		if(boxList[event.target.id].mark === "") {
			// Determine which player is marking a box
			if (player === 1) {
				boxList[event.target.id].mark = "O";
				event.target.className = 'box box-filled-1';
			} else if (player === 2) {
				boxList[event.target.id].mark = "X";
				event.target.className = 'box box-filled-2';
			}
			// If the game has ended, then show the results, otherwise keep playing
			if(gameIsOver()) {
				showResults();
			} else if (player === 1) {
				setupPlayerTwo();
			} else if (player === 2) {
				setupPlayerOne();
			}
		}
	});

// End Tic Tac Toe Module
}());
