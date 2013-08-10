var dom = require('dom')
  , assert = require('assert')
  , type = require('type')

describe('sgHasKey - 1 level deep', function(){

	var testObject = {

		myFunction  : function(){},
		myDate      : new Date(),
		myRegexp    : new RegExp(),
		myArguments : arguments,
		myArray     : new Array(),
		myString    : new String(),
		myNull      : null,
		myUndefined : undefined,
		myElement   : dom('<strong>'),
		myObject    : new Object()
		
	}
	
	Object.keys(testObject).forEach(function(_key){

		it('[' + _key + '] exists', function(_done){

			assert(sgHasKey(testObject, _key) === true);
			_done();

		});

	});

});

describe('sgHasKey - multilevel', function(){

	var testObject = {

		myFunction  : function(){},
		myObject    : {

			a: {
				aa: {
					aaa: {
						aaaa: {
							aaaaa: false
						}
					}
				},
				ab: {
					aba: false
				}
			}

		}
		
	}
	
	it('should check that a collection of keys at different levels exist', function(_done){

		assert(sgHasKey(testObject, 'myFunction') === true);
		assert(sgHasKey(testObject, 'myFunction.a') === false);
		assert(sgHasKey(testObject, 'myObject.a') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.bad') === false);
		assert(sgHasKey(testObject, 'myObject.a.aa.bad.aaaa.aaaaa') === false);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.bad') === false);

		_done();

	});

});

describe('sgHasKey - multilevel with type checks', function(){

	var testObject = {

		myObject : {

			a: {
				myFunction: function(){},
				aa: {
					myDate: new Date(),
					aaa: {
						myRegexp : /./,
						aaaa: {
							myArguments: arguments,
							aaaaa: {
								myString: 'bam',
								myNumber: 1,
								myNegativeNumber: -1,
								myZeroNumber: 0
							}
						}
					}
				},
				ab: {
					myArray: [],
					aba: {
						myNull: null,
						abaa: {
							myUndefined: undefined
						},
						abab: {
							myElement: dom('<strong>').els[0]
						},
						abac: {
							myObject: {}
						}
					}
				}
			}

		}

		
	}

	testObject.myObject.b = testObject.myObject.a;
	
	it('should check that a collection of keys at different levels exist', function(_done){

		assert(sgHasKey(testObject, 'myObject', 'object') === true);
		assert(sgHasKey(testObject, 'myObject.a', 'object') === true);
		assert(sgHasKey(testObject, 'myObject.a.myFunction', 'function') === true);
		assert(sgHasKey(testObject, 'myObject.a.myFunction', 'string') === false);
		assert(sgHasKey(testObject, 'myObject.a.aa.myDate', 'date') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.myRegexp', 'regexp') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.myRegexp', 'badType') === false);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.myArguments', 'arguments') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.myArguments', 'array') === false);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.myString', 'string') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.myString') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.myNumber', 'number') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.myNegativeNumber', 'number') === true);
		assert(sgHasKey(testObject, 'myObject.a.aa.aaa.aaaa.aaaaa.myZeroNumber', 'number') === true);
		assert(sgHasKey(testObject, 'myObject.a.ab.myArray', 'array') === true);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.myNull', 'null') === true);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.myNull', 'undefined') === false);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.abaa.myUndefined', 'undefined') === true);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.abaa.myUndefined', 'null') === false);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.abab.myElement', 'element') === true);
		assert(sgHasKey(testObject, 'myObject.a.ab.aba.abac.myObject', 'object') === true);
		
		assert(sgHasKey(testObject, 'myObject.b.aa.myDate', 'date') === true);

		_done();

	});

});