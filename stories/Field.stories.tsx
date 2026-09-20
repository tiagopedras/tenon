import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../src';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  args: { label: 'Task', placeholder: 'What needs doing?' },
  parameters: {
    docs: {
      description: {
        component: 'Owns its label, hint and error together. `aria-describedby` points at whichever note is actually rendered.',
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = { args: { hint: 'Shown under the control.' } };

export const Required: Story = { args: { label: 'Owner', placeholder: 'A name', required: true } };

export const WithError: Story = {
  args: { label: 'Due', type: 'date', error: 'Pick a date that is not in the past.', defaultValue: '2020-01-01' },
};

export const Multiline: Story = {
  args: { label: 'Notes', multiline: true, rows: 3, placeholder: 'Anything worth remembering' },
};

export const Disabled: Story = {
  args: { label: 'Locked', disabled: true, defaultValue: 'Cannot be edited' },
};
