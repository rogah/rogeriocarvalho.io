'use strict';

var $ = require('jquery'),
  angular = require('angular');

require('fastclick');
require('foundation');

$(document).foundation();

angular.module('rogeriocarvalho.io', [])
  .controller('SiteController', function () {})
  .directive('skillChart', require('./charts/directives/skill-chart'));
