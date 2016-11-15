'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.set_front_pages = set_front_pages;
exports.set_back_pages = set_back_pages;
exports.set_interval_pages = set_interval_pages;
exports.pagination_has_extra = pagination_has_extra;
exports.pagination_no_extra = pagination_no_extra;
exports.pagination_simple = pagination_simple;
exports.pagination_complex = pagination_complex;
exports.PageIntervals = PageIntervals;
exports.get_page_numbers = get_page_numbers;

var _functions = require('./functions');

var _simplyIs = require('simply-is');

var _simplyIs2 = _interopRequireDefault(_simplyIs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function set_front_pages(front_pages_max) {
    if (_simplyIs2.default.numberInvalid(front_pages_max)) {
        throw new RangeError('set_front_pages: front_pages_max is invalid number: front_pages_max=' + front_pages_max);
    }
    if (!front_pages_max) {
        front_pages_max = 3;
    }
    var front_upper_limit = front_pages_max;

    var front = [];
    for (var page = 1; page <= front_upper_limit; page++) {
        front.push(page);
    }
    return front.sort(_functions.sort_ascending);
}

function set_back_pages(page_count, back_pages_max) {
    if (_simplyIs2.default.numberInvalid(back_pages_max)) {
        throw new RangeError('set_back_pages: parameter is invalid.  back_pages_max=' + back_pages_max + ' page_count=' + page_count);
    }
    if (page_count < back_pages_max) {
        throw new RangeError('set_back_pages: #pages (' + page_count + ') < back_pages_max(' + back_pages_max + ')');
    }
    if (!back_pages_max) {
        back_pages_max = 3;
    }
    var back_lower_limit = page_count - back_pages_max;
    var back = [];
    for (var page = page_count; page > back_lower_limit; page--) {
        back.push(page);
    }
    return back.sort(_functions.sort_ascending);
}

function set_interval_pages(min, max) {
    var interval_pages = [];

    if (_simplyIs2.default.undefined(min) && _simplyIs2.default.undefined(max)) {
        throw new Error('set_interval_pages was passed with no parameters. min=' + min + ' max=' + max);
    }

    min = Number(min);
    max = Number(max);

    if (_simplyIs2.default.numberInvalid(min) || _simplyIs2.default.numberInvalid(max)) {
        throw new Error('set_interval_pages was passed an invalid min/max!  min=' + min + ' max=' + max);
    }
    for (var page = min; page < max; page++) {
        interval_pages.push(page);
    }
    return interval_pages;
}

function pagination_has_extra(front, extra_pages, back) {

    var pages = [];
    if (_simplyIs2.default.empty(front) && _simplyIs2.default.empty(back) && _simplyIs2.default.empty(extra_pages)) {
        return pages;
    }

    pages = pages.concat(front);

    // Get the page numbers to put into [...] between [front] and [extras]
    // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ]
    if (!(0, _functions.adjacent)(front, extra_pages)) {
        var front_pages = set_interval_pages((0, _functions.max)(front) + 1, (0, _functions.min)(extra_pages));
        pages.push(front_pages);
    }

    // Insert into the page number array the extra_pages [ 1,2,3, [4,5,6] , 7,8,9 ]
    pages = pages.concat(extra_pages);

    // Get the page numbers to put into [...] between [extras] and [back]
    // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ,7,8,9, [10,11,12] ]

    if (!(0, _functions.adjacent)(extra_pages, back)) {
        var back_pages = set_interval_pages((0, _functions.max)(extra_pages) + 1, (0, _functions.min)(back));
        pages.push(back_pages);
    }

    // Insert into the page number array the back pages
    pages = pages.concat(back);

    return pages;
}

function pagination_no_extra(front, back) {
    var pages = [];

    if (_simplyIs2.default.empty(front) && _simplyIs2.default.empty(back)) {
        return pages;
    }

    pages = pages.concat(front);

    if (!(0, _functions.adjacent)(front, back)) {
        // Get the page numbers to put into [...] between [front] and [back]
        // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ]
        var interval_pages = set_interval_pages((0, _functions.max)(front) + 1, (0, _functions.min)(back));
        pages.push(interval_pages);
    }

    pages = pages.concat(back);

    return pages;
}

/** 
 *  Create simple navigation. [ 1, 2, 3, 4, 5 ] no [...] etc
 *      [front]----[back]
 *
 *  @param {number} page_count - number of pages total
 */
function pagination_simple(page_count) {
    if (_simplyIs2.default.numberInvalid(page_count)) {
        throw new Error('pagination_simple: Invalid input, page_count=' + page_count);
    }

    var pages = [];
    for (var page = 1; page <= page_count; page++) {
        pages.push(page);
    }
    return pages;
}

/** 
 *  Create complex pagination: 
 *      has extras (view window):  [front]---[...]---[extras]----[...]---[back]
 *      no extras:                  [front]----[...]---[back]
 *
 *  @param {array} front_pages - array of front pages, [front] + [front_append] --> [front[]]
 *  @param {array} back_pages - array of back pages, [back_prepend] + [back] --> [back]
 *  @param {array} extra_pages - array of extra pages, if any, (view windows)
 */
function pagination_complex(front_pages, extra_pages, back_pages) {

    var pages;
    // If there are extra pages:    
    // [front]---[...]---[extras]---[...]---[back]
    var has_extra_pages = !!extra_pages.length; // !!0 --> false, !!3 --> true

    if (has_extra_pages) {
        pages = pagination_has_extra(front_pages, extra_pages, back_pages);
    } else {
        // If there are no extra pages: [front]---[...]---[back]
        pages = pagination_no_extra(front_pages, back_pages);
    }

    return pages;
}

function PageIntervals(args) {
    var front_pages_max = args.front_pages_max,
        back_pages_max = args.back_pages_max,
        current_page = args.current_page,
        page_window = args.page_window,
        page_count = args.page_count;


    if (page_count > 0) {
        this.front_pages = set_front_pages(front_pages_max);
        this.back_pages = set_back_pages(page_count, back_pages_max);
        var is_inside_front_interval = current_page <= (0, _functions.max)(this.front_pages),
            is_inside_back_interval = current_page > (0, _functions.min)(this.back_pages),
            is_inside_interval = is_inside_front_interval || is_inside_back_interval;

        if (_simplyIs2.default.null(current_page) || is_inside_interval) {
            this.extra_pages = [];
        } else {
            var extra_pages = [];
            for (var page = current_page - page_window; page <= current_page + page_window; page++) {
                extra_pages.push(page);
            }

            // remove duplicates
            this.extra_pages = [];
            for (var i = 0; i < extra_pages.length; i++) {
                var _page = extra_pages[i];
                var not_duplicate = (0, _simplyIs2.default)(_page).not.inside(this.front_pages) && (0, _simplyIs2.default)(_page).not.inside(this.back_pages);
                if (not_duplicate) {
                    this.extra_pages.push(_page);
                }
            }

            this.extra_pages.sort(_functions.sort_ascending);
        }
    } else {
        this.front_pages = [];
        this.back_pages = [];
        this.extra_pages = [];
    }

    this.current_page = current_page;
}

function get_page_numbers(args) {
    var page_count = args.page_count,
        current_page = args.current_page,
        page_window = args.page_window,
        front_pages_max = args.front_pages_max,
        back_pages_max = args.back_pages_max;

    var pages = [];

    // No [...] needed! (#pages=4 when #front_page_max = 3, #back_pages_max=3)
    if (page_count <= front_pages_max + back_pages_max) {
        pages = pagination_simple(page_count);
    } else {
        // Otherwise, we have to use [...]
        var page_intervals = new PageIntervals(args);
        var front_pages = page_intervals.front_pages,
            extra_pages = page_intervals.extra_pages,
            back_pages = page_intervals.back_pages;

        pages = pagination_complex(front_pages, extra_pages, back_pages);
    }

    return pages;
}

exports.default = get_page_numbers;