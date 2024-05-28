export type InitialState = {
   isLoading: boolean;
   isSuccess: boolean;
   error?: string | unknown | string[];
};

export interface PublicPoolsData {
   'id': number;
   'name': string;
   'symbol': string;
   'category': string;
   'description': string;
   'slug': string;
   'logo': string;
   'subreddit': string;
   'notice': string;
   'tags': string[];
   'tag-names': string[];
   'tag-groups': string[];
   'urls': Urls;
   'platform': CoinClass;
   'date_added': Date;
   'twitter_username': string;
   'is_hidden': number;
   'date_launched': null;
   'contract_address': ContractAddress[];
   'self_reported_circulating_supply': number;
   'self_reported_tags': null;
   'self_reported_market_cap': number;
   'infinite_supply': boolean;
}

export interface ContractAddress {
   contract_address: string;
   platform: ContractAddressPlatform;
}

export interface ContractAddressPlatform {
   name: string;
   coin: CoinClass;
}

export interface CoinClass {
   id: string;
   name: string;
   symbol: string;
   slug: string;
   token_address?: string;
}

export interface Urls {
   website: string[];
   twitter: string[];
   message_board: string[];
   chat: string[];
   facebook: string[];
   explorer: string[];
   reddit: string[];
   technical_doc: string[];
   source_code: string[];
   announcement: string[];
}

export type GetPublicPoolState = InitialState & {
   item: PublicPoolsData | null;
};
