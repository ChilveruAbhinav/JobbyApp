import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-menu-item">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <Link to="/jobs" className="nav-link">
        <button className="logout" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </Link>
    </nav>
  )
}
export default withRouter(Header)
