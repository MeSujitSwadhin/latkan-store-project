import Link from "next/link";
import { HangingLatkan } from "@/components/animation/HangingLatkan";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center overflow-hidden bg-ivory px-6 pt-[var(--header-h)] text-center">
      <HangingLatkan className="absolute left-1/2 top-0 h-[260px] -translate-x-1/2" threadLength={120} />
      <div className="mt-40">
        <p className="numeral text-2xl text-gold">404</p>
        <h1 className="display mt-4 text-[length:var(--step-5)]">
          A detail <em className="text-wine">went missing.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">The page you were looking for isn&apos;t here — or isn&apos;t available yet.</p>
        <Link href="/" className="btn btn-wine mt-10">
          Return home
        </Link>
      </div>
    </section>
  );
}
