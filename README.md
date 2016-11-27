# walk-json

recursively walk json properties

###example
```    
walk( { a: { b: { c: 'inside' }, c: 'outside' } }, (prop, path) => {
	console.log( prop, path ); 
})
.then( () => {
	console.log( 'done' ); 
});
```
=> 
```
{ b: { c: 'inside' }, c: 'outside' } 'a'
{ c: 'inside' } 'ab'
inside abc
outside ac
done
```

```
  Usage: walk-json [options] <json file>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -j, --join [function]  specify join. default = (a, b) => { return a.concat(b); }
```
