import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../src';
import type { TagChart } from '../src';

const TONES = ['neutral', 'accent', 'success', 'warning', 'error', 'info', 'running'] as const;
const BUCKETS: Array<[TagChart, string]> = [
  [1, 'People'], [2, 'Design oversight'], [3, 'Design System'], [4, 'Strategic'],
  [5, 'Hiring'], [6, 'Tooling'], [7, 'Research'], [8, 'Ops'], [9, 'Blocked'], [10, 'Archive'],
];

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'Tag' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="sb-row">
      {TONES.map((t) => <Tag key={t} tone={t}>{t}</Tag>)}
    </div>
  ),
};

export const Buckets: Story = {
  name: 'Buckets, chart.1 to chart.10',
  render: () => (
    <div className="sb-row">
      {BUCKETS.map(([n, label]) => <Tag key={n} chart={n} dot>{label}</Tag>)}
    </div>
  ),
};
