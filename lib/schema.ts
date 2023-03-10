export interface FieldTypes {
  string: string;
  int: number;
  float: number;
  array: string[];
  date: Date;
}

export type Schema = typeof schema;

const schema = {
  geonameId: { type: 'int', nullable: false },
  name: { type: 'string', nullable: false },
  asciiName: { type: 'string', nullable: true },
  alternateNames: { type: 'array', nullable: true },
  latitude: { type: 'float', nullable: false },
  longitude: { type: 'float', nullable: false },
  featureClass: { type: 'string', nullable: false },
  featureCode: { type: 'string', nullable: false },
  countryCode: { type: 'string', nullable: false },
  cc2: { type: 'string', nullable: true },
  admin1Code: { type: 'string', nullable: true },
  admin2Code: { type: 'string', nullable: true },
  admin3Code: { type: 'string', nullable: true },
  admin4Code: { type: 'string', nullable: true },
  population: { type: 'int', nullable: false },
  elevation: { type: 'int', nullable: true },
  dem: { type: 'int', nullable: false },
  timezone: { type: 'string', nullable: false },
  modificationDate: { type: 'date', nullable: false },
} as const satisfies Record<string, { type: keyof FieldTypes; nullable: boolean }>;

export default schema;
