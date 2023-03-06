# GeoNames.org Cities Modules

[![View code coverage on codecov][codecov-badge]][codecov]

[codecov]: https://codecov.io/gh/adamaveray/geonames
[codecov-badge]: https://codecov.io/gh/adamaveray/geonames/branch/main/graph/badge.svg

A collection of (unofficial) NPM modules for efficiently accessing GeoNames.org cities data.

These packages provide generators that output each record in the data files, structured & parsed – ints & floats are converted to `number`s, lists are converted to `string[]` arrays, and dates are converted to `Date` objects.

The data files are bundled with each package so can be used offline, and each package has no dependencies.

## Developing

To update the data sets, run `npm run update-datasets`.

All submodules must be built before running tests, which is done automatically by calling `npm test` or can be performed manually with `npm run prepack-all`.

---

Modules under [MIT License](./LICENSE), all geo data via [GeoNames.org][geonames], [CC BY 4.0][cc].

[geonames]: http://download.geonames.org/export/dump/
[cc]: https://creativecommons.org/licenses/by/4.0/
