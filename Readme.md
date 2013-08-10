# sg-html-element

Like underscores _.has(object, key) except the key can be deep like sgHasKey(myPersonObject, 'marital.status.isMarried', 'boolean') and also accepts a parameter that specifies the type of the key

## Installation

$ component install davidtsuji/sg-has-key

## API

```javascript
var myObject = {
  name: 'david',
  marital: {
    status: {
      isMarried: true
    }
  }
}

sgHasKey(myObject, 'age'); // returns false
sgHasKey(myObject, 'name'); // returns true
sgHasKey(myObject, 'name', 'string'); // returns true
sgHasKey(myObject, 'name', 'date'); // returns false
sgHasKey(myObject, 'marital.status.isMarried', 'boolean'); // returns true
```

* types docs can be found at https://github.com/component/type

## License

MIT
