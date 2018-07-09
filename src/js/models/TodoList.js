class TodoList {
    
    constructor() {

        this._list = [];
    }

    add( item ) {

        this._list.push( item );
    }

    get list() {

        return this._list.reverse();
    }

    clear() {

        this._list = [];
    }
}
export default TodoList;