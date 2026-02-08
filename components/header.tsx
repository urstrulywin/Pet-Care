"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Account", path: "/account" },
];

export default function Header() {

  const activeRoute = usePathname();

  return (
    <header className="flex items-center justify-between p-6 border-b-2 border-white/10">
      <Logo/>
      <nav>
        <ul className="flex gap-6">
          {routes.map((route) => (
            <li key={route.path}>
              <Link className={cn("font-medium text-white/80 hover:text-white focus:text-white transition", 
                activeRoute === route.path && "text-white bg-black/20 px-3 py-1 rounded-lg"
              )} href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
