import {toCamelCase, toPascalCase} from "js-convert-case";

export function camelCaseTextTransformer(text: string): string {
  return toCamelCase(text);
}

export function pascalCaseTextTransformer(text: string): string {
  return toPascalCase(text);
}