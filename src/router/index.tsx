import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/login";
import ResetPassword from "@/pages/reset-password/reset-password";
import LandingPage from "@/pages/landing-page";
import DocumentsPage from "@/pages/documents-page";
import MainLayout from "@/layouts/main-layout";
import DocumentIdPage from "@/pages/documents-page/document-id-page";
import Error from "@/components/documents-page/error";
import DocumentPreview from "@/pages/document-preview";

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ResetPassword />,
  },
  {
    path: "/documents",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DocumentsPage />,
      },
      {
        path: ":documentId",
        element: <DocumentIdPage />,
      },
    ],
  },
  {
    path: "/preview/:documentId",
    element: <DocumentPreview />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
