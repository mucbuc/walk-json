# walk-json

recursively walk json properties

###examples  
####1   
```    
walk( { a: { b: { c: 'inside' }, c: 'outside' } }, (prop, path, next) => {
	console.log( prop, path ); 
	next();
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

####2  
```  
walk( { a: 1, b: { c: 2 } }, (prop, path, next, skip) => {
    console.log( path, prop ); 
    (path == 'b' ? skip : next)();
  })
  .then( () => {
    console.log( 'done' );
  });
```  
=>
```
'a' 1
'b' { c: 2 }
done
```


```
  Usage: walk-json [options] <json file>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -j, --join [function]  specify join. default = (a, b) => { return a.concat(b); }
```

