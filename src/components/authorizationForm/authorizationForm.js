import React, { Component } from 'react'
import { auth } from './../../Firebase'
import './authorizationForm.css'

class AuthorizationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailNotVerified: true,
      createUserWithEmailAndPassword: false,
    }

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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
      .catch(function(error) {
        console.log('ERROR', error.message)
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
        .catch(function(error) {
          console.log(error.message, 7000)
        })
    } else {
      console.log('PASSWORSD MUST BE SAME')
    }
  }

  render() {
    const { emailNotVerified, createUserWithEmailAndPassword } = this.state

    return (
      <div className="authWrapper">
        <form role="form" className="col-3 m-auto" onSubmit={this.handleSignIn}>
          <h2 className="title">SignIn</h2>
          <div className="form-group">
            <label htmlFor="email1">Email address:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              name="pwd"
              id="pwd"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {!emailNotVerified && (
            <p className="alert alert-warning">Please check your email!</p>
          )}
        </form>

        <form role="form" className="col-3 m-auto" onSubmit={this.handleSignUp}>
          <h2 className="title">SignUp</h2>
          <div className="form-group">
            <label htmlFor="email2">Email address:</label>
            <input
              type="email"
              className="form-control"
              id="email2"
              name="email2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd1">Password:</label>
            <input
              type="password"
              className="form-control"
              name="pwd1"
              id="pwd1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd2">Confirm password:</label>
            <input
              type="password"
              className="form-control"
              name="pwd2"
              id="pwd2"
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
    )
  }
}

export default AuthorizationForm
