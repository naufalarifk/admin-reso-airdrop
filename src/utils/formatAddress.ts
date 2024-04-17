export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 4)}…${address.slice(38, 42)}`;
}
