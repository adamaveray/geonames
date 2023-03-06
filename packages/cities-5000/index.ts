import loadDataset from './lib/loadDataset';
import type { DataGenerator } from './lib/loadDataset';
import getImportPath from './lib/getImportPath';

export default function cities5000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities5000.txt'));
}
