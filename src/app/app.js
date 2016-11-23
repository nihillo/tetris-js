import {randInt} from '../lib/lib.js';

export class Tetris {
	constructor() {
		this.board = new Board();
		this.running = false;

		// Speed expressed as number of time units that movement takes to be done
		var speedTable = [10, 9, 8, 7, 6, 5];

		this.level = 0;
		this.speed = speedTable[this.level];

		this.current = null;
		this.next = this.generateNextType();

		this.noRemove = false;


	}


	// MAIN LOOP
	start() {
		this.running = true;
		this.current = this.generateTetromino(this.next);
		this.next = this.generateNextType();
		this.loop();
	}

	stop() {
		this.running = false;
	}

	loop() {
		var isNext;
		if (this.running) {
			if (this.current.getCollision('bottom') && !this.current.justCollided) {
				this.isNext = true;
				isNext = true;
				this.current.fix();
				this.current = null;
			}

			if (!this.current) {
				this.current = this.generateTetromino(this.next);
				this.next = this.generateNextType();
			}

			if (isNext !== true) {
				this.isNext = false;
			}
		}
	}


	// GENERATE TETROMINOES
	generateNextType() {
		var types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

		return types[randInt(0, 6)];
	}

	generateTetromino(type = null) {

		return TetrominoFactory.getInstance(type, this);
	}
}



// BOARD

class Board {
	constructor() {
		// this.cells = [];
		this.rows = [];

		for (let i = 0; i < 22; i++) {
			this.rows.push(new Row());
		}
	}

	fixCells(cells) {
		cells.forEach((cell) => {
			this.rows[cell[0]].cells[cell[1]].full = true;
		});
	}

	get firstPopulatedRow() {
		var firstPopulated = this.rows.find((row) => {
			return row.populated;
		});

		var row = null;
		if (this.rows.indexOf(firstPopulated) != -1) {
			row = this.rows.indexOf(firstPopulated);
		}

		return row;
	}


}


class Row {
	constructor() {
		this.cells = [];

		for (let i = 0; i < 10; i++) {
			this.cells.push(new Cell());
		}
	}

	get full() {
		return this.cells.every((cell) => {
			return cell.full;
		});
	}

	get populated() {
		return this.cells.some((cell) => {
			return cell.full;
		});
	}
}

class Cell {
	constructor() {
		this.full = false;
	}
}



// TETROMINOES 

class Tetromino {
	constructor(game) {
		this.game = game;
		// this.bricks = [];
		this.orientationsAvailable = ['up', 'right', 'down', 'left'];
		// this.center = [];
		this.position = [1, 4];
		this.orientation = this.orientationsAvailable[0];
	}

	rotate(direction) {
		if (this.position[1] > 0 && this.position[1] < 9) {
			var currentOrientationIndex = this.orientationsAvailable.indexOf(this.orientation);
			switch(direction) {
				case 'left':
					if (currentOrientationIndex > 0) {
						this.orientation = this.orientationsAvailable[currentOrientationIndex - 1];
					} else if (currentOrientationIndex === 0){
						this.orientation = this.orientationsAvailable[this.orientationsAvailable.length - 1];
					}
					break;
				case 'right':
					if (currentOrientationIndex < this.orientationsAvailable.length - 1) {
						this.orientation = this.orientationsAvailable[currentOrientationIndex + 1];
					} else if (currentOrientationIndex == this.orientationsAvailable.length - 1){
						this.orientation = this.orientationsAvailable[0];
					}
					break;
			}
		}
	}

	move(direction) {
			switch(direction) {
				case 'right':
					if(!this.getCollision('right')){
						this.position[1]++;
					}
					break;
				case 'down':
					if (!this.getCollision('bottom')) {
						this.position[0]++;
					}
					break;
				case 'left':
					if (!this.getCollision('left')) {
						this.position[1]--;
					}
					break;
			}
	}


	fall() {
		var justCollided;
		if (!this.getCollision('bottom')) {
			this.position[0]++;
		} else {
			// If first collision signal after collision, switch on flag
			// to wait fixing tetromino and generating next
			if (!this.justCollided) {
				justCollided = true;
				this.justCollided = true;
			}
			// If second collision signal, switch of flag 
			if (justCollided !== true) {
				this.justCollided = false;
			}
		}
	}

	getCollision(edge) {
		return this.getCollisionByHitbox(edge) && this.getCollisionByBricks(edge);
	}


	getCollisionByHitbox(edge) {
		var collision = false;

		switch(edge) {
			case 'right':
				collision = this.hitbox.right >= 9;
				break;
			case 'left':
				collision = this.hitbox.left <= 0;
				break;
			case 'bottom':
				var edgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow : 22;
				collision = this.hitbox.bottom >= edgePosition;
				break;
		}

		return collision;
	}

