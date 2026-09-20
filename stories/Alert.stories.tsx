import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Button } from '../src';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { title: 'Run finished', children: 'Nothing changed on disk.' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Info: Story = {
  args: { tone: 'info', title: 'Claude wants to run a command', children: 'git status in /Users/tiagopedras/Code' },
};

export const Success: Story = {
  args: { tone: 'success', title: 'Merged', children: 'Both commits are on main.' },
};

export const WithActions: Story = {
  args: {
    tone: 'warning',
    title: 'Allow this edit?',
    children: 'It rewrites board.css in place.',
    actions: (
      <>
        <Button size="sm" variant="confirm">Allow</Button>
        <Button size="sm" variant="secondary">Deny</Button>
      </>
    ),
  },
};

export const Error: Story = {
  args: { tone: 'error', title: 'The run stopped', children: 'The server did not answer.' },
};
