import React from 'react'
import ReactDOM from 'react-dom'
import MorePages from './pagination.more';

it('renders without crashing', () => {
  const div = document.createElement('div');
  function noop(){}
  ReactDOM.render(
  	<MorePages 
		pages={[4,5,6]} 
		onChange={noop} 
	/>,
	div)
})
