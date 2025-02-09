import {
  g as J
} from "./_commonjsHelpers-BosuxZz1.js";
import {
  r as X
} from "./jquery-Czc5UB_B.js";
var Z = {
  exports: {}
};
/*!
 * Select2 4.0.13
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (R, W) {
  (function (L) {
    R.exports ? R.exports = function (Y, H) {
      return H === void 0 && (typeof window < "u" ? H = X() : H = X()(Y)), L(H), H
    } : L(jQuery)
  })(function (L) {
    var Y = function () {
        if (L && L.fn && L.fn.select2 && L.fn.select2.amd) var g = L.fn.select2.amd;
        var g;
        (function () {
          if (!g || !g.requirejs) {
            g ? l = g : g = {};
            /**
             * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
             * Released under MIT license, http://github.com/requirejs/almond/LICENSE
             */
            var u, l, s;
            (function (r) {
              var t, e, n, i, o = {},
                a = {},
                h = {},
                c = {},
                p = Object.prototype.hasOwnProperty,
                _ = [].slice,
                y = /\.js$/;

              function m(f, A) {
                return p.call(f, A)
              }

              function E(f, A) {
                var w, B, x, D, P, d, C, b, v, F, S, q, I = A && A.split("/"),
                  k = h.map,
                  N = k && k["*"] || {};
                if (f) {
                  for (f = f.split("/"), P = f.length - 1, h.nodeIdCompat && y.test(f[P]) && (f[P] = f[P].replace(y, "")), f[0].charAt(0) === "." && I && (q = I.slice(0, I.length - 1), f = q.concat(f)), v = 0; v < f.length; v++)
                    if (S = f[v], S === ".") f.splice(v, 1), v -= 1;
                    else if (S === "..") {
                    if (v === 0 || v === 1 && f[2] === ".." || f[v - 1] === "..") continue;
                    v > 0 && (f.splice(v - 1, 2), v -= 2)
                  }
                  f = f.join("/")
                }
                if ((I || N) && k) {
                  for (w = f.split("/"), v = w.length; v > 0; v -= 1) {
                    if (B = w.slice(0, v).join("/"), I) {
                      for (F = I.length; F > 0; F -= 1)
                        if (x = k[I.slice(0, F).join("/")], x && (x = x[B], x)) {
                          D = x, d = v;
                          break
                        }
                    }
                    if (D) break;
                    !C && N && N[B] && (C = N[B], b = v)
                  }!D && C && (D = C, d = b), D && (w.splice(0, d, D), f = w.join("/"))
                }
                return f
              }

              function O(f, A) {
                return function () {
                  var w = _.call(arguments, 0);
                  return typeof w[0] != "string" && w.length === 1 && w.push(null), e.apply(r, w.concat([f, A]))
                }
              }

              function T(f) {
                return function (A) {
                  return E(A, f)
                }
              }

              function z(f) {
                return function (A) {
                  o[f] = A
                }
              }

              function M(f) {
                if (m(a, f)) {
                  var A = a[f];
                  delete a[f], c[f] = !0, t.apply(r, A)
                }
                if (!m(o, f) && !m(c, f)) throw new Error("No " + f);
                return o[f]
              }

              function j(f) {
                var A, w = f ? f.indexOf("!") : -1;
                return w > -1 && (A = f.substring(0, w), f = f.substring(w + 1, f.length)), [A, f]
              }

              function G(f) {
                return f ? j(f) : []
              }
              n = function (f, A) {
                var w, B = j(f),
                  x = B[0],
                  D = A[1];
                return f = B[1], x && (x = E(x, D), w = M(x)), x ? w && w.normalize ? f = w.normalize(f, T(D)) : f = E(f, D) : (f = E(f, D), B = j(f), x = B[0], f = B[1], x && (w = M(x))), {
                  f: x ? x + "!" + f : f,
                  n: f,
                  pr: x,
                  p: w
                }
              };

              function V(f) {
                return function () {
                  return h && h.config && h.config[f] || {}
                }
              }
              i = {
                require: function (f) {
                  return O(f)
                },
                exports: function (f) {
                  var A = o[f];
                  return typeof A < "u" ? A : o[f] = {}
                },
                module: function (f) {
                  return {
                    id: f,
                    uri: "",
                    exports: o[f],
                    config: V(f)
                  }
                }
              }, t = function (f, A, w, B) {
                var x, D, P, d, C, b, v = [],
                  F = typeof w,
                  S;
                if (B = B || f, b = G(B), F === "undefined" || F === "function") {
                  for (A = !A.length && w.length ? ["require", "exports", "module"] : A, C = 0; C < A.length; C += 1)
                    if (d = n(A[C], b), D = d.f, D === "require") v[C] = i.require(f);
                    else if (D === "exports") v[C] = i.exports(f), S = !0;
                  else if (D === "module") x = v[C] = i.module(f);
                  else if (m(o, D) || m(a, D) || m(c, D)) v[C] = M(D);
                  else if (d.p) d.p.load(d.n, O(B, !0), z(D), {}), v[C] = o[D];
                  else throw new Error(f + " missing " + D);
                  P = w ? w.apply(o[f], v) : void 0, f && (x && x.exports !== r && x.exports !== o[f] ? o[f] = x.exports : (P !== r || !S) && (o[f] = P))
                } else f && (o[f] = w)
              }, u = l = e = function (f, A, w, B, x) {
                if (typeof f == "string") return i[f] ? i[f](A) : M(n(f, G(A)).f);
                if (!f.splice) {
                  if (h = f, h.deps && e(h.deps, h.callback), !A) return;
                  A.splice ? (f = A, A = w, w = null) : f = r
                }
                return A = A || function () {}, typeof w == "function" && (w = B, B = x), B ? t(r, f, A, w) : setTimeout(function () {
                  t(r, f, A, w)
                }, 4), e
              }, e.config = function (f) {
                return e(f)
              }, u._defined = o, s = function (f, A, w) {
                if (typeof f != "string") throw new Error("See almond README: incorrect module build, no module name");
                A.splice || (w = A, A = []), !m(o, f) && !m(a, f) && (a[f] = [f, A, w])
              }, s.amd = {
                jQuery: !0
              }
            })(), g.requirejs = u, g.require = l, g.define = s
          }
        })(), g.define("almond", function () {}), g.define("jquery", [], function () {
          var u = L || $;
          return u == null && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), u
        }), g.define("select2/utils", ["jquery"], function (u) {
          var l = {};
          l.Extend = function (e, n) {
            var i = {}.hasOwnProperty;

            function o() {
              this.constructor = e
            }
            for (var a in n) i.call(n, a) && (e[a] = n[a]);
            return o.prototype = n.prototype, e.prototype = new o, e.__super__ = n.prototype, e
          };

          function s(e) {
            var n = e.prototype,
              i = [];
            for (var o in n) {
              var a = n[o];
              typeof a == "function" && o !== "constructor" && i.push(o)
            }
            return i
          }
          l.Decorate = function (e, n) {
            var i = s(n),
              o = s(e);

            function a() {
              var E = Array.prototype.unshift,
                O = n.prototype.constructor.length,
                T = e.prototype.constructor;
              O > 0 && (E.call(arguments, e.prototype.constructor), T = n.prototype.constructor), T.apply(this, arguments)
            }
            n.displayName = e.displayName;

            function h() {
              this.constructor = a
            }
            a.prototype = new h;
            for (var c = 0; c < o.length; c++) {
              var p = o[c];
              a.prototype[p] = e.prototype[p]
            }
            for (var _ = function (E) {
                var O = function () {};
                E in a.prototype && (O = a.prototype[E]);
                var T = n.prototype[E];
                return function () {
                  var z = Array.prototype.unshift;
                  return z.call(arguments, O), T.apply(this, arguments)
                }
              }, y = 0; y < i.length; y++) {
              var m = i[y];
              a.prototype[m] = _(m)
            }
            return a
          };
          var r = function () {
            this.listeners = {}
          };
          r.prototype.on = function (e, n) {
            this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(n) : this.listeners[e] = [n]
          }, r.prototype.trigger = function (e) {
            var n = Array.prototype.slice,
              i = n.call(arguments, 1);
            this.listeners = this.listeners || {}, i == null && (i = []), i.length === 0 && i.push({}), i[0]._type = e, e in this.listeners && this.invoke(this.listeners[e], n.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
          }, r.prototype.invoke = function (e, n) {
            for (var i = 0, o = e.length; i < o; i++) e[i].apply(this, n)
          }, l.Observable = r, l.generateChars = function (e) {
            for (var n = "", i = 0; i < e; i++) {
              var o = Math.floor(Math.random() * 36);
              n += o.toString(36)
            }
            return n
          }, l.bind = function (e, n) {
            return function () {
              e.apply(n, arguments)
            }
          }, l._convertData = function (e) {
            for (var n in e) {
              var i = n.split("-"),
                o = e;
              if (i.length !== 1) {
                for (var a = 0; a < i.length; a++) {
                  var h = i[a];
                  h = h.substring(0, 1).toLowerCase() + h.substring(1), h in o || (o[h] = {}), a == i.length - 1 && (o[h] = e[n]), o = o[h]
                }
                delete e[n]
              }
            }
            return e
          }, l.hasScroll = function (e, n) {
            var i = u(n),
              o = n.style.overflowX,
              a = n.style.overflowY;
            return o === a && (a === "hidden" || a === "visible") ? !1 : o === "scroll" || a === "scroll" ? !0 : i.innerHeight() < n.scrollHeight || i.innerWidth() < n.scrollWidth
          }, l.escapeMarkup = function (e) {
            var n = {
              "\\": "&#92;",
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
              "/": "&#47;"
            };
            return typeof e != "string" ? e : String(e).replace(/[&<>"'\/\\]/g, function (i) {
              return n[i]
            })
          }, l.appendMany = function (e, n) {
            if (u.fn.jquery.substr(0, 3) === "1.7") {
              var i = u();
              u.map(n, function (o) {
                i = i.add(o)
              }), n = i
            }
            e.append(n)
          }, l.__cache = {};
          var t = 0;
          return l.GetUniqueElementId = function (e) {
            var n = e.getAttribute("data-select2-id");
            return n == null && (e.id ? (n = e.id, e.setAttribute("data-select2-id", n)) : (e.setAttribute("data-select2-id", ++t), n = t.toString())), n
          }, l.StoreData = function (e, n, i) {
            var o = l.GetUniqueElementId(e);
            l.__cache[o] || (l.__cache[o] = {}), l.__cache[o][n] = i
          }, l.GetData = function (e, n) {
            var i = l.GetUniqueElementId(e);
            return n ? l.__cache[i] && l.__cache[i][n] != null ? l.__cache[i][n] : u(e).data(n) : l.__cache[i]
          }, l.RemoveData = function (e) {
            var n = l.GetUniqueElementId(e);
            l.__cache[n] != null && delete l.__cache[n], e.removeAttribute("data-select2-id")
          }, l
        }), g.define("select2/results", ["jquery", "./utils"], function (u, l) {
          function s(r, t, e) {
            this.$element = r, this.data = e, this.options = t, s.__super__.constructor.call(this)
          }
          return l.Extend(s, l.Observable), s.prototype.render = function () {
            var r = u('<ul class="select2-results__options" role="listbox"></ul>');
            return this.options.get("multiple") && r.attr("aria-multiselectable", "true"), this.$results = r, r
          }, s.prototype.clear = function () {
            this.$results.empty()
          }, s.prototype.displayMessage = function (r) {
            var t = this.options.get("escapeMarkup");
            this.clear(), this.hideLoading();
            var e = u('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),
              n = this.options.get("translations").get(r.message);
            e.append(t(n(r.args))), e[0].className += " select2-results__message", this.$results.append(e)
          }, s.prototype.hideMessages = function () {
            this.$results.find(".select2-results__message").remove()
          }, s.prototype.append = function (r) {
            this.hideLoading();
            var t = [];
            if (r.results == null || r.results.length === 0) {
              this.$results.children().length === 0 && this.trigger("results:message", {
                message: "noResults"
              });
              return
            }
            r.results = this.sort(r.results);
            for (var e = 0; e < r.results.length; e++) {
              var n = r.results[e],
                i = this.option(n);
              t.push(i)
            }
            this.$results.append(t)
          }, s.prototype.position = function (r, t) {
            var e = t.find(".select2-results");
            e.append(r)
          }, s.prototype.sort = function (r) {
            var t = this.options.get("sorter");
            return t(r)
          }, s.prototype.highlightFirstItem = function () {
            var r = this.$results.find(".select2-results__option[aria-selected]"),
              t = r.filter("[aria-selected=true]");
            t.length > 0 ? t.first().trigger("mouseenter") : r.first().trigger("mouseenter"), this.ensureHighlightVisible()
          }, s.prototype.setClasses = function () {
            var r = this;
            this.data.current(function (t) {
              var e = u.map(t, function (i) {
                  return i.id.toString()
                }),
                n = r.$results.find(".select2-results__option[aria-selected]");
              n.each(function () {
                var i = u(this),
                  o = l.GetData(this, "data"),
                  a = "" + o.id;
                o.element != null && o.element.selected || o.element == null && u.inArray(a, e) > -1 ? i.attr("aria-selected", "true") : i.attr("aria-selected", "false")
              })
            })
          }, s.prototype.showLoading = function (r) {
            this.hideLoading();
            var t = this.options.get("translations").get("searching"),
              e = {
                disabled: !0,
                loading: !0,
                text: t(r)
              },
              n = this.option(e);
            n.className += " loading-results", this.$results.prepend(n)
          }, s.prototype.hideLoading = function () {
            this.$results.find(".loading-results").remove()
          }, s.prototype.option = function (r) {
            var t = document.createElement("li");
            t.className = "select2-results__option";
            var e = {
                role: "option",
                "aria-selected": "false"
              },
              n = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
            (r.element != null && n.call(r.element, ":disabled") || r.element == null && r.disabled) && (delete e["aria-selected"], e["aria-disabled"] = "true"), r.id == null && delete e["aria-selected"], r._resultId != null && (t.id = r._resultId), r.title && (t.title = r.title), r.children && (e.role = "group", e["aria-label"] = r.text, delete e["aria-selected"]);
            for (var i in e) {
              var o = e[i];
              t.setAttribute(i, o)
            }
            if (r.children) {
              var a = u(t),
                h = document.createElement("strong");
              h.className = "select2-results__group", u(h), this.template(r, h);
              for (var c = [], p = 0; p < r.children.length; p++) {
                var _ = r.children[p],
                  y = this.option(_);
                c.push(y)
              }
              var m = u("<ul></ul>", {
                class: "select2-results__options select2-results__options--nested"
              });
              m.append(c), a.append(h), a.append(m)
            } else this.template(r, t);
            return l.StoreData(t, "data", r), t
          }, s.prototype.bind = function (r, t) {
            var e = this,
              n = r.id + "-results";
            this.$results.attr("id", n), r.on("results:all", function (i) {
              e.clear(), e.append(i.data), r.isOpen() && (e.setClasses(), e.highlightFirstItem())
            }), r.on("results:append", function (i) {
              e.append(i.data), r.isOpen() && e.setClasses()
            }), r.on("query", function (i) {
              e.hideMessages(), e.showLoading(i)
            }), r.on("select", function () {
              r.isOpen() && (e.setClasses(), e.options.get("scrollAfterSelect") && e.highlightFirstItem())
            }), r.on("unselect", function () {
              r.isOpen() && (e.setClasses(), e.options.get("scrollAfterSelect") && e.highlightFirstItem())
            }), r.on("open", function () {
              e.$results.attr("aria-expanded", "true"), e.$results.attr("aria-hidden", "false"), e.setClasses(), e.ensureHighlightVisible()
            }), r.on("close", function () {
              e.$results.attr("aria-expanded", "false"), e.$results.attr("aria-hidden", "true"), e.$results.removeAttr("aria-activedescendant")
            }), r.on("results:toggle", function () {
              var i = e.getHighlightedResults();
              i.length !== 0 && i.trigger("mouseup")
            }), r.on("results:select", function () {
              var i = e.getHighlightedResults();
              if (i.length !== 0) {
                var o = l.GetData(i[0], "data");
                i.attr("aria-selected") == "true" ? e.trigger("close", {}) : e.trigger("select", {
                  data: o
                })
              }
            }), r.on("results:previous", function () {
              var i = e.getHighlightedResults(),
                o = e.$results.find("[aria-selected]"),
                a = o.index(i);
              if (!(a <= 0)) {
                var h = a - 1;
                i.length === 0 && (h = 0);
                var c = o.eq(h);
                c.trigger("mouseenter");
                var p = e.$results.offset().top,
                  _ = c.offset().top,
                  y = e.$results.scrollTop() + (_ - p);
                h === 0 ? e.$results.scrollTop(0) : _ - p < 0 && e.$results.scrollTop(y)
              }
            }), r.on("results:next", function () {
              var i = e.getHighlightedResults(),
                o = e.$results.find("[aria-selected]"),
                a = o.index(i),
                h = a + 1;
              if (!(h >= o.length)) {
                var c = o.eq(h);
                c.trigger("mouseenter");
                var p = e.$results.offset().top + e.$results.outerHeight(!1),
                  _ = c.offset().top + c.outerHeight(!1),
                  y = e.$results.scrollTop() + _ - p;
                h === 0 ? e.$results.scrollTop(0) : _ > p && e.$results.scrollTop(y)
              }
            }), r.on("results:focus", function (i) {
              i.element.addClass("select2-results__option--highlighted")
            }), r.on("results:message", function (i) {
              e.displayMessage(i)
            }), u.fn.mousewheel && this.$results.on("mousewheel", function (i) {
              var o = e.$results.scrollTop(),
                a = e.$results.get(0).scrollHeight - o + i.deltaY,
                h = i.deltaY > 0 && o - i.deltaY <= 0,
                c = i.deltaY < 0 && a <= e.$results.height();
              h ? (e.$results.scrollTop(0), i.preventDefault(), i.stopPropagation()) : c && (e.$results.scrollTop(e.$results.get(0).scrollHeight - e.$results.height()), i.preventDefault(), i.stopPropagation())
            }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (i) {
              var o = u(this),
                a = l.GetData(this, "data");
              if (o.attr("aria-selected") === "true") {
                e.options.get("multiple") ? e.trigger("unselect", {
                  originalEvent: i,
                  data: a
                }) : e.trigger("close", {});
                return
              }
              e.trigger("select", {
                originalEvent: i,
                data: a
              })
            }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (i) {
              var o = l.GetData(this, "data");
              e.getHighlightedResults().removeClass("select2-results__option--highlighted"), e.trigger("results:focus", {
                data: o,
                element: u(this)
              })
            })
          }, s.prototype.getHighlightedResults = function () {
            var r = this.$results.find(".select2-results__option--highlighted");
            return r
          }, s.prototype.destroy = function () {
            this.$results.remove()
          }, s.prototype.ensureHighlightVisible = function () {
            var r = this.getHighlightedResults();
            if (r.length !== 0) {
              var t = this.$results.find("[aria-selected]"),
                e = t.index(r),
                n = this.$results.offset().top,
                i = r.offset().top,
                o = this.$results.scrollTop() + (i - n),
                a = i - n;
              o -= r.outerHeight(!1) * 2, e <= 2 ? this.$results.scrollTop(0) : (a > this.$results.outerHeight() || a < 0) && this.$results.scrollTop(o)
            }
          }, s.prototype.template = function (r, t) {
            var e = this.options.get("templateResult"),
              n = this.options.get("escapeMarkup"),
              i = e(r, t);
            i == null ? t.style.display = "none" : typeof i == "string" ? t.innerHTML = n(i) : u(t).append(i)
          }, s
        }), g.define("select2/keys", [], function () {
          var u = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          };
          return u
        }), g.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (u, l, s) {
          function r(t, e) {
            this.$element = t, this.options = e, r.__super__.constructor.call(this)
          }
          return l.Extend(r, l.Observable), r.prototype.render = function () {
            var t = u('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
            return this._tabindex = 0, l.GetData(this.$element[0], "old-tabindex") != null ? this._tabindex = l.GetData(this.$element[0], "old-tabindex") : this.$element.attr("tabindex") != null && (this._tabindex = this.$element.attr("tabindex")), t.attr("title", this.$element.attr("title")), t.attr("tabindex", this._tabindex), t.attr("aria-disabled", "false"), this.$selection = t, t
          }, r.prototype.bind = function (t, e) {
            var n = this,
              i = t.id + "-results";
            this.container = t, this.$selection.on("focus", function (o) {
              n.trigger("focus", o)
            }), this.$selection.on("blur", function (o) {
              n._handleBlur(o)
            }), this.$selection.on("keydown", function (o) {
              n.trigger("keypress", o), o.which === s.SPACE && o.preventDefault()
            }), t.on("results:focus", function (o) {
              n.$selection.attr("aria-activedescendant", o.data._resultId)
            }), t.on("selection:update", function (o) {
              n.update(o.data)
            }), t.on("open", function () {
              n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", i), n._attachCloseHandler(t)
            }), t.on("close", function () {
              n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.trigger("focus"), n._detachCloseHandler(t)
            }), t.on("enable", function () {
              n.$selection.attr("tabindex", n._tabindex), n.$selection.attr("aria-disabled", "false")
            }), t.on("disable", function () {
              n.$selection.attr("tabindex", "-1"), n.$selection.attr("aria-disabled", "true")
            })
          }, r.prototype._handleBlur = function (t) {
            var e = this;
            window.setTimeout(function () {
              document.activeElement == e.$selection[0] || u.contains(e.$selection[0], document.activeElement) || e.trigger("blur", t)
            }, 1)
          }, r.prototype._attachCloseHandler = function (t) {
            u(document.body).on("mousedown.select2." + t.id, function (e) {
              var n = u(e.target),
                i = n.closest(".select2"),
                o = u(".select2.select2-container--open");
              o.each(function () {
                if (this != i[0]) {
                  var a = l.GetData(this, "element");
                  a.select2("close")
                }
              })
            })
          }, r.prototype._detachCloseHandler = function (t) {
            u(document.body).off("mousedown.select2." + t.id)
          }, r.prototype.position = function (t, e) {
            var n = e.find(".selection");
            n.append(t)
          }, r.prototype.destroy = function () {
            this._detachCloseHandler(this.container)
          }, r.prototype.update = function (t) {
            throw new Error("The `update` method must be defined in child classes.")
          }, r.prototype.isEnabled = function () {
            return !this.isDisabled()
          }, r.prototype.isDisabled = function () {
            return this.options.get("disabled")
          }, r
        }), g.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (u, l, s, r) {
          function t() {
            t.__super__.constructor.apply(this, arguments)
          }
          return s.Extend(t, l), t.prototype.render = function () {
            var e = t.__super__.render.call(this);
            return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e
          }, t.prototype.bind = function (e, n) {
            var i = this;
            t.__super__.bind.apply(this, arguments);
            var o = e.id + "-container";
            this.$selection.find(".select2-selection__rendered").attr("id", o).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", o), this.$selection.on("mousedown", function (a) {
              a.which === 1 && i.trigger("toggle", {
                originalEvent: a
              })
            }), this.$selection.on("focus", function (a) {}), this.$selection.on("blur", function (a) {}), e.on("focus", function (a) {
              e.isOpen() || i.$selection.trigger("focus")
            })
          }, t.prototype.clear = function () {
            var e = this.$selection.find(".select2-selection__rendered");
            e.empty(), e.removeAttr("title")
          }, t.prototype.display = function (e, n) {
            var i = this.options.get("templateSelection"),
              o = this.options.get("escapeMarkup");
            return o(i(e, n))
          }, t.prototype.selectionContainer = function () {
            return u("<span></span>")
          }, t.prototype.update = function (e) {
            if (e.length === 0) {
              this.clear();
              return
            }
            var n = e[0],
              i = this.$selection.find(".select2-selection__rendered"),
              o = this.display(n, i);
            i.empty().append(o);
            var a = n.title || n.text;
            a ? i.attr("title", a) : i.removeAttr("title")
          }, t
        }), g.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (u, l, s) {
          function r(t, e) {
            r.__super__.constructor.apply(this, arguments)
          }
          return s.Extend(r, l), r.prototype.render = function () {
            var t = r.__super__.render.call(this);
            return t.addClass("select2-selection--multiple"), t.html('<ul class="select2-selection__rendered"></ul>'), t
          }, r.prototype.bind = function (t, e) {
            var n = this;
            r.__super__.bind.apply(this, arguments), this.$selection.on("click", function (i) {
              n.trigger("toggle", {
                originalEvent: i
              })
            }), this.$selection.on("click", ".select2-selection__choice__remove", function (i) {
              if (!n.isDisabled()) {
                var o = u(this),
                  a = o.parent(),
                  h = s.GetData(a[0], "data");
                n.trigger("unselect", {
                  originalEvent: i,
                  data: h
                })
              }
            })
          }, r.prototype.clear = function () {
            var t = this.$selection.find(".select2-selection__rendered");
            t.empty(), t.removeAttr("title")
          }, r.prototype.display = function (t, e) {
            var n = this.options.get("templateSelection"),
              i = this.options.get("escapeMarkup");
            return i(n(t, e))
          }, r.prototype.selectionContainer = function () {
            var t = u('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
            return t
          }, r.prototype.update = function (t) {
            if (this.clear(), t.length !== 0) {
              for (var e = [], n = 0; n < t.length; n++) {
                var i = t[n],
                  o = this.selectionContainer(),
                  a = this.display(i, o);
                o.append(a);
                var h = i.title || i.text;
                h && o.attr("title", h), s.StoreData(o[0], "data", i), e.push(o)
              }
              var c = this.$selection.find(".select2-selection__rendered");
              s.appendMany(c, e)
            }
          }, r
        }), g.define("select2/selection/placeholder", ["../utils"], function (u) {
          function l(s, r, t) {
            this.placeholder = this.normalizePlaceholder(t.get("placeholder")), s.call(this, r, t)
          }
          return l.prototype.normalizePlaceholder = function (s, r) {
            return typeof r == "string" && (r = {
              id: "",
              text: r
            }), r
          }, l.prototype.createPlaceholder = function (s, r) {
            var t = this.selectionContainer();
            return t.html(this.display(r)), t.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), t
          }, l.prototype.update = function (s, r) {
            var t = r.length == 1 && r[0].id != this.placeholder.id,
              e = r.length > 1;
            if (e || t) return s.call(this, r);
            this.clear();
            var n = this.createPlaceholder(this.placeholder);
            this.$selection.find(".select2-selection__rendered").append(n)
          }, l
        }), g.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function (u, l, s) {
          function r() {}
          return r.prototype.bind = function (t, e, n) {
            var i = this;
            t.call(this, e, n), this.placeholder == null && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (o) {
              i._handleClear(o)
            }), e.on("keypress", function (o) {
              i._handleKeyboardClear(o, e)
            })
          }, r.prototype._handleClear = function (t, e) {
            if (!this.isDisabled()) {
              var n = this.$selection.find(".select2-selection__clear");
              if (n.length !== 0) {
                e.stopPropagation();
                var i = s.GetData(n[0], "data"),
                  o = this.$element.val();
                this.$element.val(this.placeholder.id);
                var a = {
                  data: i
                };
                if (this.trigger("clear", a), a.prevented) {
                  this.$element.val(o);
                  return
                }
                for (var h = 0; h < i.length; h++)
                  if (a = {
                      data: i[h]
                    }, this.trigger("unselect", a), a.prevented) {
                    this.$element.val(o);
                    return
                  } this.$element.trigger("input").trigger("change"), this.trigger("toggle", {})
              }
            }
          }, r.prototype._handleKeyboardClear = function (t, e, n) {
            n.isOpen() || (e.which == l.DELETE || e.which == l.BACKSPACE) && this._handleClear(e)
          }, r.prototype.update = function (t, e) {
            if (t.call(this, e), !(this.$selection.find(".select2-selection__placeholder").length > 0 || e.length === 0)) {
              var n = this.options.get("translations").get("removeAllItems"),
                i = u('<span class="select2-selection__clear" title="' + n() + '">&times;</span>');
              s.StoreData(i[0], "data", e), this.$selection.find(".select2-selection__rendered").prepend(i)
            }
          }, r
        }), g.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (u, l, s) {
          function r(t, e, n) {
            t.call(this, e, n)
          }
          return r.prototype.render = function (t) {
            var e = u('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></li>');
            this.$searchContainer = e, this.$search = e.find("input");
            var n = t.call(this);
            return this._transferTabIndex(), n
          }, r.prototype.bind = function (t, e, n) {
            var i = this,
              o = e.id + "-results";
            t.call(this, e, n), e.on("open", function () {
              i.$search.attr("aria-controls", o), i.$search.trigger("focus")
            }), e.on("close", function () {
              i.$search.val(""), i.$search.removeAttr("aria-controls"), i.$search.removeAttr("aria-activedescendant"), i.$search.trigger("focus")
            }), e.on("enable", function () {
              i.$search.prop("disabled", !1), i._transferTabIndex()
            }), e.on("disable", function () {
              i.$search.prop("disabled", !0)
            }), e.on("focus", function (c) {
              i.$search.trigger("focus")
            }), e.on("results:focus", function (c) {
              c.data._resultId ? i.$search.attr("aria-activedescendant", c.data._resultId) : i.$search.removeAttr("aria-activedescendant")
            }), this.$selection.on("focusin", ".select2-search--inline", function (c) {
              i.trigger("focus", c)
            }), this.$selection.on("focusout", ".select2-search--inline", function (c) {
              i._handleBlur(c)
            }), this.$selection.on("keydown", ".select2-search--inline", function (c) {
              c.stopPropagation(), i.trigger("keypress", c), i._keyUpPrevented = c.isDefaultPrevented();
              var p = c.which;
              if (p === s.BACKSPACE && i.$search.val() === "") {
                var _ = i.$searchContainer.prev(".select2-selection__choice");
                if (_.length > 0) {
                  var y = l.GetData(_[0], "data");
                  i.searchRemoveChoice(y), c.preventDefault()
                }
              }
            }), this.$selection.on("click", ".select2-search--inline", function (c) {
              i.$search.val() && c.stopPropagation()
            });
            var a = document.documentMode,
              h = a && a <= 11;
            this.$selection.on("input.searchcheck", ".select2-search--inline", function (c) {
              if (h) {
                i.$selection.off("input.search input.searchcheck");
                return
              }
              i.$selection.off("keyup.search")
            }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (c) {
              if (h && c.type === "input") {
                i.$selection.off("input.search input.searchcheck");
                return
              }
              var p = c.which;
              p == s.SHIFT || p == s.CTRL || p == s.ALT || p != s.TAB && i.handleSearch(c)
            })
          }, r.prototype._transferTabIndex = function (t) {
            this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
          }, r.prototype.createPlaceholder = function (t, e) {
            this.$search.attr("placeholder", e.text)
          }, r.prototype.update = function (t, e) {
            var n = this.$search[0] == document.activeElement;
            this.$search.attr("placeholder", ""), t.call(this, e), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.trigger("focus")
          }, r.prototype.handleSearch = function () {
            if (this.resizeSearch(), !this._keyUpPrevented) {
              var t = this.$search.val();
              this.trigger("query", {
                term: t
              })
            }
            this._keyUpPrevented = !1
          }, r.prototype.searchRemoveChoice = function (t, e) {
            this.trigger("unselect", {
              data: e
            }), this.$search.val(e.text), this.handleSearch()
          }, r.prototype.resizeSearch = function () {
            this.$search.css("width", "25px");
            var t = "";
            if (this.$search.attr("placeholder") !== "") t = this.$selection.find(".select2-selection__rendered").width();
            else {
              var e = this.$search.val().length + 1;
              t = e * .75 + "em"
            }
            this.$search.css("width", t)
          }, r
        }), g.define("select2/selection/eventRelay", ["jquery"], function (u) {
          function l() {}
          return l.prototype.bind = function (s, r, t) {
            var e = this,
              n = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
              i = ["opening", "closing", "selecting", "unselecting", "clearing"];
            s.call(this, r, t), r.on("*", function (o, a) {
              if (u.inArray(o, n) !== -1) {
                a = a || {};
                var h = u.Event("select2:" + o, {
                  params: a
                });
                e.$element.trigger(h), u.inArray(o, i) !== -1 && (a.prevented = h.isDefaultPrevented())
              }
            })
          }, l
        }), g.define("select2/translation", ["jquery", "require"], function (u, l) {
          function s(r) {
            this.dict = r || {}
          }
          return s.prototype.all = function () {
            return this.dict
          }, s.prototype.get = function (r) {
            return this.dict[r]
          }, s.prototype.extend = function (r) {
            this.dict = u.extend({}, r.all(), this.dict)
          }, s._cache = {}, s.loadPath = function (r) {
            if (!(r in s._cache)) {
              var t = l(r);
              s._cache[r] = t
            }
            return new s(s._cache[r])
          }, s
        }), g.define("select2/diacritics", [], function () {
          var u = {
            "â’¶": "A",
            ï¼¡: "A",
            Ã€: "A",
            Ã: "A",
            Ã‚: "A",
            áº¦: "A",
            áº¤: "A",
            áºª: "A",
            áº¨: "A",
            Ãƒ: "A",
            Ä€: "A",
            Ä‚: "A",
            áº°: "A",
            áº®: "A",
            áº´: "A",
            áº²: "A",
            È¦: "A",
            Ç: "A",
            Ã„: "A",
            Çž: "A",
            áº¢: "A",
            Ã…: "A",
            Çº: "A",
            Ç: "A",
            È€: "A",
            È‚: "A",
            áº: "A",
            áº¬: "A",
            áº¶: "A",
            á¸€: "A",
            Ä„: "A",
            "Èº": "A",
            "â±¯": "A",
            "êœ²": "AA",
            Ã†: "AE",
            Ç¼: "AE",
            Ç¢: "AE",
            "êœ´": "AO",
            "êœ¶": "AU",
            "êœ¸": "AV",
            "êœº": "AV",
            "êœ¼": "AY",
            "â’·": "B",
            ï¼¢: "B",
            á¸‚: "B",
            á¸„: "B",
            á¸†: "B",
            "Éƒ": "B",
            Æ‚: "B",
            Æ: "B",
            "â’¸": "C",
            ï¼£: "C",
            Ä†: "C",
            Äˆ: "C",
            ÄŠ: "C",
            ÄŒ: "C",
            Ã‡: "C",
            á¸ ˆ: "C",
            Æ‡: "C",
            "È»": "C",
            "êœ¾": "C",
            "â’¹": "D",
            ï¼¤: "D",
            á¸ Š: "D",
            ÄŽ: "D",
            á¸ Œ: "D",
            á¸: "D",
            á¸’: "D",
            á¸ Ž: "D",
            Ä: "D",
            Æ‹: "D",
            ÆŠ: "D",
            Æ‰: "D",
            "ê¹": "D",
            Ç±: "DZ",
            Ç„: "DZ",
            Ç²: "Dz",
            Ç…: "Dz",
            "â’º": "E",
            ï¼¥: "E",
            Ãˆ: "E",
            Ã‰: "E",
            ÃŠ: "E",
            á»€: "E",
            áº¾: "E",
            á»„: "E",
            á»‚: "E",
            áº¼: "E",
            Ä’: "E",
            á¸”: "E",
            á¸–: "E",
            Ä”: "E",
            Ä–: "E",
            Ã‹: "E",
            áºº: "E",
            Äš: "E",
            È„: "E",
            È†: "E",
            áº¸: "E",
            á»†: "E",
            È¨: "E",
            á¸ œ: "E",
            Ä˜: "E",
            á¸˜: "E",
            á¸ š: "E",
            Æ: "E",
            ÆŽ: "E",
            "â’»": "F",
            ï¼¦: "F",
            á¸ ž: "F",
            Æ‘: "F",
            "ê»": "F",
            "â’¼": "G",
            ï¼§: "G",
            Ç´: "G",
            Äœ: "G",
            á¸: "G",
            Äž: "G",
            Ä: "G",
            Ç¦: "G",
            Ä¢: "G",
            Ç¤: "G",
            Æ“: "G",
            "êž ": "G",
            "ê½": "G",
            "ê¾": "G",
            "â’½": "H",
            ï¼¨: "H",
            Ä¤: "H",
            á¸¢: "H",
            á¸¦: "H",
            Èž: "H",
            á¸¤: "H",
            á¸¨: "H",
            á¸ ª: "H",
            Ä¦: "H",
            "â±§": "H",
            "â±µ": "H",
            "êž": "H",
            "â’¾": "I",
            ï¼©: "I",
            ÃŒ: "I",
            Ã: "I",
            ÃŽ: "I",
            Ä¨: "I",
            Äª: "I",
            Ä¬: "I",
            Ä°: "I",
            Ã: "I",
            á¸®: "I",
            á» ˆ: "I",
            Ç: "I",
            Èˆ: "I",
            ÈŠ: "I",
            á» Š: "I",
            Ä®: "I",
            á¸¬: "I",
            Æ—: "I",
            "â’¿": "J",
            ï¼ ª: "J",
            Ä´: "J",
            "Éˆ": "J",
            "â“€": "K",
            ï¼«: "K",
            á¸°: "K",
            Ç¨: "K",
            á¸²: "K",
            Ä¶: "K",
            á¸´: "K",
            Æ˜: "K",
            "â±©": "K",
            "ê€": "K",
            "ê‚": "K",
            "ê„": "K",
            "êž¢": "K",
            "â“": "L",
            ï¼¬: "L",
            Ä¿: "L",
            Ä¹: "L",
            Ä½: "L",
            á¸¶: "L",
            á¸¸: "L",
            Ä»: "L",
            á¸¼: "L",
            á¸ º: "L",
            Å: "L",
            "È½": "L",
            "â±¢": "L",
            "â± ": "L",
            "êˆ": "L",
            "ê†": "L",
            "êž€": "L",
            Ç‡: "LJ",
            Çˆ: "Lj",
            "â“‚": "M",
            ï¼­: "M",
            á¸¾: "M",
            á¹€: "M",
            á¹‚: "M",
            "â±®": "M",
            Æœ: "M",
            "â“ƒ": "N",
            ï¼®: "N",
            Ç¸: "N",
            Åƒ: "N",
            Ã‘: "N",
            á¹„: "N",
            Å‡: "N",
            á¹†: "N",
            Å…: "N",
            á¹ Š: "N",
            á¹ ˆ: "N",
            "È ": "N",
            Æ: "N",
            "êž": "N",
            "êž¤": "N",
            ÇŠ: "NJ",
            Ç‹: "Nj",
            "â“„": "O",
            ï¼¯: "O",
            Ã’: "O",
            Ã“: "O",
            Ã”: "O",
            á»’: "O",
            á»: "O",
            á»–: "O",
            á»”: "O",
            Ã•: "O",
            á¹ Œ: "O",
            È¬: "O",
            á¹ Ž: "O",
            ÅŒ: "O",
            á¹: "O",
            á¹’: "O",
            ÅŽ: "O",
            È®: "O",
            È°: "O",
            Ã–: "O",
            Èª: "O",
            á» Ž: "O",
            Å: "O",
            Ç‘: "O",
            ÈŒ: "O",
            ÈŽ: "O",
            Æ: "O",
            á» œ: "O",
            á» š: "O",
            á»: "O",
            á» ž: "O",
            á»¢: "O",
            á» Œ: "O",
            á»˜: "O",
            Çª: "O",
            Ç¬: "O",
            Ã˜: "O",
            Ç¾: "O",
            Æ†: "O",
            ÆŸ: "O",
            "êŠ": "O",
            "êŒ": "O",
            Å’: "OE",
            Æ¢: "OI",
            "êŽ": "OO",
            È¢: "OU",
            "â“…": "P",
            ï¼°: "P",
            á¹”: "P",
            á¹–: "P",
            Æ¤: "P",
            "â±£": "P",
            "ê": "P",
            "ê’": "P",
            "ê”": "P",
            "â“†": "Q",
            ï¼±: "Q",
            "ê–": "Q",
            "ê˜": "Q",
            "ÉŠ": "Q",
            "â“‡": "R",
            ï¼²: "R",
            Å”: "R",
            á¹˜: "R",
            Å˜: "R",
            È: "R",
            È’: "R",
            á¹ š: "R",
            á¹ œ: "R",
            Å–: "R",
            á¹ ž: "R",
            "ÉŒ": "R",
            "â±¤": "R",
            "êš": "R",
            "êž¦": "R",
            "êž‚": "R",
            "â“ˆ": "S",
            ï¼³: "S",
            "áºž": "S",
            Åš: "S",
            á¹¤: "S",
            Åœ: "S",
            á¹: "S",
            Å: "S",
            á¹¦: "S",
            á¹¢: "S",
            á¹¨: "S",
            È˜: "S",
            Åž: "S",
            "â±¾": "S",
            "êž¨": "S",
            "êž„": "S",
            "â“‰": "T",
            ï¼´: "T",
            á¹ ª: "T",
            Å¤: "T",
            á¹¬: "T",
            Èš: "T",
            Å¢: "T",
            á¹°: "T",
            á¹®: "T",
            Å¦: "T",
            Æ¬: "T",
            Æ®: "T",
            "È¾": "T",
            "êž†": "T",
            "êœ¨": "TZ",
            "â“Š": "U",
            ï¼ µ: "U",
            Ã™: "U",
            Ãš: "U",
            Ã›: "U",
            Å¨: "U",
            á¹¸: "U",
            Åª: "U",
            á¹ º: "U",
            Å¬: "U",
            Ãœ: "U",
            Ç›: "U",
            Ç—: "U",
            Ç•: "U",
            Ç™: "U",
            á»¦: "U",
            Å®: "U",
            Å°: "U",
            Ç“: "U",
            È”: "U",
            È–: "U",
            Æ¯: "U",
            á» ª: "U",
            á»¨: "U",
            á»®: "U",
            á»¬: "U",
            á»°: "U",
            á»¤: "U",
            á¹²: "U",
            Å²: "U",
            á¹¶: "U",
            á¹´: "U",
            "É„": "U",
            "â“‹": "V",
            ï¼¶: "V",
            á¹¼: "V",
            á¹¾: "V",
            Æ²: "V",
            "êž": "V",
            "É…": "V",
            "ê ": "VY",
            "â“Œ": "W",
            ï¼·: "W",
            áº€: "W",
            áº‚: "W",
            Å´: "W",
            áº†: "W",
            áº„: "W",
            áºˆ: "W",
            "â±²": "W",
            "â“": "X",
            ï¼¸: "X",
            áºŠ: "X",
            áºŒ: "X",
            "â“Ž": "Y",
            ï¼¹: "Y",
            á»²: "Y",
            Ã: "Y",
            Å¶: "Y",
            á»¸: "Y",
            È²: "Y",
            áºŽ: "Y",
            Å¸: "Y",
            á»¶: "Y",
            á»´: "Y",
            Æ³: "Y",
            "ÉŽ": "Y",
            "á»¾": "Y",
            "â“": "Z",
            ï¼ º: "Z",
            Å¹: "Z",
            áº: "Z",
            Å»: "Z",
            Å½: "Z",
            áº’: "Z",
            áº”: "Z",
            Æµ: "Z",
            È¤: "Z",
            "â±¿": "Z",
            "â±«": "Z",
            "ê¢": "Z",
            "â“": "a",
            ï½: "a",
            áºš: "a",
            Ã: "a",
            Ã¡: "a",
            Ã¢: "a",
            áº§: "a",
            áº¥: "a",
            áº«: "a",
            áº©: "a",
            Ã£: "a",
            Ä: "a",
            Äƒ: "a",
            áº±: "a",
            áº¯: "a",
            áºµ: "a",
            áº³: "a",
            È§: "a",
            Ç¡: "a",
            Ã¤: "a",
            ÇŸ: "a",
            áº£: "a",
            Ã¥: "a",
            Ç»: "a",
            ÇŽ: "a",
            È: "a",
            Èƒ: "a",
            áº¡: "a",
            áº­: "a",
            áº·: "a",
            á¸: "a",
            Ä…: "a",
            "â±¥": "a",
            É: "a",
            "êœ³": "aa",
            Ã¦: "ae",
            Ç½: "ae",
            Ç£: "ae",
            "êœµ": "ao",
            "êœ·": "au",
            "êœ¹": "av",
            "êœ»": "av",
            "êœ½": "ay",
            "â“‘": "b",
            ï½‚: "b",
            á¸ ƒ: "b",
            á¸…: "b",
            á¸‡: "b",
            Æ€: "b",
            Æƒ: "b",
            É“: "b",
            "â“’": "c",
            ï½ ƒ: "c",
            Ä‡: "c",
            Ä‰: "c",
            Ä‹: "c",
            Ä: "c",
            Ã§: "c",
            á¸‰: "c",
            Æˆ: "c",
            "È¼": "c",
            "êœ¿": "c",
            "â†„": "c",
            "â““": "d",
            ï½„: "d",
            á¸‹: "d",
            Ä: "d",
            á¸: "d",
            á¸‘: "d",
            á¸“: "d",
            á¸: "d",
            Ä‘: "d",
            ÆŒ: "d",
            É–: "d",
            É—: "d",
            "êº": "d",
            Ç³: "dz",
            Ç†: "dz",
            "â“”": "e",
            ï½…: "e",
            Ã¨: "e",
            Ã©: "e",
            Ãª: "e",
            á»: "e",
            áº¿: "e",
            á»…: "e",
            á» ƒ: "e",
            áº½: "e",
            Ä“: "e",
            á¸•: "e",
            á¸—: "e",
            Ä•: "e",
            Ä—: "e",
            Ã«: "e",
            áº»: "e",
            Ä›: "e",
            È…: "e",
            È‡: "e",
            áº¹: "e",
            á»‡: "e",
            È©: "e",
            á¸: "e",
            Ä™: "e",
            á¸™: "e",
            á¸›: "e",
            "É‡": "e",
            É›: "e",
            Ç: "e",
            "â“•": "f",
            ï½†: "f",
            á¸ Ÿ: "f",
            Æ’: "f",
            "ê¼": "f",
            "â“–": "g",
            ï½‡: "g",
            Çµ: "g",
            Ä: "g",
            á¸¡: "g",
            ÄŸ: "g",
            Ä¡: "g",
            Ç§: "g",
            Ä£: "g",
            Ç¥: "g",
            É: "g",
            "êž¡": "g",
            "áµ¹": "g",
            "ê¿": "g",
            "â“—": "h",
            ï½ ˆ: "h",
            Ä¥: "h",
            á¸£: "h",
            á¸§: "h",
            ÈŸ: "h",
            á¸¥: "h",
            á¸©: "h",
            á¸«: "h",
            áº–: "h",
            Ä§: "h",
            "â±¨": "h",
            "â±¶": "h",
            É¥: "h",
            Æ•: "hv",
            "â“˜": "i",
            ï½‰: "i",
            Ã¬: "i",
            Ã­: "i",
            Ã®: "i",
            Ä©: "i",
            Ä«: "i",
            Ä­: "i",
            Ã¯: "i",
            á¸¯: "i",
            á»‰: "i",
            Ç: "i",
            È‰: "i",
            È‹: "i",
            á»‹: "i",
            Ä¯: "i",
            á¸­: "i",
            É¨: "i",
            Ä±: "i",
            "â“™": "j",
            ï½ Š: "j",
            Äµ: "j",
            Ç°: "j",
            "É‰": "j",
            "â“š": "k",
            ï½‹: "k",
            á¸±: "k",
            Ç©: "k",
            á¸³: "k",
            Ä·: "k",
            á¸ µ: "k",
            Æ™: "k",
            "â±ª": "k",
            "ê": "k",
            "êƒ": "k",
            "ê…": "k",
            "êž£": "k",
            "â“›": "l",
            ï½ Œ: "l",
            Å€: "l",
            Äº: "l",
            Ä¾: "l",
            á¸·: "l",
            á¸¹: "l",
            Ä¼: "l",
            á¸½: "l",
            á¸»: "l",
            Å¿: "l",
            Å‚: "l",
            Æš: "l",
            É«: "l",
            "â±¡": "l",
            "ê‰": "l",
            "êž": "l",
            "ê‡": "l",
            Ç‰: "lj",
            "â“œ": "m",
            ï½: "m",
            á¸¿: "m",
            á¹: "m",
            á¹ ƒ: "m",
            É±: "m",
            É¯: "m",
            "â“": "n",
            ï½ Ž: "n",
            Ç¹: "n",
            Å„: "n",
            Ã±: "n",
            á¹…: "n",
            Åˆ: "n",
            á¹‡: "n",
            Å†: "n",
            á¹‹: "n",
            á¹‰: "n",
            Æž: "n",
            É²: "n",
            Å‰: "n",
            "êž‘": "n",
            "êž¥": "n",
            ÇŒ: "nj",
            "â“ž": "o",
            ï½: "o",
            Ã²: "o",
            Ã³: "o",
            Ã´: "o",
            á»“: "o",
            á»‘: "o",
            á»—: "o",
            á»•: "o",
            Ãµ: "o",
            á¹: "o",
            È­: "o",
            á¹: "o",
            Å: "o",
            á¹‘: "o",
            á¹“: "o",
            Å: "o",
            È¯: "o",
            È±: "o",
            Ã¶: "o",
            È«: "o",
            á»: "o",
            Å‘: "o",
            Ç’: "o",
            È: "o",
            È: "o",
            Æ¡: "o",
            á»: "o",
            á»›: "o",
            á»¡: "o",
            á» Ÿ: "o",
            á»£: "o",
            á»: "o",
            á»™: "o",
            Ç«: "o",
            Ç­: "o",
            Ã¸: "o",
            Ç¿: "o",
            É”: "o",
            "ê‹": "o",
            "ê": "o",
            Éµ: "o",
            Å“: "oe",
            Æ£: "oi",
            È£: "ou",
            "ê": "oo",
            "â“Ÿ": "p",
            ï½: "p",
            á¹•: "p",
            á¹—: "p",
            Æ¥: "p",
            "áµ½": "p",
            "ê‘": "p",
            "ê“": "p",
            "ê•": "p",
            "â“ ": "q",
            ï½‘: "q",
            "É‹": "q",
            "ê—": "q",
            "ê™": "q",
            "â“¡": "r",
            ï½’: "r",
            Å•: "r",
            á¹™: "r",
            Å™: "r",
            È‘: "r",
            È“: "r",
            á¹›: "r",
            á¹: "r",
            Å—: "r",
            á¹ Ÿ: "r",
            "É": "r",
            É½: "r",
            "ê›": "r",
            "êž§": "r",
            "êžƒ": "r",
            "â“¢": "s",
            ï½“: "s",
            ÃŸ: "s",
            Å›: "s",
            á¹¥: "s",
            Å: "s",
            á¹¡: "s",
            Å¡: "s",
            á¹§: "s",
            á¹£: "s",
            á¹©: "s",
            È™: "s",
            ÅŸ: "s",
            "È¿": "s",
            "êž©": "s",
            "êž…": "s",
            áº›: "s",
            "â“£": "t",
            ï½”: "t",
            á¹«: "t",
            áº—: "t",
            Å¥: "t",
            á¹­: "t",
            È›: "t",
            Å£: "t",
            á¹±: "t",
            á¹¯: "t",
            Å§: "t",
            Æ­: "t",
            Êˆ: "t",
            "â±¦": "t",
            "êž‡": "t",
            "êœ©": "tz",
            "â“¤": "u",
            ï½•: "u",
            Ã¹: "u",
            Ãº: "u",
            Ã»: "u",
            Å©: "u",
            á¹¹: "u",
            Å«: "u",
            á¹»: "u",
            Å­: "u",
            Ã¼: "u",
            Çœ: "u",
            Ç˜: "u",
            Ç–: "u",
            Çš: "u",
            á»§: "u",
            Å¯: "u",
            Å±: "u",
            Ç”: "u",
            È•: "u",
            È—: "u",
            Æ°: "u",
            á»«: "u",
            á»©: "u",
            á»¯: "u",
            á»­: "u",
            á»±: "u",
            á»¥: "u",
            á¹³: "u",
            Å³: "u",
            á¹·: "u",
            á¹ µ: "u",
            Ê‰: "u",
            "â“¥": "v",
            ï½–: "v",
            á¹½: "v",
            á¹¿: "v",
            Ê‹: "v",
            "êŸ": "v",
            ÊŒ: "v",
            "ê¡": "vy",
            "â“¦": "w",
            ï½—: "w",
            áº: "w",
            áºƒ: "w",
            Åµ: "w",
            áº‡: "w",
            áº…: "w",
            áº˜: "w",
            áº‰: "w",
            "â±³": "w",
            "â“§": "x",
            ï½˜: "x",
            áº‹: "x",
            áº: "x",
            "â“¨": "y",
            ï½™: "y",
            á»³: "y",
            Ã½: "y",
            Å·: "y",
            á»¹: "y",
            È³: "y",
            áº: "y",
            Ã¿: "y",
            á»·: "y",
            áº™: "y",
            á» µ: "y",
            Æ´: "y",
            "É": "y",
            "á»¿": "y",
            "â“©": "z",
            ï½ š: "z",
            Åº: "z",
            áº‘: "z",
            Å¼: "z",
            Å¾: "z",
            áº“: "z",
            áº•: "z",
            Æ¶: "z",
            È¥: "z",
            "É€": "z",
            "â±¬": "z",
            "ê£": "z",
            Î†: "Î‘",
            Îˆ: "Î•",
            Î‰: "Î—",
            ÎŠ: "Î™",
            Îª: "Î™",
            ÎŒ: "ÎŸ",
            ÎŽ: "Î¥",
            Î«: "Î¥",
            Î: "Î©",
            Î¬: "Î±",
            Î­: "Îµ",
            Î®: "Î·",
            Î¯: "Î¹",
            ÏŠ: "Î¹",
            Î: "Î¹",
            ÏŒ: "Î¿",
            Ï: "Ï…",
            Ï‹: "Ï…",
            Î°: "Ï…",
            ÏŽ: "Ï‰",
            Ï‚: "Ïƒ",
            "â€™": "'"
          };
          return u
        }), g.define("select2/data/base", ["../utils"], function (u) {
          function l(s, r) {
            l.__super__.constructor.call(this)
          }
          return u.Extend(l, u.Observable), l.prototype.current = function (s) {
            throw new Error("The `current` method must be defined in child classes.")
          }, l.prototype.query = function (s, r) {
            throw new Error("The `query` method must be defined in child classes.")
          }, l.prototype.bind = function (s, r) {}, l.prototype.destroy = function () {}, l.prototype.generateResultId = function (s, r) {
            var t = s.id + "-result-";
            return t += u.generateChars(4), r.id != null ? t += "-" + r.id.toString() : t += "-" + u.generateChars(4), t
          }, l
        }), g.define("select2/data/select", ["./base", "../utils", "jquery"], function (u, l, s) {
          function r(t, e) {
            this.$element = t, this.options = e, r.__super__.constructor.call(this)
          }
          return l.Extend(r, u), r.prototype.current = function (t) {
            var e = [],
              n = this;
            this.$element.find(":selected").each(function () {
              var i = s(this),
                o = n.item(i);
              e.push(o)
            }), t(e)
          }, r.prototype.select = function (t) {
            var e = this;
            if (t.selected = !0, s(t.element).is("option")) {
              t.element.selected = !0, this.$element.trigger("input").trigger("change");
              return
            }
            if (this.$element.prop("multiple")) this.current(function (i) {
              var o = [];
              t = [t], t.push.apply(t, i);
              for (var a = 0; a < t.length; a++) {
                var h = t[a].id;
                s.inArray(h, o) === -1 && o.push(h)
              }
              e.$element.val(o), e.$element.trigger("input").trigger("change")
            });
            else {
              var n = t.id;
              this.$element.val(n), this.$element.trigger("input").trigger("change")
            }
          }, r.prototype.unselect = function (t) {
            var e = this;
            if (this.$element.prop("multiple")) {
              if (t.selected = !1, s(t.element).is("option")) {
                t.element.selected = !1, this.$element.trigger("input").trigger("change");
                return
              }
              this.current(function (n) {
                for (var i = [], o = 0; o < n.length; o++) {
                  var a = n[o].id;
                  a !== t.id && s.inArray(a, i) === -1 && i.push(a)
                }
                e.$element.val(i), e.$element.trigger("input").trigger("change")
              })
            }
          }, r.prototype.bind = function (t, e) {
            var n = this;
            this.container = t, t.on("select", function (i) {
              n.select(i.data)
            }), t.on("unselect", function (i) {
              n.unselect(i.data)
            })
          }, r.prototype.destroy = function () {
            this.$element.find("*").each(function () {
              l.RemoveData(this)
            })
          }, r.prototype.query = function (t, e) {
            var n = [],
              i = this,
              o = this.$element.children();
            o.each(function () {
              var a = s(this);
              if (!(!a.is("option") && !a.is("optgroup"))) {
                var h = i.item(a),
                  c = i.matches(t, h);
                c !== null && n.push(c)
              }
            }), e({
              results: n
            })
          }, r.prototype.addOptions = function (t) {
            l.appendMany(this.$element, t)
          }, r.prototype.option = function (t) {
            var e;
            t.children ? (e = document.createElement("optgroup"), e.label = t.text) : (e = document.createElement("option"), e.textContent !== void 0 ? e.textContent = t.text : e.innerText = t.text), t.id !== void 0 && (e.value = t.id), t.disabled && (e.disabled = !0), t.selected && (e.selected = !0), t.title && (e.title = t.title);
            var n = s(e),
              i = this._normalizeItem(t);
            return i.element = e, l.StoreData(e, "data", i), n
          }, r.prototype.item = function (t) {
            var e = {};
            if (e = l.GetData(t[0], "data"), e != null) return e;
            if (t.is("option")) e = {
              id: t.val(),
              text: t.text(),
              disabled: t.prop("disabled"),
              selected: t.prop("selected"),
              title: t.prop("title")
            };
            else if (t.is("optgroup")) {
              e = {
                text: t.prop("label"),
                children: [],
                title: t.prop("title")
              };
              for (var n = t.children("option"), i = [], o = 0; o < n.length; o++) {
                var a = s(n[o]),
                  h = this.item(a);
                i.push(h)
              }
              e.children = i
            }
            return e = this._normalizeItem(e), e.element = t[0], l.StoreData(t[0], "data", e), e
          }, r.prototype._normalizeItem = function (t) {
            t !== Object(t) && (t = {
              id: t,
              text: t
            }), t = s.extend({}, {
              text: ""
            }, t);
            var e = {
              selected: !1,
              disabled: !1
            };
            return t.id != null && (t.id = t.id.toString()), t.text != null && (t.text = t.text.toString()), t._resultId == null && t.id && this.container != null && (t._resultId = this.generateResultId(this.container, t)), s.extend({}, e, t)
          }, r.prototype.matches = function (t, e) {
            var n = this.options.get("matcher");
            return n(t, e)
          }, r
        }), g.define("select2/data/array", ["./select", "../utils", "jquery"], function (u, l, s) {
          function r(t, e) {
            this._dataToConvert = e.get("data") || [], r.__super__.constructor.call(this, t, e)
          }
          return l.Extend(r, u), r.prototype.bind = function (t, e) {
            r.__super__.bind.call(this, t, e), this.addOptions(this.convertToOptions(this._dataToConvert))
          }, r.prototype.select = function (t) {
            var e = this.$element.find("option").filter(function (n, i) {
              return i.value == t.id.toString()
            });
            e.length === 0 && (e = this.option(t), this.addOptions(e)), r.__super__.select.call(this, t)
          }, r.prototype.convertToOptions = function (t) {
            var e = this,
              n = this.$element.find("option"),
              i = n.map(function () {
                return e.item(s(this)).id
              }).get(),
              o = [];

            function a(T) {
              return function () {
                return s(this).val() == T.id
              }
            }
            for (var h = 0; h < t.length; h++) {
              var c = this._normalizeItem(t[h]);
              if (s.inArray(c.id, i) >= 0) {
                var p = n.filter(a(c)),
                  _ = this.item(p),
                  y = s.extend(!0, {}, c, _),
                  m = this.option(y);
                p.replaceWith(m);
                continue
              }
              var E = this.option(c);
              if (c.children) {
                var O = this.convertToOptions(c.children);
                l.appendMany(E, O)
              }
              o.push(E)
            }
            return o
          }, r
        }), g.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (u, l, s) {
          function r(t, e) {
            this.ajaxOptions = this._applyDefaults(e.get("ajax")), this.ajaxOptions.processResults != null && (this.processResults = this.ajaxOptions.processResults), r.__super__.constructor.call(this, t, e)
          }
          return l.Extend(r, u), r.prototype._applyDefaults = function (t) {
            var e = {
              data: function (n) {
                return s.extend({}, n, {
                  q: n.term
                })
              },
              transport: function (n, i, o) {
                var a = s.ajax(n);
                return a.then(i), a.fail(o), a
              }
            };
            return s.extend({}, e, t, !0)
          }, r.prototype.processResults = function (t) {
            return t
          }, r.prototype.query = function (t, e) {
            var n = this;
            this._request != null && (s.isFunction(this._request.abort) && this._request.abort(), this._request = null);
            var i = s.extend({
              type: "GET"
            }, this.ajaxOptions);
            typeof i.url == "function" && (i.url = i.url.call(this.$element, t)), typeof i.data == "function" && (i.data = i.data.call(this.$element, t));

            function o() {
              var a = i.transport(i, function (h) {
                var c = n.processResults(h, t);
                n.options.get("debug") && window.console && console.error && (!c || !c.results || !s.isArray(c.results)) && console.error("Select2: The AJAX results did not return an array in the `results` key of the response."), e(c)
              }, function () {
                "status" in a && (a.status === 0 || a.status === "0") || n.trigger("results:message", {
                  message: "errorLoading"
                })
              });
              n._request = a
            }
            this.ajaxOptions.delay && t.term != null ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(o, this.ajaxOptions.delay)) : o()
          }, r
        }), g.define("select2/data/tags", ["jquery"], function (u) {
          function l(s, r, t) {
            var e = t.get("tags"),
              n = t.get("createTag");
            n !== void 0 && (this.createTag = n);
            var i = t.get("insertTag");
            if (i !== void 0 && (this.insertTag = i), s.call(this, r, t), u.isArray(e))
              for (var o = 0; o < e.length; o++) {
                var a = e[o],
                  h = this._normalizeItem(a),
                  c = this.option(h);
                this.$element.append(c)
              }
          }
          return l.prototype.query = function (s, r, t) {
            var e = this;
            if (this._removeOldTags(), r.term == null || r.page != null) {
              s.call(this, r, t);
              return
            }

            function n(i, o) {
              for (var a = i.results, h = 0; h < a.length; h++) {
                var c = a[h],
                  p = c.children != null && !n({
                    results: c.children
                  }, !0),
                  _ = (c.text || "").toUpperCase(),
                  y = (r.term || "").toUpperCase(),
                  m = _ === y;
                if (m || p) {
                  if (o) return !1;
                  i.data = a, t(i);
                  return
                }
              }
              if (o) return !0;
              var E = e.createTag(r);
              if (E != null) {
                var O = e.option(E);
                O.attr("data-select2-tag", !0), e.addOptions([O]), e.insertTag(a, E)
              }
              i.results = a, t(i)
            }
            s.call(this, r, n)
          }, l.prototype.createTag = function (s, r) {
            var t = u.trim(r.term);
            return t === "" ? null : {
              id: t,
              text: t
            }
          }, l.prototype.insertTag = function (s, r, t) {
            r.unshift(t)
          }, l.prototype._removeOldTags = function (s) {
            var r = this.$element.find("option[data-select2-tag]");
            r.each(function () {
              this.selected || u(this).remove()
            })
          }, l
        }), g.define("select2/data/tokenizer", ["jquery"], function (u) {
          function l(s, r, t) {
            var e = t.get("tokenizer");
            e !== void 0 && (this.tokenizer = e), s.call(this, r, t)
          }
          return l.prototype.bind = function (s, r, t) {
            s.call(this, r, t), this.$search = r.dropdown.$search || r.selection.$search || t.find(".select2-search__field")
          }, l.prototype.query = function (s, r, t) {
            var e = this;

            function n(a) {
              var h = e._normalizeItem(a),
                c = e.$element.find("option").filter(function () {
                  return u(this).val() === h.id
                });
              if (!c.length) {
                var p = e.option(h);
                p.attr("data-select2-tag", !0), e._removeOldTags(), e.addOptions([p])
              }
              i(h)
            }

            function i(a) {
              e.trigger("select", {
                data: a
              })
            }
            r.term = r.term || "";
            var o = this.tokenizer(r, this.options, n);
            o.term !== r.term && (this.$search.length && (this.$search.val(o.term), this.$search.trigger("focus")), r.term = o.term), s.call(this, r, t)
          }, l.prototype.tokenizer = function (s, r, t, e) {
            for (var n = t.get("tokenSeparators") || [], i = r.term, o = 0, a = this.createTag || function (y) {
                return {
                  id: y.term,
                  text: y.term
                }
              }; o < i.length;) {
              var h = i[o];
              if (u.inArray(h, n) === -1) {
                o++;
                continue
              }
              var c = i.substr(0, o),
                p = u.extend({}, r, {
                  term: c
                }),
                _ = a(p);
              if (_ == null) {
                o++;
                continue
              }
              e(_), i = i.substr(o + 1) || "", o = 0
            }
            return {
              term: i
            }
          }, l
        }), g.define("select2/data/minimumInputLength", [], function () {
          function u(l, s, r) {
            this.minimumInputLength = r.get("minimumInputLength"), l.call(this, s, r)
          }
          return u.prototype.query = function (l, s, r) {
            if (s.term = s.term || "", s.term.length < this.minimumInputLength) {
              this.trigger("results:message", {
                message: "inputTooShort",
                args: {
                  minimum: this.minimumInputLength,
                  input: s.term,
                  params: s
                }
              });
              return
            }
            l.call(this, s, r)
          }, u
        }), g.define("select2/data/maximumInputLength", [], function () {
          function u(l, s, r) {
            this.maximumInputLength = r.get("maximumInputLength"), l.call(this, s, r)
          }
          return u.prototype.query = function (l, s, r) {
            if (s.term = s.term || "", this.maximumInputLength > 0 && s.term.length > this.maximumInputLength) {
              this.trigger("results:message", {
                message: "inputTooLong",
                args: {
                  maximum: this.maximumInputLength,
                  input: s.term,
                  params: s
                }
              });
              return
            }
            l.call(this, s, r)
          }, u
        }), g.define("select2/data/maximumSelectionLength", [], function () {
          function u(l, s, r) {
            this.maximumSelectionLength = r.get("maximumSelectionLength"), l.call(this, s, r)
          }
          return u.prototype.bind = function (l, s, r) {
            var t = this;
            l.call(this, s, r), s.on("select", function () {
              t._checkIfMaximumSelected()
            })
          }, u.prototype.query = function (l, s, r) {
            var t = this;
            this._checkIfMaximumSelected(function () {
              l.call(t, s, r)
            })
          }, u.prototype._checkIfMaximumSelected = function (l, s) {
            var r = this;
            this.current(function (t) {
              var e = t != null ? t.length : 0;
              if (r.maximumSelectionLength > 0 && e >= r.maximumSelectionLength) {
                r.trigger("results:message", {
                  message: "maximumSelected",
                  args: {
                    maximum: r.maximumSelectionLength
                  }
                });
                return
              }
              s && s()
            })
          }, u
        }), g.define("select2/dropdown", ["jquery", "./utils"], function (u, l) {
          function s(r, t) {
            this.$element = r, this.options = t, s.__super__.constructor.call(this)
          }
          return l.Extend(s, l.Observable), s.prototype.render = function () {
            var r = u('<span class="select2-dropdown"><span class="select2-results"></span></span>');
            return r.attr("dir", this.options.get("dir")), this.$dropdown = r, r
          }, s.prototype.bind = function () {}, s.prototype.position = function (r, t) {}, s.prototype.destroy = function () {
            this.$dropdown.remove()
          }, s
        }), g.define("select2/dropdown/search", ["jquery", "../utils"], function (u, l) {
          function s() {}
          return s.prototype.render = function (r) {
            var t = r.call(this),
              e = u('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
            return this.$searchContainer = e, this.$search = e.find("input"), t.prepend(e), t
          }, s.prototype.bind = function (r, t, e) {
            var n = this,
              i = t.id + "-results";
            r.call(this, t, e), this.$search.on("keydown", function (o) {
              n.trigger("keypress", o), n._keyUpPrevented = o.isDefaultPrevented()
            }), this.$search.on("input", function (o) {
              u(this).off("keyup")
            }), this.$search.on("keyup input", function (o) {
              n.handleSearch(o)
            }), t.on("open", function () {
              n.$search.attr("tabindex", 0), n.$search.attr("aria-controls", i), n.$search.trigger("focus"), window.setTimeout(function () {
                n.$search.trigger("focus")
              }, 0)
            }), t.on("close", function () {
              n.$search.attr("tabindex", -1), n.$search.removeAttr("aria-controls"), n.$search.removeAttr("aria-activedescendant"), n.$search.val(""), n.$search.trigger("blur")
            }), t.on("focus", function () {
              t.isOpen() || n.$search.trigger("focus")
            }), t.on("results:all", function (o) {
              if (o.query.term == null || o.query.term === "") {
                var a = n.showSearch(o);
                a ? n.$searchContainer.removeClass("select2-search--hide") : n.$searchContainer.addClass("select2-search--hide")
              }
            }), t.on("results:focus", function (o) {
              o.data._resultId ? n.$search.attr("aria-activedescendant", o.data._resultId) : n.$search.removeAttr("aria-activedescendant")
            })
          }, s.prototype.handleSearch = function (r) {
            if (!this._keyUpPrevented) {
              var t = this.$search.val();
              this.trigger("query", {
                term: t
              })
            }
            this._keyUpPrevented = !1
          }, s.prototype.showSearch = function (r, t) {
            return !0
          }, s
        }), g.define("select2/dropdown/hidePlaceholder", [], function () {
          function u(l, s, r, t) {
            this.placeholder = this.normalizePlaceholder(r.get("placeholder")), l.call(this, s, r, t)
          }
          return u.prototype.append = function (l, s) {
            s.results = this.removePlaceholder(s.results), l.call(this, s)
          }, u.prototype.normalizePlaceholder = function (l, s) {
            return typeof s == "string" && (s = {
              id: "",
              text: s
            }), s
          }, u.prototype.removePlaceholder = function (l, s) {
            for (var r = s.slice(0), t = s.length - 1; t >= 0; t--) {
              var e = s[t];
              this.placeholder.id === e.id && r.splice(t, 1)
            }
            return r
          }, u
        }), g.define("select2/dropdown/infiniteScroll", ["jquery"], function (u) {
          function l(s, r, t, e) {
            this.lastParams = {}, s.call(this, r, t, e), this.$loadingMore = this.createLoadingMore(), this.loading = !1
          }
          return l.prototype.append = function (s, r) {
            this.$loadingMore.remove(), this.loading = !1, s.call(this, r), this.showLoadingMore(r) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded())
          }, l.prototype.bind = function (s, r, t) {
            var e = this;
            s.call(this, r, t), r.on("query", function (n) {
              e.lastParams = n, e.loading = !0
            }), r.on("query:append", function (n) {
              e.lastParams = n, e.loading = !0
            }), this.$results.on("scroll", this.loadMoreIfNeeded.bind(this))
          }, l.prototype.loadMoreIfNeeded = function () {
            var s = u.contains(document.documentElement, this.$loadingMore[0]);
            if (!(this.loading || !s)) {
              var r = this.$results.offset().top + this.$results.outerHeight(!1),
                t = this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1);
              r + 50 >= t && this.loadMore()
            }
          }, l.prototype.loadMore = function () {
            this.loading = !0;
            var s = u.extend({}, {
              page: 1
            }, this.lastParams);
            s.page++, this.trigger("query:append", s)
          }, l.prototype.showLoadingMore = function (s, r) {
            return r.pagination && r.pagination.more
          }, l.prototype.createLoadingMore = function () {
            var s = u('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),
              r = this.options.get("translations").get("loadingMore");
            return s.html(r(this.lastParams)), s
          }, l
        }), g.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (u, l) {
          function s(r, t, e) {
            this.$dropdownParent = u(e.get("dropdownParent") || document.body), r.call(this, t, e)
          }
          return s.prototype.bind = function (r, t, e) {
            var n = this;
            r.call(this, t, e), t.on("open", function () {
              n._showDropdown(), n._attachPositioningHandler(t), n._bindContainerResultHandlers(t)
            }), t.on("close", function () {
              n._hideDropdown(), n._detachPositioningHandler(t)
            }), this.$dropdownContainer.on("mousedown", function (i) {
              i.stopPropagation()
            })
          }, s.prototype.destroy = function (r) {
            r.call(this), this.$dropdownContainer.remove()
          }, s.prototype.position = function (r, t, e) {
            t.attr("class", e.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({
              position: "absolute",
              top: -999999
            }), this.$container = e
          }, s.prototype.render = function (r) {
            var t = u("<span></span>"),
              e = r.call(this);
            return t.append(e), this.$dropdownContainer = t, t
          }, s.prototype._hideDropdown = function (r) {
            this.$dropdownContainer.detach()
          }, s.prototype._bindContainerResultHandlers = function (r, t) {
            if (!this._containerResultsHandlersBound) {
              var e = this;
              t.on("results:all", function () {
                e._positionDropdown(), e._resizeDropdown()
              }), t.on("results:append", function () {
                e._positionDropdown(), e._resizeDropdown()
              }), t.on("results:message", function () {
                e._positionDropdown(), e._resizeDropdown()
              }), t.on("select", function () {
                e._positionDropdown(), e._resizeDropdown()
              }), t.on("unselect", function () {
                e._positionDropdown(), e._resizeDropdown()
              }), this._containerResultsHandlersBound = !0
            }
          }, s.prototype._attachPositioningHandler = function (r, t) {
            var e = this,
              n = "scroll.select2." + t.id,
              i = "resize.select2." + t.id,
              o = "orientationchange.select2." + t.id,
              a = this.$container.parents().filter(l.hasScroll);
            a.each(function () {
              l.StoreData(this, "select2-scroll-position", {
                x: u(this).scrollLeft(),
                y: u(this).scrollTop()
              })
            }), a.on(n, function (h) {
              var c = l.GetData(this, "select2-scroll-position");
              u(this).scrollTop(c.y)
            }), u(window).on(n + " " + i + " " + o, function (h) {
              e._positionDropdown(), e._resizeDropdown()
            })
          }, s.prototype._detachPositioningHandler = function (r, t) {
            var e = "scroll.select2." + t.id,
              n = "resize.select2." + t.id,
              i = "orientationchange.select2." + t.id,
              o = this.$container.parents().filter(l.hasScroll);
            o.off(e), u(window).off(e + " " + n + " " + i)
          }, s.prototype._positionDropdown = function () {
            var r = u(window),
              t = this.$dropdown.hasClass("select2-dropdown--above"),
              e = this.$dropdown.hasClass("select2-dropdown--below"),
              n = null,
              i = this.$container.offset();
            i.bottom = i.top + this.$container.outerHeight(!1);
            var o = {
              height: this.$container.outerHeight(!1)
            };
            o.top = i.top, o.bottom = i.top + o.height;
            var a = {
                height: this.$dropdown.outerHeight(!1)
              },
              h = {
                top: r.scrollTop(),
                bottom: r.scrollTop() + r.height()
              },
              c = h.top < i.top - a.height,
              p = h.bottom > i.bottom + a.height,
              _ = {
                left: i.left,
                top: o.bottom
              },
              y = this.$dropdownParent;
            y.css("position") === "static" && (y = y.offsetParent());
            var m = {
              top: 0,
              left: 0
            };
            (u.contains(document.body, y[0]) || y[0].isConnected) && (m = y.offset()), _.top -= m.top, _.left -= m.left, !t && !e && (n = "below"), !p && c && !t ? n = "above" : !c && p && t && (n = "below"), (n == "above" || t && n !== "below") && (_.top = o.top - m.top - a.height), n != null && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + n), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + n)), this.$dropdownContainer.css(_)
          }, s.prototype._resizeDropdown = function () {
            var r = {
              width: this.$container.outerWidth(!1) + "px"
            };
            this.options.get("dropdownAutoWidth") && (r.minWidth = r.width, r.position = "relative", r.width = "auto"), this.$dropdown.css(r)
          }, s.prototype._showDropdown = function (r) {
            this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
          }, s
        }), g.define("select2/dropdown/minimumResultsForSearch", [], function () {
          function u(s) {
            for (var r = 0, t = 0; t < s.length; t++) {
              var e = s[t];
              e.children ? r += u(e.children) : r++
            }
            return r
          }

          function l(s, r, t, e) {
            this.minimumResultsForSearch = t.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), s.call(this, r, t, e)
          }
          return l.prototype.showSearch = function (s, r) {
            return u(r.data.results) < this.minimumResultsForSearch ? !1 : s.call(this, r)
          }, l
        }), g.define("select2/dropdown/selectOnClose", ["../utils"], function (u) {
          function l() {}
          return l.prototype.bind = function (s, r, t) {
            var e = this;
            s.call(this, r, t), r.on("close", function (n) {
              e._handleSelectOnClose(n)
            })
          }, l.prototype._handleSelectOnClose = function (s, r) {
            if (r && r.originalSelect2Event != null) {
              var t = r.originalSelect2Event;
              if (t._type === "select" || t._type === "unselect") return
            }
            var e = this.getHighlightedResults();
            if (!(e.length < 1)) {
              var n = u.GetData(e[0], "data");
              n.element != null && n.element.selected || n.element == null && n.selected || this.trigger("select", {
                data: n
              })
            }
          }, l
        }), g.define("select2/dropdown/closeOnSelect", [], function () {
          function u() {}
          return u.prototype.bind = function (l, s, r) {
            var t = this;
            l.call(this, s, r), s.on("select", function (e) {
              t._selectTriggered(e)
            }), s.on("unselect", function (e) {
              t._selectTriggered(e)
            })
          }, u.prototype._selectTriggered = function (l, s) {
            var r = s.originalEvent;
            r && (r.ctrlKey || r.metaKey) || this.trigger("close", {
              originalEvent: r,
              originalSelect2Event: s
            })
          }, u
        }), g.define("select2/i18n/en", [], function () {
          return {
            errorLoading: function () {
              return "The results could not be loaded."
            },
            inputTooLong: function (u) {
              var l = u.input.length - u.maximum,
                s = "Please delete " + l + " character";
              return l != 1 && (s += "s"), s
            },
            inputTooShort: function (u) {
              var l = u.minimum - u.input.length,
                s = "Please enter " + l + " or more characters";
              return s
            },
            loadingMore: function () {
              return "Loading more resultsâ€¦"
            },
            maximumSelected: function (u) {
              var l = "You can only select " + u.maximum + " item";
              return u.maximum != 1 && (l += "s"), l
            },
            noResults: function () {
              return "No results found"
            },
            searching: function () {
              return "Searchingâ€¦"
            },
            removeAllItems: function () {
              return "Remove all items"
            }
          }
        }), g.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (u, l, s, r, t, e, n, i, o, a, h, c, p, _, y, m, E, O, T, z, M, j, G, V, f, A, w, B, x) {
          function D() {
            this.reset()
          }
          D.prototype.apply = function (d) {
            if (d = u.extend(!0, {}, this.defaults, d), d.dataAdapter == null) {
              if (d.ajax != null ? d.dataAdapter = y : d.data != null ? d.dataAdapter = _ : d.dataAdapter = p, d.minimumInputLength > 0 && (d.dataAdapter = a.Decorate(d.dataAdapter, O)), d.maximumInputLength > 0 && (d.dataAdapter = a.Decorate(d.dataAdapter, T)), d.maximumSelectionLength > 0 && (d.dataAdapter = a.Decorate(d.dataAdapter, z)), d.tags && (d.dataAdapter = a.Decorate(d.dataAdapter, m)), (d.tokenSeparators != null || d.tokenizer != null) && (d.dataAdapter = a.Decorate(d.dataAdapter, E)), d.query != null) {
                var C = l(d.amdBase + "compat/query");
                d.dataAdapter = a.Decorate(d.dataAdapter, C)
              }
              if (d.initSelection != null) {
                var b = l(d.amdBase + "compat/initSelection");
                d.dataAdapter = a.Decorate(d.dataAdapter, b)
              }
            }
            if (d.resultsAdapter == null && (d.resultsAdapter = s, d.ajax != null && (d.resultsAdapter = a.Decorate(d.resultsAdapter, V)), d.placeholder != null && (d.resultsAdapter = a.Decorate(d.resultsAdapter, G)), d.selectOnClose && (d.resultsAdapter = a.Decorate(d.resultsAdapter, w))), d.dropdownAdapter == null) {
              if (d.multiple) d.dropdownAdapter = M;
              else {
                var v = a.Decorate(M, j);
                d.dropdownAdapter = v
              }
              if (d.minimumResultsForSearch !== 0 && (d.dropdownAdapter = a.Decorate(d.dropdownAdapter, A)), d.closeOnSelect && (d.dropdownAdapter = a.Decorate(d.dropdownAdapter, B)), d.dropdownCssClass != null || d.dropdownCss != null || d.adaptDropdownCssClass != null) {
                var F = l(d.amdBase + "compat/dropdownCss");
                d.dropdownAdapter = a.Decorate(d.dropdownAdapter, F)
              }
              d.dropdownAdapter = a.Decorate(d.dropdownAdapter, f)
            }
            if (d.selectionAdapter == null) {
              if (d.multiple ? d.selectionAdapter = t : d.selectionAdapter = r, d.placeholder != null && (d.selectionAdapter = a.Decorate(d.selectionAdapter, e)), d.allowClear && (d.selectionAdapter = a.Decorate(d.selectionAdapter, n)), d.multiple && (d.selectionAdapter = a.Decorate(d.selectionAdapter, i)), d.containerCssClass != null || d.containerCss != null || d.adaptContainerCssClass != null) {
                var S = l(d.amdBase + "compat/containerCss");
                d.selectionAdapter = a.Decorate(d.selectionAdapter, S)
              }
              d.selectionAdapter = a.Decorate(d.selectionAdapter, o)
            }
            d.language = this._resolveLanguage(d.language), d.language.push("en");
            for (var q = [], I = 0; I < d.language.length; I++) {
              var k = d.language[I];
              q.indexOf(k) === -1 && q.push(k)
            }
            return d.language = q, d.translations = this._processTranslations(d.language, d.debug), d
          }, D.prototype.reset = function () {
            function d(b) {
              function v(F) {
                return c[F] || F
              }
              return b.replace(/[^\u0000-\u007E]/g, v)
            }

            function C(b, v) {
              if (u.trim(b.term) === "") return v;
              if (v.children && v.children.length > 0) {
                for (var F = u.extend(!0, {}, v), S = v.children.length - 1; S >= 0; S--) {
                  var q = v.children[S],
                    I = C(b, q);
                  I == null && F.children.splice(S, 1)
                }
                return F.children.length > 0 ? F : C(b, F)
              }
              var k = d(v.text).toUpperCase(),
                N = d(b.term).toUpperCase();
              return k.indexOf(N) > -1 ? v : null
            }
            this.defaults = {
              amdBase: "./",
              amdLanguageBase: "./i18n/",
              closeOnSelect: !0,
              debug: !1,
              dropdownAutoWidth: !1,
              escapeMarkup: a.escapeMarkup,
              language: {},
              matcher: C,
              minimumInputLength: 0,
              maximumInputLength: 0,
              maximumSelectionLength: 0,
              minimumResultsForSearch: 0,
              selectOnClose: !1,
              scrollAfterSelect: !1,
              sorter: function (b) {
                return b
              },
              templateResult: function (b) {
                return b.text
              },
              templateSelection: function (b) {
                return b.text
              },
              theme: "default",
              width: "resolve"
            }
          }, D.prototype.applyFromElement = function (d, C) {
            var b = d.language,
              v = this.defaults.language,
              F = C.prop("lang"),
              S = C.closest("[lang]").prop("lang"),
              q = Array.prototype.concat.call(this._resolveLanguage(F), this._resolveLanguage(b), this._resolveLanguage(v), this._resolveLanguage(S));
            return d.language = q, d
          }, D.prototype._resolveLanguage = function (d) {
            if (!d) return [];
            if (u.isEmptyObject(d)) return [];
            if (u.isPlainObject(d)) return [d];
            var C;
            u.isArray(d) ? C = d : C = [d];
            for (var b = [], v = 0; v < C.length; v++)
              if (b.push(C[v]), typeof C[v] == "string" && C[v].indexOf("-") > 0) {
                var F = C[v].split("-"),
                  S = F[0];
                b.push(S)
              } return b
          }, D.prototype._processTranslations = function (d, C) {
            for (var b = new h, v = 0; v < d.length; v++) {
              var F = new h,
                S = d[v];
              if (typeof S == "string") try {
                F = h.loadPath(S)
              } catch {
                try {
                  S = this.defaults.amdLanguageBase + S, F = h.loadPath(S)
                } catch {
                  C && window.console && console.warn && console.warn('Select2: The language file for "' + S + '" could not be automatically loaded. A fallback will be used instead.')
                }
              } else u.isPlainObject(S) ? F = new h(S) : F = S;
              b.extend(F)
            }
            return b
          }, D.prototype.set = function (d, C) {
            var b = u.camelCase(d),
              v = {};
            v[b] = C;
            var F = a._convertData(v);
            u.extend(!0, this.defaults, F)
          };
          var P = new D;
          return P
        }), g.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (u, l, s, r) {
          function t(e, n) {
            if (this.options = e, n != null && this.fromElement(n), n != null && (this.options = s.applyFromElement(this.options, n)), this.options = s.apply(this.options), n && n.is("input")) {
              var i = u(this.get("amdBase") + "compat/inputData");
              this.options.dataAdapter = r.Decorate(this.options.dataAdapter, i)
            }
          }
          return t.prototype.fromElement = function (e) {
            var n = ["select2"];
            this.options.multiple == null && (this.options.multiple = e.prop("multiple")), this.options.disabled == null && (this.options.disabled = e.prop("disabled")), this.options.dir == null && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), r.GetData(e[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), r.StoreData(e[0], "data", r.GetData(e[0], "select2Tags")), r.StoreData(e[0], "tags", !0)), r.GetData(e[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", r.GetData(e[0], "ajaxUrl")), r.StoreData(e[0], "ajax-Url", r.GetData(e[0], "ajaxUrl")));
            var i = {};

            function o(O, T) {
              return T.toUpperCase()
            }
            for (var a = 0; a < e[0].attributes.length; a++) {
              var h = e[0].attributes[a].name,
                c = "data-";
              if (h.substr(0, c.length) == c) {
                var p = h.substring(c.length),
                  _ = r.GetData(e[0], p),
                  y = p.replace(/-([a-z])/g, o);
                i[y] = _
              }
            }
            l.fn.jquery && l.fn.jquery.substr(0, 2) == "1." && e[0].dataset && (i = l.extend(!0, {}, e[0].dataset, i));
            var m = l.extend(!0, {}, r.GetData(e[0]), i);
            m = r._convertData(m);
            for (var E in m) l.inArray(E, n) > -1 || (l.isPlainObject(this.options[E]) ? l.extend(this.options[E], m[E]) : this.options[E] = m[E]);
            return this
          }, t.prototype.get = function (e) {
            return this.options[e]
          }, t.prototype.set = function (e, n) {
            this.options[e] = n
          }, t
        }), g.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (u, l, s, r) {
          var t = function (e, n) {
            s.GetData(e[0], "select2") != null && s.GetData(e[0], "select2").destroy(), this.$element = e, this.id = this._generateId(e), n = n || {}, this.options = new l(n, e), t.__super__.constructor.call(this);
            var i = e.attr("tabindex") || 0;
            s.StoreData(e[0], "old-tabindex", i), e.attr("tabindex", "-1");
            var o = this.options.get("dataAdapter");
            this.dataAdapter = new o(e, this.options);
            var a = this.render();
            this._placeContainer(a);
            var h = this.options.get("selectionAdapter");
            this.selection = new h(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, a);
            var c = this.options.get("dropdownAdapter");
            this.dropdown = new c(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, a);
            var p = this.options.get("resultsAdapter");
            this.results = new p(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
            var _ = this;
            this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (y) {
              _.trigger("selection:update", {
                data: y
              })
            }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), s.StoreData(e[0], "select2", this), e.data("select2", this)
          };
          return s.Extend(t, s.Observable), t.prototype._generateId = function (e) {
            var n = "";
            return e.attr("id") != null ? n = e.attr("id") : e.attr("name") != null ? n = e.attr("name") + "-" + s.generateChars(2) : n = s.generateChars(4), n = n.replace(/(:|\.|\[|\]|,)/g, ""), n = "select2-" + n, n
          }, t.prototype._placeContainer = function (e) {
            e.insertAfter(this.$element);
            var n = this._resolveWidth(this.$element, this.options.get("width"));
            n != null && e.css("width", n)
          }, t.prototype._resolveWidth = function (e, n) {
            var i = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
            if (n == "resolve") {
              var o = this._resolveWidth(e, "style");
              return o ? ? this._resolveWidth(e, "element")
            }
            if (n == "element") {
              var a = e.outerWidth(!1);
              return a <= 0 ? "auto" : a + "px"
            }
            if (n == "style") {
              var h = e.attr("style");
              if (typeof h != "string") return null;
              for (var c = h.split(";"), p = 0, _ = c.length; p < _; p = p + 1) {
                var y = c[p].replace(/\s/g, ""),
                  m = y.match(i);
                if (m !== null && m.length >= 1) return m[1]
              }
              return null
            }
            if (n == "computedstyle") {
              var E = window.getComputedStyle(e[0]);
              return E.width
            }
            return n
          }, t.prototype._bindAdapters = function () {
            this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
          }, t.prototype._registerDomEvents = function () {
            var e = this;
            this.$element.on("change.select2", function () {
              e.dataAdapter.current(function (i) {
                e.trigger("selection:update", {
                  data: i
                })
              })
            }), this.$element.on("focus.select2", function (i) {
              e.trigger("focus", i)
            }), this._syncA = s.bind(this._syncAttributes, this), this._syncS = s.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
            var n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            n != null ? (this._observer = new n(function (i) {
              e._syncA(), e._syncS(null, i)
            }), this._observer.observe(this.$element[0], {
              attributes: !0,
              childList: !0,
              subtree: !1
            })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", e._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", e._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", e._syncS, !1))
          }, t.prototype._registerDataEvents = function () {
            var e = this;
            this.dataAdapter.on("*", function (n, i) {
              e.trigger(n, i)
            })
          }, t.prototype._registerSelectionEvents = function () {
            var e = this,
              n = ["toggle", "focus"];
            this.selection.on("toggle", function () {
              e.toggleDropdown()
            }), this.selection.on("focus", function (i) {
              e.focus(i)
            }), this.selection.on("*", function (i, o) {
              u.inArray(i, n) === -1 && e.trigger(i, o)
            })
          }, t.prototype._registerDropdownEvents = function () {
            var e = this;
            this.dropdown.on("*", function (n, i) {
              e.trigger(n, i)
            })
          }, t.prototype._registerResultsEvents = function () {
            var e = this;
            this.results.on("*", function (n, i) {
              e.trigger(n, i)
            })
          }, t.prototype._registerEvents = function () {
            var e = this;
            this.on("open", function () {
              e.$container.addClass("select2-container--open")
            }), this.on("close", function () {
              e.$container.removeClass("select2-container--open")
            }), this.on("enable", function () {
              e.$container.removeClass("select2-container--disabled")
            }), this.on("disable", function () {
              e.$container.addClass("select2-container--disabled")
            }), this.on("blur", function () {
              e.$container.removeClass("select2-container--focus")
            }), this.on("query", function (n) {
              e.isOpen() || e.trigger("open", {}), this.dataAdapter.query(n, function (i) {
                e.trigger("results:all", {
                  data: i,
                  query: n
                })
              })
            }), this.on("query:append", function (n) {
              this.dataAdapter.query(n, function (i) {
                e.trigger("results:append", {
                  data: i,
                  query: n
                })
              })
            }), this.on("keypress", function (n) {
              var i = n.which;
              e.isOpen() ? i === r.ESC || i === r.TAB || i === r.UP && n.altKey ? (e.close(n), n.preventDefault()) : i === r.ENTER ? (e.trigger("results:select", {}), n.preventDefault()) : i === r.SPACE && n.ctrlKey ? (e.trigger("results:toggle", {}), n.preventDefault()) : i === r.UP ? (e.trigger("results:previous", {}), n.preventDefault()) : i === r.DOWN && (e.trigger("results:next", {}), n.preventDefault()) : (i === r.ENTER || i === r.SPACE || i === r.DOWN && n.altKey) && (e.open(), n.preventDefault())
            })
          }, t.prototype._syncAttributes = function () {
            this.options.set("disabled", this.$element.prop("disabled")), this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
          }, t.prototype._isChangeMutation = function (e, n) {
            var i = !1,
              o = this;
            if (!(e && e.target && e.target.nodeName !== "OPTION" && e.target.nodeName !== "OPTGROUP")) {
              if (!n) i = !0;
              else if (n.addedNodes && n.addedNodes.length > 0)
                for (var a = 0; a < n.addedNodes.length; a++) {
                  var h = n.addedNodes[a];
                  h.selected && (i = !0)
                } else n.removedNodes && n.removedNodes.length > 0 ? i = !0 : u.isArray(n) && u.each(n, function (c, p) {
                  if (o._isChangeMutation(c, p)) return i = !0, !1
                });
              return i
            }
          }, t.prototype._syncSubtree = function (e, n) {
            var i = this._isChangeMutation(e, n),
              o = this;
            i && this.dataAdapter.current(function (a) {
              o.trigger("selection:update", {
                data: a
              })
            })
          }, t.prototype.trigger = function (e, n) {
            var i = t.__super__.trigger,
              o = {
                open: "opening",
                close: "closing",
                select: "selecting",
                unselect: "unselecting",
                clear: "clearing"
              };
            if (n === void 0 && (n = {}), e in o) {
              var a = o[e],
                h = {
                  prevented: !1,
                  name: e,
                  args: n
                };
              if (i.call(this, a, h), h.prevented) {
                n.prevented = !0;
                return
              }
            }
            i.call(this, e, n)
          }, t.prototype.toggleDropdown = function () {
            this.isDisabled() || (this.isOpen() ? this.close() : this.open())
          }, t.prototype.open = function () {
            this.isOpen() || this.isDisabled() || this.trigger("query", {})
          }, t.prototype.close = function (e) {
            this.isOpen() && this.trigger("close", {
              originalEvent: e
            })
          }, t.prototype.isEnabled = function () {
            return !this.isDisabled()
          }, t.prototype.isDisabled = function () {
            return this.options.get("disabled")
          }, t.prototype.isOpen = function () {
            return this.$container.hasClass("select2-container--open")
          }, t.prototype.hasFocus = function () {
            return this.$container.hasClass("select2-container--focus")
          }, t.prototype.focus = function (e) {
            this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}))
          }, t.prototype.enable = function (e) {
            this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (e == null || e.length === 0) && (e = [!0]);
            var n = !e[0];
            this.$element.prop("disabled", n)
          }, t.prototype.data = function () {
            this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
            var e = [];
            return this.dataAdapter.current(function (n) {
              e = n
            }), e
          }, t.prototype.val = function (e) {
            if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), e == null || e.length === 0) return this.$element.val();
            var n = e[0];
            u.isArray(n) && (n = u.map(n, function (i) {
              return i.toString()
            })), this.$element.val(n).trigger("input").trigger("change")
          }, t.prototype.destroy = function () {
            this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), this._observer != null ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", s.GetData(this.$element[0], "old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), s.RemoveData(this.$element[0]), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
          }, t.prototype.render = function () {
            var e = u('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
            return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container.addClass("select2-container--" + this.options.get("theme")), s.StoreData(e[0], "element", this.$element), e
          }, t
        }), g.define("select2/compat/utils", ["jquery"], function (u) {
          function l(s, r, t) {
            var e, n = [],
              i;
            e = u.trim(s.attr("class")), e && (e = "" + e, u(e.split(/\s+/)).each(function () {
              this.indexOf("select2-") === 0 && n.push(this)
            })), e = u.trim(r.attr("class")), e && (e = "" + e, u(e.split(/\s+/)).each(function () {
              this.indexOf("select2-") !== 0 && (i = t(this), i != null && n.push(i))
            })), s.attr("class", n.join(" "))
          }
          return {
            syncCssClasses: l
          }
        }), g.define("select2/compat/containerCss", ["jquery", "./utils"], function (u, l) {
          function s(t) {
            return null
          }

          function r() {}
          return r.prototype.render = function (t) {
            var e = t.call(this),
              n = this.options.get("containerCssClass") || "";
            u.isFunction(n) && (n = n(this.$element));
            var i = this.options.get("adaptContainerCssClass");
            if (i = i || s, n.indexOf(":all:") !== -1) {
              n = n.replace(":all:", "");
              var o = i;
              i = function (h) {
                var c = o(h);
                return c != null ? c + " " + h : h
              }
            }
            var a = this.options.get("containerCss") || {};
            return u.isFunction(a) && (a = a(this.$element)), l.syncCssClasses(e, this.$element, i), e.css(a), e.addClass(n), e
          }, r
        }), g.define("select2/compat/dropdownCss", ["jquery", "./utils"], function (u, l) {
          function s(t) {
            return null
          }

          function r() {}
          return r.prototype.render = function (t) {
            var e = t.call(this),
              n = this.options.get("dropdownCssClass") || "";
            u.isFunction(n) && (n = n(this.$element));
            var i = this.options.get("adaptDropdownCssClass");
            if (i = i || s, n.indexOf(":all:") !== -1) {
              n = n.replace(":all:", "");
              var o = i;
              i = function (h) {
                var c = o(h);
                return c != null ? c + " " + h : h
              }
            }
            var a = this.options.get("dropdownCss") || {};
            return u.isFunction(a) && (a = a(this.$element)), l.syncCssClasses(e, this.$element, i), e.css(a), e.addClass(n), e
          }, r
        }), g.define("select2/compat/initSelection", ["jquery"], function (u) {
          function l(s, r, t) {
            t.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = t.get("initSelection"), this._isInitialized = !1, s.call(this, r, t)
          }
          return l.prototype.current = function (s, r) {
            var t = this;
            if (this._isInitialized) {
              s.call(this, r);
              return
            }
            this.initSelection.call(null, this.$element, function (e) {
              t._isInitialized = !0, u.isArray(e) || (e = [e]), r(e)
            })
          }, l
        }), g.define("select2/compat/inputData", ["jquery", "../utils"], function (u, l) {
          function s(r, t, e) {
            this._currentData = [], this._valueSeparator = e.get("valueSeparator") || ",", t.prop("type") === "hidden" && e.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), r.call(this, t, e)
          }
          return s.prototype.current = function (r, t) {
            function e(a, h) {
              var c = [];
              return a.selected || u.inArray(a.id, h) !== -1 ? (a.selected = !0, c.push(a)) : a.selected = !1, a.children && c.push.apply(c, e(a.children, h)), c
            }
            for (var n = [], i = 0; i < this._currentData.length; i++) {
              var o = this._currentData[i];
              n.push.apply(n, e(o, this.$element.val().split(this._valueSeparator)))
            }
            t(n)
          }, s.prototype.select = function (r, t) {
            if (!this.options.get("multiple")) this.current(function (n) {
              u.map(n, function (i) {
                i.selected = !1
              })
            }), this.$element.val(t.id), this.$element.trigger("input").trigger("change");
            else {
              var e = this.$element.val();
              e += this._valueSeparator + t.id, this.$element.val(e), this.$element.trigger("input").trigger("change")
            }
          }, s.prototype.unselect = function (r, t) {
            var e = this;
            t.selected = !1, this.current(function (n) {
              for (var i = [], o = 0; o < n.length; o++) {
                var a = n[o];
                t.id != a.id && i.push(a.id)
              }
              e.$element.val(i.join(e._valueSeparator)), e.$element.trigger("input").trigger("change")
            })
          }, s.prototype.query = function (r, t, e) {
            for (var n = [], i = 0; i < this._currentData.length; i++) {
              var o = this._currentData[i],
                a = this.matches(t, o);
              a !== null && n.push(a)
            }
            e({
              results: n
            })
          }, s.prototype.addOptions = function (r, t) {
            var e = u.map(t, function (n) {
              return l.GetData(n[0], "data")
            });
            this._currentData.push.apply(this._currentData, e)
          }, s
        }), g.define("select2/compat/matcher", ["jquery"], function (u) {
          function l(s) {
            function r(t, e) {
              var n = u.extend(!0, {}, e);
              if (t.term == null || u.trim(t.term) === "") return n;
              if (e.children) {
                for (var i = e.children.length - 1; i >= 0; i--) {
                  var o = e.children[i],
                    a = s(t.term, o.text, o);
                  a || n.children.splice(i, 1)
                }
                if (n.children.length > 0) return n
              }
              return s(t.term, e.text, e) ? n : null
            }
            return r
          }
          return l
        }), g.define("select2/compat/query", [], function () {
          function u(l, s, r) {
            r.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), l.call(this, s, r)
          }
          return u.prototype.query = function (l, s, r) {
            s.callback = r;
            var t = this.options.get("query");
            t.call(null, s)
          }, u
        }), g.define("select2/dropdown/attachContainer", [], function () {
          function u(l, s, r) {
            l.call(this, s, r)
          }
          return u.prototype.position = function (l, s, r) {
            var t = r.find(".dropdown-wrapper");
            t.append(s), s.addClass("select2-dropdown--below"), r.addClass("select2-container--below")
          }, u
        }), g.define("select2/dropdown/stopPropagation", [], function () {
          function u() {}
          return u.prototype.bind = function (l, s, r) {
            l.call(this, s, r);
            var t = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
            this.$dropdown.on(t.join(" "), function (e) {
              e.stopPropagation()
            })
          }, u
        }), g.define("select2/selection/stopPropagation", [], function () {
          function u() {}
          return u.prototype.bind = function (l, s, r) {
            l.call(this, s, r);
            var t = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
            this.$selection.on(t.join(" "), function (e) {
              e.stopPropagation()
            })
          }, u
        });
        /*!
         * jQuery Mousewheel 3.1.13
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         */
        return function (u) {
          typeof g.define == "function" && g.define.amd ? g.define("jquery-mousewheel", ["jquery"], u) : R.exports = u
        }(function (u) {
          var l = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            r = Array.prototype.slice,
            t, e;
          if (u.event.fixHooks)
            for (var n = l.length; n;) u.event.fixHooks[l[--n]] = u.event.mouseHooks;
          var i = u.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
              if (this.addEventListener)
                for (var c = s.length; c;) this.addEventListener(s[--c], o, !1);
              else this.onmousewheel = o;
              u.data(this, "mousewheel-line-height", i.getLineHeight(this)), u.data(this, "mousewheel-page-height", i.getPageHeight(this))
            },
            teardown: function () {
              if (this.removeEventListener)
                for (var c = s.length; c;) this.removeEventListener(s[--c], o, !1);
              else this.onmousewheel = null;
              u.removeData(this, "mousewheel-line-height"), u.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function (c) {
              var p = u(c),
                _ = p["offsetParent" in u.fn ? "offsetParent" : "parent"]();
              return _.length || (_ = u("body")), parseInt(_.css("fontSize"), 10) || parseInt(p.css("fontSize"), 10) || 16
            },
            getPageHeight: function (c) {
              return u(c).height()
            },
            settings: {
              adjustOldDeltas: !0,
              normalizeOffset: !0
            }
          };
          u.fn.extend({
            mousewheel: function (c) {
              return c ? this.bind("mousewheel", c) : this.trigger("mousewheel")
            },
            unmousewheel: function (c) {
              return this.unbind("mousewheel", c)
            }
          });

          function o(c) {
            var p = c || window.event,
              _ = r.call(arguments, 1),
              y = 0,
              m = 0,
              E = 0,
              O = 0,
              T = 0,
              z = 0;
            if (c = u.event.fix(p), c.type = "mousewheel", "detail" in p && (E = p.detail * -1), "wheelDelta" in p && (E = p.wheelDelta), "wheelDeltaY" in p && (E = p.wheelDeltaY), "wheelDeltaX" in p && (m = p.wheelDeltaX * -1), "axis" in p && p.axis === p.HORIZONTAL_AXIS && (m = E * -1, E = 0), y = E === 0 ? m : E, "deltaY" in p && (E = p.deltaY * -1, y = E), "deltaX" in p && (m = p.deltaX, E === 0 && (y = m * -1)), !(E === 0 && m === 0)) {
              if (p.deltaMode === 1) {
                var M = u.data(this, "mousewheel-line-height");
                y *= M, E *= M, m *= M
              } else if (p.deltaMode === 2) {
                var j = u.data(this, "mousewheel-page-height");
                y *= j, E *= j, m *= j
              }
              if (O = Math.max(Math.abs(E), Math.abs(m)), (!e || O < e) && (e = O, h(p, O) && (e /= 40)), h(p, O) && (y /= 40, m /= 40, E /= 40), y = Math[y >= 1 ? "floor" : "ceil"](y / e), m = Math[m >= 1 ? "floor" : "ceil"](m / e), E = Math[E >= 1 ? "floor" : "ceil"](E / e), i.settings.normalizeOffset && this.getBoundingClientRect) {
                var G = this.getBoundingClientRect();
                T = c.clientX - G.left, z = c.clientY - G.top
              }
              return c.deltaX = m, c.deltaY = E, c.deltaFactor = e, c.offsetX = T, c.offsetY = z, c.deltaMode = 0, _.unshift(c, y, m, E), t && clearTimeout(t), t = setTimeout(a, 200), (u.event.dispatch || u.event.handle).apply(this, _)
            }
          }

          function a() {
            e = null
          }

          function h(c, p) {
            return i.settings.adjustOldDeltas && c.type === "mousewheel" && p % 120 === 0
          }
        }), g.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function (u, l, s, r, t) {
          if (u.fn.select2 == null) {
            var e = ["open", "close", "destroy"];
            u.fn.select2 = function (n) {
              if (n = n || {}, typeof n == "object") return this.each(function () {
                var a = u.extend(!0, {}, n);
                new s(u(this), a)
              }), this;
              if (typeof n == "string") {
                var i, o = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                  var a = t.GetData(this, "select2");
                  a == null && window.console && console.error && console.error("The select2('" + n + "') method was called on an element that is not using Select2."), i = a[n].apply(a, o)
                }), u.inArray(n, e) > -1 ? this : i
              } else throw new Error("Invalid arguments for Select2: " + n)
            }
          }
          return u.fn.select2.defaults == null && (u.fn.select2.defaults = r), s
        }), {
          define: g.define,
          require: g.require
        }
      }(),
      H = Y.require("jquery.select2");
    return L.fn.select2.amd = Y, H
  })
})(Z);
var Q = Z.exports;
const K = J(Q);
try {
  window.select2 = K
} catch {}
K();

function U(R) {
  $(R).on("select2:open", function (W) {
    $(W.target.closest(".form-floating")).addClass("select2-focus")
  }), $(R).on("select2:close", function (W) {
    $(W.target.closest(".form-floating")).removeClass("select2-focus")
  }), R.closest(".form-floating").hasClass("form-floating") && R.closest(".form-floating").addClass("form-floating-select2")
}
window.select2Focus = U;