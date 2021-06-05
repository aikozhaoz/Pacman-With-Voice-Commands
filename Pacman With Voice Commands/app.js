document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const score = document.getElementById('score');
    // 28 * 28 = 784 squares
    const width = 28;

    // Declare a variable called squares which stores all the squares
    const squares = [];

    // Game Architecture:
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
    }

    document.addEventListener("keyup", movePacman);

    // Game Logic
    // Pac dot is eaten by pac man


})
