import { HelpCircle, Info, LogOutIcon, Settings2, User2, UserCircle2, Users2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function UserDropdown() {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle2 className="w-6 h-6" />
          <span className="sr-only">User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account
        </DropdownMenuLabel>
        <DropdownMenuItem><User2 className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
        <DropdownMenuItem><Users2 className="mr-2 h-4 w-4" /><span>Users</span></DropdownMenuItem>
        <DropdownMenuItem><Settings2 className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
        <DropdownMenuItem><Info className="mr-2 h-4 w-4" /><span>About</span></DropdownMenuItem>
        <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" /><span>Help</span></DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}><LogOutIcon className="mr-2 h-4 w-4" /><span>Logout</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
