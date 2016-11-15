'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
		var div = document.createElement('div');
		function noop() {}
		_reactDom2.default.render(_react2.default.createElement(_dropdown2.default, {
				hidden: false,
				name: 'more-pages',
				options: [1, 2, 3],
				onClick: noop,
				onChange: noop
		}), div);
});