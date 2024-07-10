import AppLayout from "../layout/AppLayout";
import {
  LoginPage,
  SignUpSelectPage,
  SignUpPage,
  MainPage,
  DefaultMyPage,
  MaderMyPage,
  ProductListPage,
  ProductDetailPage,
  NotFoundPage,
} from "../pages";

const Router = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signUpSelect", element: <SignUpSelectPage /> },
      { path: "signUp", element: <SignUpPage /> },
      { path: "defaultMyPage", element: <DefaultMyPage /> },
      { path: "maderMyPage", element: <MaderMyPage /> },
      { path: "product/list", element: <ProductListPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
];

export default Router;
