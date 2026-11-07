"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, LogOut, Menu, Plus, X } from "lucide-react";
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
import ThemeToggle from "./theme-toggle";


const navLinks = [
  { label: "Explore Upcoming Events", href: "/events" },
 
];

export function Navbar() {

  const handleSignOut = () => {
    authClient.signOut();
  }

  const { data: session } = authClient.useSession()
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Link href="/" aria-label="GoodWork home">
          <Logo variant="on-light" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-brand/10 hover:text-brand-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="hidden items-center gap-3 md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand-dark">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              Trusted Member
            </span>

            <Popover>
              <PopoverTrigger
                render={
                  <Avatar className="ring-2 ring-brand/40">
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              >
                Open menu
              </PopoverTrigger>
              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle className="max-w-40 truncate">
                    {user?.name}
                  </PopoverTitle>
                  <PopoverDescription className="max-w-40 truncate">
                    {user?.email}
                  </PopoverDescription>
                </PopoverHeader>
                <div className="flex flex-col gap-2">
                  <Link href="/joined-events" className={buttonStyles({ variant: "outline", size: "sm" })}>
                    Joined Events
                  </Link>
                  <Link href="/my-create-event" className={buttonStyles({ variant: "outline", size: "sm" })}>
                    Manage Events
                  </Link>
                  <Link
                    href="/add-events"
                    className={cn(buttonStyles({ size: "sm" }), "flex-1")}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Create an Event
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-destructive/10 px-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Sign in
            </a>
            <Link href="/signup" className={buttonStyles({ size: "sm" })}>
              Sign Up
            </Link>
          </div>
        )}

        <ThemeToggle/>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
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
          "hidden border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden",
          menuOpen && "block"
        )}
      >
        {user ? (
          <div className="flex flex-col gap-2 pb-4">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand-dark">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              Trusted Member
            </span>
            <Link href="/joined-events" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-700">
              Joined Events
            </Link>
            <Link href="/my-create-event" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-700">
              Manage Events
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-4">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-700">
              Sign in
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className={cn(buttonStyles({ size: "sm" }), "w-fit")}>
              Sign Up
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-slate-700"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
