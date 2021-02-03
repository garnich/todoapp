import React, { Component, ErrorInfo, ReactNode  } from 'react'

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  error: string
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: '',
    }
  }
  public state: IState = {
    hasError: false,
    error: ''
  }

  componentDidCatch(error, info: ErrorInfo): void {
    this.setState({
      hasError: true,
      error: JSON.stringify(info),
    })
  }

  render() {
    const { hasError, error } = this.state

    return hasError ? (
      <p className="alert alert-danger">{error}</p>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary;
