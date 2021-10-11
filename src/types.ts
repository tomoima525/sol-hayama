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
// https://dev.to/applification/how-to-use-amplify-appsync-graphql-types-in-a-react-typescript-app-of
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

/*
    Taken from: https://github.com/metaplex-foundation/metaplex/blob/master/js/packages/common/src/actions/metadata.ts
*/
export type StringPublicKey = string;

export const METADATA_PREFIX = "metadata";

export enum MetadataKey {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}
