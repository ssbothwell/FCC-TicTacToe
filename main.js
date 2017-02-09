window.onload = function() {
  var squares = document.querySelectorAll('.square');
  var statusArea = document.querySelector('#statusArea');
  var statusArea= document.querySelector('#statusArea').childNodes;
  var game = new State();
  for (var i = 0; i < squares.length; i++) {
    function clickHandler(i) {
      squares[i].onclick = function() {
        if (squares[i].innerHTML === "") {
          if (game.isTerminal() === false) {
            squares[i].innerHTML = 'X';
            updateBoard(i, game);
          }
        }
      }  
    }
    clickHandler(i);
  }

  function updateBoard(playerMove, state) {
    state.board[playerMove] = 'X';
    if (state.isTerminal() === false) {
      var ai = aiMove(state);
      game.board[ai] = 'O';
      squares[ai].innerHTML = 'O';
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
    statusArea[3].innerHTML = '';

  }  
}
