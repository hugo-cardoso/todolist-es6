import firebase from "firebase";
import 'firebase/auth';

class AuthController {

    constructor() {

        this.provider = new firebase.auth.GoogleAuthProvider();
    }

    isLogged() {

        const user = firebase.auth().currentUser;

        return user ? user : false;
    }

    login() {

        return firebase.auth().signInWithPopup(this.provider);
    }

    logout() {

        return firebase.auth().signOut();
    }
}

export default AuthController;