window.onload = function() {
  var squares = document.querySelectorAll('.square');
  var statusArea = document.querySelector('#statusArea');
  var statusArea= document.querySelector('#statusArea').childNodes;
  var chooseSymbol = document.querySelector('#chooseSymbol');
  var x = document.querySelector('#X');
  var o = document.querySelector('#O');
  var player;
  var aiPlayer;
  var playerHasPicked = false;
  var game = new State();

  for (var i = 0; i < squares.length; i++) {
    function clickHandler(i) {
      squares[i].onclick = function() {
        if (playerHasPicked === true) {
          if (squares[i].innerHTML === "") {
            if (game.isTerminal() === false) {
              squares[i].innerHTML = player;
              setTimeout(function () { updateBoard(i, game);}, 500);
            }
          }
        }
      }  
    }
    clickHandler(i);
  }
  
  x.onclick = function() {
    player = 'X';
    aiPlayer = 'O';
    playerHasPicked = true;
    chooseSymbol.style.display = 'none';
  }  

  o.onclick = function() {
    player = 'O';
    aiPlayer = 'X';
    playerHasPicked = true;
    game.aiSymbol = 'X';
    game.playerSymbol = 'O';
    var firstMove = getRandomInt(0,8);
    setInterval(function(){ squares[firstMove].innerHTML = 'X';}, 500);
    game.board[firstMove] = 'X';
    game.turn = 'O';
    console.log(game.turn);
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
        statusArea[1].innerHTML = 'DRAW!!';
      } else {
        statusArea[1].innerHTML = state.result + ' WINS!!';
      }  
      statusArea[3].innerHTML = "Click <a href='#' id='newGame'>here</a> to play again"; 
      var newGame = document.querySelector('#newGame');
      newGame.onclick = function() {
        resetGame(state);
        playerHasPicked = false;
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
    chooseSymbol.style.display = 'block';

  }  
}
