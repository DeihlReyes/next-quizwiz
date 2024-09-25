"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import SignOutButton from "./sign-out-button";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  const { status } = useSession();
  const pathname = usePathname();

  if (status === "authenticated") {
    if (pathname === "/") {
      return (
        <Button asChild className={cn(className)}>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      );
    }
    return <SignOutButton />;
  }

  return (
    <Button
      className={cn(className)}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
    >
      Sign In
    </Button>
  );
}
