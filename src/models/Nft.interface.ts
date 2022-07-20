import { Transaction } from "./Transaction.model";

export interface NftInterface {
    transaction?: Transaction,
    metaDataURL?: string,
    image?: string
  }

  