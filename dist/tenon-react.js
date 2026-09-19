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
//#region src/components/Badge/Badge.tsx
function o({ tone: e = "neutral", chart: t, dot: a = !1, className: o, children: s, style: c, ...l }) {
	let u = t ? {
		"--tenon-chart-colour": `var(--tenon-chart-${t})`,
		...c
	} : c;
	return /* @__PURE__ */ r("span", {
		className: i("tenon-badge", t ? "tenon-badge--chart" : `tenon-badge--${e}`, o),
		style: u,
		...l,
		children: [a && /* @__PURE__ */ n("span", {
			className: "tenon-badge__dot",
			"aria-hidden": "true"
		}), s]
	});
}
//#endregion
//#region src/components/Card/Card.tsx
var s = e(function({ elevation: e = "raised", padding: t = "md", interactive: r = !1, className: a, children: o, ...s }, c) {
	return /* @__PURE__ */ n("div", {
		ref: c,
		className: i("tenon-card", `tenon-card--${e}`, `tenon-card--pad-${t}`, r && "tenon-card--interactive", a),
		...s,
		children: o
	});
});
//#endregion
//#region src/components/Field/Field.tsx
function c({ label: e, hint: a, error: o, required: s, className: c, ...l }) {
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
export { o as Badge, a as Button, s as Card, c as Field, i as cx };
