var util = require('util'),
  $ = require('jquery'),
  TweenLite = require('gsap-tween-lite');

module.exports = function () {

  function link(scope, element, attrs) {
    console.log(TweenLite);

    var $trigger = $(util.format('#%s', attrs.triggerId)),
      $close = $('.close a', element),
      $overlay = $('body > #overlay');

    if (!$overlay.length) {
      $overlay = $('<div/>').attr('id', 'overlay');
      $('body').append($overlay);
    }

    $trigger.click(function (e) {
      element.addClass('show');
      $overlay.addClass('show');
    });

    element.children('.close').click(function (e) {
      element.removeClass('show');
      $overlay.removeClass('show');
    });

    $close.click(function (e) {
      e.preventDefault();
      element.removeClass('show');
      $overlay.removeClass('show');
    });

    $overlay.click(function (e) {
      element.removeClass('show');
      $overlay.removeClass('show');
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
