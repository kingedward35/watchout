var width = 1000, height = 700;

var n = 5;
var enemyRadius = d3.range(5, 5*(n + 1), 5);
var ssRadius = [10];
var time = 1000;

var initialXUserPosition = Math.floor(width/2);
var initialYUserPosition = Math.floor(height/2);

var currentScore = 0;
var highestScore = 0;
var collisions = 0;

function inXbounds(radius, currentX) {
  return Math.max(radius, Math.min(width - radius, currentX));
}

function inYbounds(radius, currentY) {
  return Math.max(radius, Math.min(height - radius, currentY));
}

var updateScore = function() {
  d3.select('.scoreboard .current span').text(currentScore);
  d3.select('.scoreboard .high span').text(highestScore);
  d3.select('.scoreboard .collisions span').text(collisions);
};

var svg = d3.select("body").append("svg")
.attr("width", width).attr("height", height)
.append("g");

  var ast = svg.selectAll('circle').data(enemyRadius);

  ast.enter().append('circle')
  .attr('class',function(d,i) {return 'astroid';})
  .attr('r', function(d,i) {return d;})
  .attr('cx',function(d,i) {return inXbounds(d,Math.random() * width);})
  .attr('cy',function(d,i) {return inYbounds(d,Math.random() * height);});

  var ss = svg.selectAll('circle.spaceship').data(ssRadius);
  ss.enter().append('circle')
  .attr('class','spaceship')
  .attr('r', function(d,i) {return d;})
  .attr('cx',initialXUserPosition)
  .attr('cy',initialYUserPosition);

var drag = d3.behavior.drag();
  drag.on('drag', function () {
    ss.attr('cx', inXbounds(ssRadius, d3.event.x))
      .attr('cy', inYbounds(ssRadius, d3.event.y))
  });
  ss.call(drag);
   

var move = function(element) {
  element.transition().duration(time)
  .attr('cx',function(d,i) {return inXbounds(d,Math.random() * width);})
  .attr('cy',function(d,i) {return inYbounds(d,Math.random() * height);})
  .each('end',function() {
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

  if (col) {
    currentScore = 0;
    if (prevCollision !== col) {
      d3.select('body').style({'background-color': "pink"});
      collisions++;
    }
  }
  if (!col) {
  d3.select('body').style({'background-color': "white"});
  }
  prevCollision = col;


};
d3.timer(collisionDetect);
setInterval(scoreTicker, 1);