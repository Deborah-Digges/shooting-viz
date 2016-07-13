(function(){
    var LOCATION = "location";
    var WOUNDED = "wounded";
    var KILLED = "killed";
    var VALUE = "value";
    var KEY = "key";

    var mapId = "#statesvg";
    var barchartId = "#barchart";

    var currentYear = 2013; 
    var text;
    var currentSelection = KILLED; 
    var stateData;
    var barHeight = 20;
    var margin = {top: 20, right: 30, bottom: 30, left: 40};

    /* 
        Scales
    */
    var quantize;
    var barScale;


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

    function setUpScale(data) {
        // Calculate the maximum 
        // of the killed and wounded for each year for each state
        var max = 0;
        for(year in data){
            for(state in data[year]) {
                if(data[year] && data[year][state]) {
                    wounded = data[year][state][KILLED]; 
                    killed = data[year][state][WOUNDED]; 
                    thisMax = Math.max.apply(null, [killed, wounded]); 
                     
                    if(thisMax > max) {
                        max = thisMax;
                    } 
                }
            } 
        }

        // Set up the scale for the bar chart
        var width = d3.select(barchartId).node().width.baseVal.value;
        barScale = d3.scale.linear()
                .domain([0, max])
                .range([0, width - 10]);

        // Set up the color scale
        quantize = d3.scale.quantize()
                   .domain([0, max])
                   .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));  
    }

    function drawMap(stateData, year, selection){

        mouseOver.dataObject = stateData[year];
        mouseOver.selection = selection;

        d3.select(mapId).selectAll(".state")
            .data(uStatePaths).enter()
            .append("path")

        d3.selectAll("path")
            .attr("class", function(d){console.log(d.id + " " + stateData[year][d.id][selection]);return "state " + quantize(stateData[year][d.id][selection]);})
            .attr("d", function(d){ return d.d;})
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);

        drawLegend();
    }

    function drawBarChart(stateData, currentYear, currentSelection) {
        var chartElement = d3.select(barchartId);
        var width = chartElement.node().width.baseVal.value;
        var height = chartElement.node().height.baseVal.value;


        chartElement
        .append("g")
        .attr("class", "chart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        var xAxis = d3.svg.axis()
            .scale(barScale)
            .orient("top");

        chartElement.append("g")
        .attr("class", "x axis")
        .call(xAxis);

        var chart = d3.select(barchartId)
        .selectAll(".bar");

        var sortedData = d3.entries(stateData[currentYear])
                .sort(function(first, second)
                    { console.log("HERE");return second[VALUE][currentSelection] - first[VALUE][currentSelection];
                    });

        console.log(sortedData);

        /*
            Enter Selection
        */
        enterSelection = chart.data(sortedData)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
        .append("rect")
        .attr("height", barHeight - 1)
        .attr("width", function(d) { return barScale(+d[VALUE][currentSelection]);});

        /*
            Update Selection
        */
        chart.data(sortedData)
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
        .append("rect")
        .attr("height", barHeight - 1)
        .attr("width", function(d) { return barScale(+d[VALUE][currentSelection]);});


    }

    function drawLegend() {
        var legend = d3.select("#legend").selectAll('g.legendEntry')
        .data(quantize.range())
        .enter()
        .append('g')
        .attr("transform", "translate(700, 15)");

        legend.append("text")
        .text("Affected per million");

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
    
    function draw(stateData, currentYear, currentSelection) {
        drawMap(stateData, currentYear, currentSelection);
        drawBarChart(stateData, currentYear, currentSelection);
    }

    function init() {

        d3.select("#type").on('change', function(){
            currentSelection = this.value;
            draw(stateData, currentYear, currentSelection);
        });
        d3.select("#year").on('change', function(){
            currentYear = this.value;
            draw(stateData, currentYear, currentSelection);
        });

        d3.json("out.json", function(error, data){
            stateData = data;
            setUpScale(stateData);
            draw(stateData, currentYear, currentSelection);
        });
    }

    init();
})();
