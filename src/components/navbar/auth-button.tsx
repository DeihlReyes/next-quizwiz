"use client";

import Link from "next/link";

import { signIn, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Button asChild className={cn(className)}>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    );
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
