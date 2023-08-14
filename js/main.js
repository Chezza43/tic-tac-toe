  const colors = {
    '1': 'red',
    '-1': 'blue',
    'null': 'white'
  };

  const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  let board, turn, winner;
  const message = document.querySelector('h1');
  const playAgainBtn = document.querySelector('button');

  document.getElementById('board').addEventListener('click', handleMove);
  playAgainBtn.addEventListener('click', init);

  init();

  function init() {
    board = new Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
  }

function handleMove(evt) {
    const idx = parseInt(evt.target.id.replace('sq-', ''));
    if (isNaN(idx) || board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }

  function getWinner() {
    for (let i = 0; i < winCombos.length; i++) {
      if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + board[winCombos[i][2]]) === 3) return board[winCombos[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
  }

  function render(){
    renderBoard();
    renderMessage();
    playAgainBtn.disabled = !winner
  }

  function renderBoard(){
    board.forEach(function(sqVal, idx){
        const squareEl = document.getElementById(`sq-${idx}`);
        squareEl.style.backgroundColor = colors[sqVal]
        squareEl.className = !sqVal ? 'avail' : '';
    })
  }

  function renderMessage(){
    if(winner === 'T'){
        message.innerHTML = 'Draw.'
    }else if(winner){
        message.innerHTML = `Congrats <span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span>!`
    }else{
        message.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s Turn`;
    }
  }
