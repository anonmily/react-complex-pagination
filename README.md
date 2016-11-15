# React Complex Pagination Component

## Examples
```
<Pagination 
	count={4} 
	currentpage={1} 
	goPage={ page => {
		// Do something on page change
	}}
/>
```

The component can also be customized for more complex pagination options, for example, say if you want to have a "page window" pagination:

`1-2-3-[...]-34-35-36`

And then, when you click on the [...], a dropdown of available input options will appear. Once you select a page number, the page window will adapt:

`1-2-3-[...]-19-20-21-[...]-34-35-36`

Note, this component is primarily for my personal use, so styles are not included at the moment.
