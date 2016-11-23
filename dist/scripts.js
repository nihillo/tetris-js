/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.randInt = randInt;
	function rand(min, max) {
		/*	Return a random float between min and max
	 */
		var rndCoef = Math.random();
		return min + rndCoef * (max - min);
	}

	function randInt(min, max) {
		/*	Return a random int between min and max
	 */
		return Math.floor(rand(min, max + 1));
	}

	// function findRelCell(array, currRow, currCol, deltaRow, deltaCol) {
	// 	var cell = null;
	// 	if (array[currRow + deltaRow] && 
	// 		array[currRow + deltaRow][currCol + deltaCol])
	// 	{
	// 		cell = array[currRow + deltaRow][currCol + deltaCol];
	// 	}

	// 	return cell;
	// }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Tetris = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lib = __webpack_require__(1);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tetris = exports.Tetris = function () {
		function Tetris() {
			_classCallCheck(this, Tetris);

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


		_createClass(Tetris, [{
			key: 'start',
			value: function start() {
				this.running = true;
				this.current = this.generateTetromino(this.next);
				this.next = this.generateNextType();
				this.loop();
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.running = false;
			}
		}, {
			key: 'loop',
			value: function loop() {
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

		}, {
			key: 'generateNextType',
			value: function generateNextType() {
				var types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

				return types[(0, _lib.randInt)(0, 6)];
			}
		}, {
			key: 'generateTetromino',
			value: function generateTetromino() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


				return TetrominoFactory.getInstance(type, this);
			}
		}]);

		return Tetris;
	}();

	// BOARD

	var Board = function () {
		function Board() {
			_classCallCheck(this, Board);

			// this.cells = [];
			this.rows = [];

			for (var i = 0; i < 22; i++) {
				this.rows.push(new Row());
			}
		}

		_createClass(Board, [{
			key: 'fixCells',
			value: function fixCells(cells) {
				var _this = this;

				cells.forEach(function (cell) {
					_this.rows[cell[0]].cells[cell[1]].full = true;
				});
			}
		}, {
			key: 'firstPopulatedRow',
			get: function get() {
				var firstPopulated = this.rows.find(function (row) {
					return row.populated;
				});

				var row = null;
				if (this.rows.indexOf(firstPopulated) != -1) {
					row = this.rows.indexOf(firstPopulated);
				}

				return row;
			}
		}]);

		return Board;
	}();

	var Row = function () {
		function Row() {
			_classCallCheck(this, Row);

			this.cells = [];

			for (var i = 0; i < 10; i++) {
				this.cells.push(new Cell());
			}
		}

		_createClass(Row, [{
			key: 'full',
			get: function get() {
				return this.cells.every(function (cell) {
					return cell.full;
				});
			}
		}, {
			key: 'populated',
			get: function get() {
				return this.cells.some(function (cell) {
					return cell.full;
				});
			}
		}]);

		return Row;
	}();

	var Cell = function Cell() {
		_classCallCheck(this, Cell);

		this.full = false;
	};

	// TETROMINOES 

	var Tetromino = function () {
		function Tetromino(game) {
			_classCallCheck(this, Tetromino);

			this.game = game;
			// this.bricks = [];
			this.orientationsAvailable = ['up', 'right', 'down', 'left'];
			// this.center = [];
			this.position = [1, 4];
			this.orientation = this.orientationsAvailable[0];
		}

		_createClass(Tetromino, [{
			key: 'rotate',
			value: function rotate(direction) {
				if (this.position[1] > 0 && this.position[1] < 9) {
					var currentOrientationIndex = this.orientationsAvailable.indexOf(this.orientation);
					switch (direction) {
						case 'left':
							if (currentOrientationIndex > 0) {
								this.orientation = this.orientationsAvailable[currentOrientationIndex - 1];
							} else if (currentOrientationIndex === 0) {
								this.orientation = this.orientationsAvailable[this.orientationsAvailable.length - 1];
							}
							break;
						case 'right':
							if (currentOrientationIndex < this.orientationsAvailable.length - 1) {
								this.orientation = this.orientationsAvailable[currentOrientationIndex + 1];
							} else if (currentOrientationIndex == this.orientationsAvailable.length - 1) {
								this.orientation = this.orientationsAvailable[0];
							}
							break;
					}
				}
			}
		}, {
			key: 'move',
			value: function move(direction) {
				switch (direction) {
					case 'right':
						if (!this.getCollision('right')) {
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
		}, {
			key: 'fall',
			value: function fall() {
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
		}, {
			key: 'getCollision',
			value: function getCollision(edge) {
				return this.getCollisionByHitbox(edge) && this.getCollisionByBricks(edge);
			}
		}, {
			key: 'getCollisionByHitbox',
			value: function getCollisionByHitbox(edge) {
				var collision = false;

				switch (edge) {
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
		}, {
			key: 'getCollisionByBricks',
			value: function getCollisionByBricks(edge) {
				var _this2 = this;

				var offset;

				switch (edge) {
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

				return this.bricks.some(function (brick) {
					var pos = [_this2.position[0] + brick[0], _this2.position[1] + brick[1]];
					var tested = [pos[0] + offset[0], pos[1] + offset[1]];

					if (_this2.game.board.rows[tested[0]] && _this2.game.board.rows[tested[0]].cells[tested[1]]) {
						return _this2.game.board.rows[tested[0]].cells[tested[1]].full;
					} else {
						return true;
					}
				});
			}
		}, {
			key: 'fix',
			value: function fix() {
				var _this3 = this;

				var cells = this.bricks.map(function (brick) {
					return [_this3.position[0] + brick[0] - 1, _this3.position[1] + brick[1]];
				});

				this.game.board.fixCells(cells);
			}
		}]);

		return Tetromino;
	}();

	var I = function (_Tetromino) {
		_inherits(I, _Tetromino);

		function I(game) {
			_classCallCheck(this, I);

			var _this4 = _possibleConstructorReturn(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, game));

			_this4.orientationsAvailable = ['up', 'right'];
			return _this4;
		}

		_createClass(I, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[0, -1], [0, 0], [0, 1], [0, 2]];
						break;
					case 'right':
						bricks = [[-2, 0], [-1, 0], [0, 0], [1, 0]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return I;
	}(Tetromino);

	var O = function (_Tetromino2) {
		_inherits(O, _Tetromino2);

		function O(game) {
			_classCallCheck(this, O);

			var _this5 = _possibleConstructorReturn(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, game));

			_this5.orientationsAvailable = ['up'];
			return _this5;
		}

		_createClass(O, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, 0], [-1, 1], [0, 0], [0, 1]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return O;
	}(Tetromino);

	var T = function (_Tetromino3) {
		_inherits(T, _Tetromino3);

		function T(game) {
			_classCallCheck(this, T);

			return _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, game));
		}

		_createClass(T, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, 0], [0, -1], [0, 0], [0, 1]];
						break;
					case 'right':
						bricks = [[-1, 0], [0, 0], [0, 1], [1, 0]];
						break;
					case 'down':
						bricks = [[0, -1], [0, 0], [0, 1], [1, 0]];
						break;
					case 'left':
						bricks = [[-1, 0], [0, -1], [0, 0], [1, 0]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return T;
	}(Tetromino);

	var S = function (_Tetromino4) {
		_inherits(S, _Tetromino4);

		function S(game) {
			_classCallCheck(this, S);

			var _this7 = _possibleConstructorReturn(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, game));

			_this7.orientationsAvailable = ['up', 'right'];
			return _this7;
		}

		_createClass(S, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, 0], [-1, 1], [0, -1], [0, 0]];
						break;
					case 'right':
						bricks = [[-1, 0], [0, 0], [0, 1], [1, 1]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return S;
	}(Tetromino);

	var Z = function (_Tetromino5) {
		_inherits(Z, _Tetromino5);

		function Z(game) {
			_classCallCheck(this, Z);

			var _this8 = _possibleConstructorReturn(this, (Z.__proto__ || Object.getPrototypeOf(Z)).call(this, game));

			_this8.orientationsAvailable = ['up', 'right'];
			return _this8;
		}

		_createClass(Z, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, -1], [-1, 0], [0, 0], [0, 1]];
						break;
					case 'right':
						bricks = [[-1, 1], [0, 0], [0, 1], [1, 0]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return Z;
	}(Tetromino);

	var J = function (_Tetromino6) {
		_inherits(J, _Tetromino6);

		function J(game) {
			_classCallCheck(this, J);

			return _possibleConstructorReturn(this, (J.__proto__ || Object.getPrototypeOf(J)).call(this, game));
		}

		_createClass(J, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, -1], [0, -1], [0, 0], [0, 1]];
						break;
					case 'right':
						bricks = [[-1, 0], [-1, 1], [0, 0], [1, 0]];
						break;
					case 'down':
						bricks = [[0, -1], [0, 0], [0, 1], [1, 1]];
						break;
					case 'left':
						bricks = [[-1, 0], [0, 0], [1, 0], [1, -1]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return J;
	}(Tetromino);

	var L = function (_Tetromino7) {
		_inherits(L, _Tetromino7);

		function L(game) {
			_classCallCheck(this, L);

			return _possibleConstructorReturn(this, (L.__proto__ || Object.getPrototypeOf(L)).call(this, game));
		}

		_createClass(L, [{
			key: 'bricks',
			get: function get() {
				var bricks;
				switch (this.orientation) {
					case 'up':
						bricks = [[-1, 1], [0, -1], [0, 0], [0, 1]];
						break;
					case 'right':
						bricks = [[-1, 0], [0, 0], [1, 0], [1, 1]];
						break;
					case 'down':
						bricks = [[0, -1], [0, 0], [0, 1], [1, -1]];
						break;
					case 'left':
						bricks = [[-1, -1], [-1, 0], [0, 0], [1, 0]];
						break;
				}

				return bricks;
			}
		}, {
			key: 'hitbox',
			get: function get() {
				var hitbox;
				switch (this.orientation) {
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
		}]);

		return L;
	}(Tetromino);

	var TetrominoFactory = function () {
		function TetrominoFactory() {
			_classCallCheck(this, TetrominoFactory);
		}

		_createClass(TetrominoFactory, null, [{
			key: 'getInstance',
			value: function getInstance(type, game) {
				switch (type) {
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
		}]);

		return TetrominoFactory;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Controller = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _app = __webpack_require__(2);

	var _view = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);

			this.game = new _app.Tetris();
			this.view = new _view.View();

			this.timeBase = 100; // Time unit, in miliseconds


			this.setControls();

			// TEST ---------------------------
			this.game.start();
			this.view.drawTetromino(this.game.current);
			this.fall();
		}

		// CONTROLS


		_createClass(Controller, [{
			key: 'setControls',
			value: function setControls() {
				var _this = this;

				window.addEventListener('keypress', function (event) {
					switch (event.keyCode) {
						case 65:
						case 97:
							_this.rotate('left');
							break;
						case 68:
						case 100:
							_this.rotate('right');
							break;
					}
				});

				window.addEventListener('keydown', function (event) {
					switch (event.key) {
						case 'ArrowRight':
							_this.move('right');
							break;
						case 'ArrowDown':
							_this.move('down');
							break;
						case 'ArrowLeft':
							_this.move('left');
							break;
					}
				});
			}

			// MOVEMENT METHODS

		}, {
			key: 'fall',
			value: function fall() {
				var _this2 = this;

				window.setInterval(function () {
					_this2.game.current.fall();
					_this2.game.loop();
					_this2.view.drawTetromino(_this2.game.current, _this2.game.isNext);
				}, this.game.speed * this.timeBase);
			}
		}, {
			key: 'move',
			value: function move(direction) {

				this.game.current.move(direction);
				this.game.loop();
				this.view.drawTetromino(this.game.current, this.game.isNext);
			}
		}, {
			key: 'rotate',
			value: function rotate(direction) {
				this.game.loop();
				this.game.current.rotate(direction);
				this.view.drawTetromino(this.game.current, this.game.isNext);
			}
		}]);

		return Controller;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = exports.View = function () {
		function View() {
			_classCallCheck(this, View);

			this.cellSize = 35;

			this.board = document.getElementById('board');
			this.board.setAttribute('width', this.cellSize * 10);
			this.board.setAttribute('height', this.cellSize * 22);

			this.current = null;
		}

		_createClass(View, [{
			key: 'drawTetromino',
			value: function drawTetromino(tetromino, isNext) {
				var _this = this;

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

					tetromino.bricks.forEach(function (brick) {
						var cell = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

						var cellPosition = [position[0] + brick[0], position[1] + brick[1]];
						cell.setAttribute('width', _this.cellSize);
						cell.setAttribute('height', _this.cellSize);
						cell.setAttribute('x', cellPosition[1] * _this.cellSize);
						cell.setAttribute('y', cellPosition[0] * _this.cellSize);
						cell.setAttribute('rx', _this.cellSize / 10);
						cell.setAttribute('ry', _this.cellSize / 10);
						figure.appendChild(cell);
					});

					this.current = figure;
				}
			}
		}]);

		return View;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ctrl = __webpack_require__(3);

	var ctrl;

	window.onload = function () {
		ctrl = new _ctrl.Controller();
	};

/***/ }
/******/ ]);