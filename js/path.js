// 这是接口，输入为号码牌id
function DrawThePath(id) {
	drawPATH(id);
	drawPATH2(id);
	document.getElementById("MOVE_PATH").style.display = "block";
	document.getElementById("black_overlay").style.display = "block";
	//console.log(document.getElementById("MOVE_PATH_2d").offsetWidth);
	//console.log(document.getElementById("MOVE_PATH_2d").offsetHeight);
}

// 关闭弹窗按钮
function CloseTheWindow() {
	document.getElementById("MOVE_PATH").style.display = "none"
	document.getElementById("black_overlay").style.display = "none"
}

// 测试用函数，不使用
function ButtonClick_TEST() {
	var ans = document.getElementById("INPUT").value
	DrawThePath(ans)
}

// ——————————————————————————————————————————————————————————————————————————————
// ——————————————————————————————————————————————————————————————————————————————
// ——————————————————————————————————————————————————————————————————————————————

// 以下为2d轨迹图部分

var pos_data = {}

//dayX
function drawMAP(dayX) {
	var sensors_map = new Map();
	var all_rects1 = new Array();
	var all_rects2 = new Array();
	var all_areaRects = new Object();

	var x_left = 0.005;
	var x_step = 0.027;
	var y_top1 = 0.08;
	var y_top2 = 0.52
	var y_step = 0.025;
	var width = 511;
	var height = 447;
	var svg;
	

	/********************* 绘制原始地图 ****************************/

	d3.csv("data/sensors.csv", function (error, data0) {

		//svg
		svg = d3.select("#MOVE_PATH_2d")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		//draw rects

		for (var i = 0; i < 16; i++) {
			all_rects1[i] = new Array();
			all_rects2[i] = new Array();
			for (var j = 0; j < 30; j++) {
				all_rects1[i][j] = svg.append("rect")
					.attr('index_x', i)
					.attr('index_y', j)
					.attr('x', width * x_left + width * j * x_step)
					.attr("y", height * y_top1 + height * i * y_step)
					.attr("width", width * x_step)
					.attr("height", height * y_step)
					.attr("fill", d3.rgb(192, 192, 192))
					.style("stroke", "grey")
					.style("stroke-width", "0.1px");
				//.style("opacity", 0.85);

				all_rects2[i][j] = svg.append("rect")
					.attr('index_x', i)
					.attr('index_y', j)
					.attr('x', width * x_left + width * j * x_step)
					.attr("y", height * y_top2 + height * i * y_step)
					.attr("width", width * x_step)
					.attr("height", height * y_step)
					.attr("fill", d3.rgb(192, 192, 192))
					.style("stroke", "grey")
					.style("stroke-width", "0.1px");
				//.style("opacity", 0.85);
			}
		}

		for (var i = 0; i < data0.length; i++) {
			var tmp_obj = new Object();
			tmp_obj['floor'] = Number(data0[i]['floor']);
			tmp_obj['x'] = Number(data0[i]['x']);
			tmp_obj['y'] = Number(data0[i]['y']);
			sensors_map.set(data0[i]['sid'], tmp_obj);
			if (tmp_obj['floor'] == 1)
				all_rects1[tmp_obj['x']][tmp_obj['y']].attr("fill", 'white');
			else
				all_rects2[tmp_obj['x']][tmp_obj['y']].attr("fill", 'white');
		}

		//draw areas

		all_areaRects["分会场A"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top1 + height * 2 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","分会场A")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top1 + height * 2 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("分会场A");

		all_areaRects["分会场B"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top1 + height * 4 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","分会场B")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top1 + height * 4 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("分会场B");

		all_areaRects["分会场C"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top1 + height * 6 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","分会场C")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top1 + height * 6 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("分会场C");

		all_areaRects["分会场D"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top1 + height * 8 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","分会场D")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top1 + height * 8 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("分会场D");

		all_areaRects["海报区"] = svg.append("rect")
			.attr('x', width * x_left + width * 7 * x_step)
			.attr('y', height * y_top1 + height * 3 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 7)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","海报区")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 7 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 3 * y_step + height * y_step * 7 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.style("writing-mode", "vertical-lr")
			.text("海报区");

		all_areaRects["签到处"] = svg.append("rect")
			.attr('x', width * x_left + width * 2 * x_step)
			.attr('y', height * y_top1 + height * 12 * y_step)
			.attr("width", width * x_step * 4)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","签到处")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 2 * x_step + width * x_step * 4 / 2)
			.attr('y', height * y_top1 + height * 12 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("签到处");

		all_areaRects["VIP扶梯1"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top1 + height * 1 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 1)
			.attr("fill", "yellow")
			.attr("fill-opacity", 0.1)
			.attr("id","VIP扶梯1")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 1 * y_step + height * y_step * 1 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.5)
			.style("font-weight", "500")
			.style("fill", "grey")
			.text("VIP扶梯1");

		all_areaRects["厕所1"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top1 + height * 4 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","厕所1")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 4 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.7)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("厕所1");

		all_areaRects["茶歇点1"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top1 + height * 6 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 4)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","茶歇点1")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 6 * y_step + height * y_step * 4 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.7)
			.style("font-weight", "600")
			.style("fill", "grey")
			.style("writing-mode", "vertical-lr")
			.text("茶歇点1");

		all_areaRects["VIP休息室"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top1 + height * 10 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","VIP休息室")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 10 * y_step + height * y_step * 2 / 2.8)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("VIP");
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 10 * y_step + height * y_step * 2 / 1.2).attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("休息室");

		all_areaRects["扶梯1"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top1 + height * 14 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 1)
			.attr("fill", "yellow")
			.attr("fill-opacity", 0.1)
			.attr("id","扶梯1")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 14 * y_step + height * y_step * 1 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.5)
			.style("font-weight", "500")
			.style("fill", "grey")
			.text("扶梯1");

		all_areaRects["展厅"] = svg.append("rect")
			.attr('x', width * x_left + width * 15 * x_step)
			.attr('y', height * y_top1 + height * 2 * y_step)
			.attr("width", width * x_step * 4)
			.attr("height", height * y_step * 10)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","展厅")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 15 * x_step + width * x_step * 4 / 2)
			.attr('y', height * y_top1 + height * 2 * y_step + height * y_step * 10 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("展厅");

		all_areaRects["主会场"] = svg.append("rect")
			.attr('x', width * x_left + width * 19 * x_step)
			.attr('y', height * y_top1 + height * 2 * y_step)
			.attr("width", width * x_step * 10)
			.attr("height", height * y_step * 10)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","主会场")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 19 * x_step + width * x_step * 10 / 2)
			.attr('y', height * y_top1 + height * 2 * y_step + height * y_step * 10 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("主会场");

		all_areaRects["服务台"] = svg.append("rect")
			.attr('x', width * x_left + width * 19 * x_step)
			.attr('y', height * y_top1 + height * 14 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","服务台")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 19 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 14 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("服务台");

		all_areaRects["茶歇点2"] = svg.append("rect")
			.attr('x', width * x_left + width * 21 * x_step)
			.attr('y', height * y_top1 + height * 14 * y_step)
			.attr("width", width * x_step * 4)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","茶歇点2")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 21 * x_step + width * x_step * 4 / 2)
			.attr('y', height * y_top1 + height * 14 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("茶歇点2");

		all_areaRects["媒体间"] = svg.append("rect")
			.attr('x', width * x_left + width * 25 * x_step)
			.attr('y', height * y_top1 + height * 14 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","媒体间")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 25 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 14 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("媒体间");

		all_areaRects["厕所2"] = svg.append("rect")
			.attr('x', width * x_left + width * 27 * x_step)
			.attr('y', height * y_top1 + height * 14 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","厕所2")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 27 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top1 + height * 14 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.6)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("厕所2");

		all_areaRects["餐厅"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top2 + height * 2 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 8)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","餐厅")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top2 + height * 2 * y_step + height * y_step * 8 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("餐厅");

		all_areaRects["黑客大赛区"] = svg.append("rect")
			.attr('x', width * x_left + width * 1 * x_step)
			.attr('y', height * y_top2 + height * 10 * y_step)
			.attr("width", width * x_step * 5)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","黑客大赛区")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 1 * x_step + width * x_step * 5 / 2)
			.attr('y', height * y_top2 + height * 10 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.7)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("黑客大赛区");

		all_areaRects["休闲区"] = svg.append("rect")
			.attr('x', width * x_left + width * 0 * x_step)
			.attr('y', height * y_top2 + height * 13 * y_step)
			.attr("width", width * x_step * 6)
			.attr("height", height * y_step * 3)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","休闲区")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 0 * x_step + width * x_step * 6 / 2)
			.attr('y', height * y_top2 + height * 13 * y_step + height * y_step * 3 / 2)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.8)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("休闲区");

		all_areaRects["VIP扶梯2"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top2 + height * 1 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 1)
			.attr("fill", "yellow")
			.attr("fill-opacity", 0.1)
			.attr("id","VIP扶梯2")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top2 + height * 1 * y_step + height * y_step * 1 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.5)
			.style("font-weight", "500")
			.style("fill", "grey")
			.text("VIP扶梯2");

		all_areaRects["厕所3"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top2 + height * 4 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","厕所3")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top2 + height * 4 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.7)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("厕所3");

		all_areaRects["工作间"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top2 + height * 6 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 2)
			.attr("fill", "blue")
			.attr("fill-opacity", 0.1)
			.attr("id","工作间")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
			.attr('y', height * y_top2 + height * 6 * y_step + height * y_step * 2 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.7)
			.style("font-weight", "600")
			.style("fill", "grey")
			.text("工作间");

		all_areaRects["扶梯2"] = svg.append("rect")
			.attr('x', width * x_left + width * 10 * x_step)
			.attr('y', height * y_top2 + height * 14 * y_step)
			.attr("width", width * x_step * 2)
			.attr("height", height * y_step * 1)
			.attr("fill", "yellow")
			.attr("fill-opacity", 0.1)
			.attr("id","扶梯2")
			.style("stroke-width", "2px")
			.style("stroke", "black")
			.style("stroke-opacity", 0.7);
				//all_areaRects["扶梯2"].selectAll()["_parents"][0]  //get the rect
		svg.append("text")
			.attr('x', width * x_left + width * 10 * x_step + width * x_step * 2 / 2)
				//不采用all_areaRects["扶梯2"].attr('x') + all_areaRects["扶梯2"].attr('width')/2)是因为调试发现运算值有错误
			.attr('y', height * y_top2 + height * 14 * y_step + height * y_step * 1 / 1.5)
			.attr("text-anchor", "middle")
			.style("font-size", width * x_step * 0.5)
			.style("font-weight", "500")
			.style("fill", "grey")
			.text("扶梯2");
	})
	//d3.csv("data/day1.csv", function (error, data1) {
	d3.csv(dayXs[dayX], function (error, data1) {
		pos_data = {}
		for (var i = 0; i < data1.length; ++i) {
			if (!(data1[i].id in pos_data)) {
				pos_data[data1[i].id] = []
			}
			var tmp = data1[i].sid
			pos_data[data1[i].id].push({
				"floor": Number(tmp.slice(0, 1)),
				"y": Number(tmp.slice(1, 3)),
				"x": Number(tmp.slice(3, 5)),
				"time": Number(data1[i].time)
			})
		}
		//drawPATH(10001)
		//console.log(pos_data)
	})
}

function drawPATH(id) {
	document.getElementById("MOVE_PATH_ID").innerHTML = "ID " + String(id) + " 的单人轨迹图"

	var x_left = 0.005
	var x_step = 0.027
	var y_top1 = 0.08
	var y_top2 = 0.52
	var y_step = 0.025
	var width = 511
	var height = 447

	var svg = d3.select("#MOVE_PATH_2d")
		.select("svg");
	//console.log(svg.attr('height'));

	svg.selectAll(".path_line")
		.remove()

	if (!(id in pos_data)) {
		console.log("Not found")
		return
	}

	var x = d3.scaleLinear()
		.domain([0, 29])
		.range([width * x_left, width * x_left + width * 29 * x_step])

	var y1 = d3.scaleLinear()
		.domain([0, 15])
		.range([height * y_top1, height * y_top1 + height * 15 * y_step])

	var y2 = d3.scaleLinear()
		.domain([0, 15])
		.range([height * y_top2, height * y_top2 + height * 15 * y_step])

	var id_pos = pos_data[id];
	//console.log(typeof(id));
	var pos_draw = new Array()
	var floor = 1

	for (var i = 0; i < id_pos.length; ++i) {
		if (id_pos[i].floor == floor && i != id_pos.length - 1) {
			pos_draw.push(id_pos[i])
		}
		else {
			if (floor == 1) {
				var line = d3.line()
					.x(function(d) { return x(d.x) + (0.1 + 0.8 * Math.random()) * width * x_step })
					.y(function(d) { return y1(d.y) + (0.1 + 0.8 * Math.random()) * height * y_step })
				floor = 2
			}
			else {
				var line = d3.line()
					.x(function(d) { return x(d.x) + (0.1 + 0.8 * Math.random()) * width * x_step })
					.y(function(d) { return y2(d.y) + (0.1 + 0.8 * Math.random()) * height * y_step })
				floor = 1
			}

			svg.append("path")
				.attr("class", "path_line")
				.attr("d", line(pos_draw))
				.style("fill","none")
				.style("stroke-width", 2)
				.style("stroke","red")

			pos_draw.length = 0
		}
	}
}

// ——————————————————————————————————————————————————————————————————————————————
// ——————————————————————————————————————————————————————————————————————————————
// ——————————————————————————————————————————————————————————————————————————————

// 以下为3d轨迹图部分

var pos_data2 = new Array();
var the_track_data = new Array();
var id_index = new Array();
var path_option;
var my_3d_chart;

function drawMAP2(dayX, task) {
	pos_data2 = []
	the_track_data = []
	id_index = []

	var sensors_map = new Map()
	var cur_id_index = -1;
	for (var i=0;i<20000;i++)
		id_index[i] = -1;
	
	d3.csv("data/sensors.csv",function (error, data0) {
		//绘制地图
		for (var i=0;i<data0.length;i++){
			var tmp_obj = new Object();
			tmp_obj['x'] = Number(data0[i]['y']);
			tmp_obj['y'] = 15-Number(data0[i]['x'])+20*(Number(data0[i]['floor'])-1);
			sensors_map.set(data0[i]['sid'], tmp_obj);
			
			var tmp = new Array();
			tmp.push(tmp_obj['x']);
			tmp.push(tmp_obj['y']);
			tmp.push(0);
			tmp.push(0);
			pos_data2.push(tmp);
		}
	
		//console.log(sensors_map);
	
		d3.csv(dayXs[dayX],function (error,data1) {
			for (var i=0;i<data1.length;i++){
				var id_read = Number(data1[i]['id']);
				var sid_read = Number(data1[i]['sid']);
				var time_read = Number(data1[i]['time']);
				
				if (id_index[id_read]==-1){
					cur_id_index++;
					id_index[id_read] = cur_id_index;
					the_track_data[id_index[id_read]] = new Array();
					
					var tmp = new Array();
					var cur_sid = sensors_map.get(sid_read+'');
					tmp.push(cur_sid['x']);
					tmp.push(cur_sid['y']);
					tmp.push(time_read-25200);
					tmp.push(39630);
					the_track_data[id_index[id_read]].push(tmp);
				}
				else{
					var tmp = the_track_data[id_index[id_read]].pop();
					tmp[3] = time_read - 25200;
					the_track_data[id_index[id_read]].push(tmp);
					
					var tmp1 = new Array();
					var cur_sid = sensors_map.get(sid_read+'');
					tmp1.push(cur_sid['x']);
					tmp1.push(cur_sid['y']);
					tmp1.push(time_read-25200);
					tmp1.push(39630);
					the_track_data[id_index[id_read]].push(tmp1);
				}
			}
			
			//console.log(the_track_data);
			
			
			
			// 基于准备好的dom，初始化echarts实例
			if (task == "new") {
				my_3d_chart = echarts.init(document.getElementById('MOVE_PATH_3d'), 'dark');
			}
	 
			// 指定图表的配置项和数据
			var axisX = new Array();
			for (var i=0;i<30;i++)
				axisX.push(i);
			var axisY = new Array();
			for (var i=0;i<36;i++)
				axisY.push(i);
							
			//添加绘制数据
			while(pos_data2.length>470)
				pos_data2.pop();
			for (var i=0;i<the_track_data[1111].length;i++){
				pos_data2.push(the_track_data[1111][i]);
			}
			
			
			path_option = {
				tooltip: {},
				visualMap: {
					max: 1,
					min: 0,
					inRange: {
						color: ['#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
						//color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
					}
				},
				xAxis3D: {
					type: 'category',
					data: axisX
				},
				yAxis3D: {
					type: 'category',
					data: axisY
				},
				zAxis3D: {
					type: 'value'
				},
				grid3D: {
					boxHeight: 250,
					boxWidth: 300,
					boxDepth: 360,
					light: {
						main: {
							intensity: 1.2
						},
						ambient: {
							intensity: 0.3
						}
					}
				},
				series: [{
					type: 'bar3D',
					stack: '总量',
					data: pos_data2.map(function (item) {
						return {
							value: [item[0], item[1], item[2]]
						}
					}),
					shading: 'color',
					label: {
						show: false,
						textStyle: {
							fontSize: 16,
							borderWidth: 0
						}
					},
					
					itemStyle: {
						opacity: 0,
						
					},

					emphasis: {
						label: {
							textStyle: {
							fontSize: 20,
								color: '#900'
							}
						},
						itemStyle: {
							color: '#900'
						}
					}
				},
					
				{
					type: 'bar3D',
					stack: '总量',
					data: pos_data2.map(function (item) {
						return {
							value: [item[0], item[1], item[3]-item[2]] //
						}
					}),
					shading: 'color',

					label: {
						show: false,
						textStyle: {
							fontSize: 16,
							borderWidth: 0
						}
					},
					
					itemStyle: {
						opacity: 0.99,
					},

					emphasis: {
						label: {
							textStyle: {
								fontSize: 20,
								color: '#900'
							}
						},
						itemStyle: {
							color: '#900'
						}
					}
				}]
			}
		 
			// 使用刚指定的配置项和数据显示图表。
			//my_3d_chart.setOption(path_option);
		
			/*	
			//测试用，可删
			var index = -1;
			function change(){
				index++;
				while(index<id_index.length && id_index[index]<0)
					index++;
				refresh(index);
				setTimeout(change, 500);
			}
			//测试用，可删
			setTimeout(change, 1000);
			*/
		});
	});
}

// 显示给定id的三维轨迹
function drawPATH2(id){
	while(pos_data2.length>470)
		pos_data2.pop();
	
	if (!(id_index[id] in the_track_data)) {
		console.log("Not found")
		//return;
	}
	else {
		for (var i=0;i<the_track_data[id_index[id]].length;i++){
			pos_data2.push(the_track_data[id_index[id]][i]);
		}
	}
				
	path_option.series[0].data = pos_data2.map(function (item) {
		return {
			value: [item[0], item[1], item[2]] //
		}
	});
	path_option.series[1].data = pos_data2.map(function (item) {
		return {
			value: [item[0], item[1], item[3]-item[2]] //
		}
	});
	my_3d_chart.setOption(path_option);
}