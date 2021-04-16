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
                { "type": "sawblade", "x": 400, "y": groundY-100 },
                { "type": "sawblade", "x": 700, "y": groundY },
                { "type": "sawblade", "x": 1000, "y": groundY },
                { "type": "enemy", "x": 1600, "y": groundY-30 },
                { "type": "enemy", "x": 850, "y": groundY-30 },
                { "type": "enemy", "x": 3000, "y": groundY-30 },
                { "type": "reward", "x": 2080, "y": groundY-20 },
                { "type": "deathWorm", "x": 1300, "y": groundY-130 },
                { "type": "deathWorm", "x": 2000, "y": groundY+15 },
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
            }else if (firstObject.type === "enemy"){
                enemy(firstX, firstY)
            }else if (firstObject.type === "deathWorm"){
                deathWorm(firstX, firstY) 
            }
        }

        

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
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
            sawBladeHitZone.rotationalVelocity = 20;
        }



        function deathWorm(x, y){
            createSawBlade(x, y)
            createSawBlade(x+40, y+25)
            createSawBlade(x+80, y+50)
            createSawBlade(x+120, y+25)
            createSawBlade(x+160, y)
            createSawBlade(x+200, y+25)
            createSawBlade(x+240, y+50)
            createSawBlade(x+280, y+25)
            createSawBlade(x+320, y)
            createSawBlade(x+360, y+25)
            createSawBlade(x+400, y+50)
        }



        function enemy(x, y){
            var enemy = game.createGameItem('enemy',25);
            var purpleSquare = draw.rect(50,100,'purple');
            purpleSquare.x = -25;
            purpleSquare.y = -50;
            enemy.addChild(purpleSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);
            };
            enemy.onProjectileCollision = function(){
                    console.log('Halle has hit the enemy');
                    enemy.shrink();
            }
        }





            function createReward(x, y){
                var reward = game.createGameItem('reward',25);
                var blueSquare = draw.rect(50,50,'blue');
                 blueSquare.x = -25;
                 blueSquare.y = -25;
                reward.addChild(blueSquare);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -2;
                reward.onPlayerCollision = function() {
                    console.log('Halle has collected a reward');
                    game.changeIntegrity(20);
                };
            }


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
