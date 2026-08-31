import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type BackLink =
  | { to: "/"; label: string }
  | { to: "/people/$slug"; params: { slug: string }; label: string };

export function PageChrome({
  back,
  kicker,
  title,
  children,
}: {
  back: BackLink;
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {"params" in back ? (
          <Link
            to={back.to}
            params={back.params}
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {back.label}
          </Link>
        ) : (
          <Link
            to={back.to}
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {back.label}
          </Link>
        )}
        {kicker ? <p className="text-sm font-medium text-muted">{kicker}</p> : null}
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
