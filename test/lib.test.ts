import loadDataset from '../lib/loadDataset';
import getImportPath from '../lib/getImportPath';
import iterateTsvLines from '../lib/iterateTsvLines';

describe('lib', () => {
  const getLocalTsvPath = (basename: string) => `${__dirname}/__resources__/${basename}`;

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
        ['一', '二', '三'],
        ['☝🏻', '✌🏽', '🤟🏿'],
      ]);
    });
  });

  describe('dataset loader', () => {
    it('detects incorrectly-empty fields', () => {
      expect(() => {
        const generator = loadDataset(getLocalTsvPath('incorrectly-null.tsv'));
        generator.next();
      }).toThrowError('Field "asciiName" cannot be empty');
    });

    it.each([['cities500'], ['cities1000'], ['cities5000'], ['cities15000']])('loads datasets', (key) => {
      const generator = loadDataset(`${__dirname}/../sources/${key}.txt`);
      const firstRecord = generator.next().value;
      expect(firstRecord).toMatchSnapshot(key);
    });
  });
});
