import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, LinkButton } from '../src';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger', 'confirm', 'destructive'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Variants: Story = {
  render: () => (
    <div className="sb-row">
      {VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-row">
      {SIZES.map((s) => <Button key={s} variant="primary" size={s}>size {s}</Button>)}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="sb-row">
      {VARIANTS.map((v) => <Button key={v} variant={v} disabled>{v}</Button>)}
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="sb-row">
      {SIZES.map((s) => (
        <Button key={s} variant="secondary" size={s} iconOnly aria-label={`Add, ${s}`}>+</Button>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  name: 'LinkButton',
  render: () => (
    <LinkButton variant="ghost" href="https://claude.ai" target="_blank" rel="noopener">
      A link that looks like a button
    </LinkButton>
  ),
};
