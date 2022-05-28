// TODO these types are probably all wrong, just basing off existing schema

export interface ABI {
  schema_version: string
  methods: Method[]
  types: Type[]
}

export interface Method {
  name: string
  is_view?: boolean
  is_init?: boolean
  // TODO: This likely won't be an array in the future. Probably a map with keys
  args?: number[]
  callbacks?: any[]
  callbacks_vec?: any[]
  result?: number
}

export interface Type {
  id: number
  schema: Schema
}

export interface Schema {
  title: string
  type: string
  // TODO this config seems to be for array, likely will need this to be own type
  items?: Item[]
  maxItems?: number
  minItems?: number
}

export interface Item {
  type: string
  format: string
  minimum?: number
}
