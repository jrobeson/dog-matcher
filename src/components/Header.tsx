import { ReactNode } from "react";
import logo from "/dog-matcher-logo.png";
import { Separator } from "@/components/ui/separator";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <nav className="sticky top-0 z-50 w-full shadow-md">
      <header className="w-full bg-stone-50">
        <div className="container mx-2 flex items-center gap-3">
          <img src={logo} alt="DogMatcher's Logo" className="rounded-full" />
          <span className="text-2xl text-rose-600">Dog Matcher</span>
        </div>
        <Separator className="my-2" />
        {children}
      </header>
    </nav>
  );
}
