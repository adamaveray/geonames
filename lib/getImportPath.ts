import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default function getImportPath(importUrl: string, basename: string): string {
  return `${dirname(fileURLToPath(importUrl))}/${basename}`;
}
