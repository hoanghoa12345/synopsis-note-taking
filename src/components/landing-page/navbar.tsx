import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import { Logo } from "./logo";
import { Button } from "../ui/button";
import { useAuth, useUser } from "@/hooks/use-auth";
import { Spinner } from "../spinner/spinner";
import { Link } from "react-router-dom";
import { SignInButton } from "./signin-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { isLoading, isAuthenticated } = useAuth();
  const { user } = useUser();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton>
              <Button variant="default" size="sm">
                Get Synopsis free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/documents">Enter Synopsis</Link>
            </Button>
            <Avatar>
              {user?.photoURL && (
                <AvatarImage src={user?.photoURL} alt="user" />
              )}
              <AvatarFallback>
                {user?.displayName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
