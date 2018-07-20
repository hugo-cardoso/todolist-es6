import PubSub from 'pubsub-js';

import HeaderUserView from '../views/HeaderUserView';
import User from '../models/User';

import firebase from "firebase";
import 'firebase/auth';

class AuthController {

    constructor() {

        this.user = null;
        this.headerUserView = new HeaderUserView();
        this.provider = new firebase.auth.GoogleAuthProvider();
    }

    login() {

        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then(res => {

                const user = res.user;

                this.user = new User({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                    imageUrl: user.photoURL
                });

                PubSub.publish('user', this.user);
            });       
    }

    logout() {

        firebase
            .auth()
            .signOut()
            .then(res => {

                this.user = null;

                PubSub.publish('user', this.user);
            })
    }
}

export default AuthController;