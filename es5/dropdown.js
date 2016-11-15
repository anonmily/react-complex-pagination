'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = exports.Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown() {
		_classCallCheck(this, Dropdown);

		return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
	}

	_createClass(Dropdown, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    name = _props.name,
			    multiple = _props.multiple,
			    onBlur = _props.onBlur,
			    onChange = _props.onChange,
			    select = _props.select,
			    options = _props.options,
			    value = _props.value,
			    initial = _props.initial,
			    loading = _props.loading,
			    hidden = _props.hidden;


			var self = this;
			var dropdown_loading_class = loading ? " loading" : "";
			var dropdown_disabled_class = loading || !options.length ? " disabled" : "";
			var dropdown_class = "dropdown " + ((0, _utils.css_class)(name) || "") + dropdown_loading_class + dropdown_disabled_class;
			var dropdown_options = [_react2.default.createElement(
				'option',
				{ value: '', key: name + '-initial' },
				initial
			)];

			function dropdown_change(event) {
				if (self.props.select) {
					self.props.select(name, event.target.value);
				}
				self.props.onChange(event);
			}
			return _react2.default.createElement(
				'div',
				{ className: "dropdown-wrapper " + name + dropdown_disabled_class + (hidden ? " hidden" : "") },
				_react2.default.createElement(
					'div',
					{ className: dropdown_class },
					_react2.default.createElement(
						'select',
						{
							name: name,
							multiple: multiple,
							onBlur: onBlur,
							onChange: dropdown_change,
							value: value,
							disabled: loading || !options.length
						},
						initial && _react2.default.createElement(
							'option',
							{ value: '', key: name + '-initial' },
							initial
						),
						options && options.map(function (option) {
							return _react2.default.createElement(
								'option',
								{ key: name + '-' + option, value: option },
								option
							);
						})
					)
				)
			);
		}
	}]);

	return Dropdown;
}(_react.Component);

exports.default = Dropdown;