'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simplyIs = require('simply-is');

var _simplyIs2 = _interopRequireDefault(_simplyIs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _pagination = require('./pagination.more');

var _pagination2 = _interopRequireDefault(_pagination);

var _pagination3 = require('./pagination.number');

var _pagination4 = _interopRequireDefault(_pagination3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_PureComponent) {
	_inherits(Pagination, _PureComponent);

	function Pagination() {
		_classCallCheck(this, Pagination);

		return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
	}

	_createClass(Pagination, [{
		key: 'go_page',
		value: function go_page(event) {
			var page = event.target.getAttribute('data-page');
			this.props.goPage(page);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    count = _props.count,
			    currentpage = _props.currentpage,
			    pageWindow = _props.pageWindow,
			    frontPagesMax = _props.frontPagesMax,
			    backPagesMax = _props.backPagesMax;


			var pages = (0, _utils.get_page_numbers)({
				page_count: count,
				current_page: currentpage,
				page_window: pageWindow || 2,
				front_pages_max: frontPagesMax || 4,
				back_pages_max: backPagesMax || 4
			});

			if (count > 1) {
				return _react2.default.createElement(
					'footer',
					{ className: 'pagination-section' },
					_react2.default.createElement(
						'ul',
						{ className: 'pagination', ref: 'pagination' },
						_react2.default.createElement(
							'li',
							{ className: 'pagination-prev',
								onClick: this.go_page,
								'data-page': currentpage - 1 <= 1 ? 1 : currentpage - 1
							},
							_react2.default.createElement('span', { className: 'fa fa-angle-double-left' })
						),
						pages.map(function (page, index) {
							if (_simplyIs2.default.array(page)) {
								return _react2.default.createElement(_pagination2.default, {
									pages: page,
									onChange: _this2.choose_page,
									key: "page-item-" + index
								});
							} else {
								return _react2.default.createElement(_pagination4.default, {
									page: page,
									go: _this2.go_page,
									key: "page-item-" + index,
									active: Number(currentpage) == Number(page)
								});
							}
						}),
						_react2.default.createElement(
							'li',
							{ className: 'pagination-next',
								onClick: this.go_page,
								'data-page': Number(currentpage) + 1 >= count ? count : Number(currentpage) + 1
							},
							_react2.default.createElement('span', { className: 'fa fa-angle-double-right' })
						)
					)
				);
			} else {
				return _react2.default.createElement('footer', { className: 'pagination-section' });
			}
		}
	}]);

	return Pagination;
}(_react.PureComponent);

Pagination.propTypes = {
	count: _react2.default.PropTypes.number.isRequired,
	currentpage: _react2.default.PropTypes.number.isRequired,
	goPage: _react2.default.PropTypes.func.isRequired,
	pageWindow: _react2.default.PropTypes.number,
	frontPagesMax: _react2.default.PropTypes.number,
	backPagesMax: _react2.default.PropTypes.number
};
exports.default = Pagination;