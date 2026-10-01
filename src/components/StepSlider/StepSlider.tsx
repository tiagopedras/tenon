import { useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, KeyboardEvent, PointerEvent } from 'react';
import { cx } from '../../utils';
import './StepSlider.css';

export interface Step<V extends string = string> {
  value: V;
  label: string;
  /** Colours the fill and the handle at this stop. Any CSS colour. */
  colour?: string;
}

export interface StepSliderProps<V extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'role'> {
  steps: Step<V>[];
  value: V;
  /** Called once a drag, click or key press has settled on a stop. */
  onChange: (value: V) => void;
  disabled?: boolean;
  /** Draws a native <select> beside the slider and shows it instead at 640px and under.
   *  For a pick from a list rather than a scale, where the labels would touch. */
  selectOnNarrow?: boolean;
  /** Names the field for a screen reader: Impact, Column. */
  'aria-label': string;
}

/* Where a stop sits along the track. The first and last are pulled in by
   --step-inset so the handle parked there does not cover the tip. */
const pos = (i: number, n: number) =>
  n < 2 ? '50%' : i === 0 ? 'var(--step-inset)' : i === n - 1 ? 'calc(100% - var(--step-inset))' : `${(i / (n - 1)) * 100}%`;
/* Ticks and labels use the plain fraction, since they are marks and nothing
   has to clear them. */
const tickPos = (i: number, n: number) => (n < 2 ? '50%' : `${(i / (n - 1)) * 100}%`);

/* A fixed set of positions you can drag to, click or arrow-key between: Low,
   Med, High. A drag always rounds to the nearest stop, never between two.
   For two or three views of one thing use SegmentedControl, and for several
   independent choices use ToggleGroup. */
export function StepSlider<V extends string = string>(
  { steps, value, onChange, disabled = false, selectOnNarrow = false, className, ...rest }: StepSliderProps<V>,
) {
  const n = steps.length;
  const found = steps.findIndex((s) => s.value === value);
  const committed = found < 0 ? 0 : found;
  /* While dragging the handle follows the pointer without telling the caller;
     onChange fires once, when the pointer lifts. */
  const [drag, setDragState] = useState<number | null>(null);
  /* Read by the pointer handlers as well, since a move and the release that
     follows it can arrive before React has rendered the first. */
  const dragging = useRef<number | null>(null);
  const setDrag = (i: number | null) => { dragging.current = i; setDragState(i); };
  const idx = drag ?? committed;
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const label = rest['aria-label'];

  const colour = steps[idx]?.colour;
  const colourStyle = colour ? ({ ['--step-color' as string]: colour } as CSSProperties) : undefined;

  const commit = (i: number) => { if (i !== committed) onChange(steps[i].value); };
  const at = (x: number) => {
    const r = track.current!.getBoundingClientRect();
    return Math.round(Math.min(1, Math.max(0, (x - r.left) / r.width)) * (n - 1));
  };

  const onKey = (e: KeyboardEvent) => {
    const next = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? Math.min(committed + 1, n - 1)
      : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? Math.max(committed - 1, 0)
      : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    commit(next);
  };
  const down = (e: PointerEvent) => {
    root.current?.focus();
    track.current!.setPointerCapture(e.pointerId);
    setDrag(at(e.clientX));
  };
  const move = (e: PointerEvent) => { if (dragging.current !== null) setDrag(at(e.clientX)); };
  const up = () => {
    const i = dragging.current;
    if (i === null) return;
    setDrag(null);
    commit(i);
  };

  const slider = (
    <div
      ref={root}
      role="slider"
      tabIndex={disabled ? undefined : 0}
      aria-valuemin={0}
      aria-valuemax={n - 1}
      aria-valuenow={idx}
      aria-valuetext={steps[idx]?.label}
      aria-disabled={disabled || undefined}
      className={cx('tenon-step-slider', disabled && 'tenon-step-slider--disabled', drag !== null && 'tenon-step-slider--dragging', !selectOnNarrow && className)}
      onKeyDown={disabled ? undefined : onKey}
      {...(selectOnNarrow ? { 'aria-label': label } : rest)}
    >
      <div
        ref={track}
        className="tenon-step-slider__track"
        onPointerDown={disabled ? undefined : down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div
          className="tenon-step-slider__fill"
          style={{ ...colourStyle, width: idx === 0 ? '0%' : `calc(${pos(idx, n)} + var(--step-cap))` }}
        />
        {steps.map((s, i) => (
          <span key={s.value} className="tenon-step-slider__tick" style={{ left: tickPos(i, n) }} />
        ))}
        <div className="tenon-step-slider__handle" style={{ ...colourStyle, left: pos(idx, n) }} />
      </div>
      {/* Capped to a fair share of the width, so a long label wraps rather than
          running into its neighbour. */}
      <div className="tenon-step-slider__stops">
        {steps.map((s, i) => (
          <span
            key={s.value}
            data-i={i}
            className={cx('tenon-step-slider__stop', i === idx && 'tenon-step-slider__stop--on')}
            style={{ left: tickPos(i, n), maxWidth: `${(100 / n).toFixed(3)}%` }}
            onClick={disabled ? undefined : () => commit(i)}
          >{s.label}</span>
        ))}
      </div>
    </div>
  );

  if (!selectOnNarrow) return slider;
  return (
    <div className={cx('tenon-step-slider-pick', className)} {...rest} aria-label={undefined}>
      {slider}
      <select
        className="tenon-step-slider__select"
        aria-label={label}
        disabled={disabled}
        value={committed}
        onChange={(e) => commit(Number(e.target.value))}
      >
        {steps.map((s, i) => <option key={s.value} value={i}>{s.label}</option>)}
      </select>
    </div>
  );
}
