import { ButtonLoading } from "@/components/button/button-loading";
import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "@/services/firebase";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
const RESET_PW_STATE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const ResetPassword = () => {
  const auth = getAuth(app);
  const { toast } = useToast();
  const [resetPwState, setResetPwState] = React.useState(RESET_PW_STATE.IDLE);
  const isLoading = resetPwState === RESET_PW_STATE.LOADING;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResetPwState(RESET_PW_STATE.LOADING);
    const email = e.currentTarget.email.value;
    try {
      await sendPasswordResetEmail(auth, email )
      setResetPwState(RESET_PW_STATE.SUCCESS);
      toast({
        title: "Send request success",
        description: "Please check your email",
        variant: "default",
      });
    } catch (error: unknown) {
      setResetPwState(RESET_PW_STATE.ERROR);
      toast({
        title: "Request error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-10 bg-white rounded-md shadow-md p-4 space-y-4 dark:bg-gray-800 dark:text-gray-200 dark:shadow-gray-700/50 dark:border-gray-700 border border-gray-200/50 md:p-8 lg:p-10 xl:p-12 dark:border-gray-200/50 md:space-y-6 lg:space-y-8 xl:space-y-10 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl md:mt-16 lg:mt-20 xl:mt-24 mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <h2 className="text-2xl font-bold">Recover Password</h2>
      <p>Recover your account password</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        {resetPwState === RESET_PW_STATE.ERROR && (
          <div>
            <p>Something went wrong. Please try again later.</p>
          </div>
        )}
        <div className="py-2">
          <input
            className="w-full p-2 border rounded-md outline-none focus:border-blue-500 dark:border-gray-200 dark:focus:border-blue-500"
            required
            minLength={1}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div>
          <ButtonLoading isLoading={isLoading} type="submit">
            Recover
          </ButtonLoading>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
