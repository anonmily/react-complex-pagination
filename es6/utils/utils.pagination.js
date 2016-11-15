import { max, min, adjacent, sort_ascending } from './functions'
import is from 'simply-is'

export function set_front_pages(front_pages_max){
    if( is.numberInvalid(front_pages_max) ){
        throw new RangeError('set_front_pages: front_pages_max is invalid number: front_pages_max=' + front_pages_max)
    }
    if(!front_pages_max){   front_pages_max = 3;    }
    let front_upper_limit = front_pages_max

    let front = []
    for(var page=1; page <= front_upper_limit ; page++){
        front.push(page)
    }
    return front.sort( sort_ascending )
}   

export function set_back_pages(page_count, back_pages_max){
    if( is.numberInvalid(back_pages_max) ){
        throw new RangeError('set_back_pages: parameter is invalid.  back_pages_max=' + back_pages_max + ' page_count=' + page_count)
    }
    if( page_count < back_pages_max ){
        throw new RangeError('set_back_pages: #pages ('+ page_count + ') < back_pages_max(' + back_pages_max + ')')
    }
    if(!back_pages_max){   back_pages_max = 3;    }
    let back_lower_limit = page_count - back_pages_max
    let back = []
    for(var page = page_count; page > back_lower_limit ; page--){
        back.push(page)
    }
    return back.sort( sort_ascending )
}

export function set_interval_pages(min, max){
    let interval_pages = []

    if( is.undefined(min) && is.undefined(max) ){
        throw new Error('set_interval_pages was passed with no parameters. min=' + min + ' max=' + max)
    }

    min = Number(min)
    max = Number(max)

    if( is.numberInvalid(min) || is.numberInvalid(max) ){
        throw new Error('set_interval_pages was passed an invalid min/max!  min=' + min +  ' max=' + max)
    }
    for (let page = min; page < max; page++) {
        interval_pages.push(page)
    }
    return interval_pages
}

export function pagination_has_extra(front, extra_pages, back){
    
    let pages = []
    if( is.empty(front) && is.empty(back) && is.empty(extra_pages) ){
        return pages
    }

    pages = pages.concat( front )

    // Get the page numbers to put into [...] between [front] and [extras]
    // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ]
    if( !adjacent(front, extra_pages) ){
        let front_pages = set_interval_pages((max(front) + 1), min(extra_pages) )
        pages.push(front_pages)
    }

    // Insert into the page number array the extra_pages [ 1,2,3, [4,5,6] , 7,8,9 ]
    pages = pages.concat(extra_pages)

    // Get the page numbers to put into [...] between [extras] and [back]
    // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ,7,8,9, [10,11,12] ]

    if( !adjacent(extra_pages, back) ){
        let back_pages = set_interval_pages( max(extra_pages) + 1, min(back) )
        pages.push(back_pages)
    }

    // Insert into the page number array the back pages
    pages = pages.concat(back)

    return pages
}

export function pagination_no_extra(front, back){
    let pages = []

    if( is.empty(front) && is.empty(back) ){
        return pages
    }

    pages = pages.concat(front)

    if( !adjacent(front,back) ){
        // Get the page numbers to put into [...] between [front] and [back]
        // Insert into the page number array an array of the pages in the interval [ 1,2,3, [4,5,6] ]
        let interval_pages = set_interval_pages( max(front)+1, min(back) )
        pages.push(interval_pages)
    }

    pages = pages.concat(back)

    return pages
}


/** 
 *  Create simple navigation. [ 1, 2, 3, 4, 5 ] no [...] etc
 *      [front]----[back]
 *
 *  @param {number} page_count - number of pages total
 */
export function pagination_simple(page_count){
    if( is.numberInvalid( page_count) ){
        throw new Error('pagination_simple: Invalid input, page_count=' + page_count)
    }

    let pages = []
    for (let page = 1; page <= page_count; page++) {
        pages.push(page)
    }
    return pages
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
export function pagination_complex(front_pages, extra_pages, back_pages){

    var pages
    // If there are extra pages:    
    // [front]---[...]---[extras]---[...]---[back]
    var has_extra_pages = !!extra_pages.length // !!0 --> false, !!3 --> true

    if( has_extra_pages ) {
        pages = pagination_has_extra(front_pages, extra_pages, back_pages)
    } else { // If there are no extra pages: [front]---[...]---[back]
        pages = pagination_no_extra(front_pages, back_pages)
    }

    return pages
}

export function PageIntervals( args ){
    let { front_pages_max, back_pages_max, current_page, page_window, page_count } = args

    if( page_count > 0 ){
        this.front_pages = set_front_pages( front_pages_max )
        this.back_pages = set_back_pages( page_count, back_pages_max )
        var is_inside_front_interval = current_page <= max(this.front_pages),
            is_inside_back_interval = current_page > min(this.back_pages),
            is_inside_interval = is_inside_front_interval || is_inside_back_interval

        if( is.null(current_page) || is_inside_interval ){
            this.extra_pages = []
        }else{
            var extra_pages = []
            for(let page = current_page - page_window; page <= current_page + page_window; page++){
                extra_pages.push(page)
            }

            // remove duplicates
            this.extra_pages = []
            for(var i=0; i < extra_pages.length; i ++){
                let page = extra_pages[i]
                let not_duplicate = is( page ).not.inside( this.front_pages ) && is( page ).not.inside( this.back_pages )
                if( not_duplicate ){
                    this.extra_pages.push(page)
                }
            }

            this.extra_pages.sort( sort_ascending )
        }
    }else{
        this.front_pages = []
        this.back_pages = []
        this.extra_pages = []
    }

    this.current_page = current_page
}

export function get_page_numbers(args){
    let { page_count, current_page, page_window, front_pages_max, back_pages_max } = args
    let pages = []

    // No [...] needed! (#pages=4 when #front_page_max = 3, #back_pages_max=3)
    if (page_count <= (front_pages_max + back_pages_max)) {
        pages = pagination_simple(page_count)
    } else { // Otherwise, we have to use [...]
        let page_intervals = new PageIntervals(args)
        let { front_pages, extra_pages, back_pages } = page_intervals
        pages = pagination_complex(front_pages, extra_pages, back_pages)
    }

    return pages
}

export default get_page_numbers
