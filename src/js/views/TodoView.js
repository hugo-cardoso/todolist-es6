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
            speed: 100,
            focusOnSelect: true,
            prevArrow: '.card-wrapper__nav-slide--prev',
            nextArrow: '.card-wrapper__nav-slide--next'
        };
    }

    update( model ) {

        this._elem.html( this.template( model ) );

        const slickContainer = this._elem.find('.card-wrapper .card-slides');

        slickContainer.slick( this.carouselOptions );
    }

    template( model ) {

        return  !model ? `` : `
                    <form class="todo-list__form">
                        <input type="text" class="todo-list__form-input" placeholder="Crie uma nota..."/>
                        <button type="submit" class="todo-list__form-add">+</button>
                    </form>
                    <div class="card-wrapper">
                        <div class="card-wrapper__nav-slide card-wrapper__nav-slide--prev">
                            <i class="mdi mdi-chevron-left"></i>
                        </div>
                        <div class="card-wrapper__nav-slide card-wrapper__nav-slide--next">
                            <i class="mdi mdi-chevron-right"></i>
                        </div>
                        <div class="card-slides">
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
                    </div>
                `;       
    }

    clear() {

        this._elem.html( '' );
    }
}

export default TodoView;