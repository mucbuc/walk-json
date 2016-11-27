#!/usr/bin/env node

'use strict';

const test = require( 'tape' )
  , Expector = require( 'expector' ).SeqExpector
  , walk = require( './../walk-json' );

test( 'basic', t => {

  const e = new Expector( t )
    , obj = { a: { b: { c: 'inside' }, c: 'outside' } };

  e
  .expect( { b: { c:'inside' }, c: 'outside' }, 'a' )
  .expect( { c: 'inside' }, 'ab' ) 
  .expect( 'inside', 'abc' )
  .expect( 'outside', 'ac' );

  walk( obj, (prop, path) => {
    e.emit( prop, path ); 
  })
  .then( () => {
    e.check();
  });
}); 

test( 'array', t => {

  const e = new Expector( t )
    , obj = { a: [1] };

  e.expect( [1], 'a' ); 

  walk( obj, (prop, path) => {
    e.emit( prop, path ); 
  })
  .then( () => {
    e.check();
  });

});
