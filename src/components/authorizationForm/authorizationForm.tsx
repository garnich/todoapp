import React, { ChangeEvent, FunctionComponent, ReactElement, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { auth } from '../../Firebase'
import './authorizationForm.scss'

interface IState {
  singInEmail: string,
  singInPassword: string
  singUpEmail: string
  singUpPassword1: string
  singUpPassword2: string
  emailNotVerified: boolean,
  createUserWithEmailAndPassword: boolean,
  error: null | {message: string},
}

interface IProps {
  onAuthChange: (uid: string) => void
}

const state: IState = {
  singInEmail: '',
  singInPassword: '',
  singUpEmail: '',
  singUpPassword1: '',
  singUpPassword2: '',
  emailNotVerified: true,
  createUserWithEmailAndPassword: false,
  error: null,
}

type FormInputs = {
  singInEmail?: string,
  singInPassword?: string,
  singUpEmail?: string,
  singUpPassword1?: string,
  singUpPassword2?: string,
}

const AuthorizationForm: FunctionComponent<IProps> = ({onAuthChange}):ReactElement => {
  const [formState, setFormState] = useState(state);
  const { register, handleSubmit } = useForm<FormInputs>();
  const {
    singInEmail,
    singInPassword,
    singUpEmail,
    singUpPassword1,
    singUpPassword2,
    emailNotVerified,
    createUserWithEmailAndPassword,
    error,
  } = formState;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>):void {
    const name: string = event.target.name
    const value: string = event.target.value

    setFormState({
      ...formState,
      [name]: value
    })
  }

  // function handleSignIn(data: FormInputs, event: any): void {
  function handleSignIn(data: FormInputs): void {
    // event.preventDefault();
    const email: string = data['singInEmail']
    const password: string = data['singInPassword']

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        console.log('SUCSESS!!!')
        let user = auth.currentUser
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
          onAuthChange(data)
        } else {
          setFormState({
            ...formState,
            emailNotVerified: false,
            error: null,
          })
        }
      })
      .catch(error => {
        setFormState({
          ...formState,
          singInEmail: '',
          singInPassword: '',
          emailNotVerified: true,
          createUserWithEmailAndPassword: false,
          error,
        })
      })
  }
  
  function handleSignUp(data: FormInputs): void {
    const email = data['singUpEmail']
    const password1 = data['singUpPassword1']
    const password2 = data['singUpPassword2']

    if (password1 === password2) {
      auth
        .createUserWithEmailAndPassword(email, password1)
        .then(function() {
          auth.currentUser.sendEmailVerification()
          console.log('createUserWithEmailAndPassword -> SUCSESS!')
          return true
        })
        .then(data => {
          if (data) {
            setFormState({
              ...formState,
              singUpEmail: '',
              singUpPassword1: '',
              singUpPassword2: '',
              createUserWithEmailAndPassword: true,
              error: null,
            })
          }
        })
        .catch(error => {
          setFormState({
            ...formState,
            singUpEmail: '',
            singUpPassword1: '',
            singUpPassword2: '',
            error,
          })
        })
    } else {
      setFormState({
        ...formState,
        singUpPassword1: '',
        singUpPassword2: '',
        error: { message: 'Passwords must be same' },
      })
    }
  }

  return(
      <div className="errorWrapper">
        <div className="loginErrorWrapper">
          {error && (
            <p className="alert alert-danger text-center">{error.message}</p>
          )}
          {(!emailNotVerified || createUserWithEmailAndPassword) && (
            <div className="emailCheckerInfo text-center">
              <p className="alert alert-warning">Please check your email!</p>
            </div>
          )}
        </div>
        <div className="authWrapper">
          <form
            autoComplete="off"
            role="form"
            className="col-3"
            // onSubmit={(event) => handleSubmit(handleSignIn)(event)}
            onSubmit={handleSubmit(handleSignIn)}
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
                onChange={handleInputChange}
                placeholder="Email"
                required
                ref={register}
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
                onChange={handleInputChange}
                placeholder="Password"
                required
                ref={register}
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
            onSubmit={handleSubmit(handleSignUp)}
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
                onChange={handleInputChange}
                placeholder="Email"
                required
                ref={register}
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
                onChange={handleInputChange}
                placeholder="Password"
                required
                ref={register}
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
                onChange={handleInputChange}
                placeholder="Repeat password"
                required
                ref={register}
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

export default AuthorizationForm
