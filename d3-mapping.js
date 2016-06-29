var width = 960,
	height = 1160;

var projection = d3.geo.albers()
					   .center([0, 55.4])
					   .rotate([4.4, 0])
					   .parallels([50, 60])
					   .scale(6000)
					   .translate([width / 2, height / 2]);

var path = d3.geo.path()
			 .projection(projection);

var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);

d3.json("GBR_adm2_topojson.json", function(error, uk) {
	
	var subunits = topojson.feature(uk, uk.objects.GBR_adm2);
	
	svg.selectAll(".subunit")
	   .data(topojson.feature(uk, uk.objects.GBR_adm2).features)
	   .enter()
	   .append("path")
	   //.attr("class", function(d) { return "subunit " + d.id; })
	   //.attr("class", function(d) { return "subunit " + d.id; })
	   .attr("d", path)
	   .attr("fill", "#4b4a47")
	   .attr("stroke-width", 1)
       .attr("stroke", "#f5f5f5")

       .on("mousemove", function(d) {
        
       //Update tooltip position and value
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
       
       //Show tooltip
       d3.select("#tooltip").classed("hidden", false);
       })
    
	   //Hide tooltip
       .on("mouseout", function() {
       //Hide the tooltip
       d3.select("#tooltip").classed("hidden", true);
       });

});