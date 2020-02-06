

let r = rplc8( ".rplc8_test" ); //, { val: "Foobar" } );
r.update( [ { val: "Foo3" }, { val: "bar" } ], ( e, d, i ) => {
	console.log( d ); //"e="+e+" d="+d+" i="+i );
});



