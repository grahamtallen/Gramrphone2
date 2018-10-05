import "./Login.css"
import React from 'react';
import {fakeAuth} from '../../components/NavBar/NavBar';
import { Redirect } from 'react-router-dom';


export default class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-container">
        <div className="login-heading">Log In</div>
        <label>
		   <input type="text" name="username" />
		   Username or Email
		</label>
        <label>
		   <input type="password" name="password" />
		   Password
		</label>
        <button onClick={this.login}>Enter</button>
      </div>
    );
  }
}