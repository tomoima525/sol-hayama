/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTxHistory = /* GraphQL */ `
  mutation CreateTxHistory(
    $input: CreateTxHistoryInput!
    $condition: ModelTxHistoryConditionInput
  ) {
    createTxHistory(input: $input, condition: $condition) {
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
export const updateTxHistory = /* GraphQL */ `
  mutation UpdateTxHistory(
    $input: UpdateTxHistoryInput!
    $condition: ModelTxHistoryConditionInput
  ) {
    updateTxHistory(input: $input, condition: $condition) {
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
export const deleteTxHistory = /* GraphQL */ `
  mutation DeleteTxHistory(
    $input: DeleteTxHistoryInput!
    $condition: ModelTxHistoryConditionInput
  ) {
    deleteTxHistory(input: $input, condition: $condition) {
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
