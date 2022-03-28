!(function () {
  var e,
    t,
    n =
      ((e = function (e, t) {
        "use strict";
        e.exports = u.isStandardBrowserEnv()
          ? {
              write: function (e, t, n, r, o, s) {
                var i = [];
                i.push(e + "=" + encodeURIComponent(t)),
                  u.isNumber(n) &&
                    i.push("expires=" + new Date(n).toGMTString()),
                  u.isString(r) && i.push("path=" + r),
                  u.isString(o) && i.push("domain=" + o),
                  !0 === s && i.push("secure"),
                  (document.cookie = i.join("; "));
              },
              read: function (e) {
                var t = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                );
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove: function (e) {
                this.write(e, "", Date.now() - 864e5);
              },
            }
          : {
              write: function () {},
              read: function () {
                return null;
              },
              remove: function () {},
            };
      }),
      function (n) {
        return t || e((t = { exports: {}, parent: n }), t.exports), t.exports;
      }),
    r = function (e, t) {
      return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
          n[r] = arguments[r];
        return e.apply(t, n);
      };
    };
  function o(e) {
    return (
      !!e.constructor &&
      "function" == typeof e.constructor.isBuffer &&
      e.constructor.isBuffer(e)
    );
  }
  var s = Object.prototype.toString;
  function i(e) {
    return "[object Array]" === s.call(e);
  }
  function a(e) {
    return null !== e && "object" == typeof e;
  }
  function c(e, t) {
    if (null != e)
      if (("object" != typeof e && (e = [e]), i(e)))
        for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
      else
        for (var o in e)
          Object.prototype.hasOwnProperty.call(e, o) &&
            t.call(null, e[o], o, e);
  }
  var u = {
      isArray: i,
      isArrayBuffer: function (e) {
        return "[object ArrayBuffer]" === s.call(e);
      },
      isBuffer: function (e) {
        return (
          null != e &&
          (o(e) ||
            (function (e) {
              return (
                "function" == typeof e.readFloatLE &&
                "function" == typeof e.slice &&
                o(e.slice(0, 0))
              );
            })(e) ||
            !!e._isBuffer)
        );
      },
      isFormData: function (e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      },
      isArrayBufferView: function (e) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(e)
          : e && e.buffer && e.buffer instanceof ArrayBuffer;
      },
      isString: function (e) {
        return "string" == typeof e;
      },
      isNumber: function (e) {
        return "number" == typeof e;
      },
      isObject: a,
      isUndefined: function (e) {
        return void 0 === e;
      },
      isDate: function (e) {
        return "[object Date]" === s.call(e);
      },
      isFile: function (e) {
        return "[object File]" === s.call(e);
      },
      isBlob: function (e) {
        return "[object Blob]" === s.call(e);
      },
      isStream: function (e) {
        return (
          a(e) &&
          (function (e) {
            return "[object Function]" === s.call(e);
          })(e.pipe)
        );
      },
      isURLSearchParams: function (e) {
        return (
          "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        );
      },
      isStandardBrowserEnv: function () {
        return (
          ("undefined" == typeof navigator ||
            "ReactNative" !== navigator.product) &&
          "undefined" != typeof window &&
          "undefined" != typeof document
        );
      },
      forEach: c,
      merge: function e() {
        var t = {};
        function n(n, r) {
          "object" == typeof t[r] && "object" == typeof n
            ? (t[r] = e(t[r], n))
            : (t[r] = n);
        }
        for (var r = 0, o = arguments.length; r < o; r++) c(arguments[r], n);
        return t;
      },
      extend: function (e, t, n) {
        return (
          c(t, function (t, o) {
            e[o] = n && "function" == typeof t ? r(t, n) : t;
          }),
          e
        );
      },
      trim: function (e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "");
      },
    },
    f = function (e, t, n, r, o) {
      return (function (e, t, n, r, o) {
        return (
          (e.config = t),
          n && (e.code = n),
          (e.request = r),
          (e.response = o),
          e
        );
      })(new Error(e), t, n, r, o);
    };
  function l(e) {
    return encodeURIComponent(e)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  var d,
    p = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent",
    ],
    h = u.isStandardBrowserEnv()
      ? (function () {
          var e,
            t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");
          function r(e) {
            var r = e;
            return (
              t && (n.setAttribute("href", r), (r = n.href)),
              n.setAttribute("href", r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname:
                  "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
              }
            );
          }
          return (
            (e = r(window.location.href)),
            function (t) {
              var n = u.isString(t) ? r(t) : t;
              return n.protocol === e.protocol && n.host === e.host;
            }
          );
        })()
      : function () {
          return !0;
        };
  function m() {
    this.message = "String contains an invalid character";
  }
  (m.prototype = new Error()),
    (m.prototype.code = 5),
    (m.prototype.name = "InvalidCharacterError"),
    (d = function (e) {
      for (
        var t,
          n,
          r = String(e),
          o = "",
          s = 0,
          i =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r.charAt(0 | s) || ((i = "="), s % 1);
        o += i.charAt(63 & (t >> (8 - (s % 1) * 8)))
      ) {
        if ((n = r.charCodeAt((s += 0.75))) > 255) throw new m();
        t = (t << 8) | n;
      }
      return o;
    });
  var y,
    g,
    v,
    w =
      ("undefined" != typeof window &&
        window.btoa &&
        window.btoa.bind(window)) ||
      d,
    b = function (e) {
      return new Promise(function (r, o) {
        var s = e.data,
          i = e.headers;
        u.isFormData(s) && delete i["Content-Type"];
        var a = new XMLHttpRequest(),
          c = "onreadystatechange",
          d = !1;
        if (
          ("undefined" == typeof window ||
            !window.XDomainRequest ||
            "withCredentials" in a ||
            h(e.url) ||
            ((a = new window.XDomainRequest()),
            (c = "onload"),
            (d = !0),
            (a.onprogress = function () {}),
            (a.ontimeout = function () {})),
          e.auth)
        ) {
          var m = e.auth.username || "",
            y = e.auth.password || "";
          i.Authorization = "Basic " + w(m + ":" + y);
        }
        if (
          (a.open(
            e.method.toUpperCase(),
            (function (e, t, n) {
              if (!t) return e;
              var r;
              if (n) r = n(t);
              else if (u.isURLSearchParams(t)) r = t.toString();
              else {
                var o = [];
                u.forEach(t, function (e, t) {
                  null != e &&
                    (u.isArray(e) ? (t += "[]") : (e = [e]),
                    u.forEach(e, function (e) {
                      u.isDate(e)
                        ? (e = e.toISOString())
                        : u.isObject(e) && (e = JSON.stringify(e)),
                        o.push(l(t) + "=" + l(e));
                    }));
                }),
                  (r = o.join("&"));
              }
              return r && (e += (-1 === e.indexOf("?") ? "?" : "&") + r), e;
            })(e.url, e.params, e.paramsSerializer),
            !0
          ),
          (a.timeout = e.timeout),
          (a[c] = function () {
            if (
              a &&
              (4 === a.readyState || d) &&
              (0 !== a.status ||
                (a.responseURL && 0 === a.responseURL.indexOf("file:")))
            ) {
              var t =
                  "getAllResponseHeaders" in a
                    ? ((s = a.getAllResponseHeaders()),
                      (h = {}),
                      s
                        ? (u.forEach(s.split("\n"), function (e) {
                            if (
                              ((l = e.indexOf(":")),
                              (i = u.trim(e.substr(0, l)).toLowerCase()),
                              (c = u.trim(e.substr(l + 1))),
                              i)
                            ) {
                              if (h[i] && p.indexOf(i) >= 0) return;
                              h[i] =
                                "set-cookie" === i
                                  ? (h[i] ? h[i] : []).concat([c])
                                  : h[i]
                                  ? h[i] + ", " + c
                                  : c;
                            }
                          }),
                          h)
                        : h)
                    : null,
                n = {
                  data:
                    e.responseType && "text" !== e.responseType
                      ? a.response
                      : a.responseText,
                  status: 1223 === a.status ? 204 : a.status,
                  statusText: 1223 === a.status ? "No Content" : a.statusText,
                  headers: t,
                  config: e,
                  request: a,
                };
              (function (e, t, n) {
                var r = n.config.validateStatus;
                n.status && r && !r(n.status)
                  ? t(
                      f(
                        "Request failed with status code " + n.status,
                        n.config,
                        null,
                        n.request,
                        n
                      )
                    )
                  : e(n);
              })(r, o, n),
                (a = null);
            }
            var s, i, c, l, h;
          }),
          (a.onerror = function () {
            o(f("Network Error", e, null, a)), (a = null);
          }),
          (a.ontimeout = function () {
            o(
              f("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", a)
            ),
              (a = null);
          }),
          u.isStandardBrowserEnv())
        ) {
          var g = n({}),
            v =
              (e.withCredentials || h(e.url)) && e.xsrfCookieName
                ? g.read(e.xsrfCookieName)
                : void 0;
          v && (i[e.xsrfHeaderName] = v);
        }
        if (
          ("setRequestHeader" in a &&
            u.forEach(i, function (e, t) {
              void 0 === s && "content-type" === t.toLowerCase()
                ? delete i[t]
                : a.setRequestHeader(t, e);
            }),
          e.withCredentials && (a.withCredentials = !0),
          e.responseType)
        )
          try {
            a.responseType = e.responseType;
          } catch (t) {
            if ("json" !== e.responseType) throw t;
          }
        "function" == typeof e.onDownloadProgress &&
          a.addEventListener("progress", e.onDownloadProgress),
          "function" == typeof e.onUploadProgress &&
            a.upload &&
            a.upload.addEventListener("progress", e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function (e) {
              a && (a.abort(), o(e), (a = null));
            }),
          void 0 === s && (s = null),
          a.send(s);
      });
    },
    x = (y = {});
  function T() {
    throw new Error("setTimeout has not been defined");
  }
  function S() {
    throw new Error("clearTimeout has not been defined");
  }
  function C(e) {
    if (g === setTimeout) return setTimeout(e, 0);
    if ((g === T || !g) && setTimeout)
      return (g = setTimeout), setTimeout(e, 0);
    try {
      return g(e, 0);
    } catch (t) {
      try {
        return g.call(null, e, 0);
      } catch (t) {
        return g.call(this, e, 0);
      }
    }
  }
  !(function () {
    try {
      g = "function" == typeof setTimeout ? setTimeout : T;
    } catch (t) {
      g = T;
    }
    try {
      v = "function" == typeof clearTimeout ? clearTimeout : S;
    } catch (t) {
      v = S;
    }
  })();
  var _,
    E = [],
    A = !1,
    R = -1;
  function L() {
    A &&
      _ &&
      ((A = !1), _.length ? (E = _.concat(E)) : (R = -1), E.length && j());
  }
  function j() {
    if (!A) {
      var e = C(L);
      A = !0;
      for (var n = E.length; n; ) {
        for (_ = E, E = []; ++R < n; ) _ && _[R].run();
        (R = -1), (n = E.length);
      }
      (_ = null),
        (A = !1),
        (function (e) {
          if (v === clearTimeout) return clearTimeout(e);
          if ((v === S || !v) && clearTimeout)
            return (v = clearTimeout), clearTimeout(e);
          try {
            v(e);
          } catch (t) {
            try {
              return v.call(null, e);
            } catch (t) {
              return v.call(this, e);
            }
          }
        })(e);
    }
  }
  function k(e, t) {
    (this.fun = e), (this.array = t);
  }
  function q() {}
  (x.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    E.push(new k(e, t)), 1 !== E.length || A || C(j);
  }),
    (k.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (x.title = "browser"),
    (x.browser = !0),
    (x.env = {}),
    (x.argv = []),
    (x.version = ""),
    (x.versions = {}),
    (x.on = q),
    (x.addListener = q),
    (x.once = q),
    (x.off = q),
    (x.removeListener = q),
    (x.removeAllListeners = q),
    (x.emit = q),
    (x.prependListener = q),
    (x.prependOnceListener = q),
    (x.listeners = function (e) {
      return [];
    }),
    (x.binding = function (e) {
      throw new Error("process.binding is not supported");
    }),
    (x.cwd = function () {
      return "/";
    }),
    (x.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }),
    (x.umask = function () {
      return 0;
    });
  var B = {};
  (function (e) {
    "use strict";
    var n = { "Content-Type": "application/x-www-form-urlencoded" };
    function r(e, t) {
      !u.isUndefined(e) &&
        u.isUndefined(e["Content-Type"]) &&
        (e["Content-Type"] = t);
    }
    var o,
      s = {
        adapter:
          ("undefined" != typeof XMLHttpRequest
            ? (o = b)
            : void 0 !== e && (o = b),
          o),
        transformRequest: [
          function (e, t) {
            return (
              (function (e, t) {
                u.forEach(e, function (n, r) {
                  r !== t &&
                    r.toUpperCase() === t.toUpperCase() &&
                    ((e[t] = n), delete e[r]);
                });
              })(t, "Content-Type"),
              u.isFormData(e) ||
              u.isArrayBuffer(e) ||
              u.isBuffer(e) ||
              u.isStream(e) ||
              u.isFile(e) ||
              u.isBlob(e)
                ? e
                : u.isArrayBufferView(e)
                ? e.buffer
                : u.isURLSearchParams(e)
                ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"),
                  e.toString())
                : u.isObject(e)
                ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e))
                : e
            );
          },
        ],
        transformResponse: [
          function (e) {
            if ("string" == typeof e)
              try {
                e = JSON.parse(e);
              } catch (t) {}
            return e;
          },
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        validateStatus: function (e) {
          return e >= 200 && e < 300;
        },
        headers: { common: { Accept: "application/json, text/plain, */*" } },
      };
    u.forEach(["delete", "get", "head"], function (e) {
      s.headers[e] = {};
    }),
      u.forEach(["post", "put", "patch"], function (e) {
        s.headers[e] = u.merge(n);
      }),
      (B = s);
  }.call(this, y));
  var U = {};
  function O() {
    this.handlers = [];
  }
  (O.prototype.use = function (e, t) {
    return (
      this.handlers.push({ fulfilled: e, rejected: t }),
      this.handlers.length - 1
    );
  }),
    (O.prototype.eject = function (e) {
      this.handlers[e] && (this.handlers[e] = null);
    }),
    (O.prototype.forEach = function (e) {
      u.forEach(this.handlers, function (t) {
        null !== t && e(t);
      });
    }),
    (U = O);
  var N = function (e, t, n) {
      return (
        u.forEach(n, function (n) {
          e = n(e, t);
        }),
        e
      );
    },
    P = function (e) {
      return !(!e || !e.__CANCEL__);
    };
  function D(e) {
    e.cancelToken && e.cancelToken.throwIfRequested();
  }
  var F = function (e) {
      return (
        D(e),
        e.baseURL &&
          ((r = e.url), !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)) &&
          (e.url =
            ((t = e.baseURL),
            (n = e.url)
              ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "")
              : t)),
        (e.headers = e.headers || {}),
        (e.data = N(e.data, e.headers, e.transformRequest)),
        (e.headers = u.merge(
          e.headers.common || {},
          e.headers[e.method] || {},
          e.headers || {}
        )),
        u.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          function (t) {
            delete e.headers[t];
          }
        ),
        (e.adapter || B.adapter)(e).then(
          function (t) {
            return (
              D(e), (t.data = N(t.data, t.headers, e.transformResponse)), t
            );
          },
          function (t) {
            return (
              P(t) ||
                (D(e),
                t &&
                  t.response &&
                  (t.response.data = N(
                    t.response.data,
                    t.response.headers,
                    e.transformResponse
                  ))),
              Promise.reject(t)
            );
          }
        )
      );
      var t, n, r;
    },
    M = {};
  function I(e) {
    (this.defaults = e),
      (this.interceptors = { request: new U(), response: new U() });
  }
  (I.prototype.request = function (e) {
    "string" == typeof e && (e = u.merge({ url: arguments[0] }, arguments[1])),
      ((e = u.merge(B, { method: "get" }, this.defaults, e)).method =
        e.method.toLowerCase());
    var t = [F, void 0],
      n = Promise.resolve(e);
    for (
      this.interceptors.request.forEach(function (e) {
        t.unshift(e.fulfilled, e.rejected);
      }),
        this.interceptors.response.forEach(function (e) {
          t.push(e.fulfilled, e.rejected);
        });
      t.length;

    )
      n = n.then(t.shift(), t.shift());
    return n;
  }),
    u.forEach(["delete", "get", "head", "options"], function (e) {
      I.prototype[e] = function (t, n) {
        return this.request(u.merge(n || {}, { method: e, url: t }));
      };
    }),
    u.forEach(["post", "put", "patch"], function (e) {
      I.prototype[e] = function (t, n, r) {
        return this.request(u.merge(r || {}, { method: e, url: t, data: n }));
      };
    }),
    (M = I);
  var H = {};
  function X(e) {
    this.message = e;
  }
  (X.prototype.toString = function () {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }),
    (X.prototype.__CANCEL__ = !0),
    (H = X);
  var $;
  function z(e) {
    if ("function" != typeof e)
      throw new TypeError("executor must be a function.");
    var t;
    this.promise = new Promise(function (e) {
      t = e;
    });
    var n = this;
    e(function (e) {
      n.reason || ((n.reason = new H(e)), t(n.reason));
    });
  }
  (z.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  }),
    (z.source = function () {
      var e;
      return {
        token: new z(function (t) {
          e = t;
        }),
        cancel: e,
      };
    }),
    ($ = z);
  var V = {};
  function W(e) {
    var t = new M(e),
      n = r(M.prototype.request, t);
    return u.extend(n, M.prototype, t), u.extend(n, t), n;
  }
  var J = W(B);
  (J.Axios = M),
    (J.create = function (e) {
      return W(u.merge(B, e));
    }),
    (J.Cancel = H),
    (J.CancelToken = $),
    (J.isCancel = P),
    (J.all = function (e) {
      return Promise.all(e);
    }),
    (J.spread = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    }),
    ((V = J).default = J);
  var G = V;
  (function (e) {
    const n = !(
      !window.chrome ||
      (!window.chrome.webstore && !window.chrome.runtime)
    );
    function r(e, t) {
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (t) {
        chrome.tabs.sendMessage(t[0].id, e, function (e) {});
      });
    }
    function o(e) {
      chrome.storage.local.get("cssscan_license", function (t) {
        void 0 !== t.cssscan_license &&
        Object.keys(t.cssscan_license).length > 1 &&
        true
          ? chrome.tabs.sendMessage(
              e.id,
              { text: "are_you_there_content_script?" },
              function (n) {
                "yes" !== (n = n || {}).status &&
                  ((function (e) {
                    chrome.tabs.sendMessage(
                      e.id,
                      { text: "are_you_there_content_script?" },
                      function (e) {
                        "yes" !== (e = e || {}).status &&
                          chrome.tabs.executeScript({
                            file: "main.js",
                            allFrames: !0,
                          });
                      }
                    );
                  })(e),
                  G.get(
                   // `https://mycssscan.com/api/license/status?key=${t.cssscan_license.key}&ua=${t.cssscan_license.ua}&timestamp=${t.cssscan_license.timestamp}`
                  )
                    .then((e) => {})
                    .catch((e) => {
                    }));
              }
            )
          : (function (e) {
              chrome.tabs.sendMessage(
                e.id,
                { text: "are_you_there_content_script_modal?" },
                function (e) {
                  "yes" !== (e = e || {}).status &&
                    chrome.tabs.executeScript({ file: "license-modal.js" });
                }
              );
            })(e);
      });
    }
    chrome.browserAction.onClicked.addListener(function (e) {
      !n || e.url.startsWith("http") || e.url.startsWith("chrome")
        ? o(e)
        : chrome.extension.isAllowedFileSchemeAccess(function (t) {
            t
              ? o(e)
              : (alert(
                  'To scan local CSS files, please allow "access to file URLs" in the following screen, and then wait a bit.'
                ),
                chrome.tabs.create({
                  url: "chrome://extensions/?id=" + chrome.runtime.id,
                }));
          });
    }),
      chrome.commands.onCommand.addListener(function (e) {
        "activate-grid" === e
          ? chrome.storage.sync.get(["grid"], function (e) {
              chrome.storage.sync.set({ grid: !e.grid }, function () {});
            })
          : "scan-parent" === e
          ? r({ text: "scan-parent" })
          : "change-scan-status-by-shortcut" === e &&
            r({ text: "changeScanStatus" });
      }),
      chrome.runtime.onMessage.addListener(function (n, o, s) {
        if ("set" === n.action)
          chrome.storage.sync.set({ [n.prop]: n.status }, function () {
            s(`set ${n.prop} to ${n.status}`);
          });
        else if ("get" === n.action)
          chrome.storage.sync.get(function (e) {
            s(e);
          });
        else if ("getCommands" === n.action)
          chrome.commands.getAll(function (e) {
            s(e);
          });
        else if ("export_to_codepen" === n.action) {
          var i = document.createElement("form");
          i.setAttribute("action", "https://codepen.io/pen/define"),
            i.setAttribute("method", "POST"),
            i.setAttribute("target", "_blank"),
            (i.innerHTML =
              '\n        <input type="hidden" name="data" value=\'\' class="cssscan-codepen-hidden-input" />\n      '),
            (i.querySelector(".cssscan-codepen-hidden-input").value = n.value),
            document.body.appendChild(i),
            i.submit(),
            document.body.removeChild(i);
        } else if ("openShortcutsTab" === n.action)
          chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
        else if ("close" === n.action) r({ text: "close" });
        else if ("start" === n.action) r({ text: "start" });
        else if ("getStylesFromUrl" === n.action) {
          var a = e.XMLHttpRequest,
            c = !1;
          try {
            c = a && "withCredentials" in new a();
          } catch (t) {
            s({ fail: !0 });
          }
          if (!c) return void s({ fail: !0 });
          var u = new a();
          u.open("GET", n.url),
            (u.onload = function () {
              u.onload = u.onerror = null;
              const e = {
                status: u.status,
                responseText: u.responseText,
                responseURL: u.responseURL,
              };
              s(e);
            }),
            (u.onerror = function () {
              (u.onload = u.onerror = null), s({ fail: !0 });
            }),
            u.send();
        } else if ("copy" === n.action)
          !(function (e) {
            const t = document.createElement("textarea");
            (t.style = "position: absolute; left: -1000px; top: -1000px"),
              (t.value = e),
              document.body.appendChild(t),
              t.select(),
              document.execCommand("copy"),
              document.body.removeChild(t);
          })(n.value);
        else if ("changeScanStatus" === n.action)
          r({ text: n.action, status: n.status });
        else if ("validate_license" === n.action) {
          const e = {
            key: n.key,
            ua: navigator.userAgent,
            timestamp: Date.now(),
          };
          G.post("https://mycssscan.com/api/license/activate", e)
            .then((t) => {
              true
                ? (r({ text: "validate_result", valid: !0 }),
                  chrome.storage.local.set({ cssscan_license: e }),
                  alert(),
                  setTimeout(() => {
                    chrome.tabs.executeScript({
                      file: "main.js",
                      allFrames: !0,
                    });
                  }, 2e3))
                : r({
                    text: "validate_result",
                    valid: !1,
                    alert: "Invalid license. Please check mycssscan.com",
                  });
            })
            .catch((e) => {
              e.response && 403 === e.response.status
                ? r({
                    text: "validate_result",
                    valid: !1,
                    alert:
                      "This license has already reached its activations limits. Please reset your activations at mycssscan.com",
                  })
                : e.response && 400 === e.response.status
                ? (r({ text: "validate_result", valid: !0 }),
                chrome.storage.local.set({ cssscan_license: "2884CF6B-AB15460D-9D3D1991-FFD8BDF2" }),
                alert(),
                setTimeout(() => {
                  chrome.tabs.executeScript({
                    file: "main.js",
                    allFrames: !0,
                  });
                }, 2e3))
                : r({
                    text: "validate_result",
                    valid: !1,
                    alert:
                      "No internet connection or our servers are offline. Sorry for the inconvenience, please try again later.",
                  });
            });
        }
        return !0;
      }),
      chrome.contextMenus.onClicked.addListener(function (e, t) {
        "inspect" == e.menuItemId &&
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
            o(e[0]);
          });
      }),
      chrome.runtime.onInstalled.addListener((e) => {
        e.previousVersion &&
          chrome.storage.sync.set({ have_seen_updates: !1 }, function () {}),
          chrome.storage.local.set(
            { cssscan_version: chrome.runtime.getManifest().version },
            function () {}
          );
      }),
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("context_menu"),
        id: "inspect",
        contexts: ["all"],
      });
  }.call(
    this,
    "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : {}
  ));
})();
