import {
  STORIES_SHOW,
  STORIES_BEST,
  STORIES_TOP,
  STORIES_NEW,
  STORIES_ASK,
  BASE_API_URL,
} from 'app-constants';

import * as cnst from 'app-constants';
import Cache from './cache';

const METHOD_GET = 'GET';

/**
 * Handles all requests with the external HackerNews API
 *
 * All requests are cached
 */
class Api {
  /**
   * @var {Object}
   */
  static uriMapping = {
    [STORIES_SHOW]: `/showstories`,
    [STORIES_BEST]: `/beststories`,
    [STORIES_TOP]: `/topstories`,
    [STORIES_NEW]: `/newstories`,
    [STORIES_ASK]: `/askstories`,
  };

  constructor() {
    this.cache = new Cache();
  }

  getUrl(uri) {
    return `${BASE_API_URL}${uri}.json`;
  }

  /**
   * @async
   * @param {String} url
   * @param {Object} data
   * @param {String} method
   * @return {Promise<Response>}
   */
  async request (url, data={}, method=METHOD_GET) {
    return await fetch(url).then(response => this.cache.set(url, response)).catch(err => this.cache.get(url));
  }

  /**
   * @async
   * @param {String} type of stories to fetch
   * @return {Promise<Response>}
   */
  async fetchStories (type = STORIES_TOP) {
    const uri       = Api.uriMapping[type] || Api.uriMapping[STORIES_TOP];
    const url       = this.getUrl(uri);
    const response  = await this.request(url);

    if (!response)
      return null;

    const list = await response.json();
    return list.sort().reverse();
  }

  /**
   * @async
   * @param {Number} id of a single story to fetch
   * @return {Promise<Response>}
   */
  async fetchStory(id) {
    const url     = this.getUrl(`/item/${id}`);
    let response  = await this.cache.get(url);

    if (!response)
      response = await this.request(url);

    if (!response)
      return null;

    const story = await response.json();

    if (story.type !== 'story')
      return null;

    return story;
  }
}

export default Api;