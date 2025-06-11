import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import '@mantine/core/styles.css';
import 'material-symbols';
import './styles/root.scss';
import { ShopContextProvider } from './context/useShopContext.jsx';

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
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

    <ShopContextProvider>
      <App />
    </ShopContextProvider>
      
    </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
