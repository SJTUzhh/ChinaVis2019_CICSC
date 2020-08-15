function Convert(d) {
	h = Math.floor(d / 3600)
	m = Math.floor((d - h * 3600) / 60)
	if (h < 10) h = "0" + String(h)
	else h = String(h)
	if (m < 10) m = "0" + String(m)
	else m = String(m)
	return h + ":" + m
}

function lineGraph(dayX) {

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = document.getElementById("lineGraph").offsetWidth - margin.left - margin.right,
        height = document.getElementById("lineGraph").offsetHeight - margin.top - margin.bottom;

    var svg_lineGraph = d3.select("#lineGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(dayX_areaDatas[dayX], function (data) {
        var Areas = d3.map(data, function (d) { return (d.area) }).keys();
        //console.log(Areas);
        
        // A color scale: one color for each Area
        var myColor_lineGraph = d3.scaleOrdinal()
            .domain(Areas)
            .range(d3.schemeSet2);

        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.second; }))
            .range([0, width]);
        var xAxis_lineGraph = svg_lineGraph.append("g")
            .style("font-size", 12)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d => Convert(d))
                .ticks(10));
        svg_lineGraph.append("text")
            .attr("text-anchor", "end")
            .attr("x", width + 35)
            .attr("y", height + 30)
            .text("时间")
            .style("font-family", "monospace")
            .style("font-size", 14);

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min(data.filter(function (d) { return d.area == Areas[0] }), function (d) { return +d.num; }),
            d3.max(data.filter(function (d) { return d.area == Areas[0] }), function (d) { return +d.num; })])
            .range([height, 0])
        var yAxis_lineGraph = svg_lineGraph.append("g")
            .style("font-size", 12)
            .call(d3.axisLeft(y));
        svg_lineGraph.append("text")
            .attr("text-anchor", "end")
            .attr("x", 10)
            .attr("y", -15)
            .text("人数")
            .style("font-family", "monospace")
            .style("font-size", 14);

        line = svg_lineGraph
            .append('g')
            .append("path")
            //注意下面是datum而非data，因为是绑定一个path到选择集上
            //而data是绑定一组到选择集上
            .datum(data.filter(function (d) { return d.area == Areas[0] }))
            .attr("d", d3.line()
                .x(function (d) { return x(d.second) })
                .y(function (d) { return y(+d.num) })
            )
            .attr("stroke",function (d) { return myColor_lineGraph("分会场A") })
            .style("stroke-width", 4)
            .style("fill", "none");

        var title_lineGraph = svg_lineGraph
            .append("text")
            .attr("x", width / 2 - 50)
            .attr("y", -35)
            .text("分会场A")
            .style("font-family", "monospace")
            .style("font-size", 17)
            .style("font-weight", "600");

        function lineGraphUpdate(areaName) {
            console.log(areaName);
            var dataFilter = data.filter(function (d) { return d.area == areaName })
            console.log(dataFilter);
            y.domain([d3.min(dataFilter, function (d) { return +d.num; }),
            d3.max(dataFilter, function (d) { return +d.num; })]);
            yAxis_lineGraph
                .transition()
                .duration(1000)
                .call(d3.axisLeft(y));

            line
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.second) })
                    .y(function (d) { return y(+d.num) })
                )
                .attr("stroke",function (d) { return myColor_lineGraph(areaName) })

            title_lineGraph
                .transition()
                .duration(1000)
                .text(areaName);
        }


        // 给主图绑定区域选择功能，对应绘制折线图

        function areaHovered(){
            d3.select(this)
                .attr("fill-opacity", 0.2)
                .attr("fill","green")
                .attr("rx", 5)
                .attr("ry", 5)
                .style("stroke-opacity", 1)
                .style("stroke-width", "2.5px");
        }

        function areaLeave(){
            d3.select(this)
                .attr("fill-opacity", 0.1)
                .attr("rx", 0)
                .attr("ry", 0)
                .style("stroke-opacity", 0.7)
                .style("stroke-width", "2px");
            if(String(d3.select(this).attr("id")).indexOf("扶梯") != -1)
                d3.select(this).attr("fill","yellow");
            else d3.select(this).attr("fill","blue");
        }

        function areaSelected(){
            //console.log(d3.select(this).attr("id"))
            var areaName = d3.select(this).attr("id");

            //更新折线图
            lineGraphUpdate(areaName);

        }

        for(var area in all_areaRects){
            //console.log(area,all_areaRects[area]);
            all_areaRects[area].on("click",areaSelected);
            all_areaRects[area].on("mouseover",areaHovered);
            all_areaRects[area].on("mouseleave",areaLeave);
        }
            
    });

}

