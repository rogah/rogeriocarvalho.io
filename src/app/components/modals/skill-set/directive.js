var util = require('util'),
  $ = require('jquery');

module.exports = function () {

  function link(scope, element, attrs) {
    var $trigger = $(util.format('#%s', attrs.triggerId)),
      $close = $('.close a', element);

    $trigger.click(function (e) {
      element.addClass('show');
    });

    $close.click(function (e) {
      e.preventDefault();
      element.removeClass('show');
    });
  }

  return {
    link: link,
    scope: {
      title: '@',
      fontLigatures: '@'
    },
    transclude: true,
    templateUrl: './components/modals/skill-set/template.html'
  };
};
