//注：d3.csv()内部运行时间较长，因此d3.csv()的外部后继的代码可能在d3.csv()未执行完就开始执行了
//导致出现变量未定义/未赋值的错误
//所以如果后继需要用到在d3.csv()内部赋值的变量，最好将相关代码挪到d3.csv()内

var all_areaRects = new Object();
var timeOut;
function mainMap(dayX){

    var sensors_map = new Map();
    var all_rects1 = new Array();
    var all_rects2 = new Array();
   

    var x_left = 0.18;
    var x_step = 0.021;
    var y_top1 = 0.03;
    var y_top2 = 0.52;
    var y_step = 0.028;
    var width;
    var height;
    var svg;

    /********************* 绘制原始地图 ****************************/

    d3.csv("data/sensors.csv", function (error, data0) {

        //svg

        width = document.getElementById("mainMap").offsetWidth;
        height = document.getElementById("mainMap").offsetHeight;
        svg = d3.select("#mainMap")
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
            .style("font-size", width * x_step * 0.5)
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

        
        //draw entrance and exit



        
    });

    /************************* 动态绘制人员分布*****************************************/

    d3.csv(dayX_mainMaps[dayX], function (error, data1) {

        //设置select

        var Times = d3.map(data1, function (d) { return (d.time) }).keys()
        d3.select("#select")
            .selectAll('myOptions')
            .data(Times)
            .enter()
            .append('option')
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; });



        //初始化人员分布

        startData = data1.filter(function (d) { return d.second == 25230 });
        for (var i = 0; i < startData.length; i++) {
            var y_top = startData[i].floor == "1" ? y_top1 : y_top2;
            //将count个circle随机散布到rect中
            for (var j = 0; j < startData[i].count; j++) {
                cx = width * x_left + width * startData[i].y * x_step + Math.random() * width * x_step;
                cy = height * y_top + height * startData[i].x * y_step + + Math.random() * height * y_step;
                svg.append('circle')
                    .attr('r', 1.5)
                    .attr('cx', cx)
                    .attr('cy', cy)
                    .attr('fill', "red")
            }
        }

        //手动更新人员分布——slider

        function sliderUpdate(curSecond) {

            curFloor = document.getElementById('floor_select').value;
            curData = data1.filter(function (d) { return d.second == curSecond });

            svg.selectAll("circle").remove();//移除当前所有的circle
			if (curData.length>0){
				for (var i = 0; i < curData.length; i++) {
					var y_top = curData[i].floor == "1" ? y_top1 : y_top2;
					//将count个circle随机散布到rect中
					for (var j = 0; j < curData[i].count; j++) {
						cx = width * x_left + width * curData[i].y * x_step + Math.random() * width * x_step;
						cy = height * y_top + height * curData[i].x * y_step + + Math.random() * height * y_step;
						svg.append('circle')
							.attr('r', 1.5)
							.attr('cx', cx)
							.attr('cy', cy)
							.attr('fill', "red")
					}
				}
				document.getElementById('select').value = curData[0].time;
			}

            document.getElementById('slider').value = curSecond;
            

        }

        //手动更新人员分布——select

        function selectUpdate(curTime) {

            curData = data1.filter(function (d) { return d.time == curTime });

            svg.selectAll("circle").remove();//移除当前所有的circle

            for (var i = 0; i < curData.length; i++) {
                var y_top = curData[i].floor == "1" ? y_top1 : y_top2;
                //将count个circle随机散布到rect中
                for (var j = 0; j < curData[i].count; j++) {
                    cx = width * x_left + width * curData[i].y * x_step + Math.random() * width * x_step;
                    cy = height * y_top + height * curData[i].x * y_step + Math.random() * height * y_step;
                    svg.append('circle')
                        .attr('r', 1.5)
                        .attr('cx', cx)
                        .attr('cy', cy)
                        .attr('fill', "red")
                }
            }

            document.getElementById('slider').value = curData[0].second;

        }

        //Button设置：关联Update，须在Update的声明之后

        d3.select("#select").on("change", function () {
            var curTime = d3.select("#select").property("value");
            selectUpdate(curTime);
        });

        d3.select("#slider").on("change", function () {
            var curSecond = document.getElementById('slider').value;
            sliderUpdate(curSecond);

        });

        d3.select("#Play").on("click", Play);
        
        function Play() {
            var curSecond = document.getElementById('slider').value;
            curSecond = String(parseInt(curSecond) + 30); 
            sliderUpdate(curSecond);
            updateBar(curSecond);
            heatmap3D_Update();
            timeOut = setTimeout(Play,200);

        }
        d3.select("#Stop").on("click", Stop);
        
        function Stop() {
            clearTimeout(timeOut);
        }
    })

}



