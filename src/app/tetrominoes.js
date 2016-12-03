// TETROMINOES 

export class Tetromino {
	constructor(game) {
		this.game = game;
		// this.bricks = [];
		this.orientationsAvailable = ['up', 'right', 'down', 'left'];
		// this.center = [];
		this.position = [1, 4];
		this.orientation = this.orientationsAvailable[0];
	}

	rotate(direction) {
			var currentOrientationIndex = this.orientationsAvailable.indexOf(this.orientation);
			switch(direction) {
				case 'counterclock':
					if (currentOrientationIndex > 0) {
						this.orientation = this.orientationsAvailable[currentOrientationIndex - 1];
					} else if (currentOrientationIndex === 0){
						this.orientation = this.orientationsAvailable[this.orientationsAvailable.length - 1];
					}
					break;
				case 'clock':
					if (currentOrientationIndex < this.orientationsAvailable.length - 1) {
						this.orientation = this.orientationsAvailable[currentOrientationIndex + 1];
					} else if (currentOrientationIndex == this.orientationsAvailable.length - 1){
						this.orientation = this.orientationsAvailable[0];
					}
					break;
		}
	}

	simulateRotation(direction) {

		var initialOrientation = this.orientationsAvailable.indexOf(this.orientation);

		this.rotate(direction);

		var simulatedBricks = this.globalBricksPositions;

		this.orientation = this.orientationsAvailable[initialOrientation];

		return simulatedBricks;
	}

	move(direction) {
			switch(direction) {
				case 'right':
						this.position[1]++;
					break;
				case 'down':
						this.position[0]++;
					break;
				case 'left':
						this.position[1]--;
					break;
			}
	}

	get globalBricksPositions() {
		return this.bricks.map((brick) => {
			return [this.position[0] + brick[0], this.position[1] + brick[1]];
		});
	}

	get rows() {
		var rows = [];
		this.globalBricksPositions.forEach((brick) => {
			if (rows.indexOf(brick[0]) == -1) {
				rows.push(brick[0]);
			}
		});
		return rows;
	}

	getCollision(operation, direction) {
		switch(operation) {
			case 'move':
				return this.getCollisionByHitbox(direction) && this.getCollisionByBricks(direction);
			case 'rotate':
				return this.getRotationCollisionByHitbox(direction) && this.getRotationCollisionByBricks(direction);
		}
	}


	getCollisionByHitbox(direction) {
		var collision;

		var edgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow : 21;
		edgePosition--;

		var downCollision = this.hitbox.bottom >= edgePosition;

		switch(direction) {
			case 'right':
				collision = downCollision || this.hitbox.right >= 9;
				break;
			case 'left':
				collision = downCollision || this.hitbox.left <= 0;
				break;
			case 'down':
				collision = downCollision;
				break;
		}

		return collision;
	}

	getCollisionByBricks(direction){
		var offset;

		switch(direction) {
			case 'right':
				offset = [0, 1];
				break;
			case 'left':
				offset = [0, -1];
				break;
			case 'down':
				offset = [1, 0];
				break;
		}

		return this.globalBricksPositions.some((brick) => {
			var tested = [brick[0] + offset[0], brick[1] + offset[1]];

			if (this.game.board.rows[tested[0]] && this.game.board.rows[tested[0]].cells[tested[1]]) {
				return this.game.board.rows[tested[0]].cells[tested[1]].full;
			} else {
				return true;
			}	
		});
	}

	getRotationCollisionByHitbox(direction) {
		var bottomEdgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow - 1 : 21;
		return (this.position[1] <= 0 || this.position[1] >= 9 || this.position[0] < 2 || this.position[0] >= bottomEdgePosition) ;
	}

	getRotationCollisionByBricks(direction) {
		// Get representation of positions if rotation is done
		var rotated = this.simulateRotation(direction);
		
		// Check if any brick ... 
		return rotated.some((brick) => {
			
			// ... is out of board
			if (brick[0] > 21 || brick[0] < 2 || brick[1] < 0 || brick[1] > 9) {
				return true;
			}

			// ... or is in an already full cell
			return this.game.board.rows[brick[0]].cells[brick[1]].full;
		});

	}



	fix() {
		var cells = this.bricks.map((brick) => {
			var brickType = this.constructor.name.toString();
			return {
				position: [this.position[0] + brick[0], this.position[1] + brick[1]],
				type: brickType
			};
		});

		this.game.board.fixCells(cells);
	}

}

export class I extends Tetromino {
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

	getRotationCollisionByHitbox(direction) {
		var bottomEdgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow - 1 : 21;
		return (this.position[1] <= 0 || this.position[1] >= 8 || this.position[0] < 2 || this.position[0] >= bottomEdgePosition);
	}
}

export class O extends Tetromino {
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

	getRotationCollisionByHitbox(direction) {
		return false;
	}
}

export class T extends Tetromino {
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

export class S extends Tetromino {
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

export class Z extends Tetromino {
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

export class J extends Tetromino {
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

export class L extends Tetromino {
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


export class TetrominoFactory {
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