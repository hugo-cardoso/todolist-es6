import $ from 'jquery';

class TodoView {

    constructor( selector ) {

        this._elem = $(selector);
    }

    update( model ) {

        this._elem.html( this.template( model ) );
    }

    template( model ) {

        return  `
                    <form class="todo-list__form">
                        <input type="text" class="todo-list__form-input" />
                        <button type="submit" class="todo-list__form-add">+</button>
                    </form>
                    <ul class="todo-list">
                        ${
                            model.list.map(item => {
                                return  `
                                            <li class="todo-list__item">
                                                <p class="todo-list__item-text">${ item.text }</p>
                                                <button class="todo-list__item-remove" data-key="${ item.key }">x</button>
                                            </li>
                                        `
                            }).join('')
                        }
                        
                    </ul>
                `;       
    }

    clear() {

        this._elem.html( '' );
    }
}

export default TodoView;