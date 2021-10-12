import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
import { dispatch } from "react-hot-toast/dist/core/store";

const SearchStateContext = createContext<string | undefined>(undefined);
const SearchDispatchContext = createContext<
  Dispatch<SetStateAction<string | undefined>> | undefined
>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchAddress, setSearchAddress] = useState<string | undefined>();

  return (
    <SearchStateContext.Provider value={searchAddress}>
      <SearchDispatchContext.Provider value={setSearchAddress}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchStateContext);
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);

  if (dispatch === undefined) {
    throw new Error("useSearchDispatch should be used with SearchProvider");
  }
  return dispatch;
};
