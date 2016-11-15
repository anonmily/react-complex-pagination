const expect = require('chai').expect
const _ = require('lodash')
const jsdom = require('mocha-jsdom')

import { 
	set_front_pages,
	set_back_pages,
	set_interval_pages,
	pagination_has_extra,
	pagination_no_extra,
	pagination_simple,
	pagination_complex,
	get_page_numbers,
	PageIntervals
} from '../es6/utils/utils.pagination'

describe('set_front_pages', () => {
	it('given a front_pages_max, creates an array up to and including the max', done => {
		expect( set_front_pages(5) ).to.deep.equal( [1,2,3,4,5] )
		done()
	})
	it('given no parameters, throws a RangeError', done => {
		expect(function(){
			set_front_pages()
		}).to.throw( RangeError )
		done()
	})
	it('given an invalid number as a parameter, will throw error', done => {
		expect(function(){
			set_front_pages(Infinity)
		}).to.throw( RangeError )
		done()
	})
})

describe('set_back_pages', () => {
	it('given a page_count and back_pages_max, creates an of values starting from page_count - back_pages_max + 1 to page_count', done => {
		expect( set_back_pages(10,4) ).to.deep.equal( [7,8,9,10] )
		done()
	})
	it('if back_pages_max > page_count, throws a RangeError', done => {
		expect(function(){
			set_back_pages(10,20)
		}).to.throw( RangeError )
		done()
	})
	it('given no parameters, throws a RangeError', done => {
		expect(function(){
			set_back_pages()
		}).to.throw( RangeError )
		done()
	})
	it('given an invalid number as a parameter, will throw error', done => {
		expect(function(){
			set_back_pages(Infinity)
		}).to.throw( RangeError )
		done()
	})
})

describe('set_interval_pages', () => {
	it('should create an array starting from min and going up to max', done => {
		expect( set_interval_pages(1, 10) ).to.deep.equal( [1,2,3,4,5,6,7,8,9] )
		done()
	})
	it('should throw exception if passed non-numerical/infinite min and max', done => {

		expect(function(){
			set_interval_pages(0, Infinity)
		}).to.throw(Error)

		expect(function(){
			set_interval_pages(Infinity, Infinity)
		}).to.throw(Error)
		
		done()
	})
	it('should throw an error if passed with no parameters', done => {
		expect(function(){
			set_interval_pages()
		}).to.throw(Error)
		done()
	})
})

describe('pagination_has_extra', ()=>{
	it('should return [1,2,3, [4,5,6, 7], 8,9,10, [11,12,13], 14,15,16] when front = [1,2,3], extra = [8,9,10], and back=[14,15,16]', done => {

		expect( pagination_has_extra([1,2,3], [8,9,10], [14,15,16]) ).to.deep.equal( [1,2,3, [4,5,6, 7], 8,9,10, [11,12,13], 14,15,16] )
		done()
	})

	it('should just use simple pagination and join everything together if front, extras, and back are all adjacent', done => {
		expect( pagination_has_extra([1,2],[3,4],[5,6]) ).to.deep.equal( [1,2,3,4,5,6] )
		done()
	})
})

describe('pagination_no_extra', () => {
	it('should return [1,2,3, [4,5,6,7,8,9], 10,11,12] when given front = [1,2,3] and back = [10,11,12]', done => {
		expect( pagination_no_extra([1,2,3], [10,11,12]) ).to.deep.equal( [ 1, 2, 3, [4,5,6,7,8,9], 10, 11, 12 ])
		done()
	})

	it('should just use simple pagination and join everything together if front and back are both adjacent', done => {

		expect( pagination_no_extra( [1,2,3], [4,5,6] ) ).to.deep.equal( [1,2,3,4,5,6] )
		done()
	})
})

describe('pagination_simple', () => {
	it('should return an array of page numbers up to and including the given page_count', done => {
		expect( pagination_simple(10) ).to.deep.equal( [1,2,3,4,5,6,7,8,9,10] )
		done()
	})
	it('should throw exception if passed infinite page_count', done => {

		expect(function(){
			pagination_simple(Infinity)
		}).to.throw(Error)

		expect(function(){
			pagination_simple(-Infinity)
		}).to.throw(Error)

		done()
	})
	it('should throw exception if passed NaN page_count', done => {

		expect(function(){
			pagination_simple(NaN)
		}).to.throw(Error)

		expect(function(){
			pagination_simple(10/0)
		}).to.throw(Error)

		done()
	})
})

