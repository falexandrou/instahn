import Page from './page';

/**
 * Paginator class
 *
 * Each page is a Page object
 */
class Paginator {
  /** @var {Number} the total items in the dataset */
  totalItems  = 0;

  /** @var {Number} the current page we're viewing */
  currentPage = 1;

  /** @var {Number} the index of the element that the page starts on */
  startItem   = 0;

  /** @var {Number} the index of the element that the page ends on */
  endItem     = 0;

  /** @var {Array} the entire dataset */
  results     = [];

  /** @var {Object} the cache object */
  pageCache   = {};

  /**
   * @param {Array} the dataset
   * @param {Number} the items per page
   */
  constructor(perPage = 10, dataset = []) {
    this.perPage = parseInt(perPage, 10) || 10;
    this.setItems(dataset);
  }

  /**
   * @param {Array} the dataset
   */
  setItems(dataset) {
    this.results      = dataset || [];
    this.totalItems   = this.results.length;
    this.setCurrentPage(1);
    this.pageCache    = {};
  }

  /**
   * @param Number page
   */
  setCurrentPage(page) {
    this.currentPage = (parseInt(page, 10) || 1) - 1;
    this.startItem   = this.currentPage * this.perPage;
    this.endItem     = this.startItem + this.perPage;
  }

  /**
   * @param {Number} the page to get from the array
   * @returns {Array} the items for the page
   */
  page(page) {
    this.setCurrentPage(page);

    if ( ! this.hasNextPage() )
      return null;

    if ( ! this.pageCache[this.currentPage] ) {
      this.pageCache[this.currentPage] = new Page(this.results.slice(this.startItem, this.endItem), this.currentPage);
    }

    return this.pageCache[this.currentPage];
  }

  /**
   * @returns {Number}
   */
  getTotalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  /**
   * @returns {Array}
   */
  next() {
    return this.page(this.currentPage + 1);
  }

  /**
   * @returns {Boolean} whether there is a next page available
   */
  hasNextPage() {
    return this.startItem <= this.totalItems;
  }
}

export default Paginator;