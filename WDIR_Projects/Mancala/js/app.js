//no intention of ever changing this, but hey, scalability
const rowLength = 6;
//no intention of ever changing this, but hey, rule variations
const startStones = 4;
//instantiate the board here so all functions can access it
const boardState = [];
//flag to show whos turn it is
let isP1Turn = true;

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

  //p1 pits
  for (let i = 0; i < rowLength; i++) {
    const $newPit = $('<div>')
      .addClass('rowPit')
      .addClass('pit')
      .attr('index', i);
    $('#player1Row').append($newPit)
  }

  //add index to p1 side pit
  $('#player1Goal').attr('index', rowLength)

  //p2 pits
  //we reverse the order here, or we use flex to reverse the order
  //doesn't matter which, but it needs to be done
  //see beautiful diagram above
  for (let i = (rowLength * 2); i >= (rowLength + 1); i--) {
    const $newPit = $('<div>')
      .addClass('rowPit')
      .addClass('pit')
      .attr('index', i);
    $('#player2Row').append($newPit)
  }

  //add index to p2 side pit
  $('#player2Goal').attr('index', (rowLength * 2 + 1));
}

$( () => {
  console.log('test');
  setPits();
})
