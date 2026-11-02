import qrcode from "qrcode-generator";
var _f = Object.defineProperty;
var Pf = (e, t, n) =>
  t in e
    ? _f(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var W = (e, t, n) => Pf(e, typeof t != "symbol" ? t + "" : t, n);
function Tf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const s = Object.getOwnPropertyDescriptor(r, l);
          s &&
            Object.defineProperty(
              e,
              l,
              s.get ? s : { enumerable: !0, get: () => r[l] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const s of l)
      if (s.type === "childList")
        for (const a of s.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const s = {};
    return (
      l.integrity && (s.integrity = l.integrity),
      l.referrerPolicy && (s.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const s = n(l);
    fetch(l.href, s);
  }
})();
function Rf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var _u = { exports: {} },
  es = {},
  Pu = { exports: {} },
  O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fr = Symbol.for("react.element"),
  zf = Symbol.for("react.portal"),
  Lf = Symbol.for("react.fragment"),
  Mf = Symbol.for("react.strict_mode"),
  bf = Symbol.for("react.profiler"),
  $f = Symbol.for("react.provider"),
  Ff = Symbol.for("react.context"),
  If = Symbol.for("react.forward_ref"),
  Af = Symbol.for("react.suspense"),
  Of = Symbol.for("react.memo"),
  Df = Symbol.for("react.lazy"),
  no = Symbol.iterator;
function Bf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (no && e[no]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Tu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ru = Object.assign,
  zu = {};
function An(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = zu),
    (this.updater = n || Tu);
}
An.prototype.isReactComponent = {};
An.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
An.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Lu() {}
Lu.prototype = An.prototype;
function Yi(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = zu),
    (this.updater = n || Tu);
}
var Xi = (Yi.prototype = new Lu());
Xi.constructor = Yi;
Ru(Xi, An.prototype);
Xi.isPureReactComponent = !0;
var ro = Array.isArray,
  Mu = Object.prototype.hasOwnProperty,
  Ji = { current: null },
  bu = { key: !0, ref: !0, __self: !0, __source: !0 };
function $u(e, t, n) {
  var r,
    l = {},
    s = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (s = "" + t.key),
    t))
      Mu.call(t, r) && !bu.hasOwnProperty(r) && (l[r] = t[r]);
  var o = arguments.length - 2;
  if (o === 1) l.children = n;
  else if (1 < o) {
    for (var u = Array(o), c = 0; c < o; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((o = e.defaultProps), o)) l[r] === void 0 && (l[r] = o[r]);
  return {
    $$typeof: Fr,
    type: e,
    key: s,
    ref: a,
    props: l,
    _owner: Ji.current,
  };
}
function Uf(e, t) {
  return {
    $$typeof: Fr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ea(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Fr;
}
function Vf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var lo = /\/+/g;
function Ns(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Vf("" + e.key)
    : t.toString(36);
}
function fl(e, t, n, r, l) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (s) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Fr:
          case zf:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (l = l(a)),
      (e = r === "" ? "." + Ns(a, 0) : r),
      ro(l)
        ? ((n = ""),
          e != null && (n = e.replace(lo, "$&/") + "/"),
          fl(l, t, n, "", function (c) {
            return c;
          }))
        : l != null &&
          (ea(l) &&
            (l = Uf(
              l,
              n +
                (!l.key || (a && a.key === l.key)
                  ? ""
                  : ("" + l.key).replace(lo, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), ro(e)))
    for (var o = 0; o < e.length; o++) {
      s = e[o];
      var u = r + Ns(s, o);
      a += fl(s, t, n, u, l);
    }
  else if (((u = Bf(e)), typeof u == "function"))
    for (e = u.call(e), o = 0; !(s = e.next()).done; )
      (s = s.value), (u = r + Ns(s, o++)), (a += fl(s, t, n, u, l));
  else if (s === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return a;
}
function Kr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    fl(e, r, "", "", function (s) {
      return t.call(n, s, l++);
    }),
    r
  );
}
function Hf(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ne = { current: null },
  pl = { transition: null },
  Wf = {
    ReactCurrentDispatcher: Ne,
    ReactCurrentBatchConfig: pl,
    ReactCurrentOwner: Ji,
  };
function Fu() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = {
  map: Kr,
  forEach: function (e, t, n) {
    Kr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Kr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Kr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ea(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
O.Component = An;
O.Fragment = Lf;
O.Profiler = bf;
O.PureComponent = Yi;
O.StrictMode = Mf;
O.Suspense = Af;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wf;
O.act = Fu;
O.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Ru({}, e.props),
    l = e.key,
    s = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((s = t.ref), (a = Ji.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var o = e.type.defaultProps;
    for (u in t)
      Mu.call(t, u) &&
        !bu.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && o !== void 0 ? o[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    o = Array(u);
    for (var c = 0; c < u; c++) o[c] = arguments[c + 2];
    r.children = o;
  }
  return { $$typeof: Fr, type: e.type, key: l, ref: s, props: r, _owner: a };
};
O.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ff,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: $f, _context: e }),
    (e.Consumer = e)
  );
};
O.createElement = $u;
O.createFactory = function (e) {
  var t = $u.bind(null, e);
  return (t.type = e), t;
};
O.createRef = function () {
  return { current: null };
};
O.forwardRef = function (e) {
  return { $$typeof: If, render: e };
};
O.isValidElement = ea;
O.lazy = function (e) {
  return { $$typeof: Df, _payload: { _status: -1, _result: e }, _init: Hf };
};
O.memo = function (e, t) {
  return { $$typeof: Of, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function (e) {
  var t = pl.transition;
  pl.transition = {};
  try {
    e();
  } finally {
    pl.transition = t;
  }
};
O.unstable_act = Fu;
O.useCallback = function (e, t) {
  return Ne.current.useCallback(e, t);
};
O.useContext = function (e) {
  return Ne.current.useContext(e);
};
O.useDebugValue = function () {};
O.useDeferredValue = function (e) {
  return Ne.current.useDeferredValue(e);
};
O.useEffect = function (e, t) {
  return Ne.current.useEffect(e, t);
};
O.useId = function () {
  return Ne.current.useId();
};
O.useImperativeHandle = function (e, t, n) {
  return Ne.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function (e, t) {
  return Ne.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function (e, t) {
  return Ne.current.useLayoutEffect(e, t);
};
O.useMemo = function (e, t) {
  return Ne.current.useMemo(e, t);
};
O.useReducer = function (e, t, n) {
  return Ne.current.useReducer(e, t, n);
};
O.useRef = function (e) {
  return Ne.current.useRef(e);
};
O.useState = function (e) {
  return Ne.current.useState(e);
};
O.useSyncExternalStore = function (e, t, n) {
  return Ne.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function () {
  return Ne.current.useTransition();
};
O.version = "18.3.1";
Pu.exports = O;
var m = Pu.exports;
const Qf = Rf(m),
  qf = Tf({ __proto__: null, default: Qf }, [m]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kf = m,
  Gf = Symbol.for("react.element"),
  Zf = Symbol.for("react.fragment"),
  Yf = Object.prototype.hasOwnProperty,
  Xf = Kf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Jf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Iu(e, t, n) {
  var r,
    l = {},
    s = null,
    a = null;
  n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (r in t) Yf.call(t, r) && !Jf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Gf,
    type: e,
    key: s,
    ref: a,
    props: l,
    _owner: Xf.current,
  };
}
es.Fragment = Zf;
es.jsx = Iu;
es.jsxs = Iu;
_u.exports = es;
var i = _u.exports,
  Au = { exports: {} },
  Oe = {},
  Ou = { exports: {} },
  Du = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(C, $) {
    var I = C.length;
    C.push($);
    e: for (; 0 < I; ) {
      var te = (I - 1) >>> 1,
        ae = C[te];
      if (0 < l(ae, $)) (C[te] = $), (C[I] = ae), (I = te);
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var $ = C[0],
      I = C.pop();
    if (I !== $) {
      C[0] = I;
      e: for (var te = 0, ae = C.length, Qr = ae >>> 1; te < Qr; ) {
        var Vt = 2 * (te + 1) - 1,
          Cs = C[Vt],
          Ht = Vt + 1,
          qr = C[Ht];
        if (0 > l(Cs, I))
          Ht < ae && 0 > l(qr, Cs)
            ? ((C[te] = qr), (C[Ht] = I), (te = Ht))
            : ((C[te] = Cs), (C[Vt] = I), (te = Vt));
        else if (Ht < ae && 0 > l(qr, I)) (C[te] = qr), (C[Ht] = I), (te = Ht);
        else break e;
      }
    }
    return $;
  }
  function l(C, $) {
    var I = C.sortIndex - $.sortIndex;
    return I !== 0 ? I : C.id - $.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var a = Date,
      o = a.now();
    e.unstable_now = function () {
      return a.now() - o;
    };
  }
  var u = [],
    c = [],
    f = 1,
    h = null,
    g = 3,
    y = !1,
    k = !1,
    S = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(C) {
    for (var $ = n(c); $ !== null; ) {
      if ($.callback === null) r(c);
      else if ($.startTime <= C)
        r(c), ($.sortIndex = $.expirationTime), t(u, $);
      else break;
      $ = n(c);
    }
  }
  function w(C) {
    if (((S = !1), v(C), !k))
      if (n(u) !== null) (k = !0), Me(j);
      else {
        var $ = n(c);
        $ !== null && we(w, $.startTime - C);
      }
  }
  function j(C, $) {
    (k = !1), S && ((S = !1), d(E), (E = -1)), (y = !0);
    var I = g;
    try {
      for (
        v($), h = n(u);
        h !== null && (!(h.expirationTime > $) || (C && !b()));

      ) {
        var te = h.callback;
        if (typeof te == "function") {
          (h.callback = null), (g = h.priorityLevel);
          var ae = te(h.expirationTime <= $);
          ($ = e.unstable_now()),
            typeof ae == "function" ? (h.callback = ae) : h === n(u) && r(u),
            v($);
        } else r(u);
        h = n(u);
      }
      if (h !== null) var Qr = !0;
      else {
        var Vt = n(c);
        Vt !== null && we(w, Vt.startTime - $), (Qr = !1);
      }
      return Qr;
    } finally {
      (h = null), (g = I), (y = !1);
    }
  }
  var _ = !1,
    N = null,
    E = -1,
    L = 5,
    T = -1;
  function b() {
    return !(e.unstable_now() - T < L);
  }
  function ie() {
    if (N !== null) {
      var C = e.unstable_now();
      T = C;
      var $ = !0;
      try {
        $ = N(!0, C);
      } finally {
        $ ? he() : ((_ = !1), (N = null));
      }
    } else _ = !1;
  }
  var he;
  if (typeof p == "function")
    he = function () {
      p(ie);
    };
  else if (typeof MessageChannel < "u") {
    var M = new MessageChannel(),
      H = M.port2;
    (M.port1.onmessage = ie),
      (he = function () {
        H.postMessage(null);
      });
  } else
    he = function () {
      x(ie, 0);
    };
  function Me(C) {
    (N = C), _ || ((_ = !0), he());
  }
  function we(C, $) {
    E = x(function () {
      C(e.unstable_now());
    }, $);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (C) {
      C.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || y || ((k = !0), Me(j));
    }),
    (e.unstable_forceFrameRate = function (C) {
      0 > C || 125 < C
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (L = 0 < C ? Math.floor(1e3 / C) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (C) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = g;
      }
      var I = g;
      g = $;
      try {
        return C();
      } finally {
        g = I;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (C, $) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var I = g;
      g = C;
      try {
        return $();
      } finally {
        g = I;
      }
    }),
    (e.unstable_scheduleCallback = function (C, $, I) {
      var te = e.unstable_now();
      switch (
        (typeof I == "object" && I !== null
          ? ((I = I.delay), (I = typeof I == "number" && 0 < I ? te + I : te))
          : (I = te),
        C)
      ) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return (
        (ae = I + ae),
        (C = {
          id: f++,
          callback: $,
          priorityLevel: C,
          startTime: I,
          expirationTime: ae,
          sortIndex: -1,
        }),
        I > te
          ? ((C.sortIndex = I),
            t(c, C),
            n(u) === null &&
              C === n(c) &&
              (S ? (d(E), (E = -1)) : (S = !0), we(w, I - te)))
          : ((C.sortIndex = ae), t(u, C), k || y || ((k = !0), Me(j))),
        C
      );
    }),
    (e.unstable_shouldYield = b),
    (e.unstable_wrapCallback = function (C) {
      var $ = g;
      return function () {
        var I = g;
        g = $;
        try {
          return C.apply(this, arguments);
        } finally {
          g = I;
        }
      };
    });
})(Du);
Ou.exports = Du;
var ep = Ou.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tp = m,
  Ae = ep;
function P(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Bu = new Set(),
  vr = {};
function ln(e, t) {
  Rn(e, t), Rn(e + "Capture", t);
}
function Rn(e, t) {
  for (vr[e] = t, e = 0; e < t.length; e++) Bu.add(t[e]);
}
var ht = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Xs = Object.prototype.hasOwnProperty,
  np =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  so = {},
  io = {};
function rp(e) {
  return Xs.call(io, e)
    ? !0
    : Xs.call(so, e)
      ? !1
      : np.test(e)
        ? (io[e] = !0)
        : ((so[e] = !0), !1);
}
function lp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function sp(e, t, n, r) {
  if (t === null || typeof t > "u" || lp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ee(e, t, n, r, l, s, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = a);
}
var pe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    pe[e] = new Ee(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  pe[t] = new Ee(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  pe[e] = new Ee(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  pe[e] = new Ee(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    pe[e] = new Ee(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  pe[e] = new Ee(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  pe[e] = new Ee(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  pe[e] = new Ee(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  pe[e] = new Ee(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ta = /[\-:]([a-z])/g;
function na(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ta, na);
    pe[t] = new Ee(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ta, na);
    pe[t] = new Ee(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ta, na);
  pe[t] = new Ee(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  pe[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
pe.xlinkHref = new Ee(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  pe[e] = new Ee(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ra(e, t, n, r) {
  var l = pe.hasOwnProperty(t) ? pe[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (sp(t, n, l, r) && (n = null),
    r || l === null
      ? rp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var yt = tp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Gr = Symbol.for("react.element"),
  dn = Symbol.for("react.portal"),
  fn = Symbol.for("react.fragment"),
  la = Symbol.for("react.strict_mode"),
  Js = Symbol.for("react.profiler"),
  Uu = Symbol.for("react.provider"),
  Vu = Symbol.for("react.context"),
  sa = Symbol.for("react.forward_ref"),
  ei = Symbol.for("react.suspense"),
  ti = Symbol.for("react.suspense_list"),
  ia = Symbol.for("react.memo"),
  wt = Symbol.for("react.lazy"),
  Hu = Symbol.for("react.offscreen"),
  ao = Symbol.iterator;
function Un(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ao && e[ao]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var X = Object.assign,
  Es;
function er(e) {
  if (Es === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Es = (t && t[1]) || "";
    }
  return (
    `
` +
    Es +
    e
  );
}
var _s = !1;
function Ps(e, t) {
  if (!e || _s) return "";
  _s = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var l = c.stack.split(`
`),
          s = r.stack.split(`
`),
          a = l.length - 1,
          o = s.length - 1;
        1 <= a && 0 <= o && l[a] !== s[o];

      )
        o--;
      for (; 1 <= a && 0 <= o; a--, o--)
        if (l[a] !== s[o]) {
          if (a !== 1 || o !== 1)
            do
              if ((a--, o--, 0 > o || l[a] !== s[o])) {
                var u =
                  `
` + l[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= a && 0 <= o);
          break;
        }
    }
  } finally {
    (_s = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? er(e) : "";
}
function ip(e) {
  switch (e.tag) {
    case 5:
      return er(e.type);
    case 16:
      return er("Lazy");
    case 13:
      return er("Suspense");
    case 19:
      return er("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ps(e.type, !1)), e;
    case 11:
      return (e = Ps(e.type.render, !1)), e;
    case 1:
      return (e = Ps(e.type, !0)), e;
    default:
      return "";
  }
}
function ni(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case fn:
      return "Fragment";
    case dn:
      return "Portal";
    case Js:
      return "Profiler";
    case la:
      return "StrictMode";
    case ei:
      return "Suspense";
    case ti:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Vu:
        return (e.displayName || "Context") + ".Consumer";
      case Uu:
        return (e._context.displayName || "Context") + ".Provider";
      case sa:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ia:
        return (
          (t = e.displayName || null), t !== null ? t : ni(e.type) || "Memo"
        );
      case wt:
        (t = e._payload), (e = e._init);
        try {
          return ni(e(t));
        } catch {}
    }
  return null;
}
function ap(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ni(t);
    case 8:
      return t === la ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function It(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Wu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function op(e) {
  var t = Wu(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      s = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (a) {
          (r = "" + a), s.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Zr(e) {
  e._valueTracker || (e._valueTracker = op(e));
}
function Qu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Wu(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Cl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ri(e, t) {
  var n = t.checked;
  return X({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function oo(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = It(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function qu(e, t) {
  (t = t.checked), t != null && ra(e, "checked", t, !1);
}
function li(e, t) {
  qu(e, t);
  var n = It(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? si(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && si(e, t.type, It(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function uo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function si(e, t, n) {
  (t !== "number" || Cl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var tr = Array.isArray;
function Cn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + It(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(P(91));
  return X({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function co(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(P(92));
      if (tr(n)) {
        if (1 < n.length) throw Error(P(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: It(n) };
}
function Ku(e, t) {
  var n = It(t.value),
    r = It(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function fo(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Gu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ai(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Gu(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Yr,
  Zu = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Yr = Yr || document.createElement("div"),
          Yr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Yr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function yr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var lr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  up = ["Webkit", "ms", "Moz", "O"];
Object.keys(lr).forEach(function (e) {
  up.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (lr[t] = lr[e]);
  });
});
function Yu(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (lr.hasOwnProperty(e) && lr[e])
      ? ("" + t).trim()
      : t + "px";
}
function Xu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Yu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var cp = X(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function oi(e, t) {
  if (t) {
    if (cp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(P(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(P(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(P(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(P(62));
  }
}
function ui(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ci = null;
function aa(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var di = null,
  Nn = null,
  En = null;
function po(e) {
  if ((e = Or(e))) {
    if (typeof di != "function") throw Error(P(280));
    var t = e.stateNode;
    t && ((t = ss(t)), di(e.stateNode, e.type, t));
  }
}
function Ju(e) {
  Nn ? (En ? En.push(e) : (En = [e])) : (Nn = e);
}
function ec() {
  if (Nn) {
    var e = Nn,
      t = En;
    if (((En = Nn = null), po(e), t)) for (e = 0; e < t.length; e++) po(t[e]);
  }
}
function tc(e, t) {
  return e(t);
}
function nc() {}
var Ts = !1;
function rc(e, t, n) {
  if (Ts) return e(t, n);
  Ts = !0;
  try {
    return tc(e, t, n);
  } finally {
    (Ts = !1), (Nn !== null || En !== null) && (nc(), ec());
  }
}
function xr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ss(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(P(231, t, typeof n));
  return n;
}
var fi = !1;
if (ht)
  try {
    var Vn = {};
    Object.defineProperty(Vn, "passive", {
      get: function () {
        fi = !0;
      },
    }),
      window.addEventListener("test", Vn, Vn),
      window.removeEventListener("test", Vn, Vn);
  } catch {
    fi = !1;
  }
function dp(e, t, n, r, l, s, a, o, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (f) {
    this.onError(f);
  }
}
var sr = !1,
  Nl = null,
  El = !1,
  pi = null,
  fp = {
    onError: function (e) {
      (sr = !0), (Nl = e);
    },
  };
function pp(e, t, n, r, l, s, a, o, u) {
  (sr = !1), (Nl = null), dp.apply(fp, arguments);
}
function hp(e, t, n, r, l, s, a, o, u) {
  if ((pp.apply(this, arguments), sr)) {
    if (sr) {
      var c = Nl;
      (sr = !1), (Nl = null);
    } else throw Error(P(198));
    El || ((El = !0), (pi = c));
  }
}
function sn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function lc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function ho(e) {
  if (sn(e) !== e) throw Error(P(188));
}
function mp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = sn(e)), t === null)) throw Error(P(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var s = l.alternate;
    if (s === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === s.child) {
      for (s = l.child; s; ) {
        if (s === n) return ho(l), e;
        if (s === r) return ho(l), t;
        s = s.sibling;
      }
      throw Error(P(188));
    }
    if (n.return !== r.return) (n = l), (r = s);
    else {
      for (var a = !1, o = l.child; o; ) {
        if (o === n) {
          (a = !0), (n = l), (r = s);
          break;
        }
        if (o === r) {
          (a = !0), (r = l), (n = s);
          break;
        }
        o = o.sibling;
      }
      if (!a) {
        for (o = s.child; o; ) {
          if (o === n) {
            (a = !0), (n = s), (r = l);
            break;
          }
          if (o === r) {
            (a = !0), (r = s), (n = l);
            break;
          }
          o = o.sibling;
        }
        if (!a) throw Error(P(189));
      }
    }
    if (n.alternate !== r) throw Error(P(190));
  }
  if (n.tag !== 3) throw Error(P(188));
  return n.stateNode.current === n ? e : t;
}
function sc(e) {
  return (e = mp(e)), e !== null ? ic(e) : null;
}
function ic(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ic(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ac = Ae.unstable_scheduleCallback,
  mo = Ae.unstable_cancelCallback,
  gp = Ae.unstable_shouldYield,
  vp = Ae.unstable_requestPaint,
  ne = Ae.unstable_now,
  yp = Ae.unstable_getCurrentPriorityLevel,
  oa = Ae.unstable_ImmediatePriority,
  oc = Ae.unstable_UserBlockingPriority,
  _l = Ae.unstable_NormalPriority,
  xp = Ae.unstable_LowPriority,
  uc = Ae.unstable_IdlePriority,
  ts = null,
  at = null;
function kp(e) {
  if (at && typeof at.onCommitFiberRoot == "function")
    try {
      at.onCommitFiberRoot(ts, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : Sp,
  wp = Math.log,
  jp = Math.LN2;
function Sp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((wp(e) / jp) | 0)) | 0;
}
var Xr = 64,
  Jr = 4194304;
function nr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Pl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    s = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var o = a & ~l;
    o !== 0 ? (r = nr(o)) : ((s &= a), s !== 0 && (r = nr(s)));
  } else (a = n & ~l), a !== 0 ? (r = nr(a)) : s !== 0 && (r = nr(s));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (s = t & -t), l >= s || (l === 16 && (s & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - et(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function Cp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Np(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      s = e.pendingLanes;
    0 < s;

  ) {
    var a = 31 - et(s),
      o = 1 << a,
      u = l[a];
    u === -1
      ? (!(o & n) || o & r) && (l[a] = Cp(o, t))
      : u <= t && (e.expiredLanes |= o),
      (s &= ~o);
  }
}
function hi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function cc() {
  var e = Xr;
  return (Xr <<= 1), !(Xr & 4194240) && (Xr = 64), e;
}
function Rs(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ir(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - et(t)),
    (e[t] = n);
}
function Ep(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - et(n),
      s = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~s);
  }
}
function ua(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - et(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var U = 0;
function dc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var fc,
  ca,
  pc,
  hc,
  mc,
  mi = !1,
  el = [],
  Pt = null,
  Tt = null,
  Rt = null,
  kr = new Map(),
  wr = new Map(),
  St = [],
  _p =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function go(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Pt = null;
      break;
    case "dragenter":
    case "dragleave":
      Tt = null;
      break;
    case "mouseover":
    case "mouseout":
      Rt = null;
      break;
    case "pointerover":
    case "pointerout":
      kr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      wr.delete(t.pointerId);
  }
}
function Hn(e, t, n, r, l, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [l],
      }),
      t !== null && ((t = Or(t)), t !== null && ca(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Pp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (Pt = Hn(Pt, e, t, n, r, l)), !0;
    case "dragenter":
      return (Tt = Hn(Tt, e, t, n, r, l)), !0;
    case "mouseover":
      return (Rt = Hn(Rt, e, t, n, r, l)), !0;
    case "pointerover":
      var s = l.pointerId;
      return kr.set(s, Hn(kr.get(s) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (s = l.pointerId), wr.set(s, Hn(wr.get(s) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function gc(e) {
  var t = qt(e.target);
  if (t !== null) {
    var n = sn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = lc(n)), t !== null)) {
          (e.blockedOn = t),
            mc(e.priority, function () {
              pc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function hl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ci = r), n.target.dispatchEvent(r), (ci = null);
    } else return (t = Or(n)), t !== null && ca(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function vo(e, t, n) {
  hl(e) && n.delete(t);
}
function Tp() {
  (mi = !1),
    Pt !== null && hl(Pt) && (Pt = null),
    Tt !== null && hl(Tt) && (Tt = null),
    Rt !== null && hl(Rt) && (Rt = null),
    kr.forEach(vo),
    wr.forEach(vo);
}
function Wn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    mi ||
      ((mi = !0),
      Ae.unstable_scheduleCallback(Ae.unstable_NormalPriority, Tp)));
}
function jr(e) {
  function t(l) {
    return Wn(l, e);
  }
  if (0 < el.length) {
    Wn(el[0], e);
    for (var n = 1; n < el.length; n++) {
      var r = el[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Pt !== null && Wn(Pt, e),
      Tt !== null && Wn(Tt, e),
      Rt !== null && Wn(Rt, e),
      kr.forEach(t),
      wr.forEach(t),
      n = 0;
    n < St.length;
    n++
  )
    (r = St[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < St.length && ((n = St[0]), n.blockedOn === null); )
    gc(n), n.blockedOn === null && St.shift();
}
var _n = yt.ReactCurrentBatchConfig,
  Tl = !0;
function Rp(e, t, n, r) {
  var l = U,
    s = _n.transition;
  _n.transition = null;
  try {
    (U = 1), da(e, t, n, r);
  } finally {
    (U = l), (_n.transition = s);
  }
}
function zp(e, t, n, r) {
  var l = U,
    s = _n.transition;
  _n.transition = null;
  try {
    (U = 4), da(e, t, n, r);
  } finally {
    (U = l), (_n.transition = s);
  }
}
function da(e, t, n, r) {
  if (Tl) {
    var l = gi(e, t, n, r);
    if (l === null) Ds(e, t, r, Rl, n), go(e, r);
    else if (Pp(l, e, t, n, r)) r.stopPropagation();
    else if ((go(e, r), t & 4 && -1 < _p.indexOf(e))) {
      for (; l !== null; ) {
        var s = Or(l);
        if (
          (s !== null && fc(s),
          (s = gi(e, t, n, r)),
          s === null && Ds(e, t, r, Rl, n),
          s === l)
        )
          break;
        l = s;
      }
      l !== null && r.stopPropagation();
    } else Ds(e, t, r, null, n);
  }
}
var Rl = null;
function gi(e, t, n, r) {
  if (((Rl = null), (e = aa(r)), (e = qt(e)), e !== null))
    if (((t = sn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = lc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Rl = e), null;
}
function vc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (yp()) {
        case oa:
          return 1;
        case oc:
          return 4;
        case _l:
        case xp:
          return 16;
        case uc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Nt = null,
  fa = null,
  ml = null;
function yc() {
  if (ml) return ml;
  var e,
    t = fa,
    n = t.length,
    r,
    l = "value" in Nt ? Nt.value : Nt.textContent,
    s = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[s - r]; r++);
  return (ml = l.slice(e, 1 < r ? 1 - r : void 0));
}
function gl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function tl() {
  return !0;
}
function yo() {
  return !1;
}
function De(e) {
  function t(n, r, l, s, a) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = a),
      (this.currentTarget = null);
    for (var o in e)
      e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(s) : s[o]));
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? tl
        : yo),
      (this.isPropagationStopped = yo),
      this
    );
  }
  return (
    X(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = tl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = tl));
      },
      persist: function () {},
      isPersistent: tl,
    }),
    t
  );
}
var On = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  pa = De(On),
  Ar = X({}, On, { view: 0, detail: 0 }),
  Lp = De(Ar),
  zs,
  Ls,
  Qn,
  ns = X({}, Ar, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ha,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Qn &&
            (Qn && e.type === "mousemove"
              ? ((zs = e.screenX - Qn.screenX), (Ls = e.screenY - Qn.screenY))
              : (Ls = zs = 0),
            (Qn = e)),
          zs);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ls;
    },
  }),
  xo = De(ns),
  Mp = X({}, ns, { dataTransfer: 0 }),
  bp = De(Mp),
  $p = X({}, Ar, { relatedTarget: 0 }),
  Ms = De($p),
  Fp = X({}, On, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ip = De(Fp),
  Ap = X({}, On, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Op = De(Ap),
  Dp = X({}, On, { data: 0 }),
  ko = De(Dp),
  Bp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Up = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Vp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Hp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Vp[e]) ? !!t[e] : !1;
}
function ha() {
  return Hp;
}
var Wp = X({}, Ar, {
    key: function (e) {
      if (e.key) {
        var t = Bp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = gl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Up[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ha,
    charCode: function (e) {
      return e.type === "keypress" ? gl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? gl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Qp = De(Wp),
  qp = X({}, ns, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  wo = De(qp),
  Kp = X({}, Ar, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ha,
  }),
  Gp = De(Kp),
  Zp = X({}, On, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Yp = De(Zp),
  Xp = X({}, ns, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Jp = De(Xp),
  eh = [9, 13, 27, 32],
  ma = ht && "CompositionEvent" in window,
  ir = null;
ht && "documentMode" in document && (ir = document.documentMode);
var th = ht && "TextEvent" in window && !ir,
  xc = ht && (!ma || (ir && 8 < ir && 11 >= ir)),
  jo = " ",
  So = !1;
function kc(e, t) {
  switch (e) {
    case "keyup":
      return eh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function wc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var pn = !1;
function nh(e, t) {
  switch (e) {
    case "compositionend":
      return wc(t);
    case "keypress":
      return t.which !== 32 ? null : ((So = !0), jo);
    case "textInput":
      return (e = t.data), e === jo && So ? null : e;
    default:
      return null;
  }
}
function rh(e, t) {
  if (pn)
    return e === "compositionend" || (!ma && kc(e, t))
      ? ((e = yc()), (ml = fa = Nt = null), (pn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return xc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var lh = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Co(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!lh[e.type] : t === "textarea";
}
function jc(e, t, n, r) {
  Ju(r),
    (t = zl(t, "onChange")),
    0 < t.length &&
      ((n = new pa("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var ar = null,
  Sr = null;
function sh(e) {
  Mc(e, 0);
}
function rs(e) {
  var t = gn(e);
  if (Qu(t)) return e;
}
function ih(e, t) {
  if (e === "change") return t;
}
var Sc = !1;
if (ht) {
  var bs;
  if (ht) {
    var $s = "oninput" in document;
    if (!$s) {
      var No = document.createElement("div");
      No.setAttribute("oninput", "return;"),
        ($s = typeof No.oninput == "function");
    }
    bs = $s;
  } else bs = !1;
  Sc = bs && (!document.documentMode || 9 < document.documentMode);
}
function Eo() {
  ar && (ar.detachEvent("onpropertychange", Cc), (Sr = ar = null));
}
function Cc(e) {
  if (e.propertyName === "value" && rs(Sr)) {
    var t = [];
    jc(t, Sr, e, aa(e)), rc(sh, t);
  }
}
function ah(e, t, n) {
  e === "focusin"
    ? (Eo(), (ar = t), (Sr = n), ar.attachEvent("onpropertychange", Cc))
    : e === "focusout" && Eo();
}
function oh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return rs(Sr);
}
function uh(e, t) {
  if (e === "click") return rs(t);
}
function ch(e, t) {
  if (e === "input" || e === "change") return rs(t);
}
function dh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nt = typeof Object.is == "function" ? Object.is : dh;
function Cr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Xs.call(t, l) || !nt(e[l], t[l])) return !1;
  }
  return !0;
}
function _o(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Po(e, t) {
  var n = _o(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = _o(n);
  }
}
function Nc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Nc(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Ec() {
  for (var e = window, t = Cl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Cl(e.document);
  }
  return t;
}
function ga(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function fh(e) {
  var t = Ec(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Nc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ga(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          s = Math.min(r.start, l);
        (r = r.end === void 0 ? s : Math.min(r.end, l)),
          !e.extend && s > r && ((l = r), (r = s), (s = l)),
          (l = Po(n, s));
        var a = Po(n, r);
        l &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          s > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var ph = ht && "documentMode" in document && 11 >= document.documentMode,
  hn = null,
  vi = null,
  or = null,
  yi = !1;
function To(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  yi ||
    hn == null ||
    hn !== Cl(r) ||
    ((r = hn),
    "selectionStart" in r && ga(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (or && Cr(or, r)) ||
      ((or = r),
      (r = zl(vi, "onSelect")),
      0 < r.length &&
        ((t = new pa("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = hn))));
}
function nl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var mn = {
    animationend: nl("Animation", "AnimationEnd"),
    animationiteration: nl("Animation", "AnimationIteration"),
    animationstart: nl("Animation", "AnimationStart"),
    transitionend: nl("Transition", "TransitionEnd"),
  },
  Fs = {},
  _c = {};
ht &&
  ((_c = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete mn.animationend.animation,
    delete mn.animationiteration.animation,
    delete mn.animationstart.animation),
  "TransitionEvent" in window || delete mn.transitionend.transition);
function ls(e) {
  if (Fs[e]) return Fs[e];
  if (!mn[e]) return e;
  var t = mn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in _c) return (Fs[e] = t[n]);
  return e;
}
var Pc = ls("animationend"),
  Tc = ls("animationiteration"),
  Rc = ls("animationstart"),
  zc = ls("transitionend"),
  Lc = new Map(),
  Ro =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Ot(e, t) {
  Lc.set(e, t), ln(t, [e]);
}
for (var Is = 0; Is < Ro.length; Is++) {
  var As = Ro[Is],
    hh = As.toLowerCase(),
    mh = As[0].toUpperCase() + As.slice(1);
  Ot(hh, "on" + mh);
}
Ot(Pc, "onAnimationEnd");
Ot(Tc, "onAnimationIteration");
Ot(Rc, "onAnimationStart");
Ot("dblclick", "onDoubleClick");
Ot("focusin", "onFocus");
Ot("focusout", "onBlur");
Ot(zc, "onTransitionEnd");
Rn("onMouseEnter", ["mouseout", "mouseover"]);
Rn("onMouseLeave", ["mouseout", "mouseover"]);
Rn("onPointerEnter", ["pointerout", "pointerover"]);
Rn("onPointerLeave", ["pointerout", "pointerover"]);
ln(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
ln(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ln(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
ln(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
ln(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var rr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  gh = new Set("cancel close invalid load scroll toggle".split(" ").concat(rr));
function zo(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), hp(r, t, void 0, e), (e.currentTarget = null);
}
function Mc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var o = r[a],
            u = o.instance,
            c = o.currentTarget;
          if (((o = o.listener), u !== s && l.isPropagationStopped())) break e;
          zo(l, o, c), (s = u);
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((o = r[a]),
            (u = o.instance),
            (c = o.currentTarget),
            (o = o.listener),
            u !== s && l.isPropagationStopped())
          )
            break e;
          zo(l, o, c), (s = u);
        }
    }
  }
  if (El) throw ((e = pi), (El = !1), (pi = null), e);
}
function q(e, t) {
  var n = t[Si];
  n === void 0 && (n = t[Si] = new Set());
  var r = e + "__bubble";
  n.has(r) || (bc(t, e, 2, !1), n.add(r));
}
function Os(e, t, n) {
  var r = 0;
  t && (r |= 4), bc(n, e, r, t);
}
var rl = "_reactListening" + Math.random().toString(36).slice(2);
function Nr(e) {
  if (!e[rl]) {
    (e[rl] = !0),
      Bu.forEach(function (n) {
        n !== "selectionchange" && (gh.has(n) || Os(n, !1, e), Os(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[rl] || ((t[rl] = !0), Os("selectionchange", !1, t));
  }
}
function bc(e, t, n, r) {
  switch (vc(t)) {
    case 1:
      var l = Rp;
      break;
    case 4:
      l = zp;
      break;
    default:
      l = da;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !fi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1);
}
function Ds(e, t, n, r, l) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var o = r.stateNode.containerInfo;
        if (o === l || (o.nodeType === 8 && o.parentNode === l)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var u = a.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = a.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            a = a.return;
          }
        for (; o !== null; ) {
          if (((a = qt(o)), a === null)) return;
          if (((u = a.tag), u === 5 || u === 6)) {
            r = s = a;
            continue e;
          }
          o = o.parentNode;
        }
      }
      r = r.return;
    }
  rc(function () {
    var c = s,
      f = aa(n),
      h = [];
    e: {
      var g = Lc.get(e);
      if (g !== void 0) {
        var y = pa,
          k = e;
        switch (e) {
          case "keypress":
            if (gl(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Qp;
            break;
          case "focusin":
            (k = "focus"), (y = Ms);
            break;
          case "focusout":
            (k = "blur"), (y = Ms);
            break;
          case "beforeblur":
          case "afterblur":
            y = Ms;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = xo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = bp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Gp;
            break;
          case Pc:
          case Tc:
          case Rc:
            y = Ip;
            break;
          case zc:
            y = Yp;
            break;
          case "scroll":
            y = Lp;
            break;
          case "wheel":
            y = Jp;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Op;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = wo;
        }
        var S = (t & 4) !== 0,
          x = !S && e === "scroll",
          d = S ? (g !== null ? g + "Capture" : null) : g;
        S = [];
        for (var p = c, v; p !== null; ) {
          v = p;
          var w = v.stateNode;
          if (
            (v.tag === 5 &&
              w !== null &&
              ((v = w),
              d !== null && ((w = xr(p, d)), w != null && S.push(Er(p, w, v)))),
            x)
          )
            break;
          p = p.return;
        }
        0 < S.length &&
          ((g = new y(g, k, null, n, f)), h.push({ event: g, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          g &&
            n !== ci &&
            (k = n.relatedTarget || n.fromElement) &&
            (qt(k) || k[mt]))
        )
          break e;
        if (
          (y || g) &&
          ((g =
            f.window === f
              ? f
              : (g = f.ownerDocument)
                ? g.defaultView || g.parentWindow
                : window),
          y
            ? ((k = n.relatedTarget || n.toElement),
              (y = c),
              (k = k ? qt(k) : null),
              k !== null &&
                ((x = sn(k)), k !== x || (k.tag !== 5 && k.tag !== 6)) &&
                (k = null))
            : ((y = null), (k = c)),
          y !== k)
        ) {
          if (
            ((S = xo),
            (w = "onMouseLeave"),
            (d = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = wo),
              (w = "onPointerLeave"),
              (d = "onPointerEnter"),
              (p = "pointer")),
            (x = y == null ? g : gn(y)),
            (v = k == null ? g : gn(k)),
            (g = new S(w, p + "leave", y, n, f)),
            (g.target = x),
            (g.relatedTarget = v),
            (w = null),
            qt(f) === c &&
              ((S = new S(d, p + "enter", k, n, f)),
              (S.target = v),
              (S.relatedTarget = x),
              (w = S)),
            (x = w),
            y && k)
          )
            t: {
              for (S = y, d = k, p = 0, v = S; v; v = cn(v)) p++;
              for (v = 0, w = d; w; w = cn(w)) v++;
              for (; 0 < p - v; ) (S = cn(S)), p--;
              for (; 0 < v - p; ) (d = cn(d)), v--;
              for (; p--; ) {
                if (S === d || (d !== null && S === d.alternate)) break t;
                (S = cn(S)), (d = cn(d));
              }
              S = null;
            }
          else S = null;
          y !== null && Lo(h, g, y, S, !1),
            k !== null && x !== null && Lo(h, x, k, S, !0);
        }
      }
      e: {
        if (
          ((g = c ? gn(c) : window),
          (y = g.nodeName && g.nodeName.toLowerCase()),
          y === "select" || (y === "input" && g.type === "file"))
        )
          var j = ih;
        else if (Co(g))
          if (Sc) j = ch;
          else {
            j = oh;
            var _ = ah;
          }
        else
          (y = g.nodeName) &&
            y.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (j = uh);
        if (j && (j = j(e, c))) {
          jc(h, j, n, f);
          break e;
        }
        _ && _(e, g, c),
          e === "focusout" &&
            (_ = g._wrapperState) &&
            _.controlled &&
            g.type === "number" &&
            si(g, "number", g.value);
      }
      switch (((_ = c ? gn(c) : window), e)) {
        case "focusin":
          (Co(_) || _.contentEditable === "true") &&
            ((hn = _), (vi = c), (or = null));
          break;
        case "focusout":
          or = vi = hn = null;
          break;
        case "mousedown":
          yi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (yi = !1), To(h, n, f);
          break;
        case "selectionchange":
          if (ph) break;
        case "keydown":
        case "keyup":
          To(h, n, f);
      }
      var N;
      if (ma)
        e: {
          switch (e) {
            case "compositionstart":
              var E = "onCompositionStart";
              break e;
            case "compositionend":
              E = "onCompositionEnd";
              break e;
            case "compositionupdate":
              E = "onCompositionUpdate";
              break e;
          }
          E = void 0;
        }
      else
        pn
          ? kc(e, n) && (E = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E &&
        (xc &&
          n.locale !== "ko" &&
          (pn || E !== "onCompositionStart"
            ? E === "onCompositionEnd" && pn && (N = yc())
            : ((Nt = f),
              (fa = "value" in Nt ? Nt.value : Nt.textContent),
              (pn = !0))),
        (_ = zl(c, E)),
        0 < _.length &&
          ((E = new ko(E, e, null, n, f)),
          h.push({ event: E, listeners: _ }),
          N ? (E.data = N) : ((N = wc(n)), N !== null && (E.data = N)))),
        (N = th ? nh(e, n) : rh(e, n)) &&
          ((c = zl(c, "onBeforeInput")),
          0 < c.length &&
            ((f = new ko("onBeforeInput", "beforeinput", null, n, f)),
            h.push({ event: f, listeners: c }),
            (f.data = N)));
    }
    Mc(h, t);
  });
}
function Er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function zl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      s = l.stateNode;
    l.tag === 5 &&
      s !== null &&
      ((l = s),
      (s = xr(e, n)),
      s != null && r.unshift(Er(e, s, l)),
      (s = xr(e, t)),
      s != null && r.push(Er(e, s, l))),
      (e = e.return);
  }
  return r;
}
function cn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Lo(e, t, n, r, l) {
  for (var s = t._reactName, a = []; n !== null && n !== r; ) {
    var o = n,
      u = o.alternate,
      c = o.stateNode;
    if (u !== null && u === r) break;
    o.tag === 5 &&
      c !== null &&
      ((o = c),
      l
        ? ((u = xr(n, s)), u != null && a.unshift(Er(n, u, o)))
        : l || ((u = xr(n, s)), u != null && a.push(Er(n, u, o)))),
      (n = n.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var vh = /\r\n?/g,
  yh = /\u0000|\uFFFD/g;
function Mo(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      vh,
      `
`,
    )
    .replace(yh, "");
}
function ll(e, t, n) {
  if (((t = Mo(t)), Mo(e) !== t && n)) throw Error(P(425));
}
function Ll() {}
var xi = null,
  ki = null;
function wi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ji = typeof setTimeout == "function" ? setTimeout : void 0,
  xh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  bo = typeof Promise == "function" ? Promise : void 0,
  kh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof bo < "u"
        ? function (e) {
            return bo.resolve(null).then(e).catch(wh);
          }
        : ji;
function wh(e) {
  setTimeout(function () {
    throw e;
  });
}
function Bs(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), jr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  jr(t);
}
function zt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function $o(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Dn = Math.random().toString(36).slice(2),
  it = "__reactFiber$" + Dn,
  _r = "__reactProps$" + Dn,
  mt = "__reactContainer$" + Dn,
  Si = "__reactEvents$" + Dn,
  jh = "__reactListeners$" + Dn,
  Sh = "__reactHandles$" + Dn;
function qt(e) {
  var t = e[it];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[mt] || n[it])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = $o(e); e !== null; ) {
          if ((n = e[it])) return n;
          e = $o(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Or(e) {
  return (
    (e = e[it] || e[mt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function gn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(P(33));
}
function ss(e) {
  return e[_r] || null;
}
var Ci = [],
  vn = -1;
function Dt(e) {
  return { current: e };
}
function K(e) {
  0 > vn || ((e.current = Ci[vn]), (Ci[vn] = null), vn--);
}
function Q(e, t) {
  vn++, (Ci[vn] = e.current), (e.current = t);
}
var At = {},
  xe = Dt(At),
  Re = Dt(!1),
  Xt = At;
function zn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return At;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    s;
  for (s in n) l[s] = t[s];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ze(e) {
  return (e = e.childContextTypes), e != null;
}
function Ml() {
  K(Re), K(xe);
}
function Fo(e, t, n) {
  if (xe.current !== At) throw Error(P(168));
  Q(xe, t), Q(Re, n);
}
function $c(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(P(108, ap(e) || "Unknown", l));
  return X({}, n, r);
}
function bl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || At),
    (Xt = xe.current),
    Q(xe, e),
    Q(Re, Re.current),
    !0
  );
}
function Io(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(P(169));
  n
    ? ((e = $c(e, t, Xt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      K(Re),
      K(xe),
      Q(xe, e))
    : K(Re),
    Q(Re, n);
}
var ct = null,
  is = !1,
  Us = !1;
function Fc(e) {
  ct === null ? (ct = [e]) : ct.push(e);
}
function Ch(e) {
  (is = !0), Fc(e);
}
function Bt() {
  if (!Us && ct !== null) {
    Us = !0;
    var e = 0,
      t = U;
    try {
      var n = ct;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (ct = null), (is = !1);
    } catch (l) {
      throw (ct !== null && (ct = ct.slice(e + 1)), ac(oa, Bt), l);
    } finally {
      (U = t), (Us = !1);
    }
  }
  return null;
}
var yn = [],
  xn = 0,
  $l = null,
  Fl = 0,
  Ue = [],
  Ve = 0,
  Jt = null,
  dt = 1,
  ft = "";
function Wt(e, t) {
  (yn[xn++] = Fl), (yn[xn++] = $l), ($l = e), (Fl = t);
}
function Ic(e, t, n) {
  (Ue[Ve++] = dt), (Ue[Ve++] = ft), (Ue[Ve++] = Jt), (Jt = e);
  var r = dt;
  e = ft;
  var l = 32 - et(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var s = 32 - et(t) + l;
  if (30 < s) {
    var a = l - (l % 5);
    (s = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (l -= a),
      (dt = (1 << (32 - et(t) + l)) | (n << l) | r),
      (ft = s + e);
  } else (dt = (1 << s) | (n << l) | r), (ft = e);
}
function va(e) {
  e.return !== null && (Wt(e, 1), Ic(e, 1, 0));
}
function ya(e) {
  for (; e === $l; )
    ($l = yn[--xn]), (yn[xn] = null), (Fl = yn[--xn]), (yn[xn] = null);
  for (; e === Jt; )
    (Jt = Ue[--Ve]),
      (Ue[Ve] = null),
      (ft = Ue[--Ve]),
      (Ue[Ve] = null),
      (dt = Ue[--Ve]),
      (Ue[Ve] = null);
}
var Ie = null,
  Fe = null,
  G = !1,
  Je = null;
function Ac(e, t) {
  var n = He(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ao(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ie = e), (Fe = zt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ie = e), (Fe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Jt !== null ? { id: dt, overflow: ft } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = He(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ie = e),
            (Fe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ni(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ei(e) {
  if (G) {
    var t = Fe;
    if (t) {
      var n = t;
      if (!Ao(e, t)) {
        if (Ni(e)) throw Error(P(418));
        t = zt(n.nextSibling);
        var r = Ie;
        t && Ao(e, t)
          ? Ac(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (G = !1), (Ie = e));
      }
    } else {
      if (Ni(e)) throw Error(P(418));
      (e.flags = (e.flags & -4097) | 2), (G = !1), (Ie = e);
    }
  }
}
function Oo(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ie = e;
}
function sl(e) {
  if (e !== Ie) return !1;
  if (!G) return Oo(e), (G = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !wi(e.type, e.memoizedProps))),
    t && (t = Fe))
  ) {
    if (Ni(e)) throw (Oc(), Error(P(418)));
    for (; t; ) Ac(e, t), (t = zt(t.nextSibling));
  }
  if ((Oo(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(P(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Fe = zt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Fe = null;
    }
  } else Fe = Ie ? zt(e.stateNode.nextSibling) : null;
  return !0;
}
function Oc() {
  for (var e = Fe; e; ) e = zt(e.nextSibling);
}
function Ln() {
  (Fe = Ie = null), (G = !1);
}
function xa(e) {
  Je === null ? (Je = [e]) : Je.push(e);
}
var Nh = yt.ReactCurrentBatchConfig;
function qn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(P(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(P(147, e));
      var l = r,
        s = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === s
        ? t.ref
        : ((t = function (a) {
            var o = l.refs;
            a === null ? delete o[s] : (o[s] = a);
          }),
          (t._stringRef = s),
          t);
    }
    if (typeof e != "string") throw Error(P(284));
    if (!n._owner) throw Error(P(290, e));
  }
  return e;
}
function il(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      P(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function Do(e) {
  var t = e._init;
  return t(e._payload);
}
function Dc(e) {
  function t(d, p) {
    if (e) {
      var v = d.deletions;
      v === null ? ((d.deletions = [p]), (d.flags |= 16)) : v.push(p);
    }
  }
  function n(d, p) {
    if (!e) return null;
    for (; p !== null; ) t(d, p), (p = p.sibling);
    return null;
  }
  function r(d, p) {
    for (d = new Map(); p !== null; )
      p.key !== null ? d.set(p.key, p) : d.set(p.index, p), (p = p.sibling);
    return d;
  }
  function l(d, p) {
    return (d = $t(d, p)), (d.index = 0), (d.sibling = null), d;
  }
  function s(d, p, v) {
    return (
      (d.index = v),
      e
        ? ((v = d.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((d.flags |= 2), p) : v)
            : ((d.flags |= 2), p))
        : ((d.flags |= 1048576), p)
    );
  }
  function a(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function o(d, p, v, w) {
    return p === null || p.tag !== 6
      ? ((p = Gs(v, d.mode, w)), (p.return = d), p)
      : ((p = l(p, v)), (p.return = d), p);
  }
  function u(d, p, v, w) {
    var j = v.type;
    return j === fn
      ? f(d, p, v.props.children, w, v.key)
      : p !== null &&
          (p.elementType === j ||
            (typeof j == "object" &&
              j !== null &&
              j.$$typeof === wt &&
              Do(j) === p.type))
        ? ((w = l(p, v.props)), (w.ref = qn(d, p, v)), (w.return = d), w)
        : ((w = Sl(v.type, v.key, v.props, null, d.mode, w)),
          (w.ref = qn(d, p, v)),
          (w.return = d),
          w);
  }
  function c(d, p, v, w) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = Zs(v, d.mode, w)), (p.return = d), p)
      : ((p = l(p, v.children || [])), (p.return = d), p);
  }
  function f(d, p, v, w, j) {
    return p === null || p.tag !== 7
      ? ((p = Yt(v, d.mode, w, j)), (p.return = d), p)
      : ((p = l(p, v)), (p.return = d), p);
  }
  function h(d, p, v) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = Gs("" + p, d.mode, v)), (p.return = d), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Gr:
          return (
            (v = Sl(p.type, p.key, p.props, null, d.mode, v)),
            (v.ref = qn(d, null, p)),
            (v.return = d),
            v
          );
        case dn:
          return (p = Zs(p, d.mode, v)), (p.return = d), p;
        case wt:
          var w = p._init;
          return h(d, w(p._payload), v);
      }
      if (tr(p) || Un(p))
        return (p = Yt(p, d.mode, v, null)), (p.return = d), p;
      il(d, p);
    }
    return null;
  }
  function g(d, p, v, w) {
    var j = p !== null ? p.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return j !== null ? null : o(d, p, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Gr:
          return v.key === j ? u(d, p, v, w) : null;
        case dn:
          return v.key === j ? c(d, p, v, w) : null;
        case wt:
          return (j = v._init), g(d, p, j(v._payload), w);
      }
      if (tr(v) || Un(v)) return j !== null ? null : f(d, p, v, w, null);
      il(d, v);
    }
    return null;
  }
  function y(d, p, v, w, j) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (d = d.get(v) || null), o(p, d, "" + w, j);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Gr:
          return (d = d.get(w.key === null ? v : w.key) || null), u(p, d, w, j);
        case dn:
          return (d = d.get(w.key === null ? v : w.key) || null), c(p, d, w, j);
        case wt:
          var _ = w._init;
          return y(d, p, v, _(w._payload), j);
      }
      if (tr(w) || Un(w)) return (d = d.get(v) || null), f(p, d, w, j, null);
      il(p, w);
    }
    return null;
  }
  function k(d, p, v, w) {
    for (
      var j = null, _ = null, N = p, E = (p = 0), L = null;
      N !== null && E < v.length;
      E++
    ) {
      N.index > E ? ((L = N), (N = null)) : (L = N.sibling);
      var T = g(d, N, v[E], w);
      if (T === null) {
        N === null && (N = L);
        break;
      }
      e && N && T.alternate === null && t(d, N),
        (p = s(T, p, E)),
        _ === null ? (j = T) : (_.sibling = T),
        (_ = T),
        (N = L);
    }
    if (E === v.length) return n(d, N), G && Wt(d, E), j;
    if (N === null) {
      for (; E < v.length; E++)
        (N = h(d, v[E], w)),
          N !== null &&
            ((p = s(N, p, E)), _ === null ? (j = N) : (_.sibling = N), (_ = N));
      return G && Wt(d, E), j;
    }
    for (N = r(d, N); E < v.length; E++)
      (L = y(N, d, E, v[E], w)),
        L !== null &&
          (e && L.alternate !== null && N.delete(L.key === null ? E : L.key),
          (p = s(L, p, E)),
          _ === null ? (j = L) : (_.sibling = L),
          (_ = L));
    return (
      e &&
        N.forEach(function (b) {
          return t(d, b);
        }),
      G && Wt(d, E),
      j
    );
  }
  function S(d, p, v, w) {
    var j = Un(v);
    if (typeof j != "function") throw Error(P(150));
    if (((v = j.call(v)), v == null)) throw Error(P(151));
    for (
      var _ = (j = null), N = p, E = (p = 0), L = null, T = v.next();
      N !== null && !T.done;
      E++, T = v.next()
    ) {
      N.index > E ? ((L = N), (N = null)) : (L = N.sibling);
      var b = g(d, N, T.value, w);
      if (b === null) {
        N === null && (N = L);
        break;
      }
      e && N && b.alternate === null && t(d, N),
        (p = s(b, p, E)),
        _ === null ? (j = b) : (_.sibling = b),
        (_ = b),
        (N = L);
    }
    if (T.done) return n(d, N), G && Wt(d, E), j;
    if (N === null) {
      for (; !T.done; E++, T = v.next())
        (T = h(d, T.value, w)),
          T !== null &&
            ((p = s(T, p, E)), _ === null ? (j = T) : (_.sibling = T), (_ = T));
      return G && Wt(d, E), j;
    }
    for (N = r(d, N); !T.done; E++, T = v.next())
      (T = y(N, d, E, T.value, w)),
        T !== null &&
          (e && T.alternate !== null && N.delete(T.key === null ? E : T.key),
          (p = s(T, p, E)),
          _ === null ? (j = T) : (_.sibling = T),
          (_ = T));
    return (
      e &&
        N.forEach(function (ie) {
          return t(d, ie);
        }),
      G && Wt(d, E),
      j
    );
  }
  function x(d, p, v, w) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === fn &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case Gr:
          e: {
            for (var j = v.key, _ = p; _ !== null; ) {
              if (_.key === j) {
                if (((j = v.type), j === fn)) {
                  if (_.tag === 7) {
                    n(d, _.sibling),
                      (p = l(_, v.props.children)),
                      (p.return = d),
                      (d = p);
                    break e;
                  }
                } else if (
                  _.elementType === j ||
                  (typeof j == "object" &&
                    j !== null &&
                    j.$$typeof === wt &&
                    Do(j) === _.type)
                ) {
                  n(d, _.sibling),
                    (p = l(_, v.props)),
                    (p.ref = qn(d, _, v)),
                    (p.return = d),
                    (d = p);
                  break e;
                }
                n(d, _);
                break;
              } else t(d, _);
              _ = _.sibling;
            }
            v.type === fn
              ? ((p = Yt(v.props.children, d.mode, w, v.key)),
                (p.return = d),
                (d = p))
              : ((w = Sl(v.type, v.key, v.props, null, d.mode, w)),
                (w.ref = qn(d, p, v)),
                (w.return = d),
                (d = w));
          }
          return a(d);
        case dn:
          e: {
            for (_ = v.key; p !== null; ) {
              if (p.key === _)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  n(d, p.sibling),
                    (p = l(p, v.children || [])),
                    (p.return = d),
                    (d = p);
                  break e;
                } else {
                  n(d, p);
                  break;
                }
              else t(d, p);
              p = p.sibling;
            }
            (p = Zs(v, d.mode, w)), (p.return = d), (d = p);
          }
          return a(d);
        case wt:
          return (_ = v._init), x(d, p, _(v._payload), w);
      }
      if (tr(v)) return k(d, p, v, w);
      if (Un(v)) return S(d, p, v, w);
      il(d, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        p !== null && p.tag === 6
          ? (n(d, p.sibling), (p = l(p, v)), (p.return = d), (d = p))
          : (n(d, p), (p = Gs(v, d.mode, w)), (p.return = d), (d = p)),
        a(d))
      : n(d, p);
  }
  return x;
}
var Mn = Dc(!0),
  Bc = Dc(!1),
  Il = Dt(null),
  Al = null,
  kn = null,
  ka = null;
function wa() {
  ka = kn = Al = null;
}
function ja(e) {
  var t = Il.current;
  K(Il), (e._currentValue = t);
}
function _i(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Pn(e, t) {
  (Al = e),
    (ka = kn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Te = !0), (e.firstContext = null));
}
function Ke(e) {
  var t = e._currentValue;
  if (ka !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), kn === null)) {
      if (Al === null) throw Error(P(308));
      (kn = e), (Al.dependencies = { lanes: 0, firstContext: e });
    } else kn = kn.next = e;
  return t;
}
var Kt = null;
function Sa(e) {
  Kt === null ? (Kt = [e]) : Kt.push(e);
}
function Uc(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Sa(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    gt(e, r)
  );
}
function gt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var jt = !1;
function Ca(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Vc(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function pt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Lt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), D & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      gt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Sa(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    gt(e, n)
  );
}
function vl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ua(e, n);
  }
}
function Bo(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        s === null ? (l = s = a) : (s = s.next = a), (n = n.next);
      } while (n !== null);
      s === null ? (l = s = t) : (s = s.next = t);
    } else l = s = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Ol(e, t, n, r) {
  var l = e.updateQueue;
  jt = !1;
  var s = l.firstBaseUpdate,
    a = l.lastBaseUpdate,
    o = l.shared.pending;
  if (o !== null) {
    l.shared.pending = null;
    var u = o,
      c = u.next;
    (u.next = null), a === null ? (s = c) : (a.next = c), (a = u);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (o = f.lastBaseUpdate),
      o !== a &&
        (o === null ? (f.firstBaseUpdate = c) : (o.next = c),
        (f.lastBaseUpdate = u)));
  }
  if (s !== null) {
    var h = l.baseState;
    (a = 0), (f = c = u = null), (o = s);
    do {
      var g = o.lane,
        y = o.eventTime;
      if ((r & g) === g) {
        f !== null &&
          (f = f.next =
            {
              eventTime: y,
              lane: 0,
              tag: o.tag,
              payload: o.payload,
              callback: o.callback,
              next: null,
            });
        e: {
          var k = e,
            S = o;
          switch (((g = t), (y = n), S.tag)) {
            case 1:
              if (((k = S.payload), typeof k == "function")) {
                h = k.call(y, h, g);
                break e;
              }
              h = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = S.payload),
                (g = typeof k == "function" ? k.call(y, h, g) : k),
                g == null)
              )
                break e;
              h = X({}, h, g);
              break e;
            case 2:
              jt = !0;
          }
        }
        o.callback !== null &&
          o.lane !== 0 &&
          ((e.flags |= 64),
          (g = l.effects),
          g === null ? (l.effects = [o]) : g.push(o));
      } else
        (y = {
          eventTime: y,
          lane: g,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null,
        }),
          f === null ? ((c = f = y), (u = h)) : (f = f.next = y),
          (a |= g);
      if (((o = o.next), o === null)) {
        if (((o = l.shared.pending), o === null)) break;
        (g = o),
          (o = g.next),
          (g.next = null),
          (l.lastBaseUpdate = g),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (u = h),
      (l.baseState = u),
      (l.firstBaseUpdate = c),
      (l.lastBaseUpdate = f),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (a |= l.lane), (l = l.next);
      while (l !== t);
    } else s === null && (l.shared.lanes = 0);
    (tn |= a), (e.lanes = a), (e.memoizedState = h);
  }
}
function Uo(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(P(191, l));
        l.call(r);
      }
    }
}
var Dr = {},
  ot = Dt(Dr),
  Pr = Dt(Dr),
  Tr = Dt(Dr);
function Gt(e) {
  if (e === Dr) throw Error(P(174));
  return e;
}
function Na(e, t) {
  switch ((Q(Tr, t), Q(Pr, e), Q(ot, Dr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ai(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ai(t, e));
  }
  K(ot), Q(ot, t);
}
function bn() {
  K(ot), K(Pr), K(Tr);
}
function Hc(e) {
  Gt(Tr.current);
  var t = Gt(ot.current),
    n = ai(t, e.type);
  t !== n && (Q(Pr, e), Q(ot, n));
}
function Ea(e) {
  Pr.current === e && (K(ot), K(Pr));
}
var Z = Dt(0);
function Dl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Vs = [];
function _a() {
  for (var e = 0; e < Vs.length; e++)
    Vs[e]._workInProgressVersionPrimary = null;
  Vs.length = 0;
}
var yl = yt.ReactCurrentDispatcher,
  Hs = yt.ReactCurrentBatchConfig,
  en = 0,
  Y = null,
  le = null,
  oe = null,
  Bl = !1,
  ur = !1,
  Rr = 0,
  Eh = 0;
function me() {
  throw Error(P(321));
}
function Pa(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nt(e[n], t[n])) return !1;
  return !0;
}
function Ta(e, t, n, r, l, s) {
  if (
    ((en = s),
    (Y = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (yl.current = e === null || e.memoizedState === null ? Rh : zh),
    (e = n(r, l)),
    ur)
  ) {
    s = 0;
    do {
      if (((ur = !1), (Rr = 0), 25 <= s)) throw Error(P(301));
      (s += 1),
        (oe = le = null),
        (t.updateQueue = null),
        (yl.current = Lh),
        (e = n(r, l));
    } while (ur);
  }
  if (
    ((yl.current = Ul),
    (t = le !== null && le.next !== null),
    (en = 0),
    (oe = le = Y = null),
    (Bl = !1),
    t)
  )
    throw Error(P(300));
  return e;
}
function Ra() {
  var e = Rr !== 0;
  return (Rr = 0), e;
}
function st() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return oe === null ? (Y.memoizedState = oe = e) : (oe = oe.next = e), oe;
}
function Ge() {
  if (le === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = le.next;
  var t = oe === null ? Y.memoizedState : oe.next;
  if (t !== null) (oe = t), (le = e);
  else {
    if (e === null) throw Error(P(310));
    (le = e),
      (e = {
        memoizedState: le.memoizedState,
        baseState: le.baseState,
        baseQueue: le.baseQueue,
        queue: le.queue,
        next: null,
      }),
      oe === null ? (Y.memoizedState = oe = e) : (oe = oe.next = e);
  }
  return oe;
}
function zr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ws(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = le,
    l = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (l !== null) {
      var a = l.next;
      (l.next = s.next), (s.next = a);
    }
    (r.baseQueue = l = s), (n.pending = null);
  }
  if (l !== null) {
    (s = l.next), (r = r.baseState);
    var o = (a = null),
      u = null,
      c = s;
    do {
      var f = c.lane;
      if ((en & f) === f)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action));
      else {
        var h = {
          lane: f,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        u === null ? ((o = u = h), (a = r)) : (u = u.next = h),
          (Y.lanes |= f),
          (tn |= f);
      }
      c = c.next;
    } while (c !== null && c !== s);
    u === null ? (a = r) : (u.next = o),
      nt(r, t.memoizedState) || (Te = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (s = l.lane), (Y.lanes |= s), (tn |= s), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Qs(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    s = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = (l = l.next);
    do (s = e(s, a.action)), (a = a.next);
    while (a !== l);
    nt(s, t.memoizedState) || (Te = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s);
  }
  return [s, r];
}
function Wc() {}
function Qc(e, t) {
  var n = Y,
    r = Ge(),
    l = t(),
    s = !nt(r.memoizedState, l);
  if (
    (s && ((r.memoizedState = l), (Te = !0)),
    (r = r.queue),
    za(Gc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (oe !== null && oe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Lr(9, Kc.bind(null, n, r, l, t), void 0, null),
      ue === null)
    )
      throw Error(P(349));
    en & 30 || qc(n, t, l);
  }
  return l;
}
function qc(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Y.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Kc(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Zc(t) && Yc(e);
}
function Gc(e, t, n) {
  return n(function () {
    Zc(t) && Yc(e);
  });
}
function Zc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function Yc(e) {
  var t = gt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function Vo(e) {
  var t = st();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Th.bind(null, Y, e)),
    [t.memoizedState, e]
  );
}
function Lr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Y.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Xc() {
  return Ge().memoizedState;
}
function xl(e, t, n, r) {
  var l = st();
  (Y.flags |= e),
    (l.memoizedState = Lr(1 | t, n, void 0, r === void 0 ? null : r));
}
function as(e, t, n, r) {
  var l = Ge();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (le !== null) {
    var a = le.memoizedState;
    if (((s = a.destroy), r !== null && Pa(r, a.deps))) {
      l.memoizedState = Lr(t, n, s, r);
      return;
    }
  }
  (Y.flags |= e), (l.memoizedState = Lr(1 | t, n, s, r));
}
function Ho(e, t) {
  return xl(8390656, 8, e, t);
}
function za(e, t) {
  return as(2048, 8, e, t);
}
function Jc(e, t) {
  return as(4, 2, e, t);
}
function ed(e, t) {
  return as(4, 4, e, t);
}
function td(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function nd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), as(4, 4, td.bind(null, t, e), n)
  );
}
function La() {}
function rd(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pa(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function ld(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pa(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function sd(e, t, n) {
  return en & 21
    ? (nt(n, t) || ((n = cc()), (Y.lanes |= n), (tn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Te = !0)), (e.memoizedState = n));
}
function _h(e, t) {
  var n = U;
  (U = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Hs.transition;
  Hs.transition = {};
  try {
    e(!1), t();
  } finally {
    (U = n), (Hs.transition = r);
  }
}
function id() {
  return Ge().memoizedState;
}
function Ph(e, t, n) {
  var r = bt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    ad(e))
  )
    od(t, n);
  else if (((n = Uc(e, t, n, r)), n !== null)) {
    var l = Ce();
    tt(n, e, r, l), ud(n, t, r);
  }
}
function Th(e, t, n) {
  var r = bt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ad(e)) od(t, l);
  else {
    var s = e.alternate;
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var a = t.lastRenderedState,
          o = s(a, n);
        if (((l.hasEagerState = !0), (l.eagerState = o), nt(o, a))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), Sa(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Uc(e, t, l, r)),
      n !== null && ((l = Ce()), tt(n, e, r, l), ud(n, t, r));
  }
}
function ad(e) {
  var t = e.alternate;
  return e === Y || (t !== null && t === Y);
}
function od(e, t) {
  ur = Bl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function ud(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ua(e, n);
  }
}
var Ul = {
    readContext: Ke,
    useCallback: me,
    useContext: me,
    useEffect: me,
    useImperativeHandle: me,
    useInsertionEffect: me,
    useLayoutEffect: me,
    useMemo: me,
    useReducer: me,
    useRef: me,
    useState: me,
    useDebugValue: me,
    useDeferredValue: me,
    useTransition: me,
    useMutableSource: me,
    useSyncExternalStore: me,
    useId: me,
    unstable_isNewReconciler: !1,
  },
  Rh = {
    readContext: Ke,
    useCallback: function (e, t) {
      return (st().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ke,
    useEffect: Ho,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        xl(4194308, 4, td.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return xl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return xl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = st();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = st();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Ph.bind(null, Y, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = st();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Vo,
    useDebugValue: La,
    useDeferredValue: function (e) {
      return (st().memoizedState = e);
    },
    useTransition: function () {
      var e = Vo(!1),
        t = e[0];
      return (e = _h.bind(null, e[1])), (st().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Y,
        l = st();
      if (G) {
        if (n === void 0) throw Error(P(407));
        n = n();
      } else {
        if (((n = t()), ue === null)) throw Error(P(349));
        en & 30 || qc(r, t, n);
      }
      l.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return (
        (l.queue = s),
        Ho(Gc.bind(null, r, s, e), [e]),
        (r.flags |= 2048),
        Lr(9, Kc.bind(null, r, s, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = st(),
        t = ue.identifierPrefix;
      if (G) {
        var n = ft,
          r = dt;
        (n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Rr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Eh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  zh = {
    readContext: Ke,
    useCallback: rd,
    useContext: Ke,
    useEffect: za,
    useImperativeHandle: nd,
    useInsertionEffect: Jc,
    useLayoutEffect: ed,
    useMemo: ld,
    useReducer: Ws,
    useRef: Xc,
    useState: function () {
      return Ws(zr);
    },
    useDebugValue: La,
    useDeferredValue: function (e) {
      var t = Ge();
      return sd(t, le.memoizedState, e);
    },
    useTransition: function () {
      var e = Ws(zr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: Wc,
    useSyncExternalStore: Qc,
    useId: id,
    unstable_isNewReconciler: !1,
  },
  Lh = {
    readContext: Ke,
    useCallback: rd,
    useContext: Ke,
    useEffect: za,
    useImperativeHandle: nd,
    useInsertionEffect: Jc,
    useLayoutEffect: ed,
    useMemo: ld,
    useReducer: Qs,
    useRef: Xc,
    useState: function () {
      return Qs(zr);
    },
    useDebugValue: La,
    useDeferredValue: function (e) {
      var t = Ge();
      return le === null ? (t.memoizedState = e) : sd(t, le.memoizedState, e);
    },
    useTransition: function () {
      var e = Qs(zr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: Wc,
    useSyncExternalStore: Qc,
    useId: id,
    unstable_isNewReconciler: !1,
  };
function Ye(e, t) {
  if (e && e.defaultProps) {
    (t = X({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Pi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : X({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var os = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? sn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ce(),
      l = bt(e),
      s = pt(r, l);
    (s.payload = t),
      n != null && (s.callback = n),
      (t = Lt(e, s, l)),
      t !== null && (tt(t, e, l, r), vl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ce(),
      l = bt(e),
      s = pt(r, l);
    (s.tag = 1),
      (s.payload = t),
      n != null && (s.callback = n),
      (t = Lt(e, s, l)),
      t !== null && (tt(t, e, l, r), vl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ce(),
      r = bt(e),
      l = pt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = Lt(e, l, r)),
      t !== null && (tt(t, e, r, n), vl(t, e, r));
  },
};
function Wo(e, t, n, r, l, s, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, s, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Cr(n, r) || !Cr(l, s)
        : !0
  );
}
function cd(e, t, n) {
  var r = !1,
    l = At,
    s = t.contextType;
  return (
    typeof s == "object" && s !== null
      ? (s = Ke(s))
      : ((l = ze(t) ? Xt : xe.current),
        (r = t.contextTypes),
        (s = (r = r != null) ? zn(e, l) : At)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = os),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  );
}
function Qo(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && os.enqueueReplaceState(t, t.state, null);
}
function Ti(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Ca(e);
  var s = t.contextType;
  typeof s == "object" && s !== null
    ? (l.context = Ke(s))
    : ((s = ze(t) ? Xt : xe.current), (l.context = zn(e, s))),
    (l.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == "function" && (Pi(e, t, s, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && os.enqueueReplaceState(l, l.state, null),
      Ol(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function $n(e, t) {
  try {
    var n = "",
      r = t;
    do (n += ip(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (s) {
    l =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function qs(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ri(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Mh = typeof WeakMap == "function" ? WeakMap : Map;
function dd(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Hl || ((Hl = !0), (Di = r)), Ri(e, t);
    }),
    n
  );
}
function fd(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Ri(e, t);
      });
  }
  var s = e.stateNode;
  return (
    s !== null &&
      typeof s.componentDidCatch == "function" &&
      (n.callback = function () {
        Ri(e, t),
          typeof r != "function" &&
            (Mt === null ? (Mt = new Set([this])) : Mt.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function qo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Mh();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = qh.bind(null, e, t, n)), t.then(e, e));
}
function Ko(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Go(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = pt(-1, 1)), (t.tag = 2), Lt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var bh = yt.ReactCurrentOwner,
  Te = !1;
function je(e, t, n, r) {
  t.child = e === null ? Bc(t, null, n, r) : Mn(t, e.child, n, r);
}
function Zo(e, t, n, r, l) {
  n = n.render;
  var s = t.ref;
  return (
    Pn(t, l),
    (r = Ta(e, t, n, r, s, l)),
    (n = Ra()),
    e !== null && !Te
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        vt(e, t, l))
      : (G && n && va(t), (t.flags |= 1), je(e, t, r, l), t.child)
  );
}
function Yo(e, t, n, r, l) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" &&
      !Da(s) &&
      s.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), pd(e, t, s, r, l))
      : ((e = Sl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((s = e.child), !(e.lanes & l))) {
    var a = s.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Cr), n(a, r) && e.ref === t.ref)
    )
      return vt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = $t(s, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function pd(e, t, n, r, l) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (Cr(s, r) && e.ref === t.ref)
      if (((Te = !1), (t.pendingProps = r = s), (e.lanes & l) !== 0))
        e.flags & 131072 && (Te = !0);
      else return (t.lanes = e.lanes), vt(e, t, l);
  }
  return zi(e, t, n, r, l);
}
function hd(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Q(jn, be),
        (be |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = s !== null ? s.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Q(jn, be),
          (be |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = s !== null ? s.baseLanes : n),
        Q(jn, be),
        (be |= r);
    }
  else
    s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Q(jn, be),
      (be |= r);
  return je(e, t, l, n), t.child;
}
function md(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function zi(e, t, n, r, l) {
  var s = ze(n) ? Xt : xe.current;
  return (
    (s = zn(t, s)),
    Pn(t, l),
    (n = Ta(e, t, n, r, s, l)),
    (r = Ra()),
    e !== null && !Te
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        vt(e, t, l))
      : (G && r && va(t), (t.flags |= 1), je(e, t, n, l), t.child)
  );
}
function Xo(e, t, n, r, l) {
  if (ze(n)) {
    var s = !0;
    bl(t);
  } else s = !1;
  if ((Pn(t, l), t.stateNode === null))
    kl(e, t), cd(t, n, r), Ti(t, n, r, l), (r = !0);
  else if (e === null) {
    var a = t.stateNode,
      o = t.memoizedProps;
    a.props = o;
    var u = a.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = Ke(c))
      : ((c = ze(n) ? Xt : xe.current), (c = zn(t, c)));
    var f = n.getDerivedStateFromProps,
      h =
        typeof f == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    h ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((o !== r || u !== c) && Qo(t, a, r, c)),
      (jt = !1);
    var g = t.memoizedState;
    (a.state = g),
      Ol(t, r, a, l),
      (u = t.memoizedState),
      o !== r || g !== u || Re.current || jt
        ? (typeof f == "function" && (Pi(t, n, f, r), (u = t.memoizedState)),
          (o = jt || Wo(t, n, o, r, g, u, c))
            ? (h ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (a.props = r),
          (a.state = u),
          (a.context = c),
          (r = o))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (a = t.stateNode),
      Vc(e, t),
      (o = t.memoizedProps),
      (c = t.type === t.elementType ? o : Ye(t.type, o)),
      (a.props = c),
      (h = t.pendingProps),
      (g = a.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = Ke(u))
        : ((u = ze(n) ? Xt : xe.current), (u = zn(t, u)));
    var y = n.getDerivedStateFromProps;
    (f =
      typeof y == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((o !== h || g !== u) && Qo(t, a, r, u)),
      (jt = !1),
      (g = t.memoizedState),
      (a.state = g),
      Ol(t, r, a, l);
    var k = t.memoizedState;
    o !== h || g !== k || Re.current || jt
      ? (typeof y == "function" && (Pi(t, n, y, r), (k = t.memoizedState)),
        (c = jt || Wo(t, n, c, r, g, k, u) || !1)
          ? (f ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, k, u),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, k, u)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (o === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (o === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (a.props = r),
        (a.state = k),
        (a.context = u),
        (r = c))
      : (typeof a.componentDidUpdate != "function" ||
          (o === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (o === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Li(e, t, n, r, s, l);
}
function Li(e, t, n, r, l, s) {
  md(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && Io(t, n, !1), vt(e, t, s);
  (r = t.stateNode), (bh.current = t);
  var o =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = Mn(t, e.child, null, s)), (t.child = Mn(t, null, o, s)))
      : je(e, t, o, s),
    (t.memoizedState = r.state),
    l && Io(t, n, !0),
    t.child
  );
}
function gd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Fo(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Fo(e, t.context, !1),
    Na(e, t.containerInfo);
}
function Jo(e, t, n, r, l) {
  return Ln(), xa(l), (t.flags |= 256), je(e, t, n, r), t.child;
}
var Mi = { dehydrated: null, treeContext: null, retryLane: 0 };
function bi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vd(e, t, n) {
  var r = t.pendingProps,
    l = Z.current,
    s = !1,
    a = (t.flags & 128) !== 0,
    o;
  if (
    ((o = a) ||
      (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    o
      ? ((s = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    Q(Z, l & 1),
    e === null)
  )
    return (
      Ei(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && s !== null
                ? ((s.childLanes = 0), (s.pendingProps = a))
                : (s = ds(a, r, 0, null)),
              (e = Yt(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = bi(n)),
              (t.memoizedState = Mi),
              e)
            : Ma(t, a))
    );
  if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null)))
    return $h(e, t, a, r, o, l, n);
  if (s) {
    (s = r.fallback), (a = t.mode), (l = e.child), (o = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = $t(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      o !== null ? (s = $t(o, s)) : ((s = Yt(s, a, n, null)), (s.flags |= 2)),
      (s.return = t),
      (r.return = t),
      (r.sibling = s),
      (t.child = r),
      (r = s),
      (s = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? bi(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (s.memoizedState = a),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = Mi),
      r
    );
  }
  return (
    (s = e.child),
    (e = s.sibling),
    (r = $t(s, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ma(e, t) {
  return (
    (t = ds({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function al(e, t, n, r) {
  return (
    r !== null && xa(r),
    Mn(t, e.child, null, n),
    (e = Ma(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function $h(e, t, n, r, l, s, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = qs(Error(P(422)))), al(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((s = r.fallback),
          (l = t.mode),
          (r = ds({ mode: "visible", children: r.children }, l, 0, null)),
          (s = Yt(s, l, a, null)),
          (s.flags |= 2),
          (r.return = t),
          (s.return = t),
          (r.sibling = s),
          (t.child = r),
          t.mode & 1 && Mn(t, e.child, null, a),
          (t.child.memoizedState = bi(a)),
          (t.memoizedState = Mi),
          s);
  if (!(t.mode & 1)) return al(e, t, a, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
    return (r = o), (s = Error(P(419))), (r = qs(s, r, void 0)), al(e, t, a, r);
  }
  if (((o = (a & e.childLanes) !== 0), Te || o)) {
    if (((r = ue), r !== null)) {
      switch (a & -a) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | a) ? 0 : l),
        l !== 0 &&
          l !== s.retryLane &&
          ((s.retryLane = l), gt(e, l), tt(r, e, l, -1));
    }
    return Oa(), (r = qs(Error(P(421)))), al(e, t, a, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Kh.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = s.treeContext),
      (Fe = zt(l.nextSibling)),
      (Ie = t),
      (G = !0),
      (Je = null),
      e !== null &&
        ((Ue[Ve++] = dt),
        (Ue[Ve++] = ft),
        (Ue[Ve++] = Jt),
        (dt = e.id),
        (ft = e.overflow),
        (Jt = t)),
      (t = Ma(t, r.children)),
      (t.flags |= 4096),
      t);
}
function eu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), _i(e.return, t, n);
}
function Ks(e, t, n, r, l) {
  var s = e.memoizedState;
  s === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((s.isBackwards = t),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = r),
      (s.tail = n),
      (s.tailMode = l));
}
function yd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    s = r.tail;
  if ((je(e, t, r.children, n), (r = Z.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && eu(e, n, t);
        else if (e.tag === 19) eu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Q(Z, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Dl(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Ks(t, !1, l, n, s);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Dl(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Ks(t, !0, n, null, s);
        break;
      case "together":
        Ks(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function kl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function vt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (tn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(P(153));
  if (t.child !== null) {
    for (
      e = t.child, n = $t(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = $t(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Fh(e, t, n) {
  switch (t.tag) {
    case 3:
      gd(t), Ln();
      break;
    case 5:
      Hc(t);
      break;
    case 1:
      ze(t.type) && bl(t);
      break;
    case 4:
      Na(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      Q(Il, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Q(Z, Z.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? vd(e, t, n)
            : (Q(Z, Z.current & 1),
              (e = vt(e, t, n)),
              e !== null ? e.sibling : null);
      Q(Z, Z.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return yd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        Q(Z, Z.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), hd(e, t, n);
  }
  return vt(e, t, n);
}
var xd, $i, kd, wd;
xd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
$i = function () {};
kd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Gt(ot.current);
    var s = null;
    switch (n) {
      case "input":
        (l = ri(e, l)), (r = ri(e, r)), (s = []);
        break;
      case "select":
        (l = X({}, l, { value: void 0 })),
          (r = X({}, r, { value: void 0 })),
          (s = []);
        break;
      case "textarea":
        (l = ii(e, l)), (r = ii(e, r)), (s = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ll);
    }
    oi(n, r);
    var a;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var o = l[c];
          for (a in o) o.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (vr.hasOwnProperty(c)
              ? s || (s = [])
              : (s = s || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (
        ((o = l != null ? l[c] : void 0),
        r.hasOwnProperty(c) && u !== o && (u != null || o != null))
      )
        if (c === "style")
          if (o) {
            for (a in o)
              !o.hasOwnProperty(a) ||
                (u && u.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in u)
              u.hasOwnProperty(a) &&
                o[a] !== u[a] &&
                (n || (n = {}), (n[a] = u[a]));
          } else n || (s || (s = []), s.push(c, n)), (n = u);
        else
          c === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (o = o ? o.__html : void 0),
              u != null && o !== u && (s = s || []).push(c, u))
            : c === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (s = s || []).push(c, "" + u)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (vr.hasOwnProperty(c)
                  ? (u != null && c === "onScroll" && q("scroll", e),
                    s || o === u || (s = []))
                  : (s = s || []).push(c, u));
    }
    n && (s = s || []).push("style", n);
    var c = s;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
wd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Kn(e, t) {
  if (!G)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ge(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Ih(e, t, n) {
  var r = t.pendingProps;
  switch ((ya(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ge(t), null;
    case 1:
      return ze(t.type) && Ml(), ge(t), null;
    case 3:
      return (
        (r = t.stateNode),
        bn(),
        K(Re),
        K(xe),
        _a(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (sl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Je !== null && (Vi(Je), (Je = null)))),
        $i(e, t),
        ge(t),
        null
      );
    case 5:
      Ea(t);
      var l = Gt(Tr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        kd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(P(166));
          return ge(t), null;
        }
        if (((e = Gt(ot.current)), sl(t))) {
          (r = t.stateNode), (n = t.type);
          var s = t.memoizedProps;
          switch (((r[it] = t), (r[_r] = s), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              q("cancel", r), q("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              q("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < rr.length; l++) q(rr[l], r);
              break;
            case "source":
              q("error", r);
              break;
            case "img":
            case "image":
            case "link":
              q("error", r), q("load", r);
              break;
            case "details":
              q("toggle", r);
              break;
            case "input":
              oo(r, s), q("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!s.multiple }),
                q("invalid", r);
              break;
            case "textarea":
              co(r, s), q("invalid", r);
          }
          oi(n, s), (l = null);
          for (var a in s)
            if (s.hasOwnProperty(a)) {
              var o = s[a];
              a === "children"
                ? typeof o == "string"
                  ? r.textContent !== o &&
                    (s.suppressHydrationWarning !== !0 &&
                      ll(r.textContent, o, e),
                    (l = ["children", o]))
                  : typeof o == "number" &&
                    r.textContent !== "" + o &&
                    (s.suppressHydrationWarning !== !0 &&
                      ll(r.textContent, o, e),
                    (l = ["children", "" + o]))
                : vr.hasOwnProperty(a) &&
                  o != null &&
                  a === "onScroll" &&
                  q("scroll", r);
            }
          switch (n) {
            case "input":
              Zr(r), uo(r, s, !0);
              break;
            case "textarea":
              Zr(r), fo(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (r.onclick = Ll);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (a = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Gu(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === "select" &&
                      ((a = e),
                      r.multiple
                        ? (a.multiple = !0)
                        : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[it] = t),
            (e[_r] = r),
            xd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = ui(n, r)), n)) {
              case "dialog":
                q("cancel", e), q("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                q("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < rr.length; l++) q(rr[l], e);
                l = r;
                break;
              case "source":
                q("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                q("error", e), q("load", e), (l = r);
                break;
              case "details":
                q("toggle", e), (l = r);
                break;
              case "input":
                oo(e, r), (l = ri(e, r)), q("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = X({}, r, { value: void 0 })),
                  q("invalid", e);
                break;
              case "textarea":
                co(e, r), (l = ii(e, r)), q("invalid", e);
                break;
              default:
                l = r;
            }
            oi(n, l), (o = l);
            for (s in o)
              if (o.hasOwnProperty(s)) {
                var u = o[s];
                s === "style"
                  ? Xu(e, u)
                  : s === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && Zu(e, u))
                    : s === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && yr(e, u)
                        : typeof u == "number" && yr(e, "" + u)
                      : s !== "suppressContentEditableWarning" &&
                        s !== "suppressHydrationWarning" &&
                        s !== "autoFocus" &&
                        (vr.hasOwnProperty(s)
                          ? u != null && s === "onScroll" && q("scroll", e)
                          : u != null && ra(e, s, u, a));
              }
            switch (n) {
              case "input":
                Zr(e), uo(e, r, !1);
                break;
              case "textarea":
                Zr(e), fo(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + It(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null
                    ? Cn(e, !!r.multiple, s, !1)
                    : r.defaultValue != null &&
                      Cn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ll);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ge(t), null;
    case 6:
      if (e && t.stateNode != null) wd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(P(166));
        if (((n = Gt(Tr.current)), Gt(ot.current), sl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[it] = t),
            (s = r.nodeValue !== n) && ((e = Ie), e !== null))
          )
            switch (e.tag) {
              case 3:
                ll(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ll(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          s && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[it] = t),
            (t.stateNode = r);
      }
      return ge(t), null;
    case 13:
      if (
        (K(Z),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (G && Fe !== null && t.mode & 1 && !(t.flags & 128))
          Oc(), Ln(), (t.flags |= 98560), (s = !1);
        else if (((s = sl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!s) throw Error(P(318));
            if (
              ((s = t.memoizedState),
              (s = s !== null ? s.dehydrated : null),
              !s)
            )
              throw Error(P(317));
            s[it] = t;
          } else
            Ln(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ge(t), (s = !1);
        } else Je !== null && (Vi(Je), (Je = null)), (s = !0);
        if (!s) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Z.current & 1 ? se === 0 && (se = 3) : Oa())),
          t.updateQueue !== null && (t.flags |= 4),
          ge(t),
          null);
    case 4:
      return (
        bn(), $i(e, t), e === null && Nr(t.stateNode.containerInfo), ge(t), null
      );
    case 10:
      return ja(t.type._context), ge(t), null;
    case 17:
      return ze(t.type) && Ml(), ge(t), null;
    case 19:
      if ((K(Z), (s = t.memoizedState), s === null)) return ge(t), null;
      if (((r = (t.flags & 128) !== 0), (a = s.rendering), a === null))
        if (r) Kn(s, !1);
        else {
          if (se !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Dl(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    Kn(s, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (a = s.alternate),
                    a === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = a.childLanes),
                        (s.lanes = a.lanes),
                        (s.child = a.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = a.memoizedProps),
                        (s.memoizedState = a.memoizedState),
                        (s.updateQueue = a.updateQueue),
                        (s.type = a.type),
                        (e = a.dependencies),
                        (s.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Q(Z, (Z.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          s.tail !== null &&
            ne() > Fn &&
            ((t.flags |= 128), (r = !0), Kn(s, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Dl(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Kn(s, !0),
              s.tail === null && s.tailMode === "hidden" && !a.alternate && !G)
            )
              return ge(t), null;
          } else
            2 * ne() - s.renderingStartTime > Fn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Kn(s, !1), (t.lanes = 4194304));
        s.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = s.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (s.last = a));
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = ne()),
          (t.sibling = null),
          (n = Z.current),
          Q(Z, r ? (n & 1) | 2 : n & 1),
          t)
        : (ge(t), null);
    case 22:
    case 23:
      return (
        Aa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? be & 1073741824 && (ge(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ge(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(P(156, t.tag));
}
function Ah(e, t) {
  switch ((ya(t), t.tag)) {
    case 1:
      return (
        ze(t.type) && Ml(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        bn(),
        K(Re),
        K(xe),
        _a(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ea(t), null;
    case 13:
      if ((K(Z), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(P(340));
        Ln();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return K(Z), null;
    case 4:
      return bn(), null;
    case 10:
      return ja(t.type._context), null;
    case 22:
    case 23:
      return Aa(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ol = !1,
  ve = !1,
  Oh = typeof WeakSet == "function" ? WeakSet : Set,
  z = null;
function wn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        J(e, t, r);
      }
    else n.current = null;
}
function Fi(e, t, n) {
  try {
    n();
  } catch (r) {
    J(e, t, r);
  }
}
var tu = !1;
function Dh(e, t) {
  if (((xi = Tl), (e = Ec()), ga(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            s = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, s.nodeType;
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            o = -1,
            u = -1,
            c = 0,
            f = 0,
            h = e,
            g = null;
          t: for (;;) {
            for (
              var y;
              h !== n || (l !== 0 && h.nodeType !== 3) || (o = a + l),
                h !== s || (r !== 0 && h.nodeType !== 3) || (u = a + r),
                h.nodeType === 3 && (a += h.nodeValue.length),
                (y = h.firstChild) !== null;

            )
              (g = h), (h = y);
            for (;;) {
              if (h === e) break t;
              if (
                (g === n && ++c === l && (o = a),
                g === s && ++f === r && (u = a),
                (y = h.nextSibling) !== null)
              )
                break;
              (h = g), (g = h.parentNode);
            }
            h = y;
          }
          n = o === -1 || u === -1 ? null : { start: o, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ki = { focusedElem: e, selectionRange: n }, Tl = !1, z = t; z !== null; )
    if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (z = e);
    else
      for (; z !== null; ) {
        t = z;
        try {
          var k = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var S = k.memoizedProps,
                    x = k.memoizedState,
                    d = t.stateNode,
                    p = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Ye(t.type, S),
                      x,
                    );
                  d.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(P(163));
            }
        } catch (w) {
          J(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (z = e);
          break;
        }
        z = t.return;
      }
  return (k = tu), (tu = !1), k;
}
function cr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var s = l.destroy;
        (l.destroy = void 0), s !== void 0 && Fi(t, n, s);
      }
      l = l.next;
    } while (l !== r);
  }
}
function us(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ii(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function jd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), jd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[it], delete t[_r], delete t[Si], delete t[jh], delete t[Sh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Sd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function nu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Sd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ai(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ll));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ai(e, t, n), e = e.sibling; e !== null; ) Ai(e, t, n), (e = e.sibling);
}
function Oi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Oi(e, t, n), e = e.sibling; e !== null; ) Oi(e, t, n), (e = e.sibling);
}
var ce = null,
  Xe = !1;
function kt(e, t, n) {
  for (n = n.child; n !== null; ) Cd(e, t, n), (n = n.sibling);
}
function Cd(e, t, n) {
  if (at && typeof at.onCommitFiberUnmount == "function")
    try {
      at.onCommitFiberUnmount(ts, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ve || wn(n, t);
    case 6:
      var r = ce,
        l = Xe;
      (ce = null),
        kt(e, t, n),
        (ce = r),
        (Xe = l),
        ce !== null &&
          (Xe
            ? ((e = ce),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ce.removeChild(n.stateNode));
      break;
    case 18:
      ce !== null &&
        (Xe
          ? ((e = ce),
            (n = n.stateNode),
            e.nodeType === 8
              ? Bs(e.parentNode, n)
              : e.nodeType === 1 && Bs(e, n),
            jr(e))
          : Bs(ce, n.stateNode));
      break;
    case 4:
      (r = ce),
        (l = Xe),
        (ce = n.stateNode.containerInfo),
        (Xe = !0),
        kt(e, t, n),
        (ce = r),
        (Xe = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ve &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var s = l,
            a = s.destroy;
          (s = s.tag),
            a !== void 0 && (s & 2 || s & 4) && Fi(n, t, a),
            (l = l.next);
        } while (l !== r);
      }
      kt(e, t, n);
      break;
    case 1:
      if (
        !ve &&
        (wn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (o) {
          J(n, t, o);
        }
      kt(e, t, n);
      break;
    case 21:
      kt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ve = (r = ve) || n.memoizedState !== null), kt(e, t, n), (ve = r))
        : kt(e, t, n);
      break;
    default:
      kt(e, t, n);
  }
}
function ru(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Oh()),
      t.forEach(function (r) {
        var l = Gh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ze(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var s = e,
          a = t,
          o = a;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 5:
              (ce = o.stateNode), (Xe = !1);
              break e;
            case 3:
              (ce = o.stateNode.containerInfo), (Xe = !0);
              break e;
            case 4:
              (ce = o.stateNode.containerInfo), (Xe = !0);
              break e;
          }
          o = o.return;
        }
        if (ce === null) throw Error(P(160));
        Cd(s, a, l), (ce = null), (Xe = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (c) {
        J(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Nd(t, e), (t = t.sibling);
}
function Nd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ze(t, e), lt(e), r & 4)) {
        try {
          cr(3, e, e.return), us(3, e);
        } catch (S) {
          J(e, e.return, S);
        }
        try {
          cr(5, e, e.return);
        } catch (S) {
          J(e, e.return, S);
        }
      }
      break;
    case 1:
      Ze(t, e), lt(e), r & 512 && n !== null && wn(n, n.return);
      break;
    case 5:
      if (
        (Ze(t, e),
        lt(e),
        r & 512 && n !== null && wn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          yr(l, "");
        } catch (S) {
          J(e, e.return, S);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var s = e.memoizedProps,
          a = n !== null ? n.memoizedProps : s,
          o = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            o === "input" && s.type === "radio" && s.name != null && qu(l, s),
              ui(o, a);
            var c = ui(o, s);
            for (a = 0; a < u.length; a += 2) {
              var f = u[a],
                h = u[a + 1];
              f === "style"
                ? Xu(l, h)
                : f === "dangerouslySetInnerHTML"
                  ? Zu(l, h)
                  : f === "children"
                    ? yr(l, h)
                    : ra(l, f, h, c);
            }
            switch (o) {
              case "input":
                li(l, s);
                break;
              case "textarea":
                Ku(l, s);
                break;
              case "select":
                var g = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!s.multiple;
                var y = s.value;
                y != null
                  ? Cn(l, !!s.multiple, y, !1)
                  : g !== !!s.multiple &&
                    (s.defaultValue != null
                      ? Cn(l, !!s.multiple, s.defaultValue, !0)
                      : Cn(l, !!s.multiple, s.multiple ? [] : "", !1));
            }
            l[_r] = s;
          } catch (S) {
            J(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Ze(t, e), lt(e), r & 4)) {
        if (e.stateNode === null) throw Error(P(162));
        (l = e.stateNode), (s = e.memoizedProps);
        try {
          l.nodeValue = s;
        } catch (S) {
          J(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (Ze(t, e), lt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          jr(t.containerInfo);
        } catch (S) {
          J(e, e.return, S);
        }
      break;
    case 4:
      Ze(t, e), lt(e);
      break;
    case 13:
      Ze(t, e),
        lt(e),
        (l = e.child),
        l.flags & 8192 &&
          ((s = l.memoizedState !== null),
          (l.stateNode.isHidden = s),
          !s ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Fa = ne())),
        r & 4 && ru(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ve = (c = ve) || f), Ze(t, e), (ve = c)) : Ze(t, e),
        lt(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !f && e.mode & 1)
        )
          for (z = e, f = e.child; f !== null; ) {
            for (h = z = f; z !== null; ) {
              switch (((g = z), (y = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  cr(4, g, g.return);
                  break;
                case 1:
                  wn(g, g.return);
                  var k = g.stateNode;
                  if (typeof k.componentWillUnmount == "function") {
                    (r = g), (n = g.return);
                    try {
                      (t = r),
                        (k.props = t.memoizedProps),
                        (k.state = t.memoizedState),
                        k.componentWillUnmount();
                    } catch (S) {
                      J(r, n, S);
                    }
                  }
                  break;
                case 5:
                  wn(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    su(h);
                    continue;
                  }
              }
              y !== null ? ((y.return = g), (z = y)) : su(h);
            }
            f = f.sibling;
          }
        e: for (f = null, h = e; ; ) {
          if (h.tag === 5) {
            if (f === null) {
              f = h;
              try {
                (l = h.stateNode),
                  c
                    ? ((s = l.style),
                      typeof s.setProperty == "function"
                        ? s.setProperty("display", "none", "important")
                        : (s.display = "none"))
                    : ((o = h.stateNode),
                      (u = h.memoizedProps.style),
                      (a =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (o.style.display = Yu("display", a)));
              } catch (S) {
                J(e, e.return, S);
              }
            }
          } else if (h.tag === 6) {
            if (f === null)
              try {
                h.stateNode.nodeValue = c ? "" : h.memoizedProps;
              } catch (S) {
                J(e, e.return, S);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            (h.child.return = h), (h = h.child);
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            f === h && (f = null), (h = h.return);
          }
          f === h && (f = null), (h.sibling.return = h.return), (h = h.sibling);
        }
      }
      break;
    case 19:
      Ze(t, e), lt(e), r & 4 && ru(e);
      break;
    case 21:
      break;
    default:
      Ze(t, e), lt(e);
  }
}
function lt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Sd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(P(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (yr(l, ""), (r.flags &= -33));
          var s = nu(e);
          Oi(e, s, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            o = nu(e);
          Ai(e, o, a);
          break;
        default:
          throw Error(P(161));
      }
    } catch (u) {
      J(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Bh(e, t, n) {
  (z = e), Ed(e);
}
function Ed(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z,
      s = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || ol;
      if (!a) {
        var o = l.alternate,
          u = (o !== null && o.memoizedState !== null) || ve;
        o = ol;
        var c = ve;
        if (((ol = a), (ve = u) && !c))
          for (z = l; z !== null; )
            (a = z),
              (u = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? iu(l)
                : u !== null
                  ? ((u.return = a), (z = u))
                  : iu(l);
        for (; s !== null; ) (z = s), Ed(s), (s = s.sibling);
        (z = l), (ol = o), (ve = c);
      }
      lu(e);
    } else
      l.subtreeFlags & 8772 && s !== null ? ((s.return = l), (z = s)) : lu(e);
  }
}
function lu(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ve || us(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ve)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ye(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var s = t.updateQueue;
              s !== null && Uo(t, s, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Uo(t, a, n);
              }
              break;
            case 5:
              var o = t.stateNode;
              if (n === null && t.flags & 4) {
                n = o;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var f = c.memoizedState;
                  if (f !== null) {
                    var h = f.dehydrated;
                    h !== null && jr(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(P(163));
          }
        ve || (t.flags & 512 && Ii(t));
      } catch (g) {
        J(t, t.return, g);
      }
    }
    if (t === e) {
      z = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (z = n);
      break;
    }
    z = t.return;
  }
}
function su(e) {
  for (; z !== null; ) {
    var t = z;
    if (t === e) {
      z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (z = n);
      break;
    }
    z = t.return;
  }
}
function iu(e) {
  for (; z !== null; ) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            us(4, t);
          } catch (u) {
            J(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              J(t, l, u);
            }
          }
          var s = t.return;
          try {
            Ii(t);
          } catch (u) {
            J(t, s, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Ii(t);
          } catch (u) {
            J(t, a, u);
          }
      }
    } catch (u) {
      J(t, t.return, u);
    }
    if (t === e) {
      z = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      (o.return = t.return), (z = o);
      break;
    }
    z = t.return;
  }
}
var Uh = Math.ceil,
  Vl = yt.ReactCurrentDispatcher,
  ba = yt.ReactCurrentOwner,
  qe = yt.ReactCurrentBatchConfig,
  D = 0,
  ue = null,
  re = null,
  fe = 0,
  be = 0,
  jn = Dt(0),
  se = 0,
  Mr = null,
  tn = 0,
  cs = 0,
  $a = 0,
  dr = null,
  Pe = null,
  Fa = 0,
  Fn = 1 / 0,
  ut = null,
  Hl = !1,
  Di = null,
  Mt = null,
  ul = !1,
  Et = null,
  Wl = 0,
  fr = 0,
  Bi = null,
  wl = -1,
  jl = 0;
function Ce() {
  return D & 6 ? ne() : wl !== -1 ? wl : (wl = ne());
}
function bt(e) {
  return e.mode & 1
    ? D & 2 && fe !== 0
      ? fe & -fe
      : Nh.transition !== null
        ? (jl === 0 && (jl = cc()), jl)
        : ((e = U),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : vc(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < fr) throw ((fr = 0), (Bi = null), Error(P(185)));
  Ir(e, n, r),
    (!(D & 2) || e !== ue) &&
      (e === ue && (!(D & 2) && (cs |= n), se === 4 && Ct(e, fe)),
      Le(e, r),
      n === 1 && D === 0 && !(t.mode & 1) && ((Fn = ne() + 500), is && Bt()));
}
function Le(e, t) {
  var n = e.callbackNode;
  Np(e, t);
  var r = Pl(e, e === ue ? fe : 0);
  if (r === 0)
    n !== null && mo(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && mo(n), t === 1))
      e.tag === 0 ? Ch(au.bind(null, e)) : Fc(au.bind(null, e)),
        kh(function () {
          !(D & 6) && Bt();
        }),
        (n = null);
    else {
      switch (dc(r)) {
        case 1:
          n = oa;
          break;
        case 4:
          n = oc;
          break;
        case 16:
          n = _l;
          break;
        case 536870912:
          n = uc;
          break;
        default:
          n = _l;
      }
      n = bd(n, _d.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function _d(e, t) {
  if (((wl = -1), (jl = 0), D & 6)) throw Error(P(327));
  var n = e.callbackNode;
  if (Tn() && e.callbackNode !== n) return null;
  var r = Pl(e, e === ue ? fe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ql(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var s = Td();
    (ue !== e || fe !== t) && ((ut = null), (Fn = ne() + 500), Zt(e, t));
    do
      try {
        Wh();
        break;
      } catch (o) {
        Pd(e, o);
      }
    while (!0);
    wa(),
      (Vl.current = s),
      (D = l),
      re !== null ? (t = 0) : ((ue = null), (fe = 0), (t = se));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = hi(e)), l !== 0 && ((r = l), (t = Ui(e, l)))), t === 1)
    )
      throw ((n = Mr), Zt(e, 0), Ct(e, r), Le(e, ne()), n);
    if (t === 6) Ct(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Vh(l) &&
          ((t = Ql(e, r)),
          t === 2 && ((s = hi(e)), s !== 0 && ((r = s), (t = Ui(e, s)))),
          t === 1))
      )
        throw ((n = Mr), Zt(e, 0), Ct(e, r), Le(e, ne()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          Qt(e, Pe, ut);
          break;
        case 3:
          if (
            (Ct(e, r), (r & 130023424) === r && ((t = Fa + 500 - ne()), 10 < t))
          ) {
            if (Pl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ce(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = ji(Qt.bind(null, e, Pe, ut), t);
            break;
          }
          Qt(e, Pe, ut);
          break;
        case 4:
          if ((Ct(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - et(r);
            (s = 1 << a), (a = t[a]), a > l && (l = a), (r &= ~s);
          }
          if (
            ((r = l),
            (r = ne() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Uh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ji(Qt.bind(null, e, Pe, ut), r);
            break;
          }
          Qt(e, Pe, ut);
          break;
        case 5:
          Qt(e, Pe, ut);
          break;
        default:
          throw Error(P(329));
      }
    }
  }
  return Le(e, ne()), e.callbackNode === n ? _d.bind(null, e) : null;
}
function Ui(e, t) {
  var n = dr;
  return (
    e.current.memoizedState.isDehydrated && (Zt(e, t).flags |= 256),
    (e = Ql(e, t)),
    e !== 2 && ((t = Pe), (Pe = n), t !== null && Vi(t)),
    e
  );
}
function Vi(e) {
  Pe === null ? (Pe = e) : Pe.push.apply(Pe, e);
}
function Vh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            s = l.getSnapshot;
          l = l.value;
          try {
            if (!nt(s(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Ct(e, t) {
  for (
    t &= ~$a,
      t &= ~cs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - et(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function au(e) {
  if (D & 6) throw Error(P(327));
  Tn();
  var t = Pl(e, 0);
  if (!(t & 1)) return Le(e, ne()), null;
  var n = Ql(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = hi(e);
    r !== 0 && ((t = r), (n = Ui(e, r)));
  }
  if (n === 1) throw ((n = Mr), Zt(e, 0), Ct(e, t), Le(e, ne()), n);
  if (n === 6) throw Error(P(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Qt(e, Pe, ut),
    Le(e, ne()),
    null
  );
}
function Ia(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    (D = n), D === 0 && ((Fn = ne() + 500), is && Bt());
  }
}
function nn(e) {
  Et !== null && Et.tag === 0 && !(D & 6) && Tn();
  var t = D;
  D |= 1;
  var n = qe.transition,
    r = U;
  try {
    if (((qe.transition = null), (U = 1), e)) return e();
  } finally {
    (U = r), (qe.transition = n), (D = t), !(D & 6) && Bt();
  }
}
function Aa() {
  (be = jn.current), K(jn);
}
function Zt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), xh(n)), re !== null))
    for (n = re.return; n !== null; ) {
      var r = n;
      switch ((ya(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Ml();
          break;
        case 3:
          bn(), K(Re), K(xe), _a();
          break;
        case 5:
          Ea(r);
          break;
        case 4:
          bn();
          break;
        case 13:
          K(Z);
          break;
        case 19:
          K(Z);
          break;
        case 10:
          ja(r.type._context);
          break;
        case 22:
        case 23:
          Aa();
      }
      n = n.return;
    }
  if (
    ((ue = e),
    (re = e = $t(e.current, null)),
    (fe = be = t),
    (se = 0),
    (Mr = null),
    ($a = cs = tn = 0),
    (Pe = dr = null),
    Kt !== null)
  ) {
    for (t = 0; t < Kt.length; t++)
      if (((n = Kt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          s = n.pending;
        if (s !== null) {
          var a = s.next;
          (s.next = l), (r.next = a);
        }
        n.pending = r;
      }
    Kt = null;
  }
  return e;
}
function Pd(e, t) {
  do {
    var n = re;
    try {
      if ((wa(), (yl.current = Ul), Bl)) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        Bl = !1;
      }
      if (
        ((en = 0),
        (oe = le = Y = null),
        (ur = !1),
        (Rr = 0),
        (ba.current = null),
        n === null || n.return === null)
      ) {
        (se = 1), (Mr = t), (re = null);
        break;
      }
      e: {
        var s = e,
          a = n.return,
          o = n,
          u = t;
        if (
          ((t = fe),
          (o.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var c = u,
            f = o,
            h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var g = f.alternate;
            g
              ? ((f.updateQueue = g.updateQueue),
                (f.memoizedState = g.memoizedState),
                (f.lanes = g.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var y = Ko(a);
          if (y !== null) {
            (y.flags &= -257),
              Go(y, a, o, s, t),
              y.mode & 1 && qo(s, c, t),
              (t = y),
              (u = c);
            var k = t.updateQueue;
            if (k === null) {
              var S = new Set();
              S.add(u), (t.updateQueue = S);
            } else k.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              qo(s, c, t), Oa();
              break e;
            }
            u = Error(P(426));
          }
        } else if (G && o.mode & 1) {
          var x = Ko(a);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Go(x, a, o, s, t),
              xa($n(u, o));
            break e;
          }
        }
        (s = u = $n(u, o)),
          se !== 4 && (se = 2),
          dr === null ? (dr = [s]) : dr.push(s),
          (s = a);
        do {
          switch (s.tag) {
            case 3:
              (s.flags |= 65536), (t &= -t), (s.lanes |= t);
              var d = dd(s, u, t);
              Bo(s, d);
              break e;
            case 1:
              o = u;
              var p = s.type,
                v = s.stateNode;
              if (
                !(s.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (Mt === null || !Mt.has(v))))
              ) {
                (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                var w = fd(s, o, t);
                Bo(s, w);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      zd(n);
    } catch (j) {
      (t = j), re === n && n !== null && (re = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Td() {
  var e = Vl.current;
  return (Vl.current = Ul), e === null ? Ul : e;
}
function Oa() {
  (se === 0 || se === 3 || se === 2) && (se = 4),
    ue === null || (!(tn & 268435455) && !(cs & 268435455)) || Ct(ue, fe);
}
function Ql(e, t) {
  var n = D;
  D |= 2;
  var r = Td();
  (ue !== e || fe !== t) && ((ut = null), Zt(e, t));
  do
    try {
      Hh();
      break;
    } catch (l) {
      Pd(e, l);
    }
  while (!0);
  if ((wa(), (D = n), (Vl.current = r), re !== null)) throw Error(P(261));
  return (ue = null), (fe = 0), se;
}
function Hh() {
  for (; re !== null; ) Rd(re);
}
function Wh() {
  for (; re !== null && !gp(); ) Rd(re);
}
function Rd(e) {
  var t = Md(e.alternate, e, be);
  (e.memoizedProps = e.pendingProps),
    t === null ? zd(e) : (re = t),
    (ba.current = null);
}
function zd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ah(n, t)), n !== null)) {
        (n.flags &= 32767), (re = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (se = 6), (re = null);
        return;
      }
    } else if (((n = Ih(n, t, be)), n !== null)) {
      re = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      re = t;
      return;
    }
    re = t = e;
  } while (t !== null);
  se === 0 && (se = 5);
}
function Qt(e, t, n) {
  var r = U,
    l = qe.transition;
  try {
    (qe.transition = null), (U = 1), Qh(e, t, n, r);
  } finally {
    (qe.transition = l), (U = r);
  }
  return null;
}
function Qh(e, t, n, r) {
  do Tn();
  while (Et !== null);
  if (D & 6) throw Error(P(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(P(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var s = n.lanes | n.childLanes;
  if (
    (Ep(e, s),
    e === ue && ((re = ue = null), (fe = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ul ||
      ((ul = !0),
      bd(_l, function () {
        return Tn(), null;
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    (s = qe.transition), (qe.transition = null);
    var a = U;
    U = 1;
    var o = D;
    (D |= 4),
      (ba.current = null),
      Dh(e, n),
      Nd(n, e),
      fh(ki),
      (Tl = !!xi),
      (ki = xi = null),
      (e.current = n),
      Bh(n),
      vp(),
      (D = o),
      (U = a),
      (qe.transition = s);
  } else e.current = n;
  if (
    (ul && ((ul = !1), (Et = e), (Wl = l)),
    (s = e.pendingLanes),
    s === 0 && (Mt = null),
    kp(n.stateNode),
    Le(e, ne()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Hl) throw ((Hl = !1), (e = Di), (Di = null), e);
  return (
    Wl & 1 && e.tag !== 0 && Tn(),
    (s = e.pendingLanes),
    s & 1 ? (e === Bi ? fr++ : ((fr = 0), (Bi = e))) : (fr = 0),
    Bt(),
    null
  );
}
function Tn() {
  if (Et !== null) {
    var e = dc(Wl),
      t = qe.transition,
      n = U;
    try {
      if (((qe.transition = null), (U = 16 > e ? 16 : e), Et === null))
        var r = !1;
      else {
        if (((e = Et), (Et = null), (Wl = 0), D & 6)) throw Error(P(331));
        var l = D;
        for (D |= 4, z = e.current; z !== null; ) {
          var s = z,
            a = s.child;
          if (z.flags & 16) {
            var o = s.deletions;
            if (o !== null) {
              for (var u = 0; u < o.length; u++) {
                var c = o[u];
                for (z = c; z !== null; ) {
                  var f = z;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      cr(8, f, s);
                  }
                  var h = f.child;
                  if (h !== null) (h.return = f), (z = h);
                  else
                    for (; z !== null; ) {
                      f = z;
                      var g = f.sibling,
                        y = f.return;
                      if ((jd(f), f === c)) {
                        z = null;
                        break;
                      }
                      if (g !== null) {
                        (g.return = y), (z = g);
                        break;
                      }
                      z = y;
                    }
                }
              }
              var k = s.alternate;
              if (k !== null) {
                var S = k.child;
                if (S !== null) {
                  k.child = null;
                  do {
                    var x = S.sibling;
                    (S.sibling = null), (S = x);
                  } while (S !== null);
                }
              }
              z = s;
            }
          }
          if (s.subtreeFlags & 2064 && a !== null) (a.return = s), (z = a);
          else
            e: for (; z !== null; ) {
              if (((s = z), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    cr(9, s, s.return);
                }
              var d = s.sibling;
              if (d !== null) {
                (d.return = s.return), (z = d);
                break e;
              }
              z = s.return;
            }
        }
        var p = e.current;
        for (z = p; z !== null; ) {
          a = z;
          var v = a.child;
          if (a.subtreeFlags & 2064 && v !== null) (v.return = a), (z = v);
          else
            e: for (a = p; z !== null; ) {
              if (((o = z), o.flags & 2048))
                try {
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      us(9, o);
                  }
                } catch (j) {
                  J(o, o.return, j);
                }
              if (o === a) {
                z = null;
                break e;
              }
              var w = o.sibling;
              if (w !== null) {
                (w.return = o.return), (z = w);
                break e;
              }
              z = o.return;
            }
        }
        if (
          ((D = l), Bt(), at && typeof at.onPostCommitFiberRoot == "function")
        )
          try {
            at.onPostCommitFiberRoot(ts, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (U = n), (qe.transition = t);
    }
  }
  return !1;
}
function ou(e, t, n) {
  (t = $n(n, t)),
    (t = dd(e, t, 1)),
    (e = Lt(e, t, 1)),
    (t = Ce()),
    e !== null && (Ir(e, 1, t), Le(e, t));
}
function J(e, t, n) {
  if (e.tag === 3) ou(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ou(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Mt === null || !Mt.has(r)))
        ) {
          (e = $n(n, e)),
            (e = fd(t, e, 1)),
            (t = Lt(t, e, 1)),
            (e = Ce()),
            t !== null && (Ir(t, 1, e), Le(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function qh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ue === e &&
      (fe & n) === n &&
      (se === 4 || (se === 3 && (fe & 130023424) === fe && 500 > ne() - Fa)
        ? Zt(e, 0)
        : ($a |= n)),
    Le(e, t);
}
function Ld(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Jr), (Jr <<= 1), !(Jr & 130023424) && (Jr = 4194304))
      : (t = 1));
  var n = Ce();
  (e = gt(e, t)), e !== null && (Ir(e, t, n), Le(e, n));
}
function Kh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Ld(e, n);
}
function Gh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(P(314));
  }
  r !== null && r.delete(t), Ld(e, n);
}
var Md;
Md = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Re.current) Te = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Te = !1), Fh(e, t, n);
      Te = !!(e.flags & 131072);
    }
  else (Te = !1), G && t.flags & 1048576 && Ic(t, Fl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      kl(e, t), (e = t.pendingProps);
      var l = zn(t, xe.current);
      Pn(t, n), (l = Ta(null, t, r, e, l, n));
      var s = Ra();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ze(r) ? ((s = !0), bl(t)) : (s = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Ca(t),
            (l.updater = os),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ti(t, r, e, n),
            (t = Li(null, t, r, !0, s, n)))
          : ((t.tag = 0), G && s && va(t), je(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (kl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Yh(r)),
          (e = Ye(r, e)),
          l)
        ) {
          case 0:
            t = zi(null, t, r, e, n);
            break e;
          case 1:
            t = Xo(null, t, r, e, n);
            break e;
          case 11:
            t = Zo(null, t, r, e, n);
            break e;
          case 14:
            t = Yo(null, t, r, Ye(r.type, e), n);
            break e;
        }
        throw Error(P(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        zi(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Xo(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((gd(t), e === null)) throw Error(P(387));
        (r = t.pendingProps),
          (s = t.memoizedState),
          (l = s.element),
          Vc(e, t),
          Ol(t, r, null, n);
        var a = t.memoizedState;
        if (((r = a.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            (l = $n(Error(P(423)), t)), (t = Jo(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = $n(Error(P(424)), t)), (t = Jo(e, t, r, n, l));
            break e;
          } else
            for (
              Fe = zt(t.stateNode.containerInfo.firstChild),
                Ie = t,
                G = !0,
                Je = null,
                n = Bc(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Ln(), r === l)) {
            t = vt(e, t, n);
            break e;
          }
          je(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Hc(t),
        e === null && Ei(t),
        (r = t.type),
        (l = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (a = l.children),
        wi(r, l) ? (a = null) : s !== null && wi(r, s) && (t.flags |= 32),
        md(e, t),
        je(e, t, a, n),
        t.child
      );
    case 6:
      return e === null && Ei(t), null;
    case 13:
      return vd(e, t, n);
    case 4:
      return (
        Na(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Mn(t, null, r, n)) : je(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Zo(e, t, r, l, n)
      );
    case 7:
      return je(e, t, t.pendingProps, n), t.child;
    case 8:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (s = t.memoizedProps),
          (a = l.value),
          Q(Il, r._currentValue),
          (r._currentValue = a),
          s !== null)
        )
          if (nt(s.value, a)) {
            if (s.children === l.children && !Re.current) {
              t = vt(e, t, n);
              break e;
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var o = s.dependencies;
              if (o !== null) {
                a = s.child;
                for (var u = o.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (s.tag === 1) {
                      (u = pt(-1, n & -n)), (u.tag = 2);
                      var c = s.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var f = c.pending;
                        f === null
                          ? (u.next = u)
                          : ((u.next = f.next), (f.next = u)),
                          (c.pending = u);
                      }
                    }
                    (s.lanes |= n),
                      (u = s.alternate),
                      u !== null && (u.lanes |= n),
                      _i(s.return, n, t),
                      (o.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (s.tag === 10) a = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (((a = s.return), a === null)) throw Error(P(341));
                (a.lanes |= n),
                  (o = a.alternate),
                  o !== null && (o.lanes |= n),
                  _i(a, n, t),
                  (a = s.sibling);
              } else a = s.child;
              if (a !== null) a.return = s;
              else
                for (a = s; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((s = a.sibling), s !== null)) {
                    (s.return = a.return), (a = s);
                    break;
                  }
                  a = a.return;
                }
              s = a;
            }
        je(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Pn(t, n),
        (l = Ke(l)),
        (r = r(l)),
        (t.flags |= 1),
        je(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ye(r, t.pendingProps)),
        (l = Ye(r.type, l)),
        Yo(e, t, r, l, n)
      );
    case 15:
      return pd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        kl(e, t),
        (t.tag = 1),
        ze(r) ? ((e = !0), bl(t)) : (e = !1),
        Pn(t, n),
        cd(t, r, l),
        Ti(t, r, l, n),
        Li(null, t, r, !0, e, n)
      );
    case 19:
      return yd(e, t, n);
    case 22:
      return hd(e, t, n);
  }
  throw Error(P(156, t.tag));
};
function bd(e, t) {
  return ac(e, t);
}
function Zh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function He(e, t, n, r) {
  return new Zh(e, t, n, r);
}
function Da(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Yh(e) {
  if (typeof e == "function") return Da(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === sa)) return 11;
    if (e === ia) return 14;
  }
  return 2;
}
function $t(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = He(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Sl(e, t, n, r, l, s) {
  var a = 2;
  if (((r = e), typeof e == "function")) Da(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case fn:
        return Yt(n.children, l, s, t);
      case la:
        (a = 8), (l |= 8);
        break;
      case Js:
        return (
          (e = He(12, n, t, l | 2)), (e.elementType = Js), (e.lanes = s), e
        );
      case ei:
        return (e = He(13, n, t, l)), (e.elementType = ei), (e.lanes = s), e;
      case ti:
        return (e = He(19, n, t, l)), (e.elementType = ti), (e.lanes = s), e;
      case Hu:
        return ds(n, l, s, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Uu:
              a = 10;
              break e;
            case Vu:
              a = 9;
              break e;
            case sa:
              a = 11;
              break e;
            case ia:
              a = 14;
              break e;
            case wt:
              (a = 16), (r = null);
              break e;
          }
        throw Error(P(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = He(a, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = s), t
  );
}
function Yt(e, t, n, r) {
  return (e = He(7, e, r, t)), (e.lanes = n), e;
}
function ds(e, t, n, r) {
  return (
    (e = He(22, e, r, t)),
    (e.elementType = Hu),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Gs(e, t, n) {
  return (e = He(6, e, null, t)), (e.lanes = n), e;
}
function Zs(e, t, n) {
  return (
    (t = He(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Xh(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Rs(0)),
    (this.expirationTimes = Rs(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Rs(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Ba(e, t, n, r, l, s, a, o, u) {
  return (
    (e = new Xh(e, t, n, o, u)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = He(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ca(s),
    e
  );
}
function Jh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: dn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function $d(e) {
  if (!e) return At;
  e = e._reactInternals;
  e: {
    if (sn(e) !== e || e.tag !== 1) throw Error(P(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ze(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(P(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ze(n)) return $c(e, n, t);
  }
  return t;
}
function Fd(e, t, n, r, l, s, a, o, u) {
  return (
    (e = Ba(n, r, !0, e, l, s, a, o, u)),
    (e.context = $d(null)),
    (n = e.current),
    (r = Ce()),
    (l = bt(n)),
    (s = pt(r, l)),
    (s.callback = t ?? null),
    Lt(n, s, l),
    (e.current.lanes = l),
    Ir(e, l, r),
    Le(e, r),
    e
  );
}
function fs(e, t, n, r) {
  var l = t.current,
    s = Ce(),
    a = bt(l);
  return (
    (n = $d(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = pt(s, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Lt(l, t, a)),
    e !== null && (tt(e, l, a, s), vl(e, l, a)),
    a
  );
}
function ql(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function uu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ua(e, t) {
  uu(e, t), (e = e.alternate) && uu(e, t);
}
function em() {
  return null;
}
var Id =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Va(e) {
  this._internalRoot = e;
}
ps.prototype.render = Va.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(P(409));
  fs(e, t, null, null);
};
ps.prototype.unmount = Va.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    nn(function () {
      fs(null, e, null, null);
    }),
      (t[mt] = null);
  }
};
function ps(e) {
  this._internalRoot = e;
}
ps.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = hc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < St.length && t !== 0 && t < St[n].priority; n++);
    St.splice(n, 0, e), n === 0 && gc(e);
  }
};
function Ha(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function hs(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function cu() {}
function tm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var s = r;
      r = function () {
        var c = ql(a);
        s.call(c);
      };
    }
    var a = Fd(t, r, e, 0, null, !1, !1, "", cu);
    return (
      (e._reactRootContainer = a),
      (e[mt] = a.current),
      Nr(e.nodeType === 8 ? e.parentNode : e),
      nn(),
      a
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var o = r;
    r = function () {
      var c = ql(u);
      o.call(c);
    };
  }
  var u = Ba(e, 0, !1, null, null, !1, !1, "", cu);
  return (
    (e._reactRootContainer = u),
    (e[mt] = u.current),
    Nr(e.nodeType === 8 ? e.parentNode : e),
    nn(function () {
      fs(t, u, n, r);
    }),
    u
  );
}
function ms(e, t, n, r, l) {
  var s = n._reactRootContainer;
  if (s) {
    var a = s;
    if (typeof l == "function") {
      var o = l;
      l = function () {
        var u = ql(a);
        o.call(u);
      };
    }
    fs(t, a, e, l);
  } else a = tm(n, t, e, l, r);
  return ql(a);
}
fc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = nr(t.pendingLanes);
        n !== 0 &&
          (ua(t, n | 1), Le(t, ne()), !(D & 6) && ((Fn = ne() + 500), Bt()));
      }
      break;
    case 13:
      nn(function () {
        var r = gt(e, 1);
        if (r !== null) {
          var l = Ce();
          tt(r, e, 1, l);
        }
      }),
        Ua(e, 1);
  }
};
ca = function (e) {
  if (e.tag === 13) {
    var t = gt(e, 134217728);
    if (t !== null) {
      var n = Ce();
      tt(t, e, 134217728, n);
    }
    Ua(e, 134217728);
  }
};
pc = function (e) {
  if (e.tag === 13) {
    var t = bt(e),
      n = gt(e, t);
    if (n !== null) {
      var r = Ce();
      tt(n, e, t, r);
    }
    Ua(e, t);
  }
};
hc = function () {
  return U;
};
mc = function (e, t) {
  var n = U;
  try {
    return (U = e), t();
  } finally {
    U = n;
  }
};
di = function (e, t, n) {
  switch (t) {
    case "input":
      if ((li(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ss(r);
            if (!l) throw Error(P(90));
            Qu(r), li(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ku(e, n);
      break;
    case "select":
      (t = n.value), t != null && Cn(e, !!n.multiple, t, !1);
  }
};
tc = Ia;
nc = nn;
var nm = { usingClientEntryPoint: !1, Events: [Or, gn, ss, Ju, ec, Ia] },
  Gn = {
    findFiberByHostInstance: qt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  rm = {
    bundleType: Gn.bundleType,
    version: Gn.version,
    rendererPackageName: Gn.rendererPackageName,
    rendererConfig: Gn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: yt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = sc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Gn.findFiberByHostInstance || em,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var cl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!cl.isDisabled && cl.supportsFiber)
    try {
      (ts = cl.inject(rm)), (at = cl);
    } catch {}
}
Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nm;
Oe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ha(t)) throw Error(P(200));
  return Jh(e, t, null, n);
};
Oe.createRoot = function (e, t) {
  if (!Ha(e)) throw Error(P(299));
  var n = !1,
    r = "",
    l = Id;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Ba(e, 1, !1, null, null, n, !1, r, l)),
    (e[mt] = t.current),
    Nr(e.nodeType === 8 ? e.parentNode : e),
    new Va(t)
  );
};
Oe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(P(188))
      : ((e = Object.keys(e).join(",")), Error(P(268, e)));
  return (e = sc(t)), (e = e === null ? null : e.stateNode), e;
};
Oe.flushSync = function (e) {
  return nn(e);
};
Oe.hydrate = function (e, t, n) {
  if (!hs(t)) throw Error(P(200));
  return ms(null, e, t, !0, n);
};
Oe.hydrateRoot = function (e, t, n) {
  if (!Ha(e)) throw Error(P(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    s = "",
    a = Id;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = Fd(t, null, e, 1, n ?? null, l, !1, s, a)),
    (e[mt] = t.current),
    Nr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new ps(t);
};
Oe.render = function (e, t, n) {
  if (!hs(t)) throw Error(P(200));
  return ms(null, e, t, !1, n);
};
Oe.unmountComponentAtNode = function (e) {
  if (!hs(e)) throw Error(P(40));
  return e._reactRootContainer
    ? (nn(function () {
        ms(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[mt] = null);
        });
      }),
      !0)
    : !1;
};
Oe.unstable_batchedUpdates = Ia;
Oe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!hs(n)) throw Error(P(200));
  if (e == null || e._reactInternals === void 0) throw Error(P(38));
  return ms(e, t, n, !1, r);
};
Oe.version = "18.3.1-next-f1338f8080-20240426";
function Ad() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ad);
    } catch (e) {
      console.error(e);
    }
}
Ad(), (Au.exports = Oe);
var lm = Au.exports,
  Od,
  du = lm;
(Od = du.createRoot), du.hydrateRoot;
/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function br() {
  return (
    (br = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    br.apply(this, arguments)
  );
}
var _t;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(_t || (_t = {}));
const fu = "popstate";
function sm(e) {
  e === void 0 && (e = {});
  function t(l, s) {
    let {
      pathname: a = "/",
      search: o = "",
      hash: u = "",
    } = an(l.location.hash.substr(1));
    return (
      !a.startsWith("/") && !a.startsWith(".") && (a = "/" + a),
      Hi(
        "",
        { pathname: a, search: o, hash: u },
        (s.state && s.state.usr) || null,
        (s.state && s.state.key) || "default",
      )
    );
  }
  function n(l, s) {
    let a = l.document.querySelector("base"),
      o = "";
    if (a && a.getAttribute("href")) {
      let u = l.location.href,
        c = u.indexOf("#");
      o = c === -1 ? u : u.slice(0, c);
    }
    return o + "#" + (typeof s == "string" ? s : Kl(s));
  }
  function r(l, s) {
    Wa(
      l.pathname.charAt(0) === "/",
      "relative pathnames are not supported in hash history.push(" +
        JSON.stringify(s) +
        ")",
    );
  }
  return am(t, n, r, e);
}
function ee(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Wa(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function im() {
  return Math.random().toString(36).substr(2, 8);
}
function pu(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Hi(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    br(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? an(t) : t,
      { state: n, key: (t && t.key) || r || im() },
    )
  );
}
function Kl(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function an(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function am(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: s = !1 } = r,
    a = l.history,
    o = _t.Pop,
    u = null,
    c = f();
  c == null && ((c = 0), a.replaceState(br({}, a.state, { idx: c }), ""));
  function f() {
    return (a.state || { idx: null }).idx;
  }
  function h() {
    o = _t.Pop;
    let x = f(),
      d = x == null ? null : x - c;
    (c = x), u && u({ action: o, location: S.location, delta: d });
  }
  function g(x, d) {
    o = _t.Push;
    let p = Hi(S.location, x, d);
    n && n(p, x), (c = f() + 1);
    let v = pu(p, c),
      w = S.createHref(p);
    try {
      a.pushState(v, "", w);
    } catch (j) {
      if (j instanceof DOMException && j.name === "DataCloneError") throw j;
      l.location.assign(w);
    }
    s && u && u({ action: o, location: S.location, delta: 1 });
  }
  function y(x, d) {
    o = _t.Replace;
    let p = Hi(S.location, x, d);
    n && n(p, x), (c = f());
    let v = pu(p, c),
      w = S.createHref(p);
    a.replaceState(v, "", w),
      s && u && u({ action: o, location: S.location, delta: 0 });
  }
  function k(x) {
    let d = l.location.origin !== "null" ? l.location.origin : l.location.href,
      p = typeof x == "string" ? x : Kl(x);
    return (
      (p = p.replace(/ $/, "%20")),
      ee(
        d,
        "No window.location.(origin|href) available to create URL for href: " +
          p,
      ),
      new URL(p, d)
    );
  }
  let S = {
    get action() {
      return o;
    },
    get location() {
      return e(l, a);
    },
    listen(x) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(fu, h),
        (u = x),
        () => {
          l.removeEventListener(fu, h), (u = null);
        }
      );
    },
    createHref(x) {
      return t(l, x);
    },
    createURL: k,
    encodeLocation(x) {
      let d = k(x);
      return { pathname: d.pathname, search: d.search, hash: d.hash };
    },
    push: g,
    replace: y,
    go(x) {
      return a.go(x);
    },
  };
  return S;
}
var hu;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(hu || (hu = {}));
function om(e, t, n) {
  return n === void 0 && (n = "/"), um(e, t, n);
}
function um(e, t, n, r) {
  let l = typeof t == "string" ? an(t) : t,
    s = In(l.pathname || "/", n);
  if (s == null) return null;
  let a = Dd(e);
  cm(a);
  let o = null;
  for (let u = 0; o == null && u < a.length; ++u) {
    let c = wm(s);
    o = xm(a[u], c);
  }
  return o;
}
function Dd(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (s, a, o) => {
    let u = {
      relativePath: o === void 0 ? s.path || "" : o,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: a,
      route: s,
    };
    u.relativePath.startsWith("/") &&
      (ee(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let c = Ft([r, u.relativePath]),
      f = n.concat(u);
    s.children &&
      s.children.length > 0 &&
      (ee(
        s.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + c + '".'),
      ),
      Dd(s.children, t, f, c)),
      !(s.path == null && !s.index) &&
        t.push({ path: c, score: vm(c, s.index), routesMeta: f });
  };
  return (
    e.forEach((s, a) => {
      var o;
      if (s.path === "" || !((o = s.path) != null && o.includes("?"))) l(s, a);
      else for (let u of Bd(s.path)) l(s, a, u);
    }),
    t
  );
}
function Bd(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    s = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [s, ""] : [s];
  let a = Bd(r.join("/")),
    o = [];
  return (
    o.push(...a.map((u) => (u === "" ? s : [s, u].join("/")))),
    l && o.push(...a),
    o.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function cm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : ym(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const dm = /^:[\w-]+$/,
  fm = 3,
  pm = 2,
  hm = 1,
  mm = 10,
  gm = -2,
  mu = (e) => e === "*";
function vm(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(mu) && (r += gm),
    t && (r += pm),
    n
      .filter((l) => !mu(l))
      .reduce((l, s) => l + (dm.test(s) ? fm : s === "" ? hm : mm), r)
  );
}
function ym(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function xm(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    s = "/",
    a = [];
  for (let o = 0; o < r.length; ++o) {
    let u = r[o],
      c = o === r.length - 1,
      f = s === "/" ? t : t.slice(s.length) || "/",
      h = Wi(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: c },
        f,
      ),
      g = u.route;
    if (!h) return null;
    Object.assign(l, h.params),
      a.push({
        params: l,
        pathname: Ft([s, h.pathname]),
        pathnameBase: Nm(Ft([s, h.pathnameBase])),
        route: g,
      }),
      h.pathnameBase !== "/" && (s = Ft([s, h.pathnameBase]));
  }
  return a;
}
function Wi(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = km(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let s = l[0],
    a = s.replace(/(.)\/+$/, "$1"),
    o = l.slice(1);
  return {
    params: r.reduce((c, f, h) => {
      let { paramName: g, isOptional: y } = f;
      if (g === "*") {
        let S = o[h] || "";
        a = s.slice(0, s.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const k = o[h];
      return (
        y && !k ? (c[g] = void 0) : (c[g] = (k || "").replace(/%2F/g, "/")), c
      );
    }, {}),
    pathname: s,
    pathnameBase: a,
    pattern: e,
  };
}
function km(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Wa(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (a, o, u) => (
            r.push({ paramName: o, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function wm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Wa(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function In(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function jm(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? an(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Sm(n, t)) : t,
    search: Em(r),
    hash: _m(l),
  };
}
function Sm(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Ys(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Cm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Ud(e, t) {
  let n = Cm(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Vd(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = an(e))
    : ((l = br({}, e)),
      ee(
        !l.pathname || !l.pathname.includes("?"),
        Ys("?", "pathname", "search", l),
      ),
      ee(
        !l.pathname || !l.pathname.includes("#"),
        Ys("#", "pathname", "hash", l),
      ),
      ee(!l.search || !l.search.includes("#"), Ys("#", "search", "hash", l)));
  let s = e === "" || l.pathname === "",
    a = s ? "/" : l.pathname,
    o;
  if (a == null) o = n;
  else {
    let h = t.length - 1;
    if (!r && a.startsWith("..")) {
      let g = a.split("/");
      for (; g[0] === ".."; ) g.shift(), (h -= 1);
      l.pathname = g.join("/");
    }
    o = h >= 0 ? t[h] : "/";
  }
  let u = jm(l, o),
    c = a && a !== "/" && a.endsWith("/"),
    f = (s || a === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (c || f) && (u.pathname += "/"), u;
}
const Ft = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Nm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Em = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  _m = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Pm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Hd = ["post", "put", "patch", "delete"];
new Set(Hd);
const Tm = ["get", ...Hd];
new Set(Tm);
/**
 * React Router v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function $r() {
  return (
    ($r = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $r.apply(this, arguments)
  );
}
const gs = m.createContext(null),
  Wd = m.createContext(null),
  Ut = m.createContext(null),
  vs = m.createContext(null),
  on = m.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Qd = m.createContext(null);
function Rm(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Br() || ee(!1);
  let { basename: r, navigator: l } = m.useContext(Ut),
    { hash: s, pathname: a, search: o } = xs(e, { relative: n }),
    u = a;
  return (
    r !== "/" && (u = a === "/" ? r : Ft([r, a])),
    l.createHref({ pathname: u, search: o, hash: s })
  );
}
function Br() {
  return m.useContext(vs) != null;
}
function Bn() {
  return Br() || ee(!1), m.useContext(vs).location;
}
function qd(e) {
  m.useContext(Ut).static || m.useLayoutEffect(e);
}
function ys() {
  let { isDataRoute: e } = m.useContext(on);
  return e ? Vm() : zm();
}
function zm() {
  Br() || ee(!1);
  let e = m.useContext(gs),
    { basename: t, future: n, navigator: r } = m.useContext(Ut),
    { matches: l } = m.useContext(on),
    { pathname: s } = Bn(),
    a = JSON.stringify(Ud(l, n.v7_relativeSplatPath)),
    o = m.useRef(!1);
  return (
    qd(() => {
      o.current = !0;
    }),
    m.useCallback(
      function (c, f) {
        if ((f === void 0 && (f = {}), !o.current)) return;
        if (typeof c == "number") {
          r.go(c);
          return;
        }
        let h = Vd(c, JSON.parse(a), s, f.relative === "path");
        e == null &&
          t !== "/" &&
          (h.pathname = h.pathname === "/" ? t : Ft([t, h.pathname])),
          (f.replace ? r.replace : r.push)(h, f.state, f);
      },
      [t, r, a, s, e],
    )
  );
}
function xs(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = m.useContext(Ut),
    { matches: l } = m.useContext(on),
    { pathname: s } = Bn(),
    a = JSON.stringify(Ud(l, r.v7_relativeSplatPath));
  return m.useMemo(() => Vd(e, JSON.parse(a), s, n === "path"), [e, a, s, n]);
}
function Lm(e, t) {
  return Mm(e, t);
}
function Mm(e, t, n, r) {
  Br() || ee(!1);
  let { navigator: l } = m.useContext(Ut),
    { matches: s } = m.useContext(on),
    a = s[s.length - 1],
    o = a ? a.params : {};
  a && a.pathname;
  let u = a ? a.pathnameBase : "/";
  a && a.route;
  let c = Bn(),
    f;
  if (t) {
    var h;
    let x = typeof t == "string" ? an(t) : t;
    u === "/" || ((h = x.pathname) != null && h.startsWith(u)) || ee(!1),
      (f = x);
  } else f = c;
  let g = f.pathname || "/",
    y = g;
  if (u !== "/") {
    let x = u.replace(/^\//, "").split("/");
    y = "/" + g.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let k = om(e, { pathname: y }),
    S = Am(
      k &&
        k.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, o, x.params),
            pathname: Ft([
              u,
              l.encodeLocation
                ? l.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? u
                : Ft([
                    u,
                    l.encodeLocation
                      ? l.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          }),
        ),
      s,
      n,
      r,
    );
  return t && S
    ? m.createElement(
        vs.Provider,
        {
          value: {
            location: $r(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f,
            ),
            navigationType: _t.Pop,
          },
        },
        S,
      )
    : S;
}
function bm() {
  let e = Um(),
    t = Pm(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return m.createElement(
    m.Fragment,
    null,
    m.createElement("h2", null, "Unexpected Application Error!"),
    m.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? m.createElement("pre", { style: l }, n) : null,
    null,
  );
}
const $m = m.createElement(bm, null);
class Fm extends m.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? m.createElement(
          on.Provider,
          { value: this.props.routeContext },
          m.createElement(Qd.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Im(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = m.useContext(gs);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    m.createElement(on.Provider, { value: t }, r)
  );
}
function Am(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var s;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (s = r) != null &&
      s.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let a = e,
    o = (l = n) == null ? void 0 : l.errors;
  if (o != null) {
    let f = a.findIndex(
      (h) => h.route.id && (o == null ? void 0 : o[h.route.id]) !== void 0,
    );
    f >= 0 || ee(!1), (a = a.slice(0, Math.min(a.length, f + 1)));
  }
  let u = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < a.length; f++) {
      let h = a[f];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (c = f),
        h.route.id)
      ) {
        let { loaderData: g, errors: y } = n,
          k =
            h.route.loader &&
            g[h.route.id] === void 0 &&
            (!y || y[h.route.id] === void 0);
        if (h.route.lazy || k) {
          (u = !0), c >= 0 ? (a = a.slice(0, c + 1)) : (a = [a[0]]);
          break;
        }
      }
    }
  return a.reduceRight((f, h, g) => {
    let y,
      k = !1,
      S = null,
      x = null;
    n &&
      ((y = o && h.route.id ? o[h.route.id] : void 0),
      (S = h.route.errorElement || $m),
      u &&
        (c < 0 && g === 0
          ? (Hm("route-fallback"), (k = !0), (x = null))
          : c === g &&
            ((k = !0), (x = h.route.hydrateFallbackElement || null))));
    let d = t.concat(a.slice(0, g + 1)),
      p = () => {
        let v;
        return (
          y
            ? (v = S)
            : k
              ? (v = x)
              : h.route.Component
                ? (v = m.createElement(h.route.Component, null))
                : h.route.element
                  ? (v = h.route.element)
                  : (v = f),
          m.createElement(Im, {
            match: h,
            routeContext: { outlet: f, matches: d, isDataRoute: n != null },
            children: v,
          })
        );
      };
    return n && (h.route.ErrorBoundary || h.route.errorElement || g === 0)
      ? m.createElement(Fm, {
          location: n.location,
          revalidation: n.revalidation,
          component: S,
          error: y,
          children: p(),
          routeContext: { outlet: null, matches: d, isDataRoute: !0 },
        })
      : p();
  }, null);
}
var Kd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Kd || {}),
  Gd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Gd || {});
function Om(e) {
  let t = m.useContext(gs);
  return t || ee(!1), t;
}
function Dm(e) {
  let t = m.useContext(Wd);
  return t || ee(!1), t;
}
function Bm(e) {
  let t = m.useContext(on);
  return t || ee(!1), t;
}
function Zd(e) {
  let t = Bm(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ee(!1), n.route.id;
}
function Um() {
  var e;
  let t = m.useContext(Qd),
    n = Dm(),
    r = Zd();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Vm() {
  let { router: e } = Om(Kd.UseNavigateStable),
    t = Zd(Gd.UseNavigateStable),
    n = m.useRef(!1);
  return (
    qd(() => {
      n.current = !0;
    }),
    m.useCallback(
      function (l, s) {
        s === void 0 && (s = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, $r({ fromRouteId: t }, s)));
      },
      [e, t],
    )
  );
}
const gu = {};
function Hm(e, t, n) {
  gu[e] || (gu[e] = !0);
}
function _e(e) {
  ee(!1);
}
function Wm(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = _t.Pop,
    navigator: s,
    static: a = !1,
    future: o,
  } = e;
  Br() && ee(!1);
  let u = t.replace(/^\/*/, "/"),
    c = m.useMemo(
      () => ({
        basename: u,
        navigator: s,
        static: a,
        future: $r({ v7_relativeSplatPath: !1 }, o),
      }),
      [u, o, s, a],
    );
  typeof r == "string" && (r = an(r));
  let {
      pathname: f = "/",
      search: h = "",
      hash: g = "",
      state: y = null,
      key: k = "default",
    } = r,
    S = m.useMemo(() => {
      let x = In(f, u);
      return x == null
        ? null
        : {
            location: { pathname: x, search: h, hash: g, state: y, key: k },
            navigationType: l,
          };
    }, [u, f, h, g, y, k, l]);
  return S == null
    ? null
    : m.createElement(
        Ut.Provider,
        { value: c },
        m.createElement(vs.Provider, { children: n, value: S }),
      );
}
function Qm(e) {
  let { children: t, location: n } = e;
  return Lm(Qi(t), n);
}
new Promise(() => {});
function Qi(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    m.Children.forEach(e, (r, l) => {
      if (!m.isValidElement(r)) return;
      let s = [...t, l];
      if (r.type === m.Fragment) {
        n.push.apply(n, Qi(r.props.children, s));
        return;
      }
      r.type !== _e && ee(!1), !r.props.index || !r.props.children || ee(!1);
      let a = {
        id: r.props.id || s.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (a.children = Qi(r.props.children, s)), n.push(a);
    }),
    n
  );
}
/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Gl() {
  return (
    (Gl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Gl.apply(this, arguments)
  );
}
function Yd(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    s;
  for (s = 0; s < r.length; s++)
    (l = r[s]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function qm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Km(e, t) {
  return e.button === 0 && (!t || t === "_self") && !qm(e);
}
function qi(e) {
  return (
    e === void 0 && (e = ""),
    new URLSearchParams(
      typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map((l) => [n, l]) : [[n, r]]);
          }, []),
    )
  );
}
function Gm(e, t) {
  let n = qi(e);
  return (
    t &&
      t.forEach((r, l) => {
        n.has(l) ||
          t.getAll(l).forEach((s) => {
            n.append(l, s);
          });
      }),
    n
  );
}
const Zm = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  Ym = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ],
  Xm = "6";
try {
  window.__reactRouterVersion = Xm;
} catch {}
const Jm = m.createContext({ isTransitioning: !1 }),
  eg = "startTransition",
  vu = qf[eg];
function tg(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    s = m.useRef();
  s.current == null && (s.current = sm({ window: l, v5Compat: !0 }));
  let a = s.current,
    [o, u] = m.useState({ action: a.action, location: a.location }),
    { v7_startTransition: c } = r || {},
    f = m.useCallback(
      (h) => {
        c && vu ? vu(() => u(h)) : u(h);
      },
      [u, c],
    );
  return (
    m.useLayoutEffect(() => a.listen(f), [a, f]),
    m.createElement(Wm, {
      basename: t,
      children: n,
      location: o.location,
      navigationType: o.action,
      navigator: a,
      future: r,
    })
  );
}
const ng =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  rg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  lg = m.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: s,
        replace: a,
        state: o,
        target: u,
        to: c,
        preventScrollReset: f,
        unstable_viewTransition: h,
      } = t,
      g = Yd(t, Zm),
      { basename: y } = m.useContext(Ut),
      k,
      S = !1;
    if (typeof c == "string" && rg.test(c) && ((k = c), ng))
      try {
        let v = new URL(window.location.href),
          w = c.startsWith("//") ? new URL(v.protocol + c) : new URL(c),
          j = In(w.pathname, y);
        w.origin === v.origin && j != null
          ? (c = j + w.search + w.hash)
          : (S = !0);
      } catch {}
    let x = Rm(c, { relative: l }),
      d = ag(c, {
        replace: a,
        state: o,
        target: u,
        preventScrollReset: f,
        relative: l,
        unstable_viewTransition: h,
      });
    function p(v) {
      r && r(v), v.defaultPrevented || d(v);
    }
    return m.createElement(
      "a",
      Gl({}, g, { href: k || x, onClick: S || s ? r : p, ref: n, target: u }),
    );
  }),
  sg = m.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: s = "",
        end: a = !1,
        style: o,
        to: u,
        unstable_viewTransition: c,
        children: f,
      } = t,
      h = Yd(t, Ym),
      g = xs(u, { relative: h.relative }),
      y = Bn(),
      k = m.useContext(Wd),
      { navigator: S, basename: x } = m.useContext(Ut),
      d = k != null && ug(g) && c === !0,
      p = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname,
      v = y.pathname,
      w =
        k && k.navigation && k.navigation.location
          ? k.navigation.location.pathname
          : null;
    l ||
      ((v = v.toLowerCase()),
      (w = w ? w.toLowerCase() : null),
      (p = p.toLowerCase())),
      w && x && (w = In(w, x) || w);
    const j = p !== "/" && p.endsWith("/") ? p.length - 1 : p.length;
    let _ = v === p || (!a && v.startsWith(p) && v.charAt(j) === "/"),
      N =
        w != null &&
        (w === p || (!a && w.startsWith(p) && w.charAt(p.length) === "/")),
      E = { isActive: _, isPending: N, isTransitioning: d },
      L = _ ? r : void 0,
      T;
    typeof s == "function"
      ? (T = s(E))
      : (T = [
          s,
          _ ? "active" : null,
          N ? "pending" : null,
          d ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let b = typeof o == "function" ? o(E) : o;
    return m.createElement(
      lg,
      Gl({}, h, {
        "aria-current": L,
        className: T,
        ref: n,
        style: b,
        to: u,
        unstable_viewTransition: c,
      }),
      typeof f == "function" ? f(E) : f,
    );
  });
var Ki;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(Ki || (Ki = {}));
var yu;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(yu || (yu = {}));
function ig(e) {
  let t = m.useContext(gs);
  return t || ee(!1), t;
}
function ag(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: s,
      relative: a,
      unstable_viewTransition: o,
    } = t === void 0 ? {} : t,
    u = ys(),
    c = Bn(),
    f = xs(e, { relative: a });
  return m.useCallback(
    (h) => {
      if (Km(h, n)) {
        h.preventDefault();
        let g = r !== void 0 ? r : Kl(c) === Kl(f);
        u(e, {
          replace: g,
          state: l,
          preventScrollReset: s,
          relative: a,
          unstable_viewTransition: o,
        });
      }
    },
    [c, u, f, r, l, n, e, s, a, o],
  );
}
function og(e) {
  let t = m.useRef(qi(e)),
    n = m.useRef(!1),
    r = Bn(),
    l = m.useMemo(() => Gm(r.search, n.current ? null : t.current), [r.search]),
    s = ys(),
    a = m.useCallback(
      (o, u) => {
        const c = qi(typeof o == "function" ? o(l) : o);
        (n.current = !0), s("?" + c, u);
      },
      [s, l],
    );
  return [l, a];
}
function ug(e, t) {
  t === void 0 && (t = {});
  let n = m.useContext(Jm);
  n == null && ee(!1);
  let { basename: r } = ig(Ki.useViewTransitionState),
    l = xs(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let s = In(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    a = In(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Wi(l.pathname, a) != null || Wi(l.pathname, s) != null;
}
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Xd = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var dg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fg = m.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: l = "",
      children: s,
      iconNode: a,
      ...o
    },
    u,
  ) =>
    m.createElement(
      "svg",
      {
        ref: u,
        ...dg,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: Xd("lucide", l),
        ...o,
      },
      [
        ...a.map(([c, f]) => m.createElement(c, f)),
        ...(Array.isArray(s) ? s : [s]),
      ],
    ),
);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const A = (e, t) => {
  const n = m.forwardRef(({ className: r, ...l }, s) =>
    m.createElement(fg, {
      ref: s,
      iconNode: t,
      className: Xd(`lucide-${cg(e)}`, r),
      ...l,
    }),
  );
  return (n.displayName = `${e}`), n;
};
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pg = A("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hg = A("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jd = A("AudioLines", [
  ["path", { d: "M2 10v3", key: "1fnikh" }],
  ["path", { d: "M6 6v11", key: "11sgs0" }],
  ["path", { d: "M10 3v18", key: "yhl04a" }],
  ["path", { d: "M14 8v7", key: "3a1oy3" }],
  ["path", { d: "M18 5v13", key: "123xd1" }],
  ["path", { d: "M22 10v3", key: "154ddg" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ef = A("Bot", [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  [
    "rect",
    { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" },
  ],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tf = A("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nf = A("Clapperboard", [
  [
    "path",
    {
      d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",
      key: "1tn4o7",
    },
  ],
  ["path", { d: "m6.2 5.3 3.1 3.9", key: "iuk76l" }],
  ["path", { d: "m12.4 3.4 3.1 4", key: "6hsd6n" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", key: "ltgou9" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rf = A("Database", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mg = A("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gg = A("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vg = A("FileAudio", [
  [
    "path",
    { d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "rslqgf" },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
      key: "9f7x3i",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xu = A("FileDown", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yg = A("FileImage", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  [
    "path",
    { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xg = A("FileSpreadsheet", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zl = A("FileText", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kg = A("FileVideo", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m10 11 5 3-5 3v-6Z", key: "7ntvm4" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wg = A("File", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ks = A("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jg = A("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lf = A("Image", [
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      ry: "2",
      key: "1m3agn",
    },
  ],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Sg = A("Library", [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Cg = A("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sf = A("MicVocal", [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601",
    },
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp",
    },
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ng = A("Paperclip", [
  [
    "path",
    {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      key: "1u3ebp",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Eg = A("Pause", [
  [
    "rect",
    { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" },
  ],
  [
    "rect",
    { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ku = A("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _g = A("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Pg = A("Power", [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tg = A("RefreshCw", [
  [
    "path",
    { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" },
  ],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  [
    "path",
    { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" },
  ],
  ["path", { d: "M8 16H3v5", key: "1cv678" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rg = A("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476",
    },
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zg = A("Scissors", [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Lg = A("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mg = A("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3",
    },
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bg = A("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f",
    },
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const af = A("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx",
    },
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const of = A("Table2", [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83",
    },
  ],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ws = A("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const uf = A("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cf = A("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
function Qa() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
let un = Qa();
function df(e) {
  un = e;
}
const ff = /[&<>"']/,
  $g = new RegExp(ff.source, "g"),
  pf = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  Fg = new RegExp(pf.source, "g"),
  Ig = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  wu = (e) => Ig[e];
function $e(e, t) {
  if (t) {
    if (ff.test(e)) return e.replace($g, wu);
  } else if (pf.test(e)) return e.replace(Fg, wu);
  return e;
}
const Ag = /(^|[^\[])\^/g;
function V(e, t) {
  let n = typeof e == "string" ? e : e.source;
  t = t || "";
  const r = {
    replace: (l, s) => {
      let a = typeof s == "string" ? s : s.source;
      return (a = a.replace(Ag, "$1")), (n = n.replace(l, a)), r;
    },
    getRegex: () => new RegExp(n, t),
  };
  return r;
}
function ju(e) {
  try {
    e = encodeURI(e).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return e;
}
const pr = { exec: () => null };
function Su(e, t) {
  const n = e.replace(/\|/g, (s, a, o) => {
      let u = !1,
        c = a;
      for (; --c >= 0 && o[c] === "\\"; ) u = !u;
      return u ? "|" : " |";
    }),
    r = n.split(/ \|/);
  let l = 0;
  if (
    (r[0].trim() || r.shift(),
    r.length > 0 && !r[r.length - 1].trim() && r.pop(),
    t)
  )
    if (r.length > t) r.splice(t);
    else for (; r.length < t; ) r.push("");
  for (; l < r.length; l++) r[l] = r[l].trim().replace(/\\\|/g, "|");
  return r;
}
function Zn(e, t, n) {
  const r = e.length;
  if (r === 0) return "";
  let l = 0;
  for (; l < r && e.charAt(r - l - 1) === t; ) l++;
  return e.slice(0, r - l);
}
function Og(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (e[r] === "\\") r++;
    else if (e[r] === t[0]) n++;
    else if (e[r] === t[1] && (n--, n < 0)) return r;
  return -1;
}
function Cu(e, t, n, r) {
  const l = t.href,
    s = t.title ? $e(t.title) : null,
    a = e[1].replace(/\\([\[\]])/g, "$1");
  if (e[0].charAt(0) !== "!") {
    r.state.inLink = !0;
    const o = {
      type: "link",
      raw: n,
      href: l,
      title: s,
      text: a,
      tokens: r.inlineTokens(a),
    };
    return (r.state.inLink = !1), o;
  }
  return { type: "image", raw: n, href: l, title: s, text: $e(a) };
}
function Dg(e, t) {
  const n = e.match(/^(\s+)(?:```)/);
  if (n === null) return t;
  const r = n[1];
  return t
    .split(
      `
`,
    )
    .map((l) => {
      const s = l.match(/^\s+/);
      if (s === null) return l;
      const [a] = s;
      return a.length >= r.length ? l.slice(r.length) : l;
    }).join(`
`);
}
class Yl {
  constructor(t) {
    W(this, "options");
    W(this, "rules");
    W(this, "lexer");
    this.options = t || un;
  }
  space(t) {
    const n = this.rules.block.newline.exec(t);
    if (n && n[0].length > 0) return { type: "space", raw: n[0] };
  }
  code(t) {
    const n = this.rules.block.code.exec(t);
    if (n) {
      const r = n[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic
          ? r
          : Zn(
              r,
              `
`,
            ),
      };
    }
  }
  fences(t) {
    const n = this.rules.block.fences.exec(t);
    if (n) {
      const r = n[0],
        l = Dg(r, n[3] || "");
      return {
        type: "code",
        raw: r,
        lang: n[2]
          ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
          : n[2],
        text: l,
      };
    }
  }
  heading(t) {
    const n = this.rules.block.heading.exec(t);
    if (n) {
      let r = n[2].trim();
      if (/#$/.test(r)) {
        const l = Zn(r, "#");
        (this.options.pedantic || !l || / $/.test(l)) && (r = l.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: r,
        tokens: this.lexer.inline(r),
      };
    }
  }
  hr(t) {
    const n = this.rules.block.hr.exec(t);
    if (n)
      return {
        type: "hr",
        raw: Zn(
          n[0],
          `
`,
        ),
      };
  }
  blockquote(t) {
    const n = this.rules.block.blockquote.exec(t);
    if (n) {
      let r = Zn(
          n[0],
          `
`,
        ).split(`
`),
        l = "",
        s = "";
      const a = [];
      for (; r.length > 0; ) {
        let o = !1;
        const u = [];
        let c;
        for (c = 0; c < r.length; c++)
          if (/^ {0,3}>/.test(r[c])) u.push(r[c]), (o = !0);
          else if (!o) u.push(r[c]);
          else break;
        r = r.slice(c);
        const f = u.join(`
`),
          h = f
            .replace(
              /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
              `
    $1`,
            )
            .replace(/^ {0,3}>[ \t]?/gm, "");
        (l = l
          ? `${l}
${f}`
          : f),
          (s = s
            ? `${s}
${h}`
            : h);
        const g = this.lexer.state.top;
        if (
          ((this.lexer.state.top = !0),
          this.lexer.blockTokens(h, a, !0),
          (this.lexer.state.top = g),
          r.length === 0)
        )
          break;
        const y = a[a.length - 1];
        if ((y == null ? void 0 : y.type) === "code") break;
        if ((y == null ? void 0 : y.type) === "blockquote") {
          const k = y,
            S =
              k.raw +
              `
` +
              r.join(`
`),
            x = this.blockquote(S);
          (a[a.length - 1] = x),
            (l = l.substring(0, l.length - k.raw.length) + x.raw),
            (s = s.substring(0, s.length - k.text.length) + x.text);
          break;
        } else if ((y == null ? void 0 : y.type) === "list") {
          const k = y,
            S =
              k.raw +
              `
` +
              r.join(`
`),
            x = this.list(S);
          (a[a.length - 1] = x),
            (l = l.substring(0, l.length - y.raw.length) + x.raw),
            (s = s.substring(0, s.length - k.raw.length) + x.raw),
            (r = S.substring(a[a.length - 1].raw.length).split(`
`));
          continue;
        }
      }
      return { type: "blockquote", raw: l, tokens: a, text: s };
    }
  }
  list(t) {
    let n = this.rules.block.list.exec(t);
    if (n) {
      let r = n[1].trim();
      const l = r.length > 1,
        s = {
          type: "list",
          raw: "",
          ordered: l,
          start: l ? +r.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (r = l ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`),
        this.options.pedantic && (r = l ? r : "[*+-]");
      const a = new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let o = !1;
      for (; t; ) {
        let u = !1,
          c = "",
          f = "";
        if (!(n = a.exec(t)) || this.rules.block.hr.test(t)) break;
        (c = n[0]), (t = t.substring(c.length));
        let h = n[2]
            .split(
              `
`,
              1,
            )[0]
            .replace(/^\t+/, (d) => " ".repeat(3 * d.length)),
          g = t.split(
            `
`,
            1,
          )[0],
          y = !h.trim(),
          k = 0;
        if (
          (this.options.pedantic
            ? ((k = 2), (f = h.trimStart()))
            : y
              ? (k = n[1].length + 1)
              : ((k = n[2].search(/[^ ]/)),
                (k = k > 4 ? 1 : k),
                (f = h.slice(k)),
                (k += n[1].length)),
          y &&
            /^[ \t]*$/.test(g) &&
            ((c +=
              g +
              `
`),
            (t = t.substring(g.length + 1)),
            (u = !0)),
          !u)
        ) {
          const d = new RegExp(
              `^ {0,${Math.min(3, k - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`,
            ),
            p = new RegExp(
              `^ {0,${Math.min(3, k - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
            ),
            v = new RegExp(`^ {0,${Math.min(3, k - 1)}}(?:\`\`\`|~~~)`),
            w = new RegExp(`^ {0,${Math.min(3, k - 1)}}#`),
            j = new RegExp(`^ {0,${Math.min(3, k - 1)}}<[a-z].*>`, "i");
          for (; t; ) {
            const _ = t.split(
              `
`,
              1,
            )[0];
            let N;
            if (
              ((g = _),
              this.options.pedantic
                ? ((g = g.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), (N = g))
                : (N = g.replace(/\t/g, "    ")),
              v.test(g) || w.test(g) || j.test(g) || d.test(g) || p.test(g))
            )
              break;
            if (N.search(/[^ ]/) >= k || !g.trim())
              f +=
                `
` + N.slice(k);
            else {
              if (
                y ||
                h.replace(/\t/g, "    ").search(/[^ ]/) >= 4 ||
                v.test(h) ||
                w.test(h) ||
                p.test(h)
              )
                break;
              f +=
                `
` + g;
            }
            !y && !g.trim() && (y = !0),
              (c +=
                _ +
                `
`),
              (t = t.substring(_.length + 1)),
              (h = N.slice(k));
          }
        }
        s.loose ||
          (o ? (s.loose = !0) : /\n[ \t]*\n[ \t]*$/.test(c) && (o = !0));
        let S = null,
          x;
        this.options.gfm &&
          ((S = /^\[[ xX]\] /.exec(f)),
          S && ((x = S[0] !== "[ ] "), (f = f.replace(/^\[[ xX]\] +/, "")))),
          s.items.push({
            type: "list_item",
            raw: c,
            task: !!S,
            checked: x,
            loose: !1,
            text: f,
            tokens: [],
          }),
          (s.raw += c);
      }
      (s.items[s.items.length - 1].raw =
        s.items[s.items.length - 1].raw.trimEnd()),
        (s.items[s.items.length - 1].text =
          s.items[s.items.length - 1].text.trimEnd()),
        (s.raw = s.raw.trimEnd());
      for (let u = 0; u < s.items.length; u++)
        if (
          ((this.lexer.state.top = !1),
          (s.items[u].tokens = this.lexer.blockTokens(s.items[u].text, [])),
          !s.loose)
        ) {
          const c = s.items[u].tokens.filter((h) => h.type === "space"),
            f = c.length > 0 && c.some((h) => /\n.*\n/.test(h.raw));
          s.loose = f;
        }
      if (s.loose)
        for (let u = 0; u < s.items.length; u++) s.items[u].loose = !0;
      return s;
    }
  }
  html(t) {
    const n = this.rules.block.html.exec(t);
    if (n)
      return {
        type: "html",
        block: !0,
        raw: n[0],
        pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
        text: n[0],
      };
  }
  def(t) {
    const n = this.rules.block.def.exec(t);
    if (n) {
      const r = n[1].toLowerCase().replace(/\s+/g, " "),
        l = n[2]
          ? n[2]
              .replace(/^<(.*)>$/, "$1")
              .replace(this.rules.inline.anyPunctuation, "$1")
          : "",
        s = n[3]
          ? n[3]
              .substring(1, n[3].length - 1)
              .replace(this.rules.inline.anyPunctuation, "$1")
          : n[3];
      return { type: "def", tag: r, raw: n[0], href: l, title: s };
    }
  }
  table(t) {
    const n = this.rules.block.table.exec(t);
    if (!n || !/[:|]/.test(n[2])) return;
    const r = Su(n[1]),
      l = n[2].replace(/^\||\| *$/g, "").split("|"),
      s =
        n[3] && n[3].trim()
          ? n[3].replace(/\n[ \t]*$/, "").split(`
`)
          : [],
      a = { type: "table", raw: n[0], header: [], align: [], rows: [] };
    if (r.length === l.length) {
      for (const o of l)
        /^ *-+: *$/.test(o)
          ? a.align.push("right")
          : /^ *:-+: *$/.test(o)
            ? a.align.push("center")
            : /^ *:-+ *$/.test(o)
              ? a.align.push("left")
              : a.align.push(null);
      for (let o = 0; o < r.length; o++)
        a.header.push({
          text: r[o],
          tokens: this.lexer.inline(r[o]),
          header: !0,
          align: a.align[o],
        });
      for (const o of s)
        a.rows.push(
          Su(o, a.header.length).map((u, c) => ({
            text: u,
            tokens: this.lexer.inline(u),
            header: !1,
            align: a.align[c],
          })),
        );
      return a;
    }
  }
  lheading(t) {
    const n = this.rules.block.lheading.exec(t);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1]),
      };
  }
  paragraph(t) {
    const n = this.rules.block.paragraph.exec(t);
    if (n) {
      const r =
        n[1].charAt(n[1].length - 1) ===
        `
`
          ? n[1].slice(0, -1)
          : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: r,
        tokens: this.lexer.inline(r),
      };
    }
  }
  text(t) {
    const n = this.rules.block.text.exec(t);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0]),
      };
  }
  escape(t) {
    const n = this.rules.inline.escape.exec(t);
    if (n) return { type: "escape", raw: n[0], text: $e(n[1]) };
  }
  tag(t) {
    const n = this.rules.inline.tag.exec(t);
    if (n)
      return (
        !this.lexer.state.inLink && /^<a /i.test(n[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(n[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: "html",
          raw: n[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: n[0],
        }
      );
  }
  link(t) {
    const n = this.rules.inline.link.exec(t);
    if (n) {
      const r = n[2].trim();
      if (!this.options.pedantic && /^</.test(r)) {
        if (!/>$/.test(r)) return;
        const a = Zn(r.slice(0, -1), "\\");
        if ((r.length - a.length) % 2 === 0) return;
      } else {
        const a = Og(n[2], "()");
        if (a > -1) {
          const u = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + a;
          (n[2] = n[2].substring(0, a)),
            (n[0] = n[0].substring(0, u).trim()),
            (n[3] = "");
        }
      }
      let l = n[2],
        s = "";
      if (this.options.pedantic) {
        const a = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(l);
        a && ((l = a[1]), (s = a[3]));
      } else s = n[3] ? n[3].slice(1, -1) : "";
      return (
        (l = l.trim()),
        /^</.test(l) &&
          (this.options.pedantic && !/>$/.test(r)
            ? (l = l.slice(1))
            : (l = l.slice(1, -1))),
        Cu(
          n,
          {
            href: l && l.replace(this.rules.inline.anyPunctuation, "$1"),
            title: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
          },
          n[0],
          this.lexer,
        )
      );
    }
  }
  reflink(t, n) {
    let r;
    if (
      (r = this.rules.inline.reflink.exec(t)) ||
      (r = this.rules.inline.nolink.exec(t))
    ) {
      const l = (r[2] || r[1]).replace(/\s+/g, " "),
        s = n[l.toLowerCase()];
      if (!s) {
        const a = r[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Cu(r, s, r[0], this.lexer);
    }
  }
  emStrong(t, n, r = "") {
    let l = this.rules.inline.emStrongLDelim.exec(t);
    if (!l || (l[3] && r.match(/[\p{L}\p{N}]/u))) return;
    if (!(l[1] || l[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
      const a = [...l[0]].length - 1;
      let o,
        u,
        c = a,
        f = 0;
      const h =
        l[0][0] === "*"
          ? this.rules.inline.emStrongRDelimAst
          : this.rules.inline.emStrongRDelimUnd;
      for (
        h.lastIndex = 0, n = n.slice(-1 * t.length + a);
        (l = h.exec(n)) != null;

      ) {
        if (((o = l[1] || l[2] || l[3] || l[4] || l[5] || l[6]), !o)) continue;
        if (((u = [...o].length), l[3] || l[4])) {
          c += u;
          continue;
        } else if ((l[5] || l[6]) && a % 3 && !((a + u) % 3)) {
          f += u;
          continue;
        }
        if (((c -= u), c > 0)) continue;
        u = Math.min(u, u + c + f);
        const g = [...l[0]][0].length,
          y = t.slice(0, a + l.index + g + u);
        if (Math.min(a, u) % 2) {
          const S = y.slice(1, -1);
          return {
            type: "em",
            raw: y,
            text: S,
            tokens: this.lexer.inlineTokens(S),
          };
        }
        const k = y.slice(2, -2);
        return {
          type: "strong",
          raw: y,
          text: k,
          tokens: this.lexer.inlineTokens(k),
        };
      }
    }
  }
  codespan(t) {
    const n = this.rules.inline.code.exec(t);
    if (n) {
      let r = n[2].replace(/\n/g, " ");
      const l = /[^ ]/.test(r),
        s = /^ /.test(r) && / $/.test(r);
      return (
        l && s && (r = r.substring(1, r.length - 1)),
        (r = $e(r, !0)),
        { type: "codespan", raw: n[0], text: r }
      );
    }
  }
  br(t) {
    const n = this.rules.inline.br.exec(t);
    if (n) return { type: "br", raw: n[0] };
  }
  del(t) {
    const n = this.rules.inline.del.exec(t);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2]),
      };
  }
  autolink(t) {
    const n = this.rules.inline.autolink.exec(t);
    if (n) {
      let r, l;
      return (
        n[2] === "@"
          ? ((r = $e(n[1])), (l = "mailto:" + r))
          : ((r = $e(n[1])), (l = r)),
        {
          type: "link",
          raw: n[0],
          text: r,
          href: l,
          tokens: [{ type: "text", raw: r, text: r }],
        }
      );
    }
  }
  url(t) {
    var r;
    let n;
    if ((n = this.rules.inline.url.exec(t))) {
      let l, s;
      if (n[2] === "@") (l = $e(n[0])), (s = "mailto:" + l);
      else {
        let a;
        do
          (a = n[0]),
            (n[0] =
              ((r = this.rules.inline._backpedal.exec(n[0])) == null
                ? void 0
                : r[0]) ?? "");
        while (a !== n[0]);
        (l = $e(n[0])), n[1] === "www." ? (s = "http://" + n[0]) : (s = n[0]);
      }
      return {
        type: "link",
        raw: n[0],
        text: l,
        href: s,
        tokens: [{ type: "text", raw: l, text: l }],
      };
    }
  }
  inlineText(t) {
    const n = this.rules.inline.text.exec(t);
    if (n) {
      let r;
      return (
        this.lexer.state.inRawBlock ? (r = n[0]) : (r = $e(n[0])),
        { type: "text", raw: n[0], text: r }
      );
    }
  }
}
const Bg = /^(?:[ \t]*(?:\n|$))+/,
  Ug = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
  Vg =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  Ur = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  Hg = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  hf = /(?:[*+-]|\d{1,9}[.)])/,
  mf = V(
    /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  )
    .replace(/bull/g, hf)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  qa =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  Wg = /^[^\n]+/,
  Ka = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  Qg = V(
    /^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/,
  )
    .replace("label", Ka)
    .replace(
      "title",
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
    )
    .getRegex(),
  qg = V(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, hf)
    .getRegex(),
  js =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  Ga = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  Kg = V(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i",
  )
    .replace("comment", Ga)
    .replace("tag", js)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
    )
    .getRegex(),
  gf = V(qa)
    .replace("hr", Ur)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
    )
    .replace("tag", js)
    .getRegex(),
  Gg = V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", gf)
    .getRegex(),
  Za = {
    blockquote: Gg,
    code: Ug,
    def: Qg,
    fences: Vg,
    heading: Hg,
    hr: Ur,
    html: Kg,
    lheading: mf,
    list: qg,
    newline: Bg,
    paragraph: gf,
    table: pr,
    text: Wg,
  },
  Nu = V(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  )
    .replace("hr", Ur)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", "(?: {4}| {0,3}	)[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
    )
    .replace("tag", js)
    .getRegex(),
  Zg = {
    ...Za,
    table: Nu,
    paragraph: V(qa)
      .replace("hr", Ur)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", Nu)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
      )
      .replace("tag", js)
      .getRegex(),
  },
  Yg = {
    ...Za,
    html: V(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`,
    )
      .replace("comment", Ga)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: pr,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: V(qa)
      .replace("hr", Ur)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`,
      )
      .replace("lheading", mf)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  },
  vf = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  Xg = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  yf = /^( {2,}|\\)\n(?!\s*$)/,
  Jg =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  Vr = "\\p{P}\\p{S}",
  ev = V(/^((?![*_])[\spunctuation])/, "u")
    .replace(/punctuation/g, Vr)
    .getRegex(),
  tv = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
  nv = V(
    /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    "u",
  )
    .replace(/punct/g, Vr)
    .getRegex(),
  rv = V(
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
    "gu",
  )
    .replace(/punct/g, Vr)
    .getRegex(),
  lv = V(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
    "gu",
  )
    .replace(/punct/g, Vr)
    .getRegex(),
  sv = V(/\\([punct])/, "gu")
    .replace(/punct/g, Vr)
    .getRegex(),
  iv = V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
    )
    .getRegex(),
  av = V(Ga).replace("(?:-->|$)", "-->").getRegex(),
  ov = V(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  )
    .replace("comment", av)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
    )
    .getRegex(),
  Xl = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  uv = V(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace("label", Xl)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace(
      "title",
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
    )
    .getRegex(),
  xf = V(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", Xl)
    .replace("ref", Ka)
    .getRegex(),
  kf = V(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", Ka)
    .getRegex(),
  cv = V("reflink|nolink(?!\\()", "g")
    .replace("reflink", xf)
    .replace("nolink", kf)
    .getRegex(),
  Ya = {
    _backpedal: pr,
    anyPunctuation: sv,
    autolink: iv,
    blockSkip: tv,
    br: yf,
    code: Xg,
    del: pr,
    emStrongLDelim: nv,
    emStrongRDelimAst: rv,
    emStrongRDelimUnd: lv,
    escape: vf,
    link: uv,
    nolink: kf,
    punctuation: ev,
    reflink: xf,
    reflinkSearch: cv,
    tag: ov,
    text: Jg,
    url: pr,
  },
  dv = {
    ...Ya,
    link: V(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", Xl)
      .getRegex(),
    reflink: V(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", Xl)
      .getRegex(),
  },
  Gi = {
    ...Ya,
    escape: V(vf).replace("])", "~|])").getRegex(),
    url: V(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      "i",
    )
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  fv = {
    ...Gi,
    br: V(yf).replace("{2,}", "*").getRegex(),
    text: V(Gi.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  },
  dl = { normal: Za, gfm: Zg, pedantic: Yg },
  Yn = { normal: Ya, gfm: Gi, breaks: fv, pedantic: dv };
class We {
  constructor(t) {
    W(this, "tokens");
    W(this, "options");
    W(this, "state");
    W(this, "tokenizer");
    W(this, "inlineQueue");
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = t || un),
      (this.options.tokenizer = this.options.tokenizer || new Yl()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const n = { block: dl.normal, inline: Yn.normal };
    this.options.pedantic
      ? ((n.block = dl.pedantic), (n.inline = Yn.pedantic))
      : this.options.gfm &&
        ((n.block = dl.gfm),
        this.options.breaks ? (n.inline = Yn.breaks) : (n.inline = Yn.gfm)),
      (this.tokenizer.rules = n);
  }
  static get rules() {
    return { block: dl, inline: Yn };
  }
  static lex(t, n) {
    return new We(n).lex(t);
  }
  static lexInline(t, n) {
    return new We(n).inlineTokens(t);
  }
  lex(t) {
    (t = t.replace(
      /\r\n|\r/g,
      `
`,
    )),
      this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return (this.inlineQueue = []), this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    this.options.pedantic &&
      (t = t.replace(/\t/g, "    ").replace(/^ +$/gm, ""));
    let l, s, a;
    for (; t; )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some((o) =>
            (l = o.call({ lexer: this }, t, n))
              ? ((t = t.substring(l.raw.length)), n.push(l), !0)
              : !1,
          )
        )
      ) {
        if ((l = this.tokenizer.space(t))) {
          (t = t.substring(l.raw.length)),
            l.raw.length === 1 && n.length > 0
              ? (n[n.length - 1].raw += `
`)
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.code(t))) {
          (t = t.substring(l.raw.length)),
            (s = n[n.length - 1]),
            s && (s.type === "paragraph" || s.type === "text")
              ? ((s.raw +=
                  `
` + l.raw),
                (s.text +=
                  `
` + l.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
              : n.push(l);
          continue;
        }
        if ((l = this.tokenizer.fences(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.heading(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.hr(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.blockquote(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.list(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.html(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.def(t))) {
          (t = t.substring(l.raw.length)),
            (s = n[n.length - 1]),
            s && (s.type === "paragraph" || s.type === "text")
              ? ((s.raw +=
                  `
` + l.raw),
                (s.text +=
                  `
` + l.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
              : this.tokens.links[l.tag] ||
                (this.tokens.links[l.tag] = { href: l.href, title: l.title });
          continue;
        }
        if ((l = this.tokenizer.table(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if ((l = this.tokenizer.lheading(t))) {
          (t = t.substring(l.raw.length)), n.push(l);
          continue;
        }
        if (
          ((a = t),
          this.options.extensions && this.options.extensions.startBlock)
        ) {
          let o = 1 / 0;
          const u = t.slice(1);
          let c;
          this.options.extensions.startBlock.forEach((f) => {
            (c = f.call({ lexer: this }, u)),
              typeof c == "number" && c >= 0 && (o = Math.min(o, c));
          }),
            o < 1 / 0 && o >= 0 && (a = t.substring(0, o + 1));
        }
        if (this.state.top && (l = this.tokenizer.paragraph(a))) {
          (s = n[n.length - 1]),
            r && (s == null ? void 0 : s.type) === "paragraph"
              ? ((s.raw +=
                  `
` + l.raw),
                (s.text +=
                  `
` + l.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
              : n.push(l),
            (r = a.length !== t.length),
            (t = t.substring(l.raw.length));
          continue;
        }
        if ((l = this.tokenizer.text(t))) {
          (t = t.substring(l.raw.length)),
            (s = n[n.length - 1]),
            s && s.type === "text"
              ? ((s.raw +=
                  `
` + l.raw),
                (s.text +=
                  `
` + l.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
              : n.push(l);
          continue;
        }
        if (t) {
          const o = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(o);
            break;
          } else throw new Error(o);
        }
      }
    return (this.state.top = !0), n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  inlineTokens(t, n = []) {
    let r,
      l,
      s,
      a = t,
      o,
      u,
      c;
    if (this.tokens.links) {
      const f = Object.keys(this.tokens.links);
      if (f.length > 0)
        for (
          ;
          (o = this.tokenizer.rules.inline.reflinkSearch.exec(a)) != null;

        )
          f.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) &&
            (a =
              a.slice(0, o.index) +
              "[" +
              "a".repeat(o[0].length - 2) +
              "]" +
              a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (o = this.tokenizer.rules.inline.blockSkip.exec(a)) != null; )
      a =
        a.slice(0, o.index) +
        "[" +
        "a".repeat(o[0].length - 2) +
        "]" +
        a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(a)) != null; )
      a =
        a.slice(0, o.index) +
        "++" +
        a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; t; )
      if (
        (u || (c = ""),
        (u = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some((f) =>
            (r = f.call({ lexer: this }, t, n))
              ? ((t = t.substring(r.raw.length)), n.push(r), !0)
              : !1,
          )
        ))
      ) {
        if ((r = this.tokenizer.escape(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.tag(t))) {
          (t = t.substring(r.raw.length)),
            (l = n[n.length - 1]),
            l && r.type === "text" && l.type === "text"
              ? ((l.raw += r.raw), (l.text += r.text))
              : n.push(r);
          continue;
        }
        if ((r = this.tokenizer.link(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.reflink(t, this.tokens.links))) {
          (t = t.substring(r.raw.length)),
            (l = n[n.length - 1]),
            l && r.type === "text" && l.type === "text"
              ? ((l.raw += r.raw), (l.text += r.text))
              : n.push(r);
          continue;
        }
        if ((r = this.tokenizer.emStrong(t, a, c))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.codespan(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.br(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.del(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.autolink(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if (!this.state.inLink && (r = this.tokenizer.url(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if (
          ((s = t),
          this.options.extensions && this.options.extensions.startInline)
        ) {
          let f = 1 / 0;
          const h = t.slice(1);
          let g;
          this.options.extensions.startInline.forEach((y) => {
            (g = y.call({ lexer: this }, h)),
              typeof g == "number" && g >= 0 && (f = Math.min(f, g));
          }),
            f < 1 / 0 && f >= 0 && (s = t.substring(0, f + 1));
        }
        if ((r = this.tokenizer.inlineText(s))) {
          (t = t.substring(r.raw.length)),
            r.raw.slice(-1) !== "_" && (c = r.raw.slice(-1)),
            (u = !0),
            (l = n[n.length - 1]),
            l && l.type === "text"
              ? ((l.raw += r.raw), (l.text += r.text))
              : n.push(r);
          continue;
        }
        if (t) {
          const f = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(f);
            break;
          } else throw new Error(f);
        }
      }
    return n;
  }
}
class Jl {
  constructor(t) {
    W(this, "options");
    W(this, "parser");
    this.options = t || un;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: n, escaped: r }) {
    var a;
    const l = (a = (n || "").match(/^\S*/)) == null ? void 0 : a[0],
      s =
        t.replace(/\n$/, "") +
        `
`;
    return l
      ? '<pre><code class="language-' +
          $e(l) +
          '">' +
          (r ? s : $e(s, !0)) +
          `</code></pre>
`
      : "<pre><code>" +
          (r ? s : $e(s, !0)) +
          `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  heading({ tokens: t, depth: n }) {
    return `<h${n}>${this.parser.parseInline(t)}</h${n}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    const n = t.ordered,
      r = t.start;
    let l = "";
    for (let o = 0; o < t.items.length; o++) {
      const u = t.items[o];
      l += this.listitem(u);
    }
    const s = n ? "ol" : "ul",
      a = n && r !== 1 ? ' start="' + r + '"' : "";
    return (
      "<" +
      s +
      a +
      `>
` +
      l +
      "</" +
      s +
      `>
`
    );
  }
  listitem(t) {
    let n = "";
    if (t.task) {
      const r = this.checkbox({ checked: !!t.checked });
      t.loose
        ? t.tokens.length > 0 && t.tokens[0].type === "paragraph"
          ? ((t.tokens[0].text = r + " " + t.tokens[0].text),
            t.tokens[0].tokens &&
              t.tokens[0].tokens.length > 0 &&
              t.tokens[0].tokens[0].type === "text" &&
              (t.tokens[0].tokens[0].text =
                r + " " + t.tokens[0].tokens[0].text))
          : t.tokens.unshift({ type: "text", raw: r + " ", text: r + " " })
        : (n += r + " ");
    }
    return (
      (n += this.parser.parse(t.tokens, !!t.loose)),
      `<li>${n}</li>
`
    );
  }
  checkbox({ checked: t }) {
    return (
      "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    );
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let n = "",
      r = "";
    for (let s = 0; s < t.header.length; s++) r += this.tablecell(t.header[s]);
    n += this.tablerow({ text: r });
    let l = "";
    for (let s = 0; s < t.rows.length; s++) {
      const a = t.rows[s];
      r = "";
      for (let o = 0; o < a.length; o++) r += this.tablecell(a[o]);
      l += this.tablerow({ text: r });
    }
    return (
      l && (l = `<tbody>${l}</tbody>`),
      `<table>
<thead>
` +
        n +
        `</thead>
` +
        l +
        `</table>
`
    );
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    const n = this.parser.parseInline(t.tokens),
      r = t.header ? "th" : "td";
    return (
      (t.align ? `<${r} align="${t.align}">` : `<${r}>`) +
      n +
      `</${r}>
`
    );
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${t}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: n, tokens: r }) {
    const l = this.parser.parseInline(r),
      s = ju(t);
    if (s === null) return l;
    t = s;
    let a = '<a href="' + t + '"';
    return n && (a += ' title="' + n + '"'), (a += ">" + l + "</a>"), a;
  }
  image({ href: t, title: n, text: r }) {
    const l = ju(t);
    if (l === null) return r;
    t = l;
    let s = `<img src="${t}" alt="${r}"`;
    return n && (s += ` title="${n}"`), (s += ">"), s;
  }
  text(t) {
    return "tokens" in t && t.tokens
      ? this.parser.parseInline(t.tokens)
      : t.text;
  }
}
class Xa {
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class Qe {
  constructor(t) {
    W(this, "options");
    W(this, "renderer");
    W(this, "textRenderer");
    (this.options = t || un),
      (this.options.renderer = this.options.renderer || new Jl()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.renderer.parser = this),
      (this.textRenderer = new Xa());
  }
  static parse(t, n) {
    return new Qe(n).parse(t);
  }
  static parseInline(t, n) {
    return new Qe(n).parseInline(t);
  }
  parse(t, n = !0) {
    let r = "";
    for (let l = 0; l < t.length; l++) {
      const s = t[l];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[s.type]
      ) {
        const o = s,
          u = this.options.extensions.renderers[o.type].call(
            { parser: this },
            o,
          );
        if (
          u !== !1 ||
          ![
            "space",
            "hr",
            "heading",
            "code",
            "table",
            "blockquote",
            "list",
            "html",
            "paragraph",
            "text",
          ].includes(o.type)
        ) {
          r += u || "";
          continue;
        }
      }
      const a = s;
      switch (a.type) {
        case "space": {
          r += this.renderer.space(a);
          continue;
        }
        case "hr": {
          r += this.renderer.hr(a);
          continue;
        }
        case "heading": {
          r += this.renderer.heading(a);
          continue;
        }
        case "code": {
          r += this.renderer.code(a);
          continue;
        }
        case "table": {
          r += this.renderer.table(a);
          continue;
        }
        case "blockquote": {
          r += this.renderer.blockquote(a);
          continue;
        }
        case "list": {
          r += this.renderer.list(a);
          continue;
        }
        case "html": {
          r += this.renderer.html(a);
          continue;
        }
        case "paragraph": {
          r += this.renderer.paragraph(a);
          continue;
        }
        case "text": {
          let o = a,
            u = this.renderer.text(o);
          for (; l + 1 < t.length && t[l + 1].type === "text"; )
            (o = t[++l]),
              (u +=
                `
` + this.renderer.text(o));
          n
            ? (r += this.renderer.paragraph({
                type: "paragraph",
                raw: u,
                text: u,
                tokens: [{ type: "text", raw: u, text: u }],
              }))
            : (r += u);
          continue;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return r;
  }
  parseInline(t, n) {
    n = n || this.renderer;
    let r = "";
    for (let l = 0; l < t.length; l++) {
      const s = t[l];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[s.type]
      ) {
        const o = this.options.extensions.renderers[s.type].call(
          { parser: this },
          s,
        );
        if (
          o !== !1 ||
          ![
            "escape",
            "html",
            "link",
            "image",
            "strong",
            "em",
            "codespan",
            "br",
            "del",
            "text",
          ].includes(s.type)
        ) {
          r += o || "";
          continue;
        }
      }
      const a = s;
      switch (a.type) {
        case "escape": {
          r += n.text(a);
          break;
        }
        case "html": {
          r += n.html(a);
          break;
        }
        case "link": {
          r += n.link(a);
          break;
        }
        case "image": {
          r += n.image(a);
          break;
        }
        case "strong": {
          r += n.strong(a);
          break;
        }
        case "em": {
          r += n.em(a);
          break;
        }
        case "codespan": {
          r += n.codespan(a);
          break;
        }
        case "br": {
          r += n.br(a);
          break;
        }
        case "del": {
          r += n.del(a);
          break;
        }
        case "text": {
          r += n.text(a);
          break;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return r;
  }
}
class hr {
  constructor(t) {
    W(this, "options");
    W(this, "block");
    this.options = t || un;
  }
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  provideLexer() {
    return this.block ? We.lex : We.lexInline;
  }
  provideParser() {
    return this.block ? Qe.parse : Qe.parseInline;
  }
}
W(
  hr,
  "passThroughHooks",
  new Set(["preprocess", "postprocess", "processAllTokens"]),
);
class pv {
  constructor(...t) {
    W(this, "defaults", Qa());
    W(this, "options", this.setOptions);
    W(this, "parse", this.parseMarkdown(!0));
    W(this, "parseInline", this.parseMarkdown(!1));
    W(this, "Parser", Qe);
    W(this, "Renderer", Jl);
    W(this, "TextRenderer", Xa);
    W(this, "Lexer", We);
    W(this, "Tokenizer", Yl);
    W(this, "Hooks", hr);
    this.use(...t);
  }
  walkTokens(t, n) {
    var l, s;
    let r = [];
    for (const a of t)
      switch (((r = r.concat(n.call(this, a))), a.type)) {
        case "table": {
          const o = a;
          for (const u of o.header) r = r.concat(this.walkTokens(u.tokens, n));
          for (const u of o.rows)
            for (const c of u) r = r.concat(this.walkTokens(c.tokens, n));
          break;
        }
        case "list": {
          const o = a;
          r = r.concat(this.walkTokens(o.items, n));
          break;
        }
        default: {
          const o = a;
          (s =
            (l = this.defaults.extensions) == null ? void 0 : l.childTokens) !=
            null && s[o.type]
            ? this.defaults.extensions.childTokens[o.type].forEach((u) => {
                const c = o[u].flat(1 / 0);
                r = r.concat(this.walkTokens(c, n));
              })
            : o.tokens && (r = r.concat(this.walkTokens(o.tokens, n)));
        }
      }
    return r;
  }
  use(...t) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return (
      t.forEach((r) => {
        const l = { ...r };
        if (
          ((l.async = this.defaults.async || l.async || !1),
          r.extensions &&
            (r.extensions.forEach((s) => {
              if (!s.name) throw new Error("extension name required");
              if ("renderer" in s) {
                const a = n.renderers[s.name];
                a
                  ? (n.renderers[s.name] = function (...o) {
                      let u = s.renderer.apply(this, o);
                      return u === !1 && (u = a.apply(this, o)), u;
                    })
                  : (n.renderers[s.name] = s.renderer);
              }
              if ("tokenizer" in s) {
                if (!s.level || (s.level !== "block" && s.level !== "inline"))
                  throw new Error(
                    "extension level must be 'block' or 'inline'",
                  );
                const a = n[s.level];
                a ? a.unshift(s.tokenizer) : (n[s.level] = [s.tokenizer]),
                  s.start &&
                    (s.level === "block"
                      ? n.startBlock
                        ? n.startBlock.push(s.start)
                        : (n.startBlock = [s.start])
                      : s.level === "inline" &&
                        (n.startInline
                          ? n.startInline.push(s.start)
                          : (n.startInline = [s.start])));
              }
              "childTokens" in s &&
                s.childTokens &&
                (n.childTokens[s.name] = s.childTokens);
            }),
            (l.extensions = n)),
          r.renderer)
        ) {
          const s = this.defaults.renderer || new Jl(this.defaults);
          for (const a in r.renderer) {
            if (!(a in s)) throw new Error(`renderer '${a}' does not exist`);
            if (["options", "parser"].includes(a)) continue;
            const o = a,
              u = r.renderer[o],
              c = s[o];
            s[o] = (...f) => {
              let h = u.apply(s, f);
              return h === !1 && (h = c.apply(s, f)), h || "";
            };
          }
          l.renderer = s;
        }
        if (r.tokenizer) {
          const s = this.defaults.tokenizer || new Yl(this.defaults);
          for (const a in r.tokenizer) {
            if (!(a in s)) throw new Error(`tokenizer '${a}' does not exist`);
            if (["options", "rules", "lexer"].includes(a)) continue;
            const o = a,
              u = r.tokenizer[o],
              c = s[o];
            s[o] = (...f) => {
              let h = u.apply(s, f);
              return h === !1 && (h = c.apply(s, f)), h;
            };
          }
          l.tokenizer = s;
        }
        if (r.hooks) {
          const s = this.defaults.hooks || new hr();
          for (const a in r.hooks) {
            if (!(a in s)) throw new Error(`hook '${a}' does not exist`);
            if (["options", "block"].includes(a)) continue;
            const o = a,
              u = r.hooks[o],
              c = s[o];
            hr.passThroughHooks.has(a)
              ? (s[o] = (f) => {
                  if (this.defaults.async)
                    return Promise.resolve(u.call(s, f)).then((g) =>
                      c.call(s, g),
                    );
                  const h = u.call(s, f);
                  return c.call(s, h);
                })
              : (s[o] = (...f) => {
                  let h = u.apply(s, f);
                  return h === !1 && (h = c.apply(s, f)), h;
                });
          }
          l.hooks = s;
        }
        if (r.walkTokens) {
          const s = this.defaults.walkTokens,
            a = r.walkTokens;
          l.walkTokens = function (o) {
            let u = [];
            return (
              u.push(a.call(this, o)), s && (u = u.concat(s.call(this, o))), u
            );
          };
        }
        this.defaults = { ...this.defaults, ...l };
      }),
      this
    );
  }
  setOptions(t) {
    return (this.defaults = { ...this.defaults, ...t }), this;
  }
  lexer(t, n) {
    return We.lex(t, n ?? this.defaults);
  }
  parser(t, n) {
    return Qe.parse(t, n ?? this.defaults);
  }
  parseMarkdown(t) {
    return (r, l) => {
      const s = { ...l },
        a = { ...this.defaults, ...s },
        o = this.onError(!!a.silent, !!a.async);
      if (this.defaults.async === !0 && s.async === !1)
        return o(
          new Error(
            "marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.",
          ),
        );
      if (typeof r > "u" || r === null)
        return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string")
        return o(
          new Error(
            "marked(): input parameter is of type " +
              Object.prototype.toString.call(r) +
              ", string expected",
          ),
        );
      a.hooks && ((a.hooks.options = a), (a.hooks.block = t));
      const u = a.hooks ? a.hooks.provideLexer() : t ? We.lex : We.lexInline,
        c = a.hooks ? a.hooks.provideParser() : t ? Qe.parse : Qe.parseInline;
      if (a.async)
        return Promise.resolve(a.hooks ? a.hooks.preprocess(r) : r)
          .then((f) => u(f, a))
          .then((f) => (a.hooks ? a.hooks.processAllTokens(f) : f))
          .then((f) =>
            a.walkTokens
              ? Promise.all(this.walkTokens(f, a.walkTokens)).then(() => f)
              : f,
          )
          .then((f) => c(f, a))
          .then((f) => (a.hooks ? a.hooks.postprocess(f) : f))
          .catch(o);
      try {
        a.hooks && (r = a.hooks.preprocess(r));
        let f = u(r, a);
        a.hooks && (f = a.hooks.processAllTokens(f)),
          a.walkTokens && this.walkTokens(f, a.walkTokens);
        let h = c(f, a);
        return a.hooks && (h = a.hooks.postprocess(h)), h;
      } catch (f) {
        return o(f);
      }
    };
  }
  onError(t, n) {
    return (r) => {
      if (
        ((r.message += `
Please report this to https://github.com/markedjs/marked.`),
        t)
      ) {
        const l =
          "<p>An error occurred:</p><pre>" + $e(r.message + "", !0) + "</pre>";
        return n ? Promise.resolve(l) : l;
      }
      if (n) return Promise.reject(r);
      throw r;
    };
  }
}
const rn = new pv();
function B(e, t) {
  return rn.parse(e, t);
}
B.options = B.setOptions = function (e) {
  return rn.setOptions(e), (B.defaults = rn.defaults), df(B.defaults), B;
};
B.getDefaults = Qa;
B.defaults = un;
B.use = function (...e) {
  return rn.use(...e), (B.defaults = rn.defaults), df(B.defaults), B;
};
B.walkTokens = function (e, t) {
  return rn.walkTokens(e, t);
};
B.parseInline = rn.parseInline;
B.Parser = Qe;
B.parser = Qe.parse;
B.Renderer = Jl;
B.TextRenderer = Xa;
B.Lexer = We;
B.lexer = We.lex;
B.Tokenizer = Yl;
B.Hooks = hr;
B.parse = B;
B.options;
B.setOptions;
B.use;
B.walkTokens;
B.parseInline;
Qe.parse;
We.lex;
async function R(e, t = {}) {
  const n = {
    method: t.method || (t.body !== void 0 ? "POST" : "GET"),
    headers: {},
  };
  t.body !== void 0 &&
    ((n.headers["Content-Type"] = "application/json"),
    (n.body = JSON.stringify(t.body)));
  const r = await fetch("/api" + e, n);
  let l = null;
  try {
    l = await r.json();
  } catch {}
  if (!r.ok) {
    let s = l && l.detail;
    throw (
      (Array.isArray(s) &&
        (s = s
          .map((a) => `${(a.loc || []).slice(1).join(".")}: ${a.msg}`)
          .join("; ")),
      new Error(s || `Request failed (${r.status})`))
    );
  }
  return l;
}
async function wf(e) {
  const t = new FormData();
  for (const l of e) t.append("files", l);
  const n = await fetch("/api/files/upload", { method: "POST", body: t }),
    r = await n.json();
  if (!n.ok) throw new Error(r.detail || "Upload failed");
  return window.dispatchEvent(new Event("files-changed")), r.files;
}
const mr = (e) => `/api/files/${e}/raw`;
function gr(e) {
  if (e == null || isNaN(e)) return "0:00";
  const t = Math.floor(e / 60),
    n = e - t * 60;
  return `${t}:${n < 10 ? "0" : ""}${n.toFixed(1)}`;
}
function Zi(e) {
  if (!e && e !== 0) return "";
  const t = ["B", "KB", "MB", "GB"];
  let n = 0;
  for (; e >= 1024 && n < t.length - 1; ) (e /= 1024), n++;
  return `${e.toFixed(n ? 1 : 0)} ${t[n]}`;
}
function Sn(e) {
  if (typeof e == "number") return e;
  const t = String(e).trim();
  return t
    ? t.includes(":")
      ? t
          .split(":")
          .map(Number)
          .reduce((r, l) => r * 60 + l, 0)
      : Number(t) || 0
    : 0;
}
const jf = m.createContext(() => {});
function hv({ children: e }) {
  const [t, n] = m.useState([]),
    r = m.useCallback((l, s = "info") => {
      const a = Math.random();
      n((o) => [...o, { id: a, text: l, type: s }]),
        setTimeout(
          () => n((o) => o.filter((u) => u.id !== a)),
          s === "error" ? 9e3 : 3500,
        );
    }, []);
  return i.jsxs(jf.Provider, {
    value: r,
    children: [
      e,
      i.jsx("div", {
        className: "toast-host",
        children: t.map((l) =>
          i.jsx(
            "div",
            { className: `toast ${l.type}`, children: l.text },
            l.id,
          ),
        ),
      }),
    ],
  });
}
const Be = () => m.useContext(jf);
function xt() {
  const e = Be(),
    [t, n] = m.useState(!1),
    [r, l] = m.useState([]),
    s = m.useCallback(
      async (a, { keep: o = !1, success: u } = {}) => {
        n(!0);
        try {
          const c = await a(),
            f =
              c != null && c.file
                ? [c.file]
                : (c == null ? void 0 : c.files) || [];
          return (
            f.length
              ? (l((h) => (o ? [...f, ...h] : f)),
                window.dispatchEvent(new Event("files-changed")),
                e(
                  u ||
                    `Saved ${f.length > 1 ? f.length + " files" : f[0].name}`,
                ))
              : u && e(u),
            c
          );
        } catch (c) {
          return o || l([]), e(c.message, "error"), null;   // don't leave an old result looking like this one
        } finally {
          n(!1);
        }
      },
      [e],
    );
  return { busy: t, outputs: r, setOutputs: l, run: s };
}
function ye({ text: e = "Working…" }) {
  return i.jsxs("span", {
    className: "busy",
    children: [i.jsx(Cg, { className: "spin" }), e],
  });
}
function Ss({ text: e }) {
  const t = B.parse(e || "", { breaks: !0 });
  return i.jsx("div", {
    className: "md",
    dangerouslySetInnerHTML: { __html: t },
  });
}
function Sf(e) {
  return (
    { audio: vg, video: kg, image: yg, data: xg, pdf: Zl, document: Zl }[e] ||
    wg
  );
}
function Ja(e) {
  const [t, n] = m.useState([]),
    r = m.useCallback(() => {
      R("/files" + (e && typeof e == "string" ? `?kind=${e}` : ""))
        .then((l) => {
          let s = l.files;
          Array.isArray(e) && (s = s.filter((a) => e.includes(a.kind))), n(s);
        })
        .catch(() => {});
    }, [e]);
  return (
    m.useEffect(
      () => (
        r(),
        window.addEventListener("files-changed", r),
        () => window.removeEventListener("files-changed", r)
      ),
      [r],
    ),
    [t, r]
  );
}
function ke({
  kind: e,
  accept: t,
  multiple: n = !1,
  value: r = [],
  onChange: l,
  label: s,
  strict: st,
}) {
  const a = Be(),
    [o, u] = m.useState(!1),
    [c, f] = m.useState(!1),
    h = m.useRef(),
    [g] = Ja(e),
    y = async (x) => {
      if (x != null && x.length) {
        f(!0);
        try {
          let d = await wf(n ? x : [x[0]]);
          if (st && e) {
            const ok = (Array.isArray(e) ? e : [e]),
              bad = d.filter((p) => !ok.includes(p.kind));
            bad.length && a(`This page can't use: ${bad.map((p) => p.name).join(", ")}`, "error");
            d = d.filter((p) => ok.includes(p.kind));
            if (!d.length) return f(!1);
          }
          l(n ? [...r, ...d] : d);
        } catch (d) {
          a(d.message, "error");
        }
        f(!1);
      }
    },
    k = (x) => {
      const d = g.find((p) => p.id === x);
      d && l(n ? [...r, d] : [d]);
    },
    S = (x, d) => {
      const p = [...r],
        v = x + d;
      v < 0 || v >= p.length || (([p[x], p[v]] = [p[v], p[x]]), l(p));
    };
  return i.jsxs("div", {
    children: [
      i.jsxs("div", {
        className: `drop ${o ? "over" : ""}`,
        onClick: () => h.current.click(),
        onDragOver: (x) => {
          x.preventDefault(), u(!0);
        },
        onDragLeave: () => u(!1),
        onDrop: (x) => {
          x.preventDefault(), u(!1), y(x.dataTransfer.files);
        },
        children: [
          i.jsx(uf, {}),
          i.jsx("div", {
            children: c
              ? "Uploading…"
              : s ||
                (n
                  ? "Drop files here or click to browse"
                  : "Drop a file here or click to browse"),
          }),
          i.jsx("input", {
            ref: h,
            type: "file",
            hidden: !0,
            multiple: n,
            accept: t,
            onChange: (x) => {
              y(x.target.files), (x.target.value = "");
            },
          }),
        ],
      }),
      g.length > 0 &&
        i.jsxs("div", {
          className: "row",
          style: { marginTop: 8 },
          children: [
            i.jsx("span", {
              className: "small muted",
              children: "or use a file you already have:",
            }),
            i.jsxs("select", {
              value: "",
              onChange: (x) => k(x.target.value),
              style: { flex: 1, maxWidth: 420 },
              children: [
                i.jsx("option", {
                  value: "",
                  children: "Choose from My Files…",
                }),
                g
                  .filter((x, d, a) => a.findIndex((p) => p.name === x.name && p.size === x.size) === d)
                  .slice(0, 200)
                  .map((x) =>
                    i.jsxs(
                      "option",
                      { value: x.id, children: [x.name, " · ", Zi(x.size), x.created_at ? " · " + String(x.created_at).slice(0, 10) : ""] },
                      x.id,
                    ),
                  ),
              ],
            }),
          ],
        }),
      r.length > 0 &&
        i.jsx("div", {
          className: "picked",
          children: r.map((x, d) => {
            const p = Sf(x.kind);
            return i.jsxs(
              "div",
              {
                className: "picked-item",
                children: [
                  i.jsx(p, { size: 15 }),
                  n &&
                    i.jsxs("span", {
                      className: "muted small",
                      children: [d + 1, "."],
                    }),
                  i.jsx("span", {
                    className: "name",
                    title: x.name,
                    children: x.name,
                  }),
                  i.jsx("span", {
                    className: "muted small",
                    children: Zi(x.size),
                  }),
                  n &&
                    i.jsxs(i.Fragment, {
                      children: [
                        i.jsx("button", {
                          className: "icon-btn",
                          onClick: () => S(d, -1),
                          title: "Move up",
                          children: i.jsx(hg, {}),
                        }),
                        i.jsx("button", {
                          className: "icon-btn",
                          onClick: () => S(d, 1),
                          title: "Move down",
                          children: i.jsx(pg, {}),
                        }),
                      ],
                    }),
                  i.jsx("button", {
                    className: "icon-btn",
                    onClick: () => l(r.filter((v, w) => w !== d)),
                    title: "Remove",
                    children: i.jsx(cf, {}),
                  }),
                ],
              },
              x.id + d,
            );
          }),
        }),
    ],
  });
}
function Hr({ file: e, onUse: t, useLabel: n = "Edit this", onDelete: r, extra: X }) {
  const l = Sf(e.kind),
    s = () => R(`/files/${e.id}/reveal`, { body: {} }).catch(() => {}),
    a = () => openFileHere(e);
  return i.jsxs("div", {
    className: "file-card",
    children: [
      i.jsx("div", {
        className: "thumb",
        children:
          e.kind === "image" && !/\.(ico|tiff?|heic|pdf)$/i.test(e.name)
            ? i.jsx("img", { src: mr(e.id), alt: "" })
            : i.jsx(l, { size: 22 }),
      }),
      i.jsxs("div", {
        className: "info",
        children: [
          i.jsx("div", { className: "name", title: e.path, children: e.name }),
          i.jsx("div", { className: "muted small", children: Zi(e.size) }),
          e.kind === "audio" &&
            i.jsx("audio", { controls: !0, preload: "none", src: mr(e.id) }),
          e.kind === "video" &&
            /\.(mp4|webm|mov|m4v)$/i.test(e.name) &&
            i.jsx("video", {
              controls: !0,
              preload: "metadata",
              src: mr(e.id),
            }),
        ],
      }),
      i.jsxs("div", {
        className: "row",
        style: { flexShrink: 0 },
        children: [
          t &&
            i.jsx("button", {
              className: "btn sm",
              onClick: () => t(e),
              children: n,
            }),
          i.jsxs("button", {
            className: "btn sm",
            onClick: a,
            title: "Open with default app",
            children: [i.jsx(gg, {}), "Open"],
          }),
          i.jsxs("button", {
            className: "btn sm pc-only",
            onClick: s,
            title: "Show in folder",
            children: [i.jsx(ks, {}), "Folder"],
          }),
          i.jsx("a", {
            className: "btn sm",
            href: `/api/files/${e.id}/download`,
            download: e.name,
            title: "Download a copy (choose where to save it)",
            children: "⬇ Download",
          }),
          X,
          r &&
            i.jsx("button", {
              className: "icon-btn",
              onClick: () => r(e),
              title: "Delete",
              children: i.jsx(ws, {}),
            }),
        ],
      }),
    ],
  });
}
function rt({ files: e, onUse: t, useLabel: n }) {
  return e != null && e.length
    ? i.jsxs("div", {
        className: "card",
        children: [
          i.jsxs("div", {
            className: "card-title",
            children: [
              i.jsx("h3", { children: "Result" }),
              i.jsxs("button", {
                className: "btn sm ghost pc-only",
                onClick: () => R("/files/open-output-folder", { body: {} }),
                children: [i.jsx(ks, {}), "Output folder"],
              }),
            ],
          }),
          e.map((r) => i.jsx(Hr, { file: r, onUse: t, useLabel: n }, r.id)),
        ],
      })
    : null;
}
function Wr({ tabs: e, value: t, onChange: n }) {
  return i.jsx("div", {
    className: "tabs",
    children: e.map(([r, l]) =>
      i.jsx(
        "button",
        {
          className: `tab ${t === r ? "active" : ""}`,
          onClick: () => n(r),
          children: l,
        },
        r,
      ),
    ),
  });
}
function de({ options: e, value: t, onChange: n }) {
  return i.jsx("div", {
    className: "pills",
    children: e.map((r) => {
      const [l, s] = Array.isArray(r) ? r : [r, r];
      return i.jsx(
        "button",
        {
          className: `pill ${t === l ? "active" : ""}`,
          onClick: () => n(l),
          children: s,
        },
        l,
      );
    }),
  });
}
function F({ label: e, children: t, style: n }) {
  return i.jsxs("label", {
    className: "field",
    style: n,
    children: [i.jsx("span", { children: e }), t],
  });
}
function Se({ value: e, onChange: t, step: n = 1, min: r, max: l, style: s }) {
  return i.jsx("input", {
    type: "number",
    value: e,
    step: n,
    min: r,
    max: l,
    style: s,
    onChange: (a) => t(a.target.value === "" ? "" : Number(a.target.value)),
  });
}
function Cf({ columns: e, rows: t }) {
  return i.jsx("div", {
    className: "table-wrap",
    children: i.jsxs("table", {
      className: "data",
      children: [
        i.jsx("thead", {
          children: i.jsx("tr", {
            children: e.map((n) => i.jsx("th", { children: n }, n)),
          }),
        }),
        i.jsx("tbody", {
          children: t.map((n, r) =>
            i.jsx(
              "tr",
              {
                children: n.map((l, s) =>
                  i.jsx("td", { title: l, children: l }, s),
                ),
              },
              r,
            ),
          ),
        }),
      ],
    }),
  });
}
const mkIcon = (paths) => (props) =>
  i.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: (props && props.size) || 16,
    height: (props && props.size) || 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: paths.map((d, k) => i.jsx("path", { d }, k)),
  });
const IcCal = mkIcon(["M8 2v4", "M16 2v4", "M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"]);
const IcHist = mkIcon(["M3 12a9 9 0 1 0 3-6.7L3 8", "M3 3v5h5", "M12 7v5l4 2"]);
const IcDrive = mkIcon(["M22 12H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", "M6 16h.01", "M10 16h.01"]);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KIND_LABEL = { workout: "Workout", study: "Study", focus: "Focus", work: "Work", personal: "Personal", other: "Other" };
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s) => {
  const [y, mo, d] = s.split("-").map(Number);
  return new Date(y, mo - 1, d);
};
const fmtBytes = (b) => Zi(b || 0);

/* ---------------- Calendar page ---------------- */
function CalendarPage() {
  const [tab, setTab] = m.useState(() => {
      const q = new URLSearchParams((window.location.hash.split("?")[1] || ""));
      return q.get("tab") || "cal";
    }),
    [showRem, setShowRem] = m.useState(!1),
    [wDay, setWDay] = m.useState(iso(new Date()));
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Calendar & Workouts" }),
          i.jsx("p", { children: "Your plan for the week, focus and study blocks, and your dumbbell program. Stays on this PC, no syncing." }),
        ],
      }),
      i.jsxs("div", {
        className: "row",
        style: { alignItems: "flex-end" },
        children: [
          i.jsx("div", {
            style: { flex: 1 },
            children: i.jsx(Wr, {
              tabs: [
                ["cal", "Calendar"],
                ["plan", "✨ Plan my week"],
                ["workout", "Workout"],
                ["progress", "Progress"],
              ],
              value: tab,
              onChange: setTab,
            }),
          }),
          i.jsx("button", { className: "btn sm ghost", style: { marginBottom: 14 }, onClick: () => (window.location.hash = "#/review"), children: "📊 Week review" }),
          i.jsx("button", { className: `btn sm ${showRem ? "on" : "ghost"}`, style: { marginBottom: 14 }, onClick: () => setShowRem(!showRem), children: "🔔 Reminders" }),
        ],
      }),
      showRem && i.jsx(ReminderSettings, {}),
      tab === "cal" && i.jsx(CalView, { openWorkout: (d) => (setWDay(d), setTab("workout")) }),
      tab === "plan" && i.jsx(PlanWeek, {}),
      tab === "workout" && i.jsx(WorkoutView, { day: wDay, setDay: setWDay }),
      tab === "progress" && i.jsx(ProgressView, {}),
    ],
  });
}
function CalView({ openWorkout }) {
  const toast = Be(),
    today = iso(new Date()),
    [month, setMonth] = m.useState(() => {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }),
    [sel, setSel] = m.useState(today),
    [evs, setEvs] = m.useState([]),
    blank = { title: "", kind: "study", start: "", end: "", repeat: "none", weekdays: [], notes: "" },
    [form, setForm] = m.useState(blank),
    [undo, setUndo] = m.useState(null),
    undoT = m.useRef();
  const offerUndo = (u) => {
    clearTimeout(undoT.current);
    setUndo(u);
    undoT.current = setTimeout(() => setUndo(null), 10000);
  };
  m.useEffect(() => () => clearTimeout(undoT.current), []);
  const gridStart = m.useMemo(() => {
    const d = new Date(month);
    const wd = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - wd);
    return d;
  }, [month]);
  const days = m.useMemo(
    () =>
      Array.from({ length: 42 }, (_, k) => {
        const d = new Date(gridStart);
        d.setDate(d.getDate() + k);
        return d;
      }),
    [gridStart],
  );
  const load = m.useCallback(() => {
    R(`/calendar/events?start=${iso(days[0])}&end=${iso(days[41])}`)
      .then((d) => setEvs(d.events))
      .catch((x) => toast(x.message, "error"));
  }, [days]);
  m.useEffect(load, [load]);
  const byDay = {};
  evs.forEach((e) => (byDay[e.occ_date] = byDay[e.occ_date] || []).push(e));
  const add = async () => {
      if (!form.title.trim()) return toast("Give it a title", "error");
      try {
        await R("/calendar/events", {
          body: {
            ...form,
            date: sel,
            weekdays: form.repeat === "weekly" ? (form.weekdays.length ? form.weekdays : [(fromIso(sel).getDay() + 6) % 7]).join(",") : "",
          },
        });
        setForm(blank), load(), toast("Added");
      } catch (x) {
        toast(x.message, "error");
      }
    },
    toggle = async (e) => {
      await R(`/calendar/events/${e.id}/done`, { body: { date: e.occ_date, done: !e.done } }).catch((x) => toast(x.message, "error"));
      load();
    },
    del = async (e, scope) => {
      scope = scope || (e.repeat !== "none" ? "one" : "all");
      try {
        const r = await R(`/calendar/events/${e.id}?date=${e.occ_date}&scope=${scope}`, { method: "DELETE" });
        offerUndo({ id: r.undo, text: scope === "future" ? `Removed "${e.title}" from ${e.occ_date} on` : `Removed "${e.title}"${e.repeat !== "none" ? " for this day" : ""}`, ev: scope === "one" ? e : null });
      } catch (x) {
        toast(x.message, "error");
      }
      load();
    },
    clearDay = async () => {
      try {
        const r = await R("/calendar/day/clear", { body: { date: sel } });
        r.removed && offerUndo({ id: r.undo, text: `Cleared ${r.removed} block${r.removed === 1 ? "" : "s"} from ${fromIso(sel).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}` });
      } catch (x) {
        toast(x.message, "error");
      }
      load();
    },
    doUndo = async (quiet) => {
      if (!undo || !undo.id) return;
      try {
        await R("/calendar/undo", { body: { undo: undo.id } });
        quiet !== !0 && toast("Brought back");
      } catch (x) {
        toast(x.message, "error");
      }
      setUndo(null), load();
    },
    selList = byDay[sel] || [];
  return i.jsxs("div", {
    className: "cal-wrap",
    children: [
      i.jsxs("div", {
        className: "card cal-card",
        children: [
          i.jsxs("div", {
            className: "row",
            style: { marginBottom: 10 },
            children: [
              i.jsx("button", { className: "btn sm", onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1)), children: "‹" }),
              i.jsx("b", {
                style: { minWidth: 150, textAlign: "center" },
                children: month.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
              }),
              i.jsx("button", { className: "btn sm", onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1)), children: "›" }),
              i.jsx("button", {
                className: "btn sm ghost",
                onClick: () => {
                  const d = new Date();
                  setMonth(new Date(d.getFullYear(), d.getMonth(), 1)), setSel(today);
                },
                children: "Today",
              }),
            ],
          }),
          i.jsx("div", { className: "cal-head", children: DAYS.map((d) => i.jsx("div", { children: d }, d)) }),
          i.jsx("div", {
            className: "cal-grid",
            children: days.map((d) => {
              const ds = iso(d),
                list = byDay[ds] || [];
              return i.jsxs(
                "div",
                {
                  className: `cal-cell ${d.getMonth() !== month.getMonth() ? "other" : ""} ${ds === today ? "today" : ""} ${ds === sel ? "sel" : ""}`,
                  onClick: () => setSel(ds),
                  children: [
                    i.jsx("div", { className: "cal-num", children: d.getDate() }),
                    list.slice(0, 3).map((e, k) =>
                      i.jsxs("div", { className: `cal-ev k-${e.kind} ${e.done ? "done" : ""}`, title: e.title, children: [e.start ? e.start + " " : "", e.title] }, k),
                    ),
                    list.length > 3 && i.jsxs("div", { className: "muted small", children: ["+", list.length - 3, " more"] }),
                  ],
                },
                ds,
              );
            }),
          }),
        ],
      }),
      i.jsxs("div", {
        className: "card cal-side",
        children: [
          i.jsxs("div", {
            className: "card-title",
            children: [
              i.jsx("h3", { children: fromIso(sel).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) }),
              selList.length > 1 && i.jsx("button", { className: "btn sm ghost danger", onClick: clearDay, title: "Remove everything on this day (repeating blocks are only skipped this day)", children: "Clear day" }),
            ],
          }),
          undo &&
            i.jsxs("div", {
              className: "undo-bar",
              children: [
                i.jsx("span", { children: undo.text }),
                i.jsx("button", { className: "btn sm", onClick: () => doUndo(), children: "Undo" }),
                undo.ev && i.jsx("button", { className: "btn sm ghost", onClick: () => doUndo(!0).then(() => del(undo.ev, "future")), title: "Remove this one and all later ones", children: "All future ones too" }),
              ],
            }),
          selList.length === 0 && i.jsx("p", { className: "muted small", children: "Nothing planned." }),
          selList.map((e, k) =>
            i.jsxs(
              "div",
              {
                className: `day-ev k-${e.kind}`,
                children: [
                  i.jsx("input", { type: "checkbox", checked: e.done, onChange: () => toggle(e), title: "Done" }),
                  i.jsxs("div", {
                    style: { flex: 1, minWidth: 0 },
                    children: [
                      i.jsx("div", { className: e.done ? "strike" : "", children: e.title }),
                      i.jsxs("div", {
                        className: "muted small",
                        children: [
                          KIND_LABEL[e.kind] || e.kind,
                          e.start ? ` · ${e.start}${e.end ? "–" + e.end : ""}` : "",
                          e.repeat !== "none" ? ` · repeats ${e.repeat === "weekly" ? (e.weekdays || "").split(",").filter(Boolean).map((x) => DAYS[x]).join("/") : "daily"}` : "",
                        ],
                      }),
                      e.notes && !e.notes.includes("[program]") && i.jsx("div", { className: "small", children: e.notes }),
                    ],
                  }),
                  e.kind === "workout" && i.jsx("button", { className: "btn sm", onClick: () => openWorkout(e.occ_date), children: "Open" }),
                  i.jsx("button", { className: "icon-btn", onClick: () => del(e), title: e.repeat !== "none" ? "Remove for this day" : "Remove", children: i.jsx(ws, {}) }),
                ],
              },
              k,
            ),
          ),
          i.jsxs("div", {
            className: "stack",
            style: { marginTop: 14, borderTop: "1px solid var(--border)", paddingTop: 12 },
            children: [
              i.jsx("b", { children: "Add to this day" }),
              i.jsx("input", {
                type: "text",
                placeholder: "e.g. Study databases, Deep work, Gym",
                value: form.title,
                onChange: (x) => setForm({ ...form, title: x.target.value }),
                onKeyDown: (x) => x.key === "Enter" && add(),
              }),
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx("select", {
                    value: form.kind,
                    onChange: (x) => setForm({ ...form, kind: x.target.value }),
                    children: Object.entries(KIND_LABEL).map(([k, v]) => i.jsx("option", { value: k, children: v }, k)),
                  }),
                  i.jsx("input", { type: "time", value: form.start, onChange: (x) => setForm({ ...form, start: x.target.value }), title: "Start" }),
                  i.jsx("input", { type: "time", value: form.end, onChange: (x) => setForm({ ...form, end: x.target.value }), title: "End" }),
                ],
              }),
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsxs("select", {
                    value: form.repeat,
                    onChange: (x) => setForm({ ...form, repeat: x.target.value }),
                    children: [
                      i.jsx("option", { value: "none", children: "Once" }),
                      i.jsx("option", { value: "daily", children: "Every day" }),
                      i.jsx("option", { value: "weekly", children: "Weekly on…" }),
                    ],
                  }),
                  form.repeat === "weekly" &&
                    DAYS.map((d, k) =>
                      i.jsx(
                        "button",
                        {
                          className: `pill ${form.weekdays.includes(k) ? "active" : ""}`,
                          onClick: () =>
                            setForm({ ...form, weekdays: form.weekdays.includes(k) ? form.weekdays.filter((z) => z !== k) : [...form.weekdays, k] }),
                          children: d[0] + d[1],
                        },
                        d,
                      ),
                    ),
                ],
              }),
              i.jsx("input", { type: "text", placeholder: "Notes (optional)", value: form.notes, onChange: (x) => setForm({ ...form, notes: x.target.value }) }),
              i.jsx("button", { className: "btn primary", onClick: add, children: "Add" }),
            ],
          }),
        ],
      }),
    ],
  });
}

/* ---------------- Workout ---------------- */
function WorkoutView({ day, setDay }) {
  const toast = Be(),
    [w, setW] = m.useState(null),
    [session, setSession] = m.useState(null),
    [vals, setVals] = m.useState({}),
    [setup, setSetup] = m.useState({ weekdays: [0, 2, 4], time: "18:00" }),
    [showSetup, setShowSetup] = m.useState(!1),
    [saving, setSaving] = m.useState(!1);
  const load = m.useCallback(() => {
    R(`/workouts/today?day=${day}${session ? "&session=" + session : ""}`)
      .then((d) => {
        setW(d);
        const v = {};
        d.exercises.forEach((e) => {
          for (let k = 1; k <= e.sets; k++) {
            const lg = e.logged.find((s) => s.set_no === k);
            v[`${e.id}:${k}`] = {
              weight: lg ? lg.weight : e.uses_weight ? e.suggest.weight ?? "" : 0,
              reps: lg ? lg.reps : "",
            };
          }
        });
        setVals(v);
      })
      .catch((x) => toast(x.message, "error"));
  }, [day, session]);
  m.useEffect(load, [load]);
  const setV = (key, f, val) => setVals((v) => ({ ...v, [key]: { ...v[key], [f]: val } })),
    save = async () => {
      setSaving(!0);
      try {
        const sets = [];
        w.exercises.forEach((e) => {
          for (let k = 1; k <= e.sets; k++) {
            const v = vals[`${e.id}:${k}`] || {};
            if (Number(v.reps) > 0) sets.push({ exercise: e.id, set_no: k, weight: Number(v.weight) || 0, reps: Number(v.reps) });
          }
        });
        if (!sets.length) return toast("Fill in the reps you did first", "error");
        const r = await R("/workouts/log", { body: { date: day, session: w.session, sets } });
        toast(`Workout saved (${r.sets} sets). Nice work 💪`), load();
      } catch (x) {
        toast(x.message, "error");
      } finally {
        setSaving(!1);
      }
    },
    saveSetup = async () => {
      try {
        await R("/workouts/setup", { body: { ...setup, equipment: w.equipment } });
        toast("Workout days added to your calendar"), setShowSetup(!1);
      } catch (x) {
        toast(x.message, "error");
      }
    },
    setEquip = async (eq) => {
      await R("/workouts/equipment", { body: { equipment: eq } }).catch((x) => toast(x.message, "error"));
      load();
    };
  if (!w) return i.jsx("div", { className: "card", children: i.jsx(ye, {}) });
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card row",
        children: [
          i.jsx("input", { type: "date", value: day, onChange: (x) => (setSession(null), setDay(x.target.value)) }),
          i.jsx(de, {
            value: w.session,
            onChange: setSession,
            options: [
              ["A", "Workout A"],
              ["B", "Workout B"],
            ],
          }),
          w.done && i.jsx("span", { className: "ok small", children: "✓ logged" }),
          i.jsx("span", { className: "spacer" }),
          i.jsx(de, {
            value: w.equipment,
            onChange: setEquip,
            options: [
              ["none", "Bodyweight for now"],
              ["dumbbells", "I have dumbbells"],
            ],
          }),
          i.jsx("button", { className: "btn sm", onClick: () => setShowSetup(!showSetup), children: "Schedule…" }),
        ],
      }),
      showSetup &&
        i.jsxs("div", {
          className: "card row",
          children: [
            i.jsx("span", { children: "Train on" }),
            DAYS.map((d, k) =>
              i.jsx(
                "button",
                {
                  className: `pill ${setup.weekdays.includes(k) ? "active" : ""}`,
                  onClick: () =>
                    setSetup({ ...setup, weekdays: setup.weekdays.includes(k) ? setup.weekdays.filter((z) => z !== k) : [...setup.weekdays, k] }),
                  children: d,
                },
                d,
              ),
            ),
            i.jsx("span", { children: "at" }),
            i.jsx("input", { type: "time", value: setup.time, onChange: (x) => setSetup({ ...setup, time: x.target.value }) }),
            i.jsx("button", { className: "btn primary", onClick: saveSetup, children: "Put in calendar" }),
            i.jsx("span", { className: "small muted", children: "3 days with a rest day in between works best (e.g. Mon/Wed/Fri)." }),
          ],
        }),
      i.jsxs("div", {
        className: "card",
        children: [
          i.jsxs("p", { className: "small", style: { margin: 0 }, children: [i.jsx("b", { children: "Warm-up: " }), w.warmup] }),
          i.jsx("p", { className: "small muted", style: { margin: "4px 0 0" }, children: w.notes }),
          w.equipment !== "dumbbells" &&
            i.jsx("p", {
              className: "small",
              style: { margin: "6px 0 0" },
              children:
                "Doing the bodyweight versions until you get dumbbells. A pair of adjustable dumbbells (around 2.5–24 kg each) covers this whole program for years. Switch to “I have dumbbells” when they arrive.",
            }),
        ],
      }),
      w.exercises.map((e) =>
        i.jsxs(
          "div",
          {
            className: "card ex-card",
            children: [
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx("h3", { style: { margin: 0 }, children: e.display }),
                  i.jsxs("span", {
                    className: "muted small",
                    children: [e.sets, " × ", e.lo, "–", e.hi, " ", e.unit || "reps", e.per_side ? " per side" : ""],
                  }),
                ],
              }),
              i.jsx("p", { className: "small muted", style: { margin: "4px 0 8px" }, children: e.cue }),
              i.jsx("div", {
                className: "sets",
                children: Array.from({ length: e.sets }, (_, k) => {
                  const key = `${e.id}:${k + 1}`,
                    v = vals[key] || {};
                  return i.jsxs(
                    "div",
                    {
                      className: "set-row",
                      children: [
                        i.jsxs("span", { className: "muted small", children: ["Set ", k + 1] }),
                        e.uses_weight &&
                          i.jsxs(i.Fragment, {
                            children: [
                              i.jsx("input", { type: "number", step: 0.5, min: 0, value: v.weight, onChange: (x) => setV(key, "weight", x.target.value), style: { width: 74 } }),
                              i.jsx("span", { className: "small muted", children: "kg ×" }),
                            ],
                          }),
                        i.jsx("input", {
                          type: "number",
                          min: 0,
                          placeholder: String(e.suggest.reps || e.lo),
                          value: v.reps,
                          onChange: (x) => setV(key, "reps", x.target.value),
                          style: { width: 70 },
                        }),
                        i.jsx("span", { className: "small muted", children: e.unit === "s" ? "sec" : "reps" }),
                      ],
                    },
                    k,
                  );
                }),
              }),
              i.jsxs("p", {
                className: "small",
                style: { margin: "8px 0 0" },
                children: [
                  "🎯 ",
                  e.suggest.tip,
                  e.suggest.last &&
                    i.jsxs("span", {
                      className: "muted",
                      children: [
                        " Last time (",
                        e.suggest.last.date,
                        "): ",
                        e.suggest.last.sets.map((s) => (s.weight ? `${s.weight}×${s.reps}` : s.reps)).join(", "),
                      ],
                    }),
                ],
              }),
            ],
          },
          e.id,
        ),
      ),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx("span", { className: "spacer" }),
          i.jsx("button", { className: "btn primary", onClick: save, disabled: saving, children: saving ? "Saving…" : w.done ? "Update workout" : "Finish & save workout" }),
        ],
      }),
    ],
  });
}
function Spark({ pts }) {
  if (pts.length < 2) return null;
  const W = 140,
    H = 34,
    min = Math.min(...pts),
    max = Math.max(...pts),
    sp = max - min || 1;
  const d = pts.map((p, k) => `${k ? "L" : "M"}${(k / (pts.length - 1)) * (W - 4) + 2},${H - 3 - ((p - min) / sp) * (H - 6)}`).join(" ");
  return i.jsx("svg", { width: W, height: H, children: i.jsx("path", { d, fill: "none", stroke: "var(--accent)", strokeWidth: 2 }) });
}
function ProgressView() {
  const [p, setP] = m.useState(null);
  m.useEffect(() => {
    R("/workouts/progress").then(setP).catch(() => {});
  }, []);
  if (!p) return i.jsx("div", { className: "card", children: i.jsx(ye, {}) });
  const ex = Object.entries(p.exercises);
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card row",
        children: [
          i.jsxs("div", { className: "stat", children: [i.jsx("b", { children: p.sessions }), i.jsx("span", { children: "workouts logged" })] }),
          i.jsxs("div", { className: "stat", children: [i.jsx("b", { children: p.last_28_days }), i.jsx("span", { children: "in the last 4 weeks (goal 12)" })] }),
        ],
      }),
      ex.length === 0 && i.jsx("p", { className: "muted", children: "Log your first workout and your progress shows up here." }),
      ex.length > 0 &&
        i.jsx("div", {
          className: "card",
          children: i.jsx("div", {
            className: "table-wrap",
            children: i.jsxs("table", {
              className: "data",
              children: [
                i.jsx("thead", {
                  children: i.jsxs("tr", {
                    children: [i.jsx("th", { children: "Exercise" }), i.jsx("th", { children: "Sessions" }), i.jsx("th", { children: "Latest" }), i.jsx("th", { children: "Best" }), i.jsx("th", { children: "Trend" })],
                  }),
                }),
                i.jsx("tbody", {
                  children: ex.map(([id, x]) => {
                    const pts = x.points,
                      last = pts[pts.length - 1],
                      useW = pts.some((q) => q.weight > 0),
                      val = (q) => (useW ? q.weight : q.reps),
                      best = Math.max(...pts.map(val)),
                      unit = useW ? " kg" : x.unit === "s" ? " s total" : " reps total";
                    return i.jsxs(
                      "tr",
                      {
                        children: [
                          i.jsx("td", { children: x.name }),
                          i.jsx("td", { children: pts.length }),
                          i.jsxs("td", { children: [val(last), unit, " (", last.date, ")"] }),
                          i.jsxs("td", { children: [best, unit] }),
                          i.jsx("td", { children: i.jsx(Spark, { pts: pts.map(val) }) }),
                        ],
                      },
                      id,
                    );
                  }),
                }),
              ],
            }),
          }),
        }),
    ],
  });
}

/* ---------------- History ---------------- */
function HistoryPage() {
  const [kind, setKind] = m.useState(""),
    [q, setQ] = m.useState(""),
    [rows, setRows] = m.useState([]),
    [more, setMore] = m.useState(!1);
  const load = m.useCallback(
    (before) => {
      R(`/history?limit=200${kind ? "&kind=" + kind : ""}${q ? "&q=" + encodeURIComponent(q) : ""}${before ? "&before_id=" + before : ""}`)
        .then((d) => (setRows((r) => (before ? [...r, ...d.entries] : d.entries)), setMore(d.entries.length === 200)))
        .catch(() => {});
    },
    [kind, q],
  );
  m.useEffect(() => {
    const t = setTimeout(() => load(), 250);
    return () => clearTimeout(t);
  }, [load]);
  const groups = [];
  rows.forEach((r) => {
    const d = r.ts.slice(0, 10);
    (groups.length && groups[groups.length - 1][0] === d ? groups[groups.length - 1][1] : (groups.push([d, []]), groups[groups.length - 1][1])).push(r);
  });
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", { children: [i.jsx("h2", { children: "History" }), i.jsx("p", { children: "Everything you did in the app, and every update to the app itself" })] }),
          i.jsx("span", { className: "spacer" }),
          i.jsxs("button", { className: "btn", onClick: () => R("/history/open-folder", { body: {} }), children: [i.jsx(ks, {}), "Open History folder"] }),
        ],
      }),
      i.jsxs("div", {
        className: "row",
        style: { marginBottom: 10 },
        children: [
          i.jsx(de, {
            value: kind,
            onChange: setKind,
            options: [
              ["", "Everything"],
              ["action", "My activity"],
              ["update", "App updates"],
            ],
          }),
          i.jsx("span", { className: "spacer" }),
          i.jsx("input", { type: "text", placeholder: "Search…", value: q, onChange: (x) => setQ(x.target.value) }),
        ],
      }),
      rows.length === 0 && i.jsx("p", { className: "muted", children: "Nothing yet." }),
      groups.map(([d, list]) =>
        i.jsxs(
          "div",
          {
            className: "card hist-day",
            children: [
              i.jsx("h3", { children: fromIso(d).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) }),
              list.map((r) =>
                i.jsxs(
                  "div",
                  {
                    className: `hist-row ${r.kind}`,
                    children: [
                      i.jsx("span", { className: "muted small tnum", children: r.ts.slice(11, 16) }),
                      r.kind === "update" && i.jsx("span", { className: "chip", children: "update" }),
                      i.jsxs("div", { children: [i.jsx("b", { children: r.title }), r.detail && i.jsx("div", { className: "small muted", children: r.detail })] }),
                    ],
                  },
                  r.id,
                ),
              ),
            ],
          },
          d,
        ),
      ),
      more && i.jsx("button", { className: "btn", onClick: () => load(rows[rows.length - 1].id), children: "Load older" }),
    ],
  });
}

/* ---------------- Backup ---------------- */
function BackupPage() {
  const toast = Be(),
    [s, setS] = m.useState(null),
    [path, setPath] = m.useState("");
  const load = m.useCallback(() => R("/backup/status").then((d) => (setS(d), setPath((p) => p || d.backup_dir))).catch((x) => toast(x.message, "error")), []);
  m.useEffect(() => {
    load();
  }, [load]);
  m.useEffect(() => {
    if (!s || !s.state.running) return;
    const t = setInterval(load, 1000);
    return () => clearInterval(t);
  }, [s && s.state.running]);
  const saveSet = async (body) => {
      try {
        setS(await R("/backup/settings", { body }));
      } catch (x) {
        toast(x.message, "error");
      }
    },
    run = async () => {
      try {
        await R("/backup/run", { body: {} });
        load();
      } catch (x) {
        toast(x.message, "error");
      }
    };
  if (!s) return i.jsx("div", { className: "page", children: i.jsx(ye, {}) });
  const st = s.state;
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Backup" }),
          i.jsx("p", { children: "Copy everything to a USB stick or another drive. No cloud, no syncing. Only new or changed files are copied." }),
        ],
      }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx("span", { className: `status-dot ${s.available && !s.problem ? "on" : ""}` }),
              i.jsx("b", { children: s.backup_dir ? s.backup_dir : "No backup location yet" }),
              s.backup_dir && i.jsx("span", { className: "muted small", children: s.problem ? "can't back up here" : s.available ? "connected" : "not plugged in" }),
              i.jsx("span", { className: "spacer" }),
              s.available && !s.problem && i.jsx("button", { className: "btn sm pc-only", onClick: () => R("/backup/open", { body: {} }), children: "Open backup folder" }),
              i.jsx("button", {
                className: "btn primary",
                disabled: !s.available || !!s.problem || st.running,
                onClick: run,
                children: st.running ? "Backing up…" : "Back up now",
              }),
            ],
          }),
          st.running && i.jsx(ye, { text: `${st.phase}… ${st.copied} copied (${fmtBytes(st.bytes)}), ${st.checked} checked` }),
          s.problem ? i.jsxs("p", { className: "backup-problem", children: ["⚠️ ", s.problem] }) : st.error && i.jsx("p", { className: "err", children: st.error }),
          i.jsxs("p", {
            className: "small muted",
            style: { margin: 0 },
            children: [
              "Last backup: ",
              s.last_backup ? new Date(s.last_backup).toLocaleString("en-GB") : "never",
              " · Your library: ",
              fmtBytes(s.library_size),
              " · Uploaded files: ",
              fmtBytes(s.uploads_size),
            ],
          }),
        ],
      }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx("h3", { children: "Where to back up" }),
          s.drives.filter((d) => d.removable).length === 0 && i.jsx("p", { className: "small muted", children: "No USB stick found. Plug one in and press Refresh." }),
          i.jsx("div", {
            className: "drive-list",
            children: [...s.drives].sort((a, b) => (b.removable - a.removable) || (a.cloud - b.cloud)).map((d) =>
              i.jsxs(
                "button",
                {
                  className: `drive ${s.backup_dir && s.backup_dir.startsWith(d.path) ? "active" : ""} ${d.cloud ? "cloud" : ""}`,
                  disabled: d.cloud,
                  title: d.cloud ? "Cloud drive: not used for offline backups" : d.system ? "This is the PC's own disk: a backup here won't help if the PC breaks" : "",
                  onClick: () => (setPath(d.path), saveSet({ backup_dir: d.path })),
                  children: [
                    i.jsx(IcDrive, { size: 18 }),
                    i.jsxs("div", {
                      children: [
                        i.jsxs("b", { children: [d.label, " (", d.path, ")"] }),
                        i.jsxs("div", { className: "small muted", children: [d.cloud ? "☁ cloud, not offline · " : d.removable ? "USB / removable · " : d.system ? "this PC's own disk · " : "", fmtBytes(d.free), " free of ", fmtBytes(d.total)] }),
                      ],
                    }),
                  ],
                },
                d.path,
              ),
            ),
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx("input", { type: "text", style: { flex: 1 }, placeholder: "Or type a folder, e.g. E:\\Backups", value: path, onChange: (x) => setPath(x.target.value) }),
              i.jsx("button", { className: "btn", onClick: () => saveSet({ backup_dir: path }), children: "Use this folder" }),
              i.jsx("button", { className: "btn ghost", onClick: load, children: "Refresh" }),
            ],
          }),
          i.jsxs("label", {
            className: "check",
            children: [
              i.jsx("input", { type: "checkbox", checked: s.backup_auto, onChange: (x) => saveSet({ backup_auto: x.target.checked }) }),
              "Back up automatically once a day whenever this drive is plugged in (while the app is open)",
            ],
          }),
          i.jsxs("label", {
            className: "check",
            children: [
              i.jsx("input", { type: "checkbox", checked: s.backup_uploads, onChange: (x) => saveSet({ backup_uploads: x.target.checked }) }),
              "Also include the files I uploaded into the app (",
              fmtBytes(s.uploads_size),
              ")",
            ],
          }),
          i.jsx("p", {
            className: "small muted",
            children:
              "What gets saved: all your files (Documents › Data Assistant, by category) and the app library (your file list, history and settings) as dated snapshots. Passwords like your Gmail app password are never copied. A README on the drive explains how to restore.",
          }),
        ],
      }),
    ],
  });
}

/* ---------------- Today (Home) ---------------- */
function TodayCard() {
  const toast = Be(),
    go = ys(),
    [t, setT] = m.useState(null),
    [title, setTitle] = m.useState(""),
    [time, setTime] = m.useState("");
  const load = m.useCallback(() => {
    R("/today").then(setT).catch(() => {});
  }, []);
  m.useEffect(() => {
    load();
    const iv = setInterval(load, 60000);
    window.addEventListener("focus", load);
    window.addEventListener("notes-changed", load);
    return () => (clearInterval(iv), window.removeEventListener("focus", load), window.removeEventListener("notes-changed", load));
  }, [load]);
  if (!t) return null;
  const mins = (hhmm) => {
      const [h, mi] = hhmm.split(":").map(Number);
      const n = new Date();
      return h * 60 + mi - (n.getHours() * 60 + n.getMinutes());
    },
    rel = (hhmm) => {
      const d = mins(hhmm);
      return d <= 0 ? "now" : d < 60 ? `in ${d} min` : `in ${Math.floor(d / 60)} h ${d % 60 ? (d % 60) + " min" : ""}`.trim();
    },
    toggle = async (e) => {
      await R(`/calendar/events/${e.id}/done`, { body: { date: e.occ_date, done: !e.done } }).catch((x) => toast(x.message, "error"));
      load();
    },
    moveToday = async (e) => {
      await R(`/calendar/events/${e.id}/move`, { body: { from_date: e.occ_date, to_date: t.date } }).catch((x) => toast(x.message, "error"));
      toast(`Moved "${e.title}" to today`), load();
    },
    drop = async (e) => {
      await R(`/calendar/events/${e.id}?date=${e.occ_date}&scope=one`, { method: "DELETE" }).catch((x) => toast(x.message, "error"));
      load();
    },
    add = async () => {
      if (!title.trim()) return;
      try {
        await R("/calendar/events", { body: { title, date: t.date, start: time, kind: "other" } });
        setTitle(""), setTime(""), load();
      } catch (x) {
        toast(x.message, "error");
      }
    },
    plans = t.events.filter((e) => e.kind !== "workout"),
    done = t.events.filter((e) => e.done).length;
  return i.jsxs("div", {
    className: "card today",
    children: [
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsxs("div", {
            children: [
              i.jsx("h3", { style: { margin: 0 }, children: "Today" }),
              i.jsx("div", {
                className: "muted small",
                children: fromIso(t.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
              }),
            ],
          }),
          t.next &&
            i.jsxs("div", {
              className: "next-up",
              children: [i.jsx("span", { className: "muted small", children: "Next" }), i.jsxs("b", { children: [t.next.title, " · ", t.next.start] }), i.jsx("span", { className: "small", children: rel(t.next.start) })],
            }),
          i.jsx("span", { className: "spacer" }),
          t.events.length > 0 && i.jsxs("span", { className: "muted small", children: [done, "/", t.events.length, " done"] }),
          i.jsx("button", { className: "btn sm ghost", onClick: () => openCapture({ today: !0 }), children: "+ Note" }),
          i.jsx("button", { className: "btn sm", onClick: () => go("/calendar"), children: "Open calendar" }),
        ],
      }),
      t.workout.due &&
        i.jsxs("div", {
          className: `workout-due ${t.workout.done ? "done" : ""}`,
          children: [
            i.jsx("span", { style: { fontSize: 20 }, children: "💪" }),
            i.jsxs("div", {
              style: { flex: 1 },
              children: [
                i.jsxs("b", { children: ["Workout ", t.workout.session, t.workout.time ? ` at ${t.workout.time}` : "", t.workout.done ? " · done ✓" : ""] }),
                i.jsxs("div", { className: "small muted", children: [t.workout.last_28_days, " workouts in the last 4 weeks"] }),
              ],
            }),
            !t.workout.done && i.jsx("button", { className: "btn primary sm", onClick: () => go("/calendar?tab=workout"), children: "Start workout" }),
          ],
        }),
      plans.length === 0 && !t.workout.due && i.jsx("p", { className: "muted small", children: "Nothing planned yet. Add something below, or ask the Assistant to plan your day." }),
      plans.map((e) =>
        i.jsxs(
          "div",
          {
            className: `day-ev k-${e.kind} ${t.next && t.next.id === e.id ? "is-next" : ""}`,
            children: [
              i.jsx("input", { type: "checkbox", checked: e.done, onChange: () => toggle(e), title: "Done" }),
              i.jsx("span", { className: "tnum small muted", style: { width: 44 }, children: e.start || "—" }),
              i.jsx("span", { className: e.done ? "strike" : "", style: { flex: 1 }, children: e.title }),
              i.jsx("span", { className: "muted small", children: KIND_LABEL[e.kind] }),
            ],
          },
          e.id + e.occ_date,
        ),
      ),
      i.jsx(TodayNotes, { notes: t.notes }),
      t.yesterday_unfinished.length > 0 &&
        i.jsxs("div", {
          className: "leftover",
          children: [
            i.jsx("div", { className: "small muted", style: { marginBottom: 4 }, children: "Left over from yesterday" }),
            t.yesterday_unfinished.map((e) =>
              i.jsxs(
                "div",
                {
                  className: "row",
                  style: { gap: 6, marginBottom: 4 },
                  children: [
                    i.jsx("span", { style: { flex: 1 }, children: e.title }),
                    i.jsx("button", { className: "btn sm", onClick: () => moveToday(e), children: "Move to today" }),
                    i.jsx("button", { className: "btn sm ghost", onClick: () => drop(e), children: "Drop it" }),
                  ],
                },
                e.id,
              ),
            ),
          ],
        }),
      i.jsxs("div", {
        className: "row",
        style: { marginTop: 10 },
        children: [
          i.jsx("input", { type: "text", style: { flex: 1 }, placeholder: "Add to today… (e.g. Call grandma, Revise databases)", value: title, onChange: (x) => setTitle(x.target.value), onKeyDown: (x) => x.key === "Enter" && add() }),
          i.jsx("input", { type: "time", value: time, onChange: (x) => setTime(x.target.value) }),
          i.jsx("button", { className: "btn", onClick: add, disabled: !title.trim(), children: "Add" }),
        ],
      }),
    ],
  });
}
function ReminderSettings() {
  const toast = Be(),
    [s, setS] = m.useState(null);
  m.useEffect(() => {
    R("/reminders/settings").then(setS).catch(() => {});
  }, []);
  const save = async (body) => {
    try {
      setS(await R("/reminders/settings", { body }));
    } catch (x) {
      toast(x.message, "error");
    }
  };
  if (!s) return null;
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsx("h3", { children: "🔔 Reminders" }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.reminders, onChange: (x) => save({ reminders: x.target.checked }) }), "Notify me before each planned block"] }),
          i.jsx("select", {
            value: s.reminder_minutes,
            disabled: !s.reminders,
            onChange: (x) => save({ reminder_minutes: Number(x.target.value) }),
            children: [0, 5, 10, 15, 30, 60].map((v) => i.jsx("option", { value: v, children: v ? `${v} min before` : "at the start time" }, v)),
          }),
        ],
      }),
      i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.daily_summary, onChange: (x) => save({ daily_summary: x.target.checked }) }), "Morning overview of my day (sent between 7 and 11)"] }),
      i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.background, onChange: (x) => save({ background: x.target.checked }) }), "Keep running in the background after I close the window (needed for reminders and auto-backup)"] }),
      i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.start_with_windows, onChange: (x) => save({ start_with_windows: x.target.checked }) }), "Start quietly with Windows (no window, just reminders and backup). Also makes the app open instantly."] }),
      i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.hotkey, onChange: (x) => save({ hotkey: x.target.checked }) }), "Open Toolbit from anywhere with Ctrl+Alt+T"] }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx("button", { className: "btn sm", onClick: () => R("/reminders/test", { body: {} }).then(() => toast("Test notification sent")).catch((x) => toast(x.message, "error")), children: "Send a test notification" }),
          i.jsx("span", { className: "small muted", children: "To stop the app completely, use Quit at the bottom of the sidebar." }),
        ],
      }),
    ],
  });
}

/* ---------------- v2.5: theme, quick jump, week planner, model picker ---------------- */
try {
  const th = localStorage.getItem("da-theme");
  th && (document.documentElement.dataset.theme = th);
} catch {}
function ThemeToggle() {
  const [t, setT] = m.useState(() => {
    try {
      return localStorage.getItem("da-theme") || "system";
    } catch {
      return "system";
    }
  });
  const next = { system: "light", light: "dark", dark: "system" }[t],
    label = { system: "🖥 System theme", light: "☀️ Light", dark: "🌙 Dark" }[t];
  return i.jsx("button", {
    className: "nav-item",
    style: { width: "100%", border: "none", background: "none", cursor: "pointer" },
    title: "Switch light / dark",
    onClick: () => {
      setT(next);
      try {
        next === "system" ? localStorage.removeItem("da-theme") : localStorage.setItem("da-theme", next);
      } catch {}
      next === "system" ? delete document.documentElement.dataset.theme : (document.documentElement.dataset.theme = next);
    },
    children: label,
  });
}
function QuickJump({ items }) {
  const go = ys(),
    [open, setOpen] = m.useState(!1),
    [q, setQ] = m.useState(""),
    [sel, setSel] = m.useState(0),
    inp = m.useRef();
  m.useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") e.preventDefault(), setOpen((o) => !o), setQ(""), setSel(0);
      else if (e.key === "Escape") setOpen(!1);
    };
    window.addEventListener("keydown", h);
    window.addEventListener("open-quickjump", () => (setOpen(!0), setQ(""), setSel(0)));
    return () => window.removeEventListener("keydown", h);
  }, []);
  m.useEffect(() => {
    open && setTimeout(() => inp.current && inp.current.focus(), 10);
  }, [open]);
  if (!open) return null;
  const list = items.filter((x) => !q || (x.label + " " + (x.hint || "")).toLowerCase().includes(q.toLowerCase())).slice(0, 12),
    pick = (x) => (setOpen(!1), go(x.to));
  return i.jsx("div", {
    className: "qj-back",
    onClick: () => setOpen(!1),
    children: i.jsxs("div", {
      className: "qj",
      onClick: (e) => e.stopPropagation(),
      children: [
        i.jsx("input", {
          ref: inp,
          type: "text",
          placeholder: "Jump to… (pages and actions)",
          value: q,
          onChange: (e) => (setQ(e.target.value), setSel(0)),
          onKeyDown: (e) => {
            if (e.key === "ArrowDown") e.preventDefault(), setSel((s) => Math.min(s + 1, list.length - 1));
            else if (e.key === "ArrowUp") e.preventDefault(), setSel((s) => Math.max(s - 1, 0));
            else if (e.key === "Enter" && list[sel]) pick(list[sel]);
          },
        }),
        i.jsx("div", {
          className: "qj-list",
          children: list.map((x, k) =>
            i.jsxs(
              "div",
              {
                className: `qj-item ${k === sel ? "sel" : ""}`,
                onMouseEnter: () => setSel(k),
                onClick: () => pick(x),
                children: [i.jsx("span", { children: x.label }), x.hint && i.jsx("span", { className: "muted small", children: x.hint })],
              },
              x.to + x.label,
            ),
          ),
        }),
        i.jsx("div", { className: "muted small qj-foot", children: "↑↓ to move · Enter to open · Esc to close" }),
      ],
    }),
  });
}
const greet = () => {
  const h = new Date().getHours();
  return h < 5 ? "Up late?" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};
const MODEL_OPTS = [
  ["", "Default (from Settings)"],
  ["claude-sonnet-5-5", "Sonnet 5.5"],
  ["claude-opus-5-5", "Opus 5.5"],
  ["claude-fable-5-1", "Fable 5.1"],
  ["claude-haiku-5-5", "Haiku 5.5"],
];
const EFFORT_OPTS = [
  ["", "Default effort"],
  ["low", "Low (fast)"],
  ["medium", "Medium"],
  ["high", "High"],
  ["xhigh", "Extra high"],
  ["max", "Max (slow)"],
];
function lsStr(k, d = "") {
  try {
    return localStorage.getItem(k) ?? d;
  } catch {
    return d;
  }
}
function lsPut(k, v) {
  try {
    v ? localStorage.setItem(k, v) : localStorage.removeItem(k);
  } catch {}
}
function ModelPicker({ model, setModel, effort, setEffort, compact }) {
  return i.jsxs("span", {
    className: "model-pick",
    children: [
      i.jsx("select", {
        value: model,
        title: "Claude model for this chat",
        onChange: (e) => (setModel(e.target.value), lsPut("da-chat-model", e.target.value)),
        children: MODEL_OPTS.map(([v, l]) => i.jsx("option", { value: v, children: compact && !v ? "Model" : l }, v)),
      }),
      i.jsx("select", {
        value: effort,
        title: "Effort: how hard Claude thinks (higher = better on hard tasks, slower and more expensive)",
        onChange: (e) => (setEffort(e.target.value), lsPut("da-chat-effort", e.target.value)),
        children: EFFORT_OPTS.map(([v, l]) => i.jsx("option", { value: v, children: compact && !v ? "Effort" : l }, v)),
      }),
    ],
  });
}

/* ---------------- Plan my week ---------------- */
let planPending = null; // a suggestion still being made survives leaving the page
function PlanWeek() {
  const toast = Be(),
    nextMon = () => {
      const d = new Date();
      const wd = (d.getDay() + 6) % 7;
      d.setDate(d.getDate() + (wd === 0 ? 0 : 7 - wd));
      return iso(d);
    },
    thisMon = () => {
      const d = new Date();
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      return iso(d);
    },
    [start, setStart] = m.useState(nextMon()),
    [notes, setNotes] = m.useState(""),
    [busy, setBusy] = m.useState(!1),
    [plan, setPlan] = m.useState(null),
    [pick, setPick] = m.useState({}),
    [review, setReview] = m.useState(null),
    [model, setModel] = m.useState(""),
    [effort, setEffort] = m.useState(""),
    [ask, setAsk] = m.useState(""),
    [refining, setRefining] = m.useState(!1);
  const alive = m.useRef(!0),
    show = (p) => {
      if (!p) return setPlan(null);
      setPlan(p), setStart(p.week_start), setNotes(p.notes || "");
      const all = {};
      p.blocks.forEach((b, k) => (all[k] = !0));
      setPick(p.picks || all);
    },
    loadCurrent = () => R("/planner/current").then((d) => alive.current && show(d.plan)).catch(() => {});
  m.useEffect(() => {
    R("/planner/review").then(setReview).catch(() => {});
    if (planPending) {
      setBusy(!0);
      planPending.finally(() => alive.current && (setBusy(!1), loadCurrent()));
    } else loadCurrent();
    return () => (alive.current = !1);
  }, []);
  const gen = async () => {
      setBusy(!0), setPlan(null);
      planPending = R("/planner/suggest", { body: { start, notes, model: model || null, effort: effort || null } });
      try {
        const p = await planPending;
        alive.current && show(p);
      } catch (x) {
        toast(x.message, "error");
      } finally {
        planPending = null;
        alive.current && setBusy(!1);
      }
    },
    refine = async () => {
      const msg = ask.trim();
      if (!msg || refining) return;
      setRefining(!0);
      planPending = R(`/planner/${plan.id}/refine`, { body: { message: msg, picks: pick, model: model || null, effort: effort || null } });
      try {
        const p = await planPending;
        alive.current && (show(p), setAsk(""));
      } catch (x) {
        toast(x.message, "error");
      } finally {
        planPending = null;
        alive.current && setRefining(!1);
      }
    },
    togglePick = (k) =>
      setPick((p) => {
        const n = { ...p, [k]: !p[k] };
        plan && plan.id && R(`/planner/${plan.id}/picks`, { body: { picks: n } }).catch(() => {});
        return n;
      }),
    dismiss = async () => {
      plan && plan.id && (await R(`/planner/${plan.id}/dismiss`, { body: {} }).catch(() => {}));
      setPlan(null);
    },
    applyIt = async () => {
      const blocks = plan.blocks.filter((_, k) => pick[k]);
      if (!blocks.length) return toast("Tick at least one block", "error");
      try {
        const r = await R("/planner/apply", { body: { blocks, plan_id: plan.id || null } });
        toast(`Added ${r.added} blocks to your calendar`), loadCurrent();
      } catch (x) {
        toast(x.message, "error");
      }
    },
    applied = !!(plan && plan.applied_at),
    byDay = {};
  plan && plan.blocks.forEach((b, k) => (!applied || pick[k]) && (byDay[b.date] = byDay[b.date] || []).push([b, k]));
  plan && plan.existing.forEach((e) => (byDay[e.occ_date] = byDay[e.occ_date] || []).push([e, -1]));
  const days = plan
    ? Array.from({ length: 7 }, (_, k) => {
        const d = fromIso(plan.week_start);
        d.setDate(d.getDate() + k);
        return iso(d);
      })
    : [];
  return i.jsxs(i.Fragment, {
    children: [
      review &&
        i.jsxs("div", {
          className: "card row",
          children: [
            i.jsxs("div", { className: "stat", children: [i.jsx("b", { children: review.rate == null ? "–" : `${review.rate}%` }), i.jsx("span", { children: "of last week's plans done" })] }),
            i.jsxs("div", { className: "stat", children: [i.jsxs("b", { children: [review.done, "/", review.planned] }), i.jsx("span", { children: "blocks done / planned" })] }),
            i.jsxs("div", { className: "stat", children: [i.jsx("b", { children: review.workouts }), i.jsx("span", { children: "workouts (goal 3)" })] }),
            i.jsx("span", { className: "spacer" }),
            i.jsx("span", { className: "small muted", style: { maxWidth: 360 }, children: "The planner uses this, your calendar and your About me (Settings) to suggest a week that fits." }),
          ],
        }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(de, {
                value: start,
                onChange: setStart,
                options: [
                  [thisMon(), "This week"],
                  [nextMon() === thisMon() ? (() => { const d = fromIso(thisMon()); d.setDate(d.getDate() + 7); return iso(d); })() : nextMon(), "Next week"],
                ],
              }),
              i.jsxs("span", { className: "muted small", children: ["Week of ", fromIso(start).toLocaleDateString("en-GB", { day: "numeric", month: "long" })] }),
              i.jsx("span", { className: "spacer" }),
              i.jsx(ModelPicker, { model, setModel, effort, setEffort, compact: !0 }),
            ],
          }),
          i.jsx("textarea", {
            style: { minHeight: 80 },
            placeholder: "Anything special this week? e.g. late day at work Wednesday, 2 evenings for a side project, long ride on Sunday, go easy on Monday…",
            value: notes,
            onChange: (x) => setNotes(x.target.value),
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx("span", { className: "small muted", children: "Nothing is added until you choose. Existing plans are kept." }),
              i.jsx("span", { className: "spacer" }),
              i.jsx("button", { className: "btn primary", onClick: gen, disabled: busy, children: busy ? "Planning your week…" : "✨ Suggest my week" }),
            ],
          }),
        ],
      }),
      busy && i.jsx("div", { className: "card", children: i.jsx(ye, { text: "Claude is looking at your week… (10–60 s)" }) }),
      plan &&
        i.jsxs(i.Fragment, {
          children: [
            applied &&
              i.jsxs("div", {
                className: "card row plan-applied",
                children: [
                  i.jsxs("span", { children: ["✓ This plan was added to your calendar on ", new Date(plan.applied_at).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" }), "."] }),
                  i.jsx("span", { className: "spacer" }),
                  i.jsx("button", { className: "btn sm ghost", onClick: dismiss, children: "Hide" }),
                ],
              }),
            i.jsxs("div", {
              className: "card",
              children: [
                i.jsx("p", { style: { marginTop: 0 }, children: plan.summary }),
                plan.recommendations.length > 0 &&
                  i.jsx("ul", { className: "recs", children: plan.recommendations.map((r, k) => i.jsx("li", { children: r }, k)) }),
              ],
            }),
            i.jsx("div", {
              className: "plan-grid",
              children: days.map((d) =>
                i.jsxs(
                  "div",
                  {
                    className: "card plan-day",
                    children: [
                      i.jsx("b", { children: fromIso(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) }),
                      (byDay[d] || [])
                        .sort((a, b) => (a[0].start || "99").localeCompare(b[0].start || "99"))
                        .map(([b, k], j) =>
                          k < 0
                            ? i.jsxs("div", { className: `plan-blk existing k-${b.kind}`, title: "Already in your calendar", children: [i.jsx("span", { className: "tnum small", children: b.start || "—" }), i.jsx("span", { children: b.title })] }, "e" + j)
                            : i.jsxs(
                                "label",
                                {
                                  className: `plan-blk k-${b.kind} ${pick[k] ? "" : "off"}`,
                                  title: b.why,
                                  children: [
                                    applied ? i.jsx("span", { className: "ok", children: "✓" }) : i.jsx("input", { type: "checkbox", checked: !!pick[k], onChange: () => togglePick(k) }),
                                    i.jsxs("span", { className: "tnum small", children: [b.start, b.end ? "–" + b.end : ""] }),
                                    i.jsxs("span", { children: [b.title, b.why && i.jsx("span", { className: "why", children: b.why })] }),
                                  ],
                                },
                                k,
                              ),
                        ),
                    ],
                  },
                  d,
                ),
              ),
            }),
            !applied &&
              i.jsxs("div", {
                className: "card plan-chat",
                children: [
                  i.jsx("b", { children: "💬 Change something" }),
                  (plan.chat || []).map((c, k) => i.jsx("div", { className: `plan-msg ${c.role}`, children: c.text }, k)),
                  refining && i.jsx(ye, { text: "Updating your week…" }),
                  i.jsxs("div", {
                    className: "row",
                    children: [
                      i.jsx("input", {
                        type: "text",
                        style: { flex: 1 },
                        value: ask,
                        disabled: refining,
                        placeholder: "e.g. move the workouts to the evening, keep Saturday free, add 2 side-project sessions",
                        onChange: (x) => setAsk(x.target.value),
                        onKeyDown: (x) => x.key === "Enter" && refine(),
                      }),
                      i.jsx("button", { className: "btn primary", onClick: refine, disabled: refining || !ask.trim(), children: "Update plan" }),
                    ],
                  }),
                ],
              }),
            !applied &&
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx("span", { className: "small muted", children: "Grey items are already in your calendar. Untick anything you don't want. This suggestion stays here until you add or discard it." }),
                  i.jsx("span", { className: "spacer" }),
                  i.jsx("button", { className: "btn ghost", onClick: () => window.confirm("Discard this suggestion?") && dismiss(), children: "Discard" }),
                  i.jsx("button", { className: "btn", onClick: gen, disabled: busy, children: "Try again" }),
                  i.jsxs("button", { className: "btn primary", onClick: applyIt, children: ["Add ", Object.values(pick).filter(Boolean).length, " blocks to calendar"] }),
                ],
              }),
          ],
        }),
    ],
  });
}

/* ---------------- v2.6: focus timer (global), Quick Tools ---------------- */
const copyText = (t, toast) =>
  navigator.clipboard
    .writeText(String(t))
    .then(() => toast && toast("Copied"))
    .catch(() => toast && toast("Couldn't copy", "error"));
const IcTools = mkIcon(["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"]);
const IcTimer = mkIcon(["M10 2h4", "M12 14l3-3", "M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"]);

/* focus timer store: survives page changes and reloads */
const focus = {
  s: (() => {
    try {
      return JSON.parse(localStorage.getItem("da-focus")) || { phase: "idle" };
    } catch {
      return { phase: "idle" };
    }
  })(),
  subs: new Set(),
};
function setFocus(patch) {
  focus.s = { ...focus.s, ...patch };
  try {
    localStorage.setItem("da-focus", JSON.stringify(focus.s));
  } catch {}
  focus.subs.forEach((f) => f());
}
function useFocus() {
  const [, force] = m.useReducer((x) => x + 1, 0);
  m.useEffect(() => (focus.subs.add(force), () => focus.subs.delete(force)), []);
  return focus.s;
}
const hhmm = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
const mmss = (ms) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
function beep() {
  try {
    const c = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.25, 0.5].forEach((t) => {
      const o = c.createOscillator(),
        g = c.createGain();
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.15, c.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.2);
      o.connect(g).connect(c.destination);
      o.start(c.currentTime + t);
      o.stop(c.currentTime + t + 0.22);
    });
  } catch {}
}
function FocusHost() {
  const toast = Be(),
    f = useFocus();
  m.useEffect(() => {
    const iv = setInterval(() => {
      const s = focus.s;
      if (s.phase === "idle" || s.paused) {
        document.title = "Toolbit";
        return;
      }
      const left = s.endsAt - Date.now();
      document.title = `${mmss(left)} · ${s.phase === "focus" ? s.label || "Focus" : "Break"}`;
      focus.subs.forEach((fn) => fn());
      if (left > 0) return;
      beep();
      if (s.phase === "focus") {
        const end = new Date();
        R("/tools/focus-done", { body: { start: s.startHM, end: hhmm(end), minutes: s.minutes, label: s.label || "Focus session" } })
          .then((r) => toast(`Focus session done (${r.today} today). Break time.`))
          .catch(() => {});
        setFocus({ phase: "break", endsAt: Date.now() + (s.breakMin || 5) * 60000, paused: !1 });
      } else {
        toast("Break over. Ready for the next one?");
        setFocus({ phase: "idle" });
      }
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return null;
}
function FocusMini() {
  const f = useFocus(),
    go = ys();
  if (f.phase === "idle") return null;
  const left = f.paused ? f.remaining : f.endsAt - Date.now();
  return i.jsxs("button", {
    className: `focus-mini ${f.phase}`,
    onClick: () => go("/tools?t=focus"),
    children: [i.jsx("span", { children: f.phase === "focus" ? "🍅" : "☕" }), i.jsx("b", { children: mmss(left) }), i.jsx("span", { className: "small", children: f.paused ? "paused" : f.phase === "focus" ? f.label || "Focus" : "Break" })],
  });
}

/* ---------------- individual tools ---------------- */
function FocusTool() {
  const toast = Be(),
    f = useFocus(),
    [label, setLabel] = m.useState(f.label || ""),
    [mins, setMins] = m.useState(f.minutes || 25),
    [brk, setBrk] = m.useState(f.breakMin || 5),
    [today, setToday] = m.useState([]);
  const load = () => R("/tools/focus-today").then((d) => setToday(d.sessions)).catch(() => {});
  m.useEffect(() => {
    load();
  }, [f.phase]);
  const start = () => setFocus({ phase: "focus", label: label.trim() || "Focus session", minutes: mins, breakMin: brk, startHM: hhmm(new Date()), endsAt: Date.now() + mins * 60000, paused: !1 }),
    pause = () => setFocus({ paused: !0, remaining: f.endsAt - Date.now() }),
    resume = () => setFocus({ paused: !1, endsAt: Date.now() + f.remaining }),
    stop = () => window.confirm("Stop this session? It won't be logged.") && setFocus({ phase: "idle" }),
    left = f.phase === "idle" ? mins * 60000 : f.paused ? f.remaining : f.endsAt - Date.now(),
    total = (f.phase === "break" ? f.breakMin || 5 : f.minutes || mins) * 60000,
    pct = f.phase === "idle" ? 0 : 1 - left / total;
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsxs("div", {
        className: "focus-big",
        children: [
          i.jsx("div", { className: "focus-ring", style: { "--p": pct }, children: i.jsxs("div", { children: [i.jsx("b", { children: mmss(left) }), i.jsx("span", { className: "muted small", children: f.phase === "idle" ? "ready" : f.paused ? "paused" : f.phase === "focus" ? "focus" : "break" })] }) }),
          i.jsxs("div", {
            className: "stack",
            style: { flex: 1 },
            children: [
              i.jsx(F, { label: "What are you working on?", children: i.jsx("input", { type: "text", value: label, onChange: (e) => setLabel(e.target.value), placeholder: "e.g. Databases revision", disabled: f.phase !== "idle" }) }),
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx(de, { value: mins, onChange: setMins, options: [[25, "25 min"], [50, "50 min"], [90, "90 min"]] }),
                  i.jsx(Se, { value: mins, onChange: (v) => setMins(Number(v) || 1), min: 1, max: 240, style: { width: 80 } }),
                  i.jsx("span", { className: "small muted", children: "break" }),
                  i.jsx(Se, { value: brk, onChange: (v) => setBrk(Number(v) || 1), min: 1, max: 60, style: { width: 70 } }),
                  i.jsx("span", { className: "small muted", children: "min" }),
                ],
              }),
              i.jsxs("div", {
                className: "row",
                children: [
                  f.phase === "idle" && i.jsx("button", { className: "btn primary", onClick: start, children: "▶ Start focus" }),
                  f.phase !== "idle" && !f.paused && i.jsx("button", { className: "btn", onClick: pause, children: "⏸ Pause" }),
                  f.phase !== "idle" && f.paused && i.jsx("button", { className: "btn primary", onClick: resume, children: "▶ Resume" }),
                  f.phase !== "idle" && i.jsx("button", { className: "btn ghost", onClick: stop, children: "■ Stop" }),
                  f.phase === "break" && i.jsx("button", { className: "btn ghost", onClick: () => setFocus({ phase: "idle" }), children: "Skip break" }),
                ],
              }),
              i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Tip: turn on a site blocker before you press Start. The timer keeps running while you use other pages." }),
            ],
          }),
        ],
      }),
      i.jsxs("div", {
        children: [
          i.jsxs("b", { children: ["Today: ", today.length, " session", today.length === 1 ? "" : "s"] }),
          today.map((s, k) => i.jsxs("div", { className: "small muted", children: [s.start, "–", s.end, " · ", s.title] }, k)),
        ],
      }),
    ],
  });
}
function CalcTool() {
  const toast = Be(),
    [expr, setExpr] = m.useState(""),
    [hist, setHist] = m.useState([]);
  const evalExpr = (x) => {
    let s = x.replace(/×/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-")
      .replace(/(\d),(?=\d{3}(?!\d))/g, "$1").replace(/,/g, ".");   // 1,000 = thousand; 2,5 = 2.5
    if (!/^[0-9+\-*/%^().\s a-z]*$/i.test(s)) throw new Error("Only numbers, + − × ÷ ^ ( ) and functions");
    const fns = { sqrt: "Math.sqrt", sin: "Math.sin", cos: "Math.cos", tan: "Math.tan", ln: "Math.log", log: "Math.log10", abs: "Math.abs", round: "Math.round", floor: "Math.floor", ceil: "Math.ceil", pi: "Math.PI", e: "Math.E" };
    s = s.replace(/[a-z]+/gi, (w) => {
      if (w.toLowerCase() === "of") return "of";
      if (!(w.toLowerCase() in fns)) throw new Error(`Unknown: ${w}`);
      return fns[w.toLowerCase()];
    });
    const pm = s.match(/^(.+?)\s*([+\-])\s*(\d+(?:\.\d+)?)\s*%\s*$/);   // 200 + 10% = 220, like a phone calculator
    if (pm) s = `(${pm[1]})${pm[2]}(${pm[1]})*${pm[3]}/100`;
    s = s.replace(/(\d+(?:\.\d+)?)\s*%\s*of\s*/gi, "($1/100)*");                  // 15% of 80 = 12
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, "($1/100)").replace(/\^/g, "**");
    const v = Function(`"use strict";return (${s})`)();
    if (typeof v !== "number" || !isFinite(v)) throw new Error("Not a number");
    return Math.round(v * 1e12) / 1e12;
  };
  let live = "", liveErr = "";
  try {
    live = expr.trim() ? String(evalExpr(expr)) : "";
  } catch (x) {
    liveErr = /Unknown|Only/.test(x.message) ? x.message : /[+\-*/(^]\s*$/.test(expr) ? "" : "Can't work that out (e.g. dividing by 0)";
  }
  const go = () => {
    try {
      const v = evalExpr(expr);
      setHist((h) => [[expr, v], ...h].slice(0, 12)), setExpr(String(v));
    } catch (x) {
      toast(x.message, "error");
    }
  };
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx("input", { type: "text", className: "big-input", autoFocus: !0, placeholder: "e.g. (1200*0.18) + 35^2 or sqrt(2)", value: expr, onChange: (e) => setExpr(e.target.value), onKeyDown: (e) => e.key === "Enter" && go() }),
      i.jsxs("div", { className: "calc-live", children: ["= ", live || (liveErr ? i.jsx("span", { className: "small muted", children: liveErr }) : "…"), live && i.jsx("button", { className: "btn sm ghost", onClick: () => copyText(live, toast), children: "Copy" })] }),
      i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Supports + − × ÷ ^ %, brackets, sqrt, sin, cos, tan, log, ln, abs, round, pi, e. Enter keeps the result." }),
      hist.map(([a, b], k) => i.jsxs("div", { className: "small mono", children: [a, " = ", i.jsx("b", { children: b })] }, k)),
    ],
  });
}
const UNITS = {
  Length: { m: 1, mm: 0.001, cm: 0.01, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  Weight: { kg: 1, g: 0.001, t: 1000, lb: 0.45359237, oz: 0.028349523125 },
  Volume: { L: 1, ml: 0.001, "m³": 1000, "gal (US)": 3.785411784, cup: 0.2365882365, "fl oz": 0.0295735295625 },
  Area: { "m²": 1, "km²": 1e6, ha: 1e4, "ft²": 0.09290304, acre: 4046.8564224 },
  Speed: { "km/h": 1 / 3.6, "m/s": 1, mph: 0.44704, knot: 0.514444 },
  Time: { s: 1, min: 60, h: 3600, day: 86400, week: 604800 },
  Data: { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 },
  Temperature: { "°C": 0, "°F": 0, K: 0 },
};
function UnitTool() {
  const [cat, setCat] = m.useState("Length"),
    u = Object.keys(UNITS[cat]),
    [from, setFrom] = m.useState("m"),
    [to, setTo] = m.useState("ft"),
    [val, setVal] = m.useState(1);
  const pickCat = (c) => {
    setCat(c);
    const k = Object.keys(UNITS[c]);
    setFrom(k[0]), setTo(k[1]);
  };
  const conv = (v, a, b) => {
    if (cat === "Temperature") {
      const c = a === "°C" ? v : a === "°F" ? ((v - 32) * 5) / 9 : v - 273.15;
      return b === "°C" ? c : b === "°F" ? (c * 9) / 5 + 32 : c + 273.15;
    }
    return (v * UNITS[cat][a]) / UNITS[cat][b];
  };
  const out = conv(Number(val) || 0, from, to),
    fmt = (x) => (Math.abs(x) >= 1e9 || (Math.abs(x) < 1e-4 && x) ? x.toExponential(4) : Math.round(x * 1e6) / 1e6);
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx(de, { value: cat, onChange: pickCat, options: Object.keys(UNITS) }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx("input", { type: "number", className: "big-input", style: { width: 180 }, value: val, onChange: (e) => setVal(e.target.value) }),
          i.jsx("select", { value: from, onChange: (e) => setFrom(e.target.value), children: u.map((x) => i.jsx("option", { children: x }, x)) }),
          i.jsx("button", { className: "btn ghost", onClick: () => (setFrom(to), setTo(from)), title: "Swap", children: "⇄" }),
          i.jsx("select", { value: to, onChange: (e) => setTo(e.target.value), children: u.map((x) => i.jsx("option", { children: x }, x)) }),
        ],
      }),
      i.jsxs("div", { className: "calc-live", children: [fmt(out), " ", to] }),
      i.jsx("div", { className: "unit-table", children: u.filter((x) => x !== from).map((x) => i.jsxs("div", { children: [i.jsx("span", { className: "muted", children: x }), i.jsx("b", { children: fmt(conv(Number(val) || 0, from, x)) })] }, x)) }),
    ],
  });
}
const CURS = ["EUR", "ALL", "USD", "GBP", "CHF", "TRY", "JPY", "CAD", "AUD", "SEK", "NOK", "PLN", "CZK", "HUF", "RON", "BGN", "RSD", "MKD", "CNY", "INR", "AED", "BTC"];
function CurrencyTool() {
  const toast = Be(),
    [amt, setAmt] = m.useState(100),
    [from, setFrom] = m.useState(lsStr("da-fx-from", "EUR")),
    [to, setTo] = m.useState(lsStr("da-fx-to", "ALL")),
    [d, setD] = m.useState(null),
    [err, setErr] = m.useState("");
  m.useEffect(() => {
    setErr("");
    lsPut("da-fx-from", from), lsPut("da-fx-to", to);
    R(`/tools/fx?base=${from}`).then(setD).catch((x) => setErr(x.message));
  }, [from]);
  m.useEffect(() => lsPut("da-fx-to", to), [to]);
  const rate = d && d.rates[to],
    all = d ? Object.keys(d.rates).sort() : CURS;
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx("input", { type: "number", className: "big-input", style: { width: 180 }, value: amt, onChange: (e) => setAmt(e.target.value) }),
          i.jsx("select", { value: from, onChange: (e) => setFrom(e.target.value), children: all.map((x) => i.jsx("option", { children: x }, x)) }),
          i.jsx("button", { className: "btn ghost", onClick: () => (setFrom(to), setTo(from)), children: "⇄" }),
          i.jsx("select", { value: to, onChange: (e) => setTo(e.target.value), children: all.map((x) => i.jsx("option", { children: x }, x)) }),
        ],
      }),
      err && i.jsx("p", { className: "err", children: err }),
      rate != null &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsxs("div", { className: "calc-live", children: [(Math.round((Number(amt) || 0) * rate * 100) / 100).toLocaleString("en-GB"), " ", to] }),
            i.jsxs("p", { className: "small muted", style: { margin: 0 }, children: ["1 ", from, " = ", rate, " ", to, " · rates from open.er-api.com, ", d.updated, d.stale ? " (offline, last known rates)" : ""] }),
            i.jsx("div", { className: "unit-table", children: CURS.filter((c) => c !== from && d.rates[c]).slice(0, 12).map((c) => i.jsxs("div", { children: [i.jsx("span", { className: "muted", children: c }), i.jsx("b", { children: (Math.round((Number(amt) || 0) * d.rates[c] * 100) / 100).toLocaleString("en-GB") })] }, c)) }),
          ],
        }),
    ],
  });
}
const DEFAULT_ZONES = ["Europe/Tirane", "Europe/London", "America/New_York", "America/Los_Angeles", "Asia/Dubai", "Asia/Tokyo", "Australia/Sydney"];
function ClockTool() {
  const [zones, setZones] = m.useState(() => {
      try {
        return JSON.parse(localStorage.getItem("da-zones")) || DEFAULT_ZONES;
      } catch {
        return DEFAULT_ZONES;
      }
    }),
    [, tick] = m.useReducer((x) => x + 1, 0),
    [add, setAdd] = m.useState("");
  m.useEffect(() => {
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const save = (z) => {
      setZones(z);
      try {
        localStorage.setItem("da-zones", JSON.stringify(z));
      } catch {}
    },
    all = (Intl.supportedValuesOf && Intl.supportedValuesOf("timeZone")) || DEFAULT_ZONES,
    now = new Date();
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx("div", {
        className: "clock-grid",
        children: zones.map((z) => {
          const t = now.toLocaleTimeString("en-GB", { timeZone: z, hour: "2-digit", minute: "2-digit" }),
            d = now.toLocaleDateString("en-GB", { timeZone: z, weekday: "short", day: "numeric", month: "short" }),
            h = Number(now.toLocaleString("en-GB", { timeZone: z, hour: "2-digit", hour12: !1 }));
          return i.jsxs(
            "div",
            {
              className: "clock",
              children: [
                i.jsxs("span", { className: "muted small", children: [z.split("/").pop().replace(/_/g, " "), h >= 7 && h < 22 ? " ☀️" : " 🌙"] }),
                i.jsx("b", { children: t }),
                i.jsx("span", { className: "muted small", children: d }),
                i.jsx("button", { className: "icon-btn", title: "Remove", onClick: () => save(zones.filter((x) => x !== z)), children: "×" }),
              ],
            },
            z,
          );
        }),
      }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsxs("select", { value: add, onChange: (e) => setAdd(e.target.value), children: [i.jsx("option", { value: "", children: "Add a city / time zone…" }), all.map((z) => i.jsx("option", { children: z }, z))] }),
          i.jsx("button", { className: "btn", disabled: !add, onClick: () => (save([...new Set([...zones, add])]), setAdd("")), children: "Add" }),
        ],
      }),
    ],
  });
}
function DateTool() {
  const today = iso(new Date()),
    [a, setA] = m.useState(today),
    [b, setB] = m.useState(today),
    [base, setBase] = m.useState(today),
    [n, setN] = m.useState(30);
  const da = fromIso(a),
    db = fromIso(b),
    days = Math.round((db - da) / 86400000);
  let work = 0;
  for (let d = new Date(Math.min(da, db)); d < new Date(Math.max(da, db)); d.setDate(d.getDate() + 1)) [1, 2, 3, 4, 5].includes(d.getDay()) && work++;
  const res = fromIso(base);
  res.setDate(res.getDate() + Number(n || 0));
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx("b", { children: "Days between two dates" }),
      i.jsxs("div", { className: "row", children: [i.jsx("input", { type: "date", value: a, onChange: (e) => setA(e.target.value) }), i.jsx("span", { children: "→" }), i.jsx("input", { type: "date", value: b, onChange: (e) => setB(e.target.value) })] }),
      i.jsxs("div", { className: "calc-live", children: [days, " days"] }),
      i.jsxs("p", { className: "small muted", style: { margin: 0 }, children: ["= ", (Math.abs(days) / 7).toFixed(1), " weeks · ", work, " weekdays (Mon–Fri)"] }),
      i.jsx("b", { style: { marginTop: 16 }, children: "Add or subtract days" }),
      i.jsxs("div", { className: "row", children: [i.jsx("input", { type: "date", value: base, onChange: (e) => setBase(e.target.value) }), i.jsx("span", { children: "+" }), i.jsx(Se, { value: n, onChange: setN, style: { width: 90 } }), i.jsx("span", { children: "days" })] }),
      i.jsx("div", { className: "calc-live", children: res.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) }),
    ],
  });
}
function TextTool() {
  const toast = Be(),
    [t, setT] = m.useState("");
  const words = (t.match(/\S+/g) || []).length,
    lines = t ? t.split("\n").length : 0,
    ops = [
      ["UPPER", (x) => x.toUpperCase()],
      ["lower", (x) => x.toLowerCase()],
      ["Title Case", (x) => x.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase())],
      ["Sentence case", (x) => x.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, (c) => c.toUpperCase())],
      ["Trim spaces", (x) => x.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).join("\n")],
      ["Remove empty lines", (x) => x.split("\n").filter((l) => l.trim()).join("\n")],
      ["Sort lines", (x) => x.split("\n").sort((p, q) => p.localeCompare(q)).join("\n")],
      ["Unique lines", (x) => [...new Set(x.split("\n"))].join("\n")],
      ["Reverse lines", (x) => x.split("\n").reverse().join("\n")],
      ["Number lines", (x) => x.split("\n").map((l, k) => `${k + 1}. ${l}`).join("\n")],
    ];
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx("textarea", { style: { minHeight: 220 }, placeholder: "Paste text here…", value: t, onChange: (e) => setT(e.target.value) }),
      i.jsxs("div", { className: "small muted", children: [words, " words · ", t.length, " characters (", t.replace(/\s/g, "").length, " without spaces) · ", lines, " lines · ~", Math.max(1, Math.round(words / 230)), " min read"] }),
      i.jsxs("div", { className: "row", children: [ops.map(([l, fn]) => i.jsx("button", { className: "btn sm", onClick: () => setT(fn(t)), children: l }, l)), i.jsx("span", { className: "spacer" }), i.jsx("button", { className: "btn sm primary", onClick: () => copyText(t, toast), children: "Copy" })] }),
    ],
  });
}
function EncodeTool() {
  const toast = Be(),
    [t, setT] = m.useState(""),
    [out, setOut] = m.useState(""),
    [err, setErr] = m.useState("");
  const run = (fn) => {
    try {
      setErr(""), setOut(fn(t));
    } catch (x) {
      setErr(x.message), setOut("");
    }
  };
  const b64e = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s))),
    b64d = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.trim()), (c) => c.charCodeAt(0)));
  const hash = async (alg) => {
    const h = await crypto.subtle.digest(alg, new TextEncoder().encode(t));
    setErr(""), setOut([...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join(""));
  };
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsx("textarea", { style: { minHeight: 140 }, placeholder: "Input…", value: t, onChange: (e) => setT(e.target.value) }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx("button", { className: "btn sm", onClick: () => run(b64e), children: "Base64 encode" }),
          i.jsx("button", { className: "btn sm", onClick: () => run(b64d), children: "Base64 decode" }),
          i.jsx("button", { className: "btn sm", onClick: () => run(encodeURIComponent), children: "URL encode" }),
          i.jsx("button", { className: "btn sm", onClick: () => run(decodeURIComponent), children: "URL decode" }),
          i.jsx("button", { className: "btn sm", onClick: () => run((x) => JSON.stringify(JSON.parse(x), null, 2)), children: "JSON format" }),
          i.jsx("button", { className: "btn sm", onClick: () => run((x) => JSON.stringify(JSON.parse(x))), children: "JSON minify" }),
          i.jsx("button", { className: "btn sm", onClick: () => run((x) => x.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])), children: "HTML escape" }),
          i.jsx("button", { className: "btn sm", onClick: () => hash("SHA-256"), children: "SHA-256" }),
          i.jsx("button", { className: "btn sm", onClick: () => hash("SHA-1"), children: "SHA-1" }),
          i.jsx("button", { className: "btn sm", onClick: () => (setErr(""), setOut(crypto.randomUUID())), children: "New UUID" }),
          i.jsx("button", { className: "btn sm", onClick: () => (setErr(""), setOut(`${Math.floor(Date.now() / 1000)}  (unix time now)\n${new Date().toISOString()}`)), children: "Timestamp now" }),
        ],
      }),
      err && i.jsx("p", { className: "err", children: err }),
      out && i.jsxs("div", { className: "stack", children: [i.jsx("div", { className: "code", children: out }), i.jsx("div", { className: "row end", children: i.jsx("button", { className: "btn sm primary", onClick: () => copyText(out, toast), children: "Copy result" }) })] }),
    ],
  });
}
function PasswordTool() {
  const toast = Be(),
    [len, setLen] = m.useState(18),
    [opt, setOpt] = m.useState({ upper: !0, lower: !0, digits: !0, symbols: !0 }),
    [pw, setPw] = m.useState("");
  const sets = { upper: "ABCDEFGHJKLMNPQRSTUVWXYZ", lower: "abcdefghijkmnopqrstuvwxyz", digits: "23456789", symbols: "!@#$%^&*-_=+?" },
    gen = () => {
      const pool = Object.keys(opt).filter((k) => opt[k]).map((k) => sets[k]).join("") || sets.lower,
        a = new Uint32Array(len);
      crypto.getRandomValues(a);
      setPw([...a].map((x) => pool[x % pool.length]).join(""));
    };
  m.useEffect(gen, [len, opt]);
  const pool = Object.keys(opt).filter((k) => opt[k]).map((k) => sets[k]).join("").length || 25,
    bits = Math.round(len * Math.log2(pool));
  return i.jsxs("div", {
    className: "stack",
    children: [
      i.jsxs("div", { className: "row", children: [i.jsx("div", { className: "code pw", style: { flex: 1 }, children: pw }), i.jsx("button", { className: "btn", onClick: gen, children: "↻ New" }), i.jsx("button", { className: "btn primary", onClick: () => copyText(pw, toast), children: "Copy" })] }),
      i.jsxs("div", { className: "row", children: [i.jsx("span", { children: "Length" }), i.jsx("input", { type: "range", min: 8, max: 64, value: len, onChange: (e) => setLen(Number(e.target.value)), style: { flex: 1 } }), i.jsx("b", { children: len })] }),
      i.jsx("div", { className: "row", children: Object.keys(sets).map((k) => i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: opt[k], onChange: (e) => setOpt({ ...opt, [k]: e.target.checked }) }), k] }, k)) }),
      i.jsxs("p", { className: "small muted", style: { margin: 0 }, children: ["Strength: about ", bits, " bits (", bits >= 80 ? "very strong" : bits >= 60 ? "strong" : "weak", "). Made on this PC, never sent anywhere."] }),
    ],
  });
}
function QrTool() {
  const toast = Be(),
    [t, setT] = m.useState(""),
    cv = m.useRef();
  m.useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!t) return ctx.clearRect(0, 0, c.width, c.height);
    try {
      const q = qrcode(0, "M");
      q.addData(unescape(encodeURIComponent(t)));
      q.make();
      const n = q.getModuleCount(),
        s = Math.floor(320 / (n + 8));
      c.width = c.height = s * (n + 8);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#000";
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) q.isDark(r, k) && ctx.fillRect((k + 4) * s, (r + 4) * s, s, s);
    } catch {
      toast("Too much text for one QR code", "error");
    }
  }, [t]);
  return i.jsxs("div", {
    className: "row",
    style: { alignItems: "flex-start" },
    children: [
      i.jsxs("div", { className: "stack", style: { flex: 1, minWidth: 260 }, children: [i.jsx("textarea", { style: { minHeight: 120 }, placeholder: "Link, text, Wi-Fi password…", value: t, onChange: (e) => setT(e.target.value) }), t && i.jsx("a", { className: "btn primary", download: "qr-code.png", href: "#", onClick: (e) => (e.currentTarget.href = cv.current.toDataURL("image/png")), children: "⬇ Download PNG" })] }),
      i.jsx("canvas", { ref: cv, className: "qr", width: 320, height: 320 }),
    ],
  });
}
function ColorTool() {
  const toast = Be(),
    [hex, setHex] = m.useState("#5b5bf7");
  const h = /^#?[0-9a-f]{6}$/i.test(hex) ? hex.replace("#", "") : "000000",
    r = parseInt(h.slice(0, 2), 16),
    g = parseInt(h.slice(2, 4), 16),
    b = parseInt(h.slice(4, 6), 16);
  const mx = Math.max(r, g, b) / 255,
    mn = Math.min(r, g, b) / 255,
    l = (mx + mn) / 2,
    d = mx - mn,
    s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let hue = 0;
  if (d) {
    const [R1, G1, B1] = [r / 255, g / 255, b / 255];
    hue = mx === R1 ? ((G1 - B1) / d) % 6 : mx === G1 ? (B1 - R1) / d + 2 : (R1 - G1) / d + 4;
    hue = Math.round(hue * 60 < 0 ? hue * 60 + 360 : hue * 60);
  }
  const vals = [`#${h.toLowerCase()}`, `rgb(${r}, ${g}, ${b})`, `hsl(${hue}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`];
  return i.jsxs("div", {
    className: "row",
    style: { alignItems: "flex-start" },
    children: [
      i.jsx("input", { type: "color", className: "color-big", value: `#${h}`, onChange: (e) => setHex(e.target.value) }),
      i.jsxs("div", {
        className: "stack",
        style: { flex: 1 },
        children: [
          i.jsx("input", { type: "text", value: hex, onChange: (e) => setHex(e.target.value.trim()), placeholder: "#rrggbb" }),
          vals.map((v) => i.jsxs("div", { className: "row", children: [i.jsx("code", { className: "code", style: { flex: 1, padding: "6px 10px" }, children: v }), i.jsx("button", { className: "btn sm", onClick: () => copyText(v, toast), children: "Copy" })] }, v)),
        ],
      }),
    ],
  });
}
const TOOLS = [
  ["focus", "🍅", "Focus timer", "Pomodoro: focus, then a short break", FocusTool],
  ["calc", "🧮", "Calculator", "Type any sum, % and functions", CalcTool],
  ["units", "📏", "Unit converter", "Length, weight, temperature, data…", UnitTool],
  ["fx", "💱", "Currency", "Live rates, EUR ⇄ ALL and more", CurrencyTool],
  ["clock", "🌍", "World clock", "Times around the world", ClockTool],
  ["dates", "📅", "Date maths", "Days between dates, add days", DateTool],
  ["text", "🔤", "Text tools", "Count, change case, sort, clean", TextTool],
  ["encode", "🔐", "Encode & hash", "Base64, URL, JSON, SHA, UUID", EncodeTool],
  ["password", "🔑", "Password generator", "Strong random passwords", PasswordTool],
  ["qr", "▦", "QR code", "Turn a link or text into a QR", QrTool],
  ["color", "🎨", "Colour converter", "HEX, RGB, HSL", ColorTool],
];
function ToolsPage() {
  const go = ys(),
    q = new URLSearchParams(window.location.hash.split("?")[1] || ""),
    [cur, setCur] = m.useState(q.get("t") || "focus");
  m.useEffect(() => {
    const h = () => {
      const t = new URLSearchParams(window.location.hash.split("?")[1] || "").get("t");
      t && setCur(t);
    };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  const T = TOOLS.find((x) => x[0] === cur) || TOOLS[0];
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", { className: "page-header", children: [i.jsx("h2", { children: "Quick Tools" }), i.jsx("p", { children: "The little things you'd normally google. Everything except currency rates works offline." })] }),
      i.jsxs("div", {
        className: "tools-layout",
        children: [
          i.jsx("div", {
            className: "tools-list",
            children: TOOLS.map(([id, ic, name, desc]) =>
              i.jsxs(
                "button",
                {
                  className: `tool-pick ${id === T[0] ? "active" : ""}`,
                  onClick: () => (setCur(id), go(`/tools?t=${id}`)),
                  children: [i.jsx("span", { className: "tool-ic", children: ic }), i.jsxs("span", { children: [i.jsx("b", { children: name }), i.jsx("span", { className: "small muted", children: desc })] })],
                },
                id,
              ),
            ),
          }),
          i.jsxs("div", { className: "card tool-panel", children: [i.jsxs("h3", { children: [T[1], " ", T[2]] }), i.jsx(T[4], {}, T[0])] }),
        ],
      }),
    ],
  });
}

/* ---------------- v2.7: notes, quick capture, jobs, batch, OCR, subtitles, week review ---------------- */
const IcNote = mkIcon(["M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z", "M15 3v6h6", "M8 13h8", "M8 17h5"]);
const IcLayers = mkIcon(["M12 2 2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"]);
const IcScan = mkIcon(["M3 7V5a2 2 0 0 1 2-2h2", "M17 3h2a2 2 0 0 1 2 2v2", "M21 17v2a2 2 0 0 1-2 2h-2", "M7 21H5a2 2 0 0 1-2-2v-2", "M7 9h10", "M7 13h10", "M7 17h6"]);
const IcChart = mkIcon(["M3 3v18h18", "M7 16v-5", "M12 16V8", "M17 16v-9"]);
const K_IMGPDF = ["image", "pdf"],
  K_AV = ["video", "audio"];
const hashQ = () => new URLSearchParams(window.location.hash.split("?")[1] || "");
const openCapture = (preset) => window.dispatchEvent(new CustomEvent("open-capture", { detail: preset || {} }));
const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m || 0} min`);

/* ---------- background jobs (batch, OCR, subtitles) ---------- */
function useJob() {
  const toast = Be(),
    [job, setJob] = m.useState(null),
    timer = m.useRef();
  m.useEffect(() => () => clearTimeout(timer.current), []);
  const poll = (id) => {
    R(`/jobs/${id}`)
      .then((j) => {
        setJob(j);
        if (j.state === "running") timer.current = setTimeout(() => poll(id), 700);
        else if (j.state === "error") toast(j.error, "error");
        else {
          const n = ((j.result && j.result.files) || []).length;
          window.dispatchEvent(new Event("files-changed"));
          toast(n ? `Done: ${n} file${n === 1 ? "" : "s"} saved` : "Done");
        }
      })
      .catch((x) => (setJob(null), toast(x.message, "error")));
  };
  const start = async (p) => {
    try {
      const j = await p;
      setJob(j), poll(j.id);
    } catch (x) {
      toast(x.message, "error");
    }
  };
  return { job, busy: !!job && job.state === "running", start, reset: () => setJob(null), cancel: () => job && R(`/jobs/${job.id}/cancel`, { body: {} }) };
}
function JobStatus({ j }) {
  const { job, cancel } = j;
  if (!job) return null;
  const pct = job.total ? Math.round((100 * job.done) / job.total) : null;
  return i.jsxs("div", {
    className: `card job ${job.state}`,
    children: [
      i.jsxs("div", {
        className: "row",
        children: [
          job.state === "running" ? i.jsx(ye, { text: job.message || "Working…" }) : i.jsx("b", { children: job.state === "done" ? "✓ Finished" : "Something went wrong" }),
          i.jsx("span", { className: "spacer" }),
          job.state === "running" && i.jsx("button", { className: "btn sm ghost", onClick: cancel, children: "Stop" }),
        ],
      }),
      job.state === "running" && i.jsx("div", { className: "bar", children: i.jsx("i", { style: { width: `${pct == null ? 8 : Math.max(4, pct)}%` }, className: pct == null ? "indet" : "" }) }),
      job.state === "error" && i.jsx("div", { className: "err small", children: job.error }),
      job.result && job.result.errors && job.result.errors.length > 0 && i.jsx("div", { className: "err small", children: job.result.errors.join("\n") }),
      job.result && job.result.skipped && job.result.skipped.length > 0 && i.jsxs("div", { className: "small muted", children: ["Skipped (wrong type for this action): ", job.result.skipped.join(", ")] }),
      job.result && job.result.note && i.jsx("div", { className: "small", children: job.result.note }),
    ],
  });
}

/* ---------- notes ---------- */
function NoteBody({ body, onToggle }) {
  // render markdown, with clickable checkboxes for "- [ ]" lines
  const lines = (body || "").split("\n"),
    parts = [];
  let buf = [];
  const flush = () => buf.length && (parts.push(["md", buf.join("\n")]), (buf = []));
  lines.forEach((l, k) => {
    const mm = l.match(/^(\s*)[-*] \[( |x|X)\] (.*)$/);
    if (mm) flush(), parts.push(["todo", k, mm[2] !== " ", mm[3]]);
    else buf.push(l);
  });
  flush();
  return i.jsx("div", {
    className: "note-body",
    children: parts.map((p, k) =>
      p[0] === "md"
        ? i.jsx(Ss, { text: p[1].replace(/(^|\s)#([\w-]{2,30})/g, "$1`#$2`") }, k)
        : i.jsxs("label", { className: `todo ${p[2] ? "on" : ""}`, children: [i.jsx("input", { type: "checkbox", checked: p[2], onChange: () => onToggle && onToggle(p[1]) }), i.jsx("span", { children: p[3] })] }, k),
    ),
  });
}
function NoteCapture() {
  const toast = Be(),
    go = ys(),
    [open, setOpen] = m.useState(!1),
    [text, setText] = m.useState(""),
    [today, setToday] = m.useState(!1),
    [pin, setPin] = m.useState(!1),
    ref = m.useRef();
  m.useEffect(() => {
    const on = (e) => {
      const d = (e && e.detail) || {};
      setText(d.text || ""), setToday(!!d.today), setPin(!1), setOpen(!0);
      setTimeout(() => ref.current && ref.current.focus(), 30);
    };
    const key = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "N" || e.key === "n")) e.preventDefault(), on();
    };
    window.addEventListener("open-capture", on);
    window.addEventListener("keydown", key);
    return () => (window.removeEventListener("open-capture", on), window.removeEventListener("keydown", key));
  }, []);
  if (!open) return null;
  const save = async () => {
    if (!text.trim()) return setOpen(!1);
    try {
      const n = await R("/notes", { body: { body: text, pinned: pin, day: today ? iso(new Date()) : "", source: "capture" } });
      setOpen(!1), setText(""), toast(`Saved note "${n.title}"`);
      window.dispatchEvent(new Event("notes-changed"));
    } catch (x) {
      toast(x.message, "error");
    }
  };
  return i.jsx("div", {
    className: "qj-back",
    onMouseDown: (e) => e.target === e.currentTarget && save(),
    children: i.jsxs("div", {
      className: "capture",
      onKeyDown: (e) => {
        if (e.key === "Escape") setOpen(!1);
        if (e.key === "Enter" && e.ctrlKey) e.preventDefault(), save();
      },
      children: [
        i.jsxs("div", { className: "row", children: [i.jsx("b", { children: "📝 Quick note" }), i.jsx("span", { className: "spacer" }), i.jsx("span", { className: "small muted", children: "Ctrl+Enter saves · Esc cancels" })] }),
        i.jsx("textarea", {
          ref,
          value: text,
          placeholder: "Idea, to-do, something to remember…\n- [ ] makes a checklist item, #tag adds a tag",
          onChange: (e) => setText(e.target.value),
        }),
        i.jsxs("div", {
          className: "row",
          children: [
            i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: today, onChange: (e) => setToday(e.target.checked) }), "Show in Today"] }),
            i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: pin, onChange: (e) => setPin(e.target.checked) }), "Pin"] }),
            i.jsx("span", { className: "spacer" }),
            i.jsx("button", { className: "btn ghost", onClick: () => (setOpen(!1), go("/notes")), children: "All notes" }),
            i.jsx("button", { className: "btn primary", onClick: save, children: "Save" }),
          ],
        }),
      ],
    }),
  });
}
function NotesPage() {
  const toast = Be(),
    [list, setList] = m.useState([]),
    [tags, setTags] = m.useState([]),
    [q, setQ] = m.useState(""),
    [tag, setTag] = m.useState(""),
    [arch, setArch] = m.useState(!1),
    [cur, setCur] = m.useState(null),
    [draft, setDraft] = m.useState(null),
    [edit, setEdit] = m.useState(!1),
    [saved, setSaved] = m.useState("saved"),
    tmr = m.useRef();
  const load = m.useCallback(
    () =>
      R(`/notes?q=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}&archived=${arch}`)
        .then((d) => (setList(d.notes), setTags(d.tags)))
        .catch(() => {}),
    [q, tag, arch],
  );
  m.useEffect(() => {
    const t = setTimeout(load, 150);
    window.addEventListener("notes-changed", load);
    return () => (clearTimeout(t), window.removeEventListener("notes-changed", load));
  }, [load]);
  m.useEffect(() => {
    const id = hashQ().get("id");
    if (id) R(`/notes/${id}`).then(pick).catch(() => {});
    if (hashQ().get("new")) newNote();
  }, []);
  const pick = (n) => {
    flush();
    setCur(n), setDraft({ title: n.title, body: n.body, day: n.day || "", pinned: n.pinned }), setEdit(!1), setSaved("saved");
  };
  const persist = async (id, d) => {
    setSaved("saving");
    try {
      const n = await R(`/notes/${id}`, { method: "PUT", body: d });
      setCur(n), setSaved("saved"), load();
    } catch (x) {
      setSaved("error"), toast(x.message, "error");
    }
  };
  const change = (patch, now) => {
    const d = { ...draft, ...patch };
    setDraft(d), setSaved("unsaved");
    clearTimeout(tmr.current);
    const id = cur.id;
    tmr.current = setTimeout(() => persist(id, d), now ? 0 : 700);
  };
  const flush = () => {
    if (tmr.current && cur && saved === "unsaved") clearTimeout(tmr.current), persist(cur.id, draft);
  };
  const newNote = async () => {
    try {
      const n = await R("/notes", { body: { title: "New note", body: "" } });
      await load(), pick(n), setEdit(!0);
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const del = async () => {
    if (!window.confirm(`Delete "${cur.title}"? This can't be undone.`)) return;
    await R(`/notes/${cur.id}`, { method: "DELETE" }).catch((x) => toast(x.message, "error"));
    setCur(null), setDraft(null), load();
  };
  const toggleLine = (k) => {
    const ls = draft.body.split("\n");
    ls[k] = ls[k].replace(/\[( |x|X)\]/, (s, c) => (c === " " ? "[x]" : "[ ]"));
    change({ body: ls.join("\n") }, !0);
  };
  const exp = () => R("/notes/export", { body: {} }).then((r) => toast(`Exported ${r.count} notes as Markdown to Documents\\Data Assistant\\Notes`)).catch((x) => toast(x.message, "error"));
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", { style: { flex: 1 }, children: [i.jsx("h2", { children: "Notes" }), i.jsx("p", { children: "Your second brain: ideas, lists, things to remember. Ctrl+Shift+N anywhere in the app for a quick note. The Assistant can save and search them too." })] }),
          i.jsx("button", { className: "btn ghost", onClick: exp, children: "Export to Markdown" }),
          i.jsx("button", { className: "btn primary", onClick: newNote, children: "+ New note" }),
        ],
      }),
      i.jsxs("div", {
        className: "notes-layout",
        children: [
          i.jsxs("div", {
            className: "notes-side",
            children: [
              i.jsx("input", { type: "text", placeholder: "🔎 Search notes…", value: q, onChange: (e) => setQ(e.target.value) }),
              i.jsxs("div", {
                className: "pills",
                style: { margin: "8px 0" },
                children: [
                  i.jsx("button", { className: `pill ${!tag && !arch ? "active" : ""}`, onClick: () => (setTag(""), setArch(!1)), children: "All" }),
                  tags.slice(0, 14).map(([t, n]) => i.jsxs("button", { className: `pill ${tag === t ? "active" : ""}`, onClick: () => setTag(tag === t ? "" : t), children: ["#", t, " ", i.jsx("span", { className: "small", style: { opacity: 0.7 }, children: n })] }, t)),
                  i.jsx("button", { className: `pill ${arch ? "active" : ""}`, onClick: () => setArch(!arch), children: "🗄 Archive" }),
                ],
              }),
              list.length === 0 && i.jsx("p", { className: "muted small", children: q || tag ? "No notes match." : "No notes yet. Press + New note or Ctrl+Shift+N." }),
              list.map((n) =>
                i.jsxs(
                  "div",
                  {
                    className: `list-item note-item ${cur && cur.id === n.id ? "active" : ""}`,
                    onClick: () => pick(n),
                    children: [
                      i.jsxs("div", { className: "t", children: [n.pinned && "📌 ", n.title] }),
                      i.jsx("div", { className: "m clamp2", children: n.body.replace(/\[[ xX]\]/g, "").replace(/[#*>`|-]/g, " ").replace(/\s+/g, " ").slice(0, 140) || "Empty" }),
                      i.jsxs("div", {
                        className: "m",
                        children: [
                          new Date(n.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
                          n.todo + n.done > 0 && ` · ☑ ${n.done}/${n.todo + n.done}`,
                          n.tags.length > 0 && ` · ${n.tags.map((t) => "#" + t).join(" ")}`,
                        ],
                      }),
                    ],
                  },
                  n.id,
                ),
              ),
            ],
          }),
          cur && draft
            ? i.jsxs("div", {
                className: "card note-editor",
                children: [
                  i.jsxs("div", {
                    className: "row",
                    children: [
                      i.jsx("input", { type: "text", className: "note-title", value: draft.title, onChange: (e) => change({ title: e.target.value }), placeholder: "Title" }),
                      i.jsx("span", { className: `small save-${saved}`, children: { saved: "Saved", saving: "Saving…", unsaved: "…", error: "Not saved" }[saved] }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "row small",
                    children: [
                      i.jsx(de, { value: edit ? "edit" : "view", onChange: (v) => setEdit(v === "edit"), options: [["view", "Read"], ["edit", "Edit"]] }),
                      i.jsx("button", { className: `btn sm ${draft.pinned ? "on" : "ghost"}`, onClick: () => change({ pinned: !draft.pinned }, !0), children: draft.pinned ? "📌 Pinned" : "📌 Pin" }),
                      i.jsxs("label", { className: "check", children: ["Show on day ", i.jsx("input", { type: "date", value: draft.day || "", onChange: (e) => change({ day: e.target.value }, !0) })] }),
                      i.jsx("span", { className: "spacer" }),
                      i.jsx("button", { className: "btn sm ghost", onClick: () => change({ archived: !cur.archived }, !0), children: cur.archived ? "Unarchive" : "Archive" }),
                      i.jsx("button", { className: "btn sm ghost danger", onClick: del, children: "Delete" }),
                    ],
                  }),
                  edit
                    ? i.jsx("textarea", { className: "note-text", autoFocus: !0, value: draft.body, onChange: (e) => change({ body: e.target.value }), onBlur: flush, placeholder: "Write in plain text or Markdown.\n# Heading, **bold**, - list, - [ ] to-do, #tag" })
                    : i.jsx("div", { className: "note-view", onDoubleClick: () => setEdit(!0), children: draft.body.trim() ? i.jsx(NoteBody, { body: draft.body, onToggle: toggleLine }) : i.jsx("p", { className: "muted", children: "Empty note. Double-click or press Edit to write." }) }),
                  i.jsxs("div", { className: "small muted", children: ["Created ", new Date(cur.created_at).toLocaleString("en-GB"), cur.source && cur.source !== "app" ? ` · from ${cur.source}` : ""] }),
                ],
              })
            : i.jsxs("div", { className: "card empty", children: [i.jsx("h2", { children: "📝" }), i.jsx("p", { children: "Pick a note, or start a new one." })] }),
        ],
      }),
    ],
  });
}
function TodayNotes({ notes }) {
  const go = ys();
  if (!notes || !notes.length) return null;
  return i.jsxs("div", {
    className: "today-notes",
    children: [
      i.jsx("div", { className: "small muted", style: { marginBottom: 4 }, children: "Notes for today" }),
      notes.map((n) => i.jsxs("button", { className: "today-note", onClick: () => go(`/notes?id=${n.id}`), children: ["📝 ", n.title, n.todo + n.done > 0 && i.jsxs("span", { className: "small muted", children: [" · ☑ ", n.done, "/", n.todo + n.done] })] }, n.id)),
    ],
  });
}

/* ---------- batch ---------- */
const BATCH_OPTS = {
  image: { format: "jpg", width: "", height: "", quality: 85, grayscale: !1 },
  audio_convert: { format: "mp3", bitrate: "192k" },
  video_convert: { format: "mp4" },
  video_compress: { quality: "medium", max_height: "" },
  video_audio: { format: "mp3" },
  doc_convert: { format: "pdf" },
  ocr: { format: "md", quality: "fast" },
  rename: { pattern: "{name}", find: "", replace: "", start: 1 },
  zip: { name: "" },
};
function BatchPage() {
  const toast = Be(),
    [sel, setSel] = m.useState([]),
    [acts, setActs] = m.useState([]),
    [act, setAct] = m.useState("image"),
    [o, setO] = m.useState(BATCH_OPTS.image),
    [names, setNames] = m.useState([]),
    j = useJob();
  m.useEffect(() => {
    R("/batch/actions").then((d) => setActs(d.actions)).catch(() => {});
  }, []);
  const choose = (a) => (setAct(a), setO(BATCH_OPTS[a] || {}), j.reset());
  const set = (k) => (v) => setO((x) => ({ ...x, [k]: v }));
  m.useEffect(() => {
    if (act !== "rename" || !sel.length) return setNames([]);
    const t = setTimeout(() => R("/batch/rename-preview", { body: { file_ids: sel.map((f) => f.id), action: "rename", options: { ...o, start: Number(o.start) || 1 } } }).then((d) => setNames(d.names)).catch(() => {}), 250);
    return () => clearTimeout(t);
  }, [act, o, sel]);
  const A = acts.find((a) => a.id === act),
    fits = A && A.kinds ? sel.filter((f) => A.kinds.includes(f.kind)).length : sel.length;
  const run = () => {
    const opts = { ...o };
    ["width", "height", "max_height"].forEach((k) => (opts[k] = opts[k] ? Number(opts[k]) : null));
    if (act === "rename") opts.start = Number(opts.start) || 1;
    j.start(R("/batch", { body: { file_ids: sel.map((f) => f.id), action: act, options: opts } }));
  };
  const zipResults = () => {
    const ids = ((j.job && j.job.result && j.job.result.files) || []).map((f) => f.id);
    j.start(R("/batch", { body: { file_ids: ids, action: "zip", options: {} } }));
  };
  const fmtPills = (opts) => i.jsx(F, { label: "Format", children: i.jsx(de, { value: o.format, onChange: set("format"), options: opts }) });
  const panel = {
    image: () => [
      fmtPills(["jpg", "png", "webp", "avif", "pdf"]),
      i.jsxs("div", { className: "row", children: [i.jsx(F, { label: "Max width (px)", children: i.jsx(Se, { value: o.width, onChange: set("width"), step: 50 }) }), i.jsx(F, { label: "Max height (px)", children: i.jsx(Se, { value: o.height, onChange: set("height"), step: 50 }) }), i.jsx(F, { label: `Quality ${o.quality}`, children: i.jsx("input", { type: "range", min: 30, max: 100, value: o.quality, onChange: (e) => set("quality")(Number(e.target.value)) }) }), i.jsxs("label", { className: "check", style: { alignSelf: "flex-end" }, children: [i.jsx("input", { type: "checkbox", checked: o.grayscale, onChange: (e) => set("grayscale")(e.target.checked) }), "Black & white"] })] }),
      i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Leave sizes empty to keep them. Proportions are always kept. Location data is removed." }),
    ],
    audio_convert: () => [fmtPills(["mp3", "m4a", "wav", "flac", "ogg", "opus"]), i.jsx(F, { label: "Quality", children: i.jsx(de, { value: o.bitrate, onChange: set("bitrate"), options: [["128k", "128k"], ["192k", "192k"], ["256k", "256k"], ["320k", "320k"]] }) })],
    audio_normalize: () => [i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Makes every song roughly the same loudness, so a playlist doesn't jump between quiet and loud." })],
    video_convert: () => [fmtPills(["mp4", "mkv", "mov", "webm"])],
    video_compress: () => [i.jsx(F, { label: "Size", children: i.jsx(de, { value: o.quality, onChange: set("quality"), options: [["high", "High quality"], ["medium", "Balanced"], ["small", "Small"], ["tiny", "Tiny"]] }) }), i.jsx(F, { label: "Max height (optional)", children: i.jsx(de, { value: o.max_height, onChange: set("max_height"), options: [["", "Keep"], [1080, "1080p"], [720, "720p"], [480, "480p"]] }) })],
    video_audio: () => [fmtPills(["mp3", "m4a", "wav"])],
    pdf_compress: () => [i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Shrinks PDFs without changing how they look." })],
    doc_convert: () => [fmtPills(["pdf", "docx", "txt", "md", "xlsx", "csv", "json"]), i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Tables → xlsx/csv/json; documents → pdf/docx/txt/md." })],
    ocr: () => [fmtPills([["md", "Markdown"], ["docx", "Word"], ["txt", "Text"]]), i.jsx(F, { label: "Accuracy", children: i.jsx(de, { value: o.quality, onChange: set("quality"), options: [["fast", "Fast (cheap)"], ["best", "Best"]] }) })],
    rename: () => [
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx(F, { label: "New name", style: { flex: 1 }, children: i.jsx("input", { type: "text", value: o.pattern, onChange: (e) => set("pattern")(e.target.value) }) }),
          i.jsx(F, { label: "Start at", children: i.jsx(Se, { value: o.start, onChange: set("start"), min: 0 }) }),
          i.jsx(F, { label: "Find", children: i.jsx("input", { type: "text", value: o.find, onChange: (e) => set("find")(e.target.value) }) }),
          i.jsx(F, { label: "Replace with", children: i.jsx("input", { type: "text", value: o.replace, onChange: (e) => set("replace")(e.target.value) }) }),
        ],
      }),
      i.jsxs("div", { className: "pills", children: [["{name}", "old name"], ["{n}", "number"], ["{date}", "today"], ["{lower}", "lowercase"]].map(([t, l]) => i.jsxs("button", { className: "pill", onClick: () => set("pattern")((o.pattern || "") + (o.pattern ? " " : "") + t), children: ["+ ", l] }, t)) }),
      names.length > 0 && i.jsx("div", { className: "rename-prev", children: names.slice(0, 12).map((n, k) => i.jsxs("div", { className: "small", children: [i.jsx("span", { className: "muted", children: n.from }), " → ", i.jsx("b", { children: n.to })] }, k)) }),
    ],
    zip: () => [i.jsx(F, { label: "ZIP name (optional)", children: i.jsx("input", { type: "text", value: o.name, onChange: (e) => set("name")(e.target.value) }) })],
  };
  const res = j.job && j.job.result;
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", { className: "page-header", children: [i.jsx("h2", { children: "Batch" }), i.jsx("p", { children: "Do one thing to many files at once: pick the files, pick the action, press Run." })] }),
      i.jsxs("div", { className: "card", children: [i.jsx("h3", { children: "1 · Files" }), i.jsx(ke, { multiple: !0, value: sel, onChange: setSel })] }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx("h3", { children: "2 · Action" }),
          i.jsx("div", { className: "batch-acts", children: acts.map((a) => i.jsx("button", { className: `pill ${a.id === act ? "active" : ""}`, onClick: () => choose(a.id), children: a.label }, a.id)) }),
          ...(panel[act] ? panel[act]() : []),
          i.jsxs("div", {
            className: "row end",
            children: [
              sel.length > 0 && A && A.kinds && fits < sel.length && i.jsxs("span", { className: "small muted", children: [sel.length - fits, " file(s) don't fit this action and will be skipped"] }),
              i.jsxs("button", { className: "btn primary", disabled: j.busy || !fits, onClick: run, children: ["Run on ", fits, " file", fits === 1 ? "" : "s"] }),
            ],
          }),
        ],
      }),
      i.jsx(JobStatus, { j }),
      res && res.files && res.files.length > 1 && act !== "zip" && i.jsx("div", { className: "row end", style: { marginBottom: 10 }, children: i.jsx("button", { className: "btn", onClick: zipResults, disabled: j.busy, children: "Put the results in one ZIP" }) }),
      res && i.jsx(rt, { files: res.files }),
    ],
  });
}

/* ---------- OCR ---------- */
function OcrPage() {
  const toast = Be(),
    [sel, setSel] = m.useState([]),
    [fmt, setFmt] = m.useState("md"),
    [q, setQ] = m.useState("fast"),
    [force, setForce] = m.useState(!1),
    [combine, setCombine] = m.useState(!1),
    j = useJob();
  const run = () => j.start(R("/ocr", { body: { file_ids: sel.map((f) => f.id), format: fmt, quality: q, force, combine } }));
  const res = j.job && j.job.result;
  const toNote = (t) => R("/notes", { body: { title: `Text from ${t.name}`, body: t.text, tags: ["ocr"], source: "ocr" } }).then((n) => toast(`Saved as note "${n.title}"`)).catch((x) => toast(x.message, "error"));
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", { className: "page-header", children: [i.jsx("h2", { children: "Read text (OCR)" }), i.jsx("p", { children: "Get the text out of photos, screenshots, scanned PDFs, receipts and handwriting. Tables stay tables. PDFs that already contain text are read for free." })] }),
      i.jsx("div", { className: "card", children: i.jsx(ke, { multiple: !0, value: sel, onChange: setSel, kind: K_IMGPDF, accept: "image/*,.pdf,.heic,.heif,.tif,.tiff" }) }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, { label: "Save as", children: i.jsx(de, { value: fmt, onChange: setFmt, options: [["md", "Markdown"], ["docx", "Word"], ["txt", "Text"], ["none", "Just show it"]] }) }),
              i.jsx(F, { label: "Accuracy", children: i.jsx(de, { value: q, onChange: setQ, options: [["fast", "Fast · ~0.2¢/page"], ["best", "Best · ~1¢/page"]] }) }),
            ],
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: combine, onChange: (e) => setCombine(e.target.checked) }), "One file for everything"] }),
              i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: force, onChange: (e) => setForce(e.target.checked) }), "Read PDF pages as pictures even if they have text"] }),
              i.jsx("span", { className: "spacer" }),
              i.jsx("button", { className: "btn primary", disabled: j.busy || !sel.length, onClick: run, children: "Read text" }),
            ],
          }),
          i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Uses your Claude key (pictures are sent to Claude to read). Ask the Assistant to translate or summarise the result." }),
        ],
      }),
      i.jsx(JobStatus, { j }),
      res &&
        res.texts.map((t, k) =>
          i.jsxs(
            "div",
            {
              className: "card",
              children: [
                i.jsxs("div", { className: "card-title", children: [i.jsx("h3", { children: t.name }), i.jsxs("div", { className: "row", children: [i.jsx("button", { className: "btn sm", onClick: () => copyText(t.text, toast), children: "Copy" }), i.jsx("button", { className: "btn sm", onClick: () => toNote(t), children: "Save as note" })] })] }),
                t.text ? i.jsx("div", { className: "ocr-text", children: i.jsx(Ss, { text: t.text.replace(/<!-- (page \d+.*?) -->/g, "\n*— $1 —*\n") }) }) : i.jsx("p", { className: "muted", children: "No text found." }),
              ],
            },
            k,
          ),
        ),
      res && i.jsx(rt, { files: res.files }),
    ],
  });
}

/* ---------- subtitles (Video tab) ---------- */
const SUB_LANGS = [["", "Detect"], ["en", "English"], ["sq", "Albanian"], ["it", "Italian"], ["de", "German"], ["fr", "French"], ["es", "Spanish"], ["el", "Greek"], ["tr", "Turkish"]];
function SubtitlesTab() {
  const [sel, setSel] = m.useState([]),
    [lang, setLang] = m.useState(""),
    [to, setTo] = m.useState(""),
    [out, setOut] = m.useState("burn"),
    [model, setModel] = m.useState(""),
    [size, setSize] = m.useState(22),
    j = useJob();
  const f = sel[0],
    res = j.job && j.job.result;
  const run = () => j.start(R("/subtitles", { body: { file_id: f.id, language: lang || null, translate_to: to || null, output: out, model: model || null, font_size: size } }));
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx("div", { className: "card", children: i.jsx(ke, { value: sel, onChange: setSel, kind: K_AV, accept: "video/*,audio/*", label: "Video (or audio) to subtitle" }) }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, { label: "Spoken language", children: i.jsx("select", { value: lang, onChange: (e) => setLang(e.target.value), children: SUB_LANGS.map(([v, l]) => i.jsx("option", { value: v, children: l }, v)) }) }),
              i.jsx(F, { label: "Translate subtitles to", children: i.jsx("select", { value: to, onChange: (e) => setTo(e.target.value), children: [["", "No translation"], ...SUB_LANGS.slice(1)].map(([v, l]) => i.jsx("option", { value: v, children: l }, v)) }) }),
              i.jsx(F, { label: "Speech model", children: i.jsx("select", { value: model, onChange: (e) => setModel(e.target.value), children: [["", "Default (Settings)"], ["base", "Base · fastest"], ["small", "Small · good"], ["medium", "Medium · best, slow"]].map(([v, l]) => i.jsx("option", { value: v, children: l }, v)) }) }),
            ],
          }),
          i.jsx(F, { label: "Output", children: i.jsx(de, { value: out, onChange: setOut, options: [["burn", "Burn into the video (always visible)"], ["embed", "Subtitle track (can turn on/off)"], ["srt", "Only the .srt file"]] }) }),
          out === "burn" && i.jsx(F, { label: `Text size ${size}`, children: i.jsx("input", { type: "range", min: 14, max: 40, value: size, onChange: (e) => setSize(Number(e.target.value)) }) }),
          i.jsxs("div", { className: "row end", children: [i.jsx("span", { className: "small muted", children: "Runs offline on your PC, roughly as long as the video. Translation uses Claude." }), i.jsx("button", { className: "btn primary", disabled: j.busy || !f, onClick: run, children: "Make subtitles" })] }),
        ],
      }),
      i.jsx(JobStatus, { j }),
      res && res.preview && i.jsxs("div", { className: "card", children: [i.jsxs("h3", { children: ["Preview · ", res.lines, " lines"] }), i.jsx("div", { className: "code", children: res.preview })] }),
      res && i.jsx(rt, { files: res.files }),
    ],
  });
}

/* ---------- week review ---------- */
function Delta({ now, prev, unit = "", better = "up" }) {
  if (prev == null || now == null || now === prev) return null;
  const d = now - prev,
    good = better === "up" ? d > 0 : d < 0;
  return i.jsxs("span", { className: `delta ${good ? "good" : "bad"}`, children: [d > 0 ? "▲" : "▼", " ", Math.abs(d), unit] });
}
function ReviewPage() {
  const toast = Be(),
    go = ys(),
    [start, setStart] = m.useState(() => hashQ().get("start") || iso(new Date())),
    [d, setD] = m.useState(null),
    [feel, setFeel] = m.useState(""),
    [busy, setBusy] = m.useState(!1);
  const load = () => R(`/review?start=${start}`).then(setD).catch((x) => toast(x.message, "error"));
  m.useEffect(() => {
    load();
  }, [start]);
  if (!d) return i.jsx("div", { className: "page", children: i.jsx(ye, {}) });
  const w = d.week,
    p = d.prev,
    shift = (n) => {
      const x = fromIso(w.start);
      x.setDate(x.getDate() + n * 7), setStart(iso(x));
    },
    maxDay = Math.max(1, ...w.days.map((x) => x.planned)),
    reflect = async () => {
      setBusy(!0);
      try {
        await R("/review/reflect", { body: { start: w.start, feeling: feel } });
        load();
      } catch (x) {
        toast(x.message, "error");
      } finally {
        setBusy(!1);
      }
    },
    moveToday = async (e) => {
      await R(`/calendar/events/${e.id}/move`, { body: { from_date: e.date, to_date: iso(new Date()) } }).then(() => toast(`Moved "${e.title}" to today`)).catch((x) => toast(x.message, "error"));
      load();
    },
    range = `${fromIso(w.start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${fromIso(w.end).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  const tiles = [
    ["✅", "Done", w.rate == null ? "—" : `${w.rate}%`, `${w.done} of ${w.planned} blocks`, i.jsx(Delta, { now: w.rate, prev: p.rate, unit: "%" })],
    ["🎯", "Focus", fmtMin(w.focus_minutes), "focus blocks done", i.jsx(Delta, { now: Math.round(w.focus_minutes / 6) / 10, prev: Math.round(p.focus_minutes / 6) / 10, unit: " h" })],
    ["📚", "Study", fmtMin(w.study_minutes), "study blocks done", i.jsx(Delta, { now: Math.round(w.study_minutes / 6) / 10, prev: Math.round(p.study_minutes / 6) / 10, unit: " h" })],
    ["💪", "Workouts", w.workouts.sessions, `${w.workouts.sets} sets · ${w.workouts.volume_kg} kg lifted`, i.jsx(Delta, { now: w.workouts.sessions, prev: p.workouts.sessions })],
    ["🔥", "Streak", `${d.streak} day${d.streak === 1 ? "" : "s"}`, "in a row with something done", null],
    ["📝", "Notes · files", `${w.notes} · ${w.files_made}`, "notes written · files made", null],
  ];
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", { style: { flex: 1 }, children: [i.jsx("h2", { children: "Week review" }), i.jsx("p", { children: "How the week actually went, compared with the week before." })] }),
          i.jsx("button", { className: "btn sm", onClick: () => shift(-1), children: "‹ Previous" }),
          i.jsx("b", { style: { minWidth: 120, textAlign: "center" }, children: range }),
          i.jsx("button", { className: "btn sm", onClick: () => shift(1), disabled: d.is_current, children: "Next ›" }),
          !d.is_current && i.jsx("button", { className: "btn sm ghost", onClick: () => setStart(iso(new Date())), children: "This week" }),
        ],
      }),
      i.jsx("div", { className: "rv-tiles", children: tiles.map(([ic, l, v, sub, dl]) => i.jsxs("div", { className: "rv-tile", children: [i.jsxs("div", { className: "small muted", children: [ic, " ", l] }), i.jsxs("div", { className: "rv-big", children: [v, " ", dl] }), i.jsx("div", { className: "small muted", children: sub })] }, l)) }),
      i.jsxs("div", {
        className: "grid2",
        children: [
          i.jsxs("div", {
            className: "card",
            children: [
              i.jsx("h3", { children: "Day by day" }),
              i.jsx("div", {
                className: "rv-days",
                children: w.days.map((x) =>
                  i.jsxs(
                    "div",
                    {
                      className: `rv-day ${x.date === iso(new Date()) ? "is-today" : ""}`,
                      title: `${x.done}/${x.planned} done${x.minutes ? ` · ${fmtMin(x.minutes)}` : ""}`,
                      children: [
                        i.jsxs("div", { className: "rv-bar", children: [i.jsx("i", { className: "pl", style: { height: `${(100 * x.planned) / maxDay}%` } }), i.jsx("i", { className: "dn", style: { height: `${(100 * x.done) / maxDay}%` } })] }),
                        i.jsx("span", { className: "small", children: x.day }),
                        i.jsx("span", { className: "small muted", children: x.planned ? `${x.done}/${x.planned}` : "–" }),
                      ],
                    },
                    x.date,
                  ),
                ),
              }),
              i.jsxs("div", { className: "small muted", children: [i.jsx("span", { className: "lg pl" }), " planned  ", i.jsx("span", { className: "lg dn" }), " done"] }),
            ],
          }),
          i.jsxs("div", {
            className: "card",
            children: [
              i.jsx("h3", { children: "By kind" }),
              Object.keys(w.kinds).length === 0 && i.jsx("p", { className: "muted small", children: "Nothing was planned this week." }),
              Object.entries(w.kinds).map(([k, v]) =>
                i.jsxs(
                  "div",
                  {
                    className: "rv-kind",
                    children: [
                      i.jsx("span", { style: { width: 80 }, children: KIND_LABEL[k] || k }),
                      i.jsx("div", { className: "bar", children: i.jsx("i", { className: `k-${k}`, style: { width: `${(100 * v.done) / v.planned}%` } }) }),
                      i.jsxs("span", { className: "small tnum", style: { width: 110, textAlign: "right" }, children: [v.done, "/", v.planned, v.minutes ? ` · ${fmtMin(v.minutes)}` : ""] }),
                    ],
                  },
                  k,
                ),
              ),
              w.workouts.best.length > 0 && i.jsxs("div", { style: { marginTop: 12 }, children: [i.jsx("div", { className: "small muted", children: "Heaviest sets" }), w.workouts.best.slice(0, 5).map((b) => i.jsxs("div", { className: "small", children: [b.exercise, ": ", i.jsxs("b", { children: [b.w, " kg"] }), " × ", b.r] }, b.exercise))] }),
            ],
          }),
        ],
      }),
      w.missed.length > 0 &&
        i.jsxs("div", {
          className: "card",
          children: [
            i.jsxs("h3", { children: ["Didn't happen (", w.missed.length, ")"] }),
            w.missed.slice(0, 12).map((e, k) => i.jsxs("div", { className: "row", style: { gap: 6, marginBottom: 4 }, children: [i.jsx("span", { className: "small muted", style: { width: 82 }, children: fromIso(e.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }) }), i.jsx("span", { style: { flex: 1 }, children: e.title }), i.jsx("span", { className: "small muted", children: KIND_LABEL[e.kind] }), d.is_current && i.jsx("button", { className: "btn sm", onClick: () => moveToday(e), children: "Move to today" })] }, k)),
          ],
        }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsxs("div", { className: "card-title", children: [i.jsx("h3", { children: "✨ Reflection" }), i.jsx("button", { className: "btn sm", onClick: () => go("/calendar?tab=plan"), children: "Plan next week →" })] }),
          d.reflection && i.jsx("div", { className: "rv-reflect", children: i.jsx(Ss, { text: d.reflection.body.replace(/\n#weekly-review\s*$/, "") }) }),
          i.jsx("textarea", { style: { minHeight: 60 }, placeholder: "How did the week feel? (optional, e.g. tired after exams, gym felt great)", value: feel, onChange: (e) => setFeel(e.target.value) }),
          i.jsxs("div", { className: "row end", children: [i.jsx("span", { className: "small muted", children: "Saved to Notes with #weekly-review." }), i.jsx("button", { className: "btn primary", disabled: busy, onClick: reflect, children: busy ? "Thinking…" : d.reflection ? "Write it again" : "Write my review" })] }),
        ],
      }),
    ],
  });
}

/* ---------------- v2.8: update/restart banner, collapsible sidebar ---------------- */
const UI_VERSION = "3.3.1";
async function restartApp(toast) {
  const veil = document.createElement("div");
  veil.className = "restart-veil";
  veil.innerHTML = "<div><b>Restarting Toolbit…</b><span>This takes a few seconds.</span></div>";
  document.body.appendChild(veil);
  try {
    await R("/restart", { body: {} });
  } catch (x) {
    veil.remove();
    return toast && toast("Couldn't restart from here: use Quit, then open the app again.", "error");
  }
  const t0 = Date.now();
  await new Promise((r) => setTimeout(r, 1500));
  while (Date.now() - t0 < 45000) {
    try {
      const h = await fetch("/api/health", { cache: "no-store" }).then((r) => r.json());
      if (h.ok) return window.location.reload();
    } catch {}
    await new Promise((r) => setTimeout(r, 600));
  }
  veil.innerHTML = "<div><b>It's taking long.</b><span>Open Toolbit again from the desktop.</span></div>";
}
const vNewer = (a, b) => {
  const x = a.split(".").map(Number), y = (b || "0").split(".").map(Number);
  for (let k = 0; k < 3; k++) if ((x[k] || 0) !== (y[k] || 0)) return (x[k] || 0) > (y[k] || 0);
  return !1;
};
function UpdateBanner() {
  const toast = Be(),
    [h, setH] = m.useState(null);
  m.useEffect(() => {
    const check = () => fetch("/api/health", { cache: "no-store" }).then((r) => r.json()).then(setH).catch(() => {});
    check();
    const iv = setInterval(check, 60000);
    window.addEventListener("focus", check);
    return () => (clearInterval(iv), window.removeEventListener("focus", check));
  }, []);
  if (!h || TB_REMOTE) return null;
  const newer = h.disk_version && h.disk_version !== h.version ? h.disk_version : vNewer(UI_VERSION, h.version) ? UI_VERSION : null;
  if (!newer) return h.peer_update && !TB_REMOTE ? i.jsx(PeerUpdate, { u: h.peer_update }) : null;
  return i.jsxs("div", {
    className: "update-banner",
    children: [
      i.jsxs("span", { children: ["✨ Version ", i.jsx("b", { children: newer }), " is installed. Restart the app to start using it (takes a few seconds)."] }),
      i.jsx("button", { className: "btn sm primary", onClick: () => restartApp(toast), children: "Restart now" }),
    ],
  });
}
function NavSections({ sections }) {
  const [, bump] = m.useReducer((x) => x + 1, 0);
  m.useEffect(() => (window.addEventListener("hashchange", bump), () => window.removeEventListener("hashchange", bump)), []);
  const loc = window.location.hash.replace(/^#/, "").split("?")[0] || "/",
    [closed, setClosed] = m.useState(() => {
      try {
        return JSON.parse(localStorage.getItem("da-nav-closed")) || {};
      } catch {
        return {};
      }
    });
  const toggle = (t) =>
    setClosed((c) => {
      const n = { ...c, [t]: !c[t] };
      try {
        localStorage.setItem("da-nav-closed", JSON.stringify(n));
      } catch {}
      return n;
    });
  return sections.map(([t, items]) => {
    const here = items.some(([to]) => to === loc || (to !== "/" && loc.startsWith(to))),
      shut = closed[t] && !here;
    return i.jsxs(
      "div",
      {
        children: [
          i.jsxs("button", { className: "nav-label nav-toggle", onClick: () => toggle(t), title: shut ? "Show" : "Hide", children: [t, i.jsx("span", { children: shut ? "▸" : "▾" })] }),
          !shut &&
            items.map(([to, label, Ic]) =>
              i.jsxs(sg, { to, end: to === "/", className: ({ isActive: a }) => `nav-item ${a ? "active" : ""}`, children: [i.jsx(Ic, {}), label] }, to),
            ),
        ],
      },
      t,
    );
  });
}

function WebSearchSettings() {
  const toast = Be(),
    [s, setS] = m.useState(null),
    [city, setCity] = m.useState("");
  m.useEffect(() => {
    R("/settings").then((d) => (setS(d), setCity((d.location && d.location.city) || ""))).catch(() => {});
  }, []);
  if (!s) return null;
  const save = (body, msg) => R("/settings", { body }).then((d) => (setS(d), msg && toast(msg))).catch((x) => toast(x.message, "error"));
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsx("h3", { children: "🌐 Web search & app" }),
      i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.web_search, onChange: (e) => save({ web_search: e.target.checked }) }), "Let the Assistant search the web for current info (about $0.01 per search). You can also switch it per chat with 🌐."] }),
      i.jsxs("div", { className: "row", children: [i.jsx(F, { label: "Your city (for local results like opening hours)", style: { flex: 1 }, children: i.jsx("input", { type: "text", value: city, onChange: (e) => setCity(e.target.value), placeholder: "e.g. London" }) }), i.jsx("button", { className: "btn", style: { alignSelf: "flex-end" }, onClick: () => save({ location: { ...(s.location || {}), city: city.trim() } }, "Saved"), children: "Save" })] }),
      i.jsxs("div", { className: "row", children: [i.jsxs("span", { className: "small muted", style: { flex: 1 }, children: ["Running version ", s.version, ". If something looks stuck, a restart usually fixes it."] }), i.jsx("button", { className: "btn", onClick: () => restartApp(toast), children: "↻ Restart app" })] }),
    ],
  });
}
function AppSettings() {
  const toast = Be(),
    [s, setS] = m.useState(null);
  m.useEffect(() => {
    R("/reminders/settings").then(setS).catch(() => {});
  }, []);
  const save = (body) => R("/reminders/settings", { body }).then(setS).catch((x) => toast(x.message, "error"));
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsx("h3", { children: "App" }),
      s && i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.hotkey, onChange: (x) => save({ hotkey: x.target.checked }) }), "Open Toolbit from anywhere with Ctrl+Alt+T"] }),
      s && i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.start_with_windows, onChange: (x) => save({ start_with_windows: x.target.checked }) }), "Start quietly with Windows (opens instantly, backs up your USB automatically)"] }),
      s && i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: s.background, onChange: (x) => save({ background: x.target.checked }) }), "Keep running after I close the window (needed for automatic backups)"] }),
      i.jsxs("div", { className: "row", children: [i.jsx("span", { className: "small muted", style: { flex: 1 }, children: "If something looks stuck, a restart usually fixes it." }), i.jsx("button", { className: "btn", onClick: () => restartApp(toast), children: "↻ Restart app" })] }),
    ],
  });
}
/* ---------------- v3.1: Email, News & Weather ---------------- */
const IcMail = mkIcon(["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M22 6l-10 7L2 6"]);
const IcNews = mkIcon(["M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2", "M18 14h-8", "M15 18h-5", "M10 6h8v4h-8z"]);
const ago = (iso) => {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};
const mailDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso),
    n = new Date();
  return d.toDateString() === n.toDateString() ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: d.getFullYear() === n.getFullYear() ? void 0 : "2-digit" });
};

/* ---------- Email ---------- */
function MailSetup({ onDone, onCancel, another }) {
  const toast = Be(),
    [addr, setAddr] = m.useState(""),
    [pw, setPw] = m.useState(""),
    [busy, setBusy] = m.useState(!1);
  const save = async () => {
    setBusy(!0);
    try {
      await R("/mail/settings", { body: { address: addr, app_password: pw } });
      toast("Gmail connected"), onDone();
    } catch (x) {
      toast(x.message, "error");
    }
    setBusy(!1);
  };
  return i.jsxs("div", {
    className: "card stack mail-setup",
    children: [
      i.jsx("h3", { children: another ? "Add another Gmail account" : "Connect your Gmail" }),
      i.jsxs("ol", {
        className: "small",
        children: [
          i.jsxs("li", { children: ["Turn on ", i.jsx("b", { children: "2-Step Verification" }), " for your Google account (myaccount.google.com › Security), if it isn't on yet."] }),
          i.jsxs("li", { children: ["Open ", i.jsx("b", { children: "myaccount.google.com/apppasswords" }), ", type a name like ", i.jsx("i", { children: "Toolbit" }), " and press Create."] }),
          i.jsx("li", { children: "Copy the 16-letter password Google shows and paste it below. It's stored only in Toolbit (and your paired laptop, over Tailscale) and never goes into backups." }),
        ],
      }),
      i.jsxs("div", {
        className: "row",
        children: [
          i.jsx(F, { label: "Gmail address", style: { flex: 1 }, children: i.jsx("input", { type: "text", value: addr, onChange: (e) => setAddr(e.target.value), placeholder: "you@gmail.com" }) }),
          i.jsx(F, { label: "App password", style: { flex: 1 }, children: i.jsx("input", { type: "password", value: pw, onChange: (e) => setPw(e.target.value), placeholder: "abcd efgh ijkl mnop", onKeyDown: (e) => e.key === "Enter" && save() }) }),
        ],
      }),
      i.jsxs("div", { className: "row end", children: [onCancel && i.jsx("button", { className: "btn ghost", onClick: onCancel, children: "Cancel" }), i.jsx("button", { className: "btn primary", disabled: busy || !addr || !pw, onClick: save, children: busy ? "Checking…" : "Connect" })] }),
    ],
  });
}
function Compose({ init, onClose }) {
  const toast = Be(),
    [to, setTo] = m.useState(init.to || ""),
    [subject, setSubject] = m.useState(init.subject || ""),
    [body, setBody] = m.useState(init.body || ""),
    [att, setAtt] = m.useState([]),
    [busy, setBusy] = m.useState(!1);
  const send = async () => {
    setBusy(!0);
    try {
      await R("/mail/send", { body: { to, subject, body, file_ids: att.map((f) => f.id), in_reply_to: init.in_reply_to || "" } });
      toast("Sent"), onClose(!0);
    } catch (x) {
      toast(x.message, "error");
    }
    setBusy(!1);
  };
  return i.jsx("div", {
    className: "qj-back",
    onMouseDown: (e) => e.target === e.currentTarget && onClose(),
    children: i.jsxs("div", {
      className: "compose",
      children: [
        i.jsxs("div", { className: "row", children: [i.jsx("b", { children: init.in_reply_to ? "Reply" : "New email" }), i.jsx("span", { className: "spacer" }), i.jsx("button", { className: "btn sm ghost", onClick: () => onClose(), children: "✕" })] }),
        i.jsx("input", { type: "text", placeholder: "To", value: to, onChange: (e) => setTo(e.target.value), autoFocus: !init.to }),
        i.jsx("input", { type: "text", placeholder: "Subject", value: subject, onChange: (e) => setSubject(e.target.value) }),
        i.jsx("textarea", { value: body, onChange: (e) => setBody(e.target.value), placeholder: "Write your message…", autoFocus: !!init.to }),
        i.jsx(ke, { multiple: !0, value: att, onChange: setAtt, label: "Attach files (drop here or pick from My Files)" }),
        i.jsxs("div", { className: "row end", children: [i.jsx("span", { className: "small muted", children: init.from ? `From ${init.from}` : "Sent from your Gmail" }), i.jsx("button", { className: "btn primary", disabled: busy || !to.trim(), onClick: send, children: busy ? "Sending…" : "Send" })] }),
      ],
    }),
  });
}
const MAIL_FOLDERS = [["inbox", "Inbox"], ["starred", "Starred"], ["sent", "Sent"], ["all", "All mail"]];
function MailPage() {
  const toast = Be(),
    [st, setSt] = m.useState(null),
    [folder, setFolder] = m.useState("inbox"),
    [q, setQ] = m.useState(""),
    [query, setQuery] = m.useState(""),
    [page, setPage] = m.useState(0),
    [list, setList] = m.useState(null),
    [loading, setLoading] = m.useState(!1),
    [cur, setCur] = m.useState(null),
    [msg, setMsg] = m.useState(null),
    [compose, setCompose] = m.useState(null),
    [adding, setAdding] = m.useState(!1),
    [saving, setSaving] = m.useState(!1);
  const switchTo = async (address) => {
    try {
      setCur(null), setMsg(null), setList(null), setPage(0);
      setSt(await R("/mail/active", { body: { address } }));
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const loadStatus = () => R("/mail/status").then(setSt).catch(() => setSt({ configured: !1 }));
  m.useEffect(() => {
    loadStatus();
  }, []);
  const load = m.useCallback(() => {
    if (!st || !st.configured) return;
    setLoading(!0);
    R(`/mail/list?folder=${folder}&q=${encodeURIComponent(query)}&page=${page}`)
      .then(setList)
      .catch((x) => (toast(x.message, "error"), setList({ items: [], total: 0, pages: 0 })))
      .finally(() => setLoading(!1));
  }, [st, folder, query, page]);
  m.useEffect(load, [load]);
  const open = async (it) => {
    setCur(it.uid), setMsg(null);
    try {
      setMsg(await R(`/mail/msg/${it.uid}?folder=${folder}`));
      setList((l) => l && { ...l, items: l.items.map((x) => (x.uid === it.uid ? { ...x, unread: !1 } : x)) });
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const saveAtt = async (indexes) => {
    setSaving(!0);
    try {
      const r = await R(`/mail/msg/${msg.uid}/save`, { body: { folder, indexes } });
      window.dispatchEvent(new Event("files-changed"));
      toast(`Saved ${r.files.length > 1 ? r.files.length + " files" : r.files[0].name} to My Files › ${r.files[0].folder || "My Files"}`);
    } catch (x) {
      toast(x.message, "error");
    }
    setSaving(!1);
  };
  const reply = () =>
    setCompose({
      to: msg.from_addr,
      subject: /^re:/i.test(msg.subject) ? msg.subject : `Re: ${msg.subject}`,
      body: `\n\n— On ${new Date(msg.date).toLocaleString("en-GB")}, ${msg.from} wrote:\n` + (msg.text || "").trim().split("\n").slice(0, 40).map((l) => "> " + l).join("\n"),
      in_reply_to: msg.message_id,
    });
  if (!st) return i.jsx("div", { className: "page", children: i.jsx(ye, {}) });
  if (adding)
    return i.jsxs("div", { className: "page", children: [i.jsx("div", { className: "page-header", children: i.jsx("h2", { children: "Email" }) }), i.jsx(MailSetup, { another: !0, onCancel: () => setAdding(!1), onDone: () => (setAdding(!1), setList(null), setCur(null), setMsg(null), loadStatus()) })] });
  if (!st.configured)
    return i.jsxs("div", { className: "page", children: [i.jsxs("div", { className: "page-header", children: [i.jsx("h2", { children: "Email" }), i.jsx("p", { children: "Your Gmail in the app: read, search, save attachments into My Files and send files." })] }), i.jsx(MailSetup, { onDone: loadStatus })] });
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", {
            style: { flex: 1, minWidth: 0 },
            children: [
              i.jsx("h2", { children: "Email" }),
              (st.accounts || []).length > 1
                ? i.jsx("select", { className: "mail-acct", value: st.address, onChange: (e) => switchTo(e.target.value), children: st.accounts.map((a) => i.jsx("option", { value: a, children: a }, a)) })
                : i.jsx("p", { children: st.address }),
            ],
          }),
          i.jsx("button", { className: "btn ghost", onClick: () => setAdding(!0), title: "Connect another Gmail account", children: "＋ Account" }),
          i.jsx("button", { className: "btn ghost", onClick: () => (setPage(0), load()), disabled: loading, children: loading ? "Loading…" : "↻ Refresh" }),
          i.jsx("button", { className: "btn primary", onClick: () => setCompose({}), children: "✉ New email" }),
        ],
      }),
      i.jsxs("div", {
        className: `mail-layout ${cur ? "has-msg" : ""}`,
        children: [
          i.jsxs("div", {
            className: "mail-side",
            children: [
              i.jsx("input", { type: "text", placeholder: "🔎 Search (Gmail style: from:bank has:attachment)", value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => e.key === "Enter" && (setPage(0), setQuery(q)) }),
              i.jsx("div", { className: "pills", style: { margin: "8px 0" }, children: MAIL_FOLDERS.map(([k, l]) => i.jsx("button", { className: `pill ${folder === k ? "active" : ""}`, onClick: () => (setFolder(k), setPage(0), setCur(null), setMsg(null)), children: l }, k)) }),
              query && i.jsxs("div", { className: "small muted", children: ["Results for “", query, "” · ", i.jsx("a", { href: "#", onClick: (e) => (e.preventDefault(), setQ(""), setQuery("")), children: "clear" })] }),
              !list && i.jsx(ye, {}),
              list && list.items.length === 0 && !loading && i.jsx("p", { className: "muted small", children: "No emails here." }),
              list &&
                list.items.map((it) =>
                  i.jsxs(
                    "div",
                    {
                      className: `list-item mail-item ${cur === it.uid ? "active" : ""} ${it.unread ? "unread" : ""}`,
                      onClick: () => open(it),
                      children: [
                        i.jsxs("div", { className: "row", style: { gap: 6, flexWrap: "nowrap" }, children: [i.jsx("span", { className: "t mail-from", children: folder === "sent" ? `To: ${it.to}` : it.from }), i.jsx("span", { className: "spacer" }), it.attachment && i.jsx("span", { title: "Has attachments", children: "📎" }), i.jsx("span", { className: "m", children: mailDate(it.date) })] }),
                        i.jsx("div", { className: "m mail-subj", children: it.subject }),
                      ],
                    },
                    it.uid,
                  ),
                ),
              list && list.pages > 1 && i.jsxs("div", { className: "row", style: { justifyContent: "center", marginTop: 8 }, children: [i.jsx("button", { className: "btn sm", disabled: page === 0, onClick: () => setPage(page - 1), children: "‹ Newer" }), i.jsxs("span", { className: "small muted", children: [page + 1, " / ", list.pages] }), i.jsx("button", { className: "btn sm", disabled: page + 1 >= list.pages, onClick: () => setPage(page + 1), children: "Older ›" })] }),
            ],
          }),
          i.jsx("div", {
            className: "card mail-view",
            children: !cur
              ? i.jsxs("div", { className: "empty", children: [i.jsx("h2", { children: "✉️" }), i.jsx("p", { children: "Pick an email to read it." })] })
              : !msg
                ? i.jsx(ye, {})
                : i.jsxs(i.Fragment, {
                    children: [
                      i.jsx("button", { className: "btn sm ghost mail-back", onClick: () => (setCur(null), setMsg(null)), children: "‹ Back" }),
                      i.jsx("h3", { className: "mail-title", children: msg.subject }),
                      i.jsxs("div", { className: "small muted", children: [i.jsx("b", { style: { color: "var(--text)" }, children: msg.from }), " · ", new Date(msg.date).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })] }),
                      i.jsxs("div", { className: "small muted", children: ["To ", msg.to, msg.cc ? ` · Cc ${msg.cc}` : ""] }),
                      i.jsxs("div", { className: "row", style: { margin: "10px 0" }, children: [i.jsx("button", { className: "btn sm", onClick: reply, children: "↩ Reply" }), i.jsx("button", { className: "btn sm ghost", onClick: () => setCompose({ subject: `Fwd: ${msg.subject}`, body: `\n\n---------- Forwarded ----------\nFrom: ${msg.from}\nSubject: ${msg.subject}\n\n${msg.text || ""}` }), children: "↪ Forward text" })] }),
                      msg.attachments.length > 0 &&
                        i.jsxs("div", {
                          className: "mail-atts",
                          children: [
                            msg.attachments.map((a) => i.jsxs("div", { className: "mail-att", children: [i.jsx("span", { children: "📎" }), i.jsx("span", { className: "name", title: a.name, children: a.name }), i.jsx("span", { className: "small muted", children: fmtBytes(a.size) }), i.jsx("button", { className: "btn sm", disabled: saving, onClick: () => saveAtt([a.index]), children: "Save to My Files" })] }, a.index)),
                            msg.attachments.length > 1 && i.jsx("button", { className: "btn sm primary", disabled: saving, onClick: () => saveAtt(null), children: `Save all ${msg.attachments.length}` }),
                          ],
                        }),
                      msg.html ? i.jsx("iframe", { className: "mail-html", sandbox: "allow-popups allow-popups-to-escape-sandbox", srcDoc: `<base target="_blank"><style>body{font:14px/1.5 Segoe UI,system-ui,sans-serif;margin:0;padding:4px;color:#17171c;background:#fff;word-wrap:break-word}img{max-width:100%;height:auto}</style>${msg.html}` }) : i.jsx("div", { className: "mail-text", children: msg.text || "(empty)" }),
                    ],
                  }),
          }),
        ],
      }),
      compose && i.jsx(Compose, { init: { ...compose, from: st.address }, onClose: (sent) => (setCompose(null), sent && folder === "sent" && load()) }),
      i.jsx("p", { className: "small muted", style: { marginTop: 14 }, children: i.jsx("a", { href: "#", onClick: (e) => (e.preventDefault(), window.confirm(`Disconnect ${st.address} from Toolbit? (Its app password is removed here.)`) && R("/mail/disconnect", { body: { address: st.address } }).then((s2) => (setCur(null), setMsg(null), setList(null), setSt(s2)))), children: `Disconnect ${st.address}` }) }),
    ],
  });
}

/* ---------- Weather ---------- */
function WeatherCard({ compact }) {
  const toast = Be(),
    go = ys(),
    [w, setW] = m.useState(null),
    [err, setErr] = m.useState(""),
    [edit, setEdit] = m.useState(!1),
    [city, setCity] = m.useState("");
  const load = (refresh) =>
    R(`/weather${refresh ? "?refresh=true" : ""}`)
      .then((d) => (setW(d), setErr("")))
      .catch((x) => setErr(x.message));
  m.useEffect(() => {
    load();
  }, []);
  const saveCity = () =>
    R("/weather/city", { body: { city } })
      .then((d) => (setW(d), setEdit(!1), setErr("")))
      .catch((x) => toast(x.message, "error"));
  if (compact) {
    if (!w) return null;
    const t = w.days[0];
    return i.jsxs("button", { className: "wx-mini", onClick: () => go("/news"), title: "News & Weather", children: [i.jsx("span", { className: "wx-ic", children: w.now.icon }), i.jsxs("b", { children: [w.now.temp, "°"] }), i.jsxs("span", { className: "small muted", children: [w.now.text, " · ", t.max, "° / ", t.min, "°", t.rain >= 40 ? ` · ${t.rain}% rain` : "", " · ", w.place.name] })] });
  }
  return i.jsxs("div", {
    className: "card wx",
    children: [
      err && i.jsxs("p", { className: "err small", children: [err, " "] }),
      !w && !err && i.jsx(ye, { text: "Getting the weather…" }),
      w &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsxs("div", {
              className: "row wx-top",
              children: [
                i.jsx("span", { className: "wx-big-ic", children: w.now.icon }),
                i.jsxs("div", { children: [i.jsxs("div", { className: "wx-temp", children: [w.now.temp, "°"] }), i.jsxs("div", { className: "muted", children: [w.now.text, " · feels ", w.now.feels, "°"] })] }),
                i.jsxs("div", { className: "small muted wx-facts", children: [i.jsxs("div", { children: ["Today ", w.days[0].max, "° / ", w.days[0].min, "°", w.days[0].rain != null ? ` · rain ${w.days[0].rain}%` : ""] }), i.jsxs("div", { children: ["Wind ", w.now.wind, " km/h · humidity ", w.now.humidity, "%"] }), i.jsxs("div", { children: ["🌅 ", w.days[0].sunrise, " · 🌇 ", w.days[0].sunset] })] }),
                i.jsx("span", { className: "spacer" }),
                edit
                  ? i.jsxs("div", { className: "row", children: [i.jsx("input", { type: "text", value: city, autoFocus: !0, placeholder: "City", onChange: (e) => setCity(e.target.value), onKeyDown: (e) => e.key === "Enter" && saveCity(), style: { width: 140 } }), i.jsx("button", { className: "btn sm primary", onClick: saveCity, children: "Save" })] })
                  : i.jsxs("button", { className: "btn sm ghost", onClick: () => (setCity(w.place.name), setEdit(!0)), title: "Change city", children: ["📍 ", w.place.name] }),
              ],
            }),
            i.jsx("div", { className: "wx-hours", children: w.hours.filter((_, k) => k % 2 === 0).slice(0, 12).map((h, k) => i.jsxs("div", { className: "wx-h", children: [i.jsx("span", { className: "small muted", children: k === 0 ? "Now" : h.time }), i.jsx("span", { children: h.icon }), i.jsxs("b", { children: [h.temp, "°"] }), i.jsx("span", { className: "small rain", children: h.rain >= 20 ? `${h.rain}%` : "" })] }, k)) }),
            i.jsx("div", { className: "wx-days", children: w.days.map((d, k) => i.jsxs("div", { className: "wx-d", children: [i.jsx("span", { className: "small", children: k === 0 ? "Today" : fromIso(d.date).toLocaleDateString("en-GB", { weekday: "short" }) }), i.jsx("span", { className: "wx-ic", title: d.text, children: d.icon }), i.jsxs("span", { children: [i.jsxs("b", { children: [d.max, "°"] }), " ", i.jsxs("span", { className: "muted", children: [d.min, "°"] })] }), i.jsx("span", { className: "small rain", children: d.rain >= 30 ? `☔ ${d.rain}%` : "" })] }, d.date)) }),
          ],
        }),
    ],
  });
}

/* ---------- News ---------- */
function NewsPage() {
  const toast = Be(),
    [d, setD] = m.useState(null),
    [tab, setTab] = m.useState("all"),
    [loading, setLoading] = m.useState(!1),
    [editing, setEditing] = m.useState(!1),
    [srcs, setSrcs] = m.useState([]),
    [nu, setNu] = m.useState({ name: "", url: "" });
  const load = (refresh) => {
    setLoading(!0);
    R(`/news${refresh ? "?refresh=true" : ""}`)
      .then((x) => (setD(x), setSrcs(x.feeds.map((f) => ({ name: f.name, url: f.url })))))
      .catch((x) => toast(x.message, "error"))
      .finally(() => setLoading(!1));
  };
  m.useEffect(() => load(), []);
  const saveSrcs = async (list) => {
    try {
      await R("/news/feeds", { body: { feeds: list } });
      setSrcs(list), load(!0);
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const addSrc = async () => {
    try {
      const r = await R("/news/test", { body: nu });
      toast(`Found ${r.count} articles`);
      saveSrcs([...srcs, nu]), setNu({ name: "", url: "" });
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const all = d ? d.feeds.flatMap((f) => f.items) : [],
    items = (tab === "all" ? [...all].sort((a, b) => (b.date || "").localeCompare(a.date || "")) : (d.feeds.find((f) => f.name === tab) || { items: [] }).items).slice(0, 60),
    broken = d ? d.feeds.filter((f) => f.error) : [];
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", { style: { flex: 1 }, children: [i.jsx("h2", { children: "News & Weather" }), i.jsx("p", { children: d ? `Headlines updated ${new Date(d.updated).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : "Your weather and the headlines from sources you choose." })] }),
          i.jsx("button", { className: "btn ghost", onClick: () => setEditing(!editing), children: editing ? "Done" : "⚙ Sources" }),
          i.jsx("button", { className: "btn", onClick: () => load(!0), disabled: loading, children: loading ? "Loading…" : "↻ Refresh" }),
        ],
      }),
      i.jsx(WeatherCard, {}),
      editing &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsx("h3", { children: "News sources" }),
            srcs.map((s, k) => i.jsxs("div", { className: "row", children: [i.jsx("b", { style: { width: 140 }, children: s.name }), i.jsx("span", { className: "small muted", style: { flex: 1, wordBreak: "break-all" }, children: s.url }), i.jsx("button", { className: "btn sm ghost danger", onClick: () => saveSrcs(srcs.filter((_, j) => j !== k)), children: "Remove" })] }, s.url)),
            i.jsxs("div", { className: "row", children: [i.jsx("input", { type: "text", placeholder: "Name", value: nu.name, onChange: (e) => setNu({ ...nu, name: e.target.value }), style: { width: 140 } }), i.jsx("input", { type: "text", placeholder: "RSS feed link, e.g. https://site.com/feed/", value: nu.url, onChange: (e) => setNu({ ...nu, url: e.target.value }), style: { flex: 1 } }), i.jsx("button", { className: "btn primary", disabled: !nu.url, onClick: addSrc, children: "Add" })] }),
            i.jsx("p", { className: "small muted", style: { margin: 0 }, children: "Most news sites have an RSS feed: try adding /feed/ or /rss to the site address." }),
          ],
        }),
      !d && i.jsx("div", { className: "card", children: i.jsx(ye, { text: "Getting headlines…" }) }),
      d &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsx(Wr, { tabs: [["all", "All"], ...d.feeds.filter((f) => f.items.length).map((f) => [f.name, f.name])], value: tab, onChange: setTab }),
            broken.length > 0 && i.jsxs("p", { className: "small muted", children: ["Couldn't load: ", broken.map((f) => f.name).join(", "), " (check the link in ⚙ Sources)"] }),
            i.jsx("div", {
              className: "news-list",
              children: items.map((n, k) =>
                i.jsxs(
                  "a",
                  {
                    className: "news-item",
                    href: n.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      n.image ? i.jsx("img", { src: n.image, alt: "", loading: "lazy", onError: (e) => (e.currentTarget.style.display = "none") }) : i.jsx("div", { className: "news-noimg", children: "📰" }),
                      i.jsxs("div", { className: "news-body", children: [i.jsx("b", { children: n.title }), n.summary && i.jsx("span", { className: "small muted news-sum", children: n.summary }), i.jsxs("span", { className: "small news-meta", children: [n.source, n.date ? ` · ${ago(n.date)}` : ""] })] }),
                    ],
                  },
                  n.link + k,
                ),
              ),
            }),
          ],
        }),
    ],
  });
}

/* ---------------- v3.2: Toolbit — quick convert, compact recent files, home pills ---------------- */
const QC = {
  image: [
    ["JPG", { action: "image", options: { format: "jpg", quality: 88 } }],
    ["PNG", { action: "image", options: { format: "png" } }],
    ["WEBP", { action: "image", options: { format: "webp", quality: 85 } }],
    ["Smaller (1920px)", { action: "image", options: { format: "jpg", width: 1920, height: 1920, quality: 80 } }],
    ["One PDF", { pdf: !0 }],
  ],
  audio: [
    ["MP3", { action: "audio_convert", options: { format: "mp3", bitrate: "192k" } }],
    ["WAV", { action: "audio_convert", options: { format: "wav" } }],
    ["M4A", { action: "audio_convert", options: { format: "m4a", bitrate: "192k" } }],
    ["FLAC", { action: "audio_convert", options: { format: "flac" } }],
    ["Even out loudness", { action: "audio_normalize", options: {} }],
  ],
  video: [
    ["MP4", { action: "video_convert", options: { format: "mp4" } }],
    ["Smaller video", { action: "video_compress", options: { quality: "medium", max_height: 1080 } }],
    ["MP3 (audio only)", { action: "video_audio", options: { format: "mp3" } }],
  ],
  pdf: [
    ["Word (.docx)", { action: "pdf_text", options: { format: "docx" } }],
    ["Text (.txt)", { action: "pdf_text", options: { format: "txt" } }],
    ["Images (PNG)", { action: "pdf_images", options: { format: "png", dpi: 150 } }],
    ["Smaller PDF", { action: "pdf_compress", options: {} }],
  ],
  document: [
    ["PDF", { action: "doc_convert", options: { format: "pdf" } }],
    ["Word (.docx)", { action: "doc_convert", options: { format: "docx" } }],
    ["Text (.txt)", { action: "doc_convert", options: { format: "txt" } }],
  ],
  data: [
    ["Excel (.xlsx)", { action: "doc_convert", options: { format: "xlsx" } }],
    ["CSV", { action: "doc_convert", options: { format: "csv" } }],
    ["JSON", { action: "doc_convert", options: { format: "json" } }],
  ],
};
const QC_LABEL = { image: "🖼 Images", audio: "🎵 Audio", video: "🎬 Video", pdf: "📄 PDF", document: "📝 Documents", data: "📊 Tables" };
function QuickConvert() {
  const toast = Be(),
    [sel, setSel] = m.useState([]),
    [outs, setOuts] = m.useState([]),
    [busyPdf, setBusyPdf] = m.useState(!1),
    [err, setErr] = m.useState(""),
    j = useJob();
  const groups = {};
  sel.forEach((f) => QC[f.kind] && (groups[f.kind] = groups[f.kind] || []).push(f));
  const other = sel.filter((f) => !QC[f.kind]);
  m.useEffect(() => {
    j.job && j.job.state === "done" && j.job.result && setOuts(j.job.result.files || []);
  }, [j.job && j.job.state]);
  const endRef = m.useRef();
  m.useEffect(() => {
    (outs.length || j.busy) && endRef.current && endRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [outs.length, j.busy]);
  const run = async (kind, how) => {
    const fs = groups[kind];
    setErr("");
    if (how.pdf) {
      setBusyPdf(!0), setOuts([]);
      try {
        const r = await R("/image/to-pdf", { body: { file_ids: fs.map((f) => f.id), name: fs.length > 1 ? `${fs[0].name.replace(/\.[^.]+$/, "")} + ${fs.length - 1} more` : null } });
        setOuts([r.file]), window.dispatchEvent(new Event("files-changed")), toast(`Saved ${r.file.name}`);
      } catch (x) {
        setErr(x.message), toast(x.message, "error");
      }
      return setBusyPdf(!1);
    }
    setOuts([]), j.start(R("/batch", { body: { file_ids: fs.map((f) => f.id), action: how.action, options: how.options } }));
  };
  const busy = j.busy || busyPdf;
  return i.jsxs("div", {
    className: "card qc",
    children: [
      i.jsxs("div", { className: "card-title", children: [i.jsx("h3", { children: "⚡ Quick convert" }), sel.length > 0 && i.jsx("button", { className: "btn sm ghost", onClick: () => (setSel([]), setOuts([]), j.reset()), children: "Clear" })] }),
      i.jsx(ke, { multiple: !0, value: sel, onChange: (v) => (setSel(v), setOuts([]), j.reset()), label: "Drop files here (any type) or click to browse" }),
      Object.entries(groups).map(([kind, fs]) =>
        i.jsxs(
          "div",
          {
            className: "qc-row",
            children: [
              i.jsxs("span", { className: "qc-kind", children: [QC_LABEL[kind], i.jsxs("span", { className: "small muted", children: [" ", fs.length, " file", fs.length === 1 ? "" : "s", " →"] })] }),
              i.jsx("div", { className: "pills", children: QC[kind].filter(([l, h]) => !(h.options && h.options.format && !h.options.width && h.action !== "pdf_text" && h.action !== "pdf_images" && fs.every((f) => f.name.toLowerCase().endsWith("." + h.options.format)))).map(([l, h]) => i.jsx("button", { className: "pill qc-btn", disabled: busy, onClick: () => run(kind, h), children: l }, l)) }),
            ],
          },
          kind,
        ),
      ),
      other.length > 0 && i.jsxs("p", { className: "small muted", style: { margin: "6px 0 0" }, children: ["No quick options for: ", other.map((f) => f.name).join(", ")] }),
      busyPdf && i.jsx(ye, { text: "Making the PDF…" }),
      err && i.jsx("p", { className: "small", style: { color: "var(--danger, #c0392b)", margin: "6px 0 0" }, children: err }),
      i.jsx(JobStatus, { j }),
      outs.length > 0 && i.jsx(rt, { files: outs }),
      i.jsx("div", { ref: endRef }),
    ],
  });
}
function HomePills() {
  const go = ys(),
    [mail, setMail] = m.useState(null),
    [bk, setBk] = m.useState(null);
  m.useEffect(() => {
    R("/mail/unread").then(setMail).catch(() => {});
    R("/backup/status").then(setBk).catch(() => {});
  }, []);
  const backupBad = bk && bk.backup_dir && bk.problem,
    backupNone = bk && !bk.backup_dir;
  return i.jsxs("div", {
    className: "home-pills",
    children: [
      i.jsx(WeatherCard, { compact: !0 }),
      mail && mail.configured && i.jsxs("button", { className: "wx-mini", onClick: () => go("/mail"), children: [i.jsx("span", { className: "wx-ic", children: "✉️" }), mail.unread != null ? i.jsx("b", { children: mail.unread }) : null, i.jsx("span", { className: "small muted", children: mail.unread == null ? "Email" : `unread email${mail.unread === 1 ? "" : "s"}` })] }),
      mail && !mail.configured && i.jsxs("button", { className: "wx-mini", onClick: () => go("/mail"), children: [i.jsx("span", { className: "wx-ic", children: "✉️" }), i.jsx("span", { className: "small muted", children: "Connect Gmail" })] }),
      (backupBad || backupNone) && i.jsxs("button", { className: "wx-mini warn pc-only", onClick: () => go("/backup"), title: backupBad ? bk.problem : "", children: [i.jsx("span", { className: "wx-ic", children: "💾" }), i.jsx("span", { className: "small", children: backupBad ? "Backups aren't working: pick your USB stick" : "Set up backups" })] }),
    ],
  });
}
function RecentFiles() {
  const go = ys(),
    [fs] = Ja();
  const ic = { audio: "🎵", video: "🎬", image: "🖼", pdf: "📄", document: "📝", data: "📊" };
  return i.jsxs("div", {
    className: "card",
    children: [
      i.jsxs("div", { className: "card-title", children: [i.jsx("h3", { children: "Recent files" }), i.jsx("button", { className: "btn sm ghost", onClick: () => go("/files"), children: "All files" })] }),
      fs.length === 0 && i.jsx("p", { className: "muted", children: "Nothing yet. Files you add or create show up here." }),
      fs.slice(0, 8).map((f) =>
        i.jsxs(
          "div",
          {
            className: "recent-row",
            children: [
              i.jsx("span", { className: "recent-ic", children: ic[f.kind] || "📁" }),
              i.jsx("span", { className: "recent-name", title: f.name, children: f.name }),
              i.jsx("span", { className: "small muted", children: f.folder || "" }),
              i.jsx("span", { className: "small muted recent-size", children: fmtBytes(f.size) }),
              i.jsx("button", { className: "btn sm ghost", onClick: () => openFileHere(f), title: "Open with the usual program", children: "Open" }),
              i.jsx("a", { className: "btn sm ghost", href: `/api/files/${f.id}/download`, children: "⬇" }),
            ],
          },
          f.id,
        ),
      ),
    ],
  });
}

/* ---------------- v3.3: other devices (phone, laptop), sync, updates from the PC ---------------- */
const TB_REMOTE = !["127.0.0.1", "localhost", "[::1]", "::1"].includes(window.location.hostname);
TB_REMOTE && document.documentElement.classList.add("remote");
// one event for every kind of page change (router pushState, back button, typed #links)
["pushState", "replaceState"].forEach((k) => {
  const orig = history[k];
  history[k] = function (...a) {
    const r = orig.apply(this, a);
    window.dispatchEvent(new Event("tb-nav"));
    return r;
  };
});
window.addEventListener("hashchange", () => window.dispatchEvent(new Event("tb-nav")));
window.addEventListener("popstate", () => window.dispatchEvent(new Event("tb-nav")));
const IcDevices = mkIcon(["M4 5h11a1 1 0 0 1 1 1v8H3V6a1 1 0 0 1 1-1z", "M1 17h17", "M19 9h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z", "M20.5 17.5h.01"]);
function openFileHere(f) {
  // on the PC: open with its default program; on a phone: show it in the browser
  if (TB_REMOTE) return window.open(`/api/files/${f.id}/raw`, "_blank");
  R(`/files/${f.id}/open`, { body: {} }).catch(() => window.open(`/api/files/${f.id}/raw`, "_blank"));
}
function QrBox({ text, size = 200 }) {
  const cv = m.useRef();
  m.useEffect(() => {
    const c = cv.current;
    if (!c || !text) return;
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    const n = q.getModuleCount(),
      s = Math.max(2, Math.floor(size / (n + 8)));
    c.width = c.height = s * (n + 8);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#000";
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) q.isDark(r, k) && ctx.fillRect((k + 4) * s, (r + 4) * s, s, s);
  }, [text, size]);
  return i.jsx("canvas", { ref: cv, className: "qr", style: { width: size, height: size } });
}
const ago2 = (iso) => {
  if (!iso) return "never";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 90) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};
function PeerUpdate({ u }) {
  const toast = Be(),
    [busy, setBusy] = m.useState(!1);
  const go = async () => {
    setBusy(!0);
    try {
      await R("/devices/update", { body: {} });
      restartApp(toast);
    } catch (x) {
      toast(x.message, "error"), setBusy(!1);
    }
  };
  return i.jsxs("div", {
    className: "update-banner",
    children: [
      i.jsxs("span", { children: ["✨ Version ", i.jsx("b", { children: u.version }), " is on ", u.name, ". Update this device to match (takes a few seconds)."] }),
      i.jsx("button", { className: "btn sm primary", disabled: busy, onClick: go, children: busy ? "Updating…" : "Update" }),
    ],
  });
}
function RemoteAccessCard({ st, reload }) {
  const toast = Be(),
    [pin, setPin] = m.useState(""),
    [busy, setBusy] = m.useState(!1),
    [showPin, setShowPin] = m.useState(!1);
  const ts = st.tailscale || {};
  const turn = async (on) => {
    if (on && !st.pin_set && !/^\d{6,12}$/.test(pin)) return toast("Choose a PIN of 6 to 12 digits", "error");
    setBusy(!0);
    try {
      const r = await R("/devices/remote", { body: { on, pin: on ? pin : "" } });
      r.firewall === !1 && toast("Windows didn't allow the firewall rule. If the phone can't connect, turn this off and on again and click Yes.", "error");
      restartApp(toast);
    } catch (x) {
      toast(x.message, "error"), setBusy(!1);
    }
  };
  const changePin = async () => {
    if (!/^\d{6,12}$/.test(pin)) return toast("Choose a PIN of 6 to 12 digits", "error");
    try {
      await R("/devices/pin", { body: { pin } });
      toast("PIN changed. Phones need to sign in again."), setPin(""), setShowPin(!1), reload();
    } catch (x) {
      toast(x.message, "error");
    }
  };
  const tsLine = !ts.installed
    ? i.jsxs("p", { className: "small", children: ["⚠️ Tailscale isn't on this PC yet. ", i.jsx("a", { href: "https://tailscale.com/download/windows", target: "_blank", rel: "noopener", children: "Get it here" }), ", sign in with Google, then come back. (Without it, the phone only works on your home Wi-Fi.)"] })
    : !ts.running
      ? i.jsx("p", { className: "small", children: "⚠️ Tailscale is installed but not connected. Open it from the taskbar and sign in." })
      : i.jsxs("p", { className: "small ok", children: ["✓ Tailscale is on (", ts.name || ts.ip, ")."] });
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsxs("div", { className: "card-title", children: [i.jsx("h3", { children: "📱 Use this PC's Toolbit from your phone" }), st.remote_access && i.jsx("span", { className: "chip ok-chip", children: "On" })] }),
      tsLine,
      !st.remote_access &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsx("p", { className: "small muted", children: "Your phone opens Toolbit in its browser and everything runs here on the PC (so the PC needs to be on). Only devices on your Tailscale or home Wi-Fi can reach it, and they need the PIN." }),
            i.jsxs("div", {
              className: "row",
              children: [
                !st.pin_set && i.jsx(F, { label: "Choose a PIN (6–12 digits)", children: i.jsx("input", { type: "password", inputMode: "numeric", value: pin, maxLength: 12, onChange: (e) => setPin(e.target.value.replace(/\D/g, "")), style: { width: 160 } }) }),
                i.jsx("span", { className: "spacer" }),
                i.jsx("button", { className: "btn primary", disabled: busy, onClick: () => turn(!0), children: busy ? "Turning on…" : "Turn on" }),
              ],
            }),
            i.jsx("p", { className: "small muted", children: "Windows asks once for permission (firewall): click Yes. Toolbit restarts and then keeps running in the background." }),
          ],
        }),
      st.remote_access &&
        i.jsxs(i.Fragment, {
          children: [
            st.urls.length === 0 && i.jsx("p", { className: "small", children: "No network address found. Check that the PC is online." }),
            i.jsx("div", {
              className: "addr-list",
              children: st.urls.map((u) =>
                i.jsxs("div", {
                  className: "addr",
                  children: [
                    i.jsx(QrBox, { text: u.url, size: 150 }),
                    i.jsxs("div", { className: "addr-info", children: [i.jsx("b", { children: u.label }), i.jsx("code", { className: "addr-url", children: u.url }), i.jsx("button", { className: "btn sm", onClick: () => copyText(u.url, toast), children: "Copy" })] }),
                  ],
                }, u.url),
              ),
            }),
            i.jsxs("ol", {
              className: "small",
              children: [
                i.jsx("li", { children: "On the phone: install Tailscale (Play Store), sign in with the same Google account, switch it on." }),
                i.jsx("li", { children: "Scan the Tailscale code above with the camera (or type the address in Chrome)." }),
                i.jsx("li", { children: "Enter your PIN. Then Chrome menu ⋮ › Add to Home screen, so it opens like an app." }),
              ],
            }),
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsxs("span", { className: "small muted", children: [st.sessions.length, " browser", st.sessions.length === 1 ? "" : "s", " signed in", st.sessions.length ? ": " + st.sessions.map((s) => s.ua).slice(-3).join(", ") : ""] }),
                i.jsx("span", { className: "spacer" }),
                st.sessions.length > 0 && i.jsx("button", { className: "btn sm ghost", onClick: () => R("/devices/signout-all", { body: {} }).then(reload), children: "Sign them out" }),
                i.jsx("button", { className: "btn sm ghost", onClick: () => setShowPin(!showPin), children: "Change PIN" }),
                i.jsx("button", { className: "btn sm ghost danger", disabled: busy, onClick: () => turn(!1), children: "Turn off" }),
              ],
            }),
            showPin && i.jsxs("div", { className: "row", children: [i.jsx(F, { label: "New PIN (6–12 digits)", children: i.jsx("input", { type: "password", inputMode: "numeric", value: pin, maxLength: 12, onChange: (e) => setPin(e.target.value.replace(/\D/g, "")), style: { width: 160 } }) }), i.jsx("button", { className: "btn primary", onClick: changePin, children: "Save PIN" })] }),
          ],
        }),
    ],
  });
}
function InstallerCard({ st, reload }) {
  const j = useJob();
  m.useEffect(() => {
    j.job && j.job.state === "done" && reload();
  }, [j.job && j.job.state]);
  const s = st.setup;
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsx("h3", { children: "💻 Put Toolbit on your laptop" }),
      i.jsx("p", { className: "small muted", children: "Makes one installer file (about 400 MB) with everything inside. Installed on the laptop, it pairs with this PC by itself: settings and My Files sync, and when this PC gets an update the laptop shows an Update button." }),
      i.jsxs("div", {
        className: "row",
        children: [
          s ? i.jsxs("span", { className: "small", children: ["📦 ", i.jsx("b", { children: s.name }), " · ", fmtBytes(s.size), " · made ", ago2(s.built)] }) : i.jsx("span", { className: "small muted", children: "No installer made yet." }),
          i.jsx("span", { className: "spacer" }),
          i.jsx("button", { className: s ? "btn" : "btn primary", disabled: j.busy, onClick: () => j.start(R("/devices/setup", { body: {} })), children: s ? "Make it again" : "Make installer" }),
          s && i.jsx("a", { className: "btn primary", href: "/api/devices/setup.zip", download: s.name, children: "⬇ Download" }),
          s && i.jsx("button", { className: "btn pc-only", onClick: () => R("/devices/setup/reveal", { body: {} }), children: "Show in folder" }),
        ],
      }),
      i.jsx(JobStatus, { j }),
      i.jsxs("ol", {
        className: "small",
        children: [
          i.jsx("li", { children: "Get the file to the laptop: copy it with a USB stick (Show in folder), or on the laptop open this PC's Tailscale address in a browser, sign in with the PIN, come to Devices and press Download." }),
          i.jsx("li", { children: "On the laptop: right-click the zip › Extract All, open the folder, double-click install.bat." }),
          i.jsx("li", { children: "Install Tailscale on the laptop too (same Google account) so it can sync from anywhere." }),
        ],
      }),
      st.paired.length > 0 &&
        i.jsxs("div", {
          className: "stack",
          children: [
            i.jsx("b", { className: "small", children: "Devices allowed to sync with this PC" }),
            st.paired.map((p) =>
              i.jsxs("div", { className: "peer-row", children: [i.jsx("span", { children: "💻" }), i.jsx("b", { children: p.name || "Device" }), i.jsx("span", { className: "small muted", children: p.seen ? `last seen ${ago2(p.seen)}` : "not used yet" }), i.jsx("span", { className: "spacer" }), i.jsx("button", { className: "btn sm ghost", onClick: () => window.confirm(`Stop syncing with ${p.name || "this device"}?`) && R(`/devices/paired/${p.k}/remove`, { body: {} }).then(reload), children: "Remove" })] }, p.k),
            ),
          ],
        }),
    ],
  });
}
function PeersCard({ st, reload }) {
  const toast = Be(),
    [addr, setAddr] = m.useState(""),
    [pin, setPin] = m.useState(""),
    [busy, setBusy] = m.useState(!1),
    [mb, setMb] = m.useState(st.sync.max_mb),
    j = useJob();
  m.useEffect(() => {
    j.job && j.job.state !== "running" && reload();
  }, [j.job && j.job.state]);
  const pair = async () => {
    setBusy(!0);
    try {
      const r = await R("/devices/pair", { body: { address: addr, pin } });
      toast(`Paired with ${r.name}. Syncing now…`), setAddr(""), setPin(""), setTimeout(reload, 2500);
    } catch (x) {
      toast(x.message, "error");
    }
    setBusy(!1);
  };
  const saveSync = (files, max_mb) => R("/devices/sync-settings", { body: { files, max_mb } }).then(reload);
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsxs("div", {
        className: "card-title",
        children: [
          i.jsx("h3", { children: "🔄 Sync with your other Toolbit" }),
          st.peers.length > 0 && i.jsx("button", { className: "btn sm", disabled: j.busy || st.sync.running, onClick: () => j.start(R("/devices/sync", { body: {} })), children: st.sync.running || j.busy ? "Syncing…" : "Sync now" }),
        ],
      }),
      st.peers.length === 0 && st.paired.length > 0 && i.jsxs("p", { className: "small ok", children: ["✓ ", st.paired.map((p) => p.name || "Your laptop").join(", "), " syncs with this PC. It does the syncing, so there's nothing to set up here."] }),
      st.peers.length === 0 && st.paired.length === 0 && i.jsx("p", { className: "small muted", children: "Not paired with another Toolbit. A laptop installed from this PC's installer pairs by itself; otherwise type the other one's address and PIN below." }),
      st.peers.map((p) =>
        i.jsxs("div", {
          className: "peer-row",
          children: [
            i.jsx("span", { className: `status-dot ${p.online ? "on" : ""}` }),
            i.jsxs("div", { style: { minWidth: 0 }, children: [i.jsx("b", { children: p.name }), i.jsxs("div", { className: "small muted", children: [p.version && `v${p.version} · `, "synced ", ago2(p.last_sync)] }), p.error && i.jsx("div", { className: "small err", children: p.error })] }),
            i.jsx("span", { className: "spacer" }),
            i.jsx("button", { className: "btn sm ghost", onClick: () => window.confirm(`Unpair ${p.name}? Files already synced stay.`) && R(`/devices/peer/${p.id}/remove`, { body: {} }).then(reload), children: "Unpair" }),
          ],
        }, p.id),
      ),
      i.jsx(JobStatus, { j }),
      st.peers.length > 0 &&
        i.jsxs("div", {
          className: "row",
          children: [
            i.jsxs("label", { className: "check", children: [i.jsx("input", { type: "checkbox", checked: st.sync.files, onChange: (e) => saveSync(e.target.checked, mb) }), " Sync My Files too"] }),
            st.sync.files && i.jsxs("label", { className: "check small", children: ["skip files over ", i.jsx("input", { type: "number", value: mb, min: 1, max: 4000, style: { width: 80 }, onChange: (e) => setMb(+e.target.value), onBlur: () => saveSync(st.sync.files, mb) }), " MB"] }),
          ],
        }),
      st.peers.length > 0 && i.jsx("p", { className: "small muted", children: "Syncs over Tailscale only (encrypted). Shared: email accounts, news sources, weather city, and My Files. Deleting a file on one removes it from My Files on the other (files in Documents stay on disk). Syncs every 10 minutes while both are on." }),
      st.sync.log.length > 0 && i.jsxs("details", { children: [i.jsx("summary", { className: "small muted", children: "Recent syncs" }), i.jsx("div", { className: "code small", children: st.sync.log.join("\n") })] }),
      i.jsxs("details", {
        open: st.peers.length === 0 && !st.remote_access,
        children: [
          i.jsx("summary", { className: "small", children: "Pair with another Toolbit by address" }),
          i.jsxs("div", {
            className: "row",
            style: { marginTop: 8 },
            children: [
              i.jsx(F, { label: "Its address (from its Devices page)", style: { flex: 2, minWidth: 200 }, children: i.jsx("input", { type: "text", value: addr, onChange: (e) => setAddr(e.target.value), placeholder: "100.x.y.z or pc-name" }) }),
              i.jsx(F, { label: "Its PIN", children: i.jsx("input", { type: "password", inputMode: "numeric", value: pin, onChange: (e) => setPin(e.target.value), style: { width: 120 } }) }),
              i.jsx("button", { className: "btn primary", disabled: busy || !addr || !pin, onClick: pair, children: busy ? "Pairing…" : "Pair" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function DevicesPage() {
  const toast = Be(),
    [st, setSt] = m.useState(null),
    [name, setName] = m.useState("");
  const load = () => R("/devices/status").then((s) => (setSt(s), setName(s.me.name))).catch((x) => toast(x.message, "error"));
  m.useEffect(() => {
    load();
    const iv = setInterval(load, 15000);
    return () => clearInterval(iv);
  }, []);
  if (!st) return i.jsx("div", { className: "page", children: i.jsx(ye, {}) });
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", { className: "page-header", children: [i.jsx("h2", { children: "Devices" }), i.jsx("p", { children: "Toolbit on your phone and laptop: one place for your files, kept in sync." })] }),
      !st.local &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsxs("p", { children: ["You're using the Toolbit on ", i.jsx("b", { children: st.me.name }), " (v", st.me.version, "). Files you add here are saved on that PC."] }),
            i.jsx("div", { className: "row end", children: i.jsx("button", { className: "btn", onClick: () => fetch("/api/remote/logout", { method: "POST" }).then(() => window.location.replace("/login")), children: "Sign out on this phone" }) }),
          ],
        }),
      st.local &&
        i.jsxs("div", {
          className: "card row",
          children: [
            i.jsx(F, { label: "This device's name (shown on your other devices)", style: { flex: 1 }, children: i.jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), onBlur: () => name !== st.me.name && R("/devices/name", { body: { name } }).then(load) }) }),
            i.jsxs("span", { className: "small muted", children: ["Toolbit ", st.me.version] }),
          ],
        }),
      st.local && i.jsx(RemoteAccessCard, { st, reload: load }),
      st.local && i.jsx(InstallerCard, { st, reload: load }),
      st.local && i.jsx(PeersCard, { st, reload: load }),
    ],
  });
}
const PC_PAGES = ["/settings", "/backup"];
function PcOnly() {
  return i.jsx("div", { className: "page", children: i.jsxs("div", { className: "card empty", children: [i.jsx("h2", { children: "🖥" }), i.jsx("p", { children: "This page only works on the PC itself." })] }) });
}
function MobileBar({ onMenu }) {
  const [, bump] = m.useReducer((x) => x + 1, 0);
  m.useEffect(() => (window.addEventListener("tb-nav", bump), () => window.removeEventListener("tb-nav", bump)), []);
  const loc = window.location.hash.replace(/^#/, "").split("?")[0] || "/";
  const hit = Wv.flatMap(([, l]) => l).find(([to]) => to === loc || (to !== "/" && loc.startsWith(to)));
  return i.jsxs("div", {
    className: "mobile-bar",
    children: [
      i.jsx("button", { className: "icon-btn mb-menu", onClick: onMenu, "aria-label": "Menu", children: "☰" }),
      i.jsx("img", { src: "/icon.svg", alt: "" }),
      i.jsx("b", { children: hit ? hit[1] : "Toolbit" }),
    ],
  });
}

const mv = [
  ["/mail", IcMail, "Email", "Gmail, attachments to My Files"],
  ["/news", IcNews, "News & Weather", "Headlines and the week's forecast"],
  ["/audio", Jd, "Audio Studio", "Cut, merge, split a mix, tags"],
  ["/lyrics", sf, "Lyrics", "Find lyrics, put them in the song"],
  ["/video", nf, "Video", "Trim, compress, GIF, add music"],
  ["/images", lf, "Images", "Convert, resize, compress"],
  ["/pdf", Zl, "PDF", "Merge, split, rotate, to text"],
  ["/data", of, "Data & Docs", "Convert tables and documents"],
  ["/batch", IcLayers, "Batch", "Many files at once"],
  ["/files", ks, "My Files", "Everything you made, by category"],
  ["/tools", IcTools, "Quick Tools", "Calculator, converters, timer"],
  ["/backup", IcDrive, "Backup", "Copy everything to a USB stick"],
];
function gv() {
  const e = ys(),
    [t, n] = m.useState(null),
    [r, l] = m.useState([]),
    [s] = Ja();
  return (
    m.useEffect(() => {
      R("/status")
        .then(n)
        .catch(() => {}),
        0;
    }, []),
    i.jsxs("div", {
      className: "page",
      children: [
        i.jsxs("div", {
          className: "page-header",
          children: [
            i.jsx("h2", { children: greet() }),
            i.jsx("p", { children: "Convert, cut, merge and fix your files. Everything runs on this PC." }),
          ],
        }),
        i.jsx(HomePills, {}),
        i.jsx(QuickConvert, {}),
        !1 &&
          i.jsxs("div", {
            className: "card row",
            children: [
              i.jsxs("span", {
                children: [
                  i.jsx("span", {
                    className: `status-dot ${t.claude ? "on" : ""}`,
                  }),
                  "Claude ",
                  t.claude ? "connected" : "not connected",
                ],
              }),
              i.jsxs("span", {
                children: [
                  i.jsx("span", {
                    className: `status-dot ${t.airtable ? "on" : ""}`,
                  }),
                  "Airtable ",
                  t.airtable ? "connected" : "not connected",
                ],
              }),
              i.jsx("span", { className: "spacer" }),
              i.jsx("button", {
                className: "btn sm primary",
                onClick: () => e("/settings"),
                children: "Open Settings",
              }),
            ],
          }),
        i.jsx("div", {
          className: "tile-grid",
          children: mv.map(([a, o, u, c]) =>
            i.jsxs(
              "div",
              {
                className: "tile",
                onClick: () => e(a),
                children: [
                  i.jsx(o, {}),
                  i.jsx("b", { children: u }),
                  i.jsx("span", { children: c }),
                ],
              },
              a,
            ),
          ),
        }),
        i.jsx("div", { style: { marginTop: 14 }, children: i.jsx(RecentFiles, {}) }),
      ],
    })
  );
}
const vv = [
  "Cut the first 30 seconds off my latest song and fade it out",
  "Merge my last two audio files with a 2 second crossfade",
  "Split my playlist into separate songs",
  "What's the EUR to ALL rate today, and is it higher than last month?",
  "Transcribe the lyrics of the song I attached",
  "List my Airtable bases",
  "Summarise the spreadsheet I attached and chart the totals",
  "Convert all my PNG images to compressed JPGs",
];
function stripMd(t) {
  return String(t || "")
    .replace(/```[\s\S]*?```/g, " (code) ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>`|~]+/g, " ")
    .replace(/^\s*[-•]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}
function pickVoice() {
  try {
    const v = window.speechSynthesis.getVoices();
    const lang = (navigator.language || "en").slice(0, 2);
    return (
      v.find((x) => /natural/i.test(x.name) && x.lang.startsWith(lang)) ||
      v.find((x) => /natural/i.test(x.name) && x.lang.startsWith("en")) ||
      v.find((x) => x.lang.startsWith(lang)) ||
      v[0] ||
      null
    );
  } catch {
    return null;
  }
}
function lsGet(k, d) {
  try {
    const v = localStorage.getItem(k);
    return v == null ? d : v === "1";
  } catch {
    return d;
  }
}
function lsSet(k, v) {
  try {
    localStorage.setItem(k, v ? "1" : "0");
  } catch {}
}
function yv() {
  const e = Be(),
    [t, n] = m.useState([]),
    [r, l] = m.useState(null),
    [s, a] = m.useState([]),
    [o, u] = m.useState(""),
    [c, f] = m.useState([]),
    [h, g] = m.useState(!1),
    y = m.useRef(),
    k = m.useRef(),
    [VR, setVR] = m.useState("idle"),
    [SPK, setSPK] = m.useState(() => lsGet("da-speak", !1)),
    [CV, setCV] = m.useState(!1),
    [TALK, setTALK] = m.useState(!1),
    vref = m.useRef({}),
    [CFS, setCFS] = m.useState([]),
    [CM, setCM] = m.useState(() => lsStr("da-chat-model")),
    [CE, setCE] = m.useState(() => lsStr("da-chat-effort")),
    [WEB, setWEB] = m.useState(() => lsStr("da-chat-web", "1") === "1"),
    [SHUT, setSHUT] = m.useState({}),
    [DRAG, setDRAG] = m.useState(null),
    S = () =>
      R("/chat")
        .then((j) => (n(j.chats), setCFS(j.folders || [])))
        .catch(() => {});
  m.useEffect(() => {
    S();
  }, []),
    m.useEffect(() => {
      var j;
      (j = y.current) == null || j.scrollTo(0, y.current.scrollHeight);
    }, [s, h]);
  const x = async (j) => {
      const _ = await R(`/chat/${j}`);
      l(j), a(_.messages);
    },
    d = () => {
      l(null), a([]), f([]);
    },
    p = async (j, _) => {
      _.stopPropagation(),
        await R(`/chat/${j}`, { method: "DELETE" }),
        j === r && d(),
        S();
    },
    v = async (j) => {
      if (j != null && j.length)
        try {
          const _ = await wf(j);
          f((N) => [...N, ..._]);
        } catch (_) {
          e(_.message, "error");
        }
    },
    w = async (j) => {
      var E, L;
      const _ = (j ?? o).trim();
      if (!_ || h) return;
      u("");
      const N = c;
      f([]),
        a((T) => [
          ...T,
          { role: "user", text: _, attachments: N.map((b) => b.name) },
        ]),
        g(!0);
      try {
        const T = await R("/chat", {
          body: { chat_id: r, message: _, file_ids: N.map((b) => b.id), model: CM || null, effort: CE || null, web: WEB },
        });
        l(T.chat_id),
          a(T.messages),
          S(),
          (L = (E = T.messages.at(-1)) == null ? void 0 : E.files) != null &&
            L.length &&
            window.dispatchEvent(new Event("files-changed"));
      } catch (T) {
        u((cur) => cur || _),
          e(T.message, "error"),
          a((b) => [
            ...b,
            {
              role: "assistant",
              text: `⚠️ ${T.message}`,
              tools: [],
              files: [],
            },
          ]);
      }
      g(!1);
    };
  vref.current.send = w;
  vref.current.speakOn = SPK;
  vref.current.convo = CV;
  const speak = (txt, after) => {
      try {
        const ss = window.speechSynthesis;
        ss.cancel();
        const clean = stripMd(txt).slice(0, 4000);
        if (!clean) return after && after();
        const parts = clean.match(/[^.!?]+[.!?]*\s*/g) || [clean];
        const voice = pickVoice();
        setTALK(!0);
        parts.forEach((p, idx) => {
          const u = new SpeechSynthesisUtterance(p);
          voice && (u.voice = voice);
          u.rate = 1.05;
          if (idx === parts.length - 1)
            u.onend = u.onerror = () => {
              setTALK(!1);
              after && after();
            };
          ss.speak(u);
        });
      } catch {
        after && after();
      }
    },
    stopSpeak = () => {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      setTALK(!1);
    },
    stopRec = (cancel) => {
      const v = vref.current;
      v.cancel = !!cancel;
      try {
        v.rec && v.rec.state !== "inactive" && v.rec.stop();
      } catch {}
    },
    startRec = async () => {
      const v = vref.current;
      if (v.rec && v.rec.state === "recording") return;
      stopSpeak();
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: !0, noiseSuppression: !0 } });
      } catch (x) {
        e("Microphone blocked or not found. Allow the mic for this window and try again.", "error");
        setCV(!1);
        return;
      }
      const mt = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const rec = new MediaRecorder(stream, mt ? { mimeType: mt } : void 0);
      const chunks = [];
      v.rec = rec;
      v.cancel = !1;
      rec.ondataavailable = (x) => x.data.size && chunks.push(x.data);
      // auto-stop after the user stops talking
      let ctx, timer;
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const an = ctx.createAnalyser();
        an.fftSize = 1024;
        ctx.createMediaStreamSource(stream).connect(an);
        const buf = new Float32Array(an.fftSize);
        let heard = !1,
          quietSince = Date.now();
        const t0 = Date.now();
        timer = setInterval(() => {
          an.getFloatTimeDomainData(buf);
          let sum = 0;
          for (const b of buf) sum += b * b;
          const rms = Math.sqrt(sum / buf.length);
          if (rms > 0.025) (heard = !0), (quietSince = Date.now());
          const quiet = Date.now() - quietSince;
          if ((heard && quiet > 1600) || (!heard && Date.now() - t0 > 9000) || Date.now() - t0 > 90000) {
            if (!heard) v.cancel = !0;
            stopRec(v.cancel);
          }
        }, 120);
      } catch {}
      rec.onstop = async () => {
        clearInterval(timer);
        try {
          ctx && ctx.close();
        } catch {}
        stream.getTracks().forEach((x) => x.stop());
        if (v.cancel || !chunks.length) {
          setVR("idle");
          if (v.convo && !v.cancel) setTimeout(startRec, 300);
          else if (v.cancel && v.convo) {
            setCV(!1);
            e("Conversation paused: no voice heard.");
          }
          return;
        }
        setVR("thinking");
        try {
          const fd = new FormData();
          fd.append("audio", new Blob(chunks, { type: rec.mimeType || "audio/webm" }), "voice.webm");
          const res = await fetch("/api/voice/transcribe", { method: "POST", body: fd });
          const d = await res.json();
          if (!res.ok) throw new Error(d.detail || "Voice failed");
          setVR("idle");
          if (d.text) {
            v.fromVoice = !0;
            await v.send(d.text);
          } else {
            e("Didn't catch that, try again.");
            v.convo && setTimeout(startRec, 300);
          }
        } catch (x) {
          setVR("idle"), e(x.message, "error"), setCV(!1);
        }
      };
      rec.start(250);
      setVR("rec");
    },
    toggleConvo = () => {
      const on = !CV;
      setCV(on);
      vref.current.convo = on;
      if (on) startRec();
      else stopRec(!0), stopSpeak();
    };
  // speak the newest reply when asked to
  const lastLen = m.useRef(0);
  m.useEffect(() => {
    const v = vref.current;
    if (s.length > lastLen.current && s.length && s.at(-1).role === "assistant" && lastLen.current) {
      const want = v.speakOn || v.convo || v.fromVoice;
      if (want && (v.speakOn || v.convo)) speak(s.at(-1).text, () => v.convo && startRec());
      v.fromVoice = !1;
    }
    lastLen.current = s.length;
  }, [s]);
  m.useEffect(() => () => (stopRec(!0), stopSpeak()), []);
  return i.jsxs("div", {
    className: "chat-layout",
    onDragOver: (j) => j.preventDefault(),
    onDrop: (j) => {
      j.preventDefault(), v(j.dataTransfer.files);
    },
    children: [
      i.jsxs("div", {
        className: "chat-list",
        children: [
          i.jsxs("button", {
            className: "btn primary",
            style: {
              width: "100%",
              justifyContent: "center",
              marginBottom: 10,
            },
            onClick: d,
            children: [i.jsx(_g, {}), "New chat"],
          }),
          i.jsx("button", {
            className: "btn sm ghost",
            style: { width: "100%", justifyContent: "center", marginBottom: 8 },
            onClick: async () => {
              const nm = window.prompt("New folder name:");
              if (!nm || !nm.trim()) return;
              try {
                await R("/chat/folders", { body: { name: nm } }), S();
              } catch (q) {
                e(q.message, "error");
              }
            },
            children: "+ New folder",
          }),
          (() => {
            const moveTo = async (cid, folder) => {
                try {
                  await R(`/chat/${cid}/move`, { body: { folder } }), S();
                } catch (q) {
                  e(q.message, "error");
                }
              },
              renameChat = async (c, ev) => {
                ev.stopPropagation();
                const nm = window.prompt("Rename chat:", c.title);
                if (!nm || nm === c.title) return;
                await R(`/chat/${c.id}/rename`, { body: { title: nm } }).catch((q) => e(q.message, "error"));
                S();
              },
              item = (j) =>
                i.jsxs(
                  "div",
                  {
                    className: `item ${j.id === r ? "active" : ""}`,
                    draggable: !0,
                    onDragStart: () => setDRAG(j.id),
                    onDragEnd: () => setDRAG(null),
                    onClick: () => x(j.id),
                    children: [
                      i.jsx("span", { title: j.title, children: j.title }),
                      i.jsxs("select", {
                        className: "chat-move",
                        value: "__x",
                        title: "Move to folder",
                        onClick: (q) => q.stopPropagation(),
                        onChange: async (q) => {
                          let v = q.target.value;
                          if (v === "__new") {
                            v = window.prompt("New folder name:");
                            if (!v || !v.trim()) return;
                          }
                          moveTo(j.id, v);
                        },
                        children: [
                          i.jsx("option", { value: "__x", disabled: !0, children: "📁" }),
                          j.folder && i.jsx("option", { value: "", children: "No folder" }),
                          CFS.filter((q) => q !== j.folder).map((q) => i.jsx("option", { value: q, children: q }, q)),
                          i.jsx("option", { value: "__new", children: "+ New folder…" }),
                        ],
                      }),
                      i.jsx("button", {
                        className: "icon-btn",
                        title: "Rename",
                        onClick: (q) => renameChat(j, q),
                        children: "✎",
                      }),
                      i.jsx("button", {
                        className: "icon-btn",
                        title: "Delete",
                        onClick: (_) => p(j.id, _),
                        children: i.jsx(ws, {}),
                      }),
                    ],
                  },
                  j.id,
                ),
              dropProps = (folder) => ({
                onDragOver: (q) => DRAG != null && (q.preventDefault(), q.stopPropagation()),
                onDrop: (q) => {
                  q.preventDefault(), q.stopPropagation();
                  DRAG != null && moveTo(DRAG, folder), setDRAG(null);
                },
              });
            return i.jsxs(i.Fragment, {
              children: [
                CFS.map((fd) => {
                  const inside = t.filter((c) => c.folder === fd),
                    shut = SHUT[fd];
                  return i.jsxs(
                    "div",
                    {
                      className: `chat-folder ${DRAG != null ? "droppable" : ""}`,
                      ...dropProps(fd),
                      children: [
                        i.jsxs("div", {
                          className: "chat-folder-head",
                          onClick: () => setSHUT((q) => ({ ...q, [fd]: !q[fd] })),
                          children: [
                            i.jsx("span", { children: shut ? "▸" : "▾" }),
                            i.jsxs("span", { className: "fname", title: fd, children: ["📁 ", fd] }),
                            i.jsx("span", { className: "muted small", children: inside.length }),
                            i.jsx("button", {
                              className: "icon-btn",
                              title: "Rename folder",
                              onClick: async (q) => {
                                q.stopPropagation();
                                const nm = window.prompt(`Rename folder "${fd}" to:`, fd);
                                if (!nm || nm === fd) return;
                                await R("/chat/folders/rename", { body: { name: fd, new_name: nm } }).catch((z) => e(z.message, "error"));
                                S();
                              },
                              children: "✎",
                            }),
                            i.jsx("button", {
                              className: "icon-btn",
                              title: "Delete folder (chats are kept)",
                              onClick: async (q) => {
                                q.stopPropagation();
                                if (!window.confirm(`Delete folder "${fd}"? The chats inside are kept.`)) return;
                                await R("/chat/folders/delete", { body: { name: fd } }).catch((z) => e(z.message, "error"));
                                S();
                              },
                              children: i.jsx(ws, {}),
                            }),
                          ],
                        }),
                        !shut &&
                          (inside.length
                            ? inside.map(item)
                            : i.jsx("div", { className: "muted small chat-empty", children: "Drag chats here" })),
                      ],
                    },
                    fd,
                  );
                }),
                CFS.length > 0 &&
                  i.jsx("div", { className: "nav-label chat-sep", ...dropProps(""), children: "Chats" }),
                i.jsx("div", { ...dropProps(""), style: { minHeight: 20 }, children: t.filter((c) => !c.folder).map(item) }),
              ],
            });
          })(),
        ],
      }),
      i.jsxs("div", {
        className: "chat-main",
        children: [
          i.jsx("div", {
            className: "chat-scroll",
            ref: y,
            children: i.jsxs("div", {
              className: "chat-inner",
              children: [
                s.length === 0 &&
                  i.jsxs("div", {
                    className: "empty",
                    children: [
                      i.jsx("h2", { children: "How can I help?" }),
                      i.jsx("p", {
                        children:
                          "I can work with your files, music, videos, PDFs, spreadsheets and Airtable. Attach files or just ask.",
                      }),
                      i.jsx("div", {
                        className: "suggest",
                        children: vv.map((j) =>
                          i.jsx(
                            "button",
                            {
                              className: "pill",
                              onClick: () => w(j),
                              children: j,
                            },
                            j,
                          ),
                        ),
                      }),
                    ],
                  }),
                s.map((j, _) => {
                  var N, E, L;
                  return i.jsx(
                    "div",
                    {
                      className: `msg ${j.role}`,
                      children: i.jsx("div", {
                        className: "bubble",
                        children:
                          j.role === "user"
                            ? i.jsxs(i.Fragment, {
                                children: [
                                  ((N = j.attachments) == null
                                    ? void 0
                                    : N.length) > 0 &&
                                    i.jsx("div", {
                                      className: "tool-chips",
                                      children: j.attachments.map((T) =>
                                        i.jsxs(
                                          "span",
                                          {
                                            className: "chip",
                                            children: ["📎 ", T],
                                          },
                                          T,
                                        ),
                                      ),
                                    }),
                                  i.jsx("div", {
                                    className: "result-text",
                                    children: j.text,
                                  }),
                                ],
                              })
                            : i.jsxs(i.Fragment, {
                                children: [
                                  ((E = j.tools) == null ? void 0 : E.length) >
                                    0 &&
                                    i.jsx("div", {
                                      className: "tool-chips",
                                      children: [...new Set(j.tools)].map((T) =>
                                        i.jsxs(
                                          "span",
                                          {
                                            className: "chip",
                                            children: [
                                              "⚙ ",
                                              T.replaceAll("_", " "),
                                            ],
                                          },
                                          T,
                                        ),
                                      ),
                                    }),
                                  i.jsx(Ss, { text: j.text }),
                                  i.jsx("button", {
                                    className: "icon-btn say-btn",
                                    title: "Read aloud",
                                    onClick: () => speak(j.text),
                                    children: "🔊",
                                  }),
                                  (L = j.files) == null
                                    ? void 0
                                    : L.map((T) =>
                                        i.jsx(Hr, { file: T }, T.id),
                                      ),
                                ],
                              }),
                      }),
                    },
                    _,
                  );
                }),
                h &&
                  i.jsx("div", {
                    className: "msg assistant",
                    children: i.jsx(ye, { text: "Thinking and working…" }),
                  }),
              ],
            }),
          }),
          i.jsx("div", {
            className: "composer",
            children: i.jsx("div", {
              className: "chat-inner",
              children: i.jsxs("div", {
                className: "composer-box",
                children: [
                  c.length > 0 &&
                    i.jsx("div", {
                      className: "tool-chips",
                      style: { padding: "2px 4px" },
                      children: c.map((j) =>
                        i.jsxs(
                          "span",
                          {
                            className: "chip",
                            children: [
                              "📎 ",
                              j.name,
                              i.jsx("button", {
                                className: "icon-btn",
                                style: { padding: 0, marginLeft: 4 },
                                onClick: () =>
                                  f((_) => _.filter((N) => N.id !== j.id)),
                                children: i.jsx(cf, { size: 12 }),
                              }),
                            ],
                          },
                          j.id,
                        ),
                      ),
                    }),
                  i.jsx("textarea", {
                    placeholder:
                      "Ask anything, or press 🎤 Talk… (Enter to send, Shift+Enter for new line, drop files to attach)",
                    value: o,
                    onChange: (j) => u(j.target.value),
                    onKeyDown: (j) => {
                      j.key === "Enter" &&
                        !j.shiftKey &&
                        (j.preventDefault(), w());
                    },
                  }),
                  i.jsxs("div", {
                    className: "row",
                    children: [
                      i.jsxs("button", {
                        className: "btn sm ghost",
                        onClick: () => k.current.click(),
                        children: [i.jsx(Ng, {}), "Attach"],
                      }),
                      i.jsx("input", {
                        ref: k,
                        type: "file",
                        multiple: !0,
                        hidden: !0,
                        onChange: (j) => {
                          v(j.target.files), (j.target.value = "");
                        },
                      }),
                      i.jsx("button", {
                        className: `btn sm mic-btn ${VR === "rec" ? "rec" : ""}`,
                        disabled: VR === "thinking" || h,
                        title: "Talk instead of typing (stops by itself when you pause)",
                        onClick: () => (VR === "rec" ? stopRec(!1) : startRec()),
                        children:
                          VR === "rec" ? "■ Listening… (click to send)" : VR === "thinking" ? "Transcribing…" : "🎤 Talk",
                      }),
                      i.jsx("button", {
                        className: `btn sm ${SPK ? "on" : "ghost"}`,
                        title: "Read every reply out loud",
                        onClick: () => {
                          const v = !SPK;
                          setSPK(v), lsSet("da-speak", v), v || stopSpeak();
                        },
                        children: SPK ? "🔊 Replies spoken" : "🔈 Speak replies",
                      }),
                      i.jsx("button", {
                        className: `btn sm ${CV ? "on" : "ghost"}`,
                        title: "Hands-free: talk, hear the answer, it listens again. Stops after 9 s of silence.",
                        onClick: toggleConvo,
                        children: CV ? "● Conversation on" : "💬 Conversation mode",
                      }),
                      i.jsx("button", {
                        className: `btn sm ${WEB ? "on" : "ghost"}`,
                        title: "Let Claude search the web for current info (about $0.01 per search)",
                        onClick: () => {
                          const v = !WEB;
                          setWEB(v), lsPut("da-chat-web", v ? "1" : "0");
                        },
                        children: WEB ? "🌐 Web on" : "🌐 Web off",
                      }),
                      i.jsx(ModelPicker, { model: CM, setModel: setCM, effort: CE, setEffort: setCE, compact: !0 }),
                      TALK &&
                        i.jsx("button", {
                          className: "btn sm ghost",
                          onClick: stopSpeak,
                          children: "Stop talking",
                        }),
                      i.jsx("span", { className: "spacer" }),
                      i.jsxs("button", {
                        className: "btn primary sm",
                        onClick: () => w(),
                        disabled: h || !o.trim(),
                        children: [i.jsx(Mg, {}), "Send"],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
const Xn = {
  file: [
    "Summarise this data",
    "What trends do you see?",
    "Key statistics",
    "What looks unusual?",
    "Give me actionable insights",
  ],
  text: [
    "Summarise the key points",
    "Extract all facts and numbers",
    "What is the main argument?",
    "Rewrite this more clearly",
    "Translate to English",
  ],
  url: [
    "Summarise this page",
    "Extract all data and numbers",
    "List the key facts",
    "What are the pros and cons?",
    "Find contact details",
  ],
};
function xv() {
  var N;
  const e = Be(),
    [t, n] = m.useState("file"),
    [r, l] = m.useState([]),
    [s, a] = m.useState(""),
    [o, u] = m.useState(""),
    [c, f] = m.useState(!1),
    [h, g] = m.useState(!1),
    [y, k] = m.useState(""),
    [S, x] = m.useState(!1),
    [d, p] = m.useState(null),
    [v, w] = m.useState(!1),
    j = async () => {
      x(!0), p(null), w(!1);
      try {
        let E, L;
        if (t === "file") {
          if (!r[0]) throw new Error("Choose a file first");
          (L = r[0].name),
            (E = await R("/analyse/file", {
              body: { file_id: r[0].id, question: y || Xn.file[0] },
            }));
        } else
          t === "text"
            ? ((L = "Text: " + s.slice(0, 40)),
              (E = await R("/analyse/text", {
                body: { text: s, question: y || Xn.text[0] },
              })))
            : ((L = o),
              (E = await R("/analyse/url", {
                body: {
                  url: o,
                  question: y || Xn.url[0],
                  render_js: c,
                  extract_emails: h,
                },
              })));
        p({ ...E, source: L, question: y || Xn[t][0] });
      } catch (E) {
        e(E.message, "error");
      }
      x(!1);
    },
    _ = async () => {
      try {
        const E = await R("/analyses", {
          body: {
            source: d.source,
            question: d.question,
            result: d.result,
            chart: d.chart,
          },
        });
        w(!0), e(`Saved as "${E.title}"`);
      } catch (E) {
        e(E.message, "error");
      }
    };
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Analyse" }),
          i.jsx("p", {
            children: "Ask Claude about any file, text or web page",
          }),
        ],
      }),
      i.jsx(Wr, {
        tabs: [
          ["file", "File"],
          ["text", "Text"],
          ["url", "Web page"],
        ],
        value: t,
        onChange: (E) => {
          n(E), p(null);
        },
      }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          t === "file" &&
            i.jsx(ke, {
              value: r,
              onChange: l,
              accept:
                ".csv,.tsv,.xlsx,.xls,.json,.jsonl,.xml,.db,.sqlite,.sql,.parquet,.pdf,.docx,.md,.txt,.pkl,.html,.lrc,.srt",
            }),
          t === "text" &&
            i.jsx("textarea", {
              placeholder: "Paste any text here…",
              value: s,
              onChange: (E) => a(E.target.value),
            }),
          t === "url" &&
            i.jsxs(i.Fragment, {
              children: [
                i.jsx("input", {
                  type: "url",
                  placeholder: "https://example.com/article",
                  value: o,
                  onChange: (E) => u(E.target.value),
                  style: { width: "100%" },
                }),
                i.jsxs("div", {
                  className: "row",
                  children: [
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: c,
                          onChange: (E) => f(E.target.checked),
                        }),
                        "Render JavaScript (for dynamic sites, slower)",
                      ],
                    }),
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: h,
                          onChange: (E) => g(E.target.checked),
                        }),
                        "Extract email addresses",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          i.jsx("div", {
            className: "pills",
            children: Xn[t].map((E) =>
              i.jsx(
                "button",
                {
                  className: `pill ${y === E ? "active" : ""}`,
                  onClick: () => k(E),
                  children: E,
                },
                E,
              ),
            ),
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx("input", {
                type: "text",
                placeholder: "Or type your own question…",
                value: y,
                onChange: (E) => k(E.target.value),
                onKeyDown: (E) => E.key === "Enter" && j(),
                style: { flex: 1 },
              }),
              i.jsx("button", {
                className: "btn primary",
                onClick: j,
                disabled: S,
                children: "Analyse",
              }),
            ],
          }),
        ],
      }),
      S &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, { text: "Analysing…" }),
        }),
      d &&
        i.jsxs("div", {
          className: "card",
          children: [
            i.jsxs("div", {
              className: "card-title",
              children: [
                i.jsx("h3", { children: "Result" }),
                i.jsxs("button", {
                  className: "btn sm",
                  onClick: _,
                  disabled: v,
                  children: [i.jsx(Rg, {}), v ? "Saved" : "Save to Library"],
                }),
              ],
            }),
            d.chart &&
              i.jsx("div", {
                className: "chart",
                children: i.jsx("img", {
                  src: `data:image/png;base64,${d.chart}`,
                  alt: "chart",
                }),
              }),
            i.jsx(Ss, { text: d.result }),
            ((N = d.emails) == null ? void 0 : N.length) > 0 &&
              i.jsxs(i.Fragment, {
                children: [
                  i.jsxs("h3", {
                    children: ["Emails found (", d.emails.length, ")"],
                  }),
                  i.jsx("div", {
                    className: "code",
                    children: d.emails.join(`
`),
                  }),
                ],
              }),
          ],
        }),
    ],
  });
}
function kv() {
  const e = Be(),
    [t] = og(),
    [n, r] = m.useState([]),
    [l, s] = m.useState(""),
    [a, o] = m.useState(null),
    [u, c] = m.useState(""),
    [f, h] = m.useState(null),
    g = () =>
      R("/analyses" + (l ? `?q=${encodeURIComponent(l)}` : "")).then((d) =>
        r(d.analyses),
      );
  m.useEffect(() => {
    g();
  }, [l]),
    m.useEffect(() => {
      const d = t.get("id");
      d && y(Number(d));
    }, []);
  const y = async (d) => {
      const p = await R(`/analyses/${d}`);
      o(p), c(p.notes || ""), h(null);
    },
    k = async () => {
      await R(`/analyses/${a.id}`, { method: "PUT", body: { notes: u } }),
        e("Notes saved");
    },
    S = async () => {
      window.confirm("Delete this analysis?") &&
        (await R(`/analyses/${a.id}`, { method: "DELETE" }), o(null), g());
    },
    x = async (d) => {
      try {
        const p = await R(`/analyses/${a.id}/export?format=${d}`, { body: {} });
        h(p.file);
      } catch (p) {
        e(p.message, "error");
      }
    };
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Library" }),
          i.jsx("p", { children: "Your saved analyses" }),
        ],
      }),
      i.jsxs("div", {
        className: "two-col",
        children: [
          i.jsxs("div", {
            className: "card",
            children: [
              i.jsx("input", {
                type: "text",
                placeholder: "Search…",
                value: l,
                onChange: (d) => s(d.target.value),
                style: { width: "100%", marginBottom: 8 },
              }),
              n.length === 0 &&
                i.jsx("p", {
                  className: "muted",
                  children: "Nothing saved yet.",
                }),
              n.map((d) => {
                var p;
                return i.jsxs(
                  "div",
                  {
                    className: `list-item ${(a == null ? void 0 : a.id) === d.id ? "active" : ""}`,
                    onClick: () => y(d.id),
                    children: [
                      i.jsx("div", { className: "t", children: d.title }),
                      i.jsxs("div", {
                        className: "m",
                        children: [
                          (p = d.source) == null ? void 0 : p.slice(0, 40),
                          " · ",
                          new Date(d.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }),
                        ],
                      }),
                    ],
                  },
                  d.id,
                );
              }),
            ],
          }),
          i.jsxs("div", {
            children: [
              !a &&
                i.jsx("div", {
                  className: "card muted",
                  children: "Select an analysis to view it.",
                }),
              a &&
                i.jsxs("div", {
                  className: "card",
                  children: [
                    i.jsxs("div", {
                      className: "card-title",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("h3", {
                              style: { fontSize: 18 },
                              children: a.title,
                            }),
                            i.jsxs("div", {
                              className: "muted small",
                              children: [
                                a.source,
                                " · ",
                                new Date(a.created_at).toLocaleString("en-GB"),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "row",
                          children: [
                            i.jsxs("button", {
                              className: "btn sm",
                              onClick: () => x("pdf"),
                              children: [i.jsx(xu, {}), "PDF"],
                            }),
                            i.jsxs("button", {
                              className: "btn sm",
                              onClick: () => x("docx"),
                              children: [i.jsx(xu, {}), "Word"],
                            }),
                            i.jsx("button", {
                              className: "icon-btn",
                              onClick: S,
                              children: i.jsx(ws, {}),
                            }),
                          ],
                        }),
                      ],
                    }),
                    f && i.jsx(Hr, { file: f }),
                    a.question &&
                      i.jsxs("p", {
                        className: "muted",
                        children: [
                          i.jsx("b", { children: "Q:" }),
                          " ",
                          a.question,
                        ],
                      }),
                    a.chart &&
                      i.jsx("div", {
                        className: "chart",
                        children: i.jsx("img", {
                          src: `data:image/png;base64,${a.chart}`,
                          alt: "",
                        }),
                      }),
                    i.jsx(Ss, { text: a.result }),
                    i.jsx("h3", {
                      style: { marginTop: 16 },
                      children: "Notes",
                    }),
                    i.jsx("textarea", {
                      value: u,
                      onChange: (d) => c(d.target.value),
                      placeholder: "Your notes…",
                    }),
                    i.jsx("div", {
                      className: "row end",
                      style: { marginTop: 8 },
                      children: i.jsx("button", {
                        className: "btn primary sm",
                        onClick: k,
                        children: "Save notes",
                      }),
                    }),
                  ],
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function wv({ fileId: e, sel: t, onSel: n, current: r = 0, onSeek: l }) {
  const s = m.useRef(),
    a = m.useRef(),
    [o, u] = m.useState(null),
    [c, f] = m.useState(0),
    h = m.useRef(null);
  m.useEffect(() => {
    u(null),
      e &&
        R(`/audio/${e}/peaks?n=1500`)
          .then((x) => {
            u(x.peaks), f(x.duration);
          })
          .catch(() => u([]));
  }, [e]),
    m.useEffect(() => {
      const x = s.current;
      if (!x || !o) return;
      const d = x.getBoundingClientRect(),
        p = window.devicePixelRatio || 1;
      (x.width = d.width * p), (x.height = d.height * p);
      const v = x.getContext("2d");
      v.scale(p, p);
      const w = getComputedStyle(document.documentElement),
        j = d.width,
        _ = d.height,
        N = _ / 2,
        [E, L] = t || [0, 0];
      c &&
        L > E &&
        ((v.fillStyle = w.getPropertyValue("--accent-soft")),
        v.fillRect((E / c) * j, 0, ((L - E) / c) * j, _));
      const T = o.length;
      for (let b = 0; b < T; b++) {
        const ie = (b / T) * j,
          he = (b / T) * c,
          M = Math.max(1, o[b] * (_ / 2 - 6));
        (v.fillStyle =
          L > E && he >= E && he <= L
            ? w.getPropertyValue("--wave-sel")
            : w.getPropertyValue("--wave")),
          v.fillRect(ie, N - M, Math.max(1, j / T), M * 2);
      }
      c &&
        ((v.fillStyle = w.getPropertyValue("--text")),
        v.fillRect((r / c) * j, 0, 1.5, _));
    }, [o, t, r, c]);
  const g = (x) => {
      const d = a.current.getBoundingClientRect();
      return Math.min(c, Math.max(0, ((x.clientX - d.left) / d.width) * c));
    },
    y = (x) => {
      h.current = { start: g(x), moved: !1 };
    },
    k = (x) => {
      if (!h.current) return;
      const d = g(x);
      Math.abs(d - h.current.start) > c / 400 && (h.current.moved = !0),
        h.current.moved &&
          n([Math.min(d, h.current.start), Math.max(d, h.current.start)]);
    },
    S = (x) => {
      h.current && !h.current.moved && (l == null || l(g(x))),
        (h.current = null);
    };
  return i.jsxs("div", {
    children: [
      i.jsx("div", {
        className: "wave-wrap",
        ref: a,
        onMouseDown: y,
        onMouseMove: k,
        onMouseUp: S,
        onMouseLeave: () => (h.current = null),
        children:
          o === null
            ? i.jsx("div", {
                className: "muted small",
                style: { padding: 12 },
                children: "Loading waveform…",
              })
            : i.jsx("canvas", { ref: s }),
      }),
      i.jsxs("div", {
        className: "timebar",
        children: [
          i.jsx("span", { children: "0:00" }),
          i.jsx("span", { children: "Drag to select · click to jump" }),
          i.jsx("span", { children: gr(c) }),
        ],
      }),
    ],
  });
}
const eo = "audio/*,video/*,.mp3,.wav,.flac,.aac,.ogg,.m4a,.opus,.wma,.aiff",
  Nf = [
    "same",
    "mp3",
    "wav",
    "flac",
    "m4a",
    "aac",
    "ogg",
    "opus",
    "aiff",
    "wma",
  ],
  jv = ["128k", "192k", "256k", "320k"];
function Sv() {
  const [e, t] = m.useState("edit");
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Audio Studio" }),
          i.jsx("p", {
            children:
              "Cut, merge, add effects, convert and tag your songs. Everything stays on your PC.",
          }),
        ],
      }),
      i.jsx(Wr, {
        tabs: [
          ["edit", "Cut & effects"],
          ["merge", "Merge songs"],
          ["splitmix", "Split a mix into songs"],
          ["tags", "Tags & cover"],
        ],
        value: e,
        onChange: t,
      }),
      e === "splitmix" && i.jsx(SplitMix, {}),
      e === "edit" && i.jsx(Cv, {}),
      e === "merge" && i.jsx(Nv, {}),
      e === "tags" && i.jsx(Ev, {}),
    ],
  });
}
function SplitMix() {
  const toast = Be(),
    [file, setFile] = m.useState([]),
    [mode, setMode] = m.useState("auto"),
    [count, setCount] = m.useState(""),
    [tl, setTl] = m.useState(""),
    [tracks, setTracks] = m.useState(null),
    [dur, setDur] = m.useState(0),
    [busy, setBusy] = m.useState(""),
    [fmt, setFmt] = m.useState(""),
    [fade, setFade] = m.useState(!1),
    [outs, setOuts] = m.useState([]),
    player = m.useRef(),
    stopT = m.useRef(),
    f = file[0];
  m.useEffect(() => {
    setTracks(null), setOuts([]);
  }, [f && f.id]);
  const sorted = (l) => [...l].sort((a, b) => Sn(a.start) - Sn(b.start)),
    find = async () => {
      setBusy("find"), setOuts([]);
      try {
        const d = await R("/audio/detect-songs", {
          body: { file_id: f.id, count: count ? Number(count) : null },
        });
        setDur(d.duration), setTracks(d.tracks);
        toast(`Found ${d.tracks.length} songs. Listen to each cut and fine-tune if needed.`);
      } catch (x) {
        toast(x.message, "error");
      }
      setBusy("");
    },
    readTl = async () => {
      try {
        const d = await R("/audio/parse-tracklist", { body: { text: tl } });
        if (!d.tracks.length) return toast("No timestamps found. Use lines like '03:12 Song name'.", "error");
        setTracks(d.tracks), setOuts([]);
        if (f) R(`/files/${f.id}/info`).then((x) => x.media && setDur(x.media.duration)).catch(() => {});
      } catch (x) {
        toast(x.message, "error");
      }
    },
    upd = (idx, patch) => setTracks((l) => l.map((t, j) => (j === idx ? { ...t, ...patch } : t))),
    hear = (t) => {
      const a = player.current;
      if (!a) return;
      clearTimeout(stopT.current);
      a.currentTime = Math.max(0, t - 4);
      a.play().catch(() => {});
      stopT.current = setTimeout(() => a.pause(), 8000);
    },
    addAtPlayhead = () => {
      const a = player.current,
        t = a ? Math.round(a.currentTime * 10) / 10 : 0;
      setTracks((l) => sorted([...(l || [{ start: 0, title: "Track 01" }]), { start: t, title: "" }]));
    },
    cut = async () => {
      setBusy("cut");
      try {
        const d = await R("/audio/split-songs", {
          body: {
            file_id: f.id,
            tracks: sorted(tracks).map((t) => ({ start: Sn(t.start) || 0, title: /^Track \d+$/.test(t.title || "") ? "" : t.title || "" })),
            format: fmt || null,
            fade: fade ? 0.4 : 0,
          },
        });
        setOuts(d.files), window.dispatchEvent(new Event("files-changed"));
        toast(`${d.count} songs saved in ${d.folder}`);
      } catch (x) {
        toast(x.message, "error");
      }
      setBusy("");
    },
    list = tracks ? sorted(tracks) : [];
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(ke, {
            value: file,
            onChange: setFile,
            kind: ["audio", "video"],
            accept: "audio/*,video/*",
            label: "Drop the mix / playlist here (MP3, M4A, WAV… or a video)",
          }),
          f &&
            i.jsx("audio", {
              ref: player,
              controls: !0,
              preload: "metadata",
              src: mr(f.id),
              style: { width: "100%" },
            }),
          i.jsx(de, {
            value: mode,
            onChange: setMode,
            options: [
              ["auto", "Find the songs automatically"],
              ["tl", "I have a tracklist with times"],
            ],
          }),
          mode === "auto"
            ? i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx(F, {
                    label: "Number of songs (optional, makes it more accurate)",
                    children: i.jsx(Se, { value: count, onChange: setCount, min: 2, max: 200, style: { width: 120 } }),
                  }),
                  i.jsx("span", { className: "spacer" }),
                  i.jsx("button", {
                    className: "btn primary",
                    style: { alignSelf: "flex-end" },
                    disabled: !f || !!busy,
                    onClick: find,
                    children: busy === "find" ? "Listening to the mix…" : "Find songs",
                  }),
                ],
              })
            : i.jsxs("div", {
                className: "stack",
                children: [
                  i.jsx("textarea", {
                    style: { minHeight: 140 },
                    placeholder:
                      "Paste the tracklist, e.g. from the video description:\n00:00 Artist - First song\n03:12 Artist - Second song\n06:40 Third song",
                    value: tl,
                    onChange: (x) => setTl(x.target.value),
                  }),
                  i.jsx("div", {
                    className: "row",
                    children: i.jsx("button", {
                      className: "btn primary",
                      disabled: !tl.trim(),
                      onClick: readTl,
                      children: "Read tracklist",
                    }),
                  }),
                ],
              }),
          i.jsx("p", {
            className: "small muted",
            children:
              "Automatic mode listens for changes in key and sound. In seamless mixes where songs blend together, a cut can be a few seconds off: press ▶ to hear each cut and nudge it. A tracklist with times is always exact.",
          }),
        ],
      }),
      busy === "find" && i.jsx("div", { className: "card", children: i.jsx(ye, { text: "Listening to the whole mix… (about 10–30 s)" }) }),
      tracks &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsxs("b", { children: [list.length, " songs"] }),
                dur > 0 && i.jsxs("span", { className: "muted small", children: ["mix length ", gr(dur)] }),
                i.jsx("span", { className: "spacer" }),
                f &&
                  i.jsx("button", {
                    className: "btn sm",
                    onClick: addAtPlayhead,
                    title: "Play the mix above, pause where a new song starts, then press this",
                    children: "+ Add cut at player position",
                  }),
              ],
            }),
            i.jsx("div", {
              className: "track-list",
              children: list.map((t, j) => {
                const idx = tracks.indexOf(t),
                  next = list[j + 1],
                  len = (next ? Sn(next.start) : dur) - Sn(t.start);
                return i.jsxs(
                  "div",
                  {
                    className: "track-row",
                    children: [
                      i.jsx("span", { className: "muted tnum", children: String(j + 1).padStart(2, "0") }),
                      i.jsx("input", {
                        type: "text",
                        className: "tstart",
                        value: typeof t.start === "number" ? gr(t.start) : t.start,
                        disabled: j === 0,
                        title: "Start time (m:ss)",
                        onChange: (x) => upd(idx, { start: x.target.value }),
                        onBlur: (x) => upd(idx, { start: Sn(x.target.value) }),
                      }),
                      j > 0 &&
                        i.jsxs(i.Fragment, {
                          children: [
                            i.jsx("button", { className: "btn sm", title: "2 s earlier", onClick: () => upd(idx, { start: Math.max(0, Sn(t.start) - 2) }), children: "−2s" }),
                            i.jsx("button", { className: "btn sm", title: "2 s later", onClick: () => upd(idx, { start: Sn(t.start) + 2 }), children: "+2s" }),
                            i.jsx("button", { className: "btn sm", title: "Hear 4 s before and after this cut", onClick: () => hear(Sn(t.start)), children: "▶" }),
                          ],
                        }),
                      j === 0 && i.jsx("span", { className: "small muted", style: { width: 128 }, children: "start of mix" }),
                      i.jsx("input", {
                        type: "text",
                        style: { flex: 1 },
                        placeholder: `Track ${String(j + 1).padStart(2, "0")} (type a name, e.g. Artist - Title)`,
                        value: /^Track \d+$/.test(t.title || "") ? "" : t.title || "",
                        onChange: (x) => upd(idx, { title: x.target.value }),
                      }),
                      i.jsx("span", { className: "muted small tlen", children: len > 0 ? gr(len).replace(/\.\d$/, "") : "" }),
                      j > 0 &&
                        i.jsx("button", {
                          className: "icon-btn",
                          title: "Remove this cut (joins it with the song before)",
                          onClick: () => setTracks((l) => l.filter((_, k) => k !== idx)),
                          children: i.jsx(cf, {}),
                        }),
                    ],
                  },
                  idx,
                );
              }),
            }),
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(F, {
                  label: "Save as",
                  children: i.jsxs("select", {
                    value: fmt,
                    onChange: (x) => setFmt(x.target.value),
                    children: [
                      i.jsx("option", { value: "", children: "Same as the mix (fastest, no quality loss)" }),
                      ["mp3", "m4a", "flac", "wav", "ogg"].map((x) => i.jsx("option", { value: x, children: x.toUpperCase() }, x)),
                    ],
                  }),
                }),
                i.jsxs("label", {
                  className: "check",
                  style: { alignSelf: "flex-end" },
                  children: [i.jsx("input", { type: "checkbox", checked: fade, onChange: (x) => setFade(x.target.checked) }), "Smooth the edges (tiny fade)"],
                }),
                i.jsx("span", { className: "spacer" }),
                i.jsx("button", {
                  className: "btn primary",
                  style: { alignSelf: "flex-end" },
                  disabled: !f || !!busy || list.length < 2,
                  onClick: cut,
                  children: busy === "cut" ? "Cutting…" : `Cut into ${list.length} songs`,
                }),
              ],
            }),
            i.jsx("p", {
              className: "small muted",
              children: "Songs are saved, numbered and tagged, in Documents › Data Assistant › Audio › <mix name>, and show up as a folder in My Files.",
            }),
          ],
        }),
      i.jsx(rt, { files: outs }),
    ],
  });
}
function Cv() {
  const [e, t] = m.useState([]),
    n = e[0],
    r = m.useRef(),
    [l, s] = m.useState([0, 0]),
    [a, o] = m.useState(0),
    [u, c] = m.useState(!1),
    [f, h] = m.useState("same"),
    [g, y] = m.useState("192k"),
    [k, S] = m.useState(0),
    [x, d] = m.useState(0),
    [p, v] = m.useState({
      volume_db: 0,
      speed: 1,
      pitch: 0,
      bass_db: 0,
      treble_db: 0,
      normalize: !1,
      reverse: !1,
      mono: !1,
      trim_silence: !1,
    }),
    [w, j] = m.useState(60),
    { busy: _, outputs: N, run: E } = xt(),
    L = m.useRef(null);
  m.useEffect(() => {
    s([0, 0]), o(0), c(!1);
  }, [n == null ? void 0 : n.id]);
  const T = f === "same" ? null : f,
    b = () => {
      const C = r.current.currentTime;
      o(C),
        L.current != null &&
          C >= L.current &&
          (r.current.pause(), (L.current = null));
    },
    ie = () => {
      r.current.paused ? r.current.play() : r.current.pause();
    },
    he = () => {
      if (l[1] <= l[0]) return ie();
      (r.current.currentTime = l[0]), (L.current = l[1]), r.current.play();
    },
    M = l[1] > l[0],
    H = (C) =>
      E(() =>
        R("/audio/trim", {
          body: {
            file_id: n.id,
            start: l[0],
            end: l[1],
            remove_selection: C,
            fade_in: k || 0,
            fade_out: x || 0,
            format: T,
            bitrate: g,
          },
        }),
      ),
    Me = () =>
      E(() =>
        R("/audio/effects", {
          body: {
            file_id: n.id,
            ...p,
            fade_in: k || 0,
            fade_out: x || 0,
            format: T,
            bitrate: g,
          },
        }),
      ),
    we = (C) => ($) => v((I) => ({ ...I, [C]: $ }));
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          value: e,
          onChange: t,
          kind: ["audio", "video"],
          accept: eo,
          label: "Drop a song here or click to browse",
        }),
      }),
      n &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsx("audio", {
              ref: r,
              src: mr(n.id),
              onTimeUpdate: b,
              onPlay: () => c(!0),
              onPause: () => c(!1),
              preload: "auto",
            }),
            i.jsx(wv, {
              fileId: n.id,
              sel: l,
              onSel: s,
              current: a,
              onSeek: (C) => {
                (r.current.currentTime = C), o(C);
              },
            }),
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsxs("button", {
                  className: "btn",
                  onClick: ie,
                  children: [
                    u ? i.jsx(Eg, {}) : i.jsx(ku, {}),
                    u ? "Pause" : "Play",
                  ],
                }),
                i.jsxs("button", {
                  className: "btn",
                  onClick: he,
                  disabled: !M,
                  children: [i.jsx(ku, {}), "Play selection"],
                }),
                i.jsx("span", {
                  className: "muted small",
                  style: { fontVariantNumeric: "tabular-nums" },
                  children: gr(a),
                }),
                i.jsx("span", { className: "spacer" }),
                i.jsx(F, {
                  label: "Start",
                  children: i.jsx(
                    "input",
                    {
                      type: "text",
                      style: { width: 90 },
                      defaultValue: gr(l[0]),
                      onBlur: (C) => s([Sn(C.target.value), l[1]]),
                      onKeyDown: (C) => C.key === "Enter" && C.target.blur(),
                    },
                    "s" + l[0],
                  ),
                }),
                i.jsx(F, {
                  label: "End",
                  children: i.jsx(
                    "input",
                    {
                      type: "text",
                      style: { width: 90 },
                      defaultValue: gr(l[1]),
                      onBlur: (C) => s([l[0], Sn(C.target.value)]),
                      onKeyDown: (C) => C.key === "Enter" && C.target.blur(),
                    },
                    "e" + l[1],
                  ),
                }),
                i.jsx("button", {
                  className: "btn sm",
                  style: { alignSelf: "flex-end" },
                  onClick: () => s([a, Math.max(a, l[1])]),
                  children: "Start = now",
                }),
                i.jsx("button", {
                  className: "btn sm",
                  style: { alignSelf: "flex-end" },
                  onClick: () => s([Math.min(l[0], a), a]),
                  children: "End = now",
                }),
              ],
            }),
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(F, {
                  label: "Fade in (s)",
                  children: i.jsx(Se, {
                    value: k,
                    onChange: S,
                    step: 0.5,
                    min: 0,
                  }),
                }),
                i.jsx(F, {
                  label: "Fade out (s)",
                  children: i.jsx(Se, {
                    value: x,
                    onChange: d,
                    step: 0.5,
                    min: 0,
                  }),
                }),
                i.jsx(F, {
                  label: "Save as",
                  children: i.jsx("select", {
                    value: f,
                    onChange: (C) => h(C.target.value),
                    children: Nf.map((C) =>
                      i.jsx(
                        "option",
                        {
                          value: C,
                          children:
                            C === "same" ? "Same format" : C.toUpperCase(),
                        },
                        C,
                      ),
                    ),
                  }),
                }),
                i.jsx(F, {
                  label: "Quality",
                  children: i.jsx("select", {
                    value: g,
                    onChange: (C) => y(C.target.value),
                    children: jv.map((C) =>
                      i.jsx("option", { children: C }, C),
                    ),
                  }),
                }),
                i.jsx("span", { className: "spacer" }),
                i.jsxs("button", {
                  className: "btn primary",
                  style: { alignSelf: "flex-end" },
                  disabled: !M || _,
                  onClick: () => H(!1),
                  children: [i.jsx(zg, {}), "Keep selection"],
                }),
                i.jsxs("button", {
                  className: "btn",
                  style: { alignSelf: "flex-end" },
                  disabled: !M || _,
                  onClick: () => H(!0),
                  children: [i.jsx(ws, {}), "Delete selection"],
                }),
              ],
            }),
          ],
        }),
      n &&
        i.jsxs("div", {
          className: "grid2",
          children: [
            i.jsxs("div", {
              className: "card stack",
              children: [
                i.jsx("h3", { children: "Effects" }),
                i.jsx(Jn, {
                  label: "Volume",
                  unit: "dB",
                  value: p.volume_db,
                  onChange: we("volume_db"),
                  min: -20,
                  max: 20,
                  step: 1,
                }),
                i.jsx(Jn, {
                  label: "Speed",
                  unit: "×",
                  value: p.speed,
                  onChange: we("speed"),
                  min: 0.5,
                  max: 2,
                  step: 0.05,
                }),
                i.jsx(Jn, {
                  label: "Pitch",
                  unit: "semitones",
                  value: p.pitch,
                  onChange: we("pitch"),
                  min: -12,
                  max: 12,
                  step: 1,
                }),
                i.jsx(Jn, {
                  label: "Bass",
                  unit: "dB",
                  value: p.bass_db,
                  onChange: we("bass_db"),
                  min: -12,
                  max: 12,
                  step: 1,
                }),
                i.jsx(Jn, {
                  label: "Treble",
                  unit: "dB",
                  value: p.treble_db,
                  onChange: we("treble_db"),
                  min: -12,
                  max: 12,
                  step: 1,
                }),
                i.jsxs("div", {
                  className: "row",
                  children: [
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: p.normalize,
                          onChange: (C) => we("normalize")(C.target.checked),
                        }),
                        "Normalize loudness",
                      ],
                    }),
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: p.trim_silence,
                          onChange: (C) => we("trim_silence")(C.target.checked),
                        }),
                        "Trim silence",
                      ],
                    }),
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: p.reverse,
                          onChange: (C) => we("reverse")(C.target.checked),
                        }),
                        "Reverse",
                      ],
                    }),
                    i.jsxs("label", {
                      className: "check",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: p.mono,
                          onChange: (C) => we("mono")(C.target.checked),
                        }),
                        "Mono",
                      ],
                    }),
                  ],
                }),
                i.jsx("p", {
                  className: "small muted",
                  children: 'Fades and "Save as" from above apply here too.',
                }),
                i.jsx("div", {
                  className: "row end",
                  children: i.jsx("button", {
                    className: "btn primary",
                    disabled: _,
                    onClick: Me,
                    children: "Apply effects to whole song",
                  }),
                }),
              ],
            }),
            i.jsxs("div", {
              className: "card stack",
              children: [
                i.jsx("h3", { children: "More tools" }),
                i.jsxs("div", {
                  className: "row",
                  children: [
                    i.jsxs("button", {
                      className: "btn",
                      disabled: _,
                      onClick: () =>
                        E(() =>
                          R("/audio/convert", {
                            body: {
                              file_id: n.id,
                              format: T || "mp3",
                              bitrate: g,
                            },
                          }),
                        ),
                      children: ["Convert to ", (T || "mp3").toUpperCase()],
                    }),
                    i.jsx("span", {
                      className: "small muted",
                      children: '(choose format in "Save as")',
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "row",
                  children: [
                    i.jsx(F, {
                      label: "Split every (seconds)",
                      children: i.jsx(Se, { value: w, onChange: j, min: 1 }),
                    }),
                    i.jsx("button", {
                      className: "btn",
                      style: { alignSelf: "flex-end" },
                      disabled: _,
                      onClick: () =>
                        E(() =>
                          R("/audio/split", {
                            body: {
                              file_id: n.id,
                              segment_seconds: w,
                              format: T,
                            },
                          }),
                        ),
                      children: "Split",
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "row",
                  children: [
                    i.jsx("button", {
                      className: "btn",
                      disabled: _,
                      onClick: () =>
                        E(() =>
                          R("/audio/vocal-remove", {
                            body: { file_id: n.id, format: T },
                          }),
                        ),
                      children: "Remove vocals (karaoke)",
                    }),
                    i.jsx("span", {
                      className: "small muted",
                      children: "Basic: works best on studio stereo mixes",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      _ && i.jsx("div", { className: "card", children: i.jsx(ye, {}) }),
      i.jsx(rt, { files: N, onUse: (C) => t([C]), useLabel: "Keep editing" }),
    ],
  });
}
function Jn({
  label: e,
  unit: t,
  value: n,
  onChange: r,
  min: l,
  max: s,
  step: a,
}) {
  return i.jsxs("div", {
    className: "row",
    children: [
      i.jsx("span", { style: { width: 60 }, children: e }),
      i.jsx("input", {
        type: "range",
        min: l,
        max: s,
        step: a,
        value: n,
        onChange: (o) => r(Number(o.target.value)),
        style: { flex: 1 },
      }),
      i.jsxs("span", {
        className: "small muted",
        style: { width: 110, textAlign: "right" },
        children: [n, " ", t],
      }),
    ],
  });
}
function Nv() {
  const [e, t] = m.useState([]),
    [n, r] = m.useState(0),
    [l, s] = m.useState(0),
    [a, o] = m.useState("mp3"),
    [u, c] = m.useState(""),
    { busy: f, outputs: h, run: g } = xt();
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(ke, {
            multiple: !0,
            value: e,
            onChange: t,
            kind: ["audio", "video"],
            accept: eo,
            label: "Add songs in the order you want them (drag & drop several)",
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, {
                label: "Crossfade (s)",
                children: i.jsx(Se, {
                  value: n,
                  onChange: r,
                  step: 0.5,
                  min: 0,
                }),
              }),
              i.jsx(F, {
                label: "Gap between (s)",
                children: i.jsx(Se, {
                  value: l,
                  onChange: s,
                  step: 0.5,
                  min: 0,
                }),
              }),
              i.jsx(F, {
                label: "Format",
                children: i.jsx("select", {
                  value: a,
                  onChange: (y) => o(y.target.value),
                  children: Nf.slice(1).map((y) =>
                    i.jsx("option", { children: y }, y),
                  ),
                }),
              }),
              i.jsx(F, {
                label: "File name (optional)",
                style: { flex: 1 },
                children: i.jsx("input", {
                  type: "text",
                  value: u,
                  onChange: (y) => c(y.target.value),
                  placeholder: "My mix",
                }),
              }),
            ],
          }),
          i.jsx("div", {
            className: "row end",
            children: i.jsxs("button", {
              className: "btn primary",
              disabled: f || e.length < 2,
              onClick: () =>
                g(() =>
                  R("/audio/merge", {
                    body: {
                      file_ids: e.map((y) => y.id),
                      crossfade: n || 0,
                      gap: l || 0,
                      format: a,
                      name: u || null,
                    },
                  }),
                ),
              children: ["Merge ", e.length || "", " songs"],
            }),
          }),
        ],
      }),
      f &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, { text: "Merging…" }),
        }),
      i.jsx(rt, { files: h }),
    ],
  });
}
function Ev() {
  const e = Be(),
    [t, n] = m.useState([]),
    [r, l] = m.useState([]),
    [s, a] = m.useState({}),
    [o, u] = m.useState(""),
    [c, f] = m.useState(null),
    [h, g] = m.useState(null),
    y = t[0];
  m.useEffect(() => {
    y &&
      R(`/audio/${y.id}/tags`)
        .then((x) => {
          a(x.tags), u(x.lyrics || ""), f(x.cover);
        })
        .catch((x) => e(x.message, "error"));
  }, [y == null ? void 0 : y.id]);
  const k = async () => {
      var x;
      try {
        const d = await R(`/audio/${y.id}/tags`, {
          body: {
            tags: s,
            lyrics: o,
            cover_file_id: ((x = r[0]) == null ? void 0 : x.id) || null,
          },
        });
        f(d.cover),
          l([]),
          g(d.file),
          d.file && d.file.id !== y.id && n([d.file]),
          window.dispatchEvent(new Event("files-changed")),
          e("Tags saved");
      } catch (d) {
        e(d.message, "error");
      }
    },
    S = [
      ["title", "Title"],
      ["artist", "Artist"],
      ["album", "Album"],
      ["albumartist", "Album artist"],
      ["date", "Year"],
      ["genre", "Genre"],
      ["tracknumber", "Track #"],
      ["composer", "Composer"],
    ];
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          value: t,
          onChange: n,
          kind: "audio",
          accept: eo,
        }),
      }),
      y &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsx("div", {
              className: "grid3",
              children: S.map(([x, d]) =>
                i.jsx(
                  F,
                  {
                    label: d,
                    children: i.jsx("input", {
                      type: "text",
                      value: s[x] || "",
                      onChange: (p) =>
                        a((v) => ({ ...v, [x]: p.target.value })),
                    }),
                  },
                  x,
                ),
              ),
            }),
            i.jsxs("div", {
              className: "row",
              style: { alignItems: "flex-start" },
              children: [
                i.jsx("div", {
                  children: c
                    ? i.jsx("img", {
                        src: c,
                        alt: "cover",
                        style: {
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 8,
                        },
                      })
                    : i.jsx("div", {
                        className: "muted small",
                        style: { width: 120 },
                        children: "No cover art",
                      }),
                }),
                i.jsx("div", {
                  style: { flex: 1 },
                  children: i.jsx(ke, {
                    value: r,
                    onChange: l,
                    kind: "image",
                    accept: ".jpg,.jpeg,.png",
                    label: "New cover image (JPG/PNG, MP3 & M4A)",
                  }),
                }),
              ],
            }),
            i.jsx(F, {
              label: "Lyrics (embedded in the file)",
              children: i.jsx("textarea", {
                value: o,
                onChange: (x) => u(x.target.value),
              }),
            }),
            i.jsx("div", {
              className: "row end",
              children: i.jsx("button", {
                className: "btn primary",
                onClick: k,
                children: "Save tags",
              }),
            }),
          ],
        }),
      h && i.jsx(rt, { files: [h] }),
    ],
  });
}
const _v = [
  ["", "Auto-detect"],
  ["en", "English"],
  ["sq", "Albanian"],
  ["it", "Italian"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["de", "German"],
  ["pt", "Portuguese"],
  ["tr", "Turkish"],
  ["el", "Greek"],
];
function Pv() {
  const [e, t] = m.useState("search");
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Lyrics" }),
          i.jsx("p", {
            children:
              "Find lyrics online, or transcribe them from any song or video",
          }),
        ],
      }),
      i.jsx(Wr, {
        tabs: [
          ["search", "Find lyrics"],
          ["transcribe", "Transcribe a song"],
        ],
        value: e,
        onChange: t,
      }),
      e === "search" ? i.jsx(Tv, {}) : i.jsx(Rv, {}),
    ],
  });
}
function Ef({ text: e, setText: t, name: n, synced: r, song: SG }) {
  const l = Be(),
    [s, a] = m.useState([]),
    [o, u] = m.useState(SG ? [SG] : []),
    [BZ, setBZ] = m.useState(!1);
  m.useEffect(() => {
    SG && u([SG]);
  }, [SG && SG.id]);
  const c = async (h) => {
      try {
        const g = await R("/lyrics/save", {
          body: {
            name: n || "lyrics",
            text: h === "lrc" && r ? r : e,
            format: h,
          },
        });
        a([g.file]), window.dispatchEvent(new Event("files-changed"));
        l(`Saved ${g.file.name} in ${g.folder}`);
      } catch (g) {
        l(g.message, "error");
      }
    },
    f = async () => {
      setBZ(!0);
      try {
        const h = await R("/lyrics/embed", {
          body: { file_id: o[0].id, text: e, synced: r || null },
        });
        a(h.files || [h.file]),
          l(`Song with lyrics saved in ${h.folder}`),
          window.dispatchEvent(new Event("files-changed"));
      } catch (h) {
        l(h.message, "error");
      }
      setBZ(!1);
    };
  return i.jsxs("div", {
    className: "card stack",
    children: [
      i.jsx("textarea", {
        style: { minHeight: 320 },
        value: e,
        onChange: (h) => t(h.target.value),
      }),
      i.jsxs("div", {
        className: "lyr-box",
        children: [
          i.jsx("b", { children: "1. Put the lyrics inside the song" }),
          i.jsx("p", {
            className: "small muted",
            children:
              "Saves a copy of the song with these lyrics built in (music players like Musicolet, Poweramp, foobar and iTunes show them). If timed lyrics exist, a matching .lrc file is saved next to it for scrolling lyrics.",
          }),
          i.jsxs("div", {
            className: "row",
            style: { alignItems: "flex-start" },
            children: [
              i.jsx("div", {
                style: { flex: 1 },
                children: i.jsx(ke, {
                  value: o,
                  onChange: u,
                  kind: "audio",
                  accept: "audio/*",
                  label: "Choose the song (MP3, M4A, FLAC, OGG)",
                }),
              }),
              i.jsx("button", {
                className: "btn primary",
                disabled: !o[0] || BZ,
                onClick: f,
                children: BZ ? "Saving…" : "Add lyrics to song",
              }),
            ],
          }),
        ],
      }),
      i.jsxs("div", {
        className: "lyr-box",
        children: [
          i.jsx("b", { children: "2. Or save the lyrics as a file" }),
          i.jsxs("div", {
            className: "row",
            children: [
              ["txt", "lrc", "docx", "pdf"].map((h) =>
                i.jsxs(
                  "button",
                  { className: "btn sm", onClick: () => c(h), children: [".", h] },
                  h,
                ),
              ),
            ],
          }),
        ],
      }),
      i.jsx("p", {
        className: "small muted",
        children:
          "Where things go: lyric files → Documents › Data Assistant › Lyrics. Songs with lyrics → Documents › Data Assistant › Audio. Both also appear in My Files, and every result below has Open, Folder and Download buttons.",
      }),
      i.jsx(rt, { files: s }),
    ],
  });
}
function Tv() {
  const e = Be(),
    [t, n] = m.useState(""),
    [r, l] = m.useState(""),
    [s, a] = m.useState(!1),
    [o, u] = m.useState(null),
    [c, f] = m.useState(null),
    [h, g] = m.useState("plain"),
    [y, k] = m.useState(""),
    S = async () => {
      a(!0), f(null);
      try {
        const d = await R("/lyrics/search", {
          body: r ? { track: t, artist: r } : { query: t },
        });
        u(d.results);
      } catch (d) {
        e(d.message, "error");
      }
      a(!1);
    },
    x = (d) => {
      f(d), g("plain"), k(d.plain || (d.instrumental ? "(Instrumental)" : ""));
    };
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card row",
        children: [
          i.jsx("input", {
            type: "text",
            placeholder: "Song title (or anything)",
            value: t,
            onChange: (d) => n(d.target.value),
            onKeyDown: (d) => d.key === "Enter" && S(),
            style: { flex: 2 },
          }),
          i.jsx("input", {
            type: "text",
            placeholder: "Artist (optional)",
            value: r,
            onChange: (d) => l(d.target.value),
            onKeyDown: (d) => d.key === "Enter" && S(),
            style: { flex: 1 },
          }),
          i.jsxs("button", {
            className: "btn primary",
            onClick: S,
            disabled: s || !t,
            children: [i.jsx(Lg, {}), "Search"],
          }),
        ],
      }),
      s &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, { text: "Searching…" }),
        }),
      o &&
        i.jsxs("div", {
          className: "two-col",
          children: [
            i.jsxs("div", {
              className: "card",
              children: [
                o.length === 0 &&
                  i.jsx("p", {
                    className: "muted",
                    children:
                      "No lyrics found. Try a different spelling, or transcribe the song instead.",
                  }),
                o.map((d) =>
                  i.jsxs(
                    "div",
                    {
                      className: `list-item ${(c == null ? void 0 : c.id) === d.id ? "active" : ""}`,
                      onClick: () => x(d),
                      children: [
                        i.jsx("div", { className: "t", children: d.track }),
                        i.jsxs("div", {
                          className: "m",
                          children: [
                            d.artist,
                            d.album ? ` · ${d.album}` : "",
                            d.synced ? " · synced" : "",
                          ],
                        }),
                      ],
                    },
                    d.id,
                  ),
                ),
              ],
            }),
            i.jsx("div", {
              children:
                c &&
                i.jsxs(i.Fragment, {
                  children: [
                    i.jsxs("div", {
                      className: "row",
                      style: { marginBottom: 8 },
                      children: [
                        i.jsxs("b", { children: [c.track, " · ", c.artist] }),
                        i.jsx("span", { className: "spacer" }),
                        c.synced &&
                          i.jsx(de, {
                            options: [
                              ["plain", "Plain"],
                              ["synced", "Synced (timed)"],
                            ],
                            value: h,
                            onChange: (d) => {
                              g(d), k(d === "plain" ? c.plain : c.synced);
                            },
                          }),
                      ],
                    }),
                    i.jsx(Ef, {
                      text: y,
                      setText: k,
                      name: `${c.artist} - ${c.track}`,
                      synced: c.synced,
                    }),
                  ],
                }),
            }),
          ],
        }),
      i.jsx("p", {
        className: "small muted",
        children: "Lyrics come from LRCLIB, a free community lyrics database.",
      }),
    ],
  });
}
function Rv() {
  var p, v;
  const e = Be(),
    [t, n] = m.useState([]),
    [r, l] = m.useState("small"),
    [s, a] = m.useState(""),
    [o, u] = m.useState(!1),
    [c, f] = m.useState(!1),
    [h, g] = m.useState(null),
    [y, k] = m.useState("text"),
    [S, x] = m.useState(""),
    [SP, setSP] = m.useState(!1),
    [ON, setON] = m.useState(null),
    [OB, setOB] = m.useState(!1),
    d = async () => {
      f(!0), g(null), setON(null);
      try {
        const w = await R("/lyrics/transcribe", {
          body: {
            file_id: t[0].id,
            model: r,
            language: s || null,
            ai_cleanup: o,
            speech_only: SP,
          },
        });
        g(w), k("text"), x(w.text);
      } catch (w) {
        e(w.message, "error");
      }
      f(!1);
    },
    FO = async () => {
      setOB(!0), g(null), setON(null);
      try {
        const w = await R("/lyrics/auto", { body: { file_id: t[0].id } });
        if (w.best) {
          setON(w.best), x(w.best.plain || w.best.synced), k("text");
          e(`Found: ${w.best.track} · ${w.best.artist}`);
        } else
          e(
            `Couldn't find "${w.guess.track}${w.guess.artist ? " · " + w.guess.artist : ""}" online. Try Transcribe instead.`,
            "error",
          );
      } catch (w) {
        e(w.message, "error");
      }
      setOB(!1);
    };
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(ke, {
            value: t,
            onChange: n,
            kind: ["audio", "video"],
            accept: "audio/*,video/*",
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, {
                label: "Accuracy",
                children: i.jsxs("select", {
                  value: r,
                  onChange: (w) => l(w.target.value),
                  children: [
                    i.jsx("option", {
                      value: "tiny",
                      children: "Fastest (tiny)",
                    }),
                    i.jsx("option", {
                      value: "base",
                      children: "Balanced (base)",
                    }),
                    i.jsx("option", {
                      value: "small",
                      children: "Better (small)",
                    }),
                    i.jsx("option", {
                      value: "medium",
                      children: "Best (medium, slow)",
                    }),
                  ],
                }),
              }),
              i.jsx(F, {
                label: "Language",
                children: i.jsx("select", {
                  value: s,
                  onChange: (w) => a(w.target.value),
                  children: _v.map(([w, j]) =>
                    i.jsx("option", { value: w, children: j }, w),
                  ),
                }),
              }),
              i.jsxs("label", {
                className: "check",
                style: { alignSelf: "flex-end" },
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: SP,
                    onChange: (w) => setSP(w.target.checked),
                  }),
                  "It's speech, not singing",
                ],
              }),
              i.jsx("span", { className: "spacer" }),
              i.jsx("button", {
                className: "btn",
                style: { alignSelf: "flex-end" },
                onClick: FO,
                disabled: OB || c || !t[0],
                title: "Uses the song's tags or file name (Artist - Title) to find the real lyrics",
                children: OB ? "Searching…" : "Find lyrics online",
              }),
              i.jsx("button", {
                className: "btn primary",
                style: { alignSelf: "flex-end" },
                onClick: d,
                disabled: c || OB || !t[0],
                children: "Transcribe",
              }),
            ],
          }),
          i.jsx("p", {
            className: "small muted",
            children:
              'Tip: for a known song, "Find lyrics online" gives the exact lyrics (with timing) in seconds. "Transcribe" listens to the song itself, offline. Music makes this harder, so use "Better (small)" or "Best (medium)". Each model downloads once the first time (small ≈ 460 MB, medium ≈ 1.5 GB). A 3-minute song takes about 1–3 minutes with "small".',
          }),
        ],
      }),
      c &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, {
            text: "Listening to the song… (this can take a few minutes)",
          }),
        }),
      ON &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsxs("div", {
              className: "row",
              style: { marginBottom: 8 },
              children: [
                i.jsxs("b", { children: ["Found online: ", ON.track, " · ", ON.artist] }),
                i.jsx("span", { className: "spacer" }),
                ON.synced &&
                  i.jsx(de, {
                    options: [
                      ["text", "Plain"],
                      ["lrc", "Synced (timed)"],
                    ],
                    value: y,
                    onChange: (w) => {
                      k(w), x(w === "text" ? ON.plain : ON.synced);
                    },
                  }),
              ],
            }),
            i.jsx(Ef, {
              text: S,
              setText: x,
              name: `${ON.artist} - ${ON.track}`,
              synced: ON.synced,
              song: t[0],
            }),
          ],
        }),
      h &&
        i.jsxs(i.Fragment, {
          children: [
            i.jsxs("div", {
              className: "row",
              style: { marginBottom: 8 },
              children: [
                i.jsxs("span", {
                  className: "muted small",
                  children: [
                    "Detected language: ",
                    h.language,
                    " · ",
                    Math.round(h.duration),
                    "s",
                  ],
                }),
                i.jsx("span", { className: "spacer" }),
                i.jsx(de, {
                  options: [
                    ["text", "Lyrics"],
                    ["lrc", "Timed (LRC)"],
                    ["srt", "Subtitles (SRT)"],
                  ],
                  value: y,
                  onChange: (w) => {
                    k(w), x(w === "text" ? h.text : h[w]);
                  },
                }),
              ],
            }),
            i.jsx(Ef, {
              text: S,
              setText: x,
              name:
                ((v = (p = t[0]) == null ? void 0 : p.name) == null
                  ? void 0
                  : v.replace(/\.[^.]+$/, "")) + " - lyrics",
              synced: h.lrc,
              song: t[0],
            }),
          ],
        }),
    ],
  });
}
const to = "video/*,.mkv,.avi,.flv,.wmv,.m4v,.3gp,.ts",
  zv = ["mp4", "mkv", "mov", "webm", "avi", "gif", "m4v", "wmv", "flv"];
function Lv() {
  const [e, t] = m.useState(() => hashQ().get("tab") || "edit");
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Video" }),
          i.jsx("p", {
            children:
              "Trim, convert, compress, make GIFs, pull audio and add music",
          }),
        ],
      }),
      i.jsx(Wr, {
        tabs: [
          ["edit", "Edit a video"],
          ["merge", "Merge videos"],
          ["music", "Add music"],
        ],
        value: e,
        onChange: t,
      }),
      e === "edit" && i.jsx(Mv, {}),
      e === "merge" && i.jsx(bv, {}),
      e === "music" && i.jsx($v, {}),
    ],
  });
}
function Mv() {
  const [e, t] = m.useState([]),
    n = e[0],
    r = m.useRef(),
    [l, s] = m.useState("trim"),
    [a, o] = m.useState("0:00"),
    [u, c] = m.useState(""),
    [f, h] = m.useState(!1),
    [g, y] = m.useState("mp4"),
    [k, S] = m.useState("medium"),
    [x, d] = m.useState(""),
    [p, v] = m.useState({
      height: "",
      rotate: 0,
      flip_h: !1,
      flip_v: !1,
      speed: 1,
      mute: !1,
      volume_db: 0,
    }),
    [w, j] = m.useState({ duration: 5, width: 480, fps: 12 }),
    [_, N] = m.useState("mp3"),
    { busy: E, outputs: L, run: T } = xt(),
    b = () => {
      var M;
      return gr(((M = r.current) == null ? void 0 : M.currentTime) || 0);
    },
    ie = n && /\.(mp4|webm|mov|m4v|ogv)$/i.test(n.name),
    he = () => {
      const M = n.id;
      T(
        {
          trim: () =>
            R("/video/trim", {
              body: {
                file_id: M,
                start: Sn(a),
                end: u ? Sn(u) : null,
                fast: f,
              },
            }),
          convert: () =>
            R("/video/convert", { body: { file_id: M, format: g } }),
          compress: () =>
            R("/video/compress", {
              body: { file_id: M, quality: k, max_height: x || null },
            }),
          transform: () =>
            R("/video/transform", {
              body: { file_id: M, ...p, height: p.height || null },
            }),
          audio: () =>
            R("/video/extract-audio", { body: { file_id: M, format: _ } }),
          gif: () =>
            R("/video/gif", { body: { file_id: M, start: Sn(a), ...w } }),
          frame: () => {
            var Me;
            return R("/video/thumbnail", {
              body: {
                file_id: M,
                time:
                  ((Me = r.current) == null ? void 0 : Me.currentTime) || Sn(a),
              },
            });
          },
        }[l],
      );
    };
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          value: e,
          onChange: t,
          kind: "video",
          accept: to,
        }),
      }),
      n &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            ie
              ? i.jsx("video", {
                  ref: r,
                  className: "preview",
                  src: mr(n.id),
                  controls: !0,
                })
              : i.jsx("p", {
                  className: "muted small",
                  children:
                    "Preview isn't available for this format in the window, but all tools work.",
                }),
            i.jsx(de, {
              value: l,
              onChange: s,
              options: [
                ["trim", "Trim"],
                ["convert", "Convert"],
                ["compress", "Compress"],
                ["transform", "Resize / rotate / speed"],
                ["audio", "Extract audio"],
                ["gif", "Make GIF"],
                ["frame", "Save frame"],
              ],
            }),
            (l === "trim" || l === "gif") &&
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx(F, {
                    label: "Start (m:ss)",
                    children: i.jsx("input", {
                      type: "text",
                      value: a,
                      onChange: (M) => o(M.target.value),
                      style: { width: 100 },
                    }),
                  }),
                  i.jsx("button", {
                    className: "btn sm",
                    style: { alignSelf: "flex-end" },
                    onClick: () => o(b()),
                    children: "= current",
                  }),
                  l === "trim" &&
                    i.jsxs(i.Fragment, {
                      children: [
                        i.jsx(F, {
                          label: "End (m:ss, empty = end)",
                          children: i.jsx("input", {
                            type: "text",
                            value: u,
                            onChange: (M) => c(M.target.value),
                            style: { width: 100 },
                          }),
                        }),
                        i.jsx("button", {
                          className: "btn sm",
                          style: { alignSelf: "flex-end" },
                          onClick: () => c(b()),
                          children: "= current",
                        }),
                        i.jsxs("label", {
                          className: "check",
                          style: { alignSelf: "flex-end" },
                          children: [
                            i.jsx("input", {
                              type: "checkbox",
                              checked: f,
                              onChange: (M) => h(M.target.checked),
                            }),
                            "Instant (no re-encode, less precise)",
                          ],
                        }),
                      ],
                    }),
                  l === "gif" &&
                    i.jsxs(i.Fragment, {
                      children: [
                        i.jsx(F, {
                          label: "Length (s)",
                          children: i.jsx(Se, {
                            value: w.duration,
                            onChange: (M) => j((H) => ({ ...H, duration: M })),
                            min: 1,
                          }),
                        }),
                        i.jsx(F, {
                          label: "Width (px)",
                          children: i.jsx(Se, {
                            value: w.width,
                            onChange: (M) => j((H) => ({ ...H, width: M })),
                            step: 20,
                          }),
                        }),
                        i.jsx(F, {
                          label: "FPS",
                          children: i.jsx(Se, {
                            value: w.fps,
                            onChange: (M) => j((H) => ({ ...H, fps: M })),
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            l === "convert" &&
              i.jsx(F, {
                label: "Convert to",
                children: i.jsx(de, { options: zv, value: g, onChange: y }),
              }),
            l === "compress" &&
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx(F, {
                    label: "Size",
                    children: i.jsx(de, {
                      options: [
                        ["high", "Best quality"],
                        ["medium", "Balanced"],
                        ["small", "Small"],
                        ["tiny", "Tiny"],
                      ],
                      value: k,
                      onChange: S,
                    }),
                  }),
                  i.jsx(F, {
                    label: "Max height",
                    children: i.jsxs("select", {
                      value: x,
                      onChange: (M) =>
                        d(M.target.value ? Number(M.target.value) : ""),
                      children: [
                        i.jsx("option", { value: "", children: "Keep size" }),
                        i.jsx("option", { value: "1080", children: "1080p" }),
                        i.jsx("option", { value: "720", children: "720p" }),
                        i.jsx("option", { value: "480", children: "480p" }),
                        i.jsx("option", { value: "360", children: "360p" }),
                      ],
                    }),
                  }),
                ],
              }),
            l === "transform" &&
              i.jsxs("div", {
                className: "row",
                children: [
                  i.jsx(F, {
                    label: "Height (px)",
                    children: i.jsx(Se, {
                      value: p.height,
                      onChange: (M) => v((H) => ({ ...H, height: M })),
                      step: 10,
                    }),
                  }),
                  i.jsx(F, {
                    label: "Rotate",
                    children: i.jsxs("select", {
                      value: p.rotate,
                      onChange: (M) =>
                        v((H) => ({ ...H, rotate: Number(M.target.value) })),
                      children: [
                        i.jsx("option", { value: 0, children: "None" }),
                        i.jsx("option", { value: 90, children: "90° right" }),
                        i.jsx("option", { value: 180, children: "180°" }),
                        i.jsx("option", { value: 270, children: "90° left" }),
                      ],
                    }),
                  }),
                  i.jsx(F, {
                    label: "Speed ×",
                    children: i.jsx(Se, {
                      value: p.speed,
                      onChange: (M) => v((H) => ({ ...H, speed: M })),
                      step: 0.25,
                      min: 0.25,
                    }),
                  }),
                  i.jsx(F, {
                    label: "Volume dB",
                    children: i.jsx(Se, {
                      value: p.volume_db,
                      onChange: (M) => v((H) => ({ ...H, volume_db: M })),
                    }),
                  }),
                  i.jsxs("label", {
                    className: "check",
                    style: { alignSelf: "flex-end" },
                    children: [
                      i.jsx("input", {
                        type: "checkbox",
                        checked: p.flip_h,
                        onChange: (M) =>
                          v((H) => ({ ...H, flip_h: M.target.checked })),
                      }),
                      "Mirror",
                    ],
                  }),
                  i.jsxs("label", {
                    className: "check",
                    style: { alignSelf: "flex-end" },
                    children: [
                      i.jsx("input", {
                        type: "checkbox",
                        checked: p.flip_v,
                        onChange: (M) =>
                          v((H) => ({ ...H, flip_v: M.target.checked })),
                      }),
                      "Flip",
                    ],
                  }),
                  i.jsxs("label", {
                    className: "check",
                    style: { alignSelf: "flex-end" },
                    children: [
                      i.jsx("input", {
                        type: "checkbox",
                        checked: p.mute,
                        onChange: (M) =>
                          v((H) => ({ ...H, mute: M.target.checked })),
                      }),
                      "Remove sound",
                    ],
                  }),
                ],
              }),
            l === "audio" &&
              i.jsx(F, {
                label: "Audio format",
                children: i.jsx(de, {
                  options: ["mp3", "wav", "m4a", "flac", "ogg"],
                  value: _,
                  onChange: N,
                }),
              }),
            l === "frame" &&
              i.jsx("p", {
                className: "muted small",
                children:
                  "Pause the video where you want and press the button. The frame is saved as PNG.",
              }),
            i.jsx("div", {
              className: "row end",
              children: i.jsx("button", {
                className: "btn primary",
                disabled: E,
                onClick: he,
                children: "Run",
              }),
            }),
          ],
        }),
      E &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, {
            text: "Processing video… big files can take a while",
          }),
        }),
      i.jsx(rt, {
        files: L,
        onUse: (M) => M.kind === "video" && t([M]),
        useLabel: "Keep editing",
      }),
    ],
  });
}
function bv() {
  const [e, t] = m.useState([]),
    [n, r] = m.useState("mp4"),
    { busy: l, outputs: s, run: a } = xt();
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(ke, {
            multiple: !0,
            value: e,
            onChange: t,
            kind: "video",
            accept: to,
            label: "Add videos in order",
          }),
          i.jsx("p", {
            className: "small muted",
            children: "Videos are fitted to the size of the first one.",
          }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, {
                label: "Format",
                children: i.jsx(de, {
                  options: ["mp4", "mkv", "mov", "webm"],
                  value: n,
                  onChange: r,
                }),
              }),
              i.jsx("span", { className: "spacer" }),
              i.jsx("button", {
                className: "btn primary",
                disabled: l || e.length < 2,
                onClick: () =>
                  a(() =>
                    R("/video/merge", {
                      body: { file_ids: e.map((o) => o.id), format: n },
                    }),
                  ),
                children: "Merge",
              }),
            ],
          }),
        ],
      }),
      l &&
        i.jsx("div", {
          className: "card",
          children: i.jsx(ye, { text: "Merging videos…" }),
        }),
      i.jsx(rt, { files: s }),
    ],
  });
}
function $v() {
  const [e, t] = m.useState([]),
    [n, r] = m.useState([]),
    [l, s] = m.useState("replace"),
    [a, o] = m.useState(0),
    [u, c] = m.useState(!1),
    { busy: f, outputs: h, run: g } = xt();
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("div", {
        className: "grid2",
        children: [
          i.jsxs("div", {
            className: "card",
            children: [
              i.jsx("h3", { children: "Video" }),
              i.jsx(ke, { value: e, onChange: t, kind: "video", accept: to }),
            ],
          }),
          i.jsxs("div", {
            className: "card",
            children: [
              i.jsx("h3", { children: "Music / audio" }),
              i.jsx(ke, {
                value: n,
                onChange: r,
                kind: "audio",
                accept: "audio/*",
              }),
            ],
          }),
        ],
      }),
      i.jsxs("div", {
        className: "card row",
        children: [
          i.jsx(de, {
            options: [
              ["replace", "Replace original sound"],
              ["mix", "Mix with original sound"],
            ],
            value: l,
            onChange: s,
          }),
          i.jsx(F, {
            label: "Music volume dB",
            children: i.jsx(Se, { value: a, onChange: o }),
          }),
          i.jsxs("label", {
            className: "check",
            children: [
              i.jsx("input", {
                type: "checkbox",
                checked: u,
                onChange: (y) => c(y.target.checked),
              }),
              "Loop music if shorter",
            ],
          }),
          i.jsx("span", { className: "spacer" }),
          i.jsx("button", {
            className: "btn primary",
            disabled: f || !e[0] || !n[0],
            onClick: () =>
              g(() =>
                R("/video/add-audio", {
                  body: {
                    video_id: e[0].id,
                    audio_id: n[0].id,
                    mode: l,
                    music_volume_db: a || 0,
                    loop: u,
                  },
                }),
              ),
            children: "Add music",
          }),
        ],
      }),
      f && i.jsx("div", { className: "card", children: i.jsx(ye, {}) }),
      i.jsx(rt, { files: h }),
    ],
  });
}
const Fv = [
  ["", "Keep"],
  ["jpg", "JPG"],
  ["png", "PNG"],
  ["webp", "WEBP"],
  ["avif", "AVIF"],
  ["gif", "GIF"],
  ["bmp", "BMP"],
  ["tiff", "TIFF"],
  ["ico", "ICO"],
  ["pdf", "PDF"],
];
function Iv() {
  const [e, t] = m.useState([]),
    [n, r] = m.useState({
      format: "jpg",
      mode: "none",
      width: "",
      height: "",
      scale_percent: 50,
      quality: 85,
      rotate: 0,
      flip_h: !1,
      flip_v: !1,
      grayscale: !1,
      strip_metadata: !0,
    }),
    l = (f) => (h) => r((g) => ({ ...g, [f]: h })),
    { busy: s, outputs: a, run: o } = xt(),
    u = () =>
      o(() =>
        R("/image/edit", {
          body: {
            file_ids: e.map((f) => f.id),
            format: n.format || null,
            quality: n.quality || 85,
            rotate: n.rotate,
            flip_h: n.flip_h,
            flip_v: n.flip_v,
            grayscale: n.grayscale,
            strip_metadata: n.strip_metadata,
            width: (n.mode === "px" && n.width) || null,
            height: (n.mode === "px" && n.height) || null,
            scale_percent: n.mode === "pct" ? n.scale_percent : null,
          },
        }),
      ),
    c = () =>
      o(() => R("/image/to-pdf", { body: { file_ids: e.map((f) => f.id) } }));
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Images" }),
          i.jsx("p", {
            children:
              "Convert, resize and compress one image or hundreds at once. HEIC from iPhone works too.",
          }),
        ],
      }),
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          multiple: !0,
          value: e,
          onChange: t,
          kind: "image",
          accept: "image/*,.heic,.heif,.avif,.ico,.tif,.tiff",
        }),
      }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(F, {
            label: "Convert to",
            children: i.jsx(de, {
              options: Fv,
              value: n.format,
              onChange: l("format"),
            }),
          }),
          i.jsx(F, {
            label: "Resize",
            children: i.jsx(de, {
              options: [
                ["none", "Keep size"],
                ["pct", "By percent"],
                ["px", "Max width / height"],
              ],
              value: n.mode,
              onChange: l("mode"),
            }),
          }),
          n.mode === "pct" &&
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx("input", {
                  type: "range",
                  min: 5,
                  max: 200,
                  value: n.scale_percent,
                  onChange: (f) => l("scale_percent")(Number(f.target.value)),
                  style: { flex: 1 },
                }),
                i.jsxs("span", { children: [n.scale_percent, "%"] }),
              ],
            }),
          n.mode === "px" &&
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(F, {
                  label: "Max width",
                  children: i.jsx(Se, {
                    value: n.width,
                    onChange: l("width"),
                    step: 10,
                  }),
                }),
                i.jsx(F, {
                  label: "Max height",
                  children: i.jsx(Se, {
                    value: n.height,
                    onChange: l("height"),
                    step: 10,
                  }),
                }),
                i.jsx("span", {
                  className: "small muted",
                  style: { alignSelf: "flex-end" },
                  children: "Keeps proportions",
                }),
              ],
            }),
          i.jsxs("div", {
            className: "row",
            children: [
              i.jsx(F, {
                label: `Quality (JPG/WEBP/AVIF): ${n.quality}`,
                children: i.jsx("input", {
                  type: "range",
                  min: 20,
                  max: 100,
                  value: n.quality,
                  onChange: (f) => l("quality")(Number(f.target.value)),
                }),
              }),
              i.jsx(F, {
                label: "Rotate",
                children: i.jsxs("select", {
                  value: n.rotate,
                  onChange: (f) => l("rotate")(Number(f.target.value)),
                  children: [
                    i.jsx("option", { value: 0, children: "None" }),
                    i.jsx("option", { value: 90, children: "90° right" }),
                    i.jsx("option", { value: 180, children: "180°" }),
                    i.jsx("option", { value: 270, children: "90° left" }),
                  ],
                }),
              }),
              i.jsxs("label", {
                className: "check",
                style: { alignSelf: "flex-end" },
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: n.flip_h,
                    onChange: (f) => l("flip_h")(f.target.checked),
                  }),
                  "Mirror",
                ],
              }),
              i.jsxs("label", {
                className: "check",
                style: { alignSelf: "flex-end" },
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: n.flip_v,
                    onChange: (f) => l("flip_v")(f.target.checked),
                  }),
                  "Flip",
                ],
              }),
              i.jsxs("label", {
                className: "check",
                style: { alignSelf: "flex-end" },
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: n.grayscale,
                    onChange: (f) => l("grayscale")(f.target.checked),
                  }),
                  "Black & white",
                ],
              }),
              i.jsxs("label", {
                className: "check",
                style: { alignSelf: "flex-end" },
                children: [
                  i.jsx("input", {
                    type: "checkbox",
                    checked: n.strip_metadata,
                    onChange: (f) => l("strip_metadata")(f.target.checked),
                  }),
                  "Remove location/camera data",
                ],
              }),
            ],
          }),
          i.jsxs("div", {
            className: "row end",
            children: [
              i.jsx("button", {
                className: "btn",
                disabled: s || !e.length,
                onClick: c,
                children: "Combine into one PDF",
              }),
              i.jsxs("button", {
                className: "btn primary",
                disabled: s || !e.length,
                onClick: u,
                children: [
                  "Process ",
                  e.length > 1 ? `${e.length} images` : "image",
                ],
              }),
            ],
          }),
        ],
      }),
      s && i.jsx("div", { className: "card", children: i.jsx(ye, {}) }),
      i.jsx(rt, { files: a }),
    ],
  });
}
function Av() {
  const [e, t] = m.useState("merge"),
    [n, r] = m.useState([]),
    [l, s] = m.useState(null),
    [a, o] = m.useState(""),
    [u, c] = m.useState("ranges"),
    [f, h] = m.useState(90),
    [g, y] = m.useState(""),
    [k, S] = m.useState(!1),
    [x, d] = m.useState("png"),
    [p, v] = m.useState(150),
    [w, j] = m.useState("docx"),
    { busy: _, outputs: N, run: E } = xt(),
    L = n[0];
  m.useEffect(() => {
    r([]);
  }, [e]),
    m.useEffect(() => {
      s(null),
        L &&
          e !== "merge" &&
          R(`/pdf/${L.id}/info`)
            .then(s)
            .catch(() => {});
    }, [L == null ? void 0 : L.id]);
  const T = () => {
    const b = L == null ? void 0 : L.id;
    E(
      {
        merge: () =>
          R("/pdf/merge", { body: { file_ids: n.map((he) => he.id) } }),
        split: () =>
          R("/pdf/split", { body: { file_id: b, mode: u, ranges: a } }),
        rotate: () =>
          R("/pdf/rotate", { body: { file_id: b, angle: f, ranges: a } }),
        compress: () => R("/pdf/compress", { body: { file_id: b } }),
        protect: () =>
          R("/pdf/protect", { body: { file_id: b, password: g, unlock: k } }),
        images: () =>
          R("/pdf/to-images", {
            body: { file_id: b, format: x, dpi: p, ranges: a },
          }),
        text: () => R("/pdf/to-text", { body: { file_id: b, format: w } }),
      }[e],
    );
  };
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "PDF" }),
          i.jsx("p", {
            children: "Merge, split, rotate, compress, lock and convert PDFs",
          }),
        ],
      }),
      i.jsx(Wr, {
        value: e,
        onChange: t,
        tabs: [
          ["merge", "Merge"],
          ["split", "Split / extract"],
          ["rotate", "Rotate"],
          ["compress", "Compress"],
          ["protect", "Password"],
          ["images", "To images"],
          ["text", "To Word / text"],
        ],
      }),
      i.jsxs("div", {
        className: "card stack",
        children: [
          i.jsx(ke, {
            multiple: e === "merge",
            value: n,
            onChange: r,
            kind: "pdf",
            accept: ".pdf",
            label: e === "merge" ? "Add PDFs in order" : void 0,
          }),
          l &&
            i.jsx("p", {
              className: "small muted",
              children: l.encrypted ? "Password protected" : `${l.pages} pages`,
            }),
          e === "split" &&
            i.jsxs(i.Fragment, {
              children: [
                i.jsx(de, {
                  value: u,
                  onChange: c,
                  options: [
                    ["ranges", "Extract pages into one PDF"],
                    ["each", "One PDF per page"],
                    ["groups", "Several PDFs by groups"],
                  ],
                }),
                i.jsx(F, {
                  label:
                    u === "groups"
                      ? "Groups, separated by ;  e.g. 1-3;4-6;7-"
                      : "Pages, e.g. 1-3,5,8- (empty = all)",
                  children: i.jsx("input", {
                    type: "text",
                    value: a,
                    onChange: (b) => o(b.target.value),
                  }),
                }),
              ],
            }),
          e === "rotate" &&
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(F, {
                  label: "Angle",
                  children: i.jsxs("select", {
                    value: f,
                    onChange: (b) => h(Number(b.target.value)),
                    children: [
                      i.jsx("option", { value: 90, children: "90° right" }),
                      i.jsx("option", { value: 180, children: "180°" }),
                      i.jsx("option", { value: 270, children: "90° left" }),
                    ],
                  }),
                }),
                i.jsx(F, {
                  label: "Pages (empty = all)",
                  style: { flex: 1 },
                  children: i.jsx("input", {
                    type: "text",
                    value: a,
                    onChange: (b) => o(b.target.value),
                  }),
                }),
              ],
            }),
          e === "protect" &&
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(de, {
                  value: k ? "u" : "l",
                  onChange: (b) => S(b === "u"),
                  options: [
                    ["l", "Add password"],
                    ["u", "Remove password"],
                  ],
                }),
                i.jsx(F, {
                  label: "Password",
                  children: i.jsx("input", {
                    type: "password",
                    value: g,
                    onChange: (b) => y(b.target.value),
                  }),
                }),
              ],
            }),
          e === "images" &&
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx(F, {
                  label: "Format",
                  children: i.jsx(de, {
                    options: ["png", "jpg", "webp"],
                    value: x,
                    onChange: d,
                  }),
                }),
                i.jsx(F, {
                  label: "DPI",
                  children: i.jsx(Se, { value: p, onChange: v, step: 50 }),
                }),
                i.jsx(F, {
                  label: "Pages (empty = all)",
                  children: i.jsx("input", {
                    type: "text",
                    value: a,
                    onChange: (b) => o(b.target.value),
                  }),
                }),
              ],
            }),
          e === "text" &&
            i.jsx(F, {
              label: "Save as",
              children: i.jsx(de, {
                options: [
                  ["docx", "Word (.docx)"],
                  ["txt", "Text (.txt)"],
                  ["md", "Markdown"],
                ],
                value: w,
                onChange: j,
              }),
            }),
          e === "compress" &&
            i.jsx("p", {
              className: "small muted",
              children:
                "Lossless clean-up: removes duplicates and compresses page data.",
            }),
          i.jsx("div", {
            className: "row end",
            children: i.jsx("button", {
              className: "btn primary",
              onClick: T,
              disabled: _ || (e === "merge" ? n.length < 2 : !L),
              children: "Run",
            }),
          }),
        ],
      }),
      _ && i.jsx("div", { className: "card", children: i.jsx(ye, {}) }),
      i.jsx(rt, { files: N }),
    ],
  });
}
const Ov = [
    "csv",
    "xlsx",
    "json",
    "jsonl",
    "parquet",
    "tsv",
    "html",
    "md",
    "xml",
  ],
  Dv = ["pdf", "docx", "txt", "md", "html"];
function Bv() {
  const e = Be(),
    [t, n] = m.useState([]),
    r = t[0],
    [l, s] = m.useState(null),
    [a, o] = m.useState("xlsx"),
    [u, c] = m.useState(""),
    [f, h] = m.useState(""),
    { busy: g, outputs: y, run: k } = xt(),
    S = (r == null ? void 0 : r.kind) === "data";
  m.useEffect(() => {
    s(null),
      h(""),
      (r == null ? void 0 : r.kind) === "data" &&
        R(`/data/${r.id}/preview`)
          .then(s)
          .catch((d) => e(d.message, "error")),
      o((r == null ? void 0 : r.kind) === "data" ? "xlsx" : "pdf");
  }, [r == null ? void 0 : r.id]);
  const x = async () => {
    const d = await k(() =>
      R("/data/ai-transform", { body: { file_id: r.id, instruction: u } }),
    );
    d && (h(d.code), n([d.file]));
  };
  return i.jsxs("div", {
    className: "page wide",
    children: [
      i.jsxs("div", {
        className: "page-header",
        children: [
          i.jsx("h2", { children: "Data & Docs" }),
          i.jsx("p", {
            children:
              "Preview and convert spreadsheets, data files and documents.",
          }),
        ],
      }),
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          value: t,
          onChange: n,
          kind: ["data", "document", "pdf"],
          strict: !0,
          accept:
            ".csv,.tsv,.xlsx,.xls,.json,.jsonl,.xml,.parquet,.pkl,.docx,.txt,.md,.html,.pdf",
        }),
      }),
      r &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsx(F, {
              label: "Convert to",
              children: i.jsx(de, {
                options: S
                  ? Ov
                  : Dv.filter((d) => !r.name.toLowerCase().endsWith("." + d)),
                value: a,
                onChange: o,
              }),
            }),
            i.jsx("div", {
              className: "row end",
              children: i.jsx("button", {
                className: "btn primary",
                disabled: g,
                onClick: () =>
                  k(() =>
                    R("/data/convert", { body: { file_id: r.id, format: a } }),
                  ),
                children: "Convert",
              }),
            }),
          ],
        }),
      !1 &&
        i.jsxs("div", {
          className: "card stack",
          children: [
            i.jsxs("h3", {
              children: [
                i.jsx(af, { size: 15, style: { verticalAlign: -2 } }),
                " Clean up with Claude",
              ],
            }),
            i.jsxs("div", {
              className: "row",
              children: [
                i.jsx("input", {
                  type: "text",
                  style: { flex: 1 },
                  value: u,
                  onChange: (d) => c(d.target.value),
                  placeholder:
                    'e.g. "remove duplicate emails, sort by date, add a total column"',
                  onKeyDown: (d) => d.key === "Enter" && u && x(),
                }),
                i.jsx("button", {
                  className: "btn primary",
                  disabled: g || !u,
                  onClick: x,
                  children: "Transform",
                }),
              ],
            }),
            f &&
              i.jsxs("details", {
                children: [
                  i.jsx("summary", {
                    className: "small muted",
                    children: "Code that was run",
                  }),
                  i.jsx("div", { className: "code", children: f }),
                ],
              }),
          ],
        }),
      g && i.jsx("div", { className: "card", children: i.jsx(ye, {}) }),
      i.jsx(rt, { files: y, onUse: (d) => n([d]), useLabel: "Open here" }),
      l &&
        i.jsxs("div", {
          className: "card",
          children: [
            i.jsxs("div", {
              className: "card-title",
              children: [
                i.jsx("h3", { children: "Preview" }),
                i.jsxs("span", {
                  className: "muted small",
                  children: [
                    l.total_rows,
                    " rows · ",
                    l.columns.length,
                    " columns",
                  ],
                }),
              ],
            }),
            i.jsx(Cf, { columns: l.columns, rows: l.rows }),
          ],
        }),
    ],
  });
}
function Uv() {
  const e = Be(),
    [t, n] = m.useState(""),
    [r, l] = m.useState(""),
    [s] = Ja(t || void 0),
    [FD, setFD] = m.useState([]),
    [CF, setCF] = m.useState("__all"),
    loadF = m.useCallback(() => {
      R("/files/folders")
        .then((c) => setFD(c.folders))
        .catch(() => {});
    }, []);
  m.useEffect(
    () => (
      loadF(),
      window.addEventListener("files-changed", loadF),
      () => window.removeEventListener("files-changed", loadF)
    ),
    [loadF],
  );
  const changed = () => window.dispatchEvent(new Event("files-changed")),
    inCF = (c) => CF === "__all" || (CF === "" ? !c.folder : (c.folder || "") === CF || (c.folder || "").startsWith(CF + "/")),
    o = s.filter((c) => (!r || c.name.toLowerCase().includes(r.toLowerCase())) && inCF(c)),
    top = FD.filter((c) => !c.name.includes("/")),
    curTop = CF && CF !== "__all" ? CF.split("/")[0] : "",
    subs = FD.filter((c) => curTop && c.name.startsWith(curTop + "/")),
    isCat = (n) => (FD.find((c) => c.name === n) || {}).category,
    pretty = (n) => n.split("/").join(" › "),
    u = async (c) => {
      const f = c.origin !== "upload";
      if (
        window.confirm(
          f
            ? `Remove "${c.name}" from this list? (The file stays in your Documents folder.)`
            : `Delete uploaded copy of "${c.name}"?`,
        )
      )
        try {
          await R(`/files/${c.id}`, { method: "DELETE" }), changed();
        } catch (h) {
          e(h.message, "error");
        }
    },
    newFolder = async (moveId) => {
      const name = window.prompt("New folder name:");
      if (!name || !name.trim()) return null;
      try {
        const c = await R("/files/folders", { body: { name } });
        setFD(c.folders);
        if (!moveId) setCF(c.name);
        return c.name;
      } catch (c) {
        e(c.message, "error");
        return null;
      }
    },
    renameFolder = async () => {
      const name = window.prompt(`Rename folder "${CF}" to:`, CF);
      if (!name || name === CF) return;
      try {
        const c = await R("/files/folders/rename", { body: { name: CF, new_name: name } });
        setCF(c.name), changed();
      } catch (c) {
        e(c.message, "error");
      }
    },
    deleteFolder = async () => {
      if (!window.confirm(`Delete folder "${CF}"? Its files are kept and move back to "No folder".`)) return;
      try {
        await R("/files/folders/delete", { body: { name: CF } });
        setCF("__all"), changed();
      } catch (c) {
        e(c.message, "error");
      }
    },
    move = async (c, to) => {
      if (to === "__new") {
        to = await newFolder(c.id);
        if (to == null) return;
      }
      try {
        await R(`/files/${c.id}/move`, { body: { folder: to } });
        e(to ? `Moved to ${to}` : "Moved out of folder"), changed();
      } catch (h) {
        e(h.message, "error");
      }
    },
    rename = async (c) => {
      const name = window.prompt("Rename file:", c.name);
      if (!name || name === c.name) return;
      try {
        await R(`/files/${c.id}/rename`, { body: { name } }), changed();
      } catch (h) {
        e(h.message, "error");
      }
    },
    uploaded = async (list) => {
      if (CF !== "__all" && CF !== "")
        for (const c of list) await R(`/files/${c.id}/move`, { body: { folder: CF } }).catch(() => {});
      changed();
    },
    noFolder = s.filter((c) => !c.folder).length;
  return i.jsxs("div", {
    className: "page",
    children: [
      i.jsxs("div", {
        className: "page-header row",
        children: [
          i.jsxs("div", {
            children: [
              i.jsx("h2", { children: "My Files" }),
              i.jsx("p", { children: "Everything you've uploaded or created, sorted into folders" }),
            ],
          }),
          i.jsx("span", { className: "spacer" }),
          i.jsxs("button", {
            className: "btn pc-only",
            onClick: () => R("/files/open-output-folder", { body: {} }),
            children: [i.jsx(ks, {}), "Open output folder"],
          }),
        ],
      }),
      i.jsxs("div", {
        className: "folder-bar",
        children: [
          i.jsx("button", {
            className: `folder-chip ${CF === "__all" ? "active" : ""}`,
            onClick: () => setCF("__all"),
            children: "All files",
          }),
          i.jsxs("button", {
            className: `folder-chip ${CF === "" ? "active" : ""}`,
            onClick: () => setCF(""),
            children: ["No folder ", i.jsx("span", { className: "muted", children: noFolder })],
          }),
          top.map((c) =>
            i.jsxs(
              "button",
              {
                className: `folder-chip ${curTop === c.name ? "active" : ""} ${c.category ? "cat" : ""}`,
                onClick: () => setCF(c.name),
                children: ["📁 ", c.name, " ", i.jsx("span", { className: "muted", children: c.total })],
              },
              c.name,
            ),
          ),
          i.jsx("button", {
            className: "folder-chip add",
            onClick: () => newFolder(),
            children: "+ New folder",
          }),
        ],
      }),
      subs.length > 0 &&
        i.jsxs("div", {
          className: "folder-bar sub",
          children: [
            i.jsxs("button", {
              className: `folder-chip ${CF === curTop ? "active" : ""}`,
              onClick: () => setCF(curTop),
              children: ["All of ", curTop],
            }),
            subs.map((c) =>
              i.jsxs(
                "button",
                {
                  className: `folder-chip ${CF === c.name ? "active" : ""}`,
                  onClick: () => setCF(c.name),
                  children: ["📂 ", c.name.slice(curTop.length + 1).split("/").join(" › "), " ", i.jsx("span", { className: "muted", children: c.total })],
                },
                c.name,
              ),
            ),
            i.jsx("button", {
              className: "folder-chip add",
              onClick: async () => {
                const nm = window.prompt(`New folder inside "${pretty(CF)}":`);
                if (!nm || !nm.trim()) return;
                try {
                  const c = await R("/files/folders", { body: { name: CF + "/" + nm } });
                  setFD(c.folders), setCF(c.name);
                } catch (x) {
                  e(x.message, "error");
                }
              },
              children: "+ Sub-folder",
            }),
          ],
        }),
      CF !== "__all" &&
        CF !== "" &&
        i.jsxs("div", {
          className: "row",
          style: { marginBottom: 10 },
          children: [
            i.jsxs("b", { children: ["📁 ", pretty(CF)] }),
            subs.length === 0 &&
              i.jsx("button", {
                className: "btn sm ghost",
                onClick: async () => {
                  const nm = window.prompt(`New folder inside "${pretty(CF)}":`);
                  if (!nm || !nm.trim()) return;
                  try {
                    const c = await R("/files/folders", { body: { name: CF + "/" + nm } });
                    setFD(c.folders), setCF(c.name);
                  } catch (x) {
                    e(x.message, "error");
                  }
                },
                children: "+ Sub-folder",
              }),
            i.jsx("span", { className: "spacer" }),
            !isCat(CF) && i.jsx("button", { className: "btn sm", onClick: renameFolder, children: "Rename folder" }),
            !isCat(CF) && i.jsx("button", { className: "btn sm", onClick: deleteFolder, children: "Delete folder" }),
          ],
        }),
      i.jsx("div", {
        className: "card",
        children: i.jsx(ke, {
          multiple: !0,
          value: [],
          onChange: uploaded,
          label:
            CF !== "__all" && CF !== ""
              ? `Drop files here to add them to "${CF}"`
              : "Drop files here to add them to your workspace",
        }),
      }),
      i.jsxs("div", {
        className: "row",
        style: { marginBottom: 6 },
        children: [
          i.jsx(de, {
            value: t,
            onChange: n,
            options: [
              ["", "All"],
              ["audio", "Audio"],
              ["video", "Video"],
              ["image", "Images"],
              ["pdf", "PDF"],
              ["data", "Data"],
              ["document", "Docs"],
              ["other", "Other"],
            ],
          }),
          i.jsx("span", { className: "spacer" }),
          i.jsx("input", {
            type: "text",
            placeholder: "Search…",
            value: r,
            onChange: (c) => l(c.target.value),
          }),
        ],
      }),
      o.length === 0 &&
        i.jsx("p", { className: "muted", children: "No files here yet." }),
      o.map((c) =>
        i.jsx(
          Hr,
          {
            file: c,
            onDelete: u,
            extra: i.jsxs(i.Fragment, {
              children: [
                i.jsx("button", {
                  className: "btn sm",
                  onClick: () => rename(c),
                  title: "Rename",
                  children: "✎",
                }),
                i.jsxs("select", {
                  className: "move-select",
                  value: "__x",
                  title: "Move to folder",
                  onChange: (h) => move(c, h.target.value),
                  children: [
                    i.jsx("option", { value: "__x", disabled: !0, children: c.folder ? `📁 ${pretty(c.folder)}` : "Move to…" }),
                    c.folder && i.jsx("option", { value: "", children: "No folder" }),
                    FD.filter((h) => h.name !== c.folder && h.name !== "History").map((h) =>
                      i.jsx("option", { value: h.name, children: pretty(h.name) }, h.name),
                    ),
                    i.jsx("option", { value: "__new", children: "+ New folder…" }),
                  ],
                }),
              ],
            }),
          },
          c.id,
        ),
      ),
    ],
  });
}
function Vv() {
  const e = Be(),
    t = ys(),
    [n, r] = m.useState(null),
    [l, s] = m.useState([]),
    [a, o] = m.useState(null),
    [u, c] = m.useState([]),
    [f, h] = m.useState(null),
    [g, y] = m.useState(""),
    [k, S] = m.useState(null),
    [x, d] = m.useState(!1),
    [p, v] = m.useState("xlsx"),
    [w, j] = m.useState(""),
    [_, N] = m.useState(""),
    [E, L] = m.useState([]),
    [T, b] = m.useState(null),
    { busy: ie, outputs: he, run: M } = xt();
  m.useEffect(() => {
    R("/airtable/status").then((C) => {
      r(C),
        C.connected &&
          R("/airtable/bases")
            .then(($) => s($.bases))
            .catch(($) => e($.message, "error"));
    });
  }, []);
  const H = async (C) => {
      o(C), h(null), S(null), c([]);
      try {
        c((await R(`/airtable/bases/${C.id}/tables`)).tables);
      } catch ($) {
        e($.message, "error");
      }
    },
    Me = async (C = f, $ = g) => {
      d(!0), N("");
      try {
        S(
          await R(
            `/airtable/bases/${a.id}/tables/${C.id}/records?max_records=500${$ ? `&view=${$}` : ""}`,
          ),
        );
      } catch (I) {
        e(I.message, "error");
      }
      d(!1);
    },
    we = (C) => {
      h(C), y(""), b(null), Me(C, "");
    };
  return n
    ? n.connected
      ? i.jsxs("div", {
          className: "page wide",
          children: [
            i.jsxs("div", {
              className: "page-header",
              children: [
                i.jsx("h2", { children: "Airtable" }),
                i.jsx("p", {
                  children: "Browse, export, import and analyse your bases",
                }),
              ],
            }),
            i.jsxs("div", {
              className: "two-col",
              children: [
                i.jsxs("div", {
                  className: "card",
                  children: [
                    i.jsx("h3", { children: "Bases" }),
                    l.map((C) =>
                      i.jsx(
                        "div",
                        {
                          className: `list-item ${(a == null ? void 0 : a.id) === C.id ? "active" : ""}`,
                          onClick: () => H(C),
                          children: i.jsx("div", {
                            className: "t",
                            children: C.name,
                          }),
                        },
                        C.id,
                      ),
                    ),
                    a &&
                      i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("h3", {
                            style: { marginTop: 14 },
                            children: "Tables",
                          }),
                          u.map((C) =>
                            i.jsxs(
                              "div",
                              {
                                className: `list-item ${(f == null ? void 0 : f.id) === C.id ? "active" : ""}`,
                                onClick: () => we(C),
                                children: [
                                  i.jsx("div", {
                                    className: "t",
                                    children: C.name,
                                  }),
                                  i.jsxs("div", {
                                    className: "m",
                                    children: [C.fields.length, " fields"],
                                  }),
                                ],
                              },
                              C.id,
                            ),
                          ),
                        ],
                      }),
                  ],
                }),
                i.jsxs("div", {
                  children: [
                    !f &&
                      i.jsx("div", {
                        className: "card muted",
                        children: "Pick a base and a table.",
                      }),
                    f &&
                      i.jsxs(i.Fragment, {
                        children: [
                          i.jsxs("div", {
                            className: "card",
                            children: [
                              i.jsxs("div", {
                                className: "card-title",
                                children: [
                                  i.jsx("h3", { children: f.name }),
                                  i.jsxs("div", {
                                    className: "row",
                                    children: [
                                      f.views.length > 0 &&
                                        i.jsxs("select", {
                                          value: g,
                                          onChange: (C) => {
                                            y(C.target.value),
                                              Me(f, C.target.value);
                                          },
                                          children: [
                                            i.jsx("option", {
                                              value: "",
                                              children: "All records",
                                            }),
                                            f.views.map((C) =>
                                              i.jsx(
                                                "option",
                                                {
                                                  value: C.id,
                                                  children: C.name,
                                                },
                                                C.id,
                                              ),
                                            ),
                                          ],
                                        }),
                                      i.jsxs("button", {
                                        className: "btn sm",
                                        onClick: () => Me(),
                                        children: [i.jsx(Tg, {}), "Refresh"],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              x
                                ? i.jsx(ye, { text: "Loading records…" })
                                : k &&
                                  i.jsxs(i.Fragment, {
                                    children: [
                                      i.jsxs("p", {
                                        className: "small muted",
                                        children: [
                                          k.total,
                                          " records",
                                          k.total >= 500
                                            ? " (first 500 shown; export gets everything)"
                                            : "",
                                        ],
                                      }),
                                      i.jsx(Cf, {
                                        columns: k.columns,
                                        rows: k.rows,
                                      }),
                                    ],
                                  }),
                            ],
                          }),
                          i.jsxs("div", {
                            className: "grid2",
                            children: [
                              i.jsxs("div", {
                                className: "card stack",
                                children: [
                                  i.jsxs("h3", {
                                    children: [
                                      i.jsx(mg, {
                                        size: 15,
                                        style: { verticalAlign: -2 },
                                      }),
                                      " Export",
                                    ],
                                  }),
                                  i.jsx(de, {
                                    options: ["xlsx", "csv", "json", "parquet"],
                                    value: p,
                                    onChange: v,
                                  }),
                                  i.jsx("div", {
                                    children: i.jsx("button", {
                                      className: "btn primary",
                                      disabled: ie,
                                      onClick: () =>
                                        M(() =>
                                          R("/airtable/export", {
                                            body: {
                                              base_id: a.id,
                                              table: f.id,
                                              table_name: f.name,
                                              format: p,
                                              view: g || null,
                                            },
                                          }),
                                        ),
                                      children: "Export table",
                                    }),
                                  }),
                                ],
                              }),
                              i.jsxs("div", {
                                className: "card stack",
                                children: [
                                  i.jsxs("h3", {
                                    children: [
                                      i.jsx(uf, {
                                        size: 15,
                                        style: { verticalAlign: -2 },
                                      }),
                                      " Import rows from a file",
                                    ],
                                  }),
                                  i.jsx(ke, {
                                    value: E,
                                    onChange: L,
                                    kind: "data",
                                    accept: ".csv,.xlsx,.xls,.json,.tsv",
                                    label:
                                      "CSV / Excel with column names matching the fields",
                                  }),
                                  i.jsx("div", {
                                    children: i.jsx("button", {
                                      className: "btn primary",
                                      disabled: ie || !E[0],
                                      onClick: async () => {
                                        const C = await M(() =>
                                          R("/airtable/import", {
                                            body: {
                                              base_id: a.id,
                                              table: f.id,
                                              file_id: E[0].id,
                                            },
                                          }),
                                        );
                                        C &&
                                          (b(C),
                                          Me(),
                                          e(`Created ${C.created} records`));
                                      },
                                      children: "Import",
                                    }),
                                  }),
                                  T &&
                                    i.jsxs("p", {
                                      className: "small",
                                      children: [
                                        "Created ",
                                        T.created,
                                        " · matched: ",
                                        T.matched_columns.join(", "),
                                        T.skipped_columns.length
                                          ? ` · skipped: ${T.skipped_columns.join(", ")}`
                                          : "",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            className: "card stack",
                            children: [
                              i.jsxs("h3", {
                                children: [
                                  i.jsx(af, {
                                    size: 15,
                                    style: { verticalAlign: -2 },
                                  }),
                                  " Ask Claude about this table",
                                ],
                              }),
                              i.jsxs("div", {
                                className: "row",
                                children: [
                                  i.jsx("input", {
                                    type: "text",
                                    style: { flex: 1 },
                                    value: w,
                                    onChange: (C) => j(C.target.value),
                                    placeholder:
                                      "e.g. Which leads haven't been contacted? What's the total by status?",
                                  }),
                                  i.jsx("button", {
                                    className: "btn primary",
                                    disabled: ie,
                                    onClick: async () => {
                                      const C = await M(() =>
                                        R("/airtable/analyse", {
                                          body: {
                                            base_id: a.id,
                                            table: f.id,
                                            table_name: f.name,
                                            question: w || void 0,
                                          },
                                        }),
                                      );
                                      C && N(C.result);
                                    },
                                    children: "Ask",
                                  }),
                                ],
                              }),
                              _ && i.jsx(Ss, { text: _ }),
                              i.jsx("p", {
                                className: "small muted",
                                children:
                                  'To change records with plain English, use the Assistant: "In my Leads table, mark everyone from London as Contacted".',
                              }),
                            ],
                          }),
                          ie &&
                            i.jsx("div", {
                              className: "card",
                              children: i.jsx(ye, {}),
                            }),
                          i.jsx(rt, { files: he }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
          ],
        })
      : i.jsxs("div", {
          className: "page",
          children: [
            i.jsx("div", {
              className: "page-header",
              children: i.jsx("h2", { children: "Airtable" }),
            }),
            i.jsxs("div", {
              className: "card stack",
              children: [
                i.jsxs("p", {
                  children: [
                    "Connect your Airtable account with a ",
                    i.jsx("b", { children: "Personal Access Token" }),
                    ".",
                  ],
                }),
                i.jsxs("ol", {
                  className: "small",
                  children: [
                    i.jsxs("li", {
                      children: [
                        "Open ",
                        i.jsx("b", { children: "airtable.com/create/tokens" }),
                        " and click ",
                        i.jsx("b", { children: "Create token" }),
                        ".",
                      ],
                    }),
                    i.jsxs("li", {
                      children: [
                        "Add scopes: ",
                        i.jsx("code", { children: "data.records:read" }),
                        ", ",
                        i.jsx("code", { children: "data.records:write" }),
                        ", ",
                        i.jsx("code", { children: "schema.bases:read" }),
                        ".",
                      ],
                    }),
                    i.jsx("li", {
                      children:
                        "Under Access, add the bases you want (or all).",
                    }),
                    i.jsx("li", {
                      children: "Copy the token and paste it in Settings.",
                    }),
                  ],
                }),
                n.error && i.jsx("p", { className: "err", children: n.error }),
                i.jsx("div", {
                  children: i.jsx("button", {
                    className: "btn primary",
                    onClick: () => t("/settings"),
                    children: "Go to Settings",
                  }),
                }),
              ],
            }),
          ],
        })
    : i.jsx("div", {
        className: "page",
        children: i.jsx(ye, { text: "Connecting…" }),
      });
}
const Eu = [
  ["claude-sonnet-5-5", "Sonnet 5.5 — fast and smart, best everyday choice"],
  ["claude-opus-5-5", "Opus 5.5 — top quality for long, complex work"],
  ["claude-fable-5-1", "Fable 5.1 — deepest reasoning, slowest, most expensive"],
  ["claude-haiku-5-5", "Haiku 5.5 — fastest and cheapest"],
];
function Hv() {
  const e = Be(),
    [t, n] = m.useState(null),
    [r, l] = m.useState(""),
    [s, a] = m.useState(""),
    [o, u] = m.useState(""),
    [c, f] = m.useState(""),
    [h, g] = m.useState(""),
    [y, k] = m.useState("base"),
    [S, x] = m.useState(null),
    [d, p] = m.useState(""),
    [EF, setEF] = m.useState(""),
    [PF, setPF] = m.useState(""),
    v = () =>
      R("/settings").then((N) => {
        n(N),
          setEF(N.effort || ""),
          setPF(N.profile || ""),
          g(N.output_dir),
          k(N.whisper_model),
          Eu.some((E) => E[0] === N.model)
            ? (u(N.model), f(""))
            : (u("custom"), f(N.model));
      });
  m.useEffect(() => {
    v(), R("/status").then(x);
  }, []);
  const w = async (N = {}) => {
      const E = {
        model: o === "custom" ? c : o,
        output_dir: h,
        whisper_model: y,
        effort: EF,
        profile: PF,
        ...N,
      };
      r && (E.anthropic_api_key = r), s && (E.airtable_token = s);
      try {
        await R("/settings", { body: E }),
          l(""),
          a(""),
          await v(),
          e("Settings saved");
      } catch (L) {
        e(L.message, "error");
      }
    },
    j = async () => {
      p("claude"), await w();
      const N = await R("/settings/test-claude", { body: {} });
      p(""),
        e(
          N.ok ? `Claude works (${N.model})` : N.error,
          N.ok ? "info" : "error",
        );
    },
    _ = async () => {
      p("at"), await w();
      const N = await R("/airtable/status");
      p(""),
        e(
          N.connected
            ? `Airtable connected: ${N.bases} bases`
            : N.error || "Not connected",
          N.connected ? "info" : "error",
        );
    };
  return t
    ? i.jsxs("div", {
        className: "page",
        children: [
          i.jsxs("div", {
            className: "page-header",
            children: [
              i.jsx("h2", { children: "Settings" }),
              i.jsx("p", { children: "Where your files go and how the app starts." }),
            ],
          }),
          !TB_REMOTE && i.jsx(AppSettings, {}),
          i.jsxs("div", {
            className: "card stack",
            children: [
              i.jsx("h3", { children: "Files" }),
              i.jsx(F, {
                label: "Save results to",
                children: i.jsx("input", {
                  type: "text",
                  value: h,
                  onChange: (N) => g(N.target.value),
                }),
              }),
              i.jsx(F, {
                label: "Default lyrics transcription accuracy",
                children: i.jsxs("select", {
                  value: y,
                  onChange: (N) => k(N.target.value),
                  children: [
                    i.jsx("option", {
                      value: "tiny",
                      children: "Fastest (tiny)",
                    }),
                    i.jsx("option", {
                      value: "base",
                      children: "Balanced (base)",
                    }),
                    i.jsx("option", {
                      value: "small",
                      children: "Better (small)",
                    }),
                    i.jsx("option", {
                      value: "medium",
                      children: "Best (medium)",
                    }),
                  ],
                }),
              }),
              i.jsxs("div", {
                className: "row end",
                children: [
                  i.jsx("button", {
                    className: "btn pc-only",
                    onClick: () => R("/open-data-folder", { body: {} }),
                    children: "Open app data folder",
                  }),
                  i.jsx("button", {
                    className: "btn primary",
                    onClick: () => w(),
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
          S &&
            i.jsxs("div", {
              className: "card small",
              children: [
                i.jsx("h3", { children: "System" }),
                i.jsxs("div", { children: ["Version ", t.version] }),
                i.jsxs("div", { children: ["ffmpeg: ", S.ffmpeg] }),
                i.jsxs("div", {
                  children: [
                    "Downloaded transcription models: ",
                    S.whisper_models.length
                      ? S.whisper_models.join(", ")
                      : "none yet",
                  ],
                }),
                i.jsxs("div", {
                  className: "muted",
                  children: ["App data: ", t.data_dir],
                }),
              ],
            }),
        ],
      })
    : i.jsx("div", { className: "page", children: i.jsx(ye, {}) });
}
const Wv = [
  ["Main", [["/", "Home", jg], ["/mail", "Email", IcMail], ["/news", "News & Weather", IcNews], ["/files", "My Files", ks]]],
  ["Music & Video", [["/audio", "Audio Studio", Jd], ["/lyrics", "Lyrics", sf], ["/video", "Video", nf]]],
  ["Files", [["/images", "Images", lf], ["/pdf", "PDF", Zl], ["/data", "Data & Docs", of], ["/batch", "Batch", IcLayers]]],
  ["Tools", [["/tools", "Quick Tools", IcTools]]],
  ["App", [["/devices", "Devices", IcDevices], ["/backup", "Backup", IcDrive], ["/history", "History", IcHist], ["/settings", "Settings", bg]]],
];
function Qv() {
  const [navOpen, setNavOpen] = m.useState(!1);
  m.useEffect(() => {
    const c = () => setNavOpen(!1);
    window.addEventListener("tb-nav", c);
    return () => window.removeEventListener("tb-nav", c);
  }, []);
  m.useEffect(() => {
    const t = () => fetch("/api/heartbeat", { method: "POST" }).catch(() => {});
    t();
    const n = setInterval(t, 2e4);
    return () => clearInterval(n);
  }, []);
  const e = async () => {
    window.confirm("Close Toolbit?") &&
      (await R("/quit", { body: {} }).catch(() => {}),
      window.close(),
      (document.body.innerHTML =
        '<p style="font-family:sans-serif;padding:40px">Toolbit has stopped. You can close this window.</p>'));
  };
  return i.jsx(hv, {
    children: i.jsxs("div", {
      className: "layout",
      children: [
        i.jsx(MobileBar, { onMenu: () => setNavOpen(!navOpen) }),
        navOpen && i.jsx("div", { className: "nav-backdrop", onClick: () => setNavOpen(!1) }),
        i.jsxs("aside", {
          className: `sidebar ${navOpen ? "open" : ""}`,
          onClick: (ev) => ev.target.closest && ev.target.closest("a") && setNavOpen(!1),
          children: [
            i.jsxs("div", {
              className: "brand",
              children: [
                i.jsx("img", { src: "/icon.svg", alt: "" }),
                i.jsxs("div", {
                  children: [
                    i.jsx("b", { children: "Toolbit" }),
                    i.jsx("small", { children: "Files & media · v3.3.1" }),
                  ],
                }),
              ],
            }),
            i.jsx(NavSections, { sections: TB_REMOTE ? Wv.map(([t, l]) => [t, l.filter(([to]) => !PC_PAGES.includes(to))]) : Wv }),
            i.jsx(FocusHost, {}),
            i.jsx(FocusMini, {}),
            i.jsx("div", {
              className: "sidebar-foot",
              children: i.jsxs(i.Fragment, { children: [
                i.jsxs("button", {
                  className: "nav-item",
                  style: { width: "100%", border: "none", background: "none", cursor: "pointer" },
                  onClick: () => window.dispatchEvent(new Event("open-quickjump")),
                  children: ["🔎 Jump to…", i.jsx("span", { className: "kbd", children: "Ctrl K" })],
                }),
                i.jsx(ThemeToggle, {}),
                i.jsxs("button", {
                style: {
                  width: "100%",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                },
                onClick: e,
                className: "nav-item pc-only",
                children: [i.jsx(Pg, {}), "Quit"],
              }),
              ] }),
            }),
            i.jsx(QuickJump, {
              items: [
                ...Wv.flatMap(([g, l]) => l.map(([to, label]) => ({ to, label, hint: g }))),
                { to: "/audio", label: "Split a mix into songs", hint: "Audio Studio" },
                { to: "/lyrics", label: "Find lyrics for a song", hint: "Lyrics" },
                { to: "/backup", label: "Back up to USB", hint: "Backup" },
                ...[
                  ["/pdf", "Merge PDFs", "PDF · combine join"], ["/pdf", "Split a PDF", "PDF · pages extract"],
                  ["/pdf", "Compress a PDF", "PDF · smaller shrink"], ["/pdf", "PDF to Word", "PDF · docx text"],
                  ["/pdf", "Password-protect a PDF", "PDF · lock"], ["/images", "Resize / compress images", "Images · smaller jpg png webp"],
                  ["/images", "Images to one PDF", "Images · pdf"], ["/video", "Make a GIF from a video", "Video · gif"],
                  ["/video", "Compress a video", "Video · smaller shrink"], ["/video", "Extract audio from a video", "Video · mp3"],
                  ["/audio", "Cut / trim a song", "Audio Studio · cut"], ["/audio", "Merge songs", "Audio Studio · join combine"],
                  ["/audio", "Convert audio", "Audio Studio · mp3 wav m4a flac"], ["/data", "Excel / CSV / JSON convert", "Data & Docs · table"],
                  ["/batch", "Rename many files", "Batch · rename"], ["/batch", "Zip files", "Batch · zip archive"],
                  ["/mail", "Write an email", "Email · compose send"],
                ].map(([to, label, hint]) => ({ to, label, hint })),
                ...TOOLS.map(([id, ic, name, desc]) => ({ to: `/tools?t=${id}`, label: `${ic} ${name}`, hint: desc })),
              ],
            }),
          ],
        }),
        i.jsxs("main", {
          className: "main",
          children: [i.jsx(UpdateBanner, {}), i.jsxs(Qm, {
            children: [
              i.jsx(_e, { path: "/", element: i.jsx(gv, {}) }),
              i.jsx(_e, { path: "/audio", element: i.jsx(Sv, {}) }),
              i.jsx(_e, { path: "/lyrics", element: i.jsx(Pv, {}) }),
              i.jsx(_e, { path: "/video", element: i.jsx(Lv, {}) }),
              i.jsx(_e, { path: "/images", element: i.jsx(Iv, {}) }),
              i.jsx(_e, { path: "/pdf", element: i.jsx(Av, {}) }),
              i.jsx(_e, { path: "/data", element: i.jsx(Bv, {}) }),
              i.jsx(_e, { path: "/files", element: i.jsx(Uv, {}) }),
              i.jsx(_e, { path: "/settings", element: TB_REMOTE ? i.jsx(PcOnly, {}) : i.jsx(Hv, {}) }),
              i.jsx(_e, { path: "/history", element: i.jsx(HistoryPage, {}) }),
              i.jsx(_e, { path: "/backup", element: TB_REMOTE ? i.jsx(PcOnly, {}) : i.jsx(BackupPage, {}) }),
              i.jsx(_e, { path: "/tools", element: i.jsx(ToolsPage, {}) }),
              i.jsx(_e, { path: "/mail", element: i.jsx(MailPage, {}) }),
              i.jsx(_e, { path: "/news", element: i.jsx(NewsPage, {}) }),
              i.jsx(_e, { path: "/devices", element: i.jsx(DevicesPage, {}) }),
              i.jsx(_e, { path: "*", element: i.jsx(gv, {}) }),
              i.jsx(_e, { path: "/batch", element: i.jsx(BatchPage, {}) }),
            ],
          })],
        }),
      ],
    }),
  });
}
Od(document.getElementById("root")).render(
  i.jsx(tg, { children: i.jsx(Qv, {}) }),
);
