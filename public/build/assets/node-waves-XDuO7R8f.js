import {
  c as g,
  g as X
} from "./_commonjsHelpers-BosuxZz1.js";
var A = {
  exports: {}
};
/*!
 * Waves v0.7.6
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
(function (C, D) {
  (function (f, p) {
    C.exports = p.call(f)
  })(typeof g == "object" ? g : g, function () {
    var f = f || {},
      p = document.querySelectorAll.bind(document),
      y = Object.prototype.toString,
      h = "ontouchstart" in window;

    function N(t) {
      return t !== null && t === t.window
    }

    function T(t) {
      return N(t) ? t : t.nodeType === 9 && t.defaultView
    }

    function b(t) {
      var e = typeof t;
      return e === "function" || e === "object" && !!t
    }

    function W(t) {
      return b(t) && t.nodeType > 0
    }

    function m(t) {
      var e = y.call(t);
      return e === "[object String]" ? p(t) : b(t) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(e) && t.hasOwnProperty("length") ? t : W(t) ? [t] : []
    }

    function E(t) {
      var e, a, r = {
          top: 0,
          left: 0
        },
        n = t && t.ownerDocument;
      return e = n.documentElement, typeof t.getBoundingClientRect < "u" && (r = t.getBoundingClientRect()), a = T(n), {
        top: r.top + a.pageYOffset - e.clientTop,
        left: r.left + a.pageXOffset - e.clientLeft
      }
    }

    function w(t) {
      var e = "";
      for (var a in t) t.hasOwnProperty(a) && (e += a + ":" + t[a] + ";");
      return e
    }
    var o = {
        duration: 750,
        delay: 200,
        show: function (t, e, a) {
          if (t.button === 2) return !1;
          e = e || this;
          var r = document.createElement("div");
          r.className = "waves-ripple waves-rippling", e.appendChild(r);
          var n = E(e),
            i = 0,
            s = 0;
          "touches" in t && t.touches.length ? (i = t.touches[0].pageY - n.top, s = t.touches[0].pageX - n.left) : (i = t.pageY - n.top, s = t.pageX - n.left), s = s >= 0 ? s : 0, i = i >= 0 ? i : 0;
          var c = "scale(" + e.clientWidth / 100 * 3 + ")",
            l = "translate(0,0)";
          a && (l = "translate(" + a.x + "px, " + a.y + "px)"), r.setAttribute("data-hold", Date.now()), r.setAttribute("data-x", s), r.setAttribute("data-y", i), r.setAttribute("data-scale", c), r.setAttribute("data-translate", l);
          var u = {
            top: i + "px",
            left: s + "px"
          };
          r.classList.add("waves-notransition"), r.setAttribute("style", w(u)), r.classList.remove("waves-notransition"), u["-webkit-transform"] = c + " " + l, u["-moz-transform"] = c + " " + l, u["-ms-transform"] = c + " " + l, u["-o-transform"] = c + " " + l, u.transform = c + " " + l, u.opacity = "1";
          var v = t.type === "mousemove" ? 2500 : o.duration;
          u["-webkit-transition-duration"] = v + "ms", u["-moz-transition-duration"] = v + "ms", u["-o-transition-duration"] = v + "ms", u["transition-duration"] = v + "ms", r.setAttribute("style", w(u))
        },
        hide: function (t, e) {
          e = e || this;
          for (var a = e.getElementsByClassName("waves-rippling"), r = 0, n = a.length; r < n; r++) S(t, e, a[r]);
          h && (e.removeEventListener("touchend", o.hide), e.removeEventListener("touchcancel", o.hide)), e.removeEventListener("mouseup", o.hide), e.removeEventListener("mouseleave", o.hide)
        }
      },
      k = {
        input: function (t) {
          var e = t.parentNode;
          if (!(e.tagName.toLowerCase() === "i" && e.classList.contains("waves-effect"))) {
            var a = document.createElement("i");
            a.className = t.className + " waves-input-wrapper", t.className = "waves-button-input", e.replaceChild(a, t), a.appendChild(t);
            var r = window.getComputedStyle(t, null),
              n = r.color,
              i = r.backgroundColor;
            a.setAttribute("style", "color:" + n + ";background:" + i), t.setAttribute("style", "background-color:rgba(0,0,0,0);")
          }
        },
        img: function (t) {
          var e = t.parentNode;
          if (!(e.tagName.toLowerCase() === "i" && e.classList.contains("waves-effect"))) {
            var a = document.createElement("i");
            e.replaceChild(a, t), a.appendChild(t)
          }
        }
      };

    function S(t, e, a) {
      if (a) {
        a.classList.remove("waves-rippling");
        var r = a.getAttribute("data-x"),
          n = a.getAttribute("data-y"),
          i = a.getAttribute("data-scale"),
          s = a.getAttribute("data-translate"),
          c = Date.now() - Number(a.getAttribute("data-hold")),
          l = 350 - c;
        l < 0 && (l = 0), t.type === "mousemove" && (l = 150);
        var u = t.type === "mousemove" ? 2500 : o.duration;
        setTimeout(function () {
          var v = {
            top: n + "px",
            left: r + "px",
            opacity: "0",
            "-webkit-transition-duration": u + "ms",
            "-moz-transition-duration": u + "ms",
            "-o-transition-duration": u + "ms",
            "transition-duration": u + "ms",
            "-webkit-transform": i + " " + s,
            "-moz-transform": i + " " + s,
            "-ms-transform": i + " " + s,
            "-o-transform": i + " " + s,
            transform: i + " " + s
          };
          a.setAttribute("style", w(v)), setTimeout(function () {
            try {
              e.removeChild(a)
            } catch {
              return !1
            }
          }, u)
        }, l)
      }
    }
    var d = {
      touches: 0,
      allowEvent: function (t) {
        var e = !0;
        return /^(mousedown|mousemove)$/.test(t.type) && d.touches && (e = !1), e
      },
      registerEvent: function (t) {
        var e = t.type;
        e === "touchstart" ? d.touches += 1 : /^(touchend|touchcancel)$/.test(e) && setTimeout(function () {
          d.touches && (d.touches -= 1)
        }, 500)
      }
    };

    function O(t) {
      if (d.allowEvent(t) === !1) return null;
      for (var e = null, a = t.target || t.srcElement; a.parentElement;) {
        if (!(a instanceof SVGElement) && a.classList.contains("waves-effect")) {
          e = a;
          break
        }
        a = a.parentElement
      }
      return e
    }

    function L(t) {
      var e = O(t);
      if (e !== null) {
        if (e.disabled || e.getAttribute("disabled") || e.classList.contains("disabled")) return;
        if (d.registerEvent(t), t.type === "touchstart" && o.delay) {
          var a = !1,
            r = setTimeout(function () {
              r = null, o.show(t, e)
            }, o.delay),
            n = function (c) {
              r && (clearTimeout(r), r = null, o.show(t, e)), a || (a = !0, o.hide(c, e)), s()
            },
            i = function (c) {
              r && (clearTimeout(r), r = null), n(c), s()
            };
          e.addEventListener("touchmove", i, !1), e.addEventListener("touchend", n, !1), e.addEventListener("touchcancel", n, !1);
          var s = function () {
            e.removeEventListener("touchmove", i), e.removeEventListener("touchend", n), e.removeEventListener("touchcancel", n)
          }
        } else o.show(t, e), h && (e.addEventListener("touchend", o.hide, !1), e.addEventListener("touchcancel", o.hide, !1)), e.addEventListener("mouseup", o.hide, !1), e.addEventListener("mouseleave", o.hide, !1)
      }
    }
    return f.init = function (t) {
      var e = document.body;
      t = t || {}, "duration" in t && (o.duration = t.duration), "delay" in t && (o.delay = t.delay), h && (e.addEventListener("touchstart", L, !1), e.addEventListener("touchcancel", d.registerEvent, !1), e.addEventListener("touchend", d.registerEvent, !1)), e.addEventListener("mousedown", L, !1)
    }, f.attach = function (t, e) {
      t = m(t), y.call(e) === "[object Array]" && (e = e.join(" ")), e = e ? " " + e : "";
      for (var a, r, n = 0, i = t.length; n < i; n++) a = t[n], r = a.tagName.toLowerCase(), ["input", "img"].indexOf(r) !== -1 && (k[r](a), a = a.parentElement), a.className.indexOf("waves-effect") === -1 && (a.className += " waves-effect" + e)
    }, f.ripple = function (t, e) {
      t = m(t);
      var a = t.length;
      if (e = e || {}, e.wait = e.wait || 0, e.position = e.position || null, a) {
        for (var r, n, i, s = {}, c = 0, l = {
            type: "mousedown",
            button: 1
          }, u = function (x, j) {
            return function () {
              o.hide(x, j)
            }
          }; c < a; c++)
          if (r = t[c], n = e.position || {
              x: r.clientWidth / 2,
              y: r.clientHeight / 2
            }, i = E(r), s.x = i.left + n.x, s.y = i.top + n.y, l.pageX = s.x, l.pageY = s.y, o.show(l, r), e.wait >= 0 && e.wait !== null) {
            var v = {
              type: "mouseup",
              button: 1
            };
            setTimeout(u(v, r), e.wait)
          }
      }
    }, f.calm = function (t) {
      t = m(t);
      for (var e = {
          type: "mouseup",
          button: 1
        }, a = 0, r = t.length; a < r; a++) o.hide(e, t[a])
    }, f.displayEffect = function (t) {
      console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"), f.init(t)
    }, f
  })
})(A);
var Y = A.exports;
const z = X(Y);
window.Waves = z;