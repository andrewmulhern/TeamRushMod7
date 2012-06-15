function popup(event, topic){
    // Create popup window for news articles for the current hashtag on the selected date - AJM

	var text = event.childNodes[0].firstChild.nodeValue;
	var newsDate = text.substring(11,13) + "/" + text.substring(14,16) + "/" + text.substring(8,10); 

	var url = "https://www.google.com/search?pz=1&cf=all&ned=us&hl=en&tbm=nws&gl=us&as_q="+topic+"&as_occt=any&as_drrb=b&as_mindate="+newsDate+"&as_maxdate="+newsDate+"&tbs=cdr%3A1%2Ccd_min%3A"+newsDate+"%2Ccd_max%3A"+newsDate+"&authuser=0"

	var left = (screen.width/2)-(675/2);
	var top = (screen.height/2)-(400/2);

	window.open (url, "mywindow","location=1,status=1,scrollbars=1, width=675,height=400,left="+left+",top="+top+"");

}


var margin = {top: 5, right: 20, bottom: 20, left: 140},
    width = 300 - margin.right - margin.left, // width
    height = 2200 - margin.top - margin.bottom, // height
    cellSize = 40; // cell size

var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
    .domain([minValue, maxValue])  // Sets color ranges specific to the data, defined in PHP - AJM
    .range(d3.range(10)); // Sets number of color gradients - AJM


var svg = d3.select("#chart").selectAll("svg")
    .data(d3.range(2012, 2013))
  .enter().append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "RdBu")
  .append("g")
    .attr("transform","translate(15,30)");


//append the year - Tze
svg.append("text")
    .attr("transform", "translate(20," + -20 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text(String);

// Add weeks - AJM
svg.append("text")
    .attr("transform", "translate(20," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Sun");

svg.append("text")
    .attr("transform", "translate(60," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Mon");

svg.append("text")
    .attr("transform", "translate(100," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Tues");

svg.append("text")
    .attr("transform", "translate(140," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Wed");

svg.append("text")
    .attr("transform", "translate(177," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Thurs");

svg.append("text")
    .attr("transform", "translate(220," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Fri");

svg.append("text")
    .attr("transform", "translate(260," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Sat");

//Months, each height manually adjusted via the number between the two + sign - Tze
svg.append("text")
    .attr("transform", "translate(-6," + 100 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Jan");

svg.append("text")
    .attr("transform", "translate(-6," + 260 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Feb");

svg.append("text")
    .attr("transform", "translate(-6," + 420 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Mar");

svg.append("text")
    .attr("transform", "translate(-6," + 620 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Apr");

svg.append("text")
    .attr("transform", "translate(-6," + 780 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("May");

svg.append("text")
    .attr("transform", "translate(-6," + 940 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Jun");

svg.append("text")
    .attr("transform", "translate(-6," + 1140 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Jul");

svg.append("text")
    .attr("transform", "translate(-6," + 1300 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Aug");

svg.append("text")
    .attr("transform", "translate(-6," + 1500 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Sep");

svg.append("text")
    .attr("transform", "translate(-6," + 1660 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Oct");

svg.append("text")
    .attr("transform", "translate(-6," + 1820 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Nov");

svg.append("text")
    .attr("transform", "translate(-6," + 2020 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Dec");


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


var data = d3.nest() // Assigns data dynamically generated by PHP to JS object used for this visualization - AJM
.key(function(d) { return d.date; })
.rollup(function(d) { return d[0].count; })
.map(dynamicData);  // Defined by PHP code - AJM


rect.filter(function(d) { return d in data; })
.attr("class", function(d) { return "day q" + color(data[d]) + "-10";  })
.attr("onclick", "popup(this, topic);") // Call popup function when clicked, pass event data and the current hash tag - AJM
.select("title")
.text(function(d) { return "Date: " + d + ", Count: " + data[d]; });

// CSS file provides border highlighting for mouseover hover, easier than doing so in SVG - AJM


svg.selectAll("text")
    .data(function(d) { console.log(d); return d3.time.days(new Date(d, 0, -19), new Date(d + 1, 0, 1)); })
    .enter()
    .append("svg:text")
    .attr("x", function(d) { return day(d) * cellSize; })
    .attr("y", function(d) { return week(d) * cellSize; })
    .attr("dy", "1.2em")
    .text(function(d) { return d.getDate() })
    .attr("fill", "black");


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

// Legen, wait for it...dary legend - AJM
var legend = d3.select("#legend")
    .append("svg:svg")
    .attr("width", 200)
    .attr("height", 500)
    .attr("class", "RdBu")
    .append("g")
    .attr("transform","translate(15,15)");


legend.selectAll("rect")
    .data(legendData)
    .enter()
    .append("svg:rect")
    .attr("x", 0)
    .attr("y", function(d) { return 20* (d.id); })
    .attr("height", 20)
    .attr("width", 105)
    .attr("class", function(d) { return "day q" + (d.id-1) + "-10"; });

legend.selectAll("text")
    .data(legendData)
    .enter()
    .append("svg:text")
    .attr("x", 10)
    .attr("y", function(d) { return 20* (d.id); })
    .attr("dy", "1.2em")
    .text(function(d) { return d.range;})
    .attr("fill", function(d) { // Create gradient - AJM
            if(d.id==0 || d.id==6 || d.id==5) { return "#313131"};
            if(d.id==8 || d.id==7 || d.id==4 || d.id==3) { return "#3B3B3B"};
            return "#D7D7D7";
        ;});

legend.append("text")
    .attr("transform", "translate(52," + -5 + ")rotate(0)")
    .attr("text-anchor", "middle")
    .text("Tweets per Day"); //Make legend title more meaningful - AJM
