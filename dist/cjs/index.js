"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _youtubei = require("youtubei.js");
var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));
var _nodeId = _interopRequireDefault(require("node-id3"));
var _fs = _interopRequireDefault(require("fs"));
var _axios = _interopRequireDefault(require("axios"));
var _crypto = require("crypto");
var _os = _interopRequireDefault(require("os"));
var _YT;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(r) { var n = this.s["return"]; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, "throw": function _throw(r) { var n = this.s["return"]; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); } // YTLibrary.js
var ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;
var YT = /*#__PURE__*/function () {
  function YT() {
    _classCallCheck(this, YT);
  }
  return _createClass(YT, null, [{
    key: "initialize",
    value: (
    /**
     * Initialize YouTube session with OAuth
     */
    function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _youtubei.Innertube.create({
                cache: new _youtubei.UniversalCache(true, './.cacheyt'),
                lang: "id",
                location: "ID",
                po_token: "MnRIyCty0e1cM0jw_X5014gaOjRKE_H5n5thmesUHgHlstID9UlnpzLlXbYLHjuJQ0iEr6SW8syTdHrAQj2bZGp7dSCPtdCI0jTV1kRDi3MGl77WtiKxoPGQsK0DvO-VeGe0s1SBlwZ5proGOGsFwFNFMRLnQw==",
                visitor_data: "CgtWdlhyeTZZX2drbyj2seK1BjIKCgJTRxIEGgAgVw%3D%3D"
              });
            case 2:
              this.yt = _context2.sent;
              this.yt.session.on('auth-pending', function (data) {
                console.log("Go to ".concat(data.verification_url, " in your browser and enter code ").concat(data.user_code, " to authenticate."));
              });
              this.yt.session.on('auth', function (_ref) {
                var credentials = _ref.credentials;
                console.log('Sign in successful:', credentials);
              });
              this.yt.session.on('update-credentials', /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref2) {
                  var credentials;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        credentials = _ref2.credentials;
                        console.log('Credentials updated:', credentials);
                        _context.next = 4;
                        return _this.yt.session.oauth.cacheCredentials();
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref3.apply(this, arguments);
                };
              }());
              _context2.next = 8;
              return this.yt.session.signIn();
            case 8:
              _context2.next = 10;
              return this.yt.session.oauth.cacheCredentials();
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Checks if it is yt link
     * @param {string|URL} url youtube url
     * @returns Returns true if the given YouTube URL.
     */
    )
  }]);
}();
_YT = YT;
_defineProperty(YT, "yt", void 0);
_defineProperty(YT, "isYTUrl", function (url) {
  return ytIdRegex.test(url);
});
/**
 * VideoID from url
 * @param {string|URL} url to get videoID
 * @returns 
 */
