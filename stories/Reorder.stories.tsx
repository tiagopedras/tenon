import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, DragHandle, DropLine, reorderKeys, useReorder } from '../src';

const meta = {
  title: 'Components/Reorder',
  parameters: {
    docs: {
      description: {
        component:
          'Drag to reorder one list. `useReorder` gives each item `handleProps` for its grip and `itemProps` for itself; the line shows where it will land.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const START = ['Plan agent', 'Improve agent', 'UX agent', 'Implement agent'];

function Rows({ axis }: { axis: 'x' | 'y' }) {
  const [keys, setKeys] = useState(START);
  const { item, listProps } = useReorder({
    keys,
    axis,
    onMove: (key, before) => setKeys(reorderKeys(keys, key, before)),
  });
  const gap = axis === 'x' ? 16 : 8;
  return (
    <div
      {...listProps}
      style={{
        display: axis === 'x' ? 'grid' : 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        flexDirection: 'column',
        gap,
        ['--tenon-reorder-gap' as string]: gap + 'px',
        maxWidth: 820,
      }}
    >
      {keys.map((k) => {
        const it = item(k);
        return (
          <Card key={k} {...it.itemProps} lead={<DragHandle {...it.handleProps} />} title={k} />
        );
      })}
    </div>
  );
}

export const Rows_: Story = { name: 'Rows, by the grip', render: () => <Rows axis="y" /> };
export const Cards: Story = { name: 'Cards, left to right', render: () => <Rows axis="x" /> };

export const Line: Story = {
  name: 'DropLine on its own',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <Card title="Above" />
      <DropLine />
      <Card title="Below" />
    </div>
  ),
};
