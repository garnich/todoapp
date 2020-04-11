import React, { Component } from 'react'
import { auth } from './../../Firebase'
import './authorizationForm.css'

class AuthorizationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      singInEmail: '',
      singInPassword: '',
      singUpEmail: '',
      singUpPassword1: '',
      singUpPassword2: '',
      emailNotVerified: true,
      createUserWithEmailAndPassword: false,
      error: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleInputChange(event) {
    switch (event.target.id) {
      case 'email1':
        this.setState({ singInEmail: event.target.value })
        break
      case 'pwd':
        this.setState({ singInPassword: event.target.value })
        break
      case 'email2':
        this.setState({ singUpEmail: event.target.value })
        break
      case 'pwd1':
        this.setState({ singUpPassword1: event.target.value })
        break
      case 'pwd2':
        this.setState({ singUpPassword2: event.target.value })
        break
      default:
        break
    }
  }

  handleSignIn(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const email = data.get('email')
    const password = data.get('pwd')

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        console.log('SUCSESS!!!')
        var user = auth.currentUser

        if (user !== null) {
          if (user.emailVerified) {
            return user.uid
          } else {
            return false
          }
        }
      })
      .then(data => {
        if (data) {
          this.props.onAuthChange(data)
        } else {
          this.setState({ emailNotVerified: false })
        }
      })
      .catch(error => {
        this.setState({
          singInEmail: '',
          singInPassword: '',
          error,
        })
      })
  }

  handleSignUp(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const email = data.get('email2')
    const password1 = data.get('pwd1')
    const password2 = data.get('pwd2')

    if (password1 === password2) {
      auth
        .createUserWithEmailAndPassword(email, password1)
        .then(function() {
          auth.currentUser.sendEmailVerification()
          console.log('createUserWithEmailAndPassword', true)
          return true
        })
        .then(data => {
          if (data) {
            this.setState({ createUserWithEmailAndPassword: true })
          }
        })
        .catch(error => {
          this.setState({ error })
        })
    } else {
      this.setState({
        singUpPassword1: '',
        singUpPassword2: '',
        error: { message: 'Passwords must be same' },
      })
    }
  }

  render() {
    const {
      singInEmail,
      singInPassword,
      singUpEmail,
      singUpPassword1,
      singUpPassword2,
      emailNotVerified,
      createUserWithEmailAndPassword,
      error,
    } = this.state

    return (
      <div className="errorWrapper">
        {error && (
          <p className="alert alert-danger loginError">{error.message}</p>
        )}
        <div className="authWrapper">
          <form
            role="form"
            className="col-3 m-auto"
            onSubmit={this.handleSignIn}
          >
            <h2 className="title">SignIn</h2>
            <div className="form-group">
              <label htmlFor="email1">Email address:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email1"
                value={singInEmail}
                onChange={this.handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className="form-control"
                name="pwd"
                id="pwd"
                value={singInPassword}
                onChange={this.handleInputChange}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {!emailNotVerified && (
              <p className="alert alert-warning">Please check your email!</p>
            )}
          </form>

          <form
            role="form"
            className="col-3 m-auto"
            onSubmit={this.handleSignUp}
          >
            <h2 className="title">SignUp</h2>
            <div className="form-group">
              <label htmlFor="email2">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email2"
                name="email2"
                value={singUpEmail}
                onChange={this.handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd1">Password:</label>
              <input
                type="password"
                className="form-control"
                name="pwd1"
                id="pwd1"
                value={singUpPassword1}
                onChange={this.handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd2">Confirm password:</label>
              <input
                type="password"
                className="form-control"
                name="pwd2"
                id="pwd2"
                value={singUpPassword2}
                onChange={this.handleInputChange}
                placeholder="Repeat password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {createUserWithEmailAndPassword && (
              <p className="alert alert-warning">Please check your email!</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default AuthorizationForm
