import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../src';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'The bare control. With a label, use `Field` with `multiline`.' },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fixed: Story = { args: { placeholder: 'Fixed, resizable', rows: 3 } };

export const AutoGrow: Story = { args: { autoGrow: true, placeholder: 'Grows as you type, then scrolls' } };

export const Invalid: Story = { args: { invalid: true, placeholder: 'Invalid' } };
