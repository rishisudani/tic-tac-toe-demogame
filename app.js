let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg");
let winMsg = document.querySelector("#winmsg");
let mainContainer = document.querySelector(".main");

let player1 = true;

let clickCount = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

const resetGame = () => {
    player1 = true;
    enableBoxes();
    clickCount = 0;
    mainContainer.classList.remove("hide");
    console.log("button is clicked");
    console.log(clickCount);
};

const enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    };
};

const disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;
    };
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1) {
           box.innerText = "X";
           player1 = false;
        }
        else {
            box.innerText = "O";
            player1 = true;
        };

        box.disabled = true;
        clickCount++;
        checkWinner ();
        checkDraw();
        console.log(clickCount);
    });
});

const checkDraw = () => {
    if (clickCount >= 9) {
        winMsg.innerText = "The Game is Draw";
        msgContainer.classList.remove("hide");
        mainContainer.classList.add("hide");
        disableBoxes();
    }
};

const showWinner = (winner) => {
    winMsg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    mainContainer.classList.add("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {

        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if(pos1value != "" && pos2value != "" && pos3value != ""){

            if (pos1value === pos2value && pos2value === pos3value) {

                console.log("Winner is", pos1value);
                showWinner(pos1value);
            };
        };
    };
};

resetbtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);
