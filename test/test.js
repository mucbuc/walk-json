#!/usr/bin/env node

'use strict';

const test = require( 'tape' )
  , Expector = require( 'expector' ).SeqExpector
  , walk = require( './../index' );

test( 'basic', t => {

  const e = new Expector( t )
    , obj = { a: { b: { c: 'inside' }, c: 'outside' } };

  e
  .expect( { b: { c:'inside' }, c: 'outside' }, 'a' )
  .expect( { c: 'inside' }, 'ab' ) 
  .expect( 'inside', 'abc' )
  .expect( 'outside', 'ac' );

  walk( obj, (prop, path, next) => {
    e.emit( prop, path ); 
    next();
  })
  .then( () => {
    e.check();
  });
}); 

test( 'array', t => {

  const e = new Expector( t )
    , obj = { a: [1] };

  e.expect( [1], 'a' ); 

  walk( obj, (prop, path, next) => {
    e.emit( prop, path ); 
    next();
  })
  .then( () => {
    e.check();
  });

});

test( 'skip', t => {
  const e = new Expector( t )
    , obj = { a: 1, b: { c: 2 } };

  e.expect( 'a', 1 )
   .expect( 'b', { c: 2 } );

  walk( obj, (prop, path, next, skip) => {
    e.emit( path, prop ); 
    (path == 'b' ? skip : next)();
  })
  .then( () => {
    e.check();
  });
});
