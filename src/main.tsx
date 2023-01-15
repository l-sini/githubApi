import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { Resize } from './hooks/resize';
import App from './App';
import './index.css';
import { IntlProvider } from 'react-intl';

const { VITE_QUERY_STALE_TIME } = import.meta.env;

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(VITE_QUERY_STALE_TIME),
      retryDelay: 30000,
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Resize>
      <Router>
        <QueryClientProvider client={reactQueryClient}>
          <IntlProvider locale='ko' defaultLocale='ko'>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </IntlProvider>
        </QueryClientProvider>
      </Router>
    </Resize>
  </React.StrictMode>
);
