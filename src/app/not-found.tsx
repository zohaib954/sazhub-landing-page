import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-hero px-5 text-center text-white">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative">
        <LogoMark tone="light" className="mx-auto h-16 animate-floaty" />
        <p className="mt-6 font-display text-7xl font-extrabold">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold">This page isn&apos;t on the register</h1>
        <p className="mt-2 text-ink-200">It may have moved, or it never existed.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
