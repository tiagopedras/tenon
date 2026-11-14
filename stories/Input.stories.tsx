import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../src';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'The bare one-line control, in Textarea\'s skin. With a label, use `Field`.' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = { args: { placeholder: 'A name' } };

export const Email: Story = { args: { type: 'email', placeholder: 'you@example.com' } };

export const Numeric: Story = { args: { type: 'number', defaultValue: 3, min: 0, max: 10 } };

export const Search: Story = { args: { type: 'search', placeholder: 'Search tasks' } };

export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Shown, copied, not edited' } };

export const Disabled: Story = { args: { disabled: true, defaultValue: 'Cannot be edited' } };

export const Invalid: Story = { args: { invalid: true, defaultValue: 'not an email', type: 'email' } };
