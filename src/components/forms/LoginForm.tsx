"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();

  // Login form fields
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Prevents repeated submissions while login is processing
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const normalizedPhone = phone.trim();

    // Basic client-side validation
    if (!normalizedPhone || !password) {
      toast.error("Please enter your phone number and password.");
      return;
    }

    try {
      setIsLoading(true);

      // "credentials" refers to the Credentials provider
      // configured inside src/auth.ts.
      const result = await signIn("credentials", {
        phone: normalizedPhone,
        password,

        // Prevent Auth.js from automatically redirecting,
        // so we can show our own toast and control navigation.
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid phone number or password.");
        return;
      }

      toast.success("Login successful.");

      // For now, send every logged-in user to the customer page.
      // Later we will redirect according to ADMIN, DRIVER, or CUSTOMER role.
      router.push("/customer");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#F6FBF8] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/5 lg:grid-cols-2">
        {/* Desktop information panel */}
        <div className="hidden bg-[#008F3A] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-white font-black text-[#008F3A]">
                VR
              </span>

              <span>
                <span className="block text-xl font-black">
                  VanRoute
                </span>

                <span className="block text-sm text-green-100">
                  Pakistan
                </span>
              </span>
            </Link>

            <h1 className="mt-16 text-4xl font-black leading-tight">
              Welcome back to simpler transport.
            </h1>

            <p className="mt-5 leading-7 text-green-50">
              Sign in using your phone number to send transport
              requests, receive driver offers, and manage bookings.
            </p>
          </div>

          <div className="mt-12 space-y-4 text-sm text-green-50">
            <p>✓ Phone-first login</p>
            <p>✓ Manage transport requests</p>
            <p>✓ Receive offers from matching drivers</p>
          </div>
        </div>

        {/* Login form */}
        <div className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#008F3A] text-sm font-black text-white">
                VR
              </span>

              <span className="font-black text-gray-950">
                VanRoute Pakistan
              </span>
            </Link>
          </div>

          <p className="text-sm font-bold text-[#008F3A]">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Sign in with your phone number
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Use the phone number and password you entered during
            registration.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                Mobile number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="03XXXXXXXXX"
                inputMode="tel"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-800"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#008F3A] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008F3A] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#006D2C] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#008F3A] hover:underline"
            >
              Create account
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            You can browse vans and verified drivers without signing
            in.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;