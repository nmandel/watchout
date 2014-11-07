// start slingin' some d3 here.

var numEnemies = 30;
var enemyArray = [];

for (var i = 0; i < numEnemies; i++){
  enemyArray.push(
     {
      id: i,
      cx: Math.random()*parseInt(d3.select('body').select('svg').style("width")),
      cy: Math.random()*parseInt(d3.select('body').select('svg').style("height"))
     }
    )
}

for (var j = 0; j < enemyArray.length; j++){
  d3.select('body').select('svg').append("circle")
  .attr("cx", enemyArray[j].cx)
  .attr("cy", enemyArray[j].cy)
  .attr("r", 10)
  .style("fill", "green");
}
