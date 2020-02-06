
# rplc8

Tie a rplct8 object to an element in the DOM

	r = rplct8( "#myid" );

Or instead of using a query selector string you can 
just pass an actual element.
Note that in both cases, the element just actually be in
the DOM:

	r.rplct8( document.getElementById( "myid") );

When you have the rplct8 obj, then inject some data:

	r.update( [ { ... }, ... ] );

If you provide a callback you'll get old replicate style callbacks:

	r.update( mydata, ( elem, data, index ) {
		// ...
	});

You can reset the clones just like before:

	r.update( [] );

Or you can call use the clear() function:

	r.clear();

Note that clear takes args too if you just want to remove some
of the clones:

	r.clear( index, remove_count );

Now the cool stuff!
There are these:

	r.append( [ { ... }, ... ], callback )

	r.prepend( [ { ... }, ... ], callback )

And now the pièce de résistance is the all powerful splice(),
which works basically like Array.splice():

	r.splice( 0, 1 );		// remove 1 from beginning
	r.splice( 0, 2 );		// remove 2 from beginning
	r.splice( 1, 1 );		// remove the second one
	r.splice( -1, 1 );		// remove 1 from end
	r.splice( 0, 1, [ { ... } ] );	// replace first one with a new one

And of couse, the splice() function takes callbacks too:

	r.splice( -2, 1, [ { ... }, { ... } ], callback );
	// removes the next to last one and replaces with 2 new ones





