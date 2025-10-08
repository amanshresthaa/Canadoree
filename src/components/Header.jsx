import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header({ left, title, right, variant = "marketing" }) {
  const isMobileVariant =
    variant === "mobile" || left !== undefined || right !== undefined || title;

  const navigationItems = [
    { href: "#features", label: "Features" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  if (isMobileVariant) {
    return (
      <header className="w-full border-b border-[#dfe5ea] bg-white/95 shadow-[0_4px_12px_rgba(15,40,60,0.06)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-5 py-4">
          <div className="flex flex-1 items-center justify-start">
            {left ?? <span className="block h-12 w-12" aria-hidden />}
          </div>
          <div className="flex flex-shrink-0 items-center justify-center px-2">
            {title ? (
              <h1 className="text-base font-semibold uppercase tracking-[0.24em] text-[hsl(var(--teal))]">
                {title}
              </h1>
            ) : null}
          </div>
          <div className="flex flex-1 items-center justify-end">
            {right ?? <span className="block h-12 w-12" aria-hidden />}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 items-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Canadore</span>
          </div>
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="outline"
            className="hidden border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 md:inline-flex"
          >
            Sign In
          </Button>
          <Button type="button" className="bg-primary-600 hover:bg-primary-700">
            Get Started
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <a href={item.href} className="flex w-full items-center gap-2">
                    {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
