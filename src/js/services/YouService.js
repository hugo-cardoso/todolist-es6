import HttpService from './HttpService'

class YouService {

  constructor() {

    this.KEY = '***';
    this.BASE_URL = '...';
  }

  search( query ) {

    const url = `${ this.BASE_URL }`;

    return HttpService.getData( url );
  }
}

export default YouService;