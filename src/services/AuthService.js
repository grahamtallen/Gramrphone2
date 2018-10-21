

export const createUser = async (email, password) => {
	try {
		await firebase.auth().createUserWithEmailAndPassword(email, password)
		return true
	} catch (e) {
		console.error(e);
		return false;
	}

}