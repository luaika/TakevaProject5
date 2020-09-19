/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/App.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "App",
  mounted: function mounted() {
    console.log('componentes montados');
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
/* harmony import */ var vue_bootstrap4_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-bootstrap4-table */ "./node_modules/vue-bootstrap4-table/dist/vue-bootstrap4-table.esm.js");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-js-toggle-button */ "./node_modules/vue-js-toggle-button/dist/index.js");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "crearHorario",
  data: function data() {
    return {
      hora: '',
      fecha: '',
      idRuta: 0,
      idVehiculo: 0,
      show_ruta: true,
      show_vehiculo: true,
      vehiculo: [],
      horario: [],
      ruta: [],
      show_alert: {
        create: {
          state: false,
          messaje: ''
        },
        edit: {
          state: false,
          messaje: ''
        }
      },
      buttons: {
        create: {
          name: 'Agregar',
          state: false
        },
        edit: {
          name: 'Actualizar',
          state: false
        }
      },
      columns: [{
        label: "Hora",
        name: "hora",
        sort: false
      }, {
        label: "Fecha",
        name: "fecha",
        sort: true
      }, {
        label: "Ruta",
        name: "ruta",
        sort: false
      }, {
        label: "Vehiculo",
        name: "vehiculo",
        sort: true
      }, {
        label: "Editar",
        name: "edit",
        sort: false
      }, {
        label: "Eliminar",
        name: "delete",
        sort: false
      }],
      config: {
        pagination: true,
        // default true
        pagination_info: true,
        // default true
        num_of_visibile_pagination_buttons: 7,
        // default 5
        per_page: 5,
        // default 10
        per_page_options: [5, 10, 20, 30],
        filas_seleccionables: true,
        card_title: "HORARIOS",
        show_refresh_button: false,
        show_reset_button: false,
        global_search: {
          placeholder: "Buscar "
        }
      },
      data_edit: {
        show: true,
        contenedor: false,
        hora: '',
        fecha: ''
      }
    };
  },
  components: {
    VueBootstrap4Table: vue_bootstrap4_table__WEBPACK_IMPORTED_MODULE_2__["default"],
    ToggleButton: vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  mounted: function mounted() {
    this.getListVehiculo();
    this.getListHorario();
    this.getListRuta();
  },
  methods: {
    setHorario: function setHorario() {
      var _this = this;

      if (this.idRuta == 0 || this.idVehiculo == 0) {
        this.show_alert.create.state = true;
        this.show_alert.create.messaje = 'Debe seleccionar Ruta y Vehiculo';
        setTimeout(function () {
          return _this.show_alert.create.state = false;
        }, 2000);
      } else {
        this.buttons.create.name = 'Agregando ...';
        this.buttons.create.state = true;
        var formData = {
          'fecha': this.fecha,
          'hora': this.hora,
          'idRuta': this.idRuta,
          'idVehiculo': this.idVehiculo
        };
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/setHorario', formData).then(function (response) {
          _this.fecha = '';
          _this.hora = '';
          _this.idRuta = 0;
          _this.idVehiculo = 0;
          swal("OK!", "Horario creado exitosamente!", "success");
          _this.buttons.create.name = 'Agregar';
          _this.buttons.create.state = false;
          $("#Horario").modal('hide');
        })["catch"](function (error) {
          swal("Lo sentimos!", "Parece que algo salio mal!", "error");
          console.log(error.response);
        });
      }

      ;
    },
    // Lista Categorias
    getListVehiculo: function getListVehiculo() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/vehiculo-resource').then(function (response) {
        console.log('response_ ' + JSON.stringify(response.data));
        _this2.vehiculo = response.data;
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    // Lista Categorias
    getListRuta: function getListRuta() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/rutas-resource?Q=1').then(function (response) {
        console.log('response_ ' + JSON.stringify(response.data));
        _this3.ruta = response.data;
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    getListHorario: function getListHorario() {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/horario-resource').then(function (response) {
        if (response.data.length > 0) {
          _this4.horario = response.data;
          console.log(_this4.horario);
        } else {
          _this4.message = 'No hay registro de horarios!!!';
        }
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    //traer Horario
    editHorario: function editHorario(idHorario) {
      var _this5 = this;

      this.data_edit.idHorario = idHorario;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/horario-resource/' + idHorario + '/edit').then(function (response) {
        _this5.data_edit.contenedor = true;
        _this5.data_edit.show = false;
        var data = response.data;
        _this5.data_edit.hora = data['hora'];
        _this5.data_edit.fecha = data['fecha'];
      })["catch"](function (error) {
        console.log(error);
      });
    },
    deleteHorario: function deleteHorario(idHorario) {
      this.data_edit.idHorario = idHorario;
      swal("El Horario se eliminará de sus registros", "¿Desea eliminar este horario?", "warning");
      console.log('holis');
    },
    //put horario
    putHorario: function putHorario() {
      var _this6 = this;

      this.buttons.edit.name = 'Actualizando...';
      this.buttons.edit.state = true;
      var formData = {
        'hora': this.data_edit.hora,
        'fecha': this.data_edit.fecha
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put('/updateHorario/' + this.data_edit.idHorario, formData).then(function (response) {
        console.log('entro a actualizar');
        _this6.buttons.edit.name = 'Actualizar';
        _this6.buttons.edit.state = false;
        swal("OK!", "Ruta actualizado exitosamente!", "success");
        $("#ModalEditHorario").modal('hide');

        _this6.getRutaTermina();
      })["catch"](function (error) {
        console.log(error.response);
        var errors = '';
        var aux = error.response.data.errors;

        for (var i in aux) {
          var sci = aux[i];

          for (var j in sci) {
            errors += '\n' + sci[j];
          }
        }

        _this6.buttons.edit.name = 'Actualizar';
        _this6.buttons.edit.state = false;
        _this6.show_alert.edit.state = true;
        _this6.show_alert.edit.messaje = errors;
        setTimeout(function () {
          return _this6.show_alert.edit.state = false;
        }, 5000);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Pasajeros'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'consultarRutasVehiculo',
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
/* harmony import */ var vue_bootstrap4_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-bootstrap4-table */ "./node_modules/vue-bootstrap4-table/dist/vue-bootstrap4-table.esm.js");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-js-toggle-button */ "./node_modules/vue-js-toggle-button/dist/index.js");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: "registrarRutas",
  data: function data() {
    return {
      codigo: '',
      descripcion: '',
      idBarrioInicia: 0,
      idBarrioTermina: 0,
      estado: -1,
      idUsuarioModifica: '',
      idUsuarioCrea: '',
      barrioTermina: [],
      show_barrios: true,
      barrio: [],
      rutas: [],
      show_alert: {
        create: {
          state: false,
          messaje: ''
        },
        edit: {
          state: false,
          messaje: ''
        }
      },
      buttons: {
        create: {
          name: 'Agregar',
          state: false
        },
        edit: {
          name: 'Actualizar',
          state: false
        }
      },
      columns: [{
        label: "Código",
        name: "codigo",
        sort: false
      }, {
        label: "Nombre",
        name: "descripcion",
        sort: true
      }, {
        label: "Inicio",
        name: "barrio_inicia",
        sort: false
      }, {
        label: "Destino",
        name: "barrio_termina",
        sort: true
      }, {
        label: "Editar",
        name: "edit",
        sort: false
      }, {
        label: "Eliminar",
        name: "delete",
        sort: false
      }, {
        label: "Estado",
        name: "estado",
        sort: false
      }],
      config: {
        pagination: true,
        // default true
        pagination_info: true,
        // default true
        num_of_visibile_pagination_buttons: 7,
        // default 5
        per_page: 6,
        // default 10
        per_page_options: [6, 10, 20, 30],
        //highlight_row_hover_color:"blue", over del listado
        filas_seleccionables: true,
        card_title: "RUTAS",
        show_refresh_button: false,
        show_reset_button: false,
        global_search: {
          placeholder: "Buscar "
        }
      },
      data_edit: {
        show: true,
        contenedor: false,
        codigo: '',
        descripcion: '',
        estado: ''
      }
    };
  },
  components: {
    VueBootstrap4Table: vue_bootstrap4_table__WEBPACK_IMPORTED_MODULE_3__["default"],
    ToggleButton: vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4___default.a
  },
  mounted: function mounted() {
    this.getListBarrios();
    this.getRutaTermina();
    this.getRutas();
  },
  methods: {
    //insertar ruta
    setRuta: function setRuta() {
      var _this = this;

      if (this.idBarrioInicia == 0 || this.idBarrioTermina == 0 || this.estado == -1) {
        this.show_alert.create.state = true;
        this.show_alert.create.messaje = 'Debe seleccionar origen, destino y estado ';
        setTimeout(function () {
          return _this.show_alert.create.state = false;
        }, 2000);
      } else {
        this.buttons.create.name = 'Agregando ...';
        this.buttons.create.state = true;
        var formData = {
          'codigo': this.codigo,
          'descripcion': this.descripcion,
          'idBarrioInicia': this.idBarrioInicia,
          'idBarrioTermina': this.idBarrioTermina,
          'estado': this.estado,
          'idUsuarioModifica': this.idUsuarioModifica,
          'idUsuarioCrea': this.idUsuarioModifica
        };
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/setRuta', formData).then(function (response) {
          _this.codigo = '';
          _this.descripcion = '';
          _this.idBarrioInicia = 0;
          _this.idBarrioTermina = 0;
          _this.estado = -1;
          _this.idUsuarioModifica = '';
          _this.idUsuarioCrea = '';
          swal("OK!", "Ruta creada exitosamente!", "success");
          _this.buttons.create.name = 'Agregar';
          _this.buttons.create.state = false;

          _this.getRutas();

          _this.getBarrioTermina();

          $("#Ruta").modal('hide');
          swal("OK!", "Ruta creada exitosamente!", "success");
          _this.buttons.create.name = 'Agregar';
          _this.buttons.create.state = false;

          _this.getRutaTermina();

          $("#Ruta").modal('hide');
        })["catch"](function (error) {
          swal("Lo sentimos!", "Parece que algo salio mal!", "error");
          console.log(error.response);
        });
      }

      ;
    },
    // Lista Barrios
    getListBarrios: function getListBarrios() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/barrio-resource').then(function (response) {
        // console.log('response_ '+JSON.stringify(response.data));
        _this2.barrio = response.data;
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    //listar destino
    getRutaTermina: function getRutaTermina() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/rutas-resource?Q=2').then(function (response) {
        if (response.data.length > 0) {
          _this3.barrioTermina = response.data;

          _this3.getRutas();
        } else {
          _this3.message = 'No hay registro de cupones!!!';
        }
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    //Listar Rutas
    getRutas: function getRutas() {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/rutas-resource?Q=0').then(function (response) {
        if (response.data.length > 0) {
          var rutasTotal = response.data;
          var des = _this4.barrioTermina;
          _this4.rut = rutasTotal.concat(des);
          var rutasAndDestino = [];

          for (var i = 0; i < des.length; i++) {
            rutasAndDestino[i] = Object.assign(des[i], _this4.rut[i]);
          } //this.rutas = Object.assign(des[0],this.rut[0]);


          _this4.rutas = rutasAndDestino;
        } else {
          _this4.message = 'No hay registro de tutas!!!';
        }
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    //traer rutas
    editRuta: function editRuta(idRuta) {
      var _this5 = this;

      this.data_edit.idRuta = idRuta;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/rutas-resource/' + idRuta + '/edit').then(function (response) {
        _this5.data_edit.contenedor = true;
        _this5.data_edit.show = false;
        var data = response.data;
        _this5.data_edit.codigo = data['codigo'];
        _this5.data_edit.descripcion = data['descripcion'];
        _this5.data_edit.estado = data['estado'];
      })["catch"](function (error) {
        console.log(error);
      });
    },
    deleteRuta: function deleteRuta(idRuta) {
      this.data_edit.idRuta = idRuta;
      swal("La ruta se eliminará de sus registros", "¿Desea eliminar esta ruta?", "warning");
      console.log('holis');
    },
    //put ruta
    putRuta: function putRuta() {
      var _this6 = this;

      this.buttons.edit.name = 'Actualizando...';
      this.buttons.edit.state = true;
      var formData = {
        'codigo': this.data_edit.codigo,
        'descripcion': this.data_edit.descripcion,
        'estado': this.data_edit.estado
      };
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/updateRuta/' + this.data_edit.idRuta, formData).then(function (response) {
        console.log('entro a actualizar');
        _this6.buttons.edit.name = 'Actualizar';
        _this6.buttons.edit.state = false;
        swal("OK!", "Ruta actualizado exitosamente!", "success");
        $("#ModalEditRuta").modal('hide');

        _this6.getRutaTermina();
      })["catch"](function (error) {
        console.log(error.response);
        var errors = '';
        var aux = error.response.data.errors;

        for (var i in aux) {
          var sci = aux[i];

          for (var j in sci) {
            errors += '\n' + sci[j];
          }
        }

        _this6.buttons.edit.name = 'Actualizar';
        _this6.buttons.edit.state = false;
        _this6.show_alert.edit.state = true;
        _this6.show_alert.edit.messaje = errors;
        setTimeout(function () {
          return _this6.show_alert.edit.state = false;
        }, 5000);
      });
    },
    //estado
    stateCupon: function stateCupon(id, state) {
      var _this7 = this;

      var formData = {
        id: id,
        state: state
      };
      swal({
        title: "Estas seguro ?",
        text: "Este cupón quedara " + state + " en tus registros!",
        icon: "warning",
        buttons: ["Cancelar", "Ok"],
        dangerMode: true
      }).then(function (willDelete) {
        if (willDelete) {
          axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/stateCupon', formData).then(function (response) {
            //Success
            _this7.getCupons();

            swal("OK!", "Estado actualizado", "success");
          })["catch"](function (error) {
            swal("Oops!", "Parece que algo salio mal!", "error");
            console.log(error.response);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      numeroIdentificacion: '',
      tipoIdentificacion: 1,
      nombres: '',
      apellidos: '',
      razonSocial: '',
      nombreComercial: '',
      genero: 0,
      fechaNacimiento: '',
      telefono: '',
      celular: '',
      email: '',
      direccion: '',
      idMunicipio: '',
      foto: '',
      estado: 0,
      idUsuarioCrea: '',
      idUsuarioModifica: '',
      buttons: {
        create: {
          name: 'Agregar',
          state: false
        }
      }
    };
  },
  methods: {
    setTercero: function setTercero() {
      var _this = this;

      this.buttons.create.name = 'Agregando ...';
      this.buttons.create.state = true;
      var formData = {
        'numeroIdentificacion': this.numeroIdentificacion,
        'tipoIdentificacion': this.tipoIdentificacion,
        'nombres': this.nombres,
        'apellidos': this.apellidos,
        'razonSocial': this.razonSocial,
        'nombreComercial': this.nombreComercial,
        'genero': this.genero,
        'fechaNacimiento': this.fechaNacimiento,
        'telefono': this.telefono,
        'celular': this.celular,
        'email': this.email,
        'direccion': this.direccion,
        'idMunicipio': this.idMunicipio,
        'foto': this.foto,
        'estado': this.estado,
        'idUsuarioCrea': this.idUsuarioCrea,
        'idUsuarioModifica': this.idUsuarioModifica
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/setTercero', formData).then(function (response) {
        _this.numeroIdentificacion = '', _this.tipoIdentificacion = '', _this.nombres = '', _this.apellidos = '', _this.razonSocial = '', _this.nombreComercial = '', _this.genero = '', _this.fechaNacimiento = '', _this.telefono = '', _this.celular = '', _this.email = '', _this.direccion = '', _this.idMunicipio = '', _this.foto = '', _this.estado = '', _this.idUsuarioCrea = '', _this.idUsuarioModifica = '', swal("OK!", "Tercero creado exitosamente!", "success");
        _this.buttons.create.name = 'Agregar';
        _this.buttons.create.state = false;
      })["catch"](function (error) {
        swal("Lo sentimos!", "Parece que algo salio mal!", "error");
        console.log(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Usuarios',
  data: function data() {
    return {
      idTercero: 0,
      estado: -1,
      codigo: '',
      clave: '',
      show_tercero: true,
      tercero: [],
      show_alert: {
        create: {
          state: false,
          messaje: ''
        }
      },
      buttons: {
        create: {
          name: 'Agregar',
          state: false
        }
      }
    };
  },
  mounted: function mounted() {
    this.getListTercero();
  },
  methods: {
    setUsuario: function setUsuario() {
      var _this = this;

      if (this.idTercero == 0 || this.estado == -1) {
        this.show_alert.create.state = true;
        this.show_alert.create.messaje = 'Debe seleccionar tercero y estado ';
        setTimeout(function () {
          return _this.show_alert.create.state = false;
        }, 2000);
      } else {
        this.buttons.create.name = 'Agregando ...';
        this.buttons.create.state = true;
        var formData = {
          'idTercero': this.idTercero,
          'estado': this.estado,
          'codigo': this.codigo,
          'clave': this.clave
        };
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/setUsuario', formData).then(function (response) {
          _this.idTercero = 0;
          _this.estado = '';
          _this.codigo = '';
          _this.clave = '';
          swal("OK!", "Usuario creado exitosamente!", "success");
          _this.buttons.create.name = 'Agregar';
          _this.buttons.create.state = false;
          $("#Usuario").modal('hide');
        })["catch"](function (error) {
          swal("Lo sentimos!", "Parece que algo salio mal!", "error");
          console.log(error.response);
        });
      }

      ;
    },
    // Lista Categorias
    getListTercero: function getListTercero() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/tercero-resource').then(function (response) {
        console.log('response_ ' + JSON.stringify(response.data));
        _this2.tercero = response.data;
      })["catch"](function (error) {
        console.log(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Despacho'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "registrarVehiculo",
  data: function data() {
    return {
      placa: '',
      numeroInterno: '',
      idVehiculoMatricula: '',
      idServicio: '',
      idClase: '',
      idMarca: '',
      idColor: '',
      idCarroceria: '',
      idCombustible: '',
      linea: '',
      modelo: '',
      numeroSerie: '',
      numeroChasis: '',
      numeroMotor: '',
      numeroPuertas: '',
      numeroPasajeros: '',
      observaciones: '',
      estado: '',
      idUsuarioCrea: '',
      idUsuarioModifica: '',
      buttons: {
        create: {
          name: 'Agregar',
          state: false
        }
      }
    };
  },
  methods: {
    setTercero: function setTercero() {
      var _this = this;

      this.buttons.create.name = 'Agregando ...';
      this.buttons.create.state = true;
      var formData = {
        'placa': this.placa,
        'numeroInterno': this.numeroInterno,
        'idVehiculoMatricula': this.idVehiculoMatricula,
        'idServicio': this.idServicio,
        'idClase': this.idClase,
        'idMarca': this.idMarca,
        'idColor': this.idColor,
        'idCarroceria': this.idCarroceria,
        'idCombustible': this.idCombustible,
        'linea': this.linea,
        'modelo': this.modelo,
        'numeroSerie': this.numeroSerie,
        'numeroChasis': this.numeroChasis,
        'numeroMotor': this.numeroMotor,
        'numeroPuertas': this.numeroPuertas,
        'numeroPasajeros': this.numeroPasajeros,
        'observaciones': this.observaciones,
        'estado': this.estado,
        'idUsuarioCrea': this.idUsuarioCrea,
        'idUsuarioModific': this.idUsuarioModifica
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/setVehiculo', formData).then(function (response) {
        _this.placa = '', _this.numeroInterno = '', _this.idVehiculoMatricula = '', _this.idServicio = '', _this.idClase = '', _this.idMarca = '', _this.idColor = '', _this.idCarroceria = '', _this.idCombustible = '', _this.linea = '', _this.modelo = '', _this.numeroSerie = '', _this.numeroChasis = '', _this.numeroMotor = '', _this.numeroPuertas = '', _this.numeroPasajeros = '', _this.observaciones = '', _this.estado = '', _this.idUsuarioCrea = '', _this.idUsuarioModifica = '', swal("OK!", "Vehículo creado exitosamente!", "success");
        _this.buttons.create.name = 'Agregar';
        _this.buttons.create.state = false;
      })["catch"](function (error) {
        swal("Lo sentimos!", "Parece que algo salio mal!", "error");
        console.log(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.examinar{\n  margin-top:4%;\n  min-width:3rem !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.tab-btn {\r\n  padding: 12px 22px;\r\n  background: #ffffff;\r\n  cursor: pointer;\r\n  background:#00031c;\r\n  color: white;\r\n  border:none;\r\n  outline: none;\r\n  margin-top:5%;\r\n  font-family: \"Open Sans\", sans-serif;\n}\n.buttons-options{\r\n   margin-left:5%;\n}\n.active {\r\n  background: #c78900;\n}\n.tab {\r\n  border: 1px solid #ccc;\r\n  padding: 20px;\r\n  background:#F1F1EF;\r\n  min-height:250px;\r\n  min-width:95%;\r\n  margin-top:1%;\r\n  width:90%;\n}\n.listado{\r\n    margin-top: 3%;\r\n    width:96%;\r\n    margin-left:1%;\n}\r\n\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarTerceros.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarVehiculo.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-bootstrap4-table/dist/vue-bootstrap4-table.esm.js":
/*!****************************************************************************!*\
  !*** ./node_modules/vue-bootstrap4-table/dist/vue-bootstrap4-table.esm.js ***!
  \****************************************************************************/
/*! exports provided: default, install */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function baseFindIndex(e,t,n,r){for(var i=e.length,a=n+(r?1:-1);r?a--:++a<i;)if(t(e[a],a,e))return a;return-1}var _baseFindIndex=baseFindIndex;function listCacheClear(){this.__data__=[],this.size=0}var _listCacheClear=listCacheClear;function eq(e,t){return e===t||e!=e&&t!=t}var eq_1=eq;function assocIndexOf(e,t){for(var n=e.length;n--;)if(eq_1(e[n][0],t))return n;return-1}var _assocIndexOf=assocIndexOf,arrayProto=Array.prototype,splice=arrayProto.splice;function listCacheDelete(e){var t=this.__data__,n=_assocIndexOf(t,e);return!(n<0)&&(n==t.length-1?t.pop():splice.call(t,n,1),--this.size,!0)}var _listCacheDelete=listCacheDelete;function listCacheGet(e){var t=this.__data__,n=_assocIndexOf(t,e);return n<0?void 0:t[n][1]}var _listCacheGet=listCacheGet;function listCacheHas(e){return _assocIndexOf(this.__data__,e)>-1}var _listCacheHas=listCacheHas;function listCacheSet(e,t){var n=this.__data__,r=_assocIndexOf(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}var _listCacheSet=listCacheSet;function ListCache(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}ListCache.prototype.clear=_listCacheClear,ListCache.prototype.delete=_listCacheDelete,ListCache.prototype.get=_listCacheGet,ListCache.prototype.has=_listCacheHas,ListCache.prototype.set=_listCacheSet;var _ListCache=ListCache;function stackClear(){this.__data__=new _ListCache,this.size=0}var _stackClear=stackClear;function stackDelete(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}var _stackDelete=stackDelete;function stackGet(e){return this.__data__.get(e)}var _stackGet=stackGet;function stackHas(e){return this.__data__.has(e)}var _stackHas=stackHas,commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var freeGlobal="object"==typeof commonjsGlobal&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal,_freeGlobal=freeGlobal,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=_freeGlobal||freeSelf||Function("return this")(),_root=root,Symbol=_root.Symbol,_Symbol=Symbol,objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,nativeObjectToString=objectProto.toString,symToStringTag=_Symbol?_Symbol.toStringTag:void 0;function getRawTag(e){var t=hasOwnProperty.call(e,symToStringTag),n=e[symToStringTag];try{e[symToStringTag]=void 0}catch(e){}var r=nativeObjectToString.call(e);return t?e[symToStringTag]=n:delete e[symToStringTag],r}var _getRawTag=getRawTag,objectProto$1=Object.prototype,nativeObjectToString$1=objectProto$1.toString;function objectToString(e){return nativeObjectToString$1.call(e)}var _objectToString=objectToString,nullTag="[object Null]",undefinedTag="[object Undefined]",symToStringTag$1=_Symbol?_Symbol.toStringTag:void 0;function baseGetTag(e){return null==e?void 0===e?undefinedTag:nullTag:symToStringTag$1&&symToStringTag$1 in Object(e)?_getRawTag(e):_objectToString(e)}var _baseGetTag=baseGetTag;function isObject(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}var isObject_1=isObject,asyncTag="[object AsyncFunction]",funcTag="[object Function]",genTag="[object GeneratorFunction]",proxyTag="[object Proxy]";function isFunction(e){if(!isObject_1(e))return!1;var t=_baseGetTag(e);return t==funcTag||t==genTag||t==asyncTag||t==proxyTag}var isFunction_1=isFunction,coreJsData=_root["__core-js_shared__"],_coreJsData=coreJsData,maskSrcKey=function(){var e=/[^.]+$/.exec(_coreJsData&&_coreJsData.keys&&_coreJsData.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function isMasked(e){return!!maskSrcKey&&maskSrcKey in e}var _isMasked=isMasked,funcProto=Function.prototype,funcToString=funcProto.toString;function toSource(e){if(null!=e){try{return funcToString.call(e)}catch(e){}try{return e+""}catch(e){}}return""}var _toSource=toSource,reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reIsHostCtor=/^\[object .+?Constructor\]$/,funcProto$1=Function.prototype,objectProto$2=Object.prototype,funcToString$1=funcProto$1.toString,hasOwnProperty$1=objectProto$2.hasOwnProperty,reIsNative=RegExp("^"+funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function baseIsNative(e){return!(!isObject_1(e)||_isMasked(e))&&(isFunction_1(e)?reIsNative:reIsHostCtor).test(_toSource(e))}var _baseIsNative=baseIsNative;function getValue(e,t){return null==e?void 0:e[t]}var _getValue=getValue;function getNative(e,t){var n=_getValue(e,t);return _baseIsNative(n)?n:void 0}var _getNative=getNative,Map=_getNative(_root,"Map"),_Map=Map,nativeCreate=_getNative(Object,"create"),_nativeCreate=nativeCreate;function hashClear(){this.__data__=_nativeCreate?_nativeCreate(null):{},this.size=0}var _hashClear=hashClear;function hashDelete(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var _hashDelete=hashDelete,HASH_UNDEFINED="__lodash_hash_undefined__",objectProto$3=Object.prototype,hasOwnProperty$2=objectProto$3.hasOwnProperty;function hashGet(e){var t=this.__data__;if(_nativeCreate){var n=t[e];return n===HASH_UNDEFINED?void 0:n}return hasOwnProperty$2.call(t,e)?t[e]:void 0}var _hashGet=hashGet,objectProto$4=Object.prototype,hasOwnProperty$3=objectProto$4.hasOwnProperty;function hashHas(e){var t=this.__data__;return _nativeCreate?void 0!==t[e]:hasOwnProperty$3.call(t,e)}var _hashHas=hashHas,HASH_UNDEFINED$1="__lodash_hash_undefined__";function hashSet(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=_nativeCreate&&void 0===t?HASH_UNDEFINED$1:t,this}var _hashSet=hashSet;function Hash(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Hash.prototype.clear=_hashClear,Hash.prototype.delete=_hashDelete,Hash.prototype.get=_hashGet,Hash.prototype.has=_hashHas,Hash.prototype.set=_hashSet;var _Hash=Hash;function mapCacheClear(){this.size=0,this.__data__={hash:new _Hash,map:new(_Map||_ListCache),string:new _Hash}}var _mapCacheClear=mapCacheClear;function isKeyable(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}var _isKeyable=isKeyable;function getMapData(e,t){var n=e.__data__;return _isKeyable(t)?n["string"==typeof t?"string":"hash"]:n.map}var _getMapData=getMapData;function mapCacheDelete(e){var t=_getMapData(this,e).delete(e);return this.size-=t?1:0,t}var _mapCacheDelete=mapCacheDelete;function mapCacheGet(e){return _getMapData(this,e).get(e)}var _mapCacheGet=mapCacheGet;function mapCacheHas(e){return _getMapData(this,e).has(e)}var _mapCacheHas=mapCacheHas;function mapCacheSet(e,t){var n=_getMapData(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}var _mapCacheSet=mapCacheSet;function MapCache(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}MapCache.prototype.clear=_mapCacheClear,MapCache.prototype.delete=_mapCacheDelete,MapCache.prototype.get=_mapCacheGet,MapCache.prototype.has=_mapCacheHas,MapCache.prototype.set=_mapCacheSet;var _MapCache=MapCache,LARGE_ARRAY_SIZE=200;function stackSet(e,t){var n=this.__data__;if(n instanceof _ListCache){var r=n.__data__;if(!_Map||r.length<LARGE_ARRAY_SIZE-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new _MapCache(r)}return n.set(e,t),this.size=n.size,this}var _stackSet=stackSet;function Stack(e){var t=this.__data__=new _ListCache(e);this.size=t.size}Stack.prototype.clear=_stackClear,Stack.prototype.delete=_stackDelete,Stack.prototype.get=_stackGet,Stack.prototype.has=_stackHas,Stack.prototype.set=_stackSet;var _Stack=Stack,HASH_UNDEFINED$2="__lodash_hash_undefined__";function setCacheAdd(e){return this.__data__.set(e,HASH_UNDEFINED$2),this}var _setCacheAdd=setCacheAdd;function setCacheHas(e){return this.__data__.has(e)}var _setCacheHas=setCacheHas;function SetCache(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new _MapCache;++t<n;)this.add(e[t])}SetCache.prototype.add=SetCache.prototype.push=_setCacheAdd,SetCache.prototype.has=_setCacheHas;var _SetCache=SetCache;function arraySome(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}var _arraySome=arraySome;function cacheHas(e,t){return e.has(t)}var _cacheHas=cacheHas,COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;function equalArrays(e,t,n,r,i,a){var s=n&COMPARE_PARTIAL_FLAG,o=e.length,l=t.length;if(o!=l&&!(s&&l>o))return!1;var c=a.get(e);if(c&&a.get(t))return c==t;var u=-1,_=!0,d=n&COMPARE_UNORDERED_FLAG?new _SetCache:void 0;for(a.set(e,t),a.set(t,e);++u<o;){var h=e[u],p=t[u];if(r)var f=s?r(p,h,u,t,e,a):r(h,p,u,e,t,a);if(void 0!==f){if(f)continue;_=!1;break}if(d){if(!_arraySome(t,function(e,t){if(!_cacheHas(d,t)&&(h===e||i(h,e,n,r,a)))return d.push(t)})){_=!1;break}}else if(h!==p&&!i(h,p,n,r,a)){_=!1;break}}return a.delete(e),a.delete(t),_}var _equalArrays=equalArrays,Uint8Array=_root.Uint8Array,_Uint8Array=Uint8Array;function mapToArray(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}var _mapToArray=mapToArray;function setToArray(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}var _setToArray=setToArray,COMPARE_PARTIAL_FLAG$1=1,COMPARE_UNORDERED_FLAG$1=2,boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",symbolProto=_Symbol?_Symbol.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;function equalByTag(e,t,n,r,i,a,s){switch(n){case dataViewTag:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case arrayBufferTag:return!(e.byteLength!=t.byteLength||!a(new _Uint8Array(e),new _Uint8Array(t)));case boolTag:case dateTag:case numberTag:return eq_1(+e,+t);case errorTag:return e.name==t.name&&e.message==t.message;case regexpTag:case stringTag:return e==t+"";case mapTag:var o=_mapToArray;case setTag:var l=r&COMPARE_PARTIAL_FLAG$1;if(o||(o=_setToArray),e.size!=t.size&&!l)return!1;var c=s.get(e);if(c)return c==t;r|=COMPARE_UNORDERED_FLAG$1,s.set(e,t);var u=_equalArrays(o(e),o(t),r,i,a,s);return s.delete(e),u;case symbolTag:if(symbolValueOf)return symbolValueOf.call(e)==symbolValueOf.call(t)}return!1}var _equalByTag=equalByTag;function arrayPush(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}var _arrayPush=arrayPush,isArray=Array.isArray,isArray_1=isArray;function baseGetAllKeys(e,t,n){var r=t(e);return isArray_1(e)?r:_arrayPush(r,n(e))}var _baseGetAllKeys=baseGetAllKeys;function arrayFilter(e,t){for(var n=-1,r=null==e?0:e.length,i=0,a=[];++n<r;){var s=e[n];t(s,n,e)&&(a[i++]=s)}return a}var _arrayFilter=arrayFilter;function stubArray(){return[]}var stubArray_1=stubArray,objectProto$5=Object.prototype,propertyIsEnumerable=objectProto$5.propertyIsEnumerable,nativeGetSymbols=Object.getOwnPropertySymbols,getSymbols=nativeGetSymbols?function(e){return null==e?[]:(e=Object(e),_arrayFilter(nativeGetSymbols(e),function(t){return propertyIsEnumerable.call(e,t)}))}:stubArray_1,_getSymbols=getSymbols;function baseTimes(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}var _baseTimes=baseTimes;function isObjectLike(e){return null!=e&&"object"==typeof e}var isObjectLike_1=isObjectLike,argsTag="[object Arguments]";function baseIsArguments(e){return isObjectLike_1(e)&&_baseGetTag(e)==argsTag}var _baseIsArguments=baseIsArguments,objectProto$6=Object.prototype,hasOwnProperty$4=objectProto$6.hasOwnProperty,propertyIsEnumerable$1=objectProto$6.propertyIsEnumerable,isArguments=_baseIsArguments(function(){return arguments}())?_baseIsArguments:function(e){return isObjectLike_1(e)&&hasOwnProperty$4.call(e,"callee")&&!propertyIsEnumerable$1.call(e,"callee")},isArguments_1=isArguments;function stubFalse(){return!1}var stubFalse_1=stubFalse,isBuffer_1=createCommonjsModule(function(e,t){var n=t&&!t.nodeType&&t,r=n&&e&&!e.nodeType&&e,i=r&&r.exports===n?_root.Buffer:void 0,a=(i?i.isBuffer:void 0)||stubFalse_1;e.exports=a}),MAX_SAFE_INTEGER=9007199254740991,reIsUint=/^(?:0|[1-9]\d*)$/;function isIndex(e,t){var n=typeof e;return!!(t=null==t?MAX_SAFE_INTEGER:t)&&("number"==n||"symbol"!=n&&reIsUint.test(e))&&e>-1&&e%1==0&&e<t}var _isIndex=isIndex,MAX_SAFE_INTEGER$1=9007199254740991;function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=MAX_SAFE_INTEGER$1}var isLength_1=isLength,argsTag$1="[object Arguments]",arrayTag="[object Array]",boolTag$1="[object Boolean]",dateTag$1="[object Date]",errorTag$1="[object Error]",funcTag$1="[object Function]",mapTag$1="[object Map]",numberTag$1="[object Number]",objectTag="[object Object]",regexpTag$1="[object RegExp]",setTag$1="[object Set]",stringTag$1="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag$1="[object ArrayBuffer]",dataViewTag$1="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};function baseIsTypedArray(e){return isObjectLike_1(e)&&isLength_1(e.length)&&!!typedArrayTags[_baseGetTag(e)]}typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag$1]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag$1]=typedArrayTags[boolTag$1]=typedArrayTags[dataViewTag$1]=typedArrayTags[dateTag$1]=typedArrayTags[errorTag$1]=typedArrayTags[funcTag$1]=typedArrayTags[mapTag$1]=typedArrayTags[numberTag$1]=typedArrayTags[objectTag]=typedArrayTags[regexpTag$1]=typedArrayTags[setTag$1]=typedArrayTags[stringTag$1]=typedArrayTags[weakMapTag]=!1;var _baseIsTypedArray=baseIsTypedArray;function baseUnary(e){return function(t){return e(t)}}var _baseUnary=baseUnary,_nodeUtil=createCommonjsModule(function(e,t){var n=t&&!t.nodeType&&t,r=n&&e&&!e.nodeType&&e,i=r&&r.exports===n&&_freeGlobal.process,a=function(){try{var e=r&&r.require&&r.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=a}),nodeIsTypedArray=_nodeUtil&&_nodeUtil.isTypedArray,isTypedArray=nodeIsTypedArray?_baseUnary(nodeIsTypedArray):_baseIsTypedArray,isTypedArray_1=isTypedArray,objectProto$7=Object.prototype,hasOwnProperty$5=objectProto$7.hasOwnProperty;function arrayLikeKeys(e,t){var n=isArray_1(e),r=!n&&isArguments_1(e),i=!n&&!r&&isBuffer_1(e),a=!n&&!r&&!i&&isTypedArray_1(e),s=n||r||i||a,o=s?_baseTimes(e.length,String):[],l=o.length;for(var c in e)!t&&!hasOwnProperty$5.call(e,c)||s&&("length"==c||i&&("offset"==c||"parent"==c)||a&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||_isIndex(c,l))||o.push(c);return o}var _arrayLikeKeys=arrayLikeKeys,objectProto$8=Object.prototype;function isPrototype(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||objectProto$8)}var _isPrototype=isPrototype;function overArg(e,t){return function(n){return e(t(n))}}var _overArg=overArg,nativeKeys=_overArg(Object.keys,Object),_nativeKeys=nativeKeys,objectProto$9=Object.prototype,hasOwnProperty$6=objectProto$9.hasOwnProperty;function baseKeys(e){if(!_isPrototype(e))return _nativeKeys(e);var t=[];for(var n in Object(e))hasOwnProperty$6.call(e,n)&&"constructor"!=n&&t.push(n);return t}var _baseKeys=baseKeys;function isArrayLike(e){return null!=e&&isLength_1(e.length)&&!isFunction_1(e)}var isArrayLike_1=isArrayLike;function keys(e){return isArrayLike_1(e)?_arrayLikeKeys(e):_baseKeys(e)}var keys_1=keys;function getAllKeys(e){return _baseGetAllKeys(e,keys_1,_getSymbols)}var _getAllKeys=getAllKeys,COMPARE_PARTIAL_FLAG$2=1,objectProto$a=Object.prototype,hasOwnProperty$7=objectProto$a.hasOwnProperty;function equalObjects(e,t,n,r,i,a){var s=n&COMPARE_PARTIAL_FLAG$2,o=_getAllKeys(e),l=o.length;if(l!=_getAllKeys(t).length&&!s)return!1;for(var c=l;c--;){var u=o[c];if(!(s?u in t:hasOwnProperty$7.call(t,u)))return!1}var _=a.get(e);if(_&&a.get(t))return _==t;var d=!0;a.set(e,t),a.set(t,e);for(var h=s;++c<l;){var p=e[u=o[c]],f=t[u];if(r)var m=s?r(f,p,u,t,e,a):r(p,f,u,e,t,a);if(!(void 0===m?p===f||i(p,f,n,r,a):m)){d=!1;break}h||(h="constructor"==u)}if(d&&!h){var g=e.constructor,v=t.constructor;g!=v&&"constructor"in e&&"constructor"in t&&!("function"==typeof g&&g instanceof g&&"function"==typeof v&&v instanceof v)&&(d=!1)}return a.delete(e),a.delete(t),d}var _equalObjects=equalObjects,DataView=_getNative(_root,"DataView"),_DataView=DataView,Promise=_getNative(_root,"Promise"),_Promise=Promise,Set=_getNative(_root,"Set"),_Set=Set,WeakMap=_getNative(_root,"WeakMap"),_WeakMap=WeakMap,mapTag$2="[object Map]",objectTag$1="[object Object]",promiseTag="[object Promise]",setTag$2="[object Set]",weakMapTag$1="[object WeakMap]",dataViewTag$2="[object DataView]",dataViewCtorString=_toSource(_DataView),mapCtorString=_toSource(_Map),promiseCtorString=_toSource(_Promise),setCtorString=_toSource(_Set),weakMapCtorString=_toSource(_WeakMap),getTag=_baseGetTag;(_DataView&&getTag(new _DataView(new ArrayBuffer(1)))!=dataViewTag$2||_Map&&getTag(new _Map)!=mapTag$2||_Promise&&getTag(_Promise.resolve())!=promiseTag||_Set&&getTag(new _Set)!=setTag$2||_WeakMap&&getTag(new _WeakMap)!=weakMapTag$1)&&(getTag=function(e){var t=_baseGetTag(e),n=t==objectTag$1?e.constructor:void 0,r=n?_toSource(n):"";if(r)switch(r){case dataViewCtorString:return dataViewTag$2;case mapCtorString:return mapTag$2;case promiseCtorString:return promiseTag;case setCtorString:return setTag$2;case weakMapCtorString:return weakMapTag$1}return t});var _getTag=getTag,COMPARE_PARTIAL_FLAG$3=1,argsTag$2="[object Arguments]",arrayTag$1="[object Array]",objectTag$2="[object Object]",objectProto$b=Object.prototype,hasOwnProperty$8=objectProto$b.hasOwnProperty;function baseIsEqualDeep(e,t,n,r,i,a){var s=isArray_1(e),o=isArray_1(t),l=s?arrayTag$1:_getTag(e),c=o?arrayTag$1:_getTag(t),u=(l=l==argsTag$2?objectTag$2:l)==objectTag$2,_=(c=c==argsTag$2?objectTag$2:c)==objectTag$2,d=l==c;if(d&&isBuffer_1(e)){if(!isBuffer_1(t))return!1;s=!0,u=!1}if(d&&!u)return a||(a=new _Stack),s||isTypedArray_1(e)?_equalArrays(e,t,n,r,i,a):_equalByTag(e,t,l,n,r,i,a);if(!(n&COMPARE_PARTIAL_FLAG$3)){var h=u&&hasOwnProperty$8.call(e,"__wrapped__"),p=_&&hasOwnProperty$8.call(t,"__wrapped__");if(h||p){var f=h?e.value():e,m=p?t.value():t;return a||(a=new _Stack),i(f,m,n,r,a)}}return!!d&&(a||(a=new _Stack),_equalObjects(e,t,n,r,i,a))}var _baseIsEqualDeep=baseIsEqualDeep;function baseIsEqual(e,t,n,r,i){return e===t||(null==e||null==t||!isObjectLike_1(e)&&!isObjectLike_1(t)?e!=e&&t!=t:_baseIsEqualDeep(e,t,n,r,baseIsEqual,i))}var _baseIsEqual=baseIsEqual,COMPARE_PARTIAL_FLAG$4=1,COMPARE_UNORDERED_FLAG$2=2;function baseIsMatch(e,t,n,r){var i=n.length,a=i,s=!r;if(null==e)return!a;for(e=Object(e);i--;){var o=n[i];if(s&&o[2]?o[1]!==e[o[0]]:!(o[0]in e))return!1}for(;++i<a;){var l=(o=n[i])[0],c=e[l],u=o[1];if(s&&o[2]){if(void 0===c&&!(l in e))return!1}else{var _=new _Stack;if(r)var d=r(c,u,l,e,t,_);if(!(void 0===d?_baseIsEqual(u,c,COMPARE_PARTIAL_FLAG$4|COMPARE_UNORDERED_FLAG$2,r,_):d))return!1}}return!0}var _baseIsMatch=baseIsMatch;function isStrictComparable(e){return e==e&&!isObject_1(e)}var _isStrictComparable=isStrictComparable;function getMatchData(e){for(var t=keys_1(e),n=t.length;n--;){var r=t[n],i=e[r];t[n]=[r,i,_isStrictComparable(i)]}return t}var _getMatchData=getMatchData;function matchesStrictComparable(e,t){return function(n){return null!=n&&(n[e]===t&&(void 0!==t||e in Object(n)))}}var _matchesStrictComparable=matchesStrictComparable;function baseMatches(e){var t=_getMatchData(e);return 1==t.length&&t[0][2]?_matchesStrictComparable(t[0][0],t[0][1]):function(n){return n===e||_baseIsMatch(n,e,t)}}var _baseMatches=baseMatches,symbolTag$1="[object Symbol]";function isSymbol(e){return"symbol"==typeof e||isObjectLike_1(e)&&_baseGetTag(e)==symbolTag$1}var isSymbol_1=isSymbol,reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;function isKey(e,t){if(isArray_1(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!isSymbol_1(e))||(reIsPlainProp.test(e)||!reIsDeepProp.test(e)||null!=t&&e in Object(t))}var _isKey=isKey,FUNC_ERROR_TEXT="Expected a function";function memoize(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(FUNC_ERROR_TEXT);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],a=n.cache;if(a.has(i))return a.get(i);var s=e.apply(this,r);return n.cache=a.set(i,s)||a,s};return n.cache=new(memoize.Cache||_MapCache),n}memoize.Cache=_MapCache;var memoize_1=memoize,MAX_MEMOIZE_SIZE=500;function memoizeCapped(e){var t=memoize_1(e,function(e){return n.size===MAX_MEMOIZE_SIZE&&n.clear(),e}),n=t.cache;return t}var _memoizeCapped=memoizeCapped,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,reEscapeChar=/\\(\\)?/g,stringToPath=_memoizeCapped(function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(rePropName,function(e,n,r,i){t.push(r?i.replace(reEscapeChar,"$1"):n||e)}),t}),_stringToPath=stringToPath;function arrayMap(e,t){for(var n=-1,r=null==e?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}var _arrayMap=arrayMap,INFINITY=1/0,symbolProto$1=_Symbol?_Symbol.prototype:void 0,symbolToString=symbolProto$1?symbolProto$1.toString:void 0;function baseToString(e){if("string"==typeof e)return e;if(isArray_1(e))return _arrayMap(e,baseToString)+"";if(isSymbol_1(e))return symbolToString?symbolToString.call(e):"";var t=e+"";return"0"==t&&1/e==-INFINITY?"-0":t}var _baseToString=baseToString;function toString(e){return null==e?"":_baseToString(e)}var toString_1=toString;function castPath(e,t){return isArray_1(e)?e:_isKey(e,t)?[e]:_stringToPath(toString_1(e))}var _castPath=castPath,INFINITY$1=1/0;function toKey(e){if("string"==typeof e||isSymbol_1(e))return e;var t=e+"";return"0"==t&&1/e==-INFINITY$1?"-0":t}var _toKey=toKey;function baseGet(e,t){for(var n=0,r=(t=_castPath(t,e)).length;null!=e&&n<r;)e=e[_toKey(t[n++])];return n&&n==r?e:void 0}var _baseGet=baseGet;function get(e,t,n){var r=null==e?void 0:_baseGet(e,t);return void 0===r?n:r}var get_1=get;function baseHasIn(e,t){return null!=e&&t in Object(e)}var _baseHasIn=baseHasIn;function hasPath(e,t,n){for(var r=-1,i=(t=_castPath(t,e)).length,a=!1;++r<i;){var s=_toKey(t[r]);if(!(a=null!=e&&n(e,s)))break;e=e[s]}return a||++r!=i?a:!!(i=null==e?0:e.length)&&isLength_1(i)&&_isIndex(s,i)&&(isArray_1(e)||isArguments_1(e))}var _hasPath=hasPath;function hasIn(e,t){return null!=e&&_hasPath(e,t,_baseHasIn)}var hasIn_1=hasIn,COMPARE_PARTIAL_FLAG$5=1,COMPARE_UNORDERED_FLAG$3=2;function baseMatchesProperty(e,t){return _isKey(e)&&_isStrictComparable(t)?_matchesStrictComparable(_toKey(e),t):function(n){var r=get_1(n,e);return void 0===r&&r===t?hasIn_1(n,e):_baseIsEqual(t,r,COMPARE_PARTIAL_FLAG$5|COMPARE_UNORDERED_FLAG$3)}}var _baseMatchesProperty=baseMatchesProperty;function identity(e){return e}var identity_1=identity;function baseProperty(e){return function(t){return null==t?void 0:t[e]}}var _baseProperty=baseProperty;function basePropertyDeep(e){return function(t){return _baseGet(t,e)}}var _basePropertyDeep=basePropertyDeep;function property(e){return _isKey(e)?_baseProperty(_toKey(e)):_basePropertyDeep(e)}var property_1=property;function baseIteratee(e){return"function"==typeof e?e:null==e?identity_1:"object"==typeof e?isArray_1(e)?_baseMatchesProperty(e[0],e[1]):_baseMatches(e):property_1(e)}var _baseIteratee=baseIteratee,NAN=NaN,reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt;function toNumber(e){if("number"==typeof e)return e;if(isSymbol_1(e))return NAN;if(isObject_1(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=isObject_1(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(reTrim,"");var n=reIsBinary.test(e);return n||reIsOctal.test(e)?freeParseInt(e.slice(2),n?2:8):reIsBadHex.test(e)?NAN:+e}var toNumber_1=toNumber,INFINITY$2=1/0,MAX_INTEGER=1.7976931348623157e308;function toFinite(e){return e?(e=toNumber_1(e))===INFINITY$2||e===-INFINITY$2?(e<0?-1:1)*MAX_INTEGER:e==e?e:0:0===e?e:0}var toFinite_1=toFinite;function toInteger(e){var t=toFinite_1(e),n=t%1;return t==t?n?t-n:t:0}var toInteger_1=toInteger,nativeMax=Math.max;function findIndex(e,t,n){var r=null==e?0:e.length;if(!r)return-1;var i=null==n?0:toInteger_1(n);return i<0&&(i=nativeMax(r+i,0)),_baseFindIndex(e,_baseIteratee(t,3),i)}var findIndex_1=findIndex,nativeCeil=Math.ceil,nativeMax$1=Math.max;function baseRange(e,t,n,r){for(var i=-1,a=nativeMax$1(nativeCeil((t-e)/(n||1)),0),s=Array(a);a--;)s[r?a:++i]=e,e+=n;return s}var _baseRange=baseRange;function isIterateeCall(e,t,n){if(!isObject_1(n))return!1;var r=typeof t;return!!("number"==r?isArrayLike_1(n)&&_isIndex(t,n.length):"string"==r&&t in n)&&eq_1(n[t],e)}var _isIterateeCall=isIterateeCall;function createRange(e){return function(t,n,r){return r&&"number"!=typeof r&&_isIterateeCall(t,n,r)&&(n=r=void 0),t=toFinite_1(t),void 0===n?(n=t,t=0):n=toFinite_1(n),r=void 0===r?t<n?1:-1:toFinite_1(r),_baseRange(t,n,r,e)}}var _createRange=createRange,range=_createRange(),range_1=range;function createBaseFor(e){return function(t,n,r){for(var i=-1,a=Object(t),s=r(t),o=s.length;o--;){var l=s[e?o:++i];if(!1===n(a[l],l,a))break}return t}}var _createBaseFor=createBaseFor,baseFor=_createBaseFor(),_baseFor=baseFor;function baseForOwn(e,t){return e&&_baseFor(e,t,keys_1)}var _baseForOwn=baseForOwn;function createBaseEach(e,t){return function(n,r){if(null==n)return n;if(!isArrayLike_1(n))return e(n,r);for(var i=n.length,a=t?i:-1,s=Object(n);(t?a--:++a<i)&&!1!==r(s[a],a,s););return n}}var _createBaseEach=createBaseEach,baseEach=_createBaseEach(_baseForOwn),_baseEach=baseEach;function baseFilter(e,t){var n=[];return _baseEach(e,function(e,r,i){t(e,r,i)&&n.push(e)}),n}var _baseFilter=baseFilter;function filter(e,t){return(isArray_1(e)?_arrayFilter:_baseFilter)(e,_baseIteratee(t,3))}var filter_1=filter;function baseIsNaN(e){return e!=e}var _baseIsNaN=baseIsNaN;function strictIndexOf(e,t,n){for(var r=n-1,i=e.length;++r<i;)if(e[r]===t)return r;return-1}var _strictIndexOf=strictIndexOf;function baseIndexOf(e,t,n){return t==t?_strictIndexOf(e,t,n):_baseFindIndex(e,_baseIsNaN,n)}var _baseIndexOf=baseIndexOf,stringTag$2="[object String]";function isString(e){return"string"==typeof e||!isArray_1(e)&&isObjectLike_1(e)&&_baseGetTag(e)==stringTag$2}var isString_1=isString;function baseValues(e,t){return _arrayMap(t,function(t){return e[t]})}var _baseValues=baseValues;function values(e){return null==e?[]:_baseValues(e,keys_1(e))}var values_1=values,nativeMax$2=Math.max;function includes(e,t,n,r){e=isArrayLike_1(e)?e:values_1(e),n=n&&!r?toInteger_1(n):0;var i=e.length;return n<0&&(n=nativeMax$2(i+n,0)),isString_1(e)?n<=i&&e.indexOf(t,n)>-1:!!i&&_baseIndexOf(e,t,n)>-1}var includes_1=includes;function baseMap(e,t){var n=-1,r=isArrayLike_1(e)?Array(e.length):[];return _baseEach(e,function(e,i,a){r[++n]=t(e,i,a)}),r}var _baseMap=baseMap;function map(e,t){return(isArray_1(e)?_arrayMap:_baseMap)(e,_baseIteratee(t,3))}var map_1=map,objectProto$c=Object.prototype,hasOwnProperty$9=objectProto$c.hasOwnProperty;function baseHas(e,t){return null!=e&&hasOwnProperty$9.call(e,t)}var _baseHas=baseHas;function has(e,t){return null!=e&&_hasPath(e,t,_baseHas)}var has_1=has,defineProperty=function(){try{var e=_getNative(Object,"defineProperty");return e({},"",{}),e}catch(e){}}(),_defineProperty=defineProperty;function baseAssignValue(e,t,n){"__proto__"==t&&_defineProperty?_defineProperty(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}var _baseAssignValue=baseAssignValue,objectProto$d=Object.prototype,hasOwnProperty$a=objectProto$d.hasOwnProperty;function assignValue(e,t,n){var r=e[t];hasOwnProperty$a.call(e,t)&&eq_1(r,n)&&(void 0!==n||t in e)||_baseAssignValue(e,t,n)}var _assignValue=assignValue;function copyObject(e,t,n,r){var i=!n;n||(n={});for(var a=-1,s=t.length;++a<s;){var o=t[a],l=r?r(n[o],e[o],o,n,e):void 0;void 0===l&&(l=e[o]),i?_baseAssignValue(n,o,l):_assignValue(n,o,l)}return n}var _copyObject=copyObject;function apply(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var _apply=apply,nativeMax$3=Math.max;function overRest(e,t,n){return t=nativeMax$3(void 0===t?e.length-1:t,0),function(){for(var r=arguments,i=-1,a=nativeMax$3(r.length-t,0),s=Array(a);++i<a;)s[i]=r[t+i];i=-1;for(var o=Array(t+1);++i<t;)o[i]=r[i];return o[t]=n(s),_apply(e,this,o)}}var _overRest=overRest;function constant(e){return function(){return e}}var constant_1=constant,baseSetToString=_defineProperty?function(e,t){return _defineProperty(e,"toString",{configurable:!0,enumerable:!1,value:constant_1(t),writable:!0})}:identity_1,_baseSetToString=baseSetToString,HOT_COUNT=800,HOT_SPAN=16,nativeNow=Date.now;function shortOut(e){var t=0,n=0;return function(){var r=nativeNow(),i=HOT_SPAN-(r-n);if(n=r,i>0){if(++t>=HOT_COUNT)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var _shortOut=shortOut,setToString=_shortOut(_baseSetToString),_setToString=setToString;function baseRest(e,t){return _setToString(_overRest(e,t,identity_1),e+"")}var _baseRest=baseRest;function createAssigner(e){return _baseRest(function(t,n){var r=-1,i=n.length,a=i>1?n[i-1]:void 0,s=i>2?n[2]:void 0;for(a=e.length>3&&"function"==typeof a?(i--,a):void 0,s&&_isIterateeCall(n[0],n[1],s)&&(a=i<3?void 0:a,i=1),t=Object(t);++r<i;){var o=n[r];o&&e(t,o,r,a)}return t})}var _createAssigner=createAssigner;function nativeKeysIn(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}var _nativeKeysIn=nativeKeysIn,objectProto$e=Object.prototype,hasOwnProperty$b=objectProto$e.hasOwnProperty;function baseKeysIn(e){if(!isObject_1(e))return _nativeKeysIn(e);var t=_isPrototype(e),n=[];for(var r in e)("constructor"!=r||!t&&hasOwnProperty$b.call(e,r))&&n.push(r);return n}var _baseKeysIn=baseKeysIn;function keysIn$1(e){return isArrayLike_1(e)?_arrayLikeKeys(e,!0):_baseKeysIn(e)}var keysIn_1=keysIn$1,assignIn=_createAssigner(function(e,t){_copyObject(t,keysIn_1(t),e)}),assignIn_1=assignIn,extend=assignIn_1,mapTag$3="[object Map]",setTag$3="[object Set]",objectProto$f=Object.prototype,hasOwnProperty$c=objectProto$f.hasOwnProperty;function isEmpty(e){if(null==e)return!0;if(isArrayLike_1(e)&&(isArray_1(e)||"string"==typeof e||"function"==typeof e.splice||isBuffer_1(e)||isTypedArray_1(e)||isArguments_1(e)))return!e.length;var t=_getTag(e);if(t==mapTag$3||t==setTag$3)return!e.size;if(_isPrototype(e))return!_baseKeys(e).length;for(var n in e)if(hasOwnProperty$c.call(e,n))return!1;return!0}var isEmpty_1=isEmpty;function isEqual(e,t){return _baseIsEqual(e,t)}var isEqual_1=isEqual,now=function(){return _root.Date.now()},now_1=now,FUNC_ERROR_TEXT$1="Expected a function",nativeMax$4=Math.max,nativeMin=Math.min;function debounce(e,t,n){var r,i,a,s,o,l,c=0,u=!1,_=!1,d=!0;if("function"!=typeof e)throw new TypeError(FUNC_ERROR_TEXT$1);function h(t){var n=r,a=i;return r=i=void 0,c=t,s=e.apply(a,n)}function p(e){var n=e-l;return void 0===l||n>=t||n<0||_&&e-c>=a}function f(){var e=now_1();if(p(e))return m(e);o=setTimeout(f,function(e){var n=t-(e-l);return _?nativeMin(n,a-(e-c)):n}(e))}function m(e){return o=void 0,d&&r?h(e):(r=i=void 0,s)}function g(){var e=now_1(),n=p(e);if(r=arguments,i=this,l=e,n){if(void 0===o)return function(e){return c=e,o=setTimeout(f,t),u?h(e):s}(l);if(_)return o=setTimeout(f,t),h(l)}return void 0===o&&(o=setTimeout(f,t)),s}return t=toNumber_1(t)||0,isObject_1(n)&&(u=!!n.leading,a=(_="maxWait"in n)?nativeMax$4(toNumber_1(n.maxWait)||0,t):a,d="trailing"in n?!!n.trailing:d),g.cancel=function(){void 0!==o&&clearTimeout(o),c=0,r=l=i=o=void 0},g.flush=function(){return void 0===o?s:m(now_1())},g}var debounce_1=debounce;function arrayEach(e,t){for(var n=-1,r=null==e?0:e.length;++n<r&&!1!==t(e[n],n,e););return e}var _arrayEach=arrayEach;function baseAssign(e,t){return e&&_copyObject(t,keys_1(t),e)}var _baseAssign=baseAssign;function baseAssignIn(e,t){return e&&_copyObject(t,keysIn_1(t),e)}var _baseAssignIn=baseAssignIn,_cloneBuffer=createCommonjsModule(function(e,t){var n=t&&!t.nodeType&&t,r=n&&e&&!e.nodeType&&e,i=r&&r.exports===n?_root.Buffer:void 0,a=i?i.allocUnsafe:void 0;e.exports=function(e,t){if(t)return e.slice();var n=e.length,r=a?a(n):new e.constructor(n);return e.copy(r),r}});function copyArray(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}var _copyArray=copyArray;function copySymbols(e,t){return _copyObject(e,_getSymbols(e),t)}var _copySymbols=copySymbols,getPrototype=_overArg(Object.getPrototypeOf,Object),_getPrototype=getPrototype,nativeGetSymbols$1=Object.getOwnPropertySymbols,getSymbolsIn=nativeGetSymbols$1?function(e){for(var t=[];e;)_arrayPush(t,_getSymbols(e)),e=_getPrototype(e);return t}:stubArray_1,_getSymbolsIn=getSymbolsIn;function copySymbolsIn(e,t){return _copyObject(e,_getSymbolsIn(e),t)}var _copySymbolsIn=copySymbolsIn;function getAllKeysIn(e){return _baseGetAllKeys(e,keysIn_1,_getSymbolsIn)}var _getAllKeysIn=getAllKeysIn,objectProto$g=Object.prototype,hasOwnProperty$d=objectProto$g.hasOwnProperty;function initCloneArray(e){var t=e.length,n=new e.constructor(t);return t&&"string"==typeof e[0]&&hasOwnProperty$d.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var _initCloneArray=initCloneArray;function cloneArrayBuffer(e){var t=new e.constructor(e.byteLength);return new _Uint8Array(t).set(new _Uint8Array(e)),t}var _cloneArrayBuffer=cloneArrayBuffer;function cloneDataView(e,t){var n=t?_cloneArrayBuffer(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var _cloneDataView=cloneDataView,reFlags=/\w*$/;function cloneRegExp(e){var t=new e.constructor(e.source,reFlags.exec(e));return t.lastIndex=e.lastIndex,t}var _cloneRegExp=cloneRegExp,symbolProto$2=_Symbol?_Symbol.prototype:void 0,symbolValueOf$1=symbolProto$2?symbolProto$2.valueOf:void 0;function cloneSymbol(e){return symbolValueOf$1?Object(symbolValueOf$1.call(e)):{}}var _cloneSymbol=cloneSymbol;function cloneTypedArray(e,t){var n=t?_cloneArrayBuffer(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var _cloneTypedArray=cloneTypedArray,boolTag$2="[object Boolean]",dateTag$2="[object Date]",mapTag$4="[object Map]",numberTag$2="[object Number]",regexpTag$2="[object RegExp]",setTag$4="[object Set]",stringTag$3="[object String]",symbolTag$2="[object Symbol]",arrayBufferTag$2="[object ArrayBuffer]",dataViewTag$3="[object DataView]",float32Tag$1="[object Float32Array]",float64Tag$1="[object Float64Array]",int8Tag$1="[object Int8Array]",int16Tag$1="[object Int16Array]",int32Tag$1="[object Int32Array]",uint8Tag$1="[object Uint8Array]",uint8ClampedTag$1="[object Uint8ClampedArray]",uint16Tag$1="[object Uint16Array]",uint32Tag$1="[object Uint32Array]";function initCloneByTag(e,t,n){var r=e.constructor;switch(t){case arrayBufferTag$2:return _cloneArrayBuffer(e);case boolTag$2:case dateTag$2:return new r(+e);case dataViewTag$3:return _cloneDataView(e,n);case float32Tag$1:case float64Tag$1:case int8Tag$1:case int16Tag$1:case int32Tag$1:case uint8Tag$1:case uint8ClampedTag$1:case uint16Tag$1:case uint32Tag$1:return _cloneTypedArray(e,n);case mapTag$4:return new r;case numberTag$2:case stringTag$3:return new r(e);case regexpTag$2:return _cloneRegExp(e);case setTag$4:return new r;case symbolTag$2:return _cloneSymbol(e)}}var _initCloneByTag=initCloneByTag,objectCreate=Object.create,baseCreate=function(){function e(){}return function(t){if(!isObject_1(t))return{};if(objectCreate)return objectCreate(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}(),_baseCreate=baseCreate;function initCloneObject(e){return"function"!=typeof e.constructor||_isPrototype(e)?{}:_baseCreate(_getPrototype(e))}var _initCloneObject=initCloneObject,mapTag$5="[object Map]";function baseIsMap(e){return isObjectLike_1(e)&&_getTag(e)==mapTag$5}var _baseIsMap=baseIsMap,nodeIsMap=_nodeUtil&&_nodeUtil.isMap,isMap=nodeIsMap?_baseUnary(nodeIsMap):_baseIsMap,isMap_1=isMap,setTag$5="[object Set]";function baseIsSet(e){return isObjectLike_1(e)&&_getTag(e)==setTag$5}var _baseIsSet=baseIsSet,nodeIsSet=_nodeUtil&&_nodeUtil.isSet,isSet=nodeIsSet?_baseUnary(nodeIsSet):_baseIsSet,isSet_1=isSet,CLONE_DEEP_FLAG=1,CLONE_FLAT_FLAG=2,CLONE_SYMBOLS_FLAG=4,argsTag$3="[object Arguments]",arrayTag$2="[object Array]",boolTag$3="[object Boolean]",dateTag$3="[object Date]",errorTag$2="[object Error]",funcTag$2="[object Function]",genTag$1="[object GeneratorFunction]",mapTag$6="[object Map]",numberTag$3="[object Number]",objectTag$3="[object Object]",regexpTag$3="[object RegExp]",setTag$6="[object Set]",stringTag$4="[object String]",symbolTag$3="[object Symbol]",weakMapTag$2="[object WeakMap]",arrayBufferTag$3="[object ArrayBuffer]",dataViewTag$4="[object DataView]",float32Tag$2="[object Float32Array]",float64Tag$2="[object Float64Array]",int8Tag$2="[object Int8Array]",int16Tag$2="[object Int16Array]",int32Tag$2="[object Int32Array]",uint8Tag$2="[object Uint8Array]",uint8ClampedTag$2="[object Uint8ClampedArray]",uint16Tag$2="[object Uint16Array]",uint32Tag$2="[object Uint32Array]",cloneableTags={};function baseClone(e,t,n,r,i,a){var s,o=t&CLONE_DEEP_FLAG,l=t&CLONE_FLAT_FLAG,c=t&CLONE_SYMBOLS_FLAG;if(n&&(s=i?n(e,r,i,a):n(e)),void 0!==s)return s;if(!isObject_1(e))return e;var u=isArray_1(e);if(u){if(s=_initCloneArray(e),!o)return _copyArray(e,s)}else{var _=_getTag(e),d=_==funcTag$2||_==genTag$1;if(isBuffer_1(e))return _cloneBuffer(e,o);if(_==objectTag$3||_==argsTag$3||d&&!i){if(s=l||d?{}:_initCloneObject(e),!o)return l?_copySymbolsIn(e,_baseAssignIn(s,e)):_copySymbols(e,_baseAssign(s,e))}else{if(!cloneableTags[_])return i?e:{};s=_initCloneByTag(e,_,o)}}a||(a=new _Stack);var h=a.get(e);if(h)return h;if(a.set(e,s),isSet_1(e))return e.forEach(function(r){s.add(baseClone(r,t,n,r,e,a))}),s;if(isMap_1(e))return e.forEach(function(r,i){s.set(i,baseClone(r,t,n,i,e,a))}),s;var p=c?l?_getAllKeysIn:_getAllKeys:l?keysIn:keys_1,f=u?void 0:p(e);return _arrayEach(f||e,function(r,i){f&&(r=e[i=r]),_assignValue(s,i,baseClone(r,t,n,i,e,a))}),s}cloneableTags[argsTag$3]=cloneableTags[arrayTag$2]=cloneableTags[arrayBufferTag$3]=cloneableTags[dataViewTag$4]=cloneableTags[boolTag$3]=cloneableTags[dateTag$3]=cloneableTags[float32Tag$2]=cloneableTags[float64Tag$2]=cloneableTags[int8Tag$2]=cloneableTags[int16Tag$2]=cloneableTags[int32Tag$2]=cloneableTags[mapTag$6]=cloneableTags[numberTag$3]=cloneableTags[objectTag$3]=cloneableTags[regexpTag$3]=cloneableTags[setTag$6]=cloneableTags[stringTag$4]=cloneableTags[symbolTag$3]=cloneableTags[uint8Tag$2]=cloneableTags[uint8ClampedTag$2]=cloneableTags[uint16Tag$2]=cloneableTags[uint32Tag$2]=!0,cloneableTags[errorTag$2]=cloneableTags[funcTag$2]=cloneableTags[weakMapTag$2]=!1;var _baseClone=baseClone,CLONE_DEEP_FLAG$1=1,CLONE_SYMBOLS_FLAG$1=4;function cloneDeep(e){return _baseClone(e,CLONE_DEEP_FLAG$1|CLONE_SYMBOLS_FLAG$1)}var cloneDeep_1=cloneDeep;function arrayIncludes(e,t){return!!(null==e?0:e.length)&&_baseIndexOf(e,t,0)>-1}var _arrayIncludes=arrayIncludes;function arrayIncludesWith(e,t,n){for(var r=-1,i=null==e?0:e.length;++r<i;)if(n(t,e[r]))return!0;return!1}var _arrayIncludesWith=arrayIncludesWith,LARGE_ARRAY_SIZE$1=200;function baseDifference(e,t,n,r){var i=-1,a=_arrayIncludes,s=!0,o=e.length,l=[],c=t.length;if(!o)return l;n&&(t=_arrayMap(t,_baseUnary(n))),r?(a=_arrayIncludesWith,s=!1):t.length>=LARGE_ARRAY_SIZE$1&&(a=_cacheHas,s=!1,t=new _SetCache(t));e:for(;++i<o;){var u=e[i],_=null==n?u:n(u);if(u=r||0!==u?u:0,s&&_==_){for(var d=c;d--;)if(t[d]===_)continue e;l.push(u)}else a(t,_,r)||l.push(u)}return l}var _baseDifference=baseDifference,spreadableSymbol=_Symbol?_Symbol.isConcatSpreadable:void 0;function isFlattenable(e){return isArray_1(e)||isArguments_1(e)||!!(spreadableSymbol&&e&&e[spreadableSymbol])}var _isFlattenable=isFlattenable;function baseFlatten(e,t,n,r,i){var a=-1,s=e.length;for(n||(n=_isFlattenable),i||(i=[]);++a<s;){var o=e[a];t>0&&n(o)?t>1?baseFlatten(o,t-1,n,r,i):_arrayPush(i,o):r||(i[i.length]=o)}return i}var _baseFlatten=baseFlatten;function isArrayLikeObject(e){return isObjectLike_1(e)&&isArrayLike_1(e)}var isArrayLikeObject_1=isArrayLikeObject;function last(e){var t=null==e?0:e.length;return t?e[t-1]:void 0}var last_1=last,differenceWith=_baseRest(function(e,t){var n=last_1(t);return isArrayLikeObject_1(n)&&(n=void 0),isArrayLikeObject_1(e)?_baseDifference(e,_baseFlatten(t,1,isArrayLikeObject_1,!0),void 0,n):[]}),differenceWith_1=differenceWith,differenceBy=_baseRest(function(e,t){var n=last_1(t);return isArrayLikeObject_1(n)&&(n=void 0),isArrayLikeObject_1(e)?_baseDifference(e,_baseFlatten(t,1,isArrayLikeObject_1,!0),_baseIteratee(n,2)):[]}),differenceBy_1=differenceBy,nativeMin$1=Math.min;function baseIntersection(e,t,n){for(var r=n?_arrayIncludesWith:_arrayIncludes,i=e[0].length,a=e.length,s=a,o=Array(a),l=1/0,c=[];s--;){var u=e[s];s&&t&&(u=_arrayMap(u,_baseUnary(t))),l=nativeMin$1(u.length,l),o[s]=!n&&(t||i>=120&&u.length>=120)?new _SetCache(s&&u):void 0}u=e[0];var _=-1,d=o[0];e:for(;++_<i&&c.length<l;){var h=u[_],p=t?t(h):h;if(h=n||0!==h?h:0,!(d?_cacheHas(d,p):r(c,p,n))){for(s=a;--s;){var f=o[s];if(!(f?_cacheHas(f,p):r(e[s],p,n)))continue e}d&&d.push(p),c.push(h)}}return c}var _baseIntersection=baseIntersection;function castArrayLikeObject(e){return isArrayLikeObject_1(e)?e:[]}var _castArrayLikeObject=castArrayLikeObject,intersectionWith=_baseRest(function(e){var t=last_1(e),n=_arrayMap(e,_castArrayLikeObject);return(t="function"==typeof t?t:void 0)&&n.pop(),n.length&&n[0]===e[0]?_baseIntersection(n,void 0,t):[]}),intersectionWith_1=intersectionWith,intersectionBy=_baseRest(function(e){var t=last_1(e),n=_arrayMap(e,_castArrayLikeObject);return t===last_1(n)?t=void 0:n.pop(),n.length&&n[0]===e[0]?_baseIntersection(n,_baseIteratee(t,2)):[]}),intersectionBy_1=intersectionBy;function baseSortBy(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}var _baseSortBy=baseSortBy;function compareAscending(e,t){if(e!==t){var n=void 0!==e,r=null===e,i=e==e,a=isSymbol_1(e),s=void 0!==t,o=null===t,l=t==t,c=isSymbol_1(t);if(!o&&!c&&!a&&e>t||a&&s&&l&&!o&&!c||r&&s&&l||!n&&l||!i)return 1;if(!r&&!a&&!c&&e<t||c&&n&&i&&!r&&!a||o&&n&&i||!s&&i||!l)return-1}return 0}var _compareAscending=compareAscending;function compareMultiple(e,t,n){for(var r=-1,i=e.criteria,a=t.criteria,s=i.length,o=n.length;++r<s;){var l=_compareAscending(i[r],a[r]);if(l)return r>=o?l:l*("desc"==n[r]?-1:1)}return e.index-t.index}var _compareMultiple=compareMultiple;function baseOrderBy(e,t,n){var r=-1;t=_arrayMap(t.length?t:[identity_1],_baseUnary(_baseIteratee));var i=_baseMap(e,function(e,n,i){return{criteria:_arrayMap(t,function(t){return t(e)}),index:++r,value:e}});return _baseSortBy(i,function(e,t){return _compareMultiple(e,t,n)})}var _baseOrderBy=baseOrderBy;function orderBy(e,t,n,r){return null==e?[]:(isArray_1(t)||(t=null==t?[]:[t]),isArray_1(n=r?void 0:n)||(n=null==n?[]:[n]),_baseOrderBy(e,t,n))}var orderBy_1=orderBy;function baseSlice(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),(n=n>i?i:n)<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=Array(i);++r<i;)a[r]=e[r+t];return a}var _baseSlice=baseSlice;function parent(e,t){return t.length<2?e:_baseGet(e,_baseSlice(t,0,-1))}var _parent=parent;function baseUnset(e,t){return t=_castPath(t,e),null==(e=_parent(e,t))||delete e[_toKey(last_1(t))]}var _baseUnset=baseUnset,objectTag$4="[object Object]",funcProto$2=Function.prototype,objectProto$h=Object.prototype,funcToString$2=funcProto$2.toString,hasOwnProperty$e=objectProto$h.hasOwnProperty,objectCtorString=funcToString$2.call(Object);function isPlainObject(e){if(!isObjectLike_1(e)||_baseGetTag(e)!=objectTag$4)return!1;var t=_getPrototype(e);if(null===t)return!0;var n=hasOwnProperty$e.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&funcToString$2.call(n)==objectCtorString}var isPlainObject_1=isPlainObject;function customOmitClone(e){return isPlainObject_1(e)?void 0:e}var _customOmitClone=customOmitClone;function flatten(e){return(null==e?0:e.length)?_baseFlatten(e,1):[]}var flatten_1=flatten;function flatRest(e){return _setToString(_overRest(e,void 0,flatten_1),e+"")}var _flatRest=flatRest,CLONE_DEEP_FLAG$2=1,CLONE_FLAT_FLAG$1=2,CLONE_SYMBOLS_FLAG$2=4,omit=_flatRest(function(e,t){var n={};if(null==e)return n;var r=!1;t=_arrayMap(t,function(t){return t=_castPath(t,e),r||(r=t.length>1),t}),_copyObject(e,_getAllKeysIn(e),n),r&&(n=_baseClone(n,CLONE_DEEP_FLAG$2|CLONE_FLAT_FLAG$1|CLONE_SYMBOLS_FLAG$2,_customOmitClone));for(var i=t.length;i--;)_baseUnset(n,t[i]);return n}),omit_1=omit,CLONE_SYMBOLS_FLAG$3=4;function clone(e){return _baseClone(e,CLONE_SYMBOLS_FLAG$3)}var clone_1=clone,script={name:"CheckBox",props:{rowsSelectable:{type:Boolean,default:!1},rowSelected:{type:Boolean,required:!0}},data:function(){return{checkboxSelected:!1}},methods:{selectCheckbox:function(e){this.checkboxSelected?this.$emit("remove-row",e.shiftKey):this.$emit("add-row",e.shiftKey)}},watch:{rowSelected:function(e,t){this.checkboxSelected=e}}},__vue_script__=script,__vue_render__=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td",e._g({staticClass:"text-center"},e.rowsSelectable?{}:{click:function(t){return e.selectCheckbox(t)}}),[n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checkboxSelected,expression:"checkboxSelected"}],staticClass:"custom-control-input vbt-checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checkboxSelected)?e._i(e.checkboxSelected,null)>-1:e.checkboxSelected},on:{change:function(t){var n=e.checkboxSelected,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=e._i(n,null);r.checked?a<0&&(e.checkboxSelected=n.concat([null])):a>-1&&(e.checkboxSelected=n.slice(0,a).concat(n.slice(a+1)))}else e.checkboxSelected=i}}}),e._v(" "),n("label",{staticClass:"custom-control-label"})])])},__vue_staticRenderFns__=[];__vue_render__._withStripped=!0;var __vue_inject_styles__=function(e){e&&e("data-v-aaaf6e90_0",{source:"\n.custom-control-label[data-v-aaaf6e90] {\n  vertical-align: top;\n}\n\n",map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/CheckBox.vue"],names:[],mappings:";AA8CA;EACA,oBAAA;CACA",file:"CheckBox.vue",sourcesContent:['<template>\n    <td class="text-center" v-on="!rowsSelectable ? { click: (event) => selectCheckbox(event)} : {}">\n        <div class="custom-control custom-checkbox">\n          <input type="checkbox" class="custom-control-input vbt-checkbox" v-model="checkboxSelected"/>\n          <label class="custom-control-label"></label>\n        </div>\n    </td>\n</template>\n\n\n<script>\n    export default {\n        name: \'CheckBox\',\n        props: {\n            rowsSelectable: {\n                type: Boolean,\n                default: false\n            },\n            rowSelected: {\n                type: Boolean,\n                required: true\n            }\n        },\n        data: function() {\n            return {\n                checkboxSelected:false\n            }\n        },\n        methods: {\n            selectCheckbox(event) {\n                if (this.checkboxSelected) {\n                    this.$emit(\'remove-row\', event.shiftKey);\n                } else {\n                    this.$emit(\'add-row\', event.shiftKey);\n                }\n            },\n        },\n        watch: {\n            rowSelected(newVal,oldVal) {\n                this.checkboxSelected = newVal;\n            }\n        }\n    }\n<\/script>\n\n<style scoped>\n.custom-control-label {\n  vertical-align: top;\n}\n\n</style>\n']},media:void 0})},__vue_scope_id__="data-v-aaaf6e90",__vue_module_identifier__=void 0,__vue_is_functional_template__=!1;function __vue_normalize__(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/CheckBox.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__.styles||(__vue_create_injector__.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var CheckBox=__vue_normalize__({render:__vue_render__,staticRenderFns:__vue_staticRenderFns__},__vue_inject_styles__,__vue_script__,__vue_scope_id__,__vue_is_functional_template__,__vue_module_identifier__,__vue_create_injector__,void 0),EventBus=new vue__WEBPACK_IMPORTED_MODULE_0___default.a,script$1={name:"Row",props:{row:{type:Object,required:!0},propRowClasses:{type:Object|String,required:!1},propCellClasses:{type:Object|String,required:!1},columns:{type:Array,default:function(){return[]}},uniqueId:{type:Number|String,required:!0},selectedItems:{type:Array,default:function(){return[]}},checkboxRows:{type:Boolean,default:!1},highlightRowHover:{type:Boolean,default:!1},highlightRowHoverColor:{type:String,default:"#d6d6d6"},rowsSelectable:{type:Boolean,default:!1},rowIndex:{type:Number,required:!0}},data:function(){return{rowSelected:!1,rowHiglighted:!1}},mounted:function(){var e=this;this.highlightRowHover&&(this.$refs.vbt_row.addEventListener("mouseover",function(){e.rowHiglighted=!0}),this.$refs.vbt_row.addEventListener("mouseleave",function(){e.rowHiglighted=!1})),this.checkInSelecteditems(this.selectedItems,this.row)},methods:{addRow:function(e){this.$emit("add-row",{shiftKey:e,rowIndex:this.rowIndex})},removeRow:function(e){this.$emit("remove-row",{shiftKey:e,rowIndex:this.rowIndex})},handleRowSelect:function(e){this.rowSelected?this.removeRow(e.shiftKey):this.addRow(e.shiftKey),this.rowSelected=!this.rowSelected},checkInSelecteditems:function(e,t){(this.checkboxRows||this.rowsSelectable)&&(differenceWith_1(e,[t],isEqual_1).length!=e.length?this.rowSelected=!0:this.rowSelected=!1)},rowHover:function(e){this.rowHiglighted=e},getValueFromRow:function(e,t){return get_1(e,t)},cellClasses:function(e){var t=this,n="";return has_1(e,"row_text_alignment")&&includes_1(["text-justify","text-right","text-left","text-center"],e.row_text_alignment)?n=n+" "+e.row_text_alignment:n+=" text-center",has_1(e,"row_classes")&&(n=n+" "+e.row_classes),"string"==typeof this.propCellClasses?this.propCellClasses:("object"==typeof this.propCellClasses&&Object.entries(this.propCellClasses).forEach(function(r){var i=r[0],a=r[1];if("boolean"==typeof a&&a)n+=" "+i;else if("function"==typeof a){var s=a(t.row,e,t.getValueFromRow(t.row,e.name));"boolean"==typeof s&&s&&(n+=" ",n+=i)}}),n)},getCellSlotName:function(e){return has_1(e,"slot_name")?e.slot_name:e.name.replace(/\./g,"_")},canShowColumn:function(e){return!(null!=e.visibility&&!e.visibility)}},computed:{rowClasses:function(){var e=this.userRowClasses;return this.rowSelected&&(e+=" ",e+="vbt-row-selected"),e},userRowClasses:function(){var e=this,t="";return"string"==typeof this.propRowClasses?this.propRowClasses:("object"==typeof this.propRowClasses&&Object.entries(this.propRowClasses).forEach(function(n){var r=n[0],i=n[1];if("boolean"==typeof i&&i)t+=r;else if("function"==typeof i){var a=i(e.row);"boolean"==typeof a&&a&&(t+=" ",t+=r)}}),t)},rowId:function(){return this.getValueFromRow(this.row,this.uniqueId)}},watch:{row:{handler:function(e,t){this.checkInSelecteditems(this.selectedItems,e)},deep:!0},selectedItems:{handler:function(e,t){this.checkInSelecteditems(e,this.row)},deep:!0}},components:{CheckBox:CheckBox}},__vue_script__$1=script$1,__vue_render__$1=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._g({ref:"vbt_row",class:e.rowClasses,style:{background:e.rowHiglighted?e.highlightRowHoverColor:""},attrs:{"data-id":e.rowId}},e.rowsSelectable?{click:function(t){return e.handleRowSelect(t)}}:{}),[e.checkboxRows?n("CheckBox",{attrs:{rowsSelectable:e.rowsSelectable,"row-selected":e.rowSelected},on:{"add-row":e.addRow,"remove-row":e.removeRow}}):e._e(),e._v(" "),e._l(e.columns,function(t,r,i){return[e.canShowColumn(t)?n("td",{key:i,class:e.cellClasses(t)},[e._t("vbt-"+e.getCellSlotName(t))],2):e._e()]})],2)},__vue_staticRenderFns__$1=[];__vue_render__$1._withStripped=!0;var __vue_inject_styles__$1=void 0,__vue_scope_id__$1=void 0,__vue_module_identifier__$1=void 0,__vue_is_functional_template__$1=!1;function __vue_normalize__$1(e,t,n,r,i,a,s,o){var l=("function"==typeof n?n.options:n)||{};return l.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Row.vue",l.render||(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),l._scopeId=r,l}var Row=__vue_normalize__$1({render:__vue_render__$1,staticRenderFns:__vue_staticRenderFns__$1},__vue_inject_styles__$1,__vue_script__$1,__vue_scope_id__$1,__vue_is_functional_template__$1,__vue_module_identifier__$1,void 0,void 0),script$2={name:"SelectAllRowsCheckBox",props:{allRowsSelected:{type:Boolean,default:!1},currentPageSelectionCount:{type:Number,default:0}},computed:{showIndeterminateState:function(){return!this.allRowsSelected&&this.currentPageSelectionCount>0}}},__vue_script__$2=script$2,__vue_render__$2=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("th",{staticClass:"text-center justify-content-center",on:{click:function(t){e.$emit("select-all-row-checkbox")}}},[n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.allRowsSelected,expression:"allRowsSelected"}],staticClass:"custom-control-input vbt-checkbox",attrs:{type:"checkbox",value:""},domProps:{indeterminate:e.showIndeterminateState,checked:Array.isArray(e.allRowsSelected)?e._i(e.allRowsSelected,"")>-1:e.allRowsSelected},on:{change:function(t){var n=e.allRowsSelected,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=e._i(n,"");r.checked?a<0&&(e.allRowsSelected=n.concat([""])):a>-1&&(e.allRowsSelected=n.slice(0,a).concat(n.slice(a+1)))}else e.allRowsSelected=i}}}),e._v(" "),n("label",{staticClass:"custom-control-label"})])])},__vue_staticRenderFns__$2=[];__vue_render__$2._withStripped=!0;var __vue_inject_styles__$2=function(e){e&&e("data-v-6ab70b9c_0",{source:"\n.custom-control-label[data-v-6ab70b9c] {\n  vertical-align: top;\n}\n\n",map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/SelectAllRowsCheckBox.vue"],names:[],mappings:";AA+BA;EACA,oBAAA;CACA",file:"SelectAllRowsCheckBox.vue",sourcesContent:['<template>\n    <th class="text-center justify-content-center" @click="$emit(\'select-all-row-checkbox\')">\n        <div class="custom-control custom-checkbox">\n            <input type="checkbox" :indeterminate.prop="showIndeterminateState" class="custom-control-input vbt-checkbox" v-model="allRowsSelected" value=""/>\n            <label class="custom-control-label"></label>\n        </div>\n    </th>\n</template>\n\n<script>\n    export default {\n        name: \'SelectAllRowsCheckBox\',\n        props: {\n            allRowsSelected: {\n                type: Boolean,\n                default: false\n            },\n            currentPageSelectionCount: {\n                type: Number,\n                default: 0\n            },\n        },\n        computed: {\n            showIndeterminateState() {\n                return !this.allRowsSelected && this.currentPageSelectionCount > 0;\n            },\n        }\n    }\n<\/script>\n\n<style scoped>\n.custom-control-label {\n  vertical-align: top;\n}\n\n</style>\n']},media:void 0})},__vue_scope_id__$2="data-v-6ab70b9c",__vue_module_identifier__$2=void 0,__vue_is_functional_template__$2=!1;function __vue_normalize__$2(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/SelectAllRowsCheckBox.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__$1(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__$1.styles||(__vue_create_injector__$1.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var SelectAllRowsCheckBox=__vue_normalize__$2({render:__vue_render__$2,staticRenderFns:__vue_staticRenderFns__$2},__vue_inject_styles__$2,__vue_script__$2,__vue_scope_id__$2,__vue_is_functional_template__$2,__vue_module_identifier__$2,__vue_create_injector__$1,void 0),script$3={name:"SortIcon",props:{sort:{type:Array,default:function(){return[]}},column:{type:Object,default:function(){return{}}}},data:function(){return{}},mounted:function(){},methods:{},computed:{order:function(){var e=findIndex_1(this.sort,{vbt_col_id:this.column.vbt_col_id});return-1==e?null:this.sort[e].order}}},__vue_script__$3=script$3,__vue_render__$3=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"float-right"},["asc"==this.order?[this._t("vbt-sort-asc-icon")]:"desc"===this.order?[this._t("vbt-sort-desc-icon")]:[this._t("vbt-no-sort-icon")]],2)},__vue_staticRenderFns__$3=[];__vue_render__$3._withStripped=!0;var __vue_inject_styles__$3=void 0,__vue_scope_id__$3=void 0,__vue_module_identifier__$3=void 0,__vue_is_functional_template__$3=!1;function __vue_normalize__$3(e,t,n,r,i,a,s,o){var l=("function"==typeof n?n.options:n)||{};return l.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/SortIcon.vue",l.render||(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),l._scopeId=r,l}var SortIcon=__vue_normalize__$3({render:__vue_render__$3,staticRenderFns:__vue_staticRenderFns__$3},__vue_inject_styles__$3,__vue_script__$3,__vue_scope_id__$3,__vue_is_functional_template__$3,__vue_module_identifier__$3,void 0,void 0),script$4={name:"Pagination",props:{page:{type:[String,Number],required:!0},per_page:{type:[String,Number],required:!0},total:{type:[String,Number],required:!0},num_of_visibile_pagination_buttons:{type:[String,Number],default:7},per_page_options:{type:Array,default:function(){return[5,10,15]}}},data:function(){return{start:this.page+0,end:0,go_to_page:""}},mounted:function(){this.calculatePageRange(!0)},methods:{gotoPage:function(){""!==this.go_to_page&&this.isPositiveInteger(this.go_to_page)&&this.pageHandler(this.go_to_page)},pageHandler:function(e){e>=1&&e<=this.totalPages&&this.$emit("update:page",e)},perPageHandler:function(e){this.$emit("update:per_page",e)},calculatePageRange:function(e){if(void 0===e&&(e=!1),this.totalPages<=this.num_of_visibile_pagination_buttons)return this.start=1,void(this.end=this.totalPages);(e||!includes_1(this.range,this.page-1)&&1!=this.page||!includes_1(this.range,this.page+1)&&this.page!=this.totalPages)&&(this.start=1==this.page?1:this.page-1,this.end=this.start+this.num_of_visibile_pagination_buttons-5,this.start<=3&&(this.end+=3-this.start,this.start=1),this.end>=this.totalPages-2&&(this.start-=this.end-(this.totalPages-2),this.end=this.totalPages),this.start=Math.max(this.start,1))},isPositiveInteger:function(e){return/^\+?(0|[1-9]\d*)$/.test(e)}},components:{},computed:{totalPages:function(){return Math.ceil(this.total/this.per_page)},disablePreviousButton:function(){return this.page==this.start},disableNextButton:function(){return this.page==this.end},range:function(){return range_1(this.start,this.end+1)},isEmpty:function(){return 0==this.total}},watch:{page:function(e,t){this.calculatePageRange()},rowCount:function(e,t){this.calculatePageRange()},totalPages:function(e,t){this.calculatePageRange()}}},__vue_script__$4=script$4,__vue_render__$4=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("nav",{attrs:{"aria-label":"Page navigation example"}},[n("ul",{staticClass:"pagination"},[n("li",{staticClass:"page-item",class:{disabled:e.disablePreviousButton},on:{click:function(t){t.preventDefault(),e.pageHandler(e.page-1)}}},[n("a",{staticClass:"page-link",attrs:{href:"","aria-label":"Previous"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._t("vbt-paginataion-previous-button")],2)])]),e._v(" "),e.isEmpty?[e._m(0)]:[e.start>3?n("li",{staticClass:"page-item",on:{click:function(t){t.preventDefault(),e.pageHandler(1)}}},[n("a",{staticClass:"page-link",attrs:{href:""}},[e._v(" 1 ")])]):e._e(),e._v(" "),e.start>3?n("li",{staticClass:"page-item disabled"},[n("a",{staticClass:"page-link",attrs:{href:""}},[e._v("…")])]):e._e(),e._v(" "),e._l(e.range,function(t){return n("li",{key:t,staticClass:"page-item",class:{active:t==e.page},on:{click:function(n){n.preventDefault(),e.pageHandler(t)}}},[n("a",{staticClass:"page-link",attrs:{href:""}},[e._v(e._s(t))])])}),e._v(" "),e.end<e.totalPages-2?n("li",{staticClass:"page-item disabled"},[n("a",{staticClass:"page-link",attrs:{href:""}},[e._v("…")])]):e._e(),e._v(" "),e.end<e.totalPages-2?n("li",{staticClass:"page-item",on:{click:function(t){t.preventDefault(),e.pageHandler(e.totalPages)}}},[n("a",{staticClass:"page-link",attrs:{href:""}},[e._v(" "+e._s(e.totalPages)+" ")])]):e._e()],e._v(" "),n("li",{staticClass:"page-item",class:{disabled:e.disableNextButton},on:{click:function(t){t.preventDefault(),e.pageHandler(e.page+1)}}},[n("a",{staticClass:"page-link",attrs:{href:"","aria-label":"Next"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._t("vbt-paginataion-next-button")],2)])]),e._v(" "),n("div",{staticClass:"dropdown show vbt-per-page-dropdown"},[n("a",{staticClass:"btn btn-primary dropdown-toggle",attrs:{href:"#",role:"button",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n                    "+e._s(e.per_page)+"\n                ")]),e._v(" "),n("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},e._l(e.per_page_options,function(t,r,i){return n("a",{key:i,staticClass:"dropdown-item",class:{active:t==e.per_page},attrs:{href:""},on:{click:function(n){n.preventDefault(),e.perPageHandler(t)}}},[e._v("\n                        "+e._s(t)+"\n                    ")])}),0)]),e._v(" "),n("div",{staticClass:"input-group col-sm-2"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.go_to_page,expression:"go_to_page",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",min:"1",step:"1",max:e.totalPages,placeholder:"Go to page"},domProps:{value:e.go_to_page},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.gotoPage(t):null},input:function(t){t.target.composing||(e.go_to_page=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})])],2)])])},__vue_staticRenderFns__$4=[function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"page-item disabled"},[t("a",{staticClass:"page-link",attrs:{href:""}},[this._v("…")])])}];__vue_render__$4._withStripped=!0;var __vue_inject_styles__$4=function(e){e&&e("data-v-75effae8_0",{source:"\nul.pagination[data-v-75effae8] {\n    margin-bottom: 0;\n}\n.vbt-per-page-dropdown[data-v-75effae8] {\n    margin-left: 8px;\n}\n",map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/Pagination.vue"],names:[],mappings:";AAwMA;IACA,iBAAA;CACA;AACA;IACA,iBAAA;CACA",file:"Pagination.vue",sourcesContent:['<template>\n    <div>\n        <nav aria-label="Page navigation example">\n            <ul class="pagination">\n                <li :class="{\'disabled\' : disablePreviousButton}" class="page-item" @click.prevent="pageHandler(page-1)">\n                    <a class="page-link" href="" aria-label="Previous">\n                        <span aria-hidden="true">\n                            <slot name="vbt-paginataion-previous-button">\n\n                            </slot>\n                        </span>\n                    </a>\n                </li>\n                <template v-if="!isEmpty">\n                    <li class="page-item" v-if="start > 3" @click.prevent="pageHandler(1)">\n                        <a class="page-link" href=""> 1 </a>\n                    </li>\n                    <li class="page-item disabled" v-if="start > 3">\n                        <a class="page-link" href="">…</a>\n                    </li>\n                    <li class="page-item" v-for="index in range" :key="index" v-bind:class="{ active:  (index == page)}" @click.prevent="pageHandler(index)">\n                        <a class="page-link" href="">{{index}}</a>\n                    </li>\n                    <li class="page-item disabled" v-if="end < totalPages - 2">\n                        <a class="page-link" href="">…</a>\n                    </li>\n                    <li class="page-item" v-if="end < totalPages - 2" @click.prevent="pageHandler(totalPages)">\n                        <a class="page-link" href=""> {{totalPages}} </a>\n                    </li>\n                </template>\n\n                <template v-else>\n                    <li class="page-item disabled">\n                        <a class="page-link" href="">…</a>\n                    </li>\n                </template>\n                <li :class="{\'disabled\' : disableNextButton}" class="page-item" @click.prevent="pageHandler(page+1)">\n                    <a class="page-link" href="" aria-label="Next">\n                        <span aria-hidden="true">\n                            <slot name="vbt-paginataion-next-button">\n\n                            </slot>\n                        </span>\n                    </a>\n                </li>\n                \x3c!-- Number of rows per page starts here --\x3e\n                <div class="dropdown show vbt-per-page-dropdown">\n                    <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                        {{per_page}}\n                    </a>\n\n                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">\n                        <a v-for="(option, key, index) in per_page_options" :key="index" class="dropdown-item" href="" @click.prevent="perPageHandler(option)" v-bind:class="{ active:  (option == per_page)}">\n                            {{option}}\n                        </a>\n                    </div>\n                </div>\n                \x3c!-- Number of rows per page ends here --\x3e\n\n                <div class="input-group col-sm-2">\n                    <input type="number" class="form-control" min="1" step="1" :max="totalPages" placeholder="Go to page" @keyup.enter="gotoPage" v-model.number="go_to_page">\n                </div>\n            </ul>\n        </nav>\n    </div>\n</template>\n\n<script>\n    import range from "lodash/range";\n    import includes from "lodash/includes";\n\n    export default {\n        name: \'Pagination\',\n        props: {\n            page: {\n                type: [String, Number],\n                required: true\n            },\n            per_page: {\n                type: [String, Number],\n                required: true\n            },\n            total: {\n                type: [String, Number],\n                required: true\n            },\n            num_of_visibile_pagination_buttons: {\n                type: [String, Number],\n                default: 7\n            },\n            per_page_options: {\n                type: Array,\n                default: function() {\n                    return [5,10,15]\n                }\n            }\n        },\n        data: function() {\n            return {\n                start: (this.page + 0),\n                end: 0,\n                go_to_page: ""\n            }\n        },\n        mounted() {\n            this.calculatePageRange(true);\n        },\n        methods: {\n            gotoPage() {\n                if (this.go_to_page === "" || !this.isPositiveInteger(this.go_to_page)) {\n                    return;\n                }\n\n                //Handle the new page\n                this.pageHandler(this.go_to_page)           \n            },\n            pageHandler(index) {\n                if (index >= 1 && index <= this.totalPages) {\n                    this.$emit(\'update:page\', index);\n                }\n            },\n            perPageHandler(option) {\n                this.$emit(\'update:per_page\', option);\n            },\n            calculatePageRange(force = false) {\n                //Skip calculating if all pages can be shown\n                if (this.totalPages <= this.num_of_visibile_pagination_buttons) {\n                    this.start = 1;\n                    this.end = this.totalPages;\n                    return;\n                }\n\n                //Skip recalculating if the previous and next pages are already visible\n                if (!force && \n                    (includes(this.range, this.page - 1) || this.page == 1) &&\n                    (includes(this.range, this.page + 1) || this.page == this.totalPages) \n                ) { return; }\n\n                //Current page is the start page minus one\n                this.start = (this.page == 1) ? 1 : this.page - 1;\n\n                //Reserved entries: firstpage, ellipsis (2x), prev. page, last page, current page\n                this.end = this.start + this.num_of_visibile_pagination_buttons - 5;\n\n                //If the user navigates on page one or two, we set start to one (ellipsis pointless)\n                //and can potentially shift up end\n                if (this.start <= 3) {\n                    this.end += 3 - this.start;\n                    this.start = 1;\n                }\n\n                //If the user navigates on the last two pages or out of bounds, we can shift down start\n                //This will also handle end overflow, substract 2 for ellipsis and last page\n                if (this.end >= this.totalPages - 2) {\n                    this.start -= this.end - (this.totalPages - 2);\n                    this.end = this.totalPages;\n                }\n\n                //Handle start underflow\n                this.start = Math.max(this.start, 1);\n            },\n            isPositiveInteger(str) {\n                return /^\\+?(0|[1-9]\\d*)$/.test(str);\n            }\n        },\n        components: {\n        },\n        computed: {\n            totalPages() {\n                return Math.ceil(this.total / this.per_page);\n            },\n            disablePreviousButton() {\n                return this.page == this.start;\n            },\n            disableNextButton() {\n                return this.page == this.end;\n            },\n            range() {\n                return range(this.start, this.end + 1);\n            },\n            isEmpty() {\n                return this.total == 0;\n            }\n\n        },\n        watch: {\n            page(newVal, oldVal) {\n                this.calculatePageRange();\n            },\n            rowCount(newVal, oldVal) {\n                this.calculatePageRange();\n            },\n            totalPages(newVal, oldVal) {\n                this.calculatePageRange();\n            },\n        }\n    }\n<\/script>\n\n<style scoped>\n    ul.pagination {\n        margin-bottom: 0;\n    }\n    .vbt-per-page-dropdown {\n        margin-left: 8px;\n    }\n</style>\n']},media:void 0})},__vue_scope_id__$4="data-v-75effae8",__vue_module_identifier__$4=void 0,__vue_is_functional_template__$4=!1;function __vue_normalize__$4(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Pagination.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__$2(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__$2.styles||(__vue_create_injector__$2.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var Pagination=__vue_normalize__$4({render:__vue_render__$4,staticRenderFns:__vue_staticRenderFns__$4},__vue_inject_styles__$4,__vue_script__$4,__vue_scope_id__$4,__vue_is_functional_template__$4,__vue_module_identifier__$4,__vue_create_injector__$2,void 0),script$5={name:"Simple",props:{column:{type:Object,default:function(){return{}}}},data:function(){return{filterOnPressEnter:!1,debounceRate:60}},mounted:function(){var e=this;has_1(this.column,"filter.init.value")&&(this.$refs.simple_filter_input.value=this.column.filter.init.value),has_1(this.column,"filter.filterOnPressEnter")&&(this.filterOnPressEnter=this.column.filter.filterOnPressEnter),!this.filterOnPressEnter&&has_1(this.column,"filter.debounceRate")&&(this.debounceRate=this.column.filter.debounceRate),EventBus.$on("reset-query",function(){e.$refs.simple_filter_input&&(e.$refs.simple_filter_input.value="")})},methods:{clearFilter:function(){this.$refs.simple_filter_input.value="",this.$emit("clear-filter",this.column)},updateFilterHandler:function(e){this.$emit("update-filter",{value:e.target.value,column:this.column})}},components:{},computed:{showClearButton:function(){return null==this.column.filter.showClearButton||this.column.filter.showClearButton},updateFilter:function(){return debounce_1(this.updateFilterHandler,this.debounceRate)}}},__vue_script__$5=script$5,__vue_render__$5=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-group has-clear-right"},[e.showClearButton?n("span",{staticClass:"form-control-feedback vbt-simple-filter-clear",on:{click:e.clearFilter}},[e._t("vbt-simple-filter-clear-icon")],2):e._e(),e._v(" "),e.filterOnPressEnter?n("input",{ref:"simple_filter_input",staticClass:"form-control",attrs:{type:"text",placeholder:e.column.filter.placeholder},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.updateFilterHandler(t)}}}):n("input",{ref:"simple_filter_input",staticClass:"form-control",attrs:{type:"text",placeholder:e.column.filter.placeholder},on:{keyup:function(t){t.stopPropagation(),e.updateFilter(t)}}})])},__vue_staticRenderFns__$5=[];__vue_render__$5._withStripped=!0;var __vue_inject_styles__$5=function(e){e&&e("data-v-59254620_0",{source:"\n.vbt-simple-filter-clear[data-v-59254620] {\n    cursor: pointer;\n}\n\n/* Styles for wrapping the search box */\n.main[data-v-59254620] {\n    width: 50%;\n    margin: 50px auto;\n}\n\n/* Bootstrap 4 text input with clear icon on the right */\n.has-clear-right[data-v-59254620] {\n    position: relative;\n}\n.has-clear-right .form-control[data-v-59254620] {\n    padding-right: 2.375rem;\n}\n.has-clear-right .form-control-feedback[data-v-59254620] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 2;\n    display: block;\n    width: 2.375rem;\n    height: 2.375rem;\n    line-height: 2.375rem;\n    text-align: center;\n}\n.has-clear-right .form-control-feedback[data-v-59254620]:hover {\n    color: red;\n}\n\n",map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/Simple.vue"],names:[],mappings:";AAoFA;IACA,gBAAA;CACA;;AAEA,wCAAA;AAEA;IACA,WAAA;IACA,kBAAA;CACA;;AAEA,yDAAA;AAEA;IACA,mBAAA;CACA;AAEA;IACA,wBAAA;CACA;AAEA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;IACA,WAAA;IACA,eAAA;IACA,gBAAA;IACA,iBAAA;IACA,sBAAA;IACA,mBAAA;CACA;AAEA;IACA,WAAA;CACA",file:"Simple.vue",sourcesContent:['<template>\n  <div class="form-group has-clear-right">\n    <span v-if="showClearButton" class="form-control-feedback vbt-simple-filter-clear" @click="clearFilter">\n        <slot name="vbt-simple-filter-clear-icon">\n\n        </slot>\n    </span>\n    <input v-if="filterOnPressEnter" type="text" ref="simple_filter_input" class="form-control" :placeholder="column.filter.placeholder" @keyup.enter="updateFilterHandler($event)">\n    <input v-else type="text" ref="simple_filter_input" class="form-control" :placeholder="column.filter.placeholder" @keyup.stop="updateFilter($event)">\n  </div>\n</template>\n\n<script>\n    import debounce from "lodash/debounce";\n    import has from "lodash/has";\n\n\n    import {\n        EventBus\n    } from \'../../event-bus.js\';\n\n    export default {\n        name: "Simple",\n        props: {\n            column: {\n                type: Object,\n                default: function() {\n                    return {};\n                }\n            },\n        },\n        data: function() {\n            return {\n                filterOnPressEnter: false,\n                debounceRate: 60\n            };\n        },\n        mounted() {\n            if (has(this.column,\'filter.init.value\')) {\n                this.$refs.simple_filter_input.value = this.column.filter.init.value;\n            }\n\n            if (has(this.column,\'filter.filterOnPressEnter\')) {\n                this.filterOnPressEnter = this.column.filter.filterOnPressEnter;\n            }\n\n            if (!this.filterOnPressEnter && has(this.column,\'filter.debounceRate\')) {\n                this.debounceRate = this.column.filter.debounceRate;\n            }\n\n            EventBus.$on(\'reset-query\', () => {\n                if (this.$refs.simple_filter_input) {\n                    this.$refs.simple_filter_input.value = "";\n                }\n            });\n        },\n        methods: {\n            clearFilter() {\n                this.$refs.simple_filter_input.value = "";\n                this.$emit(\'clear-filter\',this.column);\n            },\n            // TODO - configurable debouncing\n            updateFilterHandler: function (event) {\n                this.$emit(\'update-filter\', {\n                    "value": event.target.value,\n                    "column": this.column\n                });\n            },\n        },\n        components: {\n        },\n        computed: {\n            showClearButton() {\n                return (this.column.filter.showClearButton == undefined) ? true : this.column.filter.showClearButton;\n            },\n            updateFilter () {\n                return debounce(this.updateFilterHandler, this.debounceRate);\n            },\n        }\n    };\n<\/script>\n\n<style scoped>\n\n    .vbt-simple-filter-clear {\n        cursor: pointer;\n    }\n\n    /* Styles for wrapping the search box */\n\n    .main {\n        width: 50%;\n        margin: 50px auto;\n    }\n\n    /* Bootstrap 4 text input with clear icon on the right */\n\n    .has-clear-right {\n        position: relative;\n    }\n\n    .has-clear-right .form-control {\n        padding-right: 2.375rem;\n    }\n\n    .has-clear-right .form-control-feedback {\n        position: absolute;\n        top: 0;\n        right: 0;\n        z-index: 2;\n        display: block;\n        width: 2.375rem;\n        height: 2.375rem;\n        line-height: 2.375rem;\n        text-align: center;\n    }\n\n    .has-clear-right .form-control-feedback:hover {\n        color: red;\n    }\n\n</style>\n']},media:void 0})},__vue_scope_id__$5="data-v-59254620",__vue_module_identifier__$5=void 0,__vue_is_functional_template__$5=!1;function __vue_normalize__$5(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/Simple.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__$3(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__$3.styles||(__vue_create_injector__$3.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var Simple=__vue_normalize__$5({render:__vue_render__$5,staticRenderFns:__vue_staticRenderFns__$5},__vue_inject_styles__$5,__vue_script__$5,__vue_scope_id__$5,__vue_is_functional_template__$5,__vue_module_identifier__$5,__vue_create_injector__$3,void 0),script$6={name:"MultiSelectItem",props:{column:{type:Object,default:function(){return{}}},option:{type:Object,default:function(){return{name:"option one",value:"option one"}}},index:{type:Number|String,default:0},isSingleMode:{type:Boolean,default:!0},isAllOptionsSelected:{type:Boolean,default:!1},selectedOptionIndexes:{type:Array,default:function(){return[]}}},data:function(){return{option_selected:!1,selected_value:""}},methods:{handleSelect:function(){this.option_selected?this.$emit("on-deselect-option",this.index):this.$emit("on-select-option",this.index)}},watch:{selectedOptionIndexes:{handler:function(e,t){var n=cloneDeep_1(e);this.option_selected=includes_1(n,this.index)},deep:!0},option_selected:function(e,t){this.selected_value=e?this.option.value:""}}},__vue_script__$6=script$6,__vue_render__$6=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a",{staticClass:"dropdown-item",attrs:{href:""},on:{click:function(t){t.preventDefault(),e.handleSelect()}}},[e.isSingleMode?n("div",{staticClass:"custom-control custom-radio"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selected_value,expression:"selected_value"}],staticClass:"custom-control-input",attrs:{type:"radio"},domProps:{value:e.option.value,checked:e._q(e.selected_value,e.option.value)},on:{change:function(t){e.selected_value=e.option.value}}}),e._v(" "),n("label",{staticClass:"custom-control-label"},[e._v(e._s(e.option.name))])]):n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.option_selected,expression:"option_selected"}],staticClass:"custom-control-input vbt-checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.option_selected)?e._i(e.option_selected,null)>-1:e.option_selected},on:{change:function(t){var n=e.option_selected,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=e._i(n,null);r.checked?a<0&&(e.option_selected=n.concat([null])):a>-1&&(e.option_selected=n.slice(0,a).concat(n.slice(a+1)))}else e.option_selected=i}}}),e._v(" "),n("label",{staticClass:"custom-control-label"},[e._v(e._s(e.option.name))])])])])},__vue_staticRenderFns__$6=[];__vue_render__$6._withStripped=!0;var __vue_inject_styles__$6=void 0,__vue_scope_id__$6=void 0,__vue_module_identifier__$6=void 0,__vue_is_functional_template__$6=!1;function __vue_normalize__$6(e,t,n,r,i,a,s,o){var l=("function"==typeof n?n.options:n)||{};return l.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/MultiSelectItem.vue",l.render||(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),l._scopeId=r,l}var MultiSelectItem=__vue_normalize__$6({render:__vue_render__$6,staticRenderFns:__vue_staticRenderFns__$6},__vue_inject_styles__$6,__vue_script__$6,__vue_scope_id__$6,__vue_is_functional_template__$6,__vue_module_identifier__$6,void 0,void 0),script$7={name:"MultiSelectAllItem",props:{isAllOptionsSelected:{type:Boolean,default:!1},text:{type:String,default:"Any"}},data:function(){return{option_selected:!1}},methods:{handleSelect:function(){this.option_selected?this.$emit("on-deselect-all-option"):this.$emit("on-select-all-option",this.index)}},watch:{isAllOptionsSelected:function(e,t){this.option_selected=e}}},__vue_script__$7=script$7,__vue_render__$7=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a",{staticClass:"dropdown-item",attrs:{href:""},on:{click:function(t){t.preventDefault(),e.handleSelect()}}},[n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.option_selected,expression:"option_selected"}],staticClass:"custom-control-input vbt-checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.option_selected)?e._i(e.option_selected,null)>-1:e.option_selected},on:{change:function(t){var n=e.option_selected,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=e._i(n,null);r.checked?a<0&&(e.option_selected=n.concat([null])):a>-1&&(e.option_selected=n.slice(0,a).concat(n.slice(a+1)))}else e.option_selected=i}}}),e._v(" "),n("label",{staticClass:"custom-control-label"},[e._v(e._s(e.text))])])])])},__vue_staticRenderFns__$7=[];__vue_render__$7._withStripped=!0;var __vue_inject_styles__$7=void 0,__vue_scope_id__$7=void 0,__vue_module_identifier__$7=void 0,__vue_is_functional_template__$7=!1;function __vue_normalize__$7(e,t,n,r,i,a,s,o){var l=("function"==typeof n?n.options:n)||{};return l.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/MultiSelectAllItem.vue",l.render||(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),l._scopeId=r,l}var MultiSelectAllItem=__vue_normalize__$7({render:__vue_render__$7,staticRenderFns:__vue_staticRenderFns__$7},__vue_inject_styles__$7,__vue_script__$7,__vue_scope_id__$7,__vue_is_functional_template__$7,__vue_module_identifier__$7,void 0,void 0),script$8={name:"MultiSelect",props:{column:{type:Object,default:function(){return{}}},options:{type:Array,default:function(){return[]}}},data:function(){return{selected_option_indexes:[],canEmit:!1}},mounted:function(){var e=this;has_1(this.column,"filter.closeDropdownOnSelection")&&this.column.filter.closeDropdownOnSelection||this.$refs.vbt_dropdown_menu.addEventListener("click",function(e){e.stopPropagation()},!1),EventBus.$on("reset-query",function(){e.selected_option_indexes=[]});var t=this.optionsCount-1;if(has_1(this.column,"filter.init.value"))if(this.isSingleMode){var n=this.column.filter.init.value;if(n>t||n<0)return;this.addOption(n)}else Array.isArray(this.column.filter.init.value)?this.column.filter.init.value.forEach(function(n){n>t||n<0||e.addOption(n)}):console.log("Initial value for 'multi' mode should be an array");this.$nextTick(function(){e.canEmit=!0})},methods:{addOption:function(e){this.isSingleMode?(this.resetSelectedOptions(),this.selected_option_indexes.push(e)):-1==findIndex_1(this.selected_option_indexes,function(t){return t==e})&&this.selected_option_indexes.push(e)},selectAllOptions:function(){this.resetSelectedOptions(),this.selected_option_indexes=range_1(this.options.length)},removeOption:function(e){if(this.isSingleMode)this.resetSelectedOptions();else{var t=findIndex_1(this.selected_option_indexes,function(t){return t==e});t>-1&&this.selected_option_indexes.splice(t,1)}},resetSelectedOptions:function(){this.selected_option_indexes=[]}},components:{MultiSelectItem:MultiSelectItem,MultiSelectAllItem:MultiSelectAllItem},computed:{optionsCount:function(){return this.options.length},title:function(){var e=this.column.filter.placeholder?this.column.filter.placeholder:"Select options";return 0===this.selected_option_indexes.length?e:this.selected_option_indexes.length>0&&this.selected_option_indexes.length<=1?this.options[this.selected_option_indexes[0]].name:this.selected_option_indexes.length+" selected"},mode:function(){var e="single";return has_1(this.column.filter,"mode")&&"multi"==this.column.filter.mode&&(e="multi"),e},isSingleMode:function(){return"single"==this.mode},isAllOptionsSelected:function(){return this.options.length===this.selected_option_indexes.length},showSelectAllCheckbox:function(){return!has_1(this.column.filter,"select_all_checkbox")||this.column.filter.select_all_checkbox.visibility},selectAllCheckboxText:function(){return has_1(this.column.filter,"select_all_checkbox")&&has_1(this.column.filter.select_all_checkbox,"text")?this.column.filter.select_all_checkbox.text:"Select All"}},watch:{selected_option_indexes:function(e,t){if(this.canEmit){var n=filter_1(this.options,function(t,n){return includes_1(e,n)}),r={};r.column=cloneDeep_1(this.column),r.selected_options=[],n.forEach(function(e){r.selected_options.push(e.value)}),this.$emit("update-multi-select-filter",r)}}}},__vue_script__$8=script$8,__vue_render__$8=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"dropdown"},[n("a",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{href:"#",role:"button",id:"multifilter_"+e.column.name,"data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n                "+e._s(e.title)+"\n            ")]),e._v(" "),n("div",{ref:"vbt_dropdown_menu",staticClass:"dropdown-menu scrollable-menu",attrs:{"aria-labelledby":"dropdownMenuLink"}},[!e.isSingleMode&&e.showSelectAllCheckbox?n("multi-select-all-item",{attrs:{text:e.selectAllCheckboxText,"is-all-options-selected":e.isAllOptionsSelected},on:{"on-deselect-all-option":function(t){e.selected_option_indexes=[]},"on-select-all-option":e.selectAllOptions}}):e._e(),e._v(" "),e._l(e.options,function(t,r){return n("multi-select-item",{key:r,attrs:{index:r,option:t,"is-single-mode":e.isSingleMode,selectedOptionIndexes:e.selected_option_indexes},on:{"on-select-option":e.addOption,"on-deselect-option":e.removeOption}})})],2)])])},__vue_staticRenderFns__$8=[];__vue_render__$8._withStripped=!0;var __vue_inject_styles__$8=function(e){e&&e("data-v-1c8ea2b5_0",{source:"\n.scrollable-menu[data-v-1c8ea2b5] {\n    height: auto;\n    max-height: 200px;\n    overflow-x: hidden;\n}\n",map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/MultiSelect.vue"],names:[],mappings:";AAgNA;IACA,aAAA;IACA,kBAAA;IACA,mBAAA;CACA",file:"MultiSelect.vue",sourcesContent:['<template>\n    <div>\n        <div class="dropdown">\n            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" :id="\'multifilter_\'+column.name" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">\n                    {{title}}\n                </a>\n            <div ref="vbt_dropdown_menu" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuLink">\n                <multi-select-all-item v-if="!isSingleMode && showSelectAllCheckbox" :text="selectAllCheckboxText" :is-all-options-selected="isAllOptionsSelected" @on-deselect-all-option="selected_option_indexes=[]" @on-select-all-option="selectAllOptions"></multi-select-all-item>\n                <multi-select-item v-for="(option, key) in options" :key="key" :index="key" :option="option" :is-single-mode="isSingleMode" :selectedOptionIndexes="selected_option_indexes" @on-select-option="addOption" @on-deselect-option="removeOption"></multi-select-item>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\nimport findIndex from "lodash/findIndex";\nimport range from "lodash/range";\nimport filter from "lodash/filter";\nimport includes from "lodash/includes";\nimport map from "lodash/map";\nimport join from "lodash/join";\nimport has from "lodash/has";\nimport cloneDeep from "lodash/cloneDeep";\n\nimport MultiSelectItem from "./MultiSelectItem.vue";\nimport MultiSelectAllItem from "./MultiSelectAllItem.vue";\n\nimport {\n    EventBus\n} from \'../../event-bus.js\';\n\nexport default {\n    name: "MultiSelect",\n    props: {\n        column: {\n            type: Object,\n            default: function () {\n                return {\n\n                };\n            }\n        },\n        options: {\n            type: Array,\n            default: function () {\n                return []\n            }\n        }\n    },\n    data: function () {\n        return {\n            selected_option_indexes: [],\n            canEmit: false\n        };\n    },\n    mounted() {\n        if (!has(this.column,"filter.closeDropdownOnSelection") || !this.column.filter.closeDropdownOnSelection) {\n            this.$refs.vbt_dropdown_menu.addEventListener("click",function(e){\n                e.stopPropagation();\n            },false);\n        }\n\n        EventBus.$on(\'reset-query\', () => {\n            this.selected_option_indexes = [];\n        });\n\n        let lastIndex = this.optionsCount - 1;\n\n        if (has(this.column,\'filter.init.value\')) {\n            if (this.isSingleMode) {\n                let index = this.column.filter.init.value;\n                if (index > lastIndex || index < 0) return;\n                this.addOption(index)\n            } else {\n                if (Array.isArray(this.column.filter.init.value)) {\n                    this.column.filter.init.value.forEach(index => {\n                        if (index > lastIndex || index < 0) return;\n                        this.addOption(index)\n                    });\n                } else {\n                    console.log("Initial value for \'multi\' mode should be an array");\n                }\n            }\n        }\n\n        this.$nextTick(() => { this.canEmit = true });\n    },\n    methods: {\n        addOption(index) {\n            if (this.isSingleMode) {\n                this.resetSelectedOptions();\n                this.selected_option_indexes.push(index);\n            } else {\n                let res = findIndex(this.selected_option_indexes, function (option_index) {\n                    return option_index == index;\n                });\n                if (res == -1) {\n                    this.selected_option_indexes.push(index);\n                }\n            }\n        },\n        selectAllOptions() {\n            this.resetSelectedOptions();\n            this.selected_option_indexes = range(this.options.length);\n        },\n        removeOption(index) {\n            if (this.isSingleMode) {\n                this.resetSelectedOptions();\n            } else {\n                let res = findIndex(this.selected_option_indexes, function (option_index) {\n                    return option_index == index;\n                });\n                if (res > -1) {\n                    this.selected_option_indexes.splice(res, 1);\n                }\n            }\n        },\n\n        resetSelectedOptions() {\n            this.selected_option_indexes = [];\n        }\n    },\n    components: {\n        MultiSelectItem,\n        MultiSelectAllItem\n    },\n    computed: {\n        optionsCount() {\n            return this.options.length;\n        },\n        title() {\n            let title = (this.column.filter.placeholder) ? (this.column.filter.placeholder) : "Select options";\n\n            if (this.selected_option_indexes.length === 0) {\n                return title;\n            }\n\n            if (this.selected_option_indexes.length > 0 && this.selected_option_indexes.length <= 1) {\n                return this.options[this.selected_option_indexes[0]].name;\n                // let filtered_options = filter(this.options, (option, index) => {\n                //     return includes(this.selected_option_indexes, index)\n                // });\n                // let names = map(filtered_options, (option) => {\n                //     return option.name\n                // });\n                // return join(names, ",  ");\n            } else {\n                return this.selected_option_indexes.length + " selected";\n            }\n\n        },\n\n        mode() {\n            let mode = "single";\n            if (has(this.column.filter, "mode") && this.column.filter.mode == "multi") {\n                mode = "multi";\n            }\n            return mode;\n        },\n\n        isSingleMode() {\n            return (this.mode == "single");\n        },\n\n        isAllOptionsSelected() {\n            return this.options.length === this.selected_option_indexes.length;\n        },\n\n        showSelectAllCheckbox() {\n            if (!has(this.column.filter,"select_all_checkbox")) {\n                return true;\n            } else {\n                return this.column.filter.select_all_checkbox.visibility;\n            }\n        },\n\n        selectAllCheckboxText() {\n            if (!has(this.column.filter,"select_all_checkbox")) {\n                return "Select All";\n            } else {\n                return (has(this.column.filter.select_all_checkbox,"text")) ? this.column.filter.select_all_checkbox.text : "Select All"\n            }\n        }\n    },\n    watch: {\n        selected_option_indexes(newVal, oldVal) {\n\n            if (!this.canEmit) return;\n\n            let filtered_options = filter(this.options, (option, index) => {\n                return includes(newVal, index)\n            });\n\n            let payload = {};\n            payload.column = cloneDeep(this.column);\n            payload.selected_options = [];\n\n            filtered_options.forEach(option => {\n                payload.selected_options.push(option.value);\n            });\n\n            this.$emit(\'update-multi-select-filter\', payload);\n        }\n    },\n};\n<\/script>\n\n<style scoped>\n.scrollable-menu {\n    height: auto;\n    max-height: 200px;\n    overflow-x: hidden;\n}\n</style>\n']},media:void 0})},__vue_scope_id__$8="data-v-1c8ea2b5",__vue_module_identifier__$8=void 0,__vue_is_functional_template__$8=!1;function __vue_normalize__$8(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/Filters/MultiSelect.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__$4(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__$4.styles||(__vue_create_injector__$4.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var MultiSelect=__vue_normalize__$8({render:__vue_render__$8,staticRenderFns:__vue_staticRenderFns__$8},__vue_inject_styles__$8,__vue_script__$8,__vue_scope_id__$8,__vue_is_functional_template__$8,__vue_module_identifier__$8,__vue_create_injector__$4,void 0),script$9={name:"VueBootstrap4Table",props:{rows:{type:Array,required:!0},columns:{type:Array,required:!0},totalRows:{type:Number,default:0},showLoader:{type:Boolean,default:!1},config:{type:Object,default:function(){return{}}},classes:{type:Object,default:function(){return{}}},actions:{type:Array,default:function(){return[]}},customFilters:{type:Array,default:function(){return[]}}},data:function(){return{vbt_rows:[],vbt_columns:[],query:{sort:[],filters:[],global_search:""},page:1,per_page:10,original_rows:[],num_of_visibile_pagination_buttons:5,temp_filtered_results:[],pagination:!0,pagination_info:!0,checkbox_rows:!1,selected_items:[],highlight_row_hover:!0,highlight_row_hover_color:"#d6d6d6",rows_selectable:!1,allRowsSelected:!1,multi_column_sort:!1,loaderText:"Loading...",card_title:"",global_search:{placeholder:"Enter search text",class:"",visibility:!0,case_sensitive:!1,showClearButton:!0,searchOnPressEnter:!1,searchDebounceRate:60,init:{value:""}},per_page_options:[5,10,15],show_refresh_button:!0,show_reset_button:!0,server_mode:!1,total_rows:0,card_mode:!0,selected_rows_info:!1,lastSelectedItemIndex:null,isFirstTime:!0,isResponsive:!0,preservePageOnDataChange:!1,canEmitQueries:!1}},mounted:function(){var e=this;this.vbt_rows=cloneDeep_1(this.rows),this.vbt_columns=cloneDeep_1(this.columns);var t=this;this.original_rows=map_1(this.vbt_rows,function(e,n){var r={};return t.hasUniqueId||(r.vbt_id=n+1),extend({},e,r)}),this.vbt_columns=map_1(this.vbt_columns,function(e,t){var n={};return n.vbt_col_id=t+1,extend({},e,n)}),this.initConfig(),this.initialSort(),this.initFilterQueries(),this.global_search.visibility&&this.$nextTick(function(){e.initGlobalSearch()}),this.$nextTick(function(){e.server_mode?(e.canEmitQueries=!0,e.emitQueryParams()):e.filter(!1,!0)}),this.handleShiftKey()},components:{Row:Row,CheckBox:CheckBox,SelectAllRowsCheckBox:SelectAllRowsCheckBox,Simple:Simple,MultiSelect:MultiSelect,SortIcon:SortIcon,Pagination:Pagination},methods:{initConfig:function(){isEmpty_1(this.config)||(this.pagination=!has_1(this.config,"pagination")||this.config.pagination,this.num_of_visibile_pagination_buttons=has_1(this.config,"num_of_visibile_pagination_buttons")?this.config.num_of_visibile_pagination_buttons:7,this.per_page_options=has_1(this.config,"per_page_options")?this.config.per_page_options:[5,10,15],this.per_page=has_1(this.config,"per_page")?this.config.per_page:10,this.page=has_1(this.config,"page")?this.config.page:1,this.checkbox_rows=!!has_1(this.config,"checkbox_rows")&&this.config.checkbox_rows,this.highlight_row_hover=!has_1(this.config,"highlight_row_hover")||this.config.highlight_row_hover,this.highlight_row_hover_color=has_1(this.config,"highlight_row_hover_color")?this.config.highlight_row_hover_color:"#d6d6d6",this.rows_selectable=!!has_1(this.config,"rows_selectable")&&this.config.rows_selectable,this.multi_column_sort=!!has_1(this.config,"multi_column_sort")&&this.config.multi_column_sort,this.pagination_info=!has_1(this.config,"pagination_info")||this.config.pagination_info,this.card_title=has_1(this.config,"card_title")?this.config.card_title:"",has_1(this.config,"global_search")&&(this.global_search.placeholder=has_1(this.config.global_search,"placeholder")?this.config.global_search.placeholder:"Enter search text",this.global_search.visibility=!has_1(this.config.global_search,"visibility")||this.config.global_search.visibility,this.global_search.case_sensitive=!!has_1(this.config.global_search,"case_sensitive")&&this.config.global_search.case_sensitive,this.global_search.showClearButton=!has_1(this.config.global_search,"showClearButton")||this.config.global_search.showClearButton,this.global_search.searchOnPressEnter=!!has_1(this.config.global_search,"searchOnPressEnter")&&this.config.global_search.searchOnPressEnter,this.global_search.searchDebounceRate=has_1(this.config.global_search,"searchDebounceRate")?this.config.global_search.searchDebounceRate:60,this.global_search.class=has_1(this.config.global_search,"class")?this.config.global_search.class:"",this.global_search.init.value=has_1(this.config.global_search,"init.value")?this.config.global_search.init.value:""),this.show_refresh_button=!has_1(this.config,"show_refresh_button")||this.config.show_refresh_button,this.show_reset_button=!has_1(this.config,"show_reset_button")||this.config.show_reset_button,this.server_mode=!!has_1(this.config,"server_mode")&&this.config.server_mode,this.card_mode=!has_1(this.config,"card_mode")||this.config.card_mode,this.selected_rows_info=!!has_1(this.config,"card_mode")&&this.config.selected_rows_info,this.preservePageOnDataChange=!!has_1(this.config,"preservePageOnDataChange")&&this.config.preservePageOnDataChange,this.loaderText=has_1(this.config,"loaderText")?this.config.loaderText:this.loaderText)},initialSort:function(){var e=this;filter_1(this.vbt_columns,function(e){return has_1(e,"initial_sort")&&1==e.initial_sort}).some(function(t){if(-1==findIndex_1(e.query.sort,{vbt_col_id:t.vbt_col_id})){var n="asc";has_1(t,"initial_sort_order")&&(includes_1(["asc","desc"],t.initial_sort_order)?n=t.initial_sort_order:console.log("invalid initial_sort_order, so setting it to default")),e.query.sort.push({vbt_col_id:t.vbt_col_id,name:t.name,order:n,caseSensitive:e.isSortCaseSensitive(t)})}if(!e.multi_column_sort)return!0})},initGlobalSearch:function(){this.$refs.global_search.value=this.global_search.init.value,this.query.global_search=this.global_search.init.value},hasFilter:function(e){return has_1(e,"filter.type")},clearFilter:function(e){var t=this.getFilterIndex(e);-1!==t&&this.query.filters.splice(t,1)},getFilterIndex:function(e){return findIndex_1(this.query.filters,{name:e.name})},initFilterQueries:function(){var e=this;this.vbt_columns.forEach(function(t){if(has_1(t,"filter"))if("simple"==t.filter.type){if(!has_1(t,"filter.init.value"))return;e.updateFilter({value:t.filter.init.value,column:t})}else if("select"==t.filter.type){if(!has_1(t,"filter.init.value"))return;var n=[];"multi"==t.filter.mode?Array.isArray(t.filter.init.value)?n=t.filter.init.value:console.log("Initial value for 'multi' mode should be an array"):"single"==t.filter.mode&&(Number.isInteger(t.filter.init.value)&&t.filter.init.value>-1?n=[t.filter.init.value]:console.log("Initial value for 'single' mode should be a single number and greater than -1"));var r=t.filter.options.filter(function(e,t){return includes_1(n,t)}).map(function(e){return e.value});e.updateMultiSelectFilter({selected_options:r,column:t})}})},isSortCaseSensitive:function(e){return null==e.sortCaseSensitive||e.sortCaseSensitive},updateSortQuery:function(e){var t=findIndex_1(this.query.sort,{vbt_col_id:e.vbt_col_id});-1==t?(this.multi_column_sort||(this.query.sort=[]),this.query.sort.push({vbt_col_id:e.vbt_col_id,name:e.name,order:"asc",caseSensitive:this.isSortCaseSensitive(e)})):this.query.sort[t].order="asc"==this.query.sort[t].order?"desc":"asc"},isShiftSelection:function(e,t){return 1==e&&null!=this.lastSelectedItemIndex&&this.lastSelectedItemIndex!=t},handleAddRow:function(e){var t=this,n=this.vbt_rows[e.rowIndex];this.isShiftSelection(e.shiftKey,e.rowIndex)?this.getShiftSelectionRows(e.rowIndex).forEach(function(e){t.addSelectedItem(e)}):this.addSelectedItem(n);this.$emit("on-select-row",{selected_items:cloneDeep_1(this.selected_items),selected_item:n});0==(this.server_mode&&!this.hasUniqueId?differenceWith_1(this.vbt_rows,this.selected_items,isEqual_1):differenceBy_1(this.vbt_rows,this.selected_items,this.uniqueId)).length?this.allRowsSelected=!0:this.allRowsSelected=!1,this.lastSelectedItemIndex=e.rowIndex},getActionButtonClass:function(e){return has_1(e,"class")?e.class:" btn-secondary"},handleRemoveRow:function(e){var t=this,n=this.vbt_rows[e.rowIndex];this.isShiftSelection(e.shiftKey,e.rowIndex)?this.getShiftSelectionRows(e.rowIndex).forEach(function(e){t.removeSelectedItem(e)}):this.removeSelectedItem(n);this.$emit("on-unselect-row",{selected_items:cloneDeep_1(this.selected_items),unselected_item:n}),this.allRowsSelected=!1,this.lastSelectedItemIndex=e.rowIndex},addSelectedItem:function(e){var t=this;-1==(this.server_mode&&!this.hasUniqueId?findIndex_1(this.selected_items,function(t){return isEqual_1(t,e)}):findIndex_1(this.selected_items,function(n){return n[t.uniqueId]==e[t.uniqueId]}))&&this.selected_items.push(e)},selectAllItems:function(){var e,t=[];t=this.server_mode&&!this.hasUniqueId?differenceWith_1(this.vbt_rows,this.selected_items,isEqual_1):differenceBy_1(this.vbt_rows,this.selected_items,this.uniqueId),(e=this.selected_items).push.apply(e,t),this.$emit("on-all-select-rows",{selected_items:cloneDeep_1(this.selected_items)})},unSelectAllItems:function(){var e=[];if(this.server_mode&&!this.hasUniqueId){var t=intersectionWith_1(this.vbt_rows,this.selected_items,isEqual_1);e=differenceWith_1(this.selected_items,t,isEqual_1)}else{var n=intersectionBy_1(this.vbt_rows,this.selected_items,this.uniqueId);e=differenceBy_1(this.selected_items,n,this.uniqueId)}this.selected_items=e,this.$emit("on-all-unselect-rows",{selected_items:cloneDeep_1(this.selected_items)})},removeSelectedItem:function(e){var t=this;this.selected_items.some(function(n,r){if(isEqual_1(e,n))return t.selected_items.splice(r,1),!0})},getShiftSelectionRows:function(e){var t=0,n=0;return this.lastSelectedItemIndex<e?(t=this.lastSelectedItemIndex,n=e+1):this.lastSelectedItemIndex>e&&(t=e,n=this.lastSelectedItemIndex+1),this.vbt_rows.slice(t,n)},updateFilter:function(e){var t="number"==typeof e.value?e.value.toString():e.value,n=e.column,r=findIndex_1(this.query.filters,{name:n.name});-1==r?""!==t&&this.query.filters.push({type:n.filter.type,name:n.name,text:t.trim(),config:n.filter}):""===t?this.query.filters.splice(r,1):this.query.filters[r].text=t.trim()},updateMultiSelectFilter:function(e){var t=e.selected_options,n=e.column,r=findIndex_1(this.query.filters,{name:n.name});if(-1==r){if(0===t.length)return;this.query.filters.push({type:n.filter.type,mode:n.filter.mode,name:n.name,selected_options:t,config:n.filter})}else 0===t.length?this.query.filters.splice(r,1):this.query.filters[r].selected_options=t},sort:function(){if(0!=this.query.sort.length){var e=this.query.sort.map(function(e){return e.order});this.temp_filtered_results=orderBy_1(this.temp_filtered_results,this.query.sort.map(function(e){return function(t){var n=get_1(t,e.name);return e.caseSensitive?null!=n?n:"":null!=n?n.toString().toLowerCase():""}}),e)}this.paginateFilter()},filter:function(e,t){var n=this;void 0===e&&(e=!0),void 0===t&&(t=!1);var r=filter_1(this.original_rows,function(e){var t=!0;return n.query.filters.some(function(r,i){if("simple"===r.type){if(!n.simpleFilter(get_1(e,r.name),r.text,r.config))return t=!1,!0;t=!0}else if("select"===r.type){if(!n.multiSelectFilter(get_1(e,r.name),r.selected_options,r.config))return t=!1,!0;t=!0}else if("custom"===r.type){var a=findIndex_1(n.vbt_columns,{name:r.name});if(a>-1){var s=n.vbt_columns[a];if(s.filter.validator){var o=s.filter.validator(get_1(e,r.name),r.text);if(1!=o&&null!=o)return t=!1,!0;t=!0}else t=!0}else t=!0}}),t});if(this.temp_filtered_results=r,""!==this.query.global_search&&0!=this.rowCount&&(this.temp_filtered_results=this.globalSearch(this.temp_filtered_results)),this.sort(),e||0==this.rowCount)this.page=1;else if(!t){var i=Math.ceil(this.rowCount/this.per_page);this.page=this.page<=i?this.page:i}},globalSearch:function(e){var t=this;return filter_1(e,function(e){var n=!1;return t.vbt_columns.some(function(r,i){var a=get_1(e,r.name),s=t.query.global_search;null!=a&&void 0!==a||(a=""),"string"!=typeof a&&(a=a.toString()),"string"!=typeof s&&(s=s.toString()),t.global_search.case_sensitive||(a=a.toLowerCase(),s=s.toLowerCase()),a.indexOf(s)>-1&&(n=!0)}),n})},simpleFilter:function(e,t,n){return null!=e&&void 0!==e||(e=""),"string"!=typeof e&&(e=e.toString()),"string"!=typeof t&&(e=t.toString()),!!has_1(n,"case_sensitive")&&n.case_sensitive||(e=e.toLowerCase(),t=t.toLowerCase()),e.indexOf(t)>-1},multiSelectFilter:function(e,t,n){return null!=e&&void 0!==e||(e=""),e="string"!=typeof e?e.toString().toLowerCase():e.toLowerCase(),t=map_1(t,function(e){return"string"!=typeof e?e.toString().toLowerCase():e.toLowerCase()}),includes_1(t,e)},paginateFilter:function(){if(this.pagination){var e=(this.page-1)*this.per_page,t=e+this.per_page;this.vbt_rows=this.temp_filtered_results.slice(e,t)}else this.vbt_rows=cloneDeep_1(this.temp_filtered_results)},selectAllCheckbox:function(){this.allRowsSelected||this.currentPageSelectionCount>0?(this.unSelectAllItems(),this.allRowsSelected=!1):(this.selectAllItems(),this.allRowsSelected=!0)},isSortableColumn:function(e){return!!has_1(e,"sort")&&e.sort},getValueFromRow:function(e,t){return get_1(e,t)},getCellSlotName:function(e){return has_1(e,"slot_name")?e.slot_name:e.name.replace(/\./g,"_")},resetSort:function(){this.query.sort=[],this.filter(!this.preservePageOnDataChange)},updateGlobalSearchHandler:function(e){this.query.global_search=e},clearGlobalSearch:function(){this.query.global_search="",this.$refs.global_search.value=""},resetQuery:function(){this.query={sort:[],filters:[],global_search:""},this.global_search.visibility&&(this.$refs.global_search.value=""),EventBus.$emit("reset-query")},emitQueryParams:function(e){if(void 0===e&&(e=null),this.server_mode&&this.canEmitQueries){var t=cloneDeep_1(this.query),n=map_1(t.sort,function(e){return omit_1(e,"vbt_col_id")}),r=map_1(t.filters,function(e){return omit_1(e,"config")}),i=t.global_search,a=clone_1(this.per_page);null==e&&(this.preservePageOnDataChange?e=this.page:(this.page=1,e=1));var s={sort:n,filters:r,global_search:i,per_page:a,page:e};this.$emit("on-change-query",s)}},columnClasses:function(e){var t="";return has_1(e,"column_text_alignment")&&includes_1(["text-justify","text-right","text-left","text-center"],e.column_text_alignment)?t=t+" "+e.column_text_alignment:t+=" text-center",has_1(e,"column_classes")&&(t=t+" "+e.column_classes),this.isSortableColumn(e)&&(t+=" vbt-sort-cursor"),t},handleShiftKey:function(){["keyup","keydown"].forEach(function(e){window.addEventListener(e,function(e){document.onselectstart=function(){return!("Shift"==e.key&&1==e.shiftKey)}})})},emitActionEvent:function(e){var t={event_payload:cloneDeep_1(e.event_payload)};this.isSelectable&&(t.selectedItems=cloneDeep_1(this.selected_items)),this.$emit(e.event_name,t)},canShowColumn:function(e){return!(null!=e.visibility&&!e.visibility)}},computed:{rowCount:function(){return this.server_mode?this.totalRows:this.temp_filtered_results.length},selectedItemsCount:function(){return this.selected_items.length},filteredResultsCount:function(){return this.temp_filtered_results.length},uniqueId:function(){var e="";return this.hasUniqueId?(this.vbt_columns.some(function(t,n){if(has_1(t,"uniqueId")&&!0===t.uniqueId)return e=t.name,!0}),e):e="vbt_id"},hasUniqueId:function(){var e=!1;return this.vbt_columns.some(function(t,n){if(has_1(t,"uniqueId")&&!0===t.uniqueId)return e=!0,!0}),e},currentPageRowsLength:function(){return this.vbt_rows.length},filteredRowsLength:function(){return this.rowCount},originalRowsLength:function(){return this.server_mode?this.rowCount:this.rows.length},rowHighlightColor:function(){return this.highlight_row_hover?this.highlight_row_hover_color:""},headerColSpan:function(){var e=this,t=this.checkbox_rows?1:0;return t+=this.vbt_columns.filter(function(t){return e.canShowColumn(t)}).length},showToolsRow:function(){return 1==this.global_search.visibility||1==this.show_refresh_button||1==this.show_reset_button||this.actions.length>0},showFilterRow:function(){var e=!1;return this.columns.some(function(t,n){if(has_1(t,"filter"))return e=!0,!0}),e},showPaginationRow:function(){var e=!1;return 0!=this.card_mode||1!=this.pagination&&1!=this.pagination_info&&1!=this.selected_rows_info||(e=!0),e},currentPageSelectionCount:function(){return(this.server_mode&&!this.hasUniqueId?intersectionWith_1(this.vbt_rows,this.selected_items,isEqual_1):intersectionBy_1(this.vbt_rows,this.selected_items,this.uniqueId)).length},tableClasses:function(){var e=this,t="";return"string"==typeof this.classes.table?this.classes.table:("object"==typeof this.classes.table&&Object.entries(this.classes.table).forEach(function(n){var r=n[0],i=n[1];if("boolean"==typeof i&&i)t+=r;else if("function"==typeof i){var a=i(e.rows);"boolean"==typeof a&&a&&(t+=" ",t+=r)}}),t)},tableWrapperClasses:function(){return(this.classes.tableWrapper||""==this.classes.tableWrapper)&&"string"==typeof this.classes.tableWrapper?this.classes.tableWrapper:"table-responsive"},isSelectable:function(){return this.checkbox_rows||this.rows_selectable},updateGlobalSearch:function(){return debounce_1(this.updateGlobalSearchHandler,this.global_search.searchDebounceRate)}},watch:{"query.filters":{handler:function(e,t){this.server_mode||this.filter(!this.preservePageOnDataChange)},deep:!0},"query.sort":{handler:function(e,t){this.server_mode||this.sort()},deep:!0},"query.global_search":{handler:function(e,t){this.server_mode||this.filter(!this.preservePageOnDataChange)}},query:{handler:function(e,t){this.server_mode&&this.emitQueryParams()},deep:!0},per_page:{handler:function(e,t){if(this.server_mode)this.emitQueryParams();else{var n=1==this.page;this.preservePageOnDataChange||(this.page=1),n&&this.paginateFilter()}}},pagination:{handler:function(e,t){this.server_mode?this.emitQueryParams():this.paginateFilter()}},rows:{handler:function(e,t){if(this.vbt_rows=cloneDeep_1(this.rows),this.server_mode){if(this.preservePageOnDataChange){var n=Math.ceil(this.rowCount/this.per_page);this.page=0!=n?this.page<=n?this.page:n:1}}else{var r=this;this.original_rows=map_1(this.vbt_rows,function(e,t){var n={};return r.hasUniqueId||(n.vbt_id=t+1),extend({},e,n)}),this.filter(!this.preservePageOnDataChange,!this.isFirstTime)}this.isFirstTime=!1},deep:!0},customFilters:{handler:function(e,t){var n=this;this.server_mode||e.forEach(function(e){if(e.name){var t=n.query.filters.findIndex(function(t){return t.name===e.name});-1==t?n.query.filters.push(e):n.query.filters[t].text=e.text}})},deep:!0},columns:{handler:function(e,t){this.vbt_columns=cloneDeep_1(this.columns),this.vbt_columns=map_1(this.vbt_columns,function(e,t){var n={};return n.vbt_col_id=t+1,extend({},e,n)}),this.initFilterQueries()},deep:!0},config:{handler:function(e,t){this.initConfig()},deep:!0},vbt_rows:{handler:function(e,t){if(this.lastSelectedItemIndex=null,0!=this.selected_items.length){0==(this.server_mode&&!this.hasUniqueId?differenceWith_1(e,this.selected_items,isEqual_1):differenceBy_1(e,this.selected_items,this.uniqueId)).length?this.allRowsSelected=!0:this.allRowsSelected=!1}else this.allRowsSelected=!1},deep:!0},page:function(e,t){this.server_mode?this.emitQueryParams(e):this.paginateFilter()},"config.multi_column_sort":{handler:function(e,t){this.resetSort()}}}},__vue_script__$9=script$9,__vue_render__$9=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{card:e.card_mode}},[e.card_mode?n("div",{staticClass:"card-header"},[e._t("card-header",[[e._v("\n                "+e._s(e.card_title)+"\n            ")]])],2):e._e(),e._v(" "),n("div",{class:{"card-body":e.card_mode}},[n("div",{staticClass:"vbt-table-wrapper",class:e.tableWrapperClasses},[e.showLoader?n("div",{staticClass:"vbt-table-overlay"},[e._t("loader-overlay",[e._m(0),e._v(" "),n("span",{staticClass:"vbt-table-loader-text"},[e._v(e._s(e.loaderText))])])],2):e._e(),e._v(" "),n("table",{staticClass:"table",class:e.tableClasses},[n("thead",[e.showToolsRow?n("tr",{staticClass:"vbt-table-tools"},[n("th",{attrs:{colspan:e.headerColSpan}},[n("div",{staticClass:"row vbt-header-row no-gutters"},[n("div",{staticClass:"col-md-4"},[n("div",{staticClass:"row no-gutters"},[e.global_search.visibility?n("div",{staticClass:"col-md-6 input-group vbt-global-search"},[n("div",{staticClass:"form-group has-clear-right",class:e.global_search.class},[e.global_search.showClearButton?n("span",{staticClass:"form-control-feedback vbt-global-search-clear",on:{click:e.clearGlobalSearch}},[e._t("global-search-clear-icon",[e._v("\n                                                        ⓧ\n                                                    ")])],2):e._e(),e._v(" "),e.global_search.searchOnPressEnter?n("input",{ref:"global_search",staticClass:"form-control",attrs:{type:"text",placeholder:e.global_search.placeholder},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.updateGlobalSearchHandler(t.target.value)}}}):n("input",{ref:"global_search",staticClass:"form-control",attrs:{type:"text",placeholder:e.global_search.placeholder},on:{keyup:function(t){t.stopPropagation(),e.updateGlobalSearch(t.target.value)}}})])]):e._e(),e._v(" "),n("div",{staticClass:"col-md-6"},[n("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Table Actions buttons"}},[e.show_refresh_button?n("button",{staticClass:"btn btn-secondary vbt-refresh-button",attrs:{type:"button"},on:{click:function(t){e.$emit("refresh-data")}}},[e._t("refresh-button-text",[e._v("\n                                                        Refresh\n                                                    ")])],2):e._e(),e._v(" "),e.show_reset_button?n("button",{staticClass:"btn btn-secondary vbt-reset-button",attrs:{type:"button"},on:{click:e.resetQuery}},[e._t("reset-button-text",[e._v("\n                                                        Reset Query\n                                                    ")])],2):e._e()])])])]),e._v(" "),n("div",{staticClass:"col-md-8"},[e._t("vbt-action-buttons",[n("div",{staticClass:"btn-group float-right",attrs:{role:"group","aria-label":"Basic example"}},e._l(e.actions,function(t,r,i){return n("button",{key:i,staticClass:"btn",class:e.getActionButtonClass(t),attrs:{type:"button"},on:{click:function(n){e.emitActionEvent(t)}}},[e._t(t.btn_text_slot_name,[n("span",{domProps:{innerHTML:e._s(t.btn_text)}})])],2)}),0)])],2)])])]):e._e(),e._v(" "),n("tr",[e.checkbox_rows?n("select-all-rows-check-box",{attrs:{"all-rows-selected":e.allRowsSelected,"current-page-selection-count":e.currentPageSelectionCount},on:{"select-all-row-checkbox":e.selectAllCheckbox}}):e._e(),e._v(" "),e._t("columns",[e._l(e.vbt_columns,function(t,r,i){return[e.canShowColumn(t)?n("th",e._g({key:i,staticClass:"vbt-column-header",class:e.columnClasses(t)},e.isSortableColumn(t)?{click:function(){return e.updateSortQuery(t)}}:{}),[e._t("column_"+e.getCellSlotName(t),[e._v("\n                                        "+e._s(t.label)+"\n                                    ")],{column:t}),e._v(" "),e.isSortableColumn(t)?[n("SortIcon",{attrs:{sort:e.query.sort,column:t}},[n("template",{slot:"vbt-sort-asc-icon"},[e._t("sort-asc-icon",[e._v("\n                                                            🠥\n                                                    ")])],2),e._v(" "),n("template",{slot:"vbt-sort-desc-icon"},[e._t("sort-desc-icon",[e._v("\n                                                            🠧\n                                                    ")])],2),e._v(" "),n("template",{slot:"vbt-no-sort-icon"},[e._t("no-sort-icon",[e._v("\n                                                            🠥🠧\n                                                    ")])],2)],2)]:e._e()],2):e._e()]})],{columns:e.vbt_columns})],2)]),e._v(" "),n("tbody",[e.showFilterRow?n("tr",{staticClass:"table-active"},[n("td",{directives:[{name:"show",rawName:"v-show",value:e.checkbox_rows,expression:"checkbox_rows"}]}),e._v(" "),e._l(e.vbt_columns,function(t,r,i){return[e.canShowColumn(t)?n("td",{key:i,attrs:{align:"center"}},[e.hasFilter(t)?["simple"==t.filter.type?n("Simple",{attrs:{column:t},on:{"update-filter":e.updateFilter,"clear-filter":e.clearFilter}},[n("template",{slot:"vbt-simple-filter-clear-icon"},[e._t("simple-filter-clear-icon",[e._v("\n                                                ⓧ\n                                            ")])],2)],2):e._e(),e._v(" "),"select"==t.filter.type?n("MultiSelect",{attrs:{options:t.filter.options,column:t},on:{"update-multi-select-filter":e.updateMultiSelectFilter,"clear-filter":e.clearFilter}}):e._e(),e._v(" "),"custom"==t.filter.type?[e._t(t.filter.slot_name,null,{column:t})]:e._e()]:e._e()],2):e._e()]})],2):e._e(),e._v(" "),e._l(e.vbt_rows,function(t,r){return n("row",{key:r,attrs:{row:t,columns:e.vbt_columns,"row-index":r,"checkbox-rows":e.checkbox_rows,"rows-selectable":e.rows_selectable,"selected-items":e.selected_items,"highlight-row-hover":e.highlight_row_hover,"highlight-row-hover-color":e.rowHighlightColor,"prop-row-classes":e.classes.row,"prop-cell-classes":e.classes.cell,"unique-id":e.uniqueId},on:{"add-row":e.handleAddRow,"remove-row":e.handleRemoveRow}},[e._l(e.columns,function(r){return n("template",{slot:"vbt-"+e.getCellSlotName(r)},[e._t(e.getCellSlotName(r),[e._v("\n                                    "+e._s(e.getValueFromRow(t,r.name))+"\n                            ")],{row:t,column:r,cell_value:e.getValueFromRow(t,r.name)})],2)})],2)}),e._v(" "),n("tr",{directives:[{name:"show",rawName:"v-show",value:0==e.vbt_rows,expression:"vbt_rows == 0"}]},[n("td",{attrs:{colspan:e.headerColSpan}},[e._t("empty-results",[e._v("\n                                No results found\n                            ")])],2)]),e._v(" "),e.showPaginationRow?n("tr",{staticClass:"footer-pagination-row"},[n("td",{attrs:{colspan:e.headerColSpan}},[n("div",{staticClass:"row vbt-pagination-row no-gutters"},[n("div",{staticClass:"col-md-8"},[e.pagination?n("div",[n("Pagination",{attrs:{page:e.page,per_page:e.per_page,per_page_options:e.per_page_options,total:e.rowCount,num_of_visibile_pagination_buttons:e.num_of_visibile_pagination_buttons},on:{"update:page":function(t){e.page=t},"update:per_page":function(t){e.per_page=t}}},[n("template",{slot:"vbt-paginataion-previous-button"},[e._t("paginataion-previous-button",[e._v("\n                                                    «\n                                                ")])],2),e._v(" "),n("template",{slot:"vbt-paginataion-next-button"},[e._t("paginataion-next-button",[e._v("\n                                                    »\n                                                ")])],2)],2)],1):e._e()]),e._v(" "),n("div",{staticClass:"col-md-4"},[n("div",{staticClass:"text-right justify-content-center"},[e.pagination_info?[e._t("pagination-info",[0!=e.currentPageRowsLength?[e._v("\n                                                    From 1 to "+e._s(e.currentPageRowsLength)+" of "+e._s(e.filteredRowsLength)+" entries\n                                                ")]:[e._v("\n                                                    No results found\n                                                ")],e._v(" "),[e._v("\n                                                    ("+e._s(e.originalRowsLength)+" total records)\n                                                ")]],{currentPageRowsLength:e.currentPageRowsLength,filteredRowsLength:e.filteredRowsLength,originalRowsLength:e.originalRowsLength})]:e._e(),e._v(" "),e.selected_rows_info&&e.pagination_info&&e.isSelectable?[e._t("pagination-selected-rows-separator",[e._v("\n                                                |\n                                            ")])]:e._e(),e._v(" "),e.selected_rows_info&&e.isSelectable?[e._t("selected-rows-info",[e._v("\n                                                "+e._s(e.selectedItemsCount)+" rows selected\n                                            ")],{selectedItemsCount:e.selectedItemsCount})]:e._e()],2)])])])]):e._e()],2)])])]),e._v(" "),e.card_mode?n("div",{staticClass:"card-footer"},[e._t("card-footer",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[e.pagination?n("div",[n("Pagination",{attrs:{page:e.page,per_page:e.per_page,per_page_options:e.per_page_options,total:e.rowCount,num_of_visibile_pagination_buttons:e.num_of_visibile_pagination_buttons},on:{"update:page":function(t){e.page=t},"update:per_page":function(t){e.per_page=t}}},[n("template",{slot:"vbt-paginataion-previous-button"},[e._t("paginataion-previous-button",[e._v("\n                                    «\n                                ")])],2),e._v(" "),n("template",{slot:"vbt-paginataion-next-button"},[e._t("paginataion-next-button",[e._v("\n                                    »\n                                ")])],2)],2)],1):e._e()]),e._v(" "),n("div",{staticClass:"col-md-6"},[n("div",{staticClass:"text-right justify-content-center"},[e.pagination_info?[e._t("pagination-info",[0!=e.currentPageRowsLength?[e._v("\n                                    From 1 to "+e._s(e.currentPageRowsLength)+" of "+e._s(e.filteredRowsLength)+" entries\n                                ")]:[e._v("\n                                    No results found\n                                ")],e._v(" "),[e._v("\n                                    ("+e._s(e.originalRowsLength)+" total records)\n                                ")]],{currentPageRowsLength:e.currentPageRowsLength,filteredRowsLength:e.filteredRowsLength,originalRowsLength:e.originalRowsLength})]:e._e(),e._v(" "),e.pagination_info&&e.selected_rows_info?[e._t("pagination-selected-rows-separator",[e._v("\n                                |\n                            ")])]:e._e(),e._v(" "),e.selected_rows_info?[e._t("selected-rows-info",[e._v("\n                                "+e._s(e.selectedItemsCount)+" rows selected\n                            ")],{selectedItemsCount:e.selectedItemsCount})]:e._e()],2)])])])],2):e._e()])},__vue_staticRenderFns__$9=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"lds-ripple"},[t("div"),t("div")])}];__vue_render__$9._withStripped=!0;var __vue_inject_styles__$9=function(e){e&&e("data-v-46173776_0",{source:'\n.vbt-table-wrapper[data-v-46173776] {\n    position: relative;\n}\n\n/*\nLoader styles copied from here: https://loading.io/css/\n*/\n.lds-ripple[data-v-46173776] {\n    display: inline-block;\n    position: relative;\n    width: 64px;\n    height: 64px;\n}\n.lds-ripple div[data-v-46173776] {\n    position: absolute;\n    border: 4px solid #000000;\n    opacity: 1;\n    border-radius: 50%;\n    animation: lds-ripple-data-v-46173776 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n.lds-ripple div[data-v-46173776]:nth-child(2) {\n    animation-delay: -0.5s;\n}\n@keyframes lds-ripple-data-v-46173776 {\n0% {\n        top: 28px;\n        left: 28px;\n        width: 0;\n        height: 0;\n        opacity: 1;\n}\n100% {\n        top: -1px;\n        left: -1px;\n        width: 58px;\n        height: 58px;\n        opacity: 0;\n}\n}\n.vbt-table-overlay[data-v-46173776] {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    background: #ffffff;\n    position: absolute;\n    opacity: 0.7;\n    z-index: 7777;\n}\n.vbt-table-loader-wrapper[data-v-46173776] {\n    height: 100%;\n    width: 100%;\n    justify-content: center;\n}\n.vbt-table-loader-wrapper .progress[data-v-46173776]{\n    margin-left: 40%;\n    margin-right: 40%;\n}\n.vbt-select-all-checkbox[data-v-46173776] {\n    margin-bottom: 20px;\n}\n.vbt-sort-cursor[data-v-46173776] {\n    cursor: pointer;\n}\n.custom-control-label[data-v-46173776] {\n    vertical-align: top;\n}\n.vbt-column-header[data-v-46173776] {\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n}\n.vbt-global-search-clear[data-v-46173776] {\n    cursor: pointer;\n}\ninput[type="search"][data-v-46173776] {\n-webkit-appearance: searchfield;\n}\ninput[type="search"][data-v-46173776]::-webkit-search-cancel-button {\n-webkit-appearance: searchfield-cancel-button;\n}\n\n/* Bootstrap 4 text input with clear icon on the right */\n.has-clear-right[data-v-46173776] {\n    position: relative;\n}\n.has-clear-right .form-control[data-v-46173776] {\n    padding-right: 2.375rem;\n}\n.has-clear-right .form-control-feedback[data-v-46173776] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 2;\n    display: block;\n    width: 2.375rem;\n    height: 2.375rem;\n    line-height: 2.375rem;\n    text-align: center;\n    font-weight: normal;\n}\n.has-clear-right .form-control-feedback[data-v-46173776]:hover {\n    color: red;\n}\n',map:{version:3,sources:["/home/ruby/repos/vue-bootstrap4-table/src/components/VueBootstrap4Table.vue"],names:[],mappings:";AAk7CA;IACA,mBAAA;CACA;;AAEA;;EAEA;AAEA;IACA,sBAAA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,mBAAA;IACA,0BAAA;IACA,WAAA;IACA,mBAAA;IACA,+EAAA;CACA;AACA;IACA,uBAAA;CACA;AACA;AACA;QACA,UAAA;QACA,WAAA;QACA,SAAA;QACA,UAAA;QACA,WAAA;CACA;AACA;QACA,UAAA;QACA,WAAA;QACA,YAAA;QACA,aAAA;QACA,WAAA;CACA;CACA;AAEA;IACA,cAAA;IACA,uBAAA;IACA,wBAAA;IACA,oBAAA;IACA,YAAA;IACA,aAAA;IACA,oBAAA;IACA,mBAAA;IACA,aAAA;IACA,cAAA;CACA;AAEA;IACA,aAAA;IACA,YAAA;IACA,wBAAA;CACA;AAEA;IACA,iBAAA;IACA,kBAAA;CACA;AAEA;IACA,oBAAA;CACA;AAEA;IACA,gBAAA;CACA;AACA;IACA,oBAAA;CACA;AACA;IACA,0BAAA,EAAA,6BAAA;IACA,uBAAA,KAAA,iBAAA;IACA,sBAAA,MAAA,YAAA;IACA,kBAAA,UAAA,mBAAA;CACA;AACA;IACA,gBAAA;CACA;AACA;AACA,gCAAA;CACA;AAEA;AACA,8CAAA;CACA;;AAEA,yDAAA;AAEA;IACA,mBAAA;CACA;AAEA;IACA,wBAAA;CACA;AAEA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;IACA,WAAA;IACA,eAAA;IACA,gBAAA;IACA,iBAAA;IACA,sBAAA;IACA,mBAAA;IACA,oBAAA;CACA;AAEA;IACA,WAAA;CACA",file:"VueBootstrap4Table.vue",sourcesContent:['<template>\n    \x3c!-- TODO configurable header title position --\x3e\n    <div :class="{card:card_mode}">\n        <div class="card-header" v-if="card_mode">\n            <slot name="card-header">\n                <template>\n                    {{card_title}}\n                </template>\n            </slot>\n        </div>\n        <div :class="{\'card-body\':card_mode}">\n            <div :class=\'tableWrapperClasses\' class="vbt-table-wrapper">\n                <div v-if="showLoader" class="vbt-table-overlay">\n                    <slot name="loader-overlay">\n                        <div class="lds-ripple"><div></div><div></div></div>\n                        <span class="vbt-table-loader-text">{{loaderText}}</span>\n                    </slot>\n                </div>\n                <table class="table" :class="tableClasses">\n                    <thead>\n                        <tr v-if="showToolsRow" class="vbt-table-tools">\n                            <th :colspan="headerColSpan">\n                                <div class="row vbt-header-row no-gutters">\n                                    <div class="col-md-4">\n                                        <div class="row no-gutters">\n                                            \x3c!-- global search text starts here --\x3e\n                                            <div class="col-md-6 input-group vbt-global-search" v-if="global_search.visibility">\n                                                  <div class="form-group has-clear-right" :class="global_search.class">\n                                                    <span v-if="global_search.showClearButton" class="form-control-feedback vbt-global-search-clear" @click="clearGlobalSearch">\n                                                        <slot name="global-search-clear-icon">\n                                                            &#x24E7;\n                                                        </slot>\n                                                    </span>\n                                                    <input v-if="global_search.searchOnPressEnter" ref="global_search" type="text" class="form-control" :placeholder="global_search.placeholder" @keyup.enter="updateGlobalSearchHandler($event.target.value)">\n                                                    <input v-else ref="global_search" type="text" class="form-control" :placeholder="global_search.placeholder" @keyup.stop="updateGlobalSearch($event.target.value)">\n                                                </div>\n                                            </div>\n                                            \x3c!-- global search text ends here --\x3e\n\n                                            \x3c!-- refresh & reset button starts here --\x3e\n                                            <div class="col-md-6">\n                                                <div class="btn-group" role="group" aria-label="Table Actions buttons">\n                                                    <button v-if="show_refresh_button" type="button" class="btn btn-secondary vbt-refresh-button" @click="$emit(\'refresh-data\')">\n                                                        <slot name="refresh-button-text">\n                                                            Refresh\n                                                        </slot>\n                                                    </button>\n                                                    <button type="button" v-if="show_reset_button" class="btn btn-secondary vbt-reset-button" @click="resetQuery">\n                                                        <slot name="reset-button-text">\n                                                            Reset Query\n                                                        </slot>\n                                                    </button>\n                                                </div>\n                                            </div>\n                                            \x3c!-- refresh & reset button ends here --\x3e\n                                        </div>\n                                    </div>\n\n                                    \x3c!-- action buttons starts here --\x3e\n                                    <div class="col-md-8">\n                                        <slot name="vbt-action-buttons">\n                                            <div class="btn-group float-right" role="group" aria-label="Basic example">\n                                                <button v-for="(action, key, index) in actions"\n                                                        :key="index" type="button" class="btn"\n                                                        :class="getActionButtonClass(action)"\n                                                        @click="emitActionEvent(action)">\n                                                        <slot :name="action.btn_text_slot_name">\n                                                            <span v-html="action.btn_text"></span>\n                                                        </slot>\n                                                </button>\n                                            </div>\n                                        </slot>\n                                    </div>\n                                    \x3c!-- action buttons button ends here --\x3e\n\n                                </div>\n                                \x3c!-- <a href="" v-if="allRowsSelected">sadfsdf</a> --\x3e\n                            </th>\n                        </tr>\n\n                        <tr>\n                            <select-all-rows-check-box v-if="checkbox_rows"\n                                                        :all-rows-selected="allRowsSelected"\n                                                        :current-page-selection-count="currentPageSelectionCount"\n                                                        @select-all-row-checkbox="selectAllCheckbox"/>\n\n                            <slot name="columns" :columns="vbt_columns">\n                                <template v-for="(column, key, index) in vbt_columns">\n                                    <th v-if="canShowColumn(column)" :key="index" v-on="isSortableColumn(column) ? { click: () => updateSortQuery(column) } : {}" class="vbt-column-header" :class="columnClasses(column)">\n                                        <slot :name="\'column_\' + getCellSlotName(column)" :column="column">\n                                            {{column.label}}\n                                        </slot>\n\n                                        <template v-if=\'isSortableColumn(column)\'>\n                                            <SortIcon :sort="query.sort" :column="column">\n                                                    <template slot="vbt-sort-asc-icon">\n                                                        <slot name="sort-asc-icon">\n                                                                &#x1F825;\n                                                        </slot>\n                                                    </template>\n                                                    <template slot="vbt-sort-desc-icon">\n                                                        <slot name="sort-desc-icon">\n                                                                &#x1F827;\n                                                        </slot>\n                                                    </template>\n                                                    <template slot="vbt-no-sort-icon">\n                                                        <slot name="no-sort-icon">\n                                                                &#x1F825;&#x1F827;\n                                                        </slot>\n                                                    </template>\n                                            </SortIcon>\n                                        </template>\n                                    </th>\n                                </template>\n                            </slot>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        \x3c!-- filter row starts here --\x3e\n                        <tr class="table-active" v-if="showFilterRow">\n                            <td v-show="checkbox_rows"></td>\n                            <template v-for="(column, key, index) in vbt_columns">\n                                <td v-if="canShowColumn(column)" :key="index" align="center">\n                                    <template v-if="hasFilter(column)">\n                                        <Simple v-if="column.filter.type == \'simple\'" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter">\n                                            <template slot="vbt-simple-filter-clear-icon">\n                                                <slot name="simple-filter-clear-icon">\n                                                    &#x24E7;\n                                                </slot>\n                                            </template>\n                                        </Simple>\n                                        <MultiSelect v-if="column.filter.type == \'select\'" :options="column.filter.options" :column="column" @update-multi-select-filter="updateMultiSelectFilter" @clear-filter="clearFilter"></MultiSelect>\n                                        <template v-if="column.filter.type == \'custom\'">\n                                            <slot :name="column.filter.slot_name" :column="column">\n\n                                            </slot>\n                                        </template>\n                                    </template>\n                                </td>\n                            </template>\n                        </tr>\n                        \x3c!-- filter row ends here --\x3e\n\n                        \x3c!-- data rows stars here --\x3e\n                        <row v-for="(row, index) in vbt_rows" :key="index"\n                                                                :row="row"\n                                                                :columns="vbt_columns"\n                                                                :row-index="index"\n                                                                :checkbox-rows="checkbox_rows"\n                                                                :rows-selectable="rows_selectable"\n                                                                :selected-items="selected_items"\n                                                                :highlight-row-hover="highlight_row_hover"\n                                                                :highlight-row-hover-color="rowHighlightColor"\n                                                                :prop-row-classes="classes.row"\n                                                                :prop-cell-classes="classes.cell"\n                                                                :unique-id="uniqueId"\n                                                                @add-row="handleAddRow"\n                                                                @remove-row="handleRemoveRow">\n                            <template v-for="(column) in columns" :slot="\'vbt-\'+getCellSlotName(column)">\n                                <slot :name="getCellSlotName(column)" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">\n                                        {{getValueFromRow(row,column.name)}}\n                                </slot>\n                            </template>\n                        </row>\n                        \x3c!-- empty row starts here --\x3e\n                        <tr v-show="vbt_rows == 0">\n                            <td :colspan="headerColSpan">\n                                <slot name="empty-results">\n                                    No results found\n                                </slot>\n                            </td>\n                        </tr>\n                        \x3c!-- empty row ends here --\x3e\n\n                        \x3c!-- data rows ends here --\x3e\n\n                        \x3c!-- Pagination row starts here --\x3e\n                        <tr v-if="showPaginationRow" class="footer-pagination-row">\n                            <td :colspan="headerColSpan">\n                                <div class="row vbt-pagination-row no-gutters">\n                                    \x3c!-- pagination starts here --\x3e\n                                    <div class="col-md-8">\n                                        <div v-if="pagination">\n                                            <Pagination :page.sync="page" :per_page.sync="per_page" :per_page_options="per_page_options" :total="rowCount" :num_of_visibile_pagination_buttons="num_of_visibile_pagination_buttons">\n                                                <template slot="vbt-paginataion-previous-button">\n                                                    <slot name="paginataion-previous-button">\n                                                        &laquo;\n                                                    </slot>\n                                                </template>\n                                                <template slot="vbt-paginataion-next-button">\n                                                    <slot name="paginataion-next-button">\n                                                        &raquo;\n                                                    </slot>\n                                                </template>\n                                            </Pagination>\n                                        </div>\n                                    </div>\n                                    \x3c!-- pagination ends here --\x3e\n\n                                    \x3c!-- pagination info start here --\x3e\n                                    <div class="col-md-4">\n                                        <div class="text-right justify-content-center">\n                                            <template v-if="pagination_info">\n                                                <slot name="pagination-info" :currentPageRowsLength="currentPageRowsLength" :filteredRowsLength="filteredRowsLength" :originalRowsLength="originalRowsLength">\n                                                    <template v-if="currentPageRowsLength != 0">\n                                                        From 1 to {{currentPageRowsLength}} of {{filteredRowsLength}} entries\n                                                    </template>\n                                                    <template v-else>\n                                                        No results found\n                                                    </template>\n                                                    <template>\n                                                        ({{originalRowsLength}} total records)\n                                                    </template>\n                                                </slot>\n                                            </template>\n                                            <template v-if="selected_rows_info && pagination_info && isSelectable">\n                                                <slot name="pagination-selected-rows-separator">\n                                                    |\n                                                </slot>\n                                            </template>\n                                            <template v-if="selected_rows_info && isSelectable">\n                                                <slot name="selected-rows-info" :selectedItemsCount="selectedItemsCount">\n                                                    {{selectedItemsCount}} rows selected\n                                                </slot>\n                                            </template>\n                                        </div>\n                                    </div>\n                                    \x3c!-- pagination info ends here --\x3e\n                                </div>\n                            </td>\n                        </tr>\n                        \x3c!-- Pagination ends starts here --\x3e\n\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div class="card-footer" v-if="card_mode">\n            <slot name="card-footer">\n                <div class="row">\n                    \x3c!-- pagination starts here --\x3e\n                    <div class="col-md-6">\n                        <div v-if="pagination">\n                            <Pagination :page.sync="page" :per_page.sync="per_page" :per_page_options="per_page_options" :total="rowCount" :num_of_visibile_pagination_buttons="num_of_visibile_pagination_buttons">\n                                <template slot="vbt-paginataion-previous-button">\n                                    <slot name="paginataion-previous-button">\n                                        &laquo;\n                                    </slot>\n                                </template>\n                                <template slot="vbt-paginataion-next-button">\n                                    <slot name="paginataion-next-button">\n                                        &raquo;\n                                    </slot>\n                                </template>\n                            </Pagination>\n                        </div>\n                    </div>\n                    \x3c!-- pagination ends here --\x3e\n\n                    \x3c!-- pagination info start here --\x3e\n                    <div class="col-md-6">\n                        <div class="text-right justify-content-center">\n                            <template v-if="pagination_info">\n                                <slot name="pagination-info" :currentPageRowsLength="currentPageRowsLength" :filteredRowsLength="filteredRowsLength" :originalRowsLength="originalRowsLength">\n                                    <template v-if="currentPageRowsLength != 0">\n                                        From 1 to {{currentPageRowsLength}} of {{filteredRowsLength}} entries\n                                    </template>\n                                    <template v-else>\n                                        No results found\n                                    </template>\n                                    <template>\n                                        ({{originalRowsLength}} total records)\n                                    </template>\n                                </slot>\n                            </template>\n                            <template v-if="pagination_info && selected_rows_info">\n                                <slot name="pagination-selected-rows-separator">\n                                    |\n                                </slot>\n                            </template>\n                            <template v-if="selected_rows_info">\n                                <slot name="selected-rows-info" :selectedItemsCount="selectedItemsCount">\n                                    {{selectedItemsCount}} rows selected\n                                </slot>\n                            </template>\n                        </div>\n                    </div>\n                    \x3c!-- pagination info ends here --\x3e\n                </div>\n            </slot>\n        </div>\n    </div>\n</template>\n\n<script>\nimport findIndex from "lodash/findIndex";\nimport range from "lodash/range";\nimport filter from "lodash/filter";\nimport includes from "lodash/includes";\nimport map from "lodash/map";\nimport join from "lodash/join";\nimport has from "lodash/has";\nimport extend from "lodash/extend";\nimport isEmpty from "lodash/isEmpty";\nimport isEqual from "lodash/isEqual";\nimport debounce from "lodash/debounce";\nimport cloneDeep from "lodash/cloneDeep";\nimport differenceWith from "lodash/differenceWith";\nimport differenceBy from "lodash/differenceBy";\nimport intersectionWith from "lodash/intersectionWith";\nimport intersectionBy from "lodash/intersectionBy";\nimport orderBy from "lodash/orderBy";\nimport get from "lodash/get";\nimport omit from "lodash/omit";\nimport clone from "lodash/clone";\n\nimport Row from "./Row.vue";\nimport CheckBox from "./CheckBox.vue";\nimport SelectAllRowsCheckBox from "./SelectAllRowsCheckBox.vue";\nimport SortIcon from "./SortIcon.vue";\nimport Pagination from "./Pagination.vue";\nimport Simple from "./Filters/Simple.vue";\nimport MultiSelect from "./Filters/MultiSelect.vue";\n\nimport {\n    EventBus\n} from \'../event-bus.js\';\n\nexport default {\n    name: "VueBootstrap4Table",\n    props: {\n        rows: {\n            type: Array,\n            required: true\n        },\n        columns: {\n            type: Array,\n            required: true\n        },\n        totalRows: {\n            type: Number,\n            default: 0\n        },\n        showLoader: {\n            type: Boolean,\n            default: false\n        },\n        config: {\n            type: Object,\n            default: function () {\n                return {};\n            }\n        },\n        classes: {\n            type: Object,\n            default: function () {\n                return {};\n            }\n        },\n        actions: {\n            type: Array,\n            default: function () {\n                return [];\n            }\n        },\n        customFilters: {\n            type: Array,\n            default: function () {\n                return [];\n            }\n        },\n    },\n    data: function () {\n        return {\n            vbt_rows: [],\n            vbt_columns: [],\n            query: {\n                sort: [],\n                filters: [],\n                global_search: ""\n            },\n            page: 1,\n            per_page: 10,\n            original_rows: [],\n            num_of_visibile_pagination_buttons: 5,\n            temp_filtered_results: [],\n            pagination: true,\n            pagination_info: true,\n            checkbox_rows: false,\n            selected_items: [],\n            highlight_row_hover: true,\n            highlight_row_hover_color: "#d6d6d6",\n            rows_selectable: false,\n            allRowsSelected: false,\n            multi_column_sort:false,\n            loaderText: "Loading...",\n            card_title: "",\n            global_search: {\n                placeholder: "Enter search text",\n                class: "",\n                visibility: true,\n                case_sensitive: false,\n                showClearButton: true,\n                searchOnPressEnter: false,\n                searchDebounceRate: 60,\n                init: {\n                    value: ""\n                }\n            },\n            per_page_options : [5,10,15],\n            show_refresh_button: true,\n            show_reset_button: true,\n            server_mode: false,\n            total_rows: 0,\n            card_mode: true,\n            selected_rows_info: false,\n            lastSelectedItemIndex: null,\n            isFirstTime: true,\n            isResponsive: true,\n            preservePageOnDataChange: false,\n            canEmitQueries : false,\n        };\n    },\n    mounted() {\n        this.vbt_rows = cloneDeep(this.rows);\n        this.vbt_columns = cloneDeep(this.columns);\n        let self = this;\n        // check if user mentioned unique id for a column, if not set unique id for all items\n        this.original_rows = map(this.vbt_rows, function (element, index) {\n            let extra = {};\n            if (!self.hasUniqueId) {\n                extra.vbt_id = index + 1;\n            }\n            return extend({}, element, extra);\n        });\n\n        this.vbt_columns = map(this.vbt_columns, function (element, index) {\n            let extra = {};\n            extra.vbt_col_id = index + 1;\n            return extend({}, element, extra);\n        });\n\n        this.initConfig();\n        this.initialSort();\n        this.initFilterQueries();\n\n        if (this.global_search.visibility) {\n            this.$nextTick(() => {\n                this.initGlobalSearch()\n            });\n        };\n\n        this.$nextTick(() => {\n            if (!this.server_mode) {\n                this.filter(false,true);\n            } else {\n                this.canEmitQueries = true;\n                this.emitQueryParams();\n            }\n        });\n\n        this.handleShiftKey();\n\n    },\n    components: {\n        Row,\n        CheckBox,\n        SelectAllRowsCheckBox,\n        Simple,\n        MultiSelect,\n        SortIcon,\n        Pagination,\n    },\n    methods: {\n        initConfig() {\n\n            if (isEmpty(this.config)) {\n                return;\n            }\n\n            this.pagination = (has(this.config, \'pagination\')) ? this.config.pagination : true;\n\n            this.num_of_visibile_pagination_buttons = (has(this.config, \'num_of_visibile_pagination_buttons\')) ? this.config.num_of_visibile_pagination_buttons : 7;\n\n            this.per_page_options = (has(this.config, \'per_page_options\')) ? this.config.per_page_options : [5,10,15];\n\n            this.per_page = (has(this.config, \'per_page\')) ? this.config.per_page : 10;\n\n            this.page = (has(this.config, \'page\')) ? this.config.page : 1;\n\n            this.checkbox_rows = (has(this.config, \'checkbox_rows\')) ? this.config.checkbox_rows : false;\n\n            this.highlight_row_hover = (has(this.config, \'highlight_row_hover\')) ? this.config.highlight_row_hover : true;\n\n            this.highlight_row_hover_color =  (has(this.config, \'highlight_row_hover_color\')) ? this.config.highlight_row_hover_color : "#d6d6d6";\n\n            this.rows_selectable = (has(this.config, \'rows_selectable\')) ? this.config.rows_selectable : false;\n\n            this.multi_column_sort = (has(this.config, \'multi_column_sort\')) ? (this.config.multi_column_sort) : false;\n\n            this.pagination_info = (has(this.config, \'pagination_info\')) ? this.config.pagination_info : true;\n\n            this.card_title = (has(this.config, \'card_title\')) ? this.config.card_title : "";\n\n            if (has(this.config, \'global_search\')) {\n                this.global_search.placeholder = (has(this.config.global_search, \'placeholder\')) ? this.config.global_search.placeholder : "Enter search text";\n                this.global_search.visibility = (has(this.config.global_search, \'visibility\')) ? this.config.global_search.visibility : true;\n                this.global_search.case_sensitive = (has(this.config.global_search, \'case_sensitive\')) ? this.config.global_search.case_sensitive : false;\n                this.global_search.showClearButton = (has(this.config.global_search, \'showClearButton\')) ? this.config.global_search.showClearButton : true;\n                this.global_search.searchOnPressEnter = (has(this.config.global_search, \'searchOnPressEnter\')) ? this.config.global_search.searchOnPressEnter : false;\n                this.global_search.searchDebounceRate = (has(this.config.global_search, \'searchDebounceRate\')) ? this.config.global_search.searchDebounceRate : 60;\n                this.global_search.class = (has(this.config.global_search, \'class\')) ? this.config.global_search.class : "";\n                this.global_search.init.value = (has(this.config.global_search, \'init.value\')) ? this.config.global_search.init.value: "";\n            }\n\n            this.show_refresh_button = (has(this.config, \'show_refresh_button\')) ? (this.config.show_refresh_button) : true;\n\n            this.show_reset_button = (has(this.config, \'show_reset_button\')) ? (this.config.show_reset_button) : true;\n\n            this.server_mode = (has(this.config, \'server_mode\')) ? (this.config.server_mode) : false;\n\n            this.card_mode = (has(this.config, \'card_mode\')) ? (this.config.card_mode) : true;\n\n            this.selected_rows_info = (has(this.config, \'card_mode\')) ? (this.config.selected_rows_info) : false;\n\n            this.preservePageOnDataChange = (has(this.config, \'preservePageOnDataChange\')) ? (this.config.preservePageOnDataChange) : false;\n\n            this.loaderText = (has(this.config, \'loaderText\')) ? (this.config.loaderText) : this.loaderText;\n\n        },\n\n        initialSort() {\n            // TODO optimze this with removing this filter\n            let initial_sort_columns =  filter(this.vbt_columns, column => (has(column,\'initial_sort\') && column.initial_sort == true));\n\n            initial_sort_columns.some(initial_sort_column => {\n\n                let result = findIndex(this.query.sort, { \'vbt_col_id\': initial_sort_column.vbt_col_id });\n\n                if(result == -1) {\n                    // initial sort order validation starts here\n                    let initial_sort_order = "asc";\n                    if (has(initial_sort_column,"initial_sort_order")) {\n                        if (includes(["asc","desc"], initial_sort_column.initial_sort_order)) {\n                            initial_sort_order = initial_sort_column.initial_sort_order;\n                        } else {\n                            console.log("invalid initial_sort_order, so setting it to default");\n                        }\n                    }\n                    // initial sort order validation ends here\n                    this.query.sort.push({\n                        vbt_col_id: initial_sort_column.vbt_col_id,\n                        name: initial_sort_column.name,\n                        order: initial_sort_order,\n                        caseSensitive: this.isSortCaseSensitive(initial_sort_column)\n                    });\n\n                }\n                // else {\n                //     this.query.sort[result].order = initial_sort_column.initial_sort_order;\n                // }\n\n                // if multicolum sort sort is false, then consider only first initial sort column\n                if (!this.multi_column_sort) {\n                    return true;\n                }\n            });\n        },\n\n        initGlobalSearch() {\n            this.$refs.global_search.value = this.global_search.init.value;\n            this.query.global_search = this.global_search.init.value;\n        },\n\n        hasFilter(column) {\n            return has(column, "filter.type");\n        },\n\n        clearFilter(column) {\n            let filter_index = this.getFilterIndex(column);\n            if (filter_index !== -1) {\n                this.query.filters.splice(filter_index, 1);\n            }\n        },\n\n        getFilterIndex(column) {\n            return findIndex(this.query.filters, {\n                name: column.name\n            });\n        },\n\n        initFilterQueries() {\n            this.vbt_columns.forEach(vbt_column => {\n\n\n                if (!has(vbt_column,\'filter\')) return;\n\n                if (vbt_column.filter.type == "simple") {\n                    if (!has(vbt_column,\'filter.init.value\')) return;\n\n                    this.updateFilter({\n                        "value" : vbt_column.filter.init.value,\n                        "column" : vbt_column\n                    });\n                } else if (vbt_column.filter.type == "select") {\n\n                    if (!has(vbt_column,\'filter.init.value\')) return;\n\n                    let initialValues = [];\n                    if (vbt_column.filter.mode == "multi") {\n                        if (Array.isArray(vbt_column.filter.init.value)) {\n                            initialValues = vbt_column.filter.init.value;\n                        } else {\n                            console.log("Initial value for \'multi\' mode should be an array");\n                        }\n                    } else if (vbt_column.filter.mode == "single") {\n                        if (Number.isInteger(vbt_column.filter.init.value) && vbt_column.filter.init.value > -1) {\n                            initialValues = [vbt_column.filter.init.value];\n                        } else {\n                            console.log("Initial value for \'single\' mode should be a single number and greater than -1");\n                        }\n                    }\n\n                    let selected_options = vbt_column.filter.options.filter((_,index) => includes(initialValues, index)).map(filtered_option => filtered_option.value);\n\n                    this.updateMultiSelectFilter({\n                        "selected_options" : selected_options,\n                        "column" : vbt_column\n                    });\n                }\n            });\n        },\n\n        isSortCaseSensitive(column) {\n            return (column.sortCaseSensitive != undefined) ? column.sortCaseSensitive : true;\n        },\n\n        updateSortQuery(column) {\n\n            let result = findIndex(this.query.sort, { \'vbt_col_id\': column.vbt_col_id });\n\n            if(result == -1) {\n\n                if (!this.multi_column_sort) {\n                    this.query.sort = [];\n                }\n                this.query.sort.push({\n                    vbt_col_id: column.vbt_col_id,\n                    name: column.name,\n                    order: "asc",\n                    caseSensitive: this.isSortCaseSensitive(column)\n                });\n\n            } else {\n                this.query.sort[result].order = this.query.sort[result].order == "asc" ? "desc" : "asc";\n            }\n        },\n        isShiftSelection(shiftKey,rowIndex){\n            return (shiftKey == true) && (this.lastSelectedItemIndex != null) && (this.lastSelectedItemIndex != rowIndex);\n        },\n        handleAddRow(payload) {\n            let row = this.vbt_rows[payload.rowIndex];\n            if (this.isShiftSelection(payload.shiftKey,payload.rowIndex)) {\n                let rows = this.getShiftSelectionRows(payload.rowIndex);\n                rows.forEach((_row) => {this.addSelectedItem(_row)});\n            } else {\n                this.addSelectedItem(row);\n            }\n\n            this.$emit(\'on-select-row\', {"selected_items":cloneDeep(this.selected_items) ,"selected_item":row});\n\n            let difference = [];\n\n            if (this.server_mode && !this.hasUniqueId) {\n                difference = differenceWith(this.vbt_rows, this.selected_items, isEqual);\n            } else {\n                difference = differenceBy(this.vbt_rows, this.selected_items, this.uniqueId);\n            }\n\n            if (difference.length == 0) {\n                this.allRowsSelected = true;\n                // EventBus.$emit(\'select-select-all-items-checkbox\', "from main");\n            } else {\n                this.allRowsSelected = false;\n                // EventBus.$emit(\'unselect-select-all-items-checkbox\', "from main");\n            }\n\n            this.lastSelectedItemIndex = payload.rowIndex;\n        },\n\n        getActionButtonClass(action){\n            return has(action,\'class\') ? action.class : " btn-secondary";\n        },\n\n        handleRemoveRow(payload) {\n            let row = this.vbt_rows[payload.rowIndex];\n            if (this.isShiftSelection(payload.shiftKey,payload.rowIndex)) {\n                let rows = this.getShiftSelectionRows(payload.rowIndex);\n                rows.forEach((_row) => {this.removeSelectedItem(_row)});\n            } else {\n                this.removeSelectedItem(row);\n            }\n            this.$emit(\'on-unselect-row\', {"selected_items":cloneDeep(this.selected_items),"unselected_item":row});\n            // EventBus.$emit(\'unselect-select-all-items-checkbox\');\n            this.allRowsSelected = false;\n            this.lastSelectedItemIndex = payload.rowIndex;\n        },\n        addSelectedItem(item) {\n\n            let index = -1;\n            if (this.server_mode && !this.hasUniqueId) {\n                index = findIndex(this.selected_items, (selected_item) => {return isEqual(selected_item, item)});\n            } else {\n                index = findIndex(this.selected_items, (selected_item) => {return selected_item[this.uniqueId] == item[this.uniqueId]});\n            }\n\n            if (index == -1) {\n                this.selected_items.push(item);\n            }\n        },\n        selectAllItems() {\n\n            let difference = [];\n\n            if (this.server_mode && !this.hasUniqueId) {\n                difference = differenceWith(this.vbt_rows, this.selected_items, isEqual);\n            } else {\n                difference = differenceBy(this.vbt_rows, this.selected_items, this.uniqueId);\n            }\n\n            this.selected_items.push(...difference);\n\n            this.$emit(\'on-all-select-rows\', {"selected_items":cloneDeep(this.selected_items) });\n\n        },\n        unSelectAllItems() {\n\n            let difference = [];\n\n            if (this.server_mode && !this.hasUniqueId) {\n                let result = intersectionWith(this.vbt_rows, this.selected_items, isEqual);\n                difference = differenceWith(this.selected_items, result, isEqual);\n            } else {\n                let result = intersectionBy(this.vbt_rows, this.selected_items, this.uniqueId);\n                difference = differenceBy(this.selected_items, result, this.uniqueId);\n            }\n\n            this.selected_items = difference;\n\n            this.$emit(\'on-all-unselect-rows\', {"selected_items":cloneDeep(this.selected_items)});\n\n        },\n        removeSelectedItem(item) {\n            // TODO try with findbyId function\n            this.selected_items.some((selected_item,index) => {\n                if (isEqual(item, selected_item)) {\n                    this.selected_items.splice(index, 1);\n                    return true;\n                }\n            });\n        },\n        getShiftSelectionRows(rowIndex) {\n            let start = 0;\n            let end = 0;\n            if (this.lastSelectedItemIndex < rowIndex) {\n                start = this.lastSelectedItemIndex;\n                end = rowIndex + 1;\n            } else if (this.lastSelectedItemIndex > rowIndex) {\n                start = rowIndex;\n                end = this.lastSelectedItemIndex + 1;\n            }\n            return this.vbt_rows.slice(start,end);\n        },\n        updateFilter(payload) {\n            let value = (typeof payload.value == "number") ? payload.value.toString() : payload.value;\n            let column = payload.column;\n            let filter_index = findIndex(this.query.filters, {\n                name: column.name\n            });\n            if (filter_index == -1) {\n                if (value !== "") {\n                    this.query.filters.push({\n                        type: column.filter.type,\n                        name: column.name,\n                        text: value.trim(),\n                        config: column.filter\n                    });\n                }\n            } else {\n                if (value === "") {\n                    this.query.filters.splice(filter_index, 1);\n                } else {\n                    this.query.filters[filter_index].text = value.trim();\n                }\n            }\n        },\n        updateMultiSelectFilter(payload) {\n\n            let selected_options = payload.selected_options;\n            let column = payload.column;\n\n\n            let filter_index = findIndex(this.query.filters, {\n                name: column.name\n            });\n\n            if (filter_index == -1) {\n                if (selected_options.length === 0) {\n                    return;\n                }\n                this.query.filters.push({\n                    type: column.filter.type,\n                    mode: column.filter.mode,\n                    name: column.name,\n                    selected_options: selected_options,\n                    config: column.filter\n                });\n            } else {\n                if (selected_options.length === 0) {\n                    this.query.filters.splice(filter_index, 1);\n                } else {\n                    this.query.filters[filter_index].selected_options = selected_options;\n                }\n            }\n        },\n\n        sort() {\n\n            if(this.query.sort.length != 0) {\n                let orders = this.query.sort.map(sortConfig => sortConfig.order);\n\n                this.temp_filtered_results = orderBy(this.temp_filtered_results,\n                    this.query.sort.map(sortConfig => {\n                        return row => {\n                            let value = get(row,sortConfig.name);\n                            if (sortConfig.caseSensitive) return value != null ? value : \'\';\n                            return value != null ? value.toString().toLowerCase() : \'\';\n                        }\n                    }),\n                    orders\n                );\n            };\n\n            this.paginateFilter();\n        },\n\n        filter(resetPage = true, isInit = false) {\n            let res = filter(this.original_rows, (row) => {\n                let flag = true;\n                this.query.filters.some((filter, key) => {\n                    if (filter.type === "simple") {\n                        if (this.simpleFilter(get(row, filter.name), filter.text,filter.config)) {\n                            // continue to next filter\n                            flag = true;\n                        } else {\n                            // stop here and break loop since one filter has failed\n                            flag = false;\n                            return true;\n                        }\n                    } else if (filter.type === "select") {\n                        if (this.multiSelectFilter(get(row, filter.name), filter.selected_options,filter.config)) {\n                            flag = true;\n                        } else {\n                            flag = false;\n                            return true;\n                        }\n                    } else if (filter.type === "custom") {\n                        let index = findIndex(this.vbt_columns,{name:filter.name});\n                        if (index > -1) {\n                            let column = this.vbt_columns[index];\n                            if (column.filter.validator) {\n                                let result = column.filter.validator(get(row, filter.name),filter.text);\n                                if (result == true || result == undefined) {\n                                    flag = true;\n                                } else {\n                                    flag = false;\n                                    return true;\n                                }\n                            } else {\n                                flag = true;\n                            }\n                        } else {\n                            flag = true;\n                        }\n                    }\n                });\n                return flag;\n            });\n\n            this.temp_filtered_results = res;\n\n            // Do global search only if global search text is not empty and\n            // filtered results is also not empty\n            if (this.query.global_search !== "" && this.rowCount != 0 ) {\n                this.temp_filtered_results = this.globalSearch(this.temp_filtered_results);\n            }\n\n            this.sort();\n            if (resetPage || this.rowCount == 0) {\n                this.page = 1;\n            } else if (!isInit) {\n                let newTotalPage = Math.ceil(this.rowCount/this.per_page);\n                this.page = (this.page <= newTotalPage) ? this.page : newTotalPage;\n            }\n        },\n\n        globalSearch(temp_filtered_results) {\n            let global_search_results = filter(temp_filtered_results, (row) =>{\n\n                let flag = false;\n\n                this.vbt_columns.some((vbt_column, key) => {\n                    let value = get(row, vbt_column.name);\n                    let global_search_text = this.query.global_search;\n\n                    if (value == null || typeof value === "undefined") {\n                        value =  "";\n                    }\n\n                    if (typeof value !== "string") {\n                        value = value.toString();\n                    }\n\n                    if (typeof global_search_text !== "string") {\n                        global_search_text = global_search_text.toString();\n                    }\n\n                    if (!this.global_search.case_sensitive) {\n                        value = value.toLowerCase();\n                        global_search_text = global_search_text.toLowerCase();\n                    }\n\n                    if (value.indexOf(global_search_text) > -1) {\n                        flag = true;\n                        return;\n                    }\n\n                });\n\n                return flag;\n            });\n\n            return global_search_results;\n        },\n\n        simpleFilter(value, filter_text,config) {\n\n            if (value == null || typeof value === "undefined") {\n                value =  "";\n            }\n\n            if (typeof value !== "string") {\n                value = value.toString();\n            }\n\n            if (typeof filter_text !== "string") {\n                value = filter_text.toString();\n            }\n\n            let is_case_sensitive = (has(config,\'case_sensitive\')) ? config.case_sensitive : false;\n\n            if (!is_case_sensitive) {\n                value = value.toLowerCase();\n                filter_text = filter_text.toLowerCase();\n            }\n\n            return value.indexOf(filter_text) > -1;\n        },\n        multiSelectFilter(value, selected_options,config) {\n\n            if (value == null || typeof value === "undefined") {\n                value =  "";\n            }\n\n            if (typeof value !== "string") {\n                value = value.toString().toLowerCase();\n            } else {\n                value = value.toLowerCase();\n            }\n\n            selected_options = map(selected_options, (option) => {\n                                    return (typeof option !== "string") ? option.toString().toLowerCase() : option.toLowerCase();\n                                });\n            return includes(selected_options, value);\n            // let is_case_sensitive = (has(config,\'case_sensitive\')) ? config.case_sensitive : false;\n\n            // if (!is_case_sensitive) {\n            //     value = value.toLowerCase();\n            //     filter_text = filter_text.toLowerCase();\n            // }\n\n            // return value.indexOf(filter_text) > -1;\n        },\n\n        paginateFilter() {\n            if (this.pagination) {\n                let start = (this.page - 1) * this.per_page;\n                let end = start + this.per_page;\n                this.vbt_rows = this.temp_filtered_results.slice(start, end);\n            } else {\n                this.vbt_rows = cloneDeep(this.temp_filtered_results);\n            }\n        },\n\n        selectAllCheckbox() {\n            if (this.allRowsSelected || this.currentPageSelectionCount > 0) {\n                this.unSelectAllItems();\n                this.allRowsSelected = false;\n            } else {\n                this.selectAllItems();\n                this.allRowsSelected = true;\n            }\n        },\n\n        isSortableColumn(column) {\n            if (!has(column,\'sort\')) {\n                return false;\n            } else {\n                return column.sort;\n            }\n        },\n        // row method starts here\n        getValueFromRow(row, name) {\n            return get(row, name);\n        },\n        getCellSlotName(column) {\n            if (has(column,"slot_name")) {\n                return column.slot_name;\n            }\n            return column.name.replace(/\\./g,\'_\');\n        },\n        // row method ends here\n        resetSort() {\n            this.query.sort = [];\n            this.filter(!this.preservePageOnDataChange);\n        },\n\n        updateGlobalSearchHandler: function(value) {\n            this.query.global_search = value;\n        },\n\n        clearGlobalSearch() {\n            this.query.global_search = "";\n            this.$refs.global_search.value = "";\n        },\n\n        resetQuery() {\n\n            this.query = {\n                sort: [],\n                filters: [],\n                global_search: ""\n            }\n\n            this.global_search.visibility && (this.$refs.global_search.value = "");\n\n            EventBus.$emit(\'reset-query\');\n\n        },\n\n        emitQueryParams(page = null) {\n            if (this.server_mode && this.canEmitQueries) {\n                let queryParams = cloneDeep(this.query);\n                let sort = map(queryParams.sort, o => omit(o, \'vbt_col_id\'));\n                let filters = map(queryParams.filters, o => omit(o, \'config\'));\n                let global_search = queryParams.global_search;\n                let per_page = clone(this.per_page);\n\n                if (page == null) {\n                    if (this.preservePageOnDataChange) {\n                        page = this.page;\n                    } else {\n                        this.page = 1;\n                        page = 1;\n                    }\n                }\n\n                let payload = {\n                    sort : sort,\n                    filters : filters,\n                    global_search : global_search,\n                    per_page : per_page,\n                    page: page\n                }\n\n                this.$emit(\'on-change-query\',payload);\n            }\n        },\n        columnClasses(column) {\n            let classes = "";\n\n            let default_text_alignment = "text-center";\n\n            //decide text alignment class - starts here\n            let alignments = ["text-justify","text-right","text-left","text-center"];\n            if (has(column, "column_text_alignment") && includes(alignments, column.column_text_alignment)) {\n                classes = classes + " " + column.column_text_alignment;\n            } else {\n                classes = classes + " " + default_text_alignment;\n            }\n            //decide text alignment class - ends here\n\n            // adding user defined classes to rows - starts here\n            if (has(column, "column_classes")) {\n                classes = classes + " " + column.column_classes;\n            }\n            // adding user defined classes to rows - ends here\n\n            // adding classes for sortable column - starts here\n            if (this.isSortableColumn(column)) {\n                classes = classes + " vbt-sort-cursor";\n            }\n            // adding classes for sortable column - ends here\n\n            return classes;\n        },\n\n        handleShiftKey() {\n            ["keyup","keydown"].forEach((event) => {\n                window.addEventListener(event, (e) => {\n                    document.onselectstart = function() {\n                        return !(e.key == "Shift" && e.shiftKey == true);\n                    }\n                });\n            });\n        },\n        emitActionEvent(action) {\n            let payload = {\n                event_payload : cloneDeep(action.event_payload)\n            }\n\n            if (this.isSelectable) {\n                payload.selectedItems = cloneDeep(this.selected_items);\n            }\n\n            this.$emit(action.event_name,payload);\n        },\n        canShowColumn(column) {\n            return (column.visibility == undefined || column.visibility) ? true : false;\n        }\n    },\n    computed: {\n        rowCount() {\n            if (!this.server_mode) {\n                return this.temp_filtered_results.length;\n            } else {\n                return this.totalRows;\n            }\n        },\n        selectedItemsCount() {\n            return this.selected_items.length;\n        },\n        filteredResultsCount() {\n            return this.temp_filtered_results.length;\n        },\n        uniqueId() {\n            let unique_id = "";\n\n            if (!this.hasUniqueId) {\n                unique_id = "vbt_id";\n                return unique_id;\n            }\n            this.vbt_columns.some((column, key) => {\n                if (has(column, \'uniqueId\') && column.uniqueId === true) {\n                    unique_id = column.name;\n                    return true;\n                }\n            });\n\n            return unique_id;\n        },\n        hasUniqueId() {\n            let has_unique_id = false;\n\n            this.vbt_columns.some((column, key) => {\n                if (has(column, \'uniqueId\') && column.uniqueId === true) {\n                    has_unique_id = true;\n                    return true;\n                }\n            });\n\n            return has_unique_id;\n        },\n\n        // pagination info computed properties - start\n\n        currentPageRowsLength() {\n            return this.vbt_rows.length;\n        },\n\n        filteredRowsLength() {\n            return this.rowCount;\n        },\n\n        originalRowsLength() {\n            return (this.server_mode)? this.rowCount : this.rows.length;\n        },\n\n        // pagination info computed properties - end\n        rowHighlightColor() {\n            return (this.highlight_row_hover) ? this.highlight_row_hover_color : "";\n        },\n\n        headerColSpan() {\n            let count = (this.checkbox_rows) ? 1 : 0;\n\n            count += this.vbt_columns.filter(column => this.canShowColumn(column)).length;\n\n            return count;\n        },\n\n        showToolsRow() {\n            return (this.global_search.visibility == true || this.show_refresh_button == true || this.show_reset_button == true || this.actions.length > 0);\n        },\n\n        showFilterRow() {\n            let show_row = false;\n\n            this.columns.some((column,key) => {\n                if (has(column, "filter")) {\n                    show_row = true;\n                    return true;\n                }\n            })\n            return show_row;\n        },\n\n        showPaginationRow() {\n            let show_pagination_row = false;\n\n            if (this.card_mode == false && (this.pagination == true || this.pagination_info == true || this.selected_rows_info == true)) {\n                show_pagination_row = true;\n            }\n\n            return show_pagination_row;\n        },\n\n        currentPageSelectionCount() {\n            let result = [];\n            if (this.server_mode && !this.hasUniqueId) {\n                result = intersectionWith(this.vbt_rows, this.selected_items, isEqual);\n            } else {\n                result = intersectionBy(this.vbt_rows, this.selected_items, this.uniqueId);\n            }\n            return result.length;\n        },\n        tableClasses() {\n            let classes = "";\n            if (typeof this.classes.table == "string") {\n                return this.classes.table;\n            } else if (typeof this.classes.table == "object") {\n                Object.entries(this.classes.table).forEach(([key, value]) => {\n                    if (typeof value == "boolean" && value) {\n                        classes += key;\n                    } else if (typeof value == "function") {\n                        let truth = value(this.rows);\n                        if (typeof truth == "boolean" && truth) {\n                            classes += " ";\n                            classes += key;\n                        }\n                    }\n                });\n            }\n            return classes;\n        },\n        tableWrapperClasses() {\n            let classes = "";\n            let defaultClasses = "table-responsive";\n\n            if (!this.classes.tableWrapper && this.classes.tableWrapper != "") {\n                return defaultClasses;\n            }\n\n            return (typeof this.classes.tableWrapper == "string") ? this.classes.tableWrapper : defaultClasses;\n        },\n\n        isSelectable() {\n            return (this.checkbox_rows || this.rows_selectable);\n        },\n\n        updateGlobalSearch() {\n            return debounce(this.updateGlobalSearchHandler, this.global_search.searchDebounceRate);\n        }\n    },\n    watch: {\n        "query.filters": {\n            handler: function (after, before) {\n                if (!this.server_mode) {\n                    this.filter(!this.preservePageOnDataChange);\n                }\n            },\n            deep: true\n        },\n        "query.sort": {\n            handler: function (after, before) {\n                if (!this.server_mode) {\n                    this.sort();\n                }\n            },\n            deep: true\n        },\n        "query.global_search": {\n            handler: function (newVal, oldVal) {\n                if (!this.server_mode) {\n                    this.filter(!this.preservePageOnDataChange);\n                }\n            }\n        },\n        "query": {\n            handler: function (newVal, oldVal) {\n                if (this.server_mode) {\n                    this.emitQueryParams();\n                }\n            },\n            deep: true\n        },\n        per_page: {\n            handler: function (newVal, oldVal) {\n                if (!this.server_mode) {\n                    let doPaginateFilter = (this.page == 1);\n                    if (!this.preservePageOnDataChange) this.page = 1;\n                    if (doPaginateFilter) {\n                        this.paginateFilter();\n                    }\n                } else {\n                    this.emitQueryParams();\n                }\n            }\n        },\n        pagination: {\n            handler: function (newVal, oldVal) {\n                if (!this.server_mode) {\n                    this.paginateFilter();\n                } else {\n                    this.emitQueryParams();\n                }\n            }\n        },\n        rows: {\n            handler: function (newVal, oldVal) {\n\n                this.vbt_rows = cloneDeep(this.rows);\n\n                if (!this.server_mode) {\n                    // check if user mentioned unique id for a column, if not set unique id for all items\n                    let self = this;\n                    this.original_rows = map(this.vbt_rows, function (element, index) {\n                        let extra = {};\n                        if (!self.hasUniqueId) {\n                            extra.vbt_id = index + 1;\n                        }\n                        return extend({}, element, extra);\n                    });\n                    this.filter(!this.preservePageOnDataChange,!this.isFirstTime);\n                } else {\n                    if (this.preservePageOnDataChange) {\n                        let predictedTotalPage = Math.ceil(this.rowCount/this.per_page);\n                        if (predictedTotalPage != 0) {\n                            this.page = (this.page <= predictedTotalPage) ? this.page : predictedTotalPage;\n                        } else {\n                            this.page = 1;\n                        }\n                    }\n                }\n\n                this.isFirstTime = false;\n            },\n            deep: true\n        },\n        customFilters: {\n            handler: function (newVal, oldVal) {\n\n                if (!this.server_mode) {\n                    newVal.forEach(customFilter => {\n                        if (customFilter.name) {\n                            let index = this.query.filters.findIndex( filter => filter.name === customFilter.name );\n                            if (index == -1) {\n                                this.query.filters.push(customFilter);\n                            } else {\n                                this.query.filters[index].text = customFilter.text;\n                            }\n                        }\n                    });\n                }\n\n            },\n            deep: true\n        },\n        columns: {\n            handler: function (newVal, oldVal) {\n\n                this.vbt_columns = cloneDeep(this.columns);\n\n                this.vbt_columns = map(this.vbt_columns, function (element, index) {\n                    let extra = {};\n                    extra.vbt_col_id = index + 1;\n                    return extend({}, element, extra);\n                });\n\n                this.initFilterQueries();\n            },\n            deep: true\n        },\n        config: {\n            handler: function (newVal, oldVal) {\n                this.initConfig();\n            },\n            deep: true\n        },\n\n        vbt_rows: {\n            handler: function (newVal, oldVal) {\n                // resetting the shift mode\n                this.lastSelectedItemIndex = null;\n\n                if (this.selected_items.length == 0) {\n                    // EventBus.$emit(\'unselect-select-all-items-checkbox\');\n                    this.allRowsSelected = false;\n                    return;\n                }\n\n                let difference = [];\n\n                if (this.server_mode && !this.hasUniqueId) {\n                    difference = differenceWith(newVal, this.selected_items, isEqual);\n                } else {\n                    difference = differenceBy(newVal, this.selected_items, this.uniqueId);\n                }\n\n                if (difference.length == 0) {\n                    // EventBus.$emit(\'select-select-all-items-checkbox\');\n                    this.allRowsSelected = true;\n                } else {\n                    this.allRowsSelected = false;\n                    // EventBus.$emit(\'unselect-select-all-items-checkbox\');\n                }\n\n            },\n            deep: true\n        },\n\n        page(newVal, oldVal) {\n            if (!this.server_mode) {\n                this.paginateFilter();\n            } else {\n                this.emitQueryParams(newVal);\n            }\n        },\n        \'config.multi_column_sort\': {\n            handler : function(newVal,oldVal) {\n                this.resetSort();\n            }\n        }\n    }\n};\n<\/script>\n\n<style scoped>\n    .vbt-table-wrapper {\n        position: relative;\n    }\n\n    /*\n    Loader styles copied from here: https://loading.io/css/\n    */\n\n    .lds-ripple {\n        display: inline-block;\n        position: relative;\n        width: 64px;\n        height: 64px;\n    }\n    .lds-ripple div {\n        position: absolute;\n        border: 4px solid #000000;\n        opacity: 1;\n        border-radius: 50%;\n        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n    }\n    .lds-ripple div:nth-child(2) {\n        animation-delay: -0.5s;\n    }\n    @keyframes lds-ripple {\n        0% {\n            top: 28px;\n            left: 28px;\n            width: 0;\n            height: 0;\n            opacity: 1;\n        }\n        100% {\n            top: -1px;\n            left: -1px;\n            width: 58px;\n            height: 58px;\n            opacity: 0;\n        }\n    }\n\n    .vbt-table-overlay {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        background: #ffffff;\n        position: absolute;\n        opacity: 0.7;\n        z-index: 7777;\n    }\n\n    .vbt-table-loader-wrapper {\n        height: 100%;\n        width: 100%;\n        justify-content: center;\n    }\n\n    .vbt-table-loader-wrapper .progress{\n        margin-left: 40%;\n        margin-right: 40%;\n    }\n\n    .vbt-select-all-checkbox {\n        margin-bottom: 20px;\n    }\n\n    .vbt-sort-cursor {\n        cursor: pointer;\n    }\n    .custom-control-label {\n        vertical-align: top;\n    }\n    .vbt-column-header {\n        -webkit-user-select: none;  /* Chrome all / Safari all */\n        -moz-user-select: none;     /* Firefox all */\n        -ms-user-select: none;      /* IE 10+ */\n        user-select: none;          /* Likely future */\n    }\n    .vbt-global-search-clear {\n        cursor: pointer;\n    }\n    input[type="search"] {\n    -webkit-appearance: searchfield;\n    }\n\n    input[type="search"]::-webkit-search-cancel-button {\n    -webkit-appearance: searchfield-cancel-button;\n    }\n\n    /* Bootstrap 4 text input with clear icon on the right */\n\n    .has-clear-right {\n        position: relative;\n    }\n\n    .has-clear-right .form-control {\n        padding-right: 2.375rem;\n    }\n\n    .has-clear-right .form-control-feedback {\n        position: absolute;\n        top: 0;\n        right: 0;\n        z-index: 2;\n        display: block;\n        width: 2.375rem;\n        height: 2.375rem;\n        line-height: 2.375rem;\n        text-align: center;\n        font-weight: normal;\n    }\n\n    .has-clear-right .form-control-feedback:hover {\n        color: red;\n    }\n</style>\n\n\n// workflow - server\n// get data(payload)\n// clone to origin_rows\n// do filter\n// do global search\n// do sort\n// do paginate\n']},media:void 0})},__vue_scope_id__$9="data-v-46173776",__vue_module_identifier__$9=void 0,__vue_is_functional_template__$9=!1;function __vue_normalize__$9(e,t,n,r,i,a,s,o){var l,c=("function"==typeof n?n.options:n)||{};if(c.__file="/home/ruby/repos/vue-bootstrap4-table/src/components/VueBootstrap4Table.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r,t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var u=c.render;c.render=function(e,t){return l.call(t),u(e,t)}}else{var _=c.beforeCreate;c.beforeCreate=_?[].concat(_,l):[l]}return c}function __vue_create_injector__$5(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__$5.styles||(__vue_create_injector__$5.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,l=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var c=s.element=document.createElement("style");c.type="text/css",i.media&&c.setAttribute("media",i.media),n&&(c.setAttribute("data-group",a),c.setAttribute("data-next-index","0")),e.appendChild(c)}if(n&&(l=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",l+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),_=s.element.childNodes;_[l]&&s.element.removeChild(_[l]),_.length?s.element.insertBefore(u,_[l]):s.element.appendChild(u)}}}}}var component=__vue_normalize__$9({render:__vue_render__$9,staticRenderFns:__vue_staticRenderFns__$9},__vue_inject_styles__$9,__vue_script__$9,__vue_scope_id__$9,__vue_is_functional_template__$9,__vue_module_identifier__$9,__vue_create_injector__$5,void 0);function install(e){install.installed||(install.installed=!0,e.component("VueBootstrap4Table",component))}var plugin={install:install},GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:"undefined"!=typeof global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin);/* harmony default export */ __webpack_exports__["default"] = (component);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-js-toggle-button/dist/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue-js-toggle-button/dist/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(7),
  /* scopeId */
  "data-v-25adc6c0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var DEFAULT_COLOR_CHECKED = '#75c791';
var DEFAULT_COLOR_UNCHECKED = '#bfcbd9';
var DEFAULT_LABEL_CHECKED = 'on';
var DEFAULT_LABEL_UNCHECKED = 'off';
var DEFAULT_SWITCH_COLOR = '#fff';

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ToggleButton',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String
    },
    sync: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 300
    },
    color: {
      type: [String, Object],
      validator: function validator(value) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* isString */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(value, 'checked') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(value, 'unchecked') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(value, 'disabled');
      }
    },
    switchColor: {
      type: [String, Object],
      validator: function validator(value) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* isString */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(value, 'checked') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* has */])(value, 'unchecked');
      }
    },
    cssColors: {
      type: Boolean,
      default: false
    },
    labels: {
      type: [Boolean, Object],
      default: false,
      validator: function validator(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.checked || value.unchecked : typeof value === 'boolean';
      }
    },
    height: {
      type: Number,
      default: 22
    },
    width: {
      type: Number,
      default: 50
    },
    margin: {
      type: Number,
      default: 3
    },
    fontSize: {
      type: Number
    }
  },
  computed: {
    className: function className() {
      var toggled = this.toggled,
          disabled = this.disabled;


      return ['vue-js-switch', {
        toggled: toggled,
        disabled: disabled
      }];
    },
    coreStyle: function coreStyle() {
      return {
        width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.width),
        height: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.height),
        backgroundColor: this.cssColors ? null : this.disabled ? this.colorDisabled : this.colorCurrent,
        borderRadius: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(Math.round(this.height / 2))
      };
    },
    buttonRadius: function buttonRadius() {
      return this.height - this.margin * 2;
    },
    distance: function distance() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.width - this.height + this.margin);
    },
    buttonStyle: function buttonStyle() {
      var transition = 'transform ' + this.speed + 'ms';
      var margin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.margin);

      var transform = this.toggled ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* translate3d */])(this.distance, margin) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* translate3d */])(margin, margin);

      var background = this.switchColor ? this.switchColorCurrent : null;

      return {
        width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.buttonRadius),
        height: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.buttonRadius),
        transition: transition,
        transform: transform,
        background: background
      };
    },
    labelStyle: function labelStyle() {
      return {
        lineHeight: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.height),
        fontSize: this.fontSize ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* px */])(this.fontSize) : null
      };
    },
    colorChecked: function colorChecked() {
      var color = this.color;


      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(color)) {
        return color || DEFAULT_COLOR_CHECKED;
      }

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(color, 'checked', DEFAULT_COLOR_CHECKED);
    },
    colorUnchecked: function colorUnchecked() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.color, 'unchecked', DEFAULT_COLOR_UNCHECKED);
    },
    colorDisabled: function colorDisabled() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.color, 'disabled', this.colorCurrent);
    },
    colorCurrent: function colorCurrent() {
      return this.toggled ? this.colorChecked : this.colorUnchecked;
    },
    labelChecked: function labelChecked() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.labels, 'checked', DEFAULT_LABEL_CHECKED);
    },
    labelUnchecked: function labelUnchecked() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.labels, 'unchecked', DEFAULT_LABEL_UNCHECKED);
    },
    switchColorChecked: function switchColorChecked() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.switchColor, 'checked', DEFAULT_SWITCH_COLOR);
    },
    switchColorUnchecked: function switchColorUnchecked() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* get */])(this.switchColor, 'unchecked', DEFAULT_SWITCH_COLOR);
    },
    switchColorCurrent: function switchColorCurrent() {
      var switchColor = this.switchColor;


      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(this.switchColor)) {
        return this.switchColor || DEFAULT_SWITCH_COLOR;
      }

      return this.toggled ? this.switchColorChecked : this.switchColorUnchecked;
    }
  },
  watch: {
    value: function value(_value) {
      if (this.sync) {
        this.toggled = !!_value;
      }
    }
  },
  data: function data() {
    return {
      toggled: !!this.value
    };
  },

  methods: {
    toggle: function toggle(event) {
      var toggled = !this.toggled;

      if (!this.sync) {
        this.toggled = toggled;
      }

      this.$emit('input', toggled);
      this.$emit('change', {
        value: toggled,
        tag: this.tag,
        srcEvent: event
      });
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Button_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return __WEBPACK_IMPORTED_MODULE_0__Button_vue___default.a; });


