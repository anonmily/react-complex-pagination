import React from 'react'
import ReactDOM from 'react-dom'
import Dropdown from './dropdown';

it('renders without crashing', () => {
  const div = document.createElement('div');
  function noop(){}
  ReactDOM.render(
  	<Dropdown 
		hidden={false} 
		name="more-pages" 
		options={[1, 2, 3]} 
		onClick={noop}
		onChange={noop}
	/>,
	div)
});
