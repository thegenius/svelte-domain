function u() {
}
function b(s, c = u) {
  let t;
  const r = /* @__PURE__ */ new Set();
  function i(e, f) {
    return e != e ? f == f : e !== f || e && typeof e == "object" || typeof e == "function";
  }
  function n(e) {
    if (i(s.state, e) && (s.state = e, t)) {
      for (const f of r)
        f[1]();
      for (const f of r)
        f[0]({ state: e });
    }
  }
  function o(e, f = u) {
    const a = [e, f];
    return r.add(a), r.size === 1 && (t = c(n) || u), e({ state: s.state }), () => {
      r.delete(a), r.size === 0 && (t == null || t(), t = null);
    };
  }
  return Object.assign(s, { set: n }, { subscribe: o });
}
function j(s) {
  let c = {};
  return Object.keys(s).forEach((t) => {
    c[t] = {
      state: s[t].state,
      ...s[t].reducers,
      ...s[t].effects
    };
  }), Object.keys(c).forEach((t) => {
    c[t] = b(c[t]);
  }), Object.keys(s).forEach((t) => {
    let r = s[t].reducers;
    r !== void 0 && Object.keys(r).forEach((n) => {
      c[t][n] = function(o) {
        if (r != null) {
          const e = r[n](c[t].state, o);
          return c[t].set(e), e;
        }
        return c[t].state;
      };
    });
    let i = s[t].effects;
    i !== void 0 && Object.keys(i).forEach((n) => {
      c[t][n] = function(o) {
        if (i != null)
          return i[n](c, o);
      };
    });
  }), c;
}
export {
  j as default
};
