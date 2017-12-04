import { CACHE_NAMESPACE } from 'app-constants';

/**
 * Wrapper over CacheStorage
 */
class Cache {
  /**
   * @param {String} the cache's namespace
   */
  constructor(namespace=null, storage = null) {
    this.ns       = namespace || CACHE_NAMESPACE;
    this.storage  = storage || global.caches;
  }

  /**
   * @async
   * @returns {Promise<CacheStorage>}
   */
  async cache() {
    return await this.storage.open(this.ns);
  }

  /**
   * Validates a request. Should convert a String into a Request object
   * @param {String|Request}
   * @returns {Request}
   */
  req(req) {
    return req instanceof Request ? req : new Request(req);
  }

  /**
   * Gets a response from the cache
   * @async
   * @param {String|Request}
   * @returns {Promise|Response}
   */
  async get(request) {
    let req = this.req(request);
    const cache = await this.cache();
    return await cache.match(req);
  }

  /**
   * Stores a response in the cache
   * @async
   * @param {String|Request}
   * @returns {Promise|Response}
   */
  async set(request, response) {
    let req = this.req(request);

    const cache = await this.cache();
    cache.put(request, response);
    return response instanceof Response ? response.clone() : response;
  }
}

export default Cache;