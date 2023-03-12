import getImportPath from './lib/getImportPath';
import loadDataset, { type DataGenerator } from './lib/loadDataset';

export default function cities15000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities15000.txt'));
}
