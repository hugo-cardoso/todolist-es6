import $ from 'jquery';

class HeaderUserView {

    constructor( selector ) {

        this._elem = $('#headerUser');
    }

    update( model = null ) {

        this._elem.html( this.template( model ) );
    }

    template( model ) {

        if( model ) {

            return  `
                        <div class="header">
                            <div class="header__avatar">
                                <img src="${ model.imageUrl }" alt="${ model.name }">
                            </div>
                            <h3 class="header__title">Olá, ${ model.name }!</h3>
                            <button id="logoutGoogle" class="btn btn--logout">Sair</button>
                        </div>
                    `;
        } else {

            return  `
                        <div class="header">
                            <h3 class="header__title">Olá! </h3>
                            <p class="header__sub-title">Entre com sua conta Google e comece suas anotações!</p>
                            <button id="loginGoogle" class="btn btn--google">Google</button>
                        </div>
                    `;
        }        
    }
}

export default HeaderUserView;