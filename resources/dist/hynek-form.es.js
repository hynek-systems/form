window.Hynek ??= {};
window.Hynek.FormStatus = class {
  constructor(e) {
    this.form = e, this.fields = {}, this.submitting = !1, this.submitted = !1, this.listeners = {}, this.init();
  }
  // === Event system ===
  on(e, t) {
    this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t);
  }
  emit(e, t) {
    this.listeners[e] && this.listeners[e].forEach((n) => n(t));
  }
  // === Setup ===
  init() {
    this.form.querySelectorAll("input, textarea, select").forEach((t) => {
      this.fields[t.name] = {
        el: t,
        touched: !1,
        dirty: !1,
        valid: t.checkValidity(),
        initialValue: t.value
      }, t.addEventListener("blur", () => {
        const n = this.fields[t.name];
        n.touched || (n.touched = !0, this.emit("field:touched", { name: t.name, field: n }));
      }), t.addEventListener("input", () => {
        const n = this.fields[t.name], r = n.dirty, s = n.valid;
        n.dirty = t.value !== n.initialValue, n.valid = t.checkValidity(), n.dirty && !r && this.emit("field:dirty", { name: t.name, field: n }), n.valid !== s && this.emit("field:validate", { name: t.name, field: n });
      });
    }), this.form.addEventListener("submit", (t) => {
      this.submitting = !0, this.emit("form:submit:start", this.status), Object.values(this.fields).forEach((n) => {
        n.touched = !0, n.valid = n.el.checkValidity();
      }), this.form.checkValidity() ? (this.submitted = !0, this.emit("form:submit:success", this.status), setTimeout(() => {
        this.submitting = !1, this.emit("form:submit:end", this.status);
      }, 500)) : (t.preventDefault(), this.submitting = !1, this.emit("form:submit:invalid", this.status));
    });
  }
  // === Public API ===
  get status() {
    return {
      submitting: this.submitting,
      submitted: this.submitted,
      valid: this.form.checkValidity(),
      invalid: !this.form.checkValidity(),
      fields: this.fields
    };
  }
};
window.Hynek.AjaxSubmission = class {
  constructor(e, t = {}) {
    this.form = e, this.options = t, this.formState = new Hynek.FormStatus(e), this.init();
  }
  // === Setup ===
  init() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await this.submit();
      } catch (t) {
        console.error(t.message ?? t);
      }
    });
  }
  async submit() {
    const e = new FormData(), t = this.form.querySelectorAll("input, textarea, select");
    this.formState.emit("form:submit:start", { formData: e, inputs: t }), t.forEach((s) => {
      e.append(s.name, s.value);
    });
    const n = await fetch(this.form.action, {
      method: this.form.method.toUpperCase(),
      body: e
    });
    if (!n.ok)
      throw this.formState.emit("form:submit:error", n), new Error(n.error);
    const r = n.json();
    this.options.handleResponse?.(r), this.formState.emit("form:submit:end", r);
  }
};
/*!
 * FilePond 4.32.9
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
const Er = (e) => e instanceof HTMLElement, pr = (e, t = [], n = []) => {
  const r = {
    ...e
  }, s = [], o = [], i = () => ({ ...r }), a = () => {
    const u = [...s];
    return s.length = 0, u;
  }, l = () => {
    const u = [...o];
    o.length = 0, u.forEach(({ type: _, data: D }) => {
      d(_, D);
    });
  }, d = (u, _, D) => {
    if (D && !document.hidden) {
      o.push({ type: u, data: _ });
      return;
    }
    T[u] && T[u](_), s.push({
      type: u,
      data: _
    });
  }, c = (u, ..._) => E[u] ? E[u](..._) : null, f = {
    getState: i,
    processActionQueue: a,
    processDispatchQueue: l,
    dispatch: d,
    query: c
  };
  let E = {};
  t.forEach((u) => {
    E = {
      ...u(r),
      ...E
    };
  });
  let T = {};
  return n.forEach((u) => {
    T = {
      ...u(d, c, r),
      ...T
    };
  }), f;
}, Ir = (e, t, n) => {
  if (typeof n == "function") {
    e[t] = n;
    return;
  }
  Object.defineProperty(e, t, { ...n });
}, V = (e, t) => {
  for (const n in e)
    e.hasOwnProperty(n) && t(n, e[n]);
}, fe = (e) => {
  const t = {};
  return V(e, (n) => {
    Ir(t, n, e[n]);
  }), t;
}, W = (e, t, n = null) => {
  if (n === null)
    return e.getAttribute(t) || e.hasAttribute(t);
  e.setAttribute(t, n);
}, _r = "http://www.w3.org/2000/svg", Tr = ["svg", "path"], Ft = (e) => Tr.includes(e), $e = (e, t, n = {}) => {
  typeof t == "object" && (n = t, t = null);
  const r = Ft(e) ? document.createElementNS(_r, e) : document.createElement(e);
  return t && (Ft(e) ? W(r, "class", t) : r.className = t), V(n, (s, o) => {
    W(r, s, o);
  }), r;
}, mr = (e) => (t, n) => {
  typeof n < "u" && e.children[n] ? e.insertBefore(t, e.children[n]) : e.appendChild(t);
}, gr = (e, t) => (n, r) => (typeof r < "u" ? t.splice(r, 0, n) : t.push(n), n), Rr = (e, t) => (n) => (t.splice(t.indexOf(n), 1), n.element.parentNode && e.removeChild(n.element), n), hr = typeof window < "u" && typeof window.document < "u", On = () => hr, Or = On() ? $e("svg") : {}, Dr = "children" in Or ? (e) => e.children.length : (e) => e.childNodes.length, Dn = (e, t, n, r) => {
  const s = n[0] || e.left, o = n[1] || e.top, i = s + e.width, a = o + e.height * (r[1] || 1), l = {
    // the rectangle of the element itself
    element: {
      ...e
    },
    // the rectangle of the element expanded to contain its children, does not include any margins
    inner: {
      left: e.left,
      top: e.top,
      right: e.right,
      bottom: e.bottom
    },
    // the rectangle of the element expanded to contain its children including own margin and child margins
    // margins will be added after we've recalculated the size
    outer: {
      left: s,
      top: o,
      right: i,
      bottom: a
    }
  };
  return t.filter((d) => !d.isRectIgnored()).map((d) => d.rect).forEach((d) => {
    Ut(l.inner, { ...d.inner }), Ut(l.outer, { ...d.outer });
  }), Bt(l.inner), l.outer.bottom += l.element.marginBottom, l.outer.right += l.element.marginRight, Bt(l.outer), l;
}, Ut = (e, t) => {
  t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right);
}, Bt = (e) => {
  e.width = e.right - e.left, e.height = e.bottom - e.top;
}, Ee = (e) => typeof e == "number", Sr = (e, t, n, r = 1e-3) => Math.abs(e - t) < r && Math.abs(n) < r, Ar = (
  // default options
  ({ stiffness: e = 0.5, damping: t = 0.75, mass: n = 10 } = {}) => {
    let r = null, s = null, o = 0, i = !1;
    const d = fe({
      interpolate: (c, f) => {
        if (i) return;
        if (!(Ee(r) && Ee(s))) {
          i = !0, o = 0;
          return;
        }
        const E = -(s - r) * e;
        o += E / n, s += o, o *= t, Sr(s, r, o) || f ? (s = r, o = 0, i = !0, d.onupdate(s), d.oncomplete(s)) : d.onupdate(s);
      },
      target: {
        set: (c) => {
          if (Ee(c) && !Ee(s) && (s = c), r === null && (r = c, s = c), r = c, s === r || typeof r > "u") {
            i = !0, o = 0, d.onupdate(s), d.oncomplete(s);
            return;
          }
          i = !1;
        },
        get: () => r
      },
      resting: {
        get: () => i
      },
      onupdate: (c) => {
      },
      oncomplete: (c) => {
      }
    });
    return d;
  }
), yr = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, Lr = (
  // default values
  ({ duration: e = 500, easing: t = yr, delay: n = 0 } = {}) => {
    let r = null, s, o, i = !0, a = !1, l = null;
    const c = fe({
      interpolate: (f, E) => {
        i || l === null || (r === null && (r = f), !(f - r < n) && (s = f - r - n, s >= e || E ? (s = 1, o = a ? 0 : 1, c.onupdate(o * l), c.oncomplete(o * l), i = !0) : (o = s / e, c.onupdate((s >= 0 ? t(a ? 1 - o : o) : 0) * l))));
      },
      target: {
        get: () => a ? 0 : l,
        set: (f) => {
          if (l === null) {
            l = f, c.onupdate(f), c.oncomplete(f);
            return;
          }
          f < l ? (l = 1, a = !0) : (a = !1, l = f), i = !1, r = null;
        }
      },
      resting: {
        get: () => i
      },
      onupdate: (f) => {
      },
      oncomplete: (f) => {
      }
    });
    return c;
  }
), Vt = {
  spring: Ar,
  tween: Lr
}, Pr = (e, t, n) => {
  const r = e[t] && typeof e[t][n] == "object" ? e[t][n] : e[t] || e, s = typeof r == "string" ? r : r.type, o = typeof r == "object" ? { ...r } : {};
  return Vt[s] ? Vt[s](o) : null;
}, Ot = (e, t, n, r = !1) => {
  t = Array.isArray(t) ? t : [t], t.forEach((s) => {
    e.forEach((o) => {
      let i = o, a = () => n[o], l = (d) => n[o] = d;
      typeof o == "object" && (i = o.key, a = o.getter || a, l = o.setter || l), !(s[i] && !r) && (s[i] = {
        get: a,
        set: l
      });
    });
  });
}, br = ({ mixinConfig: e, viewProps: t, viewInternalAPI: n, viewExternalAPI: r }) => {
  const s = { ...t }, o = [];
  return V(e, (i, a) => {
    const l = Pr(a);
    if (!l)
      return;
    l.onupdate = (c) => {
      t[i] = c;
    }, l.target = s[i], Ot([{
      key: i,
      setter: (c) => {
        l.target !== c && (l.target = c);
      },
      getter: () => t[i]
    }], [n, r], t, !0), o.push(l);
  }), {
    write: (i) => {
      let a = document.hidden, l = !0;
      return o.forEach((d) => {
        d.resting || (l = !1), d.interpolate(i, a);
      }), l;
    },
    destroy: () => {
    }
  };
}, Mr = (e) => (t, n) => {
  e.addEventListener(t, n);
}, Cr = (e) => (t, n) => {
  e.removeEventListener(t, n);
}, Nr = ({
  mixinConfig: e,
  viewProps: t,
  viewInternalAPI: n,
  viewExternalAPI: r,
  viewState: s,
  view: o
}) => {
  const i = [], a = Mr(o.element), l = Cr(o.element);
  return r.on = (d, c) => {
    i.push({
      type: d,
      fn: c
    }), a(d, c);
  }, r.off = (d, c) => {
    i.splice(i.findIndex((f) => f.type === d && f.fn === c), 1), l(d, c);
  }, {
    write: () => !0,
    destroy: () => {
      i.forEach((d) => {
        l(d.type, d.fn);
      });
    }
  };
}, vr = ({ mixinConfig: e, viewProps: t, viewExternalAPI: n }) => {
  Ot(e, n, t);
}, j = (e) => e != null, wr = {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  originX: 0,
  originY: 0
}, Gr = ({ mixinConfig: e, viewProps: t, viewInternalAPI: n, viewExternalAPI: r, view: s }) => {
  const o = { ...t }, i = {};
  Ot(e, [n, r], t);
  const a = () => [t.translateX || 0, t.translateY || 0], l = () => [t.scaleX || 0, t.scaleY || 0], d = () => s.rect ? Dn(s.rect, s.childViews, a(), l()) : null;
  return n.rect = { get: d }, r.rect = { get: d }, e.forEach((c) => {
    t[c] = typeof o[c] > "u" ? wr[c] : o[c];
  }), {
    write: () => {
      if (Fr(i, t))
        return Ur(s.element, t), Object.assign(i, { ...t }), !0;
    },
    destroy: () => {
    }
  };
}, Fr = (e, t) => {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !0;
  for (const n in t)
    if (t[n] !== e[n])
      return !0;
  return !1;
}, Ur = (e, {
  opacity: t,
  perspective: n,
  translateX: r,
  translateY: s,
  scaleX: o,
  scaleY: i,
  rotateX: a,
  rotateY: l,
  rotateZ: d,
  originX: c,
  originY: f,
  width: E,
  height: T
}) => {
  let u = "", _ = "";
  (j(c) || j(f)) && (_ += `transform-origin: ${c || 0}px ${f || 0}px;`), j(n) && (u += `perspective(${n}px) `), (j(r) || j(s)) && (u += `translate3d(${r || 0}px, ${s || 0}px, 0) `), (j(o) || j(i)) && (u += `scale3d(${j(o) ? o : 1}, ${j(i) ? i : 1}, 1) `), j(d) && (u += `rotateZ(${d}rad) `), j(a) && (u += `rotateX(${a}rad) `), j(l) && (u += `rotateY(${l}rad) `), u.length && (_ += `transform:${u};`), j(t) && (_ += `opacity:${t};`, t === 0 && (_ += "visibility:hidden;"), t < 1 && (_ += "pointer-events:none;")), j(T) && (_ += `height:${T}px;`), j(E) && (_ += `width:${E}px;`);
  const D = e.elementCurrentStyle || "";
  (_.length !== D.length || _ !== D) && (e.style.cssText = _, e.elementCurrentStyle = _);
}, Br = {
  styles: Gr,
  listeners: Nr,
  animations: br,
  apis: vr
}, qt = (e = {}, t = {}, n = {}) => (t.layoutCalculated || (e.paddingTop = parseInt(n.paddingTop, 10) || 0, e.marginTop = parseInt(n.marginTop, 10) || 0, e.marginRight = parseInt(n.marginRight, 10) || 0, e.marginBottom = parseInt(n.marginBottom, 10) || 0, e.marginLeft = parseInt(n.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = t.offsetParent === null, e), H = (
  // default view definition
  ({
    // element definition
    tag: e = "div",
    name: t = null,
    attributes: n = {},
    // view interaction
    read: r = () => {
    },
    write: s = () => {
    },
    create: o = () => {
    },
    destroy: i = () => {
    },
    // hooks
    filterFrameActionsForChild: a = (T, u) => u,
    didCreateView: l = () => {
    },
    didWriteView: d = () => {
    },
    // rect related
    ignoreRect: c = !1,
    ignoreRectUpdate: f = !1,
    // mixins
    mixins: E = []
  } = {}) => (T, u = {}) => {
    const _ = $e(e, `filepond--${t}`, n), D = window.getComputedStyle(_, null), R = qt();
    let O = null, L = !1;
    const P = [], S = [], N = {}, B = {}, h = [
      s
      // default writer
    ], M = [
      r
      // default reader
    ], F = [
      i
      // default destroy
    ], A = () => _, v = () => P.concat(), X = () => N, m = (G) => (k, le) => k(G, le), U = () => O || (O = Dn(R, P, [0, 0], [1, 1]), O), I = () => D, g = () => {
      O = null, P.forEach((le) => le._read()), !(f && R.width && R.height) && qt(R, _, D);
      const k = { root: de, props: u, rect: R };
      M.forEach((le) => le(k));
    }, y = (G, k, le) => {
      let Oe = k.length === 0;
      return h.forEach((Z) => {
        Z({
          props: u,
          root: de,
          actions: k,
          timestamp: G,
          shouldOptimize: le
        }) === !1 && (Oe = !1);
      }), S.forEach((Z) => {
        Z.write(G) === !1 && (Oe = !1);
      }), P.filter((Z) => !!Z.element.parentNode).forEach((Z) => {
        Z._write(
          G,
          a(Z, k),
          le
        ) || (Oe = !1);
      }), P.forEach((Z, we) => {
        Z.element.parentNode || (de.appendChild(Z.element, we), Z._read(), Z._write(
          G,
          a(Z, k),
          le
        ), Oe = !1);
      }), L = Oe, d({
        props: u,
        root: de,
        actions: k,
        timestamp: G
      }), Oe;
    }, b = () => {
      S.forEach((G) => G.destroy()), F.forEach((G) => {
        G({ root: de, props: u });
      }), P.forEach((G) => G._destroy());
    }, Y = {
      element: {
        get: A
      },
      style: {
        get: I
      },
      childViews: {
        get: v
      }
    }, w = {
      ...Y,
      rect: {
        get: U
      },
      // access to custom children references
      ref: {
        get: X
      },
      // dom modifiers
      is: (G) => t === G,
      appendChild: mr(_),
      createChildView: m(T),
      linkView: (G) => (P.push(G), G),
      unlinkView: (G) => {
        P.splice(P.indexOf(G), 1);
      },
      appendChildView: gr(_, P),
      removeChildView: Rr(_, P),
      registerWriter: (G) => h.push(G),
      registerReader: (G) => M.push(G),
      registerDestroyer: (G) => F.push(G),
      invalidateLayout: () => _.layoutCalculated = !1,
      // access to data store
      dispatch: T.dispatch,
      query: T.query
    }, ve = {
      element: {
        get: A
      },
      childViews: {
        get: v
      },
      rect: {
        get: U
      },
      resting: {
        get: () => L
      },
      isRectIgnored: () => c,
      _read: g,
      _write: y,
      _destroy: b
    }, Gt = {
      ...Y,
      rect: {
        get: () => R
      }
    };
    Object.keys(E).sort((G, k) => G === "styles" ? 1 : k === "styles" ? -1 : 0).forEach((G) => {
      const k = Br[G]({
        mixinConfig: E[G],
        viewProps: u,
        viewState: B,
        viewInternalAPI: w,
        viewExternalAPI: ve,
        view: fe(Gt)
      });
      k && S.push(k);
    });
    const de = fe(w);
    o({
      root: de,
      props: u
    });
    const fr = Dr(_);
    return P.forEach((G, k) => {
      de.appendChild(G.element, fr + k);
    }), l(de), fe(ve);
  }
), Vr = (e, t, n = 60) => {
  const r = "__framePainter";
  if (window[r]) {
    window[r].readers.push(e), window[r].writers.push(t);
    return;
  }
  window[r] = {
    readers: [e],
    writers: [t]
  };
  const s = window[r], o = 1e3 / n;
  let i = null, a = null, l = null, d = null;
  const c = () => {
    document.hidden ? (l = () => window.setTimeout(() => f(performance.now()), o), d = () => window.clearTimeout(a)) : (l = () => window.requestAnimationFrame(f), d = () => window.cancelAnimationFrame(a));
  };
  document.addEventListener("visibilitychange", () => {
    d && d(), c(), f(performance.now());
  });
  const f = (E) => {
    a = l(f), i || (i = E);
    const T = E - i;
    T <= o || (i = E - T % o, s.readers.forEach((u) => u()), s.writers.forEach((u) => u(E)));
  };
  return c(), f(performance.now()), {
    pause: () => {
      d(a);
    }
  };
}, K = (e, t) => ({ root: n, props: r, actions: s = [], timestamp: o, shouldOptimize: i }) => {
  s.filter((a) => e[a.type]).forEach(
    (a) => e[a.type]({ root: n, props: r, action: a.data, timestamp: o, shouldOptimize: i })
  ), t && t({ root: n, props: r, actions: s, timestamp: o, shouldOptimize: i });
}, xt = (e, t) => t.parentNode.insertBefore(e, t), Ht = (e, t) => t.parentNode.insertBefore(e, t.nextSibling), ke = (e) => Array.isArray(e), ae = (e) => e == null, qr = (e) => e.trim(), je = (e) => "" + e, xr = (e, t = ",") => ae(e) ? [] : ke(e) ? e : je(e).split(t).map(qr).filter((n) => n.length), Sn = (e) => typeof e == "boolean", An = (e) => Sn(e) ? e : e === "true", Q = (e) => typeof e == "string", yn = (e) => Ee(e) ? e : Q(e) ? je(e).replace(/[a-z]+/gi, "") : 0, xe = (e) => parseInt(yn(e), 10), Yt = (e) => parseFloat(yn(e)), Le = (e) => Ee(e) && isFinite(e) && Math.floor(e) === e, $t = (e, t = 1e3) => {
  if (Le(e))
    return e;
  let n = je(e).trim();
  return /MB$/i.test(n) ? (n = n.replace(/MB$i/, "").trim(), xe(n) * t * t) : /KB/i.test(n) ? (n = n.replace(/KB$i/, "").trim(), xe(n) * t) : xe(n);
}, pe = (e) => typeof e == "function", Hr = (e) => {
  let t = self, n = e.split("."), r = null;
  for (; r = n.shift(); )
    if (t = t[r], !t)
      return null;
  return t;
}, Wt = {
  process: "POST",
  patch: "PATCH",
  revert: "DELETE",
  fetch: "GET",
  restore: "GET",
  load: "GET"
}, Yr = (e) => {
  const t = {};
  return t.url = Q(e) ? e : e.url || "", t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0, t.headers = e.headers ? e.headers : {}, V(Wt, (n) => {
    t[n] = $r(n, e[n], Wt[n], t.timeout, t.headers);
  }), t.process = e.process || Q(e) || e.url ? t.process : null, t.remove = e.remove || null, delete t.headers, t;
}, $r = (e, t, n, r, s) => {
  if (t === null)
    return null;
  if (typeof t == "function")
    return t;
  const o = {
    url: n === "GET" || n === "PATCH" ? `?${e}=` : "",
    method: n,
    headers: s,
    withCredentials: !1,
    timeout: r,
    onload: null,
    ondata: null,
    onerror: null
  };
  if (Q(t))
    return o.url = t, o;
  if (Object.assign(o, t), Q(o.headers)) {
    const i = o.headers.split(/:(.+)/);
    o.headers = {
      header: i[0],
      value: i[1]
    };
  }
  return o.withCredentials = An(o.withCredentials), o;
}, Wr = (e) => Yr(e), zr = (e) => e === null, z = (e) => typeof e == "object" && e !== null, Xr = (e) => z(e) && Q(e.url) && z(e.process) && z(e.revert) && z(e.restore) && z(e.fetch), lt = (e) => ke(e) ? "array" : zr(e) ? "null" : Le(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : Xr(e) ? "api" : typeof e, kr = (e) => e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'), jr = {
  array: xr,
  boolean: An,
  int: (e) => lt(e) === "bytes" ? $t(e) : xe(e),
  number: Yt,
  float: Yt,
  bytes: $t,
  string: (e) => pe(e) ? e : je(e),
  function: (e) => Hr(e),
  serverapi: Wr,
  object: (e) => {
    try {
      return JSON.parse(kr(e));
    } catch {
      return null;
    }
  }
}, Qr = (e, t) => jr[t](e), Ln = (e, t, n) => {
  if (e === t)
    return e;
  let r = lt(e);
  if (r !== n) {
    const s = Qr(e, n);
    if (r = lt(s), s === null)
      throw `Trying to assign value with incorrect type to "${option}", allowed type: "${n}"`;
    e = s;
  }
  return e;
}, Kr = (e, t) => {
  let n = e;
  return {
    enumerable: !0,
    get: () => n,
    set: (r) => {
      n = Ln(r, e, t);
    }
  };
}, Zr = (e) => {
  const t = {};
  return V(e, (n) => {
    const r = e[n];
    t[n] = Kr(r[0], r[1]);
  }), fe(t);
}, Jr = (e) => ({
  // model
  items: [],
  // timeout used for calling update items
  listUpdateTimeout: null,
  // timeout used for stacking metadata updates
  itemUpdateTimeout: null,
  // queue of items waiting to be processed
  processingQueue: [],
  // options
  options: Zr(e)
}), Qe = (e, t = "-") => e.split(/(?=[A-Z])/).map((n) => n.toLowerCase()).join(t), es = (e, t) => {
  const n = {};
  return V(t, (r) => {
    n[r] = {
      get: () => e.getState().options[r],
      set: (s) => {
        e.dispatch(`SET_${Qe(r, "_").toUpperCase()}`, {
          value: s
        });
      }
    };
  }), n;
}, ts = (e) => (t, n, r) => {
  const s = {};
  return V(e, (o) => {
    const i = Qe(o, "_").toUpperCase();
    s[`SET_${i}`] = (a) => {
      try {
        r.options[o] = a.value;
      } catch {
      }
      t(`DID_SET_${i}`, { value: r.options[o] });
    };
  }), s;
}, ns = (e) => (t) => {
  const n = {};
  return V(e, (r) => {
    n[`GET_${Qe(r, "_").toUpperCase()}`] = (s) => t.options[r];
  }), n;
}, re = {
  API: 1,
  DROP: 2,
  BROWSE: 3,
  PASTE: 4,
  NONE: 5
}, Dt = () => Math.random().toString(36).substring(2, 11), St = (e, t) => e.splice(t, 1), rs = (e, t) => {
  t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
}, Ke = () => {
  const e = [], t = (r, s) => {
    St(
      e,
      e.findIndex((o) => o.event === r && (o.cb === s || !s))
    );
  }, n = (r, s, o) => {
    e.filter((i) => i.event === r).map((i) => i.cb).forEach((i) => rs(() => i(...s), o));
  };
  return {
    fireSync: (r, ...s) => {
      n(r, s, !0);
    },
    fire: (r, ...s) => {
      n(r, s, !1);
    },
    on: (r, s) => {
      e.push({ event: r, cb: s });
    },
    onOnce: (r, s) => {
      e.push({
        event: r,
        cb: (...o) => {
          t(r, s), s(...o);
        }
      });
    },
    off: t
  };
}, Pn = (e, t, n) => {
  Object.getOwnPropertyNames(e).filter((r) => !n.includes(r)).forEach(
    (r) => Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
  );
}, ss = [
  "fire",
  "process",
  "revert",
  "load",
  "on",
  "off",
  "onOnce",
  "retryLoad",
  "extend",
  "archive",
  "archived",
  "release",
  "released",
  "requestProcessing",
  "freeze"
], J = (e) => {
  const t = {};
  return Pn(e, t, ss), t;
}, is = (e) => {
  e.forEach((t, n) => {
    t.released && St(e, n);
  });
}, C = {
  INIT: 1,
  IDLE: 2,
  PROCESSING_QUEUED: 9,
  PROCESSING: 3,
  PROCESSING_COMPLETE: 5,
  PROCESSING_ERROR: 6,
  PROCESSING_REVERT_ERROR: 10,
  LOADING: 7,
  LOAD_ERROR: 8
}, $ = {
  INPUT: 1,
  LIMBO: 2,
  LOCAL: 3
}, bn = (e) => /[^0-9]+/.exec(e), Mn = () => bn(1.1.toLocaleString())[0], os = () => {
  const e = Mn(), t = 1e3.toLocaleString();
  return t !== "1000" ? bn(t)[0] : e === "." ? "," : ".";
}, p = {
  BOOLEAN: "boolean",
  INT: "int",
  NUMBER: "number",
  STRING: "string",
  ARRAY: "array",
  OBJECT: "object",
  FUNCTION: "function",
  ACTION: "action",
  SERVER_API: "serverapi",
  REGEX: "regex"
}, At = [], se = (e, t, n) => new Promise((r, s) => {
  const o = At.filter((a) => a.key === e).map((a) => a.cb);
  if (o.length === 0) {
    r(t);
    return;
  }
  const i = o.shift();
  o.reduce(
    // loop over promises passing value to next promise
    (a, l) => a.then((d) => l(d, n)),
    // call initial filter, will return a promise
    i(t, n)
    // all executed
  ).then((a) => r(a)).catch((a) => s(a));
}), Re = (e, t, n) => At.filter((r) => r.key === e).map((r) => r.cb(t, n)), ls = (e, t) => At.push({ key: e, cb: t }), as = (e) => Object.assign(De, e), We = () => ({ ...De }), cs = (e) => {
  V(e, (t, n) => {
    De[t] && (De[t][0] = Ln(
      n,
      De[t][0],
      De[t][1]
    ));
  });
}, De = {
  // the id to add to the root element
  id: [null, p.STRING],
  // input field name to use
  name: ["filepond", p.STRING],
  // disable the field
  disabled: [!1, p.BOOLEAN],
  // classname to put on wrapper
  className: [null, p.STRING],
  // is the field required
  required: [!1, p.BOOLEAN],
  // Allow media capture when value is set
  captureMethod: [null, p.STRING],
  // - "camera", "microphone" or "camcorder",
  // - Does not work with multiple on apple devices
  // - If set, acceptedFileTypes must be made to match with media wildcard "image/*", "audio/*" or "video/*"
  // sync `acceptedFileTypes` property with `accept` attribute
  allowSyncAcceptAttribute: [!0, p.BOOLEAN],
  // Feature toggles
  allowDrop: [!0, p.BOOLEAN],
  // Allow dropping of files
  allowBrowse: [!0, p.BOOLEAN],
  // Allow browsing the file system
  allowPaste: [!0, p.BOOLEAN],
  // Allow pasting files
  allowMultiple: [!1, p.BOOLEAN],
  // Allow multiple files (disabled by default, as multiple attribute is also required on input to allow multiple)
  allowReplace: [!0, p.BOOLEAN],
  // Allow dropping a file on other file to replace it (only works when multiple is set to false)
  allowRevert: [!0, p.BOOLEAN],
  // Allows user to revert file upload
  allowRemove: [!0, p.BOOLEAN],
  // Allow user to remove a file
  allowProcess: [!0, p.BOOLEAN],
  // Allows user to process a file, when set to false, this removes the file upload button
  allowReorder: [!1, p.BOOLEAN],
  // Allow reordering of files
  allowDirectoriesOnly: [!1, p.BOOLEAN],
  // Allow only selecting directories with browse (no support for filtering dnd at this point)
  // Try store file if `server` not set
  storeAsFile: [!1, p.BOOLEAN],
  // Revert mode
  forceRevert: [!1, p.BOOLEAN],
  // Set to 'force' to require the file to be reverted before removal
  // Input requirements
  maxFiles: [null, p.INT],
  // Max number of files
  checkValidity: [!1, p.BOOLEAN],
  // Enables custom validity messages
  // Where to put file
  itemInsertLocationFreedom: [!0, p.BOOLEAN],
  // Set to false to always add items to begin or end of list
  itemInsertLocation: ["before", p.STRING],
  // Default index in list to add items that have been dropped at the top of the list
  itemInsertInterval: [75, p.INT],
  // Drag 'n Drop related
  dropOnPage: [!1, p.BOOLEAN],
  // Allow dropping of files anywhere on page (prevents browser from opening file if dropped outside of Up)
  dropOnElement: [!0, p.BOOLEAN],
  // Drop needs to happen on element (set to false to also load drops outside of Up)
  dropValidation: [!1, p.BOOLEAN],
  // Enable or disable validating files on drop
  ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], p.ARRAY],
  // Upload related
  instantUpload: [!0, p.BOOLEAN],
  // Should upload files immediately on drop
  maxParallelUploads: [2, p.INT],
  // Maximum files to upload in parallel
  allowMinimumUploadDuration: [!0, p.BOOLEAN],
  // if true uploads take at least 750 ms, this ensures the user sees the upload progress giving trust the upload actually happened
  // Chunks
  chunkUploads: [!1, p.BOOLEAN],
  // Enable chunked uploads
  chunkForce: [!1, p.BOOLEAN],
  // Force use of chunk uploads even for files smaller than chunk size
  chunkSize: [5e6, p.INT],
  // Size of chunks (5MB default)
  chunkRetryDelays: [[500, 1e3, 3e3], p.ARRAY],
  // Amount of times to retry upload of a chunk when it fails
  // The server api end points to use for uploading (see docs)
  server: [null, p.SERVER_API],
  // File size calculations, can set to 1024, this is only used for display, properties use file size base 1000
  fileSizeBase: [1e3, p.INT],
  // Labels and status messages
  labelFileSizeBytes: ["bytes", p.STRING],
  labelFileSizeKilobytes: ["KB", p.STRING],
  labelFileSizeMegabytes: ["MB", p.STRING],
  labelFileSizeGigabytes: ["GB", p.STRING],
  labelDecimalSeparator: [Mn(), p.STRING],
  // Default is locale separator
  labelThousandsSeparator: [os(), p.STRING],
  // Default is locale separator
  labelIdle: [
    'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    p.STRING
  ],
  labelInvalidField: ["Field contains invalid files", p.STRING],
  labelFileWaitingForSize: ["Waiting for size", p.STRING],
  labelFileSizeNotAvailable: ["Size not available", p.STRING],
  labelFileCountSingular: ["file in list", p.STRING],
  labelFileCountPlural: ["files in list", p.STRING],
  labelFileLoading: ["Loading", p.STRING],
  labelFileAdded: ["Added", p.STRING],
  // assistive only
  labelFileLoadError: ["Error during load", p.STRING],
  labelFileRemoved: ["Removed", p.STRING],
  // assistive only
  labelFileRemoveError: ["Error during remove", p.STRING],
  labelFileProcessing: ["Uploading", p.STRING],
  labelFileProcessingComplete: ["Upload complete", p.STRING],
  labelFileProcessingAborted: ["Upload cancelled", p.STRING],
  labelFileProcessingError: ["Error during upload", p.STRING],
  labelFileProcessingRevertError: ["Error during revert", p.STRING],
  labelTapToCancel: ["tap to cancel", p.STRING],
  labelTapToRetry: ["tap to retry", p.STRING],
  labelTapToUndo: ["tap to undo", p.STRING],
  labelButtonRemoveItem: ["Remove", p.STRING],
  labelButtonAbortItemLoad: ["Abort", p.STRING],
  labelButtonRetryItemLoad: ["Retry", p.STRING],
  labelButtonAbortItemProcessing: ["Cancel", p.STRING],
  labelButtonUndoItemProcessing: ["Undo", p.STRING],
  labelButtonRetryItemProcessing: ["Retry", p.STRING],
  labelButtonProcessItem: ["Upload", p.STRING],
  // make sure width and height plus viewpox are even numbers so icons are nicely centered
  iconRemove: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
    p.STRING
  ],
  iconProcess: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
    p.STRING
  ],
  iconRetry: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
    p.STRING
  ],
  iconUndo: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
    p.STRING
  ],
  iconDone: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
    p.STRING
  ],
  // event handlers
  oninit: [null, p.FUNCTION],
  onwarning: [null, p.FUNCTION],
  onerror: [null, p.FUNCTION],
  onactivatefile: [null, p.FUNCTION],
  oninitfile: [null, p.FUNCTION],
  onaddfilestart: [null, p.FUNCTION],
  onaddfileprogress: [null, p.FUNCTION],
  onaddfile: [null, p.FUNCTION],
  onprocessfilestart: [null, p.FUNCTION],
  onprocessfileprogress: [null, p.FUNCTION],
  onprocessfileabort: [null, p.FUNCTION],
  onprocessfilerevert: [null, p.FUNCTION],
  onprocessfile: [null, p.FUNCTION],
  onprocessfiles: [null, p.FUNCTION],
  onremovefile: [null, p.FUNCTION],
  onpreparefile: [null, p.FUNCTION],
  onupdatefiles: [null, p.FUNCTION],
  onreorderfiles: [null, p.FUNCTION],
  // hooks
  beforeDropFile: [null, p.FUNCTION],
  beforeAddFile: [null, p.FUNCTION],
  beforeRemoveFile: [null, p.FUNCTION],
  beforePrepareFile: [null, p.FUNCTION],
  // styles
  stylePanelLayout: [null, p.STRING],
  // null 'integrated', 'compact', 'circle'
  stylePanelAspectRatio: [null, p.STRING],
  // null or '3:2' or 1
  styleItemPanelAspectRatio: [null, p.STRING],
  styleButtonRemoveItemPosition: ["left", p.STRING],
  styleButtonProcessItemPosition: ["right", p.STRING],
  styleLoadIndicatorPosition: ["right", p.STRING],
  styleProgressIndicatorPosition: ["right", p.STRING],
  styleButtonRemoveItemAlign: [!1, p.BOOLEAN],
  // custom initial files array
  files: [[], p.ARRAY],
  // show support by displaying credits
  credits: [["https://pqina.nl/", "Powered by PQINA"], p.ARRAY]
}, Ie = (e, t) => ae(t) ? e[0] || null : Le(t) ? e[t] || null : (typeof t == "object" && (t = t.id), e.find((n) => n.id === t) || null), Cn = (e) => {
  if (ae(e))
    return e;
  if (/:/.test(e)) {
    const t = e.split(":");
    return t[1] / t[0];
  }
  return parseFloat(e);
}, ie = (e) => e.filter((t) => !t.archived), Nn = {
  EMPTY: 0,
  IDLE: 1,
  // waiting
  ERROR: 2,
  // a file is in error state
  BUSY: 3,
  // busy processing or loading
  READY: 4
  // all files uploaded
};
let Ge = null;
const ds = () => {
  if (Ge === null)
    try {
      const e = new DataTransfer();
      e.items.add(new File(["hello world"], "This_Works.txt"));
      const t = document.createElement("input");
      t.setAttribute("type", "file"), t.files = e.files, Ge = t.files.length === 1;
    } catch {
      Ge = !1;
    }
  return Ge;
}, us = [
  C.LOAD_ERROR,
  C.PROCESSING_ERROR,
  C.PROCESSING_REVERT_ERROR
], fs = [
  C.LOADING,
  C.PROCESSING,
  C.PROCESSING_QUEUED,
  C.INIT
], Es = [C.PROCESSING_COMPLETE], ps = (e) => us.includes(e.status), Is = (e) => fs.includes(e.status), _s = (e) => Es.includes(e.status), zt = (e) => z(e.options.server) && (z(e.options.server.process) || pe(e.options.server.process)), Ts = (e) => ({
  GET_STATUS: () => {
    const t = ie(e.items), { EMPTY: n, ERROR: r, BUSY: s, IDLE: o, READY: i } = Nn;
    return t.length === 0 ? n : t.some(ps) ? r : t.some(Is) ? s : t.some(_s) ? i : o;
  },
  GET_ITEM: (t) => Ie(e.items, t),
  GET_ACTIVE_ITEM: (t) => Ie(ie(e.items), t),
  GET_ACTIVE_ITEMS: () => ie(e.items),
  GET_ITEMS: () => e.items,
  GET_ITEM_NAME: (t) => {
    const n = Ie(e.items, t);
    return n ? n.filename : null;
  },
  GET_ITEM_SIZE: (t) => {
    const n = Ie(e.items, t);
    return n ? n.fileSize : null;
  },
  GET_STYLES: () => Object.keys(e.options).filter((t) => /^style/.test(t)).map((t) => ({
    name: t,
    value: e.options[t]
  })),
  GET_PANEL_ASPECT_RATIO: () => /circle/.test(e.options.stylePanelLayout) ? 1 : Cn(e.options.stylePanelAspectRatio),
  GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
  GET_ITEMS_BY_STATUS: (t) => ie(e.items).filter((n) => n.status === t),
  GET_TOTAL_ITEMS: () => ie(e.items).length,
  SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && ds() && !zt(e),
  IS_ASYNC: () => zt(e),
  GET_FILE_SIZE_LABELS: (t) => ({
    labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0,
    labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
    labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
    labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0
  })
}), ms = (e) => {
  const t = ie(e.items).length;
  if (!e.options.allowMultiple)
    return t === 0;
  const n = e.options.maxFiles;
  return n === null || t < n;
}, vn = (e, t, n) => Math.max(Math.min(n, e), t), gs = (e, t, n) => e.splice(t, 0, n), Rs = (e, t, n) => ae(t) ? null : typeof n > "u" ? (e.push(t), t) : (n = vn(n, 0, e.length), gs(e, n, t), t), at = (e) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
  e
), Ne = (e) => `${e}`.split("/").pop().split("?").shift(), Ze = (e) => e.split(".").pop(), hs = (e) => {
  if (typeof e != "string")
    return "";
  const t = e.split("/").pop();
  return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? t === "jpeg" ? "jpg" : t : "";
}, Pe = (e, t = "") => (t + e).slice(-t.length), wn = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Pe(e.getMonth() + 1, "00")}-${Pe(
  e.getDate(),
  "00"
)}_${Pe(e.getHours(), "00")}-${Pe(e.getMinutes(), "00")}-${Pe(
  e.getSeconds(),
  "00"
)}`, ye = (e, t, n = null, r = null) => {
  const s = typeof n == "string" ? e.slice(0, e.size, n) : e.slice(0, e.size, e.type);
  return s.lastModifiedDate = /* @__PURE__ */ new Date(), e._relativePath && (s._relativePath = e._relativePath), Q(t) || (t = wn()), t && r === null && Ze(t) ? s.name = t : (r = r || hs(s.type), s.name = t + (r ? "." + r : "")), s;
}, Os = () => window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, Gn = (e, t) => {
  const n = Os();
  if (n) {
    const r = new n();
    return r.append(e), r.getBlob(t);
  }
  return new Blob([e], {
    type: t
  });
}, Ds = (e, t) => {
  const n = new ArrayBuffer(e.length), r = new Uint8Array(n);
  for (let s = 0; s < e.length; s++)
    r[s] = e.charCodeAt(s);
  return Gn(n, t);
}, Fn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null, Ss = (e) => e.split(",")[1].replace(/\s/g, ""), As = (e) => atob(Ss(e)), ys = (e) => {
  const t = Fn(e), n = As(e);
  return Ds(n, t);
}, Ls = (e, t, n) => ye(ys(e), t, null, n), Ps = (e) => {
  if (!/^content-disposition:/i.test(e)) return null;
  const t = e.split(/filename=|filename\*=.+''/).splice(1).map((n) => n.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((n) => n.length);
  return t.length ? decodeURI(t[t.length - 1]) : null;
}, bs = (e) => {
  if (/content-length:/i.test(e)) {
    const t = e.match(/[0-9]+/)[0];
    return t ? parseInt(t, 10) : null;
  }
  return null;
}, Ms = (e) => /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null, yt = (e) => {
  const t = {
    source: null,
    name: null,
    size: null
  }, n = e.split(`
`);
  for (let r of n) {
    const s = Ps(r);
    if (s) {
      t.name = s;
      continue;
    }
    const o = bs(r);
    if (o) {
      t.size = o;
      continue;
    }
    const i = Ms(r);
    if (i) {
      t.source = i;
      continue;
    }
  }
  return t;
}, Cs = (e) => {
  const t = {
    source: null,
    complete: !1,
    progress: 0,
    size: null,
    timestamp: null,
    duration: 0,
    request: null
  }, n = () => t.progress, r = () => {
    t.request && t.request.abort && t.request.abort();
  }, s = () => {
    const a = t.source;
    i.fire("init", a), a instanceof File ? i.fire("load", a) : a instanceof Blob ? i.fire("load", ye(a, a.name)) : at(a) ? i.fire("load", Ls(a)) : o(a);
  }, o = (a) => {
    if (!e) {
      i.fire("error", {
        type: "error",
        body: "Can't load URL",
        code: 400
      });
      return;
    }
    t.timestamp = Date.now(), t.request = e(
      a,
      (l) => {
        t.duration = Date.now() - t.timestamp, t.complete = !0, l instanceof Blob && (l = ye(l, l.name || Ne(a))), i.fire(
          "load",
          // if has received blob, we go with blob, if no response, we return null
          l instanceof Blob ? l : l ? l.body : null
        );
      },
      (l) => {
        i.fire(
          "error",
          typeof l == "string" ? {
            type: "error",
            code: 0,
            body: l
          } : l
        );
      },
      (l, d, c) => {
        if (c && (t.size = c), t.duration = Date.now() - t.timestamp, !l) {
          t.progress = null;
          return;
        }
        t.progress = d / c, i.fire("progress", t.progress);
      },
      () => {
        i.fire("abort");
      },
      (l) => {
        const d = yt(
          typeof l == "string" ? l : l.headers
        );
        i.fire("meta", {
          size: t.size || d.size,
          filename: d.name,
          source: d.source
        });
      }
    );
  }, i = {
    ...Ke(),
    setSource: (a) => t.source = a,
    getProgress: n,
    // file load progress
    abort: r,
    // abort file load
    load: s
    // start load
  };
  return i;
}, Xt = (e) => /GET|HEAD/.test(e), _e = (e, t, n) => {
  const r = {
    onheaders: () => {
    },
    onprogress: () => {
    },
    onload: () => {
    },
    ontimeout: () => {
    },
    onerror: () => {
    },
    onabort: () => {
    },
    abort: () => {
      s = !0, i.abort();
    }
  };
  let s = !1, o = !1;
  n = {
    method: "POST",
    headers: {},
    withCredentials: !1,
    ...n
  }, t = encodeURI(t), Xt(n.method) && e && (t = `${t}${encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e))}`);
  const i = new XMLHttpRequest(), a = Xt(n.method) ? i : i.upload;
  return a.onprogress = (l) => {
    s || r.onprogress(l.lengthComputable, l.loaded, l.total);
  }, i.onreadystatechange = () => {
    i.readyState < 2 || i.readyState === 4 && i.status === 0 || o || (o = !0, r.onheaders(i));
  }, i.onload = () => {
    i.status >= 200 && i.status < 300 ? r.onload(i) : r.onerror(i);
  }, i.onerror = () => r.onerror(i), i.onabort = () => {
    s = !0, r.onabort();
  }, i.ontimeout = () => r.ontimeout(i), i.open(n.method, t, !0), Le(n.timeout) && (i.timeout = n.timeout), Object.keys(n.headers).forEach((l) => {
    const d = unescape(encodeURIComponent(n.headers[l]));
    i.setRequestHeader(l, d);
  }), n.responseType && (i.responseType = n.responseType), n.withCredentials && (i.withCredentials = !0), i.send(e), r;
}, q = (e, t, n, r) => ({
  type: e,
  code: t,
  body: n,
  headers: r
}), Te = (e) => (t) => {
  e(q("error", 0, "Timeout", t.getAllResponseHeaders()));
}, kt = (e) => /\?/.test(e), Ce = (...e) => {
  let t = "";
  return e.forEach((n) => {
    t += kt(t) && kt(n) ? n.replace(/\?/, "&") : n;
  }), t;
}, tt = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !Q(t.url))
    return null;
  const n = t.onload || ((s) => s), r = t.onerror || ((s) => null);
  return (s, o, i, a, l, d) => {
    const c = _e(s, Ce(e, t.url), {
      ...t,
      responseType: "blob"
    });
    return c.onload = (f) => {
      const E = f.getAllResponseHeaders(), T = yt(E).name || Ne(s);
      o(
        q(
          "load",
          f.status,
          t.method === "HEAD" ? null : ye(n(f.response), T),
          E
        )
      );
    }, c.onerror = (f) => {
      i(
        q(
          "error",
          f.status,
          r(f.response) || f.statusText,
          f.getAllResponseHeaders()
        )
      );
    }, c.onheaders = (f) => {
      d(q("headers", f.status, null, f.getAllResponseHeaders()));
    }, c.ontimeout = Te(i), c.onprogress = a, c.onabort = l, c;
  };
}, te = {
  QUEUED: 0,
  COMPLETE: 1,
  PROCESSING: 2,
  ERROR: 3,
  WAITING: 4
}, Ns = (e, t, n, r, s, o, i, a, l, d, c) => {
  const f = [], { chunkTransferId: E, chunkServer: T, chunkSize: u, chunkRetryDelays: _ } = c, D = {
    serverId: E,
    aborted: !1
  }, R = t.ondata || ((m) => m), O = t.onload || ((m, U) => U === "HEAD" ? m.getResponseHeader("Upload-Offset") : m.response), L = t.onerror || ((m) => null), P = (m) => {
    const U = new FormData();
    z(s) && U.append(n, JSON.stringify(s));
    const I = typeof t.headers == "function" ? t.headers(r, s) : {
      ...t.headers,
      "Upload-Length": r.size
    }, g = {
      ...t,
      headers: I
    }, y = _e(R(U), Ce(e, t.url), g);
    y.onload = (b) => m(O(b, g.method)), y.onerror = (b) => i(
      q(
        "error",
        b.status,
        L(b.response) || b.statusText,
        b.getAllResponseHeaders()
      )
    ), y.ontimeout = Te(i);
  }, S = (m) => {
    const U = Ce(e, T.url, D.serverId), g = {
      headers: typeof t.headers == "function" ? t.headers(D.serverId) : {
        ...t.headers
      },
      method: "HEAD"
    }, y = _e(null, U, g);
    y.onload = (b) => m(O(b, g.method)), y.onerror = (b) => i(
      q(
        "error",
        b.status,
        L(b.response) || b.statusText,
        b.getAllResponseHeaders()
      )
    ), y.ontimeout = Te(i);
  }, N = Math.floor(r.size / u);
  for (let m = 0; m <= N; m++) {
    const U = m * u, I = r.slice(U, U + u, "application/offset+octet-stream");
    f[m] = {
      index: m,
      size: I.size,
      offset: U,
      data: I,
      file: r,
      progress: 0,
      retries: [..._],
      status: te.QUEUED,
      error: null,
      request: null,
      timeout: null
    };
  }
  const B = () => o(D.serverId), h = (m) => m.status === te.QUEUED || m.status === te.ERROR, M = (m) => {
    if (D.aborted) return;
    if (m = m || f.find(h), !m) {
      f.every((w) => w.status === te.COMPLETE) && B();
      return;
    }
    m.status = te.PROCESSING, m.progress = null;
    const U = T.ondata || ((w) => w), I = T.onerror || ((w) => null), g = T.onload || (() => {
    }), y = Ce(e, T.url, D.serverId), b = typeof T.headers == "function" ? T.headers(m) : {
      ...T.headers,
      "Content-Type": "application/offset+octet-stream",
      "Upload-Offset": m.offset,
      "Upload-Length": r.size,
      "Upload-Name": r.name
    }, Y = m.request = _e(U(m.data), y, {
      ...T,
      headers: b
    });
    Y.onload = (w) => {
      g(w, m.index, f.length), m.status = te.COMPLETE, m.request = null, v();
    }, Y.onprogress = (w, ve, Gt) => {
      m.progress = w ? ve : null, A();
    }, Y.onerror = (w) => {
      m.status = te.ERROR, m.request = null, m.error = I(w.response) || w.statusText, F(m) || i(
        q(
          "error",
          w.status,
          I(w.response) || w.statusText,
          w.getAllResponseHeaders()
        )
      );
    }, Y.ontimeout = (w) => {
      m.status = te.ERROR, m.request = null, F(m) || Te(i)(w);
    }, Y.onabort = () => {
      m.status = te.QUEUED, m.request = null, l();
    };
  }, F = (m) => m.retries.length === 0 ? !1 : (m.status = te.WAITING, clearTimeout(m.timeout), m.timeout = setTimeout(() => {
    M(m);
  }, m.retries.shift()), !0), A = () => {
    const m = f.reduce((I, g) => I === null || g.progress === null ? null : I + g.progress, 0);
    if (m === null) return a(!1, 0, 0);
    const U = f.reduce((I, g) => I + g.size, 0);
    a(!0, m, U);
  }, v = () => {
    f.filter((U) => U.status === te.PROCESSING).length >= 1 || M();
  }, X = () => {
    f.forEach((m) => {
      clearTimeout(m.timeout), m.request && m.request.abort();
    });
  };
  return D.serverId ? S((m) => {
    D.aborted || (f.filter((U) => U.offset < m).forEach((U) => {
      U.status = te.COMPLETE, U.progress = U.size;
    }), v());
  }) : P((m) => {
    D.aborted || (d(m), D.serverId = m, v());
  }), {
    abort: () => {
      D.aborted = !0, X();
    }
  };
}, vs = (e, t, n, r) => (s, o, i, a, l, d, c) => {
  if (!s) return;
  const f = r.chunkUploads, E = f && s.size > r.chunkSize, T = f && (E || r.chunkForce);
  if (s instanceof Blob && T)
    return Ns(
      e,
      t,
      n,
      s,
      o,
      i,
      a,
      l,
      d,
      c,
      r
    );
  const u = t.ondata || ((S) => S), _ = t.onload || ((S) => S), D = t.onerror || ((S) => null), R = typeof t.headers == "function" ? t.headers(s, o) || {} : {
    ...t.headers
  }, O = {
    ...t,
    headers: R
  };
  var L = new FormData();
  z(o) && L.append(n, JSON.stringify(o)), (s instanceof Blob ? [{ name: null, file: s }] : s).forEach((S) => {
    L.append(
      n,
      S.file,
      S.name === null ? S.file.name : `${S.name}${S.file.name}`
    );
  });
  const P = _e(u(L), Ce(e, t.url), O);
  return P.onload = (S) => {
    i(q("load", S.status, _(S.response), S.getAllResponseHeaders()));
  }, P.onerror = (S) => {
    a(
      q(
        "error",
        S.status,
        D(S.response) || S.statusText,
        S.getAllResponseHeaders()
      )
    );
  }, P.ontimeout = Te(a), P.onprogress = l, P.onabort = d, P;
}, ws = (e = "", t, n, r) => typeof t == "function" ? (...s) => t(n, ...s, r) : !t || !Q(t.url) ? null : vs(e, t, n, r), be = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !Q(t.url))
    return (s, o) => o();
  const n = t.onload || ((s) => s), r = t.onerror || ((s) => null);
  return (s, o, i) => {
    const a = _e(
      s,
      e + t.url,
      t
      // contains method, headers and withCredentials properties
    );
    return a.onload = (l) => {
      o(
        q(
          "load",
          l.status,
          n(l.response),
          l.getAllResponseHeaders()
        )
      );
    }, a.onerror = (l) => {
      i(
        q(
          "error",
          l.status,
          r(l.response) || l.statusText,
          l.getAllResponseHeaders()
        )
      );
    }, a.ontimeout = Te(i), a;
  };
}, Un = (e = 0, t = 1) => e + Math.random() * (t - e), Gs = (e, t = 1e3, n = 0, r = 25, s = 250) => {
  let o = null;
  const i = Date.now(), a = () => {
    let l = Date.now() - i, d = Un(r, s);
    l + d > t && (d = l + d - t);
    let c = l / t;
    if (c >= 1 || document.hidden) {
      e(1);
      return;
    }
    e(c), o = setTimeout(a, d);
  };
  return t > 0 && a(), {
    clear: () => {
      clearTimeout(o);
    }
  };
}, Fs = (e, t) => {
  const n = {
    complete: !1,
    perceivedProgress: 0,
    perceivedPerformanceUpdater: null,
    progress: null,
    timestamp: null,
    perceivedDuration: 0,
    duration: 0,
    request: null,
    response: null
  }, { allowMinimumUploadDuration: r } = t, s = (c, f) => {
    const E = () => {
      n.duration === 0 || n.progress === null || d.fire("progress", d.getProgress());
    }, T = () => {
      n.complete = !0, d.fire("load-perceived", n.response.body);
    };
    d.fire("start"), n.timestamp = Date.now(), n.perceivedPerformanceUpdater = Gs(
      (u) => {
        n.perceivedProgress = u, n.perceivedDuration = Date.now() - n.timestamp, E(), n.response && n.perceivedProgress === 1 && !n.complete && T();
      },
      // random delay as in a list of files you start noticing
      // files uploading at the exact same speed
      r ? Un(750, 1500) : 0
    ), n.request = e(
      // the file to process
      c,
      // the metadata to send along
      f,
      // callbacks (load, error, progress, abort, transfer)
      // load expects the body to be a server id if
      // you want to make use of revert
      (u) => {
        n.response = z(u) ? u : {
          type: "load",
          code: 200,
          body: `${u}`,
          headers: {}
        }, n.duration = Date.now() - n.timestamp, n.progress = 1, d.fire("load", n.response.body), (!r || r && n.perceivedProgress === 1) && T();
      },
      // error is expected to be an object with type, code, body
      (u) => {
        n.perceivedPerformanceUpdater.clear(), d.fire(
          "error",
          z(u) ? u : {
            type: "error",
            code: 0,
            body: `${u}`
          }
        );
      },
      // actual processing progress
      (u, _, D) => {
        n.duration = Date.now() - n.timestamp, n.progress = u ? _ / D : null, E();
      },
      // abort does not expect a value
      () => {
        n.perceivedPerformanceUpdater.clear(), d.fire("abort", n.response ? n.response.body : null);
      },
      // register the id for this transfer
      (u) => {
        d.fire("transfer", u);
      }
    );
  }, o = () => {
    n.request && (n.perceivedPerformanceUpdater.clear(), n.request.abort && n.request.abort(), n.complete = !0);
  }, i = () => {
    o(), n.complete = !1, n.perceivedProgress = 0, n.progress = 0, n.timestamp = null, n.perceivedDuration = 0, n.duration = 0, n.request = null, n.response = null;
  }, a = r ? () => n.progress ? Math.min(n.progress, n.perceivedProgress) : null : () => n.progress || null, l = r ? () => Math.min(n.duration, n.perceivedDuration) : () => n.duration, d = {
    ...Ke(),
    process: s,
    // start processing file
    abort: o,
    // abort active process request
    getProgress: a,
    getDuration: l,
    reset: i
  };
  return d;
}, Bn = (e) => e.substring(0, e.lastIndexOf(".")) || e, Us = (e) => {
  let t = [e.name, e.size, e.type];
  return e instanceof Blob || at(e) ? t[0] = e.name || wn() : at(e) ? (t[1] = e.length, t[2] = Fn(e)) : Q(e) && (t[0] = Ne(e), t[1] = 0, t[2] = "application/octet-stream"), {
    name: t[0],
    size: t[1],
    type: t[2]
  };
}, me = (e) => !!(e instanceof File || e instanceof Blob && e.name), Vn = (e) => {
  if (!z(e)) return e;
  const t = ke(e) ? [] : {};
  for (const n in e) {
    if (!e.hasOwnProperty(n)) continue;
    const r = e[n];
    t[n] = r && z(r) ? Vn(r) : r;
  }
  return t;
}, Bs = (e = null, t = null, n = null) => {
  const r = Dt(), s = {
    // is archived
    archived: !1,
    // if is frozen, no longer fires events
    frozen: !1,
    // removed from view
    released: !1,
    // original source
    source: null,
    // file model reference
    file: n,
    // id of file on server
    serverFileReference: t,
    // id of file transfer on server
    transferId: null,
    // is aborted
    processingAborted: !1,
    // current item status
    status: t ? C.PROCESSING_COMPLETE : C.INIT,
    // active processes
    activeLoader: null,
    activeProcessor: null
  };
  let o = null;
  const i = {}, a = (h) => s.status = h, l = (h, ...M) => {
    s.released || s.frozen || N.fire(h, ...M);
  }, d = () => Ze(s.file.name), c = () => s.file.type, f = () => s.file.size, E = () => s.file, T = (h, M, F) => {
    if (s.source = h, N.fireSync("init"), s.file) {
      N.fireSync("load-skip");
      return;
    }
    s.file = Us(h), M.on("init", () => {
      l("load-init");
    }), M.on("meta", (A) => {
      s.file.size = A.size, s.file.filename = A.filename, A.source && (e = $.LIMBO, s.serverFileReference = A.source, s.status = C.PROCESSING_COMPLETE), l("load-meta");
    }), M.on("progress", (A) => {
      a(C.LOADING), l("load-progress", A);
    }), M.on("error", (A) => {
      a(C.LOAD_ERROR), l("load-request-error", A);
    }), M.on("abort", () => {
      a(C.INIT), l("load-abort");
    }), M.on("load", (A) => {
      s.activeLoader = null;
      const v = (m) => {
        s.file = me(m) ? m : s.file, e === $.LIMBO && s.serverFileReference ? a(C.PROCESSING_COMPLETE) : a(C.IDLE), l("load");
      }, X = (m) => {
        s.file = A, l("load-meta"), a(C.LOAD_ERROR), l("load-file-error", m);
      };
      if (s.serverFileReference) {
        v(A);
        return;
      }
      F(A, v, X);
    }), M.setSource(h), s.activeLoader = M, M.load();
  }, u = () => {
    s.activeLoader && s.activeLoader.load();
  }, _ = () => {
    if (s.activeLoader) {
      s.activeLoader.abort();
      return;
    }
    a(C.INIT), l("load-abort");
  }, D = (h, M) => {
    if (s.processingAborted) {
      s.processingAborted = !1;
      return;
    }
    if (a(C.PROCESSING), o = null, !(s.file instanceof Blob)) {
      N.on("load", () => {
        D(h, M);
      });
      return;
    }
    h.on("load", (v) => {
      s.transferId = null, s.serverFileReference = v;
    }), h.on("transfer", (v) => {
      s.transferId = v;
    }), h.on("load-perceived", (v) => {
      s.activeProcessor = null, s.transferId = null, s.serverFileReference = v, a(C.PROCESSING_COMPLETE), l("process-complete", v);
    }), h.on("start", () => {
      l("process-start");
    }), h.on("error", (v) => {
      s.activeProcessor = null, a(C.PROCESSING_ERROR), l("process-error", v);
    }), h.on("abort", (v) => {
      s.activeProcessor = null, s.serverFileReference = v, a(C.IDLE), l("process-abort"), o && o();
    }), h.on("progress", (v) => {
      l("process-progress", v);
    });
    const F = (v) => {
      s.archived || h.process(v, { ...i });
    }, A = console.error;
    M(s.file, F, A), s.activeProcessor = h;
  }, R = () => {
    s.processingAborted = !1, a(C.PROCESSING_QUEUED);
  }, O = () => new Promise((h) => {
    if (!s.activeProcessor) {
      s.processingAborted = !0, a(C.IDLE), l("process-abort"), h();
      return;
    }
    o = () => {
      h();
    }, s.activeProcessor.abort();
  }), L = (h, M) => new Promise((F, A) => {
    const v = s.serverFileReference !== null ? s.serverFileReference : s.transferId;
    if (v === null) {
      F();
      return;
    }
    h(
      v,
      () => {
        s.serverFileReference = null, s.transferId = null, F();
      },
      (X) => {
        if (!M) {
          F();
          return;
        }
        a(C.PROCESSING_REVERT_ERROR), l("process-revert-error"), A(X);
      }
    ), a(C.IDLE), l("process-revert");
  }), P = (h, M, F) => {
    const A = h.split("."), v = A[0], X = A.pop();
    let m = i;
    A.forEach((U) => m = m[U]), JSON.stringify(m[X]) !== JSON.stringify(M) && (m[X] = M, l("metadata-update", {
      key: v,
      value: i[v],
      silent: F
    }));
  }, N = {
    id: { get: () => r },
    origin: { get: () => e, set: (h) => e = h },
    serverId: { get: () => s.serverFileReference },
    transferId: { get: () => s.transferId },
    status: { get: () => s.status },
    filename: { get: () => s.file.name },
    filenameWithoutExtension: { get: () => Bn(s.file.name) },
    fileExtension: { get: d },
    fileType: { get: c },
    fileSize: { get: f },
    file: { get: E },
    relativePath: { get: () => s.file._relativePath },
    source: { get: () => s.source },
    getMetadata: (h) => Vn(h ? i[h] : i),
    setMetadata: (h, M, F) => {
      if (z(h)) {
        const A = h;
        return Object.keys(A).forEach((v) => {
          P(v, A[v], M);
        }), h;
      }
      return P(h, M, F), M;
    },
    extend: (h, M) => B[h] = M,
    abortLoad: _,
    retryLoad: u,
    requestProcessing: R,
    abortProcessing: O,
    load: T,
    process: D,
    revert: L,
    ...Ke(),
    freeze: () => s.frozen = !0,
    release: () => s.released = !0,
    released: { get: () => s.released },
    archive: () => s.archived = !0,
    archived: { get: () => s.archived },
    // replace source and file object
    setFile: (h) => s.file = h
  }, B = fe(N);
  return B;
}, Vs = (e, t) => ae(t) ? 0 : Q(t) ? e.findIndex((n) => n.id === t) : -1, jt = (e, t) => {
  const n = Vs(e, t);
  if (!(n < 0))
    return e[n] || null;
}, Qt = (e, t, n, r, s, o) => {
  const i = _e(null, e, {
    method: "GET",
    responseType: "blob"
  });
  return i.onload = (a) => {
    const l = a.getAllResponseHeaders(), d = yt(l).name || Ne(e);
    t(q("load", a.status, ye(a.response, d), l));
  }, i.onerror = (a) => {
    n(q("error", a.status, a.statusText, a.getAllResponseHeaders()));
  }, i.onheaders = (a) => {
    o(q("headers", a.status, null, a.getAllResponseHeaders()));
  }, i.ontimeout = Te(n), i.onprogress = r, i.onabort = s, i;
}, Kt = (e) => (e.indexOf("//") === 0 && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]), qs = (e) => (e.indexOf(":") > -1 || e.indexOf("//") > -1) && Kt(location.href) !== Kt(e), Fe = (e) => (...t) => pe(e) ? e(...t) : e, xs = (e) => !me(e.file), nt = (e, t) => {
  clearTimeout(t.listUpdateTimeout), t.listUpdateTimeout = setTimeout(() => {
    e("DID_UPDATE_ITEMS", { items: ie(t.items) });
  }, 0);
}, Zt = (e, ...t) => new Promise((n) => {
  if (!e)
    return n(!0);
  const r = e(...t);
  if (r == null)
    return n(!0);
  if (typeof r == "boolean")
    return n(r);
  typeof r.then == "function" && r.then(n);
}), rt = (e, t) => {
  e.items.sort((n, r) => t(J(n), J(r)));
}, ne = (e, t) => ({
  query: n,
  success: r = () => {
  },
  failure: s = () => {
  },
  ...o
} = {}) => {
  const i = Ie(e.items, n);
  if (!i) {
    s({
      error: q("error", 0, "Item not found"),
      file: null
    });
    return;
  }
  t(i, r, s, o || {});
}, Hs = (e, t, n) => ({
  /**
   * Aborts all ongoing processes
   */
  ABORT_ALL: () => {
    ie(n.items).forEach((r) => {
      r.freeze(), r.abortLoad(), r.abortProcessing();
    });
  },
  /**
   * Sets initial files
   */
  DID_SET_FILES: ({ value: r = [] }) => {
    const s = r.map((i) => ({
      source: i.source ? i.source : i,
      options: i.options
    }));
    let o = ie(n.items);
    o.forEach((i) => {
      s.find((a) => a.source === i.source || a.source === i.file) || e("REMOVE_ITEM", { query: i, remove: !1 });
    }), o = ie(n.items), s.forEach((i, a) => {
      o.find((l) => l.source === i.source || l.file === i.source) || e("ADD_ITEM", {
        ...i,
        interactionMethod: re.NONE,
        index: a
      });
    });
  },
  DID_UPDATE_ITEM_METADATA: ({ id: r, action: s, change: o }) => {
    o.silent || (clearTimeout(n.itemUpdateTimeout), n.itemUpdateTimeout = setTimeout(() => {
      const i = jt(n.items, r);
      if (!t("IS_ASYNC")) {
        se("SHOULD_PREPARE_OUTPUT", !1, {
          item: i,
          query: t,
          action: s,
          change: o
        }).then((c) => {
          const f = t("GET_BEFORE_PREPARE_FILE");
          f && (c = f(i, c)), c && e(
            "REQUEST_PREPARE_OUTPUT",
            {
              query: r,
              item: i,
              success: (E) => {
                e("DID_PREPARE_OUTPUT", { id: r, file: E });
              }
            },
            !0
          );
        });
        return;
      }
      i.origin === $.LOCAL && e("DID_LOAD_ITEM", {
        id: i.id,
        error: null,
        serverFileReference: i.source
      });
      const a = () => {
        setTimeout(() => {
          e("REQUEST_ITEM_PROCESSING", { query: r });
        }, 32);
      }, l = (c) => {
        i.revert(
          be(n.options.server.url, n.options.server.revert),
          t("GET_FORCE_REVERT")
        ).then(c ? a : () => {
        }).catch(() => {
        });
      }, d = (c) => {
        i.abortProcessing().then(c ? a : () => {
        });
      };
      if (i.status === C.PROCESSING_COMPLETE)
        return l(n.options.instantUpload);
      if (i.status === C.PROCESSING)
        return d(n.options.instantUpload);
      n.options.instantUpload && a();
    }, 0));
  },
  MOVE_ITEM: ({ query: r, index: s }) => {
    const o = Ie(n.items, r);
    if (!o) return;
    const i = n.items.indexOf(o);
    s = vn(s, 0, n.items.length - 1), i !== s && n.items.splice(s, 0, n.items.splice(i, 1)[0]);
  },
  SORT: ({ compare: r }) => {
    rt(n, r), e("DID_SORT_ITEMS", {
      items: t("GET_ACTIVE_ITEMS")
    });
  },
  ADD_ITEMS: ({ items: r, index: s, interactionMethod: o, success: i = () => {
  }, failure: a = () => {
  } }) => {
    let l = s;
    if (s === -1 || typeof s > "u") {
      const T = t("GET_ITEM_INSERT_LOCATION"), u = t("GET_TOTAL_ITEMS");
      l = T === "before" ? 0 : u;
    }
    const d = t("GET_IGNORED_FILES"), c = (T) => me(T) ? !d.includes(T.name.toLowerCase()) : !ae(T), E = r.filter(c).map(
      (T) => new Promise((u, _) => {
        e("ADD_ITEM", {
          interactionMethod: o,
          source: T.source || T,
          success: u,
          failure: _,
          index: l++,
          options: T.options || {}
        });
      })
    );
    Promise.all(E).then(i).catch(a);
  },
  /**
   * @param source
   * @param index
   * @param interactionMethod
   */
  ADD_ITEM: ({
    source: r,
    index: s = -1,
    interactionMethod: o,
    success: i = () => {
    },
    failure: a = () => {
    },
    options: l = {}
  }) => {
    if (ae(r)) {
      a({
        error: q("error", 0, "No source"),
        file: null
      });
      return;
    }
    if (me(r) && n.options.ignoredFiles.includes(r.name.toLowerCase()))
      return;
    if (!ms(n)) {
      if (n.options.allowMultiple || !n.options.allowMultiple && !n.options.allowReplace) {
        const O = q("warning", 0, "Max files");
        e("DID_THROW_MAX_FILES", {
          source: r,
          error: O
        }), a({ error: O, file: null });
        return;
      }
      const R = ie(n.items)[0];
      if (R.status === C.PROCESSING_COMPLETE || R.status === C.PROCESSING_REVERT_ERROR) {
        const O = t("GET_FORCE_REVERT");
        if (R.revert(
          be(n.options.server.url, n.options.server.revert),
          O
        ).then(() => {
          O && e("ADD_ITEM", {
            source: r,
            index: s,
            interactionMethod: o,
            success: i,
            failure: a,
            options: l
          });
        }).catch(() => {
        }), O) return;
      }
      e("REMOVE_ITEM", { query: R.id });
    }
    const d = l.type === "local" ? $.LOCAL : l.type === "limbo" ? $.LIMBO : $.INPUT, c = Bs(
      // where did this file come from
      d,
      // an input file never has a server file reference
      d === $.INPUT ? null : r,
      // file mock data, if defined
      l.file
    );
    Object.keys(l.metadata || {}).forEach((R) => {
      c.setMetadata(R, l.metadata[R]);
    }), Re("DID_CREATE_ITEM", c, { query: t, dispatch: e });
    const f = t("GET_ITEM_INSERT_LOCATION");
    n.options.itemInsertLocationFreedom || (s = f === "before" ? -1 : n.items.length), Rs(n.items, c, s), pe(f) && r && rt(n, f);
    const E = c.id;
    c.on("init", () => {
      e("DID_INIT_ITEM", { id: E });
    }), c.on("load-init", () => {
      e("DID_START_ITEM_LOAD", { id: E });
    }), c.on("load-meta", () => {
      e("DID_UPDATE_ITEM_META", { id: E });
    }), c.on("load-progress", (R) => {
      e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: E, progress: R });
    }), c.on("load-request-error", (R) => {
      const O = Fe(n.options.labelFileLoadError)(R);
      if (R.code >= 400 && R.code < 500) {
        e("DID_THROW_ITEM_INVALID", {
          id: E,
          error: R,
          status: {
            main: O,
            sub: `${R.code} (${R.body})`
          }
        }), a({ error: R, file: J(c) });
        return;
      }
      e("DID_THROW_ITEM_LOAD_ERROR", {
        id: E,
        error: R,
        status: {
          main: O,
          sub: n.options.labelTapToRetry
        }
      });
    }), c.on("load-file-error", (R) => {
      e("DID_THROW_ITEM_INVALID", {
        id: E,
        error: R.status,
        status: R.status
      }), a({ error: R.status, file: J(c) });
    }), c.on("load-abort", () => {
      e("REMOVE_ITEM", { query: E });
    }), c.on("load-skip", () => {
      c.on("metadata-update", (R) => {
        me(c.file) && e("DID_UPDATE_ITEM_METADATA", { id: E, change: R });
      }), e("COMPLETE_LOAD_ITEM", {
        query: E,
        item: c,
        data: {
          source: r,
          success: i
        }
      });
    }), c.on("load", () => {
      const R = (O) => {
        if (!O) {
          e("REMOVE_ITEM", {
            query: E
          });
          return;
        }
        c.on("metadata-update", (L) => {
          e("DID_UPDATE_ITEM_METADATA", { id: E, change: L });
        }), se("SHOULD_PREPARE_OUTPUT", !1, { item: c, query: t }).then(
          (L) => {
            const P = t("GET_BEFORE_PREPARE_FILE");
            P && (L = P(c, L));
            const S = () => {
              e("COMPLETE_LOAD_ITEM", {
                query: E,
                item: c,
                data: {
                  source: r,
                  success: i
                }
              }), nt(e, n);
            };
            if (L) {
              e(
                "REQUEST_PREPARE_OUTPUT",
                {
                  query: E,
                  item: c,
                  success: (N) => {
                    e("DID_PREPARE_OUTPUT", { id: E, file: N }), S();
                  }
                },
                !0
              );
              return;
            }
            S();
          }
        );
      };
      se("DID_LOAD_ITEM", c, { query: t, dispatch: e }).then(() => {
        Zt(t("GET_BEFORE_ADD_FILE"), J(c)).then(
          R
        );
      }).catch((O) => {
        if (!O || !O.error || !O.status) return R(!1);
        e("DID_THROW_ITEM_INVALID", {
          id: E,
          error: O.error,
          status: O.status
        });
      });
    }), c.on("process-start", () => {
      e("DID_START_ITEM_PROCESSING", { id: E });
    }), c.on("process-progress", (R) => {
      e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: E, progress: R });
    }), c.on("process-error", (R) => {
      e("DID_THROW_ITEM_PROCESSING_ERROR", {
        id: E,
        error: R,
        status: {
          main: Fe(n.options.labelFileProcessingError)(R),
          sub: n.options.labelTapToRetry
        }
      });
    }), c.on("process-revert-error", (R) => {
      e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
        id: E,
        error: R,
        status: {
          main: Fe(n.options.labelFileProcessingRevertError)(R),
          sub: n.options.labelTapToRetry
        }
      });
    }), c.on("process-complete", (R) => {
      e("DID_COMPLETE_ITEM_PROCESSING", {
        id: E,
        error: null,
        serverFileReference: R
      }), e("DID_DEFINE_VALUE", { id: E, value: R });
    }), c.on("process-abort", () => {
      e("DID_ABORT_ITEM_PROCESSING", { id: E });
    }), c.on("process-revert", () => {
      e("DID_REVERT_ITEM_PROCESSING", { id: E }), e("DID_DEFINE_VALUE", { id: E, value: null });
    }), e("DID_ADD_ITEM", { id: E, index: s, interactionMethod: o }), nt(e, n);
    const { url: T, load: u, restore: _, fetch: D } = n.options.server || {};
    c.load(
      r,
      // this creates a function that loads the file based on the type of file (string, base64, blob, file) and location of file (local, remote, limbo)
      Cs(
        d === $.INPUT ? (
          // input, if is remote, see if should use custom fetch, else use default fetchBlob
          Q(r) && qs(r) && D ? tt(T, D) : Qt
        ) : (
          // limbo or local
          d === $.LIMBO ? tt(T, _) : tt(T, u)
        )
        // local
      ),
      // called when the file is loaded so it can be piped through the filters
      (R, O, L) => {
        se("LOAD_FILE", R, { query: t }).then(O).catch(L);
      }
    );
  },
  REQUEST_PREPARE_OUTPUT: ({ item: r, success: s, failure: o = () => {
  } }) => {
    const i = {
      error: q("error", 0, "Item not found"),
      file: null
    };
    if (r.archived) return o(i);
    se("PREPARE_OUTPUT", r.file, { query: t, item: r }).then((a) => {
      se("COMPLETE_PREPARE_OUTPUT", a, { query: t, item: r }).then((l) => {
        if (r.archived) return o(i);
        s(l);
      });
    });
  },
  COMPLETE_LOAD_ITEM: ({ item: r, data: s }) => {
    const { success: o, source: i } = s, a = t("GET_ITEM_INSERT_LOCATION");
    if (pe(a) && i && rt(n, a), e("DID_LOAD_ITEM", {
      id: r.id,
      error: null,
      serverFileReference: r.origin === $.INPUT ? null : i
    }), o(J(r)), r.origin === $.LOCAL) {
      e("DID_LOAD_LOCAL_ITEM", { id: r.id });
      return;
    }
    if (r.origin === $.LIMBO) {
      e("DID_COMPLETE_ITEM_PROCESSING", {
        id: r.id,
        error: null,
        serverFileReference: i
      }), e("DID_DEFINE_VALUE", {
        id: r.id,
        value: r.serverId || i
      });
      return;
    }
    t("IS_ASYNC") && n.options.instantUpload && e("REQUEST_ITEM_PROCESSING", { query: r.id });
  },
  RETRY_ITEM_LOAD: ne(n, (r) => {
    r.retryLoad();
  }),
  REQUEST_ITEM_PREPARE: ne(n, (r, s, o) => {
    e(
      "REQUEST_PREPARE_OUTPUT",
      {
        query: r.id,
        item: r,
        success: (i) => {
          e("DID_PREPARE_OUTPUT", { id: r.id, file: i }), s({
            file: r,
            output: i
          });
        },
        failure: o
      },
      !0
    );
  }),
  REQUEST_ITEM_PROCESSING: ne(n, (r, s, o) => {
    if (!// waiting for something
    (r.status === C.IDLE || // processing went wrong earlier
    r.status === C.PROCESSING_ERROR)) {
      const a = () => e("REQUEST_ITEM_PROCESSING", { query: r, success: s, failure: o }), l = () => document.hidden ? a() : setTimeout(a, 32);
      r.status === C.PROCESSING_COMPLETE || r.status === C.PROCESSING_REVERT_ERROR ? r.revert(
        be(n.options.server.url, n.options.server.revert),
        t("GET_FORCE_REVERT")
      ).then(l).catch(() => {
      }) : r.status === C.PROCESSING && r.abortProcessing().then(l);
      return;
    }
    r.status !== C.PROCESSING_QUEUED && (r.requestProcessing(), e("DID_REQUEST_ITEM_PROCESSING", { id: r.id }), e("PROCESS_ITEM", { query: r, success: s, failure: o }, !0));
  }),
  PROCESS_ITEM: ne(n, (r, s, o) => {
    const i = t("GET_MAX_PARALLEL_UPLOADS");
    if (t("GET_ITEMS_BY_STATUS", C.PROCESSING).length === i) {
      n.processingQueue.push({
        id: r.id,
        success: s,
        failure: o
      });
      return;
    }
    if (r.status === C.PROCESSING) return;
    const l = () => {
      const c = n.processingQueue.shift();
      if (!c) return;
      const { id: f, success: E, failure: T } = c, u = Ie(n.items, f);
      if (!u || u.archived) {
        l();
        return;
      }
      e("PROCESS_ITEM", { query: f, success: E, failure: T }, !0);
    };
    r.onOnce("process-complete", () => {
      s(J(r)), l();
      const c = n.options.server;
      if (n.options.instantUpload && r.origin === $.LOCAL && pe(c.remove)) {
        const T = () => {
        };
        r.origin = $.LIMBO, n.options.server.remove(r.source, T, T);
      }
      t("GET_ITEMS_BY_STATUS", C.PROCESSING_COMPLETE).length === n.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
    }), r.onOnce("process-error", (c) => {
      o({ error: c, file: J(r) }), l();
    });
    const d = n.options;
    r.process(
      Fs(
        ws(d.server.url, d.server.process, d.name, {
          chunkTransferId: r.transferId,
          chunkServer: d.server.patch,
          chunkUploads: d.chunkUploads,
          chunkForce: d.chunkForce,
          chunkSize: d.chunkSize,
          chunkRetryDelays: d.chunkRetryDelays
        }),
        {
          allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION")
        }
      ),
      // called when the file is about to be processed so it can be piped through the transform filters
      (c, f, E) => {
        se("PREPARE_OUTPUT", c, { query: t, item: r }).then((T) => {
          e("DID_PREPARE_OUTPUT", { id: r.id, file: T }), f(T);
        }).catch(E);
      }
    );
  }),
  RETRY_ITEM_PROCESSING: ne(n, (r) => {
    e("REQUEST_ITEM_PROCESSING", { query: r });
  }),
  REQUEST_REMOVE_ITEM: ne(n, (r) => {
    Zt(t("GET_BEFORE_REMOVE_FILE"), J(r)).then((s) => {
      s && e("REMOVE_ITEM", { query: r });
    });
  }),
  RELEASE_ITEM: ne(n, (r) => {
    r.release();
  }),
  REMOVE_ITEM: ne(n, (r, s, o, i) => {
    const a = () => {
      const d = r.id;
      jt(n.items, d).archive(), e("DID_REMOVE_ITEM", { error: null, id: d, item: r }), nt(e, n), s(J(r));
    }, l = n.options.server;
    r.origin === $.LOCAL && l && pe(l.remove) && i.remove !== !1 ? (e("DID_START_ITEM_REMOVE", { id: r.id }), l.remove(
      r.source,
      () => a(),
      (d) => {
        e("DID_THROW_ITEM_REMOVE_ERROR", {
          id: r.id,
          error: q("error", 0, d, null),
          status: {
            main: Fe(n.options.labelFileRemoveError)(d),
            sub: n.options.labelTapToRetry
          }
        });
      }
    )) : ((i.revert && r.origin !== $.LOCAL && r.serverId !== null || // if chunked uploads are enabled and we're uploading in chunks for this specific file
    // or if the file isn't big enough for chunked uploads but chunkForce is set then call
    // revert before removing from the view...
    n.options.chunkUploads && r.file.size > n.options.chunkSize || n.options.chunkUploads && n.options.chunkForce) && r.revert(
      be(n.options.server.url, n.options.server.revert),
      t("GET_FORCE_REVERT")
    ), a());
  }),
  ABORT_ITEM_LOAD: ne(n, (r) => {
    r.abortLoad();
  }),
  ABORT_ITEM_PROCESSING: ne(n, (r) => {
    if (r.serverId) {
      e("REVERT_ITEM_PROCESSING", { id: r.id });
      return;
    }
    r.abortProcessing().then(() => {
      n.options.instantUpload && e("REMOVE_ITEM", { query: r.id });
    });
  }),
  REQUEST_REVERT_ITEM_PROCESSING: ne(n, (r) => {
    if (!n.options.instantUpload) {
      e("REVERT_ITEM_PROCESSING", { query: r });
      return;
    }
    const s = (a) => {
      a && e("REVERT_ITEM_PROCESSING", { query: r });
    }, o = t("GET_BEFORE_REMOVE_FILE");
    if (!o)
      return s(!0);
    const i = o(J(r));
    if (i == null)
      return s(!0);
    if (typeof i == "boolean")
      return s(i);
    typeof i.then == "function" && i.then(s);
  }),
  REVERT_ITEM_PROCESSING: ne(n, (r) => {
    r.revert(
      be(n.options.server.url, n.options.server.revert),
      t("GET_FORCE_REVERT")
    ).then(() => {
      (n.options.instantUpload || xs(r)) && e("REMOVE_ITEM", { query: r.id });
    }).catch(() => {
    });
  }),
  SET_OPTIONS: ({ options: r }) => {
    const s = Object.keys(r), o = Ys.filter((a) => s.includes(a));
    [
      // add prioritized first if passed to options, else remove
      ...o,
      // prevent duplicate keys
      ...Object.keys(r).filter((a) => !o.includes(a))
    ].forEach((a) => {
      e(`SET_${Qe(a, "_").toUpperCase()}`, {
        value: r[a]
      });
    });
  }
}), Ys = [
  "server"
  // must be processed before "files"
], Lt = (e) => e, ce = (e) => document.createElement(e), x = (e, t) => {
  let n = e.childNodes[0];
  n ? t !== n.nodeValue && (n.nodeValue = t) : (n = document.createTextNode(t), e.appendChild(n));
}, Jt = (e, t, n, r) => {
  const s = (r % 360 - 90) * Math.PI / 180;
  return {
    x: e + n * Math.cos(s),
    y: t + n * Math.sin(s)
  };
}, $s = (e, t, n, r, s, o) => {
  const i = Jt(e, t, n, s), a = Jt(e, t, n, r);
  return ["M", i.x, i.y, "A", n, n, 0, o, 0, a.x, a.y].join(" ");
}, Ws = (e, t, n, r, s) => {
  let o = 1;
  return s > r && s - r <= 0.5 && (o = 0), r > s && r - s >= 0.5 && (o = 0), $s(
    e,
    t,
    n,
    Math.min(0.9999, r) * 360,
    Math.min(0.9999, s) * 360,
    o
  );
}, zs = ({ root: e, props: t }) => {
  t.spin = !1, t.progress = 0, t.opacity = 0;
  const n = $e("svg");
  e.ref.path = $e("path", {
    "stroke-width": 2,
    "stroke-linecap": "round"
  }), n.appendChild(e.ref.path), e.ref.svg = n, e.appendChild(n);
}, Xs = ({ root: e, props: t }) => {
  if (t.opacity === 0)
    return;
  t.align && (e.element.dataset.align = t.align);
  const n = parseInt(W(e.ref.path, "stroke-width"), 10), r = e.rect.element.width * 0.5;
  let s = 0, o = 0;
  t.spin ? (s = 0, o = 0.5) : (s = 0, o = t.progress);
  const i = Ws(r, r, r - n, s, o);
  W(e.ref.path, "d", i), W(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
}, en = H({
  tag: "div",
  name: "progress-indicator",
  ignoreRectUpdate: !0,
  ignoreRect: !0,
  create: zs,
  write: Xs,
  mixins: {
    apis: ["progress", "spin", "align"],
    styles: ["opacity"],
    animations: {
      opacity: { type: "tween", duration: 500 },
      progress: {
        type: "spring",
        stiffness: 0.95,
        damping: 0.65,
        mass: 10
      }
    }
  }
}), ks = ({ root: e, props: t }) => {
  e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`, t.isDisabled = !1;
}, js = ({ root: e, props: t }) => {
  const { isDisabled: n } = t, r = e.query("GET_DISABLED") || t.opacity === 0;
  r && !n ? (t.isDisabled = !0, W(e.element, "disabled", "disabled")) : !r && n && (t.isDisabled = !1, e.element.removeAttribute("disabled"));
}, qn = H({
  tag: "button",
  attributes: {
    type: "button"
  },
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  name: "file-action-button",
  mixins: {
    apis: ["label"],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    },
    listeners: !0
  },
  create: ks,
  write: js
}), xn = (e, t = ".", n = 1e3, r = {}) => {
  const {
    labelBytes: s = "bytes",
    labelKilobytes: o = "KB",
    labelMegabytes: i = "MB",
    labelGigabytes: a = "GB"
  } = r;
  e = Math.round(Math.abs(e));
  const l = n, d = n * n, c = n * n * n;
  return e < l ? `${e} ${s}` : e < d ? `${Math.floor(e / l)} ${o}` : e < c ? `${tn(e / d, 1, t)} ${i}` : `${tn(e / c, 2, t)} ${a}`;
}, tn = (e, t, n) => e.toFixed(t).split(".").filter((r) => r !== "0").join(n), Qs = ({ root: e, props: t }) => {
  const n = ce("span");
  n.className = "filepond--file-info-main", W(n, "aria-hidden", "true"), e.appendChild(n), e.ref.fileName = n;
  const r = ce("span");
  r.className = "filepond--file-info-sub", e.appendChild(r), e.ref.fileSize = r, x(r, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), x(n, Lt(e.query("GET_ITEM_NAME", t.id)));
}, ct = ({ root: e, props: t }) => {
  x(
    e.ref.fileSize,
    xn(
      e.query("GET_ITEM_SIZE", t.id),
      ".",
      e.query("GET_FILE_SIZE_BASE"),
      e.query("GET_FILE_SIZE_LABELS", e.query)
    )
  ), x(e.ref.fileName, Lt(e.query("GET_ITEM_NAME", t.id)));
}, nn = ({ root: e, props: t }) => {
  if (Le(e.query("GET_ITEM_SIZE", t.id))) {
    ct({ root: e, props: t });
    return;
  }
  x(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
}, Ks = H({
  name: "file-info",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: K({
    DID_LOAD_ITEM: ct,
    DID_UPDATE_ITEM_META: ct,
    DID_THROW_ITEM_LOAD_ERROR: nn,
    DID_THROW_ITEM_INVALID: nn
  }),
  didCreateView: (e) => {
    Re("CREATE_VIEW", { ...e, view: e });
  },
  create: Qs,
  mixins: {
    styles: ["translateX", "translateY"],
    animations: {
      translateX: "spring",
      translateY: "spring"
    }
  }
}), Hn = (e) => Math.round(e * 100), Zs = ({ root: e }) => {
  const t = ce("span");
  t.className = "filepond--file-status-main", e.appendChild(t), e.ref.main = t;
  const n = ce("span");
  n.className = "filepond--file-status-sub", e.appendChild(n), e.ref.sub = n, Yn({ root: e, action: { progress: null } });
}, Yn = ({ root: e, action: t }) => {
  const n = t.progress === null ? e.query("GET_LABEL_FILE_LOADING") : `${e.query("GET_LABEL_FILE_LOADING")} ${Hn(t.progress)}%`;
  x(e.ref.main, n), x(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Js = ({ root: e, action: t }) => {
  const n = t.progress === null ? e.query("GET_LABEL_FILE_PROCESSING") : `${e.query("GET_LABEL_FILE_PROCESSING")} ${Hn(t.progress)}%`;
  x(e.ref.main, n), x(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, ei = ({ root: e }) => {
  x(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")), x(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, ti = ({ root: e }) => {
  x(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")), x(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
}, ni = ({ root: e }) => {
  x(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), x(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
}, rn = ({ root: e }) => {
  x(e.ref.main, ""), x(e.ref.sub, "");
}, Me = ({ root: e, action: t }) => {
  x(e.ref.main, t.status.main), x(e.ref.sub, t.status.sub);
}, ri = H({
  name: "file-status",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: K({
    DID_LOAD_ITEM: rn,
    DID_REVERT_ITEM_PROCESSING: rn,
    DID_REQUEST_ITEM_PROCESSING: ei,
    DID_ABORT_ITEM_PROCESSING: ti,
    DID_COMPLETE_ITEM_PROCESSING: ni,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: Js,
    DID_UPDATE_ITEM_LOAD_PROGRESS: Yn,
    DID_THROW_ITEM_LOAD_ERROR: Me,
    DID_THROW_ITEM_INVALID: Me,
    DID_THROW_ITEM_PROCESSING_ERROR: Me,
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Me,
    DID_THROW_ITEM_REMOVE_ERROR: Me
  }),
  didCreateView: (e) => {
    Re("CREATE_VIEW", { ...e, view: e });
  },
  create: Zs,
  mixins: {
    styles: ["translateX", "translateY", "opacity"],
    animations: {
      opacity: { type: "tween", duration: 250 },
      translateX: "spring",
      translateY: "spring"
    }
  }
}), dt = {
  AbortItemLoad: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
    action: "ABORT_ITEM_LOAD",
    className: "filepond--action-abort-item-load",
    align: "LOAD_INDICATOR_POSITION"
    // right
  },
  RetryItemLoad: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
    action: "RETRY_ITEM_LOAD",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-load",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RemoveItem: {
    label: "GET_LABEL_BUTTON_REMOVE_ITEM",
    action: "REQUEST_REMOVE_ITEM",
    icon: "GET_ICON_REMOVE",
    className: "filepond--action-remove-item",
    align: "BUTTON_REMOVE_ITEM_POSITION"
    // left
  },
  ProcessItem: {
    label: "GET_LABEL_BUTTON_PROCESS_ITEM",
    action: "REQUEST_ITEM_PROCESSING",
    icon: "GET_ICON_PROCESS",
    className: "filepond--action-process-item",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  AbortItemProcessing: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
    action: "ABORT_ITEM_PROCESSING",
    className: "filepond--action-abort-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RetryItemProcessing: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
    action: "RETRY_ITEM_PROCESSING",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RevertItemProcessing: {
    label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
    action: "REQUEST_REVERT_ITEM_PROCESSING",
    icon: "GET_ICON_UNDO",
    className: "filepond--action-revert-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  }
}, ut = [];
V(dt, (e) => {
  ut.push(e);
});
const ee = (e) => {
  if (ft(e) === "right") return 0;
  const t = e.ref.buttonRemoveItem.rect.element;
  return t.hidden ? null : t.width + t.left;
}, si = (e) => e.ref.buttonAbortItemLoad.rect.element.width, Ue = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4), ii = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2), oi = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"), li = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), ft = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"), ai = {
  buttonAbortItemLoad: { opacity: 0 },
  buttonRetryItemLoad: { opacity: 0 },
  buttonRemoveItem: { opacity: 0 },
  buttonProcessItem: { opacity: 0 },
  buttonAbortItemProcessing: { opacity: 0 },
  buttonRetryItemProcessing: { opacity: 0 },
  buttonRevertItemProcessing: { opacity: 0 },
  loadProgressIndicator: { opacity: 0, align: oi },
  processProgressIndicator: { opacity: 0, align: li },
  processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
  info: { translateX: 0, translateY: 0, opacity: 0 },
  status: { translateX: 0, translateY: 0, opacity: 0 }
}, sn = {
  buttonRemoveItem: { opacity: 1 },
  buttonProcessItem: { opacity: 1 },
  info: { translateX: ee },
  status: { translateX: ee }
}, st = {
  buttonAbortItemProcessing: { opacity: 1 },
  processProgressIndicator: { opacity: 1 },
  status: { opacity: 1 }
}, Se = {
  DID_THROW_ITEM_INVALID: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: ee },
    status: { translateX: ee, opacity: 1 }
  },
  DID_START_ITEM_LOAD: {
    buttonAbortItemLoad: { opacity: 1 },
    loadProgressIndicator: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_LOAD_ERROR: {
    buttonRetryItemLoad: { opacity: 1 },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: ee },
    status: { opacity: 1 }
  },
  DID_START_ITEM_REMOVE: {
    processProgressIndicator: { opacity: 1, align: ft },
    info: { translateX: ee },
    status: { opacity: 0 }
  },
  DID_THROW_ITEM_REMOVE_ERROR: {
    processProgressIndicator: { opacity: 0, align: ft },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: ee },
    status: { opacity: 1, translateX: ee }
  },
  DID_LOAD_ITEM: sn,
  DID_LOAD_LOCAL_ITEM: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: ee },
    status: { translateX: ee }
  },
  DID_START_ITEM_PROCESSING: st,
  DID_REQUEST_ITEM_PROCESSING: st,
  DID_UPDATE_ITEM_PROCESS_PROGRESS: st,
  DID_COMPLETE_ITEM_PROCESSING: {
    buttonRevertItemProcessing: { opacity: 1 },
    info: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_PROCESSING_ERROR: {
    buttonRemoveItem: { opacity: 1 },
    buttonRetryItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { translateX: ee }
  },
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
    buttonRevertItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { opacity: 1 }
  },
  DID_ABORT_ITEM_PROCESSING: {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: ee },
    status: { opacity: 1 }
  },
  DID_REVERT_ITEM_PROCESSING: sn
}, ci = H({
  create: ({ root: e }) => {
    e.element.innerHTML = e.query("GET_ICON_DONE");
  },
  name: "processing-complete-indicator",
  ignoreRect: !0,
  mixins: {
    styles: ["scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
}), di = ({ root: e, props: t }) => {
  const n = Object.keys(dt).reduce((u, _) => (u[_] = { ...dt[_] }, u), {}), { id: r } = t, s = e.query("GET_ALLOW_REVERT"), o = e.query("GET_ALLOW_REMOVE"), i = e.query("GET_ALLOW_PROCESS"), a = e.query("GET_INSTANT_UPLOAD"), l = e.query("IS_ASYNC"), d = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let c;
  l ? i && !s ? c = (u) => !/RevertItemProcessing/.test(u) : !i && s ? c = (u) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(u) : !i && !s && (c = (u) => !/Process/.test(u)) : c = (u) => !/Process/.test(u);
  const f = c ? ut.filter(c) : ut.concat();
  if (a && s && (n.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", n.RevertItemProcessing.icon = "GET_ICON_REMOVE"), l && !s) {
    const u = Se.DID_COMPLETE_ITEM_PROCESSING;
    u.info.translateX = ii, u.info.translateY = Ue, u.status.translateY = Ue, u.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (l && !i && ([
    "DID_START_ITEM_PROCESSING",
    "DID_REQUEST_ITEM_PROCESSING",
    "DID_UPDATE_ITEM_PROCESS_PROGRESS",
    "DID_THROW_ITEM_PROCESSING_ERROR"
  ].forEach((u) => {
    Se[u].status.translateY = Ue;
  }), Se.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = si), d && s) {
    n.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
    const u = Se.DID_COMPLETE_ITEM_PROCESSING;
    u.info.translateX = ee, u.status.translateY = Ue, u.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  o || (n.RemoveItem.disabled = !0), V(n, (u, _) => {
    const D = e.createChildView(qn, {
      label: e.query(_.label),
      icon: e.query(_.icon),
      opacity: 0
    });
    f.includes(u) && e.appendChildView(D), _.disabled && (D.element.setAttribute("disabled", "disabled"), D.element.setAttribute("hidden", "hidden")), D.element.dataset.align = e.query(`GET_STYLE_${_.align}`), D.element.classList.add(_.className), D.on("click", (R) => {
      R.stopPropagation(), !_.disabled && e.dispatch(_.action, { query: r });
    }), e.ref[`button${u}`] = D;
  }), e.ref.processingCompleteIndicator = e.appendChildView(
    e.createChildView(ci)
  ), e.ref.processingCompleteIndicator.element.dataset.align = e.query(
    "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
  ), e.ref.info = e.appendChildView(e.createChildView(Ks, { id: r })), e.ref.status = e.appendChildView(e.createChildView(ri, { id: r }));
  const E = e.appendChildView(
    e.createChildView(en, {
      opacity: 0,
      align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION")
    })
  );
  E.element.classList.add("filepond--load-indicator"), e.ref.loadProgressIndicator = E;
  const T = e.appendChildView(
    e.createChildView(en, {
      opacity: 0,
      align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION")
    })
  );
  T.element.classList.add("filepond--process-indicator"), e.ref.processProgressIndicator = T, e.ref.activeStyles = [];
}, ui = ({ root: e, actions: t, props: n }) => {
  fi({ root: e, actions: t, props: n });
  let r = t.concat().filter((s) => /^DID_/.test(s.type)).reverse().find((s) => Se[s.type]);
  if (r) {
    e.ref.activeStyles = [];
    const s = Se[r.type];
    V(ai, (o, i) => {
      const a = e.ref[o];
      V(i, (l, d) => {
        const c = s[o] && typeof s[o][l] < "u" ? s[o][l] : d;
        e.ref.activeStyles.push({ control: a, key: l, value: c });
      });
    });
  }
  e.ref.activeStyles.forEach(({ control: s, key: o, value: i }) => {
    s[o] = typeof i == "function" ? i(e) : i;
  });
}, fi = K({
  DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemProcessing.label = t.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemLoad.label = t.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemRemoval.label = t.value;
  },
  DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
    e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
  },
  DID_START_ITEM_LOAD: ({ root: e }) => {
    e.ref.loadProgressIndicator.spin = !0, e.ref.loadProgressIndicator.progress = 0;
  },
  DID_START_ITEM_REMOVE: ({ root: e }) => {
    e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
  },
  DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
    e.ref.loadProgressIndicator.spin = !1, e.ref.loadProgressIndicator.progress = t.progress;
  },
  DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
    e.ref.processProgressIndicator.spin = !1, e.ref.processProgressIndicator.progress = t.progress;
  }
}), Ei = H({
  create: di,
  write: ui,
  didCreateView: (e) => {
    Re("CREATE_VIEW", { ...e, view: e });
  },
  name: "file"
}), pi = ({ root: e, props: t }) => {
  e.ref.fileName = ce("legend"), e.appendChild(e.ref.fileName), e.ref.file = e.appendChildView(e.createChildView(Ei, { id: t.id })), e.ref.data = !1;
}, Ii = ({ root: e, props: t }) => {
  x(e.ref.fileName, Lt(e.query("GET_ITEM_NAME", t.id)));
}, _i = H({
  create: pi,
  ignoreRect: !0,
  write: K({
    DID_LOAD_ITEM: Ii
  }),
  didCreateView: (e) => {
    Re("CREATE_VIEW", { ...e, view: e });
  },
  tag: "fieldset",
  name: "file-wrapper"
}), on = { type: "spring", damping: 0.6, mass: 7 }, Ti = ({ root: e, props: t }) => {
  [
    {
      name: "top"
    },
    {
      name: "center",
      props: {
        translateY: null,
        scaleY: null
      },
      mixins: {
        animations: {
          scaleY: on
        },
        styles: ["translateY", "scaleY"]
      }
    },
    {
      name: "bottom",
      props: {
        translateY: null
      },
      mixins: {
        animations: {
          translateY: on
        },
        styles: ["translateY"]
      }
    }
  ].forEach((n) => {
    mi(e, n, t.name);
  }), e.element.classList.add(`filepond--${t.name}`), e.ref.scalable = null;
}, mi = (e, t, n) => {
  const r = H({
    name: `panel-${t.name} filepond--${n}`,
    mixins: t.mixins,
    ignoreRectUpdate: !0
  }), s = e.createChildView(r, t.props);
  e.ref[t.name] = e.appendChildView(s);
}, gi = ({ root: e, props: t }) => {
  if ((e.ref.scalable === null || t.scalable !== e.ref.scalable) && (e.ref.scalable = Sn(t.scalable) ? t.scalable : !0, e.element.dataset.scalable = e.ref.scalable), !t.height) return;
  const n = e.ref.top.rect.element, r = e.ref.bottom.rect.element, s = Math.max(n.height + r.height, t.height);
  e.ref.center.translateY = n.height, e.ref.center.scaleY = (s - n.height - r.height) / 100, e.ref.bottom.translateY = s - r.height;
}, $n = H({
  name: "panel",
  read: ({ root: e, props: t }) => t.heightCurrent = e.ref.bottom.translateY,
  write: gi,
  create: Ti,
  ignoreRect: !0,
  mixins: {
    apis: ["height", "heightCurrent", "scalable"]
  }
}), Ri = (e) => {
  const t = e.map((r) => r.id);
  let n;
  return {
    setIndex: (r) => {
      n = r;
    },
    getIndex: () => n,
    getItemIndex: (r) => t.indexOf(r.id)
  };
}, ln = {
  type: "spring",
  stiffness: 0.75,
  damping: 0.45,
  mass: 10
}, an = "spring", cn = {
  DID_START_ITEM_LOAD: "busy",
  DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
  DID_THROW_ITEM_INVALID: "load-invalid",
  DID_THROW_ITEM_LOAD_ERROR: "load-error",
  DID_LOAD_ITEM: "idle",
  DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
  DID_START_ITEM_REMOVE: "busy",
  DID_START_ITEM_PROCESSING: "busy processing",
  DID_REQUEST_ITEM_PROCESSING: "busy processing",
  DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
  DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
  DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
  DID_ABORT_ITEM_PROCESSING: "cancelled",
  DID_REVERT_ITEM_PROCESSING: "idle"
}, hi = ({ root: e, props: t }) => {
  if (e.ref.handleClick = (r) => e.dispatch("DID_ACTIVATE_ITEM", { id: t.id }), e.element.id = `filepond--item-${t.id}`, e.element.addEventListener("click", e.ref.handleClick), e.ref.container = e.appendChildView(e.createChildView(_i, { id: t.id })), e.ref.panel = e.appendChildView(e.createChildView($n, { name: "item-panel" })), e.ref.panel.height = null, t.markedForRemoval = !1, !e.query("GET_ALLOW_REORDER")) return;
  e.element.dataset.dragState = "idle";
  const n = (r) => {
    if (!r.isPrimary) return;
    let s = !1;
    const o = {
      x: r.pageX,
      y: r.pageY
    };
    t.dragOrigin = {
      x: e.translateX,
      y: e.translateY
    }, t.dragCenter = {
      x: r.offsetX,
      y: r.offsetY
    };
    const i = Ri(e.query("GET_ACTIVE_ITEMS"));
    e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: i });
    const a = (f) => {
      if (!f.isPrimary) return;
      f.stopPropagation(), f.preventDefault(), t.dragOffset = {
        x: f.pageX - o.x,
        y: f.pageY - o.y
      }, t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y > 16 && !s && (s = !0, e.element.removeEventListener("click", e.ref.handleClick)), e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: i });
    }, l = (f) => {
      f.isPrimary && (t.dragOffset = {
        x: f.pageX - o.x,
        y: f.pageY - o.y
      }, c());
    }, d = () => {
      c();
    }, c = () => {
      document.removeEventListener("pointercancel", d), document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", l), e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: i }), s && setTimeout(() => e.element.addEventListener("click", e.ref.handleClick), 0);
    };
    document.addEventListener("pointercancel", d), document.addEventListener("pointermove", a), document.addEventListener("pointerup", l);
  };
  e.element.addEventListener("pointerdown", n);
}, Oi = K({
  DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
    e.height = t.height;
  }
}), Di = K(
  {
    DID_GRAB_ITEM: ({ root: e, props: t }) => {
      t.dragOrigin = {
        x: e.translateX,
        y: e.translateY
      };
    },
    DID_DRAG_ITEM: ({ root: e }) => {
      e.element.dataset.dragState = "drag";
    },
    DID_DROP_ITEM: ({ root: e, props: t }) => {
      t.dragOffset = null, t.dragOrigin = null, e.element.dataset.dragState = "drop";
    }
  },
  ({ root: e, actions: t, props: n, shouldOptimize: r }) => {
    e.element.dataset.dragState === "drop" && e.scaleX <= 1 && (e.element.dataset.dragState = "idle");
    let s = t.concat().filter((i) => /^DID_/.test(i.type)).reverse().find((i) => cn[i.type]);
    s && s.type !== n.currentState && (n.currentState = s.type, e.element.dataset.filepondItemState = cn[n.currentState] || "");
    const o = e.query("GET_ITEM_PANEL_ASPECT_RATIO") || e.query("GET_PANEL_ASPECT_RATIO");
    o ? r || (e.height = e.rect.element.width * o) : (Oi({ root: e, actions: t, props: n }), !e.height && e.ref.container.rect.element.height > 0 && (e.height = e.ref.container.rect.element.height)), r && (e.ref.panel.height = null), e.ref.panel.height = e.height;
  }
), Si = H({
  create: hi,
  write: Di,
  destroy: ({ root: e, props: t }) => {
    e.element.removeEventListener("click", e.ref.handleClick), e.dispatch("RELEASE_ITEM", { query: t.id });
  },
  tag: "li",
  name: "item",
  mixins: {
    apis: [
      "id",
      "interactionMethod",
      "markedForRemoval",
      "spawnDate",
      "dragCenter",
      "dragOrigin",
      "dragOffset"
    ],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
    animations: {
      scaleX: an,
      scaleY: an,
      translateX: ln,
      translateY: ln,
      opacity: { type: "tween", duration: 150 }
    }
  }
});
var Pt = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const bt = (e, t, n) => {
  if (!n) return;
  const r = e.rect.element.width, s = t.length;
  let o = null;
  if (s === 0 || n.top < t[0].rect.element.top) return -1;
  const a = t[0].rect.element, l = a.marginLeft + a.marginRight, d = a.width + l, c = Pt(r, d);
  if (c === 1) {
    for (let T = 0; T < s; T++) {
      const u = t[T], _ = u.rect.outer.top + u.rect.element.height * 0.5;
      if (n.top < _)
        return T;
    }
    return s;
  }
  const f = a.marginTop + a.marginBottom, E = a.height + f;
  for (let T = 0; T < s; T++) {
    const u = T % c, _ = Math.floor(T / c), D = u * d, R = _ * E, O = R - a.marginTop, L = D + d, P = R + E + a.marginBottom;
    if (n.top < P && n.top > O) {
      if (n.left < L)
        return T;
      T !== s - 1 ? o = T : o = null;
    }
  }
  return o !== null ? o : s;
}, Be = {
  height: 0,
  width: 0,
  get getHeight() {
    return this.height;
  },
  set setHeight(e) {
    (this.height === 0 || e === 0) && (this.height = e);
  },
  get getWidth() {
    return this.width;
  },
  set setWidth(e) {
    (this.width === 0 || e === 0) && (this.width = e);
  }
}, Ai = ({ root: e }) => {
  W(e.element, "role", "list"), e.ref.lastItemSpanwDate = Date.now();
}, yi = ({ root: e, action: t }) => {
  const { id: n, index: r, interactionMethod: s } = t;
  e.ref.addIndex = r;
  const o = Date.now();
  let i = o, a = 1;
  if (s !== re.NONE) {
    a = 0;
    const l = e.query("GET_ITEM_INSERT_INTERVAL"), d = o - e.ref.lastItemSpanwDate;
    i = d < l ? o + (l - d) : o;
  }
  e.ref.lastItemSpanwDate = i, e.appendChildView(
    e.createChildView(
      // view type
      Si,
      // props
      {
        spawnDate: i,
        id: n,
        opacity: a,
        interactionMethod: s
      }
    ),
    r
  );
}, dn = (e, t, n, r = 0, s = 1) => {
  e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = n, Date.now() > e.spawnDate && (e.opacity === 0 && Li(e, t, n, r, s), e.scaleX = 1, e.scaleY = 1, e.opacity = 1));
}, Li = (e, t, n, r, s) => {
  e.interactionMethod === re.NONE ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = n) : e.interactionMethod === re.DROP ? (e.translateX = null, e.translateX = t - r * 20, e.translateY = null, e.translateY = n - s * 10, e.scaleX = 0.8, e.scaleY = 0.8) : e.interactionMethod === re.BROWSE ? (e.translateY = null, e.translateY = n - 30) : e.interactionMethod === re.API && (e.translateX = null, e.translateX = t - 30, e.translateY = null);
}, Pi = ({ root: e, action: t }) => {
  const { id: n } = t, r = e.childViews.find((s) => s.id === n);
  r && (r.scaleX = 0.9, r.scaleY = 0.9, r.opacity = 0, r.markedForRemoval = !0);
}, it = (e) => e.rect.element.height + e.rect.element.marginBottom * 0.5 + e.rect.element.marginTop * 0.5, bi = (e) => e.rect.element.width + e.rect.element.marginLeft * 0.5 + e.rect.element.marginRight * 0.5, Mi = ({ root: e, action: t }) => {
  const { id: n, dragState: r } = t, s = e.query("GET_ITEM", { id: n }), o = e.childViews.find((D) => D.id === n), i = e.childViews.length, a = r.getItemIndex(s);
  if (!o) return;
  const l = {
    x: o.dragOrigin.x + o.dragOffset.x + o.dragCenter.x,
    y: o.dragOrigin.y + o.dragOffset.y + o.dragCenter.y
  }, d = it(o), c = bi(o);
  let f = Math.floor(e.rect.outer.width / c);
  f > i && (f = i);
  const E = Math.floor(i / f + 1);
  Be.setHeight = d * E, Be.setWidth = c * f;
  var T = {
    y: Math.floor(l.y / d),
    x: Math.floor(l.x / c),
    getGridIndex: function() {
      return l.y > Be.getHeight || l.y < 0 || l.x > Be.getWidth || l.x < 0 ? a : this.y * f + this.x;
    },
    getColIndex: function() {
      const R = e.query("GET_ACTIVE_ITEMS"), O = e.childViews.filter((A) => A.rect.element.height), L = R.map(
        (A) => O.find((v) => v.id === A.id)
      ), P = L.findIndex((A) => A === o), S = it(o), N = L.length;
      let B = N, h = 0, M = 0, F = 0;
      for (let A = 0; A < N; A++)
        if (h = it(L[A]), F = M, M = F + h, l.y < M) {
          if (P > A) {
            if (l.y < F + S) {
              B = A;
              break;
            }
            continue;
          }
          B = A;
          break;
        }
      return B;
    }
  };
  const u = f > 1 ? T.getGridIndex() : T.getColIndex();
  e.dispatch("MOVE_ITEM", { query: o, index: u });
  const _ = r.getIndex();
  if (_ === void 0 || _ !== u) {
    if (r.setIndex(u), _ === void 0) return;
    e.dispatch("DID_REORDER_ITEMS", {
      items: e.query("GET_ACTIVE_ITEMS"),
      origin: a,
      target: u
    });
  }
}, Ci = K({
  DID_ADD_ITEM: yi,
  DID_REMOVE_ITEM: Pi,
  DID_DRAG_ITEM: Mi
}), Ni = ({ root: e, props: t, actions: n, shouldOptimize: r }) => {
  Ci({ root: e, props: t, actions: n });
  const { dragCoordinates: s } = t, o = e.rect.element.width, i = e.childViews.filter((L) => L.rect.element.height), a = e.query("GET_ACTIVE_ITEMS").map((L) => i.find((P) => P.id === L.id)).filter((L) => L), l = s ? bt(e, a, s) : null, d = e.ref.addIndex || null;
  e.ref.addIndex = null;
  let c = 0, f = 0, E = 0;
  if (a.length === 0) return;
  const T = a[0].rect.element, u = T.marginTop + T.marginBottom, _ = T.marginLeft + T.marginRight, D = T.width + _, R = T.height + u, O = Pt(o, D);
  if (O === 1) {
    let L = 0, P = 0;
    a.forEach((S, N) => {
      if (l) {
        let M = N - l;
        M === -2 ? P = -u * 0.25 : M === -1 ? P = -u * 0.75 : M === 0 ? P = u * 0.75 : M === 1 ? P = u * 0.25 : P = 0;
      }
      r && (S.translateX = null, S.translateY = null), S.markedForRemoval || dn(S, 0, L + P);
      let h = (S.rect.element.height + u) * (S.markedForRemoval ? S.opacity : 1);
      L += h;
    });
  } else {
    let L = 0, P = 0;
    a.forEach((S, N) => {
      N === l && (c = 1), N === d && (E += 1), S.markedForRemoval && S.opacity < 0.5 && (f -= 1);
      const B = N + E + c + f, h = B % O, M = Math.floor(B / O), F = h * D, A = M * R, v = Math.sign(F - L), X = Math.sign(A - P);
      L = F, P = A, !S.markedForRemoval && (r && (S.translateX = null, S.translateY = null), dn(S, F, A, v, X));
    });
  }
}, vi = (e, t) => t.filter((n) => n.data && n.data.id ? e.id === n.data.id : !0), wi = H({
  create: Ai,
  write: Ni,
  tag: "ul",
  name: "list",
  didWriteView: ({ root: e }) => {
    e.childViews.filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting).forEach((t) => {
      t._destroy(), e.removeChildView(t);
    });
  },
  filterFrameActionsForChild: vi,
  mixins: {
    apis: ["dragCoordinates"]
  }
}), Gi = ({ root: e, props: t }) => {
  e.ref.list = e.appendChildView(e.createChildView(wi)), t.dragCoordinates = null, t.overflowing = !1;
}, Fi = ({ root: e, props: t, action: n }) => {
  e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (t.dragCoordinates = {
    left: n.position.scopeLeft - e.ref.list.rect.element.left,
    top: n.position.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop)
  });
}, Ui = ({ props: e }) => {
  e.dragCoordinates = null;
}, Bi = K({
  DID_DRAG: Fi,
  DID_END_DRAG: Ui
}), Vi = ({ root: e, props: t, actions: n }) => {
  if (Bi({ root: e, props: t, actions: n }), e.ref.list.dragCoordinates = t.dragCoordinates, t.overflowing && !t.overflow && (t.overflowing = !1, e.element.dataset.state = "", e.height = null), t.overflow) {
    const r = Math.round(t.overflow);
    r !== e.height && (t.overflowing = !0, e.element.dataset.state = "overflow", e.height = r);
  }
}, qi = H({
  create: Gi,
  write: Vi,
  name: "list-scroller",
  mixins: {
    apis: ["overflow", "dragCoordinates"],
    styles: ["height", "translateY"],
    animations: {
      translateY: "spring"
    }
  }
}), oe = (e, t, n, r = "") => {
  n ? W(e, t, r) : e.removeAttribute(t);
}, xi = (e) => {
  if (!(!e || e.value === "")) {
    try {
      e.value = "";
    } catch {
    }
    if (e.value) {
      const t = ce("form"), n = e.parentNode, r = e.nextSibling;
      t.appendChild(e), t.reset(), r ? n.insertBefore(e, r) : n.appendChild(e);
    }
  }
}, Hi = ({ root: e, props: t }) => {
  e.element.id = `filepond--browser-${t.id}`, W(e.element, "name", e.query("GET_NAME")), W(e.element, "aria-controls", `filepond--assistant-${t.id}`), W(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`), Wn({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }), zn({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }), Xn({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }), Et({ root: e }), kn({ root: e, action: { value: e.query("GET_REQUIRED") } }), jn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }), e.ref.handleChange = (n) => {
    if (!e.element.value)
      return;
    const r = Array.from(e.element.files).map((s) => (s._relativePath = s.webkitRelativePath, s));
    setTimeout(() => {
      t.onload(r), xi(e.element);
    }, 250);
  }, e.element.addEventListener("change", e.ref.handleChange);
}, Wn = ({ root: e, action: t }) => {
  e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && oe(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
}, zn = ({ root: e, action: t }) => {
  oe(e.element, "multiple", t.value);
}, Xn = ({ root: e, action: t }) => {
  oe(e.element, "webkitdirectory", t.value);
}, Et = ({ root: e }) => {
  const t = e.query("GET_DISABLED"), n = e.query("GET_ALLOW_BROWSE"), r = t || !n;
  oe(e.element, "disabled", r);
}, kn = ({ root: e, action: t }) => {
  t.value ? e.query("GET_TOTAL_ITEMS") === 0 && oe(e.element, "required", !0) : oe(e.element, "required", !1);
}, jn = ({ root: e, action: t }) => {
  oe(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
}, un = ({ root: e }) => {
  const { element: t } = e;
  if (e.query("GET_TOTAL_ITEMS") > 0) {
    oe(t, "required", !1), oe(t, "name", !1);
    const n = e.query("GET_ACTIVE_ITEMS");
    let r = !1;
    for (let s = 0; s < n.length; s++)
      n[s].status === C.LOAD_ERROR && (r = !0);
    e.element.setCustomValidity(
      r ? e.query("GET_LABEL_INVALID_FIELD") : ""
    );
  } else
    oe(t, "name", !0, e.query("GET_NAME")), e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""), e.query("GET_REQUIRED") && oe(t, "required", !0);
}, Yi = ({ root: e }) => {
  e.query("GET_CHECK_VALIDITY") && e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
}, $i = H({
  tag: "input",
  name: "browser",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  attributes: {
    type: "file"
  },
  create: Hi,
  destroy: ({ root: e }) => {
    e.element.removeEventListener("change", e.ref.handleChange);
  },
  write: K({
    DID_LOAD_ITEM: un,
    DID_REMOVE_ITEM: un,
    DID_THROW_ITEM_INVALID: Yi,
    DID_SET_DISABLED: Et,
    DID_SET_ALLOW_BROWSE: Et,
    DID_SET_ALLOW_DIRECTORIES_ONLY: Xn,
    DID_SET_ALLOW_MULTIPLE: zn,
    DID_SET_ACCEPTED_FILE_TYPES: Wn,
    DID_SET_CAPTURE_METHOD: jn,
    DID_SET_REQUIRED: kn
  })
}), fn = {
  ENTER: 13,
  SPACE: 32
}, Wi = ({ root: e, props: t }) => {
  const n = ce("label");
  W(n, "for", `filepond--browser-${t.id}`), W(n, "id", `filepond--drop-label-${t.id}`), e.ref.handleKeyDown = (r) => {
    (r.keyCode === fn.ENTER || r.keyCode === fn.SPACE) && (r.preventDefault(), e.ref.label.click());
  }, e.ref.handleClick = (r) => {
    r.target === n || n.contains(r.target) || e.ref.label.click();
  }, n.addEventListener("keydown", e.ref.handleKeyDown), e.element.addEventListener("click", e.ref.handleClick), Qn(n, t.caption), e.appendChild(n), e.ref.label = n;
}, Qn = (e, t) => {
  e.innerHTML = t;
  const n = e.querySelector(".filepond--label-action");
  return n && W(n, "tabindex", "0"), t;
}, zi = H({
  name: "drop-label",
  ignoreRect: !0,
  create: Wi,
  destroy: ({ root: e }) => {
    e.ref.label.addEventListener("keydown", e.ref.handleKeyDown), e.element.removeEventListener("click", e.ref.handleClick);
  },
  write: K({
    DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
      Qn(e.ref.label, t.value);
    }
  }),
  mixins: {
    styles: ["opacity", "translateX", "translateY"],
    animations: {
      opacity: { type: "tween", duration: 150 },
      translateX: "spring",
      translateY: "spring"
    }
  }
}), Xi = H({
  name: "drip-blob",
  ignoreRect: !0,
  mixins: {
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
}), ki = ({ root: e }) => {
  const t = e.rect.element.width * 0.5, n = e.rect.element.height * 0.5;
  e.ref.blob = e.appendChildView(
    e.createChildView(Xi, {
      opacity: 0,
      scaleX: 2.5,
      scaleY: 2.5,
      translateX: t,
      translateY: n
    })
  );
}, ji = ({ root: e, action: t }) => {
  if (!e.ref.blob) {
    ki({ root: e });
    return;
  }
  e.ref.blob.translateX = t.position.scopeLeft, e.ref.blob.translateY = t.position.scopeTop, e.ref.blob.scaleX = 1, e.ref.blob.scaleY = 1, e.ref.blob.opacity = 1;
}, Qi = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.opacity = 0);
}, Ki = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.scaleX = 2.5, e.ref.blob.scaleY = 2.5, e.ref.blob.opacity = 0);
}, Zi = ({ root: e, props: t, actions: n }) => {
  Ji({ root: e, props: t, actions: n });
  const { blob: r } = e.ref;
  n.length === 0 && r && r.opacity === 0 && (e.removeChildView(r), e.ref.blob = null);
}, Ji = K({
  DID_DRAG: ji,
  DID_DROP: Ki,
  DID_END_DRAG: Qi
}), eo = H({
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  name: "drip",
  write: Zi
}), Kn = (e, t) => {
  try {
    const n = new DataTransfer();
    t.forEach((r) => {
      r instanceof File ? n.items.add(r) : n.items.add(
        new File([r], r.name, {
          type: r.type
        })
      );
    }), e.files = n.files;
  } catch {
    return !1;
  }
  return !0;
}, to = ({ root: e }) => {
  e.ref.fields = {};
  const t = document.createElement("legend");
  t.textContent = "Files", e.element.appendChild(t);
}, Je = (e, t) => e.ref.fields[t], Mt = (e) => {
  e.query("GET_ACTIVE_ITEMS").forEach((t) => {
    e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
  });
}, En = ({ root: e }) => Mt(e), no = ({ root: e, action: t }) => {
  const s = !(e.query("GET_ITEM", t.id).origin === $.LOCAL) && e.query("SHOULD_UPDATE_FILE_INPUT"), o = ce("input");
  o.type = s ? "file" : "hidden", o.name = e.query("GET_NAME"), e.ref.fields[t.id] = o, Mt(e);
}, ro = ({ root: e, action: t }) => {
  const n = Je(e, t.id);
  if (!n || (t.serverFileReference !== null && (n.value = t.serverFileReference), !e.query("SHOULD_UPDATE_FILE_INPUT"))) return;
  const r = e.query("GET_ITEM", t.id);
  Kn(n, [r.file]);
}, so = ({ root: e, action: t }) => {
  e.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(() => {
    const n = Je(e, t.id);
    n && Kn(n, [t.file]);
  }, 0);
}, io = ({ root: e }) => {
  e.element.disabled = e.query("GET_DISABLED");
}, oo = ({ root: e, action: t }) => {
  const n = Je(e, t.id);
  n && (n.parentNode && n.parentNode.removeChild(n), delete e.ref.fields[t.id]);
}, lo = ({ root: e, action: t }) => {
  const n = Je(e, t.id);
  n && (t.value === null ? n.removeAttribute("value") : n.type != "file" && (n.value = t.value), Mt(e));
}, ao = K({
  DID_SET_DISABLED: io,
  DID_ADD_ITEM: no,
  DID_LOAD_ITEM: ro,
  DID_REMOVE_ITEM: oo,
  DID_DEFINE_VALUE: lo,
  DID_PREPARE_OUTPUT: so,
  DID_REORDER_ITEMS: En,
  DID_SORT_ITEMS: En
}), co = H({
  tag: "fieldset",
  name: "data",
  create: to,
  write: ao,
  ignoreRect: !0
}), uo = (e) => "getRootNode" in e ? e.getRootNode() : document, fo = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Eo = ["css", "csv", "html", "txt"], po = {
  zip: "zip|compressed",
  epub: "application/epub+zip"
}, Zn = (e = "") => (e = e.toLowerCase(), fo.includes(e) ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e) : Eo.includes(e) ? "text/" + e : po[e] || ""), Ct = (e) => new Promise((t, n) => {
  const r = Oo(e);
  if (r.length && !Io(e))
    return t(r);
  _o(e).then(t);
}), Io = (e) => e.files ? e.files.length > 0 : !1, _o = (e) => new Promise((t, n) => {
  const r = (e.items ? Array.from(e.items) : []).filter((s) => To(s)).map((s) => mo(s));
  if (!r.length) {
    t(e.files ? Array.from(e.files) : []);
    return;
  }
  Promise.all(r).then((s) => {
    const o = [];
    s.forEach((i) => {
      o.push.apply(o, i);
    }), t(
      o.filter((i) => i).map((i) => (i._relativePath || (i._relativePath = i.webkitRelativePath), i))
    );
  }).catch(console.error);
}), To = (e) => {
  if (Jn(e)) {
    const t = Nt(e);
    if (t)
      return t.isFile || t.isDirectory;
  }
  return e.kind === "file";
}, mo = (e) => new Promise((t, n) => {
  if (ho(e)) {
    go(Nt(e)).then(t).catch(n);
    return;
  }
  t([e.getAsFile()]);
}), go = (e) => new Promise((t, n) => {
  const r = [];
  let s = 0, o = 0;
  const i = () => {
    o === 0 && s === 0 && t(r);
  }, a = (l) => {
    s++;
    const d = l.createReader(), c = () => {
      d.readEntries((f) => {
        if (f.length === 0) {
          s--, i();
          return;
        }
        f.forEach((E) => {
          E.isDirectory ? a(E) : (o++, E.file((T) => {
            const u = Ro(T);
            E.fullPath && (u._relativePath = E.fullPath), r.push(u), o--, i();
          }));
        }), c();
      }, n);
    };
    c();
  };
  a(e);
}), Ro = (e) => {
  if (e.type.length) return e;
  const t = e.lastModifiedDate, n = e.name, r = Zn(Ze(e.name));
  return r.length && (e = e.slice(0, e.size, r), e.name = n, e.lastModifiedDate = t), e;
}, ho = (e) => Jn(e) && (Nt(e) || {}).isDirectory, Jn = (e) => "webkitGetAsEntry" in e, Nt = (e) => e.webkitGetAsEntry(), Oo = (e) => {
  let t = [];
  try {
    if (t = So(e), t.length)
      return t;
    t = Do(e);
  } catch {
  }
  return t;
}, Do = (e) => {
  let t = e.getData("url");
  return typeof t == "string" && t.length ? [t] : [];
}, So = (e) => {
  let t = e.getData("text/html");
  if (typeof t == "string" && t.length) {
    const n = t.match(/src\s*=\s*"(.+?)"/);
    if (n)
      return [n[1]];
  }
  return [];
}, ze = [], ge = (e) => ({
  pageLeft: e.pageX,
  pageTop: e.pageY,
  scopeLeft: e.offsetX || e.layerX,
  scopeTop: e.offsetY || e.layerY
}), Ao = (e, t, n) => {
  const r = yo(t), s = {
    element: e,
    filterElement: n,
    state: null,
    ondrop: () => {
    },
    onenter: () => {
    },
    ondrag: () => {
    },
    onexit: () => {
    },
    onload: () => {
    },
    allowdrop: () => {
    }
  };
  return s.destroy = r.addListener(s), s;
}, yo = (e) => {
  const t = ze.find((r) => r.element === e);
  if (t)
    return t;
  const n = Lo(e);
  return ze.push(n), n;
}, Lo = (e) => {
  const t = [], n = {
    dragenter: bo,
    dragover: Mo,
    dragleave: No,
    drop: Co
  }, r = {};
  V(n, (o, i) => {
    r[o] = i(e, t), e.addEventListener(o, r[o], !1);
  });
  const s = {
    element: e,
    addListener: (o) => (t.push(o), () => {
      t.splice(t.indexOf(o), 1), t.length === 0 && (ze.splice(ze.indexOf(s), 1), V(n, (i) => {
        e.removeEventListener(i, r[i], !1);
      }));
    })
  };
  return s;
}, Po = (e, t) => ("elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)), vt = (e, t) => {
  const n = uo(t), r = Po(n, {
    x: e.pageX - window.pageXOffset,
    y: e.pageY - window.pageYOffset
  });
  return r === t || t.contains(r);
};
let er = null;
const Ve = (e, t) => {
  try {
    e.dropEffect = t;
  } catch {
  }
}, bo = (e, t) => (n) => {
  n.preventDefault(), er = n.target, t.forEach((r) => {
    const { element: s, onenter: o } = r;
    vt(n, s) && (r.state = "enter", o(ge(n)));
  });
}, Mo = (e, t) => (n) => {
  n.preventDefault();
  const r = n.dataTransfer;
  Ct(r).then((s) => {
    let o = !1;
    t.some((i) => {
      const { filterElement: a, element: l, onenter: d, onexit: c, ondrag: f, allowdrop: E } = i;
      Ve(r, "copy");
      const T = E(s);
      if (!T) {
        Ve(r, "none");
        return;
      }
      if (vt(n, l)) {
        if (o = !0, i.state === null) {
          i.state = "enter", d(ge(n));
          return;
        }
        if (i.state = "over", a && !T) {
          Ve(r, "none");
          return;
        }
        f(ge(n));
      } else
        a && !o && Ve(r, "none"), i.state && (i.state = null, c(ge(n)));
    });
  });
}, Co = (e, t) => (n) => {
  n.preventDefault();
  const r = n.dataTransfer;
  Ct(r).then((s) => {
    t.forEach((o) => {
      const { filterElement: i, element: a, ondrop: l, onexit: d, allowdrop: c } = o;
      if (o.state = null, !(i && !vt(n, a))) {
        if (!c(s)) return d(ge(n));
        l(ge(n), s);
      }
    });
  });
}, No = (e, t) => (n) => {
  er === n.target && t.forEach((r) => {
    const { onexit: s } = r;
    r.state = null, s(ge(n));
  });
}, vo = (e, t, n) => {
  e.classList.add("filepond--hopper");
  const { catchesDropsOnPage: r, requiresDropOnElement: s, filterItems: o = (c) => c } = n, i = Ao(
    e,
    r ? document.documentElement : e,
    s
  );
  let a = "", l = "";
  i.allowdrop = (c) => t(o(c)), i.ondrop = (c, f) => {
    const E = o(f);
    if (!t(E)) {
      d.ondragend(c);
      return;
    }
    l = "drag-drop", d.onload(E, c);
  }, i.ondrag = (c) => {
    d.ondrag(c);
  }, i.onenter = (c) => {
    l = "drag-over", d.ondragstart(c);
  }, i.onexit = (c) => {
    l = "drag-exit", d.ondragend(c);
  };
  const d = {
    updateHopperState: () => {
      a !== l && (e.dataset.hopperState = l, a = l);
    },
    onload: () => {
    },
    ondragstart: () => {
    },
    ondrag: () => {
    },
    ondragend: () => {
    },
    destroy: () => {
      i.destroy();
    }
  };
  return d;
};
let pt = !1;
const Ae = [], tr = (e) => {
  const t = document.activeElement;
  if (t && (/textarea|input/i.test(t.nodeName) || t.getAttribute("contenteditable") === "true" || t.getAttribute("contenteditable") === "")) {
    let r = !1, s = t;
    for (; s !== document.body; ) {
      if (s.classList.contains("filepond--root")) {
        r = !0;
        break;
      }
      s = s.parentNode;
    }
    if (!r) return;
  }
  Ct(e.clipboardData).then((r) => {
    r.length && Ae.forEach((s) => s(r));
  });
}, wo = (e) => {
  Ae.includes(e) || (Ae.push(e), !pt && (pt = !0, document.addEventListener("paste", tr)));
}, Go = (e) => {
  St(Ae, Ae.indexOf(e)), Ae.length === 0 && (document.removeEventListener("paste", tr), pt = !1);
}, Fo = () => {
  const e = (n) => {
    t.onload(n);
  }, t = {
    destroy: () => {
      Go(e);
    },
    onload: () => {
    }
  };
  return wo(e), t;
}, Uo = ({ root: e, props: t }) => {
  e.element.id = `filepond--assistant-${t.id}`, W(e.element, "role", "alert"), W(e.element, "aria-live", "polite"), W(e.element, "aria-relevant", "additions");
};
let pn = null, In = null;
const ot = [], et = (e, t) => {
  e.element.textContent = t;
}, Bo = (e) => {
  e.element.textContent = "";
}, nr = (e, t, n) => {
  const r = e.query("GET_TOTAL_ITEMS");
  et(
    e,
    `${n} ${t}, ${r} ${r === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`
  ), clearTimeout(In), In = setTimeout(() => {
    Bo(e);
  }, 1500);
}, rr = (e) => e.element.parentNode.contains(document.activeElement), Vo = ({ root: e, action: t }) => {
  if (!rr(e))
    return;
  e.element.textContent = "";
  const n = e.query("GET_ITEM", t.id);
  ot.push(n.filename), clearTimeout(pn), pn = setTimeout(() => {
    nr(e, ot.join(", "), e.query("GET_LABEL_FILE_ADDED")), ot.length = 0;
  }, 750);
}, qo = ({ root: e, action: t }) => {
  if (!rr(e))
    return;
  const n = t.item;
  nr(e, n.filename, e.query("GET_LABEL_FILE_REMOVED"));
}, xo = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, s = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  et(e, `${r} ${s}`);
}, _n = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, s = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  et(e, `${r} ${s}`);
}, qe = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename;
  et(e, `${t.status.main} ${r} ${t.status.sub}`);
}, Ho = H({
  create: Uo,
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: K({
    DID_LOAD_ITEM: Vo,
    DID_REMOVE_ITEM: qo,
    DID_COMPLETE_ITEM_PROCESSING: xo,
    DID_ABORT_ITEM_PROCESSING: _n,
    DID_REVERT_ITEM_PROCESSING: _n,
    DID_THROW_ITEM_REMOVE_ERROR: qe,
    DID_THROW_ITEM_LOAD_ERROR: qe,
    DID_THROW_ITEM_INVALID: qe,
    DID_THROW_ITEM_PROCESSING_ERROR: qe
  }),
  tag: "span",
  name: "assistant"
}), sr = (e, t = "-") => e.replace(new RegExp(`${t}.`, "g"), (n) => n.charAt(1).toUpperCase()), ir = (e, t = 16, n = !0) => {
  let r = Date.now(), s = null;
  return (...o) => {
    clearTimeout(s);
    const i = Date.now() - r, a = () => {
      r = Date.now(), e(...o);
    };
    i < t ? n || (s = setTimeout(a, t - i)) : a();
  };
}, Yo = 1e6, Xe = (e) => e.preventDefault(), $o = ({ root: e, props: t }) => {
  const n = e.query("GET_ID");
  n && (e.element.id = n);
  const r = e.query("GET_CLASS_NAME");
  r && r.split(" ").filter((l) => l.length).forEach((l) => {
    e.element.classList.add(l);
  }), e.ref.label = e.appendChildView(
    e.createChildView(zi, {
      ...t,
      translateY: null,
      caption: e.query("GET_LABEL_IDLE")
    })
  ), e.ref.list = e.appendChildView(e.createChildView(qi, { translateY: null })), e.ref.panel = e.appendChildView(e.createChildView($n, { name: "panel-root" })), e.ref.assistant = e.appendChildView(e.createChildView(Ho, { ...t })), e.ref.data = e.appendChildView(e.createChildView(co, { ...t })), e.ref.measure = ce("div"), e.ref.measure.style.height = "100%", e.element.appendChild(e.ref.measure), e.ref.bounds = null, e.query("GET_STYLES").filter((l) => !ae(l.value)).map(({ name: l, value: d }) => {
    e.element.dataset[l] = d;
  }), e.ref.widthPrevious = null, e.ref.widthUpdated = ir(() => {
    e.ref.updateHistory = [], e.dispatch("DID_RESIZE_ROOT");
  }, 250), e.ref.previousAspectRatio = null, e.ref.updateHistory = [];
  const s = window.matchMedia("(pointer: fine) and (hover: hover)").matches, o = "PointerEvent" in window;
  e.query("GET_ALLOW_REORDER") && o && !s && (e.element.addEventListener("touchmove", Xe, { passive: !1 }), e.element.addEventListener("gesturestart", Xe));
  const i = e.query("GET_CREDITS");
  if (i.length === 2) {
    const l = document.createElement("a");
    l.className = "filepond--credits", l.href = i[0], l.tabIndex = -1, l.target = "_blank", l.rel = "noopener noreferrer nofollow", l.textContent = i[1], e.element.appendChild(l), e.ref.credits = l;
  }
}, Wo = ({ root: e, props: t, actions: n }) => {
  if (Qo({ root: e, props: t, actions: n }), n.filter((N) => /^DID_SET_STYLE_/.test(N.type)).filter((N) => !ae(N.data.value)).map(({ type: N, data: B }) => {
    const h = sr(N.substring(8).toLowerCase(), "_");
    e.element.dataset[h] = B.value, e.invalidateLayout();
  }), e.rect.element.hidden) return;
  e.rect.element.width !== e.ref.widthPrevious && (e.ref.widthPrevious = e.rect.element.width, e.ref.widthUpdated());
  let r = e.ref.bounds;
  r || (r = e.ref.bounds = ko(e), e.element.removeChild(e.ref.measure), e.ref.measure = null);
  const { hopper: s, label: o, list: i, panel: a } = e.ref;
  s && s.updateHopperState();
  const l = e.query("GET_PANEL_ASPECT_RATIO"), d = e.query("GET_ALLOW_MULTIPLE"), c = e.query("GET_TOTAL_ITEMS"), f = d ? e.query("GET_MAX_FILES") || Yo : 1, E = c === f, T = n.find((N) => N.type === "DID_ADD_ITEM");
  if (E && T) {
    const N = T.data.interactionMethod;
    o.opacity = 0, d ? o.translateY = -40 : N === re.API ? o.translateX = 40 : N === re.BROWSE ? o.translateY = 40 : o.translateY = 30;
  } else E || (o.opacity = 1, o.translateX = 0, o.translateY = 0);
  const u = zo(e), _ = Xo(e), D = o.rect.element.height, R = !d || E ? 0 : D, O = E ? i.rect.element.marginTop : 0, L = c === 0 ? 0 : i.rect.element.marginBottom, P = R + O + _.visual + L, S = R + O + _.bounds + L;
  if (i.translateY = Math.max(0, R - i.rect.element.marginTop) - u.top, l) {
    const N = e.rect.element.width, B = N * l;
    l !== e.ref.previousAspectRatio && (e.ref.previousAspectRatio = l, e.ref.updateHistory = []);
    const h = e.ref.updateHistory;
    h.push(N);
    const M = 2;
    if (h.length > M * 2) {
      const A = h.length, v = A - 10;
      let X = 0;
      for (let m = A; m >= v; m--)
        if (h[m] === h[m - 2] && X++, X >= M)
          return;
    }
    a.scalable = !1, a.height = B;
    const F = (
      // the height of the panel minus the label height
      B - R - // the room we leave open between the end of the list and the panel bottom
      (L - u.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (E ? O : 0)
    );
    _.visual > F ? i.overflow = F : i.overflow = null, e.height = B;
  } else if (r.fixedHeight) {
    a.scalable = !1;
    const N = (
      // the height of the panel minus the label height
      r.fixedHeight - R - // the room we leave open between the end of the list and the panel bottom
      (L - u.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (E ? O : 0)
    );
    _.visual > N ? i.overflow = N : i.overflow = null;
  } else if (r.cappedHeight) {
    const N = P >= r.cappedHeight, B = Math.min(r.cappedHeight, P);
    a.scalable = !0, a.height = N ? B : B - u.top - u.bottom;
    const h = (
      // the height of the panel minus the label height
      B - R - // the room we leave open between the end of the list and the panel bottom
      (L - u.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (E ? O : 0)
    );
    P > r.cappedHeight && _.visual > h ? i.overflow = h : i.overflow = null, e.height = Math.min(
      r.cappedHeight,
      S - u.top - u.bottom
    );
  } else {
    const N = c > 0 ? u.top + u.bottom : 0;
    a.scalable = !0, a.height = Math.max(D, P - N), e.height = Math.max(D, S - N);
  }
  e.ref.credits && a.heightCurrent && (e.ref.credits.style.transform = `translateY(${a.heightCurrent}px)`);
}, zo = (e) => {
  const t = e.ref.list.childViews[0].childViews[0];
  return t ? {
    top: t.rect.element.marginTop,
    bottom: t.rect.element.marginBottom
  } : {
    top: 0,
    bottom: 0
  };
}, Xo = (e) => {
  let t = 0, n = 0;
  const r = e.ref.list, s = r.childViews[0], o = s.childViews.filter((O) => O.rect.element.height), i = e.query("GET_ACTIVE_ITEMS").map((O) => o.find((L) => L.id === O.id)).filter((O) => O);
  if (i.length === 0) return { visual: t, bounds: n };
  const a = s.rect.element.width, l = bt(s, i, r.dragCoordinates), d = i[0].rect.element, c = d.marginTop + d.marginBottom, f = d.marginLeft + d.marginRight, E = d.width + f, T = d.height + c, u = typeof l < "u" && l >= 0 ? 1 : 0, _ = i.find((O) => O.markedForRemoval && O.opacity < 0.45) ? -1 : 0, D = i.length + u + _, R = Pt(a, E);
  return R === 1 ? i.forEach((O) => {
    const L = O.rect.element.height + c;
    n += L, t += L * O.opacity;
  }) : (n = Math.ceil(D / R) * T, t = n), { visual: t, bounds: n };
}, ko = (e) => {
  const t = e.ref.measureHeight || null;
  return {
    cappedHeight: parseInt(e.style.maxHeight, 10) || null,
    fixedHeight: t === 0 ? null : t
  };
}, wt = (e, t) => {
  const n = e.query("GET_ALLOW_REPLACE"), r = e.query("GET_ALLOW_MULTIPLE"), s = e.query("GET_TOTAL_ITEMS");
  let o = e.query("GET_MAX_FILES");
  const i = t.length;
  return !r && i > 1 ? (e.dispatch("DID_THROW_MAX_FILES", {
    source: t,
    error: q("warning", 0, "Max files")
  }), !0) : (o = r ? o : 1, !r && n ? !1 : Le(o) && s + i > o ? (e.dispatch("DID_THROW_MAX_FILES", {
    source: t,
    error: q("warning", 0, "Max files")
  }), !0) : !1);
}, jo = (e, t, n) => {
  const r = e.childViews[0];
  return bt(r, t, {
    left: n.scopeLeft - r.rect.element.left,
    top: n.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop)
  });
}, Tn = (e) => {
  const t = e.query("GET_ALLOW_DROP"), n = e.query("GET_DISABLED"), r = t && !n;
  if (r && !e.ref.hopper) {
    const s = vo(
      e.element,
      (o) => {
        const i = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
        return e.query("GET_DROP_VALIDATION") ? o.every(
          (l) => Re("ALLOW_HOPPER_ITEM", l, {
            query: e.query
          }).every((d) => d === !0) && i(l)
        ) : !0;
      },
      {
        filterItems: (o) => {
          const i = e.query("GET_IGNORED_FILES");
          return o.filter((a) => me(a) ? !i.includes(a.name.toLowerCase()) : !0);
        },
        catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
        requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT")
      }
    );
    s.onload = (o, i) => {
      const l = e.ref.list.childViews[0].childViews.filter((c) => c.rect.element.height), d = e.query("GET_ACTIVE_ITEMS").map((c) => l.find((f) => f.id === c.id)).filter((c) => c);
      se("ADD_ITEMS", o, { dispatch: e.dispatch }).then((c) => {
        if (wt(e, c)) return !1;
        e.dispatch("ADD_ITEMS", {
          items: c,
          index: jo(e.ref.list, d, i),
          interactionMethod: re.DROP
        });
      }), e.dispatch("DID_DROP", { position: i }), e.dispatch("DID_END_DRAG", { position: i });
    }, s.ondragstart = (o) => {
      e.dispatch("DID_START_DRAG", { position: o });
    }, s.ondrag = ir((o) => {
      e.dispatch("DID_DRAG", { position: o });
    }), s.ondragend = (o) => {
      e.dispatch("DID_END_DRAG", { position: o });
    }, e.ref.hopper = s, e.ref.drip = e.appendChildView(e.createChildView(eo));
  } else !r && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip));
}, mn = (e, t) => {
  const n = e.query("GET_ALLOW_BROWSE"), r = e.query("GET_DISABLED"), s = n && !r;
  s && !e.ref.browser ? e.ref.browser = e.appendChildView(
    e.createChildView($i, {
      ...t,
      onload: (o) => {
        se("ADD_ITEMS", o, {
          dispatch: e.dispatch
        }).then((i) => {
          if (wt(e, i)) return !1;
          e.dispatch("ADD_ITEMS", {
            items: i,
            index: -1,
            interactionMethod: re.BROWSE
          });
        });
      }
    }),
    0
  ) : !s && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null);
}, gn = (e) => {
  const t = e.query("GET_ALLOW_PASTE"), n = e.query("GET_DISABLED"), r = t && !n;
  r && !e.ref.paster ? (e.ref.paster = Fo(), e.ref.paster.onload = (s) => {
    se("ADD_ITEMS", s, { dispatch: e.dispatch }).then((o) => {
      if (wt(e, o)) return !1;
      e.dispatch("ADD_ITEMS", {
        items: o,
        index: -1,
        interactionMethod: re.PASTE
      });
    });
  }) : !r && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null);
}, Qo = K({
  DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
    mn(e, t);
  },
  DID_SET_ALLOW_DROP: ({ root: e }) => {
    Tn(e);
  },
  DID_SET_ALLOW_PASTE: ({ root: e }) => {
    gn(e);
  },
  DID_SET_DISABLED: ({ root: e, props: t }) => {
    Tn(e), gn(e), mn(e, t), e.query("GET_DISABLED") ? e.element.dataset.disabled = "disabled" : e.element.removeAttribute("data-disabled");
  }
}), Ko = H({
  name: "root",
  read: ({ root: e }) => {
    e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
  },
  create: $o,
  write: Wo,
  destroy: ({ root: e }) => {
    e.ref.paster && e.ref.paster.destroy(), e.ref.hopper && e.ref.hopper.destroy(), e.element.removeEventListener("touchmove", Xe), e.element.removeEventListener("gesturestart", Xe);
  },
  mixins: {
    styles: ["height"]
  }
}), Zo = (e = {}) => {
  let t = null;
  const n = We(), r = pr(
    // initial state (should be serializable)
    Jr(n),
    // queries
    [Ts, ns(n)],
    // action handlers
    [Hs, ts(n)]
  );
  r.dispatch("SET_OPTIONS", { options: e });
  const s = () => {
    document.hidden || r.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", s);
  let o = null, i = !1, a = !1, l = null, d = null;
  const c = () => {
    i || (i = !0), clearTimeout(o), o = setTimeout(() => {
      i = !1, l = null, d = null, a && (a = !1, r.dispatch("DID_STOP_RESIZE"));
    }, 500);
  };
  window.addEventListener("resize", c);
  const f = Ko(r, { id: Dt() });
  let E = !1, T = !1;
  const u = {
    // necessary for update loop
    /**
     * Reads from dom (never call manually)
     * @private
     */
    _read: () => {
      i && (d = window.innerWidth, l || (l = d), !a && d !== l && (r.dispatch("DID_START_RESIZE"), a = !0)), T && E && (E = f.element.offsetParent === null), !E && (f._read(), T = f.rect.element.hidden);
    },
    /**
     * Writes to dom (never call manually)
     * @private
     */
    _write: (I) => {
      const g = r.processActionQueue().filter((y) => !/^SET_/.test(y.type));
      E && !g.length || (O(g), E = f._write(I, g, a), is(r.query("GET_ITEMS")), E && r.processDispatchQueue());
    }
  }, _ = (I) => (g) => {
    const y = {
      type: I
    };
    if (!g)
      return y;
    if (g.hasOwnProperty("error") && (y.error = g.error ? { ...g.error } : null), g.status && (y.status = { ...g.status }), g.file && (y.output = g.file), g.source)
      y.file = g.source;
    else if (g.item || g.id) {
      const b = g.item ? g.item : r.query("GET_ITEM", g.id);
      y.file = b ? J(b) : null;
    }
    return g.items && (y.items = g.items.map(J)), /progress/.test(I) && (y.progress = g.progress), g.hasOwnProperty("origin") && g.hasOwnProperty("target") && (y.origin = g.origin, y.target = g.target), y;
  }, D = {
    DID_DESTROY: _("destroy"),
    DID_INIT: _("init"),
    DID_THROW_MAX_FILES: _("warning"),
    DID_INIT_ITEM: _("initfile"),
    DID_START_ITEM_LOAD: _("addfilestart"),
    DID_UPDATE_ITEM_LOAD_PROGRESS: _("addfileprogress"),
    DID_LOAD_ITEM: _("addfile"),
    DID_THROW_ITEM_INVALID: [_("error"), _("addfile")],
    DID_THROW_ITEM_LOAD_ERROR: [_("error"), _("addfile")],
    DID_THROW_ITEM_REMOVE_ERROR: [_("error"), _("removefile")],
    DID_PREPARE_OUTPUT: _("preparefile"),
    DID_START_ITEM_PROCESSING: _("processfilestart"),
    DID_UPDATE_ITEM_PROCESS_PROGRESS: _("processfileprogress"),
    DID_ABORT_ITEM_PROCESSING: _("processfileabort"),
    DID_COMPLETE_ITEM_PROCESSING: _("processfile"),
    DID_COMPLETE_ITEM_PROCESSING_ALL: _("processfiles"),
    DID_REVERT_ITEM_PROCESSING: _("processfilerevert"),
    DID_THROW_ITEM_PROCESSING_ERROR: [_("error"), _("processfile")],
    DID_REMOVE_ITEM: _("removefile"),
    DID_UPDATE_ITEMS: _("updatefiles"),
    DID_ACTIVATE_ITEM: _("activatefile"),
    DID_REORDER_ITEMS: _("reorderfiles")
  }, R = (I) => {
    const g = { pond: U, ...I };
    delete g.type, f.element.dispatchEvent(
      new CustomEvent(`FilePond:${I.type}`, {
        // event info
        detail: g,
        // event behaviour
        bubbles: !0,
        cancelable: !0,
        composed: !0
        // triggers listeners outside of shadow root
      })
    );
    const y = [];
    I.hasOwnProperty("error") && y.push(I.error), I.hasOwnProperty("file") && y.push(I.file);
    const b = ["type", "error", "file"];
    Object.keys(I).filter((w) => !b.includes(w)).forEach((w) => y.push(I[w])), U.fire(I.type, ...y);
    const Y = r.query(`GET_ON${I.type.toUpperCase()}`);
    Y && Y(...y);
  }, O = (I) => {
    I.length && I.filter((g) => D[g.type]).forEach((g) => {
      const y = D[g.type];
      (Array.isArray(y) ? y : [y]).forEach((b) => {
        g.type === "DID_INIT_ITEM" ? R(b(g.data)) : setTimeout(() => {
          R(b(g.data));
        }, 0);
      });
    });
  }, L = (I) => r.dispatch("SET_OPTIONS", { options: I }), P = (I) => r.query("GET_ACTIVE_ITEM", I), S = (I) => new Promise((g, y) => {
    r.dispatch("REQUEST_ITEM_PREPARE", {
      query: I,
      success: (b) => {
        g(b);
      },
      failure: (b) => {
        y(b);
      }
    });
  }), N = (I, g = {}) => new Promise((y, b) => {
    M([{ source: I, options: g }], { index: g.index }).then((Y) => y(Y && Y[0])).catch(b);
  }), B = (I) => I.file && I.id, h = (I, g) => (typeof I == "object" && !B(I) && !g && (g = I, I = void 0), r.dispatch("REMOVE_ITEM", { ...g, query: I }), r.query("GET_ACTIVE_ITEM", I) === null), M = (...I) => new Promise((g, y) => {
    const b = [], Y = {};
    if (ke(I[0]))
      b.push.apply(b, I[0]), Object.assign(Y, I[1] || {});
    else {
      const w = I[I.length - 1];
      typeof w == "object" && !(w instanceof Blob) && Object.assign(Y, I.pop()), b.push(...I);
    }
    r.dispatch("ADD_ITEMS", {
      items: b,
      index: Y.index,
      interactionMethod: re.API,
      success: g,
      failure: y
    });
  }), F = () => r.query("GET_ACTIVE_ITEMS"), A = (I) => new Promise((g, y) => {
    r.dispatch("REQUEST_ITEM_PROCESSING", {
      query: I,
      success: (b) => {
        g(b);
      },
      failure: (b) => {
        y(b);
      }
    });
  }), v = (...I) => {
    const g = Array.isArray(I[0]) ? I[0] : I, y = g.length ? g : F();
    return Promise.all(y.map(S));
  }, X = (...I) => {
    const g = Array.isArray(I[0]) ? I[0] : I;
    if (!g.length) {
      const y = F().filter(
        (b) => !(b.status === C.IDLE && b.origin === $.LOCAL) && b.status !== C.PROCESSING && b.status !== C.PROCESSING_COMPLETE && b.status !== C.PROCESSING_REVERT_ERROR
      );
      return Promise.all(y.map(A));
    }
    return Promise.all(g.map(A));
  }, m = (...I) => {
    const g = Array.isArray(I[0]) ? I[0] : I;
    let y;
    typeof g[g.length - 1] == "object" ? y = g.pop() : Array.isArray(I[0]) && (y = I[1]);
    const b = F();
    return g.length ? g.map((w) => Ee(w) ? b[w] ? b[w].id : null : w).filter((w) => w).map((w) => h(w, y)) : Promise.all(b.map((w) => h(w, y)));
  }, U = {
    // supports events
    ...Ke(),
    // inject private api methods
    ...u,
    // inject all getters and setters
    ...es(r, n),
    /**
     * Override options defined in options object
     * @param options
     */
    setOptions: L,
    /**
     * Load the given file
     * @param source - the source of the file (either a File, base64 data uri or url)
     * @param options - object, { index: 0 }
     */
    addFile: N,
    /**
     * Load the given files
     * @param sources - the sources of the files to load
     * @param options - object, { index: 0 }
     */
    addFiles: M,
    /**
     * Returns the file objects matching the given query
     * @param query { string, number, null }
     */
    getFile: P,
    /**
     * Upload file with given name
     * @param query { string, number, null  }
     */
    processFile: A,
    /**
     * Request prepare output for file with given name
     * @param query { string, number, null  }
     */
    prepareFile: S,
    /**
     * Removes a file by its name
     * @param query { string, number, null  }
     */
    removeFile: h,
    /**
     * Moves a file to a new location in the files list
     */
    moveFile: (I, g) => r.dispatch("MOVE_ITEM", { query: I, index: g }),
    /**
     * Returns all files (wrapped in public api)
     */
    getFiles: F,
    /**
     * Starts uploading all files
     */
    processFiles: X,
    /**
     * Clears all files from the files list
     */
    removeFiles: m,
    /**
     * Starts preparing output of all files
     */
    prepareFiles: v,
    /**
     * Sort list of files
     */
    sort: (I) => r.dispatch("SORT", { compare: I }),
    /**
     * Browse the file system for a file
     */
    browse: () => {
      var I = f.element.querySelector("input[type=file]");
      I && I.click();
    },
    /**
     * Destroys the app
     */
    destroy: () => {
      U.fire("destroy", f.element), r.dispatch("ABORT_ALL"), f._destroy(), window.removeEventListener("resize", c), document.removeEventListener("visibilitychange", s), r.dispatch("DID_DESTROY");
    },
    /**
     * Inserts the plugin before the target element
     */
    insertBefore: (I) => xt(f.element, I),
    /**
     * Inserts the plugin after the target element
     */
    insertAfter: (I) => Ht(f.element, I),
    /**
     * Appends the plugin to the target element
     */
    appendTo: (I) => I.appendChild(f.element),
    /**
     * Replaces an element with the app
     */
    replaceElement: (I) => {
      xt(f.element, I), I.parentNode.removeChild(I), t = I;
    },
    /**
     * Restores the original element
     */
    restoreElement: () => {
      t && (Ht(t, f.element), f.element.parentNode.removeChild(f.element), t = null);
    },
    /**
     * Returns true if the app root is attached to given element
     * @param element
     */
    isAttachedTo: (I) => f.element === I || t === I,
    /**
     * Returns the root element
     */
    element: {
      get: () => f.element
    },
    /**
     * Returns the current pond status
     */
    status: {
      get: () => r.query("GET_STATUS")
    }
  };
  return r.dispatch("DID_INIT"), fe(U);
}, or = (e = {}) => {
  const t = {};
  return V(We(), (r, s) => {
    t[r] = s[0];
  }), Zo({
    // default options
    ...t,
    // custom options
    ...e
  });
}, Jo = (e) => e.charAt(0).toLowerCase() + e.slice(1), el = (e) => sr(e.replace(/^data-/, "")), lr = (e, t) => {
  V(t, (n, r) => {
    V(e, (s, o) => {
      const i = new RegExp(n);
      if (!i.test(s) || (delete e[s], r === !1))
        return;
      if (Q(r)) {
        e[r] = o;
        return;
      }
      const l = r.group;
      z(r) && !e[l] && (e[l] = {}), e[l][Jo(s.replace(i, ""))] = o;
    }), r.mapping && lr(e[r.group], r.mapping);
  });
}, tl = (e, t = {}) => {
  const n = [];
  V(e.attributes, (s) => {
    n.push(e.attributes[s]);
  });
  const r = n.filter((s) => s.name).reduce((s, o) => {
    const i = W(e, o.name);
    return s[el(o.name)] = i === o.name ? !0 : i, s;
  }, {});
  return lr(r, t), r;
}, nl = (e, t = {}) => {
  const n = {
    // translate to other name
    "^class$": "className",
    "^multiple$": "allowMultiple",
    "^capture$": "captureMethod",
    "^webkitdirectory$": "allowDirectoriesOnly",
    // group under single property
    "^server": {
      group: "server",
      mapping: {
        "^process": {
          group: "process"
        },
        "^revert": {
          group: "revert"
        },
        "^fetch": {
          group: "fetch"
        },
        "^restore": {
          group: "restore"
        },
        "^load": {
          group: "load"
        }
      }
    },
    // don't include in object
    "^type$": !1,
    "^files$": !1
  };
  Re("SET_ATTRIBUTE_TO_OPTION_MAP", n);
  const r = {
    ...t
  }, s = tl(
    e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
    n
  );
  Object.keys(s).forEach((i) => {
    z(s[i]) ? (z(r[i]) || (r[i] = {}), Object.assign(r[i], s[i])) : r[i] = s[i];
  }), r.files = (t.files || []).concat(
    Array.from(e.querySelectorAll("input:not([type=file])")).map((i) => ({
      source: i.value,
      options: {
        type: i.dataset.type
      }
    }))
  );
  const o = or(r);
  return e.files && Array.from(e.files).forEach((i) => {
    o.addFile(i);
  }), o.replaceElement(e), o;
}, rl = (...e) => Er(e[0]) ? nl(...e) : or(...e), sl = ["fire", "_read", "_write"], Rn = (e) => {
  const t = {};
  return Pn(e, t, sl), t;
}, il = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (n, r) => t[r]), ol = (e) => {
  const t = new Blob(["(", e.toString(), ")()"], {
    type: "application/javascript"
  }), n = URL.createObjectURL(t), r = new Worker(n);
  return {
    transfer: (s, o) => {
    },
    post: (s, o, i) => {
      const a = Dt();
      r.onmessage = (l) => {
        l.data.id === a && o(l.data.message);
      }, r.postMessage(
        {
          id: a,
          message: s
        },
        i
      );
    },
    terminate: () => {
      r.terminate(), URL.revokeObjectURL(n);
    }
  };
}, ll = (e) => new Promise((t, n) => {
  const r = new Image();
  r.onload = () => {
    t(r);
  }, r.onerror = (s) => {
    n(s);
  }, r.src = e;
}), ar = (e, t) => {
  const n = e.slice(0, e.size, e.type);
  return n.lastModifiedDate = e.lastModifiedDate, n.name = t, n;
}, al = (e) => ar(e, e.name), hn = [], cl = (e) => {
  if (hn.includes(e))
    return;
  hn.push(e);
  const t = e({
    addFilter: ls,
    utils: {
      Type: p,
      forin: V,
      isString: Q,
      isFile: me,
      toNaturalFileSize: xn,
      replaceInString: il,
      getExtensionFromFilename: Ze,
      getFilenameWithoutExtension: Bn,
      guesstimateMimeType: Zn,
      getFileFromBlob: ye,
      getFilenameFromURL: Ne,
      createRoute: K,
      createWorker: ol,
      createView: H,
      createItemAPI: J,
      loadImage: ll,
      copyFile: al,
      renameFile: ar,
      createBlob: Gn,
      applyFilterChain: se,
      text: x,
      getNumericAspectRatioFromString: Cn
    },
    views: {
      fileActionButton: qn
    }
  });
  as(t.options);
}, dl = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]", ul = () => "Promise" in window, fl = () => "slice" in Blob.prototype, El = () => "URL" in window && "createObjectURL" in window.URL, pl = () => "visibilityState" in document, Il = () => "performance" in window, _l = () => "supports" in (window.CSS || {}), Tl = () => /MSIE|Trident/.test(window.navigator.userAgent), It = (() => {
  const e = (
    // Has to be a browser
    On() && // Can't run on Opera Mini due to lack of everything
    !dl() && // Require these APIs to feature detect a modern browser
    pl() && ul() && fl() && El() && Il() && // doesn't need CSSSupports but is a good way to detect Safari 9+ (we do want to support IE11 though)
    (_l() || Tl())
  );
  return () => e;
})(), ue = {
  // active app instances, used to redraw the apps and to find the later
  apps: []
}, ml = "filepond", he = () => {
};
let cr = {}, dr = {}, ur = {}, _t = {}, He = he, Ye = he, Tt = he, mt = he, gt = he, Rt = he, ht = he;
if (It()) {
  Vr(
    () => {
      ue.apps.forEach((n) => n._read());
    },
    (n) => {
      ue.apps.forEach((r) => r._write(n));
    }
  );
  const e = () => {
    document.dispatchEvent(
      new CustomEvent("FilePond:loaded", {
        detail: {
          supported: It,
          create: He,
          destroy: Ye,
          parse: Tt,
          find: mt,
          registerPlugin: gt,
          setOptions: ht
        }
      })
    ), document.removeEventListener("DOMContentLoaded", e);
  };
  document.readyState !== "loading" ? setTimeout(() => e(), 0) : document.addEventListener("DOMContentLoaded", e);
  const t = () => V(We(), (n, r) => {
    _t[n] = r[1];
  });
  cr = { ...Nn }, ur = { ...$ }, dr = { ...C }, _t = {}, t(), He = (...n) => {
    const r = rl(...n);
    return r.on("destroy", Ye), ue.apps.push(r), Rn(r);
  }, Ye = (n) => {
    const r = ue.apps.findIndex((s) => s.isAttachedTo(n));
    return r >= 0 ? (ue.apps.splice(r, 1)[0].restoreElement(), !0) : !1;
  }, Tt = (n) => Array.from(n.querySelectorAll(`.${ml}`)).filter(
    (o) => !ue.apps.find((i) => i.isAttachedTo(o))
  ).map((o) => He(o)), mt = (n) => {
    const r = ue.apps.find((s) => s.isAttachedTo(n));
    return r ? Rn(r) : null;
  }, gt = (...n) => {
    n.forEach(cl), t();
  }, Rt = () => {
    const n = {};
    return V(We(), (r, s) => {
      n[r] = s[0];
    }), n;
  }, ht = (n) => (z(n) && (ue.apps.forEach((r) => {
    r.setOptions(n);
  }), cs(n)), Rt());
}
const gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FileOrigin() {
    return ur;
  },
  get FileStatus() {
    return dr;
  },
  get OptionTypes() {
    return _t;
  },
  get Status() {
    return cr;
  },
  get create() {
    return He;
  },
  get destroy() {
    return Ye;
  },
  get find() {
    return mt;
  },
  get getOptions() {
    return Rt;
  },
  get parse() {
    return Tt;
  },
  get registerPlugin() {
    return gt;
  },
  get setOptions() {
    return ht;
  },
  supported: It
}, Symbol.toStringTag, { value: "Module" }));
window.FilePond = gl;
