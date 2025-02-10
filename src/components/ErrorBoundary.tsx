import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
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
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <button
<<<<<<< HEAD
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-black rounded"
            >
              Try Again
=======
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
>>>>>>> c0ca58a9a34fb9da5372b6efae6ad5f673e35e14
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 