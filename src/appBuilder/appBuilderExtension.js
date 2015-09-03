/*
 * Copyright (c) 2015 Limerun Project Contributors
 * Portions Copyright (c) 2015 Internet of Protocols Assocation (IOPA)
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
 * Module dependencies.
 */
 
 const Mount = require('../middleware/iopaMount').default,
    iopa = require('iopa'),
    IopaApp = iopa.app,
    constants = iopa.constants,
    IOPA = constants.IOPA,
    SERVER = constants.SERVER,
    METHODS = constants.METHODS,
    PORTS = constants.PORTS,
    SCHEMES = constants.SCHEMES,
    PROTOCOLS = constants.PROTOCOLS,
    APP = constants.APP,
    COMMONKEYS = constants.COMMONKEYS,
    OPAQUE = constants.OPAQUE,
    WEBSOCKET = constants.WEBSOCKET,
    SECURITY = constants.SECURITY;

  /***
    * Method to mount a sub-application at a defined path
    *
    * @return {function(context)} IOPA application 
    * @public
    */
 IopaApp.prototype.mount = function mount(location, appletFunc) {
        var mounted = Mount(location, appletFunc);
        this.middleware.push(mounted);
        return this;
    };