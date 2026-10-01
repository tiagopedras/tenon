import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from '../src';

const meta = { title: 'Components/Dropdown', component: Dropdown, tags: ['autodocs'],
  args: { 'aria-label': 'Delegate to', options: [], value: '', onChange: () => {} } } satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

const dot = (c: string) => <i style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />;

export const Grouped: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: 240 }}>
        <Dropdown
          aria-label="Delegate to"
          value={v}
          onChange={setV}
          options={[
            { value: '', label: 'Nobody' },
            { value: 'Plan agent', label: 'Plan agent', group: 'Agents', icon: dot('var(--tenon-chart-1)') },
            { value: 'Implement agent', label: 'Implement agent', group: 'Agents', icon: dot('var(--tenon-chart-2)') },
            { value: 'Vasco P.', label: 'Vasco P.', group: 'People' },
          ]}
        />
      </div>
    );
  },
};
