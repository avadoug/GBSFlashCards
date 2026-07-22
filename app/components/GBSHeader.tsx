"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Info, Library, Settings, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Study", icon: Sparkles },
  { href: "/library", label: "Library", icon: Library },
  { href: "/statistics", label: "Statistics", icon: BarChart3 },
  { href: "/about", label: "About", icon: Info },
  { href: "/data-guide", label: "Data guide", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function GBSHeader() {
  const pathname = usePathname();
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="GBS Strain Flip home">
          <span className="brand-mark" aria-hidden="true"><span>G</span></span>
          <span className="brand-copy">
            <strong>GBS <em>Strain Flip</em></strong>
            <small>Growers · Breeders · Smokers</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>
          ))}
        </nav>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.slice(0, 4).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={pathname === href ? "active" : ""} aria-label={label}>
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

