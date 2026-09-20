import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../src';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { checked: true, 'aria-label': 'Improvements agent' },
  parameters: {
    docs: {
      description: {
        component: 'For a setting that applies the moment it flips. One that needs a Save is a checkbox in a `Field`.',
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function Toggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="sb-row">
      <Switch checked={on} onChange={setOn} aria-label="Improvements agent" />
      <span className="tenon-body-sm">{on ? 'on' : 'off'}</span>
    </div>
  );
}

export const OnAndOff: Story = { render: () => <Toggle initial /> };

export const Disabled: Story = {
  render: () => (
    <div className="sb-row">
      <Switch checked={false} disabled aria-label="Disabled, off" />
      <Switch checked disabled aria-label="Disabled, on" />
    </div>
  ),
};
