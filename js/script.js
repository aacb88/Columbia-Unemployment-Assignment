var margin = {
  top: 20, 
  right: 20, 
  bottom: 30, 
  left: 50
            };
    
var width = $(".chart").width() - margin.left - margin.right;
var height = $(".chart").height() - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y-%m-%d"); //formatting time based on the TSV data//

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.observation_date); }) //Setting the x-axis measurement by the observation date//
    .y(function(d) { return y(d.CLMUR); });// Setting the y-axis measurement by the unemployment rate

var svg = d3.select(".chart").append("svg")
    .attr("class", "parent-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("class", "chart-g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/unemployment.tsv", type, function(error, data) { //bringing in data from TSV file//
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.observation_date; }));
  y.domain(d3.extent(data, function(d) { return d.CLMUR; }));

   svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Unemployment Rate (%)"); //appending label to y-axis

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});

function type(d) {
  d.observation_date = formatDate.parse(d.observation_date);
  d.CLMUR = +d.CLMUR;
  return d;
}


