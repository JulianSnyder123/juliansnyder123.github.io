var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "reward", "x": 600, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY },
            ]
        };
        for(var i =0; i< levelData.gameItems.length; i++){
            var firstObject = levelData.gameItems[i];
            var firstX = firstObject.x;
            var firstY = firstObject.y;
            var firstType = firstObject.type;
            if(firstObject.type === 'sawblade'){
                createSawBlade(firstX, firstY);
            }else if (firstObject.type === "reward"){
                createReward(firstX, firstY)
            }
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

    function createSawBlade(x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = hitZoneSize*-1;
        obstacleImage.y = hitZoneSize*-1;
    }
    function myObstacle(x, y){
        createSawBlade(400, 190);
        createSawBlade(1000, 250);
        createSawBlade(1500, 150);
    }
    myObstacle(100, 200);
    var enemy = game.createGameItem('enemy', 25);
    var redSquare = draw.rect(50, 100, 'purple');
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);
    enemy.x = 400;
    enemy.y = groundY-50;
    game.addGameItem(enemy);
    
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
