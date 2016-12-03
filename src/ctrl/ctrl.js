import {Tetris} from '../app/app.js';
import {View} from '../view/view.js';

export class Controller {
	constructor() {
		this.game = new Tetris();
		this.view = new View();

		this.timeBase = 100;    // Time unit, in miliseconds
		

		this.setControls();
		
	

		// INIT GAME ---------------------------
		this.game.start();
		this.operate('nextTetromino');
		this.cycle = this.fall();
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
		return window.setInterval(
			() => {
				this.operate('move', 'down');
			},
			this.game.speed * this.timeBase
		);
	}

	stopFall() {
		clearInterval(this.cycle);
	}

	resetFall() {
		this.stopFall();
		this.cycle = this.fall();
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

		if (result && result.finish) {
			this.view.drawMessage('Game over');
			this.view.stopMusic();
			this.game.stop();
			this.stopFall();
		}

		if (result && result.rowsUpdate) {
			window.setTimeout (
				() => {
					var update = this.game.rowsUpdate();
					update.delete.forEach((brick) => {
						// console.log('on ctrl: ' + brick.position[0] + brick.position[1]);
						this.view.delete(brick.position);
					});
					update.draw.forEach((brick) => {
						this.view.draw(brick.position, brick.type);
					});
				},
				200
			);
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
		
		if (result && result.score) {
			this.view.drawScore(result.score);
		}

		if (result && result.levelup) {
			this.view.drawLevel(result.level);
			this.view.drawMessage('Level up');
			this.resetFall();
		}

		if (result && result.track) {
			this.view.setMusic(result.track);
		}

		if (result && result.next) {
			this.view.drawNext(result.next);
		}

		if (result && result.nextTetromino) {
			result = this.operate('nextTetromino');
		}
	}
}