const p = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"],
  _ = ["transition", "MozTransition", "webkitTransition", "WebkitTransition", "OTransition"],
  y = `
.layout-menu-fixed .layout-navbar-full .layout-menu,
.layout-menu-fixed-offcanvas .layout-navbar-full .layout-menu {
  top: {navbarHeight}px !important;
}
.layout-page {
  padding-top: {navbarHeight}px !important;
}
.content-wrapper {
  padding-bottom: {footerHeight}px !important;
}`;

function f(e) {
  throw new Error(`Parameter required${e?`: \`${e}\``:""}`)
}
const m = {
  ROOT_EL: typeof window < "u" ? document.documentElement : null,
  LAYOUT_BREAKPOINT: 1200,
  RESIZE_DELAY: 200,
  menuPsScroll: null,
  mainMenu: null,
  _curStyle: null,
  _styleEl: null,
  _resizeTimeout: null,
  _resizeCallback: null,
  _transitionCallback: null,
  _transitionCallbackTimeout: null,
  _listeners: [],
  _initialized: !1,
  _autoUpdate: !1,
  _lastWindowHeight: 0,
  _scrollToActive(e = !1, t = 500) {
    const n = this.getLayoutMenu();
    if (!n) return;
    let s = n.querySelector("li.menu-item.active:not(.open)");
    if (s) {
      const i = (a, d, c, h) => (a /= h / 2, a < 1 ? c / 2 * a * a + d : (a -= 1, -c / 2 * (a * (a - 2) - 1) + d)),
        o = this.getLayoutMenu().querySelector(".menu-inner");
      if (typeof s == "string" && (s = document.querySelector(s)), typeof s != "number" && (s = s.getBoundingClientRect().top + o.scrollTop), s < parseInt(o.clientHeight * 2 / 3, 10)) return;
      const r = o.scrollTop,
        l = s - r - parseInt(o.clientHeight / 2, 10),
        u = +new Date;
      if (e === !0) {
        const a = () => {
          const c = +new Date - u,
            h = i(c, r, l, t);
          o.scrollTop = h, c < t ? requestAnimationFrame(a) : o.scrollTop = l
        };
        a()
      } else o.scrollTop = l
    }
  },
  _swipeIn(e, t) {
    const {
      Hammer: n
    } = window;
    if (typeof n < "u" && typeof e == "string") {
      const s = document.querySelector(e);
      s && new n(s).on("panright", t)
    }
  },
  _swipeOut(e, t) {
    const {
      Hammer: n
    } = window;
    typeof n < "u" && typeof e == "string" && setTimeout(() => {
      const s = document.querySelector(e);
      if (s) {
        const i = new n(s);
        i.get("pan").set({
          direction: n.DIRECTION_ALL,
          threshold: 250
        }), i.on("panleft", t)
      }
    }, 500)
  },
  _overlayTap(e, t) {
    const {
      Hammer: n
    } = window;
    if (typeof n < "u" && typeof e == "string") {
      const s = document.querySelector(e);
      s && new n(s).on("tap", t)
    }
  },
  _addClass(e, t = this.ROOT_EL) {
    t && t.length !== void 0 ? t.forEach(n => {
      n && e.split(" ").forEach(s => n.classList.add(s))
    }) : t && e.split(" ").forEach(n => t.classList.add(n))
  },
  _removeClass(e, t = this.ROOT_EL) {
    t && t.length !== void 0 ? t.forEach(n => {
      n && e.split(" ").forEach(s => n.classList.remove(s))
    }) : t && e.split(" ").forEach(n => t.classList.remove(n))
  },
  _toggleClass(e = this.ROOT_EL, t, n) {
    e.classList.contains(t) ? e.classList.replace(t, n) : e.classList.replace(n, t)
  },
  _hasClass(e, t = this.ROOT_EL) {
    let n = !1;
    return e.split(" ").forEach(s => {
      t.classList.contains(s) && (n = !0)
    }), n
  },
  _findParent(e, t) {
    if (e && e.tagName.toUpperCase() === "BODY" || e.tagName.toUpperCase() === "HTML") return null;
    for (e = e.parentNode; e && e.tagName.toUpperCase() !== "BODY" && !e.classList.contains(t);) e = e.parentNode;
    return e = e && e.tagName.toUpperCase() !== "BODY" ? e : null, e
  },
  _triggerWindowEvent(e) {
    if (!(typeof window > "u"))
      if (document.createEvent) {
        let t;
        typeof Event == "function" ? t = new Event(e) : (t = document.createEvent("Event"), t.initEvent(e, !1, !0)), window.dispatchEvent(t)
      } else window.fireEvent(`on${e}`, document.createEventObject())
  },
  _triggerEvent(e) {
    this._triggerWindowEvent(`layout${e}`), this._listeners.filter(t => t.event === e).forEach(t => t.callback.call(null))
  },
  _updateInlineStyle(e = 0, t = 0) {
    this._styleEl || (this._styleEl = document.createElement("style"), this._styleEl.type = "text/css", document.head.appendChild(this._styleEl));
    const n = y.replace(/\{navbarHeight\}/gi, e).replace(/\{footerHeight\}/gi, t);
    this._curStyle !== n && (this._curStyle = n, this._styleEl.textContent = n)
  },
  _removeInlineStyle() {
    this._styleEl && document.head.removeChild(this._styleEl), this._styleEl = null, this._curStyle = null
  },
  _redrawLayoutMenu() {
    const e = this.getLayoutMenu();
    if (e && e.querySelector(".menu")) {
      const t = e.querySelector(".menu-inner"),
        {
          scrollTop: n
        } = t,
        s = document.documentElement.scrollTop;
      return e.style.display = "none", e.style.display = "", t.scrollTop = n, document.documentElement.scrollTop = s, !0
    }
    return !1
  },
  _supportsTransitionEnd() {
    if (window.QUnit) return !1;
    const e = document.body || document.documentElement;
    if (!e) return !1;
    let t = !1;
    return _.forEach(n => {
      typeof e.style[n] < "u" && (t = !0)
    }), t
  },
  _getNavbarHeight() {
    const e = this.getLayoutNavbar();
    if (!e) return 0;
    if (!this.isSmallScreen()) return e.getBoundingClientRect().height;
    const t = e.cloneNode(!0);
    t.id = null, t.style.visibility = "hidden", t.style.position = "absolute", Array.prototype.slice.call(t.querySelectorAll(".collapse.show")).forEach(s => this._removeClass("show", s)), e.parentNode.insertBefore(t, e);
    const n = t.getBoundingClientRect().height;
    return t.parentNode.removeChild(t), n
  },
  _getFooterHeight() {
    const e = this.getLayoutFooter();
    return e ? e.getBoundingClientRect().height : 0
  },
  _getAnimationDuration(e) {
    const t = window.getComputedStyle(e).transitionDuration;
    return parseFloat(t) * (t.indexOf("ms") !== -1 ? 1 : 1e3)
  },
  _setMenuHoverState(e) {
    this[e ? "_addClass" : "_removeClass"]("layout-menu-hover")
  },
  _setCollapsed(e) {
    this.isSmallScreen() ? e ? this._removeClass("layout-menu-expanded") : setTimeout(() => {
      this._addClass("layout-menu-expanded")
    }, this._redrawLayoutMenu() ? 5 : 0) : this[e ? "_addClass" : "_removeClass"]("layout-menu-collapsed")
  },
  _bindLayoutAnimationEndEvent(e, t) {
    const n = this.getMenu(),
      s = n ? this._getAnimationDuration(n) + 50 : 0;
    if (!s) {
      e.call(this), t.call(this);
      return
    }
    this._transitionCallback = i => {
      i.target === n && (this._unbindLayoutAnimationEndEvent(), t.call(this))
    }, p.forEach(i => {
      n.addEventListener(i, this._transitionCallback, !1)
    }), e.call(this), this._transitionCallbackTimeout = setTimeout(() => {
      this._transitionCallback.call(this, {
        target: n
      })
    }, s)
  },
  _unbindLayoutAnimationEndEvent() {
    const e = this.getMenu();
    this._transitionCallbackTimeout && (clearTimeout(this._transitionCallbackTimeout), this._transitionCallbackTimeout = null), e && this._transitionCallback && p.forEach(t => {
      e.removeEventListener(t, this._transitionCallback, !1)
    }), this._transitionCallback && (this._transitionCallback = null)
  },
  _bindWindowResizeEvent() {
    this._unbindWindowResizeEvent();
    const e = () => {
      this._resizeTimeout && (clearTimeout(this._resizeTimeout), this._resizeTimeout = null), this._triggerEvent("resize")
    };
    this._resizeCallback = () => {
      this._resizeTimeout && clearTimeout(this._resizeTimeout), this._resizeTimeout = setTimeout(e, this.RESIZE_DELAY)
    }, window.addEventListener("resize", this._resizeCallback, !1)
  },
  _unbindWindowResizeEvent() {
    this._resizeTimeout && (clearTimeout(this._resizeTimeout), this._resizeTimeout = null), this._resizeCallback && (window.removeEventListener("resize", this._resizeCallback, !1), this._resizeCallback = null)
  },
  _bindMenuMouseEvents() {
    if (this._menuMouseEnter && this._menuMouseLeave && this._windowTouchStart) return;
    const e = this.getLayoutMenu();
    if (!e) return this._unbindMenuMouseEvents();
    this._menuMouseEnter || (this._menuMouseEnter = () => this.isSmallScreen() || !this._hasClass("layout-menu-collapsed") || this.isOffcanvas() || this._hasClass("layout-transitioning") ? this._setMenuHoverState(!1) : this._setMenuHoverState(!0), e.addEventListener("mouseenter", this._menuMouseEnter, !1), e.addEventListener("touchstart", this._menuMouseEnter, !1)), this._menuMouseLeave || (this._menuMouseLeave = () => {
      this._setMenuHoverState(!1)
    }, e.addEventListener("mouseleave", this._menuMouseLeave, !1)), this._windowTouchStart || (this._windowTouchStart = t => {
      (!t || !t.target || !this._findParent(t.target, ".layout-menu")) && this._setMenuHoverState(!1)
    }, window.addEventListener("touchstart", this._windowTouchStart, !0))
  },
  _unbindMenuMouseEvents() {
    if (!this._menuMouseEnter && !this._menuMouseLeave && !this._windowTouchStart) return;
    const e = this.getLayoutMenu();
    this._menuMouseEnter && (e && (e.removeEventListener("mouseenter", this._menuMouseEnter, !1), e.removeEventListener("touchstart", this._menuMouseEnter, !1)), this._menuMouseEnter = null), this._menuMouseLeave && (e && e.removeEventListener("mouseleave", this._menuMouseLeave, !1), this._menuMouseLeave = null), this._windowTouchStart && (e && window.addEventListener("touchstart", this._windowTouchStart, !0), this._windowTouchStart = null), this._setMenuHoverState(!1)
  },
  scrollToActive(e = !1) {
    this._scrollToActive(e)
  },
  swipeIn(e, t) {
    this._swipeIn(e, t)
  },
  swipeOut(e, t) {
    this._swipeOut(e, t)
  },
  overlayTap(e, t) {
    this._overlayTap(e, t)
  },
  scrollPageTo(e, t = 500) {
    const n = (u, a, d, c) => (u /= c / 2, u < 1 ? d / 2 * u * u + a : (u -= 1, -d / 2 * (u * (u - 2) - 1) + a)),
      s = document.scrollingElement;
    typeof e == "string" && (e = document.querySelector(e)), typeof e != "number" && (e = e.getBoundingClientRect().top + s.scrollTop);
    const i = s.scrollTop,
      o = e - i,
      r = +new Date,
      l = () => {
        const a = +new Date - r,
          d = n(a, i, o, t);
        s.scrollTop = d, a < t ? requestAnimationFrame(l) : s.scrollTop = e
      };
    l()
  },
  setCollapsed(e = f("collapsed"), t = !0) {
    this.getLayoutMenu() && (this._unbindLayoutAnimationEndEvent(), t && this._supportsTransitionEnd() ? (this._addClass("layout-transitioning"), e && this._setMenuHoverState(!1), this._bindLayoutAnimationEndEvent(() => {
      this._setCollapsed(e)
    }, () => {
      this._removeClass("layout-transitioning"), this._triggerWindowEvent("resize"), this._triggerEvent("toggle"), this._setMenuHoverState(!1)
    })) : (this._addClass("layout-no-transition"), e && this._setMenuHoverState(!1), this._setCollapsed(e), setTimeout(() => {
      this._removeClass("layout-no-transition"), this._triggerWindowEvent("resize"), this._triggerEvent("toggle"), this._setMenuHoverState(!1)
    }, 1)))
  },
  toggleCollapsed(e = !0) {
    this.setCollapsed(!this.isCollapsed(), e)
  },
  setPosition(e = f("fixed"), t = f("offcanvas")) {
    this._removeClass("layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas"), !e && t ? this._addClass("layout-menu-offcanvas") : e && !t ? (this._addClass("layout-menu-fixed"), this._redrawLayoutMenu()) : e && t && (this._addClass("layout-menu-fixed-offcanvas"), this._redrawLayoutMenu()), this.update()
  },
  getLayoutMenu() {
    return document.querySelector(".layout-menu")
  },
  getMenu() {
    const e = this.getLayoutMenu();
    return e ? this._hasClass("menu", e) ? e : e.querySelector(".menu") : null
  },
  getLayoutNavbar() {
    return document.querySelector(".layout-navbar")
  },
  getLayoutFooter() {
    return document.querySelector(".content-footer")
  },
  getLayoutContainer() {
    return document.querySelector(".layout-page")
  },
  setNavbarFixed(e = f("fixed")) {
    this[e ? "_addClass" : "_removeClass"]("layout-navbar-fixed"), this.update()
  },
  setNavbar(e) {
    e === "sticky" ? (this._addClass("layout-navbar-fixed"), this._removeClass("layout-navbar-hidden")) : e === "hidden" ? (this._addClass("layout-navbar-hidden"), this._removeClass("layout-navbar-fixed")) : (this._removeClass("layout-navbar-hidden"), this._removeClass("layout-navbar-fixed")), this.update()
  },
  setFooterFixed(e = f("fixed")) {
    this[e ? "_addClass" : "_removeClass"]("layout-footer-fixed"), this.update()
  },
  setContentLayout(e = f("contentLayout")) {
    setTimeout(() => {
      const t = document.querySelector(".content-wrapper > div"),
        n = document.querySelector(".layout-navbar"),
        s = document.querySelector(".layout-navbar > div"),
        i = document.querySelector(".layout-navbar .search-input-wrapper"),
        o = document.querySelector(".layout-navbar .search-input-wrapper .search-input"),
        r = document.querySelector(".content-footer > div"),
        l = [].slice.call(document.querySelectorAll(".container-fluid")),
        u = [].slice.call(document.querySelectorAll(".container-xxl")),
        a = document.querySelector(".menu-vertical");
      let d = !1,
        c;
      document.querySelector(".content-wrapper > .menu-horizontal > div") && (d = !0, c = document.querySelector(".content-wrapper > .menu-horizontal > div")), e === "compact" ? (l.some(h => [t, r].includes(h)) && (this._removeClass("container-fluid", [t, r]), this._addClass("container-xxl", [t, r])), o && (this._removeClass("container-fluid", [o]), this._addClass("container-xxl", [o])), a && l.some(h => [n].includes(h)) && (this._removeClass("container-fluid", [n]), this._addClass("container-xxl", [n])), d && (this._removeClass("container-fluid", c), this._addClass("container-xxl", c), s && (this._removeClass("container-fluid", s), this._addClass("container-xxl", s)), i && (this._removeClass("container-fluid", i), this._addClass("container-xxl", i)))) : (u.some(h => [t, r].includes(h)) && (this._removeClass("container-xxl", [t, r]), this._addClass("container-fluid", [t, r])), o && (this._removeClass("container-xxl", [o]), this._addClass("container-fluid", [o])), a && u.some(h => [n].includes(h)) && (this._removeClass("container-xxl", [n]), this._addClass("container-fluid", [n])), d && (this._removeClass("container-xxl", c), this._addClass("container-fluid", c), s && (this._removeClass("container-xxl", s), this._addClass("container-fluid", s)), i && (this._removeClass("container-xxl", i), this._addClass("container-fluid", i))))
    }, 100)
  },
  update() {
    (this.getLayoutNavbar() && (!this.isSmallScreen() && this.isLayoutNavbarFull() && this.isFixed() || this.isNavbarFixed()) || this.getLayoutFooter() && this.isFooterFixed()) && this._updateInlineStyle(this._getNavbarHeight(), this._getFooterHeight()), this._bindMenuMouseEvents()
  },
  setAutoUpdate(e = f("enable")) {
    e && !this._autoUpdate ? (this.on("resize.Helpers:autoUpdate", () => this.update()), this._autoUpdate = !0) : !e && this._autoUpdate && (this.off("resize.Helpers:autoUpdate"), this._autoUpdate = !1)
  },
  updateCustomOptionCheck(e) {
    e.checked ? (e.type === "radio" && [].slice.call(e.closest(".row").querySelectorAll(".custom-option")).map(function (n) {
      n.closest(".custom-option").classList.remove("checked")
    }), e.closest(".custom-option").classList.add("checked")) : e.closest(".custom-option").classList.remove("checked")
  },
  isRtl() {
    return document.querySelector("body").getAttribute("dir") === "rtl" || document.querySelector("html").getAttribute("dir") === "rtl"
  },
  isMobileDevice() {
    return typeof window.orientation < "u" || navigator.userAgent.indexOf("IEMobile") !== -1
  },
  isSmallScreen() {
    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < this.LAYOUT_BREAKPOINT
  },
  isLayoutNavbarFull() {
    return !!document.querySelector(".layout-wrapper.layout-navbar-full")
  },
  isCollapsed() {
    return this.isSmallScreen() ? !this._hasClass("layout-menu-expanded") : this._hasClass("layout-menu-collapsed")
  },
  isFixed() {
    return this._hasClass("layout-menu-fixed layout-menu-fixed-offcanvas")
  },
  isOffcanvas() {
    return this._hasClass("layout-menu-offcanvas layout-menu-fixed-offcanvas")
  },
  isNavbarFixed() {
    return this._hasClass("layout-navbar-fixed") || !this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull()
  },
  isFooterFixed() {
    return this._hasClass("layout-footer-fixed")
  },
  isLightStyle() {
    return document.documentElement.classList.contains("light-style")
  },
  isDarkStyle() {
    return document.documentElement.classList.contains("dark-style")
  },
  on(e = f("event"), t = f("callback")) {
    const [n] = e.split(".");
    let [, ...s] = e.split(".");
    s = s.join(".") || null, this._listeners.push({
      event: n,
      namespace: s,
      callback: t
    })
  },
  off(e = f("event")) {
    const [t] = e.split(".");
    let [, ...n] = e.split(".");
    n = n.join(".") || null, this._listeners.filter(s => s.event === t && s.namespace === n).forEach(s => this._listeners.splice(this._listeners.indexOf(s), 1))
  },
  init() {
    this._initialized || (this._initialized = !0, this._updateInlineStyle(0), this._bindWindowResizeEvent(), this.off("init._Helpers"), this.on("init._Helpers", () => {
      this.off("resize._Helpers:redrawMenu"), this.on("resize._Helpers:redrawMenu", () => {
        this.isSmallScreen() && !this.isCollapsed() && this._redrawLayoutMenu()
      }), typeof document.documentMode == "number" && document.documentMode < 11 && (this.off("resize._Helpers:ie10RepaintBody"), this.on("resize._Helpers:ie10RepaintBody", () => {
        if (this.isFixed()) return;
        const {
          scrollTop: e
        } = document.documentElement;
        document.body.style.display = "none", document.body.style.display = "block", document.documentElement.scrollTop = e
      }))
    }), this._triggerEvent("init"))
  },
  destroy() {
    this._initialized && (this._initialized = !1, this._removeClass("layout-transitioning"), this._removeInlineStyle(), this._unbindLayoutAnimationEndEvent(), this._unbindWindowResizeEvent(), this._unbindMenuMouseEvents(), this.setAutoUpdate(!1), this.off("init._Helpers"), this._listeners.filter(e => e.event !== "init").forEach(e => this._listeners.splice(this._listeners.indexOf(e), 1)))
  },
  initPasswordToggle() {
    const e = document.querySelectorAll(".form-password-toggle i");
    typeof e < "u" && e !== null && e.forEach(t => {
      t.addEventListener("click", n => {
        n.preventDefault();
        const s = t.closest(".form-password-toggle"),
          i = s.querySelector("i"),
          o = s.querySelector("input");
        o.getAttribute("type") === "text" ? (o.setAttribute("type", "password"), i.classList.replace("ri-eye-line", "ri-eye-off-line")) : o.getAttribute("type") === "password" && (o.setAttribute("type", "text"), i.classList.replace("ri-eye-off-line", "ri-eye-line"))
      })
    })
  },
  initCustomOptionCheck() {
    const e = this;
    [].slice.call(document.querySelectorAll(".custom-option .form-check-input")).map(function (n) {
      e.updateCustomOptionCheck(n), n.addEventListener("click", s => {
        e.updateCustomOptionCheck(n)
      })
    })
  },
  initSpeechToText() {
    const e = window.SpeechRecognition || window.webkitSpeechRecognition,
      t = document.querySelectorAll(".speech-to-text");
    if (e != null && typeof t < "u" && t !== null) {
      const n = new e;
      document.querySelectorAll(".speech-to-text i").forEach(i => {
        let o = !1;
        i.addEventListener("click", () => {
          i.closest(".input-group").querySelector(".form-control").focus(), n.onspeechstart = () => {
            o = !0
          }, o === !1 && n.start(), n.onerror = () => {
            o = !1
          }, n.onresult = r => {
            i.closest(".input-group").querySelector(".form-control").value = r.results[0][0].transcript
          }, n.onspeechend = () => {
            o = !1, n.stop()
          }
        })
      })
    }
  },
  navTabsAnimation() {
    setTimeout(() => {
      document.querySelectorAll(".nav-tabs").forEach(e => {
        let t = e.querySelector(".tab-slider");
        if (!t) {
          const i = document.createElement("span");
          i.setAttribute("class", "tab-slider"), t = e.appendChild(i)
        }
        const n = e.closest(".nav-align-left") || e.closest(".nav-align-right"),
          s = i => {
            const r = i.parentElement.getBoundingClientRect(),
              l = i.getBoundingClientRect(),
              u = l.x - r.x,
              a = e.closest(".nav-align-bottom");
            n ? (t.style.top = l.y - r.y + "px", t.style[e.closest(".nav-align-right") ? "inset-inline-start" : "inset-inline-end"] = 0, t.style.height = l.height + "px") : (t.style.left = u + "px", t.style.width = l.width + "px", a || (t.style.bottom = 0))
          };
        e.addEventListener("click", i => {
          i.target.closest(".nav-item .active") && s(i.target.closest(".nav-item"))
        }), s(e.querySelector(".nav-link.active").closest(".nav-item"))
      })
    }, 50)
  },
  initNavbarDropdownScrollbar() {
    const e = document.querySelectorAll(".navbar-dropdown .scrollable-container"),
      {
        PerfectScrollbar: t
      } = window;
    t !== void 0 && typeof e < "u" && e !== null && e.forEach(n => {
      new t(n, {
        wheelPropagation: !1,
        suppressScrollX: !0
      })
    })
  },
  ajaxCall(e) {
    return new Promise((t, n) => {
      const s = new XMLHttpRequest;
      s.open("GET", e), s.onload = () => s.status === 200 ? t(s.response) : n(Error(s.statusText)), s.onerror = i => n(Error(`Network Error: ${i}`)), s.send()
    })
  },
  initSidebarToggle() {
    document.querySelectorAll('[data-bs-toggle="sidebar"]').forEach(t => {
      t.addEventListener("click", () => {
        const n = t.getAttribute("data-target"),
          s = t.getAttribute("data-overlay"),
          i = document.querySelectorAll(".app-overlay");
        document.querySelectorAll(n).forEach(r => {
          r.classList.toggle("show"), typeof s < "u" && s !== null && s !== !1 && typeof i < "u" && (r.classList.contains("show") ? i[0].classList.add("show") : i[0].classList.remove("show"), i[0].addEventListener("click", l => {
            l.currentTarget.classList.remove("show"), r.classList.remove("show")
          }))
        })
      })
    })
  }
};
typeof window < "u" && (m.init(), m.isMobileDevice() && window.chrome && document.documentElement.classList.add("layout-menu-100vh"), document.readyState === "complete" ? m.update() : document.addEventListener("DOMContentLoaded", function e() {
  m.update(), document.removeEventListener("DOMContentLoaded", e)
}));
window.Helpers = m;