import { useEffect, useState } from "react";

const cachedImageUri = new Map<string, string>();
export const useMetaImage = (uri?: string) => {
  const [cachedUri, setCachedUri] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!uri) {
      return;
    }

    const result = cachedImageUri.get(uri);
    if (result) {
      setCachedUri(result);
      return;
    }

    if (!isLoading) {
      (async () => {
        setIsLoading(true);
        let response: Response;
        try {
          response = await fetch(uri, { cache: "force-cache" });
        } catch {
          try {
            response = await fetch(uri, { cache: "reload" });
          } catch {
            // If external URL, just use the uri
            if (uri?.startsWith("http")) {
              setCachedUri(uri);
            }
            setIsLoading(false);
            return;
          }
        }

        const json = await response.json();
        const imageUri = json.image;
        cachedImageUri.set(uri, imageUri);
        setCachedUri(imageUri);
        setIsLoading(false);
      })();
    }
  }, [uri, isLoading, setIsLoading]);

  return { cachedUri, isLoading };
};
