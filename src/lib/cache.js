import { CACHE_NAMESPACE } from 'app-constants';

class Cache {
  constructor(namespace=null) {
    this.ns     = namespace || CACHE_NAMESPACE;
    this.caches = global.caches;
  }

  async cache() {
    return await this.caches.open(this.ns);
  }

  req(req) {
    return req instanceof Request ? req : new Request(req);
  }

  async get(request) {
    let req = this.req(request);
    const cache = await this.cache();
    return await cache.match(req);
  }

  async set(request, response) {
    let req = this.req(request);

    const cache = await this.cache();
    cache.put(request, response);
    return response.clone();
  }
}

export default Cache;