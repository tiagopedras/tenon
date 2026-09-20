import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill } from '../src';

const meta = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  args: { children: 'Read file' },
  parameters: {
    docs: {
      description: {
        component: "Tag's outlined counterpart, for a thing that happened or a state something is in.",
      },
    },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="sb-row">
      {(['neutral', 'accent', 'success', 'warning', 'error'] as const).map((t) => <Pill key={t} tone={t}>{t}</Pill>)}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="sb-row">
      {(['neutral', 'accent', 'success'] as const).map((t) => <Pill key={t} tone={t} dot>Read file</Pill>)}
    </div>
  ),
};

export const Caps: Story = {
  render: () => (
    <div className="sb-row">
      <Pill caps>off</Pill>
      <Pill caps tone="accent">built</Pill>
      <Pill caps tone="warning">3 tonight</Pill>
    </div>
  ),
};
