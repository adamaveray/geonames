import getImportPath from './lib/getImportPath';
import loadDataset, { type DataGenerator } from './lib/loadDataset';

export default function cities5000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities5000.txt'));
}
