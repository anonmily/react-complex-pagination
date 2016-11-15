import React, { Component } from 'react'
import { css_class } from './utils'

export class Dropdown extends Component{
	render(){
		const { name, multiple, onBlur, onChange, select, options, value, initial, loading, hidden } = this.props

		let self = this
		let dropdown_loading_class = ( loading ? " loading" : "" )
		let dropdown_disabled_class = ( loading || !options.length ? " disabled" : "" )
		let dropdown_class = "dropdown " + ( css_class(name) || "" ) + dropdown_loading_class + dropdown_disabled_class
		let dropdown_options = [(<option value="" key={name + '-initial'}>{initial}</option>)]

		function dropdown_change(event){
        	if(self.props.select){
        		self.props.select(name, event.target.value)
        	}
    		self.props.onChange(event)
		}
		return (
			<div className={"dropdown-wrapper " + name + dropdown_disabled_class + ( hidden ? " hidden": "") }>
				<div className={dropdown_class}>
					<select
						name={name}
				        multiple={multiple}
				        onBlur={ onBlur }
				        onChange={ dropdown_change }
				        value={value}
				        disabled={ loading || !options.length }
				    >
				        { initial && <option value="" key={name + '-initial'}>{initial}</option> }
				        { options && options.map( option => {
				        	return (
					        	<option key={ name + '-' + option } value={option}>
							    	{option}
							    </option>
						    )
				        }) }
			      	</select>
		      	</div>
	      	</div>
		)
	}
}
export default Dropdown