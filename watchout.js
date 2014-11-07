// start slingin' some d3 here.

//Global Variables

var boardWidth = parseInt(d3.select('body').select('svg').style("width"));
var boardHeight = parseInt(d3.select('body').select('svg').style("height"));

// Player Movement
var dragmove = function(d){
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
  .attr("r", 8)
  .attr("class", "player")
  .style("fill", "orange")
  .call(drag);


// Create Enemies
var numEnemies = 50;

var generateEnemyArray = function () {
  var enemyArray = [];
  for (var i = 0; i < numEnemies; i++){
    enemyArray.push(
       {
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
  .attr("r", 10)
  .attr("class", "enemy")
  .style("fill", "green");
}


var repeat = function() {
  d3.selectAll(".enemy")
    .data(generateEnemyArray())
    .transition()
      .duration(1000)
    .attr("cx", function(d) {
      return d.cx;
    })
    .attr("cy", function(d) {
      return d.cy;
    })
    .each("end", repeat);
};
repeat();
