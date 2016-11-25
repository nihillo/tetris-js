export class View {
	constructor() {
		this.cellSize = 35;
		this.colors = {
			'I': 'cyan',
			'O': 'yellow',
			'T': 'purple',
			'S': 'green',
			'Z': 'red',
			'J': 'blue',
			'L': 'orange'
		};

		this.board = document.getElementById('board');
		this.board.setAttribute('width', this.cellSize * 10);
		this.board.setAttribute('height', this.cellSize * 22);
	}

	draw(cell, type) {
		var color = this.colors[type];

		var cellElem = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

		cellElem.setAttribute('width', this.cellSize);
		cellElem.setAttribute('height', this.cellSize);
		cellElem.setAttribute('x', cell[1] * this.cellSize);
		cellElem.setAttribute('y', cell[0] * this.cellSize);
		cellElem.setAttribute('rx', this.cellSize / 10);
		cellElem.setAttribute('ry', this.cellSize / 10);
		cellElem.setAttribute('fill', color);
		this.board.appendChild(cellElem);
	}

	delete(cell) {
		var cellElem = document.querySelector(`[x="${cell[1] * this.cellSize}"][y="${cell[0] * this.cellSize}"]`);
		if (cellElem) {
			this.board.removeChild(cellElem);
		}
	}

	drawNext(type) {

	}
}