import { forwardRef as e, useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/utils.ts
var u = (...e) => e.filter((e) => typeof e == "string" && e.length > 0).join(" "), d = e(function({ variant: e = "secondary", size: t = "md", iconOnly: n = !1, startIcon: r, endIcon: i, className: a, children: o, type: s = "button", ...l }, d) {
	return /* @__PURE__ */ c("button", {
		ref: d,
		type: s,
		className: u("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, n && "tenon-button--icon-only", a),
		...l,
		children: [
			r,
			o,
			i
		]
	});
});
//#endregion
//#region src/components/Card/Card.tsx
function f(e, t) {
	return t ? typeof t == "object" && t && "__html" in t ? /* @__PURE__ */ s("div", {
		className: e,
		dangerouslySetInnerHTML: t
	}) : /* @__PURE__ */ s("div", {
		className: e,
		children: t
	}) : null;
}
function p({ title: e, eyebrow: t, eyebrowEnd: n, lead: r, action: i, tags: a, meta: o, summary: l, body: d, footer: p, accent: m, elevation: h = "flat", draggable: g, dragging: _, interactive: v, as: y = "article", titleAs: b = "div", className: x, style: S, children: C, ...w }) {
	let T = m ? {
		"--tenon-card-accent": m,
		...S
	} : S;
	return /* @__PURE__ */ c(y, {
		className: u("tenon-card", `tenon-card--${h}`, m && "tenon-card--accent", g && "tenon-card--draggable", _ && "tenon-card--dragging", v && "tenon-card--interactive", x),
		style: T,
		draggable: g,
		...w,
		children: [
			(t || n) && /* @__PURE__ */ c("div", {
				className: "tenon-card__eyebrow",
				children: [t && typeof t == "object" && "__html" in t ? /* @__PURE__ */ s("span", { dangerouslySetInnerHTML: t }) : t, n ? /* @__PURE__ */ s("span", {
					className: "tenon-card__eyebrow-end",
					children: n
				}) : null]
			}),
			(r || e || i) && /* @__PURE__ */ c("div", {
				className: "tenon-card__head",
				children: [
					r ? /* @__PURE__ */ s("span", {
						className: "tenon-card__lead",
						children: r
					}) : null,
					e ? /* @__PURE__ */ s(b, {
						className: "tenon-card__title",
						children: e
					}) : null,
					i ? /* @__PURE__ */ s("span", {
						className: "tenon-card__action",
						children: i
					}) : null
				]
			}),
			f("tenon-card__tags", a),
			f("tenon-card__meta", o),
			f("tenon-card__summary", l),
			d ? /* @__PURE__ */ s("div", {
				className: "tenon-card__body",
				children: d
			}) : null,
			f("tenon-card__footer", p),
			C
		]
	});
}
//#endregion
//#region src/components/Badge/Badge.tsx
function m({ count: e, label: t, max: n = 99, tone: r = "accent", className: i, ...a }) {
	let o = Math.floor(Number(e) || 0);
	if (o < 1) return null;
	let c = o > n ? `${n}+` : String(o), l = t ? `${o} ${t}` : void 0;
	return /* @__PURE__ */ s("span", {
		className: u("tenon-badge", `tenon-badge--${r}`, i),
		title: l,
		"aria-label": l,
		...a,
		children: c
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
function h({ tone: e = "neutral", chart: t, dot: n = !1, className: r, children: i, style: a, ...o }) {
	let l = t ? {
		"--tenon-tag-colour": `var(--tenon-chart-${t})`,
		...a
	} : a;
	return /* @__PURE__ */ c("span", {
		className: u("tenon-tag", t ? "tenon-tag--chart" : `tenon-tag--${e}`, r),
		style: l,
		...o,
		children: [n && /* @__PURE__ */ s("span", {
			className: "tenon-tag__dot",
			"aria-hidden": "true"
		}), i]
	});
}
//#endregion
//#region src/components/Column/Column.tsx
function g({ title: e, titleAs: t = "h2", titleAfter: n, hint: r, sort: i, count: a, action: l, filters: d, desc: f, footer: p, layout: m = "stack", tone: h = "default", muted: g, dashed: _, collapsible: v, open: y, collapseKey: b, className: x, bodyClassName: S, children: C, ...w }) {
	let T = u("tenon-column", h !== "default" && `tenon-column--${h}`, m !== "stack" && `tenon-column--${m}`, g && "tenon-column--muted", _ && "tenon-column--dashed", x), E = /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ c("div", {
		className: "tenon-column__head-row",
		children: [/* @__PURE__ */ c("div", {
			className: "tenon-column__head-start",
			children: [
				v ? /* @__PURE__ */ s("span", {
					className: "tenon-column__chevron",
					"aria-hidden": "true"
				}) : null,
				/* @__PURE__ */ s(t, {
					className: "tenon-column__title",
					children: e
				}),
				n,
				r ? /* @__PURE__ */ s("span", {
					className: "tenon-column__hint",
					children: r
				}) : null
			]
		}), /* @__PURE__ */ c("div", {
			className: "tenon-column__head-end",
			children: [
				i,
				a == null ? null : /* @__PURE__ */ s("span", {
					className: "tenon-column__count",
					children: a
				}),
				l,
				d
			]
		})]
	}), f ? /* @__PURE__ */ s("p", {
		className: "tenon-column__desc",
		children: f
	}) : null] }), D = /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("div", {
		className: u("tenon-column__body", S),
		children: C
	}), p ? /* @__PURE__ */ s("div", {
		className: "tenon-column__footer",
		children: p
	}) : null] });
	return v ? /* @__PURE__ */ c("details", {
		className: T,
		"data-column-collapse": b,
		open: y !== !1,
		...w,
		children: [/* @__PURE__ */ s("summary", {
			className: "tenon-column__head",
			children: E
		}), D]
	}) : /* @__PURE__ */ c("section", {
		className: T,
		...w,
		children: [/* @__PURE__ */ s("div", {
			className: "tenon-column__head",
			children: E
		}), D]
	});
}
function _({ boxed: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ s("div", {
		className: u("tenon-column-empty", e && "tenon-column-empty--boxed", t),
		...r,
		children: n
	});
}
//#endregion
//#region src/components/Stat/Stat.tsx
function v({ eyebrow: e, value: t, caption: n, tone: r = "default", className: i, ...a }) {
	return /* @__PURE__ */ c("div", {
		className: u("tenon-stat", r !== "default" && `tenon-stat--${r}`, i),
		...a,
		children: [
			e ? /* @__PURE__ */ s("span", {
				className: "tenon-stat__eyebrow",
				children: e
			}) : null,
			/* @__PURE__ */ s("span", {
				className: "tenon-stat__value",
				children: t
			}),
			n ? /* @__PURE__ */ s("span", {
				className: "tenon-stat__caption",
				children: n
			}) : null
		]
	});
}
//#endregion
//#region src/components/Field/Field.tsx
function y({ label: e, hint: t, error: n, required: i, className: a, ...o }) {
	let l = r(), d = `${l}-note`, { multiline: f, ...p } = o, m = n ?? t, h = {
		id: l,
		className: "tenon-field__control",
		"aria-invalid": n ? !0 : void 0,
		"aria-describedby": m ? d : void 0,
		required: i,
		...p
	};
	return /* @__PURE__ */ c("div", {
		className: u("tenon-field", n && "tenon-field--invalid", a),
		children: [
			/* @__PURE__ */ c("label", {
				className: "tenon-field__label",
				htmlFor: l,
				children: [e, i && /* @__PURE__ */ s("span", {
					className: "tenon-field__required",
					"aria-hidden": "true",
					children: "*"
				})]
			}),
			s(f ? "textarea" : "input", { ...h }),
			m && /* @__PURE__ */ s("span", {
				id: d,
				className: u("tenon-field__note", n && "tenon-field__note--error"),
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/Modal/Modal.tsx
var b = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])", x = [
	"text",
	"search",
	"url",
	"email",
	"tel",
	"password",
	"number",
	"date"
];
function S(e) {
	return e instanceof HTMLElement ? e instanceof HTMLTextAreaElement || e.isContentEditable ? !0 : e instanceof HTMLInputElement && x.includes((e.type || "text").toLowerCase()) : !1;
}
function C(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) || "null");
		if (t && t.w > 0 && t.h > 0) return t;
	} catch {}
	return null;
}
function w({ open: e, onClose: t, title: i, subtitle: o, headEnd: f, footer: p, size: m = "md", layout: h = "stack", resizable: g = !1, resizeKey: _, closeButton: v = !0, initialFocus: y = "box", onSubmit: x, className: w, children: T }) {
	let E = a(null), D = r(), O = a(t);
	O.current = t;
	let k = a(x);
	return k.current = x, n(() => {
		if (!e) return;
		let t = document.activeElement, n = E.current;
		((y === "footer" ? n.querySelector(".tenon-modal__footer button:not([disabled])") : null) ?? n.querySelector("[autofocus]") ?? n).focus();
		let r = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation(), O.current();
				return;
			}
			if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
				k.current && n.contains(e.target) && S(e.target) && (e.preventDefault(), k.current());
				return;
			}
			if (e.key !== "Tab") return;
			let t = Array.from(n.querySelectorAll(b));
			if (!t.length) {
				e.preventDefault();
				return;
			}
			let r = t[0], i = t[t.length - 1];
			e.shiftKey && (document.activeElement === r || document.activeElement === n) ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r.focus());
		};
		return document.addEventListener("keydown", r, !0), () => {
			document.removeEventListener("keydown", r, !0), t?.focus?.();
		};
	}, [e, y]), n(() => {
		if (!e || !g || !_ || typeof ResizeObserver != "function") return;
		let t = E.current, n = C(_);
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
	]), e ? l(/* @__PURE__ */ c("div", {
		className: "tenon-modal",
		children: [/* @__PURE__ */ s("div", {
			className: "tenon-modal__scrim",
			onClick: () => O.current()
		}), /* @__PURE__ */ c("div", {
			ref: E,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": D,
			tabIndex: -1,
			className: u("tenon-modal__box", `tenon-modal__box--${m}`, g && "tenon-modal__box--resizable", w),
			children: [
				/* @__PURE__ */ c("div", {
					className: "tenon-modal__head",
					children: [
						/* @__PURE__ */ c("div", {
							className: "tenon-modal__titles",
							children: [/* @__PURE__ */ s("h2", {
								id: D,
								className: "tenon-modal__title",
								children: i
							}), o && /* @__PURE__ */ s("div", {
								className: "tenon-modal__subtitle",
								children: o
							})]
						}),
						f,
						v && /* @__PURE__ */ s(d, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": "Close",
							onClick: () => O.current(),
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ s("div", {
					className: u("tenon-modal__body", h === "split" && "tenon-modal__body--split"),
					children: T
				}),
				p && /* @__PURE__ */ s("div", {
					className: "tenon-modal__footer",
					children: p
				})
			]
		})]
	}), document.body) : null;
}
function T({ aside: e = !1, className: t, children: n }) {
	return /* @__PURE__ */ s("div", {
		className: u("tenon-modal__pane", e && "tenon-modal__pane--aside", t),
		children: n
	});
}
//#endregion
//#region src/components/Textarea/Textarea.tsx
var E = e(function({ autoGrow: e = !1, invalid: n, className: r, onChange: o, value: c, rows: l = 1, ...d }, f) {
	let p = a(null), m = t(() => {
		let t = p.current;
		t && e && (t.style.height = "auto", t.style.height = `${t.scrollHeight + (t.offsetHeight - t.clientHeight)}px`);
	}, [e]);
	return i(m, [m, c]), /* @__PURE__ */ s("textarea", {
		ref: (e) => {
			p.current = e, typeof f == "function" ? f(e) : f && (f.current = e);
		},
		rows: l,
		value: c,
		"aria-invalid": n ? !0 : void 0,
		className: u("tenon-textarea", e && "tenon-textarea--auto", n && "tenon-textarea--invalid", r),
		onChange: (e) => {
			m(), o?.(e);
		},
		...d
	});
});
//#endregion
//#region src/components/Spinner/Spinner.tsx
function D({ size: e = "md", label: t = "Working", className: n, ...r }) {
	return /* @__PURE__ */ s("span", {
		role: "status",
		"aria-label": t,
		className: u("tenon-spinner", `tenon-spinner--${e}`, n),
		...r
	});
}
//#endregion
//#region src/components/Pill/Pill.tsx
function O({ tone: e = "neutral", dot: t = !1, caps: n = !1, className: r, children: i, ...a }) {
	return /* @__PURE__ */ c("span", {
		className: u("tenon-pill", `tenon-pill--${e}`, n && "tenon-pill--caps", r),
		...a,
		children: [t && /* @__PURE__ */ s("span", {
			className: "tenon-pill__dot",
			"aria-hidden": "true"
		}), i]
	});
}
//#endregion
//#region src/components/Alert/Alert.tsx
var k = {
	neutral: "status",
	info: "status",
	success: "status",
	warning: "alert",
	error: "alert"
};
function A({ tone: e = "neutral", title: t, actions: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ c("div", {
		role: k[e],
		className: u("tenon-alert", `tenon-alert--${e}`, r),
		...a,
		children: [
			t && /* @__PURE__ */ s("div", {
				className: "tenon-alert__title",
				children: t
			}),
			i && /* @__PURE__ */ s("div", {
				className: "tenon-alert__body",
				children: i
			}),
			n && /* @__PURE__ */ s("div", {
				className: "tenon-alert__actions",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/Switch/Switch.tsx
var j = e(function({ checked: e, onChange: t, className: n, onClick: r, type: i = "button", ...a }, o) {
	return /* @__PURE__ */ s("button", {
		ref: o,
		type: i,
		role: "switch",
		"aria-checked": e,
		className: u("tenon-switch", e && "tenon-switch--on", n),
		onClick: (n) => {
			r?.(n), n.defaultPrevented || t?.(!e);
		},
		...a
	});
});
//#endregion
//#region src/components/SegmentedControl/SegmentedControl.tsx
function M({ options: e, value: t, onChange: n, className: r, ...i }) {
	let o = a(null), c = (t, r) => {
		let i = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : t.key === "ArrowLeft" || t.key === "ArrowUp" ? -1 : 0;
		if (i) {
			t.preventDefault();
			for (let t = 1; t <= e.length; t++) {
				let a = e[(r + i * t + e.length * t) % e.length];
				if (!a.disabled) {
					n(a.value), o.current?.querySelector(`[data-value="${CSS.escape(a.value)}"]`)?.focus();
					return;
				}
			}
		}
	};
	return /* @__PURE__ */ s("div", {
		ref: o,
		role: "radiogroup",
		className: u("tenon-segmented", r),
		...i,
		children: e.map((e, r) => {
			let i = e.value === t;
			return /* @__PURE__ */ s("button", {
				type: "button",
				role: "radio",
				"aria-checked": i,
				"data-value": e.value,
				disabled: e.disabled,
				tabIndex: i ? 0 : -1,
				className: u("tenon-segmented__option", i && "tenon-segmented__option--on"),
				onClick: () => n(e.value),
				onKeyDown: (e) => c(e, r),
				children: e.label
			}, e.value);
		})
	});
}
//#endregion
export { A as Alert, m as Badge, d as Button, p as Card, g as Column, _ as ColumnEmpty, y as Field, w as Modal, T as ModalPane, O as Pill, M as SegmentedControl, D as Spinner, v as Stat, j as Switch, h as Tag, E as Textarea, u as cx };
