import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "@/services/firebase";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setIsAuthenticated(false);
  //   }, 2000);
  // }, []);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  return { isLoading, isAuthenticated };
};

export const useUser = () => {
  const auth = getAuth(app);
  const logout = () =>
    signOut(auth)
      .then(() => {
        console.log("Logout succeed");
      })
      .catch((error) => {
        console.log("error", error);
      });
  return { user: auth.currentUser, logout };
};
