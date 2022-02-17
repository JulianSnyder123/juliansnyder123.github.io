/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
      //allows me to easily access board height and width for comparisons
  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
      //this function allows me to assign a position, speed, and id for an object
  function Object (x, y, speedX, speedY, id){
    var item = {};
    item.x = x;
    item.y = y;
    item.speedX = speedX;
    item.speedY = speedY;
    item.id = id;
    item.height = $("#id").height();
    item.width = $("#id").width();
    return item;
  }

  var ball = Object(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0, 0, "#ball")
  var pattle1 = Object(10, 200, 0, 0, "#pattle1");
  var pattle2 = Object(410, 200, 0, 0, "#pattle2");
  var updatedScore1 = 1
  var updatedScore2 = 1
      // this variable gives the hard coded keyboard data an easier way to memorize it
  var KEYCODE = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83
  }
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
      //tells the document what to execute when a key is pressed up or down
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    moveObject(pattle1);
    moveObject(pattle2);
    wallCollision(ball, false);
    wallCollision(pattle1, true);
    wallCollision(pattle2, true);
    doCollide(ball, pattle1)
    doCollide(ball, pattle2)
  }
  
  /* 
  Called in response to events.
  */
 
  function handleKeyDown(event) {

    if(event.which === KEYCODE.UP){
      pattle2.speedY = -8
    }if(event.which === KEYCODE.DOWN){
      pattle2.speedY = 8
    }if (event.which === KEYCODE.W){
      pattle1.speedY = -8
    }if (event.which === KEYCODE.S){
      pattle1.speedY = 8
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEYCODE.UP){
      pattle2.speedY = 0
    }if(event.which === KEYCODE.DOWN){
      pattle2.speedY = 0
    }if (event.which === KEYCODE.W){
      pattle1.speedY = 0
    }if (event.which === KEYCODE.S){
      pattle1.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + $(obj1.id).width();
    obj1.bottomY = obj1.y + $(obj1.id).height();
    
    // TODO: Do the same for square2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + $(obj2.id).width();
    obj2.bottomY = obj2.y + $(obj2.id).height();
    // TODO: Return true if they are overlapping, false otherwise
	if((obj1.rightX > obj2.leftX ) &&
      (obj1.leftX < obj2.rightX ) &&
      (obj1.bottomY > obj2.topY ) &&
      (obj1.topY < obj2.bottomY )){
     obj1.speedX = -obj1.speedX
    } else {
      obj1.speedX = obj1.speedX
    }
		
}

  
  function wallCollision(item, isPattle){
    if (item.x > BOARD_WIDTH){
      $("#score1").text(updatedScore1++)
      startBall();
    }
    if (item.x < 0){
      $("#score2").text(updatedScore2++)
      startBall();
    }
    if (item.y > BOARD_HEIGHT){
      item.speedY = -item.speedY
    }
    if (item.y < 0){
      item.speedY = -item.speedY
    }
    if(isPattle && item.y + item.height > Math.min(BOARD_HEIGHT - item.height, item.y) ) {
      item.y = BOARD_HEIGHT
    }
    if(isPattle && item.y < Math.max(0, item.y)){
      item.y = 0
    }
  }
  
  function startBall(){
    ball.x = BOARD_WIDTH / 2
    ball.y = BOARD_HEIGHT / 2
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveObject(thing){
    thing.x += thing.speedX
    thing.y += thing.speedY
    $(thing.id).css("left", thing.x)
    $(thing.id).css("top", thing.y)
  }
  

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}