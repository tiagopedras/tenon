import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Field, Modal, ModalPane, Textarea } from '../src';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { open: false, onClose: () => {}, title: 'Title', children: null },
  parameters: {
    docs: {
      story: { inline: false, iframeHeight: 420 },
      description: {
        component: 'Escape, the X and the scrim close it. Tab stays inside, and focus goes back to the button. The document one keeps the size you drag it to.',
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* A modal needs something to open it, so each story is a button and a modal
   that share one piece of state. */
function Opener({ label, variant = 'secondary', children }: {
  label: string;
  variant?: 'primary' | 'secondary';
  children: (open: boolean, close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>{label}</Button>
      {children(open, () => setOpen(false))}
    </>
  );
}

export const ChatWindow: Story = {
  render: () => (
    <Opener label="Chat window" variant="primary">
      {(open, close) => (
        <Modal
          open={open}
          onClose={close}
          title="Improvements agent"
          subtitle="agents-dashboard · 06:00"
          size="lg"
          footer={<><Textarea autoGrow placeholder="Reply…" style={{ flex: 1 }} /><Button variant="primary">Send</Button></>}
        >
          <p className="tenon-body">The body scrolls and the head and footer stay where they are.</p>
          {Array.from({ length: 14 }, (_, i) => <p key={i} className="tenon-body-sm">Line {i + 1}. Something the agent did.</p>)}
        </Modal>
      )}
    </Opener>
  ),
};

export const DocumentSplitAndResizable: Story = {
  render: () => (
    <Opener label="Document, split and resizable">
      {(open, close) => (
        <Modal
          open={open}
          onClose={close}
          title="Write the Tenon migration note"
          subtitle="In Waiting for review · Design System · Doing · 14 Sep, 02:14 · planning agent"
          size="xl"
          layout="split"
          resizable
          resizeKey="tenon-storybook-doc-size"
          footer={<><Button variant="secondary">Turn it down</Button><Button variant="confirm">Accept</Button></>}
        >
          <ModalPane aside>
            <h3 className="tenon-heading-6">History</h3>
            {Array.from({ length: 12 }, (_, i) => <p key={i} className="tenon-body-sm">Night {i + 1}: replanned.</p>)}
          </ModalPane>
          <ModalPane>
            <h3 className="tenon-heading-4">Plan</h3>
            {Array.from({ length: 24 }, (_, i) => <p key={i} className="tenon-body-sm">Step {i + 1}. Each column scrolls on its own. Drag the corner; the size is kept.</p>)}
          </ModalPane>
        </Modal>
      )}
    </Opener>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Opener label="Confirmation">
      {(open, close) => (
        <Modal
          open={open}
          onClose={close}
          title="Turn this one down?"
          subtitle="Write the Tenon migration note"
          size="sm"
          initialFocus="footer"
          onSubmit={close}
          footer={<><Button variant="secondary" onClick={close}>Keep it</Button><Button variant="destructive" onClick={close}>Turn it down</Button></>}
        >
          <Field label="Why" multiline rows={3} placeholder="⌘↵ sends it from here" />
        </Modal>
      )}
    </Opener>
  ),
};
