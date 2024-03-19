import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonLoading } from "@/components/button/button-loading";
import app from "@/services/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LOGIN_STATE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [loginState, setLoginState] = React.useState(LOGIN_STATE.IDLE);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    setLoginState(LOGIN_STATE.LOADING);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setLoginState(LOGIN_STATE.SUCCESS);
        toast.success("Login succeed", {
          description: "You have successfully logged in",
        });
        const user = userCredential.user;
        const accessToken = await user.getIdToken();
        localStorage.setItem("accessToken", accessToken);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setLoginState(LOGIN_STATE.ERROR);
        const errorMessage = error.message;
        toast.error("Login failed", {
          description: errorMessage,
        });
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/documents", { replace: true });
      }
    });

    return () => {};
  }, [auth, navigate]);

  const isLoading = loginState === LOGIN_STATE.LOADING;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign In your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-muted-foreground"
            >
              Forgot password?
            </Link>
            <ButtonLoading type="submit" isLoading={isLoading}>
              Login
            </ButtonLoading>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
