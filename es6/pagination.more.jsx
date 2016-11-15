import React, { Component } from 'react'
import { Dropdown } from './dropdown'

/** Component: Page# ... clicking on the ... --> dropdown to choose a hidden page **/
export default class MorePages extends Component{
	static propTypes = {
		pages: React.PropTypes.array,
		onChange: React.PropTypes.func,
		goPage: React.PropTypes.func
	}
	constructor(props){
		super(props)
		this.state = {
			editing: false
		}
	}
	toggle = () => {
		let editing = this.state ? this.state.editing : false
		this.setState({
			editing: !editing
		})
	}
	render(){
		let editing = this.state ? this.state.editing : false
		let { pages, onChange, goPage } = this.props
		return (
			<li 
				className={ "page more-pages" }
			>
				<div
					className={"threedots" + (editing ? " hidden": "")}
					onClick={this.toggle}
				>...</div>
				<Dropdown 
					hidden={!editing} 
					name="more-pages" 
					options={ pages } 
					onClick={this.toggle}
					onChange={ goPage }
				/>
			</li>
		)
	}
}
