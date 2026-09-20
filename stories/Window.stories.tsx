import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Disclosure, EditableText, LinkButton, Markdown, Textarea, Window } from '../src';
import type { WindowOrigin, WindowRect } from '../src';

const meta = {
  title: 'Components/Window',
  component: Window,
  tags: ['autodocs'],
  args: { open: false, onClose: () => {}, title: 'Title', children: null },
  parameters: {
    docs: {
      story: { inline: false, iframeHeight: 520 },
      description: {
        component: 'No scrim, so the page stays reachable. Drag by the head, resize from any edge, and it grows out of the button and shrinks back into it. Escape closes it, unless the title is being edited.',
      },
    },
  },
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

function CardWindow() {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<WindowRect | null>(null);
  const [name, setName] = useState('Reading the 360 responses');
  const [origin, setOrigin] = useState<WindowOrigin | null>(null);
  return (
    <>
      <Button variant="primary" onClick={(e) => { setOrigin(e.currentTarget.getBoundingClientRect()); setOpen(true); }}>
        Card window
      </Button>
      <Window
        open={open}
        onClose={() => setOpen(false)}
        title={<EditableText value={name} onCommit={setName} />}
        subtitle="Design oversight · ~/Code/twinkl-hr"
        rect={rect}
        onRectChange={setRect}
        growFrom={origin}
        headEnd={<LinkButton variant="ghost" size="sm" href="#">Open in Claude</LinkButton>}
        bare
        footer={<div style={{ display: 'flex', gap: 8, padding: 12 }}><Textarea autoGrow placeholder="Reply…" style={{ flex: 1 }} /><Button variant="primary">Send</Button></div>}
      >
        <div style={{ padding: 16, overflowY: 'auto' }}>
          <Disclosure summary="3 steps · Read, Grep">
            <ol style={{ margin: 0 }}><li>Read 360.md</li><li>Grep probation</li><li>Read template</li></ol>
          </Disclosure>
          <Markdown>{'A **reply** with `code`, _italics_ and a link https://tenon.example/docs.\n\n- one\n- two\n\n```\nnpm run build\n```'}</Markdown>
        </div>
      </Window>
    </>
  );
}

export const OpensFromAButton: Story = { render: () => <CardWindow /> };
