import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
}

export function ButtonLoading({
  children,
  isLoading,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
}
