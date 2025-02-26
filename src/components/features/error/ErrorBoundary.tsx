import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
            <p className="mb-6 text-gray-600">
              We apologize for the inconvenience. Please try refreshing the page or contact support
              if the problem persists.
            </p>
            {this.state.error && (
              <pre className="mb-6 overflow-auto rounded-md bg-gray-100 p-4 text-left text-sm text-gray-700">
                {this.state.error.toString()}
              </pre>
            )}
            <Button
              onClick={this.handleReset}
              className="bg-parascape-green hover:bg-parascape-green/90"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
