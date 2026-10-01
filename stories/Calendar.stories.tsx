import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, DateButton } from '../src';

const meta = { title: 'Components/Calendar', component: Calendar, tags: ['autodocs'], args: { value: '', onChange: () => {} } } satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  render: () => {
    const [v, setV] = useState('2026-10-14');
    return <div style={{ width: 260 }}><Calendar value={v} onChange={setV} today="2026-10-01" /></div>;
  },
};

export const OpenedFromAField: Story = {
  render: () => {
    const [v, setV] = useState('');
    const [open, setOpen] = useState(false);
    return (
      <div style={{ width: 260, display: 'grid', gap: 8 }}>
        <DateButton empty={!v} open={open} onClick={() => setOpen(!open)}>{v || 'No date'}</DateButton>
        {open && <Calendar value={v} onChange={(d) => { setV(d); setOpen(false); }} />}
      </div>
    );
  },
};
