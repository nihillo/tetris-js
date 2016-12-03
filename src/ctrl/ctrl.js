import {Tetris} from '../app/app.js';
import {View} from '../view/view.js';

export class Controller {
	constructor() {
		this.game = new Tetris();
		this.view = new View();

		this.timeBase = 100;    // Time unit, in miliseconds
		

		this.setControls();

		// this.start();
	}

	// CONTROLS
	setControls() {

		window.addEventListener('keydown', (event) => {
			if (!this.paused) {
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

					case 32:
						this.start();
						break;

					case 27: 
						this.pause();
						break;
				} 
			} else {
				switch(event.keyCode) {
					case 27: 
						this.resume();
						break;
				} 
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
			this.view.playEffect('game-over');
			this.game.stop();
			this.stopFall();
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
					if (!update.levelup) {
						this.view.playEffect('line');
					}
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
			this.view.playEffect('levelup');
			this.resetFall();
		}

		if (result && result.track) {
			this.view.setMusic(result.track);
		}

		if (result && result.next) {
			this.view.drawNext(result.next);
		}

		if (result && result.nextTetromino) {
			if (!result.levelup && !result.finish) {
				this.view.playEffect('hit');
				this.gameover = true;
			}
			result = this.operate('nextTetromino');
		}
	}


	start() {
		if (!this.gameover) {
			this.view.dismissModal();
			this.game.start();
			this.view.setMusic(this.game.trackList[0]);
			this.operate('nextTetromino');
			this.cycle = this.fall();
		}
	}

	pause() {
		this.paused = true;
		this.stopFall();
		this.view.musicPlayer.pause();
		this.view.drawMessage('Pause');
	}

	resume() {
		this.paused = false;
		this.resetFall();
		this.view.musicPlayer.play();
		this.view.undrawMessage();
	}
}