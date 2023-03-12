import * as fs from 'node:fs';

const LF = '\n'.codePointAt(0);
const TAB = '\t'.codePointAt(0);
export default function* iterateTsvLines(pathname: string, encoding: BufferEncoding): Generator<string[], void> {
  const fd = fs.openSync(pathname, 'r');

  const byteBuffer = Buffer.alloc(1);
  let fragmentBytes: number[] = [];
  let lineColumns: string[] = [];

  const step = (): number => fs.readSync(fd, byteBuffer, 0, 1, null);

  const endColumn = (): void => {
    lineColumns.push(Buffer.from(fragmentBytes).toString(encoding));
    fragmentBytes = [];
  };

  while (true) {
    // Read next byte
    if (step() === 0) {
      // End of file
      break;
    }

    const [byte] = byteBuffer;
    if (byte === TAB) {
      // End of column
      endColumn();
      continue;
    }

    if (byte === LF) {
      // End of line
      endColumn();
      if (lineColumns.length > 0) {
        yield lineColumns;
        lineColumns = []; // eslint-disable-line require-atomic-updates -- Intentional
      }

      continue;
    }

    // Regular byte
    if (byte != null) {
      fragmentBytes.push(byte);
    }
  }

  // Output incomplete line
  if (fragmentBytes.length > 0) {
    endColumn();
  }
  if (lineColumns.length > 0) {
    yield lineColumns;
  }
}
