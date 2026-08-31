import { useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, Brain, GitBranch, LibraryBig, Menu, Search, X } from "lucide-react";

const navItems = [
  { label: "People", href: "#people" },
  { label: "Timeline", href: "#timeline" },
  { label: "Decisions", href: "#decisions" },
  { label: "Graph", href: "#graph" },
  { label: "Sources", href: "#sources" },
  { label: "Learning", href: "#learning" },
];

export function Shell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-sm border border-border bg-ink text-sm font-semibold text-surface">
              L
            </span>
            <span>
              <span className="block font-display text-xl leading-none">Lattice</span>
              <span className="hidden text-xs text-muted sm:block">Decision intelligence archive</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 text-muted lg:flex">
              <Brain className="size-5" aria-hidden="true" />
              <GitBranch className="size-5" aria-hidden="true" />
              <LibraryBig className="size-5" aria-hidden="true" />
              <Search className="size-5" aria-hidden="true" />
              <BookOpen className="size-5" aria-hidden="true" />
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center border border-border bg-paper lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <nav id="mobile-nav" className="border-t border-border px-4 py-3 lg:hidden" aria-label="Mobile navigation">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
      {children}
    </div>
  );
}
