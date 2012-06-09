function foo(event, topic){
	//console.log(event.childNodes[0].firstChild.nodeValue);
	var text = event.childNodes[0].firstChild.nodeValue;
	var newsDate = text.substring(11,13) + "/" + text.substring(14,16) + "/" + text.substring(8,10); 

	var url = "https://www.google.com/search?pz=1&cf=all&ned=us&hl=en&tbm=nws&gl=us&as_q="+topic+"&as_occt=any&as_drrb=b&as_mindate="+newsDate+"&as_maxdate="+newsDate+"&tbs=cdr%3A1%2Ccd_min%3A"+newsDate+"%2Ccd_max%3A"+newsDate+"&authuser=0"

	var left = (screen.width/2)-(675/2);
	var top = (screen.height/2)-(400/2);

	window.open (url, "mywindow","location=1,status=1,scrollbars=1, width=675,height=400,left="+left+",top="+top+"");

}


//console.log(minValue);

var margin = {top: 5, right: 20, bottom: 20, left: 70},
    width = 250 - margin.right - margin.left, // width
    height = 1600 - margin.top - margin.bottom, // height
    cellSize = 25; // cell size

var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
    //.domain([-.05, .05])
    //.domain([2000, 5500])
    .domain([minValue, maxValue])
    .range(d3.range(11));

//console.log(color);

var svg = d3.select("#chart").selectAll("svg")
    .data(d3.range(2012, 2013))
  .enter().append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + (margin.left + (width - cellSize * 7) / 2) + "," + (margin.top + (height - cellSize * 60) / 2) + ")");
	
svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text(String);


var rect = svg.selectAll("rect.day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return day(d) * cellSize; })
    .attr("y", function(d) { return week(d) * cellSize; })
    .datum(format);

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll("path.month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);

//d3.csv("test.csv", function(csv) {


var data = d3.nest()
.key(function(d) { return d.date; })
.rollup(function(d) { return d[0].count; })
.map(testData);

//console.log(data);

rect.filter(function(d) { return d in data; })
.attr("class", function(d) { return "day q" + color(data[d]) + "-11";  })
.attr("onclick", "foo(this, topic);")
.select("title")
.text(function(d) { return "Date: " + d + ", Count: " + data[d]; });

/*.append("set")
.attr("attributeName","fill") 
.attr("from","black") 
.attr("to","red") 
.attr("begin","mousedown") 
.attr("end","mouseup")*/




//});
/*
function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

*/

//rotating?? - Tze, can't figure out how the month sort out,
//but monthPath use to draw monthe and the bacl lines in between?

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (d0) * cellSize + "," + (w0 + 1) * cellSize
      + "V" + w0 * cellSize 
      + "H" + 7 * cellSize
      + "V" + w1 * cellSize 
      + "H" + (d1 + 1) * cellSize
      + "V" + (w1 + 1) * cellSize 
      + "H" + 0
      + "V" + (w0 + 1) * cellSize 
      + "Z";
}
