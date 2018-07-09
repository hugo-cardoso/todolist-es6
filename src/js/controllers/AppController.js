import * as firebase from "firebase"
import $ from 'jquery';

import APP_SETTINGS from '../APP_SETTINGS.js';
import TodoService from '../services/TodoService';
import TodoList from '../models/TodoList';
import TodoItem from '../models/TodoItem';
import AuthController from './AuthController';
import User from '../models/User';

import HeaderUserView from '../views/HeaderUserView';
import TodoView from '../views/TodoView';

class AppController {

  constructor() {
    
    firebase.initializeApp(APP_SETTINGS.firebase_configs);
    this.todoService = new TodoService();
    
    this.authController = new AuthController();

    this.todoList = new TodoList();
    this.user = null;

    this.headerUserView = new HeaderUserView('#headerUser');
    this.todoView = new TodoView('#todoList');
    
    this.init();

  }

  init() {

    this.checkIsLogged();

    $('body').on('click','#loginGoogle', e => this.login());
    $('body').on('click','#logoutGoogle', e => this.logout());
    $('body').on('click','.todo-list__item-remove', e => {
      
      const key = $(e.target).attr('data-key');

      this.removeItem( key );
    });
    $('body').on('submit','.todo-list__form', e => {

      e.preventDefault();
      this.addItem();
    }).bind(this);
  }

  removeItem( key ) {

    this.todoService.removeItem(this.user.id, key).then(res => {
      
      this.todoList.clear();
      this.updateTodoList();
    })
  }

  addItem() {

    const text = $('.todo-list__form-input').val();

    const todoItem = new TodoItem({
      text: text,
      date: new Date()
    });

    this.todoService
      .addItem(this.user.id, todoItem)
      .then(() => {
        
        this.todoList.clear();
        this.updateTodoList();
      })
  }

  checkIsLogged() {

    setTimeout(() => {

      const user = this.authController.isLogged();

      if ( user ) {
      
        this.user = new User({
          name: user.displayName,
          email: user.email,
          id: user.uid,
          imageUrl: user.photoURL
        });
  
        this.updateTodoList();
      }

      this.headerUserView.update(this.user);
    }, 1500);
  }

  login() {

      this.authController
        .login()
        .then(result => {

          const user = result.user;
        
          this.user = new User({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            imageUrl: user.photoURL
          });

          this.updateTodoList();
          this.headerUserView.update( this.user );
        });      
  }

  logout() {

    if ( this.user ) {

      this
      .authController
      .logout()
      .then(() => {
      
        this.user = null;
        this.headerUserView.update( this.user );
        this.todoView.clear();
      })
    }   
  }

  updateTodoList() {

    this.todoService.getList( this.user.id ).then(res => {

      res.map(item => {

        this.todoList.add( new TodoItem({
          text: item.message,
          date: item.date,
          key: item.key
        }) )
      });

      this.todoView.update( this.todoList );
    });
  }
}

export default AppController;