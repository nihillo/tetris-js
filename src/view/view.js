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


		this.panel = document.getElementById('panel');

		this.panel.style.width = this.cellSize * 10 + 'px';
		this.panel.style.height = this.cellSize * 3 + 'px';
		this.panel.style.top = this.cellSize * 2+ 'px';

		this.next = document.getElementById('next'); 
		this.next.setAttribute('width', this.cellSize * 4);
		this.next.setAttribute('height', this.cellSize * 2);

		this.drawLevel(0);
		this.drawScore(0);
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
		var allCellsMatchPos = document.querySelectorAll(`[x="${cell[1] * this.cellSize}"][y="${cell[0] * this.cellSize}"]`);

		if (allCellsMatchPos) {
			var cellElem;

			for (let cell = 0; cell < allCellsMatchPos.length; cell++) {
				if (allCellsMatchPos[cell].parentNode == this.board) {
					cellElem = allCellsMatchPos[cell];
				}
			}
			// console.log(allCellsMatchPos);
			// console.log(cellElem);
			if (cellElem) {
				this.board.removeChild(cellElem);
			}
		}
	}


	drawLevel(level) {
		var levelElm = document.getElementById('level');
		levelElm.innerHTML = level;
	}

	drawNext(type) {
		this.next.innerHTML = '';
		var color = this.colors[type];
		var tetro = document.createElementNS("http://www.w3.org/2000/svg", 'g');
		tetro.setAttribute('fill', color);

		switch(type) {
			case 'I':
				for (let i = 0; i < 4; i++) {
					let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
					brick.setAttribute('width', this.cellSize * 0.8);
					brick.setAttribute('height', this.cellSize * 0.8);
					brick.setAttribute('x', this.cellSize * 0.4 + i * this.cellSize * 0.8);
					brick.setAttribute('y', this.cellSize * 0.6);
					brick.setAttribute('rx', this.cellSize * 0.8 / 10);
					brick.setAttribute('ry', this.cellSize * 0.8 / 10);
					brick.setAttribute('fill', color);
					tetro.appendChild(brick);
				}
				break;
			case 'O':
				for (let i = 0; i < 2; i++) {
					for (let j = 0; j < 2; j++) {
						let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
						brick.setAttribute('width', this.cellSize * 0.8);
						brick.setAttribute('height', this.cellSize * 0.8);
						brick.setAttribute('x', this.cellSize * 1.2 + i * this.cellSize * 0.8);
						brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
						brick.setAttribute('rx', this.cellSize * 0.8 / 10);
						brick.setAttribute('ry', this.cellSize * 0.8 / 10);
						brick.setAttribute('fill', color);
						tetro.appendChild(brick);
					}
				}
				break;
			case 'T':
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 2; j++) {
						if ((j === 0 && i == 1) || j == 1) {
							let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
							brick.setAttribute('width', this.cellSize * 0.8);
							brick.setAttribute('height', this.cellSize * 0.8);
							brick.setAttribute('x', this.cellSize * 0.8 + i * this.cellSize * 0.8);
							brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
							brick.setAttribute('rx', this.cellSize * 0.8 / 10);
							brick.setAttribute('ry', this.cellSize * 0.8 / 10);
							brick.setAttribute('fill', color);
							tetro.appendChild(brick);
						}
					}
				}
				break;
			case 'S':
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 2; j++) {
						if ((j === 0 && (i == 1 || i == 2)) || (j === 1 && (i == 0 || i == 1))) {
							let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
							brick.setAttribute('width', this.cellSize * 0.8);
							brick.setAttribute('height', this.cellSize * 0.8);
							brick.setAttribute('x', this.cellSize * 0.8 + i * this.cellSize * 0.8);
							brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
							brick.setAttribute('rx', this.cellSize * 0.8 / 10);
							brick.setAttribute('ry', this.cellSize * 0.8 / 10);
							brick.setAttribute('fill', color);
							tetro.appendChild(brick);
						}
					}
				}
				break;
			case 'Z':
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 2; j++) {
						if ((j === 0 && (i === 0 || i == 1)) || (j === 1 && (i == 1 || i == 2))) {
							let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
							brick.setAttribute('width', this.cellSize * 0.8);
							brick.setAttribute('height', this.cellSize * 0.8);
							brick.setAttribute('x', this.cellSize * 0.8 + i * this.cellSize * 0.8);
							brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
							brick.setAttribute('rx', this.cellSize * 0.8 / 10);
							brick.setAttribute('ry', this.cellSize * 0.8 / 10);
							brick.setAttribute('fill', color);
							tetro.appendChild(brick);
						}
					}
				}
				break;
			case 'J':
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 2; j++) {
						if ((j === 0 && i === 0) || j == 1) {
							let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
							brick.setAttribute('width', this.cellSize * 0.8);
							brick.setAttribute('height', this.cellSize * 0.8);
							brick.setAttribute('x', this.cellSize * 0.8 + i * this.cellSize * 0.8);
							brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
							brick.setAttribute('rx', this.cellSize * 0.8 / 10);
							brick.setAttribute('ry', this.cellSize * 0.8 / 10);
							brick.setAttribute('fill', color);
							tetro.appendChild(brick);
						}
					}
				}
				break;
			case 'L':
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 2; j++) {
						if ((j === 0 && i == 2) || j == 1) {
							let brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
							brick.setAttribute('width', this.cellSize * 0.8);
							brick.setAttribute('height', this.cellSize * 0.8);
							brick.setAttribute('x', this.cellSize * 0.8 + i * this.cellSize * 0.8);
							brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
							brick.setAttribute('rx', this.cellSize * 0.8 / 10);
							brick.setAttribute('ry', this.cellSize * 0.8 / 10);
							brick.setAttribute('fill', color);
							tetro.appendChild(brick);
						}
					}
				}
				break;
		}

		this.next.appendChild(tetro);
	}

	drawScore(score) {
		var scoreElm = document.getElementById('score');
		scoreElm.innerHTML = score;
	}
}