var parseQuote = function(quote){
	quote['Date'] = new Date(quote['Date']);
	quote['Close Price'] = +quote['Close Price'];
	return quote;
}

const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;

var loadChart = function(quotes){
	var svg = d3.select(".container").append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	var dateRange = d3.extent(quotes, function(quote){
		return quote['Date'];
	});

	var priceRange = d3.extent(quotes, function(quote){
		return quote['Close Price'];
	})

	var  xScale = d3.scaleTime()
		.domain(dateRange)
		.range([0, WIDTH - (2* MARGIN)]);	

	var yScale = d3.scaleLinear()
		.domain(priceRange)
		.range([HEIGHT-(2*MARGIN), 0]);

	var xAxis = d3.axisBottom(xScale).ticks(12);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	svg.append('g')
		.attr('transform', 'translate('+(MARGIN)+', '+ MARGIN +')')
		.call(yAxis);

	var g = svg.append('g')
			.attr('transform','translate('+MARGIN+', '+MARGIN+')');

	var path = g.append('path');

	var line = d3.line()
	.x(function(q){console.log(q);return xScale(q["Date"])})
	.y(function(q){return yScale(q["Close Price"])});

	path.attr("d", line(quotes));
}

d3.csv('../data/tataSteel.csv',parseQuote,loadChart);