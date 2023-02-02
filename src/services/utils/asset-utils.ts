export const DATA_TYPE_INT = "int";
export const DATA_TYPE_FLOAT = "float";
export const DATA_TYPE_NUMERIC = "numeric";
export const DATA_TYPE_BOOL = "bool";
export type DATA_TYPE =
    | typeof DATA_TYPE_INT
    | typeof DATA_TYPE_FLOAT
    | typeof DATA_TYPE_NUMERIC
    | typeof DATA_TYPE_BOOL;

export const FIELD_TYPE_STRING = "string";
export const FIELD_TYPE_NUMBER = "number";
export const FIELD_TYPE_BOOLEAN = "boolean";
export type FIELD_TYPE = typeof FIELD_TYPE_STRING | typeof FIELD_TYPE_NUMBER | typeof FIELD_TYPE_BOOLEAN;

export const getFieldTypeByDataType = (dataType: string): FIELD_TYPE => {
    if (
        dataType.includes(DATA_TYPE_INT) ||
        dataType.includes(DATA_TYPE_FLOAT) ||
        dataType.includes(DATA_TYPE_NUMERIC)
    ) {
        return FIELD_TYPE_NUMBER;
    }
    if (dataType.includes(DATA_TYPE_BOOL)) {
        return FIELD_TYPE_BOOLEAN;
    }
    return FIELD_TYPE_STRING;
};

export const isFieldDataTypeNumeric = (dataType: string): boolean => {
    return (
        dataType.includes(DATA_TYPE_INT) || dataType.includes(DATA_TYPE_FLOAT) || dataType.includes(DATA_TYPE_NUMERIC)
    );
};
