"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.valid_number = exports.invalid_number = undefined;
exports.args_to_array = args_to_array;
exports.refresh_page = refresh_page;
exports.ups_ship_time_format = ups_ship_time_format;
exports.preload_image = preload_image;
exports.is_device_mobile = is_device_mobile;
exports.async = async;
exports.bind_methods_to_self = bind_methods_to_self;
exports.max = max;
exports.min = min;
exports.adjacent = adjacent;
exports.sort_ascending = sort_ascending;
exports.sort_descending = sort_descending;
exports.sort = sort;
exports.to_milliseconds = to_milliseconds;
exports.currency = currency;
exports.set_cookie = set_cookie;
exports.get_cookie = get_cookie;
exports.delete_cookie = delete_cookie;
exports.upper = upper;
exports.lower = lower;
exports.is_upper = is_upper;
exports.is_lower = is_lower;
exports.same_case = same_case;
exports.plural = plural;
exports.escape_reg_exp = escape_reg_exp;
exports.css_class = css_class;
exports.notify = notify;
exports.send_notification = send_notification;

var _simplyIs = require("simply-is");

var _simplyIs2 = _interopRequireDefault(_simplyIs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function args_to_array(args) {
	if (_simplyIs2.default.argument(args)) {
		var arr = [];
		for (var i = 0; i < args.length; i++) {
			arr.push(args[i]);
		}
		return arr;
	} else {
		return args;
	}
}

function refresh_page() {
	window.location.reload(true);
}

function ups_ship_time_format(date) {
	date = String(date);
	var hour = date.substring(0, 2);
	var min = date.substring(2, 4);
	var sec = date.substring(4);

	var period = "AM";
	if (hour > 12) {
		hour = Number(hour) - 12;
		period = "PM";
	}

	return hour + ":" + min + " " + period;
}

function preload_image(src) {
	async(function preload() {
		var a = new Image();
		a.src = src;
	});
}

// Device Check
function is_device_mobile() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	}
}

// Async
function async(fn) {
	setTimeout(fn, 0);
}

// Object stuff
function bind_methods_to_self(obj) {
	var properties = Object.getOwnPropertyNames(obj);
	properties.forEach(function (property) {
		if (_simplyIs2.default.function(obj[property])) {
			obj[property] = obj[property].bind(obj);
		}
	});
}

// Arrays
function max(arr) {
	if (_simplyIs2.default.not.array(arr)) {
		throw new TypeError('max: invalid parameter passed. arr=' + arr + ' array? ' + _simplyIs2.default.array(arr));
	}
	if (arr.length === 0) {
		throw new RangeError('max: array is empty');
	}
	return Math.max.apply(null, arr);
}
function min(arr) {
	if (_simplyIs2.default.not.array(arr)) {
		throw new TypeError('min: invalid parameter passed. arr=' + arr);
	}
	if (arr.length === 0) {
		throw new RangeError('min: array is empty arr=' + arr);
	}
	return Math.min.apply(null, arr);
}

function adjacent(arr1, arr2) {
	return max(arr1) + 1 === min(arr2);
}

function sort_ascending(a, b) {
	return a - b;
}
function sort_descending(a, b) {
	return b - a;
}
function sort(arr) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

	var first_item = arr[0];
	if (_simplyIs2.default.number(arr[0])) {
		switch (type) {
			case "asc":
				return arr.sort(sort_ascending);
			case "desc":
				return arr.sort(sort_descending);
			default:
				return arr.sort(sort_ascending);
		}
	} else {
		return arr.sort();
	}
}

function to_milliseconds(num, measure) {
	measure = plural(upper(measure));
	if (_simplyIs2.default.not.number(num)) {
		throw new TypeError('to_milliseconds needs a numerical value to convert');
	}
	switch (measure) {
		case 'MINUTES':
			return num * 60 * 1000;
		case 'SECONDS':
			return num * 1000;
		case 'HOURS':
			return num * 60 * 60 * 1000;
		default:
			return num * 1000;
	}
}

function currency(amount) {
	return amount.toFixed(2);
}

// Cookies
function set_cookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; expires=" + expires + '; path=/;';
	//console.log(document.cookie)
}

function get_cookie(cname) {
	var name = cname + "=";
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	}
	return "";
}

function delete_cookie(cname) {
	set_cookie(cname, "", -100);
}

// Numbers
var invalid_number = exports.invalid_number = function invalid_number(num) {
	return _simplyIs2.default.nan(num) || _simplyIs2.default.infinite(num) || _simplyIs2.default.not.a.number(num);
};

var valid_number = exports.valid_number = function valid_number(num) {
	return !invalid_number(num);
};

// Strings
function upper(str) {
	return str ? String(str).toUpperCase() : "";
}

function lower(str) {
	return str ? String(str).toLowerCase() : "";
}

function is_upper(str) {
	return String(str) === upper(str);
}

function is_lower(str) {
	return String(str) === upper(str);
}

function same_case(ref, str) {
	if (is_upper(ref)) {
		return upper(str);
	} else {
		return lower(str);
	}
}

function plural(str) {
	str = String(str);
	var last_letter = str[str.length - 1];
	var is_singular = upper(last_letter) !== 'S';
	if (is_singular) {
		return str + same_case(last_letter, 'S');
	} else {
		return str;
	}
}

function escape_reg_exp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function css_class(str) {
	return String(str).toLowerCase().trim().replace(/[ _]/g, '-').replace(/#/g, '');
}

// Notifications
function notify(title, message) {
	if ('Notification' in window) {
		var Notification = window.Notification;
		if (Notification.permission === 'granted') {
			send_notification(title, message);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					send_notification(title, message);
				}
			});
		}
	}
}

function send_notification(title, msg) {
	if ('Notification' in window) {
		var Notification = window.Notification;
		var notification = new Notification(title, {
			body: msg
		});
		setTimeout(notification.close.bind(Notification), 4000);
	}
}