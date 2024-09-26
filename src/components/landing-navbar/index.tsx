"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import AuthButton from "./auth-button";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavItems = ({ mobile = false }) => (
    <ul
      className={`flex ${
        mobile ? "flex-col space-y-4" : "items-center space-x-8"
      }`}
    >
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={
              pathname === item.href
                ? "font-medium text-primary"
                : "text-muted-foreground"
            }
            onClick={() => setOpen(false)}
          >
            {item.name}
          </Link>
        </li>
      ))}
      {mobile && (
        <>
          <li>
            <ModeToggle />
          </li>
          <li>
            <AuthButton className="w-full" />
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-10">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            QuizWiz
          </Link>
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <NavItems />
            <ModeToggle />
            <AuthButton />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-8 flex flex-col space-y-4">
                <NavItems mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
