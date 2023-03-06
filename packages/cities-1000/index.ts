import loadDataset from './lib/loadDataset';
import type { DataGenerator } from './lib/loadDataset';
import getImportPath from './lib/getImportPath';

export default function cities1000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities1000.txt'));
}
