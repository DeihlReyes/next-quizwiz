import NavItems from "./nav-items";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a href="/" className="text-xl font-bold">
            QuizWiz
          </a>
          <NavItems />
        </nav>
      </div>
    </header>
  );
}
