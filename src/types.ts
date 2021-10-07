import { GetTxHistoryQuery } from "./API";
import { getTxHistory } from "./graphql/queries";

export enum TransactionType {
  Seller,
  Buyer,
}

type Primitive =
  | string
  | Function
  | number
  | boolean
  | symbol
  | undefined
  | null;

type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
        : never;
    };

export type TxHistory = Exclude<GetTxHistoryQuery["getTxHistory"], null>;
