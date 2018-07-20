import $ from 'jquery';
import slick from 'slick-carousel';

import DateHelper from '../helpers/DateHelper';

class TodoView {

    constructor( selector ) {

        this._elem = $('#todoList');
        this.carouselOptions = {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true,
            infinite: false,
            dots: false,
            arrows: false
        };
    }

    update( model ) {

        this._elem.html( this.template( model ) );
        this._elem.find('.card__wrapper').slick( this.carouselOptions );
    }

    template( model ) {

        return  !model ? `` : `
                    <form class="todo-list__form">
                        <input type="text" class="todo-list__form-input" placeholder="Crie uma nota..."/>
                        <button type="submit" class="todo-list__form-add">+</button>
                    </form>
                    <div class="card__wrapper">
                        ${
                            model.list.map(item => {
                                return  `
                                        <div class="card">
                                            <div class="card__text">
                                                ${ item.text }
                                            </div>
                                            <div class="card__bottom">
                                                <span class="card__date">
                                                    ${ DateHelper.dateForText( item.date ) }
                                                </span>
                                                <button class="card__remove" data-key="${ item.key }">
                                                    <i class="mdi mdi-delete"></i>
                                                </button>
                                            </div>
                                        </div>
                                        `
                            }).join('')
                        }
                        
                    </div>
                `;       
    }

    clear() {

        this._elem.html( '' );
    }
}

export default TodoView;