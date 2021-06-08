// Difference between querySelector and getElement:
// The querySelector method lets you retrieve an element using a CSS selector query. The getElementById method retrieves an element by its DOM ID.
const grid = document.querySelector('.grid');
const scoreboard = document.getElementById('score');
const startButton = document.getElementById('start-button');
// 28 * 28 = 784 squares
const width = 28;
const dotEatenPoints = 10;
let score = 0;
// Intialize all the timerIDs
let gameOverID;
let leftID;
let rightID;
let upID;
let downID;
let winOrLoseID;
// Declare a variable called squares which stores all the squares
const squares = [];
// For check if user wins or not
let ghostEaten = 0;
let powerPelletNum = 0;

// Game Board Architecture:
// 0: pac dot
// 1: wall
// 2: ghost lair
// 3: power pellet
// 4: empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]


// Build the grid and run it
function makeBoard(){
    for(let i=0; i< layout.length; i++){
        // each square is a div element
        const square = document.createElement('div');
        // div element with class grid keeps appending square(a div element)
        grid.appendChild(square);
        squares.push(square);

        // Add layout to the board based on the game architecture
        // Style the pac-dot squares
        if(layout[i]===0){
            squares[i].classList.add('pac-dot');
            squares[i].innerHTML = ".";
        }else if(layout[i]===1){
            squares[i].classList.add('wall');
        }else if(layout[i]===2){
            squares[i].classList.add('ghost-lair');
        }else if(layout[i]===3){
            squares[i].classList.add('power-pellet');
        }
    }
}
makeBoard();

// Build the start game function. 
// The game will only start after user hits the start button or say start.
// Start: 
// 1. ghosts can move 
// 2. user can move his/her pacman
function startGame(){
    // Move ghosts randomly
    ghosts.forEach(ghost => {
        moveGhost(ghost);
    })
    document.addEventListener("keyup", movePacman);
    winOrLoseID = setInterval(winOrLose, 100);
    gameOverID = setInterval(gameOver, 100);
}

startButton.addEventListener("click", startGame);

// Pac-man's starting point
let pacmanCurrentLocation = 490;
// Style pacman based on its location
squares[pacmanCurrentLocation].classList.add('pac-man');
// Set starting position facing towards right
squares[pacmanCurrentLocation].classList.add('pac-man-right');



// Remove all pacman for moving purposes
function removePacman(){
    squares[pacmanCurrentLocation].classList.remove('pac-man');
    squares[pacmanCurrentLocation].classList.remove('pac-man-left');
    squares[pacmanCurrentLocation].classList.remove('pac-man-right');
    squares[pacmanCurrentLocation].classList.remove('pac-man-up');
    squares[pacmanCurrentLocation].classList.remove('pac-man-down');
}

// Using switch to move pac-man
// left = 37
// up = 38
// right = 39
// down = 40
// I call all the game logic related functions under this function because all the game logic should happen when pac man is moving
function movePacman(e){
    switch(e.keyCode){
        case 37:
            goLeft();
            break;
        case 39:
            goRight();
            break;
        case 38:
            goUp();
            break;
        case 40:
            goDown();
            break;   
    }
    gameLogic();
}

// Style the game according to the game logic and user commands
function gameLogic(){
    dotEaten();
    powerPelletEaten();
}

// Let pacman go left
function goLeft(){
    // Clear all the other direction timerID besides left
    clearInterval(rightID);
    clearInterval(upID);
    clearInterval(downID);
    
    // Set up leftID since pac man moving towards left.
    leftID = setInterval(function(){
        // Check if pac man is eligible for moving left:
        // 1. whether pacman is moving to the wall now
        // 2. whether  pacman is moving to the ghost lair
        if((squares[pacmanCurrentLocation-1].classList.contains('wall'))
        ||(squares[pacmanCurrentLocation-1].classList.contains('ghost-lair'))){
            clearInterval(leftID);
        }else{
            // Remove pacman from its previous position
            removePacman();
            pacmanCurrentLocation-=1;
            // check if pacman is at the left exit now
            if((pacmanCurrentLocation-1)===363){
                pacmanCurrentLocation = 391
            }
        }
        squares[pacmanCurrentLocation].classList.add("pac-man");
        squares[pacmanCurrentLocation].classList.add("pac-man-left");
    }, 500);
}

