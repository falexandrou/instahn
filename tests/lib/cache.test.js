import 'isomorphic-fetch';
import Cache from 'lib/cache';
import MockStorage from '../mocks/storage';

describe('cache wrapper', () => {
  let namespace = 'tests',
      subject     = new Cache(namespace, new MockStorage());

  it('is an instance of Cache', () => expect(subject).toBeInstanceOf(Cache));
  it('has storage attached to it', () => expect(subject.storage).toBeInstanceOf(MockStorage));
  it('has a namespace', () => expect(subject.ns).toEqual(namespace));
  it('opens and returns the cache connection', () => subject.cache().then(cache => expect(cache).toBeInstanceOf(MockStorage) ));

  it('is able to get stuff from cache without error', async () => {
    const value = await subject.get('bogus');
    expect(value).toEqual(null);
  });

  it('is able to store stuff in cache without error', async () => {
    const value = await subject.set('bogus', 5);
    expect(value).toEqual(5);
  })
});