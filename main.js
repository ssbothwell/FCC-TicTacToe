window.onload = function() {
  var squares = document.querySelectorAll('.square');
  for (var i = 0; i < squares.length; i++) {
    function clickHandler(i) {
      squares[i].onclick = function() {
        console.log(i);
      }  
    }
    clickHandler(i);
  }
}
