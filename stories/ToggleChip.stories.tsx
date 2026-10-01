import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleChip } from '../src';

const meta = {
  title: 'Components/ToggleChip',
  component: ToggleChip,
  tags: ['autodocs'],
  args: { pressed: false, children: '3 need scoring' },
} satisfies Meta<typeof ToggleChip>;

export default meta;
type Story = StoryObj<typeof meta>;

function Filter() {
  const [on, setOn] = useState(false);
  return (
    <ToggleChip pressed={on} onClick={() => setOn(!on)}>
      {on ? 'Showing 3 unscored · show all' : '3 need scoring'}
    </ToggleChip>
  );
}

export const Interactive: Story = { render: () => <Filter /> };
export const Pressed: Story = { args: { pressed: true, children: 'Showing 3 unscored · show all' } };
