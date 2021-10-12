import Image from "next/image";
import Link from "next/link";
import { useMetaImage } from "../hooks/useMetaImage";
import { Metadata } from "../schema/metadata";

interface NFTCardProps {
  metadata: Metadata;
  sellerAddress: string;
}
export const NFTCard = ({ metadata, sellerAddress }: NFTCardProps) => {
  const { isLoading, cachedUri } = useMetaImage(metadata.data.uri);
  if (!metadata) return null;
  const isMeasureStorage = (path: string) => {
    const uri = new URL(path);
    return ["www.arweave.net", "gateway.pinata.cloud"].includes(uri.hostname);
  };

  return (
    <div className="group relative">
      <div className="inline-block px-2">
        <Link
          href={`/detail/${metadata.mint}?sellerAddress=${sellerAddress}`}
          passHref
        >
          <a>
            <div className="w-40 h-56 max-w-xs overflow-auto rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="w-40 h-40 bg-gray-200 rounded-md overflow-hidden hover:opacity-75">
                {cachedUri && isMeasureStorage(cachedUri) ? (
                  <Image
                    width={172}
                    height={172}
                    src={cachedUri}
                    alt={metadata.data.name}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cachedUri}
                    alt={metadata.data.name}
                    className="w-40 h-40 object-center object-cover"
                  />
                )}
              </div>
              <div className="pt-1 pl-2 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {metadata?.data.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {metadata?.data.symbol}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
