import {
  createBrowserRouter,
} from "react-router-dom";
import Notes from "@/pages/Notes/Notes";

const router = createBrowserRouter([
  {
    path: "/notes",
    element: <Notes/>,
  },
]);

export default router