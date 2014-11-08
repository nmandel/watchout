// start slingin' some d3 here.

//Global Variables

var boardWidth = parseInt(d3.select('body').select('svg').style("width"));
var boardHeight = parseInt(d3.select('body').select('svg').style("height"));
var numEnemies = 20;
var enemySize = 20;
var numCollisions = 0;
var score = 0;
var highScore = 0;
var collided;

// Scoreboard
var incrementCollisions = function(){
  if(score > highScore){
    highScore = score;
    d3.select('.high').select('span').text(highScore);
  }
  score = 0;
  numCollisions++;
  d3.select('.collisions').select('span').text(numCollisions);
  setTimeout(function() {
    collided = false;
  }, 1000);
}

setInterval(function(){
  score++;
  d3.select('.current').select('span').text(score);
}, 250);

// Collision Handling
var collide = function(enemy) {
  var enemies = d3.selectAll('.enemy');
  for (var i = 0; i < enemies[0].length; i++) {
    var enemy = d3.select('.enemy'+i);
    var player = d3.select('.player');
    var xDiff = Math.abs(parseInt(player.attr("cx")) - parseInt(enemy.attr("cx")));
    var yDiff = Math.abs(parseInt(player.attr("cy")) - parseInt(enemy.attr("cy")));
    var bothRadiuses = parseInt(player.attr("r")) + parseInt(enemy.attr("r"));
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    // console.log(player.attr("cx") + " " + player.attr("cy"));
    // console.log(player.attr("cx") + " "  + enemy.cx + " " + xDiff);
    // console.log(distance);
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
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y)
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

// Create Player
d3.select('body').select('svg').append("circle")
  .attr("cx", boardWidth/2)
  .attr("cy", boardHeight/2)
  .attr("r", 15)
  .attr("class", "player")
  .style("fill", "orange")
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
  d3.select('body').select('svg').append("circle")
  .attr("cx", enemyArray[j].cx)
  .attr("cy", enemyArray[j].cy)
  .attr("r", enemySize)
  .attr("class", "enemy" + " enemy" + enemyArray[j].id);
}


var repeat = function() {
  d3.selectAll(".enemy")
    .data(generateEnemyArray())
    .transition()
      .duration(5000)
    .attr("cx", function(d) {
      return d.cx;
    })
    .attr("cy", function(d) {
      return d.cy;
    })
    .each("end", repeat);
};
repeat();

setInterval(collide, 100);

// function collisionChecker () {
//   d3.selectAll(".enemy")
//     .each(function(d) {
//       // console.log(d);
//       collide(d);
//     });
// };
