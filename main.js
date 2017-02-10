window.onload = function() {
  var squares = document.querySelectorAll('.square');
  var statusArea = document.querySelector('#statusArea');
  var statusArea= document.querySelector('#statusArea').childNodes;
  var chooseSymbol = document.querySelector('#chooseSymbol');
  var x = document.querySelector('#X');
  var o = document.querySelector('#O');
  var player = 'X';
  var aiPlayer = 'O';
  var game = new State();


  for (var i = 0; i < squares.length; i++) {
    function clickHandler(i) {
      squares[i].onclick = function() {
        if (squares[i].innerHTML === "") {
          if (game.isTerminal() === false) {
            squares[i].innerHTML = player;
            updateBoard(i, game);
          }
        }
      }  
    }
    clickHandler(i);
  }
  
  x.onclick = function() {
    player = 'X';
    aiPlayer = 'O';
    chooseSymbol.style.display = 'none';
  }  

  o.onclick = function() {
    player = 'O';
    aiPlayer = 'X';
    var firstMove = getRandomInt(0,8);
    squares[firstMove].innerHTML = 'X';
    game.board[firstMove] = 'X';
    chooseSymbol.style.display = 'none';

  }  
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateBoard(playerMove, state) {
    state.board[playerMove] = player;
    if (state.isTerminal() === false) {
      var ai = aiMove(state);
      game.board[ai] = aiPlayer;
      squares[ai].innerHTML = aiPlayer;
   } 
   if (state.isTerminal() === true) {   
      if (state.result === 'DRAW') {
        statusArea[1].innerHTML = 'DRAW!!!';
      } else {
        statusArea[1].innerHTML = state.result + ' WINS!!';
      }  
      statusArea[3].innerHTML = "Click <a href='#' id='newGame'>here</a> to play again"; 
      var newGame = document.querySelector('#newGame');
      newGame.onclick = function() {
        resetGame(state);
      }  
      return;
    }
  }

  function resetGame(state) {
    state.board = state.board.map(function() {return "E";});
    squares.forEach(function(el) {
      el.innerHTML = '';
    });  
    statusArea[1].innerHTML = '';
    statusArea[3].innerHTML = "Do you want to play <a href='#' id='X'>X</a> or <a href='#' id='O'>O</a>?";

  }  
}
