import React, { Component, Fragment } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: '',
    }
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error,
    })
  }

  render() {
    const { hasError, error } = this.state

    return hasError ? (
      <p className="alert alert-danger">{error.message}</p>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
