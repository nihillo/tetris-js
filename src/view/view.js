export class View {
	constructor() {
		this.cellSize = 35;

		this.board = document.getElementById('board');
		this.board.setAttribute('width', this.cellSize * 10);
		this.board.setAttribute('height', this.cellSize * 22);

		this.current = null;

	}

	drawTetromino(tetromino, isNext) {
		if (tetromino) {
			if (this.current) {
				if (!isNext) {
					this.current.parentNode.removeChild(this.current);
				}
				this.current = null;
			}

			var type = tetromino.constructor.name;
			var position = tetromino.position;

			var colors = {
				I: 'cyan',
				O: 'yellow',
				T: 'purple',
				S: 'green',
				Z: 'red',
				J: 'blue',
				L: 'orange'
			};

			var color = colors[type];


			var figure = document.createElementNS("http://www.w3.org/2000/svg", 'g');
			figure.setAttribute('fill', color);
			this.board.appendChild(figure);

			tetromino.bricks.forEach((brick) => {
				let cell = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

				let cellPosition = [position[0] + brick[0], position[1] + brick[1]];
				cell.setAttribute('width', this.cellSize);
				cell.setAttribute('height', this.cellSize);
				cell.setAttribute('x', cellPosition[1] * this.cellSize);
				cell.setAttribute('y', cellPosition[0] * this.cellSize);
				cell.setAttribute('rx', this.cellSize / 10);
				cell.setAttribute('ry', this.cellSize / 10);
				figure.appendChild(cell);
			});

			this.current = figure;
		}
	}
}