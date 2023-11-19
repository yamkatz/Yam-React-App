import { Route, Routes } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import HomePage from "../Pages/home/HomePage";
import AboutPage from "../Pages/About/AboutPage";
import RegisterPage from "../Pages/register/RegisterPage";
import Error404Page from "../Pages/404/Error404Page";
import LoginPage from "../Pages/login/LoginPage";
import EditCardPage from "../Pages/EditCardPage/EditCardPage";
import SandboxPage from "../Pages/Sandbox/SandboxPage";
import CreateCardPage from "../Pages/createCardPage/CreateCardPage";
import FavCardsPage from "../Pages/FavCards/FavCardsPage";
import MyCardsPage from "../Pages/MyCards/MyCardsPage";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import AdminGuard from "../Guard/AdminGuard";
import GuestGuard from "../Guard/GuestGuard";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <AuthGuard>
            <BizGuard>
              <CreateCardPage />
            </BizGuard>
            <AdminGuard>
              <CreateCardPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:_id`}
        element={
          <AuthGuard>
            <BizGuard>
              <EditCardPage />
            </BizGuard>
            <AdminGuard>
              <EditCardPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.FAVCARDS}
        element={
          <AuthGuard>
            <GuestGuard>
              <FavCardsPage />
            </GuestGuard>
            <BizGuard>
              <FavCardsPage />
            </BizGuard>
            <AdminGuard>
              <FavCardsPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <AuthGuard>
            <BizGuard>
              <MyCardsPage />
            </BizGuard>
            <AdminGuard>
              <MyCardsPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AuthGuard>
            <AdminGuard>
              <SandboxPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route path={"*"} element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
