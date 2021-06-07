document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const scoreboard = document.getElementById('score');
    // 28 * 28 = 784 squares
    const width = 28;
    const dotEatenPoints = 10;
    let score = 0;
    // Declare a variable called squares which stores all the squares
    const squares = [];

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

    // Pac-man's starting point
    let pacmanCurrentLocation = 490;
    // Style pacman based on its location
    squares[pacmanCurrentLocation].classList.add('pac-man');

    // Using switch to move pac-man
    // left = 37
    // up = 38
    // right = 39
    // down = 40
    function movePacman(e){
        squares[pacmanCurrentLocation].classList.remove('pac-man');
        switch(e.keyCode){
            case 37:
                // check if pacman is moving to the wall now
                // check if pacman is moving to the ghost lair
                // check if pacman is at the leftmost edge now
                if((pacmanCurrentLocation%width !==0)&&(!squares[pacmanCurrentLocation-1].classList.contains('wall'))&&(!squares[pacmanCurrentLocation-1].classList.contains('ghost-lair'))){
                    pacmanCurrentLocation-=1;
                }
                // check if pacman is at the left exit now
                if((pacmanCurrentLocation-1)===363){
                    pacmanCurrentLocation = 391
                }
                break;
            case 39:
                // check if pacman is at the rightmost edge now
                if(((pacmanCurrentLocation%width)<(width-1))&&(!squares[pacmanCurrentLocation+1].classList.contains('wall'))&&(!squares[pacmanCurrentLocation+1].classList.contains('ghost-lair'))){
                    pacmanCurrentLocation+=1;
                }
                // check if pacman is at the left exit now
                if((pacmanCurrentLocation+1)===392){
                    pacmanCurrentLocation = 364;
                }
                break;
            case 38:
                // check if pacman is at the top edge now
                if(((pacmanCurrentLocation-28)>=0)&&(!squares[pacmanCurrentLocation-width].classList.contains('wall'))&&(!squares[pacmanCurrentLocation-width].classList.contains('wall'))){
                    pacmanCurrentLocation-=width;
                }
                break;
            case 40:
                // check if pacman is at the bottom edge now
                if(((pacmanCurrentLocation/width)<(width-1))&&(!squares[pacmanCurrentLocation+width].classList.contains('wall'))&&(!squares[pacmanCurrentLocation+width].classList.contains('wall'))){
                    pacmanCurrentLocation+=width;
                }
                break;   
        }
        // Style pac man's new location
        squares[pacmanCurrentLocation].classList.add('pac-man');
        // Style the game when the pac man eat pac dot
        dotEaten();
    }

    document.addEventListener("keyup", movePacman);

    // Game Logic
    // Case when Pac dot is eaten by pac man
    // When pacman moves to a position that contains pac dot, now that div will have 2 classes: pac-dot and pac-man
    function dotEaten(){
        if (squares[pacmanCurrentLocation].classList.contains('pac-dot')){
            score+=dotEatenPoints;
            scoreboard.innerHTML = score;
            // When the pac dot is eaten, we remove the pac-dot class from the div
            squares[pacmanCurrentLocation].classList.remove('pac-dot');
        }
    }
    
    // Create Ghost object
    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
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
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    });

    // Move ghosts randomly
    ghosts.forEach(ghost => {moveGhost(ghost)})
    
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
            // else we have to find a new direction to try
            if((!squares[ghost.currentIndex+direction].classList.contains("wall"))&&(!squares[ghost.currentIndex+direction].classList.contains("ghost"))){
                // If the empty condition is met, then we are going to move our current ghost.
                // Clear out the current location's class
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost","scared-ghost");
                // Add its class to its new location
                ghost.currentIndex+=direction;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }else{
                direction = directions[Math.floor(Math.random() * directions.length)];
            }
            
        },ghost.speed);
    }
})
