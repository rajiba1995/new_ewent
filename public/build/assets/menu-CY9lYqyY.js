const m = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"];
class o {
  constructor(t, n = {}, e = null) {
    if (this._el = t, this._horizontal = n.orientation === "horizontal", this._animate = n.animate !== !1, this._accordion = n.accordion !== !1, this._showDropdownOnHover = !!n.showDropdownOnHover, this._closeChildren = !!n.closeChildren, this._rtl = document.documentElement.getAttribute("dir") === "rtl" || document.body.getAttribute("dir") === "rtl", this._onOpen = n.onOpen || (() => {}), this._onOpened = n.onOpened || (() => {}), this._onClose = n.onClose || (() => {}), this._onClosed = n.onClosed || (() => {}), this._psScroll = null, this._topParent = null, this._menuBgClass = null, t.classList.add("menu"), t.classList[this._animate ? "remove" : "add"]("menu-no-animation"), this._horizontal) {
      t.classList.add("menu-horizontal"), t.classList.remove("menu-vertical"), this._inner = t.querySelector(".menu-inner");
      const s = this._inner.parentNode;
      this._prevBtn = t.querySelector(".menu-horizontal-prev"), this._prevBtn || (this._prevBtn = document.createElement("a"), this._prevBtn.href = "#", this._prevBtn.className = "menu-horizontal-prev", s.appendChild(this._prevBtn)), this._wrapper = t.querySelector(".menu-horizontal-wrapper"), this._wrapper || (this._wrapper = document.createElement("div"), this._wrapper.className = "menu-horizontal-wrapper", this._wrapper.appendChild(this._inner), s.appendChild(this._wrapper)), this._nextBtn = t.querySelector(".menu-horizontal-next"), this._nextBtn || (this._nextBtn = document.createElement("a"), this._nextBtn.href = "#", this._nextBtn.className = "menu-horizontal-next", s.appendChild(this._nextBtn)), this._innerPosition = 0, this.update()
    } else {
      t.classList.add("menu-vertical"), t.classList.remove("menu-horizontal");
      const s = e || window.PerfectScrollbar;
      s ? (this._scrollbar = new s(t.querySelector(".menu-inner"), {
        suppressScrollX: !0,
        wheelPropagation: !o._hasClass("layout-menu-fixed layout-menu-fixed-offcanvas")
      }), window.Helpers.menuPsScroll = this._scrollbar) : t.querySelector(".menu-inner").classList.add("overflow-auto")
    }
    const i = t.classList;
    for (let s = 0; s < i.length; s++) i[s].startsWith("bg-") && (this._menuBgClass = i[s]);
    t.setAttribute("data-bg-class", this._menuBgClass), this._horizontal && window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT && this.switchMenu("vertical"), this._bindEvents(), t.menuInstance = this
  }
  _bindEvents() {
    this._evntElClick = t => {
      if (t.target.closest("ul") && t.target.closest("ul").classList.contains("menu-inner")) {
        const e = o._findParent(t.target, "menu-item", !1);
        e && (this._topParent = e.childNodes[0])
      }
      const n = t.target.classList.contains("menu-toggle") ? t.target : o._findParent(t.target, "menu-toggle", !1);
      n && (t.preventDefault(), n.getAttribute("data-hover") !== "true" && this.toggle(n))
    }, (!this._showDropdownOnHover && this._horizontal || !this._horizontal || window.Helpers.isMobileDevice) && this._el.addEventListener("click", this._evntElClick), this._evntWindowResize = () => {
      this.update(), this._lastWidth !== window.innerWidth && (this._lastWidth = window.innerWidth, this.update());
      const t = document.querySelector("[data-template^='horizontal-menu']");
      !this._horizontal && !t && this.manageScroll()
    }, window.addEventListener("resize", this._evntWindowResize), this._horizontal && (this._evntPrevBtnClick = t => {
      t.preventDefault(), !this._prevBtn.classList.contains("disabled") && this._slide("prev")
    }, this._prevBtn.addEventListener("click", this._evntPrevBtnClick), this._evntNextBtnClick = t => {
      t.preventDefault(), !this._nextBtn.classList.contains("disabled") && this._slide("next")
    }, this._nextBtn.addEventListener("click", this._evntNextBtnClick), this._evntBodyClick = t => {
      !this._inner.contains(t.target) && this._el.querySelectorAll(".menu-inner > .menu-item.open").length && this.closeAll()
    }, document.body.addEventListener("click", this._evntBodyClick), this._showDropdownOnHover && (this._evntElMouseOver = t => {
      if (t.target !== t.currentTarget && !t.target.parentNode.classList.contains("open")) {
        const n = t.target.classList.contains("menu-toggle") ? t.target : null;
        n && (t.preventDefault(), n.getAttribute("data-hover") !== "true" && this.toggle(n))
      }
      t.stopPropagation()
    }, this._horizontal && window.screen.width > window.Helpers.LAYOUT_BREAKPOINT && this._el.addEventListener("mouseover", this._evntElMouseOver), this._evntElMouseOut = t => {
      const n = t.currentTarget,
        e = t.target,
        i = t.toElement || t.relatedTarget;
      if (e.closest("ul") && e.closest("ul").classList.contains("menu-inner") && (this._topParent = e), e !== n && (e.parentNode.classList.contains("open") || !e.classList.contains("menu-toggle")) && i && i.parentNode && !i.parentNode.classList.contains("menu-link")) {
        if (this._topParent && !o.childOf(i, this._topParent.parentNode)) {
          const a = this._topParent.classList.contains("menu-toggle") ? this._topParent : null;
          a && (t.preventDefault(), a.getAttribute("data-hover") !== "true" && (this.toggle(a), this._topParent = null))
        }
        if (o.childOf(i, e.parentNode)) return;
        const s = e.classList.contains("menu-toggle") ? e : null;
        s && (t.preventDefault(), s.getAttribute("data-hover") !== "true" && this.toggle(s))
      }
      t.stopPropagation()
    }, this._horizontal && window.screen.width > window.Helpers.LAYOUT_BREAKPOINT && this._el.addEventListener("mouseout", this._evntElMouseOut)))
  }
  static childOf(t, n) {
    if (t.parentNode) {
      for (;
        (t = t.parentNode) && t !== n;);
      return !!t
    }
    return !1
  }
  _unbindEvents() {
    this._evntElClick && (this._el.removeEventListener("click", this._evntElClick), this._evntElClick = null), this._evntElMouseOver && (this._el.removeEventListener("mouseover", this._evntElMouseOver), this._evntElMouseOver = null), this._evntElMouseOut && (this._el.removeEventListener("mouseout", this._evntElMouseOut), this._evntElMouseOut = null), this._evntWindowResize && (window.removeEventListener("resize", this._evntWindowResize), this._evntWindowResize = null), this._evntBodyClick && (document.body.removeEventListener("click", this._evntBodyClick), this._evntBodyClick = null), this._evntInnerMousemove && (this._inner.removeEventListener("mousemove", this._evntInnerMousemove), this._evntInnerMousemove = null), this._evntInnerMouseleave && (this._inner.removeEventListener("mouseleave", this._evntInnerMouseleave), this._evntInnerMouseleave = null)
  }
  static _isRoot(t) {
    return !o._findParent(t, "menu-item", !1)
  }
  static _findParent(t, n, e = !0) {
    if (t.tagName.toUpperCase() === "BODY") return null;
    for (t = t.parentNode; t.tagName.toUpperCase() !== "BODY" && !t.classList.contains(n);) t = t.parentNode;
    if (t = t.tagName.toUpperCase() !== "BODY" ? t : null, !t && e) throw new Error(`Cannot find \`.${n}\` parent element`);
    return t
  }
  static _findChild(t, n) {
    const e = t.childNodes,
      i = [];
    for (let s = 0, a = e.length; s < a; s++)
      if (e[s].classList) {
        let l = 0;
        for (let r = 0; r < n.length; r++) e[s].classList.contains(n[r]) && (l += 1);
        n.length === l && i.push(e[s])
      } return i
  }
  static _findMenu(t) {
    let n = t.childNodes[0],
      e = null;
    for (; n && !e;) n.classList && n.classList.contains("menu-sub") && (e = n), n = n.nextSibling;
    if (!e) throw new Error("Cannot find `.menu-sub` element for the current `.menu-toggle`");
    return e
  }
  static _hasClass(t, n = window.Helpers.ROOT_EL) {
    let e = !1;
    return t.split(" ").forEach(i => {
      n.classList.contains(i) && (e = !0)
    }), e
  }
  open(t, n = this._closeChildren) {
    const e = this._findUnopenedParent(o._getItem(t, !0), n);
    if (!e) return;
    const i = o._getLink(e, !0);
    o._promisify(this._onOpen, this, e, i, o._findMenu(e)).then(() => {
      !this._horizontal || !o._isRoot(e) ? this._animate && !this._horizontal ? (window.requestAnimationFrame(() => this._toggleAnimation(!0, e, !1)), this._accordion && this._closeOther(e, n)) : this._animate ? (this._toggleDropdown(!0, e, n), this._onOpened && this._onOpened(this, e, i, o._findMenu(e))) : (e.classList.add("open"), this._onOpened && this._onOpened(this, e, i, o._findMenu(e)), this._accordion && this._closeOther(e, n)) : (this._toggleDropdown(!0, e, n), this._onOpened && this._onOpened(this, e, i, o._findMenu(e)))
    }).catch(() => {})
  }
  close(t, n = this._closeChildren, e = !1) {
    const i = o._getItem(t, !0),
      s = o._getLink(t, !0);
    !i.classList.contains("open") || i.classList.contains("disabled") || o._promisify(this._onClose, this, i, s, o._findMenu(i), e).then(() => {
      if (!this._horizontal || !o._isRoot(i))
        if (this._animate && !this._horizontal) window.requestAnimationFrame(() => this._toggleAnimation(!1, i, n));
        else {
          if (i.classList.remove("open"), n) {
            const a = i.querySelectorAll(".menu-item.open");
            for (let l = 0, r = a.length; l < r; l++) a[l].classList.remove("open")
          }
          this._onClosed && this._onClosed(this, i, s, o._findMenu(i))
        }
      else this._toggleDropdown(!1, i, n), this._onClosed && this._onClosed(this, i, s, o._findMenu(i))
    }).catch(() => {})
  }
  _closeOther(t, n) {
    const e = o._findChild(t.parentNode, ["menu-item", "open"]);
    for (let i = 0, s = e.length; i < s; i++) e[i] !== t && this.close(e[i], n)
  }
  toggle(t, n = this._closeChildren) {
    const e = o._getItem(t, !0);
    e.classList.contains("open") ? this.close(e, n) : this.open(e, n)
  }
  _toggleDropdown(t, n, e) {
    const i = o._findMenu(n),
      s = n;
    let a = !1;
    if (t) {
      o._findParent(n, "menu-sub", !1) && (a = !0, n = this._topParent ? this._topParent.parentNode : n);
      const l = Math.round(this._wrapper.getBoundingClientRect().width),
        r = this._innerPosition,
        h = this._getItemOffset(n),
        d = Math.round(n.getBoundingClientRect().width);
      h - 5 <= -1 * r ? this._innerPosition = -1 * h : h + r + d + 5 >= l && (d > l ? this._innerPosition = -1 * h : this._innerPosition = -1 * (h + d - l)), s.classList.add("open");
      const c = Math.round(i.getBoundingClientRect().width);
      a ? h + this._innerPosition + c * 2 > l && c < l && c >= d && (i.style.left = [this._rtl ? "100%" : "-100%"]) : h + this._innerPosition + c > l && c < l && c > d && (i.style[this._rtl ? "marginRight" : "marginLeft"] = `-${c-d}px`), this._closeOther(s, e), this._updateSlider()
    } else {
      const l = o._findChild(n, ["menu-toggle"]);
      if (l.length && l[0].removeAttribute("data-hover", "true"), n.classList.remove("open"), i.style[this._rtl ? "marginRight" : "marginLeft"] = null, e) {
        const r = i.querySelectorAll(".menu-item.open");
        for (let h = 0, d = r.length; h < d; h++) r[h].classList.remove("open")
      }
    }
  }
  _slide(t) {
    const n = Math.round(this._wrapper.getBoundingClientRect().width),
      e = this._innerWidth;
    let i;
    t === "next" ? (i = this._getSlideNextPos(), e + i < n && (i = n - e)) : (i = this._getSlidePrevPos(), i > 0 && (i = 0)), this._innerPosition = i, this.update()
  }
  _getSlideNextPos() {
    const t = Math.round(this._wrapper.getBoundingClientRect().width),
      n = this._innerPosition;
    let e = this._inner.childNodes[0],
      i = 0;
    for (; e;) {
      if (e.tagName) {
        const s = Math.round(e.getBoundingClientRect().width);
        if (i + n - 5 <= t && i + n + s + 5 >= t) {
          s > t && i === -1 * n && (i += s);
          break
        }
        i += s
      }
      e = e.nextSibling
    }
    return -1 * i
  }
  _getSlidePrevPos() {
    const t = Math.round(this._wrapper.getBoundingClientRect().width),
      n = this._innerPosition;
    let e = this._inner.childNodes[0],
      i = 0;
    for (; e;) {
      if (e.tagName) {
        const s = Math.round(e.getBoundingClientRect().width);
        if (i - 5 <= -1 * n && i + s + 5 >= -1 * n) {
          s <= t && (i = i + s - t);
          break
        }
        i += s
      }
      e = e.nextSibling
    }
    return -1 * i
  }
  static _getItem(t, n) {
    let e = null;
    const i = n ? "menu-toggle" : "menu-link";
    if (t.classList.contains("menu-item") ? o._findChild(t, [i]).length && (e = t) : t.classList.contains(i) && (e = t.parentNode.classList.contains("menu-item") ? t.parentNode : null), !e) throw new Error(`${n?"Toggable ":""}\`.menu-item\` element not found.`);
    return e
  }
  static _getLink(t, n) {
    let e = [];
    const i = n ? "menu-toggle" : "menu-link";
    if (t.classList.contains(i) ? e = [t] : t.classList.contains("menu-item") && (e = o._findChild(t, [i])), !e.length) throw new Error(`\`${i}\` element not found.`);
    return e[0]
  }
  _findUnopenedParent(t, n) {
    let e = [],
      i = null;
    for (; t;) t.classList.contains("disabled") ? (i = null, e = []) : (t.classList.contains("open") || (i = t), e.push(t)), t = o._findParent(t, "menu-item", !1);
    if (!i) return null;
    if (e.length === 1) return i;
    e = e.slice(0, e.indexOf(i));
    for (let s = 0, a = e.length; s < a; s++)
      if (e[s].classList.add("open"), this._accordion) {
        const l = o._findChild(e[s].parentNode, ["menu-item", "open"]);
        for (let r = 0, h = l.length; r < h; r++)
          if (l[r] !== e[s] && (l[r].classList.remove("open"), n)) {
            const d = l[r].querySelectorAll(".menu-item.open");
            for (let c = 0, _ = d.length; c < _; c++) d[c].classList.remove("open")
          }
      } return i
  }
  _toggleAnimation(t, n, e) {
    const i = o._getLink(n, !0),
      s = o._findMenu(n);
    o._unbindAnimationEndEvent(n);
    const a = Math.round(i.getBoundingClientRect().height);
    n.style.overflow = "hidden";
    const l = () => {
      n.classList.remove("menu-item-animating"), n.classList.remove("menu-item-closing"), n.style.overflow = null, n.style.height = null, this._horizontal || this.update()
    };
    t ? (n.style.height = `${a}px`, n.classList.add("menu-item-animating"), n.classList.add("open"), o._bindAnimationEndEvent(n, () => {
      l(), this._onOpened(this, n, i, s)
    }), setTimeout(() => {
      n.style.height = `${a+Math.round(s.getBoundingClientRect().height)}px`
    }, 50)) : (n.style.height = `${a+Math.round(s.getBoundingClientRect().height)}px`, n.classList.add("menu-item-animating"), n.classList.add("menu-item-closing"), o._bindAnimationEndEvent(n, () => {
      if (n.classList.remove("open"), l(), e) {
        const r = n.querySelectorAll(".menu-item.open");
        for (let h = 0, d = r.length; h < d; h++) r[h].classList.remove("open")
      }
      this._onClosed(this, n, i, s)
    }), setTimeout(() => {
      n.style.height = `${a}px`
    }, 50))
  }
  static _bindAnimationEndEvent(t, n) {
    const e = s => {
      s.target === t && (o._unbindAnimationEndEvent(t), n(s))
    };
    let i = window.getComputedStyle(t).transitionDuration;
    i = parseFloat(i) * (i.indexOf("ms") !== -1 ? 1 : 1e3), t._menuAnimationEndEventCb = e, m.forEach(s => t.addEventListener(s, t._menuAnimationEndEventCb, !1)), t._menuAnimationEndEventTimeout = setTimeout(() => {
      e({
        target: t
      })
    }, i + 50)
  }
  _getItemOffset(t) {
    let n = this._inner.childNodes[0],
      e = 0;
    for (; n !== t;) n.tagName && (e += Math.round(n.getBoundingClientRect().width)), n = n.nextSibling;
    return e
  }
  _updateSlider(t = null, n = null, e = null) {
    const i = t !== null ? t : Math.round(this._wrapper.getBoundingClientRect().width),
      s = n !== null ? n : this._innerWidth,
      a = e !== null ? e : this._innerPosition;
    s < i || window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ? (this._prevBtn.classList.add("d-none"), this._nextBtn.classList.add("d-none")) : (this._prevBtn.classList.remove("d-none"), this._nextBtn.classList.remove("d-none")), s > i && window.innerWidth > window.Helpers.LAYOUT_BREAKPOINT && (a === 0 ? this._prevBtn.classList.add("disabled") : this._prevBtn.classList.remove("disabled"), s + a <= i ? this._nextBtn.classList.add("disabled") : this._nextBtn.classList.remove("disabled"))
  }
  static _promisify(t, ...n) {
    const e = t(...n);
    return e instanceof Promise ? e : e === !1 ? Promise.reject() : Promise.resolve()
  }
  get _innerWidth() {
    const t = this._inner.childNodes;
    let n = 0;
    for (let e = 0, i = t.length; e < i; e++) t[e].tagName && (n += Math.round(t[e].getBoundingClientRect().width));
    return n
  }
  get _innerPosition() {
    return parseInt(this._inner.style[this._rtl ? "marginRight" : "marginLeft"] || "0px", 10)
  }
  set _innerPosition(t) {
    return this._inner.style[this._rtl ? "marginRight" : "marginLeft"] = `${t}px`, t
  }
  static _unbindAnimationEndEvent(t) {
    const n = t._menuAnimationEndEventCb;
    t._menuAnimationEndEventTimeout && (clearTimeout(t._menuAnimationEndEventTimeout), t._menuAnimationEndEventTimeout = null), n && (m.forEach(e => t.removeEventListener(e, n, !1)), t._menuAnimationEndEventCb = null)
  }
  closeAll(t = this._closeChildren) {
    const n = this._el.querySelectorAll(".menu-inner > .menu-item.open");
    for (let e = 0, i = n.length; e < i; e++) this.close(n[e], t)
  }
  static setDisabled(t, n) {
    o._getItem(t, !1).classList[n ? "add" : "remove"]("disabled")
  }
  static isActive(t) {
    return o._getItem(t, !1).classList.contains("active")
  }
  static isOpened(t) {
    return o._getItem(t, !1).classList.contains("open")
  }
  static isDisabled(t) {
    return o._getItem(t, !1).classList.contains("disabled")
  }
  update() {
    if (!this._horizontal) this._scrollbar && this._scrollbar.update();
    else {
      this.closeAll();
      const t = Math.round(this._wrapper.getBoundingClientRect().width),
        n = this._innerWidth;
      let e = this._innerPosition;
      t - e > n && (e = t - n, e > 0 && (e = 0), this._innerPosition = e), this._updateSlider(t, n, e)
    }
  }
  manageScroll() {
    const {
      PerfectScrollbar: t
    } = window, n = document.querySelector(".menu-inner");
    if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) this._scrollbar !== null && (this._scrollbar.destroy(), this._scrollbar = null), n.classList.add("overflow-auto");
    else {
      if (this._scrollbar === null) {
        const e = new t(document.querySelector(".menu-inner"), {
          suppressScrollX: !0,
          wheelPropagation: !1
        });
        this._scrollbar = e
      }
      n.classList.remove("overflow-auto")
    }
  }
  switchMenu(t) {
    this._unbindEvents();
    const n = document.querySelector("nav.layout-navbar"),
      e = document.querySelector("#navbar-collapse"),
      i = document.querySelector("#layout-menu div"),
      s = document.querySelector("#layout-menu"),
      a = ["layout-menu-horizontal", "menu", "menu-horizontal", "container-fluid", "flex-grow-0"],
      l = ["layout-menu", "menu", "menu-vertical"],
      r = document.querySelector(".menu-horizontal-wrapper"),
      h = document.querySelector(".menu-inner"),
      d = document.querySelector(".app-brand"),
      c = document.querySelector(".layout-menu-toggle"),
      _ = document.querySelectorAll(".menu-inner .active");
    if (t === "vertical") {
      this._horizontal = !1, i.insertBefore(d, r), i.insertBefore(h, r), i.classList.add("flex-column", "p-0"), s.classList.remove(...s.classList), s.classList.add(...l, this._menuBgClass), d.classList.remove("d-none", "d-lg-flex"), c.classList.remove("d-none"), h.classList.add("overflow-auto");
      for (let u = 0; u < _.length - 1; ++u) _[u].classList.add("open")
    } else {
      this._horizontal = !0, n.children[0].insertBefore(d, e), d.classList.add("d-none", "d-lg-flex"), r.appendChild(h), i.classList.remove("flex-column", "p-0"), s.classList.remove(...s.classList), s.classList.add(...a, this._menuBgClass), c.classList.add("d-none"), h.classList.remove("overflow-auto");
      for (let u = 0; u < _.length; ++u) _[u].classList.remove("open")
    }
    this._bindEvents()
  }
  destroy() {
    if (!this._el) return;
    this._unbindEvents();
    const t = this._el.querySelectorAll(".menu-item");
    for (let e = 0, i = t.length; e < i; e++) o._unbindAnimationEndEvent(t[e]), t[e].classList.remove("menu-item-animating"), t[e].classList.remove("open"), t[e].style.overflow = null, t[e].style.height = null;
    const n = this._el.querySelectorAll(".menu-menu");
    for (let e = 0, i = n.length; e < i; e++) n[e].style.marginRight = null, n[e].style.marginLeft = null;
    this._el.classList.remove("menu-no-animation"), this._wrapper && (this._prevBtn.parentNode.removeChild(this._prevBtn), this._nextBtn.parentNode.removeChild(this._nextBtn), this._wrapper.parentNode.insertBefore(this._inner, this._wrapper), this._wrapper.parentNode.removeChild(this._wrapper), this._inner.style.marginLeft = null, this._inner.style.marginRight = null), this._el.menuInstance = null, delete this._el.menuInstance, this._el = null, this._horizontal = null, this._animate = null, this._accordion = null, this._showDropdownOnHover = null, this._closeChildren = null, this._rtl = null, this._onOpen = null, this._onOpened = null, this._onClose = null, this._onClosed = null, this._scrollbar && (this._scrollbar.destroy(), this._scrollbar = null), this._inner = null, this._prevBtn = null, this._wrapper = null, this._nextBtn = null
  }
}
window.Menu = o;