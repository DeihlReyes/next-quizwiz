"use client";

import { redirect } from "next/navigation";

import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

export default function AuthDropDown() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Loader2 className="h-5 w-5 animate-spin" />;
  }

  if (!data) {
    return redirect("/sign-in");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-md" asChild>
        <Avatar>
          <AvatarImage
            src={data.user?.image || ""}
            alt={data.user?.name || ""}
          />
          <AvatarFallback>{data.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem disabled>{data.user?.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
