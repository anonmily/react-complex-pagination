import React from 'react'
import renderer from 'react-test-renderer'
import Pagination from './pagination';

it('renders simple pagination without crashing', () => {
  const div = document.createElement('div');
  function noop(){}
  const component = renderer.create(
  	<Pagination count={4} currentpage={1} goPage={ noop } />
  )
});


it('renders complicated pagination without crashing', () => {
  const div = document.createElement('div');
  function noop(){}
  const component = renderer.create(
  	<Pagination count={45} currentpage={5} goPage={ noop } />
  )
});
