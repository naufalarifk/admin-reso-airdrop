export type Market = {
  id: string;
  symbol: string;
  name: string;
  type: string;
  base_unit?: string;
  quote_unit?: string;
  min_price: string | number;
  max_price: string | number;
  min_amount: string | number;
  amount_precision: number;
  price_precision: number;
  total_precision: number;
  state: string;
};

export type Currencies = {
  id: string;
  name: string;
  description: null;
  homepage: null;
  parent_id: null;
  inscription_id: null;
  details: null;
  supplies: null;
  price: string;
  explorer_transaction: string;
  explorer_address: string;
  type: string;
  deposit_enabled: boolean;
  withdrawal_enabled: boolean;
  deposit_fee: string;
  min_deposit_amount: string;
  withdraw_fee: string;
  min_withdraw_amount: string;
  base_factor: number;
  precision: number;
  position: number;
  min_confirmations: number;
};