_defineProperty(YT, "fetchBuffer", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url, options) {
    var res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          options ? options : {};
          _context3.next = 4;
          return (0, _axios["default"])(_objectSpread(_objectSpread({
            method: "GET",
            url: url,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
              'DNT': 1,
              'Upgrade-Insecure-Request': 1
            }
          }, options), {}, {
            responseType: 'arraybuffer'
          }));
        case 4:
          res = _context3.sent;
          return _context3.abrupt("return", res.data);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function (_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(YT, "getVideoID", function (url) {
  if (!_YT.isYTUrl(url)) throw new Error('is not YouTube URL');
  return ytIdRegex.exec(url)[1];
});
/**
 * Write Track Tag Metadata
 * @param {string} filePath 
 * @param {IMetadata} Metadata 
 */
_defineProperty(YT, "WriteTags", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(filePath, Metadata) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = _nodeId["default"];
          _context4.t1 = Metadata.Title;
          _context4.t2 = Metadata.Artist;
          _context4.t3 = Metadata.Artist;
          _context4.t4 = {
            id: 3,
            name: 'front cover'
          };
          _context4.next = 7;
          return _YT.fetchBuffer(Metadata.Image);
        case 7:
          _context4.t5 = _context4.sent.buffer;
          _context4.t6 = "Cover of ".concat(Metadata.Title);
          _context4.t7 = {
            mime: 'jpeg',
            type: _context4.t4,
            imageBuffer: _context4.t5,
            description: _context4.t6
          };
          _context4.t8 = Metadata.Album;
          _context4.t9 = Metadata.Year || '';
          _context4.t10 = {
            title: _context4.t1,
            artist: _context4.t2,
            originalArtist: _context4.t3,
            image: _context4.t7,
            album: _context4.t8,
            year: _context4.t9
          };
          _context4.t11 = filePath;
          _context4.t0.write.call(_context4.t0, _context4.t10, _context4.t11);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * @param {string} query 
 * @returns 
 */
_defineProperty(YT, "play", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(query) {
    var options,
      hasils,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          _context5.next = 3;
          return _YT.yt.search(query);
        case 3:
          hasils = _context5.sent;
          return _context5.abrupt("return", hasils);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * search track with details
 * @param {string} query 
 * @returns {Promise<TrackSearchResult[]>}
 */
_defineProperty(YT, "searchTrack", function (query) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var ytMusic, result, i;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _YT.yt.music.search(query);
          case 3:
            ytMusic = _context6.sent;
            result = [];
            for (i = 0; i < ytMusic.results.length; i++) {
              result.push({
                isYtMusic: true,
                title: "".concat(ytMusic.results[i].title, " - ").concat(ytMusic.results[i].artists.map(function (x) {
                  return x.name;
                }).join(' ')),
                artist: ytMusic.results[i].artists.map(function (x) {
                  return x.name;
                }).join(' '),
                id: ytMusic.results[i].id,
                url: 'https://youtu.be/' + ytMusic.results[i].id,
                album: ytMusic.results[i].album.name,
                duration: {
                  seconds: ytMusic.results[i].duration.seconds,
                  label: ytMusic.results[i].duration.text
                },
                image: ytMusic.results[i].thumbnail.contents[0].url.replace('w120-h120', 'w600-h600')
              });
            }
            resolve(result);
            _context6.next = 12;
            break;
          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 9]]);
    }));
    return function (_x7, _x8) {
      return _ref7.apply(this, arguments);
    };
  }());
});
/**
 * Download music with full tag metadata
 * @param {string|TrackSearchResult[]} query title of track want to download
 * @returns {Promise<MusicResult>} filepath of the result
 */
_defineProperty(YT, "downloadMusic", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(query) {
    var getTrack, search, videoInfo, options, stream, tmpDir, songPath, file;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (!Array.isArray(query)) {
            _context7.next = 5;
            break;
          }
          _context7.t0 = query;
          _context7.next = 8;
          break;
        case 5:
          _context7.next = 7;
          return _YT.searchTrack(query);
        case 7:
          _context7.t0 = _context7.sent;
        case 8:
          getTrack = _context7.t0;
          search = getTrack[0];
          if (_YT.yt) {
            _context7.next = 12;
            break;
          }
          throw new Error('YouTube instance is not initialized');
        case 12:
          _context7.next = 14;
          return _YT.yt.getInfo(search.id);
        case 14:
          videoInfo = _context7.sent;
          options = {
            type: 'audio',
            quality: 'best',
            format: 'mp4'
          };
          stream = _YT.yt.download(search.id, options);
          tmpDir = _os["default"].tmpdir();
          songPath = "".concat(tmpDir, "/").concat((0, _crypto.randomBytes)(3).toString('hex'), ".mp3");
          stream.on('error', function (err) {
            return console.log(err);
          });
          _context7.next = 22;
          return new Promise(function (resolve) {
            (0, _fluentFfmpeg["default"])(stream).audioFrequency(44100).audioChannels(2).audioBitrate(128).audioCodec('libmp3lame').audioQuality(5).toFormat('mp3').save(songPath).on('end', function () {
              return resolve(songPath);
            });
          });
        case 22:
          file = _context7.sent;
          _context7.next = 25;
          return _YT.WriteTags(file, {
            Title: search.title,
            Artist: search.artist,
            Image: search.image,
            Album: search.album,
            Year: videoInfo.primary_info.relative_date.text
          });
        case 25:
          return _context7.abrupt("return", {
            meta: search,
            path: file,
            size: _fs["default"].statSync(songPath).size
          });
        case 28:
          _context7.prev = 28;
          _context7.t1 = _context7["catch"](0);
          throw new Error(_context7.t1);
        case 31:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 28]]);
  }));
  return function (_x9) {
    return _ref8.apply(this, arguments);
  };
}());
/**
 * get downloadable video urls
 * @param {string|URL} query videoID or YouTube URL
 * @param {string} quality 
 * @returns
 */
