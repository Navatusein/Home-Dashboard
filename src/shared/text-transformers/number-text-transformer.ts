export function roundTextTransformer(text: string): string {
  return Math.round(Number(text)).toString();
}

export function numberFixedTextTransformerProvider(fractionDigits: number = 1) {
  return (text: string): string => {
    return Number(text).toFixed(fractionDigits).toString();
  }
}