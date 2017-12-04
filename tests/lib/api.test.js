import 'isomorphic-fetch';
import Api from 'lib/api';
import Cache from 'lib/cache';
import subject from '../mocks/api';
import fetchMock from 'fetch-mock';
import { storyListMock, storyMock } from '../mocks/fixtures';
import {
  STORIES_SHOW,
  STORIES_BEST,
  STORIES_TOP,
  STORIES_NEW,
  STORIES_ASK,
  BASE_API_URL
} from 'app-constants';


// Dummy cache for our tests
class FooCache {}

describe('api wrapper', () => {
  beforeEach(() => fetchMock.restore());

  it('is an instance of Api', () => expect(subject).toBeInstanceOf(Api));
  it('has a cache instance attached to it', () => expect(subject.cache).toBeInstanceOf(Cache));

  it('can be instantiated with a different cache type', () => {
    let fooApi = new Api(new FooCache());
    expect(fooApi.cache).toBeInstanceOf(FooCache);
  });

  it('returns the full url for a URI', () => expect(subject.getUrl('/foo')).toEqual(`${BASE_API_URL}/foo.json`));

  it('performs a request', () => {
    let url = subject.getUrl('/foo');
    fetchMock.getOnce(url, JSON.stringify({ status: 123 }));

    subject.request(url).then( async (response) => {
      let content = await response.json();
      expect(content).toEqual({ status: 123 });
    });
  });

  it('fetches the stories', async () => {
    let url = subject.getUrl('/topstories');
    fetchMock.getOnce(url, storyListMock);

    let stories = await subject.fetchStories();
    expect(stories).toEqual(storyListMock.sort().reverse());
  });

  it('fetches a single story', async () => {
    let url = subject.getUrl(`/item/${storyMock.id}`);
    fetchMock.getOnce(url, storyMock);

    let story = await subject.fetchStory(storyMock.id);
    expect(story).toEqual(storyMock);
  });

  it('returns null on error when fetching stories', async () => {
    let url = subject.getUrl('/topstories');
    fetchMock.getOnce(url, JSON.stringify(null));

    let stories = await subject.fetchStories();
    expect(stories).toEqual(null);
  });

  it('returns null on error when fetching a single story', async () => {
    let url = subject.getUrl(`/item/5`);
    fetchMock.getOnce(url, JSON.stringify(null));

    let story = await subject.fetchStory(5);
    expect(story).toEqual(null);
  });

  it('contains a valid url mapping', () => {
    expect(Api.uriMapping).toBeInstanceOf(Object);
    expect(Api.uriMapping[STORIES_SHOW]).toEqual(`/showstories`);
    expect(Api.uriMapping[STORIES_BEST]).toEqual(`/beststories`);
    expect(Api.uriMapping[STORIES_TOP]).toEqual(`/topstories`);
    expect(Api.uriMapping[STORIES_NEW]).toEqual(`/newstories`);
    expect(Api.uriMapping[STORIES_ASK]).toEqual(`/askstories`);
  });
});