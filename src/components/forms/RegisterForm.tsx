"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();

  // Registration form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Prevents repeated submissions while the request is running
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Basic client-side validation
    if (!name.trim() || !phone.trim() || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),

          // Do not send an empty email string.
          email: email.trim() || undefined,

          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed.");
        return;
      }

      toast.success(
        data.message || "Account created successfully."
      );

      // Clear the form
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Send the user to login after a brief moment.
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration request failed:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
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

            <h1 className="mt-16 text-4xl leading-tight font-black">
              Find transport without searching through endless groups.
            </h1>

            <p className="mt-5 leading-7 text-green-50">
              Browse drivers and available vans freely. Create an
              account only when you want to send requests, receive
              offers, or manage a booking.
            </p>
          </div>

          <div className="mt-12 space-y-4 text-sm text-green-50">
            <p>✓ Phone-first account</p>
            <p>✓ Browse vans without registration</p>
            <p>✓ Send one request to matching drivers</p>
          </div>
        </div>

        {/* Registration form */}
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
            Create your account
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Get started with your phone number
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Email is optional. Your phone number will be your main
            account identifier.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

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
                autoComplete="tel"
                inputMode="tel"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-800"
                >
                  Email
                </label>

                <span className="text-xs font-medium text-gray-400">
                  Optional
                </span>
              </div>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#008F3A] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter password again"
                autoComplete="new-password"
                minLength={8}
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
      <LoaderCircle className="h-5 w-5 animate-spin" />
      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-bold text-[#008F3A] hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            You can browse vans and drivers without creating an
            account.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;