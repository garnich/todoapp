import React, { Component, ErrorInfo, ReactNode  } from 'react'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean,
  errorInfo: ErrorInfo
}

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    errorInfo: null
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    const { hasError, errorInfo } = this.state

    return hasError ? (
      <p className="alert alert-danger">{errorInfo}</p>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary;
