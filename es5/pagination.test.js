'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders simple pagination without crashing', function () {
  var div = document.createElement('div');
  function noop() {}
  var component = _reactTestRenderer2.default.create(_react2.default.createElement(_pagination2.default, { count: 4, currentpage: 1, goPage: noop }));
});

it('renders complicated pagination without crashing', function () {
  var div = document.createElement('div');
  function noop() {}
  var component = _reactTestRenderer2.default.create(_react2.default.createElement(_pagination2.default, { count: 45, currentpage: 5, goPage: noop }));
});