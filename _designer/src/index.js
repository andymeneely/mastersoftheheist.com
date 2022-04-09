import React from 'react';
import { createRoot } from 'react-dom/client';
import Designer from './Designer/designer';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Designer
  savekey={new URL(document.location).searchParams.get('savekey')}
/>);

