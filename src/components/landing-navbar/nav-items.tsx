import Link from "next/link";

import { ModeToggle } from "../mode-toggle";
import AuthButton from "./auth-button";

export default function NavItems() {
  return (
    <ul className="flex items-center space-x-8">
      <li>
        <Link href="#features">Features</Link>
      </li>
      <li>
        <Link href="#testimonials">Testimonials</Link>
      </li>
      <li>
        <Link href="#faq">FAQ</Link>
      </li>
      <li>
        <Link href="#contact">Contact</Link>
      </li>
      <li>
        <ModeToggle />
      </li>
      <li>
        <AuthButton />
      </li>
    </ul>
  );
}
