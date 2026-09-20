import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '../src';

const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ring: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="sb-row">
      {SIZES.map((z) => <Spinner key={z} size={z} label={`Working, ${z}`} />)}
    </div>
  ),
};

export const Glyph: Story = {
  name: 'Glyph, as the CLI draws it',
  render: () => (
    <div className="sb-row">
      {SIZES.map((z) => <Spinner key={z} variant="glyph" size={z} label={`Thinking, ${z}`} />)}
    </div>
  ),
};

export const BesideWords: Story = {
  render: () => (
    <div className="sb-row">
      <Spinner size="sm" />
      <span className="tenon-body-sm">Reading the improvements list…</span>
    </div>
  ),
};