// Let pacman go right
function goRight(){
    // Clear all the other direction timerID besides right
    clearInterval(leftID);
    clearInterval(upID);
    clearInterval(downID);

    // Set up rightID since pac man moving towards left.
    rightID = setInterval(function(){
        // Check if pac man is eligible for moving right:
        // 1. whether pacman is moving to the wall now
        // 2. whether  pacman is moving to the ghost lair
        if((squares[pacmanCurrentLocation+1].classList.contains('wall'))
        ||(squares[pacmanCurrentLocation+1].classList.contains('ghost-lair'))){
            clearInterval(rightID);
        }
        else{
            // Remove pacman from its previous position
            removePacman();
            pacmanCurrentLocation+=1;
            // check if pacman is at the right exit now
            if((pacmanCurrentLocation+1)===392){
                pacmanCurrentLocation = 364;
            }
        }
        squares[pacmanCurrentLocation].classList.add("pac-man");
        squares[pacmanCurrentLocation].classList.add("pac-man-right");
    }, 500);
}

// Let pacman go up
function goUp(){
    // Clear all the other direction timerID besides up
    clearInterval(leftID);
    clearInterval(rightID);
    clearInterval(downID);

    upID = setInterval(function(){
        // Check if pac man is eligible for moving up:
        // 1. whether pacman is moving to the wall now
        // 2. whether  pacman is moving to the ghost lair
        if((squares[pacmanCurrentLocation-width].classList.contains('wall'))
        ||(squares[pacmanCurrentLocation-width].classList.contains('ghost-lair'))){
            clearInterval(upID);
        }else{
            // Remove pacman from its previous position
            removePacman();
            pacmanCurrentLocation-=width;
        }
        squares[pacmanCurrentLocation].classList.add("pac-man");
        squares[pacmanCurrentLocation].classList.add("pac-man-up");
    }, 500) 
}

// Let pacman go down
function goDown(){
    // Clear all the other direction timerID besides up
    clearInterval(leftID);
    clearInterval(rightID);
    clearInterval(upID);

    downID = setInterval(function(){
         // Check if pac man is eligible for moving down:
        // 1. whether pacman is moving to the wall now
        // 2. whether  pacman is moving to the ghost lair
        if((squares[pacmanCurrentLocation+width].classList.contains('wall'))
        ||(squares[pacmanCurrentLocation+width].classList.contains('ghost-lair'))){
            clearInterval(downID);
        }else{
            // Remove pacman from its previous position
            removePacman();
            pacmanCurrentLocation+=width;
        }
        squares[pacmanCurrentLocation].classList.add("pac-man");
        squares[pacmanCurrentLocation].classList.add("pac-man-down");
    }, 500);
}


// Game Logic
// Case when Pac dot is eaten by pac man
// When pacman moves to a position that contains pac dot, now that div will have 2 classes: pac-dot and pac-man
function dotEaten(){
    if (squares[pacmanCurrentLocation].classList.contains('pac-dot')){
        score+=dotEatenPoints;
        scoreboard.innerHTML = score;
        // When the pac dot is eaten, I remove the pac-dot class from the div
        squares[pacmanCurrentLocation].classList.remove('pac-dot');
    }
}

// Case when power pellet is eaten by pac man
function powerPelletEaten(){
    // Check if our pac man ate the power pellet
    // Check if the current location contains power pellet. If so then our power-pellet is eaten.
    if(squares[pacmanCurrentLocation].classList.contains("power-pellet")){
        score += 100;
        powerPelletNum+=1;
        // When our pacman ate the power pellet, it can now eat all the ghost so all ghosts now are scared
        // Change all the ghosts from normal to scared mode
        ghosts.forEach(ghost => {
            ghost.isScared = true;
        });
        // I do not want all ghosts to be scared for forever, I only want them to be scared for a short period of time.
        // In this case, I set a timer for about 10 seconds.
        setTimeout(normalizedGhosts, 15000);
        squares[pacmanCurrentLocation].classList.remove("power-pellet");
    }
}

// After power pellet is eaten, all ghosts are scared for a short period of time. In this case
// Then all ghost will go back to normal.
// Here, I am changing all ghosts back from scared mode to normal.
function normalizedGhosts(){
    ghosts.forEach(ghost => {
        ghost.isScared = false;
    })
}



// Create Ghost object
class Ghost{
    constructor(className, startLocation, speed){
        this.className = className;
        this.startLocation = startLocation;
        this.speed = speed;
        this.currentLocation = startLocation;
        this.isScared = false;
        this.timerID=NaN;
    }
}

// Make Ghosts using the Ghost class
ghosts=[
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]


// Place the ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentLocation].classList.add(ghost.className);
    squares[ghost.currentLocation].classList.add("ghost");
});



