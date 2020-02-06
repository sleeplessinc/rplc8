
# rplc8

Lightweight, browser based support for replicating DOM elements with injected data.

No dependencies.


# Usage

	<script src="rplc8.js"></script>


# Examples

Given this HTML:

	<div id="myid">
		Val is __val__
	</div>

Tie a rplc8 object to an element:

	r = rplc8( "#myid" );

Or instead of using a query selector string you can 
just pass an actual element.  Note that in both cases,
the element must actually be in the DOM:

	r = rplc8( document.getElementById( "myid") );

The rplc8() function removes the "template" element from
the dom.  The DIV with id of "myid" in this case.

It returns an object that contains functions that you can
call to do things.
To inject some data:

	r.update( { val: "foo" } );

Your HTML should change to:

	<div id="myid"> Val is foo </div>

If instead of an object, you give it an array of objects:

	r.update( [ { val: "foo" }, { val: "bar" } ] );

Your HTML will change to:

	<div id="myid"> Val is foo </div>
	<div id="myid"> Val is bar </div>

If you provide a callback you'll get old sleepless-replicate style callbacks:

	r.update( mydata, ( elem, data, index ) => {
		// ...
	});

If you want to re-replicate with all new data, call update:

	r.update( [ { val: "baz" }, { val: "qux" } ] );

And you'll get new clones:

	<div id="myid"> Val is baz </div>
	<div id="myid"> Val is qux </div>

You can clear the clones just like sleepless-replicate:

	r.update( [] );

Or you can call use the clear() function:

	r.clear();			// remove everything

Note that clear takes args too if you just want to remove some
of the clones:

	r.clear( index, remove_count );	
	r.clear( 0, 3 );	// remove the first 3
	r.clear( index );	// remove everything starting from index

Now some cool stuff!
There are these to add 1 or more clones to the
beginning or end:

	r.append( [ { ... }, ... ], callback )
	r.prepend( [ { ... }, ... ], callback )

And of course, the callback is optional for both.

And the pièce de résistance is the all powerful splice(),
which works similarly to Array.splice():

	r.splice( 0, 1 );		// remove 1 from beginning
	r.splice( 0, 2 );		// remove 2 from beginning
	r.splice( 1, 1 );		// remove the second one
	r.splice( -1, 1 );		// remove 1 from end
	r.splice( 0, 1, [ { ... } ] );	// replace first one with a new one

And of course, the splice() function takes callbacks too:

	r.splice( -2, 1, [ { ... }, { ... } ], callback );
	// removes the next to last one and replaces with 2 new ones

One last tasty morsel ... the callbacks take a 4th argument which
is a function that you can use to update the clone to have new 
data:

	let data = { val: 1 };
	let cb = function( e, d, i, refresh ) {
		e.onclick = function() {
			data.val += 1;
			refresh( data, cb );
		}
	}
	r.append( data, cb );

If you click on this clone, it will increment the val,
then reinject the data into the DOM and then reset the
click handler.
Note: This feature will probably be obsolete when mxu is
incorporated into rplc8.


