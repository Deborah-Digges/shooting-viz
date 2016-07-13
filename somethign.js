var chart = d3.select("#barchart")
.selectAll("g");


bar = chart.data(d3.entries(data[2013]).sort(function(d){ return d["value"]["killed"];}))
.enter()
.append("g")
.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar
.append("rect")
.attr("height", "5px")
.attr("width", function(d) {return d["value"]["killed"];});

bar.append("text")
    .attr("x", function(d) { return d["value"]["killed"] - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d["key"]; })
.style("fill", "steelblue");