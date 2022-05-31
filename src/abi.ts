// TODO these types are probably all wrong, just basing off existing schema

export interface ABI {
  schema_version: string;
  methods: Function[];
  types: Type[];
}

export interface Function {
  name: string;
  is_view?: boolean;
  is_init?: boolean;
  // TODO: This likely won't be an array in the future. Probably a map with keys
  args?: number[];
  callbacks?: any[];
  callbacks_vec?: any[];
  result: number | null;
  // TODO need to include args serialization protocol
  // TODO need to include result serialization protocol
}

export interface Type {
  id: number;
  schema: Schema;
}

export interface Schema {
  title: string;
  type: string | string[];
  // TODO this config seems to be for array type only, likely will need this to be own type
  items?: Item[];
  maxItems?: number;
  minItems?: number;
}

export interface Item {
  type: string;
  format: string;
  minimum?: number;
}
