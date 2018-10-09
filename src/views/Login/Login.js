import "./Login.css"
import React from 'react';
import AuthStore from '../../stores/AuthStore';
import { Redirect } from 'react-router-dom';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

@observer
export default class Login extends React.Component {
  @observable redirectToReferrer = false

  @action setRedirect = () => {
  	this.redirectToReferrer = true;
  }
 
  login = async () => {
    await AuthStore.authenticate();
    this.setRedirect();
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this;

    const loginButton = <button onClick={this.login}>Enter</button>

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
        {AuthStore.loading ? <LoadingSpinner/> : loginButton}
      </div>
    );
  }
}