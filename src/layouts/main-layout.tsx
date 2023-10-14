import { SearchCommand } from "@/components/commands/search-command";
import { Navigation } from "@/components/documents-page/navigation";
import { Spinner } from "@/components/spinner/spinner";
import { useAuth } from "@/hooks/use-auth";
import { Outlet, Navigate } from "react-router-dom";

const MainLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg"/>
      </div>
    );

  if (!isLoading && !isAuthenticated) return <Navigate to="/" replace={true} />
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <div className="flex-1 h-full overflow-y-auto">
        <SearchCommand/>
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
