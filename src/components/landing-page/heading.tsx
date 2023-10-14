import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "../spinner/spinner";
import { Link } from "react-router-dom";
import { SignInButton } from "./signin-button";

export const Heading = () => {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plan. Unified. Welcome to{" "}
        <span className="underline">Synopsis</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Synopsis is the connected workspace where better, faster work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link to="/documents">
            Enter Synopsis <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <Button>
            Get Synopsis free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
