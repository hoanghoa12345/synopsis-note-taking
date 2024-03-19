import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import app from "@/services/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { Icons } from "../icons/icons";

export const SignInButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  auth.useDeviceLanguage();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const handleGoogleSignIn = () => {
    toast.loading("Signing in...");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success("Sign in successful!");
        console.log("[AuthResult]:", result);
      })
      .catch((error) => {
        toast.error("Sign in error");
        console.log("[AuthResult]:", error);
      })
      .finally(() => setOpen(false));
  };
  const handleLoginWithEmail = () => {
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>to continue to Synopsis</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-4">
          <Button onClick={handleGoogleSignIn} type="button">
            <Icons.google className="mr-2 h-4 w-4" /> Sign In with Google
          </Button>
          <Button onClick={handleLoginWithEmail} type="button">
            <Mail className="mr-2 h-4 w-4" /> Sign In with Email
          </Button>
          </div>
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
