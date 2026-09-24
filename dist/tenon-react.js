import { Fragment as e, forwardRef as t, useCallback as n, useEffect as r, useId as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { createPortal as d } from "react-dom";
//#region src/utils.ts
var f = (...e) => e.filter((e) => typeof e == "string" && e.length > 0).join(" "), p = t(function({ variant: e = "secondary", size: t = "md", iconOnly: n = !1, startIcon: r, endIcon: i, className: a, children: o, type: s = "button", ...c }, l) {
	return /* @__PURE__ */ u("button", {
		ref: l,
		type: s,
		className: f("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, n && "tenon-button--icon-only", a),
		...c,
		children: [
			r,
			o,
			i
		]
	});
}), m = t(function({ variant: e = "secondary", size: t = "md", startIcon: n, endIcon: r, className: i, children: a, ...o }, s) {
	return /* @__PURE__ */ u("a", {
		ref: s,
		className: f("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, i),
		...o,
		children: [
			n,
			a,
			r
		]
	});
});
//#endregion
//#region src/components/Card/Card.tsx
function h(e, t) {
	return t ? typeof t == "object" && t && "__html" in t ? /* @__PURE__ */ l("div", {
		className: e,
		dangerouslySetInnerHTML: t
	}) : /* @__PURE__ */ l("div", {
		className: e,
		children: t
	}) : null;
}
function g({ title: e, eyebrow: t, eyebrowEnd: n, lead: r, action: i, tags: a, meta: o, summary: s, body: c, footer: d, accent: p, elevation: m = "flat", draggable: g, dragging: _, interactive: v, as: y = "article", titleAs: b = "div", className: x, style: S, children: C, ...w }) {
	let T = p ? {
		"--tenon-card-accent": p,
		...S
	} : S;
	return /* @__PURE__ */ u(y, {
		className: f("tenon-card", `tenon-card--${m}`, p && "tenon-card--accent", g && "tenon-card--draggable", _ && "tenon-card--dragging", v && "tenon-card--interactive", x),
		style: T,
		draggable: g,
		...w,
		children: [
			(t || n) && /* @__PURE__ */ u("div", {
				className: "tenon-card__eyebrow",
				children: [t && typeof t == "object" && "__html" in t ? /* @__PURE__ */ l("span", { dangerouslySetInnerHTML: t }) : t, n ? /* @__PURE__ */ l("span", {
					className: "tenon-card__eyebrow-end",
					children: n
				}) : null]
			}),
			(r || e || i) && /* @__PURE__ */ u("div", {
				className: "tenon-card__head",
				children: [
					r ? /* @__PURE__ */ l("span", {
						className: "tenon-card__lead",
						children: r
					}) : null,
					e ? /* @__PURE__ */ l(b, {
						className: "tenon-card__title",
						children: e
					}) : null,
					i ? /* @__PURE__ */ l("span", {
						className: "tenon-card__action",
						children: i
					}) : null
				]
			}),
			h("tenon-card__tags", a),
			h("tenon-card__meta", o),
			h("tenon-card__summary", s),
			c ? /* @__PURE__ */ l("div", {
				className: "tenon-card__body",
				children: c
			}) : null,
			h("tenon-card__footer", d),
			C
		]
	});
}
//#endregion
//#region src/components/Badge/Badge.tsx
function _({ count: e, label: t, max: n = 99, tone: r = "accent", className: i, ...a }) {
	let o = Math.floor(Number(e) || 0);
	if (o < 1) return null;
	let s = o > n ? `${n}+` : String(o), c = t ? `${o} ${t}` : void 0;
	return /* @__PURE__ */ l("span", {
		className: f("tenon-badge", `tenon-badge--${r}`, i),
		title: c,
		"aria-label": c,
		...a,
		children: s
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
function v({ tone: e = "neutral", chart: t, dot: n = !1, className: r, children: i, style: a, ...o }) {
	let s = t ? {
		"--tenon-tag-colour": `var(--tenon-chart-${t})`,
		...a
	} : a;
	return /* @__PURE__ */ u("span", {
		className: f("tenon-tag", t ? "tenon-tag--chart" : `tenon-tag--${e}`, r),
		style: s,
		...o,
		children: [n && /* @__PURE__ */ l("span", {
			className: "tenon-tag__dot",
			"aria-hidden": "true"
		}), i]
	});
}
//#endregion
//#region src/components/Column/Column.tsx
function y({ title: e, titleAs: t = "h2", titleAfter: n, hint: r, sort: i, count: a, action: o, filters: s, desc: d, footer: p, layout: m = "stack", tone: h = "default", muted: g, dashed: _, collapsible: v, open: y, collapseKey: b, className: x, bodyClassName: S, bodyProps: C, children: w, ...T }) {
	let E = f("tenon-column", h !== "default" && `tenon-column--${h}`, m !== "stack" && `tenon-column--${m}`, g && "tenon-column--muted", _ && "tenon-column--dashed", x), D = /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ u("div", {
		className: "tenon-column__head-row",
		children: [/* @__PURE__ */ u("div", {
			className: "tenon-column__head-start",
			children: [
				v ? /* @__PURE__ */ l("span", {
					className: "tenon-column__chevron",
					"aria-hidden": "true"
				}) : null,
				/* @__PURE__ */ l(t, {
					className: "tenon-column__title",
					children: e
				}),
				n,
				r ? /* @__PURE__ */ l("span", {
					className: "tenon-column__hint",
					children: r
				}) : null
			]
		}), /* @__PURE__ */ u("div", {
			className: "tenon-column__head-end",
			children: [
				i,
				a == null ? null : /* @__PURE__ */ l("span", {
					className: "tenon-column__count",
					children: a
				}),
				o,
				s
			]
		})]
	}), d ? /* @__PURE__ */ l("p", {
		className: "tenon-column__desc",
		children: d
	}) : null] }), O = /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("div", {
		...C,
		className: f("tenon-column__body", S, C?.className),
		children: w
	}), p ? /* @__PURE__ */ l("div", {
		className: "tenon-column__footer",
		children: p
	}) : null] });
	return v ? /* @__PURE__ */ u("details", {
		className: E,
		"data-column-collapse": b,
		open: y !== !1,
		...T,
		children: [/* @__PURE__ */ l("summary", {
			className: "tenon-column__head",
			children: D
		}), O]
	}) : /* @__PURE__ */ u("section", {
		className: E,
		...T,
		children: [/* @__PURE__ */ l("div", {
			className: "tenon-column__head",
			children: D
		}), O]
	});
}
function b({ boxed: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ l("div", {
		className: f("tenon-column-empty", e && "tenon-column-empty--boxed", t),
		...r,
		children: n
	});
}
//#endregion
//#region src/components/Stat/Stat.tsx
function x({ eyebrow: e, value: t, caption: n, tone: r = "default", className: i, ...a }) {
	return /* @__PURE__ */ u("div", {
		className: f("tenon-stat", r !== "default" && `tenon-stat--${r}`, i),
		...a,
		children: [
			e ? /* @__PURE__ */ l("span", {
				className: "tenon-stat__eyebrow",
				children: e
			}) : null,
			/* @__PURE__ */ l("span", {
				className: "tenon-stat__value",
				children: t
			}),
			n ? /* @__PURE__ */ l("span", {
				className: "tenon-stat__caption",
				children: n
			}) : null
		]
	});
}
//#endregion
//#region src/components/Field/Field.tsx
function S({ label: e, hint: t, error: n, required: r, className: a, ...o }) {
	let s = i(), c = `${s}-note`, { multiline: d, ...p } = o, m = n ?? t, h = {
		id: s,
		className: "tenon-field__control",
		"aria-invalid": n ? !0 : void 0,
		"aria-describedby": m ? c : void 0,
		required: r,
		...p
	};
	return /* @__PURE__ */ u("div", {
		className: f("tenon-field", n && "tenon-field--invalid", a),
		children: [
			/* @__PURE__ */ u("label", {
				className: "tenon-field__label",
				htmlFor: s,
				children: [e, r && /* @__PURE__ */ l("span", {
					className: "tenon-field__required",
					"aria-hidden": "true",
					children: "*"
				})]
			}),
			l(d ? "textarea" : "input", { ...h }),
			m && /* @__PURE__ */ l("span", {
				id: c,
				className: f("tenon-field__note", n && "tenon-field__note--error"),
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/Modal/Modal.tsx
var C = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])", w = [
	"text",
	"search",
	"url",
	"email",
	"tel",
	"password",
	"number",
	"date"
];
function T(e) {
	return e instanceof HTMLElement ? e instanceof HTMLTextAreaElement || e.isContentEditable ? !0 : e instanceof HTMLInputElement && w.includes((e.type || "text").toLowerCase()) : !1;
}
function E(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) || "null");
		if (t && t.w > 0 && t.h > 0) return t;
	} catch {}
	return null;
}
function D({ open: e, onClose: t, title: n, subtitle: a, headEnd: s, footer: c, size: m = "md", layout: h = "stack", resizable: g = !1, resizeKey: _, closeButton: v = !0, bare: y = !1, initialFocus: b = "box", onSubmit: x, className: S, children: w }) {
	let D = o(null), O = i(), k = o(t);
	k.current = t;
	let A = o(x);
	return A.current = x, r(() => {
		if (!e) return;
		let t = document.activeElement, n = D.current, r = b === "footer" ? n.querySelector(".tenon-modal__footer button:not([disabled])") : null;
		n.contains(document.activeElement) || (r ?? n.querySelector("[autofocus]") ?? n).focus();
		let i = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation(), k.current();
				return;
			}
			if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
				A.current && n.contains(e.target) && T(e.target) && (e.preventDefault(), A.current());
				return;
			}
			if (e.key !== "Tab") return;
			let t = Array.from(n.querySelectorAll(C));
			if (!t.length) {
				e.preventDefault();
				return;
			}
			let r = t[0], i = t[t.length - 1];
			e.shiftKey && (document.activeElement === r || document.activeElement === n) ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus());
		};
		return document.addEventListener("keydown", i, !0), () => {
			document.removeEventListener("keydown", i, !0), t?.focus?.();
		};
	}, [e, b]), r(() => {
		if (!e || !g || !_ || typeof ResizeObserver != "function") return;
		let t = D.current, n = E(_);
		n && (t.style.width = `${n.w}px`, t.style.height = `${n.h}px`);
		let r = () => ({
			w: t.offsetWidth,
			h: t.offsetHeight
		}), i = r(), a = new ResizeObserver(() => {
			if (!t.isConnected) return;
			let e = r();
			if (!(Math.abs(e.w - i.w) < 2 && Math.abs(e.h - i.h) < 2)) try {
				localStorage.setItem(_, JSON.stringify(e));
			} catch {}
		});
		return a.observe(t), () => a.disconnect();
	}, [
		e,
		g,
		_
	]), e ? d(/* @__PURE__ */ u("div", {
		className: "tenon-modal",
		children: [/* @__PURE__ */ l("div", {
			className: "tenon-modal__scrim",
			onClick: () => k.current()
		}), /* @__PURE__ */ u("div", {
			ref: D,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": O,
			tabIndex: -1,
			className: f("tenon-modal__box", `tenon-modal__box--${m}`, g && "tenon-modal__box--resizable", S),
			children: [
				/* @__PURE__ */ u("div", {
					className: "tenon-modal__head",
					children: [
						/* @__PURE__ */ u("div", {
							className: "tenon-modal__titles",
							children: [/* @__PURE__ */ l("h2", {
								id: O,
								className: "tenon-modal__title",
								children: n
							}), a && /* @__PURE__ */ l("div", {
								className: "tenon-modal__subtitle",
								children: a
							})]
						}),
						s,
						v && /* @__PURE__ */ l(p, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": "Close",
							onClick: () => k.current(),
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ l("div", {
					className: f("tenon-modal__body", h === "split" && "tenon-modal__body--split", y && "tenon-modal__body--bare"),
					children: w
				}),
				c && /* @__PURE__ */ l("div", {
					className: f("tenon-modal__footer", y && "tenon-modal__footer--bare"),
					children: c
				})
			]
		})]
	}), document.body) : null;
}
function O({ aside: e = !1, className: t, children: n }) {
	return /* @__PURE__ */ l("div", {
		className: f("tenon-modal__pane", e && "tenon-modal__pane--aside", t),
		children: n
	});
}
//#endregion
//#region src/components/Textarea/Textarea.tsx
var k = t(function({ autoGrow: e = !1, invalid: t, className: r, onChange: i, value: s, rows: c = 1, ...u }, d) {
	let p = o(null), m = n(() => {
		let t = p.current;
		t && e && (t.style.height = "auto", t.style.height = `${t.scrollHeight + (t.offsetHeight - t.clientHeight)}px`);
	}, [e]);
	return a(m, [m, s]), /* @__PURE__ */ l("textarea", {
		ref: (e) => {
			p.current = e, typeof d == "function" ? d(e) : d && (d.current = e);
		},
		rows: c,
		value: s,
		"aria-invalid": t ? !0 : void 0,
		className: f("tenon-textarea", e && "tenon-textarea--auto", t && "tenon-textarea--invalid", r),
		onChange: (e) => {
			m(), i?.(e);
		},
		...u
	});
}), A = [
	"·",
	"✢",
	"✳",
	"∗",
	"✻",
	"✽",
	"✻",
	"∗",
	"✳",
	"✢"
], ee = 110;
function j() {
	return typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function M({ size: e = "md", label: t = "Working", variant: n = "ring", className: i, ...a }) {
	let [o, c] = s(0);
	return r(() => {
		if (n !== "glyph" || j()) return;
		let e = setInterval(() => c((e) => (e + 1) % A.length), ee);
		return () => clearInterval(e);
	}, [n]), /* @__PURE__ */ l("span", {
		role: "status",
		"aria-label": t,
		className: f("tenon-spinner", `tenon-spinner--${e}`, n === "glyph" && "tenon-spinner--glyph", i),
		...a,
		children: n === "glyph" && /* @__PURE__ */ l("span", {
			"aria-hidden": "true",
			children: A[o]
		})
	});
}
//#endregion
//#region src/components/Pill/Pill.tsx
function N({ tone: e = "neutral", dot: t = !1, caps: n = !1, className: r, children: i, ...a }) {
	return /* @__PURE__ */ u("span", {
		className: f("tenon-pill", `tenon-pill--${e}`, n && "tenon-pill--caps", r),
		...a,
		children: [t && /* @__PURE__ */ l("span", {
			className: "tenon-pill__dot",
			"aria-hidden": "true"
		}), i]
	});
}
//#endregion
//#region src/components/Alert/Alert.tsx
var te = {
	neutral: "status",
	info: "status",
	success: "status",
	warning: "alert",
	error: "alert"
};
function P({ tone: e = "neutral", title: t, actions: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ u("div", {
		role: te[e],
		className: f("tenon-alert", `tenon-alert--${e}`, r),
		...a,
		children: [
			t && /* @__PURE__ */ l("div", {
				className: "tenon-alert__title",
				children: t
			}),
			i && /* @__PURE__ */ l("div", {
				className: "tenon-alert__body",
				children: i
			}),
			n && /* @__PURE__ */ l("div", {
				className: "tenon-alert__actions",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/Switch/Switch.tsx
var ne = t(function({ checked: e, onChange: t, className: n, onClick: r, type: i = "button", ...a }, o) {
	return /* @__PURE__ */ l("button", {
		ref: o,
		type: i,
		role: "switch",
		"aria-checked": e,
		className: f("tenon-switch", e && "tenon-switch--on", n),
		onClick: (n) => {
			r?.(n), n.defaultPrevented || t?.(!e);
		},
		...a
	});
});
//#endregion
//#region src/components/SegmentedControl/SegmentedControl.tsx
function F({ options: e, value: t, onChange: n, className: r, ...i }) {
	let a = o(null), s = (t, r) => {
		let i = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : t.key === "ArrowLeft" || t.key === "ArrowUp" ? -1 : 0;
		if (i) {
			t.preventDefault();
			for (let t = 1; t <= e.length; t++) {
				let o = e[(r + i * t + e.length * t) % e.length];
				if (!o.disabled) {
					n(o.value), a.current?.querySelector(`[data-value="${CSS.escape(o.value)}"]`)?.focus();
					return;
				}
			}
		}
	};
	return /* @__PURE__ */ l("div", {
		ref: a,
		role: "radiogroup",
		className: f("tenon-segmented", r),
		...i,
		children: e.map((e, r) => {
			let i = e.value === t;
			return /* @__PURE__ */ l("button", {
				type: "button",
				role: "radio",
				"aria-checked": i,
				"data-value": e.value,
				disabled: e.disabled,
				tabIndex: i ? 0 : -1,
				className: f("tenon-segmented__option", i && "tenon-segmented__option--on"),
				onClick: () => n(e.value),
				onKeyDown: (e) => s(e, r),
				children: e.label
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Window/Window.tsx
var re = 24, I = 260, L = "cubic-bezier(0.4, 0, 0.2, 1)", ie = [
	"left",
	"top",
	"width",
	"height"
].map((e) => `${e} ${I}ms ${L}`).join(", "), ae = [
	"n",
	"s",
	"e",
	"w",
	"ne",
	"nw",
	"se",
	"sw"
], oe = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function R(e) {
	let t = o(e);
	return t.current = e, t;
}
function z({ open: e, onClose: t, title: c, subtitle: m, headEnd: h, footer: g, rect: _, onRectLive: v, onRectChange: y, growFrom: b, zIndex: x, active: S = !0, peeked: C = !1, onFocus: w, closeButton: T = !0, bare: E = !1, minWidth: D = 420, maxWidth: O = 800, minHeight: k = 320, className: A, children: ee, ...j }) {
	let M = o(null), N = i(), [te, P] = s(null), [ne, F] = s(!1), [z, B] = s(!1), [V, H] = s(!1), U = o(null), W = R(t), se = R(v), ce = R(y), le = R(w), ue = R(S), G = R(b), K = R(z), q = o({
		title: c,
		subtitle: m,
		headEnd: h,
		footer: g,
		children: ee,
		rect: _ ?? null,
		bare: E,
		className: A,
		rest: j
	});
	e && (q.current = {
		title: c,
		subtitle: m,
		headEnd: h,
		footer: g,
		children: ee,
		rect: _ ?? null,
		bare: E,
		className: A,
		rest: j
	});
	let J = q.current, Y = o({
		minWidth: D,
		maxWidth: O,
		minHeight: k
	});
	Y.current = {
		minWidth: D,
		maxWidth: O,
		minHeight: k
	};
	let X = n((e) => {
		let t = Y.current, n = Math.max(t.minWidth, Math.min(t.maxWidth, e.width)), r = Math.max(t.minHeight, e.height);
		return {
			width: n,
			height: Math.min(r, window.innerHeight - re),
			x: Math.max(-n + 120, Math.min(e.x, window.innerWidth - 120)),
			y: Math.max(38, Math.min(e.y, window.innerHeight - 60))
		};
	}, []);
	if (r(() => {
		K.current || P(null);
	}, [_]), e && !U.current) {
		let e = Math.min(O, window.innerWidth - 48), t = Math.min(680, window.innerHeight - 48 - 40);
		U.current = {
			x: Math.round((window.innerWidth - e) / 2),
			y: Math.round((window.innerHeight - t) / 2) + 12,
			width: e,
			height: t
		};
	}
	r(() => {
		if (!e) {
			F(!1);
			return;
		}
		let t = requestAnimationFrame(() => F(!0));
		return () => cancelAnimationFrame(t);
	}, [e]), a(() => {
		let t = M.current, n = G.current;
		if (!e || !t || !n || oe()) return;
		let r = t.getBoundingClientRect();
		r.width && r.height && t.animate([{
			transform: `translate(${n.left - r.left}px,${n.top - r.top}px) scale(${n.width / r.width},${n.height / r.height})`,
			opacity: .5
		}, {
			transform: "translate(0,0) scale(1,1)",
			opacity: 1
		}], {
			duration: I,
			easing: L,
			fill: "both"
		});
	}, [e]);
	let [Z, de] = s(e);
	e !== Z && (de(e), H(!e && !!G.current && !oe())), a(() => {
		let e = M.current, t = G.current;
		if (!V || !e || !t) return;
		let n = e.getBoundingClientRect(), r = !1, i = () => {
			r || (r = !0, H(!1));
		}, a = e.animate([{
			transform: "translate(0,0) scale(1,1)",
			opacity: 1
		}, {
			transform: `translate(${t.left - n.left}px,${t.top - n.top}px) scale(${t.width / n.width},${t.height / n.height})`,
			opacity: .5
		}], {
			duration: I,
			easing: L,
			fill: "both"
		});
		a.onfinish = i, a.oncancel = i;
		let o = setTimeout(i, 410);
		return () => clearTimeout(o);
	}, [V]), r(() => {
		!e && !V && (U.current = null);
	}, [e, V]), r(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && ue.current && (e.target?.closest?.("[data-tenon-editing]") || (e.stopPropagation(), W.current()));
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]), r(() => {
		let t = M.current;
		e && t && !t.contains(document.activeElement) && t.focus({ preventScroll: !0 });
	}, [e]);
	let Q = te ?? J.rect ?? U.current ?? {
		x: 0,
		y: 0,
		width: D,
		height: k
	}, fe = R(Q), $ = (e, t) => {
		t.preventDefault();
		let n = {
			x: t.clientX,
			y: t.clientY,
			rect: { ...fe.current }
		};
		B(!0);
		let r = n.rect, i = Y.current, a = (t) => {
			let a = t.clientX - n.x, o = t.clientY - n.y, s = n.rect, c;
			if (e === "move") c = X({
				x: s.x + a,
				y: s.y + o,
				width: s.width,
				height: s.height
			});
			else {
				if (c = { ...s }, e.includes("e") && (c.width = s.width + a), e.includes("s") && (c.height = s.height + o), e.includes("w")) {
					let e = Math.max(i.minWidth, Math.min(i.maxWidth, s.width - a));
					c.x = s.x + (s.width - e), c.width = e;
				}
				if (e.includes("n")) {
					let e = Math.max(i.minHeight, s.height - o);
					c.y = s.y + (s.height - e), c.height = e;
				}
				c = X(c);
			}
			r = c, P(c), se.current?.(c);
		}, o = () => {
			window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o), r !== n.rect && ce.current?.(r), requestAnimationFrame(() => B(!1));
		};
		window.addEventListener("pointermove", a), window.addEventListener("pointerup", o);
	};
	return !e && !V ? null : d(/* @__PURE__ */ l("div", {
		className: "tenon-window-layer",
		style: { zIndex: x },
		children: /* @__PURE__ */ u("div", {
			ref: M,
			role: "dialog",
			"aria-labelledby": N,
			tabIndex: -1,
			className: f("tenon-window", C && "tenon-window--peeked", J.className),
			style: {
				left: Q.x,
				top: Q.y,
				width: Q.width,
				height: Q.height,
				transition: z || !ne ? "none" : ie
			},
			onPointerDownCapture: () => le.current?.(),
			...J.rest,
			children: [
				/* @__PURE__ */ u("div", {
					className: "tenon-modal__head tenon-window__head",
					onPointerDown: (e) => {
						e.target.closest("button,a,input,textarea,[contenteditable=\"true\"]") || $("move", e);
					},
					children: [
						/* @__PURE__ */ u("div", {
							className: "tenon-modal__titles",
							children: [/* @__PURE__ */ l("h2", {
								id: N,
								className: "tenon-modal__title",
								children: J.title
							}), J.subtitle && /* @__PURE__ */ l("div", {
								className: "tenon-modal__subtitle",
								children: J.subtitle
							})]
						}),
						J.headEnd,
						T && /* @__PURE__ */ l(p, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": "Close",
							onClick: () => W.current(),
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ l("div", {
					className: f("tenon-modal__body", J.bare && "tenon-modal__body--bare"),
					children: J.children
				}),
				J.footer && /* @__PURE__ */ l("div", {
					className: f("tenon-modal__footer", J.bare && "tenon-modal__footer--bare"),
					children: J.footer
				}),
				ae.map((e) => /* @__PURE__ */ l("div", {
					className: f("tenon-window__grip", `tenon-window__grip--${e}`),
					"data-edge": e,
					onPointerDown: (t) => $(e, t)
				}, e))
			]
		})
	}), document.body);
}
//#endregion
//#region src/components/Markdown/Markdown.tsx
var B = /https?:\/\/[^\s<>"')\]]+/g, V = [
	{
		re: /\*\*([^*]+)\*\*/,
		tag: "strong",
		lead: !1
	},
	{
		re: /__([^_]+)__/,
		tag: "strong",
		lead: !1
	},
	{
		re: /(^|[\s(])_([^_]+)_/,
		tag: "em",
		lead: !0
	},
	{
		re: /\*([^*]+)\*/,
		tag: "em",
		lead: !1
	}
];
function H(e, t) {
	for (let { re: n, tag: r, lead: i } of V) {
		let a = n.exec(e);
		if (!a) continue;
		let o = i ? a[1] : "", s = i ? a[2] : a[1], c = r;
		return [
			...H(e.slice(0, a.index) + o, `${t}a`),
			/* @__PURE__ */ l(c, { children: H(s, `${t}i`) }, `${t}m`),
			...H(e.slice(a.index + a[0].length), `${t}z`)
		];
	}
	return e ? [e] : [];
}
function U(e, t) {
	let n = [], r = 0;
	for (let i of e.matchAll(B)) {
		let a = i[0], o = "";
		for (; /[.,;:!?]$/.test(a);) o = a.slice(-1) + o, a = a.slice(0, -1);
		n.push(...H(e.slice(r, i.index), `${t}t${r}`)), n.push(/* @__PURE__ */ l("a", {
			href: a,
			className: "tenon-markdown__link",
			children: a
		}, `${t}l${i.index}`)), r = i.index + i[0].length - o.length;
	}
	return n.push(...H(e.slice(r), `${t}e`)), n;
}
function W(e) {
	return e.split(/(`[^`]+`)/).flatMap((e, t) => t % 2 ? [/* @__PURE__ */ l("code", { children: e.slice(1, -1) }, `c${t}`)] : U(e, `p${t}`));
}
function se(e) {
	let t = [], n = [], r = null, i = null, a = () => {
		n.length && (t.push({
			kind: "p",
			lines: n
		}), n = []);
	}, o = () => {
		r &&= (t.push({
			kind: "list",
			...r
		}), null);
	}, s = () => {
		a(), o();
	};
	for (let c of e.replace(/\r/g, "").split("\n")) {
		let e = c.replace(/\s+$/, "");
		if (/^\s*```/.test(e)) {
			i === null ? (s(), i = []) : (t.push({
				kind: "code",
				text: i.join("\n")
			}), i = null);
			continue;
		}
		if (i !== null) {
			i.push(c);
			continue;
		}
		if (!e.trim()) {
			s();
			continue;
		}
		let l = /^\s*\d+[.)]\s+(.*)$/.exec(e), u = l || /^\s*[-*•]\s+(.*)$/.exec(e);
		if (u) {
			let e = !!l;
			r && r.ordered !== e && o(), a(), r ||= {
				ordered: e,
				items: []
			}, r.items.push(u[1]);
			continue;
		}
		let d = /^\s*#{1,6}\s+(.*)$/.exec(e);
		if (d) {
			s(), t.push({
				kind: "h",
				text: d[1]
			});
			continue;
		}
		o(), n.push(e.trim());
	}
	return i !== null && t.push({
		kind: "code",
		text: i.join("\n")
	}), s(), t;
}
function ce({ children: t, inline: n = !1, className: r }) {
	return n ? /* @__PURE__ */ l("span", {
		className: f("tenon-markdown", r),
		children: W(t)
	}) : /* @__PURE__ */ l("div", {
		className: f("tenon-markdown", r),
		children: se(String(t)).map((t, n) => {
			if (t.kind === "code") return /* @__PURE__ */ l("pre", { children: /* @__PURE__ */ l("code", { children: t.text }) }, n);
			if (t.kind === "h") return /* @__PURE__ */ l("p", {
				className: "tenon-markdown__heading",
				children: W(t.text)
			}, n);
			if (t.kind === "list") {
				let e = t.ordered ? "ol" : "ul";
				return /* @__PURE__ */ l(e, { children: t.items.map((e, t) => /* @__PURE__ */ l("li", { children: W(e) }, t)) }, n);
			}
			return /* @__PURE__ */ l("p", { children: t.lines.map((t, n) => /* @__PURE__ */ u(e, { children: [n > 0 && /* @__PURE__ */ l("br", {}), W(t)] }, n)) }, n);
		})
	});
}
//#endregion
//#region src/components/EditableText/EditableText.tsx
function le({ value: e, onCommit: t, hint: n = "Double-click to rename", className: i }) {
	let a = o(null), [c, u] = s(!1), [d, p] = s(e);
	return r(() => {
		c || p(e);
	}, [e, c]), /* @__PURE__ */ l("span", {
		ref: a,
		className: f("tenon-editable", c && "tenon-editable--editing", i),
		title: c ? void 0 : n,
		contentEditable: c,
		suppressContentEditableWarning: !0,
		spellCheck: !1,
		"data-tenon-editing": c ? "" : void 0,
		onDoubleClick: () => {
			u(!0), requestAnimationFrame(() => {
				let e = a.current;
				e && (e.focus(), window.getSelection()?.selectAllChildren?.(e));
			});
		},
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === "Escape") && (t.preventDefault(), t.stopPropagation(), t.key === "Escape" && a.current && (a.current.textContent = e), a.current?.blur());
		},
		onBlur: c ? () => {
			let n = a.current;
			if (u(!1), !n) return;
			let r = (n.textContent || "").trim();
			r && r !== e ? t(r) : n.textContent = e;
		} : void 0,
		onPointerDown: (e) => {
			c && e.stopPropagation();
		},
		children: d
	});
}
//#endregion
//#region src/components/Disclosure/Disclosure.tsx
function ue({ summary: e, open: t, defaultOpen: n = !1, onOpenChange: r, className: i, children: a }) {
	let [o, c] = s(n), d = t ?? o;
	return /* @__PURE__ */ u("div", {
		className: f("tenon-disclosure", d && "tenon-disclosure--open", i),
		children: [/* @__PURE__ */ u("button", {
			type: "button",
			className: "tenon-disclosure__head",
			"aria-expanded": d,
			onClick: () => {
				t === void 0 && c(!d), r?.(!d);
			},
			children: [/* @__PURE__ */ l("span", {
				className: "tenon-disclosure__twist",
				"aria-hidden": "true",
				children: d ? "⌄" : "›"
			}), e]
		}), d && /* @__PURE__ */ l("div", {
			className: "tenon-disclosure__panel",
			children: a
		})]
	});
}
//#endregion
//#region src/components/Reorder/reorderCore.ts
var G = "data-tenon-reorder", K = "data-tenon-drop", q = "data-tenon-dragging", J = "data-tenon-axis", Y = "data-tenon-grip", X = (e, t) => e === t || !!e && !!t && e.key === t.key && e.after === t.after;
function Z(e, t, n, r) {
	let i = e.getBoundingClientRect();
	return r === "x" ? t > i.left + i.width / 2 : n > i.top + i.height / 2;
}
function de(e, t, n) {
	if (!n.after) return n.key;
	let r = e.filter((e) => e !== t), i = r.indexOf(n.key);
	return i + 1 < r.length ? r[i + 1] : null;
}
function Q(e, t, n) {
	let r = e.dataTransfer;
	if (r && (r.effectAllowed = "move", r.setData("text/plain", t), n)) {
		let t = n.getBoundingClientRect();
		r.setDragImage(n, e.clientX - t.left, e.clientY - t.top);
	}
}
var fe = (e) => {
	setTimeout(e, 0);
};
function $(e) {
	e.preventDefault(), e.stopPropagation(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
}
//#endregion
//#region src/components/Reorder/useReorder.ts
function pe(e, t, n) {
	let r = e.filter((e) => e !== t), i = n == null ? r.length : Math.max(0, r.indexOf(n));
	return r.splice(i, 0, t), r;
}
function me(e, t, n) {
	if (!n.length) return e;
	let r = new Map(n.map((e, t) => [e, t]));
	return e.map((e, i) => ({
		item: e,
		r: r.get(t(e)) ?? n.length + i
	})).sort((e, t) => e.r - t.r).map((e) => e.item);
}
function he({ keys: e, onMove: t, axis: n = "y" }) {
	let [r, i] = s(null), [a, c] = s(null), l = o(null), u = o(null), d = (e) => {
		X(u.current, e) || (u.current = e, c(e));
	}, f = () => {
		l.current = null, u.current = null, i(null), c(null);
	}, p = () => {
		let n = l.current, r = u.current;
		n && r && r.key !== n && t(n, de(e, n, r)), f();
	}, m = (e) => Z(e.currentTarget, e.clientX, e.clientY, n);
	return {
		item: (e) => {
			let t = r && r !== e && a && a.key === e ? a.after ? "after" : "before" : null;
			return {
				dragging: r === e,
				drop: t,
				handleProps: {
					draggable: !0,
					onDragStart: (t) => {
						t.stopPropagation(), Q(t, e, t.currentTarget.closest("[data-tenon-reorder]")), l.current = e, fe(() => {
							l.current === e && i(e);
						});
					},
					onDragEnd: f
				},
				itemProps: {
					"data-tenon-reorder": e,
					"data-tenon-drop": t ?? void 0,
					"data-tenon-dragging": r === e ? "" : void 0,
					onDragOver: (t) => {
						l.current && ($(t), d(l.current === e ? null : {
							key: e,
							after: m(t)
						}));
					},
					onDrop: (t) => {
						l.current && ($(t), l.current !== e && d({
							key: e,
							after: m(t)
						}), p());
					}
				}
			};
		},
		listProps: {
			"data-tenon-axis": n,
			onDragOver: (e) => {
				l.current && $(e);
			},
			onDrop: (e) => {
				l.current && ($(e), p());
			}
		},
		dragging: r
	};
}
//#endregion
//#region src/components/Reorder/bindReorder.ts
function ge(e, t) {
	let { onMove: n, axis: r = "y", grip: i = `[${Y}]`, item: a = `[${G}]`, keyOf: o = (e) => e.getAttribute("data-tenon-reorder") ?? "" } = t;
	e.setAttribute(J, r);
	let s = null, c = null, l = (t) => {
		let n = t instanceof Element ? t.closest(a) : null;
		for (; n && n.parentElement?.closest("[data-tenon-axis]") !== e;) n = n.parentElement?.closest(a) ?? null;
		return n;
	}, u = () => Array.from(e.querySelectorAll(a)).filter((t) => t.parentElement?.closest(`[${J}]`) === e).map(o), d = (e) => {
		X(c, e) && c?.el === e?.el || (c?.el.removeAttribute(K), c = e, e && e.el.setAttribute(K, e.after ? "after" : "before"));
	}, f = () => {
		s?.el.removeAttribute(q), d(null), s = null;
	}, p = (t) => {
		let n = t.target instanceof Element ? t.target.closest(i) : null;
		n && e.contains(n) && l(n) && (n.draggable = !0);
	}, m = (e) => {
		let t = e.target instanceof Element ? e.target.closest(i) : null, n = t && l(t);
		if (!n) return;
		e.stopPropagation();
		let r = o(n);
		Q(e, r, n);
		let a = {
			key: r,
			el: n
		};
		s = a, e.target.addEventListener("dragend", f, { once: !0 }), fe(() => {
			s === a && n.setAttribute(q, "");
		});
	}, h = (e) => {
		if (!s) return;
		$(e);
		let t = l(e.target);
		if (!t) return;
		let n = o(t);
		d(n === s.key ? null : {
			key: n,
			el: t,
			after: Z(t, e.clientX, e.clientY, r)
		});
	}, g = (e) => {
		if (!s) return;
		$(e);
		let t = l(e.target);
		t && o(t) !== s.key && d({
			key: o(t),
			el: t,
			after: Z(t, e.clientX, e.clientY, r)
		});
		let i = s.key, a = c, p = u();
		f(), a && a.key !== i && n(i, de(p, i, a));
	}, _ = (e) => {
		s && $(e);
	};
	return e.addEventListener("pointerdown", p), e.addEventListener("dragstart", m), e.addEventListener("dragenter", _), e.addEventListener("dragover", h), e.addEventListener("drop", g), e.addEventListener("dragend", f), () => {
		f(), e.removeAttribute(J), e.removeEventListener("pointerdown", p), e.removeEventListener("dragstart", m), e.removeEventListener("dragenter", _), e.removeEventListener("dragover", h), e.removeEventListener("drop", g), e.removeEventListener("dragend", f);
	};
}
//#endregion
//#region src/components/Reorder/DragHandle.tsx
function _e({ className: e, ...t }) {
	return /* @__PURE__ */ l("span", {
		className: f("tenon-draghandle", e),
		"aria-hidden": "true",
		"data-tenon-grip": "",
		...t,
		children: /* @__PURE__ */ u("svg", {
			viewBox: "0 0 10 16",
			fill: "currentColor",
			"aria-hidden": "true",
			draggable: !1,
			children: [
				/* @__PURE__ */ l("circle", {
					cx: "3",
					cy: "3",
					r: "1.3"
				}),
				/* @__PURE__ */ l("circle", {
					cx: "7",
					cy: "3",
					r: "1.3"
				}),
				/* @__PURE__ */ l("circle", {
					cx: "3",
					cy: "8",
					r: "1.3"
				}),
				/* @__PURE__ */ l("circle", {
					cx: "7",
					cy: "8",
					r: "1.3"
				}),
				/* @__PURE__ */ l("circle", {
					cx: "3",
					cy: "13",
					r: "1.3"
				}),
				/* @__PURE__ */ l("circle", {
					cx: "7",
					cy: "13",
					r: "1.3"
				})
			]
		})
	});
}
function ve(e) {
	return `<span class="${e ? `tenon-draghandle ${e}` : "tenon-draghandle"}" aria-hidden="true" data-tenon-grip=""><svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" draggable="false">${[
		[3, 3],
		[7, 3],
		[3, 8],
		[7, 8],
		[3, 13],
		[7, 13]
	].map(([e, t]) => `<circle cx="${e}" cy="${t}" r="1.3"></circle>`).join("")}</svg></span>`;
}
//#endregion
//#region src/components/Reorder/DropLine.tsx
function ye({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: f("tenon-dropline", e),
		"aria-hidden": "true",
		...t
	});
}
//#endregion
export { P as Alert, _ as Badge, p as Button, g as Card, y as Column, b as ColumnEmpty, ue as Disclosure, _e as DragHandle, ye as DropLine, le as EditableText, S as Field, m as LinkButton, ce as Markdown, D as Modal, O as ModalPane, N as Pill, F as SegmentedControl, M as Spinner, x as Stat, ne as Switch, v as Tag, k as Textarea, z as Window, me as applySavedOrder, ge as bindReorder, f as cx, ve as dragHandleHTML, W as inlineNodes, pe as reorderKeys, he as useReorder };
