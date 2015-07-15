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

    d3.select(window).on("resize.foo", resize);
  }

  function link(scope, element, attrs) {
    element.empty();

    var width = element.width(),
      height = element.width(),
      radius = Math.min(width, height) / 2,
      donutWidth = (10 * Math.min(width, height)) / 100,
      innerWidth = ((7 * Math.min(width, height)) / 100) + (((3 * Math.min(width, height)) / 100) / 2),
      outterWidth = donutWidth,
      τ = 2 * Math.PI;

    console.log('{ w:' + width + ', h:' + height + '}');

    var scale = d3.scale.linear().domain([0, 100]).range([0, τ]);

    var innerRadius = radius - donutWidth;

    var baseArc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + innerWidth);

    var sliceArc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + outterWidth)
      .cornerRadius(20);

    var svg = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(responsivefy)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("path")
      .datum({
        startAngle: 0,
        endAngle: τ
      })
      .style("fill", "#e4eaec")
      .attr("d", baseArc);

    svg.append("path")
      .datum({
        startAngle: scale(0),
        endAngle: scale(attrs.value)
      })
      .style("fill", "#9ac6e2")
      .attr("d", sliceArc);

    var fontMeasure = Math.round(scale(radius) / 2) + 1;

    svg.append("text")
      .attr("dy", ".45em")
      .style("text-anchor", "middle")
      .style("font-size", fontMeasure + "em")
      .attr("class", "glyph icon-")
      .text(function (d) {
        return attrs.fontLigatures;
      });
  }

  return {
    link: link
  };
};
