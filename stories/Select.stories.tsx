import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../src';

const options = (
  <>
    <option value="haiku">Quick (Haiku)</option>
    <option value="sonnet">Everyday (Sonnet)</option>
    <option value="opus">Deep (Opus)</option>
  </>
);

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { children: options, defaultValue: 'sonnet', 'aria-label': 'Model' },
  parameters: {
    docs: {
      description: {
        component: 'A native select in Textarea\'s skin, with a chevron. The options are `<option>` children. With a label, use `Field` with `select`; for options with icons or headings, use `Dropdown`.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { invalid: true } };
