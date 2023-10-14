import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./App.css";
import {Toaster} from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
      <ModalProvider />
    </ThemeProvider>
  );
}

export default App;
