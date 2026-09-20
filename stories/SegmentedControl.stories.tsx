import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from '../src';
import type { SegmentOption } from '../src';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: {
    'aria-label': 'View',
    value: 'cards',
    onChange: () => {},
    options: [{ value: 'cards', label: 'Cards' }, { value: 'list', label: 'List' }],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({ label, options }: { label: string; options: SegmentOption[] }) {
  const [value, setValue] = useState(options[0].value);
  return <SegmentedControl aria-label={label} value={value} onChange={setValue} options={options} />;
}

export const Two: Story = {
  render: () => <Controlled label="View" options={[{ value: 'cards', label: 'Cards' }, { value: 'list', label: 'List' }]} />,
};

export const FourWithOneDisabled: Story = {
  render: () => (
    <Controlled
      label="Range"
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month', disabled: true },
        { value: 'year', label: 'Year' },
      ]}
    />
  ),
};
