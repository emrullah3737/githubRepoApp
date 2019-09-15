import axios from 'axios';
import {stringify} from 'query-string';
import ConfigService from './configService';
import parseLink from '../handlers/parseLink';

class RequestService {
  constructor(configService) {
    const baseURL = configService.getBaseUrl();
    const headers = configService.getHeaders();
    const timeout = configService.getTimeout();

    this.config = configService;
    this.instance = axios.create({
      timeout,
      baseURL,
      headers,
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });
  }

  get({query = {}, path}) {
    return this.instance
      .get(`${path}?${stringify(query)}`)
      .then(({data, headers}) => ({
        data,
        headers,
        pagination: parseLink(headers.link),
      }));
  }
}

export default new RequestService(ConfigService);
