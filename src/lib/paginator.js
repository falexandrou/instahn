import Page from './page';

class Paginator {
  totalItems  = 0;
  currentPage = 1;
  startItem   = 0;
  endItem     = 0;
  results     = [];
  pageCache   = {};

  /**
   * @param Array the dataset
   * @param Number the items per page
   */
  constructor(perPage = 10, dataset = []) {
    this.perPage = parseInt(perPage, 10) || 10;
    this.setItems(dataset);
  }

  /**
   * @param Array the dataset
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
   * @param Number the page to get from the array
   * @returns Array the items for the page
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
   * @returns Number
   */
  getTotalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  /**
   * @returns Array
   */
  next() {
    return this.page(this.currentPage + 1);
  }

  /**
   * @returns Boolean whether there is a next page available
   */
  hasNextPage() {
    return this.startItem <= this.totalItems;
  }
}

export default Paginator;