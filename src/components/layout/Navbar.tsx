import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#008F3A] text-sm font-black text-white">
            VR
          </span>

          <span className="leading-tight">
            <span className="block text-base font-black text-gray-950">
              VanRoute
            </span>
            <span className="block text-xs font-semibold text-[#008F3A]">
              Pakistan
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/search"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#008F3A]"
          >
            Find Van
          </Link>

          <Link
            href="/drivers"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#008F3A]"
          >
            For Drivers
          </Link>

          <Link
            href="/safety"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#008F3A]"
          >
            Safety
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-[#008F3A]/20 bg-[#EAF8EF] px-3 py-1 text-xs font-bold text-[#008F3A] sm:inline-flex">
            Rawalpindi
          </span>

          <Link
            href="/login"
            className="rounded-xl bg-[#008F3A] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#006D2C]"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;