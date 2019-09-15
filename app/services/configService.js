import dotty from 'dotty';
import development from '../config/development';
import production from '../config/production';

class ConfigService {
  constructor(env) {
    const {NODE_ENV = 'development'} = process.env;
    this.config = env[NODE_ENV];
  }

  getBaseUrl() {
    return dotty.get(this.config, 'api.baseUrl');
  }

  getHeaders() {
    return dotty.get(this.config, 'api.headers');
  }

  getTimeout() {
    return dotty.get(this.config, 'api.timeout');
  }
}

export default new ConfigService({development, production});
