import {observable, action} from 'mobx';

class AuthStore {

	@observable isAuthenticated = false;
	@observable loading = false;

	@action
	authenticate = () => {
		return new Promise((resolve, reject) => {
			this.loading = true;
	    	setTimeout(action(() => {
	    		this.isAuthenticated = true;
	    		this.loading = false;
	    		resolve();
	    	}), 1000); // fake async
		})
	}	

	signout(cb) {
	    this.isAuthenticated = false;
	    setTimeout(cb, 100);
  	}
}

export default new AuthStore()