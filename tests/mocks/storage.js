/**
 * Mock the CacheStorage object
 */
class MockStorage {

  open(namespace) {
    return new Promise((resolve, reject) => resolve(this));
  }

  setItem(key, value) {
    return new Promise((resolve, reject) => resolve(value));
  }

  getItem (key){
    return new Promise((resolve) => resolve(null) );
  }

  match (key) {
    return this.getItem(key);
  }

  removeItem (key) {
    return new Promise((resolve, reject) => resolve(key) );
  }

  clear (key) {
    return new Promise((resolve, reject) => resolve({}));
  }

  put (key) {
    return this.setItem(key);
  }

  getAllKeys (key) {
    return new Promise((resolve, reject) => resolve([]));
  }
}

module.exports = MockStorage;