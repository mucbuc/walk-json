#!/usr/bin/env node

'use strict'; 

const traverse = require( 'traverjs' )
  , fs = require( 'fs' ); 

function walk( obj, cb, join, root ) {

  if (typeof root === 'undefined') {
    root = ''; 
  }

  if (typeof join === 'undefined') {
    join = (a, b) => { return a.concat(b); };
  }

  return new Promise( (resolve, reject) => {
    traverse( obj, (prop, next) => {
      const keys = Object.keys( prop )
        , key = keys[0]
        , sub = prop[key]
        , path = join( root, key );

      cb( sub, path );

      if (    typeof sub === 'object'
          &&  !Array.isArray(sub)) 
      {
        walk( sub, cb, join, path )
        .then( next );  
      }
      else {
        next(); 
      }
    })
    .then( resolve )
    .catch( reject ); 
  });
}

if (module.parent) {
  module.exports = walk;
}
else {
  const program = require( 'commander' ); 
  
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
      walk( JSON.parse(data.toString()), ( prop, path ) => {
        console.log( '*', prop, path ); 
      }, join );
    });
  }
}