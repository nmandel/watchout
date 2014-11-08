// start slingin' some d3 here.

//Global Variables

var boardWidth = parseInt(d3.select('body').select('svg').style("width"));
var boardHeight = parseInt(d3.select('body').select('svg').style("height"));
var collided = false;


// Collision Handling
var collide = function(enemy) {
  var enemies = d3.select('.enemy');
  for (var i = 0; i < enemies.length; i++) {
    var player = d3.select('.player');
    var xDiff = Math.abs(parseInt(player.attr("cx")) - parseInt(enemies[i].attr("cx");
    var yDiff = Math.abs(parseInt(player.attr("cy")) - parseInt(enemies[i].atcy);
    var bothRadiuses = parseInt(player.attr("r")) + d.r;
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    // console.log(player.attr("cx") + " "  + enemy.cx + " " + xDiff);
    // console.log(distance);
    if (distance <= bothRadiuses) {
      console.log("BOOOOOM!");
      collided = true;
    }
  });

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
  .attr("r", 30)
  .attr("class", "player")
  .style("fill", "orange")
  .call(drag);


// Create Enemies
var numEnemies = 1;

var generateEnemyArray = function () {
  var enemyArray = [];
  for (var i = 0; i < numEnemies; i++){
    enemyArray.push(
       {
        r: 50,
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
  .attr("r", 50)
  .attr("class", "enemy")
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

setInterval(collide, 200);

// function collisionChecker () {
//   d3.selectAll(".enemy")
//     .each(function(d) {
//       // console.log(d);
//       collide(d);
//     });
// };
