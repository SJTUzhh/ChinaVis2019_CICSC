function pie(dayX) {
	d3.csv("data/classify.csv", function(error, data) {
		if (error) {
			alert ("Couldn't load the dataset!");
		}
		var work = [], media = [], vip = [], player = [], unit = [], audi = [], comi = [];
		for (let index = 0; index < data.length; index++) {
			if (data[index].class == "1")
                work.push(data[index].id);
            else if (data[index].class == "2")
                media.push(data[index].id);
            else if (data[index].class == "3")
                vip.push(data[index].id);
            else if (data[index].class == "4")
                player.push(data[index].id);
            else if (data[index].class == "5")
                unit.push(data[index].id);
            else if (data[index].class == "6")
                audi.push(data[index].id);
            else
                comi.push(data[index].id);
		}

		d3.select("#pie > svg").remove();

        // 数据准备
        let dataset = [{label: '工作人员', num: work.length},{label: '媒体记者', num: media.length}, {label: '普通游客', num: audi.length},
        {label: '参赛者', num: player.length}, {label: 'vip', num: vip.length},
		{label: '团体人员', num: comi.length},{label: '参展单位', num: unit.length}];
		let margin = {top: 20, right: 20, bottom: 20, left: 20};
        let width = document.getElementById("pie").offsetWidth;
        let height = document.getElementById("pie").offsetHeight;
		// 弧形生成器内、外半径
		let innerRadius = 0, outerRadius = width / 6;
		let svg = d3.select('#pie').append('svg').attr('width', width).attr('height', height);
		let g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top  + ')');
		
		// 颜色比例尺
		let colorScale = d3.scaleOrdinal().domain(d3.range(dataset.length))
			.range(d3.schemeCategory10);
		// 创建饼状图
		let pie = d3.pie().value(function(d) {return d.num}).sort(null);
		
		// 创建弧形生成器
		let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
		let arc2 = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius + 30);
		// 饼状图生成器转换数据
        let pieData = pie(dataset);
        
		let arcs = svg.selectAll('.g').data(pieData).enter().append('g').attr('cursor', 'pointer')
			.attr('transform', 'translate(' + width / 3 + ',' + height / 2 + ')');
		// 绘制饼状图的各个扇形
		arcs.append('path')
			.transition()
			.delay(0)
			.duration(500)
			//.each(d3.easeBounceInOut)
			.attrTween('d', function(d, i) {
				let interpolate = d3.interpolate(d.startAngle, d.endAngle);
				return function(t) {
					d.endAngle = interpolate(t);
					return arc(d);
				}
			})
			.attr('fill', function(d, i) {
				d.color = colorScale(i);
				return d.color;
			});

		// 绘制饼状图上的文字信息
		arcs.append('text')
			.attr('transform', function(d) {
				return 'translate(' + arc.centroid(d) + ')';
			})
			.attr('text-anchor', 'middle')
			.text(function(d) {
				// 文字不超过扇形能容纳的长度才将其显示
				if (getStrLen(d.data.label) < (outerRadius / 2) * Math.sin(d.endAngle - d.startAngle)) {
					return ((d.endAngle - d.startAngle) / 6.283185307179586 * 100).toFixed(2) + '%';
				}
			});
		// 图注个数
		let count = 0;
		let before = 0;
		// 图注文字
		let text=svg.selectAll(".text")
            .data(pieData) //返回是pie(data0)
            .enter().append("g")
            .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")")
            .append("text")
            .style('text-anchor', function(d, i) {
                //根据文字在是左边还是右边，在右边文字是start，文字默认都是start。
                return (d.startAngle + d.endAngle)/2 < Math.PI ? 'start' : 'end';
            })
            .attr('transform', function(d, i) {
                var pos = arc.centroid(d);      //centroid(d)计算弧中心
                pos[0] = outerRadius*((d.startAngle+d.endAngle) / 2 < Math.PI ? 1.4 : -1.4);
				if (overRange(d)) {
					if (before == 0) before = pos[1];
					pos[1] *= (2.1 + count * 0.4);                    //将文字移动到外面去。
					// 超出将count（图注数量）自加
					count++;
					if (count > 2) count = before = 0;
				}else {
					count = before = 0;
				}
                return 'translate(' + pos + ')';
            })
            .attr("dy",".3em")              //将文字向下平移.3em
            .text(function(d) {             //设置文本
				// 如果文本长度超过扇形长度，则才显示图注
				if (overRange(d)) {
					return ((d.endAngle - d.startAngle) / 6.283185307179586 * 100).toFixed(2) + '%';
				}
                return '';
            });
		
		count = 0; // 重置
		// 图注连线
		let line = svg.selectAll(".line")      //添加文字和弧之间的连线
			.data(pieData) //返回是pie(data0)
			.enter().append("g")
			.attr("transform", "translate(" + width / 3 + "," + height / 2 + ")")
			.append("polyline")
			.attr('points', function(d, i) {
				var pos1 = arc.centroid(d), pos2 = arc.centroid(d), pos3 = arc.centroid(d);
				// 如果文本长度超过扇形长度，则才显示图注
				if (overRange(d)) {
					pos1[0]*=0,pos1[1]*=0;
					pos2[0] *= (2.1 + count * 0.4), pos2[1] *= (2.1 + count * 0.4);
					pos3[0] = outerRadius * ((d.startAngle + d.endAngle) / 2 < Math.PI ? 1.4 : -1.4);
					pos3[1] *= (2.1 + count * 0.4);
					count++;
					if (count > 2) {
						before = pos2[1];
						count = 0;
					}	
					//pos2是从圆弧出来到长直虚线的长度，pos3就是将pos2平移后得到的位置
					//三点链接在一起就成了线段。
					return [pos1, pos2, pos3];
				}else {
					before = pos2[1];
					count = 0;
				}
			})
			.style('fill', 'none')
			.style('stroke',function(d,i){
				return d.color;
			})
			.style('stroke-width', "3px")
			.style('stroke-dasharray',"5px");
			
		let label=svg.selectAll('.label')      //添加右上角的标签
			.data(pieData)
			.enter()
			.append('g')
			.attr("transform","translate(" + (width / 3 + outerRadius * 2 + 50) + "," + -20 + ")");
		label.append('rect')        //标签中的矩形
			.style('fill',function(d,i){
				return colorScale(i);
			})
			.attr('x', 0)
			.attr("y",function(d,i){
				return (height - outerRadius) / 2 + (i - 1) * 30;
			})
			.attr('rx','5')     //rx=ry 会出现圆角
			.attr('ry','5')
			.attr('width',30)
			.attr('height',10);
		label.append('text')            //标签中的文字
			.attr('x',function(d,i){
				return 40;              //因为rect宽度是30，所以把文字偏移10,在后面再将文字设置居中
			})
			.attr("y",function(d,i){        
				return (height - outerRadius) / 2 + 10 + (i - 1) * 30;
			})
			.text(function(d){
				return d.data.label;
			})
			.style({
				"font-size":"10px",
				"text-anchor":"middle",
				'fill':"white",
				"font-weight":600
			});
 
		// 获取最大的endAngle 
		//function max(data) {
		//	if (!data instanceof Array) return data;
		//	let max;
		//	data.forEach(function(d, i) {
		//		if (i == 0) max = d.endAngle;
		//		if (max < d.endAngle) 
		//			max = d.endAngle;
		//	});
		//	return max;
		//}
		
		// 文字是否超出扇形区域(超出返回true，不超出返回false)
		function overRange(d) {
			// 扇形长度（不是弧长，是从扇形左边的中间位置引出的一条水平线与右边相交的直线长度）
			// 计算公式：扇形半径/2 * sin(弧度)
			let length = (outerRadius / 2) * Math.sin(d.endAngle - d.startAngle);
			// 字符串长度
			let len = getStrLen(d.data.label);
			if (len >= length) {
				return true;
			}
			return false;
		}
		// 悬浮提示框
		let tooltip = d3.select('#tooltip');
		
		arcs.on('mouseover', function() {
			let label;
			d3.select(this).select('path').transition().attr('d', function(d) {
				label = d.data.label;
				return arc2(d);
			});
			// 悬浮在直方图上时，显示提示框
			tooltip.html(label).transition().duration(500).style('left', d3.event.pageX - 20)
				.style('top', d3.event.pageY + 20).style('opacity', 1.0);
		});
		arcs.on('mouseout', function() {
			d3.select(this).select('path').transition().attr('d', function(d) {
				return arc(d);
			});
			// 隐藏悬浮框
			tooltip.transition().style('opacity', 0);
		})
		arcs.select('path').on('click', list);
		
		// 获取字符串所占像素
		function getStrLen(val) {
			var len = 0;
			for (var i = 0; i < val.length; i++) {
				var length = val.charCodeAt(i);
				if(length >= 0 && length <= 128) {
					len += 1;
				}else {
                    len += 2;
                }
            }
            return len * 7.1;
		}

		//绘制此分类的人员列表
		function list() {
			let margin = {top: 10, right: 10, bottom: 10, left: 10};
			let width = document.getElementById("list").offsetWidth;
			let height1 = document.getElementById("list").offsetHeight;
			let rectHeight = height1 * 0.04, rectWidth = width * 0.75;

			let kind;
			let listData;
			d3.select(this).datum(function(d) {
				kind = d.data.label;
			})
			if (kind == '工作人员')
				listData = work;
			else if (kind == '媒体记者')
				listData = media;
			else if (kind == 'vip')
				listData = vip;
			else if (kind == '参赛者')
				listData = player;
			else if (kind == '参展单位')
				listData = unit;
			else if (kind == '普通游客')
				listData = audi;
			else if (kind == '团体人员')
				listData = comi;

			let leng = listData.length;

			//添加图例
			

			//翻页
			function drawList(page) {
				document.getElementById("page").value=page;
				d3.csv(dayX_results[dayX], function(error, data){
					if (error) {
						alert ("Couldn't load the dataset2!");
					}

					let sliceData = listData.slice(page * 10 - 10, page * 10);
					let rectData = []
					for (let index = 0; index < 10; index++){
						let oneData = binarySearch(parseInt(sliceData[index]));
						rectData.push(oneData);
					}

					//二分查找所需数据
					function binarySearch(id) {
						let result = [];
						let left = 0;
						let right = data.length - 1;
						while (left < right){
							let mid = Math.floor((left + right) / 2);
							if (data[mid].id < id) {
								left = mid + 1;
							} else {
								right = mid;
							}
							if (data[right].id == id) {
								break;
							}
						}

						for (let index = right; data[index].id == id; index++) {
							result.push({start: data[index].start, end: data[index].end, pos: data[index].pos});
						}
						return result;
					}

					d3.select('#list > svg').remove();
					d3.select('#pagenum')
						.text(function(d){
							return '  /' + Math.ceil(leng / 10);
						})
					let svg2 = d3.select('#list').append('svg')
												.attr('width', width ) //+ margin.left + margin.right
												.attr('height', height1 ); //+ margin.top + margin.bottom
					let color = d3.scaleOrdinal(d3.schemeCategory20);

					map = ['其他', '主会场', '展厅', '分会场', '餐厅', '海报区', '签到处', '黑客大赛区',
					'休闲区', '茶歇点', '厕所', '工作间', 'vip休息室', '媒体间', '服务台'];
					let label=svg2.selectAll('.g')      //添加右侧的标签
						.data(map)
						.enter()
						.append('g')
						.attr("transform","translate(" + (rectWidth * 1.13) + "," + height1 * 0.05 + ")");

					label.append('rect')        //标签中的矩形
						.style('fill',function(d,i){
							return color(i);
						})
						.attr('x', 0)
						.attr("y",function(d,i){
							return i * height1*0.06;
						})
						.attr('width',30)
						.attr('height',height1*0.03);

					label.append('text')            //标签中的文字
						.attr('x',function(d,i){
							return 40;              //因为rect宽度是30，所以把文字偏移10,在后面再将文字设置居中
						})
						.attr("y",function(d,i){        
							return i * height1*0.06+height1*0.03;
						})
						.text(function(d){
							return d;
						})
						.style('font-size', '12px')
						.style({
							"text-anchor":"middle",
							'fill':"white",
							"font-weight":600
						});

					

					//堆叠条形图
					for (let index = 0; index < 10; index++) {
						svg2.selectAll(".rect")
							.data(rectData[index])
							.enter()
							.append("rect")
							.transition()
							.delay(0)
							.duration(500)
							.attr("x", function(d, i) {
								return width * 0.08 + rectWidth * (parseInt(d.start) - 25200) / 39600;
							})
							.attr("y", index * 0.09 * height1 + 0.05 * height1)
							.attr("width", function(d, i){
								return rectWidth * (parseInt(d.end) - parseInt(d.start)) / 39600;
							})
							.attr("height", rectHeight)
							.attr("fill", function(d){
								return color(parseInt(d.pos));
							});

						svg2.selectAll('.text')
							.data(rectData[index])
							.enter()
							.append('g')
							.append('text')
							.style('font-size', '12px')
							.transition()
							.delay(0)
							.duration(500)
							.text(function(d) {
								if (rectWidth * (parseInt(d.end) - parseInt(d.start)) / 39600 > getStrLen(map[parseInt(d.pos)]))
									return map[parseInt(d.pos)];
							})
							.attr("x", function(d, i) {
								return width * 0.08 + rectWidth * (parseInt(d.start) + parseInt(d.end) - 2 * 25200) / 2 / 39600 - getStrLen(map[parseInt(d.pos)]) / 2;
							})
							.attr("y", index * 0.09 * height1 + 0.08 * height1);
					}
					
					//时间轴
					var xScale = d3.scaleLinear()
						.domain([25200, 64800])
						.range([width * 0.08, width * 0.08 + rectWidth]);
					var xAxis = d3.axisBottom(xScale)
						.tickFormat(d => Convert(d))
				        .ticks(7); 
					svg2.append("g")
						.attr('transform', "translate(" + 0 + "," + height1 * 0.92 + ")")
						.call(xAxis);

					//添加id
					/*let id_bt = d3.select('#list').selectAll('button')
						.data(sliceData)
						.enter()
						.append('button')
						.attr('value', function(d){
							return d;
						})*/

					//id按钮
					let id_bt = svg2.selectAll('.text')
						.data(sliceData)
						.enter()
						.append('g');

					

					id_bt.append('text')        
						.attr('x', 0)
						.attr("y",function(d, i){        
							return i * 0.09 * height1 + 0.08 * height1;
						})
						.text(function(d){
							return d;
						})
						.style({
							"font-size":"5px",
							"text-anchor":"middle",
							'fill':"white",
							"font-weight":600
						});
					
					function over1(){
						d3.select(this)
							.style('opacity', 0.3)
					}
					function drawTrack(){
						d3.select(this)
							.datum(function(d){
								//console.log(d, ": ", binarySearch(d));
								if (binarySearch(d).length>0)
									DrawThePath(d);
							});
					}
					function leave1(){
						d3.select(this)
							.style('opacity', 0.7);
					}
					
					id_bt.append('rect')
						.attr('x', 0)
						.attr("y",function(d, i){        
							return i * 0.09 * height1 + 0.04 * height1;
						})
						.attr("width", width * 0.08)
						.attr("height", rectHeight * 1.5)
						.attr('fill', "rgba(27, 5, 68, 0.637)")
						.attr('stroke', "black")
						.style('opacity', 0.7)						
						.on('mouseover', over1)
						.on('click', drawTrack)
						.on('mouseleave', leave1);
				})
			}

			let nowpage = 1;

			drawList(nowpage);

			d3.select('#lastpage').on("click", function(){
				if (nowpage == 1)
					console.log("page out of range");
				else {
					nowpage--;
					drawList(nowpage);
				}
			})

			d3.select('#nextpage').on("click", function(){
				if (nowpage == Math.ceil(leng / 10))
					console.log("page out of range")
				else {
					nowpage++;
					drawList(nowpage);
				}
			})

			d3.select('#turn').on("click", function() {
				nowpage = d3.select('#page').property("value");
				if (nowpage * 10 - leng < 10 && nowpage > 0) 
					drawList(nowpage);
				else console.log("page not exist");
			})

			d3.select('#search').on("click", function(){
				id_search = d3.select('#id_search').property("value");
				nowpage = searchId(id_search);
				if (nowpage * 10 - leng < 10 && nowpage > 0) 
					drawList(nowpage);
				else console.log("page not exist");
			})

			//查询id所属页码
			function searchId(id_search) {
				for (let page = 1; page <= Math.ceil(leng / 10); page++){
					if (listData[page * 10 - 1] >= id_search) {
						return page;
					}
				}
				return 0;
			}
		}
	});
}

//window.addEventListener("load", pie);