	getCollisionByBricks(edge){
		var offset;

		switch(edge) {
			case 'right':
				offset = [0, 1];
				break;
			case 'left':
				offset = [0, -1];
				break;
			case 'bottom':
				offset = [0, 0];
				break;
		}

		return this.bricks.some((brick) => {
			var pos = [this.position[0] + brick[0], this.position[1] + brick[1]];
			var tested = [pos[0] + offset[0], pos[1] + offset[1]];

			if (this.game.board.rows[tested[0]] && this.game.board.rows[tested[0]].cells[tested[1]]) {
				return this.game.board.rows[tested[0]].cells[tested[1]].full;
			} else {
				return true;
			}	
		});
	}



	fix() {
		var cells = this.bricks.map((brick) => {
			return [this.position[0] + brick[0] - 1, this.position[1] + brick[1]];
		});

		this.game.board.fixCells(cells);
	}

}

class I extends Tetromino {
	constructor(game) {
		super(game);
		this.orientationsAvailable = ['up', 'right'];
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[0, -1],
					[0, 0],
					[0, 1],
					[0, 2]
				];
				break;
			case 'right':
				bricks = [
					[-2, 0],
					[-1, 0],
					[0, 0],
					[1, 0]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 2,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1],
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
		}

		return hitbox;
	}
}

class O extends Tetromino {
	constructor(game) {
		super(game);
		this.orientationsAvailable = ['up'];
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, 0],
					[-1, 1],
					[0, 0],
					[0, 1]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1]
				};
				break;
		}

		return hitbox;
	}
}

class T extends Tetromino {
	constructor(game) {
		super(game);
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, 0],
					[0, -1],
					[0, 0],
					[0, 1]
				];
				break;
			case 'right':
				bricks = [
					[-1, 0],
					[0, 0],
					[0, 1],
					[1, 0]
				];
				break;
			case 'down':
				bricks = [
					[0, -1],
					[0, 0],
					[0, 1],
					[1, 0]
				];
				break;
			case 'left':
				bricks = [
					[-1, 0],
					[0, -1],
					[0, 0],
					[1, 0]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
			case 'down':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
			case 'left':
				hitbox = {
					right: this.position[1],
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
		}

		return hitbox;
	}
}

class S extends Tetromino {
	constructor(game) {
		super(game);
		this.orientationsAvailable = ['up', 'right'];
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 0]
				];
				break;
			case 'right':
				bricks = [
					[-1, 0],
					[0, 0],
					[0, 1],
					[1, 1]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
		}

		return hitbox;
	}
}

class Z extends Tetromino {
	constructor(game) {
		super(game);
		this.orientationsAvailable = ['up', 'right'];
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, -1],
					[-1, 0],
					[0, 0],
					[0, 1]
				];
				break;
			case 'right':
				bricks = [
					[-1, 1],
					[0, 0],
					[0, 1],
					[1, 0]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
		}

		return hitbox;
	}
}

class J extends Tetromino {
	constructor(game) {
		super(game);
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, -1],
					[0, -1],
					[0, 0],
					[0, 1]
				];
				break;
			case 'right':
				bricks = [
					[-1, 0],
					[-1, 1],
					[0, 0],
					[1, 0]
				];
				break;
			case 'down':
				bricks = [
					[0, -1],
					[0, 0],
					[0, 1],
					[1, 1]
				];
				break;
			case 'left':
				bricks = [
					[-1, 0],
					[0, 0],
					[1, 0],
					[1, -1]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
			case 'down':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
			case 'left':
				hitbox = {
					right: this.position[1],
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
		}

		return hitbox;
	}
}

class L extends Tetromino {
	constructor(game) {
		super(game);
	}

	get bricks() {
		var bricks;
		switch(this.orientation) {
			case 'up':
				bricks = [
					[-1, 1],
					[0, -1],
					[0, 0],
					[0, 1]
				];
				break;
			case 'right':
				bricks = [
					[-1, 0],
					[0, 0],
					[1, 0],
					[1, 1],
				];
				break;
			case 'down':
				bricks = [
					[0, -1],
					[0, 0],
					[0, 1],
					[1, -1]
				];
				break;
			case 'left':
				bricks = [
					[-1, -1],
					[-1, 0],
					[0, 0],
					[1, 0]
				];
				break;
		}

		return bricks;
	}

	get hitbox() {
		var hitbox;
		switch(this.orientation) {
			case 'up':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0],
					left: this.position[1] - 1
				};
				break;
			case 'right':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1]
				};
				break;
			case 'down':
				hitbox = {
					right: this.position[1] + 1,
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
			case 'left':
				hitbox = {
					right: this.position[1],
					bottom: this.position[0] + 1,
					left: this.position[1] - 1
				};
				break;
		}

		return hitbox;
	}
}


class TetrominoFactory {
    static getInstance(type, game) {
    	switch(type) {
    		case 'I':
    			return new I(game);
    		case 'O':
    			return new O(game);
    		case 'T':
    			return new T(game);
    		case 'S':
    			return new S(game);
    		case 'Z':
    			return new Z(game);
    		case 'J':
    			return new J(game);
    		case 'L':
    			return new L(game);
    	}
    }
}