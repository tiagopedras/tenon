import { forwardRef as e, useId as t } from "react";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/utils.ts
var a = (...e) => e.filter((e) => typeof e == "string" && e.length > 0).join(" "), o = e(function({ variant: e = "secondary", size: t = "md", iconOnly: n = !1, startIcon: r, endIcon: o, className: s, children: c, type: l = "button", ...u }, d) {
	return /* @__PURE__ */ i("button", {
		ref: d,
		type: l,
		className: a("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, n && "tenon-button--icon-only", s),
		...u,
		children: [
			r,
			c,
			o
		]
	});
});
//#endregion
//#region src/components/Card/Card.tsx
function s(e, t) {
	return t ? typeof t == "object" && t && "__html" in t ? /* @__PURE__ */ r("div", {
		className: e,
		dangerouslySetInnerHTML: t
	}) : /* @__PURE__ */ r("div", {
		className: e,
		children: t
	}) : null;
}
function c({ title: e, eyebrow: t, eyebrowEnd: n, lead: o, action: c, tags: l, meta: u, summary: d, body: f, footer: p, accent: m, elevation: h = "flat", draggable: g, dragging: _, interactive: v, as: y = "article", titleAs: b = "div", className: x, style: S, children: C, ...w }) {
	let T = m ? {
		"--tenon-card-accent": m,
		...S
	} : S;
	return /* @__PURE__ */ i(y, {
		className: a("tenon-card", `tenon-card--${h}`, m && "tenon-card--accent", g && "tenon-card--draggable", _ && "tenon-card--dragging", v && "tenon-card--interactive", x),
		style: T,
		draggable: g,
		...w,
		children: [
			(t || n) && /* @__PURE__ */ i("div", {
				className: "tenon-card__eyebrow",
				children: [t && typeof t == "object" && "__html" in t ? /* @__PURE__ */ r("span", { dangerouslySetInnerHTML: t }) : t, n ? /* @__PURE__ */ r("span", {
					className: "tenon-card__eyebrow-end",
					children: n
				}) : null]
			}),
			(o || e || c) && /* @__PURE__ */ i("div", {
				className: "tenon-card__head",
				children: [
					o ? /* @__PURE__ */ r("span", {
						className: "tenon-card__lead",
						children: o
					}) : null,
					e ? /* @__PURE__ */ r(b, {
						className: "tenon-card__title",
						children: e
					}) : null,
					c ? /* @__PURE__ */ r("span", {
						className: "tenon-card__action",
						children: c
					}) : null
				]
			}),
			s("tenon-card__tags", l),
			s("tenon-card__meta", u),
			s("tenon-card__summary", d),
			f ? /* @__PURE__ */ r("div", {
				className: "tenon-card__body",
				children: f
			}) : null,
			s("tenon-card__footer", p),
			C
		]
	});
}
//#endregion
//#region src/components/Badge/Badge.tsx
function l({ count: e, label: t, max: n = 99, tone: i = "accent", className: o, ...s }) {
	let c = Math.floor(Number(e) || 0);
	if (c < 1) return null;
	let l = c > n ? `${n}+` : String(c), u = t ? `${c} ${t}` : void 0;
	return /* @__PURE__ */ r("span", {
		className: a("tenon-badge", `tenon-badge--${i}`, o),
		title: u,
		"aria-label": u,
		...s,
		children: l
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
function u({ tone: e = "neutral", chart: t, dot: n = !1, className: o, children: s, style: c, ...l }) {
	let u = t ? {
		"--tenon-tag-colour": `var(--tenon-chart-${t})`,
		...c
	} : c;
	return /* @__PURE__ */ i("span", {
		className: a("tenon-tag", t ? "tenon-tag--chart" : `tenon-tag--${e}`, o),
		style: u,
		...l,
		children: [n && /* @__PURE__ */ r("span", {
			className: "tenon-tag__dot",
			"aria-hidden": "true"
		}), s]
	});
}
//#endregion
//#region src/components/Column/Column.tsx
function d({ title: e, titleAs: t = "h2", titleAfter: o, hint: s, sort: c, count: l, action: u, filters: d, desc: f, footer: p, layout: m = "stack", tone: h = "default", muted: g, dashed: _, collapsible: v, open: y, collapseKey: b, className: x, bodyClassName: S, children: C, ...w }) {
	let T = a("tenon-column", h !== "default" && `tenon-column--${h}`, m !== "stack" && `tenon-column--${m}`, g && "tenon-column--muted", _ && "tenon-column--dashed", x), E = /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ i("div", {
		className: "tenon-column__head-row",
		children: [/* @__PURE__ */ i("div", {
			className: "tenon-column__head-start",
			children: [
				v ? /* @__PURE__ */ r("span", {
					className: "tenon-column__chevron",
					"aria-hidden": "true"
				}) : null,
				/* @__PURE__ */ r(t, {
					className: "tenon-column__title",
					children: e
				}),
				o,
				s ? /* @__PURE__ */ r("span", {
					className: "tenon-column__hint",
					children: s
				}) : null
			]
		}), /* @__PURE__ */ i("div", {
			className: "tenon-column__head-end",
			children: [
				c,
				l == null ? null : /* @__PURE__ */ r("span", {
					className: "tenon-column__count",
					children: l
				}),
				u,
				d
			]
		})]
	}), f ? /* @__PURE__ */ r("p", {
		className: "tenon-column__desc",
		children: f
	}) : null] }), D = /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r("div", {
		className: a("tenon-column__body", S),
		children: C
	}), p ? /* @__PURE__ */ r("div", {
		className: "tenon-column__footer",
		children: p
	}) : null] });
	return v ? /* @__PURE__ */ i("details", {
		className: T,
		"data-column-collapse": b,
		open: y !== !1,
		...w,
		children: [/* @__PURE__ */ r("summary", {
			className: "tenon-column__head",
			children: E
		}), D]
	}) : /* @__PURE__ */ i("section", {
		className: T,
		...w,
		children: [/* @__PURE__ */ r("div", {
			className: "tenon-column__head",
			children: E
		}), D]
	});
}
function f({ boxed: e, className: t, children: n, ...i }) {
	return /* @__PURE__ */ r("div", {
		className: a("tenon-column-empty", e && "tenon-column-empty--boxed", t),
		...i,
		children: n
	});
}
//#endregion
//#region src/components/Stat/Stat.tsx
function p({ eyebrow: e, value: t, caption: n, tone: o = "default", className: s, ...c }) {
	return /* @__PURE__ */ i("div", {
		className: a("tenon-stat", o !== "default" && `tenon-stat--${o}`, s),
		...c,
		children: [
			e ? /* @__PURE__ */ r("span", {
				className: "tenon-stat__eyebrow",
				children: e
			}) : null,
			/* @__PURE__ */ r("span", {
				className: "tenon-stat__value",
				children: t
			}),
			n ? /* @__PURE__ */ r("span", {
				className: "tenon-stat__caption",
				children: n
			}) : null
		]
	});
}
//#endregion
//#region src/components/Field/Field.tsx
function m({ label: e, hint: n, error: o, required: s, className: c, ...l }) {
	let u = t(), d = `${u}-note`, { multiline: f, ...p } = l, m = o ?? n, h = {
		id: u,
		className: "tenon-field__control",
		"aria-invalid": o ? !0 : void 0,
		"aria-describedby": m ? d : void 0,
		required: s,
		...p
	};
	return /* @__PURE__ */ i("div", {
		className: a("tenon-field", o && "tenon-field--invalid", c),
		children: [
			/* @__PURE__ */ i("label", {
				className: "tenon-field__label",
				htmlFor: u,
				children: [e, s && /* @__PURE__ */ r("span", {
					className: "tenon-field__required",
					"aria-hidden": "true",
					children: "*"
				})]
			}),
			r(f ? "textarea" : "input", { ...h }),
			m && /* @__PURE__ */ r("span", {
				id: d,
				className: a("tenon-field__note", o && "tenon-field__note--error"),
				children: m
			})
		]
	});
}
//#endregion
export { l as Badge, o as Button, c as Card, d as Column, f as ColumnEmpty, m as Field, p as Stat, u as Tag, a as cx };
