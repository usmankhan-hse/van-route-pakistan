import LoginForm from "@/components/forms/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to VanRoute Pakistan using your phone number to manage transport requests, offers, and bookings.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;