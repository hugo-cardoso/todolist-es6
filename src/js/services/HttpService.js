import axios from 'axios';

class HttpService {

  static getData( url ) {

    return  axios.get( url );
  }
}

export default HttpService;;