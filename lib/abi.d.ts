export interface ABI {
    schema_version: string;
    methods: Function[];
    types: Type[];
}
export interface Function {
    name: string;
    is_view?: boolean;
    is_init?: boolean;
    args?: number[];
    callbacks?: any[];
    callbacks_vec?: any[];
    result: number | null;
}
export interface Type {
    id: number;
    schema: Schema;
}
export interface Schema {
    title: string;
    type: string | string[];
    items?: Item[];
    maxItems?: number;
    minItems?: number;
}
export interface Item {
    type: string;
    format: string;
    minimum?: number;
}
