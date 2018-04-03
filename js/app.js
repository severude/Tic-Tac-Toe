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

	// Turn off board and finish screens
	board.style.display = 'none';
	finish.style.display = 'none';
	let player = 1; // Player 1 starts with "O"
	let boxList = []; // Array for box objects

	// Give each box element a unique integer id
	for(let index = 0; index < boxes.children.length; index++) {
		boxes.children[index].id = index;
	}

	// Constructor for each box
	function Box(index) {
		this.index = index;
		this.mark = "";
	}

	// Reset everything to start the game
	function startGame() {
		// Show the game board with player 1 selected
		start.style.display = 'none';
		board.style.display = 'block';
		finish.style.display = 'none';
		player1.className = 'players active';
		player2.className = 'players';
		player = 1;

		// Clear all element classes from previous game
		for(let index = 0; index < boxes.children.length; index++) {
			boxes.children[index].className = 'box';
		}
		
		// Reset all boxes as unmarked
		boxList = [new Box(1), new Box(2), new Box(3),
				   new Box(4), new Box(5), new Box(6),
				   new Box(7), new Box(8), new Box(9)];
	}

	// Test to see if game has ended
	function gameIsOver() {
		let gameOver = 1;
		// If every box is marked, then the game is over
		for(let index = 0; index < boxList.length; index++) {
			if(boxList[index].mark === "") {
				gameOver = 0;
			}
		}
		return gameOver;
	}
	
	// Show final game results
	function showResults() {
		board.style.display = 'none';
		finish.style.display = 'block';
		if (player === 0) {
			finish.className = 'screen screen-win screen-win-tie';
			message.textContent = "It's a Tie!";
		} else if (player === 1) {
			finish.className = 'screen screen-win screen-win-one';
			message.textContent = "Winner";
		} else if (player === 2) {
			finish.className = 'screen screen-win screen-win-two';
			message.textContent = "Winner";
		}
	}
	
	// Buttons to start the game
	buttons[0].addEventListener('click', startGame);
	buttons[1].addEventListener('click', startGame);
	
	// Show X or O when hovering over an empty box
	boxes.addEventListener('mouseover', (event) => {
		// Only change if box is unmarked
		if(boxList[event.target.id].mark === "") {
			// Show which player can check the box
			if (player === 1) {
				event.target.style.backgroundImage = 'url(../img/o.svg)';
			} else if (player === 2) {
				event.target.style.backgroundImage = 'url(../img/x.svg)';
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
				player1.className = 'players';
				player2.className = 'players active';
				player = 2;
			} else if (player === 2) {
				boxList[event.target.id].mark = "X";
				event.target.className = 'box box-filled-2';
				player1.className = 'players active';
				player2.className = 'players';
				player = 1;
			}
			// If the game has ended, then show the results
			if(gameIsOver()) {
				showResults();
			};
		}
	});

// End Tic Tac Toe Module
}());
