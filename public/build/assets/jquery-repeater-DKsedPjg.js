(function (v) {
  var M = function (t) {
      return t
    },
    I = function (t) {
      return v.isArray(t)
    },
    L = function (t) {
      return !I(t) && t instanceof Object
    },
    R = function (t, f) {
      return v.inArray(f, t)
    },
    N = function (t, f) {
      return R(t, f) !== -1
    },
    d = function (t, f) {
      for (var a in t) t.hasOwnProperty(a) && f(t[a], a, t)
    },
    D = function (t) {
      return t[t.length - 1]
    },
    Q = function (t) {
      return Array.prototype.slice.call(t)
    },
    U = function () {
      var t = {};
      return d(Q(arguments), function (f) {
        d(f, function (a, s) {
          t[s] = a
        })
      }), t
    },
    j = function (t, f) {
      var a = [];
      return d(t, function (s, o, c) {
        a.push(f(s, o, c))
      }), a
    },
    H = function (t, f, a) {
      var s = {};
      return d(t, function (o, c, h) {
        c = a ? a(c, o) : c, s[c] = f(o, c, h)
      }), s
    },
    A = function (t, f, a) {
      return I(t) ? j(t, f) : H(t, f, a)
    },
    K = function (t, f) {
      return A(t, function (a) {
        return a[f]
      })
    },
    z = function (t, f) {
      var a;
      return I(t) ? (a = [], d(t, function (s, o, c) {
        f(s, o, c) && a.push(s)
      })) : (a = {}, d(t, function (s, o, c) {
        f(s, o, c) && (a[o] = s)
      })), a
    },
    E = function (t, f, a) {
      return A(t, function (s, o) {
        return s[f].apply(s, a || [])
      })
    },
    J = function (t) {
      t = t || {};
      var f = {};
      return t.publish = function (a, s) {
        d(f[a], function (o) {
          o(s)
        })
      }, t.subscribe = function (a, s) {
        f[a] = f[a] || [], f[a].push(s)
      }, t.unsubscribe = function (a) {
        d(f, function (s) {
          var o = R(s, a);
          o !== -1 && s.splice(o, 1)
        })
      }, t
    };
  (function (t) {
    var f = function (i, n) {
        var e = J(),
          r = i.$;
        return e.getType = function () {
          throw 'implement me (return type. "text", "radio", etc.)'
        }, e.$ = function (u) {
          return u ? r.find(u) : r
        }, e.disable = function () {
          e.$().prop("disabled", !0), e.publish("isEnabled", !1)
        }, e.enable = function () {
          e.$().prop("disabled", !1), e.publish("isEnabled", !0)
        }, n.equalTo = function (u, y) {
          return u === y
        }, n.publishChange = function () {
          var u;
          return function (y, x) {
            var g = e.get();
            n.equalTo(g, u) || e.publish("change", {
              e: y,
              domElement: x
            }), u = g
          }
        }(), e
      },
      a = function (i, n) {
        var e = f(i, n);
        return e.get = function () {
          return e.$().val()
        }, e.set = function (r) {
          e.$().val(r)
        }, e.clear = function () {
          e.set("")
        }, n.buildSetter = function (r) {
          return function (u) {
            r.call(e, u)
          }
        }, e
      },
      s = function (i, n) {
        i = I(i) ? i : [i], n = I(n) ? n : [n];
        var e = !0;
        return i.length !== n.length ? e = !1 : d(i, function (r) {
          N(n, r) || (e = !1)
        }), e
      },
      o = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "button"
        }, e.$().on("change", function (r) {
          n.publishChange(r, this)
        }), e
      },
      c = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "checkbox"
        }, e.get = function () {
          var r = [];
          return e.$().filter(":checked").each(function () {
            r.push(t(this).val())
          }), r
        }, e.set = function (r) {
          r = I(r) ? r : [r], e.$().each(function () {
            t(this).prop("checked", !1)
          }), d(r, function (u) {
            e.$().filter('[value="' + u + '"]').prop("checked", !0)
          })
        }, n.equalTo = s, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      h = function (i) {
        var n = $(i);
        return n.getType = function () {
          return "email"
        }, n
      },
      b = function (i) {
        var n = {},
          e = f(i, n);
        return e.getType = function () {
          return "file"
        }, e.get = function () {
          return D(e.$().val().split("\\"))
        }, e.clear = function () {
          this.$().each(function () {
            t(this).wrap("<form>").closest("form").get(0).reset(), t(this).unwrap()
          })
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      S = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "hidden"
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      O = function (i) {
        var n = {},
          e = f(i, n);
        return e.getType = function () {
          return "file[multiple]"
        }, e.get = function () {
          var r = e.$().get(0).files || [],
            u = [],
            y;
          for (y = 0; y < (r.length || 0); y += 1) u.push(r[y].name);
          return u
        }, e.clear = function () {
          this.$().each(function () {
            t(this).wrap("<form>").closest("form").get(0).reset(), t(this).unwrap()
          })
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      k = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "select[multiple]"
        }, e.get = function () {
          return e.$().val() || []
        }, e.set = function (r) {
          e.$().val(r === "" ? [] : I(r) ? r : [r])
        }, n.equalTo = s, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      q = function (i) {
        var n = $(i);
        return n.getType = function () {
          return "password"
        }, n
      },
      B = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "radio"
        }, e.get = function () {
          return e.$().filter(":checked").val() || null
        }, e.set = function (r) {
          r ? e.$().filter('[value="' + r + '"]').prop("checked", !0) : e.$().each(function () {
            t(this).prop("checked", !1)
          })
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      T = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "range"
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      P = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "select"
        }, e.$().change(function (r) {
          n.publishChange(r, this)
        }), e
      },
      $ = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "text"
        }, e.$().on("change keyup keydown", function (r) {
          n.publishChange(r, this)
        }), e
      },
      l = function (i) {
        var n = {},
          e = a(i, n);
        return e.getType = function () {
          return "textarea"
        }, e.$().on("change keyup keydown", function (r) {
          n.publishChange(r, this)
        }), e
      },
      p = function (i) {
        var n = $(i);
        return n.getType = function () {
          return "url"
        }, n
      },
      m = function (i) {
        var n = {},
          e = i.$,
          r = i.constructorOverride || {
            button: o,
            text: $,
            url: p,
            email: h,
            password: q,
            range: T,
            textarea: l,
            select: P,
            "select[multiple]": k,
            radio: B,
            checkbox: c,
            file: b,
            "file[multiple]": O,
            hidden: S
          },
          u = function (x, g) {
            var C = L(g) ? g : e.find(g);
            C.each(function () {
              var w = t(this).attr("name");
              n[w] = r[x]({
                $: t(this)
              })
            })
          },
          y = function (x, g) {
            var C = [],
              w = L(g) ? g : e.find(g);
            L(g) ? n[w.attr("name")] = r[x]({
              $: w
            }) : (w.each(function () {
              R(C, t(this).attr("name")) === -1 && C.push(t(this).attr("name"))
            }), d(C, function (G) {
              n[G] = r[x]({
                $: e.find('input[name="' + G + '"]')
              })
            }))
          };
        return e.is("input, select, textarea") ? e.is('input[type="button"], button, input[type="submit"]') ? u("button", e) : e.is("textarea") ? u("textarea", e) : e.is('input[type="text"]') || e.is("input") && !e.attr("type") ? u("text", e) : e.is('input[type="password"]') ? u("password", e) : e.is('input[type="email"]') ? u("email", e) : e.is('input[type="url"]') ? u("url", e) : e.is('input[type="range"]') ? u("range", e) : e.is("select") ? e.is("[multiple]") ? u("select[multiple]", e) : u("select", e) : e.is('input[type="file"]') ? e.is("[multiple]") ? u("file[multiple]", e) : u("file", e) : e.is('input[type="hidden"]') ? u("hidden", e) : e.is('input[type="radio"]') ? y("radio", e) : e.is('input[type="checkbox"]') ? y("checkbox", e) : u("text", e) : (u("button", 'input[type="button"], button, input[type="submit"]'), u("text", 'input[type="text"]'), u("password", 'input[type="password"]'), u("email", 'input[type="email"]'), u("url", 'input[type="url"]'), u("range", 'input[type="range"]'), u("textarea", "textarea"), u("select", "select:not([multiple])"), u("select[multiple]", "select[multiple]"), u("file", 'input[type="file"]:not([multiple])'), u("file[multiple]", 'input[type="file"][multiple]'), u("hidden", 'input[type="hidden"]'), y("radio", 'input[type="radio"]'), y("checkbox", 'input[type="checkbox"]')), n
      };
    t.fn.inputVal = function (i) {
      var n = t(this),
        e = m({
          $: n
        });
      return n.is("input, textarea, select") ? typeof i > "u" ? e[n.attr("name")].get() : (e[n.attr("name")].set(i), n) : typeof i > "u" ? E(e, "get") : (d(i, function (r, u) {
        e[u].set(r)
      }), n)
    }, t.fn.inputOnChange = function (i) {
      var n = t(this),
        e = m({
          $: n
        });
      return d(e, function (r) {
        r.subscribe("change", function (u) {
          i.call(u.domElement, u.e)
        })
      }), n
    }, t.fn.inputDisable = function () {
      var i = t(this);
      return E(m({
        $: i
      }), "disable"), i
    }, t.fn.inputEnable = function () {
      var i = t(this);
      return E(m({
        $: i
      }), "enable"), i
    }, t.fn.inputClear = function () {
      var i = t(this);
      return E(m({
        $: i
      }), "clear"), i
    }
  })(jQuery), v.fn.repeaterVal = function () {
    var t = function (a) {
        var s = [];
        return d(a, function (o, c) {
          var h = [];
          c !== "undefined" && (h.push(c.match(/^[^\[]*/)[0]), h = h.concat(A(c.match(/\[[^\]]*\]/g), function (b) {
            return b.replace(/[\[\]]/g, "")
          })), s.push({
            val: o,
            key: h
          }))
        }), s
      },
      f = function (a) {
        if (a.length === 1 && (a[0].key.length === 0 || a[0].key.length === 1 && !a[0].key[0])) return a[0].val;
        d(a, function (c) {
          c.head = c.key.shift()
        });
        var s = function () {
            var c = {};
            return d(a, function (h) {
              c[h.head] || (c[h.head] = []), c[h.head].push(h)
            }), c
          }(),
          o;
        return /^[0-9]+$/.test(a[0].head) ? (o = [], d(s, function (c) {
          o.push(f(c))
        })) : (o = {}, d(s, function (c, h) {
          o[h] = f(c)
        })), o
      };
    return f(t(v(this).inputVal()))
  }, v.fn.repeater = function (t) {
    t = t || {};
    var f;
    return v(this).each(function () {
      var a = v(this),
        s = t.show || function () {
          v(this).show()
        },
        o = t.hide || function (l) {
          l()
        },
        c = a.find("[data-repeater-list]").first(),
        h = function (l, p) {
          return l.filter(function () {
            return p ? v(this).closest(K(p, "selector").join(",")).length === 0 : !0
          })
        },
        b = function () {
          return h(c.find("[data-repeater-item]"), t.repeaters)
        },
        S = c.find("[data-repeater-item]").first().clone().hide(),
        O = h(h(v(this).find("[data-repeater-item]"), t.repeaters).first().find("[data-repeater-delete]"), t.repeaters);
      t.isFirstItemUndeletable && O && O.remove();
      var k = function () {
          var l = c.data("repeater-list");
          return t.$parent ? t.$parent.data("item-name") + "[" + l + "]" : l
        },
        q = function (l) {
          t.repeaters && l.each(function () {
            var p = v(this);
            d(t.repeaters, function (m) {
              p.find(m.selector).repeater(U(m, {
                $parent: p
              }))
            })
          })
        },
        B = function (l, p, m) {
          l && d(l, function (i) {
            m.call(p.find(i.selector)[0], i)
          })
        },
        T = function (l, p, m) {
          l.each(function (i) {
            var n = v(this);
            n.data("item-name", p + "[" + i + "]"), h(n.find("[name]"), m).each(function () {
              var e = v(this),
                r = e.attr("name").match(/\[[^\]]+\]/g),
                u = r ? D(r).replace(/\[|\]/g, "") : e.attr("name"),
                y = p + "[" + i + "][" + u + "]" + (e.is(":checkbox") || e.attr("multiple") ? "[]" : "");
              e.attr("name", y), B(m, n, function (x) {
                var g = v(this);
                T(h(g.find("[data-repeater-item]"), x.repeaters || []), p + "[" + i + "][" + g.find("[data-repeater-list]").first().data("repeater-list") + "]", x.repeaters)
              })
            })
          }), c.find("input[name][checked]").removeAttr("checked").prop("checked", !0)
        };
      T(b(), k(), t.repeaters), q(b()), t.initEmpty && b().remove(), t.ready && t.ready(function () {
        T(b(), k(), t.repeaters)
      });
      var P = function () {
          var l = function (p, m, i) {
            if (m || t.defaultValues) {
              var n = {};
              h(p.find("[name]"), i).each(function () {
                var e = v(this).attr("name").match(/\[([^\]]*)(\]|\]\[\])$/)[1];
                n[e] = v(this).attr("name")
              }), p.inputVal(A(z(m || t.defaultValues, function (e, r) {
                return n[r]
              }), M, function (e) {
                return n[e]
              }))
            }
            B(i, p, function (e) {
              var r = v(this);
              h(r.find("[data-repeater-item]"), e.repeaters).each(function () {
                var u = r.find("[data-repeater-list]").data("repeater-list");
                if (m && m[u]) {
                  var y = v(this).clone();
                  r.find("[data-repeater-item]").remove(), d(m[u], function (x) {
                    var g = y.clone();
                    l(g, x, e.repeaters || []), r.find("[data-repeater-list]").append(g)
                  })
                } else l(v(this), e.defaultValues, e.repeaters || [])
              })
            })
          };
          return function (p, m) {
            c.append(p), T(b(), k(), t.repeaters), p.find("[name]").each(function () {
              v(this).inputClear()
            }), l(p, m || t.defaultValues, t.repeaters)
          }
        }(),
        $ = function (l) {
          var p = S.clone();
          P(p, l), t.repeaters && q(p), s.call(p.get(0))
        };
      f = function (l) {
        b().remove(), d(l, $)
      }, h(a.find("[data-repeater-create]"), t.repeaters).click(function () {
        $()
      }), c.on("click", "[data-repeater-delete]", function () {
        var l = v(this).closest("[data-repeater-item]").get(0);
        o.call(l, function () {
          v(l).remove(), T(b(), k(), t.repeaters)
        })
      })
    }), this.setList = f, this
  }
})(jQuery);