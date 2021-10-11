// based from https://github.com/solana-labs/solana/blob/master/explorer/src/providers/accounts/utils/metadataHelpers.ts

import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import { deserializeUnchecked, BinaryReader, BinaryWriter } from "borsh";
import { Metadata, METADATA_SCHEMA } from "../../schema/metadata";
import { MetadataKey, METADATA_PREFIX, StringPublicKey } from "../../types";
import base58 from "bs58";

export const METADATA_PROGRAM_ID =
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" as StringPublicKey;

const PubKeysInternedMap = new Map<string, PublicKey>();

export async function getMetadata(
  connection: Connection,
  pubkey: PublicKey
): Promise<Metadata | undefined> {
  const metadataKey = await generatePDA(pubkey);
  const accountInfo = await connection.getAccountInfo(toPublicKey(metadataKey));
  if (accountInfo && accountInfo.data.length > 0) {
    if (!isMetadataAccount(accountInfo)) return;

    if (isMetadataV1Account(accountInfo)) {
      const metadata = decodeMetadata(accountInfo.data);

      if (isValidHttpUrl(metadata.data.uri)) {
        return metadata;
      }
    }
  }
}

async function generatePDA(
  tokenMint: PublicKey,
  addEditionToSeeds: boolean = false
): Promise<PublicKey> {
  const metadataSeeds = [
    Buffer.from(METADATA_PREFIX),
    toPublicKey(METADATA_PROGRAM_ID).toBuffer(),
    tokenMint.toBuffer(),
  ];

  if (addEditionToSeeds) {
    metadataSeeds.push(Buffer.from("edition"));
  }

  return (
    await PublicKey.findProgramAddress(
      metadataSeeds,
      toPublicKey(METADATA_PROGRAM_ID)
    )
  )[0];
}

const decodeMetadata = (buffer: Buffer): Metadata => {
  const metadata = deserializeUnchecked(
    METADATA_SCHEMA,
    Metadata,
    buffer
  ) as Metadata;

  // Remove any trailing null characters from the deserialized strings
  metadata.data.name = metadata.data.name.replace(/\0/g, "");
  metadata.data.symbol = metadata.data.symbol.replace(/\0/g, "");
  metadata.data.uri = metadata.data.uri.replace(/\0/g, "");
  metadata.data.name = metadata.data.name.replace(/\0/g, "");
  return metadata;
};

const isMetadataAccount = (account: AccountInfo<Buffer>) =>
  account.owner.toBase58() === METADATA_PROGRAM_ID;

const isMetadataV1Account = (account: AccountInfo<Buffer>) =>
  account.data[0] === MetadataKey.MetadataV1;

function isValidHttpUrl(text: string) {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

const toPublicKey = (key: string | PublicKey) => {
  if (typeof key !== "string") {
    return key;
  }

  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }

  return result;
};

// Required to properly serialize and deserialize pubKeyAsString types
const extendBorsh = () => {
  (BinaryReader.prototype as any).readPubkey = function () {
    const reader = this as unknown as BinaryReader;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  (BinaryWriter.prototype as any).writePubkey = function (value: any) {
    const writer = this as unknown as BinaryWriter;
    writer.writeFixedArray(value.toBuffer());
  };

  (BinaryReader.prototype as any).readPubkeyAsString = function () {
    const reader = this as unknown as BinaryReader;
    const array = reader.readFixedArray(32);
    return base58.encode(array) as StringPublicKey;
  };

  (BinaryWriter.prototype as any).writePubkeyAsString = function (
    value: StringPublicKey
  ) {
    const writer = this as unknown as BinaryWriter;
    writer.writeFixedArray(base58.decode(value));
  };
};

extendBorsh();
