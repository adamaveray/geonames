import getImportPath from './lib/getImportPath';
import loadDataset, { type DataGenerator } from './lib/loadDataset';

export default function cities1000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities1000.txt'));
}
