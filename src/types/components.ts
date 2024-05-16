export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: string[];
  lowVolume: boolean;
  coinrankingUrl: string;
  "24hVolume": string;
  btcPrice: string;
  contractAddresses: string[];
}

export interface Market {
    symbol:           string;
    name:             string;
    type:             string;
    base_unit:        string;
    quote_unit:       string;
    min_price:        number;
    max_price:        number;
    min_amount:       number;
    amount_precision: number;
    price_precision:  number;
    total_precision:  number;
    state:            string;
}


export interface Currency {
    id:                   string;
    name:                 string;
    description:          string;
    homepage:             string;
    parent_id:            string;
    price:                string;
    explorer_transaction: string;
    explorer_address:     string;
    type:                 string;
    deposit_enabled:      string;
    withdrawal_enabled:   string;
    deposit_fee:          string;
    min_deposit_amount:   string;
    withdraw_fee:         string;
    min_withdraw_amount:  string;
    base_factor:          string;
    precision:            string;
    position:             string;
    icon_url:             string;
    min_confirmations:    string;
}


export interface MarketTrade {
    id:           string;
    price:        number;
    amount:       number;
    state:        string;
    txid:         string;
    total:        number;
    fee_currency: number;
    fee:          number;
    fee_amount:   number;
    market:       string;
    market_type:  string;
    created_at:   string;
    taker_type:   string;
    side:         string;
    order_id:     number;
}

export interface OrderBook {
    asks: Ask[];
    bids: Ask[];
}

interface Ask {
    id:               number;
    uuid:             string;
    txid:             string;
    errors:           string;
    refund_hash:      string;
    side:             string;
    ord_type:         string;
    price:            number;
    avg_price:        number;
    state:            string;
    market:           string;
    market_type:      string;
    created_at:       string;
    updated_at:       string;
    origin_volume:    number;
    remaining_volume: number;
    executed_volume:  number;
    maker_fee:        number;
    taker_fee:        number;
    trades_count:     number;
    trades:           Trade[];
}

interface Trade {
    id:           string;
    price:        number;
    amount:       number;
    state:        string;
    txid:         string;
    total:        number;
    fee_currency: number;
    fee:          number;
    fee_amount:   number;
    market:       string;
    market_type:  string;
    created_at:   string;
    taker_type:   string;
    side:         string;
    order_id:     number;
}