describe('pagination_complex', () => {
	it('should return [front]---[...]---[extras]---[...]---[back] when there are extras', done => {
		expect( pagination_complex( [1,2,3], [6,7,8], [11,12,13]) )
			.to.deep.equal( 
				[ 1,2,3, [4,5], 6,7,8, [9,10], 11,12,13 ]
			)
		done()
	})
	it('should return [front]---[...]---[back] when there are no  extras', done => {
		expect( pagination_complex( [1,2,3], [], [11,12,13]) )
			.to.deep.equal( 
				[ 1,2,3, [4,5,6,7,8,9,10] , 11,12,13 ]
			)
		done()
	})
	it('extras should be joined with front pages if adjacent to front: [front + extras]--[...]---[back]', done => {
		expect( pagination_complex( [1,2,3],[4,5,6], [11,12,13] ) )
			.to.deep.equal( 
				[ 1,2,3,4,5,6, [7,8,9,10], 11,12,13 ] 
			)
		done()
	})
	it('extras should be joined with back pages if adjacent to back: [front]--[...]--[extras + back]', done => {
		expect( pagination_complex( [1,2,3], [8,9,10], [11,12,13] ) )
			.to.deep.equal(
				[ 1,2,3, [4,5,6,7], 8,9,10,11,12,13 ]
			)
		done()
	})
	it('extras should be joined with both front and back if adjacent to both: [front + extras + back ]', done => {
		expect( pagination_complex( [1,2,3], [4,5,6], [7,8,9] ) )
			.to.deep.equal(
				[ 1,2,3,4,5,6,7,8,9 ]
			)
		done()
	})
	it('should return empty array if given empty arrays', done => {
		expect( pagination_complex([],[],[]) ).to.deep.equal([])
		done()
	})
})

describe('PageIntervals', () => {
	it('should return the proper intervals when current_page=null', done =>{
		let page_interval = new PageIntervals({
			page_count: 20,
			current_page: null,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		})

		expect( page_interval.front_pages ).to.deep.equal( [1,2,3,4] )
		expect( page_interval.back_pages ).to.deep.equal( [17,18,19,20] )
		expect( page_interval.extra_pages ).to.deep.equal( [] )
		done()
	})
	it('should return the proper intervals when current_page is set (no overlap)', done =>{
		let page_interval = new PageIntervals({
			page_count: 20,
			current_page: 10,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		})

		expect( page_interval.front_pages ).to.deep.equal( [1,2,3,4] )
		expect( page_interval.back_pages ).to.deep.equal( [17,18,19,20] )
		expect( page_interval.extra_pages ).to.deep.equal( [8,9,10,11,12] )
		done()
	})
	it('should return the proper intervals when current_page is set and the extras pages overlaps with the front pages interval', done =>{
		let page_interval = new PageIntervals({
			page_count: 20,
			current_page: 6,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		})
		expect( page_interval.front_pages ).to.deep.equal( [1,2,3,4] )
		expect( page_interval.back_pages ).to.deep.equal( [17,18,19,20] )
		expect( page_interval.extra_pages ).to.deep.equal( [5,6,7,8] )
		done()
	})
	it('should return the proper intervals when current_page is set and the extras pages overlaps with the back pages interval', done =>{
		let page_interval = new PageIntervals({
			page_count: 20,
			current_page: 16,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		})
		expect( page_interval.front_pages ).to.deep.equal( [1,2,3,4] )
		expect( page_interval.back_pages ).to.deep.equal( [17,18,19,20] )
		expect( page_interval.extra_pages ).to.deep.equal( [14,15,16] )
		done()
	})
})

describe('get_page_numbers', () => {
	it('given current_page = null, and page_count, page_window, front_pages_max, back_pages_max should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: null,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4, [5,6,7,8,9,10,11,12,13,14,15,16], 17,18,19,20]
		)
		done()
	})
	it('given current_page = 1, and page_count=4, should initialize correctly', done => {
		expect( get_page_numbers({
			page_count: 4,
			current_page: 1,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4]
		)
		done()
	})
	it('given current_page = 10, and page_count, page_window, front_pages_max, back_pages_max should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: 10,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4, [5,6,7], 8,9,10,11,12, [13,14,15,16], 17,18,19,20]
		)
		done()
	})
	it('given current_page = 2 (overlap front pages interval), and page_count, page_window, front_pages_max, back_pages_max should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: 2,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4, [5,6,7,8,9,10,11,12,13,14,15,16], 17,18,19,20]
		)
		done()
	})
	it('given current_page = 18 (overlap back pages interval), should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: 18,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4, [5,6,7,8,9,10,11,12,13,14,15,16], 17,18,19,20]
		)
		done()
	})
	it('given current_page = 6 (extras window will overlap front pages interval), should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: 6,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4,5,6,7,8, [9,10,11,12,13,14,15,16], 17,18,19,20]
		)
		done()
	})
	it('given current_page = 16 (extras window will overlap back pages interval), should initialize properly', done => {
		expect( get_page_numbers({
			page_count: 20,
			current_page: 16,
			page_window: 2,
			front_pages_max: 4,
			back_pages_max: 4
		}) ).to.deep.equal(
			[1,2,3,4, [5,6,7,8,9,10,11,12,13], 14,15,16,17,18,19,20]
		)
		done()
	})
})