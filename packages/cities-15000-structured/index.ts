import loadDataset from './lib/loadDataset';
import type { DataGenerator } from './lib/loadDataset';
import getImportPath from './lib/getImportPath';

export default function cities15000(): DataGenerator {
  return loadDataset(getImportPath(import.meta.url, 'cities15000.txt'));
}
