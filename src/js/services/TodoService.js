import firebase from "firebase"

import TodoItem from '../models/TodoItem';

class TodoService {

    constructor() {
        this.database = firebase.database();
    }

    addItem(id, todoItem) {

        return new Promise((resolve, reject) => {

            this.database.ref(`users/${ id }`).push({
                message: todoItem.text,
                date: todoItem.date
              }, error => {
                if (error) {
                  reject(error);
                } else {
                  resolve(true);
                }
              });
            
        });
    }

    removeItem(id, key) {

        return this.database.ref(`users/${ id }`).child(key).remove();
    }

    getList( id ) {

        let returnData = [];

        return new Promise((resolve, reject) => {

            this.database
                .ref(`users/${ id }`)
                .on('value', snapshot => {

                    snapshot.forEach(childSnapshot => {
                        const item = childSnapshot.val();
                        item.key = childSnapshot.key;
                
                        returnData.push( item );
                    });

                    resolve(returnData);
                }), error => {

                    reject(error);
                };
        });
    }

    
}

export default TodoService;