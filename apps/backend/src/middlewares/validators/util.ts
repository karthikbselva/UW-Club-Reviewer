type Type =
  | "string"
  | "boolean"
  | "integer"
  | "decimal"
  | "ClubCategory"
  | "SemesterEnum"
  | "DayEnum";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const validatePrimitive = (value: any, type: Type): boolean => {
    if (value === undefined || value === null) return false;
    
    switch (type) {
        case "string": {
            return typeof value === "string";
        }
        case "boolean": {
            return typeof value === "boolean";
        }
        case "integer": {
            return typeof value === "number" && Number.isInteger(value);
        }
        case "decimal": {
            return typeof value === "number" && !Number.isNaN(value);
        }
        default: {
            return false;
        }
    }
};

export const validateEnum = (value: any, enumType: any): boolean => {
    return Object.values(enumType).includes(value);
};
  
export const validateArray = (value: any, type: Type): boolean => {
    return (
      value !== undefined &&
      value !== null &&
      typeof value === "object" &&
      Array.isArray(value) &&
      value.every((item) => validatePrimitive(item, type))
    );
};
  
export const validateEnumArray = (value: any, enumType: any): boolean => {
    return (
      value !== undefined &&
      value !== null &&
      typeof value === "object" &&
      Array.isArray(value) &&
      value.every((item, index) => value.indexOf(item) === index) &&
      value.every((item) => validateEnum(item, enumType))
    );
};

export const getApiValidationError = (field: any, type: Type, isArray = false): string => {
    return `The ${field} is not of type ${type}${ isArray ? " Array" : ""}`;
};