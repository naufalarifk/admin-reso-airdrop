export function shortenString(
  input: string,
  prefixLength: number,
  suffixLength: number
): string {
  if (input.length <= prefixLength + suffixLength) {
    return input;
  }
  const prefix = input.substring(0, prefixLength);
  const suffix = input.substring(input.length - suffixLength);
  return `${prefix}...${suffix}`;
}
