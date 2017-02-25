## Callback -> Async/Await

This project is more about my personal learning of Node.js support for JavaScript ES2017 async/await.

I thought it would be a fun exercise to write my own utility that takes a traditional callback-style function, and returns it wrapped in an async function. This is similar to some of the callback-to-promise utilities that are in various libraries.

### Basic usage:

```javascript
const asyncify = require( "cb-to-await" );

// The old, callback way of doing things
function oldSchool( firstname, lastname, callback ) {
	const msg = `kicking it old school, eh ${ firstname } ${ lastname }?`;
	callback( null, msg );
}

// Asyncify that sucker
const asyncSchool = asyncify( oldSchool );

// Let's use it
async function runThisThang() {
	const response = await asyncSchool( "Old", "Dawg" );
	console.log( response );
}

runThisThang();
```

### Same deal, but with fat arrows:

```javascript
const asyncify = require( "cb-to-await" );

// The old, callback way of doing things
const oldSchool = ( firstname, lastname, callback ) => {
	const msg = `kicking it old school, eh ${ firstname } ${ lastname }?`;
	callback( null, msg );
};

// Asyncify that sucker
const asyncSchool = asyncify( oldSchool );

// Let's use it
const runThisThang = async () => {
	const response = await asyncSchool( "Old", "Dawg" );
	console.log( response );
}

runThisThang();
```