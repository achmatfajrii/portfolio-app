"use client";
import { useRef, useState } from 'react';
import { Attachment01Icon, Globe02Icon } from '@hugeicons/core-free-icons';
import PromptBar from './react-bits/PromptBar';

export default function PromptSection() {
    const [busy, setBusy] = useState(false);
const controller = useRef<AbortController | null>(null);

const send = async (text: any, { attachments, model, effort }: any) => {
  setBusy(true);
  controller.current = new AbortController();
  await ask({ text, attachments, model: model.key, effort, signal: controller.current.signal }).catch(() => {});
  setBusy(false);
};

   return (
     <PromptBar
    placeholder="Ask anything"
    sources={[
        { key: 'files', name: 'Photos & files', description: 'Upload from this device', icon: Attachment01Icon, attach: true },
        { key: 'web', name: 'Web search', description: 'Live results', icon: Globe02Icon }
    ]}
    commands={[{ key: 'summarize', name: '/summarize', description: 'Digest the thread so far' }]}
    models={[
        { key: 'nova-3', name: 'Nova 3', tag: 'Flagship' },
        { key: 'nova-mini', name: 'Nova Mini', tag: 'Fast' }
    ]}
    efforts={['Low', 'Medium', 'High', 'Extra', 'Max']}
    busy={busy}
    onSend={send}
    onStop={() => controller.current?.abort()}
    onAttach={() => {
        console.log('Attach clicked');
        return null;
        }}
        onDictate={() => {
        console.log('Dictate clicked');
        return null;
        }}
    background="#27272a"
    color="#f5f5f5"
    menuBackground="#323236"
    sparkColor="#b39dff"
    sparkBoost={1}
    width={400}
    radius={16}
    maxRows={5}
    morphDuration={240}
    squash={0.12}
    tilt={8}
    pressScale={0.96} onEffortChange={undefined}/>
   )
}

function ask(arg0: { text: any; attachments: any; model: any; effort: any; signal: AbortSignal; }) {
  return fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: arg0.text,
      attachments: arg0.attachments,
      model: arg0.model,
      effort: arg0.effort,
    }),
    signal: arg0.signal,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}
