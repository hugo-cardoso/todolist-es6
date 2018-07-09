class TodoItem {
    
    constructor( props ) {

        this._text = props.text;
        this._date = props.date;
        this._key  = props.key;
    }

    get text() {
        return this._text;
    }

    get date() {
        return String(this._date);
    }

    get key() {
        return this._key;
    }
}

export default TodoItem;