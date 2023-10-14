import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <img className="w-10 h-10 dark:invert" src="synopsis.svg" alt="logo" />
      <p className={cn("font-semibold", "font-mono")}>Synopsis</p>
    </div>
  );
};
