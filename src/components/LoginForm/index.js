import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', submitError: false, errorMsg: ''}

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  onLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.errorMsg)
    }
  }

  render() {
    const {username, password, submitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-main-container">
        <form className="login-form" onSubmit={this.onLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="label" htmlFor="userName">
              USERNAME
            </label>
            <input
              className="input-el"
              id="userName"
              type="text"
              value={username}
              placeholder="Username"
              onChange={this.onUserNameChange}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input-el"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          {submitError && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
