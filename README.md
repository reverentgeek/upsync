## UpSync: Callback -> Async/Await

![UpSync](https://raw.githubusercontent.com/reverentgeek/upsync/master/upsync.png)

> Note: This module is intended to be used with Node.js 7+ or other JavaScript engines/transpilers that have support for ES2017 async/await.

This project is more my personal tool for learning Node.js support for JavaScript ES2017 async/await.

I thought it would be a fun exercise to write my own utility that takes a traditional callback-style function, and returns it wrapped in an async function. This is similar to some of the callback-to-promise utilities that are in various libraries.

### Basic usage:

```javascript
const upsync = require( "upsync" );

// The old, callback way of doing things
function oldSchool( firstname, lastname, callback ) {
	const msg = `kicking it old school, eh ${ firstname } ${ lastname }?`;
	callback( null, msg );
}

// upsync that sucker
const asyncSchool = upsync( oldSchool );

// Let's use it
async function runThisThang() {
	const response = await asyncSchool( "Old", "Dawg" );
	console.log( response );
}

runThisThang();
```

### Same deal, but with fat arrows:

```javascript
const upsync = require( "upsync" );

// The old, callback way of doing things
const oldSchool = ( firstname, lastname, callback ) => {
	const msg = `kicking it old school, eh ${ firstname } ${ lastname }?`;
	callback( null, msg );
};

// upsync that sucker
const asyncSchool = upsync( oldSchool );

// Let's use it
const runThisThang = async () => {
	const response = await asyncSchool( "Old", "Dawg" );
	console.log( response );
}

runThisThang();
```

### Okay, here's a slightly more legitimate example

```javascript
const upsync = require( "upsync" );
const fs = require( "fs" );
const readFile = upsync( fs.readFile );

const readAndParseJsonFile = async filename => {
	try {
		const contents = await readFile( filename );
		return JSON.parse( contents );
	} catch( err ) {
		console.log( err );
		throw err;
	}
};

const main = async () => {
	try {
		const pkg = await readAndParseJsonFile( "./package.json" );
		console.log( pkg );
	} catch ( err ) {
		console.log( "error in main:", err );
	}
}

// async functions return a promise
main().then( () => {
	console.log( "finished!" );
} );
```