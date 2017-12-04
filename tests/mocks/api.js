import Api from 'lib/api';
import Cache from 'lib/cache';
import MockStorage from '../mocks/storage';

const cache = new Cache('tests', new MockStorage());
const api = new Api(cache);

export default api;