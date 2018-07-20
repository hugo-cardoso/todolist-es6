class DateHelper {

    static dateForText( stringDate ) {

        const mouths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

        const date = new Date( stringDate );

        const day = date.getDate();
        const mouth = date.getMonth();
        const year = date.getFullYear();

        return `${ day } de ${ mouths[mouth] } de ${ year }`;
    }
}

export default DateHelper;