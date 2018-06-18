//no intention of ever changing this, but hey, scalability
const rowLength = 6;
//no intention of ever changing this, but hey, rule variations
const startStones = 4;
//instantiate the board here so all functions can access it
let boardState = [];
//flag to show whos turn it is
let isP1Turn = true;
let gameOver = false;

//render the number of stones into the divs on the page
//dependency of functions down the page
const render = () => {
  for (let i = 0; i < boardState.length; i++) {
    $('#' + i).text(boardState[i]);
  }
  if (isP1Turn) {
    $('.centerPiece').text("Player 1's Turn");
  } else {
    $('.centerPiece').text("Player 2's Turn");
  }
}

//check if move results in a capture
const checkCapture = (endPit) => {
  //criteria for capture are as follows
  //endPit is on player's side
  //endPit was empty (currently has 1)
  //pit opposite endPit is not empty
  //set num to be captured so we don't have to declare this twice later
  let numCaptured = boardState[endPit] + boardState[rowLength * 2 - endPit];

  if ((boardState[endPit] == 1) && (boardState[rowLength * 2 - endPit] > 0)) {
    //if endPit only has 1 and is on player's side, do capture
    if (isP1Turn && $('#' + endPit).hasClass('p1RowPit')) {
      boardState[rowLength] += numCaptured;
      boardState[endPit] = 0;
      boardState[rowLength * 2 - endPit] = 0;
    } else if (!isP1Turn && $('#' + endPit).hasClass('p2RowPit')) {
      boardState[rowLength * 2 + 1] += numCaptured;
      boardState[endPit] = 0;
      boardState[rowLength * 2 - endPit] = 0;
    }
  }
}

//end of game screen
const endGameScreen = () => {
  const p1Score = boardState[rowLength];
  const p2Score = boardState[rowLength * 2 + 1];
  if (p1Score > p2Score) {
    $('.centerPiece').text("Player 1 Wins!");
  } else if (p1Score < p2Score) {
    $('.centerPiece').text("Player 2 Wins!");
  } else {
    $('.centerPiece').text("It's a tie!");
  }
}

//set which pits are clickable
//dependency of functions down the page
const setClickable = () => {
  //if it's going to be p1's turn, set the appropriate pits clickable
  //cannot choose empty pits
  if (isP1Turn) {
    $('.p2RowPit').off().removeClass('clickable');
    const $p1Pits = $('.p1RowPit');
    for (let i = 0; i < $p1Pits.length; i++) {
      if (boardState[i] != 0) {
        $p1Pits.eq(i).addClass('clickable').off().on('click', takeTurn);
      }
    }
  } else {
    $('.p1RowPit').off().removeClass('clickable');
    const $p2Pits = $('.p2RowPit');
    for (let i = 0; i < $p2Pits.length; i++) {
      if (boardState[(rowLength * 2 - i)] != 0) {
        $p2Pits.eq(i).addClass('clickable').off().on('click', takeTurn);
      }
    }
  }
}

//function to check if game is over
//totals values in boardState, subtracts amounts in side pits, and checks if the result is 0
const checkIsGameOver = () => {
  let total = 0;
  //get sum
  boardState.forEach((element) => {
    total+=element;
  });
  //subtract side pits
  total-=boardState[rowLength];
  total-=boardState[rowLength * 2 + 1];
  if (total == 0) {
    gameOver = true;
  }
}
//determine if turn passes
const nextTurn = () => {
  let pitTotal = 0;
  //if p1 just took a turn, check if p2 has any valid moves
  if (isP1Turn) {
    for (let i = (rowLength + 1); i <= (rowLength * 2); i++) {
      pitTotal+=boardState[i];
    }
  } else { //otherwise check if p1 has any valid moves
    for (let i = 0; i < rowLength; i++) {
      pitTotal+=boardState[i];
    }
  }

  //if next player has a valid move, switch turns and set clickable objects
  if (pitTotal > 0) {
    isP1Turn = (!isP1Turn);
    setClickable();
  } else {
    //otherwise, just set the new list of clickable objects
    setClickable();
  }
}

//create the pits in the upper/lower rows, set indexes for sides
const setPits = () => {
  //create pits for each player's side
  //bottom (p1) pits are 0-(rowLength-1)
  //p1 side pit is rowlength
  //top (p2) pits are (rowLength+1)-(rowLength*2)
  //p2 side pit is (rowLength*2 + 1)
  //these will be used to reference their respective indexes in array for number of stones in each
  //for rowLength 6, looks like this
  //  |13| 12 11 10 9  8  7  |6|
  //  |  | 0  1  2  3  4  5  | |
  // at the same time, set up boardState array
  //start by emptying boardState
  boardState = [];

  //p1 pits
  //place stones in each
  //set on-click event
  //set clickable class
  for (let i = 0; i < rowLength; i++) {
    const $newPit = $('<div>')
      .addClass('p1RowPit')
      .addClass('clickable')
      .attr('id', i)
      .on('click', takeTurn);
    $('#player1Row').append($newPit)
    boardState.push(startStones);
  }

  //add index to p1 side pit
  $('#player1Goal').attr('id', rowLength)
  //set number of stones to 0
  boardState.push(0);

  //p2 pits
  //we reverse the order here, or we use flex to reverse the order
  //doesn't matter which, but it needs to be done
  //see beautiful diagram above
  for (let i = (rowLength * 2); i >= (rowLength + 1); i--) {
    const $newPit = $('<div>')
      .addClass('p2RowPit')
      .attr('id', i);
    $('#player2Row').append($newPit)
    boardState.push(startStones);
  }

  //add index to p2 side pit
  $('#player2Goal').attr('id', (rowLength * 2 + 1));
  boardState.push(0);
  render();
}

//code for reacting to the player choosing which pit to move
const takeTurn = (event) => {
  //get index of chosen pit
  const chosenPit = $(event.currentTarget).attr('id');
  //get number of stones in chosen pit
  const stonesChosen = boardState[chosenPit];
  //empty the chosen pit in preparation for move
  boardState[chosenPit] = 0;
  //get index of pit for final stone
  const endPit = (1*chosenPit + stonesChosen) % (rowLength * 2 + 2);
  //starting with the pit immediately following the chosen pit, place 1 stone in each pit
  for (let targetPit = (1*chosenPit + 1);targetPit <= (1*chosenPit + 1*stonesChosen); targetPit++) {
    let boardIndex = targetPit % (rowLength * 2 + 2);
    boardState[boardIndex]+=1;
  }
  //check if player captures
  checkCapture(endPit);
  //switch turn TODO: implement checking for repeat turn
  // isP1Turn = (!isP1Turn);
  //check if game is over
  checkIsGameOver();
  //if game is over, follow path
  if (gameOver) {
    render();
    endGameScreen();
  } else if ((isP1Turn && (endPit == rowLength)) || (!isP1Turn && (endPit == (rowLength * 2 + 1)))) {
    //if player's token ended in their score pit, go again
    //first, we flip the flag so it looks like the opposite player just went
    isP1Turn = (!isP1Turn);
    //then process turn result as normal
    nextTurn();
    //render
    render();
  } else {
    //otherwise proceed as normal
    //invoke function to check whether other player has legal moves, switches turn flag appropriately
    nextTurn();
    //render board
    render();
  }
}

$( () => {
  setPits();
})
