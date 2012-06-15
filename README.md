TeamRushMod7
============

* index.php  - contains code which dynamically generates the JS data array depending on the query; displays the main page
* js/heatmap.php - creates the D3 calendar visualization and legend as highly customized by Team Rush
* css/heatmap.css - styles the calendar
* css/colorbrewer.css - generates diverging red/blue color scheme
* original-heatmap.php - visualization before styling and adding vs. setup

Live demo @ http://bongo.ischool.drexel.edu/~ajm/TeamRushMod7/
GitHub repo @ https://github.com/andrewmulhern/TeamRushMod7


Module 7.3 Modification Change Log
===============================

* 1) Added dynamic gradient text to legend and change title for better usability

```php
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
```

* 2) Added day numbers and day of the week headings to the calendar grid

```php
svg.selectAll("text")
    .data(function(d) { console.log(d); return d3.time.days(new Date(d, 0, -19), new Date(d + 1, 0, 1)); })
    .enter()
    .append("svg:text")
    .attr("x", function(d) { return day(d) * cellSize; })
    .attr("y", function(d) { return week(d) * cellSize; })
    .attr("dy", "1.2em")
    .text(function(d) { return d.getDate() })
    .attr("fill", "black");
```

* 3) Created versus setup to compare two hashtags on one page (see index.php)