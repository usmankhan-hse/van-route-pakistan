import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-[#F6FBF8]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VanRoute Pakistan. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="transition hover:text-[#008F3A]">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-[#008F3A]">
              Terms
            </Link>

            <Link href="/contact" className="transition hover:text-[#008F3A]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;