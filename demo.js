/*
 * Copyright (c) 2015 Internet of Protocols Alliance (IOPA)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * DEPENDENCIES
 *     note: npm include 'bluebird' if no Promise object exists
 */

const iopa = require('iopa'),
  iopaMount = require('./index'),

  constants = iopa.constants,
  IOPA = constants.IOPA,
  SERVER = constants.SERVER

var test = new iopa.App();

test.mount("/test", function (context, next) {
  context.log.info("HELLO WORLD" + context.toString());
  context[IOPA.Method] = "PUT";
  return Promise.resolve("ABSC");
});

var demo = test.build();
var factory = new iopa.Factory();
var context = factory.createRequestResponse("http://localhost/test/hello", "GET");
var dog = demo(context);

dog.then(function(value){
  console.log("ENDED" + value);
});

context = factory.createRequestResponse("http://localhost/ignore/hello", "GET");
 context.response[IOPA.StatusCode] = null
demo(context);

context = factory.createRequestResponse("http://localhost/test/hello2", "GET");
context.response[IOPA.StatusCode] = null
demo(context);

context.dispose();