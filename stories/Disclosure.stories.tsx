import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclosure } from '../src';

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  args: {
    summary: '3 steps · Read, Grep',
    children: <ol style={{ margin: 0 }}><li>Read 360.md</li><li>Grep probation</li><li>Read template</li></ol>,
  },
  parameters: {
    docs: { description: { component: 'The quiet summary line that opens into more, with the arrow always drawn.' } },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const OpenToStart: Story = { args: { defaultOpen: true } };
