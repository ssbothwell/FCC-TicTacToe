// Board state 'object'
function State(old) {
  // Prior board states can be loaded in during minmax recursion
  if (typeof old !== 'undefined') {
    this.board = old.board.slice(0);
  } else {
  // Otherwise start with empty board
    this.board = ['E','E','E','E','E','E','E','E','E'];  
  }
  // Terminal game flag
  this.result = 'active';
  // Current player flag
  this.turn = "X";
  // Label to identify move that results in this state during recursion
  this.element = "";
  // Function to switch active player for minmax scoring
  this.advanceTurn = function() {
    this.turn = this.turn === "X" ? "O" : "X";
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
    if (state.result === 'X') {
      return  -10; 
    } else if (state.result === 'O') {  
      return 10;
    } else {
      return 0;
    }
  } else {
      // This stores the minmax value for this state
      // (computed recursively from further nested states)
      var stateScore; 
      // Set initial value for stateScore based on active
      // player in this state. Values are simply, higher 
      // lower then minmax scores to ensure conditionals
      // are triggered correctly.
      if (state.turn === 'X') {
        stateScore = -1000;
      } else {
        stateScore = 1000;
      }  
    }  
  
  // 2) Generate list of possible new game states (moves) 
  newStatesSet = state.moves().map(function (el) {
    var newState = new State(state);
    newState.board[el] = state.turn.slice(0);
    newState.advanceTurn();
    newState.element = el;
    return newState;
  });  

  // 3) For each of these states, add the minmax score of 
  // that state to the scoreList
  newStatesSet.forEach(function(newState) {
    var newStateScore = minmax(newState);
    if (state.turn === 'X') {
      // X wants to maximize. Updated on greater than.
      if (newStateScore > stateScore) {
        stateScore = newStateScore;
      }  
    } else {
      // O wants to minimize. Updated on less than.
      if (newStateScore < stateScore) {
        stateScore = newStateScore;
      }
    }  
  });
  return stateScore;
}

function aiMove(state) {
  var possibleMoves = game.moves();
  var possibleScores = [];
  possibleMoves.map(function(el) {
    var newState = new State(state);
    newState.board[el] = 'O';
    possibleScores.push(minmax(newState));
  });

  function indexOfMax(arr) {
    var max = arr.reduce(function(a,b) {
      return b > a ? b : a;   
    });
    return arr.indexOf(max);
  }
  return possibleMoves[indexOfMax(possibleScores)];
}  

//var game = new State();
//game.board = ['X','X','O',
//              'E','O','E',
//              'E','E','E']
//console.log(aiMove(game));
