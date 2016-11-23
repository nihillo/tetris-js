class Tetris {
	constructor() {
		this.board = new Board();
	}


	// MAIN LOOP
	start() {

	}

	stop() {

	}

	loop() {

	}


	// GENERATE RANDOM TETROMINO
	generateTetromino() {
		var types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

		return TetrominoFactory.getInstance(types[0]);
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
}

class Cell {
	constructor() {
		this.full = false;
	}
}



// TETROMINOES 

class Tetromino {
	constructor() {
		// this.hitbox = [];
		// this.bricks = [];
		this.orientations = ['up', 'right', 'down', 'left'];
		this.orientation = 'up';
		// this.center = [];
	}

	rotateLeft() {}

	rotateRight() {}

	move(direction) {}

}

class I extends Tetromino {
	constructor() {
		super();
		this.hitbox = {
			'up': [1, 4],
			'right': [4, 1]
		};
		this.center = {
			'up': [0, 1],
			'right': [1, 0]
		};
		this.bricks = {
			'up': [
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3]
			],
			'right': [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0]
			]
		};
		
	}
}

class O extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 2];
		this.bricks = [
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3]
		];
		this.orientations = ['up'];
	}
}

class T extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 3];
		this.bricks = [
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 2]
		];
	}
}

class S extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 3];
		this.bricks = [
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 1]
		];
		this.orientations = ['up', 'right'];
	}
}

class Z extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 3];
		this.bricks = [
			[0, 0],
			[0, 1],
			[1, 1],
			[1, 2]
		];
		this.orientations = ['up', 'right'];
	}
}

class J extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 3];
		this.bricks = [
			[0, 0],
			[1, 0],
			[1, 1],
			[1, 2]
		];
	}
}

class L extends Tetromino {
	constructor() {
		super();
		this.hitbox = [2, 3];
		this.bricks = [
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2]
		];
	}
}


class TetrominoFactory {
    static getInstance(value) {
    	switch(value) {
    		case 'I':
    			return new I();
    			break;
    		case 'O':
    			return new O();
    			break;
    		case 'T':
    			return new T();
    			break;
    		case 'S':
    			return new S();
    			break;
    		case 'Z':
    			return new Z();
    			break;
    		case 'J':
    			return new J();
    			break;
    		case 'L':
    			return new L();
    			break;
    	}
    }
}