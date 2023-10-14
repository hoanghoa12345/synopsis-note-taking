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
import { Icons } from "../icons/icons";

export const SignInButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
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
  /*const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log();
    
  }*/
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>to continue to Synopsis</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right text-sm">
              Password
            </label>
            <input
            type="password"
              id="password"
              name="password"
              required
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
          </div>
        </div> */}
        <div className="flex justify-center items-center">
          <Button onClick={handleGoogleSignIn} type="button">
            <Icons.google className="mr-2 h-4 w-4" /> Sign In with Google
          </Button>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Login</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
