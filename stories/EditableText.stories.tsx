import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditableText } from '../src';

const meta = {
  title: 'Components/EditableText',
  component: EditableText,
  tags: ['autodocs'],
  args: { value: 'Reading the 360 responses', onCommit: () => {} },
  parameters: {
    docs: { description: { component: 'A name that becomes a field on double-click.' } },
  },
} satisfies Meta<typeof EditableText>;

export default meta;
type Story = StoryObj<typeof meta>;

function Rename({ initial }: { initial: string }) {
  const [name, setName] = useState(initial);
  return <EditableText value={name} onCommit={setName} />;
}

export const DoubleClickToRename: Story = {
  render: (args) => <Rename initial={args.value} />,
};
