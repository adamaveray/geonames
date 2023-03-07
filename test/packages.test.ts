import cities500 from '../packages/cities-500-structured';
import cities1000 from '../packages/cities-1000-structured';
import cities5000 from '../packages/cities-5000-structured';
import cities15000 from '../packages/cities-15000-structured';
import schema from '../lib/schema';
import type { FieldTypes } from '../lib/schema';
import { DataGenerator } from '../lib/loadDataset';

const getFieldsOfType = (assertedType: keyof FieldTypes): (keyof typeof schema)[] =>
  Object.entries(schema)
    .filter(([, { type }]) => type === assertedType)
    .map(([field]) => field as keyof typeof schema);

const stringFields = getFieldsOfType('string');
const intFields = getFieldsOfType('int');
const floatFields = getFieldsOfType('float');
const arrayFields = getFieldsOfType('array');
const dateFields = getFieldsOfType('date');

const expectType = (field: keyof typeof schema, value: any, isValid: boolean): void => {
  const { nullable } = schema[field];
  expect(isValid || (nullable && value == null)).toBeTruthy();
};

describe('packages', () => {
  const schemaKeys = Object.keys(schema);

  it.each<[key: string, builder: () => DataGenerator]>([
    ['cities-15000', cities15000],
    ['cities-5000', cities5000],
    ['cities-1000', cities1000],
    ['cities-500', cities500],
  ])('provides correct output', (key, builder) => {
    const firstRecord = builder().next().value;
    expect(firstRecord).toMatchSnapshot(key);
  });

  it.each<[key: string, builder: () => DataGenerator]>([
    ['cities-15000', cities15000],
    ['cities-5000', cities5000],
    ['cities-1000', cities1000],
    ['cities-500', cities500],
  ])('load rows correctly', (_, builder) => {
    let i = 0;
    const limit = 50; // Should be representative enough
    for (const record of builder()) {
      expect(Object.keys(record)).toEqual(schemaKeys);

      for (const field of stringFields) {
        expectType(field, record[field], typeof record[field] === 'string');
      }
      for (const field of intFields) {
        expectType(field, record[field], typeof record[field] === 'number');
      }
      for (const field of floatFields) {
        expectType(field, record[field], typeof record[field] === 'number');
      }
      for (const field of arrayFields) {
        expectType(field, record[field], Array.isArray(record[field]));
      }
      for (const field of dateFields) {
        expectType(field, record[field], record[field] instanceof Date);
      }

      i++;
      if (i >= limit) {
        break;
      }
    }
  });
});
