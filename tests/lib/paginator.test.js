import Paginator from 'lib/paginator';
import Page from 'lib/page';

describe('paginator object', () => {
  let dataset = [ 1,2,3,4,5,6,7,8,9,10,11,12 ],
      perPage = 3,
      subject = new Paginator(perPage, dataset);

  it('is an instance of Paginator', () => expect(subject).toBeInstanceOf(Paginator));

  it('has the perPage attribute set', () => expect(subject.perPage).toEqual(perPage));

  it('returns the correct total pages', () => expect(subject.getTotalPages()).toEqual(4));

  it('has the items and correct pointers set', () => {
    expect(subject.results).toEqual(dataset);
    expect(subject.currentPage).toEqual(0);
    expect(subject.totalItems).toEqual(dataset.length);
    expect(subject.pageCache).toEqual({});
  });

  it('is setting the internal pointers when setting the currentPage', () => {
    // examine the initially set values
    expect(subject.currentPage).toEqual(0);
    expect(subject.startItem).toEqual(0);
    expect(subject.endItem).toEqual(perPage);

    // set the current page to 2
    subject.setCurrentPage(2);
    expect(subject.currentPage).toEqual(1);
    expect(subject.startItem).toEqual(perPage);
    expect(subject.endItem).toEqual(perPage * 2);

    // reset back to 1 for the next tests
    subject.setCurrentPage(1);
  });

  it('returns the current page as a page object', () => {
    let page = subject.page(1);
    expect(page).toBeInstanceOf(Page);
    expect(page.num).toEqual(1);
    expect(page.items).toEqual(dataset.slice(0, perPage));
  });

  it('iterates the pages', () => {
    // we're on page 1
    expect(subject.currentPage).toEqual(0);
    expect(subject.hasNextPage()).toEqual(true);

    // go to page 2
    let secondPage = subject.page(2);
    expect(secondPage).toBeInstanceOf(Page);
    expect(subject.hasNextPage()).toEqual(true);

    // go to page 4
    let fourthPage = subject.page(4);
    expect(fourthPage).toBeInstanceOf(Page);
    expect(subject.hasNextPage()).toEqual(false);
  });

  it('can set the items and reset its internal pointers', () => {
    let newDataset = [1,2,3,4];
    subject.setItems(newDataset);
    expect(subject.results).toEqual(newDataset);
    expect(subject.totalItems).toEqual(newDataset.length);
    expect(subject.getCurrentPage()).toEqual(1);
    expect(subject.getTotalPages()).toEqual(2);
    expect(subject.pageCache).toEqual({});
  });
});
