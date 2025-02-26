<<<<<<< HEAD
import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
=======
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
}

interface State {
  hasError: boolean;
<<<<<<< HEAD
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            {this.state.error && (
              <pre className="bg-gray-100 p-4 rounded-md text-left text-sm text-gray-700 mb-6 overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
            <Button
              onClick={this.handleReset}
              className="bg-parascape-green hover:bg-parascape-green/90"
            >
              Refresh Page
            </Button>
=======
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're sorry for the inconvenience. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-parascape-green text-white rounded-md hover:bg-parascape-green/90 transition-colors"
            >
              Reload Page
            </button>
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 