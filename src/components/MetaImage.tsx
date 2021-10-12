import Image from "next/image";
import { useMetaImage } from "../hooks/useMetaImage";

export enum ImageType {
  Thumbnail,
  Detail,
}
interface MetaImageProps {
  uri: string;
  type: ImageType;
}

const imageStyle = {
  Thumbnail: {
    size: 172,
  },
  Detail: {
    size: 288,
  },
};
export const MetaImage = ({ uri, type }: MetaImageProps) => {
  const { isLoading, cachedUri } = useMetaImage(uri);

  const isMeasureStorage = (path: string) => {
    const uri = new URL(path);
    return ["www.arweave.net", "gateway.pinata.cloud"].includes(uri.hostname);
  };
  const imageSize = (type: ImageType) => {
    if (type === ImageType.Thumbnail) {
      return imageStyle["Thumbnail"].size;
    }
    return imageStyle["Detail"].size;
  };
  return (
    <div
      className={
        type === ImageType.Thumbnail
          ? "w-40 h-40 bg-gray-200 rounded-md overflow-hidden hover:opacity-75"
          : "w-72 h-72 bg-gray-200 rounded-md overflow-hidden hover:opacity-75"
      }
    >
      {cachedUri && isMeasureStorage(cachedUri) ? (
        <Image
          width={imageSize(type)}
          height={imageSize(type)}
          src={cachedUri}
          alt={uri}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cachedUri}
          alt={uri}
          className={
            type === ImageType.Thumbnail
              ? "w-40 h-40 object-center object-cover"
              : "w-72 h-72 object-center object-cover"
          }
        />
      )}
    </div>
  );
};
