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
	__webpack_require__(6);

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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// TETROMINOES 

	var Tetromino = exports.Tetromino = function () {
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
				var currentOrientationIndex = this.orientationsAvailable.indexOf(this.orientation);
				switch (direction) {
					case 'counterclock':
						if (currentOrientationIndex > 0) {
							this.orientation = this.orientationsAvailable[currentOrientationIndex - 1];
						} else if (currentOrientationIndex === 0) {
							this.orientation = this.orientationsAvailable[this.orientationsAvailable.length - 1];
						}
						break;
					case 'clock':
						if (currentOrientationIndex < this.orientationsAvailable.length - 1) {
							this.orientation = this.orientationsAvailable[currentOrientationIndex + 1];
						} else if (currentOrientationIndex == this.orientationsAvailable.length - 1) {
							this.orientation = this.orientationsAvailable[0];
						}
						break;
				}
			}
		}, {
			key: 'simulateRotation',
			value: function simulateRotation(direction) {

				var initialOrientation = this.orientationsAvailable.indexOf(this.orientation);

				this.rotate(direction);

				var simulatedBricks = this.globalBricksPositions;

				this.orientation = this.orientationsAvailable[initialOrientation];

				return simulatedBricks;
			}
		}, {
			key: 'move',
			value: function move(direction) {
				switch (direction) {
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
		}, {
			key: 'getCollision',
			value: function getCollision(operation, direction) {
				switch (operation) {
					case 'move':
						return this.getCollisionByHitbox(direction) && this.getCollisionByBricks(direction);
					case 'rotate':
						return this.getRotationCollisionByHitbox(direction) && this.getRotationCollisionByBricks(direction);
				}
			}
		}, {
			key: 'getCollisionByHitbox',
			value: function getCollisionByHitbox(direction) {
				var collision;

				var edgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow : 21;
				edgePosition--;

				var downCollision = this.hitbox.bottom >= edgePosition;

				switch (direction) {
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
		}, {
			key: 'getCollisionByBricks',
			value: function getCollisionByBricks(direction) {
				var _this = this;

				var offset;

				switch (direction) {
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

				return this.globalBricksPositions.some(function (brick) {
					var tested = [brick[0] + offset[0], brick[1] + offset[1]];

					if (_this.game.board.rows[tested[0]] && _this.game.board.rows[tested[0]].cells[tested[1]]) {
						return _this.game.board.rows[tested[0]].cells[tested[1]].full;
					} else {
						return true;
					}
				});
			}
		}, {
			key: 'getRotationCollisionByHitbox',
			value: function getRotationCollisionByHitbox(direction) {
				var bottomEdgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow - 1 : 21;
				return this.position[1] <= 0 || this.position[1] >= 9 || this.position[0] < 2 || this.position[0] >= bottomEdgePosition;
			}
		}, {
			key: 'getRotationCollisionByBricks',
			value: function getRotationCollisionByBricks(direction) {
				var _this2 = this;

				// Get representation of positions if rotation is done
				var rotated = this.simulateRotation(direction);

				// Check if any brick ... 
				return rotated.some(function (brick) {

					// ... is out of board
					if (brick[0] > 21 || brick[0] < 2 || brick[1] < 0 || brick[1] > 9) {
						return true;
					}

					// ... or is in an already full cell
					return _this2.game.board.rows[brick[0]].cells[brick[1]].full;
				});
			}
		}, {
			key: 'fix',
			value: function fix() {
				var _this3 = this;

				var cells = this.bricks.map(function (brick) {
					var brickType = _this3.constructor.name.toString();
					return {
						position: [_this3.position[0] + brick[0], _this3.position[1] + brick[1]],
						type: brickType
					};
				});

				this.game.board.fixCells(cells);
			}
		}, {
			key: 'globalBricksPositions',
			get: function get() {
				var _this4 = this;

				return this.bricks.map(function (brick) {
					return [_this4.position[0] + brick[0], _this4.position[1] + brick[1]];
				});
			}
		}, {
			key: 'rows',
			get: function get() {
				var rows = [];
				this.globalBricksPositions.forEach(function (brick) {
					if (rows.indexOf(brick[0]) == -1) {
						rows.push(brick[0]);
					}
				});
				return rows;
			}
		}]);

		return Tetromino;
	}();

	var I = exports.I = function (_Tetromino) {
		_inherits(I, _Tetromino);

		function I(game) {
			_classCallCheck(this, I);

			var _this5 = _possibleConstructorReturn(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, game));

			_this5.orientationsAvailable = ['up', 'right'];
			return _this5;
		}

		_createClass(I, [{
			key: 'getRotationCollisionByHitbox',
			value: function getRotationCollisionByHitbox(direction) {
				var bottomEdgePosition = this.game.board.firstPopulatedRow ? this.game.board.firstPopulatedRow - 1 : 21;
				return this.position[1] <= 0 || this.position[1] >= 8 || this.position[0] < 2 || this.position[0] >= bottomEdgePosition;
			}
		}, {
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

	var O = exports.O = function (_Tetromino2) {
		_inherits(O, _Tetromino2);

		function O(game) {
			_classCallCheck(this, O);

			var _this6 = _possibleConstructorReturn(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, game));

			_this6.orientationsAvailable = ['up'];
			return _this6;
		}

		_createClass(O, [{
			key: 'getRotationCollisionByHitbox',
			value: function getRotationCollisionByHitbox(direction) {
				return false;
			}
		}, {
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

	var T = exports.T = function (_Tetromino3) {
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

	var S = exports.S = function (_Tetromino4) {
		_inherits(S, _Tetromino4);

		function S(game) {
			_classCallCheck(this, S);

			var _this8 = _possibleConstructorReturn(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, game));

			_this8.orientationsAvailable = ['up', 'right'];
			return _this8;
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

	var Z = exports.Z = function (_Tetromino5) {
		_inherits(Z, _Tetromino5);

		function Z(game) {
			_classCallCheck(this, Z);

			var _this9 = _possibleConstructorReturn(this, (Z.__proto__ || Object.getPrototypeOf(Z)).call(this, game));

			_this9.orientationsAvailable = ['up', 'right'];
			return _this9;
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

	var J = exports.J = function (_Tetromino6) {
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

	var L = exports.L = function (_Tetromino7) {
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

	var TetrominoFactory = exports.TetrominoFactory = function () {
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
	exports.Tetris = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lib = __webpack_require__(1);

	var _tetrominoes = __webpack_require__(2);

	var tetro = _interopRequireWildcard(_tetrominoes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tetris = exports.Tetris = function () {
		function Tetris() {
			_classCallCheck(this, Tetris);

			this.board = new Board();
			this.running = false;

			// Speed expressed as number of time units that movement takes to be done
			this.speedTable = [10, 8, 6, 5, 4, 3, 2, 1, 0.8, 0.6, 0.4, 0.8, 0.2, 0.1, 0.08, 0.06, 0.04, 0.03, 0.02, 0.01];

			this.trackList = ['hungarian', 'little-g', 'can-can', 'moonlight', 'allaturca', 'ninth'];

			this.score = 0;

			this.current = null;
			this.next = this.generateNextType();

			this.noRemove = false;
		}

		_createClass(Tetris, [{
			key: 'start',


			// GAME ALGORITHMS
			value: function start() {
				this.running = true;
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.running = false;
			}
		}, {
			key: 'move',
			value: function move(direction) {
				var _this = this;

				if (this.running) {

					var response = {};

					var collision = this.current.getCollision('move', direction);

					if (collision) {

						if (direction == 'down') {

							this.current.fix();

							var rowsComplete = this.board.checkRowsCompletion(this.current.rows);
							if (rowsComplete) {
								if (!response.delete) {
									response.delete = [];
								}

								var scoreDelta = 1;
								rowsComplete.forEach(function (row) {
									row.cells.forEach(function (cell) {
										response.delete.push({ position: cell.position });
										cell.full = false;
									});
									row.update = true;
									scoreDelta *= 2;
								});

								var currLevel = [];
								currLevel.push(this.level);
								currLevel = currLevel.slice(0);
								currLevel = currLevel[0];

								this.score += scoreDelta;

								if (!response.rowsUpdate) {
									response.rowsUpdate = true;
								}

								if (!response.score) {
									response.score = this.score;
								}

								if (!response.levelup && this.level != currLevel) {
									response.levelup = true;
									response.level = this.level;
									if (this.level < this.trackList.length) {
										response.track = this.trackList[this.level];
									}
								}
							}

							if (!response.nextTetromino) {
								response.nextTetromino = true;
							}
						}
					} else {

						// insert deletions in response
						if (!response.delete) {
							response.delete = [];
						}
						this.current.globalBricksPositions.forEach(function (brick) {
							response.delete.push({ position: brick });
						});

						this.current.move(direction);

						// insert drawings in response
						if (!response.draw) {
							response.draw = [];
						}
						this.current.globalBricksPositions.forEach(function (brick) {
							response.draw.push({
								position: brick,
								type: _this.current.constructor.name.toString()
							});
						});
					}

					return response;
				}
			}
		}, {
			key: 'rotate',
			value: function rotate(direction) {
				var _this2 = this;

				if (this.running) {
					var response = {};

					var collision = this.current.getCollision('rotate', direction);

					if (!collision) {

						// insert deletions in response
						if (!response.delete) {
							response.delete = [];
						}
						this.current.globalBricksPositions.forEach(function (brick) {
							response.delete.push({ position: brick });
						});

						// do operation
						this.current.rotate(direction);

						// insert drawings in response
						if (!response.draw) {
							response.draw = [];
						}
						this.current.globalBricksPositions.forEach(function (brick) {
							response.draw.push({
								position: brick,
								type: _this2.current.constructor.name.toString()
							});
						});
					}

					return response;
				}
			}
		}, {
			key: 'rowsUpdate',
			value: function rowsUpdate() {
				if (this.running) {
					var response = {};

					var start = this.board.findLastUpdateRow();
					var end = this.board.firstPopulatedRow;

					var write = start;
					var read = this.board.findLastNonUpdateRow();

					do {
						if (this.board.rows[read].update) {
							read--;
						}
						this.board.moveRow(read, write);
						read--;
						write--;
					} while (write >= end);

					response = this.redrawAllBetweenRows(end, start);

					return response;
				}
			}
		}, {
			key: 'nextTetromino',
			value: function nextTetromino() {
				var _this3 = this;

				if (this.running) {
					var response = {};

					if (this.board.firstPopulatedRow > 2) {
						this.current = null;
						this.current = this.generateTetromino(this.next);
						this.next = this.generateNextType();

						// insert drawings in response
						if (!response.draw) {
							response.draw = [];
						}
						this.current.globalBricksPositions.forEach(function (brick) {
							response.draw.push({
								position: brick,
								type: _this3.current.constructor.name.toString()
							});
						});
						response.next = this.next;
					} else {
						// Do stuff on Game Over
						this.stop();
						if (!response.finish) {
							response.finish = true;
						}
					}
					return response;
				}
			}
		}, {
			key: 'redrawAllBetweenRows',
			value: function redrawAllBetweenRows(fromRow, toRow) {
				var response = {
					delete: [],
					draw: []
				};

				var slice = this.board.rows.slice(fromRow, toRow + 1);

				slice.forEach(function (row) {
					row.cells.forEach(function (cell) {
						response.delete.push({ position: cell.position });
						if (cell.full) {
							response.draw.push({ position: cell.position, type: cell.type });
						}
					});
				});

				return response;
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


				return tetro.TetrominoFactory.getInstance(type, this);
			}
		}, {
			key: 'level',
			get: function get() {
				return this.score ? Math.floor(this.score / 128) : 0;
			}
		}, {
			key: 'speed',
			get: function get() {
				return this.speedTable[this.level];
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
				this.rows.push(new Row(i));
			}
		}

		_createClass(Board, [{
			key: 'fixCells',
			value: function fixCells(cells) {
				var _this4 = this;

				cells.forEach(function (cell) {
					_this4.rows[cell.position[0]].cells[cell.position[1]] = {
						full: true,
						type: cell.type,
						position: cell.position
					};
				});
			}
		}, {
			key: 'checkRowsCompletion',
			value: function checkRowsCompletion(rows) {
				var _this5 = this;

				var rowsComplete = [];

				rows.forEach(function (row) {
					if (_this5.rows[row].full) {
						rowsComplete.push(_this5.rows[row]);
					}
				});

				if (rowsComplete.length > 0) {
					return rowsComplete;
				} else {
					return false;
				}
			}
		}, {
			key: 'findLastUpdateRow',
			value: function findLastUpdateRow() {
				var reverseRows = this.rows.slice();
				reverseRows.reverse();

				var result = reverseRows.find(function (row) {
					return row.update;
				});

				return result.rowIndex;
			}
		}, {
			key: 'findLastNonUpdateRow',
			value: function findLastNonUpdateRow() {
				var reverseUntilUpdate = this.rows.slice(0, this.findLastUpdateRow());
				reverseUntilUpdate.reverse();

				var result = reverseUntilUpdate.find(function (row) {
					return !row.update;
				});

				return result.rowIndex;
			}
		}, {
			key: 'moveRow',
			value: function moveRow(srcIndex, destIndex) {
				var _this6 = this;

				this.rows[srcIndex].cells.forEach(function (cell, cellIndex) {
					_this6.rows[destIndex].cells[cellIndex] = new Cell(destIndex, cellIndex);
					_this6.rows[destIndex].cells[cellIndex].full = _this6.rows[srcIndex].cells[cellIndex].full;
					if (_this6.rows[srcIndex].cells[cellIndex].full) {
						_this6.rows[destIndex].cells[cellIndex].type = _this6.rows[srcIndex].cells[cellIndex].type;
						_this6.rows[srcIndex].cells[cellIndex].full = false;
					}
				});

				this.rows[destIndex].update = false;
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

				return row ? row : 22;
			}
		}]);

		return Board;
	}();

	var Row = function () {
		function Row(row) {
			_classCallCheck(this, Row);

			this.cells = [];
			this.rowIndex = row;

			for (var i = 0; i < 10; i++) {
				this.cells.push(new Cell(row, i));
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

	var Cell = function Cell(row, cell) {
		_classCallCheck(this, Cell);

		this.full = false;
		this.type = null;
		this.position = [row, cell];
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Controller = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _app = __webpack_require__(3);

	var _view = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);

			this.game = new _app.Tetris();
			this.view = new _view.View();

			this.timeBase = 100; // Time unit, in miliseconds


			this.setControls();

			// this.start();
		}

		// CONTROLS


		_createClass(Controller, [{
			key: 'setControls',
			value: function setControls() {
				var _this = this;

				window.addEventListener('keydown', function (event) {
					if (!_this.paused) {
						switch (event.key) {
							case 'ArrowRight':
								_this.operate('move', 'right');
								break;
							case 'ArrowDown':
								_this.operate('move', 'down');
								break;
							case 'ArrowLeft':
								_this.operate('move', 'left');
								break;
						}

						switch (event.keyCode) {
							case 65:
							case 97:
								_this.operate('rotate', 'counterclock');
								break;
							case 68:
							case 100:
								_this.operate('rotate', 'clock');
								break;

							case 32:
								_this.start();
								break;

							case 27:
								_this.pause();
								break;
						}
					} else {
						switch (event.keyCode) {
							case 27:
								_this.resume();
								break;
						}
					}
				});
			}

			// MOVEMENT METHODS

		}, {
			key: 'fall',
			value: function fall() {
				var _this2 = this;

				return window.setInterval(function () {
					_this2.operate('move', 'down');
				}, this.game.speed * this.timeBase);
			}
		}, {
			key: 'stopFall',
			value: function stopFall() {
				clearInterval(this.cycle);
			}
		}, {
			key: 'resetFall',
			value: function resetFall() {
				this.stopFall();
				this.cycle = this.fall();
			}
		}, {
			key: 'operate',
			value: function operate(operation, direction) {
				var _this3 = this;

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
					window.setTimeout(function () {
						var update = _this3.game.rowsUpdate();
						update.delete.forEach(function (brick) {
							_this3.view.delete(brick.position);
						});
						update.draw.forEach(function (brick) {
							_this3.view.draw(brick.position, brick.type);
						});
						if (!update.levelup) {
							_this3.view.playEffect('line');
						}
					}, 200);
				}

				if (result && result.delete) {
					result.delete.forEach(function (brick) {
						_this3.view.delete(brick.position);
					});
				}

				if (result && result.draw) {
					result.draw.forEach(function (brick) {
						_this3.view.draw(brick.position, brick.type);
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
		}, {
			key: 'start',
			value: function start() {
				if (!this.gameover) {
					this.view.dismissModal();
					this.game.start();
					this.view.setMusic(this.game.trackList[0]);
					this.operate('nextTetromino');
					this.cycle = this.fall();
				}
			}
		}, {
			key: 'pause',
			value: function pause() {
				this.paused = true;
				this.stopFall();
				this.view.musicPlayer.pause();
				this.view.drawMessage('Pause');
			}
		}, {
			key: 'resume',
			value: function resume() {
				this.paused = false;
				this.resetFall();
				this.view.musicPlayer.play();
				this.view.undrawMessage();
			}
		}]);

		return Controller;
	}();

/***/ },
/* 5 */
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

			var windowHeigth = window.innerHeight;

			this.cellSize = windowHeigth / 26;
			document.body.style.fontSize = this.cellSize * 0.5 + 'px';

			this.modal = document.getElementById('modal');
			this.modal.style.bottom = this.cellSize * 21 + 'px';
			this.modal.style.width = this.cellSize * 10 + 'px';
			this.modal.style.height = this.cellSize * 21 + 'px';

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
			this.panel.style.top = this.cellSize * 2 + 'px';

			this.next = document.getElementById('next');
			this.next.setAttribute('width', this.cellSize * 4);
			this.next.setAttribute('height', this.cellSize * 2);

			this.drawLevel(0);
			this.drawScore(0);

			this.messages = document.getElementById('messages');

			this.musicPlayer = document.getElementById('music');
			this.track = document.getElementById('music-track');

			this.effectPlayer = document.getElementById('effects');
			this.effect = document.getElementById('effect-src');

			// setTimeout(() => {this.stopMusic();}, 5000);
		}

		_createClass(View, [{
			key: 'draw',
			value: function draw(cell, type) {
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
		}, {
			key: 'delete',
			value: function _delete(cell) {
				var allCellsMatchPos = document.querySelectorAll('[x="' + cell[1] * this.cellSize + '"][y="' + cell[0] * this.cellSize + '"]');

				if (allCellsMatchPos) {
					var cellElem;

					for (var _cell = 0; _cell < allCellsMatchPos.length; _cell++) {
						if (allCellsMatchPos[_cell].parentNode == this.board) {
							cellElem = allCellsMatchPos[_cell];
						}
					}
					// console.log(allCellsMatchPos);
					// console.log(cellElem);
					if (cellElem) {
						this.board.removeChild(cellElem);
					}
				}
			}
		}, {
			key: 'drawLevel',
			value: function drawLevel(level) {
				var levelElm = document.getElementById('level');
				levelElm.innerHTML = level;
			}
		}, {
			key: 'drawNext',
			value: function drawNext(type) {
				this.next.innerHTML = '';
				var color = this.colors[type];
				var tetro = document.createElementNS("http://www.w3.org/2000/svg", 'g');
				tetro.setAttribute('fill', color);

				switch (type) {
					case 'I':
						for (var i = 0; i < 4; i++) {
							var brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
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
						for (var _i = 0; _i < 2; _i++) {
							for (var j = 0; j < 2; j++) {
								var _brick = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
								_brick.setAttribute('width', this.cellSize * 0.8);
								_brick.setAttribute('height', this.cellSize * 0.8);
								_brick.setAttribute('x', this.cellSize * 1.2 + _i * this.cellSize * 0.8);
								_brick.setAttribute('y', this.cellSize * 0.2 + j * this.cellSize * 0.8);
								_brick.setAttribute('rx', this.cellSize * 0.8 / 10);
								_brick.setAttribute('ry', this.cellSize * 0.8 / 10);
								_brick.setAttribute('fill', color);
								tetro.appendChild(_brick);
							}
						}
						break;
					case 'T':
						for (var _i2 = 0; _i2 < 3; _i2++) {
							for (var _j = 0; _j < 2; _j++) {
								if (_j === 0 && _i2 == 1 || _j == 1) {
									var _brick2 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
									_brick2.setAttribute('width', this.cellSize * 0.8);
									_brick2.setAttribute('height', this.cellSize * 0.8);
									_brick2.setAttribute('x', this.cellSize * 0.8 + _i2 * this.cellSize * 0.8);
									_brick2.setAttribute('y', this.cellSize * 0.2 + _j * this.cellSize * 0.8);
									_brick2.setAttribute('rx', this.cellSize * 0.8 / 10);
									_brick2.setAttribute('ry', this.cellSize * 0.8 / 10);
									_brick2.setAttribute('fill', color);
									tetro.appendChild(_brick2);
								}
							}
						}
						break;
					case 'S':
						for (var _i3 = 0; _i3 < 3; _i3++) {
							for (var _j2 = 0; _j2 < 2; _j2++) {
								if (_j2 === 0 && (_i3 == 1 || _i3 == 2) || _j2 === 1 && (_i3 == 0 || _i3 == 1)) {
									var _brick3 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
									_brick3.setAttribute('width', this.cellSize * 0.8);
									_brick3.setAttribute('height', this.cellSize * 0.8);
									_brick3.setAttribute('x', this.cellSize * 0.8 + _i3 * this.cellSize * 0.8);
									_brick3.setAttribute('y', this.cellSize * 0.2 + _j2 * this.cellSize * 0.8);
									_brick3.setAttribute('rx', this.cellSize * 0.8 / 10);
									_brick3.setAttribute('ry', this.cellSize * 0.8 / 10);
									_brick3.setAttribute('fill', color);
									tetro.appendChild(_brick3);
								}
							}
						}
						break;
					case 'Z':
						for (var _i4 = 0; _i4 < 3; _i4++) {
							for (var _j3 = 0; _j3 < 2; _j3++) {
								if (_j3 === 0 && (_i4 === 0 || _i4 == 1) || _j3 === 1 && (_i4 == 1 || _i4 == 2)) {
									var _brick4 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
									_brick4.setAttribute('width', this.cellSize * 0.8);
									_brick4.setAttribute('height', this.cellSize * 0.8);
									_brick4.setAttribute('x', this.cellSize * 0.8 + _i4 * this.cellSize * 0.8);
									_brick4.setAttribute('y', this.cellSize * 0.2 + _j3 * this.cellSize * 0.8);
									_brick4.setAttribute('rx', this.cellSize * 0.8 / 10);
									_brick4.setAttribute('ry', this.cellSize * 0.8 / 10);
									_brick4.setAttribute('fill', color);
									tetro.appendChild(_brick4);
								}
							}
						}
						break;
					case 'J':
						for (var _i5 = 0; _i5 < 3; _i5++) {
							for (var _j4 = 0; _j4 < 2; _j4++) {
								if (_j4 === 0 && _i5 === 0 || _j4 == 1) {
									var _brick5 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
									_brick5.setAttribute('width', this.cellSize * 0.8);
									_brick5.setAttribute('height', this.cellSize * 0.8);
									_brick5.setAttribute('x', this.cellSize * 0.8 + _i5 * this.cellSize * 0.8);
									_brick5.setAttribute('y', this.cellSize * 0.2 + _j4 * this.cellSize * 0.8);
									_brick5.setAttribute('rx', this.cellSize * 0.8 / 10);
									_brick5.setAttribute('ry', this.cellSize * 0.8 / 10);
									_brick5.setAttribute('fill', color);
									tetro.appendChild(_brick5);
								}
							}
						}
						break;
					case 'L':
						for (var _i6 = 0; _i6 < 3; _i6++) {
							for (var _j5 = 0; _j5 < 2; _j5++) {
								if (_j5 === 0 && _i6 == 2 || _j5 == 1) {
									var _brick6 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
									_brick6.setAttribute('width', this.cellSize * 0.8);
									_brick6.setAttribute('height', this.cellSize * 0.8);
									_brick6.setAttribute('x', this.cellSize * 0.8 + _i6 * this.cellSize * 0.8);
									_brick6.setAttribute('y', this.cellSize * 0.2 + _j5 * this.cellSize * 0.8);
									_brick6.setAttribute('rx', this.cellSize * 0.8 / 10);
									_brick6.setAttribute('ry', this.cellSize * 0.8 / 10);
									_brick6.setAttribute('fill', color);
									tetro.appendChild(_brick6);
								}
							}
						}
						break;
				}

				this.next.appendChild(tetro);
			}
		}, {
			key: 'drawScore',
			value: function drawScore(score) {
				var scoreElm = document.getElementById('score');
				scoreElm.innerHTML = score;
			}
		}, {
			key: 'setMusic',
			value: function setMusic(track) {
				this.track.src = 'assets/' + track + '.mp3';
				this.musicPlayer.load();
				this.musicPlayer.play();
			}
		}, {
			key: 'stopMusic',
			value: function stopMusic() {
				this.musicPlayer.pause();
				this.musicPlayer.currentTime = 0;
			}
		}, {
			key: 'playEffect',
			value: function playEffect(effect) {
				this.effect.src = 'assets/' + effect + '.mp3';
				this.effectPlayer.load();
				this.effectPlayer.play();
			}
		}, {
			key: 'drawMessage',
			value: function drawMessage(message) {
				var _this = this;

				this.messages.innerHTML = message;

				if (message != 'Game over' && message != 'Pause') {
					this.messages.className += ' fadeout';

					window.setTimeout(function () {
						_this.undrawMessage();
					}, 2000);
				}
			}
		}, {
			key: 'undrawMessage',
			value: function undrawMessage() {
				this.messages.innerHTML = '';
				this.messages.className = 'messages';
			}
		}, {
			key: 'dismissModal',
			value: function dismissModal() {
				this.modal.className += ' hide';
			}
		}]);

		return View;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ctrl = __webpack_require__(4);

	var ctrl;

	window.onload = function () {
		ctrl = new _ctrl.Controller();
	};

/***/ }
/******/ ]);