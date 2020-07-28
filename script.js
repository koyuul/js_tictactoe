//gameboard module
const gameBoard = (function(){
    //template
    boardValue = ['☐', '☐', '☐',
            '☐', '☐', '☐',
            '☐', '☐', '☐'];
    
    //turn each square into its own seperate object with its value, and position
    boardOfObjects = [];
    boardValue.forEach(function (val, i){
        boxObject = new boxConstructor(val, i);
        boardOfObjects.push(boxObject);
    });
    function boxConstructor(val, pos)  {
        this.val = val;
        this.pos = pos;
        
        this.buttonDiv = document.createElement("div");
        this.buttonDiv.id = "buttonDiv";
        
        this.content = document.createElement("p");
        this.content.innerText = val;

        this.buttonDiv.appendChild(this.content);
        this.buttonDiv.addEventListener("click", function(){
            if (this.innerText === "☐"){
                currentPlayer.click(this);
                boardValue[pos] = currentPlayer.symbol;
            }
            if (checkWin() === false){
                switchPlayers();
            }
        }.bind(this.content))
        return (this);
    };

    function checkWin(){
        function allMatch(i1, i2, i3){
            if (boardValue[i1] === boardValue[i2] && boardValue[i2] === boardValue[i3] && boardValue[i1] === boardValue[i3]){
                if (boardValue[i1] == "☐") return false;
                else return true;
            }
            else return false;
        }

        if (allMatch(0, 1, 2) || allMatch(3, 4, 5) || allMatch(6, 7, 8) || //hwin
         allMatch(0, 3, 6) || allMatch(1, 4, 7) || allMatch(2, 5, 8) || //vwin
         allMatch(0, 4, 8) || allMatch(2, 4, 6)){ //dwin
                alert(`${currentPlayer.symbol} player has won.`);
                return true;
            }
        else if (!boardValue.includes("☐")){
            alert("Tie game.")
        }
        else {
            return false;
        }
    }

    function switchPlayers(){
        if (currentPlayer === playerX ){
            currentPlayer = playerO;
        }
        else if (currentPlayer === playerO){
            currentPlayer = playerX;
        }
    }


    return {boardValue, boardOfObjects};
})();

//create players
function playerConstructor(symbol){
    this.symbol = symbol;
    this.click = function click(para){
        para.innerText = this.symbol;
    }
}
const playerX = new playerConstructor("x");
const playerO = new playerConstructor("o");
let currentPlayer = playerX;

// change the type to div because of css reasons
const displayController = (function (){
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.id = "gameBoardDiv";
    boardOfObjects.forEach(obj => {
        gameBoardDiv.appendChild(obj.buttonDiv);        
    });
    document.body.appendChild(gameBoardDiv);
})();

