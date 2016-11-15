'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pagination = require('./pagination.more');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');
  function noop() {}
  _reactDom2.default.render(_react2.default.createElement(_pagination2.default, {
    pages: [4, 5, 6],
    onChange: noop
  }), div);
});