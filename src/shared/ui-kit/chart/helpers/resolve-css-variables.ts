const CSS_VARIABLE = /var\((--[\w-]+)\)/g;

export function resolveCssVariables<T>(value: T, style: CSSStyleDeclaration): T {
  if (typeof value == "string")
    return value.replace(CSS_VARIABLE, (_, name: string) => style.getPropertyValue(name).trim()) as T;

  if (Array.isArray(value))
    return value.map((item) => resolveCssVariables(item, style)) as T;

  if (value != null && typeof value == "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveCssVariables(item, style)])
    ) as T;
  }

  return value;
}
