import firebase from "firebase";

import $ from 'jquery';
import PubSub from 'pubsub-js';

import APP_SETTINGS from '../APP_SETTINGS.js';

import TodoController from './TodoController';
import AuthController from './AuthController';

import HeaderUserView from '../views/HeaderUserView';
import TodoView from '../views/TodoView';

class AppController {

  constructor() {
    
    firebase.initializeApp(APP_SETTINGS.firebase_configs);

    this.user = null;
    
    this.authController = new AuthController();
    this.todoController = new TodoController();
    
    this.todoView = new TodoView();
    this.headerUserView = new HeaderUserView();   
    this.init();
  }

  init() {

    this.headerUserView.update();

    $('body').on('click','#loginGoogle', e => this.authController.login());
    $('body').on('click','#logoutGoogle', e => this.authController.logout());

    PubSub.subscribe('user',(_,user) => {

      this.user = user;
      this.headerUserView.update( user )
    });

    PubSub.subscribe('todolist',(_,todolist) => {

      this.user ? this.todoView.update( todolist ) : this.todoView.clear();
    });
  }
}

export default AppController;