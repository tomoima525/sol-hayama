/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTxHistoryInput = {
  id?: string | null,
  buyerAddress: string,
  sellerAddress: string,
  escrowAddress: string,
  nftAddress: string,
  offeredAmount: number,
  status: TransactionStatus,
  createdAt?: string | null,
};

export enum TransactionStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}


export type ModelTxHistoryConditionInput = {
  buyerAddress?: ModelStringInput | null,
  sellerAddress?: ModelStringInput | null,
  escrowAddress?: ModelStringInput | null,
  nftAddress?: ModelStringInput | null,
  offeredAmount?: ModelFloatInput | null,
  status?: ModelTransactionStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTxHistoryConditionInput | null > | null,
  or?: Array< ModelTxHistoryConditionInput | null > | null,
  not?: ModelTxHistoryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelTransactionStatusInput = {
  eq?: TransactionStatus | null,
  ne?: TransactionStatus | null,
};

export type TxHistory = {
  __typename: "TxHistory",
  id: string,
  buyerAddress: string,
  sellerAddress: string,
  escrowAddress: string,
  nftAddress: string,
  offeredAmount: number,
  status: TransactionStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTxHistoryInput = {
  id: string,
  buyerAddress?: string | null,
  sellerAddress?: string | null,
  escrowAddress?: string | null,
  nftAddress?: string | null,
  offeredAmount?: number | null,
  status?: TransactionStatus | null,
  createdAt?: string | null,
};

export type DeleteTxHistoryInput = {
  id: string,
};

export type ModelTxHistoryFilterInput = {
  id?: ModelIDInput | null,
  buyerAddress?: ModelStringInput | null,
  sellerAddress?: ModelStringInput | null,
  escrowAddress?: ModelStringInput | null,
  nftAddress?: ModelStringInput | null,
  offeredAmount?: ModelFloatInput | null,
  status?: ModelTransactionStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTxHistoryFilterInput | null > | null,
  or?: Array< ModelTxHistoryFilterInput | null > | null,
  not?: ModelTxHistoryFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTxHistoryConnection = {
  __typename: "ModelTxHistoryConnection",
  items?:  Array<TxHistory | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateTxHistoryMutationVariables = {
  input: CreateTxHistoryInput,
  condition?: ModelTxHistoryConditionInput | null,
};

export type CreateTxHistoryMutation = {
  createTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTxHistoryMutationVariables = {
  input: UpdateTxHistoryInput,
  condition?: ModelTxHistoryConditionInput | null,
};

export type UpdateTxHistoryMutation = {
  updateTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTxHistoryMutationVariables = {
  input: DeleteTxHistoryInput,
  condition?: ModelTxHistoryConditionInput | null,
};

export type DeleteTxHistoryMutation = {
  deleteTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTxHistoryQueryVariables = {
  id: string,
};

export type GetTxHistoryQuery = {
  getTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTxHistoriesQueryVariables = {
  filter?: ModelTxHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTxHistoriesQuery = {
  listTxHistories?:  {
    __typename: "ModelTxHistoryConnection",
    items?:  Array< {
      __typename: "TxHistory",
      id: string,
      buyerAddress: string,
      sellerAddress: string,
      escrowAddress: string,
      nftAddress: string,
      offeredAmount: number,
      status: TransactionStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTxHistoryByBuyerAddressQueryVariables = {
  buyerAddress?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTxHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetTxHistoryByBuyerAddressQuery = {
  getTxHistoryByBuyerAddress?:  {
    __typename: "ModelTxHistoryConnection",
    items?:  Array< {
      __typename: "TxHistory",
      id: string,
      buyerAddress: string,
      sellerAddress: string,
      escrowAddress: string,
      nftAddress: string,
      offeredAmount: number,
      status: TransactionStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTxHistoryBySellerAddressQueryVariables = {
  sellerAddress?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTxHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetTxHistoryBySellerAddressQuery = {
  getTxHistoryBySellerAddress?:  {
    __typename: "ModelTxHistoryConnection",
    items?:  Array< {
      __typename: "TxHistory",
      id: string,
      buyerAddress: string,
      sellerAddress: string,
      escrowAddress: string,
      nftAddress: string,
      offeredAmount: number,
      status: TransactionStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTxHistoryByNFTAddressQueryVariables = {
  nftAddress?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTxHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetTxHistoryByNFTAddressQuery = {
  getTxHistoryByNFTAddress?:  {
    __typename: "ModelTxHistoryConnection",
    items?:  Array< {
      __typename: "TxHistory",
      id: string,
      buyerAddress: string,
      sellerAddress: string,
      escrowAddress: string,
      nftAddress: string,
      offeredAmount: number,
      status: TransactionStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTxHistorySubscription = {
  onCreateTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTxHistorySubscription = {
  onUpdateTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTxHistorySubscription = {
  onDeleteTxHistory?:  {
    __typename: "TxHistory",
    id: string,
    buyerAddress: string,
    sellerAddress: string,
    escrowAddress: string,
    nftAddress: string,
    offeredAmount: number,
    status: TransactionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};
