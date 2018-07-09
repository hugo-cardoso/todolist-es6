class User {

    constructor( data ) {

        this._name = data.name;
        this._email = data.email;
        this._id = data.id;
        this._image = data.imageUrl;
    }

    get name() {
        
        return this._name;
    }

    get email() {

        return this._email;
    }

    get imageUrl() {

        return this._image;
    }

    get id() {
        return this._id;
    }
}

export default User;