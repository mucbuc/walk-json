#!/usr/bin/env node

'use strict';

const test = require( 'tape' )
  , Expector = require( 'expector' ).SeqExpector
  , walk = require( './../walk-json' );

test.only( 'basic', t => {

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

test( '2 arrays', t => {

  const e = new Expector( t )
    , obj = { a: 1, b: 2 };

  e
  .expect( 1, 'a' )
  .expect( 2, 'b' ); 

  walk( obj, (prop, path) => {
    e.emit( prop, path ); 
  })
  .then( () => {
    e.check();
  });

});
