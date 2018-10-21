import {observable, action} from 'mobx';
import {signInUser} from '../services/AuthService';

class AuthStore {

	@observable isAuthenticated = true;
	@observable loading = false;

	@action
	signInUser = async (email, password) => {
		this.loading = true;
		try {
			console.log(email.password)
			const result = await signInUser(email, password);
			this.loading = false;
			return result
		} catch (e) {
			this.loading = false;
			console.log(e);
			return false;
		}
	}	

	signout(cb) {
	    this.isAuthenticated = false;
	    setTimeout(cb, 100);
  	}
}

export default new AuthStore()