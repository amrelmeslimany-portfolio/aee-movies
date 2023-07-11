import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "./Layout/MainLayout";
import MoviesProvider from "./context/movies/movies-context";
import Accessories from "./Layout/Accessories";
import AuthProvider from "./context/auth/auth-context";
import FavouriteProvider from "./context/favourite/favourite-context";
import CommunityProvider from "./context/community/community-context";

function App() {
  return (
    <BrowserRouter>
      <Accessories />
      <ConfigProvider direction={"rtl"}>
        <CommunityProvider>
          <AuthProvider>
            <MoviesProvider>
              <FavouriteProvider>
                <MainLayout />
              </FavouriteProvider>
            </MoviesProvider>
          </AuthProvider>
        </CommunityProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
