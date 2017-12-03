class Page {
  num   = 0;
  items = [];

  constructor(items, num) {
    this.items  = items || [];
    this.num    = num;
  }

  *[Symbol.iterator] () {
    for ( let item of this.items ) {
      yield item;
    }
  }
}

export default Page;