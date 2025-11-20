import React from "react";

type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console — developer can replace with remote logging
    // eslint-disable-next-line no-console
    console.error("Unhandled error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white/90 border border-border rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mb-4">The application threw an error during rendering.</p>
            <pre className="whitespace-pre-wrap text-xs bg-muted/10 p-3 rounded">{String(this.state.error)}</pre>
            <div className="mt-4 text-sm text-muted-foreground">Check the browser console for a full stack trace.</div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
