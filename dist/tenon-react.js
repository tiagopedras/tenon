import { forwardRef as e, useId as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/utils.ts
var i = (...e) => e.filter((e) => typeof e == "string" && e.length > 0).join(" "), a = e(function({ variant: e = "secondary", size: t = "md", iconOnly: n = !1, startIcon: a, endIcon: o, className: s, children: c, type: l = "button", ...u }, d) {
	return /* @__PURE__ */ r("button", {
		ref: d,
		type: l,
		className: i("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, n && "tenon-button--icon-only", s),
		...u,
		children: [
			a,
			c,
			o
		]
	});
});
//#endregion
//#region src/components/Card/Card.tsx
function o(e, t) {
	return t ? typeof t == "object" && t && "__html" in t ? /* @__PURE__ */ n("div", {
		className: e,
		dangerouslySetInnerHTML: t
	}) : /* @__PURE__ */ n("div", {
		className: e,
		children: t
	}) : null;
}
function s({ title: e, eyebrow: t, lead: a, action: s, tags: c, meta: l, summary: u, body: d, footer: f, accent: p, elevation: m = "flat", draggable: h, dragging: g, interactive: _, as: v = "article", className: y, style: b, children: x, ...S }) {
	let C = p ? {
		"--tenon-card-accent": p,
		...b
	} : b;
	return /* @__PURE__ */ r(v, {
		className: i("tenon-card", `tenon-card--${m}`, p && "tenon-card--accent", h && "tenon-card--draggable", g && "tenon-card--dragging", _ && "tenon-card--interactive", y),
		style: C,
		draggable: h,
		...S,
		children: [
			o("tenon-card__eyebrow", t),
			(a || e || s) && /* @__PURE__ */ r("div", {
				className: "tenon-card__head",
				children: [
					a ? /* @__PURE__ */ n("span", {
						className: "tenon-card__lead",
						children: a
					}) : null,
					e ? /* @__PURE__ */ n("div", {
						className: "tenon-card__title",
						children: e
					}) : null,
					s ? /* @__PURE__ */ n("span", {
						className: "tenon-card__action",
						children: s
					}) : null
				]
			}),
			o("tenon-card__tags", c),
			o("tenon-card__meta", l),
			o("tenon-card__summary", u),
			d ? /* @__PURE__ */ n("div", {
				className: "tenon-card__body",
				children: d
			}) : null,
			o("tenon-card__footer", f),
			x
		]
	});
}
//#endregion
//#region src/components/Badge/Badge.tsx
function c({ count: e, label: t, max: r = 99, tone: a = "accent", className: o, ...s }) {
	let c = Math.floor(Number(e) || 0);
	if (c < 1) return null;
	let l = c > r ? `${r}+` : String(c), u = t ? `${c} ${t}` : void 0;
	return /* @__PURE__ */ n("span", {
		className: i("tenon-badge", `tenon-badge--${a}`, o),
		title: u,
		"aria-label": u,
		...s,
		children: l
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
function l({ tone: e = "neutral", chart: t, dot: a = !1, className: o, children: s, style: c, ...l }) {
	let u = t ? {
		"--tenon-tag-colour": `var(--tenon-chart-${t})`,
		...c
	} : c;
	return /* @__PURE__ */ r("span", {
		className: i("tenon-tag", t ? "tenon-tag--chart" : `tenon-tag--${e}`, o),
		style: u,
		...l,
		children: [a && /* @__PURE__ */ n("span", {
			className: "tenon-tag__dot",
			"aria-hidden": "true"
		}), s]
	});
}
//#endregion
//#region src/components/Field/Field.tsx
function u({ label: e, hint: a, error: o, required: s, className: c, ...l }) {
	let u = t(), d = `${u}-note`, { multiline: f, ...p } = l, m = o ?? a, h = {
		id: u,
		className: "tenon-field__control",
		"aria-invalid": o ? !0 : void 0,
		"aria-describedby": m ? d : void 0,
		required: s,
		...p
	};
	return /* @__PURE__ */ r("div", {
		className: i("tenon-field", o && "tenon-field--invalid", c),
		children: [
			/* @__PURE__ */ r("label", {
				className: "tenon-field__label",
				htmlFor: u,
				children: [e, s && /* @__PURE__ */ n("span", {
					className: "tenon-field__required",
					"aria-hidden": "true",
					children: "*"
				})]
			}),
			n(f ? "textarea" : "input", { ...h }),
			m && /* @__PURE__ */ n("span", {
				id: d,
				className: i("tenon-field__note", o && "tenon-field__note--error"),
				children: m
			})
		]
	});
}
//#endregion
export { c as Badge, a as Button, s as Card, u as Field, l as Tag, i as cx };
