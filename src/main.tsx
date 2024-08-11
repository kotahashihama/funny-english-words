import { createTheme, ThemeProvider } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './components/AppProvider/AppProvider';
import OpenAI from 'openai';

const queryClient = new QueryClient();
const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
export const openAi = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
