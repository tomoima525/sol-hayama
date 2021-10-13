# Sol Hayama 🏖

[sol-hayama](https://www.sol-hayama.com) is the decentralized NFT trading platform built on top of Solana block-chain.

- Search NFTs from a user's account(supports metaplex data structure)
- A programmatically generated escrow agent will manage the transaction and all transactions can be seen in Solana explorer

This is the frontend portion of the service. A smart contract(aka Program) that coordinates transactions is in [escrow-program repo](https://github.com/tomoima525/escrow-program)

## Setup

```
yarn install
```

## Prerequisite

**Associated Token Account**

- You need Associated Token Account for [Native Mint](https://spl.solana.com/token#wrapping-sol) to receive the fee

```
// Make sure the owner has enough funding
$ spl-token create-account  So11111111111111111111111111111111111111112
```

**ProgramId for Escrow**

- You also need to deploy the program on localhost's test-validator. See the instruction in the escrow-program-repo
- After you deployed the contract, you should update the programId defined in `escrowProgramPublicKey` which is located at [constants.ts](https://github.com/tomoima525/sol-hayama/blob/main/src/constants.ts)

```
export const escrowProgramPublicKey = new PublicKey(
  "7V3CWKtaLtYqx82Rm96ph8DutCP2LQpfkz8URpH3XAxT" // this should be your program Id
);
```

**Amplify**

- This app caches transaction data on DynamoDB for performance purposes. We use GraphQL(AppSync) from Amplify.

```
// use npm v14
$ npm install -g @aws-amplify/cli
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: dev
```

## Running locally

- Create `.env.local` (env file for nextjs) file and add below

```
NEXT_PUBLIC_LOCAL_ADDRESS=http://localhost:8899 // if you don't add this then the app will look into NEXT_PUBLIC_BUILD_ENV
NEXT_PUBLIC_FEE_PERCENTAGE=0.04
NEXT_PUBLIC_FEE_RECEIVER=Ae1c6oswsczoM7YtUdFLUviXMSvKgZTsZ3sJaPTyuVah // Change this to your associated account token that receives fee.
NEXT_PUBLIC_BUILD_ENV=dev
```

- Then start the app

```bash
npm run dev
# or
yarn dev
```

# License

```
Copyright 2021 Tomoaki Imai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
