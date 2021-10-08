/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTxHistory = /* GraphQL */ `
  query GetTxHistory($id: ID!) {
    getTxHistory(id: $id) {
      id
      buyerAddress
      sellerAddress
      escrowAddress
      nftAddress
      offeredAmount
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTxHistories = /* GraphQL */ `
  query ListTxHistories(
    $filter: ModelTxHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTxHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        buyerAddress
        sellerAddress
        escrowAddress
        nftAddress
        offeredAmount
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTxHistoryByBuyerAddress = /* GraphQL */ `
  query GetTxHistoryByBuyerAddress(
    $buyerAddress: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTxHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getTxHistoryByBuyerAddress(
      buyerAddress: $buyerAddress
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buyerAddress
        sellerAddress
        escrowAddress
        nftAddress
        offeredAmount
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTxHistoryBySellerAddress = /* GraphQL */ `
  query GetTxHistoryBySellerAddress(
    $sellerAddress: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTxHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getTxHistoryBySellerAddress(
      sellerAddress: $sellerAddress
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        buyerAddress
        sellerAddress
        escrowAddress
        nftAddress
        offeredAmount
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
