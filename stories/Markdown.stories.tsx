import type { Meta, StoryObj } from '@storybook/react-vite';
import { Markdown } from '../src';

const meta = {
  title: 'Components/Markdown',
  component: Markdown,
  tags: ['autodocs'],
  args: {
    children: 'A **reply** with `code`, _italics_ and a link https://tenon.example/docs.\n\n- one\n- two\n\n```\nnpm run build\n```',
  },
  parameters: {
    docs: {
      description: {
        component: "Renders the subset a model's reply uses, as React elements rather than an HTML string. What falls outside the subset shows as written.",
      },
    },
  },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
  args: { inline: true, children: 'Just **one line** with `code` in it.' },
};

export const LinksAndPlaceholders: Story = {
  args: {
    children: 'A [labelled link](https://tenon.example/docs) reads as prose, ' +
      'where a bare URL like https://tenon.example still becomes a link on its own. ' +
      'A bracket with nothing to fill it in yet, like [the missing piece], stays visible as a gap.',
  },
};