// Build move ghosts function
function moveGhost(ghost){
    // Directions: left, right, down, up
    const directions = [-1,+1,width,-width];
    // Shuffle the index of directions from 0 to 4 (exclusive the 4), so technically the expected output will be 0,1,2,3
    let direction = directions[Math.floor(Math.random() * directions.length)];
    // Note:
    // The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
    // The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
    // ID value returned by setInterval() is used as the parameter for the clearInterval() method.
    ghost.timerID = setInterval(function(){
        // If the next square is empty(NO wall and NO any other ghost), then the current ghost can go there
        // else I have to find a new direction to try
        if((!squares[ghost.currentLocation+direction].classList.contains("wall"))&&(!squares[ghost.currentLocation+direction].classList.contains("ghost"))){
            // If the empty condition is met, then we are going to move our current ghost.
            // Clear out the current location's class
            squares[ghost.currentLocation].classList.remove(ghost.className, "ghost","scared-ghost");
            // Add its class to its new location
            ghost.currentLocation+=direction;
            squares[ghost.currentLocation].classList.add(ghost.className, "ghost");
        }else{
            direction = directions[Math.floor(Math.random() * directions.length)];
        }
        // Check if this ghost is scared now
        // Ghosts always move. 
        // When they are scared, they are still moving. So we change ghosts' style(NOT scared => scared) within the setInterval method.
        if(ghost.isScared){
            squares[ghost.currentLocation].classList.add("scared-ghost");
        }
        // We do not need to change all the ghosts' style from scared to NOT scared because we already set a timer for that.
        // As soon as 10 seconds hit, normalizeGhosts() will be called and it will set all ghost.isScared = false.
        // Since the if condition no longer met, all ghosts will automatically change back to normal.

        // When ghosts are scared, they can now be eaten. Because pacman can only eat scared ghosts.
        // So when the ghosts are scared and pacman runs into it, pacman now eat the scared ghost. 
        // The ghost will go back to its starting position.
        if(ghost.isScared && squares[ghost.currentLocation].classList.contains("pac-man")){
            squares[ghost.currentLocation].classList.remove(ghost.className,"ghost", "scared-ghost");
            ghost.currentLocation = ghost.startLocation;
            score += 1000;
            ghostEaten+=1;
            squares[currentLocation].classList.add(ghost.className, "ghost");
        }
    },ghost.speed);
}

// Check for a game over
// Under both movePacman and moveGhost we need to check if the game over condition is met.
function gameOver(){
    // If pac man run into a UNSCARED ghost, pacman dies.
    // GAME OVER : (
    if(squares[pacmanCurrentLocation].classList.contains("ghost") && !squares[pacmanCurrentLocation].classList.contains("scared-ghost")){
        // Game over set up:
        // Clear time interval for all ghosts
        ghosts.forEach(ghost => {
            clearInterval(ghost.timerID);
        })
        // Unable the user to move pacman.
        document.removeEventListener("keyup", movePacman);
        // Alert user that the game is over now. They loss the game.
        scoreboard.innerHTML = "YOU LOSE!";
        clearInterval(gameOverID);
        clearInterval(winOrLoseID);
    }

}

// Check for a win
// Because it is only up for pacman's movement on winning so we only call winOrLose() under movePacman()
// My rule of winning:
// Colleting as many points as you can:
// Collect all power pellets
// Eat at at least 2 ghosts
function winOrLose(){
    if(powerPelletNum == 4 && ghostEaten ==2){
        ghosts.forEach(ghost => {
            clearInterval(ghost.timerID);
        })
        document.removeEventListener("keyup", movePacman);
        scoreboard.innerHTML = "YOU WON!";
        clearInterval(gameOverID);
        clearInterval(winOrLoseID);
    }
}

// Voice commands using Alan AI
// Note: For some reason if I put all the voice commands in one alanBtn({}), all of them do not work correctly.
// While all the goLeft(), goRight(), goUp(), goDown() work correctly using keyboards.
var alanBtnInstance = alanBtn({
    // The key is unique. It is generated by Alan Studio
    key: "UNIQUE_ALAN_AI_SDK_KEY", 
    onCommand: function (commandData) {
        if (commandData.command === "start:game") {
            startGame();
        }
        if (commandData.command === "LEFT") {
            goLeft();
            // gameLogic();
        }
        if (commandData.command === "RIGHT") {
            goRight();
            // gameLogic();
        }
        if (commandData.command === "UP") {
            goUp();
            // gameLogic();
        }
        if (commandData.command === "DOWN") {
            goDown();
            // gameLogic();
        }
    },
    rootEl: document.getElementById("alan-btn"),
})




