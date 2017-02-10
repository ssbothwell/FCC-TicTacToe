// Board state 'object'
function State(old) {
  // Prior board states can be loaded in during minmax recursion
  if (typeof old !== 'undefined') {
    this.board = old.board.slice(0);
    this.turn = old.turn.slice(0);
    this.aiSymbol = old.aiSymbol.slice(0);
    this.playerSymbol = old.playerSymbol.slice(0);
  } else {
  // Otherwise start with empty board, and player is X
    this.board = ['E','E','E','E','E','E','E','E','E'];  
    this.turn = 'X';
    this.aiSymbol = 'O';
    this.playerSymbol = 'X';
  }
  // Terminal game flag
  this.result = 'active';
  // Label to identify move that results in this state during recursion
  this.element = '';
  // Function to switch active player for minmax scoring
  this.advanceTurn = function() {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  }
  // Function to determine if game is complete
  this.isTerminal = function() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.board[a] !== 'E' && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.result = this.board[a];
        return true;
      } 
    } 
    if (this.moves().length < 1) {
        this.result = 'DRAW';
        return true;
    }
    return false;
  }
  // Function to find all possible moves
  this.moves = function() {
    arr = this.board.reduce(function(array,el,index){
      if (el === 'E') {
        array.push(index);
      }
      return array;
    },[]);
    return arr;
  }
}

// Recursive minmax function
function minmax(state) {
  // 1) If the state is terminal, return the score from O's perspective
  if (state.isTerminal() === true) {
    if (state.result === state.playerSymbol) {
      return  -10; 
    } else if (state.result === state.aiSymbol) {  
      return 10;
    } else {
      return 0;
    }
  } 
  
  // Generate list of possible new game states (moves) 
  newStatesSet = state.moves().map(function (el) {
    var newState = new State(state);
    newState.board[el] = state.turn.slice(0);
    newState.advanceTurn();
    newState.element = el;
    return newState;
  });  
  // Array to hold all child scores
  var newStateScores = [];

  // For each of these states, add the minmax score of 
  // that state to the scoreList
  newStatesSet.forEach(function(newState) {
    var newStateScore = minmax(newState);
    newStateScores.push(newStateScore);
  });
  if (state.turn === state.playerSymbol) {
    stateScore = Math.min(...newStateScores);
  } else {
    stateScore = Math.max(...newStateScores);
  }
  return stateScore;
}

function aiMove(state) {
  var possibleScores = [];
  var possibleMoves = [];
  var possibleStates = state.moves().map(function(el) {
    var newState = new State(state);
    possibleMoves.push(el);
    newState.board[el] = state.aiSymbol;
    possibleScores.push(minmax(newState));
    return newState;
  });
  if (possibleMoves.length < 1) {
    return -1;
  }
  function indexOfMax(arr) {
    var max = arr.reduce(function(a,b) {
      return b > a ? b : a;   
    });
    return arr.indexOf(max);
  }
  return possibleMoves[indexOfMax(possibleScores)];
}  

//var game = new State();
//game.board = ['O','X','O',
//              'E','E','E',
//              'X','E','X']
//game.turn = 'O';
//game.aiSymbol = 'X';
//game.playerSymbol = 'O';
////console.log(minmax(game));
//console.log(aiMove(game));
