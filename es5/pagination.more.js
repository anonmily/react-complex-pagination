'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropdown = require('./dropdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Component: Page# ... clicking on the ... --> dropdown to choose a hidden page **/
var MorePages = function (_Component) {
	_inherits(MorePages, _Component);

	function MorePages(props) {
		_classCallCheck(this, MorePages);

		var _this = _possibleConstructorReturn(this, (MorePages.__proto__ || Object.getPrototypeOf(MorePages)).call(this, props));

		_this.toggle = function () {
			var editing = _this.state ? _this.state.editing : false;
			_this.setState({
				editing: !editing
			});
		};

		_this.state = {
			editing: false
		};
		return _this;
	}

	_createClass(MorePages, [{
		key: 'render',
		value: function render() {
			var editing = this.state ? this.state.editing : false;
			var _props = this.props,
			    pages = _props.pages,
			    onChange = _props.onChange,
			    goPage = _props.goPage;

			return _react2.default.createElement(
				'li',
				{
					className: "page more-pages"
				},
				_react2.default.createElement(
					'div',
					{
						className: "threedots" + (editing ? " hidden" : ""),
						onClick: this.toggle
					},
					'...'
				),
				_react2.default.createElement(_dropdown.Dropdown, {
					hidden: !editing,
					name: 'more-pages',
					options: pages,
					onClick: this.toggle,
					onChange: goPage
				})
			);
		}
	}]);

	return MorePages;
}(_react.Component);

MorePages.propTypes = {
	pages: _react2.default.PropTypes.array,
	onChange: _react2.default.PropTypes.func,
	goPage: _react2.default.PropTypes.func
};
exports.default = MorePages;