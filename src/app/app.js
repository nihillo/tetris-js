import {randInt} from '../lib/lib.js';
import * as tetro from './tetrominoes.js';


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


	// GAME ALGORITHMS
	start() {
		this.running = true;
		this.current = this.generateTetromino(this.next);
		this.next = this.generateNextType();
	}

	stop() {
		this.running = false;
	}

	move(direction) {
		
		if (this.running) {
			
			var response = {};

			var collision = this.current.getCollision('move', direction);

			if (collision) {

				if (direction == 'down') {
					
					this.current.fix();


					var rowsComplete = this.board.checkRowsCompletion(this.current.rows);
					if (rowsComplete) {
						if (!response.delete) {response.delete = [];} 
						rowsComplete.forEach((row) => {
							row.cells.forEach((cell) => {
								response.delete.push({position: cell.position});
								cell.full = false;
							});
							row.update = true;
						});
						if (!response.rowsUpdate) {response.rowsUpdate = true;}
					} 


					if (!response.nextTetromino) {response.nextTetromino = true;}
				}
			} else {

				// insert deletions in response
				if (!response.delete) {response.delete = [];}
				this.current.globalBricksPositions.forEach((brick) => {
					response.delete.push({position: brick});
				});


				this.current.move(direction);


				// insert drawings in response
				if (!response.draw) {response.draw = [];}
				this.current.globalBricksPositions.forEach((brick) => {
					response.draw.push({
						position: brick,
						type: this.current.constructor.name.toString()
					});
				});

			}
			
			return response;
		} 
	}

	rotate(direction) {

		if (this.running) {
			var response = {};

			var collision = this.current.getCollision('rotate', direction);

			if (!collision) {

				// insert deletions in response
				if (!response.delete) {response.delete = [];}
				this.current.globalBricksPositions.forEach((brick) => {
					response.delete.push({position: brick});
				});

				// do operation
				this.current.rotate(direction);

				// insert drawings in response
				if (!response.draw) {response.draw = [];}
				this.current.globalBricksPositions.forEach((brick) => {
					response.draw.push({
						position: brick,
						type: this.current.constructor.name.toString()
					});
				});

			}	

			return response;			
		}
	}

	rowsUpdate() {
		if (this.running) {
			var response = {};

			var start = this.board.findLastUpdateRow();
			var end = this.board.firstPopulatedRow;

			var write = start;
			var read = this.board.findLastNonUpdateRow();
			
			do {
				if (this.board.rows[read].update) {read--;}
				this.board.moveRow(read, write);
				read--;
				write--;
			} while(write >= end);

			response = this.redrawAllBetweenRows(end, start);

			return response;
		}
	}

	nextTetromino() {
		if (this.running) {
			var response = {};

			if (this.board.firstPopulatedRow > 2) {
				this.current = null;
				this.current = this.generateTetromino(this.next);
				this.next = this.generateNextType();

				// insert drawings in response
				if (!response.draw) {response.draw = [];}
				this.current.globalBricksPositions.forEach((brick) => {
					response.draw.push({
						position: brick,
						type: this.current.constructor.name.toString()
					});
				});
				response.next = this.next;
			} else {
				// Do stuff on Game Over
				this.stop();
				console.log('Game Over');
			} 
			return response;
		}
	}


	redrawAllBetweenRows(fromRow, toRow) {
		var response = {
			delete: [],
			draw: []
		};

		var slice = this.board.rows.slice(fromRow, toRow + 1);

		slice.forEach((row) => {
			row.cells.forEach((cell) => {
				response.delete.push({position: cell.position});
				if (cell.full) {
					response.draw.push({position: cell.position, type: cell.type});
				}
			});
		});

		return response;
	}


	// GENERATE TETROMINOES
	generateNextType() {
		var types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

		return types[randInt(0, 6)];
	}

	generateTetromino(type = null) {

		return tetro.TetrominoFactory.getInstance(type, this);
	}
}



// BOARD

class Board {
	constructor() {
		// this.cells = [];
		this.rows = [];

		for (let i = 0; i < 22; i++) {
			this.rows.push(new Row(i));
		}
	}

	fixCells(cells) {
		cells.forEach((cell) => {
			this.rows[cell.position[0]].cells[cell.position[1]] = {
				full: true,
				type: cell.type,
				position: cell.position
			};

			
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

	checkRowsCompletion(rows) {
		var rowsComplete = [];

		rows.forEach((row) => {
			if (this.rows[row].full) {
				rowsComplete.push(this.rows[row]);
			}
		});

		if (rowsComplete.length > 0) {
			return rowsComplete;
		} else {
			return false;
		}
	}

	findLastUpdateRow() {
		var reverseRows = this.rows.slice();
		reverseRows.reverse();

		var result = reverseRows.find((row) => {
			return row.update;
		});

		return result.rowIndex;
	}

	findLastNonUpdateRow() {
		var reverseUntilUpdate = this.rows.slice(0, this.findLastUpdateRow());
		reverseUntilUpdate.reverse();

		var result = reverseUntilUpdate.find((row) => {
			return !row.update;
		});

		return result.rowIndex;
	}

	moveRow(srcIndex, destIndex) {
		this.rows[srcIndex].cells.forEach((cell, cellIndex) => {
			this.rows[destIndex].cells[cellIndex] = new Cell(destIndex, cellIndex);
			this.rows[destIndex].cells[cellIndex].full = this.rows[srcIndex].cells[cellIndex].full;
			if (this.rows[srcIndex].cells[cellIndex].full) {
				this.rows[destIndex].cells[cellIndex].type = this.rows[srcIndex].cells[cellIndex].type;
				this.rows[srcIndex].cells[cellIndex].full = false;
			}
		});

		this.rows[destIndex].update = false;
	}
}


class Row {
	constructor(row) {
		this.cells = [];
		this.rowIndex = row;

		for (let i = 0; i < 10; i++) {
			this.cells.push(new Cell(row, i));
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
	constructor(row, cell) {
		this.full = false;
		this.type = null;
		this.position = [row, cell];
	}
}