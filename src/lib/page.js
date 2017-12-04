/**
 * Represents each page of the paginator
 */
class Page {
  num   = 0;
  items = [];

  /**
   * Constructs the page
   * @param {Array} the items on the page
   * @param {Number} the number of the page
   */
  constructor(items, num) {
    this.items  = items || [];
    this.num    = num;
  }

  /**
   * Iterates through the items of on the page
   *
   * @generator
   */
  *[Symbol.iterator] () {
    for ( let item of this.items ) {
      yield item;
    }
  }
}

export default Page;