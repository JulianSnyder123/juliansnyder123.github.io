/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $("#board").width()
  var BOARD_HEIGHT = $("#board").height()
  var MESSAGE = "#message"
  
  // Game Item Objects
  //this object holds the keys and their values
  var Keys = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40
  }

  var isUp = false;
  var isDown = false;
  var isLeft = false;
  var isRight = false;

  function factory(x, y, speedX, speedY, id){ //the factory function makes it easier to assign values to other variables
    var item = {}
    item.x = x;
    item.y = y;
    item.speedX = speedX;
    item.speedY = speedY;
    item.id = id;
    item.width = $(item.id).width();
    item.height = $(item.id).height();
    return item;
  }

  
  snakeHead = factory(100, 220, 0, 0, "#snakeHead")
  var snake = [snakeHead] //this array is the snake itself. the body is created


  var apple = factory(300, 220, 0, 0, "#apple")

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

// the newFrame function calls all the functions inside every tick
  function newFrame() {
    moveSnake();
    repositionObject(snakeHead);
    redrawObject(snakeHead);
    snakeCollision();
    eatApple();
    wallCollision();
  }
  
//handleKeyDown tells the computer what to do when a specific button is pressed
  function handleKeyDown(event){
    if (event.which === Keys.LEFT && isLeft !== true){
      console.log("left")
      snakeHead.speedX = -20
      snakeHead.speedY = 0
      isDown = false;
      isUp = false;
      isLeft = false;
      isRight = true;
      
    }
    if (event.which === Keys.RIGHT && isRight !== true){
      console.log("right")
      snakeHead.speedY = 0
      snakeHead.speedX = 20
      isDown = false;
      isUp = false;
      isLeft = true;
      isRight = false;
    }
    if (event.which === Keys.UP && isUp !== true) {
      console.log("up")
      snakeHead.speedY = -20
      snakeHead.speedX = 0
      isDown = true;
      isUp = false;
      isLeft = false;
      isRight = false;
    }
    if (event.which === Keys.DOWN && isDown !== true){
      console.log("down")
      snakeHead.speedY = 20
      snakeHead.speedX = 0
      isDown = false;
      isUp = true;
      isLeft = false;
      isRight = false;
    }
  }
  /* 
  Called in response to events.
  */


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //the snakeCollision function causes the snake to die when it bumps into its body
  function snakeCollision(){
    for(var i = snake.length - 1; i >= 1; i--){
      var snakePart = snake[i];
      if(snakeHead.x === snakePart.x && snakeHead.y === snakePart.y){
        endGame();
      }
    }
  }
  

  //wallCollision kills the snake whenever it bumps into a wall
  function wallCollision(){
    if(snakeHead.x > BOARD_WIDTH || snakeHead.x < 0 || snakeHead.y > BOARD_HEIGHT || snakeHead.y < 0){
      endGame()
    }
    
  }
  
  //this function places the function in a random spot on the board
  function placeApple(){
    apple.x = Math.floor(Math.random() * 20) * 20
    apple.y = Math.floor(Math.random() * 20) * 20
    redrawObject(apple);
  }
  
  //tells the computer what to do whenever the snakeHead is in the same spot as the apple(aka, eating it)
  function eatApple(){
    if(snakeHead.x === apple.x && snakeHead.y === apple.y){
      addSnakeHead();
      placeApple();
      console.log("munch munch")
    }
  }
  
  //this function adds new objects to the snake array
  function addSnakeHead(){
    var newID = "snake" + snake.length;


    $("<div>").addClass("snake").attr("id", newID).appendTo("#board");

    var tail = snake[snake.length - 1]
    var newSegment = factory(tail.x, tail.y, 0, 0, "#" + newID);

    redrawObject(newSegment);
    snake.push(newSegment);
  }
  


  function moveSnake(){
    for(var i = snake.length - 1; i >= 1; i--){
      var snakePart = snake[i];

      snakePart.x = snake[i - 1].x;
      snakePart.y = snake[i - 1].y;
      
      redrawObject(snakePart);
    }
  }
  
  function repositionObject(thing){
    thing.x += thing.speedX;
    thing.y += thing.speedY;

  }
  function redrawObject(thing){
    $(thing.id).css("left", thing.x)
    $(thing.id).css("top", thing.y)
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    $(MESSAGE).text("UH OH ):")
    // turn off event handlers
    $(document).off();
  }
  
}
