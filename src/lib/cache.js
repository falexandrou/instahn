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
   * Gets a response from the cache
   * @async
   * @param {String|Request}
   * @returns {Promise|Response}
   */
  async get(request) {
    const cache = await this.cache();
    return await cache.match(request);
  }

  /**
   * Stores a response in the cache
   * @async
   * @param {String|Request}
   * @returns {Promise|Response}
   */
  async set(request, response) {
    const cache = await this.cache();
    cache.put(request, response);
    return response instanceof Response ? response.clone() : response;
  }
}

export default Cache;