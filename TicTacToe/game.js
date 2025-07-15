let boxes = document.querySelectorAll(".btn");
let reset = document.querySelector(".resetButton");
let message = document.querySelector(".turnMsg");
let turnO = true;
let countTotalPress = 0;
let winnerFound = false;
message.innerText = "Player O turn";
let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || winnerFound) return;
    if (turnO) {
      countTotalPress++;
      turnO = false;
      box.innerText = "O";
      message.innerText = "Player X turn";
      //console.log("O was press the button");
    } else {
      countTotalPress++;
      turnO = true;
      box.innerText = "X";
      message.innerText = "Player O turn";
      //console.log("X was press the button");
    }
    //box.disabled = true;
    checkWinner();
  });
});

let checkWinner = () => {
  for (let pattern of winPattern) {
    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;
    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        //console.log("Winner is : " + position1);
        winnerFound = true;
        message.innerText = "Player " + position1 + " win the game.";
        return;
      }
    }
  }
  if (countTotalPress === 9 && !winnerFound) {
    //console.log("No one is winner!");
    message.innerText = "No one is Winner! Match draw.";
  }
};

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
  });
  turnO = true;
  countTotalPress = 0;
  winnerFound = false;
  //console.log("The reset button was pressed!");
  message.innerText = "Player O turn";
});
