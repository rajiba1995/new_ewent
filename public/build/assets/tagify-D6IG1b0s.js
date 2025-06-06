import {
  c as st,
  g as at
} from "./_commonjsHelpers-BosuxZz1.js";
var G = {
  exports: {}
};
(function (B, rt) {
  (function (V, M) {
    B.exports = M()
  })(st, function () {
    function V(t, e) {
      var i = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(t);
        e && (s = s.filter(function (a) {
          return Object.getOwnPropertyDescriptor(t, a).enumerable
        })), i.push.apply(i, s)
      }
      return i
    }

    function M(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e] != null ? arguments[e] : {};
        e % 2 ? V(Object(i), !0).forEach(function (s) {
          Q(t, s, i[s])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : V(Object(i)).forEach(function (s) {
          Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(i, s))
        })
      }
      return t
    }

    function Q(t, e, i) {
      return (e = function (s) {
        var a = function (o, n) {
          if (typeof o != "object" || o === null) return o;
          var r = o[Symbol.toPrimitive];
          if (r !== void 0) {
            var l = r.call(o, n || "default");
            if (typeof l != "object") return l;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }
          return (n === "string" ? String : Number)(o)
        }(s, "string");
        return typeof a == "symbol" ? a : String(a)
      }(e)) in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = i, t
    }
    const E = (t, e, i, s) => (t = "" + t, e = "" + e, s && (t = t.trim(), e = e.trim()), i ? t == e : t.toLowerCase() == e.toLowerCase()),
      j = (t, e) => t && Array.isArray(t) && t.map(i => P(i, e));

    function P(t, e) {
      var i, s = {};
      for (i in t) e.indexOf(i) < 0 && (s[i] = t[i]);
      return s
    }

    function $(t) {
      var e = document.createElement("div");
      return t.replace(/\&#?[0-9a-z]+;/gi, function (i) {
        return e.innerHTML = i, e.innerText
      })
    }

    function R(t) {
      return new DOMParser().parseFromString(t.trim(), "text/html").body.firstElementChild
    }

    function W(t, e) {
      for (e = e || "previous"; t = t[e + "Sibling"];)
        if (t.nodeType == 3) return t
    }

    function I(t) {
      return typeof t == "string" ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/`|'/g, "&#039;") : t
    }

    function O(t) {
      var e = Object.prototype.toString.call(t).split(" ")[1].slice(0, -1);
      return t === Object(t) && e != "Array" && e != "Function" && e != "RegExp" && e != "HTMLUnknownElement"
    }

    function T(t, e, i) {
      function s(a, o) {
        for (var n in o)
          if (o.hasOwnProperty(n)) {
            if (O(o[n])) {
              O(a[n]) ? s(a[n], o[n]) : a[n] = Object.assign({}, o[n]);
              continue
            }
            if (Array.isArray(o[n])) {
              a[n] = Object.assign([], o[n]);
              continue
            }
            a[n] = o[n]
          }
      }
      return t instanceof Object || (t = {}), s(t, e), i && s(t, i), t
    }

    function q() {
      const t = [],
        e = {};
      for (let i of arguments)
        for (let s of i) O(s) ? e[s.value] || (t.push(s), e[s.value] = 1) : t.includes(s) || t.push(s);
      return t
    }

    function C(t) {
      return String.prototype.normalize ? typeof t == "string" ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : void 0 : t
    }
    var K = () => /(?=.*chrome)(?=.*android)/i.test(navigator.userAgent);

    function z() {
      return ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, t => (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16))
    }

    function _(t) {
      return t && t.classList && t.classList.contains(this.settings.classNames.tag)
    }

    function U(t, e) {
      var i = window.getSelection();
      return e = e || i.getRangeAt(0), typeof t == "string" && (t = document.createTextNode(t)), e && (e.deleteContents(), e.insertNode(t)), t
    }

    function c(t, e, i) {
      return t ? (e && (t.__tagifyTagData = i ? e : T({}, t.__tagifyTagData || {}, e)), t.__tagifyTagData) : (console.warn("tag element doesn't exist", t, e), e)
    }

    function D(t) {
      if (t && t.parentNode) {
        var e = t,
          i = window.getSelection(),
          s = i.getRangeAt(0);
        i.rangeCount && (s.setStartAfter(e), s.collapse(!0), i.removeAllRanges(), i.addRange(s))
      }
    }

    function X(t, e) {
      t.forEach(i => {
        if (c(i.previousSibling) || !i.previousSibling) {
          var s = document.createTextNode("â€‹");
          i.before(s), e && D(s)
        }
      })
    }
    var F = {
      delimiters: ",",
      pattern: null,
      tagTextProp: "value",
      maxTags: 1 / 0,
      callbacks: {},
      addTagOnBlur: !0,
      addTagOn: ["blur", "tab", "enter"],
      onChangeAfterBlur: !0,
      duplicates: !1,
      whitelist: [],
      blacklist: [],
      enforceWhitelist: !1,
      userInput: !0,
      keepInvalidTags: !1,
      createInvalidTags: !0,
      mixTagsAllowedAfter: /,|\.|\:|\s/,
      mixTagsInterpolator: ["[[", "]]"],
      backspace: !0,
      skipInvalid: !1,
      pasteAsTags: !0,
      editTags: {
        clicks: 2,
        keepInvalid: !0
      },
      transformTag: () => {},
      trim: !0,
      a11y: {
        focusableTags: !1
      },
      mixMode: {
        insertAfterTag: "Â "
      },
      autoComplete: {
        enabled: !0,
        rightKey: !1,
        tabKey: !1
      },
      classNames: {
        namespace: "tagify",
        mixMode: "tagify--mix",
        selectMode: "tagify--select",
        input: "tagify__input",
        focus: "tagify--focus",
        tagNoAnimation: "tagify--noAnim",
        tagInvalid: "tagify--invalid",
        tagNotAllowed: "tagify--notAllowed",
        scopeLoading: "tagify--loading",
        hasMaxTags: "tagify--hasMaxTags",
        hasNoTags: "tagify--noTags",
        empty: "tagify--empty",
        inputInvalid: "tagify__input--invalid",
        dropdown: "tagify__dropdown",
        dropdownWrapper: "tagify__dropdown__wrapper",
        dropdownHeader: "tagify__dropdown__header",
        dropdownFooter: "tagify__dropdown__footer",
        dropdownItem: "tagify__dropdown__item",
        dropdownItemActive: "tagify__dropdown__item--active",
        dropdownItemHidden: "tagify__dropdown__item--hidden",
        dropdownInital: "tagify__dropdown--initial",
        tag: "tagify__tag",
        tagText: "tagify__tag-text",
        tagX: "tagify__tag__removeBtn",
        tagLoading: "tagify__tag--loading",
        tagEditing: "tagify__tag--editable",
        tagFlash: "tagify__tag--flash",
        tagHide: "tagify__tag--hide"
      },
      dropdown: {
        classname: "",
        enabled: 2,
        maxItems: 10,
        searchKeys: ["value", "searchBy"],
        fuzzySearch: !0,
        caseSensitive: !1,
        accentedSearch: !0,
        includeSelectedTags: !1,
        escapeHTML: !0,
        highlightFirst: !1,
        closeOnSelect: !0,
        clearOnSelect: !0,
        position: "all",
        appendTarget: null
      },
      hooks: {
        beforeRemoveTag: () => Promise.resolve(),
        beforePaste: () => Promise.resolve(),
        suggestionClick: () => Promise.resolve(),
        beforeKeyDown: () => Promise.resolve()
      }
    };

    function Y() {
      this.dropdown = {};
      for (let t in this._dropdown) this.dropdown[t] = typeof this._dropdown[t] == "function" ? this._dropdown[t].bind(this) : this._dropdown[t];
      this.dropdown.refs()
    }
    var Z = {
      refs() {
        this.DOM.dropdown = this.parseTemplate("dropdown", [this.settings]), this.DOM.dropdown.content = this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-wrapper']")
      },
      getHeaderRef() {
        return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-header']")
      },
      getFooterRef() {
        return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-footer']")
      },
      getAllSuggestionsRefs() {
        return [...this.DOM.dropdown.content.querySelectorAll(this.settings.classNames.dropdownItemSelector)]
      },
      show(t) {
        var e, i, s, a = this.settings,
          o = a.mode == "mix" && !a.enforceWhitelist,
          n = !a.whitelist || !a.whitelist.length,
          r = a.dropdown.position == "manual";
        if (t = t === void 0 ? this.state.inputText : t, !(n && !o && !a.templates.dropdownItemNoMatch || a.dropdown.enable === !1 || this.state.isLoading || this.settings.readonly)) {
          if (clearTimeout(this.dropdownHide__bindEventsTimeout), this.suggestedListItems = this.dropdown.filterListItems(t), t && !this.suggestedListItems.length && (this.trigger("dropdown:noMatch", t), a.templates.dropdownItemNoMatch && (s = a.templates.dropdownItemNoMatch.call(this, {
              value: t
            }))), !s) {
            if (this.suggestedListItems.length) t && o && !this.state.editing.scope && !E(this.suggestedListItems[0].value, t) && this.suggestedListItems.unshift({
              value: t
            });
            else {
              if (!t || !o || this.state.editing.scope) return this.input.autocomplete.suggest.call(this), void this.dropdown.hide();
              this.suggestedListItems = [{
                value: t
              }]
            }
            i = "" + (O(e = this.suggestedListItems[0]) ? e.value : e), a.autoComplete && i && i.indexOf(t) == 0 && this.input.autocomplete.suggest.call(this, e)
          }
          this.dropdown.fill(s), a.dropdown.highlightFirst && this.dropdown.highlightOption(this.DOM.dropdown.content.querySelector(a.classNames.dropdownItemSelector)), this.state.dropdown.visible || setTimeout(this.dropdown.events.binding.bind(this)), this.state.dropdown.visible = t || !0, this.state.dropdown.query = t, this.setStateSelection(), r || setTimeout(() => {
            this.dropdown.position(), this.dropdown.render()
          }), setTimeout(() => {
            this.trigger("dropdown:show", this.DOM.dropdown)
          })
        }
      },
      hide(t) {
        var e = this.DOM,
          i = e.scope,
          s = e.dropdown,
          a = this.settings.dropdown.position == "manual" && !t;
        if (s && document.body.contains(s) && !a) return window.removeEventListener("resize", this.dropdown.position), this.dropdown.events.binding.call(this, !1), i.setAttribute("aria-expanded", !1), s.parentNode.removeChild(s), setTimeout(() => {
          this.state.dropdown.visible = !1
        }, 100), this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null, this.state.tag && this.state.tag.value.length && (this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag), this.trigger("dropdown:hide", s), this
      },
      toggle(t) {
        this.dropdown[this.state.dropdown.visible && !t ? "hide" : "show"]()
      },
      render() {
        var t, e, i, s = (t = this.DOM.dropdown, (i = t.cloneNode(!0)).style.cssText = "position:fixed; top:-9999px; opacity:0", document.body.appendChild(i), e = i.clientHeight, i.parentNode.removeChild(i), e),
          a = this.settings;
        return typeof a.dropdown.enabled == "number" && a.dropdown.enabled >= 0 ? (this.DOM.scope.setAttribute("aria-expanded", !0), document.body.contains(this.DOM.dropdown) || (this.DOM.dropdown.classList.add(a.classNames.dropdownInital), this.dropdown.position(s), a.dropdown.appendTarget.appendChild(this.DOM.dropdown), setTimeout(() => this.DOM.dropdown.classList.remove(a.classNames.dropdownInital))), this) : this
      },
      fill(t) {
        t = typeof t == "string" ? t : this.dropdown.createListHTML(t || this.suggestedListItems);
        var e, i = this.settings.templates.dropdownContent.call(this, t);
        this.DOM.dropdown.content.innerHTML = (e = i) ? e.replace(/\>[\r\n ]+\</g, "><").split(/>\s+</).join("><").trim() : ""
      },
      fillHeaderFooter() {
        var t = this.dropdown.filterListItems(this.state.dropdown.query),
          e = this.parseTemplate("dropdownHeader", [t]),
          i = this.parseTemplate("dropdownFooter", [t]),
          s = this.dropdown.getHeaderRef(),
          a = this.dropdown.getFooterRef();
        e && (s == null || s.parentNode.replaceChild(e, s)), i && (a == null || a.parentNode.replaceChild(i, a))
      },
      refilter(t) {
        t = t || this.state.dropdown.query || "", this.suggestedListItems = this.dropdown.filterListItems(t), this.dropdown.fill(), this.suggestedListItems.length || this.dropdown.hide(), this.trigger("dropdown:updated", this.DOM.dropdown)
      },
      position(t) {
        var e = this.settings.dropdown;
        if (e.position != "manual") {
          var i, s, a, o, n, r, l, d, g, h = this.DOM.dropdown,
            v = e.RTL,
            p = e.appendTarget === document.body,
            m = p ? window.pageYOffset : e.appendTarget.scrollTop,
            u = document.fullscreenElement || document.webkitFullscreenElement || document.documentElement,
            f = u.clientHeight,
            y = Math.max(u.clientWidth || 0, window.innerWidth || 0) > 480 ? e.position : "all",
            N = this.DOM[y == "input" ? "input" : "scope"];
          if (t = t || h.clientHeight, this.state.dropdown.visible) {
            if (y == "text" ? (a = (i = function () {
                const w = document.getSelection();
                if (w.rangeCount) {
                  const b = w.getRangeAt(0),
                    x = b.startContainer,
                    H = b.startOffset;
                  let L, k;
                  if (H > 0) return k = document.createRange(), k.setStart(x, H - 1), k.setEnd(x, H), L = k.getBoundingClientRect(), {
                    left: L.right,
                    top: L.top,
                    bottom: L.bottom
                  };
                  if (x.getBoundingClientRect) return x.getBoundingClientRect()
                }
                return {
                  left: -9999,
                  top: -9999
                }
              }()).bottom, s = i.top, o = i.left, n = "auto") : (r = function (w) {
                for (var b = 0, x = 0; w && w != u;) b += w.offsetTop || 0, x += w.offsetLeft || 0, w = w.parentNode;
                return {
                  top: b,
                  left: x
                }
              }(e.appendTarget), s = (i = N.getBoundingClientRect()).top - r.top, a = i.bottom - 1 - r.top, o = i.left - r.left, n = i.width + "px"), !p) {
              let w = function () {
                for (var b = 0, x = e.appendTarget.parentNode; x;) b += x.scrollTop || 0, x = x.parentNode;
                return b
              }();
              s += w, a += w
            }
            s = Math.floor(s), a = Math.ceil(a), d = ((l = e.placeAbove ? ? f - i.bottom < t) ? s : a) + m, g = `left: ${o+(v&&i.width||0)+window.pageXOffset}px;`, h.style.cssText = `${g}; top: ${d}px; min-width: ${n}; max-width: ${n}`, h.setAttribute("placement", l ? "top" : "bottom"), h.setAttribute("position", y)
          }
        }
      },
      events: {
        binding() {
          let t = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
          var e = this.dropdown.events.callbacks,
            i = this.listeners.dropdown = this.listeners.dropdown || {
              position: this.dropdown.position.bind(this, null),
              onKeyDown: e.onKeyDown.bind(this),
              onMouseOver: e.onMouseOver.bind(this),
              onMouseLeave: e.onMouseLeave.bind(this),
              onClick: e.onClick.bind(this),
              onScroll: e.onScroll.bind(this)
            },
            s = t ? "addEventListener" : "removeEventListener";
          this.settings.dropdown.position != "manual" && (document[s]("scroll", i.position, !0), window[s]("resize", i.position), window[s]("keydown", i.onKeyDown)), this.DOM.dropdown[s]("mouseover", i.onMouseOver), this.DOM.dropdown[s]("mouseleave", i.onMouseLeave), this.DOM.dropdown[s]("mousedown", i.onClick), this.DOM.dropdown.content[s]("scroll", i.onScroll)
        },
        callbacks: {
          onKeyDown(t) {
            if (this.state.hasFocus && !this.state.composing) {
              var e = this.settings,
                i = this.DOM.dropdown.querySelector(e.classNames.dropdownItemActiveSelector),
                s = this.dropdown.getSuggestionDataByNode(i),
                a = e.mode == "mix";
              e.hooks.beforeKeyDown(t, {
                tagify: this
              }).then(o => {
                switch (t.key) {
                  case "ArrowDown":
                  case "ArrowUp":
                  case "Down":
                  case "Up":
                    t.preventDefault();
                    var n = this.dropdown.getAllSuggestionsRefs(),
                      r = t.key == "ArrowUp" || t.key == "Up";
                    i && (i = this.dropdown.getNextOrPrevOption(i, !r)), i && i.matches(e.classNames.dropdownItemSelector) || (i = n[r ? n.length - 1 : 0]), this.dropdown.highlightOption(i, !0);
                    break;
                  case "Escape":
                  case "Esc":
                    this.dropdown.hide();
                    break;
                  case "ArrowRight":
                    if (this.state.actions.ArrowLeft) return;
                  case "Tab": {
                    let d = !e.autoComplete.rightKey || !e.autoComplete.tabKey;
                    if (!a && i && d && !this.state.editing) {
                      t.preventDefault();
                      var l = this.dropdown.getMappedValue(s);
                      return this.input.autocomplete.set.call(this, l), !1
                    }
                    return !0
                  }
                  case "Enter":
                    t.preventDefault(), e.hooks.suggestionClick(t, {
                      tagify: this,
                      tagData: s,
                      suggestionElm: i
                    }).then(() => {
                      if (i) return this.dropdown.selectOption(i), i = this.dropdown.getNextOrPrevOption(i, !r), void this.dropdown.highlightOption(i);
                      this.dropdown.hide(), a || this.addTags(this.state.inputText.trim(), !0)
                    }).catch(d => d);
                    break;
                  case "Backspace": {
                    if (a || this.state.editing.scope) return;
                    const d = this.input.raw.call(this);
                    d != "" && d.charCodeAt(0) != 8203 || (e.backspace === !0 ? this.removeTags() : e.backspace == "edit" && setTimeout(this.editTag.bind(this), 0))
                  }
                }
              })
            }
          },
          onMouseOver(t) {
            var e = t.target.closest(this.settings.classNames.dropdownItemSelector);
            this.dropdown.highlightOption(e)
          },
          onMouseLeave(t) {
            this.dropdown.highlightOption()
          },
          onClick(t) {
            if (t.button == 0 && t.target != this.DOM.dropdown && t.target != this.DOM.dropdown.content) {
              var e = t.target.closest(this.settings.classNames.dropdownItemSelector),
                i = this.dropdown.getSuggestionDataByNode(e);
              this.state.actions.selectOption = !0, setTimeout(() => this.state.actions.selectOption = !1, 50), this.settings.hooks.suggestionClick(t, {
                tagify: this,
                tagData: i,
                suggestionElm: e
              }).then(() => {
                e ? this.dropdown.selectOption(e, t) : this.dropdown.hide()
              }).catch(s => console.warn(s))
            }
          },
          onScroll(t) {
            var e = t.target,
              i = e.scrollTop / (e.scrollHeight - e.parentNode.clientHeight) * 100;
            this.trigger("dropdown:scroll", {
              percentage: Math.round(i)
            })
          }
        }
      },
      getSuggestionDataByNode(t) {
        var e = t && t.getAttribute("value");
        return this.suggestedListItems.find(i => i.value == e) || null
      },
      getNextOrPrevOption(t) {
        let e = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
        var i = this.dropdown.getAllSuggestionsRefs(),
          s = i.findIndex(a => a === t);
        return e ? i[s + 1] : i[s - 1]
      },
      highlightOption(t, e) {
        var i, s = this.settings.classNames.dropdownItemActive;
        if (this.state.ddItemElm && (this.state.ddItemElm.classList.remove(s), this.state.ddItemElm.removeAttribute("aria-selected")), !t) return this.state.ddItemData = null, this.state.ddItemElm = null, void this.input.autocomplete.suggest.call(this);
        i = this.dropdown.getSuggestionDataByNode(t), this.state.ddItemData = i, this.state.ddItemElm = t, t.classList.add(s), t.setAttribute("aria-selected", !0), e && (t.parentNode.scrollTop = t.clientHeight + t.offsetTop - t.parentNode.clientHeight), this.settings.autoComplete && (this.input.autocomplete.suggest.call(this, i), this.dropdown.position())
      },
      selectOption(t, e) {
        var i = this.settings,
          s = i.dropdown,
          a = s.clearOnSelect,
          o = s.closeOnSelect;
        if (!t) return this.addTags(this.state.inputText, !0), void(o && this.dropdown.hide());
        e = e || {};
        var n = t.getAttribute("value"),
          r = n == "noMatch",
          l = this.suggestedListItems.find(d => (d.value ? ? d) == n);
        if (this.trigger("dropdown:select", {
            data: l,
            elm: t,
            event: e
          }), n && (l || r)) {
          if (this.state.editing) {
            let d = this.normalizeTags([l])[0];
            l = i.transformTag.call(this, d) || d, this.onEditTagDone(null, T({
              __isValid: !0
            }, l))
          } else this[i.mode == "mix" ? "addMixTags" : "addTags"]([l || this.input.raw.call(this)], a);
          this.DOM.input.parentNode && (setTimeout(() => {
            this.DOM.input.focus(), this.toggleFocusClass(!0)
          }), o && setTimeout(this.dropdown.hide.bind(this)), t.addEventListener("transitionend", () => {
            this.dropdown.fillHeaderFooter(), setTimeout(() => t.remove(), 100)
          }, {
            once: !0
          }), t.classList.add(this.settings.classNames.dropdownItemHidden))
        } else o && setTimeout(this.dropdown.hide.bind(this))
      },
      selectAll(t) {
        this.suggestedListItems.length = 0, this.dropdown.hide(), this.dropdown.filterListItems("");
        var e = this.dropdown.filterListItems("");
        return t || (e = this.state.dropdown.suggestions), this.addTags(e, !0), this
      },
      filterListItems(t, e) {
        var i, s, a, o, n, r = this.settings,
          l = r.dropdown,
          d = (e = e || {}, []),
          g = [],
          h = r.whitelist,
          v = l.maxItems >= 0 ? l.maxItems : 1 / 0,
          p = l.searchKeys,
          m = 0;
        if (!(t = r.mode == "select" && this.value.length && this.value[0][r.tagTextProp] == t ? "" : t) || !p.length) return d = l.includeSelectedTags ? h : h.filter(f => !this.isTagDuplicate(O(f) ? f.value : f)), this.state.dropdown.suggestions = d, d.slice(0, v);

        function u(f, y) {
          return y.toLowerCase().split(" ").every(N => f.includes(N.toLowerCase()))
        }
        for (n = l.caseSensitive ? "" + t : ("" + t).toLowerCase(); m < h.length; m++) {
          let f, y;
          i = h[m] instanceof Object ? h[m] : {
            value: h[m]
          };
          let N = Object.keys(i).some(w => p.includes(w)) ? p : ["value"];
          l.fuzzySearch && !e.exact ? (a = N.reduce((w, b) => w + " " + (i[b] || ""), "").toLowerCase().trim(), l.accentedSearch && (a = C(a), n = C(n)), f = a.indexOf(n) == 0, y = a === n, s = u(a, n)) : (f = !0, s = N.some(w => {
            var b = "" + (i[w] || "");
            return l.accentedSearch && (b = C(b), n = C(n)), l.caseSensitive || (b = b.toLowerCase()), y = b === n, e.exact ? b === n : b.indexOf(n) == 0
          })), o = !l.includeSelectedTags && this.isTagDuplicate(O(i) ? i.value : i), s && !o && (y && f ? g.push(i) : l.sortby == "startsWith" && f ? d.unshift(i) : d.push(i))
        }
        return this.state.dropdown.suggestions = g.concat(d), typeof l.sortby == "function" ? l.sortby(g.concat(d), n) : g.concat(d).slice(0, v)
      },
      getMappedValue(t) {
        var e = this.settings.dropdown.mapValueTo;
        return e ? typeof e == "function" ? e(t) : t[e] || t.value : t.value
      },
      createListHTML(t) {
        return T([], t).map((e, i) => {
          typeof e != "string" && typeof e != "number" || (e = {
            value: e
          });
          var s = this.dropdown.getMappedValue(e);
          return s = typeof s == "string" && this.settings.dropdown.escapeHTML ? I(s) : s, this.settings.templates.dropdownItem.apply(this, [M(M({}, e), {}, {
            mappedValue: s
          }), this])
        }).join("")
      }
    };
    const S = "@yaireo/tagify/";
    var J, tt = {
        empty: "empty",
        exceed: "number of tags exceeded",
        pattern: "pattern mismatch",
        duplicate: "already exists",
        notAllowed: "not allowed"
      },
      et = {
        wrapper: (t, e) => `<tags class="${e.classNames.namespace} ${e.mode?`${e.classNames[e.mode+"Mode"]}`:""} ${t.className}"
                    ${e.readonly?"readonly":""}
                    ${e.disabled?"disabled":""}
                    ${e.required?"required":""}
                    ${e.mode==="select"?"spellcheck='false'":""}
                    tabIndex="-1">
            <span ${!e.readonly&&e.userInput?"contenteditable":""} tabIndex="0" data-placeholder="${e.placeholder||"&#8203;"}" aria-placeholder="${e.placeholder||""}"
                class="${e.classNames.input}"
                role="textbox"
                aria-autocomplete="both"
                aria-multiline="${e.mode=="mix"}"></span>
                &#8203;
        </tags>`,
        tag(t, e) {
          let i = e.settings;
          return `<tag title="${t.title||t.value}"
                    contenteditable='false'
                    spellcheck='false'
                    tabIndex="${i.a11y.focusableTags?0:-1}"
                    class="${i.classNames.tag} ${t.class||""}"
                    ${this.getAttributes(t)}>
            <x title='' class="${i.classNames.tagX}" role='button' aria-label='remove tag'></x>
            <div>
                <span class="${i.classNames.tagText}">${t[i.tagTextProp]||t.value}</span>
            </div>
        </tag>`
        },
        dropdown(t) {
          var e = t.dropdown;
          return `<div class="${e.position=="manual"?"":t.classNames.dropdown} ${e.classname}" role="listbox" aria-labelledby="dropdown" dir="${e.RTL?"rtl":""}">
                    <div data-selector='tagify-suggestions-wrapper' class="${t.classNames.dropdownWrapper}"></div>
                </div>`
        },
        dropdownContent(t) {
          var e = this.settings.templates,
            i = this.state.dropdown.suggestions;
          return `
            ${e.dropdownHeader.call(this,i)}
            ${t}
            ${e.dropdownFooter.call(this,i)}
        `
        },
        dropdownItem(t) {
          return `<div ${this.getAttributes(t)}
                    class='${this.settings.classNames.dropdownItem} ${t.class||""}'
                    tabindex="0"
                    role="option">${t.mappedValue||t.value}</div>`
        },
        dropdownHeader(t) {
          return `<header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownHeader}"></header>`
        },
        dropdownFooter(t) {
          var e = t.length - this.settings.dropdown.maxItems;
          return e > 0 ? `<footer data-selector='tagify-suggestions-footer' class="${this.settings.classNames.dropdownFooter}">
                ${e} more items. Refine your search.
            </footer>` : ""
        },
        dropdownItemNoMatch: null
      },
      it = {
        customBinding() {
          this.customEventsList.forEach(t => {
            this.on(t, this.settings.callbacks[t])
          })
        },
        binding() {
          let t = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
          var e, i = this.events.callbacks,
            s = t ? "addEventListener" : "removeEventListener";
          if (!this.state.mainEvents || !t) {
            for (var a in this.state.mainEvents = t, t && !this.listeners.main && (this.events.bindGlobal.call(this), this.settings.isJQueryPlugin && jQuery(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this))), e = this.listeners.main = this.listeners.main || {
                focus: ["input", i.onFocusBlur.bind(this)],
                keydown: ["input", i.onKeydown.bind(this)],
                click: ["scope", i.onClickScope.bind(this)],
                dblclick: ["scope", i.onDoubleClickScope.bind(this)],
                paste: ["input", i.onPaste.bind(this)],
                drop: ["input", i.onDrop.bind(this)],
                compositionstart: ["input", i.onCompositionStart.bind(this)],
                compositionend: ["input", i.onCompositionEnd.bind(this)]
              }) this.DOM[e[a][0]][s](a, e[a][1]);
            clearInterval(this.listeners.main.originalInputValueObserverInterval), this.listeners.main.originalInputValueObserverInterval = setInterval(i.observeOriginalInputValue.bind(this), 500);
            var o = this.listeners.main.inputMutationObserver || new MutationObserver(i.onInputDOMChange.bind(this));
            o.disconnect(), this.settings.mode == "mix" && o.observe(this.DOM.input, {
              childList: !0
            })
          }
        },
        bindGlobal(t) {
          var e, i = this.events.callbacks,
            s = t ? "removeEventListener" : "addEventListener";
          if (this.listeners && (t || !this.listeners.global))
            for (e of (this.listeners.global = this.listeners.global || [{
                type: this.isIE ? "keydown" : "input",
                target: this.DOM.input,
                cb: i[this.isIE ? "onInputIE" : "onInput"].bind(this)
              }, {
                type: "keydown",
                target: window,
                cb: i.onWindowKeyDown.bind(this)
              }, {
                type: "blur",
                target: this.DOM.input,
                cb: i.onFocusBlur.bind(this)
              }, {
                type: "click",
                target: document,
                cb: i.onClickAnywhere.bind(this)
              }], this.listeners.global)) e.target[s](e.type, e.cb)
        },
        unbindGlobal() {
          this.events.bindGlobal.call(this, !0)
        },
        callbacks: {
          onFocusBlur(t) {
            var g, h;
            var e = this.settings,
              i = t.target ? this.trim(t.target.textContent) : "",
              s = (h = (g = this.value) == null ? void 0 : g[0]) == null ? void 0 : h[e.tagTextProp],
              a = t.type,
              o = e.dropdown.enabled >= 0,
              n = {
                relatedTarget: t.relatedTarget
              },
              r = this.state.actions.selectOption && (o || !e.dropdown.closeOnSelect),
              l = this.state.actions.addNew && o,
              d = t.relatedTarget && _.call(this, t.relatedTarget) && this.DOM.scope.contains(t.relatedTarget);
            if (a == "blur") {
              if (t.relatedTarget === this.DOM.scope) return this.dropdown.hide(), void this.DOM.input.focus();
              this.postUpdate(), e.onChangeAfterBlur && this.triggerChangeEvent()
            }
            if (!r && !l)
              if (this.state.hasFocus = a == "focus" && +new Date, this.toggleFocusClass(this.state.hasFocus), e.mode != "mix") {
                if (a == "focus") return this.trigger("focus", n), void(e.dropdown.enabled !== 0 && e.userInput || this.dropdown.show(this.value.length ? "" : void 0));
                a == "blur" && (this.trigger("blur", n), this.loading(!1), e.mode == "select" && (d && (this.removeTags(), i = ""), s === i && (i = "")), i && !this.state.actions.selectOption && e.addTagOnBlur && e.addTagOn.includes("blur") && this.addTags(i, !0)), this.DOM.input.removeAttribute("style"), this.dropdown.hide()
              } else a == "focus" ? this.trigger("focus", n) : t.type == "blur" && (this.trigger("blur", n), this.loading(!1), this.dropdown.hide(), this.state.dropdown.visible = void 0, this.setStateSelection())
          },
          onCompositionStart(t) {
            this.state.composing = !0
          },
          onCompositionEnd(t) {
            this.state.composing = !1
          },
          onWindowKeyDown(t) {
            var e, i = document.activeElement,
              s = _.call(this, i) && this.DOM.scope.contains(document.activeElement),
              a = s && i.hasAttribute("readonly");
            if (s && !a) switch (e = i.nextElementSibling, t.key) {
              case "Backspace":
                this.settings.readonly || (this.removeTags(i), (e || this.DOM.input).focus());
                break;
              case "Enter":
                setTimeout(this.editTag.bind(this), 0, i)
            }
          },
          onKeydown(t) {
            var e = this.settings;
            if (!this.state.composing && e.userInput) {
              e.mode == "select" && e.enforceWhitelist && this.value.length && t.key != "Tab" && t.preventDefault();
              var i = this.trim(t.target.textContent);
              this.trigger("keydown", {
                event: t
              }), e.hooks.beforeKeyDown(t, {
                tagify: this
              }).then(s => {
                if (e.mode == "mix") {
                  switch (t.key) {
                    case "Left":
                    case "ArrowLeft":
                      this.state.actions.ArrowLeft = !0;
                      break;
                    case "Delete":
                    case "Backspace":
                      if (this.state.editing) return;
                      var a = document.getSelection(),
                        o = t.key == "Delete" && a.anchorOffset == (a.anchorNode.length || 0),
                        n = a.anchorNode.previousSibling,
                        r = a.anchorNode.nodeType == 1 || !a.anchorOffset && n && n.nodeType == 1 && a.anchorNode.previousSibling;
                      $(this.DOM.input.innerHTML);
                      var l, d, g, h = this.getTagElms(),
                        v = a.anchorNode.length === 1 && a.anchorNode.nodeValue == "â€‹";
                      if (e.backspace == "edit" && r) return l = a.anchorNode.nodeType == 1 ? null : a.anchorNode.previousElementSibling, setTimeout(this.editTag.bind(this), 0, l), void t.preventDefault();
                      if (K() && r instanceof Element) return g = W(r), r.hasAttribute("readonly") || r.remove(), this.DOM.input.focus(), void setTimeout(() => {
                        D(g), this.DOM.input.click()
                      });
                      if (a.anchorNode.nodeName == "BR") return;
                      if ((o || r) && a.anchorNode.nodeType == 1 ? d = a.anchorOffset == 0 ? o ? h[0] : null : h[Math.min(h.length, a.anchorOffset) - 1] : o ? d = a.anchorNode.nextElementSibling : r instanceof Element && (d = r), a.anchorNode.nodeType == 3 && !a.anchorNode.nodeValue && a.anchorNode.previousElementSibling && t.preventDefault(), (r || o) && !e.backspace || a.type != "Range" && !a.anchorOffset && a.anchorNode == this.DOM.input && t.key != "Delete") return void t.preventDefault();
                      if (a.type != "Range" && d && d.hasAttribute("readonly")) return void D(W(d));
                      t.key == "Delete" && v && c(a.anchorNode.nextSibling) && this.removeTags(a.anchorNode.nextSibling), clearTimeout(J), J = setTimeout(() => {
                        var m = document.getSelection();
                        $(this.DOM.input.innerHTML), !o && m.anchorNode.previousSibling, this.value = [].map.call(h, (u, f) => {
                          var y = c(u);
                          if (u.parentNode || y.readonly) return y;
                          this.trigger("remove", {
                            tag: u,
                            index: f,
                            data: y
                          })
                        }).filter(u => u)
                      }, 20)
                  }
                  return !0
                }
                var p = e.dropdown.position == "manual";
                switch (t.key) {
                  case "Backspace":
                    e.mode == "select" && e.enforceWhitelist && this.value.length ? this.removeTags() : this.state.dropdown.visible && e.dropdown.position != "manual" || t.target.textContent != "" && i.charCodeAt(0) != 8203 || (e.backspace === !0 ? this.removeTags() : e.backspace == "edit" && setTimeout(this.editTag.bind(this), 0));
                    break;
                  case "Esc":
                  case "Escape":
                    if (this.state.dropdown.visible) return;
                    t.target.blur();
                    break;
                  case "Down":
                  case "ArrowDown":
                    this.state.dropdown.visible || this.dropdown.show();
                    break;
                  case "ArrowRight": {
                    let m = this.state.inputSuggestion || this.state.ddItemData;
                    if (m && e.autoComplete.rightKey) return void this.addTags([m], !0);
                    break
                  }
                  case "Tab": {
                    let m = e.mode == "select";
                    if (!i || m) return !0;
                    t.preventDefault()
                  }
                  case "Enter":
                    if (this.state.dropdown.visible && !p) return;
                    t.preventDefault(), setTimeout(() => {
                      this.state.dropdown.visible && !p || this.state.actions.selectOption || !e.addTagOn.includes(t.key.toLowerCase()) || this.addTags(i, !0)
                    })
                }
              }).catch(s => s)
            }
          },
          onInput(t) {
            this.postUpdate();
            var e = this.settings;
            if (e.mode == "mix") return this.events.callbacks.onMixTagsInput.call(this, t);
            var i = this.input.normalize.call(this, void 0, {
                trim: !1
              }),
              s = i.length >= e.dropdown.enabled,
              a = {
                value: i,
                inputElm: this.DOM.input
              },
              o = this.validateTag({
                value: i
              });
            e.mode == "select" && this.toggleScopeValidation(o), a.isValid = o, this.state.inputText != i && (this.input.set.call(this, i, !1), i.search(e.delimiters) != -1 ? this.addTags(i) && this.input.set.call(this) : e.dropdown.enabled >= 0 && this.dropdown[s ? "show" : "hide"](i), this.trigger("input", a))
          },
          onMixTagsInput(t) {
            var e, i, s, a, o, n, r, l, d = this.settings,
              g = this.value.length,
              h = this.getTagElms(),
              v = document.createDocumentFragment(),
              p = window.getSelection().getRangeAt(0),
              m = [].map.call(h, u => c(u).value);
            if (t.inputType == "deleteContentBackward" && K() && this.events.callbacks.onKeydown.call(this, {
                target: t.target,
                key: "Backspace"
              }), X(this.getTagElms()), this.value.slice().forEach(u => {
                u.readonly && !m.includes(u.value) && v.appendChild(this.createTagElem(u))
              }), v.childNodes.length && (p.insertNode(v), this.setRangeAtStartEnd(!1, v.lastChild)), h.length != g) return this.value = [].map.call(this.getTagElms(), u => c(u)), void this.update({
              withoutChangeEvent: !0
            });
            if (this.hasMaxTags()) return !0;
            if (window.getSelection && (n = window.getSelection()).rangeCount > 0 && n.anchorNode.nodeType == 3) {
              if ((p = n.getRangeAt(0).cloneRange()).collapse(!0), p.setStart(n.focusNode, 0), s = (e = p.toString().slice(0, p.endOffset)).split(d.pattern).length - 1, (i = e.match(d.pattern)) && (a = e.slice(e.lastIndexOf(i[i.length - 1]))), a) {
                if (this.state.actions.ArrowLeft = !1, this.state.tag = {
                    prefix: a.match(d.pattern)[0],
                    value: a.replace(d.pattern, "")
                  }, this.state.tag.baseOffset = n.baseOffset - this.state.tag.value.length, l = this.state.tag.value.match(d.delimiters)) return this.state.tag.value = this.state.tag.value.replace(d.delimiters, ""), this.state.tag.delimiters = l[0], this.addTags(this.state.tag.value, d.dropdown.clearOnSelect), void this.dropdown.hide();
                o = this.state.tag.value.length >= d.dropdown.enabled;
                try {
                  r = (r = this.state.flaggedTags[this.state.tag.baseOffset]).prefix == this.state.tag.prefix && r.value[0] == this.state.tag.value[0], this.state.flaggedTags[this.state.tag.baseOffset] && !this.state.tag.value && delete this.state.flaggedTags[this.state.tag.baseOffset]
                } catch {}(r || s < this.state.mixMode.matchedPatternCount) && (o = !1)
              } else this.state.flaggedTags = {};
              this.state.mixMode.matchedPatternCount = s
            }
            setTimeout(() => {
              this.update({
                withoutChangeEvent: !0
              }), this.trigger("input", T({}, this.state.tag, {
                textContent: this.DOM.input.textContent
              })), this.state.tag && this.dropdown[o ? "show" : "hide"](this.state.tag.value)
            }, 10)
          },
          onInputIE(t) {
            var e = this;
            setTimeout(function () {
              e.events.callbacks.onInput.call(e, t)
            })
          },
          observeOriginalInputValue() {
            this.DOM.originalInput.parentNode || this.destroy(), this.DOM.originalInput.value != this.DOM.originalInput.tagifyValue && this.loadOriginalValues()
          },
          onClickAnywhere(t) {
            t.target == this.DOM.scope || this.DOM.scope.contains(t.target) || (this.toggleFocusClass(!1), this.state.hasFocus = !1)
          },
          onClickScope(t) {
            var e = this.settings,
              i = t.target.closest("." + e.classNames.tag),
              s = +new Date - this.state.hasFocus;
            if (t.target != this.DOM.scope) {
              if (!t.target.classList.contains(e.classNames.tagX)) return i ? (this.trigger("click", {
                tag: i,
                index: this.getNodeIndex(i),
                data: c(i),
                event: t
              }), void(e.editTags !== 1 && e.editTags.clicks !== 1 || this.events.callbacks.onDoubleClickScope.call(this, t))) : void(t.target == this.DOM.input && (e.mode == "mix" && this.fixFirefoxLastTagNoCaret(), s > 500) ? this.state.dropdown.visible ? this.dropdown.hide() : e.dropdown.enabled === 0 && e.mode != "mix" && this.dropdown.show(this.value.length ? "" : void 0) : e.mode != "select" || e.dropdown.enabled !== 0 || this.state.dropdown.visible || this.dropdown.show());
              this.removeTags(t.target.parentNode)
            } else this.DOM.input.focus()
          },
          onPaste(t) {
            t.preventDefault();
            var e, i, s = this.settings;
            if (s.mode == "select" && s.enforceWhitelist || !s.userInput) return !1;
            s.readonly || (e = t.clipboardData || window.clipboardData, i = e.getData("Text"), s.hooks.beforePaste(t, {
              tagify: this,
              pastedText: i,
              clipboardData: e
            }).then(a => {
              a === void 0 && (a = i), a && (this.injectAtCaret(a, window.getSelection().getRangeAt(0)), this.settings.mode == "mix" ? this.events.callbacks.onMixTagsInput.call(this, t) : this.settings.pasteAsTags ? this.addTags(this.state.inputText + a, !0) : (this.state.inputText = a, this.dropdown.show(a)))
            }).catch(a => a))
          },
          onDrop(t) {
            t.preventDefault()
          },
          onEditTagInput(t, e) {
            var i = t.closest("." + this.settings.classNames.tag),
              s = this.getNodeIndex(i),
              a = c(i),
              o = this.input.normalize.call(this, t),
              n = {
                [this.settings.tagTextProp]: o,
                __tagId: a.__tagId
              },
              r = this.validateTag(n);
            this.editTagChangeDetected(T(a, n)) || t.originalIsValid !== !0 || (r = !0), i.classList.toggle(this.settings.classNames.tagInvalid, r !== !0), a.__isValid = r, i.title = r === !0 ? a.title || a.value : r, o.length >= this.settings.dropdown.enabled && (this.state.editing && (this.state.editing.value = o), this.dropdown.show(o)), this.trigger("edit:input", {
              tag: i,
              index: s,
              data: T({}, this.value[s], {
                newValue: o
              }),
              event: e
            })
          },
          onEditTagPaste(t, e) {
            var i = (e.clipboardData || window.clipboardData).getData("Text");
            e.preventDefault();
            var s = U(i);
            this.setRangeAtStartEnd(!1, s)
          },
          onEditTagFocus(t) {
            this.state.editing = {
              scope: t,
              input: t.querySelector("[contenteditable]")
            }
          },
          onEditTagBlur(t) {
            if (this.state.editing && (this.state.hasFocus || this.toggleFocusClass(), this.DOM.scope.contains(t))) {
              var e, i, s = this.settings,
                a = t.closest("." + s.classNames.tag),
                o = c(a),
                n = this.input.normalize.call(this, t),
                r = {
                  [s.tagTextProp]: n,
                  __tagId: o.__tagId
                },
                l = o.__originalData,
                d = this.editTagChangeDetected(T(o, r)),
                g = this.validateTag(r);
              if (n)
                if (d) {
                  if (e = this.hasMaxTags(), i = T({}, l, {
                      [s.tagTextProp]: this.trim(n),
                      __isValid: g
                    }), s.transformTag.call(this, i, l), (g = (!e || l.__isValid === !0) && this.validateTag(i)) !== !0) {
                    if (this.trigger("invalid", {
                        data: i,
                        tag: a,
                        message: g
                      }), s.editTags.keepInvalid) return;
                    s.keepInvalidTags ? i.__isValid = g : i = l
                  } else s.keepInvalidTags && (delete i.title, delete i["aria-invalid"], delete i.class);
                  this.onEditTagDone(a, i)
                } else this.onEditTagDone(a, l);
              else this.onEditTagDone(a)
            }
          },
          onEditTagkeydown(t, e) {
            if (!this.state.composing) switch (this.trigger("edit:keydown", {
              event: t
            }), t.key) {
              case "Esc":
              case "Escape":
                this.state.editing = !1, e.__tagifyTagData.__originalData.value ? e.parentNode.replaceChild(e.__tagifyTagData.__originalHTML, e) : e.remove();
                break;
              case "Enter":
              case "Tab":
                t.preventDefault(), t.target.blur()
            }
          },
          onDoubleClickScope(t) {
            var e, i, s = t.target.closest("." + this.settings.classNames.tag),
              a = c(s),
              o = this.settings;
            s && o.userInput && a.editable !== !1 && (e = s.classList.contains(this.settings.classNames.tagEditing), i = s.hasAttribute("readonly"), o.mode == "select" || o.readonly || e || i || !this.settings.editTags || this.editTag(s), this.toggleFocusClass(!0), this.trigger("dblclick", {
              tag: s,
              index: this.getNodeIndex(s),
              data: c(s)
            }))
          },
          onInputDOMChange(t) {
            t.forEach(i => {
              i.addedNodes.forEach(s => {
                var a;
                if (s.outerHTML == "<div><br></div>") s.replaceWith(document.createElement("br"));
                else if (s.nodeType == 1 && s.querySelector(this.settings.classNames.tagSelector)) {
                  let o = document.createTextNode("");
                  s.childNodes[0].nodeType == 3 && s.previousSibling.nodeName != "BR" && (o = document.createTextNode(`
`)), s.replaceWith(o, ...[...s.childNodes].slice(0, -1)), D(o)
                } else if (_.call(this, s))
                  if (((a = s.previousSibling) == null ? void 0 : a.nodeType) != 3 || s.previousSibling.textContent || s.previousSibling.remove(), s.previousSibling && s.previousSibling.nodeName == "BR") {
                    s.previousSibling.replaceWith(`
â€‹`);
                    let o = s.nextSibling,
                      n = "";
                    for (; o;) n += o.textContent, o = o.nextSibling;
                    n.trim() && D(s.previousSibling)
                  } else s.previousSibling && !c(s.previousSibling) || s.before("â€‹")
              }), i.removedNodes.forEach(s => {
                s && s.nodeName == "BR" && _.call(this, e) && (this.removeTags(e), this.fixFirefoxLastTagNoCaret())
              })
            });
            var e = this.DOM.input.lastChild;
            e && e.nodeValue == "" && e.remove(), e && e.nodeName == "BR" || this.DOM.input.appendChild(document.createElement("br"))
          }
        }
      };

    function A(t, e) {
      if (!t) {
        console.warn("Tagify:", "input element not found", t);
        const s = new Proxy(this, {
          get: () => () => s
        });
        return s
      }
      if (t.__tagify) return console.warn("Tagify: ", "input element is already Tagified - Same instance is returned.", t), t.__tagify;
      var i;
      T(this, function (s) {
        var a = document.createTextNode("");

        function o(n, r, l) {
          l && r.split(/\s+/g).forEach(d => a[n + "EventListener"].call(a, d, l))
        }
        return {
          off(n, r) {
            return o("remove", n, r), this
          },
          on(n, r) {
            return r && typeof r == "function" && o("add", n, r), this
          },
          trigger(n, r, l) {
            var d;
            if (l = l || {
                cloneData: !0
              }, n)
              if (s.settings.isJQueryPlugin) n == "remove" && (n = "removeTag"), jQuery(s.DOM.originalInput).triggerHandler(n, [r]);
              else {
                try {
                  var g = typeof r == "object" ? r : {
                    value: r
                  };
                  if ((g = l.cloneData ? T({}, g) : g).tagify = this, r.event && (g.event = this.cloneEvent(r.event)), r instanceof Object)
                    for (var h in r) r[h] instanceof HTMLElement && (g[h] = r[h]);
                  d = new CustomEvent(n, {
                    detail: g
                  })
                } catch (v) {
                  console.warn(v)
                }
                a.dispatchEvent(d)
              }
          }
        }
      }(this)), this.isFirefox = /firefox|fxios/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent), this.isIE = window.document.documentMode, e = e || {}, this.getPersistedData = (i = e.id, s => {
        let a, o = "/" + s;
        if (localStorage.getItem(S + i + "/v", 1) == 1) try {
          a = JSON.parse(localStorage[S + i + o])
        } catch {}
        return a
      }), this.setPersistedData = (s => s ? (localStorage.setItem(S + s + "/v", 1), (a, o) => {
        let n = "/" + o,
          r = JSON.stringify(a);
        a && o && (localStorage.setItem(S + s + n, r), dispatchEvent(new Event("storage")))
      }) : () => {})(e.id), this.clearPersistedData = (s => a => {
        const o = S + "/" + s + "/";
        if (a) localStorage.removeItem(o + a);
        else
          for (let n in localStorage) n.includes(o) && localStorage.removeItem(n)
      })(e.id), this.applySettings(t, e), this.state = {
        inputText: "",
        editing: !1,
        composing: !1,
        actions: {},
        mixMode: {},
        dropdown: {},
        flaggedTags: {}
      }, this.value = [], this.listeners = {}, this.DOM = {}, this.build(t), Y.call(this), this.getCSSVars(), this.loadOriginalValues(), this.events.customBinding.call(this), this.events.binding.call(this), t.autofocus && this.DOM.input.focus(), t.__tagify = this
    }
    return A.prototype = {
      _dropdown: Z,
      placeCaretAfterNode: D,
      getSetTagData: c,
      helpers: {
        sameStr: E,
        removeCollectionProp: j,
        omit: P,
        isObject: O,
        parseHTML: R,
        escapeHTML: I,
        extend: T,
        concatWithoutDups: q,
        getUID: z,
        isNodeTag: _
      },
      customEventsList: ["change", "add", "remove", "invalid", "input", "click", "keydown", "focus", "blur", "edit:input", "edit:beforeUpdate", "edit:updated", "edit:start", "edit:keydown", "dropdown:show", "dropdown:hide", "dropdown:select", "dropdown:updated", "dropdown:noMatch", "dropdown:scroll"],
      dataProps: ["__isValid", "__removed", "__originalData", "__originalHTML", "__tagId"],
      trim(t) {
        return this.settings.trim && t && typeof t == "string" ? t.trim() : t
      },
      parseHTML: R,
      templates: et,
      parseTemplate(t, e) {
        return R((t = this.settings.templates[t] || t).apply(this, e))
      },
      set whitelist(t) {
        const e = t && Array.isArray(t);
        this.settings.whitelist = e ? t : [], this.setPersistedData(e ? t : [], "whitelist")
      },
      get whitelist() {
        return this.settings.whitelist
      },
      generateClassSelectors(t) {
        for (let e in t) {
          let i = e;
          Object.defineProperty(t, i + "Selector", {
            get() {
              return "." + this[i].split(" ")[0]
            }
          })
        }
      },
      applySettings(t, e) {
        var o, n;
        F.templates = this.templates;
        var i = T({}, F, e.mode == "mix" ? {
            dropdown: {
              position: "text"
            }
          } : {}),
          s = this.settings = T({}, i, e);
        if (s.disabled = t.hasAttribute("disabled"), s.readonly = s.readonly || t.hasAttribute("readonly"), s.placeholder = I(t.getAttribute("placeholder") || s.placeholder || ""), s.required = t.hasAttribute("required"), this.generateClassSelectors(s.classNames), s.dropdown.includeSelectedTags === void 0 && (s.dropdown.includeSelectedTags = s.duplicates), this.isIE && (s.autoComplete = !1), ["whitelist", "blacklist"].forEach(r => {
            var l = t.getAttribute("data-" + r);
            l && (l = l.split(s.delimiters)) instanceof Array && (s[r] = l)
          }), "autoComplete" in e && !O(e.autoComplete) && (s.autoComplete = F.autoComplete, s.autoComplete.enabled = e.autoComplete), s.mode == "mix" && (s.pattern = s.pattern || /@/, s.autoComplete.rightKey = !0, s.delimiters = e.delimiters || null, s.tagTextProp && !s.dropdown.searchKeys.includes(s.tagTextProp) && s.dropdown.searchKeys.push(s.tagTextProp)), t.pattern) try {
          s.pattern = new RegExp(t.pattern)
        } catch {}
        if (s.delimiters) {
          s._delimiters = s.delimiters;
          try {
            s.delimiters = new RegExp(this.settings.delimiters, "g")
          } catch {}
        }
        s.disabled && (s.userInput = !1), this.TEXTS = M(M({}, tt), s.texts || {}), (s.mode != "select" || (o = e.dropdown) != null && o.enabled) && s.userInput || (s.dropdown.enabled = 0), s.dropdown.appendTarget = ((n = e.dropdown) == null ? void 0 : n.appendTarget) || document.body;
        let a = this.getPersistedData("whitelist");
        Array.isArray(a) && (this.whitelist = Array.isArray(s.whitelist) ? q(s.whitelist, a) : a)
      },
      getAttributes(t) {
        var e, i = this.getCustomAttributes(t),
          s = "";
        for (e in i) s += " " + e + (t[e] !== void 0 ? `="${i[e]}"` : "");
        return s
      },
      getCustomAttributes(t) {
        if (!O(t)) return "";
        var e, i = {};
        for (e in t) e.slice(0, 2) != "__" && e != "class" && t.hasOwnProperty(e) && t[e] !== void 0 && (i[e] = I(t[e]));
        return i
      },
      setStateSelection() {
        var t = window.getSelection(),
          e = {
            anchorOffset: t.anchorOffset,
            anchorNode: t.anchorNode,
            range: t.getRangeAt && t.rangeCount && t.getRangeAt(0)
          };
        return this.state.selection = e, e
      },
      getCSSVars() {
        var t = getComputedStyle(this.DOM.scope, null),
          e;
        this.CSSVars = {
          tagHideTransition: (i => {
            let s = i.value;
            return i.unit == "s" ? 1e3 * s : s
          })(function (i) {
            if (!i) return {};
            var s = (i = i.trim().split(" ")[0]).split(/\d+/g).filter(a => a).pop().trim();
            return {
              value: +i.split(s).filter(a => a)[0].trim(),
              unit: s
            }
          }((e = "tag-hide-transition", t.getPropertyValue("--" + e))))
        }
      },
      build(t) {
        var e = this.DOM;
        this.settings.mixMode.integrated ? (e.originalInput = null, e.scope = t, e.input = t) : (e.originalInput = t, e.originalInput_tabIndex = t.tabIndex, e.scope = this.parseTemplate("wrapper", [t, this.settings]), e.input = e.scope.querySelector(this.settings.classNames.inputSelector), t.parentNode.insertBefore(e.scope, t), t.tabIndex = -1)
      },
      destroy() {
        this.events.unbindGlobal.call(this), this.DOM.scope.parentNode.removeChild(this.DOM.scope), this.DOM.originalInput.tabIndex = this.DOM.originalInput_tabIndex, delete this.DOM.originalInput.__tagify, this.dropdown.hide(!0), clearTimeout(this.dropdownHide__bindEventsTimeout), clearInterval(this.listeners.main.originalInputValueObserverInterval)
      },
      loadOriginalValues(t) {
        var e, i = this.settings;
        if (this.state.blockChangeEvent = !0, t === void 0) {
          const s = this.getPersistedData("value");
          t = s && !this.DOM.originalInput.value ? s : i.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value
        }
        if (this.removeAllTags(), t)
          if (i.mode == "mix") this.parseMixTags(t), (e = this.DOM.input.lastChild) && e.tagName == "BR" || this.DOM.input.insertAdjacentHTML("beforeend", "<br>");
          else {
            try {
              JSON.parse(t) instanceof Array && (t = JSON.parse(t))
            } catch {}
            this.addTags(t, !0).forEach(s => s && s.classList.add(i.classNames.tagNoAnimation))
          }
        else this.postUpdate();
        this.state.lastOriginalValueReported = i.mixMode.integrated ? "" : this.DOM.originalInput.value
      },
      cloneEvent(t) {
        var e = {};
        for (var i in t) i != "path" && (e[i] = t[i]);
        return e
      },
      loading(t) {
        return this.state.isLoading = t, this.DOM.scope.classList[t ? "add" : "remove"](this.settings.classNames.scopeLoading), this
      },
      tagLoading(t, e) {
        return t && t.classList[e ? "add" : "remove"](this.settings.classNames.tagLoading), this
      },
      toggleClass(t, e) {
        typeof t == "string" && this.DOM.scope.classList.toggle(t, e)
      },
      toggleScopeValidation(t) {
        var e = t === !0 || t === void 0;
        !this.settings.required && t && t === this.TEXTS.empty && (e = !0), this.toggleClass(this.settings.classNames.tagInvalid, !e), this.DOM.scope.title = e ? "" : t
      },
      toggleFocusClass(t) {
        this.toggleClass(this.settings.classNames.focus, !!t)
      },
      triggerChangeEvent: function () {
        if (!this.settings.mixMode.integrated) {
          var t = this.DOM.originalInput,
            e = this.state.lastOriginalValueReported !== t.value,
            i = new CustomEvent("change", {
              bubbles: !0
            });
          e && (this.state.lastOriginalValueReported = t.value, i.simulated = !0, t._valueTracker && t._valueTracker.setValue(Math.random()), t.dispatchEvent(i), this.trigger("change", this.state.lastOriginalValueReported), t.value = this.state.lastOriginalValueReported)
        }
      },
      events: it,
      fixFirefoxLastTagNoCaret() {},
      setRangeAtStartEnd(t, e) {
        if (e) {
          t = typeof t == "number" ? t : !!t, e = e.lastChild || e;
          var i = document.getSelection();
          if (i.focusNode instanceof Element && !this.DOM.input.contains(i.focusNode)) return !0;
          try {
            i.rangeCount >= 1 && ["Start", "End"].forEach(s => i.getRangeAt(0)["set" + s](e, t || e.length))
          } catch (s) {
            console.warn("Tagify: ", s)
          }
        }
      },
      insertAfterTag(t, e) {
        if (e = e || this.settings.mixMode.insertAfterTag, t && t.parentNode && e) return e = typeof e == "string" ? document.createTextNode(e) : e, t.parentNode.insertBefore(e, t.nextSibling), e
      },
      editTagChangeDetected(t) {
        var e = t.__originalData;
        for (var i in e)
          if (!this.dataProps.includes(i) && t[i] != e[i]) return !0;
        return !1
      },
      getTagTextNode(t) {
        return t.querySelector(this.settings.classNames.tagTextSelector)
      },
      setTagTextNode(t, e) {
        this.getTagTextNode(t).innerHTML = I(e)
      },
      editTag(t, e) {
        t = t || this.getLastTag(), e = e || {}, this.dropdown.hide();
        var i = this.settings,
          s = this.getTagTextNode(t),
          a = this.getNodeIndex(t),
          o = c(t),
          n = this.events.callbacks,
          r = !0;
        if (s) {
          if (!(o instanceof Object && "editable" in o) || o.editable) return o = c(t, {
            __originalData: T({}, o),
            __originalHTML: t.cloneNode(!0)
          }), c(o.__originalHTML, o.__originalData), s.setAttribute("contenteditable", !0), t.classList.add(i.classNames.tagEditing), s.addEventListener("focus", n.onEditTagFocus.bind(this, t)), s.addEventListener("blur", n.onEditTagBlur.bind(this, this.getTagTextNode(t))), s.addEventListener("input", n.onEditTagInput.bind(this, s)), s.addEventListener("paste", n.onEditTagPaste.bind(this, s)), s.addEventListener("keydown", l => n.onEditTagkeydown.call(this, l, t)), s.addEventListener("compositionstart", n.onCompositionStart.bind(this)), s.addEventListener("compositionend", n.onCompositionEnd.bind(this)), e.skipValidation || (r = this.editTagToggleValidity(t)), s.originalIsValid = r, this.trigger("edit:start", {
            tag: t,
            index: a,
            data: o,
            isValid: r
          }), s.focus(), this.setRangeAtStartEnd(!1, s), this
        } else console.warn("Cannot find element in Tag template: .", i.classNames.tagTextSelector)
      },
      editTagToggleValidity(t, e) {
        var i;
        if (e = e || c(t)) return (i = !("__isValid" in e) || e.__isValid === !0) || this.removeTagsFromValue(t), this.update(), t.classList.toggle(this.settings.classNames.tagNotAllowed, !i), e.__isValid = i, e.__isValid;
        console.warn("tag has no data: ", t, e)
      },
      onEditTagDone(t, e) {
        t = t || this.state.editing.scope, e = e || {};
        var i, s = {
            tag: t,
            index: this.getNodeIndex(t),
            previousData: c(t),
            data: e
          },
          a = this.settings;
        this.trigger("edit:beforeUpdate", s, {
          cloneData: !1
        }), this.state.editing = !1, delete e.__originalData, delete e.__originalHTML, t && ((i = e[a.tagTextProp]) ? i.trim() && i : !(a.tagTextProp in e) && e.value) ? (t = this.replaceTag(t, e), this.editTagToggleValidity(t, e), a.a11y.focusableTags ? t.focus() : D(t)) : t && this.removeTags(t), this.trigger("edit:updated", s), this.dropdown.hide(), this.settings.keepInvalidTags && this.reCheckInvalidTags()
      },
      replaceTag(t, e) {
        e && e.value || (e = t.__tagifyTagData), e.__isValid && e.__isValid != 1 && T(e, this.getInvalidTagAttrs(e, e.__isValid));
        var i = this.createTagElem(e);
        return t.parentNode.replaceChild(i, t), this.updateValueByDOMTags(), i
      },
      updateValueByDOMTags() {
        this.value.length = 0, [].forEach.call(this.getTagElms(), t => {
          t.classList.contains(this.settings.classNames.tagNotAllowed.split(" ")[0]) || this.value.push(c(t))
        }), this.update()
      },
      injectAtCaret(t, e) {
        var s;
        if (!(e = e || ((s = this.state.selection) == null ? void 0 : s.range)) && t) return this.appendMixTags(t), this;
        let i = U(t, e);
        return this.setRangeAtStartEnd(!1, i), this.updateValueByDOMTags(), this.update(), this
      },
      input: {
        set() {
          let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
            e = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
          var i = this.settings.dropdown.closeOnSelect;
          this.state.inputText = t, e && (this.DOM.input.innerHTML = I("" + t)), !t && i && this.dropdown.hide.bind(this), this.input.autocomplete.suggest.call(this), this.input.validate.call(this)
        },
        raw() {
          return this.DOM.input.textContent
        },
        validate() {
          var t = !this.state.inputText || this.validateTag({
            value: this.state.inputText
          }) === !0;
          return this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !t), t
        },
        normalize(t, e) {
          var i = t || this.DOM.input,
            s = [];
          i.childNodes.forEach(a => a.nodeType == 3 && s.push(a.nodeValue)), s = s.join(`
`);
          try {
            s = s.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0))
          } catch {}
          return s = s.replace(/\s/g, " "), e != null && e.trim ? this.trim(s) : s
        },
        autocomplete: {
          suggest(t) {
            if (this.settings.autoComplete.enabled) {
              typeof (t = t || {
                value: ""
              }) == "string" && (t = {
                value: t
              });
              var e = this.dropdown.getMappedValue(t);
              if (typeof e != "number") {
                var i = e.substr(0, this.state.inputText.length).toLowerCase(),
                  s = e.substring(this.state.inputText.length);
                e && this.state.inputText && i == this.state.inputText.toLowerCase() ? (this.DOM.input.setAttribute("data-suggest", s), this.state.inputSuggestion = t) : (this.DOM.input.removeAttribute("data-suggest"), delete this.state.inputSuggestion)
              }
            }
          },
          set(t) {
            var e = this.DOM.input.getAttribute("data-suggest"),
              i = t || (e ? this.state.inputText + e : null);
            return !!i && (this.settings.mode == "mix" ? this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + i)) : (this.input.set.call(this, i), this.setRangeAtStartEnd(!1, this.DOM.input)), this.input.autocomplete.suggest.call(this), this.dropdown.hide(), !0)
          }
        }
      },
      getTagIdx(t) {
        return this.value.findIndex(e => e.__tagId == (t || {}).__tagId)
      },
      getNodeIndex(t) {
        var e = 0;
        if (t)
          for (; t = t.previousElementSibling;) e++;
        return e
      },
      getTagElms() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        var s = "." + [...this.settings.classNames.tag.split(" "), ...e].join(".");
        return [].slice.call(this.DOM.scope.querySelectorAll(s))
      },
      getLastTag() {
        var t = this.DOM.scope.querySelectorAll(`${this.settings.classNames.tagSelector}:not(.${this.settings.classNames.tagHide}):not([readonly])`);
        return t[t.length - 1]
      },
      isTagDuplicate(t, e, i) {
        var s = 0;
        if (this.settings.mode == "select") return !1;
        for (let a of this.value) E(this.trim("" + t), a.value, e) && i != a.__tagId && s++;
        return s
      },
      getTagIndexByValue(t) {
        var e = [],
          i = this.settings.dropdown.caseSensitive;
        return this.getTagElms().forEach((s, a) => {
          s.__tagifyTagData && E(this.trim(s.__tagifyTagData.value), t, i) && e.push(a)
        }), e
      },
      getTagElmByValue(t) {
        var e = this.getTagIndexByValue(t)[0];
        return this.getTagElms()[e]
      },
      flashTag(t) {
        t && (t.classList.add(this.settings.classNames.tagFlash), setTimeout(() => {
          t.classList.remove(this.settings.classNames.tagFlash)
        }, 100))
      },
      isTagBlacklisted(t) {
        return t = this.trim(t.toLowerCase()), this.settings.blacklist.filter(e => ("" + e).toLowerCase() == t).length
      },
      isTagWhitelisted(t) {
        return !!this.getWhitelistItem(t)
      },
      getWhitelistItem(t, e, i) {
        e = e || "value";
        var s, a = this.settings;
        return (i = i || a.whitelist).some(o => {
          var n = typeof o == "string" ? o : o[e] || o.value;
          if (E(n, t, a.dropdown.caseSensitive, a.trim)) return s = typeof o == "string" ? {
            value: o
          } : o, !0
        }), s || e != "value" || a.tagTextProp == "value" || (s = this.getWhitelistItem(t, a.tagTextProp, i)), s
      },
      validateTag(t) {
        var e = this.settings,
          i = "value" in t ? "value" : e.tagTextProp,
          s = this.trim(t[i] + "");
        return (t[i] + "").trim() ? e.mode != "mix" && e.pattern && e.pattern instanceof RegExp && !e.pattern.test(s) ? this.TEXTS.pattern : !e.duplicates && this.isTagDuplicate(s, e.dropdown.caseSensitive, t.__tagId) ? this.TEXTS.duplicate : this.isTagBlacklisted(s) || e.enforceWhitelist && !this.isTagWhitelisted(s) ? this.TEXTS.notAllowed : !e.validate || e.validate(t) : this.TEXTS.empty
      },
      getInvalidTagAttrs(t, e) {
        return {
          "aria-invalid": !0,
          class: `${t.class||""} ${this.settings.classNames.tagNotAllowed}`.trim(),
          title: e
        }
      },
      hasMaxTags() {
        return this.value.length >= this.settings.maxTags && this.TEXTS.exceed
      },
      setReadonly(t, e) {
        var i = this.settings;
        document.activeElement.blur(), i[e || "readonly"] = t, this.DOM.scope[(t ? "set" : "remove") + "Attribute"](e || "readonly", !0), this.settings.userInput = !0, this.setContentEditable(!t)
      },
      setContentEditable(t) {
        this.settings.userInput && (this.DOM.input.contentEditable = t, this.DOM.input.tabIndex = t ? 0 : -1)
      },
      setDisabled(t) {
        this.setReadonly(t, "disabled")
      },
      normalizeTags(t) {
        var e = this.settings,
          i = e.whitelist,
          s = e.delimiters,
          a = e.mode,
          o = e.tagTextProp,
          n = [],
          r = !!i && i[0] instanceof Object,
          l = Array.isArray(t),
          d = l && t[0].value,
          g = h => (h + "").split(s).filter(v => v).map(v => ({
            [o]: this.trim(v),
            value: this.trim(v)
          }));
        if (typeof t == "number" && (t = t.toString()), typeof t == "string") {
          if (!t.trim()) return [];
          t = g(t)
        } else l && (t = [].concat(...t.map(h => h.value != null ? h : g(h))));
        return r && !d && (t.forEach(h => {
          var v = n.map(u => u.value),
            p = this.dropdown.filterListItems.call(this, h[o], {
              exact: !0
            });
          this.settings.duplicates || (p = p.filter(u => !v.includes(u.value)));
          var m = p.length > 1 ? this.getWhitelistItem(h[o], o, p) : p[0];
          m && m instanceof Object ? n.push(m) : a != "mix" && (h.value == null && (h.value = h[o]), n.push(h))
        }), n.length && (t = n)), t
      },
      parseMixTags(t) {
        var e = this.settings,
          i = e.mixTagsInterpolator,
          s = e.duplicates,
          a = e.transformTag,
          o = e.enforceWhitelist,
          n = e.maxTags,
          r = e.tagTextProp,
          l = [];
        t = t.split(i[0]).map((g, h) => {
          var v, p, m, u = g.split(i[1]),
            f = u[0],
            y = l.length == n;
          try {
            if (f == +f) throw Error;
            p = JSON.parse(f)
          } catch {
            p = this.normalizeTags(f)[0] || {
              value: f
            }
          }
          if (a.call(this, p), y || !(u.length > 1) || o && !this.isTagWhitelisted(p.value) || !s && this.isTagDuplicate(p.value)) {
            if (g) return h ? i[0] + g : g
          } else p[v = p[r] ? r : "value"] = this.trim(p[v]), m = this.createTagElem(p), l.push(p), m.classList.add(this.settings.classNames.tagNoAnimation), u[0] = m.outerHTML, this.value.push(p);
          return u.join("")
        }).join(""), this.DOM.input.innerHTML = t, this.DOM.input.appendChild(document.createTextNode("")), this.DOM.input.normalize();
        var d = this.getTagElms();
        return d.forEach((g, h) => c(g, l[h])), this.update({
          withoutChangeEvent: !0
        }), X(d, this.state.hasFocus), t
      },
      replaceTextWithNode(t, e) {
        if (this.state.tag || e) {
          e = e || this.state.tag.prefix + this.state.tag.value;
          var i, s, a = this.state.selection || window.getSelection(),
            o = a.anchorNode,
            n = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0;
          return o.splitText(a.anchorOffset - n), (i = o.nodeValue.lastIndexOf(e)) == -1 || (s = o.splitText(i), t && o.parentNode.replaceChild(t, s)), !0
        }
      },
      selectTag(t, e) {
        var i = this.settings;
        if (!i.enforceWhitelist || this.isTagWhitelisted(e.value)) {
          this.input.set.call(this, e[i.tagTextProp] || e.value, !0), this.state.actions.selectOption && setTimeout(() => this.setRangeAtStartEnd(!1, this.DOM.input));
          var s = this.getLastTag();
          return s ? this.replaceTag(s, e) : this.appendTag(t), this.value[0] = e, this.update(), this.trigger("add", {
            tag: t,
            data: e
          }), [t]
        }
      },
      addEmptyTag(t) {
        var e = T({
            value: ""
          }, t || {}),
          i = this.createTagElem(e);
        c(i, e), this.appendTag(i), this.editTag(i, {
          skipValidation: !0
        })
      },
      addTags(t, e, i) {
        var s = [],
          a = this.settings,
          o = [],
          n = document.createDocumentFragment();
        if (i = i || a.skipInvalid, !t || t.length == 0) return s;
        switch (t = this.normalizeTags(t), a.mode) {
          case "mix":
            return this.addMixTags(t);
          case "select":
            e = !1, this.removeAllTags()
        }
        return this.DOM.input.removeAttribute("style"), t.forEach(r => {
          var l, d = {},
            g = Object.assign({}, r, {
              value: r.value + ""
            });
          if (r = Object.assign({}, g), a.transformTag.call(this, r), r.__isValid = this.hasMaxTags() || this.validateTag(r), r.__isValid !== !0) {
            if (i) return;
            if (T(d, this.getInvalidTagAttrs(r, r.__isValid), {
                __preInvalidData: g
              }), r.__isValid == this.TEXTS.duplicate && this.flashTag(this.getTagElmByValue(r.value)), !a.createInvalidTags) return void o.push(r.value)
          }
          if ("readonly" in r && (r.readonly ? d["aria-readonly"] = !0 : delete r.readonly), l = this.createTagElem(r, d), s.push(l), a.mode == "select") return this.selectTag(l, r);
          n.appendChild(l), r.__isValid && r.__isValid === !0 ? (this.value.push(r), this.trigger("add", {
            tag: l,
            index: this.value.length - 1,
            data: r
          })) : (this.trigger("invalid", {
            data: r,
            index: this.value.length,
            tag: l,
            message: r.__isValid
          }), a.keepInvalidTags || setTimeout(() => this.removeTags(l, !0), 1e3)), this.dropdown.position()
        }), this.appendTag(n), this.update(), t.length && e && (this.input.set.call(this, a.createInvalidTags ? "" : o.join(a._delimiters)), this.setRangeAtStartEnd(!1, this.DOM.input)), a.dropdown.enabled && this.dropdown.refilter(), s
      },
      addMixTags(t) {
        if ((t = this.normalizeTags(t))[0].prefix || this.state.tag) return this.prefixedTextToTag(t[0]);
        var e = document.createDocumentFragment();
        return t.forEach(i => {
          var s = this.createTagElem(i);
          e.appendChild(s)
        }), this.appendMixTags(e), e
      },
      appendMixTags(t) {
        var e = !!this.state.selection;
        e ? this.injectAtCaret(t) : (this.DOM.input.focus(), (e = this.setStateSelection()).range.setStart(this.DOM.input, e.range.endOffset), e.range.setEnd(this.DOM.input, e.range.endOffset), this.DOM.input.appendChild(t), this.updateValueByDOMTags(), this.update())
      },
      prefixedTextToTag(t) {
        var e, i = this.settings,
          s = this.state.tag.delimiters;
        if (i.transformTag.call(this, t), t.prefix = t.prefix || this.state.tag ? this.state.tag.prefix : (i.pattern.source || i.pattern)[0], e = this.createTagElem(t), this.replaceTextWithNode(e) || this.DOM.input.appendChild(e), setTimeout(() => e.classList.add(this.settings.classNames.tagNoAnimation), 300), this.value.push(t), this.update(), !s) {
          var a = this.insertAfterTag(e) || e;
          setTimeout(D, 0, a)
        }
        return this.state.tag = null, this.trigger("add", T({}, {
          tag: e
        }, {
          data: t
        })), e
      },
      appendTag(t) {
        var e = this.DOM,
          i = e.input;
        e.scope.insertBefore(t, i)
      },
      createTagElem(t, e) {
        t.__tagId = z();
        var i, s = T({}, t, M({
          value: I(t.value + "")
        }, e));
        return function (a) {
          for (var o, n = document.createNodeIterator(a, NodeFilter.SHOW_TEXT, null, !1); o = n.nextNode();) o.textContent.trim() || o.parentNode.removeChild(o)
        }(i = this.parseTemplate("tag", [s, this])), c(i, t), i
      },
      reCheckInvalidTags() {
        var t = this.settings;
        this.getTagElms(t.classNames.tagNotAllowed).forEach((e, i) => {
          var s = c(e),
            a = this.hasMaxTags(),
            o = this.validateTag(s),
            n = o === !0 && !a;
          if (t.mode == "select" && this.toggleScopeValidation(o), n) return s = s.__preInvalidData ? s.__preInvalidData : {
            value: s.value
          }, this.replaceTag(e, s);
          e.title = a || o
        })
      },
      removeTags(t, e, i) {
        var s, a = this.settings;
        if (t = t && t instanceof HTMLElement ? [t] : t instanceof Array ? t : t ? [t] : [this.getLastTag()], s = t.reduce((o, n) => {
            n && typeof n == "string" && (n = this.getTagElmByValue(n));
            var r = c(n);
            return n && r && !r.readonly && o.push({
              node: n,
              idx: this.getTagIdx(r),
              data: c(n, {
                __removed: !0
              })
            }), o
          }, []), i = typeof i == "number" ? i : this.CSSVars.tagHideTransition, a.mode == "select" && (i = 0, this.input.set.call(this)), s.length == 1 && a.mode != "select" && s[0].node.classList.contains(a.classNames.tagNotAllowed) && (e = !0), s.length) return a.hooks.beforeRemoveTag(s, {
          tagify: this
        }).then(() => {
          function o(n) {
            n.node.parentNode && (n.node.parentNode.removeChild(n.node), e ? a.keepInvalidTags && this.trigger("remove", {
              tag: n.node,
              index: n.idx
            }) : (this.trigger("remove", {
              tag: n.node,
              index: n.idx,
              data: n.data
            }), this.dropdown.refilter(), this.dropdown.position(), this.DOM.input.normalize(), a.keepInvalidTags && this.reCheckInvalidTags()))
          }
          i && i > 10 && s.length == 1 ? (function (n) {
            n.node.style.width = parseFloat(window.getComputedStyle(n.node).width) + "px", document.body.clientTop, n.node.classList.add(a.classNames.tagHide), setTimeout(o.bind(this), i, n)
          }).call(this, s[0]) : s.forEach(o.bind(this)), e || (this.removeTagsFromValue(s.map(n => n.node)), this.update(), a.mode == "select" && this.setContentEditable(!0))
        }).catch(o => {})
      },
      removeTagsFromDOM() {
        [].slice.call(this.getTagElms()).forEach(t => t.parentNode.removeChild(t))
      },
      removeTagsFromValue(t) {
        (t = Array.isArray(t) ? t : [t]).forEach(e => {
          var i = c(e),
            s = this.getTagIdx(i);
          s > -1 && this.value.splice(s, 1)
        })
      },
      removeAllTags(t) {
        t = t || {}, this.value = [], this.settings.mode == "mix" ? this.DOM.input.innerHTML = "" : this.removeTagsFromDOM(), this.dropdown.refilter(), this.dropdown.position(), this.state.dropdown.visible && setTimeout(() => {
          this.DOM.input.focus()
        }), this.settings.mode == "select" && (this.input.set.call(this), this.setContentEditable(!0)), this.update(t)
      },
      postUpdate() {
        var s, a;
        this.state.blockChangeEvent = !1;
        var t = this.settings,
          e = t.classNames,
          i = t.mode == "mix" ? t.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value.trim() : this.value.length + this.input.raw.call(this).length;
        this.toggleClass(e.hasMaxTags, this.value.length >= t.maxTags), this.toggleClass(e.hasNoTags, !this.value.length), this.toggleClass(e.empty, !i), t.mode == "select" && this.toggleScopeValidation((a = (s = this.value) == null ? void 0 : s[0]) == null ? void 0 : a.__isValid)
      },
      setOriginalInputValue(t) {
        var e = this.DOM.originalInput;
        this.settings.mixMode.integrated || (e.value = t, e.tagifyValue = e.value, this.setPersistedData(t, "value"))
      },
      update(t) {
        clearTimeout(this.debouncedUpdateTimeout), this.debouncedUpdateTimeout = setTimeout((function () {
          var e = this.getInputValue();
          this.setOriginalInputValue(e), this.settings.onChangeAfterBlur && (t || {}).withoutChangeEvent || this.state.blockChangeEvent || this.triggerChangeEvent(), this.postUpdate()
        }).bind(this), 100)
      },
      getInputValue() {
        var t = this.getCleanValue();
        return this.settings.mode == "mix" ? this.getMixedTagsAsString(t) : t.length ? this.settings.originalInputValueFormat ? this.settings.originalInputValueFormat(t) : JSON.stringify(t) : ""
      },
      getCleanValue(t) {
        return j(t || this.value, this.dataProps)
      },
      getMixedTagsAsString() {
        var t = "",
          e = this,
          i = this.settings,
          s = i.originalInputValueFormat || JSON.stringify,
          a = i.mixTagsInterpolator;
        return function o(n) {
          n.childNodes.forEach(r => {
            if (r.nodeType == 1) {
              const l = c(r);
              if (r.tagName == "BR" && (t += `\r
`), l && _.call(e, r)) {
                if (l.__removed) return;
                t += a[0] + s(P(l, e.dataProps)) + a[1]
              } else r.getAttribute("style") || ["B", "I", "U"].includes(r.tagName) ? t += r.textContent : r.tagName != "DIV" && r.tagName != "P" || (t += `\r
`, o(r))
            } else t += r.textContent
          })
        }(this.DOM.input), t
      }
    }, A.prototype.removeTag = A.prototype.removeTags, A
  })
})(G);
var nt = G.exports;
const ot = at(nt);
try {
  window.Tagify = ot
} catch {}