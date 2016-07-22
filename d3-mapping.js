var width = 960,
	height = 1160;

var projection = d3.geo.albers()
					   .center([0, 51])
					   .rotate([4.4, 0])
					   .parallels([50, 60])
					   .scale(3750)
					   .translate([width / 2, height / 2]);

var path = d3.geo.path()
			 .projection(projection);

// Map zoom function
var zoom = d3.behavior.zoom()
                      .translate([0, 0])
                      .scale(1)
                      .scaleExtent([1, 10])
                      .on("zoom", zoomed);

function zoomed() {
  svgMap.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var svgContainer = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
            // Calls zoom function
            .call(zoom);

var svgMap = svgContainer.append("g");

d3.json("GBR_adm2_topojson.json", function(error, uk) {
	
	var subunits = topojson.feature(uk, uk.objects.GBR_adm2);
	
	svgMap.selectAll(".subunit")
	   .data(topojson.feature(uk, uk.objects.GBR_adm2).features)
	   .enter()
	   .append("path")
	   .attr("class", function(d) { return "subunit." + d.properties.NAME_1; })
	   .attr("d", path)
	   
	   // Color each admin unit according to its parent country
	   .attr("fill", function(d){
	   	if (d.properties.NAME_1 == "Scotland") {
	   		return "#66bf7f";
	   	} else if (d.properties.NAME_1 == "Wales") {
	   		return "#99d594";
	   	} else if (d.properties.NAME_1 == "Northern Ireland") {
	   		return "#e6f5b1";
	   	} else {
	   		return "#ccebc5";
	   	}
	   })
	   
	   .attr("stroke-width", 0.25)
       .attr("stroke", "black")

       .on("mousemove", function(d) {
        
       // Update tooltip position and value
       d3.select("#tooltip")
       .style("top", (d3.event.pageY) + 20 + "px")
       .style("left", (d3.event.pageX) + 20 + "px")
       .select("#value1")
       .text(d.properties.NAME_2);

       d3.select("#tooltip")
       .style("top", (d3.event.pageY) + 20 + "px")
       .style("left", (d3.event.pageX) + 20 + "px")
       .select("#value2")
       .text(d.properties.NAME_1);
       
       // Show tooltip
       d3.select("#tooltip").classed("hidden", false);
       })
    
	   // Hide tooltip
       .on("mouseout", function() {
       d3.select("#tooltip").classed("hidden", true);
       });
});