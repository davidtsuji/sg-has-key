var type = require('type')
  , has = Object.prototype.hasOwnProperty

function hasKey(_object, _keys, _type) {

	var object           = type(_object) == 'object' ? _object : {}
	  , keys             = type(_keys) == 'array' ? _keys : []
	  , key              = keys.length > 0 ? keys.shift() : ''
	  , keyType          = type(_type) == 'string' ? _type : ''
	  , keyExists        = has.call(object, key)
	  , keyValue         = keyExists ? object[key] : undefined
	  , keyTypeIsCorrect = type(keyValue) === keyType

	if (keys.length > 0 && keyExists) return hasKey(object[key], keys, keyType);

	return keys.length > 0 || keyType == '' ? keyExists : keyExists && keyTypeIsCorrect;

}

module.exports = function(_object, _keys, _type) {

	_keys = type(_keys) == 'string' ? _keys.split('.') : [];

	return hasKey(_object, _keys, _type);

}