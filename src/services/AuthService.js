import firebase from './firebaseConfig'

export const createUser = async (email, password) => {
	try {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
	} catch (e) {
		console.error(e);
		return false;
	}
}

export const signInUser = async (email, password) => {
	try {
		return firebase.auth().signInWithEmailAndPassword(email, password)
	} catch (e) {
		console.error(e);
		return false;
	}
}

export const updateUser = async (newUserData) => {
	var currentUser = firebase.auth().currentUser;
	if (currentUser && newUserData) {
		return currentUser.updateProfile(newUserData)
	}

}