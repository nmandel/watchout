//Global Variables
var boardWidth = parseInt(d3.select('body').select('svg').style("width"));
var boardHeight = parseInt(d3.select('body').select('svg').style("height"));
var numEnemies = 25;
var enemySize = 20;
var numCollisions = 0;
var score = 0;
var highScore = 0;
var speed = 3000;
var collided;
var rotateEnemy = 0;
var bonus = true;

// Scoreboard
var incrementCollisions = function(){
  d3.select('.player').attr("xlink:href", "images/ghost.png");
  if(score > highScore){
    highScore = score;
    d3.select('.high').select('span').text(highScore);
  }
  score = 0;
  numCollisions++;
  d3.select('.collisions').select('span').text(numCollisions);
  setTimeout(function() {
    collided = false;
    d3.select('.player').attr("xlink:href", "images/koala.png");
  }, 1000);
}

setInterval(function(){
  score++;
  d3.select('.current').select('span').text(score);
}, 100);

// Collision and Bonus Handling
var collide = function(enemy) {
  var enemies = d3.selectAll('.enemy');
  for (var i = 0; i < enemies[0].length; i++) {
    var enemy = d3.select('.enemy'+i);
    var player = d3.select('.player');
    var xDiff = Math.abs(parseInt(player.attr("x")) - 5 - parseInt(enemy.attr("x")));
    var yDiff = Math.abs(parseInt(player.attr("y")) - 5 - parseInt(enemy.attr("y")));
    var bothRadiuses = parseInt(player.attr("r")) + parseInt(enemy.attr("r"));
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (!collided && bonus && parseInt(player.attr("x")) > 380 && parseInt(player.attr("x")) < 420 && parseInt(player.attr("y")) > 280 && parseInt(player.attr("y")) < 320){
      score+=50;
      d3.selectAll('.bonus').remove();
      bonus = false;
    }
    if (distance <= bothRadiuses && !collided) {
      collided = true;
      incrementCollisions();
    }
  };

};

// Player Movement
var dragmove = function(){
  collide();
  d3.select('.player')
    .attr("x", d3.event.x - 25)
    .attr("y", d3.event.y - 25);
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

// Create Player
d3.select('body').select('svg').append("image")
  .attr("x", boardWidth/2)
  .attr("y", boardHeight/2)
  .attr("r", 25)
  .attr("class", "player")
  .attr("height", "50px")
  .attr("width", "50px")
  .attr("xlink:href", "images/koala.png")
  .call(drag);


// Create Enemies
var generateEnemyArray = function () {
  var enemyArray = [];
  for (var i = 0; i < numEnemies; i++){
    enemyArray.push(
       {
        r: enemySize,
        id: i,
        cx: Math.random()*boardWidth,
        cy: Math.random()*boardHeight
       }
      );
  }
  return enemyArray;
};
var enemyArray = generateEnemyArray();

for (var j = 0; j < enemyArray.length; j++){
  d3.select('body').select('svg').append("image")
    .attr("x", enemyArray[j].cx)
    .attr("y", enemyArray[j].cy)
    .attr("r", enemySize)
    .attr("height", "40px")
    .attr("width", "40px")
    .attr("xlink:href", "images/boomerang.png")
    .attr("class", "enemy" + " enemy" + enemyArray[j].id)
    .style("position", "absolute")
    .style("margin", "-20px 0 0 -20px")
    .style("transform-origin", "center")
    .style("-webkit-animation", "spin .6s linear infinite")
    .style("-moz-animation", "spin .6s linear infinite")
    .style("animation", "spin .6s linear infinite");
}


// Enemy movement
var repeat = function() {
  d3.selectAll(".enemy")
    .data(generateEnemyArray())
    .transition()
      .duration(speed)
    .attr("x", function(d) {
      return d.cx;
    })
    .attr("y", function(d) {
      return d.cy;
    })
    .each("end", repeat);
};

repeat();

//Check collisions
setInterval(collide, 100);


// Create Bonus Eucalyptus
setInterval(function(){
  bonus = true;
  d3.select('body').select('svg').append('image')
  .attr("xlink:href", "images/eucalyptus.png")
  .attr("x", "400")
  .attr("y", "300")
  .attr("height", "45px")
  .attr("width", "45px")
  .attr("class", "bonus");
}, 7000)
