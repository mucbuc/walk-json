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

      cb( sub, path, () => {
        if (    typeof sub === 'object'
            &&  !Array.isArray(sub)) 
        {
          walk( sub, cb, join, path )
          .then( next );  
        }
        else {
          next(); 
        }
      }, 
      next );
    })
    .then( resolve )
    .catch( reject ); 
  });
}

module.exports = walk;
