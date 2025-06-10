import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import App from './App.jsx'

import 'normalize.css'; // Included to avoid browser-specific style inconsistencies.
import '@mantine/core/styles.layer.css';
import './styles/root.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
      theme={{
        primaryColor: 'blight',
        colors: {
          blight: [
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
            'var(--color-primary)',
          ],
        },
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
)
