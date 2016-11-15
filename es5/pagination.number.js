"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PageNumber;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PageNumber(props) {
	var page = props.page,
	    go = props.go,
	    active = props.active;

	return _react2.default.createElement(
		"li",
		{
			className: "page" + (active ? " active" : ""),
			"data-page": page,
			onClick: go,
			key: 'page-' + page
		},
		page
	);
}