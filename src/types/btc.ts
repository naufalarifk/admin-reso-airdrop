export enum BitcoinScriptType {
  P2PKH = "P2PKH",
  P2SH_P2WPKH = "P2SH-P2WPKH",
  P2WPKH = "P2WPKH",
}

export type WalletNetwork = "livenet" | "testnet";

export type Balance = { confirmed: number; unconfirmed: number; total: number };
export type RealBalance = {
  confirm_amount: string;
  pending_amount: string;
  amount: string;
  confirm_btc_amount: string;
  pending_btc_amount: string;
  btc_amount: string;
  confirm_inscription_amount: string;
  pending_inscription_amount: string;
  inscription_amount: string;
  usd_value: string;
};
