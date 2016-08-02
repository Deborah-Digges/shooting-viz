(function() {
    /*
        Constants
    */
    var WOUNDED = "wounded";
    var KILLED = "killed";
    var VALUE = "value";
    var KEY = "key";

    /*
        IDs
    */
    var mapId = "#statesvg";
    var containerId = "#chartcontainer";
    var chartId = "#chart";

    /*
        Global Data
    */
    var currentYear = 2013;
    var text;
    var currentSelection = KILLED;
    var stateData;
    var barHeight;
    var margin = {top: 20, right: 30, bottom: 30, left: 40};

    /*
        Scales
    */
    var quantize;
    var barScale;
    var yScale;


    function tooltipHtml(stateName, id, dataObject, selection) {
        return "<h4>" + stateName + "</h4>" +
        "<table><tr> Affected(per million): " + dataObject[id][selection] + "</tr></table";
    }

    function mouseOver(d) {
        d3.select("#tooltip")
            .transition()
            .duration(100)
            .style("opacity", 0.9);

        d3.select("#tooltip").html(tooltipHtml(d.n, d.id, mouseOver.dataObject, mouseOver.selection))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");

        d3.select("#" + d.id + "_state")
            .transition()
            .duration(100)
            .style("opacity", 0.4);
    }
    
    function mouseOut(d) {
        d3.select("#tooltip")
            .transition()
            .duration(500)
            .style("opacity", 0);

        d3.select("#" + d.id + "_state")
            .transition()
            .duration(100)
            .style("opacity", 1);

    }

    function setUpScale(data) {
        // Calculate the maximum
        // of the killed and wounded for each year for each state
        var max = 0;

        for (year in data) {
            for (state in data[year]) {
                if (data[year] && data[year][state]) {
                    wounded = data[year][state][KILLED];
                    killed = data[year][state][WOUNDED];
                    thisMax = Math.max.apply(null, [killed, wounded]);

                    if (thisMax > max) {
                        max = thisMax;
                    }
                }
            } 
        }

        // Set up the scale for the bar chart
        var width = d3.select(containerId).node().width.baseVal.value;
        var height = d3.select(containerId).node().height.baseVal.value;

        barScale = d3.scale.linear()
            .domain([0, max])
            .range([0, width - margin.left - margin.right]);

        yScale = d3.scale.ordinal()
            .domain(d3.range(uStatePaths.length))
            .rangeBands([0, height - margin.top - margin.bottom]);

        // Set up the color scale
        quantize = d3.scale.quantize()
            .domain([1, max])
            .range(d3.range(8).map(function (i) {
                return "q" + i + "-8";
            }));
    }


    function drawMap(stateData, year, selection) {
        // Enter selection
        d3.select(mapId)
            .selectAll(".state")
            .data(uStatePaths)
            .enter()
            .append("path");

        mouseOver.dataObject = stateData[year];
        mouseOver.selection = selection;

        // Update attributes for the enter and update selection
        d3.select(mapId)
            .selectAll("path")
            .attr("class", function (d) {
                if (stateData[year][d.id][selection] == 0) {
                    return "state zero";
                }
                return "state " + quantize(stateData[year][d.id][selection]);
            })
            .attr("d", function (d) { 
                return d.d;
            })
            .attr("id", function (d) {
                return d.id + "_state";
            })
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);

        drawLegend();
    }

    function setupBarChart() {
        /*
         Container properties
        */
        var container = d3.select(containerId);
        var width = container.node().width.baseVal.value;
        var height = container.node().height.baseVal.value;

        barHeight = Math.floor((height - margin.top - margin.bottom) / 51.0);
        /*
            Chart Element within the container
        */
        var barChart = container
            .append("g")
            .attr("id", "chart")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        var xAxis = d3.svg.axis()
            .scale(barScale)
            .orient("top");

        barChart.append("g")
            .attr("class", "x axis")
            .call(xAxis);


        barChart.append("text")      // text label for the x axis
            .attr("transform", "translate(" + ((width - margin.left - margin.right) /  2) + " ," + margin.top * 1.2 + ")")
            .text("Affected per million");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        barChart.append("g")
            .attr("class", "x axis")
            .call(yAxis)
            .selectAll("text").remove();
    }

    function drawBarChart(data, year, selection) {
        var bars = d3.select(chartId).selectAll(".bar");

        var sortedData = d3.entries(data[year])
            .sort(function (first, second) { 
                return second[VALUE][selection] - first[VALUE][selection]; 
            });

        // Enter Selection
        enterSelection = bars.data(sortedData)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { 
                return "translate(0," + i * barHeight + ")"; 
            })
            .append("rect");

        // Update attributes for the enter and update selections      
        d3.select(chartId)
            .selectAll("rect")
            .data(sortedData)
            .attr("height", barHeight - 1)
            .attr("width", function (d) { return barScale(+d[VALUE][selection]);})
            .attr("id", function (d) { return d[KEY]; })
            .on("mouseover", function (d) {
                
                var stateData = uStatePaths.filter(function (value) {
                    return value.id == d[KEY];
                })[0];
                mouseOver(stateData);
            })
            .on("mouseout", function (d) {
                var stateData = uStatePaths.filter(function (value) {
                    return value.id == d[KEY];
                })[0];
                mouseOut(stateData);
            });


    }

    function drawLegend() {

        var legend = d3.select("#legend").selectAll("g.legendEntry")
            .data(["zero"].concat(quantize.range()))
            .enter()
            .append("g")
            .attr("transform", "translate(700, 15)");

        legend.append("text")
            .text("Affected per million")
            .attr("transform", "translate(0, -3)");

        legend
            .append("rect")
            .attr("x", "10px")
            .attr("y", function (d, i) {
                return i * 15;
            })
            .attr("width", 10)
            .attr("height", 10)
            .style("stroke", "black")
            .style("stroke-width", 1)
            .attr("class", function (d) {
                return d;
            });
        //the data objects are the fill colors

        if (!text) {
            text = legend
                .append("text");
        }

        text.attr("x", "25px")
            .attr("y", function (d, i) {
                return i * 15;
            })
            .attr("dy", "0.8em")
            .text(function (d,i) {
                if (d == "zero") {
                    return "0";
                }

                var extent = quantize.invertExtent(d);
                var format = d3.format("0.0f");
                return format(+extent[0]) + " - " + format(+extent[1]);
            });
    }

    function draw(data, year, selection) {
        drawMap(data, year, selection);
        drawBarChart(data, year, selection);
    }

    function init() {

        d3.select("#type").on("change", function () {
            currentSelection = this.value;
            draw(stateData, currentYear, currentSelection);
        });
        d3.select("#year").on("change", function () {
            currentYear = this.value;
            draw(stateData, currentYear, currentSelection);
        });

        d3.json("out.json", function (error, data) {
            stateData = data;
            setUpScale(stateData);
            setupBarChart();
            draw(stateData, currentYear, currentSelection);
        });
    }

    init();
})();
