import {
  c as An,
  g as Nn
} from "./_commonjsHelpers-BosuxZz1.js";
var qe = {
  exports: {}
}; /* flatpickr v4.6.13, @license MIT */
(function (Fe, Hn) {
  (function (E, ae) {
    Fe.exports = ae()
  })(An, function () {
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    var E = function () {
      return E = Object.assign || function (r) {
        for (var e, m = 1, h = arguments.length; m < h; m++) {
          e = arguments[m];
          for (var d in e) Object.prototype.hasOwnProperty.call(e, d) && (r[d] = e[d])
        }
        return r
      }, E.apply(this, arguments)
    };

    function ae() {
      for (var a = 0, r = 0, e = arguments.length; r < e; r++) a += arguments[r].length;
      for (var m = Array(a), h = 0, r = 0; r < e; r++)
        for (var d = arguments[r], w = 0, x = d.length; w < x; w++, h++) m[h] = d[w];
      return m
    }
    var pe = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"],
      J = {
        _disable: [],
        allowInput: !1,
        allowInvalidPreload: !1,
        altFormat: "F j, Y",
        altInput: !1,
        altInputClass: "form-control input",
        animate: typeof window == "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: !0,
        clickOpens: !0,
        closeOnSelect: !0,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: !1,
        enableSeconds: !1,
        enableTime: !1,
        errorHandler: function (a) {
          return typeof console < "u" && console.warn(a)
        },
        getWeek: function (a) {
          var r = new Date(a.getTime());
          r.setHours(0, 0, 0, 0), r.setDate(r.getDate() + 3 - (r.getDay() + 6) % 7);
          var e = new Date(r.getFullYear(), 0, 4);
          return 1 + Math.round(((r.getTime() - e.getTime()) / 864e5 - 3 + (e.getDay() + 6) % 7) / 7)
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: !1,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: !1,
        now: new Date,
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: void 0,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: !1,
        showMonths: 1,
        static: !1,
        time_24hr: !1,
        weekNumbers: !1,
        wrap: !1
      },
      Z = {
        weekdays: {
          shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        months: {
          shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function (a) {
          var r = a % 100;
          if (r > 3 && r < 21) return "th";
          switch (r % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th"
          }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: !1
      },
      I = function (a, r) {
        return r === void 0 && (r = 2), ("000" + a).slice(r * -1)
      },
      O = function (a) {
        return a === !0 ? 1 : 0
      };

    function Oe(a, r) {
      var e;
      return function () {
        var m = this,
          h = arguments;
        clearTimeout(e), e = setTimeout(function () {
          return a.apply(m, h)
        }, r)
      }
    }
    var he = function (a) {
      return a instanceof Array ? a : [a]
    };

    function T(a, r, e) {
      if (e === !0) return a.classList.add(r);
      a.classList.remove(r)
    }

    function v(a, r, e) {
      var m = window.document.createElement(a);
      return r = r || "", e = e || "", m.className = r, e !== void 0 && (m.textContent = e), m
    }

    function ie(a) {
      for (; a.firstChild;) a.removeChild(a.firstChild)
    }

    function Ae(a, r) {
      if (r(a)) return a;
      if (a.parentNode) return Ae(a.parentNode, r)
    }

    function re(a, r) {
      var e = v("div", "numInputWrapper"),
        m = v("input", "numInput " + a),
        h = v("span", "arrowUp"),
        d = v("span", "arrowDown");
      if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? m.type = "number" : (m.type = "text", m.pattern = "\\d*"), r !== void 0)
        for (var w in r) m.setAttribute(w, r[w]);
      return e.appendChild(m), e.appendChild(h), e.appendChild(d), e
    }

    function S(a) {
      try {
        if (typeof a.composedPath == "function") {
          var r = a.composedPath();
          return r[0]
        }
        return a.target
      } catch {
        return a.target
      }
    }
    var ve = function () {},
      oe = function (a, r, e) {
        return e.months[r ? "shorthand" : "longhand"][a]
      },
      ze = {
        D: ve,
        F: function (a, r, e) {
          a.setMonth(e.months.longhand.indexOf(r))
        },
        G: function (a, r) {
          a.setHours((a.getHours() >= 12 ? 12 : 0) + parseFloat(r))
        },
        H: function (a, r) {
          a.setHours(parseFloat(r))
        },
        J: function (a, r) {
          a.setDate(parseFloat(r))
        },
        K: function (a, r, e) {
          a.setHours(a.getHours() % 12 + 12 * O(new RegExp(e.amPM[1], "i").test(r)))
        },
        M: function (a, r, e) {
          a.setMonth(e.months.shorthand.indexOf(r))
        },
        S: function (a, r) {
          a.setSeconds(parseFloat(r))
        },
        U: function (a, r) {
          return new Date(parseFloat(r) * 1e3)
        },
        W: function (a, r, e) {
          var m = parseInt(r),
            h = new Date(a.getFullYear(), 0, 2 + (m - 1) * 7, 0, 0, 0, 0);
          return h.setDate(h.getDate() - h.getDay() + e.firstDayOfWeek), h
        },
        Y: function (a, r) {
          a.setFullYear(parseFloat(r))
        },
        Z: function (a, r) {
          return new Date(r)
        },
        d: function (a, r) {
          a.setDate(parseFloat(r))
        },
        h: function (a, r) {
          a.setHours((a.getHours() >= 12 ? 12 : 0) + parseFloat(r))
        },
        i: function (a, r) {
          a.setMinutes(parseFloat(r))
        },
        j: function (a, r) {
          a.setDate(parseFloat(r))
        },
        l: ve,
        m: function (a, r) {
          a.setMonth(parseFloat(r) - 1)
        },
        n: function (a, r) {
          a.setMonth(parseFloat(r) - 1)
        },
        s: function (a, r) {
          a.setSeconds(parseFloat(r))
        },
        u: function (a, r) {
          return new Date(parseFloat(r))
        },
        w: ve,
        y: function (a, r) {
          a.setFullYear(2e3 + parseFloat(r))
        }
      },
      L = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
      },
      Q = {
        Z: function (a) {
          return a.toISOString()
        },
        D: function (a, r, e) {
          return r.weekdays.shorthand[Q.w(a, r, e)]
        },
        F: function (a, r, e) {
          return oe(Q.n(a, r, e) - 1, !1, r)
        },
        G: function (a, r, e) {
          return I(Q.h(a, r, e))
        },
        H: function (a) {
          return I(a.getHours())
        },
        J: function (a, r) {
          return r.ordinal !== void 0 ? a.getDate() + r.ordinal(a.getDate()) : a.getDate()
        },
        K: function (a, r) {
          return r.amPM[O(a.getHours() > 11)]
        },
        M: function (a, r) {
          return oe(a.getMonth(), !0, r)
        },
        S: function (a) {
          return I(a.getSeconds())
        },
        U: function (a) {
          return a.getTime() / 1e3
        },
        W: function (a, r, e) {
          return e.getWeek(a)
        },
        Y: function (a) {
          return I(a.getFullYear(), 4)
        },
        d: function (a) {
          return I(a.getDate())
        },
        h: function (a) {
          return a.getHours() % 12 ? a.getHours() % 12 : 12
        },
        i: function (a) {
          return I(a.getMinutes())
        },
        j: function (a) {
          return a.getDate()
        },
        l: function (a, r) {
          return r.weekdays.longhand[a.getDay()]
        },
        m: function (a) {
          return I(a.getMonth() + 1)
        },
        n: function (a) {
          return a.getMonth() + 1
        },
        s: function (a) {
          return a.getSeconds()
        },
        u: function (a) {
          return a.getTime()
        },
        w: function (a) {
          return a.getDay()
        },
        y: function (a) {
          return String(a.getFullYear()).substring(2)
        }
      },
      Ne = function (a) {
        var r = a.config,
          e = r === void 0 ? J : r,
          m = a.l10n,
          h = m === void 0 ? Z : m,
          d = a.isMobile,
          w = d === void 0 ? !1 : d;
        return function (x, k, X) {
          var y = X || h;
          return e.formatDate !== void 0 && !w ? e.formatDate(x, k, y) : k.split("").map(function (A, N, Y) {
            return Q[A] && Y[N - 1] !== "\\" ? Q[A](x, y, e) : A !== "\\" ? A : ""
          }).join("")
        }
      },
      De = function (a) {
        var r = a.config,
          e = r === void 0 ? J : r,
          m = a.l10n,
          h = m === void 0 ? Z : m;
        return function (d, w, x, k) {
          if (!(d !== 0 && !d)) {
            var X = k || h,
              y, A = d;
            if (d instanceof Date) y = new Date(d.getTime());
            else if (typeof d != "string" && d.toFixed !== void 0) y = new Date(d);
            else if (typeof d == "string") {
              var N = w || (e || J).dateFormat,
                Y = String(d).trim();
              if (Y === "today") y = new Date, x = !0;
              else if (e && e.parseDate) y = e.parseDate(d, N);
              else if (/Z$/.test(Y) || /GMT$/.test(Y)) y = new Date(d);
              else {
                for (var le = void 0, D = [], R = 0, we = 0, j = ""; R < N.length; R++) {
                  var W = N[R],
                    V = W === "\\",
                    Ce = N[R - 1] === "\\" || V;
                  if (L[W] && !Ce) {
                    j += L[W];
                    var B = new RegExp(j).exec(d);
                    B && (le = !0) && D[W !== "Y" ? "push" : "unshift"]({
                      fn: ze[W],
                      val: B[++we]
                    })
                  } else V || (j += ".")
                }
                y = !e || !e.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0)), D.forEach(function (q) {
                  var z = q.fn,
                    ye = q.val;
                  return y = z(y, ye, X) || y
                }), y = le ? y : void 0
              }
            }
            if (!(y instanceof Date && !isNaN(y.getTime()))) {
              e.errorHandler(new Error("Invalid date provided: " + A));
              return
            }
            return x === !0 && y.setHours(0, 0, 0, 0), y
          }
        }
      };

    function _(a, r, e) {
      return e === void 0 && (e = !0), e !== !1 ? new Date(a.getTime()).setHours(0, 0, 0, 0) - new Date(r.getTime()).setHours(0, 0, 0, 0) : a.getTime() - r.getTime()
    }
    var $e = function (a, r, e) {
        return a > Math.min(r, e) && a < Math.max(r, e)
      },
      be = function (a, r, e) {
        return a * 3600 + r * 60 + e
      },
      Ge = function (a) {
        var r = Math.floor(a / 3600),
          e = (a - r * 3600) / 60;
        return [r, e, a - r * 3600 - e * 60]
      },
      Ze = {
        DAY: 864e5
      };

    function Me(a) {
      var r = a.defaultHour,
        e = a.defaultMinute,
        m = a.defaultSeconds;
      if (a.minDate !== void 0) {
        var h = a.minDate.getHours(),
          d = a.minDate.getMinutes(),
          w = a.minDate.getSeconds();
        r < h && (r = h), r === h && e < d && (e = d), r === h && e === d && m < w && (m = a.minDate.getSeconds())
      }
      if (a.maxDate !== void 0) {
        var x = a.maxDate.getHours(),
          k = a.maxDate.getMinutes();
        r = Math.min(r, x), r === x && (e = Math.min(k, e)), r === x && e === k && (m = a.maxDate.getSeconds())
      }
      return {
        hours: r,
        minutes: e,
        seconds: m
      }
    }
    typeof Object.assign != "function" && (Object.assign = function (a) {
      for (var r = [], e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
      if (!a) throw TypeError("Cannot convert undefined or null to object");
      for (var m = function (x) {
          x && Object.keys(x).forEach(function (k) {
            return a[k] = x[k]
          })
        }, h = 0, d = r; h < d.length; h++) {
        var w = d[h];
        m(w)
      }
      return a
    });
    var Qe = 300;

    function Xe(a, r) {
      var e = {
        config: E(E({}, J), C.defaultConfig),
        l10n: Z
      };
      e.parseDate = De({
        config: e.config,
        l10n: e.l10n
      }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = D, e._setHoursFromDate = N, e._positionCalendar = de, e.changeMonth = xe, e.changeYear = ue, e.clear = on, e.close = ln, e.onMouseOver = se, e._createElement = v, e.createDay = B, e.destroy = fn, e.isEnabled = K, e.jumpToDate = j, e.updateValue = H, e.open = sn, e.redraw = Be, e.set = pn, e.setDate = hn, e.toggle = Mn;

      function m() {
        e.utils = {
          getDaysInMonth: function (n, t) {
            return n === void 0 && (n = e.currentMonth), t === void 0 && (t = e.currentYear), n === 1 && (t % 4 === 0 && t % 100 !== 0 || t % 400 === 0) ? 29 : e.l10n.daysInMonth[n]
          }
        }
      }

      function h() {
        e.element = e.input = a, e.isOpen = !1, dn(), We(), Dn(), vn(), m(), e.isMobile || Ce(), we(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && N(e.config.noCalendar ? e.latestSelectedDateObj : void 0), H(!1)), x();
        var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        !e.isMobile && n && de(), M("onReady")
      }

      function d() {
        var n;
        return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement
      }

      function w(n) {
        return n.bind(e)
      }

      function x() {
        var n = e.config;
        n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function () {
          if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
            var t = (e.days.offsetWidth + 1) * n.showMonths;
            e.daysContainer.style.width = t + "px", e.calendarContainer.style.width = t + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display")
          }
        })
      }

      function k(n) {
        if (e.selectedDates.length === 0) {
          var t = e.config.minDate === void 0 || _(new Date, e.config.minDate) >= 0 ? new Date : new Date(e.config.minDate.getTime()),
            i = Me(e.config);
          t.setHours(i.hours, i.minutes, i.seconds, t.getMilliseconds()), e.selectedDates = [t], e.latestSelectedDateObj = t
        }
        n !== void 0 && n.type !== "blur" && yn(n);
        var o = e._input.value;
        A(), H(), e._input.value !== o && e._debouncedChange()
      }

      function X(n, t) {
        return n % 12 + 12 * O(t === e.l10n.amPM[1])
      }

      function y(n) {
        switch (n % 24) {
          case 0:
          case 12:
            return 12;
          default:
            return n % 12
        }
      }

      function A() {
        if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
          var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24,
            t = (parseInt(e.minuteElement.value, 10) || 0) % 60,
            i = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
          e.amPM !== void 0 && (n = X(n, e.amPM.textContent));
          var o = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && _(e.latestSelectedDateObj, e.config.minDate, !0) === 0,
            l = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && _(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
          if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
            var f = be(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()),
              g = be(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()),
              c = be(n, t, i);
            if (c > g && c < f) {
              var p = Ge(f);
              n = p[0], t = p[1], i = p[2]
            }
          } else {
            if (l) {
              var u = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
              n = Math.min(n, u.getHours()), n === u.getHours() && (t = Math.min(t, u.getMinutes())), t === u.getMinutes() && (i = Math.min(i, u.getSeconds()))
            }
            if (o) {
              var s = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
              n = Math.max(n, s.getHours()), n === s.getHours() && t < s.getMinutes() && (t = s.getMinutes()), t === s.getMinutes() && (i = Math.max(i, s.getSeconds()))
            }
          }
          Y(n, t, i)
        }
      }

      function N(n) {
        var t = n || e.latestSelectedDateObj;
        t && t instanceof Date && Y(t.getHours(), t.getMinutes(), t.getSeconds())
      }

      function Y(n, t, i) {
        e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, t, i || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = I(e.config.time_24hr ? n : (12 + n) % 12 + 12 * O(n % 12 === 0)), e.minuteElement.value = I(t), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[O(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = I(i)))
      }

      function le(n) {
        var t = S(n),
          i = parseInt(t.value) + (n.delta || 0);
        (i / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(i.toString())) && ue(i)
      }

      function D(n, t, i, o) {
        if (t instanceof Array) return t.forEach(function (l) {
          return D(n, l, i, o)
        });
        if (n instanceof Array) return n.forEach(function (l) {
          return D(l, t, i, o)
        });
        n.addEventListener(t, i, o), e._handlers.push({
          remove: function () {
            return n.removeEventListener(t, i, o)
          }
        })
      }

      function R() {
        M("onChange")
      }

      function we() {
        if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function (i) {
            Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + i + "]"), function (o) {
              return D(o, "click", e[i])
            })
          }), e.isMobile) {
          bn();
          return
        }
        var n = Oe(cn, 50);
        if (e._debouncedChange = Oe(R, Qe), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && D(e.daysContainer, "mouseover", function (i) {
            e.config.mode === "range" && se(S(i))
          }), D(e._input, "keydown", je), e.calendarContainer !== void 0 && D(e.calendarContainer, "keydown", je), !e.config.inline && !e.config.static && D(window, "resize", n), window.ontouchstart !== void 0 ? D(window.document, "touchstart", Ee) : D(window.document, "mousedown", Ee), D(window.document, "focus", Ee, {
            capture: !0
          }), e.config.clickOpens === !0 && (D(e._input, "focus", e.open), D(e._input, "click", e.open)), e.daysContainer !== void 0 && (D(e.monthNav, "click", Cn), D(e.monthNav, ["keyup", "increment"], le), D(e.daysContainer, "click", Ke)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
          var t = function (i) {
            return S(i).select()
          };
          D(e.timeContainer, ["increment"], k), D(e.timeContainer, "blur", k, {
            capture: !0
          }), D(e.timeContainer, "click", W), D([e.hourElement, e.minuteElement], ["focus", "click"], t), e.secondElement !== void 0 && D(e.secondElement, "focus", function () {
            return e.secondElement && e.secondElement.select()
          }), e.amPM !== void 0 && D(e.amPM, "click", function (i) {
            k(i)
          })
        }
        e.config.allowInput && D(e._input, "blur", un)
      }

      function j(n, t) {
        var i = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now),
          o = e.currentYear,
          l = e.currentMonth;
        try {
          i !== void 0 && (e.currentYear = i.getFullYear(), e.currentMonth = i.getMonth())
        } catch (f) {
          f.message = "Invalid date supplied: " + i, e.config.errorHandler(f)
        }
        t && e.currentYear !== o && (M("onYearChange"), $()), t && (e.currentYear !== o || e.currentMonth !== l) && M("onMonthChange"), e.redraw()
      }

      function W(n) {
        var t = S(n);
        ~t.className.indexOf("arrow") && V(n, t.classList.contains("arrowUp") ? 1 : -1)
      }

      function V(n, t, i) {
        var o = n && S(n),
          l = i || o && o.parentNode && o.parentNode.firstChild,
          f = Te("increment");
        f.delta = t, l && l.dispatchEvent(f)
      }

      function Ce() {
        var n = window.document.createDocumentFragment();
        if (e.calendarContainer = v("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
          if (n.appendChild(tn()), e.innerContainer = v("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
            var t = rn(),
              i = t.weekWrapper,
              o = t.weekNumbers;
            e.innerContainer.appendChild(i), e.weekNumbers = o, e.weekWrapper = i
          }
          e.rContainer = v("div", "flatpickr-rContainer"), e.rContainer.appendChild(Ye()), e.daysContainer || (e.daysContainer = v("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), fe(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer)
        }
        e.config.enableTime && n.appendChild(an()), T(e.calendarContainer, "rangeMode", e.config.mode === "range"), T(e.calendarContainer, "animate", e.config.animate === !0), T(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
        var l = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
        if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!l && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
          var f = v("div", "flatpickr-wrapper");
          e.element.parentNode && e.element.parentNode.insertBefore(f, e.element), f.appendChild(e.element), e.altInput && f.appendChild(e.altInput), f.appendChild(e.calendarContainer)
        }!e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer)
      }

      function B(n, t, i, o) {
        var l = K(t, !0),
          f = v("span", n, t.getDate().toString());
        return f.dateObj = t, f.$i = o, f.setAttribute("aria-label", e.formatDate(t, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && _(t, e.now) === 0 && (e.todayDateElem = f, f.classList.add("today"), f.setAttribute("aria-current", "date")), l ? (f.tabIndex = -1, Ie(t) && (f.classList.add("selected"), e.selectedDateElem = f, e.config.mode === "range" && (T(f, "startRange", e.selectedDates[0] && _(t, e.selectedDates[0], !0) === 0), T(f, "endRange", e.selectedDates[1] && _(t, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && f.classList.add("inRange")))) : f.classList.add("flatpickr-disabled"), e.config.mode === "range" && wn(t) && !Ie(t) && f.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && o % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(t) + "</span>"), M("onDayCreate", f), f
      }

      function q(n) {
        n.focus(), e.config.mode === "range" && se(n)
      }

      function z(n) {
        for (var t = n > 0 ? 0 : e.config.showMonths - 1, i = n > 0 ? e.config.showMonths : -1, o = t; o != i; o += n)
          for (var l = e.daysContainer.children[o], f = n > 0 ? 0 : l.children.length - 1, g = n > 0 ? l.children.length : -1, c = f; c != g; c += n) {
            var p = l.children[c];
            if (p.className.indexOf("hidden") === -1 && K(p.dateObj)) return p
          }
      }

      function ye(n, t) {
        for (var i = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, o = t > 0 ? e.config.showMonths : -1, l = t > 0 ? 1 : -1, f = i - e.currentMonth; f != o; f += l)
          for (var g = e.daysContainer.children[f], c = i - e.currentMonth === f ? n.$i + t : t < 0 ? g.children.length - 1 : 0, p = g.children.length, u = c; u >= 0 && u < p && u != (t > 0 ? p : -1); u += l) {
            var s = g.children[u];
            if (s.className.indexOf("hidden") === -1 && K(s.dateObj) && Math.abs(n.$i - u) >= Math.abs(t)) return q(s)
          }
        e.changeMonth(l), ee(z(l), 0)
      }

      function ee(n, t) {
        var i = d(),
          o = ce(i || document.body),
          l = n !== void 0 ? n : o ? i : e.selectedDateElem !== void 0 && ce(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && ce(e.todayDateElem) ? e.todayDateElem : z(t > 0 ? 1 : -1);
        l === void 0 ? e._input.focus() : o ? ye(l, t) : q(l)
      }

      function en(n, t) {
        for (var i = (new Date(n, t, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, o = e.utils.getDaysInMonth((t - 1 + 12) % 12, n), l = e.utils.getDaysInMonth(t, n), f = window.document.createDocumentFragment(), g = e.config.showMonths > 1, c = g ? "prevMonthDay hidden" : "prevMonthDay", p = g ? "nextMonthDay hidden" : "nextMonthDay", u = o + 1 - i, s = 0; u <= o; u++, s++) f.appendChild(B("flatpickr-day " + c, new Date(n, t - 1, u), u, s));
        for (u = 1; u <= l; u++, s++) f.appendChild(B("flatpickr-day", new Date(n, t, u), u, s));
        for (var b = l + 1; b <= 42 - i && (e.config.showMonths === 1 || s % 7 !== 0); b++, s++) f.appendChild(B("flatpickr-day " + p, new Date(n, t + 1, b % l), b, s));
        var P = v("div", "dayContainer");
        return P.appendChild(f), P
      }

      function fe() {
        if (e.daysContainer !== void 0) {
          ie(e.daysContainer), e.weekNumbers && ie(e.weekNumbers);
          for (var n = document.createDocumentFragment(), t = 0; t < e.config.showMonths; t++) {
            var i = new Date(e.currentYear, e.currentMonth, 1);
            i.setMonth(e.currentMonth + t), n.appendChild(en(i.getFullYear(), i.getMonth()))
          }
          e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && se()
        }
      }

      function $() {
        if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
          var n = function (o) {
            return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && o < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && o > e.config.maxDate.getMonth())
          };
          e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
          for (var t = 0; t < 12; t++)
            if (n(t)) {
              var i = v("option", "flatpickr-monthDropdown-month");
              i.value = new Date(e.currentYear, t).getMonth().toString(), i.textContent = oe(t, e.config.shorthandCurrentMonth, e.l10n), i.tabIndex = -1, e.currentMonth === t && (i.selected = !0), e.monthsDropdownContainer.appendChild(i)
            }
        }
      }

      function nn() {
        var n = v("div", "flatpickr-month"),
          t = window.document.createDocumentFragment(),
          i;
        e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? i = v("span", "cur-month") : (e.monthsDropdownContainer = v("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), D(e.monthsDropdownContainer, "change", function (g) {
          var c = S(g),
            p = parseInt(c.value, 10);
          e.changeMonth(p - e.currentMonth), M("onMonthChange")
        }), $(), i = e.monthsDropdownContainer);
        var o = re("cur-year", {
            tabindex: "-1"
          }),
          l = o.getElementsByTagName("input")[0];
        l.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && l.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (l.setAttribute("max", e.config.maxDate.getFullYear().toString()), l.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
        var f = v("div", "flatpickr-current-month");
        return f.appendChild(i), f.appendChild(o), t.appendChild(f), n.appendChild(t), {
          container: n,
          yearElement: l,
          monthElement: i
        }
      }

      function Pe() {
        ie(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
        for (var n = e.config.showMonths; n--;) {
          var t = nn();
          e.yearElements.push(t.yearElement), e.monthElements.push(t.monthElement), e.monthNav.appendChild(t.container)
        }
        e.monthNav.appendChild(e.nextMonthNav)
      }

      function tn() {
        return e.monthNav = v("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = v("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = v("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Pe(), Object.defineProperty(e, "_hidePrevMonthArrow", {
          get: function () {
            return e.__hidePrevMonthArrow
          },
          set: function (n) {
            e.__hidePrevMonthArrow !== n && (T(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n)
          }
        }), Object.defineProperty(e, "_hideNextMonthArrow", {
          get: function () {
            return e.__hideNextMonthArrow
          },
          set: function (n) {
            e.__hideNextMonthArrow !== n && (T(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n)
          }
        }), e.currentYearElement = e.yearElements[0], me(), e.monthNav
      }

      function an() {
        e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
        var n = Me(e.config);
        e.timeContainer = v("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
        var t = v("span", "flatpickr-time-separator", ":"),
          i = re("flatpickr-hour", {
            "aria-label": e.l10n.hourAriaLabel
          });
        e.hourElement = i.getElementsByTagName("input")[0];
        var o = re("flatpickr-minute", {
          "aria-label": e.l10n.minuteAriaLabel
        });
        if (e.minuteElement = o.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = I(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : y(n.hours)), e.minuteElement.value = I(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(i), e.timeContainer.appendChild(t), e.timeContainer.appendChild(o), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
          e.timeContainer.classList.add("hasSeconds");
          var l = re("flatpickr-second");
          e.secondElement = l.getElementsByTagName("input")[0], e.secondElement.value = I(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(v("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(l)
        }
        return e.config.time_24hr || (e.amPM = v("span", "flatpickr-am-pm", e.l10n.amPM[O((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer
      }

      function Ye() {
        e.weekdayContainer ? ie(e.weekdayContainer) : e.weekdayContainer = v("div", "flatpickr-weekdays");
        for (var n = e.config.showMonths; n--;) {
          var t = v("div", "flatpickr-weekdaycontainer");
          e.weekdayContainer.appendChild(t)
        }
        return He(), e.weekdayContainer
      }

      function He() {
        if (e.weekdayContainer) {
          var n = e.l10n.firstDayOfWeek,
            t = ae(e.l10n.weekdays.shorthand);
          n > 0 && n < t.length && (t = ae(t.splice(n, t.length), t.splice(0, n)));
          for (var i = e.config.showMonths; i--;) e.weekdayContainer.children[i].innerHTML = `
  <span class='flatpickr-weekday'>
    ` + t.join("</span><span class='flatpickr-weekday'>") + `
  </span>
  `
        }
      }

      function rn() {
        e.calendarContainer.classList.add("hasWeeks");
        var n = v("div", "flatpickr-weekwrapper");
        n.appendChild(v("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
        var t = v("div", "flatpickr-weeks");
        return n.appendChild(t), {
          weekWrapper: n,
          weekNumbers: t
        }
      }

      function xe(n, t) {
        t === void 0 && (t = !0);
        var i = t ? n : n - e.currentMonth;
        i < 0 && e._hidePrevMonthArrow === !0 || i > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += i, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, M("onYearChange"), $()), fe(), M("onMonthChange"), me())
      }

      function on(n, t) {
        if (n === void 0 && (n = !0), t === void 0 && (t = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, t === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
          var i = Me(e.config),
            o = i.hours,
            l = i.minutes,
            f = i.seconds;
          Y(o, l, f)
        }
        e.redraw(), n && M("onChange")
      }

      function ln() {
        e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), M("onClose")
      }

      function fn() {
        e.config !== void 0 && M("onDestroy");
        for (var n = e._handlers.length; n--;) e._handlers[n].remove();
        if (e._handlers = [], e.mobileInput) e.mobileInput.parentNode && e.mobileInput.parentNode.removeChild(e.mobileInput), e.mobileInput = void 0;
        else if (e.calendarContainer && e.calendarContainer.parentNode)
          if (e.config.static && e.calendarContainer.parentNode) {
            var t = e.calendarContainer.parentNode;
            if (t.lastChild && t.removeChild(t.lastChild), t.parentNode) {
              for (; t.firstChild;) t.parentNode.insertBefore(t.firstChild, t);
              t.parentNode.removeChild(t)
            }
          } else e.calendarContainer.parentNode.removeChild(e.calendarContainer);
        e.altInput && (e.input.type = "text", e.altInput.parentNode && e.altInput.parentNode.removeChild(e.altInput), delete e.altInput), e.input && (e.input.type = e.input._type, e.input.classList.remove("flatpickr-input"), e.input.removeAttribute("readonly")), ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (i) {
          try {
            delete e[i]
          } catch {}
        })
      }

      function ne(n) {
        return e.calendarContainer.contains(n)
      }

      function Ee(n) {
        if (e.isOpen && !e.config.inline) {
          var t = S(n),
            i = ne(t),
            o = t === e.input || t === e.altInput || e.element.contains(t) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)),
            l = !o && !i && !ne(n.relatedTarget),
            f = !e.config.ignoredFocusElements.some(function (g) {
              return g.contains(t)
            });
          l && f && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && k(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1))
        }
      }

      function ue(n) {
        if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
          var t = n,
            i = e.currentYear !== t;
          e.currentYear = t || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), i && (e.redraw(), M("onYearChange"), $())
        }
      }

      function K(n, t) {
        var i;
        t === void 0 && (t = !0);
        var o = e.parseDate(n, void 0, t);
        if (e.config.minDate && o && _(o, e.config.minDate, t !== void 0 ? t : !e.minDateHasTime) < 0 || e.config.maxDate && o && _(o, e.config.maxDate, t !== void 0 ? t : !e.maxDateHasTime) > 0) return !1;
        if (!e.config.enable && e.config.disable.length === 0) return !0;
        if (o === void 0) return !1;
        for (var l = !!e.config.enable, f = (i = e.config.enable) !== null && i !== void 0 ? i : e.config.disable, g = 0, c = void 0; g < f.length; g++) {
          if (c = f[g], typeof c == "function" && c(o)) return l;
          if (c instanceof Date && o !== void 0 && c.getTime() === o.getTime()) return l;
          if (typeof c == "string") {
            var p = e.parseDate(c, void 0, !0);
            return p && p.getTime() === o.getTime() ? l : !l
          } else if (typeof c == "object" && o !== void 0 && c.from && c.to && o.getTime() >= c.from.getTime() && o.getTime() <= c.to.getTime()) return l
        }
        return !l
      }

      function ce(n) {
        return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1
      }

      function un(n) {
        var t = n.target === e._input,
          i = e._input.value.trimEnd() !== Se();
        t && i && !(n.relatedTarget && ne(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat)
      }

      function je(n) {
        var t = S(n),
          i = e.config.wrap ? a.contains(t) : t === e._input,
          o = e.config.allowInput,
          l = e.isOpen && (!o || !i),
          f = e.config.inline && i && !o;
        if (n.keyCode === 13 && i) {
          if (o) return e.setDate(e._input.value, !0, t === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), t.blur();
          e.open()
        } else if (ne(t) || l || f) {
          var g = !!e.timeContainer && e.timeContainer.contains(t);
          switch (n.keyCode) {
            case 13:
              g ? (n.preventDefault(), k(), ke()) : Ke(n);
              break;
            case 27:
              n.preventDefault(), ke();
              break;
            case 8:
            case 46:
              i && !e.config.allowInput && (n.preventDefault(), e.clear());
              break;
            case 37:
            case 39:
              if (!g && !i) {
                n.preventDefault();
                var c = d();
                if (e.daysContainer !== void 0 && (o === !1 || c && ce(c))) {
                  var p = n.keyCode === 39 ? 1 : -1;
                  n.ctrlKey ? (n.stopPropagation(), xe(p), ee(z(1), 0)) : ee(void 0, p)
                }
              } else e.hourElement && e.hourElement.focus();
              break;
            case 38:
            case 40:
              n.preventDefault();
              var u = n.keyCode === 40 ? 1 : -1;
              e.daysContainer && t.$i !== void 0 || t === e.input || t === e.altInput ? n.ctrlKey ? (n.stopPropagation(), ue(e.currentYear - u), ee(z(1), 0)) : g || ee(void 0, u * 7) : t === e.currentYearElement ? ue(e.currentYear - u) : e.config.enableTime && (!g && e.hourElement && e.hourElement.focus(), k(n), e._debouncedChange());
              break;
            case 9:
              if (g) {
                var s = [e.hourElement, e.minuteElement, e.secondElement, e.amPM].concat(e.pluginElements).filter(function (F) {
                    return F
                  }),
                  b = s.indexOf(t);
                if (b !== -1) {
                  var P = s[b + (n.shiftKey ? -1 : 1)];
                  n.preventDefault(), (P || e._input).focus()
                }
              } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(t) && n.shiftKey && (n.preventDefault(), e._input.focus());
              break
          }
        }
        if (e.amPM !== void 0 && t === e.amPM) switch (n.key) {
          case e.l10n.amPM[0].charAt(0):
          case e.l10n.amPM[0].charAt(0).toLowerCase():
            e.amPM.textContent = e.l10n.amPM[0], A(), H();
            break;
          case e.l10n.amPM[1].charAt(0):
          case e.l10n.amPM[1].charAt(0).toLowerCase():
            e.amPM.textContent = e.l10n.amPM[1], A(), H();
            break
        }(i || ne(t)) && M("onKeyDown", n)
      }

      function se(n, t) {
        if (t === void 0 && (t = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(t) || n.classList.contains("flatpickr-disabled")))) {
          for (var i = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), o = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), l = Math.min(i, e.selectedDates[0].getTime()), f = Math.max(i, e.selectedDates[0].getTime()), g = !1, c = 0, p = 0, u = l; u < f; u += Ze.DAY) K(new Date(u), !0) || (g = g || u > l && u < f, u < o && (!c || u > c) ? c = u : u > o && (!p || u < p) && (p = u));
          var s = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + t));
          s.forEach(function (b) {
            var P = b.dateObj,
              F = P.getTime(),
              te = c > 0 && F < c || p > 0 && F > p;
            if (te) {
              b.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function (G) {
                b.classList.remove(G)
              });
              return
            } else if (g && !te) return;
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (G) {
              b.classList.remove(G)
            }), n !== void 0 && (n.classList.add(i <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), o < i && F === o ? b.classList.add("startRange") : o > i && F === o && b.classList.add("endRange"), F >= c && (p === 0 || F <= p) && $e(F, o, i) && b.classList.add("inRange"))
          })
        }
      }

      function cn() {
        e.isOpen && !e.config.static && !e.config.inline && de()
      }

      function sn(n, t) {
        if (t === void 0 && (t = e._positionElement), e.isMobile === !0) {
          if (n) {
            n.preventDefault();
            var i = S(n);
            i && i.blur()
          }
          e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), M("onOpen");
          return
        } else if (e._input.disabled || e.config.inline) return;
        var o = e.isOpen;
        e.isOpen = !0, o || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), M("onOpen"), de(t)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function () {
          return e.hourElement.select()
        }, 50)
      }

      function Le(n) {
        return function (t) {
          var i = e.config["_" + n + "Date"] = e.parseDate(t, e.config.dateFormat),
            o = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
          i !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = i.getHours() > 0 || i.getMinutes() > 0 || i.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function (l) {
            return K(l)
          }), !e.selectedDates.length && n === "min" && N(i), H()), e.daysContainer && (Be(), i !== void 0 ? e.currentYearElement[n] = i.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!o && i !== void 0 && o.getFullYear() === i.getFullYear())
        }
      }

      function dn() {
        var n = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"],
          t = E(E({}, JSON.parse(JSON.stringify(a.dataset || {}))), r),
          i = {};
        e.config.parseDate = t.parseDate, e.config.formatDate = t.formatDate, Object.defineProperty(e.config, "enable", {
          get: function () {
            return e.config._enable
          },
          set: function (s) {
            e.config._enable = Ue(s)
          }
        }), Object.defineProperty(e.config, "disable", {
          get: function () {
            return e.config._disable
          },
          set: function (s) {
            e.config._disable = Ue(s)
          }
        });
        var o = t.mode === "time";
        if (!t.dateFormat && (t.enableTime || o)) {
          var l = C.defaultConfig.dateFormat || J.dateFormat;
          i.dateFormat = t.noCalendar || o ? "H:i" + (t.enableSeconds ? ":S" : "") : l + " H:i" + (t.enableSeconds ? ":S" : "")
        }
        if (t.altInput && (t.enableTime || o) && !t.altFormat) {
          var f = C.defaultConfig.altFormat || J.altFormat;
          i.altFormat = t.noCalendar || o ? "h:i" + (t.enableSeconds ? ":S K" : " K") : f + (" h:i" + (t.enableSeconds ? ":S" : "") + " K")
        }
        Object.defineProperty(e.config, "minDate", {
          get: function () {
            return e.config._minDate
          },
          set: Le("min")
        }), Object.defineProperty(e.config, "maxDate", {
          get: function () {
            return e.config._maxDate
          },
          set: Le("max")
        });
        var g = function (s) {
          return function (b) {
            e.config[s === "min" ? "_minTime" : "_maxTime"] = e.parseDate(b, "H:i:S")
          }
        };
        Object.defineProperty(e.config, "minTime", {
          get: function () {
            return e.config._minTime
          },
          set: g("min")
        }), Object.defineProperty(e.config, "maxTime", {
          get: function () {
            return e.config._maxTime
          },
          set: g("max")
        }), t.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, i, t);
        for (var c = 0; c < n.length; c++) e.config[n[c]] = e.config[n[c]] === !0 || e.config[n[c]] === "true";
        pe.filter(function (s) {
          return e.config[s] !== void 0
        }).forEach(function (s) {
          e.config[s] = he(e.config[s] || []).map(w)
        }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (var c = 0; c < e.config.plugins.length; c++) {
          var p = e.config.plugins[c](e) || {};
          for (var u in p) pe.indexOf(u) > -1 ? e.config[u] = he(p[u]).map(w).concat(e.config[u]) : typeof t[u] > "u" && (e.config[u] = p[u])
        }
        t.altInputClass || (e.config.altInputClass = Re().className + " " + e.config.altInputClass), M("onParseConfig")
      }

      function Re() {
        return e.config.wrap ? a.querySelector("[data-input]") : a
      }

      function We() {
        typeof e.config.locale != "object" && typeof C.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = E(E({}, C.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? C.l10ns[e.config.locale] : void 0), L.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", L.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", L.M = "(" + e.l10n.months.shorthand.join("|") + ")", L.F = "(" + e.l10n.months.longhand.join("|") + ")", L.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
        var n = E(E({}, r), JSON.parse(JSON.stringify(a.dataset || {})));
        n.time_24hr === void 0 && C.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Ne(e), e.parseDate = De({
          config: e.config,
          l10n: e.l10n
        })
      }

      function de(n) {
        if (typeof e.config.position == "function") return void e.config.position(e, n);
        if (e.calendarContainer !== void 0) {
          M("onPreCalendarPosition");
          var t = n || e._positionElement,
            i = Array.prototype.reduce.call(e.calendarContainer.children, function (Fn, On) {
              return Fn + On.offsetHeight
            }, 0),
            o = e.calendarContainer.offsetWidth,
            l = e.config.position.split(" "),
            f = l[0],
            g = l.length > 1 ? l[1] : null,
            c = t.getBoundingClientRect(),
            p = window.innerHeight - c.bottom,
            u = f === "above" || f !== "below" && p < i && c.top > i,
            s = window.pageYOffset + c.top + (u ? -i - 2 : t.offsetHeight + 2);
          if (T(e.calendarContainer, "arrowTop", !u), T(e.calendarContainer, "arrowBottom", u), !e.config.inline) {
            var b = window.pageXOffset + c.left,
              P = !1,
              F = !1;
            g === "center" ? (b -= (o - c.width) / 2, P = !0) : g === "right" && (b -= o - c.width, F = !0), T(e.calendarContainer, "arrowLeft", !P && !F), T(e.calendarContainer, "arrowCenter", P), T(e.calendarContainer, "arrowRight", F);
            var te = window.document.body.offsetWidth - (window.pageXOffset + c.right),
              G = b + o > window.document.body.offsetWidth,
              xn = te + o > window.document.body.offsetWidth;
            if (T(e.calendarContainer, "rightMost", G), !e.config.static)
              if (e.calendarContainer.style.top = s + "px", !G) e.calendarContainer.style.left = b + "px", e.calendarContainer.style.right = "auto";
              else if (!xn) e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = te + "px";
            else {
              var _e = gn();
              if (_e === void 0) return;
              var En = window.document.body.offsetWidth,
                kn = Math.max(0, En / 2 - o / 2),
                Tn = ".flatpickr-calendar.centerMost:before",
                In = ".flatpickr-calendar.centerMost:after",
                Sn = _e.cssRules.length,
                _n = "{left:" + c.left + "px;right:auto;}";
              T(e.calendarContainer, "rightMost", !1), T(e.calendarContainer, "centerMost", !0), _e.insertRule(Tn + "," + In + _n, Sn), e.calendarContainer.style.left = kn + "px", e.calendarContainer.style.right = "auto"
            }
          }
        }
      }

      function gn() {
        for (var n = null, t = 0; t < document.styleSheets.length; t++) {
          var i = document.styleSheets[t];
          if (i.cssRules) {
            try {
              i.cssRules
            } catch {
              continue
            }
            n = i;
            break
          }
        }
        return n ? ? mn()
      }

      function mn() {
        var n = document.createElement("style");
        return document.head.appendChild(n), n.sheet
      }

      function Be() {
        e.config.noCalendar || e.isMobile || ($(), me(), fe())
      }

      function ke() {
        e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close()
      }

      function Ke(n) {
        n.preventDefault(), n.stopPropagation();
        var t = function (s) {
            return s.classList && s.classList.contains("flatpickr-day") && !s.classList.contains("flatpickr-disabled") && !s.classList.contains("notAllowed")
          },
          i = Ae(S(n), t);
        if (i !== void 0) {
          var o = i,
            l = e.latestSelectedDateObj = new Date(o.dateObj.getTime()),
            f = (l.getMonth() < e.currentMonth || l.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
          if (e.selectedDateElem = o, e.config.mode === "single") e.selectedDates = [l];
          else if (e.config.mode === "multiple") {
            var g = Ie(l);
            g ? e.selectedDates.splice(parseInt(g), 1) : e.selectedDates.push(l)
          } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = l, e.selectedDates.push(l), _(l, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function (s, b) {
            return s.getTime() - b.getTime()
          }));
          if (A(), f) {
            var c = e.currentYear !== l.getFullYear();
            e.currentYear = l.getFullYear(), e.currentMonth = l.getMonth(), c && (M("onYearChange"), $()), M("onMonthChange")
          }
          if (me(), fe(), H(), !f && e.config.mode !== "range" && e.config.showMonths === 1 ? q(o) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
            var p = e.config.mode === "single" && !e.config.enableTime,
              u = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
            (p || u) && ke()
          }
          R()
        }
      }
      var ge = {
        locale: [We, He],
        showMonths: [Pe, x, Ye],
        minDate: [j],
        maxDate: [j],
        positionElement: [Ve],
        clickOpens: [function () {
          e.config.clickOpens === !0 ? (D(e._input, "focus", e.open), D(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open))
        }]
      };

      function pn(n, t) {
        if (n !== null && typeof n == "object") {
          Object.assign(e.config, n);
          for (var i in n) ge[i] !== void 0 && ge[i].forEach(function (o) {
            return o()
          })
        } else e.config[n] = t, ge[n] !== void 0 ? ge[n].forEach(function (o) {
          return o()
        }) : pe.indexOf(n) > -1 && (e.config[n] = he(t));
        e.redraw(), H(!0)
      }

      function Je(n, t) {
        var i = [];
        if (n instanceof Array) i = n.map(function (o) {
          return e.parseDate(o, t)
        });
        else if (n instanceof Date || typeof n == "number") i = [e.parseDate(n, t)];
        else if (typeof n == "string") switch (e.config.mode) {
          case "single":
          case "time":
            i = [e.parseDate(n, t)];
            break;
          case "multiple":
            i = n.split(e.config.conjunction).map(function (o) {
              return e.parseDate(o, t)
            });
            break;
          case "range":
            i = n.split(e.l10n.rangeSeparator).map(function (o) {
              return e.parseDate(o, t)
            });
            break
        } else e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
        e.selectedDates = e.config.allowInvalidPreload ? i : i.filter(function (o) {
          return o instanceof Date && K(o, !1)
        }), e.config.mode === "range" && e.selectedDates.sort(function (o, l) {
          return o.getTime() - l.getTime()
        })
      }

      function hn(n, t, i) {
        if (t === void 0 && (t = !1), i === void 0 && (i = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0) return e.clear(t);
        Je(n, i), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), j(void 0, t), N(), e.selectedDates.length === 0 && e.clear(!1), H(t), t && M("onChange")
      }

      function Ue(n) {
        return n.slice().map(function (t) {
          return typeof t == "string" || typeof t == "number" || t instanceof Date ? e.parseDate(t, void 0, !0) : t && typeof t == "object" && t.from && t.to ? {
            from: e.parseDate(t.from, void 0),
            to: e.parseDate(t.to, void 0)
          } : t
        }).filter(function (t) {
          return t
        })
      }

      function vn() {
        e.selectedDates = [], e.now = e.parseDate(e.config.now) || new Date;
        var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
        n && Je(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0)
      }

      function Dn() {
        if (e.input = Re(), !e.input) {
          e.config.errorHandler(new Error("Invalid input element specified"));
          return
        }
        e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = v(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), Ve()
      }

      function Ve() {
        e._positionElement = e.config.positionElement || e._input
      }

      function bn() {
        var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
        e.mobileInput = v("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
        try {
          e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling)
        } catch {}
        D(e.mobileInput, "change", function (t) {
          e.setDate(S(t).value, !1, e.mobileFormatStr), M("onChange"), M("onClose")
        })
      }

      function Mn(n) {
        if (e.isOpen === !0) return e.close();
        e.open(n)
      }

      function M(n, t) {
        if (e.config !== void 0) {
          var i = e.config[n];
          if (i !== void 0 && i.length > 0)
            for (var o = 0; i[o] && o < i.length; o++) i[o](e.selectedDates, e.input.value, e, t);
          n === "onChange" && (e.input.dispatchEvent(Te("change")), e.input.dispatchEvent(Te("input")))
        }
      }

      function Te(n) {
        var t = document.createEvent("Event");
        return t.initEvent(n, !0, !0), t
      }

      function Ie(n) {
        for (var t = 0; t < e.selectedDates.length; t++) {
          var i = e.selectedDates[t];
          if (i instanceof Date && _(i, n) === 0) return "" + t
        }
        return !1
      }

      function wn(n) {
        return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : _(n, e.selectedDates[0]) >= 0 && _(n, e.selectedDates[1]) <= 0
      }

      function me() {
        e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function (n, t) {
          var i = new Date(e.currentYear, e.currentMonth, 1);
          i.setMonth(e.currentMonth + t), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[t].textContent = oe(i.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = i.getMonth().toString(), n.value = i.getFullYear().toString()
        }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()))
      }

      function Se(n) {
        var t = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
        return e.selectedDates.map(function (i) {
          return e.formatDate(i, t)
        }).filter(function (i, o, l) {
          return e.config.mode !== "range" || e.config.enableTime || l.indexOf(i) === o
        }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator)
      }

      function H(n) {
        n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Se(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Se(e.config.altFormat)), n !== !1 && M("onValueUpdate")
      }

      function Cn(n) {
        var t = S(n),
          i = e.prevMonthNav.contains(t),
          o = e.nextMonthNav.contains(t);
        i || o ? xe(i ? -1 : 1) : e.yearElements.indexOf(t) >= 0 ? t.select() : t.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : t.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1)
      }

      function yn(n) {
        n.preventDefault();
        var t = n.type === "keydown",
          i = S(n),
          o = i;
        e.amPM !== void 0 && i === e.amPM && (e.amPM.textContent = e.l10n.amPM[O(e.amPM.textContent === e.l10n.amPM[0])]);
        var l = parseFloat(o.getAttribute("min")),
          f = parseFloat(o.getAttribute("max")),
          g = parseFloat(o.getAttribute("step")),
          c = parseInt(o.value, 10),
          p = n.delta || (t ? n.which === 38 ? 1 : -1 : 0),
          u = c + g * p;
        if (typeof o.value < "u" && o.value.length === 2) {
          var s = o === e.hourElement,
            b = o === e.minuteElement;
          u < l ? (u = f + u + O(!s) + (O(s) && O(!e.amPM)), b && V(void 0, -1, e.hourElement)) : u > f && (u = o === e.hourElement ? u - f - O(!e.amPM) : l, b && V(void 0, 1, e.hourElement)), e.amPM && s && (g === 1 ? u + c === 23 : Math.abs(u - c) > g) && (e.amPM.textContent = e.l10n.amPM[O(e.amPM.textContent === e.l10n.amPM[0])]), o.value = I(u)
        }
      }
      return h(), e
    }

    function U(a, r) {
      for (var e = Array.prototype.slice.call(a).filter(function (w) {
          return w instanceof HTMLElement
        }), m = [], h = 0; h < e.length; h++) {
        var d = e[h];
        try {
          if (d.getAttribute("data-fp-omit") !== null) continue;
          d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Xe(d, r || {}), m.push(d._flatpickr)
        } catch (w) {
          console.error(w)
        }
      }
      return m.length === 1 ? m[0] : m
    }
    typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (a) {
      return U(this, a)
    }, HTMLElement.prototype.flatpickr = function (a) {
      return U([this], a)
    });
    var C = function (a, r) {
      return typeof a == "string" ? U(window.document.querySelectorAll(a), r) : a instanceof Node ? U([a], r) : U(a, r)
    };
    return C.defaultConfig = {}, C.l10ns = {
      en: E({}, Z),
      default: E({}, Z)
    }, C.localize = function (a) {
      C.l10ns.default = E(E({}, C.l10ns.default), a)
    }, C.setDefaults = function (a) {
      C.defaultConfig = E(E({}, C.defaultConfig), a)
    }, C.parseDate = De({}), C.formatDate = Ne({}), C.compareDates = _, typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function (a) {
      return U(this, a)
    }), Date.prototype.fp_incr = function (a) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof a == "string" ? parseInt(a, 10) : a))
    }, typeof window < "u" && (window.flatpickr = C), C
  })
})(qe);
var Pn = qe.exports;
const Yn = Nn(Pn);
try {
  window.flatpickr = Yn
} catch {}