var installed = false;

/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    if (installed) {
      return;
    }

    Vue.component('ToggleButton', __WEBPACK_IMPORTED_MODULE_0__Button_vue___default.a);
    installed = true;
  }
});



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isString; });
/* unused harmony export isBoolean */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return px; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return translate3d; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isString = function isString(value) {
  return typeof value === 'string';
};

var isBoolean = function isBoolean(value) {
  return typeof value === 'boolean';
};

var isObject = function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};

var has = function has(object, key) {
  return isObject(object) && object.hasOwnProperty(key);
};

var get = function get(object, key, defaultValue) {
  return has(object, key) ? object[key] : defaultValue;
};

var px = function px(value) {
  return value + 'px';
};

var translate3d = function translate3d(x, y) {
  var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0px';

  return 'translate3d(' + x + ', ' + y + ', ' + z + ')';
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".vue-js-switch[data-v-25adc6c0]{display:inline-block;position:relative;vertical-align:middle;user-select:none;font-size:10px;cursor:pointer}.vue-js-switch .v-switch-input[data-v-25adc6c0]{opacity:0;position:absolute;width:1px;height:1px}.vue-js-switch .v-switch-label[data-v-25adc6c0]{position:absolute;top:0;font-weight:600;color:#fff;z-index:1}.vue-js-switch .v-switch-label.v-left[data-v-25adc6c0]{left:10px}.vue-js-switch .v-switch-label.v-right[data-v-25adc6c0]{right:10px}.vue-js-switch .v-switch-core[data-v-25adc6c0]{display:block;position:relative;box-sizing:border-box;outline:0;margin:0;transition:border-color .3s,background-color .3s;user-select:none}.vue-js-switch .v-switch-core .v-switch-button[data-v-25adc6c0]{display:block;position:absolute;overflow:hidden;top:0;left:0;border-radius:100%;background-color:#fff;z-index:2}.vue-js-switch.disabled[data-v-25adc6c0]{pointer-events:none;opacity:.6}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    class: _vm.className
  }, [_c('input', {
    staticClass: "v-switch-input",
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.value
    },
    on: {
      "change": function($event) {
        $event.stopPropagation();
        return _vm.toggle($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "v-switch-core",
    style: (_vm.coreStyle)
  }, [_c('div', {
    staticClass: "v-switch-button",
    style: (_vm.buttonStyle)
  })]), _vm._v(" "), (_vm.labels) ? [(_vm.toggled) ? _c('span', {
    staticClass: "v-switch-label v-left",
    style: (_vm.labelStyle)
  }, [_vm._t("checked", [
    [_vm._v(_vm._s(_vm.labelChecked))]
  ])], 2) : _c('span', {
    staticClass: "v-switch-label v-right",
    style: (_vm.labelStyle)
  }, [_vm._t("unchecked", [
    [_vm._v(_vm._s(_vm.labelUnchecked))]
  ])], 2)] : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("2283861f", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/App.vue?vue&type=template&id=332fccf4&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/App.vue?vue&type=template&id=332fccf4& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("router-view")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container contaRuta", attrs: { id: "Ruta" } },
    [
      _c(
        "div",
        {
          staticClass: "modal fade",
          attrs: {
            id: "exampleModal",
            tabindex: "-1",
            "aria-labelledby": "exampleModalLabel",
            "aria-hidden": "true"
          }
        },
        [
          _c("div", { staticClass: "modal-dialog" }, [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c(
                  "form",
                  {
                    attrs: { method: "POST", id: "form-edit_product" },
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.putHorario($event)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "container-fluid" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "form-group col-md-12" }, [
                          _c("label", [_vm._v("Hora")]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.data_edit.hora,
                                expression: "data_edit.hora"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "time" },
                            domProps: { value: _vm.data_edit.hora },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.data_edit,
                                  "hora",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group col-md-12" }, [
                          _c("label", [_vm._v("Fecha")]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.data_edit.fecha,
                                expression: "data_edit.fecha"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "date", required: "" },
                            domProps: { value: _vm.data_edit.fecha },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.data_edit,
                                  "fecha",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _vm.show_alert.edit.state
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "alert alert-danger alert-dismissible fade show",
                            attrs: { role: "alert" }
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.show_alert.edit.messaje) +
                                "\n                        "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "row  m-t-25" }, [
                      _c("div", { staticClass: "col" }, [
                        _c("div", { staticClass: "form-group" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-success",
                              attrs: { disabled: _vm.buttons.edit.state }
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(_vm.buttons.edit.name) +
                                  "\n                                        "
                              ),
                              _vm.buttons.edit.state
                                ? _c("i", {
                                    staticClass: "fa fa-spinner fa-spin"
                                  })
                                : _vm._e()
                            ]
                          )
                        ])
                      ])
                    ])
                  ]
                )
              ])
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _c("div", { staticClass: "card cardRutas" }, [
        _c(
          "form",
          {
            attrs: { method: "POST", id: "form-ruta" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.setHorario($event)
              }
            }
          },
          [
            _vm.show_alert.create.state
              ? _c(
                  "div",
                  {
                    staticClass:
                      "alert alert-danger alert-dismissible fade show",
                    attrs: { role: "alert" }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.show_alert.create.messaje) +
                        "\n            "
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-12" }, [
              _c("label", [_vm._v("Hora")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.hora,
                    expression: "hora"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "time" },
                domProps: { value: _vm.hora },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.hora = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-12" }, [
              _c("label", [_vm._v("Fecha")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fecha,
                    expression: "fecha"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "date" },
                domProps: { value: _vm.fecha },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.fecha = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-12" }, [
              _vm._m(2),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idRuta,
                      expression: "idRuta"
                    }
                  ],
                  staticClass: "custom-select",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.idRuta = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "0" } }, [
                    _vm._v("Seleccionar Ruta")
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.ruta, function(idRuta) {
                    return _c("option", {
                      key: idRuta,
                      domProps: {
                        value: idRuta.idRuta,
                        textContent: _vm._s(idRuta.descripcion)
                      }
                    })
                  })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-12" }, [
              _vm._m(3),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idVehiculo,
                      expression: "idVehiculo"
                    }
                  ],
                  staticClass: "custom-select",
                  attrs: { required: "" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.idVehiculo = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "0" } }, [
                    _vm._v("Seleccionar Vehiculo")
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.vehiculo, function(idVehiculo) {
                    return _c("option", {
                      key: idVehiculo,
                      domProps: {
                        value: idVehiculo.idVehiculo,
                        textContent: _vm._s(idVehiculo.placa)
                      }
                    })
                  })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "btn-width" }, [
              _c("button", { staticClass: "btn  botonCancelar botones" }, [
                _vm._v("Cancelar")
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn botonAgregar botones",
                  attrs: { disabled: _vm.buttons.create.state }
                },
                [_vm._v(_vm._s(_vm.buttons.create.name))]
              )
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "container-fluid" },
        [
          _c("vue-bootstrap4-table", {
            attrs: {
              rows: _vm.horario,
              columns: _vm.columns,
              config: _vm.config,
              "thead-class": "green-bg bg-dark text-white"
            },
            scopedSlots: _vm._u([
              {
                key: "edit",
                fn: function(props) {
                  return _c("templete", {}, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: {
                          type: "button",
                          "data-toggle": "modal",
                          "data-target": "#exampleModal",
                          idHorario: props.row.idHorario
                        },
                        on: {
                          click: function($event) {
                            return _vm.editHorario(props.row.idHorario)
                          }
                        }
                      },
                      [_c("i", { staticClass: "icofont-edit" })]
                    )
                  ])
                }
              },
              {
                key: "delete",
                fn: function(props) {
                  return _c("templete", {}, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: { type: "button", idRuta: props.row.idHorario },
                        on: {
                          click: function($event) {
                            return _vm.deleteHorario(props.row.idRuta)
                          }
                        }
                      },
                      [_c("i", { staticClass: "icofont-ui-delete" })]
                    )
                  ])
                }
              }
            ])
          })
        ],
        1
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [_vm._v("Editar Horario")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
      _c(
        "h5",
        {
          staticClass: "text-center text-white",
          attrs: { id: "exampleModalLabel" }
        },
        [_vm._v("Habilitar Horario")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Ruta"),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Vehiculo "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
        _c(
          "h5",
          {
            staticClass: "text-center text-white",
            attrs: { id: "exampleModalLabel" }
          },
          [_vm._v("Cantidad de Pasajeros Movilizados")]
        )
      ]),
      _vm._v(" "),
      _c("table", { staticClass: "table" }, [
        _c(
          "thead",
          { staticClass: "tablaPasajeros encabezadoFormulario text-white" },
          [
            _c("tr", [
              _c("th", { attrs: { scope: "col" } }),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Fecha")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Hora")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Placa")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Ruta")]),
              _vm._v(" "),
              _c(
                "th",
                { staticStyle: { width: "20%" }, attrs: { scope: "col" } },
                [_vm._v("Cantidad Pasajeros")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c("tbody", { staticStyle: { "background-color": "white" } }, [
          _c("tr", [
            _c("th", { attrs: { scope: "row" } }, [_vm._v("1")]),
            _vm._v(" "),
            _c("td", [_vm._v("21-05-2020")]),
            _vm._v(" "),
            _c("td", [_vm._v("12:00")]),
            _vm._v(" "),
            _c("td", [_vm._v("KYC34B")]),
            _vm._v(" "),
            _c("td", [_vm._v("Numero1")]),
            _vm._v(" "),
            _c("td", [_vm._v("14")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("th", { attrs: { scope: "row" } }, [_vm._v("2")]),
            _vm._v(" "),
            _c("td", [_vm._v("12-05-2020")]),
            _vm._v(" "),
            _c("td", [_vm._v("03:00")]),
            _vm._v(" "),
            _c("td", [_vm._v("BCD34B")]),
            _vm._v(" "),
            _c("td", [_vm._v("Numero2")]),
            _vm._v(" "),
            _c("td", [_vm._v("10")])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", [
        _c("form", [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col" }, [
              _c(
                "select",
                {
                  staticClass: "form-control",
                  attrs: {
                    id: "exampleFormControlSelect1",
                    placeholder: "Ruta"
                  }
                },
                [
                  _c("option", [_vm._v("Ruta 1")]),
                  _vm._v(" "),
                  _c("option", [_vm._v("Ruta 2")]),
                  _vm._v(" "),
                  _c("option", [_vm._v("Ruta 3")]),
                  _vm._v(" "),
                  _c("option", [_vm._v("Ruta 4")]),
                  _vm._v(" "),
                  _c("option", [_vm._v("Ruta 5")])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col" }, [
              _c("input", {
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Vehiculo" }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col" }, [
              _c(
                "button",
                {
                  staticClass: "btn botonAgregar botones",
                  attrs: { type: "button" }
                },
                [_c("i", { staticClass: "fas fa-search" })]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "listado" }, [
        _c("table", { staticClass: "table md-7" }, [
          _c("thead", { staticClass: " encabezadoFormulario text-white " }, [
            _c("tr", [
              _c("th", { attrs: { scope: "col" } }, [_vm._v("#")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Placa")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Ruta")]),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [_vm._v("Hora")]),
              _vm._v(" "),
              _c(
                "th",
                { staticStyle: { width: "13%" }, attrs: { scope: "col" } },
                [_vm._v("Acción")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("tbody", { staticStyle: { background: "white" } }, [
            _c("tr", [
              _c("th", { attrs: { scope: "row" } }, [_vm._v("1")]),
              _vm._v(" "),
              _c("td", [_vm._v("Mark")]),
              _vm._v(" "),
              _c("td", [_vm._v("Otto")]),
              _vm._v(" "),
              _c("td", [_vm._v("@mdo")]),
              _vm._v(" "),
              _c("td", { staticStyle: { width: "auto" } }, [
                _c(
                  "button",
                  {
                    staticClass: "btn botonAgregar text-white",
                    attrs: { type: "button" }
                  },
                  [_c("i", { staticClass: "fas fa-pen" })]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-danger", attrs: { type: "button" } },
                  [_c("i", { staticClass: "fas fa-trash-alt" })]
                )
              ])
            ]),
            _vm._v(" "),
            _c("tr", [
              _c("th", { attrs: { scope: "row" } }, [_vm._v("2")]),
              _vm._v(" "),
              _c("td", [_vm._v("Jacob")]),
              _vm._v(" "),
              _c("td", [_vm._v("Thornton")]),
              _vm._v(" "),
              _c("td", [_vm._v("@fat")]),
              _vm._v(" "),
              _c("td", { staticStyle: { width: "auto" } }, [
                _c(
                  "button",
                  {
                    staticClass: "btn botonAgregar text-white",
                    attrs: { type: "button" }
                  },
                  [_c("i", { staticClass: "fas fa-pen" })]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-danger", attrs: { type: "button" } },
                  [_c("i", { staticClass: "fas fa-trash-alt" })]
                )
              ])
            ]),
            _vm._v(" "),
            _c("tr", [
              _c("th", { attrs: { scope: "row" } }, [_vm._v("3")]),
              _vm._v(" "),
              _c("td", [_vm._v("Larry")]),
              _vm._v(" "),
              _c("td", [_vm._v("the Bird")]),
              _vm._v(" "),
              _c("td", [_vm._v("@twitter")]),
              _vm._v(" "),
              _c("td", { staticStyle: { width: "auto" } }, [
                _c(
                  "button",
                  {
                    staticClass: "btn botonAgregar text-white",
                    attrs: { type: "button" }
                  },
                  [_c("i", { staticClass: "fas fa-pen" })]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-danger", attrs: { type: "button" } },
                  [_c("i", { staticClass: "fas fa-trash-alt" })]
                )
              ])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container contaRuta", attrs: { id: "Ruta" } },
    [
      _c(
        "div",
        {
          staticClass: "modal fade",
          attrs: {
            id: "exampleModal",
            tabindex: "-1",
            "aria-labelledby": "exampleModalLabel",
            "aria-hidden": "true"
          }
        },
        [
          _c("div", { staticClass: "modal-dialog" }, [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c(
                  "form",
                  {
                    attrs: { method: "POST", id: "form-edit_product" },
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.putRuta($event)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "container-fluid" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "form-group col-md-6" }, [
                          _c("label", [_vm._v("Codigo")]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-asterisk iconosRutas"
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.data_edit.codigo,
                                expression: "data_edit.codigo"
                              }
                            ],
                            staticClass: "form-control inputRutas",
                            attrs: { type: "text", required: "" },
                            domProps: { value: _vm.data_edit.codigo },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.data_edit,
                                  "codigo",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group col-md-6" }, [
                          _c("label", [_vm._v("Nombre:")]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "icofont-location-pin iconosRutas"
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.data_edit.descripcion,
                                expression: "data_edit.descripcion"
                              }
                            ],
                            staticClass: "form-control inputRutas",
                            attrs: { type: "text", required: "" },
                            domProps: { value: _vm.data_edit.descripcion },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.data_edit,
                                  "descripcion",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "form-group col-md-6" }, [
                          _c("label", [_vm._v("Estado")]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.data_edit.estado,
                                  expression: "data_edit.estado"
                                }
                              ],
                              staticClass: "custom-select",
                              attrs: { required: "" },
                              on: {
                                change: function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.data_edit,
                                    "estado",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "1" } }, [
                                _vm._v("Activo")
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "0" } }, [
                                _vm._v("Inactivo")
                              ])
                            ]
                          )
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _vm.show_alert.edit.state
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "alert alert-danger alert-dismissible fade show",
                            attrs: { role: "alert" }
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.show_alert.edit.messaje) +
                                "\n                        "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "row  m-t-25" }, [
                      _c("div", { staticClass: "col" }, [
                        _c("div", { staticClass: "form-group" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-success",
                              attrs: { disabled: _vm.buttons.edit.state }
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(_vm.buttons.edit.name) +
                                  "\n                                        "
                              ),
                              _vm.buttons.edit.state
                                ? _c("i", {
                                    staticClass: "fa fa-spinner fa-spin"
                                  })
                                : _vm._e()
                            ]
                          )
                        ])
                      ])
                    ])
                  ]
                )
              ])
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "card cardRutas" }, [
          _c(
            "form",
            {
              attrs: { method: "POST", id: "form-ruta" },
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.setRuta($event)
                }
              }
            },
            [
              _vm.show_alert.create.state
                ? _c(
                    "div",
                    {
                      staticClass:
                        "alert alert-danger alert-dismissible fade show",
                      attrs: { role: "alert" }
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.show_alert.create.messaje) +
                          "\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _c("label", { attrs: { for: "codigo" } }, [_vm._v("Codigo")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-asterisk iconosRutas" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.codigo,
                        expression: "codigo"
                      }
                    ],
                    staticClass: "form-control inputRutas",
                    attrs: { type: "text", id: "codigo", required: "" },
                    domProps: { value: _vm.codigo },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.codigo = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _c("label", { attrs: { for: "descripcion" } }, [
                    _vm._v("Nombre:")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "icofont-location-pin iconosRutas" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.descripcion,
                        expression: "descripcion"
                      }
                    ],
                    staticClass: "form-control inputRutas",
                    attrs: { type: "text", id: "descripcion", required: "" },
                    domProps: { value: _vm.descripcion },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.descripcion = $event.target.value
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.idBarrioInicia,
                          expression: "idBarrioInicia"
                        }
                      ],
                      staticClass: "custom-select",
                      attrs: { required: "" },
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.idBarrioInicia = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "0" } }, [
                        _vm._v("Seleccionar Barrio")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.barrio, function(idBarrioInicia) {
                        return _c("option", {
                          key: idBarrioInicia,
                          domProps: {
                            value: idBarrioInicia.idBarrio,
                            textContent: _vm._s(idBarrioInicia.nombreBarrio)
                          }
                        })
                      })
                    ],
                    2
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _vm._m(3),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.idBarrioTermina,
                          expression: "idBarrioTermina"
                        }
                      ],
                      staticClass: "custom-select",
                      attrs: { required: "" },
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.idBarrioTermina = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "0" } }, [
                        _vm._v("Seleccionar Barrio")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.barrio, function(idBarrioTermina) {
                        return _c("option", {
                          key: idBarrioTermina,
                          domProps: {
                            value: idBarrioTermina.idBarrio,
                            textContent: _vm._s(idBarrioTermina.nombreBarrio)
                          }
                        })
                      })
                    ],
                    2
                  )
                ])
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _c("label", [_vm._v("Estado")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.estado,
                          expression: "estado"
                        }
                      ],
                      staticClass: "custom-select",
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.estado = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "-1" } }, [
                        _vm._v("Seleccionar Estado")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "1" } }, [
                        _vm._v("Activo")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "0" } }, [
                        _vm._v("Inactivo")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group col-md-6" }, [
                  _c("label", { attrs: { for: "idUsuarioModifica" } }, [
                    _vm._v("idUsuarioModifica")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-map-marked-alt iconosRutas" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idUsuarioModifica,
                        expression: "idUsuarioModifica"
                      }
                    ],
                    staticClass: "form-control inputRutas",
                    attrs: {
                      type: "text",
                      id: "idUsuarioModifica",
                      required: ""
                    },
                    domProps: { value: _vm.idUsuarioModifica },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idUsuarioModifica = $event.target.value
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "form-group col-md-4" }, [
                  _c("label", { attrs: { for: "idUsuarioCrea" } }, [
                    _vm._v("idUsuarioCrea")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-map-marked-alt iconosRutas" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idUsuarioCrea,
                        expression: "idUsuarioCrea"
                      }
                    ],
                    staticClass: "form-control inputRutas",
                    attrs: { type: "text", id: "idUsuarioCrea", required: "" },
                    domProps: { value: _vm.idUsuarioCrea },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idUsuarioCrea = $event.target.value
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "btn-width" }, [
                _c("button", { staticClass: "btn  botonCancelar botones" }, [
                  _vm._v("Cancelar")
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn botonAgregar botones",
                    attrs: { disabled: _vm.buttons.create.state }
                  },
                  [_vm._v(_vm._s(_vm.buttons.create.name))]
                )
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "container-fluid" },
          [
            _c(
              "vue-bootstrap4-table",
              {
                attrs: {
                  rows: _vm.rutas,
                  columns: _vm.columns,
                  config: _vm.config,
                  "thead-class": "green-bg bg-dark text-white"
                },
                scopedSlots: _vm._u([
                  {
                    key: "edit",
                    fn: function(props) {
                      return _c("templete", {}, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: {
                              type: "button",
                              "data-toggle": "modal",
                              "data-target": "#exampleModal",
                              idRuta: props.row.idRuta
                            },
                            on: {
                              click: function($event) {
                                return _vm.editRuta(props.row.idRuta)
                              }
                            }
                          },
                          [_c("i", { staticClass: "icofont-edit" })]
                        )
                      ])
                    }
                  },
                  {
                    key: "delete",
                    fn: function(props) {
                      return _c("templete", {}, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger",
                            attrs: { type: "button", idRuta: props.row.idRuta },
                            on: {
                              click: function($event) {
                                return _vm.deleteRuta(props.row.idRuta)
                              }
                            }
                          },
                          [_c("i", { staticClass: "icofont-ui-delete" })]
                        )
                      ])
                    }
                  }
                ])
              },
              [
                _vm._v(" "),
                _vm._v(" "),
                _c("templete", { attrs: { slot: "estado" }, slot: "estado" })
              ],
              1
            )
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [_vm._v("Editar Ruta")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
      _c("h5", { staticClass: "text-center text-white" }, [
        _vm._v("Registrar Rutas")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Barrio de origen: "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Barrio de Destino: "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container contaRuta" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "card cardRutas" }, [
      _c(
        "form",
        {
          attrs: { method: "POST" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.setTercero($event)
            }
          }
        },
        [
          _c("div", { staticClass: " primerContenedor" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "numeroIdentificacion" } }, [
                  _vm._v("Identificación")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "far fa-address-card iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.numeroIdentificacion,
                      expression: "numeroIdentificacion"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: {
                    type: "text",
                    id: "numeroIdentificacion",
                    required: ""
                  },
                  domProps: { value: _vm.numeroIdentificacion },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.numeroIdentificacion = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "tipoIdentificacion" } }, [
                  _vm._v("Tipo Documento")
                ]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.tipoIdentificacion,
                        expression: "tipoIdentificacion"
                      }
                    ],
                    staticClass: "custom-select",
                    attrs: { id: "tipoIdentificacion", required: "" },
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.tipoIdentificacion = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "1" } }, [_vm._v("CC")]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "2" } }, [_vm._v("TI")]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "3" } }, [_vm._v("RC")])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-3 divFoto" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.foto,
                      expression: "foto"
                    }
                  ],
                  staticClass: "form-control col-md-6",
                  attrs: { placeholder: "Foto", id: "foto", required: "" },
                  domProps: { value: _vm.foto },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.foto = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "nombres" } }, [_vm._v("Nombres")]),
                _vm._v(" "),
                _c("i", { staticClass: "far fa-edit iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.nombres,
                      expression: "nombres"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "nombres" },
                  domProps: { value: _vm.nombres },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.nombres = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-3" }, [
                _c("label", { attrs: { for: "apellidos" } }, [
                  _vm._v("Apellidos")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "far fa-edit iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.apellidos,
                      expression: "apellidos"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "apellidos" },
                  domProps: { value: _vm.apellidos },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.apellidos = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _vm._m(1)
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "fechaNacimiento" } }, [
                  _vm._v("Fecha Nacimiento")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fechaNacimiento,
                      expression: "fechaNacimiento"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "date",
                    value: "2020-01-01",
                    id: "fechaNacimiento"
                  },
                  domProps: { value: _vm.fechaNacimiento },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.fechaNacimiento = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "genero" } }, [_vm._v("Genero")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.genero,
                        expression: "genero"
                      }
                    ],
                    staticClass: "custom-select",
                    attrs: { id: "genero" },
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.genero = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "0" } }, [
                      _vm._v("Seleccione una opción")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "1" } }, [
                      _vm._v("Masculino")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "2" } }, [
                      _vm._v("Femenino")
                    ]),
                    _vm._v(" "),
                    _c("option")
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "telefono" } }, [
                  _vm._v("Teléfono")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-mobile-alt iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.telefono,
                      expression: "telefono"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "telefono" },
                  domProps: { value: _vm.telefono },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.telefono = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "celular" } }, [_vm._v("Celular")]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-mobile-alt iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.celular,
                      expression: "celular"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "celular" },
                  domProps: { value: _vm.celular },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.celular = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-4" }, [
                _c("label", { attrs: { for: "email" } }, [_vm._v("Correo")]),
                _vm._v(" "),
                _c("i", { staticClass: "far fa-envelope iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.email,
                      expression: "email"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "email", id: "email" },
                  domProps: { value: _vm.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.email = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "direccion" } }, [
                  _vm._v("Dirección")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-map-marker-alt iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.direccion,
                      expression: "direccion"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "direccion" },
                  domProps: { value: _vm.direccion },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.direccion = $event.target.value
                    }
                  }
                })
              ]),
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "idMunicipio" } }, [
                  _vm._v("Ciudad")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-city iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idMunicipio,
                      expression: "idMunicipio"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "idMunicipio" },
                  domProps: { value: _vm.idMunicipio },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.idMunicipio = $event.target.value
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "segundoContenedor" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "razonSocial" } }, [
                  _vm._v("Razon social")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-users iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.razonSocial,
                      expression: "razonSocial"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "razonSocial" },
                  domProps: { value: _vm.razonSocial },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.razonSocial = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "nombreComercial" } }, [
                  _vm._v("Nombre comercial")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-hotel iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.nombreComercial,
                      expression: "nombreComercial"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "nombreComercial" },
                  domProps: { value: _vm.nombreComercial },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.nombreComercial = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "idUsuarioCrea" } }, [
                  _vm._v("Usuario crea")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-users iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idUsuarioCrea,
                      expression: "idUsuarioCrea"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "idUsuarioCrea" },
                  domProps: { value: _vm.idUsuarioCrea },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.idUsuarioCrea = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group col-md-6" }, [
                _c("label", { attrs: { for: "idUsuarioModifica" } }, [
                  _vm._v("usuario modifica")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-hotel iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idUsuarioModifica,
                      expression: "idUsuarioModifica"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "idUsuarioModifica" },
                  domProps: { value: _vm.idUsuarioModifica },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.idUsuarioModifica = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", { attrs: { for: "estado" } }, [_vm._v("Estado")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.estado,
                      expression: "estado"
                    }
                  ],
                  staticClass: "custom-select",
                  attrs: { id: "estado", required: "" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.estado = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "0" } }, [
                    _vm._v("Seleccione una opción")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "1" } }, [_vm._v("Activo")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "2" } }, [_vm._v("Inactivo")])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("div", { staticClass: "btn-width " }, [
            _c("button", { staticClass: "btn  botonCancelar botones" }, [
              _vm._v("Cancelar")
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn botonAgregar botones",
                attrs: { disabled: _vm.buttons.create.state }
              },
              [_vm._v(_vm._s(_vm.buttons.create.name))]
            )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
      _c(
        "h5",
        {
          staticClass: "text-center text-white",
          attrs: { id: "exampleModalLabel" }
        },
        [_vm._v("Registrar Tercero")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group col-md-5 examinar " }, [
      _c(
        "button",
        {
          staticClass: "btn  botonAgregar botones",
          staticStyle: { background: "red", "margin-left": "8rem" },
          attrs: { type: "submit" }
        },
        [_vm._v("Examinar")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container contaRuta" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "card cardRutas" }, [
      _c(
        "form",
        {
          attrs: { method: "POST", id: "form-usuario" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.setUsuario($event)
            }
          }
        },
        [
          _vm.show_alert.create.state
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger alert-dismissible fade show",
                  attrs: { role: "alert" }
                },
                [
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.show_alert.create.messaje) +
                      "\n        "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group col-md-6" }, [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idTercero,
                      expression: "idTercero"
                    }
                  ],
                  staticClass: "custom-select",
                  attrs: { required: "" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.idTercero = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "0" } }, [
                    _vm._v("Seleccionar Tercero")
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.tercero, function(idTercero) {
                    return _c("option", {
                      key: idTercero,
                      domProps: {
                        value: idTercero.idTercero,
                        textContent: _vm._s(idTercero.nombres)
                      }
                    })
                  })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("Estado")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.estado,
                      expression: "estado"
                    }
                  ],
                  staticClass: "custom-select",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.estado = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "-1" } }, [
                    _vm._v("Seleccionar Estado")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "1" } }, [_vm._v("Activo")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "0" } }, [_vm._v("Inactivo")])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", { attrs: { for: "codigo" } }, [_vm._v("Codigo")]),
              _vm._v(" "),
              _c("i", { staticClass: "fas fa-asterisk iconosRutas" }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.codigo,
                    expression: "codigo"
                  }
                ],
                staticClass: "form-control inputRutas",
                attrs: { type: "text", id: "codigo", required: "" },
                domProps: { value: _vm.codigo },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.codigo = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", { attrs: { for: "validationServer01" } }, [
                _vm._v("Contraseña")
              ]),
              _vm._v(" "),
              _c("i", { staticClass: "icofont-eye-blocked iconosRutas" }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.clave,
                    expression: "clave"
                  }
                ],
                staticClass: "form-control inputRutas",
                attrs: { type: "password", id: "clave", required: "" },
                domProps: { value: _vm.clave },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.clave = $event.target.value
                  }
                }
              })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "btn-width" }, [
            _c("button", { staticClass: "btn  botonCancelar botones" }, [
              _vm._v("Cancelar")
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn botonAgregar botones",
                attrs: { disabled: _vm.buttons.create.state }
              },
              [_vm._v(_vm._s(_vm.buttons.create.name))]
            )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
      _c(
        "h5",
        {
          staticClass: "text-center text-white",
          attrs: { id: "exampleModalLabel" }
        },
        [_vm._v("Registrar Usuarios")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Tercero "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container contaRuta" }, [
      _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
        _c(
          "h5",
          {
            staticClass: "text-center text-white",
            attrs: { id: "exampleModalLabel" }
          },
          [_vm._v("Despachos")]
        )
      ]),
      _vm._v(" "),
      _c("table", { staticClass: "table md-7" }, [
        _c("thead", { staticClass: " encabezadoFormulario text-white " }, [
          _c("tr", [
            _c("th", { attrs: { scope: "col" } }, [_vm._v("ITEM")]),
            _vm._v(" "),
            _c("th", { attrs: { scope: "col" } }, [_vm._v("HORA")]),
            _vm._v(" "),
            _c("th", { attrs: { scope: "col" } }, [_vm._v("PLACAS")]),
            _vm._v(" "),
            _c("th", { attrs: { scope: "col" } }, [_vm._v("# RUTA")]),
            _vm._v(" "),
            _c("th", { attrs: { scope: "col" } }, [_vm._v("DESPACHO")]),
            _vm._v(" "),
            _c("th", { attrs: { scope: "col" } }, [_vm._v("OBSERVACIONES")])
          ])
        ]),
        _vm._v(" "),
        _c("tbody", { staticStyle: { background: "white" } }, [
          _c("tr", [
            _c("th", { attrs: { scope: "row" } }, [_vm._v("1")]),
            _vm._v(" "),
            _c("td", [_vm._v("2:00")]),
            _vm._v(" "),
            _c("td", [_vm._v("JLE34R")]),
            _vm._v(" "),
            _c("td", [_vm._v("26")]),
            _vm._v(" "),
            _c("td", [
              _c("option", [
                _c("select", [_vm._v("SI")]),
                _vm._v(" "),
                _c("select", [_vm._v("NO")])
              ])
            ]),
            _vm._v(" "),
            _c("td", [_vm._v("Ninguna")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("th", { attrs: { scope: "row" } }, [_vm._v("1")]),
            _vm._v(" "),
            _c("td", [_vm._v("2:00")]),
            _vm._v(" "),
            _c("td", [_vm._v("JLE34R")]),
            _vm._v(" "),
            _c("td", [_vm._v("26")]),
            _vm._v(" "),
            _c("td", [
              _c("option", [
                _c("select", [_vm._v("SI")]),
                _vm._v(" "),
                _c("select", [_vm._v("NO")])
              ])
            ]),
            _vm._v(" "),
            _c("td", [_vm._v("Ninguna")])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container contaRuta" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "card cardRutas" }, [
      _c(
        "form",
        {
          attrs: { method: "POST" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.setTercero($event)
            }
          }
        },
        [
          _c("div", [
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "placa" } }, [_vm._v("Placa")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-digital-tachograph iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.placa,
                        expression: "placa"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "placa" },
                    domProps: { value: _vm.placa },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.placa = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idVehiculoMatricula" } }, [
                    _vm._v("Matrícula")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-city iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idVehiculoMatricula,
                        expression: "idVehiculoMatricula"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idVehiculoMatricula" },
                    domProps: { value: _vm.idVehiculoMatricula },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idVehiculoMatricula = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idServicio" } }, [
                    _vm._v("Servicio")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-city iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idServicio,
                        expression: "idServicio"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idServicio" },
                    domProps: { value: _vm.idServicio },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idServicio = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idClase" } }, [_vm._v("Clase")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-city iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idClase,
                        expression: "idClase"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idClase" },
                    domProps: { value: _vm.idClase },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idClase = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idMarca" } }, [_vm._v("Marca")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-city iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idMarca,
                        expression: "idMarca"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idMarca" },
                    domProps: { value: _vm.idMarca },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idMarca = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idColor" } }, [_vm._v("Color")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-palette iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idColor,
                        expression: "idColor"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idColor" },
                    domProps: { value: _vm.idColor },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idColor = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idCarroceria" } }, [
                    _vm._v("Carroceria")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-city iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idCarroceria,
                        expression: "idCarroceria"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idCarroceria " },
                    domProps: { value: _vm.idCarroceria },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idCarroceria = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "idCombustible" } }, [
                    _vm._v("Combustible")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-gas-pump iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.idCombustible,
                        expression: "idCombustible "
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "idCombustible " },
                    domProps: { value: _vm.idCombustible },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.idCombustible = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "linea" } }, [_vm._v("Linea")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-palette iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.linea,
                        expression: "linea"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "linea" },
                    domProps: { value: _vm.linea },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.linea = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-4" }, [
                  _c("label", { attrs: { for: "modelo" } }, [_vm._v("Modelo")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-palette iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.modelo,
                        expression: "modelo"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "modelo" },
                    domProps: { value: _vm.modelo },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.modelo = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "numeroSerie" } }, [
                    _vm._v("Número de serie")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-hashtag iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.numeroSerie,
                        expression: "numeroSerie"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "numeroSerie" },
                    domProps: { value: _vm.numeroSerie },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.numeroSerie = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", [
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "numeroChasis" } }, [
                    _vm._v("Número de chasis")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-hashtag iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.numeroChasis,
                        expression: "numeroChasis"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "numeroChasis" },
                    domProps: { value: _vm.numeroChasis },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.numeroChasis = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "numeroMotor" } }, [
                    _vm._v("Número de motor")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-hashtag iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.numeroMotor,
                        expression: "numeroMotor"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "numeroMotor" },
                    domProps: { value: _vm.numeroMotor },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.numeroMotor = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "numeroPuertas" } }, [
                    _vm._v("Número de puertas")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-hashtag iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.numeroPuertas,
                        expression: "numeroPuertas"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "numeroPuertas" },
                    domProps: { value: _vm.numeroPuertas },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.numeroPuertas = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "numeroPasajeros" } }, [
                    _vm._v("Número de pasajeros")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-users iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.numeroPasajeros,
                        expression: "numeroPasajeros"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "number", id: "numeroPasajeros" },
                    domProps: { value: _vm.numeroPasajeros },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.numeroPasajeros = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "observaciones" } }, [
                    _vm._v("Observaciones")
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-hand-point-right iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.observaciones,
                        expression: "observaciones"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "observaciones" },
                    domProps: { value: _vm.observaciones },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.observaciones = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col" }, [
                  _c("label", { attrs: { for: "estado" } }, [_vm._v("Estado")]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-palette iconos" }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.estado,
                        expression: "estado"
                      }
                    ],
                    staticClass: "form-control inputTeceros",
                    attrs: { type: "text", id: "estado" },
                    domProps: { value: _vm.estado },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.estado = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-4" }, [
                _c("label", { attrs: { for: "idUsuarioCrea" } }, [
                  _vm._v("idUsuarioCrea")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-hand-point-right iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idUsuarioCrea,
                      expression: "idUsuarioCrea"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "idUsuarioCrea" },
                  domProps: { value: _vm.idUsuarioCrea },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.idUsuarioCrea = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-4" }, [
                _c("label", { attrs: { for: "idUsuarioModifica" } }, [
                  _vm._v("idUsuarioModifica")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-palette iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idUsuarioModifica,
                      expression: "idUsuarioModifica"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "idUsuarioModifica" },
                  domProps: { value: _vm.idUsuarioModifica },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.idUsuarioModifica = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-4" }, [
                _c("label", { attrs: { for: "numeroInterno" } }, [
                  _vm._v("numeroInterno")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "fas fa-palette iconos" }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.numeroInterno,
                      expression: "numeroInterno"
                    }
                  ],
                  staticClass: "form-control inputTeceros",
                  attrs: { type: "text", id: "numeroInterno" },
                  domProps: { value: _vm.numeroInterno },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.numeroInterno = $event.target.value
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("div", { staticClass: "btn-width" }, [
            _c(
              "button",
              {
                staticClass: "btn botonCancelar botones",
                attrs: { type: "button" }
              },
              [_vm._v("Cancelar")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn botonAgregar botones",
                attrs: { type: "submit", disabled: _vm.buttons.create.state }
              },
              [_vm._v(_vm._s(_vm.buttons.create.name))]
            )
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header encabezadoFormulario" }, [
      _c(
        "h5",
        {
          staticClass: "text-center text-white",
          attrs: { id: "exampleModalLabel" }
        },
        [_vm._v("Registrar vehículo")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-goup listado" }, [
      _c("div", {}, [
        _c("ul", { staticClass: "tabs" }, [
          _c("li", [
            _c("a", { attrs: { href: "#tab1" } }, [
              _c("span", { staticClass: "fas fa-digital-tachograph " }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("Matrícula")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#tab2" } }, [
              _c("span", { staticClass: "fas fa-file-alt" }),
              _c("span", { staticClass: "fas fa-search" }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("Póliza")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#tab3" } }, [
              _c("span", { staticClass: "fa fa-briefcase" }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("Operación")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#tab4" } }, [
              _c("span", { staticClass: "fas fa-screwdriver" }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("RTM")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#tab5" } }, [
              _c("span", { staticClass: "fas fa-users " }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("Terceros")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#tab6" } }, [
              _c("span", { staticClass: "fas fa-route " }),
              _c("span", { staticClass: "tab-text" }, [_vm._v("Rutas")])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "secciones" }, [
          _c("div", { attrs: { id: "tab1" } }, [
            _c("table", { staticClass: "table md-7" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("# Licencia Transito")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha Registro")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Tipo Registro")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Observaciones")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Estado")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha Creación")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha Modificación")
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { attrs: { id: "tab2" } }, [
            _c("table", { staticClass: "table md-7" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Descripción")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Aseguradora")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Número")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha expide")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha inicio")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha vence")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Observación")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Estado")])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { attrs: { id: "tab3" } }, [
            _c("table", { staticClass: "table" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("# Tarjeta Operación")
                    ]),
                    _vm._v(" "),
                    _c(
                      "th",
                      {
                        staticStyle: {
                          border: "2px solid white !important",
                          "text-align": "center !important"
                        },
                        attrs: { scope: "col", colspan: "4" }
                      },
                      [_vm._v("Fecha")]
                    ),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Observaciones")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Estado")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Vigencia Inicia")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Vigencia Fin")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Creación")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Modificación")
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { attrs: { id: "tab4" } }, [
            _c("table", { staticClass: "table md-7" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("# Certificado")
                    ]),
                    _vm._v(" "),
                    _c(
                      "th",
                      {
                        staticStyle: {
                          border: "2px solid white !important",
                          "text-align": "center !important"
                        },
                        attrs: { scope: "col", colspan: "5" }
                      },
                      [_vm._v("Fecha")]
                    ),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Observaciones")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Estado")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Expedición")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Vigencia Inicia")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Vigencia Fin")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Creación")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Modificación")
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { attrs: { id: "tab5" } }, [
            _c("table", { staticClass: "table md-7" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c(
                      "th",
                      {
                        staticStyle: {
                          border: "2px solid white !important",
                          "text-align": "center !important"
                        },
                        attrs: { scope: "col", colspan: "4" }
                      },
                      [_vm._v("Fecha")]
                    ),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Observaciones")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col", rowspan: "2" } }, [
                      _vm._v("Estado")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Inicio")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Fin")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Creación")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Modificación")
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { attrs: { id: "tab6" } }, [
            _c("table", { staticClass: "table md-7" }, [
              _c(
                "thead",
                { staticClass: " encabezadoFormulario text-white " },
                [
                  _c("tr", [
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Observaciones")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [_vm._v("Estado")]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha Creación")
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "col" } }, [
                      _vm._v("Fecha Modificación")
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("1")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Mark")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("Otto")]),
                  _vm._v(" "),
                  _c("td", [_vm._v("@mdo")])
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-router/dist/vue-router.esm.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
  * vue-router v3.4.2
  * (c) 2020 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ( true && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      var cachedData = cache[name];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data, children)
      } else {
        // render previous empty view
        return h()
      }
    }

    var matched = route.matched[depth];
    var component = matched && matched.components[name];

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null;
      return h()
    }

    // cache component
    cache[name] = { component: component };

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    var configProps = matched.props && matched.props[name];
    // save route and configProps in cache
    if (configProps) {
      extend(cache[name], {
        route: route,
        configProps: configProps
      });
      fillPropsinData(component, data, route, configProps);
    }

    return h(component, data, children)
  }
};

function fillPropsinData (component, data, route, configProps) {
  // resolve props
  var propsToPass = data.props = resolveProps(route, configProps);
  if (propsToPass) {
    // clone to prevent mutation
    propsToPass = data.props = extend({}, propsToPass);
    // pass non-declared props as attrs
    var attrs = data.attrs = data.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
     true && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var value = extraQuery[key];
    parsedQuery[key] = Array.isArray(value)
      ? value.map(castQueryParamValue)
      : castQueryParamValue(value);
  }
  return parsedQuery
}

var castQueryParamValue = function (value) { return (value == null || typeof value === 'object' ? value : String(value)); };

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj
    ? Object.keys(obj)
      .map(function (key) {
        var val = obj[key];

        if (val === undefined) {
          return ''
        }

        if (val === null) {
          return encode(key)
        }

        if (Array.isArray(val)) {
          var result = [];
          val.forEach(function (val2) {
            if (val2 === undefined) {
              return
            }
            if (val2 === null) {
              result.push(encode(key));
            } else {
              result.push(encode(key) + '=' + encode(val2));
            }
          });
          return result.join('&')
        }

        return encode(key) + '=' + encode(val)
      })
      .filter(function (x) { return x.length > 0; })
      .join('&')
    : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // query values can be null and undefined
    if (aVal == null || bVal == null) { return aVal === bVal }
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    // and fix #3106 so that you can work with location descriptor object having params.pathMatch equal to empty string
    if (typeof params.pathMatch === 'string') { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      // Fix #3072 no warn if `pathMatch` is string
      warn(typeof params.pathMatch === 'string', ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === 'object') {
      next.params = extend({}, params);
    }
    return next
  }

  // relative params
  if (!next.path && (next.params || next.query || next.hash) && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: 'page'
    },
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child. Wrapping the content with a span element.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href, 'aria-current': ariaCurrentValue };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
        aAttrs['aria-current'] = ariaCurrentValue;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ( true && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ( true && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Prevent browser scroll behavior on History popstate
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  // preserve existing history state as it could be overriden by the user
  var stateCopy = extend({}, window.history.state);
  stateCopy.key = getStateKey();
  window.history.replaceState(stateCopy, '', absolutePath);
  window.addEventListener('popstate', handlePopState);
  return function () {
    window.removeEventListener('popstate', handlePopState);
  }
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function handlePopState (e) {
  saveScrollPosition();
  if (e.state && e.state.key) {
    setStateKey(e.state.key);
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && typeof window.history.pushState === 'function'
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      // preserve existing history state as it could be overriden by the user
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

var NavigationFailureType = {
  redirected: 2,
  aborted: 4,
  cancelled: 8,
  duplicated: 16
};

function createNavigationRedirectedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.redirected,
    ("Redirected when going from \"" + (from.fullPath) + "\" to \"" + (stringifyRoute(
      to
    )) + "\" via a navigation guard.")
  )
}

function createNavigationDuplicatedError (from, to) {
  var error = createRouterError(
    from,
    to,
    NavigationFailureType.duplicated,
    ("Avoided redundant navigation to current location: \"" + (from.fullPath) + "\".")
  );
  // backwards compatible with the first introduction of Errors
  error.name = 'NavigationDuplicated';
  return error
}

function createNavigationCancelledError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.cancelled,
    ("Navigation cancelled from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" with a new navigation.")
  )
}

function createNavigationAbortedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.aborted,
    ("Navigation aborted from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" via a navigation guard.")
  )
}

function createRouterError (from, to, type, message) {
  var error = new Error(message);
  error._isRouter = true;
  error.from = from;
  error.to = to;
  error.type = type;

  return error
}

var propertiesToLog = ['params', 'query', 'hash'];

function stringifyRoute (to) {
  if (typeof to === 'string') { return to }
  if ('path' in to) { return to.path }
  var location = {};
  propertiesToLog.forEach(function (key) {
    if (key in to) { location[key] = to[key]; }
  });
  return JSON.stringify(location, null, 2)
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isNavigationFailure (err, errorType) {
  return (
    isError(err) &&
    err._isRouter &&
    (errorType == null || err.type === errorType)
  )
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
           true && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
  this.listeners = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route;
  // catch redirect option https://github.com/vuejs/vue-router/issues/3201
  try {
    route = this.router.match(location, this.current);
  } catch (e) {
    this.errorCbs.forEach(function (cb) {
      cb(e);
    });
    // Exception should still be thrown
    throw e
  }
  this.confirmTransition(
    route,
    function () {
      var prev = this$1.current;
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();
      this$1.router.afterHooks.forEach(function (hook) {
        hook && hook(route, prev);
      });

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        // Initial redirection should still trigger the onReady onSuccess
        // https://github.com/vuejs/vue-router/issues/3225
        if (!isNavigationFailure(err, NavigationFailureType.redirected)) {
          this$1.readyErrorCbs.forEach(function (cb) {
            cb(err);
          });
        } else {
          this$1.readyCbs.forEach(function (cb) {
            cb(route);
          });
        }
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // changed after adding errors with
    // https://github.com/vuejs/vue-router/pull/3047 before that change,
    // redirect and aborted navigation would produce an err == null
    if (!isNavigationFailure(err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  var lastRouteIndex = route.matched.length - 1;
  var lastCurrentIndex = current.matched.length - 1;
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    lastRouteIndex === lastCurrentIndex &&
    route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
  ) {
    this.ensureURL();
    return abort(createNavigationDuplicatedError(current, route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort(createNavigationCancelledError(current, route))
    }
    try {
      hook(route, current, function (to) {
        if (to === false) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(createNavigationAbortedError(current, route));
        } else if (isError(to)) {
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort(createNavigationRedirectedError(current, route));
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  this.current = route;
  this.cb && this.cb(route);
};

History.prototype.setupListeners = function setupListeners () {
  // Default implementation is empty
};

History.prototype.teardownListeners = function teardownListeners () {
  this.listeners.forEach(function (cleanupListener) {
    cleanupListener();
  });
  this.listeners = [];
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    History.call(this, router, base);

    this._startLocation = getLocation(this.base);
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === this$1._startLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    };
    window.addEventListener('popstate', handleRoutingEvent);
    this.listeners.push(function () {
      window.removeEventListener('popstate', handleRoutingEvent);
    });
  };

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    };
    var eventType = supportsPushState ? 'popstate' : 'hashchange';
    window.addEventListener(
      eventType,
      handleRoutingEvent
    );
    this.listeners.push(function () {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback =
    mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

   true &&
    assert(
      install.installed,
      "not installed. Make sure to call `Vue.use(VueRouter)` " +
        "before creating root instance."
    );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }

    if (!this$1.app) {
      // clean up event listeners
      // https://github.com/vuejs/vue-router/issues/2341
      this$1.history.teardownListeners();
    }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History || history instanceof HashHistory) {
    var handleInitialScroll = function (routeOrError) {
      var from = history.current;
      var expectScroll = this$1.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;

      if (supportsScroll && 'fullPath' in routeOrError) {
        handleScroll(this$1, routeOrError, from, false);
      }
    };
    var setupListeners = function (routeOrError) {
      history.setupListeners();
      handleInitialScroll(routeOrError);
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupListeners,
      setupListeners
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply(
    [],
    route.matched.map(function (m) {
      return Object.keys(m.components).map(function (key) {
        return m.components[key]
      })
    })
  )
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.4.2';
VueRouter.isNavigationFailure = isNavigationFailure;
VueRouter.NavigationFailureType = NavigationFailureType;

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes.js */ "./resources/js/routes.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App */ "./resources/js/components/App.vue");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-js-toggle-button */ "./node_modules/vue-js-toggle-button/dist/index.js");
/* harmony import */ var vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4__);





vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_js_toggle_button__WEBPACK_IMPORTED_MODULE_4___default.a);
window.axios = axios__WEBPACK_IMPORTED_MODULE_1___default.a;
var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#app',
  router: _routes_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: function render(h) {
    return h(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./resources/js/components/App.vue":
/*!*****************************************!*\
  !*** ./resources/js/components/App.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=332fccf4& */ "./resources/js/components/App.vue?vue&type=template&id=332fccf4&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./resources/js/components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/App.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/components/App.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/App.vue?vue&type=template&id=332fccf4&":
/*!************************************************************************!*\
  !*** ./resources/js/components/App.vue?vue&type=template&id=332fccf4& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=332fccf4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/App.vue?vue&type=template&id=332fccf4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_332fccf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Horario/crearHorario.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/Horario/crearHorario.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crearHorario.vue?vue&type=template&id=45fd415a& */ "./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a&");
/* harmony import */ var _crearHorario_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crearHorario.vue?vue&type=script&lang=js& */ "./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _crearHorario_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Horario/crearHorario.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_crearHorario_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./crearHorario.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Horario/crearHorario.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_crearHorario_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./crearHorario.vue?vue&type=template&id=45fd415a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Horario/crearHorario.vue?vue&type=template&id=45fd415a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_crearHorario_vue_vue_type_template_id_45fd415a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Pasajero/cantidadPasajeros.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/Pasajero/cantidadPasajeros.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cantidadPasajeros.vue?vue&type=template&id=70374026& */ "./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026&");
/* harmony import */ var _cantidadPasajeros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cantidadPasajeros.vue?vue&type=script&lang=js& */ "./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _cantidadPasajeros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__["render"],
  _cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Pasajero/cantidadPasajeros.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cantidadPasajeros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./cantidadPasajeros.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cantidadPasajeros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./cantidadPasajeros.vue?vue&type=template&id=70374026& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pasajero/cantidadPasajeros.vue?vue&type=template&id=70374026&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cantidadPasajeros_vue_vue_type_template_id_70374026___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Ruta/consultarRutaVehiculo.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/Ruta/consultarRutaVehiculo.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e& */ "./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e&");
/* harmony import */ var _consultarRutaVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consultarRutaVehiculo.vue?vue&type=script&lang=js& */ "./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _consultarRutaVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Ruta/consultarRutaVehiculo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_consultarRutaVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./consultarRutaVehiculo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_consultarRutaVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/consultarRutaVehiculo.vue?vue&type=template&id=6ba3df7e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_consultarRutaVehiculo_vue_vue_type_template_id_6ba3df7e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Ruta/registrarRutas.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/Ruta/registrarRutas.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registrarRutas.vue?vue&type=template&id=5259760c& */ "./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c&");
/* harmony import */ var _registrarRutas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrarRutas.vue?vue&type=script&lang=js& */ "./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _registrarRutas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Ruta/registrarRutas.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarRutas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarRutas.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/registrarRutas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarRutas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarRutas.vue?vue&type=template&id=5259760c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Ruta/registrarRutas.vue?vue&type=template&id=5259760c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarRutas_vue_vue_type_template_id_5259760c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Tercero/registrarTerceros.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarTerceros.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registrarTerceros.vue?vue&type=template&id=11e737d6& */ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6&");
/* harmony import */ var _registrarTerceros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrarTerceros.vue?vue&type=script&lang=js& */ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registrarTerceros.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _registrarTerceros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Tercero/registrarTerceros.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarTerceros.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarTerceros.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarTerceros.vue?vue&type=template&id=11e737d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarTerceros.vue?vue&type=template&id=11e737d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarTerceros_vue_vue_type_template_id_11e737d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Tercero/registrarUsuarios.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarUsuarios.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registrarUsuarios.vue?vue&type=template&id=5cc54b28& */ "./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28&");
/* harmony import */ var _registrarUsuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrarUsuarios.vue?vue&type=script&lang=js& */ "./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _registrarUsuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Tercero/registrarUsuarios.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarUsuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarUsuarios.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarUsuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarUsuarios.vue?vue&type=template&id=5cc54b28& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tercero/registrarUsuarios.vue?vue&type=template&id=5cc54b28&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarUsuarios_vue_vue_type_template_id_5cc54b28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Vehiculo/despacho.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Vehiculo/despacho.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./despacho.vue?vue&type=template&id=10b64e56& */ "./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56&");
/* harmony import */ var _despacho_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./despacho.vue?vue&type=script&lang=js& */ "./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _despacho_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__["render"],
  _despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Vehiculo/despacho.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_despacho_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./despacho.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/despacho.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_despacho_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./despacho.vue?vue&type=template&id=10b64e56& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/despacho.vue?vue&type=template&id=10b64e56&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_despacho_vue_vue_type_template_id_10b64e56___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Vehiculo/registrarVehiculo.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/Vehiculo/registrarVehiculo.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registrarVehiculo.vue?vue&type=template&id=23ab05f3& */ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3&");
/* harmony import */ var _registrarVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrarVehiculo.vue?vue&type=script&lang=js& */ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registrarVehiculo.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _registrarVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Vehiculo/registrarVehiculo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarVehiculo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarVehiculo.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./registrarVehiculo.vue?vue&type=template&id=23ab05f3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vehiculo/registrarVehiculo.vue?vue&type=template&id=23ab05f3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_registrarVehiculo_vue_vue_type_template_id_23ab05f3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/routes.js":
/*!********************************!*\
  !*** ./resources/js/routes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _components_Horario_crearHorario__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Horario/crearHorario */ "./resources/js/components/Horario/crearHorario.vue");
/* harmony import */ var _components_Tercero_registrarTerceros__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Tercero/registrarTerceros */ "./resources/js/components/Tercero/registrarTerceros.vue");
/* harmony import */ var _components_Vehiculo_registrarVehiculo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Vehiculo/registrarVehiculo */ "./resources/js/components/Vehiculo/registrarVehiculo.vue");
/* harmony import */ var _components_Ruta_registrarRutas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Ruta/registrarRutas */ "./resources/js/components/Ruta/registrarRutas.vue");
/* harmony import */ var _components_Ruta_consultarRutaVehiculo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Ruta/consultarRutaVehiculo */ "./resources/js/components/Ruta/consultarRutaVehiculo.vue");
/* harmony import */ var _components_Vehiculo_despacho__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Vehiculo/despacho */ "./resources/js/components/Vehiculo/despacho.vue");
/* harmony import */ var _components_Pasajero_cantidadPasajeros__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Pasajero/cantidadPasajeros */ "./resources/js/components/Pasajero/cantidadPasajeros.vue");
/* harmony import */ var _components_Tercero_registrarUsuarios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Tercero/registrarUsuarios */ "./resources/js/components/Tercero/registrarUsuarios.vue");

 //Inicio - se importan todos los componentes









vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
var router = new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  routes: [{
    path: '/crearHorario',
    name: 'crearHorario',
    component: _components_Horario_crearHorario__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    path: '/registrarTercero',
    name: 'Tercero',
    component: _components_Tercero_registrarTerceros__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    path: '/registrarVehiculo',
    name: 'registrarVehiculo',
    component: _components_Vehiculo_registrarVehiculo__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    path: '/registrarRutas',
    name: 'registrarRutas',
    component: _components_Ruta_registrarRutas__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    path: '/consultarRutasVehiculos',
    name: 'consultarRutasVehiculo',
    component: _components_Ruta_consultarRutaVehiculo__WEBPACK_IMPORTED_MODULE_6__["default"]
  }, {
    path: '/despacho',
    name: 'Despacho',
    component: _components_Vehiculo_despacho__WEBPACK_IMPORTED_MODULE_7__["default"]
  }, {
    path: '/cantidadPasajeros',
    name: 'Pasajeros',
    component: _components_Pasajero_cantidadPasajeros__WEBPACK_IMPORTED_MODULE_8__["default"]
  }, {
    path: '/registrarUsuarios',
    name: 'Usuarios',
    component: _components_Tercero_registrarUsuarios__WEBPACK_IMPORTED_MODULE_9__["default"]
  }]
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Estefania\Documents\TAKEVA P5\TakevaProject5\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\Users\Estefania\Documents\TAKEVA P5\TakevaProject5\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });