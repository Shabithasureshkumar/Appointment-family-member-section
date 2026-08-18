import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const container = document.getElementById('root');

// Explicit rather than a non-null assertion: if the host page is missing its
// mount point, fail with a message that says so instead of a TypeError.
if (!container) {
  throw new Error('Unable to start: no element with id "root" was found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
