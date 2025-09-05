export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }
export type CamelToKebabCase<S extends string>
  = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` : S

export type KebabToCamelCase<S extends string>
  = S extends `${infer T}-${infer U}` ? `${T}${Capitalize<KebabToCamelCase<U>>}` : S
