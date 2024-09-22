export type IURL = {
  short_code: string;
  destination_url: string;
}

export type IInsertURIPayload = Omit<IURL, 'short_code'>;

export type IUpdateURIPayload = {
  destination_url?: string;
}
