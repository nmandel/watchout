// start slingin' some d3 here.

var numEnemies = 50;

var generateEnemyArray = function () {
  var enemyArray = [];
  for (var i = 0; i < numEnemies; i++){
    enemyArray.push(
       {
        id: i,
        cx: Math.random()*parseInt(d3.select('body').select('svg').style("width")),
        cy: Math.random()*parseInt(d3.select('body').select('svg').style("height"))
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
  .style("fill", "green");
}


var repeat = function() {
  d3.selectAll("circle")
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
