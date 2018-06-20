Mancala

About:
  This game was made using HTML, CSS, Javascript, and JQuery.
  It was created by using IDs to map all of the pits to indexes in an array, which was then used to hold the number of stones occupying each pit. Due to the ordering the pits, stones can be moved around the board simply by incrementing the array index being added to.

Instructions:
  Setup:
    Each player starts with a number of stones in their respective pits, and none in their goal pits (to the left from the player's point of view). The game is displayed from the point of view of Player 1.
  Gameplay:
    On each player's turn, they select one of their pits to move stones from. The contents of the selected pit are distributed into the other pits, moving counterclockwise.
    If a player's final stone lands in their own goal, they get to make another move.
    If a player's final stone lands in an empty pit on their side, and there are stones in the opposing pit on the other player's side, all of these stones are added to the player's goal pit.
    If one player is unable to move, the other player repeatedly moves until the other player has moves available.
  Ending the Game:
    If neither player has any valid moves (all of the stones are in one player's goal or the other), the game is over. Count out the stones in each player's goal pit. The player with the most stones is the winner!
