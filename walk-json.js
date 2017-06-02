#!/usr/bin/env node

'use strict'; 

const walk = require( './index' )
  , program = require( 'commander' ); 

program.version( '0.0.0' )
.usage('[options] <json file>')
.option( '-j, --join [function]', 'specify join. default = (a, b) => { return a.concat(b); }' )
.parse(process.argv); 

let join; 

if (program.args.length != 1) {
  program.help(); 
}
else {
  if (program.join) {
    let vm = require( 'vm' )
      , context = vm.createContext()
      , script = new vm.Script( program.join ); 
  
    join = script.runInContext( context ); 
  }
  
  fs.readFile( program.args[0], (err, data) => { 
    if (err) throw err; 
    walk( JSON.parse(data.toString()), ( prop, path, next ) => {
      console.log( prop, path );
      next();
    }, join );
  });
}
