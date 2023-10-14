import { createBrowserRouter } from "react-router-dom";
import Notes from "@/pages/Notes/Notes";
import Login from "@/pages/login";
import ResetPassword from "@/pages/reset-password/reset-password";
import LandingPage from "@/pages/landing-page";
import DocumentsPage from "@/pages/documents-page";
import MainLayout from "@/layouts/main-layout";
import DocumentIdPage from "@/pages/documents-page/document-id-page";

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/notes/:noteId",
    element: <Notes />,
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
    children: [
      {
        index: true,
        element: <DocumentsPage/>
      },
      {
        path: ':documentId',
        element: <DocumentIdPage/>
      }
    ]
  },
  {
    path: "*",
    element: <>404</>,
  },
]);

export default router;
