const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')

let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

var audio = new Audio('audio/bruh.mp3');
var audio2 = new Audio('audio/taco-bell.mp3');
var audio3 = new Audio('audio/nice.mp3');
var audio4 = new Audio('audio/gta5-wasted.mp3');

for (let i = 0; i < 225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

//tells the program where to put the invaders
const alienInvaders = [
    0, 2, 4, 6, 8, 
    16, 18, 20, 22,
    30, 32, 34, 36, 38,
    46, 48, 50, 52,
    60, 62, 64, 66, 68
]


//draws where the invaders are
function draw() {
    for(let i = 0; i < alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()
//removes the invaders from their previous position
function remove() {
    for(let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

//draws where the shooter is
squares[currentShooterIndex].classList.add('shooter')

//moves the shooter
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft' :
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        case 'ArrowRight' :
            if(currentShooterIndex % width < width - 1) currentShooterIndex +=1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

//moves the invaders
function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if(rightEdge && goingRight) {
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight) {
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }

    draw()

    //tells the program to stop when an alien touches the shooter
    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        audio4.play();
        clearInterval(invadersId)
    }

    for (let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i] > squares.length ){
            resultsDisplay.innerHTML = 'GAME OVER'
            audio4.play();
            clearInterval(invadersId)
        }
    }
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        audio3.play();
        clearInterval(invadersId)
    }
}
invadersId = setInterval(moveInvaders, 500)

//when the up button is pressed, a laser is fired
function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains('invader')) {
            audio2.play();
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
        }
    }
    switch(e.key) {
        case 'ArrowUp' :
            laserId = setInterval(moveLaser, 100)
            audio.play();
    }
}

document.addEventListener('keydown', shoot)