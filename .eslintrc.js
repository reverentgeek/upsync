module.exports = {
	"parserOptions": {
		"ecmaVersion": 2017
	},
	extends: [ "leankit", "leankit/es6" ],
	rules: {
		"no-unused-expressions": 2,
		"prefer-arrow-callback": 0,
		"init-declarations": 0,

		"generator-star-spacing": 0,
		"object-curly-spacing": 0,
		"object-shorthand": 0,
		"arrow-parens": 0
	}
};
