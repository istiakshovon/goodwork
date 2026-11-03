"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import Link from "next/link";
import { Menu, Plus, X } from "lucide-react";
import { cn } from "cn";
import { Logo } from "@/components/logo";
import { buttonStyles } from "@/lib/buttons";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { label: "Causes", href: "/#causes" },
  { label: "Events", href: "/#events" },
  { label: "Stories", href: "/#stories" },
  { label: "Join", href: "/#join" },
];

export function Navbar() {

const handleSignOut = () => {
  authClient.signOut();
}

  const { data: session } = authClient.useSession()
  const user = session?.user;
  console.log(user)

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Link href="/#top" aria-label="GoodWork home">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

{
  user?       <Popover>
  <PopoverTrigger render={ <Avatar>
          <AvatarImage src={user?.image as string} />
          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>
        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>: <>

 <div className="hidden items-center gap-4 md:flex">
          <a
            href="/login"
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Sign in
          </a>
          <a
            href="/signup"
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Sign up
          </a>

        </div>
        </>
}

  
       
       

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "hidden border-t border-white/10 bg-navy/95 px-4 pb-5 pt-3 backdrop-blur-lg md:hidden",
          menuOpen && "block"
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
          <a
            href="/login"
            className={buttonStyles({ variant: "outline", size: "md" })}
          >
            Sign in
          </a>
          <Link
            href="/add-destination"
            onClick={() => setMenuOpen(false)}
            className={cn(buttonStyles({ size: "md" }), "flex-1")}
          >
            <Plus className="size-4" aria-hidden="true" />
            Create an Event
          </Link>
        </div>
      </div>
    </header>
  );
}
