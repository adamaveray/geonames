# cities-5000-structured

[![View code coverage on codecov][codecov-badge]][codecov]

[codecov]: https://codecov.io/gh/adamaveray/geonames
[codecov-badge]: https://codecov.io/gh/adamaveray/geonames/branch/main/graph/badge.svg

A low-memory, structured loader for the GeoNames.org cities-5000 dataset.

The package provides a generator that outputs each record in the data set, structured & parsed – ints & floats are converted to `number`s, lists are converted to `string[]` arrays, and dates are converted to `Date` objects. See [the schema](./lib/schema.ts) for details.

The data file is bundled with the package so can be used offline, and the package uses no dependencies.

## Usage

The default export function provides a [generator][] which can be iterated to access each record without storing the entire dataset in memory:

```js
import cities5000 from 'cities-5000-structured';

for (const record of cities5000()) {
  // `record` is an object containing that record's details
  console.log(`Record #${record.geonameId}: "${record.name}"`, record);
}
```

[generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions

---

Module under [MIT License](./LICENSE), geo data via [GeoNames.org][geonames], [CC BY 4.0][cc].

[geonames]: http://download.geonames.org/export/dump/
[cc]: https://creativecommons.org/licenses/by/4.0/
