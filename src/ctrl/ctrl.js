import {Tetris} from '../app/app.js';
import {View} from '../view/view.js';

export class Controller {
	constructor() {
		this.game = new Tetris();
		this.view = new View();

		this.timeBase = 100;    // Time unit, in miliseconds
		

		this.setControls();
		
	

		// TEST ---------------------------
		this.game.start();
		this.fall();
	}

	// CONTROLS
	setControls() {

		window.addEventListener('keydown', (event) => {
			switch(event.key) {
				case 'ArrowRight':
					this.operate('move', 'right');
					break;
				case 'ArrowDown':
					this.operate('move', 'down');
					break;
				case 'ArrowLeft':
					this.operate('move', 'left');
					break;
			}

			switch(event.keyCode) {
				case 65:
				case 97:
					this.operate('rotate', 'counterclock');
					break;
				case 68:
				case 100:
					this.operate('rotate', 'clock');
					break;	
			} 
		});
	}

	// MOVEMENT METHODS
	fall() {
		window.setInterval(
			() => {
				this.operate('move', 'down');
			},
			this.game.speed * this.timeBase
		);
	}

	operate(operation, direction) {
		var result;

		switch (operation) {
			case 'move':
				result = this.game.move(direction);
				break;
			case 'rotate':
				result = this.game.rotate(direction);
				break;
			case 'nextTetromino':
				result = this.game.nextTetromino();
		}
		

		if (result && result.rowsUpdate) {
			window.setTimeout (
				() => {
					var update = this.game.rowsUpdate();
					update.delete.forEach((brick) => {
						this.view.delete(brick.position);
					});
					update.draw.forEach((brick) => {
						this.view.draw(brick.position, brick.type);
					});
				},
				200
			);
		}

		if (result && result.nextTetromino) {
			result = this.operate('nextTetromino');
		}

		if (result && result.delete) {
			result.delete.forEach((brick) => {
				this.view.delete(brick.position);
			});
		}

		if (result && result.draw) {
			result.draw.forEach((brick) => {
				this.view.draw(brick.position, brick.type);
			});
		}
		
		
		if (result && result.next) {
			this.view.drawNext(result.next);
		}
	}
}