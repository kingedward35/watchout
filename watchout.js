var width = 700, height = 450;

var n = 5;
var enemyRadius = d3.range(5, 5*(n + 1), 5);
var ssRadius = [50];
var time = 1000;

var initialXUserPosition = Math.floor(width/2);
var initialYUserPosition = Math.floor(height/2);

var currentScore = 0;
var highestScore = 0;
var collisions = 0;

var updateScore = function() {
  d3.select('.scoreboard .current span').text(currentScore);
  d3.select('.scoreboard .high span').text(highestScore);
  d3.select('.scoreboard .collisions span').text(collisions);
}




var svg = d3.select("body").append("svg")
.attr("width", width).attr("height", height)
.append("g");

  var ast = svg.selectAll('circle').data(enemyRadius);

  ast.enter().append('circle')
  .attr('class',function(d,i) {return 'astroid';})
  .attr('r', function(d,i) {return d;})
  .attr('cx',function(d,i) {return Math.random() * width;})
  .attr('cy', function(d,i) {return Math.random() * height});

  var ss = svg.selectAll('circle.spaceship').data(ssRadius);
  ss.enter().append('circle')
  .attr('class','spaceship')
  .attr('r', function(d,i) {return d;})
  .attr('cx',initialXUserPosition)
  .attr('cy',initialYUserPosition);


var drag = d3.behavior.drag();
  drag.on('drag', function () {
    ss.attr('cx', d3.event.x)
      .attr('cy', d3.event.y)
  });
  ss.call(drag);

var move = function(element) {
  element.transition().duration(time)
  .attr('cx',function(d,i) {return Math.random() * width;})
  .attr('cy', function(d,i) {return Math.random() * height;})
  .each('end', function() {
    move(d3.select(this));
  });
};
move(ast);


var scoreTicker = function() {
  currentScore++;
  highestScore = Math.max(highestScore,currentScore);
  updateScore();
};



var prevCollision = false;

var collisionDetect = function () {

  var col = false;

  ast.each(function() {
    var cx = parseInt(this.getAttribute('cx'));
    var cy = parseInt(this.getAttribute('cy'));
    var x = parseInt(ss.attr('cx')) - cx;
    var y = parseInt(ss.attr('cy')) - cy;
    if (Math.sqrt(x*x + y*y) < parseFloat(this.getAttribute('r')) + ssRadius[0]) {
      col = true;
    }
  });
  // console.log(col);

  if (col) {
    currentScore = 0;
    if (prevCollision !== col) {
      collisions++;
    }
  }
  prevCollision = col;


};
d3.timer(collisionDetect);
setInterval(scoreTicker, 100);