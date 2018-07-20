import $ from 'jquery';
import PubSub from 'pubsub-js';

import TodoList from '../models/TodoList';
import TodoItem from '../models/TodoItem';
import TodoService from '../services/TodoService';

class TodoController {

    constructor() {

        this.todoService = new TodoService();
        this.todoList = new TodoList();
        this.user = null;

        PubSub.subscribe('user',(_,user) => {

            this.user = user;

            if( user ) {

                this.updateList()
            } else {

                this.todoList.clear();
                PubSub.publish('todolist',this.todoList);
            }
        });

        $('body').on('click','.card__remove', e => {
      
            const key = $(e.currentTarget).attr('data-key');
      
            this.removeItem( key );
          });
      
        $('body').on('submit','.todo-list__form', e => {
    
            e.preventDefault();
            this.addItem();
        }).bind(this);
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
                this.updateList();
            })
    }

    removeItem( key ) {

        this.todoService
            .removeItem(this.user.id, key)
            .then(res => {
          
                this.todoList.clear();
                this.updateList();
            })
      }

    updateList() {

        this.todoService
            .getList( this.user.id )
            .then(res => {

                res.map(item => {
        
                    this.todoList.add( new TodoItem({
                        text: item.message,
                        date: item.date,
                        key: item.key
                    }) )
                });
      
                PubSub.publish('todolist', this.todoList);
            });
    }
}

export default TodoController;