import { createContext, useReducer } from "react";
import communityReducer from "./community-reducer";

const initState = {
  posts: [],
  userPosts: [],
};

export const CommunityContext = createContext({
  ...initState,
  dispatch: () => {},
});

const CommunityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(communityReducer, initState);
  return (
    <CommunityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
