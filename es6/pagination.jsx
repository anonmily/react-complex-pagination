import React, { Component, PureComponent } from 'react'
import is from 'simply-is'
import _ from 'lodash'

import { log, max, min, get_page_numbers }from './utils'

import MorePages from './pagination.more'
import PageNumber from './pagination.number'

export default class Pagination extends PureComponent{
	static propTypes = {
		count: React.PropTypes.number.isRequired,
		currentpage: React.PropTypes.number.isRequired,
		goPage: React.PropTypes.func.isRequired,
		pageWindow: React.PropTypes.number,
		frontPagesMax: React.PropTypes.number,
		backPagesMax: React.PropTypes.number
	}
	go_page = (event) => {
		let page = event.target.getAttribute('data-page')
		this.props.goPage(page)
	}
	render(){
		var { count, currentpage, pageWindow, frontPagesMax, backPagesMax } = this.props

		var pages = get_page_numbers({
			page_count: count,
			current_page: currentpage,
			page_window: pageWindow || 2,
			front_pages_max: frontPagesMax || 4,
			back_pages_max: backPagesMax || 4
		})

		if( count > 1 ){
			return (
				<footer className="pagination-section">
					<ul className="pagination" ref="pagination">
						<li className="pagination-prev" 
							onClick={this.go_page} 
							data-page={ (currentpage - 1) <= 1 ? 1 : currentpage - 1 }
						><span className="fa fa-angle-double-left"></span></li>
						{ 
							pages.map((page, index) => {
								if( is.array(page) ){
									return <MorePages 
										pages={page} 
										onChange={this.choose_page} 
										key={"page-item-" + index}
									/>
								}else{
									return <PageNumber 
										page={page} 
										go={this.go_page} 
										key={"page-item-" + index}
										active={ Number(currentpage) == Number(page) }
									/>
								}
							})
						}
						<li className="pagination-next" 
							onClick={this.go_page} 
							data-page={ Number(currentpage) + 1 >= count ? count : Number(currentpage) + 1 }
						><span className="fa fa-angle-double-right"></span></li>
					</ul>
				</footer>
			)
		}else{
			return (
				<footer className="pagination-section"></footer>
			)
		}
	}
}