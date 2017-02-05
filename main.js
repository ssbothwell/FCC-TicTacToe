window.onload = function() {
  var squares = document.querySelectorAll('.square');

  for (var i = 0; i < squares.length; i++) {
    function clickHandler(i) {
      squares[i].onclick = function() {
        if (squares[i].innerHTML === "") {
          squares[i].innerHTML = 'X';
          game = new State();
          updateBoard(game);
        }
        
      }  
    }
    clickHandler(i);
  }

  function updateBoard(state) {
    state.board = Array.prototype.map.call(squares, function(el) {
      if (el.innerHTML === ""){
        return 'E';
      }
      return el.innerHTML;
    });
    console.log(state.board); 
    squares[aiMove(state)].innerHTML = 'O';
  }
}
