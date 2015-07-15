'use strict';

var $ = require('jquery');

require('fastclick');
require('foundation');

$(document).foundation();

var angular = require('angular');

angular.module('rogeriocarvalho.io', [])
  .controller('SiteController', function () {})
  .directive('skillChart', require('./charts/directives/skill-chart'));
