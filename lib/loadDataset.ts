import iterateTsvLines from './iterateTsvLines';
import schema, { type FieldTypes, type Schema } from './schema';

type Row = {
  [key in keyof Schema]: Schema[key]['nullable'] extends true
    ? FieldTypes[Schema[key]['type']] | undefined
    : FieldTypes[Schema[key]['type']];
};

export type DataGenerator = Generator<Row, void>;

const casters: { [key in keyof FieldTypes]: (value: string) => FieldTypes[key] | undefined } = {
  string: (value) => value,
  int: (value) => Number.parseInt(value, 10),
  float: (value) => Number.parseFloat(value),
  array: (value) => value.split(','),
  date: (value) => new Date(`${value}T00:00:00Z`),
};

function parseField(field: keyof Schema, value: string): Row[typeof field] {
  const { type, nullable } = schema[field];
  if (value === '') {
    if (!nullable) {
      throw new Error(`Field "${String(field)}" cannot be empty`);
    }
    return (type === 'array' ? [] : undefined) as Row[typeof field];
  }
  return casters[type](value);
}

export default function* loadDataset(pathname: string): DataGenerator {
  for (const row of iterateTsvLines(pathname, 'utf8')) {
    yield Object.fromEntries(
      Object.keys(schema).map((field, index) => [field, parseField(field as keyof Schema, row[index] ?? '')]),
    ) as Row;
  }
}
