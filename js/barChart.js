/**************会场人数实时统计条形图**************/

var updateBar;

function barCharts(dayX){
	var all_rects = new Array();
	var all_texts = new Array();
	var all_densityRects = new Array();
	var all_numberRects = new Array();
	var all_densityBar = new Array();
	var all_numberBar = new Array();
	var all_densityTexts = new Array();
	var all_numberTexts = new Array();
	var all_tags = ['主会场', 'A会场', 'B会场', 'C会场', 'D会场', '展厅'];
	
	var x_left = 0.03;
    var x_step = 0.02;
    var y_top = 0.02;
    var y_step = 0.16;
    var width;
    var height;
    var svg;

	width = document.getElementById("barChart").offsetWidth;
	height = document.getElementById("barChart").offsetHeight;
	svg = d3.select("#barChart")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
				
	for (var i=0;i<6;i++){
		all_rects[i] = svg.append("rect")
			.attr('x', width * x_left)
			.attr("y", height * y_top + height * i * y_step)
			.attr("width", width * (1-2*x_left))
			.attr("height", height * (y_step-0.02))
			.attr("fill", d3.rgb(225, 225, 225))
			.style("stroke", "grey")
			.style("stroke-width", "1px");
		
		all_densityRects[i] = svg.append("rect")
			.attr('x', width * x_left * 6)
			.attr("y", height * (y_top+0.05) + height * i * y_step)
			.attr("width", width * (1-8*x_left))
			.attr("height", height * (y_step/5))
			.attr("fill", 'white')
			.style("stroke", "black")
			.style("stroke-width", "1.5px");
			//.style("opacity", 0.3);
		
		all_numberRects[i] = svg.append("rect")
			.attr('x', width * x_left * 6)
			.attr("y", height * (y_top+0.095) + height * i * y_step)
			.attr("width", width * (1-8*x_left))
			.attr("height", height * (y_step/5))
			.attr("fill", 'white')
			.style("stroke", "black")
			.style("stroke-width", "1.5px");
			//.style("opacity", 0.3);
		
		all_densityBar[i] = svg.append("rect")
			.attr('x', width * x_left * 6)
			.attr("y", height * (y_top+0.05) + height * i * y_step)
			.attr("width", 0)
			.attr("height", height * (y_step/5))
			.attr("fill", d3.rgb(63,127,255));
		
		all_numberBar[i] = svg.append("rect")
			.attr('x', width * x_left * 6)
			.attr("y", height * (y_top+0.095) + height * i * y_step)
			.attr("width", 0)
			.attr("height", height * (y_step/5))
			.attr("fill", d3.rgb(255,127,63));
		
		all_texts[i] = svg.append("text")
			.attr('x', width * x_left * 2)
			.attr("y", height * (y_top+y_step/2) + height * i * y_step)
			.style('font-size', '12px')
			.text(all_tags[i]);
			
		all_densityTexts[i] = svg.append("text")
			.attr('x', width * x_left * 8)
			.attr("y", height * (y_top+y_step/4) + height * i * y_step)
			.style('font-size', '12px')
			.style('fill', d3.rgb(63,127,255))
			.text('密度：'+0+'人/grid');
		
		all_numberTexts[i] = svg.append("text")
			.attr('x', width * x_left * 20)
			.attr("y", height * (y_top+y_step/4) + height * i * y_step)
			.style('font-size', '12px')
			.style('fill', d3.rgb(255,127,63))
			.text('人数：'+0+'人');
	}
	
	d3.csv(dayX_areaDatas[dayX], function (data) {
		updateBar = function (curSecond){
			var tmp = data.filter(function (d) { return d.second == curSecond });
			if (tmp.length>0){
			all_densityBar[0].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[12]['num'])/100)/120);
			all_densityBar[1].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[0]['num'])/10)/120);
			all_densityBar[2].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[1]['num'])/10)/120);
			all_densityBar[3].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[2]['num'])/10)/120);
			all_densityBar[4].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[3]['num'])/10)/120);
			all_densityBar[5].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[11]['num'])/40)/120);
			
			all_densityTexts[0].text('密度：'+ (Number(tmp[12]['num'])/100) +'人/grid');
			all_densityTexts[1].text('密度：'+ (Number(tmp[0]['num'])/10) +'人/grid');
			all_densityTexts[2].text('密度：'+ (Number(tmp[1]['num'])/10) +'人/grid');
			all_densityTexts[3].text('密度：'+ (Number(tmp[2]['num'])/10) +'人/grid');
			all_densityTexts[4].text('密度：'+ (Number(tmp[3]['num'])/10) +'人/grid');
			all_densityTexts[5].text('密度：'+ (Number(tmp[11]['num'])/40) +'人/grid');
			
			all_numberBar[0].transition().duration(150).attr('width', width * (1-8*x_left) * ( Number(tmp[12]['num'])/1200<1 ? Number(tmp[12]['num'])/1200:1));
			all_numberBar[1].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[0]['num'])/1200));
			all_numberBar[2].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[1]['num'])/1200));
			all_numberBar[3].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[2]['num'])/1200));
			all_numberBar[4].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[3]['num'])/1200));
			all_numberBar[5].transition().duration(150).attr('width', width * (1-8*x_left) * (Number(tmp[11]['num'])/1200));
			
			all_numberTexts[0].text('人数：'+ Number(tmp[12]['num']) +'人');
			all_numberTexts[1].text('人数：'+ Number(tmp[0]['num']) +'人');
			all_numberTexts[2].text('人数：'+ Number(tmp[1]['num']) +'人');
			all_numberTexts[3].text('人数：'+ Number(tmp[2]['num']) +'人');
			all_numberTexts[4].text('人数：'+ Number(tmp[3]['num']) +'人');
			all_numberTexts[5].text('人数：'+ Number(tmp[11]['num']) +'人');
			}
		}
		
	})
}