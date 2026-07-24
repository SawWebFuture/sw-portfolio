import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-foreground">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-theme px-5 py-3 text-sm font-semibold text-white transition hover:bg-theme-dark"
      >
        Back to home
      </Link>
    </div>
  );
}
