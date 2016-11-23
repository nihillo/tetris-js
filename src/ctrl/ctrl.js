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
		this.view.drawTetromino(this.game.current);
		this.fall();
	}

	// CONTROLS
	setControls() {
		window.addEventListener('keypress', (event) => {
			switch(event.keyCode) {
				case 65:
				case 97:
					this.rotate('left');
					break;
				case 68:
				case 100:
					this.rotate('right');
					break;	
			} 
		});

		window.addEventListener('keydown', (event) => {
			switch(event.key) {
				case 'ArrowRight':
					this.move('right');
					break;
				case 'ArrowDown':
					this.move('down');
					break;
				case 'ArrowLeft':
					this.move('left');
					break;
			}
		});
	}

	// MOVEMENT METHODS
	fall() {
		window.setInterval(
			() => {
				this.game.current.fall();
				this.game.loop();
				this.view.drawTetromino(this.game.current, this.game.isNext);

			},
			this.game.speed * this.timeBase
		);
	}

	move(direction) {

		
		this.game.current.move(direction);
		this.game.loop();
		this.view.drawTetromino(this.game.current, this.game.isNext);

	}

	rotate(direction) {
		this.game.loop();
		this.game.current.rotate(direction);
		this.view.drawTetromino(this.game.current, this.game.isNext);

	}
}