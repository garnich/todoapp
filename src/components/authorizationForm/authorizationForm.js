import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  inputChgangeAction,
  createUserAction,
  createUserErrorAction,
  samePassErrorAction,
  loginUserErrorAction,
} from './../actions/actionsAuth'
import { auth } from '../../services/Firebase'

import './authorizationForm.scss'

class AuthorizationForm extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.props.inputChgange(name, value)
  }

  handleSignIn(event) {
    event.preventDefault()
    const form = event.target
    const email = form[0].value
    const password = form[1].value

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let user = auth.currentUser
        if (user !== null) {
          if (user.emailVerified) {
            this.props.onAuthChange(user.uid)
          } else {
            this.setState({
              emailNotVerified: false,
              error: null,
            })
          }
        }
      })
      .catch(error => this.props.loginUserError(error))
  }

  handleSignUp(event) {
    event.preventDefault()
    const form = event.target
    const email = form[0].value
    const password1 = form[1].value
    const password2 = form[2].value

    if (password1 === password2) {
      auth
        .createUserWithEmailAndPassword(email, password1)
        .then(() => {
          auth.currentUser.sendEmailVerification()

          this.props.createUser();
        })
        .catch(error => {
          this.props.createUserError(error)
        })
    } else {
        this.props.samePassError()
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
    } = this.props

    const emailCheckerInfo = (
      <div className="emailCheckerInfo text-center">
        <p className="alert alert-warning">Please check your email!</p>
      </div>
    )

    return (
      <div className="errorWrapper">
        <div className="loginErrorWrapper">
          {error && (
            <p className="alert alert-danger text-center">{error.message}</p>
          )}
          {(!emailNotVerified || createUserWithEmailAndPassword) &&
            emailCheckerInfo}
        </div>
        <div className="authWrapper">
          <form
            autoComplete="off"
            role="form"
            className="col-3"
            onSubmit={this.handleSignIn}
          >
            <h2 className="title">SignIn</h2>
            <div className="form-group">
              <label htmlFor="email1">Email address:</label>
              <input
                type="email"
                className="form-control"
                name="singInEmail"
                id="email1"
                value={singInEmail}
                onChange={this.handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className="form-control"
                name="singInPassword"
                id="pwd"
                value={singInPassword}
                onChange={this.handleInputChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Submit
            </button>
          </form>

          <form
            autoComplete="off"
            role="form"
            className="col-3"
            onSubmit={this.handleSignUp}
          >
            <h2 className="title">SignUp</h2>
            <div className="form-group">
              <label htmlFor="email2">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email2"
                name="singUpEmail"
                value={singUpEmail}
                onChange={this.handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd1">Password:</label>
              <input
                type="password"
                className="form-control"
                name="singUpPassword1"
                id="pwd1"
                value={singUpPassword1}
                onChange={this.handleInputChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd2">Confirm password:</label>
              <input
                type="password"
                className="form-control"
                name="singUpPassword2"
                id="pwd2"
                value={singUpPassword2}
                onChange={this.handleInputChange}
                placeholder="Repeat password"
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({authState}) => {
  return {
    singInEmail: authState.singInEmail,
    singInPassword: authState.singInPassword,
    singUpEmail: authState.singUpEmail,
    singUpPassword1: authState.singUpPassword1,
    singUpPassword2: authState.singUpPassword2,
    emailNotVerified: authState.emailNotVerified,
    createUserWithEmailAndPassword: authState.createUserWithEmailAndPassword,
    error: authState.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      inputChgange: (name, value) => {dispatch(inputChgangeAction(name, value))},
      createUser: () => {dispatch(createUserAction())},
      createUserError: (err) => {dispatch(createUserErrorAction(err))},
      samePassError: () => {dispatch(samePassErrorAction())},
      loginUserError: (err) => {dispatch(loginUserErrorAction(err))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationForm)
