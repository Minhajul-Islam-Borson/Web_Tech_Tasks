let userScore = 0;
let computerScore = 0;
let computerParagraph = document.querySelector(".cntWinner .computer p");
let humanParagraph = document.querySelector(".cntWinner .human p");
let showWinner = document.querySelector(".showingWinner");
let choices = document.querySelectorAll(".cmnButtonProperty");
let resetButton = document.querySelector(".reset button");
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})
resetButton.addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    humanParagraph.innerText = 0;
    computerParagraph.innerText = 0;
    showWinner.innerText = "Start the game!";
})
const generateComputerChoice = () =>{
    const options = ["rock" , "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    computerChoice = options[index];
    return computerChoice;
}

const playGame = (userChoice)=>{
    const computerChoice = generateComputerChoice();
    //console.log("The User choice is : " + userChoice);
    //console.log("The Computer choice is : " + computerChoice);
    if((userChoice == "rock" && computerChoice == "rock")
        || (userChoice == "paper" && computerChoice == "paper")
        ||(userChoice == "scissors" && computerChoice == "scissors")){
            showWinner.innerText = "The match is draw";
        }
    else if((userChoice == "rock" && computerChoice == "scissors")
        || (userChoice == "scissors" && computerChoice == "paper")
        || (userChoice == "paper" && computerChoice == "rock")){
            //console.log("User is winner ");
            userScore++;
            humanParagraph.innerText = userScore;
            showWinner.innerText = "User is winner";
    }else {
        //console.log("The Computer is winner");
        computerScore++;
        computerParagraph.innerText = computerScore;
        showWinner.innerText = "Computer is winner"
    }
}