_defineProperty(YT, "mp4", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(query) {
    var quality,
      videoId,
      videoInfo,
      options,
      stream,
      format,
      tmpDir,
      videoPath,
      writeStream,
      _iteratorAbruptCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      chunk,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          quality = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 134;
          _context8.prev = 1;
          if (query) {
            _context8.next = 4;
            break;
          }
          throw new Error('Video ID or YouTube Url is required');
        case 4:
          videoId = _YT.isYTUrl(query) ? _YT.getVideoID(query) : query;
          if (_YT.yt) {
            _context8.next = 7;
            break;
          }
          throw new Error('YouTube instance is not initialized');
        case 7:
          _context8.next = 9;
          return _YT.yt.getInfo(videoId);
        case 9:
          videoInfo = _context8.sent;
          options = {
            type: 'video+audio',
            quality: 'best',
            format: 'mp4'
          };
          _context8.next = 13;
          return _YT.yt.download(videoId, options);
        case 13:
          stream = _context8.sent;
          format = videoInfo.chooseFormat(options);
          tmpDir = _os["default"].tmpdir();
          videoPath = "".concat(tmpDir, "/").concat((0, _crypto.randomBytes)(3).toString('hex'), ".mp4");
          writeStream = _fs["default"].createWriteStream(videoPath);
          _iteratorAbruptCompletion = false;
          _didIteratorError = false;
          _context8.prev = 20;
          _iterator = _asyncIterator(_youtubei.Utils.streamToIterable(stream));
        case 22:
          _context8.next = 24;
          return _iterator.next();
        case 24:
          if (!(_iteratorAbruptCompletion = !(_step = _context8.sent).done)) {
            _context8.next = 30;
            break;
          }
          chunk = _step.value;
          writeStream.write(chunk);
        case 27:
          _iteratorAbruptCompletion = false;
          _context8.next = 22;
          break;
        case 30:
          _context8.next = 36;
          break;
        case 32:
          _context8.prev = 32;
          _context8.t0 = _context8["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context8.t0;
        case 36:
          _context8.prev = 36;
          _context8.prev = 37;
          if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
            _context8.next = 41;
            break;
          }
          _context8.next = 41;
          return _iterator["return"]();
        case 41:
          _context8.prev = 41;
          if (!_didIteratorError) {
            _context8.next = 44;
            break;
          }
          throw _iteratorError;
        case 44:
          return _context8.finish(41);
        case 45:
          return _context8.finish(36);
        case 46:
          return _context8.abrupt("return", {
            title: videoInfo.basic_info.title,
            thumb: videoInfo.basic_info.thumbnail[0].url,
            date: videoInfo.primary_info.relative_date.text,
            duration: videoInfo.basic_info.duration,
            channel: videoInfo.basic_info.author,
            quality: format.quality,
            contentLength: format.content_length,
            description: videoInfo.basic_info.short_description,
            videoUrl: videoPath
          });
        case 49:
          _context8.prev = 49;
          _context8.t1 = _context8["catch"](1);
          throw _context8.t1;
        case 52:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 49], [20, 32, 36, 46], [37,, 41, 45]]);
  }));
  return function (_x10) {
    return _ref9.apply(this, arguments);
  };
}());
/**
 * Download YouTube to mp3
 * @param {string|URL} url YouTube link want to download to mp3
 * @param {IMetadata} metadata track metadata
 * @param {boolean} autoWriteTags if set true, it will auto write tags meta following the YouTube info
 * @returns 
 */
