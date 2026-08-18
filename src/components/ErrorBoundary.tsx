import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last-resort guard so an unexpected render error shows a recoverable message
 * instead of a blank page.
 *
 * Error boundaries have no hook equivalent, which is why this is a class.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace with the project's reporting service when one exists.
    console.error('Unhandled error in the application tree:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center"
      >
        <h1 className="font-sans text-xl font-bold text-ink">Something went wrong</h1>
        <p className="max-w-[420px] font-sans text-sm text-ink-soft">
          The page could not be displayed. Reloading usually resolves this.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
          className="rounded-[17.5px] px-6 py-3 font-sans text-[15px] font-semibold"
        >
          Reload page
        </Button>
      </div>
    );
  }
}
