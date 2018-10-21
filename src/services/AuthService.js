import firebase from './firebaseConfig'

export const createUser = async (email, password) => {
	try {
		const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
		return result
	} catch (e) {
		console.error(e);
		return false;
	}
}

export const signInUser = async (email, password) => {
	try {
		const result = await firebase.auth().signInWithEmailAndPassword(email, password)
		return result
	} catch (e) {
		console.error(e);
		return false;
	}
}