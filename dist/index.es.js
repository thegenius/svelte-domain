function u() {
}
function b(c, r = u) {
  let t;
  const s = /* @__PURE__ */ new Set();
  function o(e, f) {
    return e != e ? f == f : e !== f || e && typeof e == "object" || typeof e == "function";
  }
  function n(e) {
    if (o(c.state, e) && (c.state = e, t)) {
      for (const f of s)
        f[1]();
      for (const f of s)
        f[0]({ state: e });
    }
  }
  function i(e, f = u) {
    const a = [e, f];
    return s.add(a), s.size === 1 && (t = r(n) || u), e({ state: c.state }), () => {
      s.delete(a), s.size === 0 && (t == null || t(), t = null);
    };
  }
  return Object.assign(c, { set: n }, { subscribe: i });
}
function j(c) {
  let r = {};
  return Object.keys(c).forEach((t) => {
    r[t] = {
      state: c[t].state,
      ...c[t].reducers,
      ...c[t].effects
    };
  }), Object.keys(r).forEach((t) => {
    r[t] = b(r[t]);
  }), Object.keys(c).forEach((t) => {
    let s = c[t].reducers;
    s !== void 0 && Object.keys(s).forEach((n) => {
      r[t][n] = function(i) {
        if (s != null) {
          const e = s[n](r[t].state, i);
          return r[t].set(e), e;
        }
        return r[t].state;
      };
    });
    let o = c[t].effects;
    o !== void 0 && Object.keys(o).forEach((n) => {
      r[t][n] = function(i) {
        if (o != null)
          return o[n](r, i);
      };
    });
  }), r;
}
const E = () => (c) => c;
export {
  E as createModel,
  j as createStore
};
