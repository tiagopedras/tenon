import { Fragment as e, forwardRef as t, useCallback as n, useEffect as r, useId as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { createPortal as d } from "react-dom";
import { ThinkingOrb as f } from "thinking-orbs";
//#region src/utils.ts
var p = (...e) => e.filter((e) => typeof e == "string" && e.length > 0).join(" "), m = t(function({ variant: e = "secondary", size: t = "md", iconOnly: n = !1, startIcon: r, endIcon: i, className: a, children: o, type: s = "button", ...c }, l) {
	return /* @__PURE__ */ u("button", {
		ref: l,
		type: s,
		className: p("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, n && "tenon-button--icon-only", a),
		...c,
		children: [
			r,
			o,
			i
		]
	});
}), h = t(function({ variant: e = "secondary", size: t = "md", startIcon: n, endIcon: r, className: i, children: a, ...o }, s) {
	return /* @__PURE__ */ u("a", {
		ref: s,
		className: p("tenon-button", `tenon-button--${e}`, `tenon-button--${t}`, i),
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
function g(e, t) {
	return t ? typeof t == "object" && t && "__html" in t ? /* @__PURE__ */ l("div", {
		className: e,
		dangerouslySetInnerHTML: t
	}) : /* @__PURE__ */ l("div", {
		className: e,
		children: t
	}) : null;
}
function _({ title: e, eyebrow: t, eyebrowEnd: n, lead: r, action: i, tags: a, meta: o, summary: s, body: c, footer: d, accent: f, elevation: m = "flat", draggable: h, dragging: _, interactive: v, as: y = "article", titleAs: b = "div", className: x, style: S, children: C, ...w }) {
	let T = f ? {
		"--tenon-card-accent": f,
		...S
	} : S;
	return /* @__PURE__ */ u(y, {
		className: p("tenon-card", `tenon-card--${m}`, f && "tenon-card--accent", h && "tenon-card--draggable", _ && "tenon-card--dragging", v && "tenon-card--interactive", x),
		style: T,
		draggable: h,
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
			g("tenon-card__tags", a),
			g("tenon-card__meta", o),
			g("tenon-card__summary", s),
			c ? /* @__PURE__ */ l("div", {
				className: "tenon-card__body",
				children: c
			}) : null,
			g("tenon-card__footer", d),
			C
		]
	});
}
//#endregion
//#region src/components/Badge/Badge.tsx
function v({ count: e, label: t, max: n = 99, tone: r = "accent", className: i, ...a }) {
	let o = Math.floor(Number(e) || 0);
	if (o < 1) return null;
	let s = o > n ? `${n}+` : String(o), c = t ? `${o} ${t}` : void 0;
	return /* @__PURE__ */ l("span", {
		className: p("tenon-badge", `tenon-badge--${r}`, i),
		title: c,
		"aria-label": c,
		...a,
		children: s
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
function y({ tone: e = "neutral", chart: t, dot: n = !1, className: r, children: i, style: a, ...o }) {
	let s = t ? {
		"--tenon-tag-colour": `var(--tenon-chart-${t})`,
		...a
	} : a;
	return /* @__PURE__ */ u("span", {
		className: p("tenon-tag", t ? "tenon-tag--chart" : `tenon-tag--${e}`, r),
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
function b({ title: e, titleAs: t = "h2", titleAfter: n, hint: r, sort: i, count: a, action: o, filters: s, desc: d, footer: f, layout: m = "stack", tone: h = "default", muted: g, dashed: _, collapsible: v, open: y, collapseKey: b, className: x, bodyClassName: S, bodyProps: C, children: w, ...T }) {
	let E = p("tenon-column", h !== "default" && `tenon-column--${h}`, m !== "stack" && `tenon-column--${m}`, g && "tenon-column--muted", _ && "tenon-column--dashed", x), D = /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ u("div", {
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
		className: p("tenon-column__body", S, C?.className),
		children: w
	}), f ? /* @__PURE__ */ l("div", {
		className: "tenon-column__footer",
		children: f
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
function x({ boxed: e, className: t, children: n, ...r }) {
	return /* @__PURE__ */ l("div", {
		className: p("tenon-column-empty", e && "tenon-column-empty--boxed", t),
		...r,
		children: n
	});
}
//#endregion
//#region src/components/Stat/Stat.tsx
function S({ eyebrow: e, value: t, caption: n, tone: r = "default", className: i, ...a }) {
	return /* @__PURE__ */ u("div", {
		className: p("tenon-stat", r !== "default" && `tenon-stat--${r}`, i),
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
function C({ label: e, hint: t, error: n, required: r, className: a, ...o }) {
	let s = i(), c = `${s}-note`, { multiline: d, ...f } = o, m = n ?? t, h = {
		id: s,
		className: "tenon-field__control",
		"aria-invalid": n ? !0 : void 0,
		"aria-describedby": m ? c : void 0,
		required: r,
		...f
	};
	return /* @__PURE__ */ u("div", {
		className: p("tenon-field", n && "tenon-field--invalid", a),
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
				className: p("tenon-field__note", n && "tenon-field__note--error"),
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/Modal/Modal.tsx
var w = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])", T = [
	"text",
	"search",
	"url",
	"email",
	"tel",
	"password",
	"number",
	"date"
];
function E(e) {
	return e instanceof HTMLElement ? e instanceof HTMLTextAreaElement || e.isContentEditable ? !0 : e instanceof HTMLInputElement && T.includes((e.type || "text").toLowerCase()) : !1;
}
function D(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) || "null");
		if (t && t.w > 0 && t.h > 0) return t;
	} catch {}
	return null;
}
function O({ open: e, onClose: t, title: n, subtitle: a, headEnd: s, footer: c, size: f = "md", layout: h = "stack", resizable: g = !1, resizeKey: _, closeButton: v = !0, bare: y = !1, initialFocus: b = "box", onSubmit: x, className: S, children: C }) {
	let T = o(null), O = i(), k = o(t);
	k.current = t;
	let A = o(x);
	return A.current = x, r(() => {
		if (!e) return;
		let t = document.activeElement, n = T.current, r = b === "footer" ? n.querySelector(".tenon-modal__footer button:not([disabled])") : null;
		n.contains(document.activeElement) || (r ?? n.querySelector("[autofocus]") ?? n).focus();
		let i = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation(), k.current();
				return;
			}
			if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
				A.current && n.contains(e.target) && E(e.target) && (e.preventDefault(), A.current());
				return;
			}
			if (e.key !== "Tab") return;
			let t = Array.from(n.querySelectorAll(w));
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
		let t = T.current, n = D(_);
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
			ref: T,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": O,
			tabIndex: -1,
			className: p("tenon-modal__box", `tenon-modal__box--${f}`, g && "tenon-modal__box--resizable", S),
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
						v && /* @__PURE__ */ l(m, {
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
					className: p("tenon-modal__body", h === "split" && "tenon-modal__body--split", y && "tenon-modal__body--bare"),
					children: C
				}),
				c && /* @__PURE__ */ l("div", {
					className: p("tenon-modal__footer", y && "tenon-modal__footer--bare"),
					children: c
				})
			]
		})]
	}), document.body) : null;
}
function k({ aside: e = !1, className: t, children: n }) {
	return /* @__PURE__ */ l("div", {
		className: p("tenon-modal__pane", e && "tenon-modal__pane--aside", t),
		children: n
	});
}
//#endregion
//#region src/components/Textarea/Textarea.tsx
var A = t(function({ autoGrow: e = !1, invalid: t, className: r, onChange: i, value: s, rows: c = 1, ...u }, d) {
	let f = o(null), m = n(() => {
		let t = f.current;
		t && e && (t.style.height = "auto", t.style.height = `${t.scrollHeight + (t.offsetHeight - t.clientHeight)}px`);
	}, [e]);
	return a(m, [m, s]), /* @__PURE__ */ l("textarea", {
		ref: (e) => {
			f.current = e, typeof d == "function" ? d(e) : d && (d.current = e);
		},
		rows: c,
		value: s,
		"aria-invalid": t ? !0 : void 0,
		className: p("tenon-textarea", e && "tenon-textarea--auto", t && "tenon-textarea--invalid", r),
		onChange: (e) => {
			m(), i?.(e);
		},
		...u
	});
}), j = [
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
], ee = 110, M = {
	sm: 20,
	md: 20,
	lg: 64
};
function te() {
	return typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ne(e) {
	let t = e.trim().match(/^#([0-9a-f]{6})$/i);
	if (!t) return null;
	let n = parseInt(t[1], 16);
	return (.2126 * (n >> 16 & 255) + .7152 * (n >> 8 & 255) + .0722 * (n & 255)) / 255;
}
function N(e, t) {
	let [n, i] = s({ theme: "auto" });
	return r(() => {
		let n = e.current;
		if (!t || !n || typeof getComputedStyle != "function") return;
		let r = () => {
			let e = getComputedStyle(n), t = ne(e.getPropertyValue("--tenon-background-default")), r = t === null ? "auto" : t < .5 ? "dark" : "light", a = t === null ? void 0 : e.color;
			i((e) => e.color === a && e.theme === r ? e : {
				color: a,
				theme: r
			});
		};
		r();
		let a = typeof MutationObserver == "function" ? new MutationObserver(r) : null;
		a?.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme"],
			subtree: !0
		});
		let o = typeof matchMedia == "function" ? matchMedia("(prefers-color-scheme: dark)") : null;
		return o?.addEventListener("change", r), () => {
			a?.disconnect(), o?.removeEventListener("change", r);
		};
	}, [e, t]), n;
}
function re({ size: e = "md", label: t = "Working", variant: n = "orb", state: i = "solving", className: a, ...c }) {
	let d = o(null), m = N(d, n === "orb"), [h, g] = s(0);
	return r(() => {
		if (n !== "glyph" || te()) return;
		let e = setInterval(() => g((e) => (e + 1) % j.length), ee);
		return () => clearInterval(e);
	}, [n]), /* @__PURE__ */ u("span", {
		ref: d,
		role: "status",
		"aria-label": t,
		className: p("tenon-spinner", `tenon-spinner--${e}`, n !== "ring" && `tenon-spinner--${n}`, a),
		...c,
		children: [n === "glyph" && /* @__PURE__ */ l("span", {
			"aria-hidden": "true",
			children: j[h]
		}), n === "orb" && /* @__PURE__ */ l(f, {
			state: i,
			size: M[e],
			theme: m.theme,
			color: m.color,
			className: "tenon-spinner__orb",
			style: {
				width: void 0,
				height: void 0
			},
			"aria-hidden": "true"
		})]
	});
}
//#endregion
//#region src/components/Pill/Pill.tsx
function P({ tone: e = "neutral", dot: t = !1, caps: n = !1, className: r, children: i, ...a }) {
	return /* @__PURE__ */ u("span", {
		className: p("tenon-pill", `tenon-pill--${e}`, n && "tenon-pill--caps", r),
		...a,
		children: [t && /* @__PURE__ */ l("span", {
			className: "tenon-pill__dot",
			"aria-hidden": "true"
		}), i]
	});
}
//#endregion
//#region src/components/Alert/Alert.tsx
var F = {
	neutral: "status",
	info: "status",
	success: "status",
	warning: "alert",
	error: "alert"
};
function ie({ tone: e = "neutral", title: t, actions: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ u("div", {
		role: F[e],
		className: p("tenon-alert", `tenon-alert--${e}`, r),
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
var I = t(function({ checked: e, onChange: t, className: n, onClick: r, type: i = "button", ...a }, o) {
	return /* @__PURE__ */ l("button", {
		ref: o,
		type: i,
		role: "switch",
		"aria-checked": e,
		className: p("tenon-switch", e && "tenon-switch--on", n),
		onClick: (n) => {
			r?.(n), n.defaultPrevented || t?.(!e);
		},
		...a
	});
});
//#endregion
//#region src/components/SegmentedControl/SegmentedControl.tsx
function ae({ options: e, value: t, onChange: n, className: r, ...i }) {
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
		className: p("tenon-segmented", r),
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
				className: p("tenon-segmented__option", i && "tenon-segmented__option--on"),
				onClick: () => n(e.value),
				onKeyDown: (e) => s(e, r),
				children: e.label
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/ToggleGroup/ToggleGroup.tsx
function L({ options: e, value: t, onToggle: n, className: r, ...i }) {
	return /* @__PURE__ */ l("div", {
		role: "group",
		className: p("tenon-toggle-group", r),
		...i,
		children: e.map((e) => {
			let r = t.includes(e.value);
			return /* @__PURE__ */ u("button", {
				type: "button",
				"aria-pressed": r,
				"data-value": e.value,
				title: e.title,
				disabled: e.disabled,
				className: p("tenon-toggle-group__option", r && "tenon-toggle-group__option--on", e.className),
				style: e.colour ? { "--tenon-toggle-colour": e.colour } : void 0,
				onClick: () => n(e.value),
				children: [
					e.colour && /* @__PURE__ */ l("i", {
						className: "tenon-toggle-group__dot",
						"aria-hidden": "true"
					}),
					e.label,
					e.count !== void 0 && /* @__PURE__ */ l("span", {
						className: "tenon-toggle-group__count",
						children: e.count
					})
				]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/ToggleChip/ToggleChip.tsx
function oe({ pressed: e, className: t, type: n = "button", ...r }) {
	return /* @__PURE__ */ l("button", {
		type: n,
		"aria-pressed": e,
		className: p("tenon-toggle-chip", e && "tenon-toggle-chip--on", t),
		...r
	});
}
//#endregion
//#region src/components/StepSlider/StepSlider.tsx
var R = (e, t) => t < 2 ? "50%" : e === 0 ? "var(--step-inset)" : e === t - 1 ? "calc(100% - var(--step-inset))" : `${e / (t - 1) * 100}%`, z = (e, t) => t < 2 ? "50%" : `${e / (t - 1) * 100}%`;
function se({ steps: e, value: t, onChange: n, disabled: r = !1, selectOnNarrow: i = !1, className: a, ...c }) {
	let d = e.length, f = e.findIndex((e) => e.value === t), m = f < 0 ? 0 : f, [h, g] = s(null), _ = o(null), v = (e) => {
		_.current = e, g(e);
	}, y = h ?? m, b = o(null), x = o(null), S = c["aria-label"], C = e[y]?.colour, w = C ? { "--step-color": C } : void 0, T = (t) => {
		t !== m && n(e[t].value);
	}, E = (e) => {
		let t = b.current.getBoundingClientRect();
		return Math.round(Math.min(1, Math.max(0, (e - t.left) / t.width)) * (d - 1));
	}, D = (e) => {
		let t = e.key === "ArrowRight" || e.key === "ArrowUp" ? Math.min(m + 1, d - 1) : e.key === "ArrowLeft" || e.key === "ArrowDown" ? Math.max(m - 1, 0) : e.key === "Home" ? 0 : e.key === "End" ? d - 1 : null;
		t !== null && (e.preventDefault(), T(t));
	}, O = (e) => {
		x.current?.focus(), b.current.setPointerCapture(e.pointerId), v(E(e.clientX));
	}, k = (e) => {
		_.current !== null && v(E(e.clientX));
	}, A = () => {
		let e = _.current;
		e !== null && (v(null), T(e));
	}, j = /* @__PURE__ */ u("div", {
		ref: x,
		role: "slider",
		tabIndex: r ? void 0 : 0,
		"aria-valuemin": 0,
		"aria-valuemax": d - 1,
		"aria-valuenow": y,
		"aria-valuetext": e[y]?.label,
		"aria-disabled": r || void 0,
		className: p("tenon-step-slider", r && "tenon-step-slider--disabled", h !== null && "tenon-step-slider--dragging", !i && a),
		onKeyDown: r ? void 0 : D,
		...i ? { "aria-label": S } : c,
		children: [/* @__PURE__ */ u("div", {
			ref: b,
			className: "tenon-step-slider__track",
			onPointerDown: r ? void 0 : O,
			onPointerMove: k,
			onPointerUp: A,
			onPointerCancel: A,
			children: [
				/* @__PURE__ */ l("div", {
					className: "tenon-step-slider__fill",
					style: {
						...w,
						width: y === 0 ? "0%" : `calc(${R(y, d)} + var(--step-cap))`
					}
				}),
				e.map((e, t) => /* @__PURE__ */ l("span", {
					className: "tenon-step-slider__tick",
					style: { left: z(t, d) }
				}, e.value)),
				/* @__PURE__ */ l("div", {
					className: "tenon-step-slider__handle",
					style: {
						...w,
						left: R(y, d)
					}
				})
			]
		}), /* @__PURE__ */ l("div", {
			className: "tenon-step-slider__stops",
			children: e.map((e, t) => /* @__PURE__ */ l("span", {
				"data-i": t,
				className: p("tenon-step-slider__stop", t === y && "tenon-step-slider__stop--on"),
				style: {
					left: z(t, d),
					maxWidth: `${(100 / d).toFixed(3)}%`
				},
				onClick: r ? void 0 : () => T(t),
				children: e.label
			}, e.value))
		})]
	});
	return i ? /* @__PURE__ */ u("div", {
		className: p("tenon-step-slider-pick", a),
		...c,
		"aria-label": void 0,
		children: [j, /* @__PURE__ */ l("select", {
			className: "tenon-step-slider__select",
			"aria-label": S,
			disabled: r,
			value: m,
			onChange: (e) => T(Number(e.target.value)),
			children: e.map((e, t) => /* @__PURE__ */ l("option", {
				value: t,
				children: e.label
			}, e.value))
		})]
	}) : j;
}
//#endregion
//#region src/components/TagChip/TagChip.tsx
function ce({ label: e, value: t = "", tone: n = "neutral", readOnly: i = !1, onCommit: a, className: c }) {
	let [d, f] = s(!1), m = o(null), h = o(!1);
	r(() => {
		d && (m.current?.focus(), m.current?.select());
	}, [d]);
	let g = p("tenon-tag-chip", n === "warning" && "tenon-tag-chip--warning", i && "tenon-tag-chip--readonly", c);
	if (!d) return /* @__PURE__ */ l("button", {
		type: "button",
		className: g,
		disabled: i,
		onClick: () => {
			h.current = !1, f(!0);
		},
		children: t ? `${e}: ${t}` : e
	});
	let _ = (e) => {
		f(!1), e && m.current && a(m.current.value.trim());
	};
	return /* @__PURE__ */ u("span", {
		className: g,
		children: [
			e,
			":",
			" ",
			/* @__PURE__ */ l("input", {
				ref: m,
				type: "text",
				defaultValue: t,
				"aria-label": e,
				className: "tenon-tag-chip__input",
				onBlur: () => {
					h.current || _(!0);
				},
				onKeyDown: (e) => {
					e.key === "Enter" ? (e.preventDefault(), _(!0)) : e.key === "Escape" && (e.preventDefault(), h.current = !0, _(!1));
				}
			})
		]
	});
}
function B({ onAdd: e, onRefuse: t, className: n }) {
	let [i, a] = s(!1), c = o(null), d = o(null), f = o(!1);
	r(() => {
		i && c.current?.focus();
	}, [i]);
	let m = p("tenon-tag-chip", "tenon-tag-chip--add", n);
	if (!i) return /* @__PURE__ */ l("button", {
		type: "button",
		className: m,
		onClick: () => {
			f.current = !1, a(!0);
		},
		children: "+ Add tag"
	});
	let h = () => {
		f.current = !0, a(!1);
	}, g = () => {
		if (f.current) return;
		let n = c.current.value.trim(), r = d.current.value.trim();
		if (!n && !r) {
			h();
			return;
		}
		if (!n || !r) {
			t?.("A tag needs both a key and a value."), c.current.focus();
			return;
		}
		let i = e(n, r);
		if (typeof i == "string") {
			t?.(i), c.current.focus();
			return;
		}
		f.current = !0, a(!1);
	}, _ = (e) => {
		e.key === "Enter" ? (e.preventDefault(), g()) : e.key === "Escape" && (e.preventDefault(), h());
	}, v = () => setTimeout(() => {
		document.activeElement !== c.current && document.activeElement !== d.current && g();
	}, 0);
	return /* @__PURE__ */ u("span", {
		className: m,
		children: [
			/* @__PURE__ */ l("input", {
				ref: c,
				type: "text",
				placeholder: "key",
				"aria-label": "New tag key",
				className: "tenon-tag-chip__input",
				onKeyDown: _,
				onBlur: v
			}),
			": ",
			/* @__PURE__ */ l("input", {
				ref: d,
				type: "text",
				placeholder: "value",
				"aria-label": "New tag value",
				className: "tenon-tag-chip__input",
				onKeyDown: _,
				onBlur: v
			})
		]
	});
}
//#endregion
//#region src/components/Calendar/Calendar.tsx
var le = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
], V = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function H(e) {
	return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function U(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
	return t ? new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3])) : null;
}
function W({ value: e, onChange: t, today: n, bare: r = !1, className: i, ...a }) {
	let o = n ?? H(/* @__PURE__ */ new Date()), c = U(e) ?? U(o) ?? /* @__PURE__ */ new Date(), [d, f] = s(new Date(c.getFullYear(), c.getMonth(), 1)), m = d.getFullYear(), h = d.getMonth(), g = (new Date(m, h, 1).getDay() + 6) % 7, _ = new Date(m, h + 1, 0).getDate(), v = (e) => f(new Date(m, h + e, 1));
	return /* @__PURE__ */ u("div", {
		className: p("tenon-calendar", i),
		...a,
		children: [
			/* @__PURE__ */ u("div", {
				className: "tenon-calendar__head",
				children: [
					/* @__PURE__ */ l("button", {
						type: "button",
						className: "tenon-calendar__nav",
						title: "Previous month",
						"aria-label": "Previous month",
						onClick: () => v(-1),
						children: "‹"
					}),
					/* @__PURE__ */ u("strong", { children: [
						V[h],
						" ",
						m
					] }),
					/* @__PURE__ */ l("button", {
						type: "button",
						className: "tenon-calendar__nav",
						title: "Next month",
						"aria-label": "Next month",
						onClick: () => v(1),
						children: "›"
					})
				]
			}),
			/* @__PURE__ */ u("div", {
				className: "tenon-calendar__grid",
				children: [
					le.map((e) => /* @__PURE__ */ l("span", {
						className: "tenon-calendar__weekday",
						title: e,
						children: e[0]
					}, e)),
					Array.from({ length: g }, (e, t) => /* @__PURE__ */ l("span", { className: "tenon-calendar__day tenon-calendar__day--pad" }, `p${t}`)),
					Array.from({ length: _ }, (n, r) => {
						let i = H(new Date(m, h, r + 1));
						return /* @__PURE__ */ l("button", {
							type: "button",
							"data-day": i,
							"aria-pressed": i === e,
							className: p("tenon-calendar__day", i === e && "tenon-calendar__day--on", i === o && "tenon-calendar__day--today"),
							onClick: () => t(i),
							children: r + 1
						}, i);
					})
				]
			}),
			!r && /* @__PURE__ */ u("div", {
				className: "tenon-calendar__foot",
				children: [/* @__PURE__ */ l("button", {
					type: "button",
					className: "tenon-calendar__small",
					"data-day": o,
					onClick: () => t(o),
					children: "Today"
				}), /* @__PURE__ */ l("button", {
					type: "button",
					className: "tenon-calendar__small",
					"data-day": "",
					onClick: () => t(""),
					children: "Clear"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/Calendar/DateButton.tsx
function ue({ empty: e = !1, open: t = !1, className: n, type: r = "button", ...i }) {
	return /* @__PURE__ */ l("button", {
		type: r,
		"aria-expanded": t,
		className: p("tenon-date-button", e && "tenon-date-button--empty", n),
		...i
	});
}
//#endregion
//#region src/components/Dropdown/Dropdown.tsx
function de({ options: e, value: t, onChange: n, disabled: i = !1, className: a, "aria-label": c, ...d }) {
	let [f, m] = s(!1), h = o(null), g = e.find((e) => e.value === t);
	r(() => {
		if (!f) return;
		let e = (e) => {
			h.current?.contains(e.target) || m(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [f]);
	let _ = () => Array.from(h.current?.querySelectorAll("[role=menuitemradio]") ?? []), v = (e) => {
		if (e.key === "Escape") {
			e.preventDefault(), m(!1), h.current?.querySelector("button")?.focus();
			return;
		}
		let t = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
		if (!t) return;
		if (e.preventDefault(), !f) {
			m(!0);
			return;
		}
		let n = _();
		n[(n.indexOf(document.activeElement) + t + n.length) % n.length]?.focus();
	}, y;
	return /* @__PURE__ */ u("div", {
		ref: h,
		className: p("tenon-dropdown", f && "tenon-dropdown--open", a),
		onKeyDown: v,
		...d,
		children: [/* @__PURE__ */ u("button", {
			type: "button",
			className: "tenon-dropdown__button",
			"aria-haspopup": "menu",
			"aria-expanded": f,
			"aria-label": c,
			disabled: i,
			onClick: () => m(!f),
			children: [g?.icon, /* @__PURE__ */ l("span", { children: g?.label ?? "" })]
		}), f && !i && /* @__PURE__ */ l("div", {
			className: "tenon-dropdown__panel",
			role: "menu",
			"aria-label": c,
			children: e.map((e) => {
				let r = e.group !== void 0 && e.group !== y ? e.group : null;
				return y = e.group, /* @__PURE__ */ u("div", {
					className: "tenon-dropdown__entry",
					children: [r && /* @__PURE__ */ l("div", {
						className: "tenon-dropdown__heading",
						children: r
					}), /* @__PURE__ */ u("button", {
						type: "button",
						role: "menuitemradio",
						"aria-checked": e.value === t,
						"data-value": e.value,
						className: p("tenon-dropdown__item", e.value === t && "tenon-dropdown__item--on"),
						onClick: () => {
							m(!1), e.value !== t && n(e.value);
						},
						children: [e.icon, /* @__PURE__ */ l("span", { children: e.label })]
					})]
				}, e.value);
			})
		})]
	});
}
//#endregion
//#region src/components/Window/Window.tsx
var fe = 24, G = 260, K = "cubic-bezier(0.4, 0, 0.2, 1)", pe = [
	"left",
	"top",
	"width",
	"height"
].map((e) => `${e} ${G}ms ${K}`).join(", "), me = [
	"n",
	"s",
	"e",
	"w",
	"ne",
	"nw",
	"se",
	"sw"
], he = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function q(e) {
	let t = o(e);
	return t.current = e, t;
}
function J({ open: e, onClose: t, title: c, subtitle: f, headEnd: h, footer: g, rect: _, onRectLive: v, onRectChange: y, growFrom: b, zIndex: x, active: S = !0, peeked: C = !1, onFocus: w, closeButton: T = !0, bare: E = !1, minWidth: D = 420, maxWidth: O = 800, minHeight: k = 320, className: A, children: j, ...ee }) {
	let M = o(null), te = i(), [ne, N] = s(null), [re, P] = s(!1), [F, ie] = s(!1), [I, ae] = s(!1), L = o(null), oe = q(t), R = q(v), z = q(y), se = q(w), ce = q(S), B = q(b), le = q(F), V = o({
		title: c,
		subtitle: f,
		headEnd: h,
		footer: g,
		children: j,
		rect: _ ?? null,
		bare: E,
		className: A,
		rest: ee
	});
	e && (V.current = {
		title: c,
		subtitle: f,
		headEnd: h,
		footer: g,
		children: j,
		rect: _ ?? null,
		bare: E,
		className: A,
		rest: ee
	});
	let H = V.current, U = o({
		minWidth: D,
		maxWidth: O,
		minHeight: k
	});
	U.current = {
		minWidth: D,
		maxWidth: O,
		minHeight: k
	};
	let W = n((e) => {
		let t = U.current, n = Math.max(t.minWidth, Math.min(t.maxWidth, e.width)), r = Math.max(t.minHeight, e.height);
		return {
			width: n,
			height: Math.min(r, window.innerHeight - fe),
			x: Math.max(-n + 120, Math.min(e.x, window.innerWidth - 120)),
			y: Math.max(38, Math.min(e.y, window.innerHeight - 60))
		};
	}, []);
	if (r(() => {
		le.current || N(null);
	}, [_]), e && !L.current) {
		let e = Math.min(O, window.innerWidth - 48), t = Math.min(680, window.innerHeight - 48 - 40);
		L.current = {
			x: Math.round((window.innerWidth - e) / 2),
			y: Math.round((window.innerHeight - t) / 2) + 12,
			width: e,
			height: t
		};
	}
	r(() => {
		if (!e) {
			P(!1);
			return;
		}
		let t = requestAnimationFrame(() => P(!0));
		return () => cancelAnimationFrame(t);
	}, [e]), a(() => {
		let t = M.current, n = B.current;
		if (!e || !t || !n || he()) return;
		let r = t.getBoundingClientRect();
		r.width && r.height && t.animate([{
			transform: `translate(${n.left - r.left}px,${n.top - r.top}px) scale(${n.width / r.width},${n.height / r.height})`,
			opacity: .5
		}, {
			transform: "translate(0,0) scale(1,1)",
			opacity: 1
		}], {
			duration: G,
			easing: K,
			fill: "both"
		});
	}, [e]);
	let [ue, de] = s(e);
	e !== ue && (de(e), ae(!e && !!B.current && !he())), a(() => {
		let e = M.current, t = B.current;
		if (!I || !e || !t) return;
		let n = e.getBoundingClientRect(), r = !1, i = () => {
			r || (r = !0, ae(!1));
		}, a = e.animate([{
			transform: "translate(0,0) scale(1,1)",
			opacity: 1
		}, {
			transform: `translate(${t.left - n.left}px,${t.top - n.top}px) scale(${t.width / n.width},${t.height / n.height})`,
			opacity: .5
		}], {
			duration: G,
			easing: K,
			fill: "both"
		});
		a.onfinish = i, a.oncancel = i;
		let o = setTimeout(i, 410);
		return () => clearTimeout(o);
	}, [I]), r(() => {
		!e && !I && (L.current = null);
	}, [e, I]), r(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && ce.current && (e.target?.closest?.("[data-tenon-editing]") || (e.stopPropagation(), oe.current()));
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]), r(() => {
		let t = M.current;
		e && t && !t.contains(document.activeElement) && t.focus({ preventScroll: !0 });
	}, [e]);
	let J = ne ?? H.rect ?? L.current ?? {
		x: 0,
		y: 0,
		width: D,
		height: k
	}, ge = q(J), Y = (e, t) => {
		t.preventDefault();
		let n = {
			x: t.clientX,
			y: t.clientY,
			rect: { ...ge.current }
		};
		ie(!0);
		let r = n.rect, i = U.current, a = (t) => {
			let a = t.clientX - n.x, o = t.clientY - n.y, s = n.rect, c;
			if (e === "move") c = W({
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
				c = W(c);
			}
			r = c, N(c), R.current?.(c);
		}, o = () => {
			window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o), r !== n.rect && z.current?.(r), requestAnimationFrame(() => ie(!1));
		};
		window.addEventListener("pointermove", a), window.addEventListener("pointerup", o);
	};
	return !e && !I ? null : d(/* @__PURE__ */ l("div", {
		className: "tenon-window-layer",
		style: { zIndex: x },
		children: /* @__PURE__ */ u("div", {
			ref: M,
			role: "dialog",
			"aria-labelledby": te,
			tabIndex: -1,
			className: p("tenon-window", C && "tenon-window--peeked", H.className),
			style: {
				left: J.x,
				top: J.y,
				width: J.width,
				height: J.height,
				transition: F || !re ? "none" : pe
			},
			onPointerDownCapture: () => se.current?.(),
			...H.rest,
			children: [
				/* @__PURE__ */ u("div", {
					className: "tenon-modal__head tenon-window__head",
					onPointerDown: (e) => {
						e.target.closest("button,a,input,textarea,[contenteditable=\"true\"]") || Y("move", e);
					},
					children: [
						/* @__PURE__ */ u("div", {
							className: "tenon-modal__titles",
							children: [/* @__PURE__ */ l("h2", {
								id: te,
								className: "tenon-modal__title",
								children: H.title
							}), H.subtitle && /* @__PURE__ */ l("div", {
								className: "tenon-modal__subtitle",
								children: H.subtitle
							})]
						}),
						H.headEnd,
						T && /* @__PURE__ */ l(m, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": "Close",
							onClick: () => oe.current(),
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ l("div", {
					className: p("tenon-modal__body", H.bare && "tenon-modal__body--bare"),
					children: H.children
				}),
				H.footer && /* @__PURE__ */ l("div", {
					className: p("tenon-modal__footer", H.bare && "tenon-modal__footer--bare"),
					children: H.footer
				}),
				me.map((e) => /* @__PURE__ */ l("div", {
					className: p("tenon-window__grip", `tenon-window__grip--${e}`),
					"data-edge": e,
					onPointerDown: (t) => Y(e, t)
				}, e))
			]
		})
	}), document.body);
}
//#endregion
//#region src/components/Markdown/Markdown.tsx
var ge = /\[([^[\]\n]+)\]\(([^()\s]+)\)|(https?:\/\/[^\s<>"')\]]+)|\[([^[\]\n]+)\]/g, Y = [
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
function X(e, t) {
	for (let { re: n, tag: r, lead: i } of Y) {
		let a = n.exec(e);
		if (!a) continue;
		let o = i ? a[1] : "", s = i ? a[2] : a[1], c = r;
		return [
			...X(e.slice(0, a.index) + o, `${t}a`),
			/* @__PURE__ */ l(c, { children: X(s, `${t}i`) }, `${t}m`),
			...X(e.slice(a.index + a[0].length), `${t}z`)
		];
	}
	return e ? [e] : [];
}
function _e(e, t) {
	let n = [], r = 0;
	for (let i of e.matchAll(ge)) {
		let [a, o, s, c] = i;
		if (n.push(...X(e.slice(r, i.index), `${t}t${r}`)), s !== void 0) n.push(/* @__PURE__ */ l("a", {
			href: s,
			className: "tenon-markdown__link",
			children: o
		}, `${t}l${i.index}`)), r = i.index + a.length;
		else if (c !== void 0) {
			let e = c, o = "";
			for (; /[.,;:!?]$/.test(e);) o = e.slice(-1) + o, e = e.slice(0, -1);
			n.push(/* @__PURE__ */ l("a", {
				href: e,
				className: "tenon-markdown__link",
				children: e
			}, `${t}l${i.index}`)), r = i.index + a.length - o.length;
		} else n.push(/* @__PURE__ */ l("em", {
			className: "tenon-markdown__placeholder",
			children: a
		}, `${t}h${i.index}`)), r = i.index + a.length;
	}
	return n.push(...X(e.slice(r), `${t}e`)), n;
}
function Z(e) {
	return e.split(/(`[^`]+`)/).flatMap((e, t) => t % 2 ? [/* @__PURE__ */ l("code", { children: e.slice(1, -1) }, `c${t}`)] : _e(e, `p${t}`));
}
function ve(e) {
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
function ye({ children: t, inline: n = !1, className: r }) {
	return n ? /* @__PURE__ */ l("span", {
		className: p("tenon-markdown", r),
		children: Z(t)
	}) : /* @__PURE__ */ l("div", {
		className: p("tenon-markdown", r),
		children: ve(String(t)).map((t, n) => {
			if (t.kind === "code") return /* @__PURE__ */ l("pre", { children: /* @__PURE__ */ l("code", { children: t.text }) }, n);
			if (t.kind === "h") return /* @__PURE__ */ l("p", {
				className: "tenon-markdown__heading",
				children: Z(t.text)
			}, n);
			if (t.kind === "list") {
				let e = t.ordered ? "ol" : "ul";
				return /* @__PURE__ */ l(e, { children: t.items.map((e, t) => /* @__PURE__ */ l("li", { children: Z(e) }, t)) }, n);
			}
			return /* @__PURE__ */ l("p", { children: t.lines.map((t, n) => /* @__PURE__ */ u(e, { children: [n > 0 && /* @__PURE__ */ l("br", {}), Z(t)] }, n)) }, n);
		})
	});
}
//#endregion
//#region src/components/EditableText/EditableText.tsx
function be({ value: e, onCommit: t, hint: n = "Double-click to rename", className: i }) {
	let a = o(null), [c, u] = s(!1), [d, f] = s(e);
	return r(() => {
		c || f(e);
	}, [e, c]), /* @__PURE__ */ l("span", {
		ref: a,
		className: p("tenon-editable", c && "tenon-editable--editing", i),
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
function xe({ summary: e, open: t, defaultOpen: n = !1, onOpenChange: r, className: i, children: a }) {
	let [o, c] = s(n), d = t ?? o;
	return /* @__PURE__ */ u("div", {
		className: p("tenon-disclosure", d && "tenon-disclosure--open", i),
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
var Se = "data-tenon-reorder", Ce = "data-tenon-drop", we = "data-tenon-dragging", Q = "data-tenon-axis", Te = "data-tenon-grip", Ee = (e, t) => e === t || !!e && !!t && e.key === t.key && e.after === t.after;
function De(e, t, n, r) {
	let i = e.getBoundingClientRect();
	return r === "x" ? t > i.left + i.width / 2 : n > i.top + i.height / 2;
}
function Oe(e, t, n) {
	if (!n.after) return n.key;
	let r = e.filter((e) => e !== t), i = r.indexOf(n.key);
	return i + 1 < r.length ? r[i + 1] : null;
}
function ke(e, t, n) {
	let r = e.dataTransfer;
	if (r && (r.effectAllowed = "move", r.setData("text/plain", t), n)) {
		let t = n.getBoundingClientRect();
		r.setDragImage(n, e.clientX - t.left, e.clientY - t.top);
	}
}
var Ae = (e) => {
	setTimeout(e, 0);
};
function $(e) {
	e.preventDefault(), e.stopPropagation(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
}
//#endregion
//#region src/components/Reorder/useReorder.ts
function je(e, t, n) {
	let r = e.filter((e) => e !== t), i = n == null ? r.length : Math.max(0, r.indexOf(n));
	return r.splice(i, 0, t), r;
}
function Me(e, t, n) {
	if (!n.length) return e;
	let r = new Map(n.map((e, t) => [e, t]));
	return e.map((e, i) => ({
		item: e,
		r: r.get(t(e)) ?? n.length + i
	})).sort((e, t) => e.r - t.r).map((e) => e.item);
}
function Ne({ keys: e, onMove: t, axis: n = "y" }) {
	let [r, i] = s(null), [a, c] = s(null), l = o(null), u = o(null), d = (e) => {
		Ee(u.current, e) || (u.current = e, c(e));
	}, f = () => {
		l.current = null, u.current = null, i(null), c(null);
	}, p = () => {
		let n = l.current, r = u.current;
		n && r && r.key !== n && t(n, Oe(e, n, r)), f();
	}, m = (e) => De(e.currentTarget, e.clientX, e.clientY, n);
	return {
		item: (e) => {
			let t = r && r !== e && a && a.key === e ? a.after ? "after" : "before" : null;
			return {
				dragging: r === e,
				drop: t,
				handleProps: {
					draggable: !0,
					onDragStart: (t) => {
						t.stopPropagation(), ke(t, e, t.currentTarget.closest("[data-tenon-reorder]")), l.current = e, Ae(() => {
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
function Pe(e, t) {
	let { onMove: n, axis: r = "y", grip: i = `[${Te}]`, item: a = `[${Se}]`, keyOf: o = (e) => e.getAttribute("data-tenon-reorder") ?? "" } = t;
	e.setAttribute(Q, r);
	let s = null, c = null, l = (t) => {
		let n = t instanceof Element ? t.closest(a) : null;
		for (; n && n.parentElement?.closest("[data-tenon-axis]") !== e;) n = n.parentElement?.closest(a) ?? null;
		return n;
	}, u = () => Array.from(e.querySelectorAll(a)).filter((t) => t.parentElement?.closest(`[${Q}]`) === e).map(o), d = (e) => {
		Ee(c, e) && c?.el === e?.el || (c?.el.removeAttribute(Ce), c = e, e && e.el.setAttribute(Ce, e.after ? "after" : "before"));
	}, f = () => {
		s?.el.removeAttribute(we), d(null), s = null;
	}, p = (t) => {
		let n = t.target instanceof Element ? t.target.closest(i) : null;
		n && e.contains(n) && l(n) && (n.draggable = !0);
	}, m = (e) => {
		let t = e.target instanceof Element ? e.target.closest(i) : null, n = t && l(t);
		if (!n) return;
		e.stopPropagation();
		let r = o(n);
		ke(e, r, n);
		let a = {
			key: r,
			el: n
		};
		s = a, e.target.addEventListener("dragend", f, { once: !0 }), Ae(() => {
			s === a && n.setAttribute(we, "");
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
			after: De(t, e.clientX, e.clientY, r)
		});
	}, g = (e) => {
		if (!s) return;
		$(e);
		let t = l(e.target);
		t && o(t) !== s.key && d({
			key: o(t),
			el: t,
			after: De(t, e.clientX, e.clientY, r)
		});
		let i = s.key, a = c, p = u();
		f(), a && a.key !== i && n(i, Oe(p, i, a));
	}, _ = (e) => {
		s && $(e);
	};
	return e.addEventListener("pointerdown", p), e.addEventListener("dragstart", m), e.addEventListener("dragenter", _), e.addEventListener("dragover", h), e.addEventListener("drop", g), e.addEventListener("dragend", f), () => {
		f(), e.removeAttribute(Q), e.removeEventListener("pointerdown", p), e.removeEventListener("dragstart", m), e.removeEventListener("dragenter", _), e.removeEventListener("dragover", h), e.removeEventListener("drop", g), e.removeEventListener("dragend", f);
	};
}
//#endregion
//#region src/components/Reorder/DragHandle.tsx
function Fe({ className: e, ...t }) {
	return /* @__PURE__ */ l("span", {
		className: p("tenon-draghandle", e),
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
function Ie(e) {
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
function Le({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: p("tenon-dropline", e),
		"aria-hidden": "true",
		...t
	});
}
//#endregion
export { ie as Alert, v as Badge, m as Button, W as Calendar, _ as Card, b as Column, x as ColumnEmpty, ue as DateButton, xe as Disclosure, Fe as DragHandle, Le as DropLine, de as Dropdown, be as EditableText, C as Field, h as LinkButton, ye as Markdown, O as Modal, k as ModalPane, P as Pill, ae as SegmentedControl, re as Spinner, S as Stat, se as StepSlider, I as Switch, y as Tag, ce as TagChip, B as TagChipAdd, A as Textarea, oe as ToggleChip, L as ToggleGroup, J as Window, Me as applySavedOrder, Pe as bindReorder, p as cx, Ie as dragHandleHTML, Z as inlineNodes, je as reorderKeys, H as toIsoDate, Ne as useReorder };
