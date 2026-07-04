export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full bg-[#EAF8EF] px-4 py-2 text-sm font-semibold text-[#008F3A]">
          Rawalpindi&apos;s Trusted Van Service Platform
        </p>

        <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
          Find verified school vans with vacant seats on your route in{" "}
          <span className="text-[#008F3A]">Rawalpindi.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Send one request and receive offers from verified van drivers. Choose
          the best option for your child.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#"
            className="rounded-xl bg-[#008F3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#006D2C]"
          >
            Find Van Now
          </a>

          <a
            href="#"
            className="rounded-xl border border-[#008F3A]/30 px-6 py-3 text-sm font-bold text-[#008F3A] transition hover:bg-[#EAF8EF]"
          >
            Register as Driver
          </a>
        </div>
      </section>
    </main>
  );
}