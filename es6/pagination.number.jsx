import React, { Component } from 'react'

export default function PageNumber(props){
	let { page, go, active } = props
	return (
		<li 
			className={ "page" + ( active ? " active" : "") }
			data-page={page}
			onClick={go}
			key={'page-' + page}
		>
			{page}
		</li>
	)
}
