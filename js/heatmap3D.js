var myChart;
var is_init = 0;
var heatmap3D_Update;

function heatmap3D(dayX){
 
    d3.csv(dayX_mainMaps[dayX], function (error, data) {

        //maxCount = d3.max(data, function (d) { return +d.count; });
        //console.log(maxCount);

        if(is_init == 0){
            myChart = echarts.init(document.getElementById('heatmap3D'));
            is_init = 1;
        }        

        startData = data.filter(function (d) { return d.second == 25230 && d.floor == 1 });
        startData_use = new Array();
        for (var i = 0; i < startData.length; i++) {
            tmp = new Array();
            tmp.push(Number(startData[i].x));
            tmp.push(Number(startData[i].y));
            tmp.push(Number(startData[i].count));
            startData_use.push(tmp);
            //console.log(startData_use);
        }

        //range(start, end) 左闭右开

        let range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);

        var x = range(0, 16);
        var y = range(0, 30);

        var option = {
            tooltip: {},
            visualMap: {
                max: 100,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            xAxis3D: {
                type: 'category',
                data: x
            },
            yAxis3D: {
                type: 'category',
                data: y
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
				boxHeight: 160,
                boxWidth: 160,
                boxDepth: 300,
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
                data: startData_use.map(function (item) {
                    return {
                        value: [item[0], item[1], item[2]]
                    }
                }),
                shading: 'color',

                label: {
                    show: false,
                    textStyle: {
                        fontSize: 16,
                        borderWidth: 1
                    }
                },

                itemStyle: {
                    opacity: 0.6
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

        myChart.setOption(option);

        //初始化floor_select

        var floors = d3.map(data, function (d) { return (d.floor) }).keys()
        d3.select("#floor_select")
            .selectAll('myOptions2')
            .data(floors)
            .enter()
            .append('option')
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; });

        //手动更新3D柱状图——floor_select

        function floor_select_Update(curFloor) {

            curSecond = document.getElementById('slider').value;
            curData = data.filter(function (d) { return d.floor == curFloor && d.second == curSecond });

            curData_use = new Array();
            for (var i = 0; i < curData.length; i++) {
                tmp = new Array();
                tmp.push(Number(curData[i].x));
                tmp.push(Number(curData[i].y));
                tmp.push(Number(curData[i].count));
                curData_use.push(tmp);
            }

            option["series"][0]["data"] = curData_use.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]]
                }
            });

            myChart.setOption(option);

        }

        //关联floor_select_Update

        d3.select("#floor_select").on("change", function () {
            var curFloor = document.getElementById('floor_select').value;
            console.log(curFloor);
            floor_select_Update(curFloor);

        });

        //更新3D柱状图

        heatmap3D_Update = function () {

            curFloor = document.getElementById('floor_select').value;
            curSecond = document.getElementById('slider').value;

            curData = data.filter(function (d) { return d.second == curSecond && d.floor == curFloor });

            curData_use = new Array();
            for (var i = 0; i < curData.length; i++) {
                tmp = new Array();
                tmp.push(Number(curData[i].x));
                tmp.push(Number(curData[i].y));
                tmp.push(Number(curData[i].count));
                curData_use.push(tmp);
            }

            option["series"][0]["data"] = curData_use.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]]
                }
            });

            myChart.setOption(option);

        }

    });

}