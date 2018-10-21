import {observable, action, runInAction} from 'mobx';
import {signInUser, updateUser, createUser} from '../services/AuthService';
import firebase from '../services/firebaseConfig';

class AuthStore {

	@observable foo = 0;

	constructor() {
		firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
		    // User is signed in.
		    var displayName = user.displayName;
		    var email = user.email;
		    var emailVerified = user.emailVerified;
		    var photoURL = user.photoURL;
		    var isAnonymous = user.isAnonymous;
		    var uid = user.uid;
		    var providerData = user.providerData;
		    runInAction(() => {
		    	this.isAuthenticated = true;
		    	this.initialLoadCompleted = true;
		  		console.log("Happened?", displayName)
		    })
		  } else {
		    this.initialLoadCompleted = true;
		  }

		});

		setInterval(() => this.foo = this.foo + 1, 200)

	}

	@observable initialLoadCompleted = false;
	@observable isAuthenticated = false;
	@observable loading = false;

	@action
	signInUser = async (email, password) => {
		this.loading = true;
		try {
			const result = await signInUser(email, password);
			this.loading = false;
			this.isAuthenticated = true;
			return result
		} catch (e) {
			this.loading = false;
			console.log(e);
			return false;
		}
	}

	@action 
	createUser = async (email, password, displayName) => {
		const result = createUser(email, password)
		if (result && displayName) {
			console.log({displayName})
			const updatedUser = await updateUser({displayName});
			console.log({updatedUser})
		}
		return {result, displayName}
	}	

	signout(cb) {
	    this.isAuthenticated = false;
	    setTimeout(cb, 100);
  	}
}

export default new AuthStore()