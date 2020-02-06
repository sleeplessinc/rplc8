/*
Copyright 2015-2020 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/

(function() {
	
	// Replaces instances of "__key__" in string s,
	// with the values from corresponding key in data.
	let substitute = function( s, data ) {
		for( let key in data ) {
			let re = new RegExp( "__" + key + "__", "g" );
			s = s.replace( re, ""+(data[ key ]) );
		}
		return s;
	}

	// Injects data values into a single DOM element
	let inject = function( e, data ) {

		// Inject into the body of the element
		e.innerHTML = substitute( e.innerHTML, data );

		// Inject into the attributes of the actual tag of the element.
		// Do this slightly differently for IE because IE is stupid.
		// XXX Do I still have to do this? Isn't IE dead yet?
		let attrs = e.attributes;
		if( navigator.appName == "Microsoft Internet Explorer" ) {
			for( let k in attrs ) {
				let val = e.getAttribute( k );
				if( val ) {
					if( typeof val === "string" ) {
						if( val.match( /__/ ) ) {
							val = substitute( val, data );
							e.setAttribute( k, val );
						}
					}
				}
			}
		}
		else {
			for( let i = 0 ; i < attrs.length ; i++ ) {
				let attr = attrs[ i ];
				let val = attr.value;
				if( val ) {
					if( typeof val === "string" ) {
						if( val.match( /__/ ) ) {
							attr.value = substitute( val, data );
						}
					}
				}
			}
		}
	}

	// The main replicate function
	rplc8
	replicate = function( elem, data, callback ) {

		// If elem isn't a DOM element, then it has to be query selector string
		if( ! ( elem instanceof HTMLElement ) ) {
			if( typeof elem === "string" ) {
				throw new Error( "replicate: invalid selector string" );
			}
			let arr = document.querySelectorAll( elem ).toArray();
			if( arr.length !== 1 ) {
				throw new Error( "replicate: selector doesn't match exactly 1 element" );
			}
			elem = arr[ 0 ];
		}

		mom.removeChild( elem );		// Take template out of the DOM.

		let sib = elem.nextSibling;		// Might be null.
		let mom = elem.parentNode;		// Almost certainly not null.
		let clones = [];

		let replace = function( data, cb ) {

			// If it's a single object, put it into an array.
			if( typeof data === "object" ) {
				data = [ data ];
			}

			// Ensure that data is an array
			if( ! ( data instanceof Array ) ) {
				throw new Error( "replicate: replication data is not an array" );
			}

			// Ensure that the first element in the array is an object.
			if( data.length > 0 && typeof data[0] !== "object" ) {
				throw new Error( "replicate: data array does not contain objects" );
			}

			// Remove any previously cloned and inserted elements.
			clones.forEach( clone => {
				mom.removeChild( clone ); //remove(); // IE is so fuckin stupid.
			});
			clones = [];

			// For each object in the data array, replicate the template
			// by cloning it and injecting the data into it.
			for( let i = 0 ; i < data.length ; i++ ) {
				let d = data[ i ]				// Get the data src.
				let e = elem.cloneNode( true )	// Clone the template.
				mom.insertBefore( e, sib );		// Insert the clone into the dom.
				clones.push( e );
				inject( e, d );					// Inject the data into the element.
				if( cb ) {
					cb( e, d, i );		// Let caller do stuff after each clone is created.
				}
			}
		}

		let tpl = {
			elem,
			mom,
			sib,
			clones,
			replace,
		};

	};

})();