_defineProperty(YT, "mp3", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(query) {
    var quality,
      videoId,
      videoInfo,
      options,
      stream,
      tmpDir,
      tempVideoPath,
      videoWriteStream,
      _iteratorAbruptCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      chunk,
      songPath,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          quality = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'high';
          _context9.prev = 1;
          if (query) {
            _context9.next = 4;
            break;
          }
          throw new Error('Video ID or YouTube URL is required');
        case 4:
          videoId = _YT.isYTUrl(query) ? _YT.getVideoID(query) : query;
          if (_YT.yt) {
            _context9.next = 7;
            break;
          }
          throw new Error('YouTube instance is not initialized');
        case 7:
          _context9.next = 9;
          return _YT.yt.getInfo(videoId);
        case 9:
          videoInfo = _context9.sent;
          options = {
            type: 'video+audio',
            quality: 'best',
            format: 'mp4'
          };
          _context9.next = 13;
          return _YT.yt.download(videoId, options);
        case 13:
          stream = _context9.sent;
          tmpDir = _os["default"].tmpdir();
          tempVideoPath = "".concat(tmpDir, "/").concat((0, _crypto.randomBytes)(3).toString('hex'), ".mp4");
          videoWriteStream = _fs["default"].createWriteStream(tempVideoPath); // Gabungkan semua chunk menjadi satu file MP4 sementara
          _iteratorAbruptCompletion2 = false;
          _didIteratorError2 = false;
          _context9.prev = 19;
          _iterator2 = _asyncIterator(_youtubei.Utils.streamToIterable(stream));
        case 21:
          _context9.next = 23;
          return _iterator2.next();
        case 23:
          if (!(_iteratorAbruptCompletion2 = !(_step2 = _context9.sent).done)) {
            _context9.next = 29;
            break;
          }
          chunk = _step2.value;
          videoWriteStream.write(chunk);
        case 26:
          _iteratorAbruptCompletion2 = false;
          _context9.next = 21;
          break;
        case 29:
          _context9.next = 35;
          break;
        case 31:
          _context9.prev = 31;
          _context9.t0 = _context9["catch"](19);
          _didIteratorError2 = true;
          _iteratorError2 = _context9.t0;
        case 35:
          _context9.prev = 35;
          _context9.prev = 36;
          if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
            _context9.next = 40;
            break;
          }
          _context9.next = 40;
          return _iterator2["return"]();
        case 40:
          _context9.prev = 40;
          if (!_didIteratorError2) {
            _context9.next = 43;
            break;
          }
          throw _iteratorError2;
        case 43:
          return _context9.finish(40);
        case 44:
          return _context9.finish(35);
        case 45:
          videoWriteStream.end();

          // Buat file MP3 output
          songPath = "".concat(tmpDir, "/").concat((0, _crypto.randomBytes)(3).toString('hex'), ".mp3"); // Konversi file MP4 sementara menjadi MP3
          _context9.next = 49;
          return new Promise(function (resolve, reject) {
            (0, _fluentFfmpeg["default"])(tempVideoPath) // Menggunakan file video sementara sebagai input
            .audioFrequency(44100) // Frekuensi audio (sample rate)
            .audioChannels(2) // Jumlah channel audio
            .audioBitrate(128) // Bitrate audio
            .audioCodec('libmp3lame') // Codec audio untuk MP3
            .audioQuality(5) // Kualitas audio
            .toFormat('mp3') // Format output MP3
            .save(songPath) // Menyimpan output ke file MP3
            .on('end', function () {
              return resolve(songPath);
            }) // Resolusi setelah selesai
            .on('error', reject); // Menangani error
          });
        case 49:
          _fs["default"].unlinkSync(tempVideoPath);
          return _context9.abrupt("return", {
            title: videoInfo.basic_info.title,
            thumb: videoInfo.basic_info.thumbnail[0].url,
            date: videoInfo.primary_info.relative_date.text,
            duration: videoInfo.basic_info.duration,
            channel: videoInfo.basic_info.author,
            quality: quality,
            description: videoInfo.basic_info.short_description,
            audioUrl: songPath
          });
        case 53:
          _context9.prev = 53;
          _context9.t1 = _context9["catch"](1);
          throw _context9.t1;
        case 56:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 53], [19, 31, 35, 45], [36,, 40, 44]]);
  }));
  return function (_x11) {
    return _ref10.apply(this, arguments);
  };
}());
var _default = exports["default"] = YT;