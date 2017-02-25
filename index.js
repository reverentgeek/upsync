const AsyncFunction = Object.getPrototypeOf( async function() {} ).constructor;

const nameFunction = ( originalName, func ) => {
	const name = originalName.length === 0 ? "Anonymous" : originalName.charAt( 0 ).toUpperCase() + originalName.slice( 1 );
	const fname = `async${ name }`;
	return { async [ fname ]( ...args ) {
		return func( ...args );
	} }[ fname ];
};

module.exports = callBackStyleFunction => {
	if ( !callBackStyleFunction ) {
		throw new Error( "Must be a callback-style function" );
	}

	if ( AsyncFunction.prototype.isPrototypeOf( callBackStyleFunction ) ) {
		return callBackStyleFunction;
	}

	if ( typeof callBackStyleFunction !== "function" ) { // eslint-disable-line valid-typeof
		throw new Error( "Must be a callback-style function" );
	}

	// create the async function
	const asyncf = async ( ...args ) => {
		return new Promise( ( resolve, reject ) => {
			args.push( ( err, ...returnValues ) => {
				if ( err ) {
					return reject( err );
				}
				if ( returnValues.length === 1 ) {
					return resolve( returnValues[ 0 ] );
				}
				return resolve( returnValues );
			} );
			callBackStyleFunction( ...args );
		} );
	};

	return nameFunction( callBackStyleFunction.name, asyncf );
};
