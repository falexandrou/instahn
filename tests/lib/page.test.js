import Page from 'lib/page';

describe('page object', () => {
  let pageNum = 1,
      dataset = [1,2,3,4],
      subject = new Page(dataset, pageNum);

  it('is an instance of Page', () => expect(subject).toBeInstanceOf(Page));
  it('has the correct page num set', () => expect(subject.num).toEqual(pageNum));
  it('has the dataset applied', () => expect(subject.items).toEqual(dataset));
  it('is iterable with for..of', () => {
    let output = [];

    for (let i of subject) {
      output.push(i);
    }

    expect(output).toEqual(dataset);
  });
});
