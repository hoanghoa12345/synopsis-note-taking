import { ButtonLoading } from "@/components/button/button-loading";
import { LockIcon, UserIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "@/services/firebase";
import { Input } from "@/components/ui/input";

const LOGIN_STATE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const Login = () => {
  const auth = getAuth(app);
  const { toast } = useToast();
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
        toast({
          title: "Login succeed",
          description: "You have successfully logged in",
          variant: "default",
        });
        const user = userCredential.user;
        const accessToken = await user.getIdToken();
        localStorage.setItem("accessToken", accessToken);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setLoginState(LOGIN_STATE.ERROR);
        const errorMessage = error.message;
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
          type: "background",
          duration: 2000,
        });
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/", { replace: true });
      }
    });

    return () => {};
  }, [auth, navigate]);

  const isLoading = loginState === LOGIN_STATE.LOADING;
  return (
    <div className="w-full max-w-sm p-4 mx-auto my-32 bg-white rounded-md shadow-md dark:bg-secondary dark:text-gray-100 dark:border-gray-700 border-gray-200 border-2">
      <div className="px-2 py-4">
        <h2 className="font-semibold text-2xl py-1">Login</h2>
        <p className="text-sm text-gray-400 dark:text-gray-400">
          Sign In your account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <UserIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
          <Input
            type="email"
            name="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {/* <input
            type="email"
            className="flex-1 w-full px-2 py-1 text-gray-700 dark:text-gray-300 dark:bg-gray-700 bg-gray-200 rounded-md outline-none border-none focus:ring-0 focus:border-none focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100"
            id="email"
            name="email"
            autoComplete="off"
            required
            aria-required="true"
            aria-label="email"
            aria-invalid="false"
            aria-describedby="email-error"
            autoFocus
            maxLength={40}
            minLength={3}
            size={40}
            spellCheck="false"
            tabIndex={0}
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          /> */}
        </div>
        <div className="flex mt-3 justify-center items-center">
          <LockIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
          <Input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {/* <input
            type="password"
            className="flex-1 w-full px-2 py-1 text-gray-700 dark:text-gray-300 dark:bg-gray-700 bg-gray-200 rounded-md outline-none border-none focus:ring-0 focus:border-none focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-gray-100"
            id="password"
            name="password"
            autoComplete="off"
            required
            aria-required="true"
            aria-label="Password"
            aria-invalid="false"
            aria-describedby="password-error"
            maxLength={40}
            minLength={3}
            size={40}
            spellCheck="false"
            tabIndex={0}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          /> */}
        </div>
        <div></div>
        <div className="mt-4 flex justify-between items-center">
          <ButtonLoading type="submit" className="mx-2" isLoading={isLoading}>
            Login
          </ButtonLoading>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 ml-2"
          >
            Forgot password?
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
