document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const scoreboard = document.getElementById('score');
    // 28 * 28 = 784 squares
    const width = 28;
    const dotEatenPoints = 10;
    let score = 0;
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

    // Pac-man's starting point
    let pacmanCurrentLocation = 490;
    // Style pacman based on its location
    squares[pacmanCurrentLocation].classList.add('pac-man');
    // Set starting position facing towards right
    squares[pacmanCurrentLocation].classList.add('pac-man-right');

    document.addEventListener("keyup", movePacman);

    // Remove all pacman for restarting purposes
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
        removePacman();
        squares[pacmanCurrentLocation].classList.remove('pac-man');
        switch(e.keyCode){
            case 37:
                // check if pacman is moving to the wall now
                // check if pacman is moving to the ghost lair
                // check if pacman is at the leftmost edge now
                if((pacmanCurrentLocation%width !==0)
                    &&(!squares[pacmanCurrentLocation-1].classList.contains('wall'))
                    &&(!squares[pacmanCurrentLocation-1].classList.contains('ghost-lair'))){
                    pacmanCurrentLocation-=1;
                }
                // check if pacman is at the left exit now
                if((pacmanCurrentLocation-1)===363){
                    pacmanCurrentLocation = 391
                }

                squares[currentLocation].classList.add("pac-man");
                squares[currentLocation].classList.add("pac-man-left");
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
                squares[currentLocation].classList.add("pac-man");
                squares[currentLocation].classList.add("pac-man-right");
                break;
            case 38:
                // check if pacman is at the top edge now
                if(((pacmanCurrentLocation-28)>=0)&&(!squares[pacmanCurrentLocation-width].classList.contains('wall'))&&(!squares[pacmanCurrentLocation-width].classList.contains('ghost-lair'))){
                    pacmanCurrentLocation-=width;
                }
                squares[currentLocation].classList.add("pac-man");
                squares[currentLocation].classList.add("pac-man-up");
                break;
            case 40:
                // check if pacman is at the bottom edge now
                if(((pacmanCurrentLocation/width)<(width-1))&&(!squares[pacmanCurrentLocation+width].classList.contains('wall'))&&(!squares[pacmanCurrentLocation+width].classList.contains('ghost-lair'))){
                    pacmanCurrentLocation+=width;
                }
                squares[currentLocation].classList.add("pac-man");
                squares[currentLocation].classList.add("pac-man-down");
                break;   
        }
        // Style pac man's new location
        squares[pacmanCurrentLocation].classList.add('pac-man');
        // Style the game when the pac man eat pac dot
        dotEaten();
        powerPelletEaten();
        gameOver();
        winOrLose();
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
            setTimeout(normalizedGhosts, 10000);
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

    // Move ghosts randomly
    ghosts.forEach(ghost => {
        moveGhost(ghost);
    })
    
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
            // Check if game is over now
            gameOver();
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
            scoreboard.innerHTML = "GAME OVER!"
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
        }
    }
})
