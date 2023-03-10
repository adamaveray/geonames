import getImportPath from '../lib/getImportPath';
import iterateTsvLines from '../lib/iterateTsvLines';
import loadDataset from '../lib/loadDataset';

function getLocalTsvPath(basename: string): string {
  return `${__dirname}/__resources__/${basename}`;
}

function getDatasetPath(key: string): string {
  return `${__dirname}/../sources/${key}.txt`;
}

describe('lib', () => {
  it('generates paths from imports', () => {
    const result = getImportPath('file:/path/to/script.js', 'resource.txt');
    expect(result).toEqual('/path/to/resource.txt');
  });

  describe('TSV iterator', () => {
    it('handles empty files', () => {
      expect([...iterateTsvLines(getLocalTsvPath('empty.tsv'), 'utf8')]).toEqual([]);
    });

    it('handles no trailing newline', () => {
      expect([...iterateTsvLines(getLocalTsvPath('no-trailing-newline.tsv'), 'utf8')]).toEqual([
        ['one', 'two', 'three'],
      ]);
    });

    it('preserves unicode', () => {
      expect([...iterateTsvLines(getLocalTsvPath('unicode.tsv'), 'utf8')]).toEqual([
        ['one', 'two', 'three'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['δΈ', 'δΊ', 'δΈ'],
        ['βπ»', 'βπ½', 'π€πΏ'],
      ]);
    });
  });

  describe('dataset loader', () => {
    it('detects incorrectly-empty fields', () => {
      expect(() => {
        const generator = loadDataset(getLocalTsvPath('incorrectly-null.tsv'));
        generator.next();
      }).toThrowError('Field "name" cannot be empty');
    });

    it.each([['cities500'], ['cities1000'], ['cities5000'], ['cities15000']])('loads datasets', (key) => {
      const generator = loadDataset(getDatasetPath(key));
      const firstRecord = generator.next().value;
      expect(firstRecord).toMatchSnapshot(key);
    });
  });
});
