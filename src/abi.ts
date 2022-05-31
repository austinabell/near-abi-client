// TODO these types are probably all wrong, just basing off existing schema

export interface ABI {
  schema_version: string;
  methods: ABIFunction[];
  types: ABIType[];
}

export interface ABIFunction {
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

export interface ABIType {
  id: number;
  schema: ABISchema;
}

export interface ABISchema {
  title: string;
  type: string | string[];
  // TODO this config seems to be for array type only, likely will need this to be own type
  items?: ABIItem[];
  maxItems?: number;
  minItems?: number;
}

export interface ABIItem {
  type: string;
  format: string;
  minimum?: number;
}
