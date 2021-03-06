var d3 = require('d3');

module.exports = function () {

  function responsivefy(svg) {
    var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width')),
      height = parseInt(svg.style('height')),
      aspect = width / height;

    function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    }

    svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

    d3.select(window).on('resize.' + svg.attr('data-chart-id'), resize);
  }

  function link(scope, element, attrs) {

    var width = element.width(),
      height = element.width(),
      chartSize = Math.min(width, height),
      donutThickness = (10 * chartSize) / 100,
      radius = chartSize / 2,
      innerRadius = radius - donutThickness,
      innerWidth = 0.8 * donutThickness,
      innerOffset = 0.2 * donutThickness,
      outterWidth = donutThickness,
      cornerRadius = Math.min(20, Math.max(4, 100 - attrs.value)),
      τ = 2 * Math.PI;

    var scale = d3.scale.linear().domain([0, 100]).range([0, τ]);

    var baseArc = d3.svg.arc()
      .innerRadius(innerRadius + innerOffset)
      .outerRadius(innerRadius + innerWidth);

    var sliceArc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + outterWidth)
      .cornerRadius(cornerRadius);

    var svg = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr('data-chart-id', new Date().getTime())
      .call(responsivefy)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("path")
      .datum({
        startAngle: scale(0),
        endAngle: scale(100)
      })
      .attr('class', 'chart-base')
      .attr("d", baseArc);

    svg.append("path")
      .datum({
        startAngle: scale(0),
        endAngle: scale(attrs.value)
      })
      .attr('class', 'chart-slice')
      .attr("d", sliceArc);

    var glyphMeasure = Math.ceil(scale(radius - donutThickness));

    svg.append("text")
      .attr("dy", ".45em")
      .style("text-anchor", "middle")
      .style("font-size", glyphMeasure + "em")
      .attr("class", "glyph icon-")
      .text(function (d) {
        return attrs.fontLigatures;
      });

    element.append('<span class="legend">' + attrs.value + '%</span>');
  }

  return {
    link: link
  };
};
