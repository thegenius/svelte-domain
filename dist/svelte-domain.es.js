function u() {
}
function b(c, s = u) {
  let t;
  const r = /* @__PURE__ */ new Set();
  function o(e, f) {
    return e != e ? f == f : e !== f || e && typeof e == "object" || typeof e == "function";
  }
  function n(e) {
    if (o(c.state, e) && (c.state = e, t)) {
      for (const f of r)
        f[1]();
      for (const f of r)
        f[0]({ state: e });
    }
  }
  function i(e, f = u) {
    const a = [e, f];
    return r.add(a), r.size === 1 && (t = s(n) || u), e({ state: c.state }), () => {
      r.delete(a), r.size === 0 && (t == null || t(), t = null);
    };
  }
  return Object.assign(c, { set: n }, { subscribe: i });
}
function j(c) {
  let s = {};
  return Object.keys(c).forEach((t) => {
    s[t] = {
      state: c[t].state,
      ...c[t].reducers,
      ...c[t].effects
    };
  }), Object.keys(s).forEach((t) => {
    s[t] = b(s[t]);
  }), Object.keys(c).forEach((t) => {
    let r = c[t].reducers;
    r !== void 0 && Object.keys(r).forEach((n) => {
      s[t][n] = function(i) {
        const e = r[n](s[t].state, i);
        return s[t].set(e), e;
      };
    });
    let o = c[t].effects;
    o !== void 0 && Object.keys(o).forEach((n) => {
      s[t][n] = function(i) {
        return o[n](s, i);
      };
    });
  }), s;
}
export {
  j as default
};
