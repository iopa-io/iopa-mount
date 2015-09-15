# [![IOPA](http://iopa.io/iopa.png)](http://iopa.io)<br> iopa-mount

[![Build Status](https://api.shippable.com/projects/TBD/badge?branchName=master)](https://app.shippable.com/projects/TBD)
[![NPM](https://img.shields.io/badge/iopa-certified-99cc33.svg?style=flat-square)](http://iopa.io/)
[![limerun](https://img.shields.io/badge/limerun-certified-3399cc.svg?style=flat-square)](https://nodei.co/npm/limerun/)

[![NPM](https://nodei.co/npm/iopa-mount.png?downloads=true)](https://nodei.co/npm/iopa/)

## About

Mount other IOPA applications or middleware to a given pathname

## Usage

```js
npm install iopa-mount --save
```

```js
app.mount(path, function(context){});
```

### Example

```js
const iopa = require('iopa'),
  IopaApp = iopa.app,
  iopaFactory = iopa.factory,
  iopaUtil = iopa.util,
  iopaMount = require('./index'),
  IOPA = iopa.constants.IOPA
 
var app = new IopaApp();

app.mount("/test", function (context, next) {
  context.log.info("HELLO WORLD");
   return Promise.resolve(null);
});

var demo = app.build();

var context = iopaFactory.createRequest("http://localhost/test/hello", "GET");
demo(context);

iopaFactory.dispose(context);
```