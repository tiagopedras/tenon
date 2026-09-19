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
var b = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function x({ open: e, onClose: t, title: i, subtitle: o, headEnd: d, footer: f, size: p = "md", className: m, children: h }) {
	let g = a(null), _ = r(), v = a(t);
	return v.current = t, n(() => {
		if (!e) return;
		let t = document.activeElement, n = g.current;
		(n.querySelector("[autofocus]") ?? n).focus();
		let r = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation(), v.current();
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
	}, [e]), e ? l(/* @__PURE__ */ c("div", {
		className: "tenon-modal",
		children: [/* @__PURE__ */ s("div", {
			className: "tenon-modal__scrim",
			onClick: () => v.current()
		}), /* @__PURE__ */ c("div", {
			ref: g,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": _,
			tabIndex: -1,
			className: u("tenon-modal__box", `tenon-modal__box--${p}`, m),
			children: [
				/* @__PURE__ */ c("div", {
					className: "tenon-modal__head",
					children: [/* @__PURE__ */ c("div", {
						className: "tenon-modal__titles",
						children: [/* @__PURE__ */ s("h2", {
							id: _,
							className: "tenon-modal__title",
							children: i
						}), o && /* @__PURE__ */ s("div", {
							className: "tenon-modal__subtitle",
							children: o
						})]
					}), d]
				}),
				/* @__PURE__ */ s("div", {
					className: "tenon-modal__body",
					children: h
				}),
				f && /* @__PURE__ */ s("div", {
					className: "tenon-modal__footer",
					children: f
				})
			]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/Textarea/Textarea.tsx
var S = e(function({ autoGrow: e = !1, invalid: n, className: r, onChange: o, value: c, rows: l = 1, ...d }, f) {
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
function C({ size: e = "md", label: t = "Working", className: n, ...r }) {
	return /* @__PURE__ */ s("span", {
		role: "status",
		"aria-label": t,
		className: u("tenon-spinner", `tenon-spinner--${e}`, n),
		...r
	});
}
//#endregion
//#region src/components/Pill/Pill.tsx
function w({ tone: e = "neutral", dot: t = !1, caps: n = !1, className: r, children: i, ...a }) {
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
var T = {
	neutral: "status",
	info: "status",
	success: "status",
	warning: "alert",
	error: "alert"
};
function E({ tone: e = "neutral", title: t, actions: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ c("div", {
		role: T[e],
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
var D = e(function({ checked: e, onChange: t, className: n, onClick: r, type: i = "button", ...a }, o) {
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
function O({ options: e, value: t, onChange: n, className: r, ...i }) {
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
export { E as Alert, m as Badge, d as Button, p as Card, g as Column, _ as ColumnEmpty, y as Field, x as Modal, w as Pill, O as SegmentedControl, C as Spinner, v as Stat, D as Switch, h as Tag, S as Textarea, u as cx };
