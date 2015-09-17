(function(){
    var wounded = {};
    var killed = {};
    var LOCATION = "location";
    var WOUNDED = "wounded";
    var KILLED = "killed";
    var quantize = d3.scale.quantize()
                   .domain([0, 437])
                   .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

    function tooltipHtml(stateName, id) { 
        return "<h4>" + stateName + "</h4>" +
        "<table><tr> Wounded: " + wounded[id] + "</tr></table";
    }
    
    function mouseOver(d){
        d3.select("#tooltip")
        .transition()
        .duration(100)
        .style("opacity", 0.9);

        d3.select("#tooltip").html(tooltipHtml(d.n, d.id))  
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY) + "px");
    }
        
    function mouseOut(){
        d3.select("#tooltip").transition().duration(500).style("opacity", 0);      
    }

    function draw(id){        
        d3.select(id).selectAll(".state")
            .data(uStatePaths).enter()
            .append("path")
            .attr("class", function(d){return "state " + quantize(wounded[d.id]);})
            .attr("d", function(d){ return d.d;})
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)
    }

    function drawLegend() {
        var legend = d3.select("#legend").selectAll('g.legendEntry')
        .data(quantize.range())
        .enter()
        .append('g');

        legend
        .append('rect')
        .attr("x", "10px")
        .attr("y", function(d, i) {
        return i * 15;
        })
        .attr("width", 10)
        .attr("height", 10)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("class", function(d){return d;}); 
        //the data objects are the fill colors

        legend
        .append('text')
        .attr("x", "25px") 
        .attr("y", function(d, i) {
        return i * 15;
        })
        .attr("dy", "0.8em") 
        .text(function(d,i) {
        var extent = quantize.invertExtent(d);
        
        var format = d3.format("0.0f");
        return format(+extent[0]) + " - " + format(+extent[1]);
        });
    }

    function processData(shootings) {
        for (var i = 0; i < uStatePaths.length; i++) {
            state_name = uStatePaths[i].id;
            wounded[state_name] = 0;
            killed[state_name] = 0;
        };

        for (var i = 0; i < shootings.length; i++) {
            shooting = shootings[i];
            shooting_location = shooting[LOCATION];
            wounded[shooting_location] += shooting[WOUNDED];
            killed[shooting_location] += shooting[KILLED];
        };

        /* draw states on id #statesvg */   
        draw("#statesvg");
        drawLegend();

    }
    
    d3.json("out.json", function(error, data){
        processData(data);
    });
})();
