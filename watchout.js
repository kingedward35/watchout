var width = 700, height = 450;

var initialX = [];
var initialY = [];
var n = 10;
var currentScore = 0;
var highestScore = 0;
var collisions = 0;

for (var i = 0; i < 10; i++) {
  var tempX = Math.random() * width;
  initialX.push(tempX);
  tempX = Math.random() * height;
  initialY.push(tempX);
}

var svg = d3.select("body").append("svg")
.attr("width", width).attr("height", height)
.append("g");

function Initialize() {
  var ast = svg.selectAll('image');

  ast.enter().append('image').
  .attr('x', function(d, i) {
    return initialX[i];
  })
  .attr('y', function(d, i) {
    return initialY[i];
  })
  .attr('xlink:href', function(d, i) {
    return "asteroid.png";
  });


}

function update() {
  var ast = svg.selectAll('image');

  if (ast.attr('xlink:href') !== "asteroid.png") {

  }

  ast.enter().append('image').
  .attr('x', function(d,i) {
    return initialX[i];
  })
  .attr('y', function(d, i) {
    return initialY[i];
  });


}

//Initialize everything
Initialize();

setInterval(function () {
  update();
}, 1000);
