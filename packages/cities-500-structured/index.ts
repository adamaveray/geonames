import getImportPath from './lib/getImportPath';
import loadDataset, { type DataGenerator } from './lib/loadDataset';

export default function cities500(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities500.txt'));
}
