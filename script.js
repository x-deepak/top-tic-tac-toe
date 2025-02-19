

function createGameboard(){
    let gameboard = [[null, null, null],[null, null, null],[null, null, null]];
    let moveCount = 0;
    function refresh(name1,name2,instantRefresh=false){
        moveCount = 0;
        gameboard = [[null, null, null],[null, null, null],[null, null, null]];
        if (!instantRefresh){
            console.log("Clearing board in 2 secs..")
            let waitTime = 2000;
            setTimeout(updateSpaces,waitTime);
            setTimeout(updateBanner,waitTime,name1,name2);
            setTimeout(updateResult,waitTime, "");

            console.log(gameboard)
        }
        else{
            updateSpaces();
            updateBanner(name1,name2);
            updateResult("");
        }
    }
    function getMoveCount(){ return moveCount;}
    function makeMove(i,j){
        if(gameboard[i][j]==null){
            let user_sign = (moveCount%2==0)? "X": "0";
            gameboard[i][j]=user_sign;
            moveCount++;
        }
    }

    function populateSpaces(){
        let container = document.querySelector(".container");
        for (let i=0; i<9; i++){
            let spaces = document.createElement("div");
            spaces.innerText = "";
            spaces.classList.add("spaces");
            spaces.id = `id${+i}`;
            container.appendChild(spaces);
        }
    }
    
    function updateSpaces(){
        for (let i=0; i<9; i++){
            let id = `#id${+i}`;
            let spaces = document.querySelector(id);
            let ii = Math.floor(i/3);
            let j = i%3;
            spaces.innerText = gameboard[ii][j];
        
        }
    }
    
    function updateResult(msg){
        let result = document.querySelector(".result");
        result.innerHTML = msg;
    }

    function updateBanner(name1, name2){
        let banner = document.querySelector(".banner");
        banner.innerHTML = `${moveCount%2?name2: name1}'s turn`;
    }

    function displayboard(){
        console.log(gameboard);
        console.log(moveCount);
    }
    function winCheck(){
        for(let i=0; i<3; i++){
            let smart_var = 0;
            for(let j=0; j<3; j++){
                if (gameboard[i][j]==="X") smart_var++;
                else if(gameboard[i][j]==="0")smart_var--;
            }
            if (Math.abs(smart_var)==3){
                return true;
            }
        }
        for(let i=0; i<3; i++){
            let smart_var = 0;
            for(let j=0; j<3; j++){
                if (gameboard[j][i]==="X") smart_var++;
                else if(gameboard[j][i]==="0")smart_var--;
            }
            if (Math.abs(smart_var)==3){
                return true;
            }
        }
        let smart_var = 0;
        for(let i=0,j=2; i<3; i++,j--){
                if (gameboard[i][j]==="X") smart_var++;
                else if(gameboard[i][j]==="0")smart_var--;
        }
        if (Math.abs(smart_var)==3){
                return true;
        }
        smart_var = 0;
        for(let i=0; i<3; i++){
                if (gameboard[i][i]==="X") smart_var++;
                else if(gameboard[i][i]==="0")smart_var--;
        }
        if (Math.abs(smart_var)==3){
                return true;
        }
        return false;
    }
    
    return {updateResult,refresh,getMoveCount,makeMove,winCheck,displayboard,updateBanner,populateSpaces,updateSpaces};

    // function isDraw(){
    //     //  more advanced feature of this game that
    //     //     can tell if there are no winning moves left,
    //     //     and the current state is draw
    // }
}


function createPlayer(id,name){
    function changeName(newname){
        this.name = newname;
    }
    return {id,name,changeName};
}


let main_function = (function TicTac(){
    let playerX = createPlayer(0,"Player 1");
    let playerY = createPlayer(1,"Player 2");
    
    
    function playRound(){
        let round = createGameboard();
        round.populateSpaces();
        round.updateBanner(playerX.name, playerY.name);
        
        let reset_btn = document.querySelector(".reset-btn");
        reset_btn.addEventListener("click",()=>{ round.refresh(playerX.name, playerY.name,true)});

        let container = document.querySelector(".container");
        
        container.addEventListener("click", event => {
            let id = event.target.id.at(2);
            if(id>=0 && id<9){
                let i = Math.floor(id/3);
                let j = id%3;
                round.makeMove(i,j);
                round.updateSpaces();
                if (round.winCheck()){
                    let victorName = (round.getMoveCount()%2==0)? playerY.name: playerX.name;
                    let msg = `${victorName} Won!`
                    round.updateResult(msg);
                    round.refresh(playerX.name, playerY.name);
                    return;
                }
                if(round.getMoveCount()>=9) {
                    round.updateResult("Draw");
                    round.refresh(playerX.name, playerY.name);
                }
                round.updateBanner(playerX.name, playerY.name);
            }
            
        });

    }
    playRound();
})();