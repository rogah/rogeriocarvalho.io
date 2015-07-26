var grid = require('../../../grid-preview/grid');

module.exports = function () {

  function link(scope, element, attrs) {
    grid.init(element);
  }

  return {
    restrict: 'A',
    link: link
  };
};
