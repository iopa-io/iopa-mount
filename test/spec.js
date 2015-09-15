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

const should = require('should');

const iopa = require('iopa'),
  iopaFactory = iopa.factory,
  iopaUtil = iopa.util,
   iopaMount = require('../index'),

  constants = iopa.constants,
  IOPA = constants.IOPA,
  SERVER = constants.SERVER

describe('#IOPA()', function () {

  var context, app;
  
  var counter =0;

   it('should create app that is mounted', function () {

    var test = new iopa.App();
    
    test.mount("/test", function (context, next) {
      context[IOPA.Method].should.equal("GET");
      counter ++;
      context[IOPA.Method] = "PUT";
      return Promise.resolve("ABC");
    });
            
    app = test.build();

  });


  it('should call app first times with mounted item', function (done) {

    context = iopaFactory.createRequest("http://localhost/test/hello", "GET");
    context.response = {};
    context.response[IOPA.StatusCode] = null
    
    app(context).then(function (value) {
      context[IOPA.Method].should.equal("PUT");
      delete context.response;
      iopaFactory.dispose(context);
      (context[IOPA.Method] == undefined).should.be.true;
      value.should.equal("ABC");
     counter.should.equal(1);
      done();
    })
  });
  
  it('should call app second times with ignored item', function (done) {

    context = iopaFactory.createRequest("http://localhost/test2/hello", "GET");
    context.response = {};
    context.response[IOPA.StatusCode] = null
    
    app(context).then(function (value) {
      context[IOPA.Method].should.equal("GET");
      delete context.response;
      iopaFactory.dispose(context);
      (context[IOPA.Method] == undefined).should.be.true;
       (value == null).should.be.true;
     counter.should.equal(1);
      done();
    })
  });
  
  it('should call app third times with mounted item', function (done) {

    context = iopaFactory.createRequest("http://localhost/test/hello2", "GET");
    context.response = {};
    context.response[IOPA.StatusCode] = null
    
    app(context).then(function (value) {
      context[IOPA.Method].should.equal("PUT");
      delete context.response;
      iopaFactory.dispose(context);
      (context[IOPA.Method] == undefined).should.be.true;
      value.should.equal("ABC");
     counter.should.equal(2);
      done();
    })
  });
});
