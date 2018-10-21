import "./Login.css"
import React from 'react';
import AuthStore from '../../stores/AuthStore';
import { Redirect } from 'react-router-dom';
import {observer} from 'mobx-react';
import {observable, action, runInAction} from 'mobx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

@observer
export default class Login extends React.Component {

  componentDidMount() {
    if (!AuthStore.initialLoadCompleted) this.setRedirect();
  }

  @observable redirectToReferrer = false;
  @observable signingUp = true;
  @observable email = "";
  @observable password = "";

  @observable
  updateEmail = e => this.email = e.target.value;
  @observable
  updatePassword = e => this.password = e.target.value;

  @action
  goToSignUp = () => this.signingUp = true;

  @action setRedirect = () => {
  	this.redirectToReferrer = true;
  }
 
  login = async () => {
    const result = await AuthStore.signInUser(this.email, this.password);
    if (result) {
      this.setRedirect();
    }
  };

  render() {
    console.log('Rendered', AuthStore.initialLoadCompleted)
    if (!AuthStore.initialLoadCompleted) {
      return (
        <div className='first-loading-spinner-container'>
         <LoadingSpinner />
        </div>
      )
    }
    if (this.signingUp) return <SignUp />

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this;

    const loginButton = <button onClick={this.login}>Log In</button>

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-container">
        <div className="login-heading">Log In</div>
        <label>
  		   <input type="text" name="username" onChange={this.updateEmail} />
  		   Username or Email
    		</label>
        <label>
    		   <input type="password" name="password" onChange={this.updatePassword} />
    		   Password
    		</label>
        <div className="bottom-buttons">
          {AuthStore.loading ? <LoadingSpinner/> : loginButton}
          <button onClick={this.goToSignUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}


// Sign Up


@observer
class SignUp extends React.Component {
  @observable loading = false;
  @observable email = "";
  @observable pwd = "";
  @observable confirmPwd = "";
  @observable handle = "";

  @action
  updateEmail = (e) => this.email = e.target.value
  @action
  updatePwd = (e) => this.pwd = e.target.value
  @action
  updateConfirmPwd = (e) => this.confirmPwd = e.target.value
  @action
  updateHandle = (e) => this.handle = e.target.value

  @action
  signUp = async () => {
    try {
      this.loading = true;
      console.log('handle: ', this.handle)
      const result = await AuthStore.createUser(this.email, this.pwd, this.handle)
      runInAction(() => {
        if (result) {
          this.loading = false;
          this.successfullySignedUp = true;
        } else {
          this.loading = false;
          this.error = true;
        }
      })
    } catch (e) {
      console.error(e)
      this.loading = false; 
      this.error = true;
    }
  }

  render() {

    const signUpButton = <button onClick={this.signUp}>Sign Up</button>

    return (
      <div className="login-container">
        <div className="login-heading">Sign up for gramrphone</div>
        <label>
         <input type="text" name="username" onChange={this.updateEmail} />
         Email
        </label>
        <label>
         <input type="password" name="password" onChange={this.updatePwd} />
         Password
        </label>
        <label>
         <input type="password" name="password" onChange={this.updateConfirmPwd} />
         Confirm Password
        </label>
        <label>
         <input type="text" name="password" onChange={this.updateHandle} />
         Handle
        </label>
        {this.loading ? <LoadingSpinner/> : signUpButton}
      </div>
    );
  }
}
