import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagChip, TagChipAdd } from '../src';

const meta = {
  title: 'Components/TagChip',
  component: TagChip,
  tags: ['autodocs'],
  args: { label: 'owner', value: 'Vasco P.', onCommit: () => {} },
} satisfies Meta<typeof TagChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Editable: Story = {};
export const Unrecognised: Story = { args: { tone: 'warning', label: 'ticket', value: 'DS-142' } };
export const ReadOnly: Story = { args: { readOnly: true } };
export const Add: Story = { render: () => <TagChipAdd onAdd={() => {}} /> };
