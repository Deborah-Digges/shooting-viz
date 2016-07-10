(function(){
    var LOCATION = "location";
    var WOUNDED = "wounded";
    var KILLED = "killed";
    var quantize;
    var text;
    var id = "#statesvg";
    var maxBound = 50;

    var currentYear = 2013;
    var currentSelection = KILLED;
    var stateData;

    function tooltipHtml(stateName, id, dataObject, selection) { 
        return "<h4>" + stateName + "</h4>" +
        "<table><tr> Affected(per million): " + dataObject[id][selection] + "</tr></table";
    }
    
    function mouseOver(d){
        d3.select("#tooltip")
        .transition()
        .duration(100)
        .style("opacity", 0.9);

        d3.select("#tooltip").html(tooltipHtml(d.n, d.id, mouseOver.dataObject, mouseOver.selection))  
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY) + "px");
    }
        
    function mouseOut(){
        d3.select("#tooltip").transition().duration(500).style("opacity", 0);      
    }

    function setUpScale(bound) {
        quantize = d3.scale.quantize()
                   .domain([0, bound])
                   .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));  
    }

    function drawMap(stateData, year, selection){
        mouseOver.dataObject = stateData[year];
        mouseOver.selection = selection;

        d3.select(id).selectAll(".state")
            .data(uStatePaths).enter()
            .append("path")

        d3.selectAll("path")
            .attr("class", function(d){console.log(d.id + " " + stateData[year][d.id][selection]);return "state " + quantize(stateData[year][d.id][selection]);})
            .attr("d", function(d){ return d.d;})
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);

        drawLegend();
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

        if(!text){
            text = legend
            .append('text');
        }

        text
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
    
    function init() {
        setUpScale(maxBound); 
        d3.select("#type").on('change', function(){
            drawMap(stateData, currentYear, this.value);
        });
        d3.select("#year").on('change', function(){
            drawMap(stateData, this.value, currentSelection);
        });

        d3.json("out.json", function(error, data){
            stateData = data;
            drawMap(stateData, currentYear, currentSelection)
        });
    }

    init();
})();
